
// ==UserScript==
// @name         Rainymood
// @namespace    Rainymood
// @include        http://*.rainymood.com/*
// @match          http://*.rainymood.com/*
// @author       Jānis Peisenieks
// @description  Removes all the clutter from Rainymood.com.
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
  jQ('.fb_iframe_widget, iframe').remove();

}

// load jQuery and execute the main function
addJQuery(main);
