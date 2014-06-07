// ==UserScript==
// @name          Google Bookmarks Plus
// @namespace     http://nibras.co.cc
// @description   This script adds one click bookmarking to Google Bookmarks. It requires you to use Google Bookmark bookmarklet found at http://www.google.com/support/bookmarks/bin/answer.py?hl=en&answer=175117.
// @include       http://www.google.com/bookmarks/mark*
// @include       https://www.google.com/bookmarks/mark*
// ==/UserScript==

var l=document.getElementsByClassName('kd-button-submit kd-button')[0];
x=l.innerHTML;

if (x.match("Add bookmark")=="Add bookmark"){
var tc=setTimeout("window.name='gmp_popup';window.location.reload();",300);
l.onclick();
document.title="Saving bookmark... Google Bookmarks";}
else if(x.match("Save")=="Save"){
  if (window.name=="gmp_popup"){
  document.title="Bookmark saved. Switch to add tags.  Google Bookmarks";
  var t=setTimeout("window.close();",15000);}}
else{window.location.reload();}