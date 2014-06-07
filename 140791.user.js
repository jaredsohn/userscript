// ==UserScript==
// @name        NeoGAF : Remove "This Message Is Hidden"
// @namespace   hateradio)))
// @description Completely hides messages from users whom you've added to your ignore list.
// @include     http://*neogaf.com/forum/showthread.php?p=*
// @include     http://*neogaf.net/forum/showthread.php?p=*
// @downloadURL https://userscripts.org/scripts/source/140791.user.js
// @updateURL   https://userscripts.org/scripts/source/140791.meta.js
// @version     2.0
// @grant       none
// ==/UserScript==

(function () {
	'use strict';
	var c = document.createElement('style');
	c.type = 'text/css';
	c.textContent = '.postbit.ignored { display: none; }';
	document.body.appendChild(c);
}());