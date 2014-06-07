// ==UserScript==
// @name           SSW Sector Map Notes
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Use the 'N' key to add notes to the sector map.  'D' key deletes a note.
// @include        http://www.secretsocietywars.com/index.php?p=space&a=sector_map
// ==/UserScript==

var notes = eval(GM_getValue("notes", "[]"));
var sector_links = document.evaluate('//a[contains(@href, "p=space&a=blastoff") or contains(@href, "p=space&a=move")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var original_overlib = unsafeWindow.overlib;
var last_sector = 0;

unsafeWindow.overlib = note_overlib;
document.addEventListener("keydown", kp, false);

for(var i = 0; i < notes.length; i++) {
	if(notes[i]) {
		add_border(i);
	}
}

function add_border(sector) {
	var div = sector_links.snapshotItem(sector-1).parentNode;
	div.style.border = "1px solid white";
	div.style.width = "18px";
	div.style.height = "18px";
}

function remove_border(sector) {
	var div = sector_links.snapshotItem(sector-1).parentNode;
	div.style.border = "none";
	div.style.width = "20px";
	div.style.height = "20px";
}

function note_overlib(a, b, c) {
	var re;
	var sector = 0;
	if(re = /Sector\s+#(\d+)/i.exec(c)) {
		sector = parseInt(re[1]);
		last_sector = sector;
	}
	if(notes[sector]) {
		c = c + '<br><div style="background-color: red">'+notes[sector]+'</div>';
	}
	unsafeWindow.overlib = original_overlib;
	original_overlib(a, b, c);
	unsafeWindow.overlib = note_overlib;
}

function kp(ev) {
	var c = String.fromCharCode(ev.which);
	var sector = last_sector;
	if(c == 'N' && sector) {
		var note = prompt("Enter a note for sector #"+sector, notes[sector] || "");
		if(note != null) {
			if(note == "") {
				notes[sector] = undefined;
				remove_border(sector);
			} else {
				notes[sector] = note;
				add_border(sector);
			}
			GM_setValue("notes", notes.toSource());
		}
	} else if(c == 'D') {
		notes[sector] = undefined;
		GM_setValue("notes", notes.toSource());
		remove_border(sector);
	}
}
			
