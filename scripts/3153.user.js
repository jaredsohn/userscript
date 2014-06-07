/* vim: ts=4 noet ai :
$Id: $

LICENSE
=======

Copyright 2006 in Canada by Andy Kaplan-Myrth.

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; either version 2 of the License, or (at your
option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
59 Temple Place, Suite 330, Boston, MA 02111-1307 USA


CHANGELOG
=========

Version 1.00
    - initial release

      


*/
// ==UserScript==
// @name           Blank Title Fixer
// @namespace      http://andy.kaplan-myrth.ca
// @description    Adds a default title for when a page's title is blank. This is necessary for the wicked new Firefox extension, MyStickies, which currently appears to require a title.
// @include        *
// ==/UserScript==

t = document.title;
if (t == "") document.title = 'Blank';
