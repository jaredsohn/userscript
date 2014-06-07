// ==UserScript==
// @name           Star Remover
// @namespace      http://www.outeverywhere.com
// @description    Turn lifetime membership stars back into dots
// @include        http://www.outeverywhere.com/*
// @include        http://www.journalhound.com/*
// ==/UserScript==

var anchors = document.getElementsByTagName("a");
if (anchors) {
  for (var ii = 0; ii < anchors.length; ++ii) {
    var images = anchors[ii].parentNode.getElementsByTagName('img');
    if (images) {
      for (var jj = 0; jj < images.length; ++jj) {
        if (images[jj].src.indexOf("/g/icons/star4.png") >= 0) {
          images[jj].src = '/g/icons/member.png';
          break;
        }
      }          
    } 
  }
}