// ==UserScript==
// @name           WitB parser
// @namespace      Conster
// @description    Parses Work in the Back shifts
// @include        http://*animecubed.com/billy/bvs/pizzawitchgarage.html
// ==/UserScript==

var workintheback = document.evaluate("//table/tbody/tr/td[2]/b", document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if (workintheback && workintheback.innerHTML == "Work in the Back") {
	var shifts = document.evaluate("//font/table/tbody/tr/td/b", document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var blargh = false;
	if (shifts.snapshotLength == 0) {	//it's possible there's so many shifts a scrollbar was used
		blargh = true;
		shifts = document.evaluate("//div/table/tbody/tr/td/b", document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	var totalshifts = shifts.snapshotLength;	var grosstips = 0;	var bribes = 0;		var nettips = 0;
	var ruby = 0;		var sapphire = 0;	var emerald = 0;	var diamond = 0;	var awesomium = 0;	
	if (totalshifts != 0) {
		for (var i = 0; i < totalshifts; i++) {
			var thisshift = shifts.snapshotItem(i).textContent;
			var index1 = thisshift.indexOf("Received: ")+10;
			var index2 = thisshift.indexOf("(")-4;
			if (thisshift.indexOf("Bribes") == -1) {	//no bribes
				if (index2 < 0) {	//no Yuri or Wooden sword either
					index2 = thisshift.substring(index1).indexOf(" ");
					grosstips += parseInt(thisshift.substring(index1).substring(0,index2));
				} else {		//something else with a "(" - gross tips as usual, but no bribes
					grosstips += parseInt(thisshift.substring(index1,index2));
				}
			} else {
				grosstips += parseInt(thisshift.substring(index1,index2));
				thisshift = thisshift.substring(index2+6);
				index2 = thisshift.indexOf(" ");
				bribes += parseInt(thisshift.substring(0,index2));
			}
			if (thisshift.indexOf("Ruby") != -1) {
				ruby += 1;
			} else if (thisshift.indexOf("Sapphire") != -1) {
				sapphire += 1;
			} else if (thisshift.indexOf("Emerald") != -1) {
				emerald += 1;
			} else if (thisshift.indexOf("Diamond") != -1) {
				diamond += 1;
			} else if (thisshift.indexOf("Awesomium") != -1) {
				awesomium += 1;
			}
		}
		nettips = grosstips - bribes;
		var s = "";
		s += "<b>Results of " + totalshifts + " Shift";	if (totalshifts > 1) {	s += "s";	}	s += ":<br>";
		s += "Tips: " + grosstips + " - " + bribes + " = " + nettips + "<br>";
		if (ruby > 0) {		s += "Ruby Coins: " + ruby + "<br>";		}
		if (sapphire > 0) {	s += "Sapphire Coins: " + sapphire + "<br>";	}
		if (emerald > 0) {	s += "Emerald Coins: " + emerald + "<br>";	}
		if (diamond > 0) {	s += "Diamond Coins: " + diamond + "<br>";	}
		if (awesomium > 0) {	s += "Awesomium Coins: " + awesomium + "<br>";	}
		s += "</b>";
		shifts.snapshotItem(0).parentNode.parentNode.parentNode.parentNode.innerHTML = s;
		for (var i = 1; i < totalshifts; i++) {
			shifts.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.innerHTML = "";
		}
	}
}