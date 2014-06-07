// ==UserScript==
// @name			VE Hide FB
// @version			0.1
// @namespace		VirtonomicsEnhanced
// @include			http://virtonomic*.*/*/main/*
// @author 			hitaishi/tantrik
// @icon			http://virtonomics.com/img/first/kubs.png
// @description		Removes FB and social references from Virtonomics
// ==/UserScript==

//hack to get access to jQuery & DOM
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
	script.addEventListener('load', function () {
		var script = document.createElement("script");
		script.textContent = "jQuery.noConflict();(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.head.appendChild(script);
}

var VE_FB = function(){
	if ((new RegExp("virtonomic*.*\/(.*)\/main\/.*")).exec(location.href) != null){
		$('div#info div.infoline:nth(2)').remove();
		$('div#share').remove();
		}
}
addJQuery(VE_FB);