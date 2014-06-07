// ==UserScript==
// @name         jQuery For Chrome (A Cross Browser Example)
// @namespace    jQueryForChromeExample
// @include      *
// @author       Erik Vergobbi Vold & Tyler G. Hicks-Wright
// @description  This userscript is meant to be an example on how to use jQuery in a userscript on Google Chrome.
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
  alert("There are " + jQ('a').length + " links on this page.");
}

// load jQuery and execute the main function
addJQuery(main);