// mbl.is fermetraverð
// Sept 2009
// Copyright (c) 2009, Tryggvi Hjörvar
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "mbl_price_per_sqm", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          mbl_price_per_sqm
// @namespace     http://www.seidur.is
// @description   Bætir við fermetraverði á fasteignavef mbl.is (Adds price per square meter to the real estate web of mbl.is)
// @include       http://www.mbl.is/mm/fasteignir/fasteign/*
// ==/UserScript==

function addDecimals(nStr)
{
	nStr += '';
	x = nStr.split(',');
	x1 = x[0];
	x2 = x.length > 1 ? ',' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
}


//Get the price from the DOM
priceRow = document.getElementById('estate-verd'); 
price = priceRow.getElementsByTagName('td')[1].innerHTML;
price = price.replace(/[.]/g,''); 

//Get the size 
size = document.getElementById('estate-fermetrar').getElementsByTagName('td')[1].innerHTML;

//Calculate price per square meter
price_per_sqm = Math.round(price/size);
//alert (addDecimals(price_per_sqm));

//Insert into page
newRow = document.createElement('tr');
newTextCell = document.createElement('td');
newNumberCell = document.createElement('td');

newTextCell.className = "fst-label";
newNumberCell.className = "fst-rvalue";

newTextCell.innerHTML = 'Fermetraverð';
newNumberCell.innerHTML = addDecimals(price_per_sqm);

newRow.appendChild(newTextCell);
newRow.appendChild(newNumberCell);

priceRow.parentNode.insertBefore(newRow, priceRow.nextSibling);

