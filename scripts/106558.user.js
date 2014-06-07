// ==UserScript==
// @id             pownce_plus
// @name           Pownce+
// @description    A Pownce inspired theme for Google+
// @include        https://plus.google.com/
// @include        https://plus.google.com/stream
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        http://sizzlemctwizzle.com/updater.php?id=106558
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  var theme = 'pownce';
  $('head').append('<link rel="stylesheet" href="http://daytonnolan.com/dotjs/plus.google.com/' + theme + '.css" type="text/css"/>');
}

// load jQuery and execute the main function
addJQuery(main);