// ==UserScript==
// @name           	FoundURLzee
// @namespace      	da-fi.de
// @copyright         	Daniel Fischer <dafi@da-fi.de>
// @license             Creative Commons Attribution-NonCommercial-ShareAlike 3.0, http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version		   	1.1
// @include        	http*://www.munzee.com/m/*
// @exclude			http*://www.munzee.com/m/*/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
//
//
// Changelog:		1.1		- site layout was changed by munzee.com
//
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// jQuery workaround for Chrome
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


// Magic
function magic() {
	// prepare box
	$("#body-box div.clear:last").each(function() {
		$(this).addClass("content-box");
		$(this).removeClass("clear");
		$(this).html("<p id='click'><span style='font-weight:bold;'>found URLs </span>(click to show/hide)</p><div id='foundURLs'></div>");
	});
	
	// add animation
	$("#foundURLs").hide();
	$('#click').click(function() {
		$('#foundURLs').fadeToggle("slow", "swing");
	});
	
	// search for URLs
	$("#body-box-content h1:contains('Captured Munzees') + div.content-box > a").each(function() {
		$("#foundURLs").append($(this).attr("href") + "<br/>");
	});
}


// load jQuery and execute
addJQuery(magic);