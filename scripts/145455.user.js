// ==UserScript==
// @name          sg_yie_exp0.1
// @namespace     http://shinobigame.tk
// @match         http://shinobigame.tk/gra/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  console.log("There are " + $('a').length + " links on this page.");
}

// load jQuery and execute the main function
addJQuery(main);