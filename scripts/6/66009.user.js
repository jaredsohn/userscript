// ==UserScript==
// @name           Las 10 del Café Descargables
// @namespace      http://www.google.es
// @include        http://cafecongotas.tele7.tv/index.php?option=com_awd_song*
// ==/UserScript==
var canciones = document.getElementsByName('FlashVars');
for (var i=0, url; i<canciones.length; i++) {
	url = canciones[i].value.replace('playerID=1\&soundFile=', '');
	canciones[i].parentNode.parentNode.innerHTML += '<br style="clear:both;" /><a href="'+url+'" onclick="return !window.open(this.href);" title="Guardar enlace como...">Descargar canci&oacute;n</a>';
}