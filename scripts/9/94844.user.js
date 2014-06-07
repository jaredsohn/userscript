// ==UserScript==
// @name 	JTrac : afficher numero de ticket dans le titre
// @namespace	http://jtrac.cib.net:8000/
// @description	JTrac : afficher numero de ticket dans le titre
// @include		http://jtrac.cib.net:8000/jtrac/app/item/*
// ==/UserScript==

var xdxID;
var xdxSummary;

var xx = document.evaluate( "//table[@class = 'jtrac jtrac-view']//td", document, null, XPathResult.ANY_TYPE, null );
var thisTD = xx.iterateNext();   
while (thisTD) {  
  if ( thisTD.textContent == 'ID' || thisTD.textContent == 'Identifiant') {
	xdxID = thisTD.nextSibling.nextSibling.textContent;
  } else if ( thisTD.textContent == 'Summary' || thisTD.textContent.match('R.sum.')) {
	xdxSummary = thisTD.nextSibling.nextSibling.textContent;
  } else {	// next !
  } 
  thisTD = xx.iterateNext();  
}

document.getElementsByTagName('title').item(0).text = xdxID+' '+xdxSummary;


if (xdxID.match('HLD.*')) {
	var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'http://intramtc.cib.net/intranet/jtrac/jtrac-helpdesk-favicon.png';
    document.getElementsByTagName('head')[0].appendChild(link);
}