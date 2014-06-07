// ==UserScript==
// @name        Otkrivanje_Komentara_SD
// @namespace   SD
// @description Ova skripta otkriva komentare na stranicama SD
// @version     1
// ==/UserScript==

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


function main() {
  $('.comment').css('display', 'block');
}
addJQuery(main);