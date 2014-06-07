// ==UserScript==
// @name           WowheadTooltips
// @namespace      http://about:blank
// @description    Adds Wowhead tooltips to items linked in the forums.
// @include        http://forums.worldofwarcraft.com/thread.html*
// @include        http://forums.wow-europe.com/thread.html*
// ==/UserScript==

var widget = document.createElement('script');
widget.src = 'http://www.wowhead.com/widgets/power.js?lol';
widget.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(widget); 