// ==UserScript==
// @name			Ministerio de Defensa de asq
// @namespace		asdwrqvq
// @description		Ordenes de Batallas del Ministerio de Defensa de Bolivia
// @include			http://www.erepublik.com/*
// @version			0.4.9.3
// @updateURL		http://userscripts.org/scripts/show/172908.meta.js
// @downloadURL		http://userscripts.org/scripts/show/172908.user.js
// ==/UserScript==



function header() {
	var imageHeader = 'http://img12.imageshack.us/img12/7770/ur4h.jpg';;
	$('#mon_orders').append('<img src="'+ imageHeader + '" style="float: none; margin-top:0px; margin-bottom:-3px"/>');