// ==UserScript==
// @name           [Codeforces] Hide Russian text
// @copyright 	   evandrix~
// @namespace      evandrix
// @description    nondescript
// @include        http://codeforces.com/blog/*
// ==/UserScript==
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function main() {
	$("a:contains(Знаете русский?)").parent('div').hide();
}
addJQuery(main);
