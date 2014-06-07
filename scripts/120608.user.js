// ==UserScript==
// @name           	GoogleQRzee
// @namespace      	dafi
// @copyright         	Daniel Fischer <dafi@da-fi.de>
// @license             Creative Commons Attribution-NonCommercial-ShareAlike 3.0, http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version		   	0.91
// @include        	http*://www.munzee.com/user/undeployed
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
//
//
// Changelog:		0.91	- Support for Google Chrome added
//
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// jQuery workaround for Chrome
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


// Magic
function magic() {

	// Size of QR Code in pixels
	size = 125;

	$("form input").each(function() {
		$(this).before("<img src='https://chart.googleapis.com/chart?cht=qr&chs=" + size + "x" + size + "&chld=H|1&chl=" + $(this).attr("value") + "'/>");
	});
}


// load jQuery and execute
addJQuery(magic);