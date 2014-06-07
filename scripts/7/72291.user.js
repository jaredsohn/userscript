// ==UserScript==
// @name            ChatBug Fix: Scrolling
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.0.0
// @description     Pevents scrolling of kongregate chat from freazing at a certain point.
// @include         http://www.kongregate.com/games/*/*
// @exclude         http://www.kongregate.com/games/*/*/*
// @homepage        http://userscripts.org/scripts/show/72291
// ==/UserScript==
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname))
setTimeout(function() {
window.location.assign("javascript:(function(){var T=holodeck.activeDialogue();(T.scrollToBottom=(ChatDialogue.prototype.scrollToBottom=function(){var T=this._message_window_node;T.scrollTop=T.scrollHeight+20})).call(T);})();void(0);");
}, 1250);