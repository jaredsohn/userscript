// ==UserScript==
// @name           Gmail Check Sender Email
// @namespace      http://userscripts.org/scripts/show/9904
// @description    Make sure you send your emails from the desired address
// @author         2007civicsi@gmail.com
// @include        http*://mail.google.com/*
// ==/UserScript==

var whatEmail = document.getElementById("1f2t").value;
var button = document.getElementById("1f26");
button.setAttribute("onclick","alert('hi')");