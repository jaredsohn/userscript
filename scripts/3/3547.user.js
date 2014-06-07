// "Etsy Currency Converter" user script
// version 0.25 (UK)
// 2008-04-28
// Copyright (c) 2006-2008, Matt Sephton <matt.sephton@gmail.com>
//
// --------------------------------------------------------------------
//
// This is a user script that requires Greasemonkey (Firefox on Mac, PC 
// or Linux), Creammonkey (Safari on Mac) or Turnabout Advanced (IE on
// on PC). After installing one of the above programs, restart your 
// browser and come back here.
// 
// In Firefox or Safari, clicking on the ECC script of your choice will 
// prompt you to "Install User Script", then click "Install" to do so.
// In Internet Explorer, right click on the ECC script of your choice 
// and choose "Install Script".
// 
// To uninstall, follow the instructions given in Greasemonkey, 
// Creammonkey or Turnabout Advanced.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Etsy Currency Converter (UK)
// @namespace     http://www.gingerbeardman.com/ecc/
// @description   Convert Etsy prices into a custom currency
// @include       http://www.etsy.com/*
// @exclude       http://www.etsy.com/add*
// @exclude       http://www.etsy.com/msg*
// @exclude       http://www.etsy.com/edit*
// @exclude       http://www.etsy.com/your*
// @exclude       http://www.etsy.com/alchemy_add*
// @exclude       http://www.etsy.com/view_transaction*
// ==/UserScript==

var myCurrencySymbol = '&pound;';
var myCurrencyRate = 0.50;

function formatCurrency(n) {
	c = n.toFixed(2);
	if (n >= 0 && n < 1 && c[0] != '0') c = '0' + c;
	return myCurrencySymbol + c;
}

Array.prototype.removeDuplicates = function() {
	var reduced = new Array();
	this.sort();
	for (i=0; i<this.length; i++) {
		if (this[i] == this[i+1]) { continue }
		reduced[reduced.length] = this[i];
	}
	return reduced;
}

txtBody = document.getElementsByTagName('body').item(0).innerHTML;
txtBody = txtBody.replace(/\$/g, '');
txtBody = txtBody.replace(/[^\d]0\.00/g, ' FREE');
txtBody = txtBody.replace(/icon_currency_usd\.gif" alt="usd" height="5" width="14"/g, '1x1.gif" height="0" width="0"');

anotherBody = txtBody.replace(/(\d*\.\d\d)(?![\w|\.])/g, function (str, p1, offset, s) { return formatCurrency(p1 * myCurrencyRate); });

document.getElementsByTagName('body').item(0).innerHTML = anotherBody;
