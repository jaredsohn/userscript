// ==UserScript==
// @name           Gormball Autoplayer
// @namespace      http://userscripts.org/scripts/show/62955
// @version 	   1.0
// @description    An autoplayer for the Neopets game Gormball.
// @include        http://www.neopets.com/space/gormball.phtml*
// @include        http://www.neopets.com/space/gormball2.phtml*
// ==/UserScript==

var character = 5;
var waitfor = 2;

////////////////////////////////////////////////////////////////////////////////

if (window.location == "http://www.neopets.com/space/gormball.phtml") {
	document.getElementsByName("player_backed")[0].value = character;
	document.getElementsByName("xcn")[0].parentNode.name = "gormform";
	var delay = (Math.random() * 2000) + 1000;
	setTimeout("document.forms.gormform.submit()",delay);
}

if (window.location == "http://www.neopets.com/space/gormball2.phtml") {

var allWaits, thisWait;
allWaits = document.evaluate("//select[@name='turns_waited']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allWaits.snapshotLength; i++) {
	thisWait = allWaits.snapshotItem(i);
	document.getElementsByName("turns_waited")[0].value = waitfor;
	}

var allNexts, thisNext;
allNexts = document.evaluate("//form[@name='gormform']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allNexts.snapshotLength; i++) {
	thisNext = allNexts.snapshotItem(i);
	var delay = (Math.random() * 2000) + 1000;
	setTimeout("document.forms.gormform.submit()",delay);
	}

var allDivs, thisDiv;
allDivs = document.evaluate("//form[@action='gormball.phtml']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	var delay = (Math.random() * 2000) + 5000;
	setTimeout("document.forms[1].submit()",delay);
	}

}