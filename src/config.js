var PromisePiper = require("../lib/grailjs/PromisePiper");
var Resource = require('../lib/grailjs/Resource');
var Chains = require('../lib/grailjs/Chains');

PromisePiper.use('get', Resource.get);
PromisePiper.use('post', Resource.post);
PromisePiper.use('put', Resource.put)
PromisePiper.use('emit', function emit(data, context, eventName){
	context.emit(eventName, data);
	return data;
});
PromisePiper.use('log', log);



var appActions = require("../lib/grailjs/Actions")();



	//add common actions behavior
	appActions.actionsPipe

	//log before
	.log()
  // render if is rendering on client
  .then(Chains.renderIfClient)
	//do real specific actions
	.then(appActions.actionsRouter)

  // render if rendering on server
  .then(Chains.renderIfServer)	
	//catch errors after
	.catch(logErrorAction) 


  

  function log(data, context, pre){
    if(pre) console.log("***"+pre+"***")
    if(context.path){
      console.log(["Url Action, path: ", context.path, " Action Name: ", context.actionName].join(''));
      if(context.query) console.log(["            query:", JSON.stringify(context.query)].join(''));
      if(context.params) console.log(["            params:", JSON.stringify(context.params)].join(''));
    } else {
      console.log("Log:", data, context);
    }
    return data;
  }


  function logErrorAction(data, context){
    console.log("ERROR:", context.actionName, data);
    return data;
  }



// create app Actions
module.exports = appActions;