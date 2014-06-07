// ==UserScript==
// @name          Nexus Clash Pet Status Highlighter
// @namespace     http://www.quasimorto.com
// @description   Tweaks for the pet pane.
// @include       http://nexusclash.com/*
// @include       http://www.nexusclash.com/*
// ==/UserScript==

GM_addStyle("tr.petstatus-aplow      { background-color: #ffff99; }");
GM_addStyle("tr.petstatus-apcritical { background-color: #ff0000; color:#ffffff; }");
GM_addStyle("tr.petstatus-mpsurplus  { background-color: #9999ff; }");
GM_addStyle("tr.petstatus-nextpet td { border-top: 2px solid black; border-bottom: 2px solid black; } ");

var AP_LOW      = 32;
var AP_CRITICAL = 16;

//TODO: Cell highlight for low MP/HP values.

processPetTable();

/**********************************************************/

function processPetTable() {
	var tick = getTick();
	var minPet;

	var petRows = document.evaluate(
		"//tr[td[@title='Rename Pet']]", 
		document, 
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);

	for (var i = 0; i < petRows.snapshotLength; i++) {
		var row = petRows.snapshotItem(i);
		if (i == 0) { modifyTable(row); }
		minPet = processRow(row, tick, minPet);
	}
	minPet.Row.setAttribute("class", minPet.Row.getAttribute("class") + " petstatus-nextpet");
}

/**********************************************************/

function processRow(row, tick, minPet) {
	var ap = parseInt(row.cells[2].innerHTML);
	var mp = parseInt(row.cells[3].innerHTML);
	var hp = parseInt(row.cells[4].innerHTML);

	if (
		minPet == null 
		|| ap < minPet.AP 
		|| (ap == minPet.AP && mp < minPet.MP) 
		|| (ap == minPet.AP && mp == minPet.MP && hp < minPet.HP)  
	) {
		minPet = { AP:ap, MP:mp, HP:hp, Row:row };
	}

	displayDecayTime(row, ap, tick);
	setRowClass(row, ap, mp);
	modifyStanceForm(row);
	return minPet;
}

/**********************************************************/

function displayDecayTime(row, ap, tick) {
	var timeEmpty = new Date(tick);
	timeEmpty.setMinutes(tick.getMinutes() + (ap * 15));
	row.insertCell(7);
	row.cells[7].innerHTML = timeEmpty.toTimeString().substring(0,5);
}

/**********************************************************/

function modifyTable(row) {
	var table = row.parentNode.parentNode;
	table.style.width = table.offsetWidth - 4;
	table.rows[1].insertCell(7);
	table.rows[1].cells[7].innerHTML = "Decay";
}

/**********************************************************/

function setRowClass(row, ap, mp) {
	var rowClass = "";
	if (ap <= AP_CRITICAL) {
		rowClass += " petstatus-apcritical";			
	} else if (ap <= AP_LOW) {
		rowClass += " petstatus-aplow";
	} else if (ap < mp) {
		rowClass += " petstatus-mpsurplus";
	}
	row.setAttribute("class", rowClass);
}

/**********************************************************/

function modifyStanceForm(row) {
	var stanceSubmit = document.evaluate(
		".//input[@type='submit']", 
		row.cells[5], 
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	).snapshotItem(0);
	stanceSubmit.style.display = "none";

	var stanceSelect = document.evaluate(
		".//select", 
		row.cells[5], 
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	).snapshotItem(0);
	stanceSelect.onchange = function(){this.form.submit();};
}

/**********************************************************/

function getTick() {
	var tick = new Date();
	tick.setMinutes(tick.getMinutes() - (tick.getMinutes() % 15));
	tick.setSeconds(0);
	return tick;
}
