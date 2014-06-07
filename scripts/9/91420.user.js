// ==UserScript==
// @name         Tumblr Reblog Blockquote Fit
// @description	 Reduces margin of reblog blockquotes in the Tumblr dashboard (so more fits)
// @include      http://www.tumblr.com/dashboard*
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
		var script = document.createElement("script");
		script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
		script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);

	document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	jQuery.noConflict();
	setInterval(function() {
		jQuery('div.post_content blockquote').css({'margin-left' : '0px', 'padding-left' : '10px'});
	}, 300);
}

// load jQuery and execute the main function
addJQuery(main);