// IMDB->subs,trailer,edk and Torrents Linker 2.4

// ==UserScript==
// @name          IMDB->subs,trailer,edk and Torrents Linker
// @namespace     tag:blurymind@gmail.com,2005-06-07:IMDB->Torrents.
// @description   Places links to various torrent search engines,edk filehash search,subtitles,cover/pictures search and a trailer of the movie on IMDB. Version 2.4,based on original script by Arvid.

// @include       http://www.imdb.com/title/*/
// @include       http://www.imdb.com/title/*/#*
// @include       http://www.imdb.com/title/*/combined*
// @include       http://www.imdb.com/title/*/maindetails*

// @include       http://imdb.com/title/*/
// @include       http://imdb.com/title/*/#*
// @include       http://imdb.com/title/*/combined*
// @include       http://imdb.com/title/*/maindetails*
// ==/UserScript==

/*
Changelog:

2005-11-19 2.4
*removed torrent typhoon (wasnt working really),sweebits (registration wasnt possible),torrentbytes(same)
*added ability to search for a cover/pictures of the movie in www.picsearch.com
*added ability to search in edk filehash (edonkey,emule network)
*many thanks to original creator!

2005-11-13 2.3
*added 4 tracker search crawers:isohunt,yotoshi,tor-bott,bittirrent
*added Trailer search ability,searching in yahoo videos
*added subtitles searching ability: subdb.net ,google ,

2005-08-16 2.2	
* Added the tracker object
* More cleanup.
* Added a link to Torrent Typhoon (excellent searchpage, recommended)
Torrent Typhoon searches The Pirate Bay and Mininova, so I removed them.
But i kept the ability to search on IMDB-ID on Mininova
* Added the open all in tabs function. It only works in Greasemonkey 0.5 though

2005-08-14 2.1
* Removed non-ascii chars.
* Added the xpath function
* Added the license block
* General cleanup
* Divided code into functions

*/

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
 
