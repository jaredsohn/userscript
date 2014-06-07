// ==UserScript==
// @name           Auto-scroll to today's TV calendar
// @namespace      http://userscripts.org/scripts/show/72902
// @description    Scrolls automatically to the current date listing on Pogdesign's TV calendar 
// @include        http://www.pogdesign.co.uk/cat/
// ==/UserScript==

document.getElementsByClassName('today')[0].scrollIntoView()