// ==UserScript==
// @name           	GCmapCacheTypeFilter
// @description     Enables the personalization every time you open the map on geocaching.com
// @namespace      	Sobik
// @copyright       Sobik <sobikovi@gmail.com>
// @license         Creative Commons Attribution-NonCommercial-ShareAlike 3.0, http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version		   	3.0
// @include        	http://www.geocaching.com/map/*
// ==/UserScript==
//
// Attribution and Thanks:	
//					Idea and parts of this script are from 'GCMapFilter' written by Daniel Fischer <dafi@da-fi.de>
// Changelog:		2.0 Přidána možnost skrýt boční panel
//                      3.0 Update funkčnosti pro novou mapu
//
//======================================================================================================================================

(function() {
var chkBoxFinds;
var chkBoxHides;
var chkBoxTraditional;
var chkBoxAPE;
var chkBoxLetterbox;
var chkBoxMulti;
var chkBoxEvent;
var chkBoxMegaEvent;
var chkBoxCITO;
var chkBoxGPSAdventure;
var chkBoxVirtual;
var chkBoxWebCam;
var chkBoxEarth;
var chkBoxMystery;
var chkBoxWherigo;
var chkBoxSideBar;

chkBoxFinds = document.getElementsByClassName('ct_mf');
chkBoxHides = document.getElementsByClassName('ct_mo');
chkBoxTraditional = document.getElementsByClassName('ct2');
chkBoxAPE = document.getElementsByClassName('ct9');
chkBoxLetterbox = document.getElementsByClassName('ct5');
chkBoxMulti = document.getElementsByClassName('ct3');
chkBoxEvent = document.getElementsByClassName('ct6');
chkBoxMegaEvent = document.getElementsByClassName('ct453');
chkBoxCITO = document.getElementsByClassName('ct13');
chkBoxGPSAdventure = document.getElementsByClassName('ct1304');
chkBoxVirtual = document.getElementsByClassName('ct4');
chkBoxWebCam = document.getElementsByClassName('ct11');
chkBoxEarth = document.getElementsByClassName('ct137');
chkBoxMystery = document.getElementsByClassName('ct8');
chkBoxWherigo = document.getElementsByClassName('ct1858');
chkBoxSideBar = document.getElementsByClassName('ToggleSidebar');

window.addEventListener("load", function(e) {
	click(chkBoxFinds[0]);
	click(chkBoxHides[0]);
//	click(chkBoxTraditional[0]);
	click(chkBoxAPE[0]);
//	click(chkBoxLetterbox[0]);
	click(chkBoxMulti[0]);
	click(chkBoxEvent[0]);
	click(chkBoxMegaEvent[0]);
	click(chkBoxCITO[0]);
	click(chkBoxGPSAdventure[0]);
//	click(chkBoxVirtual[0]);
//	click(chkBoxWebCam[0]);
//	click(chkBoxEarth[0]);
	click(chkBoxMystery[0]);
	click(chkBoxWherigo[0]);
//	click(chkBoxSideBar[0]);
	
		
}, false);	

function click(elm){
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    elm.dispatchEvent(evt);
}

})();