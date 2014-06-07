
// Omelete: Esconder comentários
// version 0.1 BETA!
// 2010-05-18
// Copyleft 2010, Guilherme Mendes
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Omelete - Esconder comentários
// @namespace     http://secondway.com.br
// @description   Esconde os comentários do site para felicidade do Erico Borgo
// @include       http://www.omelete.com.br/*
// @require        http://www.omelete.com.br/static/js/jquery-1.3.2.min.js
// ==/UserScript==

$(document).ready(function() {
	$('div.comentario').hide();
	$('.hdcomentarios h3').append(' - <a style="color:#FFF;" href="javascript:void($(\'div.comentario\').show());">Mostrar</a>');
});