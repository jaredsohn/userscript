// ==UserScript==
// @name           pikamex recreador de estilo
// @namespace      Casatodo Total
// @description    vuelve a pikamex mas agradable a quienes no ven las imagenes
// @include        http://*pokemex.com/*
// ==/UserScript==

var thisElement, longcat, total
var todoblanco=false //indica si se cambia los 2 css en el faro en vez de uno solo
var allElements = document.getElementsByTagName('link')

if (todoblanco)
total=6
else total=1

if (allElements.length > 5)
longcat=5
else loncat=allElements.length

for (var i = 0; i < longcat; i++) {
	thisElement = allElements[i];
	
	if (i<total){
	thisElement.href=thisElement.href.replace(/pokemex-noir/,'pokemex-bleu'); //permite leer en la seccion de noticias y otros que no son del foro
	}
	if (i>0){
	if (i<5){
	thisElement.href=thisElement.href.replace(/pkmxnoir/,'pkmxbleu');
	//alert(thisElement.href)  //usado para depuracion, si este script no funciona prueba a descomentar y leer que dicen los 4 letreros que salen, deben ser vinculos http validos
	}
	}
	
}

//este codigo permite cambiar el color amarillo que aparece al pasar el raton sobre un vinculo, solo funciona en el foro, no depende de los estilos CSS
if (window.location.href.match(/foros/)){
GM_addStyle( [ 

 " A:link     { color: #0066ff !important; }",
 " A:visited  { color: #0066ff !important; }",

''].join("\n"));
}

//modificado 23/04/09
//	- agregada variable para indicar si debe usar ambos css en el faro o solamente el style_lightblue.css (dejando en azul/negro los alrededores de los mensajes en vez de blanco)

//creado el 01/04/09
//	- depende del CSS que aun habita (mas no usa) en la pagina de pokemex.com, posiblemente eso cambie si existen futuras versiones
//	- modificado el color de los vinculos para reemplazar al usado por defecto
//	- actualmente reemplaza:
//		"http://www.pokemex.com/foros/Themes/pkmxnoir/style_lightblue.css" por "http://www.pokemex.com/foros/Themes/pkmxbleu/style_lightblue.css"
//		"http://pokemex.com/wp-content/themes/pokemex-noir/style.css" por "http://pokemex.com/wp-content/themes/pokemex-bleu/style.css"