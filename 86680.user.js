// ==UserScript==
// @name          Remove Photo Memories
// @version       0.1
// @description   Removes the 'Photo Memories' section on Facebook.
// @author 	  msena
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// ==/UserScript==
var loc;
var oldLoc = "";
window.setInterval(function() {
	var loc = window.location.pathname;
	if(oldLoc != loc) {
		window.setInterval(10);
		oldLoc = loc;
	} else {
		window.setInterval(500);
	}
	
	if(loc.indexOf("event.php") >= 0) {
	        var el = document.getElementById("rightCol");
		if (el) {
		        el.style.display = "none";
		}
	} 
}, 10);
