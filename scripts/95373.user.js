// ==UserScript==
// @name Reader Filter
// @namespace
// @include *
// @author Betty
// @description 
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
	// for goalhi news
	$("#chrome-viewer-container .entry-secondary:contains('2')").css({ color: "black", background: "#E3DDC8" }); 
	
}

// load jQuery and execute the main function
addJQuery(main);
