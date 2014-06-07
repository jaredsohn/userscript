// ==UserScript==
// @name        PackLinks by firefantast
// @description Adds links to packs
// @include     https://feedthe.net/browse.php*
// ==/UserScript==

(function() {
	var link1 = document.createElement("a");
	var link2 = document.createElement("a");
	var link3 = document.createElement("a");
	link1.href = "browse.php?c21=1&c22=1&incldead=0&search=%25-FTN&titleonly=1";
	link2.href = "browse.php?c14=1&c24=1&c18=1&incldead=0&search=%25-FTN&titleonly=1";
	link3.href = "browse.php?incldead=0&search=%25-FTN&titleonly=1";
	var txt1 = document.createTextNode("TV-Packs");
	var txt2 = document.createTextNode("Movie-Packs");
	var txt3 = document.createTextNode("All FTN Packs");
	link1.appendChild(txt1);
	link2.appendChild(txt2);
	link3.appendChild(txt3);
	link1.setAttribute('class','catlink');
	link2.setAttribute('class','catlink');
	link3.setAttribute('class','catlink');
	
	var table = document.createElement("table");
	table.setAttribute('class','bottom');
	var row = document.createElement("tr");
	
	var cell0 = document.createElement("td");
	var cell1 = document.createElement("td");
	var cell2 = document.createElement("td");
	var cell3 = document.createElement("td");
	cell0.setAttribute('class','bottom');
	cell1.setAttribute('class','bottom');
	cell2.setAttribute('class','bottom');
	cell3.setAttribute('class','bottom');
	cell0.setAttribute('style','padding-bottom: 5px; padding-left: 10px; padding-right: 10px; font-weight: bold;');
	cell1.setAttribute('style','padding-bottom: 5px; padding-left: 10px; padding-right: 10px; text-decoration: underline;');
	cell2.setAttribute('style','padding-bottom: 5px; padding-left: 10px; padding-right: 10px; text-decoration: underline;');
	cell3.setAttribute('style','padding-bottom: 5px; padding-left: 10px; padding-right: 10px; text-decoration: underline;');
	
	var title_txt = document.createTextNode("Pack Links:");
	
	cell0.appendChild(title_txt);
	cell1.appendChild(link1);
	cell2.appendChild(link2);
	cell3.appendChild(link3);
	row.appendChild(cell0);
	row.appendChild(cell1);
	row.appendChild(cell2);
	row.appendChild(cell3);
	table.appendChild(row);
	
	var tdNode = document.getElementsByTagName('form')[0].getElementsByTagName('td')[0];
	tdNode.insertBefore(table, tdNode.firstChild);
})();