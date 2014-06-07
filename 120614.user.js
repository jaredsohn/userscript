// ==UserScript==
// @name           Skip Paypal landing ads
// @version        1.1
// @description    Because there's a time and a place for hottest deals from Asia.
// @author         raina
// @namespace      http://userscripts.org/users/315152
// @include        https://*paypal.com/*cgi-bin/webscr*
// ==/UserScript==

// ==License==
// This script is licensed under Creative Commons Attribution-NonCommercial 3.0
// Unported (CC BY-NC 3.0). See http://creativecommons.org/licenses/by-nc/3.0/
// for details. In short, you are allowed to share and adapt this work for
// noncommercial purposes, provided you credit me. Contact me for licensing to
// commercial use.
// ==/License==

match = /^https:\/\/www\.paypal\.com\/(..\/)cgi-bin\/webscr\?cmd=_login-done*/;
if(match.test(window.location.href))
	window.location.href = "https://www.paypal.com/cgi-bin/webscr?cmd=_account";
