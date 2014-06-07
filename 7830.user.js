// ==UserScript==
// @name          Hotmail javascript link fixer
// @description   Turns javascript links to normal links
// @include       http://*.hotmail.msn.com/*
// ==/UserScript==

// Thanks also to Rammy M for fixing an issue with eBay links.

document.wrappedJSObject.onclick = null;
var allLinks = document.getElementsByTagName('a')
for (var i = allLinks.length - 1; i >= 0; i--) {
  var thisLink = allLinks[i];
  if (thisLink.href.match("javascript:ol") != null) {
    var jsUrl = thisLink.href.replace(/%26amp;/gi, "&").replace(/%3d/gi, "=");
    thisLink.href = jsUrl.substring(jsUrl.indexOf("(")+2,jsUrl.indexOf(")")-1);
  } //if
} //for