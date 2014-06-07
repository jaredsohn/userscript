// Macro Speedup
// Copyright (c) 2009, fatalwanderer
//
// --------------------------------------------------------------------
// ==UserScript==
// @name	Macro Speedup
// @version	0.0.1
// @copyright	Â©2009, fatalwanderer
// ==/UserScript==

var stopLoad;

function stopPageLoad() {
stopLoad += 1;
if(stopLoad > 1) {
location.href = "";
}
setTimeout("stopPageLoad()", 0100)
}