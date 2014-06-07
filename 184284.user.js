// ==UserScript==
// @name       btcchina clean UI.
// @namespace  http://userscripts.org/users/184284
// @version    0.1
// @downloadURL http://userscripts.org/scripts/source/184284.user.js
// @updateURL http://userscripts.org/scripts/source/184284.meta.js
// @description  btcchina clean UI.
// @match      https://vip.btcchina.com/account*
// @copyright  2013+, Me
// ==/UserScript==

(function () {
	var s = document.createElement('style');
    s.innerHTML = '.announcements, .note-danger, .footer, .navbar-fixed-top { display: none; } .page-header-fixed .page-container { margin-top: 0; }';

	var body = document.querySelector('body');
	body.appendChild(s);

})();