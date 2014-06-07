// ==UserScript==

// @name           SwapThing

// @namespace      http://www.jeffwinkler.net/greasemonkey/

// @include        http://www.swaptree.com/WebFrmItemDetail.aspx?*

// ==/UserScript==


// http://www.swaptree.com/WebFrmItemDetail.aspx?ISBN=

function getElementText(elID) {
	return document.getElementById(elID).innerHTML.replace(/[^a-zA-Z0-9 ]/g, "").replace(/^ +/g, "").replace(/ +$/g, "");
}

function doIt() {
  //var getit= new Array();
  //var getit=location.href.split("ISBN=");
  //var ISBN=getit[1];
  // var loc = 'http://www.librarything.com/isbn/' + ISBN;

  title = getElementText ('_ctl90_hyplnkItemName1');
  var loc = 'http://www.librarything.com/title/' + title;
  var div = document.createElement('div');
  var anc = document.createElement('a');
  anc.target = '_new';
  anc.href = loc;
  anc.innerHTML = "LibraryThing Review";
  div.appendChild(anc);
  var sibling = document.getElementById('UctrlSubMenu_lblPageHeadlineText');
  sibling.parentNode.insertBefore(div, sibling.nextSibling);
}

doIt();