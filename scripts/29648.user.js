// Torpedo OI Confirmção com ENTER
// version 0.1
// 2008-07-05
// Copyright (c) 2008, Adriano Gripp
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
// select "Torpedo OI Confirmção com ENTER", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Torpedo OI Confirmção com ENTER
// @description    Script para resolver problema com ENTER na tela de confirmação do envio de Torpedo da OI.
// @include        http://torpedo.oiloja.com.br/torpedo2/EnviaSMSController?acao=envioTorpedoPasso1
// ==/UserScript==

document.addEventListener('load', function () {

function trataENTER (event) {
	if (event.which == 13) {
		event.preventDefault ();
		location.href = "javascript:void(validaForm())";
	}
}

captcha = document.getElementById ('textfield');
captcha.addEventListener ('keydown', trataENTER, true);

}, true);