// ==UserScript==
// @name           Wikimedia Custom Search Engine EN, DE, FR
// @description    Changes the Wikipedia search to use Google site search instead

// @include        *wikimedia.org*

// @include        *en.wikipedia.org*
// @include        *en.wikibooks.org*
// @include        *en.wikiversity.org*
// @include        *en.wikinews.org*
// @include        *en.wikisource.org*
// @include        *en.wikiquote.org*
// @include        *en.wiktionary.org*

// @include        *de.wikipedia.org*
// @include        *de.wikibooks.org*
// @include        *de.wikiversity.org*
// @include        *de.wikinews.org*
// @include        *de.wikisource.org*
// @include        *de.wikiquote.org*
// @include        *de.wiktionary.org*

// @include        *fr.wikipedia.org*
// @include        *fr.wikibooks.org*
// @include        *fr.wikiversity.org*
// @include        *fr.wikinews.org*
// @include        *fr.wikisource.org*
// @include        *fr.wikiquote.org*
// @include        *fr.wiktionary.org*
	
// ==/UserScript==

/*  Copyright (C) 2008 Christian Schneider <www.chrigu-schneider.ch>

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
*/


var searchInput=document.getElementById("searchInput");
searchInput.setAttribute("name","q");

var searchForm=document.getElementById("searchform");
searchForm.setAttribute("action","http://www.google.com/cse"); 
searchForm.setAttribute("id","cse-search-box");

var cx=document.createElement("input");
cx.setAttribute("type","hidden");
cx.setAttribute("name","cx"); 
cx.setAttribute("value","017943776990519782682:silrqvmvrvo");
searchForm.appendChild(cx);

var goButton=document.getElementById("searchGoButton");
goButton.setAttribute("name","sa");
goButton.setAttribute("value","Wiki");
