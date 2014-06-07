// Rotten Tomatoes->Torrents Linker 2.2

// ==UserScript==
// @name          Rotten Tomatoes->Torrents Linker
// @namespace     http://eric.themoritzfamily.com/greasemonkey/
// @description   Places links to various torrentsites on Rotten Tomatoes.

// @include       http://www.rottentomatoes.com/m/*
// ==/UserScript==

/*
 BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
 */
/* This script used code from Arvid Jakobsson's IMDB>Torrent Linker script */
(function() {
  function getSearchTerm() {
    return document.getElementById('rtbt_search').value;
  }

  function Tracker(shortname, icon, searchurl) {
    this.shortname = shortname;
    this.icon = icon;
    this.searchurl = searchurl;

    this.getHTML = function () {
      
      var html = document.createElement('span');
 
      html.style.fontFamily = "Verdana, Arial, Helvetica, sans-serif";
      html.style.fontWeight = "bold";
      html.style.fontSize   = "10px";
      html.style.cursor     = "pointer";

      if (this.icon != "") {
	var img = document.createElement('img');
	img.setAttribute("width",16);
	img.setAttribute("heigth",16);
	img.setAttribute("border",0);
	img.setAttribute("src",this.icon);
	img.setAttribute("alt",this.shortname);
	img.setAttribute("searchurl",this.searchurl);
	img.addEventListener("click", function (evt) { openInTab(this.getAttribute("searchurl")); }, false);      	
	html.appendChild(img);
      }
      else {
	html.innerHTML = this.shortname;
      }

      return html;
    }
		
  }

  function openInTab(searchurl) {
    var url = searchurl + escape(getSearchTerm());

    if(GM_openInTab)
      GM_openInTab(url);
    else 
      window.location = url;
  }


  function openAllInTabs() {
    for (var i = 0; i < trackers.length; i++) {
      GM_openInTab(trackers[i].searchurl + escape(getSearchTerm()));
    }
  }

  function xpath(query, context) {
    return document.evaluate(query, document, null,
			     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  }

  function getTitle() {
    head = xpath("//head/title", document);
    
    if (!head || head.snapshotLength != 1) {
      GM_log("Error! Quiting!");
      return;
    }
		
    var title = head.snapshotItem(0).innerHTML;
    
    return title.replace(/[^\s\w]+/g,"");
  }
  
	
  function addIconBarIcons(title, trackers) {
    var iconbar = xpath("//div[@id='main']", document);
    
    if (!iconbar || iconbar.snapshotLength != 1) {
      GM_log("Error! Quiting!");
      return;
    }
	
    main_div = iconbar.snapshotItem(0);
    iconbar  = document.createElement("table");
    
    var tdimg;

    tdimg = document.createElement("td");
    tdimg.setAttribute("valign","top");

    search_term_input = document.createElement("input");
    search_term_input.setAttribute("id","rtbt_search");
    search_term_input.value=title;
    search_term_input.style.fontFamily = "Verdana, Arial, Helvetica, sans-serif";
    search_term_input.style.height     = "16px";
    search_term_input.style.fontSize   = "10px";
    search_term_input.style.border     = "solid 1px black";
    search_term_input.style.marginTop  = "0px";
    search_term_input.style.width      = (title.length + 5) + "em";    
    tdimg.appendChild(search_term_input);
    
    iconbar.appendChild(tdimg);

    for (var i = 0; i < trackers.length; i++) {
	tdimg = document.createElement("td");
	tdimg.appendChild(trackers[i].getHTML());
	iconbar.appendChild(tdimg);
    }

		
    if (GM_openInTab) {
      var td_openall = document.createElement("td");
      td_openall.innerHTML = "OPEN ALL";
      td_openall.setAttribute('href',"javascript:;");
      
      
      td_openall.style.fontWeight = "401"; 
      td_openall.style.fontFamily = "Verdana, Arial, Helvetica, sans-serif";
      td_openall.style.fontSize   = "10px";
      td_openall.style.cursor     = "pointer";
      td_openall.addEventListener("click", function () { openAllInTabs(); }, false);
      
      iconbar.appendChild(td_openall);
    }
    main_div.insertBefore(iconbar,main_div.firstChild);
  }
	
  // --------------- TRACKERS --------------- 
	
  var trackers = new Array();
  
  trackers.push(new Tracker("SD", 
			    "http://seedler.org//images/favicon.ico", 
			    "http://seedler.org/en/html/search/"));

  trackers.push(new Tracker("TPB", 
			    "http://thepiratebay.org/favicon.ico", 
			    "http://thepiratebay.org/search.php?video=on&q="));

  trackers.push(new Tracker("MN",  
			    "http://mininova.org/favicon.ico", 
			    "http://mininova.org/search/?cat=4&search="));



  // --------------- END OF TRACKERS --------------- 

  var title = getTitle();
  addIconBarIcons(title, trackers);

})();

