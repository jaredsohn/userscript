// Neopet StockMarket Hack
// version 0.5 beta-ish
// 2007-06-12
// Copyright (c) 2007, Sandy Thayer
// Released under the GPL license
// http://www.bruk.org
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.6 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "StockMarket Hack", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          StockMarket Hack
// @namespace     http://bruk.org/nps
// @description   Makes the Neopian Stock market a little faster to deal with
// @include       http://*.neopets.com/stockmarket.*

// ==/UserScript==


function removeMarqueesFor(someDoc){
  var marquees = someDoc.getElementsByTagName('marquee');
  for(var i = 0; i < marquees.length; i++){
    var marquee = marquees[i];
    var parentNode = marquee.parentNode;
    var pElement = someDoc.createElement('div');
    
    parentNode.removeChild(marquee);
    

    for(var i = 0; i < 100; i++){

if( marquee.childNodes[i].textContent.match (/ 15 /) || marquee.childNodes[i].textContent.match (/ 16 /))
{
marquee.childNodes[i].textContent += '  ';
pElement.appendChild(marquee.childNodes[i]);
}
    }

    
    for(var i = 0; i < marquee.attributes.length; i++){
      pElement.setAttribute(marquee.attributes[i].nodeName, marquee.attributes[i].nodeValue);
	
    }
    
    parentNode.appendChild(pElement);
  }
}

removeMarqueesFor(document);

for(var i = 0; i < frames.length; i++){
  removeMarqueesFor(frames[i].document);
}



var allNobr, thisNobr;
var stuuf= 'stuuf'; 
var wth;


allNobr = document.getElementsByTagName('nobr');
for (var i = 0; i < allNobr.length; i++) {
    thisNobr = allNobr[i];
    	stuuf = thisNobr.textContent;

	wth = '+';
	stuuf = stuuf.replace(wth, '');

	wth = '-';
	stuuf = stuuf.replace(wth, '');

	wth = '%';
	stuuf = stuuf.replace(wth, '');

	if (stuuf > 90)
	{
		thisNobr.style.fontSize = "16px";
		thisNobr.style.backgroundColor = "yellow";
	}
}

