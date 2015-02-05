var PromisePiper = require("../lib/grailjs/PromisePiper");
var Resource = require('../lib/grailjs/Resource');
var Chains = require('../lib/grailjs/Chains');
tv4 = require('tv4');

PromisePiper.use('get', Resource.get);
PromisePiper.use('post', Resource.post);
PromisePiper.use('put', Resource.put)
PromisePiper.use('emit', function emit(data, context, eventName){
  console.log("emit");
	context.emit(eventName, data);
	return data;
});
PromisePiper.use('catchEmit', function emit(data, context, eventName){
  context.emit(eventName, data);
  return data;
}, true);

PromisePiper.use('log', log);


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

PromisePiper.use('validate', function emit(data, context, schema){
  var result = tv4.validateMultiple(data, schema);
  if(!result.valid) return Promise.reject(result.errors);
  return data;
});

PromisePiper.use('transitionTo', function transitionTo(data, context, to, propsOfData){
  console.log("transitionTo");
  propsOfData = propsOfData || {};
  var sendProps = Object.keys(propsOfData).reduce(function(res, prop){
    res[prop] = data[propsOfData[prop]]
    return res;
  }, {});
  context.app.transitionTo(to, sendProps);
  return data;
});

