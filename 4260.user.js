// ==UserScript==
// @name           Ubuntuusers Fix Titles
// @namespace      http://userscripts.org/scripts/show/4260
// @description    Titel der Webseiten im ubuntuusers-Forum umsortieren, damit die relevanten Daten zuerst angezeigt werden.
// @source         http://userscripts.org/scripts/show/4260
// @version        0.3
// @date           2006-06-23
// @creator        Pepino <pepino@jabber.ccc.de>
// @include        http://forum.ubuntuusers.de/topic*
// @include        http://forum.ubuntuusers.de/viewtopic.php*
// @include        http://forum.ubuntuusers.de/forum*
// ==/UserScript==
// 
// **COPYRIGHT NOTICE**
// 
// Copyright (C) 2006 and onwards Pepino
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
// 
// **END COPYRIGHT NOTICE**
//
//
// Changelog:
// 0.3 (2006-06-23)
// 	added 'viewtopic.php' to the included URLs
// 0.2 (2006-06-21)
// 	change in order of the title parts
// 0.1 (2006-06-20)
// 	original release
// 
// To do:
// * handle other seperators than " - "
// * handle dynamic count of seperators
//
// -------------------------------------------------------------------------------------------------

t = document.title;
i = t.indexOf(' - ');
if (i > 0) site = t.substring(0, i);

// Thema
if (i > 0) rest = t.substring(i + 3);
i = rest.indexOf(' - ');
if (i > 0) thread = rest.substring(0, i) + " - ";
else thread = rest + " - ";

// Title
if (i > 0) title = rest.substring(i + 3) + " - ";
else title = "";

if (title=="Thema anzeigen - ") document.title = thread + title + site;
else  document.title = title + thread + site;