(function() {
	function Tracker(shortname, icon, searchurl, usesIMDBID) {
		this.shortname = shortname;
		this.icon = icon;
		this.searchurl = searchurl;
		this.usesIMDBID = usesIMDBID;
		
		this.getHTML = function (inclIMDBID) {
			var html = "<font face=\"Verdana, Arial, Helvetica, sans-serif\" size=\"-2\"><b>" +
							"<a href=\"" + this.searchurl;
	
			if (this.usesIMDBID && inclIMDBID)
				html += id;
			else
				html += escape(title);
	
			html += "\">";

			if (this.icon != "") {
				html += "<img width=\"16\" heigth=\"16\" border=\"0\" src=\"" + this.icon + "\" alt=\"" + this.shortname + "\">";
			}
			else {
				html += this.shortname;
			}
			html += "</b></font>";
			return html;
		}
		
	}

	function openAllInTabs(title, id, inclIMDBID) {
		for (var i = 0; i < trackers.length; i++) {
			if (trackers[i].usesIMDBID && inclIMDBID) {
				GM_openInTab(trackers[i].searchurl + id);
			}
			else if (trackers[i].usesIMDBID && !inclIMDBID) {
				continue;
			}
			else {
				GM_openInTab(trackers[i].searchurl + escape(title));
			}
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
		title = title.substring(0, title.indexOf("(")-1);
		
		regexp = /'|,|:/g;
		title = title.replace(regexp, " ");
		
		return title;
	}
	
	
	function getId() {
		with (location.href) {
			var id = substring(indexOf("title/tt") + 8, indexOf("/", indexOf("title/tt") + 8));
		}
		return id;
	}
	
	
	function addIconBarIcons(title, id, trackers) {
		var iconbar = xpath("//strong[@class='title']/../../p[1]/table/tbody/tr", document);
	
		if (!iconbar || iconbar.snapshotLength != 1) {
			GM_log("Error! Quiting!");
			return;
		}
	
		iconbar = iconbar.snapshotItem(0);
		iconbar.id = "iconbar";
		
		var tdimg;
		var html;
		for (var i = 0; i < trackers.length; i++)
		{
			tdimg = document.createElement("td");
			tdimg.innerHTML = trackers[i].getHTML(true);
			iconbar.appendChild(tdimg);
		}

		
		if (GM_openInTab) {
			var tdopenall = document.createElement("td");
			var aopenall = document.createElement("a");
			aopenall.innerHTML = "OPEN ALL";
			aopenall.href = "javascript:;";
			aopenall.setAttribute("style", "font-weight: 401; font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 10px");
			aopenall.addEventListener("click", function () { openAllInTabs(title, id, true); }, false);
			tdopenall.appendChild(aopenall);
			
			iconbar.appendChild(tdopenall);
		}
	}
	
	function addAkaIcons(id, trackers) {
		var aka = xpath("//strong[@class='title']/../../b",	document);
		
		if (!aka) {
			GM_log("Error! Quiting!");
			return;
		}
	
		for (var i = 0; i < aka.snapshotLength; i++) {
			if (aka.snapshotItem(i).innerHTML == "Also Known As:") {
				aka = aka.snapshotItem(i);
				var found = true;
				break;
			}
		}
	
		if (found) {
			aka = aka.nextSibling.nextSibling.nextSibling;
			var link_span;
			var delim_text;
			do {
				var title = aka.previousSibling.nodeValue;
				title = title.substring(0, title.indexOf("(")-1);
	
				title = title.replace(/'|,|:/g, "");
			
				for (var i = 0; i < trackers.length; i++) {
					if (!trackers[i].usesIMDBID) {
						link_span = document.createElement("span");

						link_span.innerHTML = trackers[i].getHTML(false);
						aka.parentNode.insertBefore(link_span, aka);
						
						delim_text = document.createTextNode(" ");
						aka.parentNode.insertBefore(delim_text, aka);
					}
				}
				
				if (GM_openInTab) {
					var aopenall = document.createElement("a");
					aopenall.innerHTML = "OPEN ALL";
					aopenall.href = "javascript:;";
					aopenall.setAttribute("style", "font-weight: 401; font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 10px");
					
					function creator (a, b) {
						return function () { openAllInTabs(a, b, false); }
					}
					
					aopenall.addEventListener("click", creator(title, id), false);

					aka.parentNode.insertBefore(aopenall, aka);
				}
				
				aka = aka.nextSibling.nextSibling;
			} while (aka.nodeName == "BR");
		}
	}
	
	// --------------- TRACKERS --------------- 
	
	var trackers = new Array();
	
	//Since torrenttyphoon includes search results from mininova and thepiratebay, these are now commented.
        trackers.push(new Tracker("-torrents>", "",
        "http://www.google.com/search?hl=en&lr=&q=torrents+",false));
	trackers.push(new Tracker("IH", "http://isohunt.com/favicon.ico",
        "http://isohunt.com/torrents.php?ihq=",false));
        trackers.push(new Tracker("yotoshi", "http://www.yotoshi.net/images/yotoshi.ico",
        "http://search.yotoshi.net/search.php?q=",false));
        trackers.push(new Tracker("BT", "http://www.bittorrent.com/favicon.ico",
        "http://search.bittorrent.com/search.jsp?query=",false));
        trackers.push(new Tracker("Tbot", "http://www.torr-bott.com/favicon.ico",
        "http://www.torr-bott.com/index.aspx?txtSearch=",false));
        trackers.push(new Tracker("edk", "http://www.emule-project.net/favicon.ico",
        "http://www.filehash.com/search/",false));
        trackers.push(new Tracker("-Trailer/", "",
        "http://video.search.yahoo.com/search/video?p=",false));
        trackers.push(new Tracker("-Subs>", "",
        "http://www.google.com/search?hl=en&lr=&q=subtitles+",false));
        trackers.push(new Tracker("unacs", "http://subs.unacs.bg/favicon.ico",
        "http://subs.unacs.bg/list.php?l=",false));
        trackers.push(new Tracker("SDB", "",
        "http://www.subdb.net/subdb/html/modules.php?name=Download_Subtitles&combo_language=croatian&edsearch=",false));
        trackers.push(new Tracker("cover", "http://www.picsearch.com/favicon.ico",
        "http://www.picsearch.com/search.cgi?q=",false));
        
	// --------------- END OF TRACKERS --------------- 

	
	var title = getTitle();
	var id = getId();
	addIconBarIcons(title, id, trackers);
	addAkaIcons(id, trackers);

})();

