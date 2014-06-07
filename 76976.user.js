// ==UserScript==
// @name           WK History Resorter
// @namespace      Ranatama
// @description    Changes the table display to look like the B-rank and lower to use with my raffle script.
// @include        http://*animecubed.com/billy/bvs/worldkaiju-history.html
// ==/UserScript==

var names = document.evaluate("//table/tbody/tr[position() > 1]/td[1]/b", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if(names != null){
var ranks = document.evaluate("//tbody/tr/td[2]/font/b/i", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var combos = document.evaluate("//table/tbody/tr[position() > 1]/td[4]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

//note: first and last entry in combos is blank, skip them.

var parent1 = document.evaluate("//tbody/tr/td/center/font[2]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

var brb = document.createElement('br');
var divS = document.createElement('div');
var Stext = "S-Ranks: ";
var divA = document.createElement('div');
var Atext = "A-Ranks: ";

for (var i = 1; i < combos.snapshotLength - 1; i++){
	var ranking = ranks.snapshotItem(i - 1);
	var rank = ranking.innerHTML;
	if (rank == "S"){
		var name = names.snapshotItem(i-1);
		Stext += name.innerHTML + "(";
		var combo = combos.snapshotItem(i);
		Stext += combo.innerHTML + "), ";
	} else {
		var name = names.snapshotItem(i-1);
		Atext += name.innerHTML + "(";
		var combo = combos.snapshotItem(i);
		Atext += combo.innerHTML + "), ";

	}
}

divS.innerHTML = Stext;
divA.innerHTML = Atext;

parent1.appendChild(brb);
parent1.appendChild(divS);
parent1.appendChild(brb);
parent1.appendChild(divA);




}