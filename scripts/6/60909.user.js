// A better experience for prothom-alo.com site
// version 0.1
// 2009-10-29
// Author: Arif Siddiquee
// Released under the Apache License 2.0 license
// http://www.apache.org/licenses/LICENSE-2.0
//
// ==UserScript==
// @name Better Prothom-alo
// @namespace http://dream-runner.blogspot.com
// @description A simple ad remover from prothom-alo.com site.
//              Also removes unnecessary info banners.
// @include http://www.prothom-alo.com/*
// @include http://prothom-alo.com/*
// ==/UserScript==

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

var classesHidingCSS =
  // Right now prothom-alo site ads are all wrapped in commonAdClass class.
  // Just hide the elements with that class.
  '.commonAdClass,' +
  // Hide the mobile subscribe info.
  '.phoneFeed,' +
  // Hide widget links.
  '.widgetLink,' +
  // Hide self ad for prothom-alo.
  '.publishigReport,' +
  // Hide some unused space at bottom.
  '.pageBottom,' +
  // Hide the DSE/CSE symbols.
  '.stockExchange,' +
  // Hide youtube video control. (this is a bit hacky though)
  '.sideBar .widgetText object ' + 
  '{ display: none; }';
   
addGlobalStyle(classesHidingCSS);

