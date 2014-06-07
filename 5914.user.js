/*
 *  This file is part of RenfeScript
 *  Copyright (C) 2006 Unbrained (josuicida@gmail.com)
 *  Source code at http://userscripts.org/scripts/show/5914 
 *
 *  This script is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU General Public
 *  License as published by the Free Software Foundation; either
 *  version 2 of the License, or (at your option) any later version.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  General Public License for more details.
 *  http://www.gnu.org/copyleft/gpl.html
 */

// ==UserScript==
// @name           RenfeScript
// @author         Unbrained
// @description    Pone la fecha actual y guarda origen y destino en la pagina de Renfe.es
// @include        http://www.renfe.es/
// ==/UserScript==

var nodoOrigen=document.getElementsByName('o')[0];
var origen1 = GM_getValue('origen', '');
if (origen1!='') {
	var origen=document.evaluate("//option[text()='"+origen1+" \n                  ']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	nodoOrigen.selectedIndex=origen.index;
}

var nodoDestino=document.getElementsByName('d')[0];
var destino1 = GM_getValue('destino', '');
if (destino1!='') {
	var destino=document.evaluate("//option[text()='"+destino1+" \n                  ']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	nodoDestino.selectedIndex=destino.index;
}

var fecha = new Date();
document.getElementsByName('MF')[0].selectedIndex=fecha.getMonth()+1;
document.getElementsByName('DF')[0].selectedIndex=fecha.getDate();

function pedirOrigen() {
	GM_setValue('origen', prompt('Introduce ciudad de origen', ''));
	var nodoOrigen=document.getElementsByName('o')[0];
	var origen1 = GM_getValue('origen', '');
	if (origen1!='') {
		var origen=document.evaluate("//option[text()='"+origen1+" \n                  ']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		nodoOrigen.selectedIndex=origen.index;
	}
}

function pedirDestino() {
	GM_setValue('destino', prompt('Introduce ciudad de destino', ''));
	var nodoDestino=document.getElementsByName('d')[0];
	var destino1 = GM_getValue('destino', '');
	if (destino1!='') {
		var destino=document.evaluate("//option[text()='"+destino1+" \n                  ']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		nodoDestino.selectedIndex=destino.index;
	}
}

GM_registerMenuCommand('Ciudad origen', pedirOrigen);
GM_registerMenuCommand('Ciudad destino', pedirDestino);
