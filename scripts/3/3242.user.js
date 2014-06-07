// ==UserScript==
// @name          30Boxes text size-fixer
// @description 	fixes the text size on your 30boxes.com calendar to be less... huge.
// @version	0.1
// @include	http://*30boxes.com/*
// Time-stamp: "2006-02-16"
// ==/UserScript==

if (
    document.documentElement.tagName == "HTML"
    && document.contentType == "text/html"
) {
  var NodeFilter = Components.interfaces.nsIDOMNodeFilter
  if(!NodeFilter) throw "No NodeFilter?!";
  if(NodeFilter.SHOW_ELEMENT == undefined) throw "No NodeFilter.SHOW_ELEMENT?!";

  var traversal = document.createTreeWalker(
   document.documentElement, NodeFilter.SHOW_ELEMENT, null, false
  );
  var el;
  var count = 0;
  while( 1 ) {
    el = traversal.nextNode();
    if(!el) break;
    if(el.style.cssText) {
       el.style.cssText +=
        ';font-size: 7pt;';
    } else {
       el.style.fontSize   = '7pt;';
    }
  }
}

// End

