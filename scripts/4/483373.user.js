// ==UserScript==
// @name        Tagi Abo-Remover
// @namespace   wichu
// @include     http://www.tagesanzeiger.ch/*
// @version     1
// @grant       none
// ==/UserScript==



// a function that loads jQuery and calls a callback function when jQuery has finished loading
/*
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
*/

// the guts of this userscript
//function removeAboOverlay() {
    document.addEventListener("DOMSubtreeModified", function(e) {
        $('#overlay_wrap').hide();
    });
//}

// load jQuery and execute the main function
//addJQuery(removeAboOverlay);