

// BF mod
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
// @name            BFmod
// @description     Some modifications for bitefight
// @include         http://*.bitefight.*/*
// @include         http://*.bite-fight.*/*
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
		var vers = document.evaluate("//a[contains(@href, 'changelog.php')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    if (!city) return;	    
		var l1 = document.createElement("a");
		var l2 = document.createElement("a");
		var l3 = document.createElement("a");
		var l4 = document.createElement("a");
		var l5 = document.createElement("a");
		var l6 = document.createElement("a");
		var l7 = document.createElement("a");
		var l8 = document.createElement("a");
		var cm = document.createElement("a");
		var ru = (city.innerHTML == "Город");
		var vn = (city.innerHTML == "Thành phố");
		var es = (city.innerHTML == "Ciudad");
		var gr = (city.innerHTML == "Πόλη");
		var sl = (city.innerHTML == "Mesto");
		var ba = (city.innerHTML == "Grad");
		var hu = (city.innerHTML == "Város");
		var pl = (city.innerHTML == "Miasto"); 
		var bg = (city.innerHTML == "Град");
		var ae = (city.innerHTML == "المدينة");
		var pt = (city.innerHTML == "Cidade");
		
		cm.href = "allyrecht.php";
		cm.innerHTML = "Klán üzenet";
		
		l1.href = "shop.php?goin=1";
		l1.innerHTML = "Merchant";
		l2.href = "city.php?typ=2&goin=1";
		l2.innerHTML = "Graveyard";
		l3.href = "taverne.php?goin=1";
		l3.innerHTML = "Tavern";
		l4.href = "grotte.php?goin=1";
		l4.innerHTML = "Grotto";
		l5.href = "market.php?goin=1";
		l5.innerHTML = "Market place";
		l6.href = "counterfeiter.php?goin=1";
		l6.innerHTML = "Library";
		l7.href = "church.php?goin=1";
		l7.innerHTML = "Church";
		l8.href = "arena.php?goin=1";
		l8.innerHTML = "House of Pain";
		if  (ru)
		{
		l1.innerHTML = "Торговец";
		l2.innerHTML = "Кладбище";
		l3.innerHTML = "Таверна";
		l4.innerHTML = "Пещера";
		l5.innerHTML = "Рынок";
		l6.innerHTML = "Библиотека";
		l7.innerHTML = "Храм";
		l8.innerHTML = "Дом Боли";
		}
		
		if (vn)
		{
		l1.innerHTML = "Nhà buôn";
		l2.innerHTML = "Nghĩa trang";
		l3.innerHTML = "Quán rượu ";
		l4.innerHTML = "Hang động";
		l5.innerHTML = "Khu chợ";
		l6.innerHTML = "Thư viện";
		}
		
		if (es)
		{
		l1.innerHTML = "Mercader";
		l2.innerHTML = "Cementerio";
		l3.innerHTML = "Taberna";
		l4.innerHTML = "Gruta";
		l5.innerHTML = "Mercado";
		l6.innerHTML = "Biblioteca";
		}
		
		if (gr)
		{
		l1.innerHTML = "Έμπορος";
		l2.innerHTML = "Νεκροταφείο";
		l3.innerHTML = "Ταβέρνα";
		l4.innerHTML = "Κατακόμβες";
		l5.innerHTML = "Αγορά";
		l6.innerHTML = "Βιβλιοθήκη";
		l7.innerHTML = "Εκκλησία"
		}
		
		if (sl)
		{
		l1.innerHTML = "Trgovina";
		l2.innerHTML = "Pokopališče";
		l3.innerHTML = "Krčma";
		l4.innerHTML = "Jama";
		l5.innerHTML = "Market";
		l6.innerHTML = "Knjižnica";
		}
		
		if (ba)
		{
		l1.innerHTML = "Trgovina";
		l2.innerHTML = "Groblje";
		l3.innerHTML = "Taverna";
		l4.innerHTML = "Groto";
		l5.innerHTML = "Market";
		l6.innerHTML = "Knjižnica";
		l7.innerHTML = "Crkva";
		}		
		
                if (hu)
		{
		l1.innerHTML = "Kereskedő";
		l2.innerHTML = "Temető";
		l3.innerHTML = "Fogadó";
		l4.innerHTML = "Barlang";
		l5.innerHTML = "Piac";
		l6.innerHTML = "Könyvtár";
		l7.innerHTML = "Templom";
		l8.innerHTML = "Kínok háza";
		}		
		
		if (pl)
		{
		l1.innerHTML = "Kupiec";
		l2.innerHTML = "Cmentarz";
		l3.innerHTML = "Tawerna";
		l4.innerHTML = "Grota";
		l5.innerHTML = "Targowisko";
		l6.innerHTML = "Biblioteka";
		}
		
		if (bg)
		{
		l1.innerHTML = "Търговец";
		l2.innerHTML = "Гробище";
		l3.innerHTML = "Таверна";
		l4.innerHTML = "Пещера";
		l5.innerHTML = "Пазар";
		l6.innerHTML = "Библиотека";
		l7.innerHTML = "Църква";
		}
		
		if (ae)
		{
		l1.innerHTML = "التاجر";
		l2.innerHTML = "المقبرة";
		l3.innerHTML = "الحانة";
		l4.innerHTML = "الكهف";
		l5.innerHTML = "السوق";
		l6.innerHTML = "المكتبة";
		l7.innerHTML = "المستشفى";
		}

		if (pt)
		{
		l1.innerHTML = "Mercador";
		l2.innerHTML = "Cemitério";
		l3.innerHTML = "Taberna";
		l4.innerHTML = "Gruta";
		l5.innerHTML = "Mercado";
		l6.innerHTML = "Biblioteca";
		l7.innerHTML = "Igreja";
		}

		l1.target = l2.target = l3.target = l4.target = l5.target = l6.target = l7.target = "_top";
		city.parentNode.insertBefore(l1, city);
		city.parentNode.insertBefore(l2, city);
		city.parentNode.insertBefore(l3, city);
		city.parentNode.insertBefore(l4, city);
		city.parentNode.insertBefore(l5, city);
		city.parentNode.insertBefore(l6, city);
		city.parentNode.insertBefore(l7, city);
		if (vers.innerHTML != "v0.41") city.parentNode.insertBefore(l8, city);
		city.parentNode.insertBefore(cm, document.evaluate("//a[contains(@href, 'buddylist.php')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
		city.parentNode.removeChild(city);
	
})();