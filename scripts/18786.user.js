// ==UserScript==
// @name Ogame : Improved fleet menu
// @author Black Cat
// @description Ogame : New planets organisation in fleet menu (separate planets/moons in 2 columns)
// @include http://*/game/index.php?page=flotten2*
// @exclude	
// ==/UserScript==

(function(){

	function row(coords, planetLink, moonLink) {
		this.coords = coords;
		this.planetLink = planetLink;
		this.moonLink = moonLink;
	}
	
	function findCoords(tab, coords) {
		var value = -1;
		var i = 0;
		while (value == -1 && i < tab.length) {
			if (tab[i].coords == coords)
				value = i;
			i++;
		}
		return value;
	}
	
	var rows = new Array();
	for (var i = 0; i < 9; i++) {
		rows[i] = new row('', null, null);
	}
	var currentRow = 0;
	
	var targets = document.evaluate("//a[contains(@href,'setTarget')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var targetsRows = document.evaluate("//a[contains(@href,'setTarget')]/ancestor::tr[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if (targetsRows.snapshotItem(0))
		var title = targetsRows.snapshotItem(0).previousSibling;
	else
		return;
	var expression = /setTarget\((\d*),(\d*),(\d*),(\d*)\)/;
	for (var i = 0; i < targets.snapshotLength; i++) {
		var thisTarget = targets.snapshotItem(i);
		if (thisTarget.parentNode.getElementsByTagName("input").length == 0) {
			expression.exec(thisTarget.getAttribute("href"));
			var coords = RegExp.$1 + ":" + RegExp.$2 + ":" + RegExp.$3;
			var planeteType = parseInt(RegExp.$4);
			var place = findCoords(rows, coords);
			if (place == -1) {
				place = currentRow;
				currentRow++;
			}
			rows[place].coords = coords;
			if (planeteType == 1)
				rows[place].planetLink = thisTarget;
			else
				rows[place].moonLink = thisTarget;
		}
	}
	
	var lastInsert = title;
	for (var i = 0; i < rows.length; i++) {
		if (rows[i].coords != '') {
			var row = document.createElement("tr");
			row.setAttribute("height", "20");
			var planet = document.createElement("th");
			var moon = document.createElement("th");
			if (rows[i].planetLink != null)
				planet.appendChild(rows[i].planetLink);
			if (rows[i].moonLink != null)
				moon.appendChild(rows[i].moonLink);
			row.appendChild(planet);
			row.appendChild(moon);
			lastInsert.parentNode.insertBefore(row, lastInsert.nextSibling);
			lastInsert = row;
		}
	}

	for (var i = 0; i < targetsRows.snapshotLength; i++) {
		var thisRow = targetsRows.snapshotItem(i);
		if (thisRow.getElementsByTagName("input").length == 0)
			thisRow.parentNode.removeChild(thisRow);
	}
})();
