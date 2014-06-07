// ==UserScript==
// @name                500px download
// @namespace           500px download
// @description         500px download
// @match               http://500px.com/photo/*
// ==/UserScript==

function ex(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load',
	function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	},
	false);
	document.body.appendChild(script);
}

function px() {
	var i = $('#thephoto a').html();
	$('#thephoto a').remove();
	$('#thephoto').html(i);
}

ex(px);