// ==UserScript==
// @name           What.CD Hide Featured Album Box
// @author         dewey
// @namespace      dewey
// @include        http://what.cd/index.php
// @include        https://ssl.what.cd/index.php
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
  $(".sidebar > .box:first-child").hide();
}

addJQuery(main);