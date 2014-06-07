// ==UserScript==
// @name           Action Queue
// @namespace      sycdan
// @description    Offers a method of queuing remote document requests so that they happen synchronously.
// @version        0.03
// @history        0.03 Added the ability set the done() callback at instantiation, by passing the "done" parameter to the constuctor; removed a bit of legacy code and added more comments
// @history        0.02 Added done() method, which can be set as a callback function and will be run when all actions are complete
// @history        0.01 Initial build
// ==/UserScript==

function ActionQueue(done){
	var me=this;
	var queue=[];
	var idx=-1;
	
	//Adds an action to the queue
	//Param(func): the action to run (must be a function)
	//Param(desc): an optional string describing the action, to be shown by the busy(true) method
	me.add=function(func,desc){
		if(typeof(func)!='function'){
			alert('Error in ActionQueue: '+func+'" is not a function!');
			return;
		}
		if(typeof(desc)=='undefined')
			desc='';
		
		//Add the action to the queue, then run it if it's the first
		queue.push({func:func,desc:desc==''?'':' ('+desc+')'});
		if(queue.length==1)
			me.next();
	};
	
	//Advances to the next action in the queue
	me.next=function(){
		//If the next index is outside the queue, assume that we've finished processing the queue and clear it
		if(++idx>=queue.length){
			queue=[];
			idx=-1;
			if(typeof(me.done)=='function')me.done();
		//Otherwise, run the next action
		}else
			queue[idx].func();
	};
	
	//Returns true if an action is in progress, otherwise returns false
	//Param(notify): if true, will alert if an action is in progress
	me.busy=function(notify){
		if(idx>=0){
			if(notify)
				alert('Please wait for your current action'+queue[idx].desc+' to finish!');
			return true;
		}
		return false;
	};
	
	//Callback function that will be run when all actions are complete
	me.done=typeof(done)=='function'?done:function(){};
};