// ==UserScript==
// @name           Esconder menu
// @namespace      EsconderMenu
// @description    Sirve para cuando quieras pasar una captura de pantalla: agrega un link que esconde tus notificaciones, el menu de usuario y todo el menu de usuario en general. Aparece solo si estas logueado.
// @include        http://*taringa.net/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @version        0.1
// @copyright      Copyright (c) 2011, Shout
// @creator        Martin Sn
// ==/UserScript==
/////////////////////////
$(document).ready(function(){
	if(document.cookie.indexOf('ImMachoMan') == -1){
		$('#nav > div.wrapper > ul').append('<li><a onclick="$(\'div#header > div.wrapper > div.navbar\').toggle();return false;">Mostrar / Ocultar menu</a></li>');
	}else{
		$('#menu > ul.menuTabs').find('li.clearBoth').remove();
		$('<li class="tabbed floatR"><a onclick="$(\'#menu > .opciones_usuario > .userInfoLogin\').toggle();return false;">Mostrar / Ocultar menu</a></li><li class="clearBoth" />').appendTo('#menu > ul.menuTabs');
	}
});