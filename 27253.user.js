// ==UserScript==
// @name           Wikimedia Custom Search Engine EN, DE, FR
// @description    Changes the Wikipedia search to use Google Coustom Search Engine instead

// @include        *wikimedia.org*

// @include        *de.wikipedia.org*
// @include        *de.wikibooks.org*
// @include        *de.wikiversity.org*
// @include        *de.wikinews.org*
// @include        *de.wikisource.org*
// @include        *de.wikiquote.org*
// @include        *de.wiktionary.org*

	
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
cx.setAttribute("value","017943776990519782682:wufpdcudqwo");
searchForm.appendChild(cx);

var goButton=document.getElementById("searchGoButton");
goButton.setAttribute("name","sa");
goButton.setAttribute("value","Wiki");

var webButton=document.getElementById("mw-searchButton");
searchForm.removeChild(webButton);