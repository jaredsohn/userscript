// ==UserScript==
// @name           Gamelo: Row/Col Viability
// @namespace      http://xtina.dreamwidth.org
// @description    Displays overlaps in the rows/columns of a game.
// @include        http://gamelo.net/Public/gamePage.aspx?*
// ==/UserScript==

// Set this to true if you want to see numbers for this.
var showNum = true;

// Sometimes it's useful to double-check why something is failing.
var showSol = true;

// Change borders and background.
var chgCSS = {
	 "min": "1px dotted #060"
	,"maj": "2px solid #66F"
	,"bak": "#DEE";

/* Stop editing here! */

// Get the table body.
var glBody = document.getElementsByTagName("tbody")[1];

// *Grid* height/width.  The entire thing, plus the numbers.
var glTotWide = document.getElementsByTagName("tr")[1].childNodes.length - 2;
var glTotTall = glBody.childNodes.length - 1;

// Get the number of rows that are the top numbers.
for (var x = 0; x < glBody.childNodes.length; x++) {
	if (glBody.childNodes[x].childNodes[1].getAttribute("class") != "em") { break; }
}
var glCeil = x;

// Get the number of columns that are the side numbers.
for (x = 1; x < glBody.childNodes[glCeil + 1].childNodes.length; x++){
	var tmp = glBody.childNodes[glCeil + 1].childNodes[x];
	if (tmp.getAttribute("class").substring(0, 1) == "A") { break; }
}
var glSide = x - 1;

// La la actual playing field size woo.
var glWide = glTotWide - glSide;
var glTall = glTotTall - glCeil;

// And if we're doing that thing?
if (showSol) {
	var newSol = "width " + glWide + "\n";
	newSol = newSol + "height " + glTall + "\n";
}

// First out, we suss out the top-number/columnar viability.
var newRow = document.createElement("tr");
newRow.setAttribute("id", "added-tr");
for (x = 0; x < glSide; x++) {
	var tmpTd = document.createElement("td");
	tmpTd.setAttribute("style", "background-color: " + bodyBG + ";");
	tmpTd.setAttribute("class", "added-td");
	newRow.appendChild(tmpTd);
}
if (showSol) { var newSol1 = "\ncolumns"; }
for (x = glSide + 1; x <= glTotWide; x++) {
	if (showSol) {
		newSol1 = newSol1 + "\n";
	}
	var tmpSm = 0;
	var tmpCt = -1;
	var tmpMx = 0;
	for (var y = 0; y < glCeil; y++) {
		if (glBody.childNodes[y].childNodes[x].innerHTML != "&nbsp;") {
			if (showSol) {
				newSol1 = newSol1 + glBody.childNodes[y].childNodes[x].innerHTML + ",";
			}
			tmpSm += parseInt(glBody.childNodes[y].childNodes[x].innerHTML);
			if (parseInt(glBody.childNodes[y].childNodes[x].innerHTML) > tmpMx) { tmpMx = parseInt(glBody.childNodes[y].childNodes[x].innerHTML); }
			tmpCt++;
		}
	}
	if (showSol) {
		newSol1 = newSol1.substr(0, newSol1.length - 1);
	}
	var tmpNow = parseInt(glTall) - (tmpSm + tmpCt);
	tmpTd = document.createElement("td");
	tmpTd.setAttribute("style", "background-color: " + bodyBG + ";");
	tmpTd.setAttribute("class", "added-td");
	if (tmpNow >= tmpMx) {
		tmpTd.innerHTML = "&nbsp;";
	} else if (tmpNow == 0) {
		tmpTd.innerHTML = "O";
	} else {
		if (showNum == true) {
			tmpTd.innerHTML = tmpNow;
		} else {
			tmpTd.innerHTML = "X";
		}
	}
	newRow.appendChild(tmpTd);
}
glBody.appendChild(newRow);


// SAME: side numbers.
if (showSol) { newSol2 = "\nrows"; }
for (x = glCeil; x < glTotTall; x++) {
	if (showSol) {
		newSol2 = newSol2 + "\n";
	}
	tmpSm = 0;
	tmpCt = -1;
	tmpMx = 0;
	for (y = 1; y <= glSide; y++) {
		if (glBody.childNodes[x].childNodes[y].innerHTML != "&nbsp;") {
			if (showSol) {
				newSol2 = newSol2 + glBody.childNodes[x].childNodes[y].innerHTML + ",";
			}
			tmpSm += parseInt(glBody.childNodes[x].childNodes[y].innerHTML);
			if (parseInt(glBody.childNodes[x].childNodes[y].innerHTML) > tmpMx) { tmpMx = parseInt(glBody.childNodes[x].childNodes[y].innerHTML); }
			tmpCt++;
		}
	}
	if (showSol) {
		newSol2 = newSol2.substr(0, newSol2.length - 1);
	}
	tmpNow = parseInt(glWide) - (tmpSm + tmpCt);
	tmpTd = document.createElement("td");
	tmpTd.setAttribute("style", "background-color: " + bodyBG + ";");
	tmpTd.setAttribute("class", "added-td");
	if (tmpNow >= tmpMx) {
		tmpTd.innerHTML = "&nbsp;";
	} else if (tmpNow == 0) {
		tmpTd.innerHTML = "O";
	} else {
		if (showNum == true) {
			tmpTd.innerHTML = tmpNow;
		} else {
			tmpTd.innerHTML = "X";
		}
	}
	glBody.childNodes[x].appendChild(tmpTd);
}
if (showSol) {
	alert("http://www.comp.lancs.ac.uk/~ss/nonogram/auto" + "\n" + newSol + newSol2 + "\n" + newSol1);
}

// **Add a removal button.
var remBtn = document.createElement("input");
remBtn.setAttribute("type", "button");
remBtn.setAttribute("onClick", 'document.getElementById("added-tr").parentNode.removeChild(document.getElementById("added-tr"));  var allTds = document.evaluate(\'//td[@class=\"added-td\"]\', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); for (var i = 0; i < allTds.snapshotLength; i++) { allTds.snapshotItem(i).parentNode.removeChild(allTds.snapshotItem(i)); }');
remBtn.setAttribute("value", "-X");
remBtn.setAttribute("style", "border: 1px solid #00C; width: 16px; font-size: 7pt;");
remBtn.setAttribute("title", "You'll want to use this before you click Check, else you'll never have a right answer. The entire table is in the form...");
tmp = document.getElementsByTagName("table")[1];
tmp.appendChild(remBtn);


/* Change the CSS of the page. */
var css = new Array();

function writeStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (document.getElementsByTagName) {
        document.getElementsByTagName('head')[0].appendChild(style);
        if (style.sheet && style.sheet.insertRule) {
            for (var i = 0; i < css.length; i++) {
                style.sheet.insertRule(css[i], 0);
            }
        }
    }
}

function addStyle(style) { css[css.length] = style; }

addStyle("table.clsMainMoTable td, table.clsMainMoTable th { border-top: " + chgCSS['min'] + "; border-left: " + chgCSS['min'] + "; }");
addStyle("table.clsMainMoTable .bgST{ border-top: " + chgCSS['maj'] + "; }");
addStyle("table.clsMainMoTable .bgSB{ border-bottom: " + chgCSS['maj'] + "; }");
addStyle("table.clsMainMoTable .bgSL{ border-left: " + chgCSS['maj'] + "; }");
addStyle("table.clsMainMoTable .bgSR{ border-right: " + chgCSS['maj'] + "; }");
addStyle("body {background-color: " + chgCSS['bak'] + ";}");

writeStyle(css);
