// ==UserScript==
// @name           xdebugActivator
// @namespace      *
// @include        http://localhost/*
// ==/UserScript==

function setCook(nom,valeur,jours) {
	var expDate = new Date();
	expDate.setTime(expDate.getTime() + (jours * 24 * 3600 * 1000));
	document.cookie = nom + "=" + escape(valeur) + ";expires=" + expDate.toGMTString();
}

function activateDebuging() {
	document.cookie = 'XDEBUG_SESSION=xdebugActivator';
}

function desactivateDebuging() {
	setCook('XDEBUG_SESSION','',-1);
}

GM_registerMenuCommand('Activate debugging',activateDebuging);
GM_registerMenuCommand('Desactivate debugging',desactivateDebuging);