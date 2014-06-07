// ==UserScript==
// @name            Green Moderators
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.0.1
// @description     Moderator names appear green, rather than blue, in chat.
// @include         http://www.kongregate.com/games/*/*
// @exclude         http://www.kongregate.com/games/*/*/*
// @homepage        http://userscripts.org/scripts/show/72296
// ==/UserScript==
if (window.location.pathname.match(/\/games\/[^\/]\/[^\/]\/.+/)) {
	// we're not on the right page, kill it. throwing an error would be bad, since all of my scripts will use this
} else
setTimeout(function() {
window.location.assign("javascript:(function(){var f=ChatDialogue.prototype.displayUnsanitizedMessage,t=ChatDialogue.prototype.displayUnsanitizedMessage=function(e,d,a,b,q){holodeck.chatWindow()._rooms.values().each(function(f){if(!q)q=f.user(e)});if(!a){a={}}if(q&&(q=q.variables).moderator&&!q.admin){a['class']?a['class']+=' mod_message':a['class']='mod_message'};return f.call(this,e,d,a,b)};holodeck.chatWindow()._rooms.values().each(function(f){f._chat_dialogue.displayUnsanitizedMessage=t;f._chat_dialogue._room=f});t=document.createElement('span');t.update('<style>#kong_game_ui .chat_message_window .mod_message .chat_message_window_username{color:#003300 !important}</style>');$('gamepage_header').appendChild(t)})();void(0)");
}, 1250);