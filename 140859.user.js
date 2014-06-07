// ==UserScript==
// @name        AI Percentages
// @namespace   pbr/aipct
// @include     http://goallineblitz.com/game/team_*ense_ai.pl?team_id=*&id=*
// @include     http://glb.warriorgeneral.com/game/team_*ense_ai.pl?team_id=*&id=*
// @copyright   2010, pabst
// @license     (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version     13.12.29
// ==/UserScript==

window.setTimeout(function() {
	main();
}, 100);

function main() {
	var outputs = document.getElementsByClassName("outputs");
	for (var i=0; i<outputs.length; i++) {
		outputs[i].addEventListener ("DOMSubtreeModified", changed, true);
	}
}

function changed(e) {
	var id = new Array();
	var bias = new Array();
	var outputs = e.currentTarget.getElementsByClassName("output_bias");
	for (var j=0; j<outputs.length; j++) {
		var inputs = outputs[j].getElementsByTagName("input");
		for (var i=0; i<inputs.length; i++) {
			if (inputs[i].value != null) {
				var o = parseInt(inputs[i].id.split("_")[1]);
				if (isNaN(o) == true) continue;
				if (id.indexOf(o) == -1) {
					id.push(o);
				}

				var b = parseFloat(inputs[i].value);
				if (bias[o] == null) {
					bias[o] = 0;
				}
				bias[o] += b;
			}
		}
	}
	for each (var i in id) {
		var span = document.getElementById("output_count_value_"+i);
		if (span != null) {
			span.innerHTML = span.innerHTML.split(" ")[0]+" ("+bias[i].toFixed(2)+"%) ";
		}
	}

}
