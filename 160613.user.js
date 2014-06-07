// ==UserScript==
// @name Wowhead Tooltip injector
// @namespace http://itsbth.com/
// @description Inject Wowhead Tooltips into wordpress blogs.
// @match http://*.wordpress.com/*
// ==/UserScript==

(function() {
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  script.src = "https://static.wowhead.com/widgets/power.js";
  head.appendChild(script);
  script = document.createElement("script");
  script.appendChild(document.createTextNode("(" + function () {
    window.wowhead_tooltips = {
      colorlinks: true,
      iconizelinks: true,
      renamelinks: true
    };
  } + "());"))
  head.appendChild(script);
}());