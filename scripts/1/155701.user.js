// ==UserScript==
// @name        Cars - Corleone Mafia
// @namespace   Stripes
// @include     http://kredu.homeip.net/corleonemafia/?p=carnick*
// @version     1
// ==/UserScript==

if (window.location.href != "http://kredu.homeip.net/corleonemafia/?p=carnick") window.location.href = "http://kredu.homeip.net/corleonemafia/?p=carnick";
else document.getElementsByTagName("input")[3].click();