/*
    Add Pinterest button on deviantART to share on Pinterest
    Copyright (C) 2012 LouCypher

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>
*/

// ==UserScript==
// @name            deviantART Pinterest
// @namespace       http://userstyles.org/users/12
// @description     Add Pinterest button on deviantART to share on Pinterest
// @version         1.0
// @author          LouCypher
// @license         GPL
// @updateURL       https://userscripts.org/scripts/source/130559.meta.js
// @include         *://*.deviantart.com/art/*
// @match           *://*.deviantart.com/art/*
// ==/UserScript==

var icons = $("#gmi-ResourceViewShare");
if (!icons) return;

var permalink = document.querySelectorAll("#artist-comments a")[1];
var image = $("#gmi-ResViewSizer_fullimg") || $("#gmi-ResViewSizer_img");

var link = icons.insertBefore(document.createElement("a"),
                              icons.lastChild.previousSibling);
link.target = "_blank";
link.className = "share-button pinterest";
link.href = "http://pinterest.com/pin/create/button/"
          + "?url=" + $esc(permalink.href)
          + "&media=" + $esc(image.src)
          + "&description=" + $esc(document.title);

link.addEventListener("mouseover", function() {
  $(".social-title").textContent = "Create Pin";
}, false);

link.addEventListener("mouseout", function() {
  $(".social-title").textContent = "Share";
}, false);

link.addEventListener("click", function(e) {
  e.preventDefault();
  window.open(e.target.href, "_blank",
              "width=640, height=350, toolbar=no, location");
}, false);

GM_addStyle(".pinterest {\
  background-image: url('//assets.pinterest.com/images/"
                      + "about/big-p-button.png') !important;\
  background-position: 2px 2px !important;\
     -moz-background-size: 22px 22px !important;\
  -webkit-background-size: 22px 22px !important;\
          background-size: 22px 22px !important;\
}\
.pinterest:active { background-position: 2px 3px !important;")

function $(aSelector, aNode) {
  return (aNode ? aNode : document).querySelector(aSelector);
}

function $esc(aString) {
  return encodeURIComponent(aString);
}
