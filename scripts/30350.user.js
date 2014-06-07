// ==UserScript==
// @name           Lords of Legend - Sort Potential Opponents By Wealth
// @namespace      RunningBlind
// @description    Orders your wealthiest potential opponents by wealth on the "attack" page.
// @include        http://lordsoflegend.com/user_attack.php*
// @include        http://*.lordsoflegend.com/user_attack.php*
// ==/UserScript==

function getElementsByClass(searchClass,node,tag) { //get elements by class @ http://www.dustindiaz.com/getelementsbyclass/
	var classElements = new Array();
	if ( node == null ) node = document;
	if ( tag == null ) tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

theTable = getElementsByClass('lm')[0].parentNode.parentNode.parentNode;

function GM_wait() {
	if (theTable) {start();}
	else {window.setTimeout(function () {GM_wait();}, 300);}
}

function start() {
	opponentRows = [];
	for (i = 1; i < theTable.rows.length-2; i++) {
		opponentRows.push(theTable.rows[i]);
	}
	opponentRows.sort(function (a,b) {
		x = a.cells[2].lastChild.textContent.replace(/[^\d]/g, '')*1;
		y = b.cells[2].lastChild.textContent.replace(/[^\d]/g, '')*1;
		return y-x;
	});
	for (j = 0; j < opponentRows.length; j++) {
		theTable.tBodies[0].insertBefore(opponentRows[j], theTable.tBodies[0].rows[theTable.tBodies[0].rows.length-2]);
	}
}

GM_wait();