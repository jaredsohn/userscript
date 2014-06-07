// ==UserScript==
// @name Goodbye Jimmy
// @namespace http://www.example.com
// @include http://ja.wikipedia.org/*
// ==/UserScript==

(
  function() {
    var elem = document.getElementById("siteNotice");
    elem.style.display = "none";
  }
)();