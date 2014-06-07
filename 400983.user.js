// ==UserScript==
// @name          News Tribune Fix
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @description   Fix News Tribune
// @include       *.thenewstribune.*

// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
    $(document).ready( function() {
        setTimeout(function() {
            // remove divs here
            $('#syncronexOverlay').hide();
            $('#syncronexOverlayContent').hide();
        }, 1000);
        
    }
)}; // end main function

addJQuery(main);



