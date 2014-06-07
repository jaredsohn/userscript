// ==UserScript==
// @name           KILL CAMPAIGNS
// @namespace      asdf@asdf.com
// @description    KILLKILLKILL
// @include        http://roosterteeth.com/*
// @include        http://redvsblue.com/*
// @include        http://achievementhunter.com/*
// ==/UserScript==

(function() {
  var back = document.getElementById("pageContent").parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("td")[0];

  back.removeAttribute("onclick");
  back.removeAttribute("style");
})();