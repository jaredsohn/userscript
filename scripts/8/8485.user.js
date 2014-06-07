// ==UserScript==
// @name           TLD shortcut corrector
// @namespace      http://www.prism.gatech.edu/~mflaschen3
// @description    Corrects incorrect automatic domain suffixes caused by keyboard shortcuts (e.g. http://www.google.com.net/
/*  Copyright (C) 2007 Matthew Flaschen <matthew DOT flaschen AT gatech DOT edu>

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

    The GPL is also available from my site, at http://www.prism.gatech.edu/~mflaschen3/gpl.txt
*/
// @include        *.com*.com/
// @include        *.com*.net/
// @include        *.com*.org/
// @include        *.net*.com/
// @include        *.net*.net/
// @include        *.net*.org/
// @include        *.org*.com/
// @include        *.org*.net/
// @include        *.org*.org/
// @exclude        *?*
// @exclude        http://www.com*
// @exclude        http://www.net*
// @exclude        http://www.org* 
// @exclude        http://com*
// @exclude        http://net*
// @exclude        http://org*
// @exclude        *netcraft.com*
// @exclude        *openoffice.org*
// @exclude        *news.com.com*
// @exclude        *.comcast.net*
// @exclude        *.computer*
// @exclude        http://web.archive.org/*
// @exclude        *sixxs.org*
// @exclude        *netapp*
// ==/UserScript==

var url = window.location.href;
location.replace(url.substring(0, url.length - 5));
