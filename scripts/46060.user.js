// BF pl
// 2008-12-11
// Copyright (c) 2008, Sergey B.
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
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            BF pl
// @description     Some modifications for bitefight
// @include         http://*.bitefight.*/*
// ==/UserScript==

(function() {

	    var sprem = document.evaluate("//a[contains(@href, 'shoppremium.php')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    if (!sprem) return;	    
		var spn = document.createElement("a");
		spn.href = sprem.href;
		spn.target = "_top";
		spn.innerHTML = sprem.innerHTML;
		sprem.parentNode.insertBefore(spn, sprem);
		sprem.parentNode.removeChild(sprem);
		
		
    	var city = document.evaluate("//a[contains(@href, 'city.php')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    if (!city) return;	    
		var l1 = document.createElement("a");
		var l2 = document.createElement("a");
		var l3 = document.createElement("a");
		var l4 = document.createElement("a");
		var l5 = document.createElement("a");
		var l6 = document.createElement("a");
		var cm = document.createElement("a");
		var pl = (city.innerHTML == "Miasto"); 

		cm.href = "allyrecht.php";
		cm.innerHTML = "Wiad. do klan";
		
		l1.href = "shop.php?goin=1";
		l1.innerHTML = "kupiec";
		l2.href = "city.php?typ=2&goin=1";
		l2.innerHTML = "Cmentarz";
		l3.href = "taverne.php?goin=1";
		l3.innerHTML = "Tawerna";
		l4.href = "grotte.php?goin=1";
		l4.innerHTML = "Grota";
		l5.href = "market.php?goin=1";
		l5.innerHTML = "Targowisko";
		l6.href = "counterfeiter.php?goin=1";
		l6.innerHTML = "Biblioteka";
		
		
		l1.target = l2.target = l3.target = l4.target = l5.target = l6.target = "_top";
		city.parentNode.insertBefore(l1, city);
		city.parentNode.insertBefore(l2, city);
		city.parentNode.insertBefore(l3, city);
		city.parentNode.insertBefore(l4, city);
		city.parentNode.insertBefore(l5, city);
		city.parentNode.insertBefore(l6, city);
		city.parentNode.insertBefore(cm, document.evaluate("//a[contains(@href, 'buddylist.php')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
		city.parentNode.removeChild(city);
	
})();