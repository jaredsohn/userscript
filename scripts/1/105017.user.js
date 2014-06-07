// ==UserScript==
// @name           BBCodes para Taringa
// @namespace      SharkaleBBCODER
// @description    BBCoder para T! y P! (Crear post, comentarios, menÃº) ATENCION: Si te molesta ser miembro de mi comunidad no instales el script!
// @include        http://*taringa.net/*
// @include        http://*poringa.net/*
// @include        http://plugin.tinypic.com/*
// @exclude        http://br.taringa.com/*
// @require        http://www.sharkale.com.ar/bbcoder/script/jquery.js?v=32.0
// @require        http://www.sharkale.com.ar/bbcoder/script/plugins.js?v=32.0
// @version        32.0
// @copyright      Copyright (c) 2010, Sharkale
// @creator        Sharkale (Alejandro Barreiro) Â® 2010
// ==/UserScript==
function CrearBarraBBC(){
		GM_addStyle(".markItUpHeader {padding:5px 0;}.msg_add_comment {margin-top:3px;}");
		var nuevaHTML = '<div id="Sharkale_TaringaBBC" style="display:block;">\
		<a href="" onclick="insertarBBC(\'[b][color=orange]]\', \'[/color][/b]\');return false;"><img src="'+URL+'negrita.png" alt="B" title="Letra Negrita" border="0"></a>\
		<a href="" onclick="insertarBBC(\'[i]\', \'[/i]\');return false;"><img src="'+URL+'cursiva.png" alt="I" title="Letra Cursiva" border="0"></a>\
		<a href="" onclick="insertarBBC(\'[u]\', \'[/u]\');return false;"><img src="'+URL+'subrayado.png" alt="U" title="Letra Subrayada" border="0"></a>\