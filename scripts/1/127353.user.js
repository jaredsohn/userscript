// ==UserScript==
// @name        CorseraStopThatDamnRefresh
// @description Stop Refreshing the page
// @include     http://corriere.*/*
// @include     http://*.corriere.*/*
// @version     0.1
// @author      NadiaN
// ==/UserScript==

function doNothing() {
		}

setTimeout(doNothing, 3600000);
setTimeout('location.href = "http://www.corriere.it"',3600000);
