// ==UserScript==
//
// @name	 	     New Ambro Feature Blocker
// @version  		 1.21
// @author  		 germano
// @description		 Blockt das lästige Fenster des neuen Ambro Feature
// @include    		 http://s*.ikariam.gameforge.com/*
// @exclude	   	     http://support.*.ikariam.gameforge.com/*
// @exclude   		 http://board.*.ikariam.gameforge.com/*
// @grant      		 GM_addStyle
//
// ==/UserScript==

// entfernt das nervige neue Ambro Feature
         GM_addStyle('#confirmResourcePremiumBuy, #confirmResourcePremiumBuy_c, #premiumResourceShop, #premiumResourceShop_c { display: none;}');


// entfernt das nervige neue Ambro Feature im Shop
         GM_addStyle('#premiumOffers tr.resourceShop{ display: none;}');

	   
// Seitenleiste Rohstoffe kaufen verschoben
     GM_addStyle('#js_viewCityMenu ul.menu_slots li[onclick*="view=premiumResourceShop"] { position:absolute; top:-1000px; left:-1000px;}');

//  entfernt Control Center	 
//	 GM_addStyle('#js_toggleControlsOn, #mapControls, div.footerleft, div.footerright {display: none;}');

// entfernt Wein-aus Fenster
     GM_addStyle('#wineOutTable { display: none;}');
	 
// entfernt Ambro Kauf Button im Premiumhändler
     GM_addStyle('div.resourceShopButton { display: none;}');
	 
// entfernt das Popup, wenn ein Gebäude im Bau ist und man ein weiteres ausbauen möchte (Abfrage ob das andere Gebäude direkt fertig gestellt werden soll)	 
	 GM_addStyle('#individualOfferBuildingSpeedup {display: none;}');	

//entfernt die Barbaren einbürgern aus den Rathaus, Werft und Kaserne
	 GM_addStyle('li.order {visibility: hidden !important;}');
	 GM_addStyle('#premium_btn {display: none;}');
	 
//entfernt Ambrofunktion aus Lager, Halde, Steinbruch etc.	 
	 GM_addStyle('div.premiumOfferBox.highlightbox.twoCols {display: none;}');

//entfernt Ambrofunktion aus der Erfinderwerkstatt 
	 GM_addStyle('div.actionButton:nth-child(3) {display: none;}');

//entfernt Ambrofunktion aus der Erfinderwerkstatt 
	 GM_addStyle('#multiPopup {display: none;}');