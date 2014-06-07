// ==UserScript==
// @name			NeoGAF Spoiler Remover
// @namespace		
// @description		Make spoilers readable on NeoGAF
// @include			http://www.neogaf.com/*
// @include			http://neogaf.com/*

// ==/UserScript==

// Define GM_addStyle for compatibility with opera (http://www.howtocreate.co.uk/operaStuff/userjs/aagmfunctions.js)
if (typeof GM_addStyle == "undefined") {
  function GM_addStyle(css) {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
      var node = document.createElement("style");
      node.type = "text/css";
      node.appendChild(document.createTextNode(css));
      heads[0].appendChild(node); 
    }
  }
}

GM_addStyle('.spoiler{color:#161F9F !important; background: none !important}')