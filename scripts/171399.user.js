// ==UserScript==
// @name        HKTic
// @namespace   AEG
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include     www.aegpromotion.com/cheer2014/‎ServerBusy.htm
// @version     1.1
// ==/UserScript==

$(document).ready(function() {

var pathname = window.location.pathname;
if(pathname == "/cheer2014/‎ServerBusy.htm")
	
window.location = "www.aegpromotion.com/cheer2014/‎"
});