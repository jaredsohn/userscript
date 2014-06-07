// ==UserScript==
// @name           Diablo III Tooltip on Plurk
// @description    Diablo III Tooltip on Plurk
// @author         frank38
// @include        http://*.plurk.com/*
// @version        1.0
// ==/UserScript==

(function(){ script = document.createElement('script'); script.src = 'http://tw.battle.net/d3/static/js/tooltips.js'; script.type = 'text/javascript'; document.getElementsByTagName('head')[0].appendChild(script);})();