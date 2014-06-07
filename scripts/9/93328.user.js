// ==UserScript==
// @name            LongMessages
// @namespace       skyboy@kongregate
// @version         1.1.0
// @description     When a chat message is > 250 chars, the first 250 are sent and the remainder are put back in the input box
// @author          skyboy
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/93328
// ==/UserScript==
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname)) {
setTimeout(function() {
	javascript:void(window.location.assign("javascript:void(document.observe('holodeck:ready',function(){var sv=function(v){holodeck.activeDialogue()._input_node.value = v};holodeck.addOutgoingMessageFilter(function(m,n) {if (m.length) {m = m.replace(/[\\r\\n]+/,' ').replace(/\\s+$/,'').replace(/^\\s+/, '').replace(/\\s{2,}/, ' ');if (m.length > 250) {setTimeout(sv, 0, m.substr(250));m = m.substring(0, 250);}}n(m, n);})}));"));
}, 1250);
}