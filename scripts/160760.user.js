// ==UserScript==
// @name        JVC - Mod on JV Chat
// @namespace   jvcModOnJVChat
// @description Vous affiche en tant que modérateur sur JV Chat.
// @include     http://www.jeuxvideo.com/jvchat*
// @version     1
// ==/UserScript==

window.onload = function(){
	GM_addStyle('.msg .pseudo.myself a{color:#cc0000 !important;}');
};