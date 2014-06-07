// File encoding: UTF-8
// ==UserScript==
// @name          About.com Visited Link Highlighter
// @description   Highlights visited links on About.com with a different color
// @author        Ricardo Mendonça Ferreira - ricspam@mpc.com.br
// @namespace     http://userscripts.org/scripts/show/155280
// @include       http://*.about.com/*
// @include       http://about.com/*
// @match         http://*.about.com/*
// @match         http://about.com/*
// @version       0.1
// @grant         
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
// Copyright (C) 2012 by Ricardo Mendonça Ferreira
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
// 2012.12.30 - 0.1 - First test version, private use only

(function () {

   GM_addStyle("a:visited { color: #FF0084 }");

})();