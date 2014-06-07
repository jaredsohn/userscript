// ==UserScript==
// @name           Old School 
// @namespace      http://kevinpaulconnor.com
// @description    Replaces Ask Metafilter AJAX with the traditional ColdFusion links
// @include        http://ask.metafilter.com/*
// ==/UserScript==

(function () {
	var element = document.getElementById('loadposts');
	element.setAttribute("id", "no-ajax");
	element.innerHTML = "<< Older Posts"; 	
	var filepath = "http://ask.metafilter.com/index.cfm?page=";

	if (window.location.pathname == '/') {
		filepath = filepath+"2";
	} else {
		var params = window.location.search.split('=');
		params[1]++;
		filepath = filepath+params[1];
	}
	element.setAttribute("href", filepath);
}) (); //main