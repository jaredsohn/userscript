// ==UserScript==
// @name          No Pop-Ups, only new tabs
// @namespace     nopopups
// @author        Owyn
// @version       1.1
// @description   Turns off the ability to open new windows, opens tabs instead
// @run-at        document-start
// @grant         unsafeWindow
// @match         http://*/*
// @match         https://*/*
// @match         file://*/*
// ==/UserScript==

if (typeof unsafeWindow === "undefined"){unsafeWindow = window;}
delete unsafeWindow.window.open;
unsafeWindow.window.Ropen = unsafeWindow.window.open; // FireFox may suck here
unsafeWindow.window.__proto__.open= function (a,b,c)
{
	unsafeWindow.window.Ropen(a,b);
}
