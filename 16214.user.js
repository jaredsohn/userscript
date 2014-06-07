// ==UserScript==
// @name         	fullimagesonemanga
// @namespace      Chulian
// @description    RECOMENDABLE  ACTIVAR GREASEMONKEY SOLO CUANDO ESTEN EN LA DIRECCION DEL MANGA A LEER  v1.0 esconde lo innecesario  v1.1 cambia de pagina con las letras m y n  v1.2 cambia de paginas con las teclas 1 y 0  v1.3   comprime lo que esconde+ carga en un iframe escondido la imagen siguiente    v1.4 cambia de pagina con las flechas derecha e izquierda v1.5 corregido para ecchi
// @include        http://www.onemanga.com/*/*/
// @exclude    http://www.onemanga.com/
// @exclude    http://www.onemanga.com/directory/*
// ==/UserScript==

document.body.bgcolor="000000"

divs = document.getElementsByTagName("div")
h1s = document.getElementsByTagName("h1")
h1s[0].innerHTML="";//escondo el titulo del manga
i=0;
while(i<divs.length){//recorro los divs		
	clas=divs[i].getAttribute("class");
	if(clas!="one-page"){//escondo los divs que no importan
		divs[i].style.display="none";
	}
	i++;	
}	
//divs q importan:
document.getElementById("wrap2").style.display="";
document.getElementById("content").style.display="";
document.getElementById("content2").style.display="";

/*
si undo una tecla.......
*/
var botones=document.getElementsByTagName("input")
var botAtras=botones[2];
var botAdelante=botones[3];
var f = function(e) { //funcion que detecta la presion de un boton     	
	if (e.charCode == 109 | e.charCode == 48 | e.keyCode==39) {//m | 0 | flecha derecha = next 
		botAdelante.click();		
	}
	if (e.charCode == 110 | e.charCode == 49 | e.keyCode==37) {//n | 1  | flecha izquierda = previus
		botAtras.click();
	}	  	  
};
document.addEventListener("keypress", f,this); //(accion, ejecutar, algo)    agregamos al documento la funcion que detecta la presion de un boton  
// carga en un iframe escondido, la imagen siguiente 
var as=document.getElementsByTagName("a")

a=as[5];//es el que contiene el vinculo a la pagina sigiente

url=a.getAttribute("href");

//agrega el iframe con la direccion del la pagina siguiente
function makeFrame(url) {	
	if (top != self) {//solo incluye la pagina siguiente una sola vez
		return false;
	}	
   ifrm = document.createElement("IFRAME");
   ifrm.setAttribute("src", url);
   ifrm.style.width = 1+"px";
   ifrm.style.height = 1+"px";
   document.body.appendChild(ifrm);
} 
makeFrame(url);