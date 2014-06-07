// ==UserScript==
// @name			AG-Anzahl bei Einlagerung bestimmen
// @version			1.0.3
// @include 		http://*.die-staemme.*/game.php?*&screen=snob*
// ==/UserScript==


//***************************************************************************
//***                      einlagerungen_bestimmen.user.js
//**                       -------------------------
//**  author/copyright     : TM4rkuS
//**  
//***
//***************************************************************************/


function ge(element, by, type) {
	if (by == "class")
		return element.getElementsByClassName(type);
	if (by == "tag")
		return element.getElementsByTagName(type);
}

if(ge(document, "class", "vis")[2].innerHTML.match(/Kosten/))
var table = ge(document, "class", "vis")[2];
else
var table = ge(document, "class", "vis")[3];
var needed_row = ge(table, "tag", "tr")[0];
var avail_row = ge(table, "tag", "tr")[1];
var needed_cell = ge(needed_row, "tag", "td")[1];
var avail_cell = ge(avail_row, "tag", "td")[1];

var needed = parseInt(needed_cell.innerHTML.match(/\d+/));
var avail = parseInt(avail_cell.innerHTML.match(/\d+/));
update();


function update() {

	var snob_count = 0;
	
	for (avail; avail >= needed; needed++)
	{
		avail = avail-needed;
		snob_count++;
	}

	if(snob_count != 0)
	{
		avail_cell.innerHTML = avail_cell.innerHTML.replace(/\d+/, (snob_count) + " x <img src = http://de60.die-staemme.de/graphic/unit/unit_snob.png?1> | " + avail);
	}
}