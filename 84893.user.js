// ==UserScript==
// @name           Sin X para Posteando
// @namespace      http://www.posteando.com/
// @description    Quita la seccion Golfa de Posteando.com
// @include        http://www.posteando.com/index.php
// ==/UserScript==
var seccionGolfa= '//html/body/div/div[2]/div[3]/div[8]'
borrarSeccion(seccionGolfa);

function borrarSeccion(seccion){
	var thisdiv = document.evaluate(seccion, document, null, 9, null).singleNodeValue;
	var elementoaborrar = thisdiv;
	if (elementoaborrar){
		GM_log('eliminado')
		elementoaborrar.parentNode.removeChild(elementoaborrar);
	}
}