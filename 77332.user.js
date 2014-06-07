// ==UserScript==
// @name           Link for Travian 3.6
// @author         Roohollah Davoodi
// @namespace	   TRAV
// @description    This script acts like Travian's PLUS links
// @include        http://*.travian.*
// @exclude        http://forum.travian.*
// @email          roohollah.davoodi@gmail.com
// @version        1.0.0.1
// ==/UserScript==

//global variables (don't changes these)
var dom = new DOMUtils();

var Links = new Array();     // Links list
var Titles = new Array();    // Links Title list


function main() {
	var sidebar = document.getElementById('side_info');
	var TB = $t([['id', 'TB3S']]);
	var LR = $r([['class', 'rbrtb'], ['id', 'resbarTable_' + i]]);
	LR.appendChild($c("Test", "");
	TB.appendChild(bRow);
	sidebar.appendChild(TB);
}


	function $at(aElem, att) {if (att !== undefined) {for (var xi = 0; xi < att.length; xi++) {aElem.setAttribute(att[xi][0], att[xi][1]); if (att[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[xi][1]);};};};//Acr111-addAttributes
	function $t(att) {var aTb = document.createElement("TABLE"); $at(aTb, att);	return aTb;};
	function $r(att) {var aRow = document.createElement("TR"); $at(aRow, att); return aRow;};
	function $c(iHTML, att) {var aCell = document.createElement("TD"); aCell.innerHTML = iHTML; $at(aCell, att); return aCell;};
