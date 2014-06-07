// ==UserScript==
// @name          Hack Host GamerzHost
// @namespace  http://109.169.60.156/Servers/115/ 
// @description   Hack para iniciar, apagar, reiniciar server estando expirado
// @require        http://www.sharkale.com.ar/bbcoder/script/jquery.js?v=32.0
// @include        http://*109.169.60.156/Servers/115/*
// ==/UserScript==


function CrearBarraBBC(){

		var nuevaHTML = '';
		
		nuevaHTML += '<input type="submit" name="Start" value="Iniciar Servidor"/>';
		nuevaHTML += '</div>';
		return nuevaHTML;
}