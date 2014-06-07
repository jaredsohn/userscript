// ==UserScript==
// @name		Auto-Tick "trace message" checkbox on vBulletin boards
// @description		Tick the checkbox to trace the private message by default on vBulletin boards
// @version		2014-02-23
// @author		Mæstro, in name of the internet
// @namespace		https://userscripts.org/users/maestro
// @downloadURL		https://userscripts.org/scripts/source/396562.user.js
// @updateURL		https://userscripts.org/scripts/source/396562.meta.js
// @icon		https://s3.amazonaws.com/uso_ss/icon/396562/large.png
// @include		*/private.php?do=*
// @copyright		Public Domain, free for everyone.
// ==/UserScript==

if(document.getElementById('cb_receipt'))
	document.getElementById('cb_receipt').checked = true;