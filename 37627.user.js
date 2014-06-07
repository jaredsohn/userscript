// ==UserScript==
// @name           Ultimate Guitar Download Button To Link
// @namespace      http://userscripts.org/users/23652
// @description    Turns download buttons into links
// @include        http://*.ultimate-guitar.com/tabs/*/*_guitar_pro.htm*
// @include        http://*.ultimate-guitar.com/tabs/*/*_power_tab.htm*
// @include        http://tabs.ultimate-guitar.com/*/*/*_guitar_pro*
// @include        http://tabs.ultimate-guitar.com/*/*/*_power_tab*
// @copyright      JoeSimmons
// @version        1.0.104
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://usocheckup.dune.net/37627.js
// @grant          GM_getValue
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// ==/UserScript==

var sub = document.evaluate("//form[@name='tab_download']//input[contains(@value, 'Download') and contains(@value,'Tab')]", document, null, 9, null).singleNodeValue,
	f = document.evaluate("//form[@name='tab_download']", document, null, 9, null).singleNodeValue,
	id = document.evaluate(".//input[@name='tab_id' and @value]", f, null, 9, null).singleNodeValue,
	a = document.createElement("a");

if(!sub || !f || !id) return;

a.setAttribute('href', f.action + "?tab_id=" + id.value);
a.textContent = sub.value.toString();
a.setAttribute('class', 'gray verd bunl');
a.setAttribute('style', 'font-size: 18px;');
sub.parentNode.replaceChild(a, sub);