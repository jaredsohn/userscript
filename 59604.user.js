// ==UserScript==
// @name           GLB Package Percentage
// @namespace      pbr/gpp
// @description    Tally percentages on GLB AI packages.
// @include        http://goallineblitz.com/game/team_package.pl?team_id=*&type=*
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        09.10.12
// ==/UserScript==

window.setTimeout( function() {
	percentages();
}, 1000);

function percentages() {
	var inputs = document.getElementsByTagName("input");
	var pct = 0;
	for (var i=0; i<inputs.length; i++) {
		var n = inputs[i].getAttribute("name");
		if (n.split("_")[1] == "**ID**") continue;
		if (n.split("_")[0] == "bias") {
			pct += parseInt(inputs[i].value);
//console.log(inputs[i].getAttribute("name")+" -- "+inputs[i].value);
		}
	}

	var div = document.getElementById("package_name");
	div.innerHTML += "&nbsp;("+pct+"%)";
//	alert(pct);
}


