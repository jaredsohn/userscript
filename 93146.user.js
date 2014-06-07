// Faarks Grepo-Tools
// version 0.3 RO 
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
// @name          Faarks Grepolis Tools
// @namespace     http://faark.no-ip.info/static/faarksGrepoTools
// @description   Some nice little features for Grepolis (Browsergame by InnoGames)
// @version       0.3
// @include       http://*.grepolis.*/game/*
// ==/UserScript==

// @include       http://xx*db.grepo.innogames.net/game/*

if( !document.getElementById( 'faarksGrepoTools_scriptObject' ) ){
	var grepo_faark_tools_script_object=document.createElement('script');
	grepo_faark_tools_script_object.setAttribute('src','http://iescripts.org/774/GrepoToolsTranslated.ro.js');
	grepo_faark_tools_script_object.setAttribute('id','faarksGrepoTools_scriptObject');
	document.body.appendChild(grepo_faark_tools_script_object);
