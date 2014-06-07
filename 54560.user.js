// ==UserScript==
// @name           Pigskin Empire - Roster Sort
// @namespace      pbr/sds
// @include        http://beta.pigskinempire.com/Collegeroster.asp
// @include        http://beta.pigskinempire.com/scout.asp?level=*&s=*&gnum=*&tm=*&v=P*
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        09.09.09
// ==/UserScript==

window.setTimeout( function() {
    main();
}, 100);

function sortPlays() {
	var table = document.getElementsByTagName("table")[1];
	table.setAttribute("style","visibility: hidden; display: none;");
	
	var starts = new Array();
	var ends = new Array();
	for (var i=1; i<table.rows.length; i++) {
		console.log(i+") "+table.rows[i].cells[0].bgColor);
		if (table.rows[i].bgColor == "#d3d3d3") {
			starts.push(i+1);
		}
		else if (table.rows[i].cells[0].bgColor == "#808080") {
			ends.push(i+1);
		}
	}
	ends.push(table.rows.length);

	var pindex = 0;
	var yindex = 1;

for (var z=0; z<starts.length; z++) {
	for (var i=starts[z]; i<ends[z]-1; i++) {
		for (var j=i+1; j<ends[z]; j++) {
			var left = table.rows[i].cells[pindex];
			var right = table.rows[j].cells[pindex];
			if (left == null) continue;
			if (right == null) continue;

			if (left.textContent >= right.textContent) {
				if (yindex != -1) {
					if (left.textContent == right.textContent) {
						var ly = table.rows[i].cells[yindex];
						var ry = table.rows[j].cells[yindex];
						if (ycompare(ly, ry) != true) continue;
					}
				}
				var temp = table.rows[i].innerHTML;
				table.rows[i].innerHTML = table.rows[j].innerHTML;
				table.rows[j].innerHTML = temp;
				
				temp = table.rows[i].id;
				table.rows[i].id = table.rows[j].id;
				table.rows[j].id = temp;
				
				temp = table.rows[i].style.color;
				table.rows[i].style.color = table.rows[j].style.color;
				table.rows[j].style.color = temp;
			}
		}
	}
}	
}

function sortPlayers(pindex, yindex) {
	var table = document.getElementsByTagName("table")[1];
	table.setAttribute("style","visibility: hidden; display: none;");
	
	for (var i=1; i<table.rows.length-1; i++) {
		for (var j=i+1; j<table.rows.length; j++) {
			var left = table.rows[i].cells[pindex];
			var right = table.rows[j].cells[pindex];
			if (left == null) continue;
			if (right == null) continue;

			if (left.textContent >= right.textContent) {
				if (yindex != -1) {
					if (left.textContent == right.textContent) {
						var ly = table.rows[i].cells[yindex];
						var ry = table.rows[j].cells[yindex];
						if (ycompare(ly, ry) != true) continue;
					}
				}
				var temp = table.rows[i].innerHTML;
				table.rows[i].innerHTML = table.rows[j].innerHTML;
				table.rows[j].innerHTML = temp;
				
				temp = table.rows[i].id;
				table.rows[i].id = table.rows[j].id;
				table.rows[j].id = temp;
				
				temp = table.rows[i].style.color;
				table.rows[i].style.color = table.rows[j].style.color;
				table.rows[j].style.color = temp;
			}
		}
	}
}

function main() {
	var table = document.getElementsByTagName("table")[1];
	table.setAttribute("style","visibility: hidden; display: none;");
	
	var pindex = -1;
	for (var i=0; i<table.rows[0].cells.length; i++) {
		if (table.rows[0].cells[i].innerHTML.indexOf("Pos") != -1) {
			pindex = i;
		}
	}
	var yindex = -1;
	for (var i=0; i<table.rows[0].cells.length; i++) {
		if (table.rows[0].cells[i].innerHTML.indexOf("Year") != -1) {
			yindex = i;
		}
	}
	
	if (window.location.toString().indexOf("v=P") != -1) {
		sortPlays();
	}
	else if (window.location.toString().indexOf("v=E") != -1) {
	}
	else if ((pindex != -1) && (yindex != -1)) {
		sortPlayers(pindex, yindex);
	}

	table.setAttribute("style","visibility: visible; display: block;");
}

function ycompare(a, b) {
	var c = ["FR","r-FR","SO","r-SO","JR","r-JR","SR","r-SR"];
	var x = a.textContent.slice(0,4);
	var y = b.textContent.slice(0,4);
	
	var i = x.indexOf("-");
	if (i == -1) x = x.slice(0,2);
	i = y.indexOf("-");
	if (i == -1) y = y.slice(0,2);
	
	x = c.indexOf(x);
	y = c.indexOf(y);
	return x > y;
}

