// ==UserScript==
// @name        KG - homepage additions
// @namespace   KG
// @include     http*://*karagarga.net/
// @grant	GM_addStyle
// @version     0.5
// ==/UserScript==

// ----------- user setup ----------- 
// to add extra search terms:   ["name 1", "name 2", "etc"];
// to disable a search:   []
// to find all latest uploads:   [""]

var artists = ["alfred hitchcock"];
var users = ["d1fferent"];
var numberOfHits = 3;    // maximum of 15

// ----------- end setup ----------- 


var dirSearchURL = "https://karagarga.net/browse.php?sort=added&search_type=director&d=DESC&search=";
var userSearchURL = "https://karagarga.net/browse.php?sort=added&search_type=uploader&d=DESC&search=";

GM_addStyle(".gmlinks a:link { color:#cc0000 !important; } "
		+ ".gmsearch { margin-bottom: .8em !important; } ");

// find our insert target
var links = document.links;
for (i=0; i < links.length; i++) { 
	if (links[i].href.indexOf('slideshow.php') != -1) { 
		var target = links[i].parentNode;
	} 
}

for (var i in artists) {
	search(artists[i], dirSearchURL);
}
for (var i in users) {
	search(users[i], userSearchURL);
}

function search(string, url) {
	url = url + string;
        var x = new XMLHttpRequest();
        x.open("GET",url);
        x.onload = function() { 
		insert(this.responseXML, string, url);
        }
        x.responseType = "document";
        x.send();
}

function insert(result, string, url) {
	var rows = result.querySelectorAll("table#browse tr");
	var newBox = document.createElement('div');
	newBox.className = "gmsearch";
	newBox.innerHTML += "<a href=' " + url + " '>" + string + "</a>";
	var newTable = document.createElement('table');
	newBox.appendChild(newTable);
	for (i=1; i < parseInt(numberOfHits * 2) && i < rows.length; i=i+2) {  // every other row is hidden and unneeded, ignore it
		var row = rows[i];
		while (row.cells.length > 4) { // get rid of cells we don't want
			row.deleteCell(4);
		}
		row.deleteCell(2); // and one more
		var dropdown = row.querySelector("span[onclick^='toggle']")
		if (dropdown) {
			dropdown.innerHTML = ""; // and the dropdown
		}
		row.cells[1].className = "gmlinks";
		newTable.appendChild(row);
	}

	target.insertBefore(newBox, target.firstChild);
}


// var target = document.querySelector('table.main table td');	 // lefthand column, goes wrong when there's a PM alert 
// document.querySelectorAll('h2')[2]  // stuck torrents heading