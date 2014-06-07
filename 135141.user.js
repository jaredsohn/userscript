// ==UserScript==
// @name gmail-b2b-noeltstyle-sizes
// @description Element style fixed heights remover for the gmail-b2b userstyle
// @match http://mail.google.com/*
// @match https://mail.google.com/*
// ==/UserScript==
(function() {

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
	script.addEventListener('load', function() {
	var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	window.setInterval(function(){$('[style]').filter(function(){return /height/.test($(this).attr('style'))}).not('.nH.nn').css('height','')}, 1000);
}

// load jQuery and execute the main function
addJQuery(main);

})();