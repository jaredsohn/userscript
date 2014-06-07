// ==UserScript==
// @name           Twitter search auto-refresh ... twitter: igrigorik
// @include        http://search.twitter.com/*
// ==/UserScript==

document.body.addEventListener("DOMAttrModified", function(e){
  if (e.attrName == "style") {
    if (e.newValue.match(/block;/) != null) 
      document.location = document.location; 
  }
}, false);
