// ==UserScript==   
// @name            ClearCommand
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.1.0
// @description     Adds a /clear command to chat to clear chat messages.
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/94190
// ==/UserScript==  
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname)) {
setTimeout(function() {
	javascript:void(window.location.assign("javascript:void(document.observe('holodeck:ready',function(){holodeck.addChatCommand('clear', function(){holodeck.activeDialogue().clear(); return false});$$('select.chat_actions_dropdown').each(function(e){if(!e.innerHTML.include('clear_chat'))e.insert('<option value=\"clear_chat\" class=\"action hasLayout\" onclick=\"holodeck.activeDialogue().clear()\">Clear chat</option>')});$$('#chat_actions_dropdown_template').each(function(e){e.innerHTML=e.innerHTML.replace(/(<\\/select>)/i,'<option value=\"clear_chat\" class=\"action hasLayout\" onclick=\"holodeck.activeDialogue().clear()\">Clear chat</option>$1')});}));"));
}, 1250);
}