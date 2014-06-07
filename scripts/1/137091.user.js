// ==UserScript==
// @name           Woot-Off Title Bar Tracker
// @author         Laurelyn Collins
// @version        1.96
// @namespace      http://laurelyn.facebook.com
// @description    Replace title of window with item name, price, and % remaining
// @include        *.woot.com/*
// @exclude        */offers/*
// @exclude        *wantone.woot.com/*
// ==/UserScript==


//      Version 1.96 
//      9/18/2012 Added @exclude so page won't refresh while ordering
//      Version 1.95 
//      7/26/2012 1:14 PM Added @exclude so page won't refresh while looking at item details
//	Version 1.9
//	6/27/2012 1:53:38 PM Added script to handle "Sold Out" condition


// Edit this to change the time between updates (in ms)
var refreshInterval = 10000;

var currentItem = document.getElementsByClassName('title')[0].innerHTML;

var price = document.getElementsByClassName('price')[1].innerHTML;		

var percentRemaining = document.getElementsByClassName('percent-remaining')[0].innerHTML

if (percentRemaining == "Sold Out") {}  	//Do nothing to percentRemaining if item is sold out

	else 	{
	percentRemaining = percentRemaining.replace(/[^0-9]/g, ''); // Strip out "left" after percentage
	percentRemaining = percentRemaining + "%";
				};



//	If you want the percent remaining first, leave the next line uncommented

document.title = percentRemaining + " - " + currentItem + " - " + price;

//	If you want the item name first, comment the previous line and uncomment the next

//	document.title = currentItem + " - " + price  + " - " + percentRemaining;   

setTimeout('document.location.reload()',refreshInterval);