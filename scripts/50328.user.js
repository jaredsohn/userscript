// ==UserScript==
// @name           Redirect Jumper
// @namespace      boardraider@camp-firefox.de
// @description    http://userscripts.org/scripts/show/50328
// @version        0.1.1
// @date           2009-05-28
// @copyright      2009, boardraider
// @license        GPL 2 or later
// @include        http://www.camp-firefox.de/forum/*
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

var content = document.evaluate("//meta[@http-equiv='refresh']/@content",
  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
  null).singleNodeValue;
var target;
if (content) {
  target = content.value.substr(content.value.indexOf(";url=") + 5);
  // Don't force immediate redirect for page refreshs
  if (target != window.location.href) {
    window.location = target; 
  }
}

})();