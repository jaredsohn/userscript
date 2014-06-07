// ==UserScript==
// @name           PMOG Crate Urchin
// @namespace      google.com
// @include        http://pmog.com/locations/*/crates
// ==/UserScript==

//definitions
// define selects
var selects = new Object;
if (document.getElementsByName('crate[datapoints]').length == 1) {
	selects["dp"] = document.getElementsByName('crate[datapoints]')[0];
}
if (document.getElementsByName('crate[tools][armor]').length == 1) {
	selects["armor"] = document.getElementsByName('crate[tools][armor]')[0];
}
if (document.getElementsByName('crate[tools][crates]').length == 1) {
	selects["crates"] = document.getElementsByName('crate[tools][crates]')[0];
}
if (document.getElementsByName('crate[tools][lightposts]').length == 1) {
	selects["lightposts"] = document.getElementsByName('crate[tools][lightposts]')[0];
}
if (document.getElementsByName('crate[tools][mines]').length == 1) {
	selects["mines"] = document.getElementsByName('crate[tools][mines]')[0];
}
if (document.getElementsByName('crate[tools][portals]').length == 1) {
	selects["portals"] = document.getElementsByName('crate[tools][portals]')[0];
}
if (document.getElementsByName('crate[tools][st_nicks]').length == 1) {
	selects["st_nicks"] = document.getElementsByName('crate[tools][st_nicks]')[0];
}

// define function
function calc_free () {
	var free = 10;
	for (var i in selects) {
		if (i == "dp") {
			free -= Math.ceil(selects["dp"].value / 100); // convert dp to slots
		}
		else {
			free -= selects[i].value;
		}
	}
	return free;
}

function adjust_options () {
	// for every item you have 1 or more of
	for (var j in selects) {
		var len = selects[j].length;
		var val = selects[j].value;
		var tmp_free = calc_free();
		if (j == "dp") {
			tmp_free *= 100; // convert slots to dp
		}
		for (var k=0; k<len; k++) {
			if ((selects[j].options[k].value - val) > tmp_free) {
				selects[j].options[k].disabled = true;
			}
			else {
				selects[j].options[k].disabled = false;
			}
		}
	}
}

// define events
for (var l in selects) {
	selects[l].addEventListener("change", adjust_options, true);
}
