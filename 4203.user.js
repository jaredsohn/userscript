// ==UserScript==
// @name	Flickr Refer Comment
// @namespace	http://6v8.gamboni.org/
// @description Auto comment the place where you come from
// @version        2.0
// @identifier	http://6v8.gamboni.org/IMG/js/flickrrefercomment.user.js
// @date           2010-07-10
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @match http://flickr.com/photos/*/*
// @match http://*.flickr.com/photos/*/*
// @include http://*flickr.com/photos/*/*
// @exclude http://*flickr.com/photos/*/*#preview
// @exclude http://*flickr.com/photos/organize*
// ==/UserScript==

// --------------------------------------------------------------------
// Copyright (C) 2010 Pierre Andrews
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

var bookmarkletURL="http://6v8.gamboni.org/IMG/js/bookmarklet_refercomment.js";
var script=document.createElement("script");
script.type="text/javascript";
script.src=bookmarkletURL;
var head=document.getElementsByTagName("head")[0];
head.appendChild(script);
