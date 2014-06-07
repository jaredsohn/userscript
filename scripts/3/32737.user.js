/* 
 * No Ads in LJ
 * Author: Serguei Trouchelle (http://trouchelle.com/)
 * Version: 1.0
 */

// ==UserScript==
// @name        No Ads in LJ
// @namespace   trouchelle.com
// @description Remove Livejournal Ads
// @version     1.0
// @include     http://*.livejournal.com/*
// @exclude     http://pics.livejournal.com/*
// ==/UserScript==

function RemoveAds () {
  var allLinks, thisLink;
  var adStyles = ('');

  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; };
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = ' .adv, .ljad, .adv-box, .h-adv-box, .ljadwrapper-journal-after-post-c, #adframe { display: none ! important; }';
  head.appendChild(style);
}

RemoveAds();

/* What's new:
    1.0    2008/08/29 Initial revision
*/