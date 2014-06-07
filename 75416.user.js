// ==UserScript==   
// @name            ReplyEnhancement
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.1.0
// @description     When you type /r or /reply it gets replace with /w name message. This version doesn't replace /reload like ventero's.
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/75416
// ==/UserScript==  
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname))
setTimeout(function() {
	javascript:void(window.location.assign("javascript:void(document.observe('holodeck:ready',function(){var p=ChatDialogue.prototype,Q=p.initialize,q=p.receivedPrivateMessage,d=function(){var b=this._input_node.value,c=/^\\/r(?:eply)?(\\s+[\s\S]*)/i;c.test(b)?this.setInput(b.replace(c, (this.lastWhisper?'/w '+this.lastWhisper:'/w')+'$1') ):0;};holodeck.chatWindow()._rooms.values().each(function(T){(T=T._chat_dialogue)._input_node.observe('keyup',d.bind(T));T._input_node.observe('focus',d.bind(T))});p.initialize=function(){ Q.apply(this,arguments);this._input_node.observe('keyup',d.bind(this));this._input_node.observe('focus',d.bind(this))};p.receivedPrivateMessage=function(a){if(a.data.success){this.lastWhisper=a.data.from};q.apply(this,arguments)}}));"));
}, 1250);
