// ==UserScript==
// @name           Link To New Tab
// @namespace      http://*
// @description    Opens links external to the current site in a new tab
// ==/UserScript==

// Ignore links with relative URLs
// and links to the current site

function linkToNewTab() {
  var anchors = document.getElementsByTagName("a");
  for(var i = 0; i < anchors.length; i++) {
    if(anchors[i].href.indexOf("http") == 0  
      && anchors[i].href.indexOf(window.location.host) == -1) {
      anchors[i].target = "_blank";
    }
  }
}

window.addEventListener("load",function(){linkToNewTab()},false);