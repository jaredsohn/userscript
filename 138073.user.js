// Copyright (c) 2005 CA.  All rights reserved.
// sitemods.js,v 1.9 2005/01/14 00:29:45
// ==UserScript==
// @name Fire Fox Fix
// @description FireFox Fix
// Fix for Firefox 4+:
var ff4 = {
  fix: function() {
    var yourbases = document.getElementsByTagName("base");
    for (var i=0; i<yourbases.length;i++) {
      var yourbase=yourbases[i];
      yourbase.parentNode.removeChild(yourbase);
    }
  }
};

if (navigator.userAgent.match(/Firefox\/[46789]/)) {
  window.addEventListener("load", ff4.fix, false);
}
// ==/UserScript==