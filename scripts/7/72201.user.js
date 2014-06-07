// Grexs Grepo Town-Reservation-Script
// version 0.3 Beta
// Copyright (c) 2010, Dirk "Faark" Fieblinger
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Grexs Grepo Town-Reservation-Script
// @namespace     http://www.grepotools.de/faark/grexGrepoTownReservation
// @description   Adds Ingame-Elements for the Grepotools.de-Town-Reservation, a Tool for Grepolis (Browsergame by InnoGames)
// @version       0.1
// @include       http://deX.grepolis.*/game/*
// ==/UserScript==


var ggtr_win = typeof unsafeWindow === "undefined" ? window : unsafeWindow;
if( typeof ggtr_win.grexGrepoTownReservation_accounts === "undefined" )
	ggtr_win.grexGrepoTownReservation_accounts = [];
ggtr_win.grexGrepoTownReservation_accounts.push({
	resid: 0,
	respass: "",
	useOnAlliance: 0,
});

if( !document.getElementById( 'grexGrepoTownReservation_scriptObject' ) ){
	var grexGrepoTownReservation_script_object=document.createElement('script');
	grexGrepoTownReservation_script_object.setAttribute('src','http://www.grepotools.de/faark/grexGrepoTownReservation/grexGrepoTownReservation.js');
	grexGrepoTownReservation_script_object.setAttribute('id','grexGrepoTownReservation');
	document.body.appendChild(grexGrepoTownReservation_script_object);
}