// ==UserScript==
// @name            Orange Moderators
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.1.0
// @description     Moderator names appear orangeish, rather than blueish, in chat.
// @include         http://www.kongregate.com/games/*/*
// @exclude         http://www.kongregate.com/games/*/*/*
// @homepage        http://userscripts.org/scripts/show/72296
// ==/UserScript==
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname))
setTimeout(function() {
	window.location.assign("javascript:void((function(){var f=ChatDialogue.prototype.displayUnsanitizedMessage,t=ChatDialogue.prototype.displayUnsanitizedMessage=function(e,d,a,b,q){if(e==this._holodeck._username)return f.call(this,e,d,a,b);if(!a){a={}}if(q&&(q=q.variables).moderator&&!q.admin){a['class']?a['class']+=' mod_message':a['class']='mod_message'};return f.call(this,e,d,a,b)};t=document.createElement('span');t.update('<style>#kong_game_ui .chat_message_window .mod_message .chat_message_window_username{color:#BA6328 !important}</style>');$('gamepage_header').appendChild(t)})())");
}, 1250);