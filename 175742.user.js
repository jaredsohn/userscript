// ==UserScript==
// @name        killpub
// @namespace   chyrox
// @description killpub
// @include     http://www.hamachifrance.com/*
// @version     1
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-2.0.2.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jq=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(main);

function main() {
	$('#cl-layer').parent().hide();
}