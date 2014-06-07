// ==UserScript==
// @name         Piratebay Pirateshit Fix
// @namespace    torrentzeumagnettracker
// @include      http://torrentz.eu/*
// @author       Funkpuss
// @description  Replaces Piratebay links on Torrentz.eu with Pirateshit links.
// ==/UserScript==

function addJQuery(callback) {
   var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function main() {
	var link = $('a[href*="http://thepiratebay."]');
    href = link.attr('href');
    href = href.replace("thepiratebay.se", "pirateshit.com");
    link.attr('href', href);
    link.find('.u').html('pirateshit.com');
}
addJQuery(main);