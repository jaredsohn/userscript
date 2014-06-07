// ==UserScript==
// @name           SSW Fight Form Mover
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Moves the fight form to underneath the monster description
// @include        http://www.secretsocietywars.com/index.php?p=monsters*
// ==/UserScript==

var results;
var fieldset;
var frms;
var action_form;
var imgs;
var tab;

results = document.evaluate('//fieldset[@class="results"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(results.snapshotLength == 1) {
	fieldset = results.snapshotItem(0);
}

frms = document.evaluate('//form[contains(@action,"index.php?p=monsters")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(frms.snapshotLength == 1) {
	action_form = frms.snapshotItem(0);
} else {
	frms = document.evaluate('//form[contains(@action,"index.php?p=quests")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(frms.snapshotLength == 1) {
		action_form = frms.snapshotItem(0);
	}
}

imgs = fieldset.getElementsByTagName("img");
if(imgs.length > 0) {
	tab = imgs[0];

	while((tab.nodeName != "TABLE")) {
		tab = tab.parentNode;
	}
}

if(fieldset && action_form && tab && (tab.nodeName == "TABLE")) {
	var monster_rownum = -1;
	
	for(var i = 0; i < tab.rows.length; i++) {
		if(tab.rows[i].getElementsByTagName("img").length > 0) {
			monster_rownum = i;
			break;
		}
	}
	if(monster_rownum != -1) {
		var new_cell;
		
		tab.insertRow(monster_rownum + 1);
		new_cell = tab.rows[monster_rownum + 1].insertCell(0);
		new_cell.colSpan = tab.rows[monster_rownum].cells.length;
		new_cell.style.background = tab.rows[monster_rownum].cells[0].style.background;
		new_cell.appendChild(action_form);
	}
}
