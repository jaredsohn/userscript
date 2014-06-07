// ==UserScript==
// @name           The Big Picture
// @include        http://www.boston.com/bigpicture/*
// ==/UserScript==

var pics=document.evaluate("//div[@class='bpBoth']", document, null, 7, null);
var i=0;

document.addEventListener('keypress', function(event) {
  if (String.fromCharCode(event.which) == "j") {
    window.scrollTo(0, pics.snapshotItem(i).offsetTop);
    i=i+1;
  }
}, false);

document.addEventListener('keypress', function(event) {
  if (String.fromCharCode(event.which) == "k") {
    i=i-1;
    window.scrollTo(0, pics.snapshotItem(i).offsetTop);
  }
}, false);
