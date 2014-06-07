// ==UserScript==
// @name        Remove Recommended Channels
// @description Removes reccomended channels tab on the Youtube subscriptions page
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @version     1.0
// @grant       GM_addStyle
// ==/UserScript==
var divs = document.getElementsByTagName('div');
var div;
var i = divs.length;

while (i--) {
  div = divs[i];

  if (div.getAttribute('class') == 'branded-page-v2-secondary-col') {
    div.parentNode.removeChild(div);
  }
}

