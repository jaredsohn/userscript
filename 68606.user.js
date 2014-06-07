// ==UserScript==
// @name           FHInfo Notenschnitt-Rechner
// @version        1.1.1
// @namespace      http://markushenn.de/
// @copyright      Markus 'voks' Henn
// @description    Rechnet auf der Notenseite des FHInfo-Portals der FH Kaiserslautern (Zweibrücken) den Notenschnitt entsprechend den ECTS-Punkten aus.
// @include        https://fhinfo.fh-kl.de/portal/*focusedTabID=64*
// @include        https://fhinfo.fh-kl.de/portal/tag.*.render.userLayoutRootNode.target.42-285.uP*
// @run-at         document-end
// ==/UserScript==


var xpathTableRows = "//table[@id='tabelleSort']/tbody/tr";
var xpathrelPrfnr = "td[1]";
var xpathrelEcts = "td[4]";
var xpathrelNote = "td[7]";
var xpathrelStatus = "td[8]";
var xpathrelBemerkung = "td[11]";

var snapshotRows = document.evaluate(xpathTableRows, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var sumEcts = 0;
var sum = 0;
//var strings = "";
var ignorePrfnr = new Array();

function isIn(x, array)
{
	for(var i=1; i <= array.length; i++) {
		if (array[i] == x) {
			return true;
		}
	}
	return false;
}

function notenschnitt() {
	for(var i=1; i < snapshotRows.snapshotLength; i++) {
		var prfnr = document.evaluate(xpathrelPrfnr, snapshotRows.snapshotItem(i), null, XPathResult.NUMBER_TYPE, null).numberValue;
		var ects = document.evaluate(xpathrelEcts, snapshotRows.snapshotItem(i), null, XPathResult.NUMBER_TYPE, null).numberValue;
		var note = document.evaluate(xpathrelNote, snapshotRows.snapshotItem(i), null, XPathResult.STRING_TYPE, null).stringValue.replace('/&nbsp;/','').replace(',','.');
		var status = document.evaluate(xpathrelStatus, snapshotRows.snapshotItem(i), null, XPathResult.STRING_TYPE, null).stringValue.replace('\n','');
		var bemerkung = document.evaluate(xpathrelBemerkung, snapshotRows.snapshotItem(i), null, XPathResult.STRING_TYPE, null).stringValue;
		note = parseFloat(note);
		//GM_log([status, ects, note, bemerkung, prfnr]);
		if (status == 'BE' && !isNaN(ects) && !isNaN(note) && (bemerkung.indexOf('FNV') == -1) && !isIn(prfnr, ignorePrfnr)) {
			if (bemerkung.indexOf('FVB') != -1) {
				ignore_pruefnr.push(prfnr);
			}
			sumEcts += ects;
			sum += note * ects;
			//strings += ects + " * " + note + " = " + note * ects + "\n";
		}
	}

	if (!isNaN(sum / sumEcts)) {
		alert("Unverbindlicher Notendurchschnitt: " + sum / sumEcts);
		//alert(strings);
	}
}

// only run if DOM has loaded
if(document.getElementById('content'))
	notenschnitt();
else {
  var waitfordom=setInterval(function(){
    if(document.getElementById('content')) {
      clearInterval(waitfordom);
      notenschnitt();
    }
  }, 200);
}
