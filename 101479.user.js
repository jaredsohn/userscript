// ==UserScript==
// @name           No Portal
// @namespace      http://filthysock.com/scripts
// @description    no portal posts 
// @include        http://www.shacknews.com*
// @version       0.1
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
  jQuery("div.root").filter(function(){ return /portal/i.test( jQuery(this).text() )}).addClass("collapsed");
}

// load jQuery and execute the main function
addJQuery(main);

