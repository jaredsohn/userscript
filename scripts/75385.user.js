// ==UserScript==
// @name BFmod and BiteFight Ad Remover
// @description Only removes premium ads, as yet
// @include http://s*.bitefight.*/*/*
// ==/UserScript==

(function() {

document.getElementsByTagName('img')[0].src = '';
document.getElementsByTagName('img')[0].width = 0;
document.getElementsByTagName('img')[0].height = 0;
document.getElementById('container').style.paddingTop = 0;

	var p = document.getElementsByTagName('p');
	for (var i = 0; i < p.length; i++) {
		if (p[i].innerHTML.indexOf('<a href="premium.php"') != -1) {
			p[i].parentNode.removeChild(p[i]);
		}
	}
	// remueve el gigante logo

})();


//bfmodandbitefightadremover




// BF mod
// 2010-04-27
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

	    var sprem = document.evaluate("//a[contains(@href, 'city/voodoo')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var tm = document.evaluate("//center[contains(@style, 'font-size: 0.7em;')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    if (!sprem) return;	    
		var spn = document.createElement("a");
		spn.href = sprem.href;
		spn.target = "_top";
		spn.innerHTML = sprem.innerHTML;
		sprem.parentNode.insertBefore(spn, sprem);
		sprem.parentNode.removeChild(sprem);
		
		
    	var city = document.evaluate("//a[contains(@href, 'city/index')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
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
		var hu = (city.innerHTML == "Város");
		var vn = (city.innerHTML == "Thành phố");
		var es = (city.innerHTML == "Ciudad");
		var gr = (city.innerHTML == "Πόλη");
		var sl = (city.innerHTML == "Mesto");
		var ba = (city.innerHTML == "Grad");
		var pl = (city.innerHTML == "Miasto"); 
		var bg = (city.innerHTML == "Град");
		var ae = (city.innerHTML == "المدينة");
		var pt = (city.innerHTML == "Cidade");
		var by = (city.innerHTML == "Горад");
		var ua = (city.innerHTML == "Місто");
		var de = (city.innerHTML == "Stadt");
		var fi = (city.innerHTML == "Kaupunki");
		var jp = (city.innerHTML == "街");
		var ee = (city.innerHTML == "Linn");
		var it = (city.innerHTML == "Cittadella");
		var cmn = "Message to clan";
				
		l1.href = "/city/shop";
		l1.innerHTML = "Merchant";
		l2.href = "/city/graveyard";
		l2.innerHTML = "Graveyard";
		l3.href = "/city/taverne";
		l3.innerHTML = "Tavern";
		l4.href = "/city/grotte";
		l4.innerHTML = "Grotto";
		l5.href = "/city/market";
		l5.innerHTML = "Market place";
		l6.href = "/city/counterfeiter";
		l6.innerHTML = "Library";
		l7.href = "/city/church";
		l7.innerHTML = "Church";
		l8.href = "/city/arena";
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
		cmn = "Сообщение клану";
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
		cmn = "Üzenet a klánnak";
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
		l7.innerHTML = "Iglesia";
		l8.innerHTML = "Casa del dolor";
		cmn = "Escribir un e-mail al klan";
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
		l8.innerHTML = "Οίκος της Οδύνης";
		cmn = "Μήνυμα σε Clan";
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
		l8.innerHTML = "Kuća boli";
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
		l8.innerHTML = "Домът на Болката";
		cmn = "Съобщение до съюза"
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
		cmn = "رسالة للعشيرة";
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
		l8.innerHTML = "Casa da Dor";
		cmn = "Mensagem para Clã";
		}

		if  (by)
		{
		l1.innerHTML = "Гандляр";
		l2.innerHTML = "Могільнік";
		l3.innerHTML = "Карчма";
		l4.innerHTML = "Пячора";
		l5.innerHTML = "Рынак";
		l6.innerHTML = "Бібліятэка";
		l7.innerHTML = "Церквa";
		l8.innerHTML = "Хата Болю";
		cmn = "Паведамленне клану";
		}

		if  (ua)
		{
		l1.innerHTML = "Торговець";
		l2.innerHTML = "Кладовище";
		l3.innerHTML = "Таверна";
		l4.innerHTML = "Підземелля";
		l5.innerHTML = "Ринок";
		l6.innerHTML = "Бібліотека";
		l7.innerHTML = "Церквa";
		l8.innerHTML = "Будинок Болі";
		cmn = "Повідомлення клану";
		}

		if  (de)
		{
		l1.innerHTML = "Händler";
		l2.innerHTML = "Friedhof";
		l3.innerHTML = "Taverne";
		l4.innerHTML = "Grotte";
		l5.innerHTML = "Marktplatz";
		l6.innerHTML = "Bibliothek";
		l7.innerHTML = "Kirche";
		l8.innerHTML = "Haus des Schmerzes";
		l8.style.fontSize = "0.6em";
		cmn = "Clanmail schreiben";
		}

		if  (fi)
		{
		l1.innerHTML = "Торговец";
		l2.innerHTML = "Кладбище";
		l3.innerHTML = "Таверна";
		l4.innerHTML = "Пещера";
		l5.innerHTML = "Рынок";
		l6.innerHTML = "Библиотека";
		l7.innerHTML = "Храм";
		l8.innerHTML = "Дом Боли";
		cmn = "Сообщение клану";
		}

		if  (jp)
		{
		l1.innerHTML = "商人";
		l2.innerHTML = "墓場";
		l3.innerHTML = "酒場";
		l4.innerHTML = "洞窟";
		l5.innerHTML = "市場";
		l6.innerHTML = "図書館";
		l7.innerHTML = "教会";
		l8.innerHTML = "痛みの館";
		cmn = "自分の一族にメッセージを送る";
		}

		if  (ee)
		{
		l1.innerHTML = "Kaupmees";
		l2.innerHTML = "Surnuaed";
		l3.innerHTML = "Kõrts";
		l4.innerHTML = "Koobas";
		l5.innerHTML = "Turg";
		l6.innerHTML = "Raamatukogu";
		l7.innerHTML = "Kirik";
		l8.innerHTML = "Valude maja";
		cmn = "Klanni sõnum";
		}

		if (it)
		{
		l1.innerHTML = "Mercante";
		l2.innerHTML = "Cimitero";
		l3.innerHTML = "Taverna";
		l4.innerHTML = "Grotta";
		l5.innerHTML = "Mercato";
		l6.innerHTML = "Biblioteca";
		l7.innerHTML = "Chiesa";
		l8.innerHTML = "Casa del Dolore";
		cmn = "Messaggio al Clan";
		}

		l1.target = l2.target = l3.target = l4.target = l5.target = l6.target = l7.target = l8.target = "_top";
		tm.innerHTML = "[ <a href=\"/msg/clanmail\" style=\"background-image: none; padding-left: 0px; text-align: center; display: inline; margin-left: 0px;\">" + cmn + "</a> ]<br>" + tm.innerHTML;
		city.parentNode.insertBefore(l1, city);
		city.parentNode.insertBefore(l2, city);
		city.parentNode.insertBefore(l3, city);
		city.parentNode.insertBefore(l4, city);
		city.parentNode.insertBefore(l5, city);
		city.parentNode.insertBefore(l6, city);
		city.parentNode.insertBefore(l7, city);
		city.parentNode.insertBefore(l8, city);
		city.parentNode.removeChild(city);
	
})();