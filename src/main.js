var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Promise = require('es6-promise').Promise;
var RouteHandler = require('../lib/grailjs/RouteHandler');
var ReactRouterAdapter = require("../lib/grailjs/ReactRouterAdapter");


var routes = require('./routes');

// create app Actions
var appActions = require("../lib/grailjs/Actions")();
//configure APP
var appCfg = {
  router: ReactRouterAdapter.routerAdapter(routes)
};

var createApp = require("../lib/grailjs/RouteHandler");

var app = createApp(appCfg);


appStart();

var Html = require('./components/layout');
function appStart(){
  var parsedRoutes = [];
  // parse routes for
  ReactRouterAdapter.parseActions(routes).forEach(function(route){
    appActions.actionsRouter.create(route.path, route.action);
  })

  //Read Template
  //if(RouteHandler.isServer) var indexTemplate = require('fs').readFileSync("./index.html")


  module.exports =  function(req, res, next){
    // render as HTML
    app.renderUrl(req, appHandler(function(err){
      if(err) return next(); // put custom error handling here, so far only 404
      var renderedApp = React.renderToString(this.Handler());
      var html = React.renderToStaticMarkup(Html({title: 'title', markup :renderedApp}));
      res.end(html);
    }));
  }

  //If client - init the app, on route change set up context and trigger routing actions
  app.initApp(appHandler(function(err){
    React.render(this.Handler(), document.body);
  }));




  function appHandler(renderStuff){
    return function (Handler, state){
      if(state.routes.length == 0){ //404
        return renderStuff(new Error("404"));
      }
      state.$render = function(){
        console.log("RENDER");
        state.routeAction = false;
        var doAction = appActions.withContext(state).doAction;
        React.withContext({doAction:doAction, stores: state.stores},
          renderStuff.bind({Handler:Handler, stores: state.stores}));
      }
      var urlsMatched = state.routes.map(function(route){
        return route.path;
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

}
/**/