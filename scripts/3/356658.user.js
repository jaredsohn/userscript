/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @id              kaskus-scroll-to-top@loucypher
// @name            Kaskus - Scroll to Top
// @namespace       https://userscripts.org/users/12
// @description     Add button on Kaskus topbar to quickly scroll to top.
// @version         1.0
// @author          LouCypher
// @license         WTFPL
// @screenshot      https://mediacru.sh/Qjrp3WGaeeWD.png
// @icon            http://loucypher.github.io/userscripts/kaskus/kaskus-48.png
// @icon64URL       http://loucypher.github.io/userscripts/kaskus/kaskus-64.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Kaskus+-+Scroll+to+Top
// @homepageURL     https://userscripts.org/scripts/show/356658
// @supportURL      https://userscripts.org/scripts/discuss/356658
// @updateURL       https://userscripts.org/scripts/source/356658.meta.js
// @downloadURL     https://userscripts.org/scripts/source/356658.user.js
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/kaskus/scroll-to-top/CHANGELOG.txt
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         http://www.kaskus.co.id/*
// @grant           unsafeWindow
// @grant           GM_addStyle
// ==/UserScript==

function $(aSelector, aNode) {
  return (aNode || document).querySelector(aSelector);
}

function scrollToTop(aEvent) {
  aEvent.preventDefault();
  if (pageYOffset >= 1)
    unsafeWindow.jQuery("html").animate({scrollTop: 0}, "fast");
}

function showButton() {
  if (pageYOffset >= header.offsetHeight)
    $("#scroll-to-top").className = "";
  else
    $("#scroll-to-top").className = "hide";
}

var css = ".rotate-right::before{-moz-transform:rotate(90deg);"
        + "-webkit-transform:rotate(90deg);transform:rotate(90deg);font-size:15px;}"
        + "#scroll-to-top{text-align:center;width:25px;top:4px;"
        + (typeof opera === "object"
           // Opera
           ? "position:fixed;right:1em;background:#1484ce;"
           // other browsers that support CSS calc() function
           : "position:absolute;left:-moz-calc(50% - 12.5px);" +
             "left:-webkit-calc(50% - 12.5px);left:calc(50% - 12.5px);")
        + "}";

var header = $("#site-header .meta-header");
var row = $(".row", header);
if (row) {
  GM_addStyle(css);
  var link = row.insertBefore(document.createElement("a"), row.firstChild);
  link.id = "scroll-to-top";
  link.className = "hide";
  link.href = "#";
  link.rel = "tooltip";
  link.dataset.title = "Scroll to Top";
  link.dataset.placement = "bottom";
  link.innerHTML = '<i class="icon-step-backward header-icon rotate-right"></i>';
  link.addEventListener("click", scrollToTop);
  window.addEventListener("scroll", showButton);
  showButton();
}
