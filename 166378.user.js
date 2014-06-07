// ==UserScript==
// @name        Link to jisho.org/kanji/details/
// @namespace   http://kanji.koohii.com/
// @description Adds a link on kanjis
// @include     http://kanji.koohii.com/study/*
// @include     http://kanji.koohii.com/review/*

// @version     1
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
// From http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
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
  jQ('div.kanji span.cj-k').wrapInner('<a style="color: black; text-decoration: none;" title="Study this kanji on Jisho.org" target="_blank" href="http://jisho.org/kanji/details/' + jQ('div.kanji span.cj-k').text() + '" />');
}

// load jQuery and execute the main function
addJQuery(main);
