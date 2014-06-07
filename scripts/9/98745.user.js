// ==UserScript==
// @name           Spixtv
// @namespace      nl.spixtv.greasemonkey
// @description    Full screen mode and massive speed up of spixtv (for firefox and chrome)
// @version 	   1.01
// @include        http://secretstory.nl/kijk-live/*
// @include        http://*.secretstory.nl/kijk-live/*
// @include        http://spixtv.nl/browsers/*
// @include        http://*.spixtv.nl/browsers/*
// ==/UserScript==

// Add jQuery
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
  
function letsJQuery() {
	if(/^\/kijk-live(.*)/.test(window.location.pathname)) { 
		var bc = $('#wrapper .BrightcoveExperience').clone();
		$('body *').remove();
		$(document.body).append(bc);
		$('html,body').css({width:'100%', height: '100%', background: '#000' });
		bc.css({width:'100%', height: '100%'});
	}
	if(/^\/browser(.*)/.test(window.location.pathname)) { 
		$('body,html,table,#container,#container iframe').css({width:'100%', height: '100%', margin: 0, padding: 0});
	}        
}

// load jQuery and execute the main function
addJQuery(letsJQuery);