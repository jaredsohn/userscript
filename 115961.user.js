// ==UserScript==
// @name         Clear Text Boxes for Flickr Uploading Page
// @namespace    flickrClearText
// @include      http://www.flickr.com/*
// @match        http://www.flickr.com/*
// @author       Eric Faris
// @description  This user script is meant to clear all textboxes on the Flickr upload pages.  I am trying to not have the crappy image names saved.
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  $(':text').val('');
}

// load jQuery and execute the main function
addJQuery(main);