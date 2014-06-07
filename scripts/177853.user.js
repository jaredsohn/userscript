// coding: utf-8
// ==UserScript==
//
// @name	Ikariam Tools
// @version	1.4.1
// @date	14.12.2013
// @author	Cherry / germano
// @description	Kleine Änderungen damit bei Ikariamm und bei Verwendung von Adblock es zu keiner Grafischen Änderung kommt. Werbelink und neues Ambrosiafuture entfernt.
// @include    	http://s*.ikariam.gameforge.com/*
// @exclude	http://support.*.ikariam.gameforge.com/*
// @exclude   	http://board.*.ikariam.gameforge.com/*
// @grant      	GM_addStyle
//
// ==/UserScript==
//
// Version:
//		v1.4.1
//		- Bugfix
//		v1.4
//		- Popup neue Ambro Feature
//		v1.3
//		- neue Ambro Feature thx germano
//		v1.2
//		- Seitenleiste Rohstoffe kaufen verschoben
//		v1.1
//		- Optimierung Code Darstellung
//		v1.0
//		- start Script

// Werbelink entfernt
      GM_addStyle('#GF_toolbar #mmoNewsticker { display: none; }');

// Eventanzeige entfernt
      GM_addStyle('#eventDiv, #genericPopup {display: none;}');

// Seitenleiste Rohstoffe kaufen verschoben
     GM_addStyle('#js_viewCityMenu ul.menu_slots li[onclick*="view=premiumResourceShop"] { position:absolute; top:-1000px; left:-1000px; }');
      
// Darstellungsproblem durch AddBlock korrigiert      
     GM_addStyle('#header #cityNav { top: 25px;}');

// entfernt das nervige neue Ambro Feature
     GM_addStyle('#confirmResourcePremiumBuy, #confirmResourcePremiumBuy_c { display: none;}');

// entfernt das nervige neue Ambro Feature im Shop
     GM_addStyle('#premiumOffers tr.resourceShop{ display: none;}');