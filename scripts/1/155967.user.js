// ==UserScript==
// @name        KS - Corleone Mafia
// @namespace   Stripes
// @include     http://kredu.homeip.net/corleonemafia/?p=crime*
// @version     1
// ==/UserScript==

if ( window.location.href != "http://kredu.homeip.net/corleonemafia/?p=crime" ) window.location.href = "http://kredu.homeip.net/corleonemafia/?p=crime";
if ( document.getElementsByTagName('input')[5] ) document.getElementsByTagName('input')[5].click();