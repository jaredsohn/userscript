// ==UserScript==
// @name           Amazon Registry Total
// @namespace      http://www.amazon.com
// @description    Amazon Registry Total
// @include        http://www.amazon.com/gp/registry/*
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  var result = 0; 
  jQuery.each(jQuery('.wlPriceBold'), function(i,l) {
    var text = jQuery(this).text();
    result+=Math.round(100*parseFloat(text.substring(1)));
  });

  var header = jQuery('td.bRHeaderOrange')
  header.text(header.text() + ' $' + (result/100));
}

// load jQuery and execute the main function
addJQuery(main);
