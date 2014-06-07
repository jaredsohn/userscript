// Blip.fm Playlist Hack
// version 0.1 BETA!
// 2008-09-21
// Copyright (c) 2008, Lius Fontenelle Carneiro
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Blip.fm Playlist Hack", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Blip.fm Playlist Hack
// @namespace     http://hypercast.info/
// @description   Script that changes playlist appearance for something more direct and usable by Lius
// @include       http://blip.fm/*/playlist
// ==/UserScript==

// funcao que encontra todas as divs que tenham uma certa propriedade e valor e as esconde
function removeElements(propertyLabel, propertyValue){
	var div;
	var divElements = document.evaluate(
	    "//div[@"+propertyLabel+"='"+propertyValue+"']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	
	for (var i = 0; i < divElements.snapshotLength; i++) {
		div = divElements.snapshotItem(i);
		div.style.display = 'none';
	}	
}

// funcao para adicionar ou modificar um CSS globalmente
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// remove todos os body (username + texto do body do blip) de todos os blips
removeElements("class", "body");
// remove todos as datas de criacao do blip e o 'buy this mp3'
removeElements("class", "date");

// modifica o tamanho de playlistdraghandle para 0px, ja que ele se ajusta ao conteudo da div da direita
addGlobalStyle('div.playlistdraghandle {' +
	'background:transparent url(/_/images/playlistdraghandle.png) no-repeat scroll left top;' +
	'cursor:move;' +
	'float:left;' +
	'height:0px;' +
	'margin:0;' +
	'width:28px;' +
	'}');

// diminui o tamanho da caixa de cada blip
addGlobalStyle('div.tweem div.content {' +
	'background-color: #FFFFFF;' +
	'cursor: pointer;' +
	'margin-left: 8px;' +
	'padding: 1px;' +
	'}');
