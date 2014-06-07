// ==UserScript==
// @name           Google Wikipedia
// @description    Changes the Wikipedia search to use Google site search instead
// @include        *wikipedia.org*
// ==/UserScript==

/*  Copyright (C) 2006 Matthew Flaschen <matthew DOT flaschen AT gatech DOT edu>

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

var searchInput=document.getElementById("searchInput"); // Finds the search box
searchInput.setAttribute("name","q"); // changes the name to "q" because that is the name Google uses

var searchForm=document.getElementById("searchform"); // Finds the form itself

searchForm.setAttribute("action","http://www.google.com/search"); 
// Previous line changes the action (where the data is sent after submission)

var siteSearch=document.createElement("input");
siteSearch.setAttribute("type","hidden"); //It made an input box then hid it
siteSearch.setAttribute("name","sitesearch"); //It will tell Google this is a site search
siteSearch.setAttribute("value",window.location.host); //This will fill in Wikipedia's domain as the site
searchForm.appendChild(siteSearch); //Adds it to the form

var goButton=document.getElementById("searchGoButton"); //Finds the go button
goButton.setAttribute("type","button"); //Changes it from submitting the form to just being a button.
goButton.addEventListener("click",function () {var queryBox=document.getElementById("searchInput");window.location="http://"+window.location.host+"/wiki/"+queryBox.value;},false); 
// Previous line sets up button so it will go to the Wikipedia article with the search as its title.
// It will not execute a search.  If there is no article with that title, it will go to an error page.

