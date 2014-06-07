// ==UserScript==
// @name           Collect Doodles
// @namespace      http://userscripts.org/users/useridnumber
// @include        http://vipsociety.com/*
// ==/UserScript==
var mylink = document.getElementById("doodle_button");
var evt = document.createEvent("HTMLEvents");
evt.initEvent("click", true, true);
mylink.dispatchEvent(evt);
