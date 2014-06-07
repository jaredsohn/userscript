// ==UserScript==
// @name           @ben @gus
// @namespace      ben@gus.com
// @description    You know it...
// @include        http://roosterteeth.com/*
// ==/UserScript==

(function() {
  var buttonbox = document.getElementById("postFormatButtons");

  var spamlink = document.createElement("a");
  spamlink.textContent = "SPAMTHEDEVS";

  spamlink.addEventListener('click', function() { 
    let body = document.getElementById("body");
    body.value = body.value + "@ben @gus";
  }, false);

  buttonbox.insertBefore(spamlink, buttonbox.firstChild);
})();