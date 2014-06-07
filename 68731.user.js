// ==UserScript==
// @name           Add Decline To Player Page
// @namespace      pbr
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// @include        http://glb.warriorgeneral.com/game/player.pl?player_id=*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        13.12.29
// ==/UserScript==

window.setTimeout(
    function() {
		main();
    }
, 2000);

var warning = false;

function main() {
	var mods = new Array();
	for (var t=0; t<document.getElementsByClassName("column_320").length; t++) {
		var tbl = document.getElementsByClassName("column_320");
		for (var i=tbl[t].rows.length-1; i>0; i--) {
			var dsc = tbl[t].rows[i].innerHTML.split(">")[1].split("<")[0];
			var val = tbl[t].rows[i].innerHTML.split(">")[3].split("<")[0];
			if (val.indexOf("Energy") != -1) {
				break;
			}
			else {
				if (val.indexOf("%") == -1) {
					mods[dsc] = parseFloat(val);
					if (warning == false) {
						var age = document.getElementsByClassName("vital_data")[2].innerHTML.split("-")[1];
						age = parseInt(age)-440;
						tbl[t].rows[i].innerHTML = "<td>Decline Penalty</td><td>"+age+" days</td>";
						warning = true;
					}
					else {
						tbl[t].deleteRow(i);
					}
				}
			}
		}
	}

	var tables = document.getElementsByClassName("player_stats_table");
	if (tables.length != 0) {
		var att = tables[0].getElementsByClassName("stat_container");
		for (var s=0; s<att.length; s+=2) {
		    var children = att[s].childNodes.length;

			var pdsc = att[s].childNodes[children-2].innerHTML.split(":")[0];
		    var ps = parseFloat(att[s].childNodes[children-1].innerHTML);

			var fdsc = att[s+1].childNodes[children-2].innerHTML.split(":")[0];
		    var fs = parseFloat(att[s+1].childNodes[children-1].innerHTML);

//			console.log(pdsc+"="+ps+"=>"+mods[pdsc]+" : "+fdsc+"="+fs+"=>"+mods[fdsc]);

			if (isNaN(mods[pdsc]) == false) {
				ps += mods[pdsc];
				att[s].childNodes[children-1].innerHTML = ps.toFixed(2);
			}
			if (isNaN(mods[fdsc]) == false) {
				fs += mods[fdsc];
				att[s+1].childNodes[children-1].innerHTML = fs.toFixed(2);
			}
		}
	}
}

