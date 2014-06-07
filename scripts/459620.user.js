// ==UserScript==
// @name       CookieClicker Auto Click Cookie and Gold Cookie
// @namespace  http://www.tummedia.com/
// @version    0.1
// @description  Auto Click Cookie and Gold Cookie
// @match      http://orteil.dashnet.org/cookieclicker/
// @copyright  2012+, BonesKung
// ==/UserScript==

if (window.top == window) {
	var steamgiftsPlus = document.createElement('script');
    var scriptUrl = 'http://pastebin.com/raw.php?i=hYkQf3fQ';
    scriptUrl = 'http://localhost/userscript/CookieClicker_AC.js';
	steamgiftsPlus.type = 'text/javascript';
	steamgiftsPlus.src = scriptUrl;
	document.body.appendChild(steamgiftsPlus);
}