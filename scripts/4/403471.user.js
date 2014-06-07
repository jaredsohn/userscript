// ==UserScript==
// @name        Europolitics.info centred
// @namespace   http://userscripts.org/users/488660
// @include     http://www.europolitics.info/*
// @version     1.0
// @grant       none
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {


    $( document ).ready(function() {

        
    
    $("#main").css("margin","auto");

    
    });

}
                       
// load jQuery and execute the main function
addJQuery(main);