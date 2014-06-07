// ==UserScript==
// @name           camp-firefox.de Login To Quote
// @namespace      boardraider@camp-firefox.de
// @description    http://userscripts.org/scripts/show/51045
// @version        0.1
// @date           2009-06-08
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
    
var link = document.evaluate("//li[@class = 'icon-logout']/a",
  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
  null).singleNodeValue;
if (link.textContent.match("Anmelden")) {
  // not logged in
  var forumID = document.evaluate("//a[@class = 'print']",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue.href.split("f=")[1].split("&")[0];
  var postBodies = document.evaluate("//div[@class = 'postbody']", document,
    null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var body, ul, postID;
  for (var i = 0; i < postBodies.snapshotLength; i++) {
    body = postBodies.snapshotItem(i);
    postID = document.evaluate(".//a[starts-with(@href, '#p')]",
      body, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
      null).singleNodeValue.href.split("#p")[1];
    ul = document.createElement("ul");
    ul.setAttribute("class", "profile-icons");
    ul.innerHTML = "<li class=\"quote-icon\">" +
      "<a href=\"./ucp.php?mode=login&redirect=" +
      "http://www.camp-firefox.de/forum/posting.php?mode=quote%26" +
      "f=" + forumID + "%26p=" + postID + "\" " +
      "title=\"Mit Zitat antworten\"><span>Mit Zitat antworten</span></a></li>";
    body.insertBefore(ul, body.firstChild);
  }
}

})();