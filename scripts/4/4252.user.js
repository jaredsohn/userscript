// IMDB->Torrents Linker 2.3

// ==UserScript==
// @name          IMDB->Torrents Linker
// @namespace     tag:arvid.jakobsson@gmail.com,2005-06-07:IMDB->Torrents.
// @description   Places links to various torrentsites on IMDB. Version 2.3

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
2006-06-16 2.3
* Added the TorrentZ search engine - multi-tracker searching.
* Much cleaner searching.

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
                title = title.toLowerCase();

		
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
	trackers.push(new Tracker("TPB", "http://thepiratebay.org/favicon.ico", "http://thepiratebay.org/search.php?video=on&q=", false));
	//trackers.push(new Tracker("MN",  "http://mininova.org/favicon.ico", "http://mininova.org/search/?cat=4&search=", false));
	trackers.push(new Tracker("MN-ID", "http://mininova.org/favicon.ico", "http://mininova.org/search/?imdb=", true));
	trackers.push(new Tracker("SB", "http://swebits.org/favicon.ico", "http://www.swebits.org/browse.php?c20=1&c5=1&c19=1&c7=1&incldead=0&search=", false));
	trackers.push(new Tracker("TB", "http://torrentbytes.net/favicon.ico", "http://torrentbytes.net/browse.php?incldead=0&search=", false));
	trackers.push(new Tracker("TT", "", "http://www.torrenttyphoon.com/loading.aspx?cat=movies&q=", false));
	trackers.push(new Tracker("TrZ", "http://www.torrentz.com/favicon.ico", "http://www.torrentz.com/search_", false));

	
	// --------------- END OF TRACKERS --------------- 

	
	var title = getTitle();
        var trzTitle = title;
        var trzTitle1 = trzTitle.replace(" ","-");
        var trzTitle2 = trzTitle1.replace(" ","-");
        var trzTitle3 = trzTitle2.replace(" ","-");
        var trzTitle4 = trzTitle3.replace(" ","-");
        var trzTitle5 = trzTitle4.replace(" ","-");
        var trzTitle6 = trzTitle5.replace(" ","-");
        var trzTitle7 = trzTitle6.replace(" ","-");
        var trzTitle8 = trzTitle7.replace(" ","-");
        var trzFinalTitle = trzTitle8.replace(" ","-");
        var title = trzFinalTitle;

	var id = getId();
	addIconBarIcons(title, id, trackers);
	addAkaIcons(id, trackers);

})();

