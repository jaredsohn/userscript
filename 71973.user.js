// ==UserScript==
// @name           Jango Popup Blocker
// @namespace      http://fanrastic.com/jangopopupblocker
// @description    Jango Popup Blocker
// @include        http://www.jango.com/profiles/*?l=0
// ==/UserScript==

setTimeout("window.top.disablePopup = function(){window.top.frames[1].popmedia = function(){return false;};setTimeout('disablePopup()', 250);};window.top.disablePopup();", 5000);