// ==UserScript==
// @name          Flickr Visited Link Highlighter
// @description   Highlights visited links on Flickr with a different color
// @author        Ricardo Mendonça Ferreira - http://www.flickr.com/photos/ricardo_ferreira/
// @namespace     http://userscripts.org/scripts/show/81151
// @include       http://*.flickr.com/*
// @include       http://flickr.com/*
// @exclude       http://*flickr.com/photos/organize*
// @version       2010.07.09
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
// Copyright (C) 2010 by Ricardo Mendonça Ferreira
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 3
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
// 2010.07.09  First test version, private use only

(function () {

   GM_addStyle("a:visited { color: #FF0084 }");

})();
