/*
    Darken
    Add menuitem into browser context menu to darken the web page.
    Compatibility: Firefox 11.0 or newer.
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
// @name            Darken
// @namespace       http://userscripts.org/users/12
// @description     Add menuitem into browser context menu to darken the web page. For Firefox 11.0 and newer only.
// @version         3.0
// @author          LouCypher
// @contributor     luckymouse (CSS)
// @license         GPL
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/darken
// @updateURL       https://userscripts.org/scripts/source/153122.meta.js
// @resource        css https://raw.github.com/LouCypher/userscripts/master/darken/darken.css
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @include         *
// ==/UserScript==

if (frameElement) return;

const STYLE_ID = "userscript-darken-style";
var isDark = sessionStorage.getItem("dark-site");
if (isDark) darken();

if (!(document.head && document.body)) return;
var menu = document.body.appendChild(document.createElement("menu"));
var html = document.documentElement;
if (html.hasAttribute("contextmenu")) {
  // We don't want to override web page context menu if any
  var contextmenu = $("#" + html.getAttribute("contextmenu"));
  contextmenu.appendChild(menu); // Append to web page context menu
} else {
  html.setAttribute("contextmenu", "userscript-darken-context-menu");
}

menu.outerHTML = '<menu id="userscript-darken-context-menu"\
                        type="context">\
                    <menuitem id="userscript-darken-menuitem"\
                              type="checkbox"\
                              label="Darken">\
                    </menuitem>\
                  </menu>';

if ("contextMenu" in html && "HTMLMenuItemElement" in window) {
  var menuitem = $("#userscript-darken-menuitem");
  if (isDark) menuitem.setAttribute("checked", "true");
  // Executed on clicking a menuitem
  menuitem.addEventListener("click", toggleDarken, false);
}

function darken() {
  var style = $("head").appendChild(document.createElement("style"));
  style.id = STYLE_ID;
  style.textContent = GM_getResourceText("css");
  sessionStorage.setItem("dark-site", true);
}

function toggleDarken() {
  var x = pageXOffset;
  var y = pageYOffset
  var styleNode = document.getElementById(STYLE_ID);
  if (styleNode) {
    styleNode.parentNode.removeChild(styleNode);
    sessionStorage.removeItem("dark-site");
  } else {
    darken();
  }
  scrollTo(x, y); // Restore scroll positions
}

function $(aSelector, aNode) {
  return (aNode || document).querySelector(aSelector);
}