// ==UserScript==
// @name           Sioux City Journal Paywall Remover
// @description    Removes the Sioux City Journal paywall.
// This script should be easily modified to work on other Lee Enterprises paywalls -- just add more include lines below
// @include        http*://siouxcityjournal.com/*
// @include        http*://*.siouxcityjournal.com/*

// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
// shamelessly ganked modified from the Times Colonist Paywall script at http://userscripts.org/scripts/review/103523

// For the moment, it hides the paywall once you click anywhere inside the paywall box.
// If you know of a way to trigger this without a click, by all means leave a comment or fix. I only know enough jQuery to be dangerous.
function main() {
  $("#blox-paywall-modal").live("click", function(){
    var item_to_replace = document.evaluate("//div[@id='paywall-code']", document, null, 9, null).singleNodeValue;
    item_to_replace.parentNode.removeChild(item_to_replace);
    item_to_replace = document.evaluate("//div[@id='exposeMask']", document, null, 9, null).singleNodeValue;
    item_to_replace.parentNode.removeChild(item_to_replace);
  });
}

// load jQuery and execute the main function
addJQuery(main);