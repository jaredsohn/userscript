// ==UserScript==
// @name membrana.ru no banners
// @description membrana.ru adds remover
// @match http://www.membrana.ru/*
// @include http://www.membrana.ru/*
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
  $('body').children('table').eq(1).hide();
  $('body').children('table').eq(7).hide();
  $('iframe').hide();
}

// load jQuery and execute the main function
addJQuery(main);