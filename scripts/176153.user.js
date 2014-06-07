// ==UserScript==
// @name       Resize Google Calendar fonts.
// @namespace  http://profiles.google.com/mmmattos
// @version    0.1
// @description  To improve browsing readability of Google Calendar  
// @match      https://www.google.com/calendar/*
// @require   https://gist.github.com/mmmattos/6264214/raw/755d33de2038afe4d82fef4bf41b3824ee25effa/jsLib.js
// @copyright  2013, Miguel Mattos
// ==/UserScript==

addCustomStyle('.mv-event-container { font-weight: bold; font-size: 11px ! important; }');
