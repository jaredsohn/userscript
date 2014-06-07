// ==UserScript==
// @name           Agregar Firma a comentario
// @description    Agregar una firma a los comentarios de Gratisjuegos.org
// @include        *gratisjuegos.org/*
// @include        *gratismusica.org/*
// @include        *gratispeliculas.org/*
// @include        *gratisprogramas.org/*
// @exclude        *gratis*.org/wp*
// ==/UserScript==

var Comentario=document.getElementById('comment');
if(Comentario){
var Firma = document.createElement('textarea');
Firma.cols=62
Firma.value=GM_getValue("lafirma","Introduce tu firma aquí, puedes usar etiquetas como <strong> (negrita), o <em> (cursivas)");
var Comentario=document.getElementById('comment');
Comentario.parentNode.insertBefore(Firma,Comentario.nextSibling);





 
function AgregarFirma(){
	GM_setValue("lafirma",Firma.value);
	if(!Comentario.value||Comentario.value=="Introduce tu firma aquí, puedes usar etiquetas como <strong> (negrita), o <em> (cursivas)"){
		return
	}
	else{
		Comentario.value=Comentario.value+"\n"+Firma.value
	}
}





var botonFirma = document.createElement('button');
botonFirma.appendChild(document.createTextNode('Enviar comentario + Firma'));
botonFirma.addEventListener('click',AgregarFirma,true);
var botonSubmit = document.getElementById('submit');
botonSubmit.parentNode.insertBefore(botonFirma, botonSubmit.nextSibling);



}



