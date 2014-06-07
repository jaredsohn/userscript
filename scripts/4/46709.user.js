// This script calculates the actual price after %off discount
// and displays it next to the %off discount.
//
// This is my first Greasemonkey script ever!  How cool...
//
// Version 0.2 - added @grant line to conform to new Greasemonkey 1.0 standard
// Version 0.2 - changed @include line to remove "www".  The script wasn't working.
//
// ==UserScript==
// @name             Gearattack Discount Price
// @namespace        none
// @description      Show the actual discounted price after %off
// @author           Ryan Ruta
// @version          0.2
// @include          http://*gearattack.com/*
// @grant            none
// ==/UserScript==
//

var discountDivs;
var msrpDivs;
var thisDiv;
var discount= new Array();
var priceNow= new Array();
var priceDiscounted= new Array();
var newElement;

discountDivs = document.evaluate(
"//div[@id='home-item-info']//h2",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < discountDivs.snapshotLength; i++) {
thisDiv = discountDivs.snapshotItem(i).innerHTML;
thisDiv = thisDiv.substr(-8,2); //get discount portion of string, start at 8 characters from right, get 2 characters
discount[i] = parseFloat(thisDiv); //convert string to float
}

msrpDivs = document.evaluate(
"//div[@id='home-item-info']//strong",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < msrpDivs.snapshotLength; i++) {
thisDiv = msrpDivs.snapshotItem(i).innerHTML;
thisDiv = thisDiv.substr(1); //remove "$" from string
priceNow[i] = parseFloat(thisDiv); //convert string to float
priceDiscounted[i] = priceNow[i]*(100-discount[i])/100;
priceDiscounted[i] = priceDiscounted[i].toFixed(2); //toFixed rounds to a given number of decimal places
priceDiscounted[i] = String(priceDiscounted[i]); //convert float to string

//create the new html element
newElement = document.createElement('strong');
		//build the string for the html element that will be inserted
	    var s = '<strong> $';
	    s += priceDiscounted[i];
	    s += ' </strong>';
	    newElement.innerHTML = s;
		
		thisDiv = discountDivs.snapshotItem(i); //define the node where the new html will be inserted
	    thisDiv.parentNode.insertBefore(newElement, thisDiv); //insert the new html element
}