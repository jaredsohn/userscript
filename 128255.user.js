// ==UserScript==
// @name           BB color modifier
// @namespace      bb-color-modifier
// @description    Make BB easier for me to read
// @match          http://build.chromium.org/*
// @match          https://build.chromium.org/*
// @match          http://chromegw.corp.google.com/*
// @match          https://chromegw.corp.google.com/*
// @match          http://chromium-build.appspot.com/*
// @match          https://chromium-build.appspot.com/*
// @version        0.2
// ==/UserScript==

(function(document) {
  var s = document.createElement('style');
  s.textContent = [
    '.content{margin-top:30px;}',
    '.warnings{background:darkorange;border-color:#7f1c00}',
    '.Grid{position:fixed;background:white;width:100%;border-bottom:1px solid #000;top:0;left:0;z-index:10000;}',
  ].join('\n');
  document.head.appendChild(s);
}(unsafeWindow.document));
