// Helgon - Latest Photos Bar 1.0

// ==UserScript==
// @name          Helgon - Latest Photos Bar
// @namespace     tag:arvid.jakobsson@gmail.com,2005-08-31:Helgon - Latest Photos Bar
// @description   Adds a bar under the helgonmain-iframe in which the 5 newest photos from the gallery is shown. Version 1.0
// @include      http://www.helgon.net/main.asp*
// @include      http://helgon.net/main.asp*
// ==/UserScript==

/*

Changelog:

2005-09-06 1.0
* Release version: Finally got it working the way I wanted.

2005-08-31 (min namnsdag...) 0.1
* Initial version

*/

/*
BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson / arvid.jakobsson@gmail.com

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


function xpath(query, context) {
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function Photo(src, name, desc, big_link, user, user_link) {
	this.src = src;
	this.big_link = big_link;
	
	this.name = name;
	this.desc = desc;
	
	this.user = user;
	this.user_link = user_link;
	
	this.shown = false;
}
	
function addGlobalStyle(css) {
	var h, s;
	h=document.getElementsByTagName('head')[0];
	if (!h) { return; }
	s = document.createElement('style');
	s.type = 'text/css';
	s.innerHTML = css; 
	h.appendChild(s);
}

//adds the css needed, and creates the div which contains the photos and teh links
function addSideBars() {
	var photo_cell, photo_div;
	
	var photo_div_css = "div#photo_div {" +
	"	padding: 2px;" +
	"	border: 1px solid black;" +
	"	margin: 5px;" +
	"	text-align: center;" +
	"}" +
	"div#photo_div table {" +
	"	width: 100%;" +
	"	margin-left: auto;" +
	"	margin-right: auto;" +
	"}" +
	"div#photo_div td {" +
	"	width: 25%;" +
	"	padding: 5px;" +
	"	font-size: 10px;" + 
	"	font-color: black;" +
	"	font-family: Verdana,Arial,Helvetica,Sans Serif;" +
	"}" +
	"div#photo_div img{" +
	"	max-height: 80px;" +
	"}" +
	"div#buttons {" +
	"	text-align: right;" +
	"	font-size: 10px;" + 
	"	font-color: black;" +
	"	font-family: Verdana,Arial,Helvetica,Sans Serif;" +
	"}";
	addGlobalStyle(photo_div_css);
	
	photo_cell = xpath("//tr[@class='bgframe']/td", document);
	
	if (!photo_cell || photo_cell.snapshotLength != 1) {
		GM_log("problems with photo_cell");
		return;
	}
	
	photo_cell = photo_cell.snapshotItem(0);
	
	var photo_div = document.createElement("div");
	photo_div.id = "photo_div";
	
	var photo_buttons = document.createElement("div");
	photo_buttons.id = "buttons";
	
	
	var toggle_link = document.createElement("a");
	toggle_link.href = "javascript: ;";
	toggle_link.innerHTML = "[ DÃ¶lj ]";
	toggle_link.addEventListener("click", toggleBar, false);
	
	var latest_link = document.createElement("a");
	latest_link.href = "Gallery2/Last.asp";
	latest_link.innerHTML = "[ 20 Senaste ]";
	latest_link.setAttribute("target", "helgonmain");
	
	var refresh_link = document.createElement("a");
	refresh_link.href = "javascript: ;";
	refresh_link.innerHTML = "[ Uppdatera ]";
	refresh_link.addEventListener("click", function () { refreshPhotos(20) }, false);
	
	photo_buttons.appendChild(refresh_link);
	photo_buttons.appendChild(document.createTextNode(" "));
	photo_buttons.appendChild(latest_link);
	photo_buttons.appendChild(document.createTextNode(" "));
	photo_buttons.appendChild(toggle_link);
	
	
	photo_div.appendChild(photo_buttons);
	photo_cell.appendChild(photo_div);
}

//adds the photo table. I needed to separate this from addSideBar so that I could hide and show the photo_tbl
function addPhotoTbl() {
	var photo_div = document.getElementById("photo_div");

	var photo_tbl = document.createElement("table");
	photo_tbl.id = "photo_table";
	var photo_tbl_rw = photo_tbl.insertRow(0);
	for (var i = 0; i < 5; i++) photo_tbl_rw.insertCell(0);
	
	photo_div.appendChild(photo_tbl);
}

//fetches the latest 20 latest photos. saves them in the Photo array but make's sure there are no duplicate entries
function getPhotos(callback) {
	//GM_log("getPhotos()");
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: location.protocol + "//" + location.host + "/Gallery2/Last.asp",
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function (responseDetails) {
			var html = responseDetails.responseText;
			html = html.replace(/\r\n/g, "");
			var td_html = html;
			
			
			var temp, new_photos = 0;
			while (temp = td_html.match(/href="(View\.asp\?id=.*?)" title="(.*?[^\\]?)"/)) {
				var src = "", name = "", desc = "", big_link = "", user = "", user_link = "";
			
				
				big_link = temp[1];
				
				if (temp[2] != "") {
					name = temp[2].match(/Titel: (.*?)(Beskrivning|$)/);
					if (name) 
						name = name[1];
					else 
						name = "";
					
					desc = temp[2].match(/Beskrivning: (.*?)$/);
					if (desc) 
						desc = desc[1];
					else 
						desc = "";
				}
				
				temp = td_html.match(/<img src="(.*?_tmb.jpg)" border="0" class="frameborder"><br><a href="(\/userinfo\/userinfo\.asp\?ID=.*?)" target="helgonmain">(.*?)<\/a>/);
				src = temp[1];
				user_link = temp[2];
				user = temp[3];
								
				td_html = td_html.substring(temp.index + temp[0].length);
				
				var i;
				for (i = 0; i < photos.length; i++) {
					if (big_link == photos[i].big_link) {
						break;
					}
				}
				
				//Save the photos if it isn't already in the array
				if (i == photos.length) {
					photos.unshift(new Photo(src, name, desc, big_link, user, user_link));
					new_photos++;
				}
			}
			
			//GM_log("fann " + new_photos + " nya foton");
			//If there is a callback, call it
			if (callback) {
				callback(new_photos);
			}
		}
	});
	
	//GM_log("getPhotos() returns");
}

//shows 5 new photos, or less depending on how many unseen photos there are in the photo array. if there are less than
//5 unseen photos in the array after displaying five photos, this function calls getPhotos
function refreshPhotos(new_photos) {
	//GM_log("refreshPhotos(" + new_photos + ")");
	var row = document.getElementById("photo_table").rows[0];
	
	for (var i = 0; i < row.cells.length && i < new_photos; i++) {
		var cell = row.cells[i];
		
		var j;
		
		for (j = 0; j < photos.length; j++) {
			if  (!photos[j].shown) {
				photos[j].shown = true;
				cur_photos[i] = photos[j];
				
				with (photos[j]) {
					var html = "<div style=\"text-align: center; height: 100%;\">" +
					"<a target=\"helgonmain\" href=\"Gallery2/" + big_link + "\"><img class=\"frameborder\" src=\"" + src + "\"></a>" + 
					"<br><a target=\"helgonmain\" href=\"" + user_link + "\">" + user + "</a><br>" + name +
					"</div>";
				}
				
				cell.innerHTML = html;
				break;
			}
		}
		
		if (j == photos.length) { //if there are no unseen photos, breaks the for and gets new photos
			getPhotos();
			break;
		}
	}

	//GM_log("refreshPhotos() returns");
}

//toggles the table which contains the photos
function toggleBar(event) {
	var photo_tbl = document.getElementById("photo_table");
	
	if (!photo_tbl) {
		addPhotoTbl();
		refreshInterval = setInterval(refreshPhotos, 1e3*60*1); //update every minute
		
		var row = document.getElementById("photo_table").rows[0];
		for (var i = 0; i < row.cells.length && i < cur_photos.length; i++) {
			var cell = row.cells[i];
			
			with (cur_photos[i]) {
				var html = "<div style=\"text-align: center; height: 100%;\">" +
				"<a target=\"helgonmain\" href=\"Gallery2/" + big_link + "\"><img class=\"frameborder\" src=\"" + src + "\"></a>" + 
				"<br><a target=\"helgonmain\" href=\"" + user_link + "\">" + user + "</a><br>" + name +
				"</div>";
			}
			
			cell.innerHTML = html;
		}
		
		event.target.innerHTML = "[ DÃ¶lj ]";
		
	}
	else {
		clearInterval(refreshInterval); //stop updating
	
		photo_tbl.parentNode.removeChild(photo_tbl);
		
		event.target.innerHTML = "[ Visa ]";
	}
}
	

var photos  = new Array();
var cur_photos = new Array();

addSideBars();
addPhotoTbl();
getPhotos(refreshPhotos);  //get new photos, then update
var refreshInterval = setInterval(refreshPhotos, 1e3*60*1); //update every minute