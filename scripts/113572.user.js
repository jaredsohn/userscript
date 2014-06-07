// ==UserScript==
// @name           Facebook Side Ticker 
// @namespace      facebook
// @description    Removes the unpalatable news ticker on the right side of FB's homescreen.
// @include        *.facebook.*
// @date           9/21/2011
// @author         umfrasco
// ==/UserScript==

document.getElementById("pagelet_rhc_ticker").style.display = 'none';