// ==UserScript==
// @name           WHBM Custom Header
// @namespace      http://www.whitehouseblackmarket.com
// @description    Adds custom fashion week header
// @include        http://whitehouseblackmarket.com/*
// @include        https://www.whitehouseblackmarket.com/*
// @include        http://www.whitehouseblackmarket.com/*

// ==/UserScript==


(function() {
  var head = document.getElementsByTagName("head")[0];
 
  var require = function(src) {
    var script = document.createElement("script");
    script.setAttribute("src", src);
    head.appendChild(script);
  };
  var load_script = function() {
    require("http://www.twmediaserver.com/whbm/kiosk/whbm.js");
  };
  load_script();
})();