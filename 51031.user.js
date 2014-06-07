// ==UserScript==
// @name           blah
// @namespace      pbr
// @include        http://goallineblitz.com/game/training.pl?player_id=*
// ==/UserScript==

window.setTimeout( function() {
    main();
}, 2000);

function main() {
	var div = document.getElementById("attributes");
	var table = div.getElementsByTagName("table")[1];
	var trainingtable = table.getElementsByTagName("td");
	var training = new Array();
	for (var i=0; i<trainingtable.length; i++) {
		if (trainingtable[i].innerHTML.indexOf("%") != -1) {
			training.push(trainingtable[i]);
		}
	}

	var stats = new Array();
	var divs = document.getElementsByClassName("stat_value_tall");
	for (var i=0; i<divs.length; i++) {
		stats.push(parseFloat(divs[i].innerHTML));
	}

	for (var i=0; i<training.length; i++) {
		var val = parseFloat(training[i].innerHTML.slice(1));
		var cost = parseInt(Math.exp(.0003 * Math.pow(stats[i], 2)));
		training[i].innerHTML = (val*cost)+"% | "+training[i].innerHTML;
	}
}
