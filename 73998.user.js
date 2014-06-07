// ==UserScript==   
// @name            MessageHistory
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.1.0
// @description     Stores the messages you send and allows you to recall them with ctrl+up and ctrl+down; Your current message is at the end of ctrl+down if you don't start typing.
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/73998
// ==/UserScript==  
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname))
setTimeout(function() {
	window.location.assign("javascript:void(document.observe('holodeck:ready',function(Q){(Q=ChatDialogue.prototype).onKeyUp=function(a){if (!this.msgs){this.msgs=[];this.cInx=0}if(a.ctrlKey||a.keyCode==17){switch(a.keyCode){case 38:if(!this.oldMsg&&this.cInx==0)this.oldMsg=this.value;if(this.cInx<this.msgs.length)this.value=this.msgs[this.msgs.length-(++this.cInx)];return;case 40:if(this.cInx>1){this.value=this.msgs[this.msgs.length-(--this.cInx)];}else{this.value=this.oldMsg||''};case 17:return;}}this.oldMsg='';this.cInx=0}; ChatDialogue.prototype.onKeyDown=function(a){if(a.keyCode==13&&this.value.trim()!=''){if(!this.msgs){this.msgs=[];this.cInx=0}this.msgs.push(this.value);this.oldMsg='';this.cInx=0}};var q=ChatDialogue.prototype.initialize;ChatDialogue.prototype.initialize=function(){q.apply(this, arguments);var b=this._input_node;b.observe('keyup',this.onKeyUp);b.observe('keydown',this.onKeyDown)};holodeck.chatWindow()._rooms.each(function(T){T=T.value._chat_dialogue._input_node.observe('keyup',Q.onKeyUp).observe('keydown',Q.onKeyDown)})}))");
}, 1250);