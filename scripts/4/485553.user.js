// ==UserScript==
// @name       EASux by CW
// @namespace  http://celestial.cf/easux/
// @version    0.1
// @description  Fixin' Origin design since 2014
// @match      https://*.origin.com/*
// @match      http://*.origin.com/*
// @copyright  2014+, CelestialWalrus
// ==/UserScript==

//<ul><li class="border-left border-right">EASux v 0.4 by CW</li></ul>

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
  jQ("#wrapper .gus-avatar").first().after('<ul><li class="border-left border-right">EASux by CW</li></ul>');
  jQ("#merchCarousel img").attr("src", "http://i.imgur.com/eCwDABv.png");
}

// load jQuery and execute the main function
addJQuery(main);