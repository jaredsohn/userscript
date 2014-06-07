// ==UserScript==
// @match http://chserver.net/map*
// @run-at document-end
// @name Increase refresh rate
// ==/UserScript==
callback = function() {
  config.updateRate = 100;
  debugger;
}

var script = document.createElement("script");
script.textContent = "(" + callback.toString() + ")();";
document.body.appendChild(script);