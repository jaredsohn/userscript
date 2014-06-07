// ==UserScript==
// @name		MyEpisodes->Torrents	
// @namespace    	http://peter.steneteg.se & http://delsdog.co.uk
// @description	  	Add links to torrents to www.myepisodes.com
// @include       	http://www.myepisodes.com/*
// ==/UserScript==

/*
 BEGIN LICENSE BLOCK
Copyright (C) 2006 Peter Steneteg
Delsdog has added some bits but they are mostly crap :-)

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
	function Tracker(shortname, icon, searchurl, useNumbers) {
		this.shortname = shortname;
		this.icon = icon;
		this.searchurl = searchurl;
		this.useNumbers = useNumbers;
		
		this.getHTML = function (quary) {
			var html = "<font face=\"Verdana, Arial, Helvetica, sans-serif\" size=\"-2\"><b>" +
							"<a target=\"_blank\" href=\"" + this.searchurl;	
			html += escape(quary);
			html += "\">";

			if (this.icon != "") {
				html += "<img width=\"14\" heigth=\"14\" border=\"0\" src=\"" + this.icon + "\" alt=\"" + this.shortname + "\">";
			} else {
				html += this.shortname;
			}
			html += "</a></b></font>";
			return html;
		}
	}
	
	
	function addTorrentsWatch(trackers) {
	
		var rows = document.getElementsByTagName('table')[2].getElementsByTagName('tr');

		for(var i = 0; i < rows.length; i++){
			var torrenttd = document.createElement("td");
			if(i==0){
				torrenttd.innerHTML = "Download";
				torrenttd.style.borderBottom = "solid 1px black";
				
			}else if (rows[i].childNodes.length > 10 && rows[i].childNodes[1].getElementsByTagName('a').length>0){

				var name = rows[i].childNodes[3].childNodes[1].textContent;
				var episode = removeZero(rows[i].childNodes[9].textContent.substring(7,9)) 
						+ " " + removeZero(rows[i].childNodes[9].textContent.substring(10,12));
				torrenttd.appendChild(createLinks(trackers, name, episode));
			}
			rows[i].appendChild(torrenttd);
		}
	}

	function addTorrentsList(trackers) {
	
		var rows = document.getElementsByTagName('table')[4].getElementsByTagName('tr');

		for(var i = 0; i < rows.length; i++){
			var torrenttd;
			if(i==0){
				torrenttd = document.createElement("th");
				torrenttd.innerHTML = "Download";
			}else{
				torrenttd = document.createElement("td");
				var name = rows[i].childNodes[3].childNodes[0].textContent;
				var episode = removeZero(rows[i].childNodes[5].textContent.substring(0,2)) 
						+ " " + removeZero(rows[i].childNodes[5].textContent.substring(3,5));
				torrenttd.className = "status"; 
				torrenttd.appendChild(createLinks(trackers, name, episode));
			}
			rows[i].appendChild(torrenttd);
		}
	}

	function removeZero(num){
		if(num.substring(0,1) == "0"){
			return num.substring(1,2);
		} else{
			return num;
		}
	}

	function createLinks(trackers, quary, episode){
		var div = document.createElement("div");
		for (var j = 0; j < trackers.length; j++){
			var search;

			if(trackers[j].useNumbers){
				search = quary + " " + episode;
			} else{
				search = quary;
			}

			div.innerHTML += trackers[j].getHTML(search);
			div.innerHTML += "&nbsp";
		}
		return div;
	}

	function getTitle(){
		return document.getElementsByTagName('title')[0].textContent
	}
	
	
	// --------------- TRACKERS --------------- 
	var trackers = new Array();
	trackers.push(new Tracker("TPB", "http://thepiratebay.org/favicon.ico", "http://thepiratebay.org/search.php?video=on&q=", true));
	trackers.push(new Tracker("TS", "http://www.torrentspy.com/favicon.ico", "http://www.torrentspy.com/search.asp?h=&query=", false));
	trackers.push(new Tracker("IH", "http://isohunt.com/favicon.ico", "http://www.isohunt.com/torrents.php?ihq=", false));

	// --------------- END OF TRACKERS --------------- 

	if(getTitle() == "MyEpisodes.com: SeriesWatch"){
		addTorrentsWatch(trackers);
	} else if(getTitle() == "MyEpisodes.com: Private Show List"){
		addTorrentsList(trackers);
	}	
	
})();
