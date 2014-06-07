// ==UserScript==
// @name        JVCForum_MosaicEnImage
// @namespace   Nawake
// @author   	Nawake / www.jeuxvideo.com/profil/nawake.html
// @version     1.1.0
// @updateURL   http://userscripts.org/scripts/source/136687.meta.js
// @downloadURL http://userscripts.org/scripts/source/136687.user.js
// @website     http://userscripts.org/scripts/show/136687
// @include     http://www.jeuxvideo.com/forums/*
// @include     http://jeuxvideo.com/forums/*
// ==/UserScript==

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

GM_addStyle("img.img_shack { margin: 0 !important; margin-right: -3px !important; border: 0 !important; }");