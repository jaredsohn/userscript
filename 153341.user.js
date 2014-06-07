// ==UserScript==
// @name         fuck-google-tracking
// @namespace    google.com
// @include      *://www.google.com.hk/*
// @author       filod 
// @description  nothing
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://lib.sinaapp.com/js/jquery/1.8/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
// the guts of this userscript
function main() {
  $('a[onmousedown]').attr('onmousedown',null)
}
// load jQuery and execute the main function
addJQuery(main);