// ==UserScript==
// @name           SmartScreen Skipper
// @namespace      smartscreen_skipper
// @description	   Auto-redirect Microsoft SmartScreen's links
// @include        http://link.smartscreen.live.com/?l=*
// @author         Luis Felipe Zaguini Nunes Ferreira
// @email	   luisfelipez@live.com
// ==/UserScript==

window.location = unescape(location.href.match(/\?l=([^\&]+)/)[1]);