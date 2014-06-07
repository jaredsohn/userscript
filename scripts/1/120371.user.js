// ==UserScript==
// @name		The Pirate Bay EE Enhancer
// @author		Jesse Sheehan
// @match		http://thepiratebay.ee/*
// @match		http://*.thepiratebay.ee/*
// @match		https://thepiratebay.ee/*
// @match		https://*.thepiratebay.ee/*
// @description	An extension that adds a "Download Torrent" button to the page. Also adds a "Download Torrent" link in the search page.
// ==/UserScript==

// create DIV element and append to the table cell
function createCell(cell, text, style) {
    var div = document.createElement('div');
    div.setAttribute('class', style);
    div.setAttribute('className', style);
    if (text == "0") {
		cell.style.backgroundColor = "#D2B9A6";
		cell.style.fontWeight = "bold";
		txt = document.createTextNode("Torrent");
		div.appendChild(txt); 
	} else {
		cell.style.textAlign = "center";
		link = document.createElement("a");
		link.innerHTML = "Download";
		var loc = cell.parentNode.cells[1].getElementsByTagName("a")[0].href;
		var pathname = loc.substring(loc.indexOf("/", "http://".length+1));
		var id = pathname.substring(pathname.indexOf("/", 1) + 1,pathname.indexOf("/", pathname.indexOf("/", 1) + 1));
		var title = cell.parentNode.cells[1].getElementsByTagName("a")[0].innerHTML;
		
		link.href = "http://torrents.thepiratebay.org/" + id + "/" + title + "." + id + ".TPB.torrent";
		
		div.appendChild(link); 
	}
    cell.appendChild(div);
}

// append column to the HTML table
function appendColumn() {
    var tbl = document.getElementById('searchResult'),i;
    // open loop for each row and append cell
    for (i = 0; i < tbl.rows.length; i++) {
        createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), i, 'col');
    }
}

function main() {
	if (document.getElementById("searchResult")!=null) {
		// The user is searching for a torrent. Display the download button in the table:
		appendColumn();
	} else {
		var title = document.getElementById("title");
		
		if (title!=null) {
			// The user may be looking at a torrent. Display the "Torrent" button
			var download_button = document.forms[document.forms.length-1].getElementsByTagName("input")[0];
			var form = download_button.parentNode;
			var id = location.pathname.substring(location.pathname.indexOf("/", 1) + 1,location.pathname.indexOf("/", location.pathname.indexOf("/", 1) + 1));
		
			form.style.width = "100%";
			form.style.textAlign = "center";
			
			download_button.style.verticalAlign = "top";
			
			text = document.createElement("span");
			text.style.margin = "20px";
			text.style.verticalAlign = "top";
			text.style.fontSize = "24px";
			
			image = document.createElement("img");
			image.src = "http://farm8.staticflickr.com/7019/6485233455_05f35a563b_m.jpg";
			image.border = "0px";
			image.style.verticalAlign = "top";
			
			torrent_button = document.createElement("a");
			torrent_button.href = "http://torrents.thepiratebay.org/" + id + "/" + title.innerHTML + "." + id + ".TPB.torrent";
			torrent_button.style.border = "0px";
			torrent_button.style.background = "none";
			torrent_button.style.margin = "none";
			torrent_button.style.padding = "0px";
			torrent_button.appendChild(image);
			
			form.appendChild(text);
			form.appendChild(torrent_button);
		}
	}
}

main();
