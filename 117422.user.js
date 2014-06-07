// ==UserScript== -*- coding: utf-8; c-basic-offset: 2; indent-tabs-mode: nil; tab-width: 8 -*-
// @name           Fix Hatena::Antenna
// @description    はてなアンテナのリンクから「リダイレクタ」を取除き、日附の見出しを附ける。
// @version        1.1.0
// @namespace      http://userscripts.org/users/82654
// @include        http://a.hatena.ne.jp/*/*
// @exclude        http://a.hatena.ne.jp/*/image*
// @copyright      © 2011  MORIYAMA Hiroshi
// @author         MORIYAMA Hiroshi <hiroshi@kvd.biglobe.ne.jp>
// @license        GPLv3 or any later version
// ==/UserScript==

// Fix Hatena::Antenna is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Fix Hatena::Antenna is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Fix Hatena::Antenna. If not, see <http://www.gnu.org/licenses/>.

/// ChangeLog:

// 2012-01-18  MORIYAMA Hiroshi  <hiroshi@kvd.biglobe.ne.jp>

// 	* 先頭と末尾に書いてゐたファイル名を削除。及びEmacs用變數指定コメントの
// 	位置を微修正。

// 	* 著者スタイルシートを正しく反映させるため、リストの要素型を UL からは
// 	てなアンテナの元々のマーク附けである OL へ修正。thank you Kahusi-san
// 	<https://twitter.com/kahusi/status/159287202189283328>。

//	* 著者スタイルシート尊重のため獨自のインラインスタイル追加を全て廢止。

// 	* Version 1.1.0 released on Userscripts.org.

// 2011-11-06  MORIYAMA Hiroshi  <hiroshi@kvd.biglobe.ne.jp>

// 	* fix_hatenaantenna.user.js: version 1.0.0 published on the
// 	UserScripts.org <URL:http://userscripts.org/users/82654>.

/// Code:

(function(){
  function makeList () {
    var list = document.createElement("ol");
    return list;
  }

  function makeListItem () {
    var listItem = document.createElement("li");
    return listItem;
  }

  function makeSection (headingText, /* Optional: */ body) {
    var section = document.createDocumentFragment();

    if (headingText) {
      var newHeading = document.createElement("h2");
      newHeading.appendChild(document.createTextNode(headingText));
      section.appendChild(newHeading);
    }
    if (body) {
      section.appendChild(body);
    }

    return section;
  }

  function categolzeByDate () {
    for (var i = 0; i < origListItems.length; i++) {
      var origListItem = origListItems.item(i);
      var dateAndTime = origListItem.getElementsByTagName("span").item(0).textContent.split(" ");
      var date = dateAndTime[0];
      var time = dateAndTime[1].replace(/:[0-9]{2}$/, ""); // Remove seconds
      var newListItem = makeListItem();

      if (!sections[date]) {
        var newList = makeList();
        sections[date] = makeSection(date, newList);
        dates.push(date);
      }

      if (location.href.match(REGEXP_HATENA_ANTENNA_SIMPLE_MODE_URL)) {
        newListItem.appendChild(document.createTextNode(time + " "));
        newListItem.appendChild(origListItems.item(i).getElementsByTagName("a").item(0).cloneNode(true));
      }
      else {
        newListItem = origListItems.item(i).cloneNode(true);
      }

      newList.appendChild(newListItem);
    }
  }

  function addDateHeadings () {
    var HATENA_ANTENNA_URL_RE =
      // $1    username
      // $2    mode (e.g. "simple", "image" or none as normal mode)
      //
      new RegExp("^http://a\\.hatena\\.ne\\.jp/([^/]+)/(simple)(?:\\?.*)?$");
    var sections = {};
    var dates = [];
    var origList = document.evaluate("descendant::ol[@start='1'][1]", document, null, 9, null).singleNodeValue;
    if (origList) {
      var origListItems = origList.getElementsByTagName("li");
    }
    else {
      return;
    }

    for (var i = 0; i < origListItems.length; i++) {
      var origListItem = origListItems.item(i);
      var modified = document.evaluate("child::span[@class='modified'][1]",
                                       origListItem, null, 9, null).singleNodeValue;
      if (! modified) {
        return;
      }

      modified = modified.textContent.replace(/^\s+|\s+$/g, "").split(" ");
      var date = modified[0];
      var time = modified[1].replace(/:[0-9]{2}$/, ""); // Remove seconds
      var newListItem = makeListItem();

      if (!sections[date]) {
        var newList = makeList();
        sections[date] = makeSection(date, newList);
        dates.push(date);
      }

      if (location.href.match(HATENA_ANTENNA_URL_RE)) {
        newListItem.appendChild(document.createTextNode(time + " "));
        newListItem.appendChild(origListItems.item(i).getElementsByTagName("a").item(0).cloneNode(true));
      }
      else {
        newListItem = origListItems.item(i).cloneNode(true);
      }

      newList.appendChild(newListItem);
    }

    dates.forEach(function(date){
      origList.parentNode.insertBefore(sections[date], origList);
    });
    origList.parentNode.removeChild(origList);
  }

  function deleteRedirects () {
    var HATENA_ANTENNA_REDIRECT_URL_RE =
      new RegExp("^http://a\\.st-hatena\\.com/go\\?(https?://.+)(?:[0-9]{14})$");
    var xpath = "/descendant::a[starts-with(attribute::href, 'http://a.st-hatena.com/go?')]";
    var links = document.evaluate(xpath, document, null, 6, null);
    for (var i = 0, len = links.snapshotLength; i < len; i++) {
      var link = links.snapshotItem(i);
      var m = link.href.match(HATENA_ANTENNA_REDIRECT_URL_RE);
      if (m) {
        link.href = m[1];
      }
    }
  }

  addDateHeadings();
  deleteRedirects();
})();
