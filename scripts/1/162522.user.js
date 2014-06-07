// ==UserScript==
// @name        Forge of Empires - Enable FoE to run with Adobe Flash 11.1 an Android
// @namespace   http://userscripts.org
// @description Forge of Empires, after the update on Jan 23rd 2013., requires that Adobe Flash Player V11.3 is installed on the system. This presents the problem for Android users, because only version 11.1 is available on Android. This scripts enables game to run on Adobe Flash Player V11.1 an Android.
// @include     /^http://.+?[0-9]\.forgeofempires\.com/game/index.*$/
// @grant       none
// @version     1
// ==/UserScript==
swfVersionStr = "11.1";
var baseHost    = location.hostname;
var subdomain = baseHost.replace (/^(.+?)\d?\.forgeofempires\.com$/i, "$1");
swfobject.embedSWF("http://cdn." + subdomain + ".forgeofempires.com/swf/Preloader.swf?1358930484", "content", "100%", "100%", swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);
swfobject.addDomLoadEvent(createFullBrowserFlash);