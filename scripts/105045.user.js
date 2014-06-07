// ==UserScript==
// @name 	nirokwar update
// @namespace 	http://userscripts.org/scripts/show/105045
// @description nirokwar update
// @version     1.5
// @date 	2012-03-29
// @include       http://nirokwar.com/*
// @include       http://*.nirokwar.com/*
// @version       29 Mar 2012
// @run-at document-start
// ==/UserScript==

var t = new Array(4);
t[0] = "days";
t[1] = "hours";
t[2] = "min";
t[3] = "sec";
CountDiff('Mar 29, 2012 09:00:00' , 'Mar 29, 2012 09:00:00' ,'bxx0', t); 