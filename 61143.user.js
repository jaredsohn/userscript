// ==UserScript==
// @name          Flickr Copy Tags
// @description   Allows you to easily copy all tags of a photo
// @author        Ricardo Mendonça Ferreira - http://www.flickr.com/photos/ricardo_ferreira/
// @namespace     http://www.flickr.com/photos/ricardo_ferreira/
// @include       http://*.flickr.com/photos/*/*
// @include       http://flickr.com/photos/*/*
// @exclude       http://*flickr.com/photos/organize*
// @version       2010.01.01
// ==/UserScript==

// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
// Copyright (C) 2009 by Ricardo Mendonça Ferreira
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License is available by visiting
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA
// --------------------------------------------------------------------

// History:
// --------
// 2009.11.03  First test version, private use only
// 2009.01.01  Show tags also in a format for easy reuse on Flickr

(function () {

   var div = document.evaluate("//div[@class='TagList']", document, null,
                        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   if (div && div.snapshotLength) {
      var r = document.body.innerHTML.match(/tags_rawA.push\('(.+?)'/g);
      var txt = "- - - [CSV format] - - - - - - - - - \n";

      for (var i=0; i < r.length; i++) {
         txt += r[i].substring(16, r[i].length -1);
         if (i < r.length -1)
            txt += ', ';
      }
      txt += "\n- - - [Flickr format] - - - - - - - - - \n";
      for (var i=0; i < r.length; i++) {
         txt += '"'+r[i].substring(16, r[i].length -1) + '"';
         if (i < r.length -1)
            txt += ' ';
      }

      var a = document.createElement("a");
      a.innerHTML = "&nbsp; <small> [copy tags]</small>";
      a.setAttribute("style", "text-decoration:none");
      a.href = "javascript:;";
      a.addEventListener("click", function () { alert(txt) }, false);
      div.snapshotItem(0).children[0].appendChild(a);
//    div.snapshotItem(0).insertBefore(a, div.snapshotItem(0).children[2]);
   }

})();
