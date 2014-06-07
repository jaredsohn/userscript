// ==UserScript==
// @name           WowheadTooltips
// @namespace      http://about:blank
// @description    Adds Wowhead tooltips to items linked in the forums.
// @include        http://illidansons.wowstead.com/*
// ==/UserScript==

var widget = document.createElement('script');
widget.src = 'http://static.wowhead.com/widgets/power.js';
widget.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(widget); 