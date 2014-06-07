// ==UserScript==
// @name        All Links Target _Blank (New Window or New Tab)
// @namespace   JeffersonScher
// @description Adds target="_blank" to all links that do not already have a target set (does not add targets to forms)
// @include     *
// @copyright   Copyright 2012 Jefferson Scher
// @license     CC BY http://creativecommons.org/licenses/by/3.0/
// @version     0.9.2
// @grant       none
// ==/UserScript==

// "external_only" - true: don't change links internal to the site; false: change every link
var altb_external_only = true;

if (document.body){
  // Check all links in the body now
  checkNode(document.body);
  // Use a MutationObserver (Fx14+) to watch for additions to the document that could include new links
  var MutOb, chgMon, i, httpels, opts;
  // To disable this feature (might improve performance), comment out the following line:
  var MutOb = (window.MutationObserver) ? window.MutationObserver : window.WebKitMutationObserver;
  if (MutOb){
    chgMon = new MutOb(function(mutationSet){
      mutationSet.forEach(function(mutation){
        // when additions to the document are detected, check for links
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
  /* // For testing only -- all links cyan
  var sty = document.createElement("style");
  sty.setAttribute("type", "text/css");
  sty.appendChild(document.createTextNode("a{background-color:#0ff}"));
  document.body.appendChild(sty);
  */
}

function checkNode(el){
  // Find links that do not have a target attribute; we don't want to change existing targets
  var aLinks = el.querySelectorAll("a[href]:not([target])");
  var same_site = window.location.protocol.toLowerCase() + "//" + window.location.hostname.toLowerCase();
  var href = "";
  if (aLinks.length > 0){
    for (var j = 0; j < aLinks.length; j++){
      // Check links that do not start with "javascript:"
      href = aLinks[j].href.toLowerCase();
      if (href.indexOf("javascript:") != 0){
        // Check the "external_only" parameter
        if (altb_external_only == true){
          // Only add the target if the link is offsite
          if (href.indexOf(same_site) != 0){
            aLinks[j].setAttribute("target", "_blank");
            /* // For testing only
            aLinks[j].style.backgroundColor = "#ff0";
            */
          }
        } else {
          // Add the target regardless of site
          aLinks[j].setAttribute("target", "_blank");
          /* // For testing only
          aLinks[j].style.backgroundColor = "#ff0";
          */
        }
      }
    }
  }
}
