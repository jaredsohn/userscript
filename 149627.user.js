// ==UserScript==
// @name			Facepunch Thread Ratings
// @version			1.0
// @namespace		http://hexxeh.net
// @description		Shows ratings for threads
// @include			http://www.facepunch.com/*
// @include			http://facepunch.com/*
// ==/UserScript==

function load() {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.setAttribute("src", "http://api.facepun.ch/userscript.js");
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
load();
