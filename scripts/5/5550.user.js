/*
 *  This file is part of OGame++
 *  Copyright (C) 2006 Unbrained (josuicida@gmail.com)
 *  Source code at http://userscripts.org/scripts/show/5550 
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
// @name			oGame++
// @author			Unbrained
// @description			Mejora OGame notablemente :P
// @include			http://*/game/*
// @include			http://drago-sim.com/*
// ==/UserScript==


// Se esta corrigiendo este script para que sea legal

/********************************************************/
/*********+-------------------------------+**************/
/*********|  Default configuration values |**************/
/*********+-------------------------------+**************/
/********************************************************/

var defScriptConf = [
		'version', '0.9.971',
		'autoUpdate', true,
	].join(':');

function fill(string) {
	while (string.length<6) string += '0';
	return parseInt(string);
}

function checkUpdates(warn) {
	GM_xmlhttpRequest({
		method:"POST",
		url:"http://userscripts.org/scripts/show/5550",
		headers:{
			"User-Agent" : navigator.userAgent,
			"Accept" : "text/xml",
			"Content-type" : 'application/x-www-form-urlencoded'
		},
		onload:function(details) {
			try {
				var newVer = details.responseText.match(/Version (\d+)\.(\d+)\.(\d+)/);
				var Current = getDefScriptConf('version').match(/(\d+)\.(\d+)\.(\d+)/);
				if (fill(newVer[1])>fill(Current[1]) || (fill(newVer[1])==fill(Current[1])&&fill(newVer[2])>fill(Current[2])) || (fill(newVer[1])==fill(Current[1]) && fill(newVer[2])==fill(Current[2]) && fill(newVer[3])>fill(Current[3]))) {
					if (confirm('Hay una versión nueva!! Quieres instalarla?')) {
						win = window.open('http://userscripts.org/scripts/source/5550.user.js', 'Actualizar script');
						if (!win) alert('Firefox está bloqueando las ventanas emergentes, habilita las ventanas emergentes para TU SERVIDOR concreto (el titulo de esta ventana de aviso) o bien dale a mostrar la pagina en el icono de bloqueo')
					}
				}
				else if (warn) alert('Tu versión es la más reciente');
			} catch (e) {}
		},
		data: ''
	});
}


unsafeWindow.checkUpdates = checkUpdates;


/*********************************************************/
/*********+-------------------------------+***************/
/*********| Variable management functions |***************/
/*********+-------------------------------+***************/
/*********************************************************/


/******* Generalized conf functions section ***************/

function getConf(nombre, confName, defConfName, separator) {
	var conf = GM_getValue(confName,defConfName).split(separator);
	for (var i=0; i<conf.length; i+=2) {
		if (conf[i]==nombre) {
			if (conf[i+1]=='false')
				return false;
			return conf[i+1];
		}
	}
	conf = defConfName.split(separator);
	for (var i=0; i<conf.length; i+=2) {
		if (conf[i]==nombre) {
			if (conf[i+1]=='false')
				return false;
			return conf[i+1];
		}
	}
	return false;
}

function setConf(nombre, valor, confName, defConfName, separator) {
	var confStr = GM_getValue(confName, defConfName);
	var conf = confStr.split(separator);
	var valorDef = (String(getDefConf(nombre, defConfName, separator))==String(valor));
//		GM_log(getDefConf(nombre, defConfName, separator)+' -> '+valor);
		if (conf.length<=1) {
			if (!valorDef) GM_setValue(confName, [nombre, valor].join(separator))
			return;
		}
		for (var i=0; i<conf.length; i+=2) {
			if (conf[i]==nombre) {
				if (valorDef) conf.splice(i, 2);
				else conf[i+1]=valor;
				GM_setValue(confName, conf.join(separator));
				return;
			}
		}
		if (!valorDef) GM_setValue(confName, [confStr,nombre,valor].join(separator));
}

unsafeWindow.getConf=getConf;
unsafeWindow.setConf=setConf;
function getDefScriptConf(nom) {
	return getConf(nom, '', defScriptConf, ':');
}

/*********** Specific conf functions *********************/

function getScriptConf(nombre) {
	return getConf(nombre, "scriptConf", defScriptConf, ':');
}

function setScriptConf(nombre, valor) {
	setConf(nombre, valor, "scriptConf", defScriptConf, ':');
}






/*********************************************************/
/*********+-------------------------------+***************/
/*********|         leftmenu.php          |***************/
/*********+-------------------------------+***************/
/*********************************************************/

if (location.pathname=='/game/leftmenu.php') {
	if (getScriptConf('autoUpdate')) checkUpdates();
}
