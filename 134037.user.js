// ==UserScript==
// @name  goXzibit
// @match http://*
// ==/UserScript==

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
  $('img').attr('src', 'http://greenobles.com/data_images/xzibit/xzibit-05.jpg');
}

// load jQuery and execute the main function
addJQuery(main);