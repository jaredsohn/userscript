// ==UserScript==
// @name           Pigskin Empire: Sort Phone Contacts By Position
// @namespace      pbr/scbp
// @include        http://beta.pigskinempire.com/phone.asp*
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        09.09.09
// ==/UserScript==

window.setTimeout( 
	function() {
		run();
	}, 
	100
);

function run() {
	var ends = ["<td>Offered","<td>Rejected", "<td>Committed","<td>Rescinded", null];
	pass("<td>Prospects",ends.slice(0));
	pass("<td>Offered",ends.slice(1));
	pass("<td>Rejected",ends.slice(2));
	pass("<td>Committed",ends.slice(3));
	pass("<td>Rescinded",ends.slice(4));
}

function pass(startString, endString) {
	var tr = document.getElementsByTagName("tr");
	var start;
	var end = tr.length;
	var players = new Array();
	for (var i=0; i<tr.length; i++) {
		if (tr[i].innerHTML.indexOf(startString) == 0) {
			start = i;
		}
		else {
			var found = false;
			for (var j=0; j<endString.length; j++) {
				if (tr[i].innerHTML.indexOf(endString[j]) == 0) {
					found = true;
					end = i;
					break;
				}
			}
			if (found == true) break;
		}
		if (start != null) {
			players.push(tr[i]);
		}
//		console.log(tr[i].innerHTML);
	}
//	console.log(start+" -- "+end+" : "+players.length);

	var out = playerOrder(players);
//	console.log(out.length);
//	for (var i=0; i<out.length; i++) console.log(out[i]);
	for (var i=start; i<end; i++) {
		tr[i].innerHTML = out[i-start];
	}
}

function playerOrder(arr) {
	var left, right;
	for (var i=0; i<arr.length-1; i++) {
//		console.log(arr[i].innerHTML.split("&nbsp;")[1]);
		for (var j=i+1; j<arr.length; j++) {
			if (arr[i].innerHTML.split("&nbsp;")[1] > 
				arr[j].innerHTML.split("&nbsp;")[1]) {
				var temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
		}
		arr[i] = arr[i].innerHTML;
	}
	if (arr.length > 0) arr[arr.length-1] = arr[arr.length-1].innerHTML;
	return arr;
}

