// ==UserScript==
// @name        Real URLs for Google Results (Remove Tracking)
// @namespace   JeffersonScher
// @description Remove mousedown handlers so URLs are not corrupted
// @version     1.0
// @copyright   Copyright 2012 Jefferson Scher
// @license     CC BY http://creativecommons.org/licenses/by/3.0/
// @include     http*://www.google.tld/*
// @include     https://encrypted.google.tld/*
// ==/UserScript==

// == == == Detect added nodes / attach event listeners == == ==
if (document.body){
  // Clean results
  checkNode(document.body);
  // Watch for changes that could be new instant or AJAX search results
  var MutOb, chgMon, i, httpels, opts;
  var MutOb = (window.MutationObserver) ? window.MutationObserver : window.WebKitMutationObserver; // Requires Firefox 14 or later
  if (MutOb){
    chgMon = new MutOb(function(mutationSet){
      mutationSet.forEach(function(mutation){
        for (i=0; i<mutation.addedNodes.length; i++){
          if (mutation.addedNodes[i].nodeType == 1){
            checkNode(mutation.addedNodes[i]);
          }
        }
      });
    });
    // attach chgMon to document.body
    opts = {childList: true, subtree: true};
    chgMon.observe(document.body, opts);
  }
}

function checkNode(el){
  if (el.nodeName == "LI") var liels = [el];
  else var liels = el.querySelectorAll('li');
  if (liels.length > 0){
    var i, ael;
    for (var i=0; i<liels.length; i++){
      var ael = liels[i].querySelector("h3 a"); // Format of Web results
      if (ael){
        //GM_log("Before: "+ael.outerHTML);
        if(ael.hasAttribute("onmousedown")) ael.removeAttribute("onmousedown");
        //GM_log("After: "+ael.outerHTML);
      }
    }
  }
}
