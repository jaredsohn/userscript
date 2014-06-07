// ==UserScript==
// @name       Tumblr Search Tweak
// @description	Tweak so search redirects to /tagged instead of new /search
// @namespace  http://www.noidea.com/
// @version    0.1
// @match      http://www.tumblr.com/*
// @copyright  2013, Andrew M
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  // Note, jQ replaces $ to avoid conflicts.

  
  jQ("#search_form").submit( function ( event ) {
	
	window.location = "/tagged/" + jQ("#search_query").val();
  
	event.preventDefault();
  });
}

// load jQuery and execute the main function
addJQuery(main);
