// ==UserScript==
// @name           Custom Play Sort V2
// @namespace      pbr
// @include        http://goallineblitz.com/game/team_create_defense.pl?team_id=*
// @version        10.01.29
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// ==/UserScript==

window.setTimeout(
    function() {
		main();
    }
, 100);

function main() {
	var tbl = document.getElementsByTagName("table");
	for (var i=0; i<tbl.length; i++) {
		tbl[i].style.visibility = "hidden";
//		console.log(i+":::>>> "+tbl[i].innerHTML.slice(0,60));
		for (var r=1; r<tbl[i].rows.length-1; r++) {
			var lowest = r;
			for (var r2=r+1; r2<tbl[i].rows.length; r2++) {
				var p2 = tbl[i].rows[r2].textContent;
				if (p2 < tbl[i].rows[lowest].textContent) {
					lowest = r2;
				}
			}
			if (lowest != r) {
				var t1 = tbl[i].rows[r].innerHTML;
				var t2 = tbl[i].rows[lowest].innerHTML;
				tbl[i].rows[r].innerHTML = t2;
				tbl[i].rows[lowest].innerHTML = t1;
			}
//				console.log(p1+"--> "+p2);
		}
		tbl[i].style.visibility = "visible";
	}
}

