// ==UserScript==
// @name           TwitCheckerFollowers	
// @namespace      Twit
// @include     http://twiends.com/followers

// ==/UserScript==


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function main () {
var j$ = jQuery.noConflict();
j$(document).ready( function() {
	j$('a.deleteProfile').click();
	var accecpt = window.setTimeout(function() {
		j$('a.yes').click();
	}, 5000);
	var connect = window.setTimeout(function() {
		j$('a.twitterConnect').click();
	}, 5000);
}
}

addJQuery(main);