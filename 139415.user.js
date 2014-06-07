// ==UserScript==
// @name           New NY Times Paywall
// @description    Removes the NY Times pay wall.
// @include        http*://nytimes.com/*
// @include        http*://*.nytimes.com/*
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

function main() {
// Code taken from http://news.ycombinator.com/item?id=2355757
// Prototype is already installed on NYTimes pages, so I'll use that:
$('overlay').hide();
$('gatewayCreative').hide();
$(document.body).setStyle( { overflow:'scroll' } );
}

// load jQuery and execute the main function
addJQuery(main);