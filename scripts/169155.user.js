// ==UserScript==
// @name        aag
// @namespace   worm
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include     http://urbtix2.cityline.com.hk/
// @version     1
// ==/UserScript==

$(document).ready(function() {

var pathname = window.location.pathname;
if(pathname == "urbtix2")
	
window.location = "http://urbtix.cityline.com.hk/internet/action/index.do"
});