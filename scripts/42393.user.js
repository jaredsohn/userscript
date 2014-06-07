// ==UserScript==
// @name        PackLinks by SceneHD
// @description Adds links to packs
// @include     http*://scenehd.org/browse.php*
// ==/UserScript==

/* Script version: 2008-12-18 */
(function() {
	var link1 = document.createElement("a");
	var link2 = document.createElement("a");
	var link3 = document.createElement("a");
	var link4 = document.createElement("a");
	link1.href = "http://scenehd.org/browse.php?incldead=1&search=%scenehd";
	link2.href = "http://scenehd.org/browse.php?c1=1&c4=1&c8=1&incldead=1&search=%scenehd";
	link3.href = "http://scenehd.org/browse.php?c5=1&c7=1&c12=1&incldead=1&search=%scenehd";
	link4.href = "http://scenehd.org/browse.php?c10=1&incldead=1&search=%scenehd";
	var txt1 = document.createTextNode("ALL Packs");
	var txt2 = document.createTextNode("Movie-Packs");
	var txt3 = document.createTextNode("TV-Packs");
	var txt4 = document.createTextNode("XXX-Packs");
	link1.appendChild(txt1);
	link2.appendChild(txt2);
	link3.appendChild(txt3);
	link4.appendChild(txt4);
	link1.setAttribute('class','catlink');
	link2.setAttribute('class','catlink');
	link3.setAttribute('class','catlink');
        link4.setAttribute('class','catlink');

	var table = document.createElement("table");
	table.setAttribute('class','bottom');
	var row = document.createElement("tr");
	
	var cell0 = document.createElement("td");
	var cell1 = document.createElement("td");
	var cell2 = document.createElement("td");
	var cell3 = document.createElement("td");
	var cell4 = document.createElement("td");
	cell0.setAttribute('class','bottom');
	cell1.setAttribute('class','bottom');
	cell2.setAttribute('class','bottom');
	cell3.setAttribute('class','bottom');
	cell4.setAttribute('class','bottom');
        cell0.setAttribute('style','padding-bottom: 5px; padding-left: 10px; padding-right: 10px; font-weight: bold;');
	cell1.setAttribute('style','padding-bottom: 5px; padding-left: 10px; padding-right: 10px; text-decoration: underline;');
	cell2.setAttribute('style','padding-bottom: 5px; padding-left: 10px; padding-right: 10px; text-decoration: underline;');
	cell3.setAttribute('style','padding-bottom: 5px; padding-left: 10px; padding-right: 10px; text-decoration: underline;');
        cell4.setAttribute('style','padding-bottom: 5px; padding-left: 10px; padding-right: 10px; text-decoration: underline;');

	var title_txt = document.createTextNode("Pack Links:");
	
	cell0.appendChild(title_txt);
	cell1.appendChild(link1);
	cell2.appendChild(link2);
	cell3.appendChild(link3);
	cell4.appendChild(link4);
	row.appendChild(cell0);
	row.appendChild(cell1);
	row.appendChild(cell2);
	row.appendChild(cell3);
	row.appendChild(cell4);
	table.appendChild(row);
	
	var tdNode = document.getElementsByTagName('form')[1].getElementsByTagName('td')[1];
	tdNode.insertBefore(table, tdNode.firstChild);
})();