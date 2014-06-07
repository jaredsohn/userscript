// ==UserScript== -*- coding: utf-8 -*-
// @name           Fix NAVER Matome Pagination Links
// @description    「NAVER まとめ」のページリンク(1 2 3 …)をJavaScript無しで參照可能な普通のリンクに直す。
// @include        http://matome.naver.jp/odai/*
// @copyright      Copyright © 2012  MORIYAMA Hiroshi
// @author         MORIYAMA Hiroshi <hiroshi@kvd.biglobe.ne.jp>
// @license        GNU GPL version 3, or any later version
// ==/UserScript==

// This file is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This file is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this file.  If not, see <http://www.gnu.org/licenses/>.

(function(){
  var url = location.href.match(/^(http:\/\/matome\.naver\.jp\/odai\/[0-9]+)($|#|\?page=([0-9]+))/);
  var baseurl = url[1];
  var currentPageNumber = (url[3] || 1);
  var xpathToPaginationLinks = "/descendant::*[@class='MdPagination03']/descendant::a[@href='#']";
  var paginationLinks = document.evaluate(xpathToPaginationLinks,
                                          document.documentElement, null, 7, null);
  for (var i = 0; i < paginationLinks.snapshotLength; i++) {
    var link = paginationLinks.snapshotItem(i);
    var pageNumber = link.textContent.replace(/^\s*|\s*$/g, "");
    link.href = baseurl + "?page=" + pageNumber;
    if (pageNumber - currentPageNumber == 1) {
      link.rel = "next";
    }
    else if (currentPageNumber - pageNumber == 1) {
      link.rel = "prev";
    }
  }
})();
