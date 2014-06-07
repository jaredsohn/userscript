// ==UserScript==
// @name        Accommodation iProperty Page
// @namespace   Ads
// @include     http://www.iproperty.com.ph/propertylisting/*
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
        var title    = jQ('.my-iproptext-header').text();
        var category = ""; // parse
		var budget   = jQ('.text_price').text();
		var desc     = jQ('.details-div').text();
		var contact  = jQ('.agent_container .myiprop_text').text() + "<br>" + jQ('.agent_container .agent_contact_text').text();
		var address  = jQ('.').text(); // loop li
		var website  = ""; //parse
		var source   = document.URL;
		
		console.('title: ' + title);
    });
}