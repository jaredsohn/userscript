// BiteFight meniu (Romanian)
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
// @name            BiteFight meniu (RO)
// @description     Modificari la meniu
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
		var ru = (city.innerHTML == "Oras");
		var vn = (city.innerHTML == "Thành phố");
		l1.href = "shop.php?goin=1";
		l1.innerHTML = "Negustor";
		if  (ru) l1.innerHTML = "Comerciant";
		if (vn) l1.innerHTML = "Nhà buôn";
		l2.href = "city.php?typ=2&goin=1";
		l2.innerHTML = "Cimitir";
		if  (ru) l2.innerHTML = "Cimitir";
		if (vn) l2.innerHTML = "Nghĩa trang";
		l3.href = "taverne.php?goin=1";
		l3.innerHTML = "Taverna";
		if  (ru) l3.innerHTML = "Таverna";
		if (vn) l3.innerHTML = "Quán rượu ";
		l4.href = "grotte.php?goin=1";
		l4.innerHTML = "Caverna";
		if  (ru) l4.innerHTML = "Caverna";
		if (vn) l4.innerHTML = "Hang động";
		l5.href = "market.php?goin=1";
		l5.innerHTML = "Piata";
		if  (ru) l5.innerHTML = "Piata";
		if (vn) l5.innerHTML = "Khu chợ";
		l6.href = "counterfeiter.php?goin=1";
		l6.innerHTML = "Biblioteca";
		if  (ru) l6.innerHTML = "Biblioteca";
		if (vn) l6.innerHTML = "Thư viện";
		l1.target = l2.target = l3.target = l4.target = l5.target = l6.target = "_top";
		city.parentNode.insertBefore(l1, city);
		city.parentNode.insertBefore(l2, city);
		city.parentNode.insertBefore(l3, city);
		city.parentNode.insertBefore(l4, city);
		city.parentNode.insertBefore(l5, city);
		city.parentNode.insertBefore(l6, city);
	        


})();