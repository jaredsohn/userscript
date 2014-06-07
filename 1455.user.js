/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// ==UserScript==
// @name            mozillaZine Forums Menu
// @namespace       http://mozilla.status.net/loucypher
// @description     Navigation menu for mozillaZine Forums
// @version         2.12
// @author          LouCypher
// @license         MPL 2.0
// @icon            https://raw.github.com/LouCypher/userscripts/master/mozillazine-forums-menu/icon.png
// @homepageURL     https://userscripts.org/scripts/show/1455
// @supportURL      https://userscripts.org/scripts/discuss/1455
// @updateURL       https://userscripts.org/scripts/source/1455.meta.js
// @downloadURL     https://userscripts.org/scripts/source/1455.user.js
// @resource        CSS https://raw.github.com/LouCypher/userscripts/master/mozillazine-forums-menu/mzf-menu.css
// @resource        JSON https://raw.github.com/LouCypher/userscripts/master/mozillazine-forums-menu/mzf-menu.json
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/mozillazine-forums-menu/LICENSE.txt
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/mozillazine-forums-menu/changelog.txt
// @include         http://forums.mozillazine.org/*
// @grant           GM_addStyle
// @grant           GM_getResourceText
// ==/UserScript==

(function() {
  var pageHeader = $("#page-header");
  var pageBody = $("#page-body");
  var linklist = $(".linklist", pageHeader);
  if (!linklist) return;

  resizeMenubar();
  repositionMenubar();

  const htmlns = "http://www.w3.org/1999/xhtml";

  GM_addStyle(GM_getResourceText("CSS"));

  var forums = JSON.parse(GM_getResourceText("JSON"));

  for (var i in forums) {
    let sibling = $(".rightside", linklist);
    let menu = addMenu(forums[i].name, forums[i].id, sibling);
    for (var j = 0; j < forums[i].subs.length; j++) {
      let submenu = $(".submenu", menu);
      addSubMenu(forums[i].subs[j].name, forums[i].subs[j].id,
                 submenu, forums[i].subs[j].url);
    }
  }

  addEventListener("resize", resizeMenubar, false);
  addEventListener("scroll", repositionMenubar, false);

  function addMenu(aText, aId, aSibling) {
    let icon = setIconFromCurrent(".icon-home > strong > strong + a", aId);
    let menu = '<li xmlns="' + htmlns + '" class="icon-'
             + icon + ' menu"><strong><a href="/viewforum.php?f='
             + aId + '">' + aText + '</a></strong><ul class="submenu">'
             + '</ul></li>';
    return aSibling.parentNode.insertBefore(parseHTML(menu), aSibling);
  }

  function addSubMenu(aText, aId, aParent, aExternal) {
    let external = (aExternal != null)
    let icon = setIconFromCurrent(".icon-home > strong > a:last-child", aId);
    let menu = '<li xmlns="' + htmlns + '" class="icon-'
             + (icon + (external ? ' external' : ''))
             + '"><strong><a href="'
             + (external ? aExternal : ('/viewforum.php?f=' + aId))
             + '">' + aText + '</a></strong></li>';
    aParent.appendChild(parseHTML(menu));
  }

  function setIconFromCurrent(aSelector, aId) {
    let icon = "";
    switch (aId) {
      case "!": icon = "logout"; break;
      case "?": icon = "faq"; break;
      default:  icon = "bump";
    }
    let current = $(aSelector);
    if (current) {
      if (current.href.match(/\d+/) == aId) {
        icon = "subscribe";
      }
    }
    return icon;
  }

  function $(aSelector, aNode) {
    return (aNode || document).querySelector(aSelector);
  }

  function parseHTML(aHTMLString) {
    return (new DOMParser).parseFromString(aHTMLString, "application/xml")
                          .documentElement;
  }

  function resizeMenubar() {
    pageHeader.style.width = getComputedStyle(pageBody, null).
                             getPropertyValue("width");
  }

  function repositionMenubar() {
    if (pageYOffset >= $("#masthead").offsetHeight) {
      pageHeader.className = "fixed";
    } else {
      pageHeader.className = "";
    }
  }
})()