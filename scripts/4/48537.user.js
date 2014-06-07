// ==UserScript==
// @name           Facebook Timelock
// @namespace      Aaron Russell
// @include        http://www.facebook.com/home.php
// ==/UserScript==

//Time is in hours counting from midnight
var start = "0"
var end = "8"
var message = "You're Too Drunk"
var redirect = "http://blackicesp41n.elbruto.es"
var d=new Date();
var time=d.getHours();
window.location=redirect;