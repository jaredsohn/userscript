// Diskus+ 2.1

// ==UserScript==
// @name          Diskus+
// @namespace     tag:arvid.jakobsson@gmail.com,2005-06-01:Diskus+.
// @description   Remembers which threads you've viewed and not. Version 2.1
// @include       http://www.lunarstorm.se/dis/dis_view.asp*
// @include       http://www.lunarstorm.se/dis/dis_discuss.asp*
// ==/UserScript==

/*

Changelog:

2005-08-27 2.1
* Played around with the encoding. Seems GM 0.5.1 is still a bit buggy.
* Removed the part that made the thread you're viewing turn bold in the thread view.
Lunarstorm already does this for Firefox now.
* Added license block
* Some changes in the HTML on Diskus broke the scripts. Made it work, I think
it's even better now.
* Added xpath-function

2005-06-16 2.0
* Script now remembers which threads you've viewed and not.

2005-06-01 1.0
* Makes the thread you're viewing go bold in the thread view.

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

var img_new1 = "data:image/gif,GIF89a%0C%00%12%00%91%00%00%FF%FF%FF1%00%9C%FF%00%00%00%00%00!%F9%04%01%00%00%00%00%2C%00%00%00%00%0C%00%12%00%40%02%14%84%8F%17%20%D7%09%A3%9C%B4%DA%8B%B3%16%9C%C7%EEi%E2X%00%00%3B";
var img_new2 = "data:image/gif,GIF89a%0C%00%12%00%91%00%00%FF%FF%FF1%00%9C%FF%00%00%00%00%00!%F9%04%01%00%00%00%00%2C%00%00%00%00%0C%00%12%00%40%02%18%84%8F%17%20%DD%89%16%9C%14%C8%8A%B3%CAW%FB%7F8%0F%24%0A%E0%89%22%05%00%3B";	

function xpath(query, context) {
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function makeReadObject () {
	this.readstring = GM_getValue("read");
	this.readarr = new Array();
	this.readarr_srt = new Array();
	
	if (this.readstring) {
		this.readarr = this.readstring.split(",");
		this.readarr_srt = this.readarr.sort();
	}
	
	this.isRead = function (id) {
		if (!this.readstring) {
			return false;
		}	
		else {
			min = 0;
			max = this.readarr_srt.length-1;
			
			while (min <= max) {
				mitt = Math.floor((max+min)/2);

				if (this.readarr_srt[mitt] == id) {
					return true;
				}
				else if (this.readarr_srt[mitt] > id) {
					max = mitt-1;
				}
				else if (this.readarr_srt[mitt] < id) {
					min = mitt+1;
				}
			}
			
			return false;
		}
	}
	
	this.saveID = function (id) {
		if (!this.readstring) {
			this.readstring = id;
			this.readarr.push(id);
			this.readarr_srt = this.readarr;
		}
		else {
			if (!this.isRead(id)) {
				if (this.readarr.push(id) > 1024) {
					this.readarr.shift();
				}
				this.readarr_srt = this.readarr.sort();
				this.readstring = this.readarr.join(",");
			}
		}
		GM_setValue("read", this.readstring);
	}
	
	return this;
}

function switchIcon(thread_img) {
	if (thread_img.getAttribute("src") == "/_gfx/frame/dis/dis_tree4.gif") {
		thread_img.setAttribute("src", img_new1);
	}
	else if (thread_img.getAttribute("src") == "/_gfx/frame/dis/dis_tree5.gif") {
		thread_img.setAttribute("src", img_new2);
	}
	else if (thread_img.getAttribute("src") == img_new1) {
		thread_img.setAttribute("src", "/_gfx/frame/dis/dis_tree4.gif");
	}
	else if (thread_img.getAttribute("src") == img_new2) {
		thread_img.setAttribute("src", "/_gfx/frame/dis/dis_tree5.gif");
	}
	else {
		GM_log("Detta bÃ¶r inte hÃ¤nda ;): " + thread_img.getAttribute("src"));
	}
}

function Thread () {
	this.id;
	this.img;
	this.el;
}

function getThreads() {
	var thread_arr = new Array(); //array fÃ¶r att spara alla thread objekt
	var threads = xpath("//tr[@class='mlist0' or @class='mlist1']", document);
	
	if (!threads || threads.snapshotLength == 0) {
		GM_log("fann inga trÃ¥dar!");
		return;
	}
	
	for (var i = 0; i < threads.snapshotLength; i++) {
		var thread = new Thread();
		thread.el = threads.snapshotItem(i);
		thread.img = thread.el.getElementsByTagName("img");
		thread.img = thread.img[thread.img.length-1];
		thread.id = thread.el.getElementsByTagName("a")[1].href.match(/dis_view\.aspx\?discussid=([a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12})&/)[1]
	
		//pushar pÃ¥ id:et pÃ¥ arrayen fÃ¶r "markera alla lÃ¤st knappen"
		thread_arr.push(thread);			
		
		if (!read.isRead(thread.id )) { //om id:et Ã¤r olÃ¤st, byt ikon
			switchIcon(thread.img);
		} 
	}
	return thread_arr;
}

function getMarkAllReadButton(thread_arr) {
	if (location.href.match(/dis_discuss\.aspx/)) { //pÃ¥ dis_discuss mÃ¥ste man Ã¤ndra lite med bredden pÃ¥ cellerna
		var button_holder = xpath("//td[@class='main']/table/tbody/tr/td[@class='mtext']/parent::tr/td[last()]/table/tbody/tr", document);
		
		var footer = xpath("//td[@class='main']/table/tbody/tr/td[@class='mtext']/parent::tr", document);
	
		if (!footer || footer.snapshotLength != 1) {
			GM_log("hittade inte footer");
			return;
		}
		
		footer = footer.snapshotItem(0);
		footer.cells[0].setAttribute("width", 60);
		footer.cells[2].setAttribute("width", 260);
	}
	else if (location.href.match(/dis_view\.aspx/)) { 
		var button_holder = xpath("//tr[@id='_ctl8']/td[@class='main']/table[@class='mtext']/tbody/tr/td[3]/table/tbody/tr", document);
	}
	
	if (!button_holder || button_holder.snapshotLength != 1) {
		GM_log("hittade inte button_holder");
		return;
	}
	
	button_holder = button_holder.snapshotItem(0);
	
	
	
	var spacer = button_holder.insertCell(0);
	spacer.setAttribute("width", "4");
	
	var button2_right = button_holder.insertCell(0);
	button2_right.setAttribute("class", "subr");
	
	var button2_middle = button_holder.insertCell(0);
	button2_middle.setAttribute("class", "sub");
	button2_middle.id = "diskus+_mark_all_read_button";
	
	var button2_link = document.createElement("a");
	button2_link.setAttribute("class", "blink");
	button2_link.innerHTML = "Markera alla inlÃ¤gg som lÃ¤sta";
	button2_link.href = "javascript:;";
	button2_link.addEventListener("click", function () {
			for (var i = 0; i < thread_arr.length; i++) {
				//GM_log("hmmz." + i + " / " + thread_arr.length);
				if (!read.isRead(thread_arr[i].id)) {
					read.saveID(thread_arr[i].id);
					switchIcon(thread_arr[i].img);
				}
			}
		}, false);
	
	button2_middle.appendChild(button2_link); 
		
	var button2_left = button_holder.insertCell(0);
	button2_left.setAttribute("class", "subl");	
}

/*
om skriptet redan laddats, dÃ¥ lunar fÃ¥r samma sida att laddas tvÃ¥ gÃ¥nger om man klickar pÃ¥ ett diskus bokmÃ¤rke,
frÃ¥ga mig inte hur eller varfÃ¶r, sÃ¥ avbryts skriptet.
*/
if (document.getElementById("diskus+_mark_all_read_button")) {
	return;
}

read = new makeReadObject();

//Specifika saker fÃ¶r dis_view.asp: sparar vilket inlÃ¤gg du tittar pÃ¥
if (location.href.match(/dis_view\.aspx/)) {
	var id = location.href.match(/dis_view\.aspx\?discussid=([a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12})&/)[1];
	read.saveID(id);
}

//saker fÃ¶r bÃ¥de dis_view och dis_discuss: byter ikon i trÃ¥dlistan pÃ¥ de inlÃ¤gg du ej lÃ¤st
thread_arr = getThreads();
//LÃ¤gger till "markera alla inlÃ¤gg som lÃ¤sta"-knappen
getMarkAllReadButton(thread_arr);

