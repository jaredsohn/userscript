// ==UserScript==
// @name           FLN BTadmin caracteres especiales
// @namespace      kebrantador@gmail.com
// @version 	   0.1
// @description    Para escapar las tildes y las ñ de la descripcion.
// @include        http://bittorrent.frozen-layer.com/btadmin/*
// @include        http://bittorrent.frozen-layer.net/btadmin/*
// ==/UserScript==


if(unsafeWindow) w = unsafeWindow;
else w = window;

if(document.getElementById('submit_form')) {
	w.document.getElementById('submit_form').getElementsByTagName('input')[1].onclick = function() 	{
			document.getElementById('info_extra').value = 				
				document.getElementById('info_extra').value
				.replace(/ñ/g,'&ntilde;')
				.replace(/á/g,'&aacute;')
				.replace(/é/g,'&eacute;')
				.replace(/í/g,'&iacute;')
				.replace(/ó/g,'&oacute;')
				.replace(/ú/g,'&uacute;')
				.replace(/¡/g,'')
				.replace(/¿/g,'');
			return true;
		}
}

