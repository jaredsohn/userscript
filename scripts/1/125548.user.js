// ==UserScript==
// @name           Change Package Defaults
// @namespace      pbr/cpd
// @include        http://goallineblitz.com/game/team_package.pl?team_id=*&type=o&edit=*
// @copyright      2012, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        12.02.11
// ==/UserScript==

window.setTimeout(function() {
    var div = document.createElement("div");
	div.style.clear = "both";

    var button = document.createElement("input");
    button.setAttribute("value","Change Default Actions");
    button.setAttribute("type","button");
    button.setAttribute("id","cdabutton");
    button.addEventListener("click",main,false);
    div.appendChild(button);

	var ap = document.getElementById("all_plays").previousSibling.previousSibling;
	ap.appendChild(div);
}, 3000);

function main() {
	var selects = document.getElementsByTagName("select");
	var str = "";

	var idx = 0;
	for each (var s in selects) {
		str += ++idx + ") " + s.id + " | " + s.value + "\n";
	
		if (s.id.indexOf("hb_block_") == 0) {
			s.selectedIndex = 1;
		}
		else if (s.id.indexOf("fb_block_") == 0) {
			s.selectedIndex = 1;
		}
		else if (s.id.indexOf("te_block_") == 0) {
			s.selectedIndex = 1;
		}
		else if (s.id.indexOf("bte_block_") == 0) {
			s.selectedIndex = 1;
		}
	}
}


