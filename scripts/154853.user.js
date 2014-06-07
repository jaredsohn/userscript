// ==UserScript==
// @name       FurAffinity Image Biggifier
// @version    1.0
// @description  Auto enlarge FA submission images
// @match      *://*.furaffinity.net/view/*
// ==/UserScript==
 
var listener = "DOMSubtreeModified";
var handler = function() {
  console.log("DOM inserted");
  if(document.querySelector("#submissionImg") && unsafeWindow.xor_view) {
    document.removeEventListener(listener, handler, false);
    console.log("Both submission image and xor_view have loaded");
    document.querySelector("#submissionImg").src = unsafeWindow.xor_view();
  }
};
 
document.addEventListener(listener, handler, false);
