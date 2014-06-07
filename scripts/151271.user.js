// ==UserScript==
// @name         Imgur Homepage fixer.
// @namespace    imgurHomespaceFixer
// @include      http://imgur.com/
// @include      http://www.imgur.com/
// @author       Megadrive
// @description  Removes everything except the upload form on imgur.com
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	if( typeof jQuery == 'undefined' ){
		var script = document.createElement("script");
		script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
		script.addEventListener('load', function() {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	}
}

function main() {
	$('#content .left').remove();
	$('#content .right > *').remove();
	$('div.tipsy').hide();

	$('#upload-global').show();
	$('#upload-global').css({
		'width': '480px',
		'margin-left': 'auto',
		'margin-right': 'auto',
		'padding-top:': '25px',
	});

}

addJQuery(main);
