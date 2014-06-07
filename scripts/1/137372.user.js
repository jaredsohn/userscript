// ==UserScript==
// @name          My Script
// @namespace     my-script
// @description   Blah
// @version       1.0
// @include       http://www.mediavida.com/*
// @author        Me
// ==/UserScript==

$(document).ready(function() {
		alert("je");

});

// Inject our main script
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);