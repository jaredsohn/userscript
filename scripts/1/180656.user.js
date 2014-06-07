// ==UserScript==
// @name       Tumblr Tag Links Self
// @namespace  http://www.noidea.com/
// @version    0.3
// @match      http://www.tumblr.com/*
// @copyright  2013, Andrew Murphy
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
  alert(jQ(".tracked_tag a").length);
  jQ(".tracked_tag a").attr('target', '_self');
}

// load jQuery and execute the main function
addJQuery(main);
