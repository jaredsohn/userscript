// ==UserScript==
// @name           Open Seats Calculator
// @namespace      http://userscripts.org/users/24893
// @include        http://www.ticketstage.com/ts-bin/f.wk?ts.seat.selection.gen*
// ==/UserScript==

alert("Open seats: " + document.forms[0].elements.length);