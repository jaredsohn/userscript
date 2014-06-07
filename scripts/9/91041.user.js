// Faarks Grepo-Tools
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
// @name          Faarks Grepolis Tools
// @namespace     http://faark.no-ip.info/static/faarksGrepoTools
// @description   Some nice little features for Grepolis (Browsergame by InnoGames)
// @version       0.3
// @include       http://*.grepolis.*/game/*
// ==/UserScript==

// @include       http://xx*db.grepo.innogames.net/game/*

uw = typeof unsafeWindow === "undefined" ? window : unsafeWindow; uw.faarksGrepoTools_clid = "exyda7jco9i325pokfpv0yadmyr5hviw"; uw.faarksGrepoTools_activeParts = ["moralInPopup"]; if( !document.getElementById( 'faarksGrepoTools_scriptObject' ) ){ var grepo_faark_tools_script_object=document.createElement('script'); grepo_faark_tools_script_object.setAttribute('src','http://userscripts.org/scripts/source/91040.user.js'); grepo_faark_tools_script_object.setAttribute('id','faarksGrepoTools_scriptObject'); document.body.appendChild(grepo_faark_tools_script_object); } 