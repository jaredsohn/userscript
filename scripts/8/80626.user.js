// ==UserScript==
// @name          eBayItemNumber
// @version       1.0.0.0
// @date          7/1/2010
// @namespace     http://userscripts.org/
// @description   Show item number next to eBay items in the overview.
// @creator       leadrouo
// @id            8746c50f-302f-425f-b652-56896b9d2dd8
// @include       http://*.ebay.tld/*
// ==/UserScript==
//
// © 2010 leadrouo
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// version 3 as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You can receive a copy of the GNU General Public License by
// visiting http://www.gnu.org/licenses/gpl-3.0.html

(function()
{
  var articleLinks = document.querySelectorAll("a.v4lnk");

  for (i = 0; i < articleLinks.length; ++i) {
    var link = articleLinks[i]; 
    var url = link.href;
    var itemNumber = url.replace(/^.*\/(\d+)\?pt.*$/, "$1");
    var br = document.createElement("br");
    var textItemNumber = document.createTextNode(itemNumber);
    link.parentNode.appendChild(br);
    link.parentNode.appendChild(textItemNumber);
  }
})();
