// ==UserScript== -*- coding: utf-8 -*-
// @name           Togetter Read More Link
// @version        1.1.0
// @description    Togetterの「残りを読む」ボタンを普通のリンクに直す。
// @include        http://togetter.com/li/*
// @include        http://togetter.com/api/moreTweets/*
// @copyright      Copyright © 2012  MORIYAMA Hiroshi
// @author         MORIYAMA Hiroshi <hiroshi@kvd.biglobe.ne.jp>
// @license        GNU GPL version 3, or any later version
// ==/UserScript==/

// This scrip is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This file is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this file.  If not, see <http://www.gnu.org/licenses/>.

/// ChangeLog:

// 2012-04-13  MORIYAMA Hiroshi  <hiroshi@kvd.biglobe.ne.jp>
//
// 	* Removed the dependence on the author script.
//
// 	* Added the version number 1.1.0.

// 2012-03-13  MORIYAMA Hiroshi  <hiroshi@kvd.biglobe.ne.jp>
//
// 	* Publishd on Userscripts.org
// 	<http://userscripts.org/scripts/show/128182>.

/// Code:

(function(){
  var m = location.href.match(new RegExp("^http://togetter\\.com"
                                         + "(/li|/api/moreTweets)/"
                                         + "([0-9]+)(\\?page=([0-9]+))?"));
  var articleID = m[2];
  var currentPageNumber = parseInt(m[4] || 1);

  if (articleID) {
    var xpath = "/descendant::div[@id='more_tweet_box_" + articleID + "']"
      + "/child::a[@onclick]";
    var readMoreButton = document.evaluate(xpath, document, null, 9, null)
      .singleNodeValue;

    if (readMoreButton) {
      var link = document.createElement("a");
      var nextPageNumber = currentPageNumber + 1;
      link.href = "http://togetter.com/api/moreTweets/" + articleID
        + "?page=" + nextPageNumber;
      link.textContent = "Next: " + document.title.replace(/ - Togetter/i, "")
        + " (Page " + nextPageNumber + ")";
      link.rel = "next";
      readMoreButton.parentNode.replaceChild(link, readMoreButton);
    }

    // Insert stylesheet link.
    if (location.href.match(/\/api\/moreTweets\//)) {
      var parent = document.getElementsByTagName("head").item(0);
      if (parent) {
        var styleLink = document.createElement("link");
        styleLink.type = "text/css";
        styleLink.rel = "stylesheet";
        styleLink.href = "http://togetter.com/css/1.3.15/twitter.css";
        parent.appendChild(styleLink);
      }
    }
  }
})();
