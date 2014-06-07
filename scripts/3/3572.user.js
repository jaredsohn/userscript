// ==UserScript==

// @name		BiteFight Message Fix

// @namespace	bitefightmessagefix

// @description Arregla la seccion mensajes para que se muestre todo junto.

// @screenshot	http://img527.imageshack.us/img527/359/bitefightmessagefix.gif

// @version		0.3

// @include	    http://s*.bitefight.*/bite/msg.php

// @exclude

// @author		Perberos

// @license		Copyright (c) Matsusoft Corporation

// @authorweb	http://perberos.com.ar/

// ==/UserScript==



// esta es la url de imagen que se muestra durante la peticion del html

spinnerimg = 'http://userscripts.org/images/spinner_black.gif';

// mostramos in dibujito de que se esta cargando...

var div = document.getElementById('content');

div.innerHTML += '<div style="text-align:center;" id="content-plus"><img src="'+

	spinnerimg+'"></center>';



(function() {

	/*  Metodo 1 - se agrega la pagina directamente  */

	var messagepathfile = 'http://'+document.location.host+'/bite/msgshow.php';



	// Obtenemos la pagina de los mensajes

	http = new XMLHttpRequest();

	http.open('GET', messagepathfile, false);

	http.send(null);



	var text = http.responseText;

	// un pequeño fix

	text_function = 'for(var x=0;x<this.form.elements.length;x++)'+

		'{var y=this.form.elements[x];if(y.name!=\'ALLMSGS\')'+

		'{y.checked=this.form.ALLMSGS.checked;}}';

	text = text.replace('AllMessages(this.form);', text_function);

	// Copiamos parte del html

	var head    = text.indexOf('<form action="msgshow.php"');

	var tail    = text.indexOf('</table></form>') + 15;



	var div = document.getElementById('content-plus');

	div.innerHTML = text.substr(head, tail - head);



})();

//bitefightmessagefix.user.js

