// ==UserScript==
// @name       Apartment Therapy Enhanced Tour Navigation
// @namespace
// @version    0.2
// @description  Allows you to browse Apartment Therapy Tours using the left and right key. For Camille.
// @match      http://*.apartmenttherapy.com/*
// @match      http://www.apartmenttherapy.com/*
// @match      http://apartmenttherapy.com/*
// @copyright  MIT License
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
  // Note, jQ replaces $ to avoid conflicts.
  jQ(document).keydown(function(e){
    var keyCode = e.keyCode || e.which,
    arrow = {left: 37, up: 38, right: 39, down: 40 };

    switch (keyCode) {
      case arrow.left:
      var link = jQ('a.prev');
    //check to see if link exists
    if (link[0].href) {
      link[0].click();
      window.location.href = link[0].attr("href");
    }
    break;
    case arrow.up:
      //..
      break;
      case arrow.right:
      var link = jQ('a.next');
    //check to see if link exists
    if (link[0].href) {
      link[0].click();
      window.location.href = link[0].attr("href");
    }
    break;
    case arrow.down:
      //..
      break;
    }
  });
}

// load jQuery and execute the main function
addJQuery(main);