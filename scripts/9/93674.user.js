// ==UserScript==   
// @name            WhisperCatch
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.1.0
// @description     Catches missed whispers (such as /q) and sends them as normal
// @include         http://www.kongregate.com/games/*/*
// @homepage        
// ==/UserScript==  
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname)) {
setTimeout(function() {
	var addProxy = function(q){window.location.assign("javascript:void(document.observe('holodeck:ready',function(){holodeck.addChatCommand('"+q+"',function(h,i){h.activeDialogue().kongBotMessage('Caught /"+q+"');return h.sendWhisper(h,i)})}));");}
	addProxy("q");addProxy("e");addProxy("s");addProxy("a");
	addProxy("2");addProxy("d");addProxy("3");
}, 1250);
}