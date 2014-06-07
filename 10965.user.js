/*
 *  This file is part of Auto-caza de humanos para Bitefight
 *  Copyright (C) 2007 Unbrained (josuicida@gmail.com)
 *  Source code http://userscripts.org/scripts/show/10965
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
// @author		Unbrained
// @name		Auto-caza de humanos para Bitefight
// @include		http://s*.bitefight.*/bite/robbery.php
// ==/UserScript==

function locate(xpath, xpres) {
	return document.evaluate(xpath, document, null, xpres, null);
}

function locateFirst(xpath) {
	return locate(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
}

function locateSnapshot(xpath) {
	return locate(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
}

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
	var confStr = GM_getValue(confName, '');
	if (confStr=='') {
		GM_setValue(confName, [nombre, valor].join(separator));
		return;
	}
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

function getDefConf(nom, defConfNam, sep) {
	return getConf(nom, '', defConfNam, sep);
}

function getScriptConf(nombre) {
	return getConf(nombre, "scriptConf_"+location.hostname, defScriptConf, ':');
}

function setScriptConf(nombre, valor) {
	setConf(nombre, valor, "scriptConf_"+location.hostname, defScriptConf, ':');
}

unsafeWindow.getConf=getConf;
unsafeWindow.setConf=setConf;
unsafeWindow.getScriptConf=getScriptConf;
unsafeWindow.setScriptConf=setScriptConf;


// Cuerpo del script



var defScriptConf = [
	'periodo', 0,
	'activado', false,
	'restante', '00;00;00',
	'select', ''
	].join(':');

var formulario = locateFirst("//div[@id='content']/div/form");

if (formulario) { // principal
	var periodo = formulario.getElementsByTagName('select')[0];
	var restante = formulario.getElementsByTagName('div')[1];
	if (getScriptConf('activado')) {
		if (!periodo) {
			setScriptConf('activado', false);
			return;
		}
		periodo.selectedIndex = getScriptConf('periodo');
		setScriptConf('restante', restante.innerHTML.match(/(\d\d:\d\d:\d\d)/)[0].replace(/:/g, ';'));
		formulario.submit();
	}
	else {
		setScriptConf('select', escape(restante.getElementsByTagName('select')[0].innerHTML));
		setScriptConf('restante', restante.innerHTML.match(/(\d\d:\d\d:\d\d)/)[0].replace(/:/g, ';'));
		formulario.setAttribute('onsubmit', setScriptConf('periodo', periodo.selectedIndex));
	}
}
else {
	var tr = locateFirst("//div[@id='content']/table/tbody/tr[2]");
	var check = tr.cloneNode(true);
	check.firstChild.innerHTML = "<input type='checkbox' "+(getScriptConf('activado')?"checked='true'":'')
		+ " onclick='setScriptConf(\"activado\", this.checked)'"
		+ " />&nbsp;&nbsp;Caza automática <select>"+unescape(getScriptConf('select'))+"</select>";
	check.firstChild.lastChild.selectedIndex = getScriptConf('periodo');
	check.firstChild.lastChild.setAttribute('onchange', "setScriptConf('periodo', this.selectedIndex)");
	tr.nextSibling.lastChild.innerHTML += " (LLevas " + getScriptConf('restante').replace(/;/g, ':') + ")";

	tr.parentNode.insertBefore(check, tr.parentNode.lastChild);
}

