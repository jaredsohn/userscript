// ==UserScript==
// @id             mlgqvfull@majorleaguegaming.com
// @name           MLG QV Full
// @version        1.0
// @namespace      majorleaguegaming.com
// @author         sleepyxdude
// @description    
// @include        http://pro.majorleaguegaming.com/live/quad_view
// @run-at         document-end
// ==/UserScript==

var header = document.getElementById('header');
header.parentNode.removeChild(header);