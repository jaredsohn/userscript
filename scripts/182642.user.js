// ==UserScript==
// @name          YouTube - Hide related videos & expand comments
// @version       1.0
// @author        Bruno Barbieri
// @description   Hides related videos and expand comment section
// @include       http://*.youtube.com/*watch*
// @include       http://youtube.com/*watch*
// @include       https://*.youtube.com/*watch*
// @include       https://youtube.com/*watch*
// @namespace     http://userscripts.org/scripts/show/182642
// @updateURL     http://userscripts.org/scripts/source/182642.meta.js
// @downloadURL   http://userscripts.org/scripts/source/182642.user.js
// ==/UserScript==

// A function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
    jQ('.watch-sidebar').remove();
    jQ('.watch-content').width('100%');
    jQ('#action-panel-details').width('96%');
    jQ('#watch-description-clip').width('100%');
}

window.addEventListener('load', function() {
	addJQuery(main);
}, false);
