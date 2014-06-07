// ==UserScript== -*- coding: utf-8 -*-
// @name           Link Twitter to Twilog
// @namespace      http://userscripts.org/users/82654
// @include        https://twitter.com/*
// @version        0.9.0
// @author         MORIYAMA Hiroshi <hiroshi@kvd.biglobe.ne.jp>
// @copyright      © 2012  MORIYAMA Hiroshi
// @license        GPLv3 or any later version
// ==/UserScript==

// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

/// Commentary:

//

/// Code:

(function(){
  var m = location.href.match("^https://twitter\\.com/(?:#!/)?([^/?&;]+)");
  if (m) {
    document.body.addEventListener("DOMNodeInserted", function(evt) {
      var username = m[1];
      var container = document.evaluate("descendant::*[@id='page-container']"
                                        + "/descendant::*[contains(@class, "
                                        + "'profile-card-inner')]",
                                        document.body, null, 9,
                                        null).singleNodeValue;
      if (container) {
        var para = document.createElement("p")
        var link = document.createElement("a");
        link.href = "http://twilog.org/" + m[1] + "/asc";
        link.textContent = "Twilog @" + m[1];
        para.title = 'Inserted by userscript "Link Twitter to Twilog"';
        para.appendChild(link);
        if (! document.evaluate("descendant::a[@href='" + link.href + "'"
                                + " and . = '" + link.textContent + "'" + "]",
                                document.body, null, 9, null).singleNodeValue) {
          container.appendChild(para);
        }
      }
    }, true);
  }
})();

/// Link Twitter to Twilog ends here.
