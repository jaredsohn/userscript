// ==UserScript==
// @name        Forge of Empires - Enable FoE to run with Adobe Flash 11.2
// @namespace   http://userscripts.org
// @description Forge of Empires, after the update on Jan 23rd 2013., requires that Adobe Flash Player V11.3 is installed on the system. This presents the problem mostly for Linux users, becouse only version 11.2 is available on Linux. This scripts enables game to run on Adobe Flash Player V11.2.
// @include     /^http://en[1-9]\.forgeofempires\.com/game/index.*$/
// @grant       none
// @version     1
// ==/UserScript==
swfVersionStr = "11.2";
swfobject.embedSWF("http://cdn.en.forgeofempires.com/swf/Preloader.swf?1358930484", "content", "100%", "100%", swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);
swfobject.addDomLoadEvent(createFullBrowserFlash);
