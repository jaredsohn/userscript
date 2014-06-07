// ==UserScript==
// @name           CCProxy Refresher
// @namespace      DNE.Browser
// @include        https://141.255.161.59:66/*
// @include        http://141.255.161.59:66/*
// @version        0.0.1
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

// the guts of this userscript
function main() {
  alert("There are links on this page.");
}

// load jQuery and execute the main function
addJQuery(main);