// ==UserScript==
//
// @name	 	 withoutfable
// @version  		 1.6
// @author  		 germano
// @description		 entfernt die Texte in Werft, Kaserne, freien Bauplatz bei den Gebäuden und Gebäudebeschreibung. Weiterhin wird das nene PvP Fenster beim einloggen entfernt
// @include    		 http://s*.ikariam.gameforge.com/*
// @exclude	   	 http://support.*.ikariam.gameforge.com/*
// @exclude   		 http://board.*.ikariam.gameforge.com/*
// @grant      		 GM_addStyle
//
// ==/UserScript==
      

GM_addStyle('#js_barracksUnitDescription1,#js_barracksUnitDescription2,#js_barracksUnitDescription3,#js_barracksUnitDescription4,#js_barracksUnitDescription5,#js_barracksUnitDescription6,#js_barracksUnitDescription7,#js_barracksUnitDescription8,#js_barracksUnitDescription14,#js_barracksUnitDescription9,#js_barracksUnitDescription10,#js_barracksUnitDescription11,#js_barracksUnitDescription12,#js_barracksUnitDescription13{ display: none;}');

GM_addStyle('#redVsBlueInfo, #redVsBlueInfo_c {visibility: hidden !important;}');	

GM_addStyle('ul#buildings div.buildinginfo > p {display: none;}');	

GM_addStyle('ul#buildings div.buildinginfo img {transform: scale(0.7);}');

GM_addStyle('div.buildingDescription > p:nth-child(2) {display: none;}');	
