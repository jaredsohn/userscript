// ==UserScript==
// @name           GLB Survivor - Popular Picks
// @namespace      pbr/gspp
// @include        http://goallineblitz.com/game/league_survivor.pl?*
// @include        http://glb.warriorgeneral.com/game/league_survivor.pl?*
// @copyright      2011, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        13.12.29
// ==/UserScript==

window.setTimeout(
    function() {
        main();
		alphabetize();
    }
, 100);

function alphabetize() {
	var select = document.getElementsByTagName("select");
	for (var s=0; s<select.length; s++) {
		if (select[s].getAttribute("name") == "my_pick") {
			var sel = select[s];
			var selected = sel.value;

			for (var i=1; i<sel.options.length-1; i++) {
				for (var j=i+1; j<sel.options.length; j++) {
					if ((sel.options[i].innerHTML).toLowerCase() > (sel.options[j].innerHTML).toLowerCase()) {
						var temp = sel.options[i].innerHTML;
						sel.options[i].innerHTML = sel.options[j].innerHTML;
						sel.options[j].innerHTML = temp;

						var temp = sel.options[i].value;
						sel.options[i].value = sel.options[j].value;
						sel.options[j].value = temp;
					}

					if (sel.options[i].value == selected) {
						sel.selectedIndex = i;
					}
				}
			}
			break;
		}
	}
}

function main() {
	var picks = new Array();
	var table = document.getElementsByTagName("table")[1];
	var rows = table.getElementsByTagName("tr");
	for (var i=1; i<rows.length; i++) {
		var h = rows[i].children[1].innerHTML;
		if (rows[i].children[2].innerHTML.indexOf("ELIMINATED") != -1) {
			h = h+" (incorrect)";
		}
		else {
			h = "<b>"+h+"</b>";
		}
		if (picks[h] == null) {
			picks[h] = [h,0];
		}
		picks[h] = [picks[h][0], picks[h][1]+1];
	}

	var sorted = new Array();
	for each (var p in picks) {
		if (sorted[p[1]] == null) sorted[p[1]] = new Array();
		sorted[p[1]].push(p[0]);
	}

	var tr = document.createElement("tr");
	tr.setAttribute("class","nonalternating_color");
	var td1 = document.createElement("td");
	td1.innerHTML = "<td>Count</td>";
	var td2 = document.createElement("td");
	td2.innerHTML += "<td>Pick</td>";
	tr.appendChild(td1);
	tr.appendChild(td2);

	var tbody = document.createElement("tbody");
	tbody.appendChild(tr);

	var x = 1;
	for (var i=sorted.length-1; i>0; i--) {
		if (sorted[i] == null) continue;
		for (var j=0; j<sorted[i].length; j++) {
			var td1 = document.createElement("td");
			td1.innerHTML = "<td>"+i+"</td>";
			var td2 = document.createElement("td");
			td2.innerHTML += "<td>"+sorted[i][j]+"</td>";

			var tr = document.createElement("tr");
			tr.setAttribute("class","alternating_color"+((x++)%2+1));
			tr.appendChild(td1);
			tr.appendChild(td2);
			tbody.appendChild(tr);
		}
	}

	var table = document.createElement("table");
	table.appendChild(tbody);

	var head = document.getElementsByClassName("medium_head")[1];
	head.parentNode.insertBefore(table, document.getElementsByTagName("table")[1]);
}

