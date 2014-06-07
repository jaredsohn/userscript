// ==UserScript==
// @name       MangaFox mature gate auto-click
// @namespace  https://userscripts.org/users/502210
// @version    0.1
// @description  Automatically clicks the mature age gate prompt on the the MangaFox website thus loading the page like normal.
// @match      http://mangafox.me/*
// @copyright  2013+, sydh
// ==/UserScript==

window.setInterval( function() {
  var link=document.evaluate("//a[text()='Please click here to continue reading.']",document,null,9,null).singleNodeValue;
  if(link) {
    var evObj = document.createEvent("MouseEvents");
    evObj.initEvent("click", true, false);
    link.dispatchEvent(evObj);
  }
}, 100 );