// ==UserScript==
// @name            KongNoAds
// @namespace       http://steven.karas.ws/
// @description     Makes Kongregate a nicer place (removes a few ads).
// @include         http://www.kongregate.com/*
// @version         1.0
// ==/UserScript==

var css = ".hide_ad_always {display:none;}";

function addNewStyle(myStyle) {
  if (typeof GM_addStyle != "undefined") {
    GM_addStyle(myStyle);
  } else if (typeof addStyle != "undefined") {
    addStyle(myStyle);
  } else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
      var node = document.createElement("style");
      node.type = "text/css";
      node.appendChild(document.createTextNode(myStyle));
      heads[0].appendChild(node);
    }
  }
}

if (unsafeWindow.top == unsafeWindow.self) {
  addNewStyle(css);
}