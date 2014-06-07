// ==UserScript==
// @name        Accommodation RoomRent Page
// @namespace   Ads
// @description Accommodation RoomRent Page
// @include     http://www.roomrent.ph/*
// @version     1
// @grant       none
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function ads() {
    jQ(document).ready(function(){
        var title    = jQ('.detail h1').text();
        var category = ""; // parse
		var budget   = jQ('.price').text();
		var desc     = jQ('.detail > p').html();
		var contact  = jQ('.contact > p').html();
		var address  = jQ('.detail-data > p:nth-child(2) span').text();
		var website  = ""; //parse
		var source   = document.URL;
        
    });
}

addJQuery(ads);