// ==UserScript==
// @name           Crear Review de Pelicula Teisespor
// @namespace      http://www.mcodina.com.ar
// @description    Ayuda a crear un review de la pelicula
// @include        http://teisespor.activo-foro.com/post.forum?mode=newtopic&f=6
// ==/UserScript==
function insertarTexto() {
	var txt = document.getElementsByName('message');
	var titulo = document.getElementsByName('subject');
	var btn = document.getElementById('botonReview');
	var capAdd = document.getElementById('capaReview');
	var anterior = txt[0].value;
	var titAnt = titulo[0].value;
	var boton2 = document.createElement('input');
	boton2.type = "button";
	boton2.value = "Quitar Review";
	boton2.id = "botonQuitarReview";
	boton2.addEventListener('click', function(){txt[0].value = anterior; titulo[0].value = titAnt;}, false);
	if(!document.getElementById('botonQuitarReview')){
		capa.appendChild(boton2);
	}
	var nuevo = "[img]IMAGEN[/img] \n\r[b]Nombre: [/b] \n[b]Nombre Original: [/b] \n[b]Género: [/b] \n[b]Director: [/b] \n[b]Actores: [/b] \n[b]Año: [/b] \n[b]Link IMDB: [/b] \n\r[b]Sinopsis[/b]\n\r\n\r[b]Opinión Personal[/b]";
	txt[0].value = nuevo + "\n\r " + anterior;
	titulo[0].value = "[Review] " + titAnt;
}

var texto = document.getElementsByName('message');
var boton = document.createElement('input');
boton.type = "button";
boton.value = "Es un Review";
boton.id = "botonReview";
boton.addEventListener('click', insertarTexto, false);
var capa = document.createElement('div');
capa.id = "capaReview";
capa.style.padding = "5px";
capa.style.margin = "5px";
capa.style.border = "1px solid #CCC";
capa.appendChild(boton);
texto[0].parentNode.insertBefore(capa, texto[0]);