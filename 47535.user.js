// TPB Torrent Sizr
// 2009-04-25
// Copyright (c) 2009, sotopheavy
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// ---------------------   INSTRUCTIONS  ------------------------------
// Go to http://www.thepiratebay.org and search, browse, see recent
// torrentsor check out the top 100. All the results that appear will
// be color coded (violet = very small, green = medium, red = large) In
// addition you will see a new column which shows you the size of the
// file on a logarithmic scale.
//
// Don't do anything Illegal with this! You're on the honour system.
// --------------------------------------------------------------------
//
//--------------------- WHY MAKE THIS ------------------------------
// The piratebay lists file sizes as Bytes, Kilobytes, Megabytes, 
// and Gigabytes. It is an apples to oranges comparison which makes 
// it difficult to locate files in a certain size range when sorting by
// file size is disabled. Now you can easily see which torrents are large,
// medium or small without looking away from the title of the torrents.
// --------------------------------------------------------------------
//
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "TPB Torrent Sizr", and click Uninstall.
//
// --------------------------------------------------------------------
//

// ==UserScript==
// @name           TPB Torrent Sizr
// @namespace      http://thepiratebay.org
// @description    Colors torents in the Pirate Bay's search results depending on their size (GB, MB. KB, B) and adds a column to more easily visualize torrent size.
// @include        http://thepiratebay.org/*
// ==/UserScript==

(function (){

function begin() {
	//Get every row in the search results table
	var rows = document.getElementById("searchResult").getElementsByTagName("tr");
	if(rows != null) {
		for(i = 0; i < rows.length;++i) {
			if(i > 0) {	
				ModifyRow(rows[i]);
			} else {
				var cells = rows[i].getElementsByTagName("th");
				var newCell = document.createElement("th");
				newCell.innerHTML = "Size (logarithmic)";
				rows[0].insertBefore(newCell, cells[1]);
				newCell.style.width = "250px";
			}
		}
	}
}

function ModifyRow(row) {
	var cells = row.getElementsByTagName("td");
	if(cells.length >= 7) {
		var cellText = cells[4].innerHTML;
		var size = cellText.substring(0, cellText.indexOf("&nbsp;"));
		var units = cellText.substring(cellText.indexOf("&nbsp;") + 6);
		var textColor, bgColor;
		
		if(units == "KiB") {
			size *= 1024;
			bgColor = "#99C";
			textColor = "#669";
		} else if(units == "MiB") {
			size *= 1024*1024;
			bgColor = "#9C9";
			textColor = "#696";
		} else if(units == "GiB") {
			size *= 1024*1024*1024;
			bgColor = "#C99";
			textColor = "#966";
		}
		
		setTextAndLinkColor(row, textColor);
		row.style.backgroundColor = bgColor;
		var index = Math.ceil((Math.log(size)/Math.log(10)));
		
		// Add File Size column
		addCell(row, index, textColor);
		
		
	}
}

function addCell(row, size, color) {
	var multiplier = 16;
	var cells = row.getElementsByTagName("td");
	var newCell = document.createElement("td");
	row.insertBefore(newCell, cells[1]);
	
	var i = 0;
	while(i++ < size) {
		createChart(newCell, multiplier, color);
	}
	newCell.innerHTML = newCell.innerHTML + " (" + size + ")";
}
	
function createChart(parent, size,  color) {
	var chart = document.createElement("div");
	chart.style.width = size + "px";
	chart.style.height = size + "px";
	chart.style.backgroundColor = color;
	chart.style.cssFloat = "left";
	chart.style.marginRight = "2px";
	parent.appendChild(chart);
}

function setTextAndLinkColor(itm, color) {
	itm.style.color = color;
	var links = itm.getElementsByTagName("a");
	for(j = 0; j < links.length; ++j) {
		links[j].style.color = color;
	}
}

begin();
})();