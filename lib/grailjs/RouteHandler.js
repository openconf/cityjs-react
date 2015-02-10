var Emitter = require('events').EventEmitter;
var ReactRouterAdapter = require('./ReactRouterAdapter');
var React = require('react');
var DocumentTitle = require('react-document-title');

var isClient = typeof(window) == 'object';

var stc = 0;
module.exports = function createApp(options){
	var stores = {}, router, routes;

  
  if(options && options.routes) {
  	router = ReactRouterAdapter.routerAdapter(options.routes);	
  	routes = options.routes;
  }

	var ctx = initContext();

	function initContext(){
		var ctx = {
			stores:{},
			actions: new Emitter()
		}
		ctx.s = stc++;
		Object.keys(stores).reduce(function(context, name){
			context.stores[name] = initStore(ctx, stores[name]);
			return context;
		}, ctx);

		return ctx;
	}

	function initStore(context, storeFactory){
		var store = storeFactory.create();
		store.init(context); 
		return store;
	}
	
	function handlerWrapper(cb, initNewContext){
		if(initNewContext){
			ctx = initContext();
		}
		var that = this;
		return function(Handler, state){
			state.app = this;
			state = Object.keys(ctx).reduce(function(context, name){
				context[name] = ctx[name];
				return context;
			}, state);
			if(that.request) state.request = that.request;
			cb.call(state, Handler, state);
		}
	}
	
	var appActions = require('./defaultConfig');
	
  //hang on the historyAPI
  //init actions/routeActions/stores
  //each handler render with theese stores/actions/routes
  var theApp = {
  	appActions: appActions.actionsRouter,
  	useRoutes: function(appRoutes){
  		router = ReactRouterAdapter.routerAdapter(appRoutes);
  		routes = appRoutes;
  	},
    renderUrl: function renderUrl(req, cb){
      //create new actions/stores bind them to handler to render
      // context generation done once here, should do it each renderUrl and once initApp
      router.call(this, req.originalUrl, handlerWrapper.call({request: req}, cb, true));
    },
    initClient: function initApp(cb){
    	if(!isClient) return;
    	return router.call(this, null, handlerWrapper(cb));
    },
    context: ctx,
    isClient: isClient,
		isServer: !isClient,
		whenClient: function(handler){
			if(isClient) handler.call(this);
		},
		use: function(store){
			if(stores[store.name]) return;
			stores[store.name] = store;
			ctx.stores[store.name] = initStore(ctx, store);
		},
		init: function appStart(){


		  var Html = require('./components/Layout');

		  var parsedRoutes = [];
		  // parse routes for
		  ReactRouterAdapter.parseActions(routes).forEach(function(route){
		    if(route.stores) {
		      route.stores.forEach(function(store){
		        theApp.use(store);
		      });
		    }
		    appActions.actionsRouter.create(route.path, route.action);
		    parsedRoutes.push(route.path);
		  })

		  //If client - init the app, on route change set up context and trigger routing actions
		  theApp.initClient(appHandler(function(err){
		    React.render(this.Handler(), document.body);
		  }));

		  function appHandler(renderStuff){
		    return function (Handler, state){
		      if(state.routes.length == 0){ //404
		        return renderStuff(new Error("404"));
		      }
		      state.$render = function(){
		        state.routeAction = false;
		        var doAction = appActions.withContext(state).doAction;
		        React.withContext({doAction:doAction, stores: state.stores},
		          renderStuff.bind({Handler:Handler, stores: state.stores}));
		      }
		      //get matched path's
		      var urlsMatched = []
		      state.routes.forEach(function(route, i){
		        if(route.defaultRoute 
		            && !~urlsMatched.indexOf(route.path + "/$default")
		            && (state.routes[state.routes.length - 1].path == route.path)) {
		          urlsMatched.push(route.path + "$default")
		        };
		        if(!~urlsMatched.indexOf(route.path)) urlsMatched.push(route.path);
		      });
		     
		      urlsMatched = urlsMatched.reduce(function(newUrlsMatched, path){
		        if(!!~parsedRoutes.indexOf(path)) newUrlsMatched.push(path);
		        return newUrlsMatched;
		      }, []);
		      state.routeAction = true;
		      if(urlsMatched.length > 0){
		        appActions.doAction.call(state, urlsMatched, null, state);
		      } else {
		        this.$render()
		      }
		    }
		  }

		  return {
		  	middleware: function(req, res, next){
			    // render as HTML
			    theApp.renderUrl(req, appHandler(function(err){
			      if(err) return next(); // put custom error handling here, so far only 404
			      var title  = DocumentTitle.rewind();
			      var renderedApp = React.renderToString(this.Handler());
			      var html = React.renderToStaticMarkup(React.createFactory(Html)({title: title, markup :renderedApp}));
			      res.end('<!DOCTYPE html>' + html);
			    }));
			  }
			}
		}
  }

  return theApp;
}

module.exports.isClient = isClient;
module.exports.isServer = !isClient;