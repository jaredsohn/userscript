// ==UserScript==
// @name       Klix to Sa-x
// @namespace  http://www.klix.ba
// @version    0.1
// @description  Promjena logoa na Klix.ba u Sarajevo-x.com
// @matches      http://klix.ba/*
// @matches      http://www.klix.ba/*
// @copyright  2012+, Amir Ahmic
// ==/UserScript==



// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  $('#logo').find('img').attr('src', 'http://i.imgur.com/RRZHm.png');
}

// load jQuery and execute the main function
addJQuery(main);