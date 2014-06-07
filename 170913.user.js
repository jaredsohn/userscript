/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @id              userstyles-org-stats-link@loucypher
// @name            userstyles.org: stats link
// @namespace       http://userstyles.org/users/12
// @description     Add stats link for your styles on style page and search results.
// @version         1.0
// @author          LouCypher
// @license         WTFPL
// @screenshot      http://puu.sh/3gfon.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?userstyles.org%3A+stats+link
// @homepageURL     https://userscripts.org/scripts/show/170913
// @supportURL      https://userscripts.org/scripts/discuss/170913
// @updateURL       https://userscripts.org/scripts/source/170913.meta.js
// @downloadURL     https://userscripts.org/scripts/source/170913.user.js
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         http://userstyles.org/styles/*
// @grant           none
// ==/UserScript==

var cp = document.getElementById("control-panel");
cp && cp.appendChild(addStatsLink(location.href.match(/\d+/), "[Stats]"));

var cpl = document.querySelectorAll(".style-brief-control-links");
if (cpl.length) {
  var id;
  for (var i = 0; i < cpl.length; i++) {
    id = cpl[i].querySelector(".edit-link").href.match(/\d+/);
    cpl[i].appendChild(addStatsLink(id, "Stats"));
  }
}

function addStatsLink(aStyleID, aText) {
  var link = document.createElement("a");
  link.href = "/styles/stats/" + aStyleID;
  link.textContent = aText;
  return link;
}