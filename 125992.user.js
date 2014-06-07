// ==UserScript==
// @name           	GCmapFilter
// @description     Enables the personalization every time you open the map on geocaching.com
// @namespace      	da-fi.de
// @copyright       Daniel Fischer <dafi@da-fi.de>
// @license         Creative Commons Attribution-NonCommercial-ShareAlike 3.0, http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version		   	1.1
// @include        	http://www.geocaching.com/map/*
// ==/UserScript==
//
// Attribution and Thanks:	
//					Idea and parts of this script are from 'GC-PersonalMap' written by JR849 - http://jr849.de/greasemonkey-skripte/
//
// Changelog:	1.1		- adjusted to new geocaching maps URL	
//
//				1.0		- 
//
//
//======================================================================================================================================

(function() {
var chkBoxFinds;
var chkBoxHides;

chkBoxFinds = document.getElementsByClassName('ct_mf');
chkBoxHides = document.getElementsByClassName('ct_mo');
//chkBoxBlue = document.getElementById('chkLegendBlue').getElementsByClassName('a_cat_displayed');
window.addEventListener("load", function(e) {
	click(chkBoxFinds[0]);
	click(chkBoxHides[0]);
	//click(chkBoxBlue[0]);
}, false);	

function click(elm){
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    elm.dispatchEvent(evt);
}

})();