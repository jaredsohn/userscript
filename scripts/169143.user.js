// ==UserScript==
// @name        aag
// @namespace   worm
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include     http://www.cityline.com/eng/busy.html
// @version     1
// ==/UserScript==

$(document).ready(function() {

var pathname = window.location.pathname;
if(pathname == "/eng/busy.html")
	
window.location = "http://venue.cityline.com/utsvInternet/internet/action/event.do?actionFwd=eventDetail&event=5018"
});