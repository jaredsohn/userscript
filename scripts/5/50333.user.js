// ==UserScript==
// @name           camp-firefox.de Newposts Login Redirect 
// @namespace      boardraider@camp-firefox.de
// @description    http://userscripts.org/scripts/show/50333
// @version        0.1
// @date           2009-05-28
// @copyright      2009, boardraider
// @license        GPL 2 or later
// @include        http://www.camp-firefox.de/forum/search.php?search_id=newposts*
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
    
var link = document.evaluate("//li[@class='icon-logout']/a",
  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
  null).singleNodeValue;
if (link.textContent.match("Anmelden")) {
  // if not logged in
  window.location = "http://www.camp-firefox.de/forum/ucp.php?mode=login&" + 
    "redirect=http://www.camp-firefox.de/forum/search.php?search_id=newposts";
}

})();