// ==UserScript==
// @name          YouTube - hide social channels from subscriptions
// @include       http://www.youtube.com/*
// @author        Lev Toger
// ==/UserScript==

/*
1. jQuery that will work in Greasemonkey script on Chrome:
 http://stackoverflow.com/questions/3032261/any-working-greasemonkey-script-with-jquery-that-works-in-google-chrome

2. CSS selector found with:
 http://www.selectorgadget.com/
*/

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

function main() {
  $('#social').hide();
  $('#subscriptions-full a.guide-item-action').hide();
}

// load jQuery and execute the main function
addJQuery(main);
