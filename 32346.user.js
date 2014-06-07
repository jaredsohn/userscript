// ==UserScript==
// @name           Sify Gallery Prettifier
// @namespace      http://saravan.blogspot.com
// @description    Loads all the images of Sify Image Gallery in a Single Page
// @include        http://*sify.com/movies/*galleryDetail.php*
// ==/UserScript==

/*********************************************************************
* Sify Gallery Prettifier
*  - Loads all the images of Sify Image Gallery in a Single Page
* Copyright (C) 2008, Saravana Kumar <saravanannkl@gmail.com>
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 2 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
* 02110-1301  USA
*********************************************************************/

var con = document.getElementById("DetailContent");
if(con && unsafeWindow.imageArray.length>0) {
	var table = document.createElement("table");
	var tbody = document.createElement("tbody");
	
	for(var indx=0; indx<unsafeWindow.imageArray.length; indx++) {
		var row = document.createElement('tr');
		var imgtd = document.createElement('td');
		var desctd = document.createElement('td');
		var img = document.createElement('img');
		img.src = "http://im.sify.com/" + unsafeWindow.imageArray[indx][0];
		imgtd.style.verticalAlign = "top";		
		imgtd.style.marginBottom = "10px";
		imgtd.appendChild(img);
		desctd.style.marginBottom = "10px";
		desctd.style.verticalAlign = "top";
		desctd.style.fontSize = "14px";
		desctd.innerHTML = unsafeWindow.imageArray[indx][1];
		row.appendChild(imgtd);
		row.appendChild(desctd);
		tbody.appendChild(row);
		var rowline = document.createElement('tr');
		var linetd = document.createElement('td');
		linetd.setAttribute("colspan", "2");
		linetd.appendChild(document.createElement("hr"));
		rowline.appendChild(linetd);
		tbody.appendChild(rowline);
		
	}
	for(var indx=con.childNodes.length-1;indx>=0;indx--) {
		con.removeChild(con.childNodes[indx]);
	}

	table.appendChild(tbody);
	con.appendChild(table);
}

