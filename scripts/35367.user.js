// ==UserScript==
// @name            3dl.am-Skip Enter
// @namespace       blackout
// @description     Bei 3dl.am die Enterpage überspringen
// @include         http://*3dl.am/
// @exclude	    http://*3dl.am/download/*
// ==/UserScript== 
 
setTimeout("document.location.href = 'http://3dl.am/index.php#'",100);