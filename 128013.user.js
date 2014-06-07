// ==UserScript==
// @name            Flickr Fail Whale Hiccups
// @namespace       http://flickr.com/zoolcar9
// @description     Fail Whale has the hiccups
// @version         2.0
// @author          LouCypher
// @license         GPL 3.0
// @updateURL       https://userscripts.org/scripts/source/128013.meta.js
// @include         http://www.flickr.com/*
// @include         http://flickr.com/*
// ==/UserScript==

/*
  Copyright (c) 2008 by LouCypher
  Licensed under the GNU General Public License v3
  License available at http://www.gnu.org/licenses/gpl-3.0.html

  Fail Whale image info:
  Original title: Lifting a Dreamer
  Artist: Yiying Lu
  http://www.yiyinglu.com/failwhale/
  http://www.yiyinglu.com/?portfolio=lifting-a-dreamer-aka-twitter-fail-whale
*/

/*
Changelog:
  - 2012-03-10: v2.0
  - 2008-07-07: v1.0 http://flic.kr/p/52KX94
*/

try {
  var main = document.getElementById("Main");
  var hiccups = document.evaluate("./div[@class='ThinCase']/p",
                                  main, null, 9, null).singleNodeValue;
} catch(ex) {
  return;
}

if (hiccups && hiccups.textContent.indexOf("hiccups") > -1) {
  hiccups.parentNode.style.marginTop = "0";
  hiccups.parentNode.style.paddingBottom = "0";
  var p = hiccups.parentNode.insertBefore(document.createElement("p"),
                                          hiccups);
  var lnk = p.appendChild(document.createElement("a"));
  lnk.href = "http://www.flickr.com/photos/zoolcar9/2645318871/";
  var img = lnk.appendChild(document.createElement("img"));
  img.src = "http://farm8.staticflickr.com/7043/6969345321_edd32ddca3.jpg";
  img.setAttribute("alt", "Flickr has the hiccups");
}
