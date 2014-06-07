// ==UserScript==
// @name            Navy Moderators
// @namespace       godlymodly@kongregate
// @author          godlymodly
// @version         1
// @description     Made by godlymodly, only changed colour. 
// @include         http://www.kongregate.com/games/*/*
// @exclude         http://www.kongregate.com/games/*/*/*
// @homepage        http://userscripts.org/scripts/show/106746
// ==/UserScript==
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname))
setTimeout(function() {
window.location.assign("javascript:(function(){var f=ChatDialogue.prototype.displayUnsanitizedMessage,t=ChatDialogue.prototype.displayUnsanitizedMessage=function(e,d,a,b,q){if(e==this._holodeck._username)return f.call(this,e,d,a,b);holodeck.chatWindow()._rooms.values().each(function(f){if(!q)q=f.user(e)});if(!a){a={}}if(q&&(q=q.variables).moderator&&!q.admin){a['class']?a['class']+=' mod_message':a['class']='mod_message'};return f.call(this,e,d,a,b)};holodeck.chatWindow()._rooms.values().each(function(f){f._chat_dialogue.displayUnsanitizedMessage=t;f._chat_dialogue._room=f});t=document.createElement('span');t.update('<style>#kong_game_ui .chat_message_window .mod_message .chat_message_window_username{color:#000080 !important}</style>');$('gamepage_header').appendChild(t)})();void(0)");
}, 1250);
