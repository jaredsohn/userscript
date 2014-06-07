/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// ==UserScript==
// @name            mozillaZine Forums: Fix sidebar when scrolling
// @namespace       http://userstyles.org/users/12
// @description     Fix sidebar position when scrolling
// @version         1.0
// @author          LouCypher
// @license         MPL 2.0
// @icon            https://raw.github.com/gist/1087992/icon.png
// @updateURL       https://userscripts.org/scripts/source/137677.meta.js
// @include         http://forums.mozillazine.org/*
// ==/UserScript==

(function() {
  if (!$("#sidebar")) return;

  var sbWidth = $("#sidebar").offsetWidth;
  fixToTop();
  addEventListener("scroll", fixToTop, false);

  function fixToTop() {
    if (pageYOffset >= $("#masthead").offsetHeight) {
      $("#sidebar").style.position = "fixed";
      $("#sidebar").style.top = "0";
      $("#sidebar").style.right = "0";
      $("#wrap").style.marginRight = sbWidth + "px";
    } else {
      /* Doesn't work on Safari
      $("#sidebar").removeAttribute("style");
      $("#wrap").removeAttribute("style");
      */
      $("#sidebar").setAttribute("style", "");
      $("#wrap").setAttribute("style", "");
    }
  }

  function $(aSelector, aNode) {
    return (aNode ? aNode : document).querySelector(aSelector);
  }
})()