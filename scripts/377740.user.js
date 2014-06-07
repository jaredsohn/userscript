/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @id              kaskus-main-tennis@loucypher
// @name            Kaskus - Main Tennis - Slow Mimin
// @namespace       https://userscripts.org/users/12
// @description     Bikin Mimin jadi lemot.
// @version         1.1
// @author          LouCypher
// @license         WTFPL
// @icon            http://loucypher.github.io/userscripts/kaskus/kaskus-48.png
// @icon64URL       http://loucypher.github.io/userscripts/kaskus/kaskus-64.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Kaskus+-+Main+Tennis+-+Slow+Mimin
// @homepageURL     http://userscripts.org/scripts/show/377740
// @supportURL      http://userscripts.org/scripts/discuss/377740
// @updateURL       https://userscripts.org/scripts/source/377740.meta.js
// @downloadURL     https://userscripts.org/scripts/source/377740.user.js
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @resource        image https://mediacru.sh/uuNl0z2DzrVH.gif
// @run-at          document-start
// @include         http://www.kaskus.co.id/*
// @grant           unsafeWindow
// @grant           GM_getResourceURL
// ==/UserScript==

window.addEventListener("beforescriptexecute", function(aEvent) {
  var script = aEvent.target;
  if (!script.src && script.textContent.match(/pong1/)) {
    window.removeEventListener(aEvent.type, arguments.callee, true);
    aEvent.preventDefault();
    document.addEventListener("DOMContentLoaded", function(aEvent) {
      unsafeWindow.$("#pong1").pong("", {
        ballSpeed: 15,
        compSpeed: 5,
        //ballAngle: 0,
        playerSpeed: 15,
        //playTo: 1,
        paddleHeight: 60
      });
      new MutationObserver(function(aMutations) {
        aMutations.forEach(function(aMutation) {
          if (aMutation.addedNodes[0].nodeType === 3) {
            if (aMutation.addedNodes[0].textContent === "you win!")
              unsafeWindow.$(aMutation.addedNodes[0]).before(
                '<img src="' + GM_getResourceURL("image") + '" style="margin-top:-32px"/><br/>'
              );
          }
        });
      }).observe(unsafeWindow.$("#pong1 .score")[0], {childList:true});
    });
  }
});
