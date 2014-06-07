/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

// ==UserScript==
// @name            USO: Auto hides notification
// @namespace       http://userstyles.org/users/12
// @version         6.0
// @author          LouCypher
// @license         WTFPL http://sam.zoy.org/wtfpl/COPYING
// @updateURL       https://userscripts.org/scripts/source/137963.meta.js
// @include         https://userscripts.org/*
// @include         http://userscripts.org/*
// @include         http://userscripts.org./*
// @include         http://greasefire.userscripts.org./*
// ==/UserScript==

(function() {
  var span = $("#content p.notice span");
  if (!span) return;

  var notice = span.parentNode;
  notice.addEventListener("click", hide, false); // Click to hide
  notice.title = "Click to hide";
  notice.style.cursor = "pointer";

  var x = notice.appendChild(document.createElement("span"));
  x.style.backgroundImage = "none";
  x.style.cssFloat = "right";
  x.style.fontSize = "large";
  x.style.fontWeight = "bold";
  x.style.marginRight = "1em";
  x.textContent = "\u00D7";

  var cssKeyframes = "keyframes slide {\n"
                   + "  from { margin-top:     0; opacity: 1; }\n"
                   + "  to   { margin-top: -40px; opacity: 0; }\n"
                   + "}";

  var style = $("head").appendChild(document.createElement("style"));
  style.type = "text/css";
  style.textContent = "@" + getCSSPrefix() + cssKeyframes
                    + "\n"
                    + "@" + cssKeyframes;

  setTimeout(function() {
    hide();
  }, 5000); // Hide after 5 seconds

  function getCSSPrefix() {
    var ua = navigator.userAgent;
    if (/Firefox/.test(ua)) return "-moz-";
    if (/Opera/.test(ua)) return "-o-";
    if (/AppleWebKit/.test(ua)) return "-webkit-";
  }

  function hide() {
    notice.setAttribute("style", getCSSPrefix()
                      + "animation: slide linear 1000ms; "
                      + "animation: slide linear 1000ms; "
                      + "pointer-events: none; "
                      + "margin-top: -40px; opacity: 0;");
  }

  function $(aSelector, aNode) {
    return (aNode ? aNode : document).querySelector(aSelector);
  }
})()