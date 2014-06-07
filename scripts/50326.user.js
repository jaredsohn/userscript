// ==UserScript==
// @name           Signature Image Purger For PHPBB3
// @namespace      boardraider@camp-firefox.de
// @description    http://userscripts.org/scripts/show/50326
// @version        0.1.1
// @date           2009-06-17
// @copyright      2009, boardraider
// @license        GPL 2 or later
// @include        http://www.camp-firefox.de/forum/viewtopic.php?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// -----------------------------------------------------------------------------

(function () {

// Preserve links behind images
var links = document.evaluate("//div[starts-with(@id, 'sig')]//img" +
  "/ancestor::a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
var link;
for (var i = 0; i < links.snapshotLength; i++) {
    link = links.snapshotItem(i);
    if (!link.textContent.match(/\S/)) {
      // if there is just whitespace left
      link.innerHTML = link.href;
    }
}
// Hide all other images
addStyle("div.signature img {display: none !important;");

function addStyle(css) {
  if (GM_addStyle) {
    GM_addStyle(css);
  } else {
    var head = document.getElementsByTagName("head")[0];
    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode(css));
    head.appendChild(node);
  }
}

})();