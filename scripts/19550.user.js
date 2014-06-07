// Theskut script
// version 0.1 BETA!
// 2008-01-08
// Copyright (c) 2008, Teagace
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Theskut", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           	Theskut
// @namespace      http://alkimidia.plugin.com.br/thesco/theskut.user.js
// @description    	Skin para Orkut baseado em Blackut By Jacques
// @include        	http://www.orkut.com/*
// @author	Teagace
// @dedicated	Nice


// ==/UserScript==

/* All credits go to Jacques for developing blackut*/


function toTheskut(){


	/*
	 * Inserindo novo CSS..
	 */

	var head=document.getElementsByTagName('head').item(0);
	link=document.createElement('link');
	link.href='http://www.alkimidia.com.br/thesco/castroskin001.css';
	link.type='text/css';
	link.rel='stylesheet';
	link.defer=true;
	head.appendChild(link);

	/*
	 * Removendo o Universal search que destorce tudo..
	 */

	/*
	* document.getElementsByTagName("td")[1].width="134";
	* document.forms[0].innerHTML="";
	*/

}

toTheskut();