// ==UserScript==
// @name           Linezeta
// @author   	   jof4002
// @description    link to the corresponding PaD page in TIG.
// @include        http://www.thisisgame.com/linezeta/info/machine*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
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
  var x = window.location.href;
  var n = x.replace('linezeta/info/machine', 'pad/info/monster');
  var l = '<div><a href="'+n+'">[Pad Info Page]</a></div>';
  jQ('#linezeta-info-machine-detail').prepend(l);
}

// load jQuery and execute the main function
addJQuery(main);