// Change Geizhals Homepage
// ==UserScript==
// @name           Change Geizhals Homepage
// @namespace      http://geizhals.at/greasemonkeyscripts
// @description    Removes some stuff
// @include        http://geizhals.at/
// @include        http://geizhals.net/
// @include        http://geizhals.at/de/
// @include        http://geizhals.net/de/
// @include        http://geizhals.at/deutschland/
// ==/UserScript==
var allElements, thisElement;
allElements = document.evaluate(
	'//td[@colspan='2']',		//looking for all td elements with a colspan of 2
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
	null);
	thisElement = allElements.snapshotItem(1); // the second match contains the saltuation
	thisElement.innerHTML = '<br><center><b>Herzlich willkommen beim Geizhals-Preisvergleich!</b><center><br>'
	// we change it to something else
