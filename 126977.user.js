// ==UserScript==
// @name           	Hide Side Bar
// @description     Hide Side Bar on geocaching.com maps
// @namespace      	Sobik
// @copyright       Sobik <sobikovi@gmail.com>
// @license         Creative Commons Attribution-NonCommercial-ShareAlike 3.0, http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version		   	1.5
// @include        	http://www.geocaching.com/map/*
// ==/UserScript==
//
// Attribution and Thanks:	
//					Idea and parts of this script are from 'GCMapFilter' written by Daniel Fischer <dafi@da-fi.de>
// Changelog:		1.5 Update funkčnosti na nových stránkách 
//
//
//======================================================================================================================================

(function() {
var chkBoxSideBar;

chkBoxSideBar = document.getElementsByClassName('ToggleSidebar');

window.addEventListener("load", function(e) {
	click(chkBoxSideBar[0]);		
}, false);	

function click(elm){
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    elm.dispatchEvent(evt);
}

})();