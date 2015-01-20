var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var DocumentTitle = require('react-document-title');

var Promise = require('es6-promise').Promise;
var RouteHandler = require('../lib/grailjs/RouteHandler');
var ReactRouterAdapter = require("../lib/grailjs/ReactRouterAdapter");


var appActions = require("./config");



require("./styles/main.scss");
//require('bootstrap-sass/assets/stylesheets/_bootstrap.scss');
var AppComponent = require('./components/app');

var routes = (
  <Route path="/" handler={AppComponent}>
    {require('./modules/events/events.js')}
  </Route>
);


//configure APP
var appCfg = {
  router: ReactRouterAdapter.routerAdapter(routes)
};

var createApp = require("../lib/grailjs/RouteHandler");

var app = createApp(appCfg);


appStart();

var Html = require('./components/layout');

//*********************************************************
// this will be hidden in framework
// inject app, routes, appActions, Html
function appStart(){
  var parsedRoutes = [];
  // parse routes for
  ReactRouterAdapter.parseActions(routes).forEach(function(route){
    if(route.stores) {
      route.stores.forEach(function(store){
        app.use(store);
      });
    }
    appActions.actionsRouter.create(route.path, route.action);
    parsedRoutes.push(route.path);
  })

  module.exports =  function(req, res, next){
    // render as HTML
    app.renderUrl(req, appHandler(function(err){
      if(err) return next(); // put custom error handling here, so far only 404
      var title  = DocumentTitle.rewind();
      var renderedApp = React.renderToString(this.Handler());
      var html = React.renderToStaticMarkup(React.createFactory(Html)({title: title, markup :renderedApp}));
      res.end('<!DOCTYPE html>' + html);
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
      console.log(urlsMatched)
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