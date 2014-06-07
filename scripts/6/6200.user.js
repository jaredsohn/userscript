// Firefox Start Page More Link
// version 1.0
// 10/31/2007

// ==UserScript==
// @name         Firefox Start Page More Link
// @namespace    none
// @description  Adds a "more >>" link to the default start pages in Firefox
// @include      http://www.google.com/firefox?client=firefox-a&rls=org.mozilla:en-US:official*
// ==/UserScript==
		 		
/* BEGIN LICENSE BLOCK
Copyright (C) 2006 Gabe Gorelick
This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You can download a copy of the GNU General Public License at <http://www.gnu.org/licenses/>.
END LICENSE BLOCK */

var more = document.createElement('a');
more.innerHTML = '<a class="q" style="font-weight: bold"' + 		              'href="http://www.google.com/intl/en/options/">more&nbsp&#187';

var f = document.getElementsByTagName("font");
f[0].appendChild(more);