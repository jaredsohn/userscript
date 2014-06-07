// ==UserScript==
// @name          Youtube a Mp3
// @version       1.1
// @namespace     Juampi_Mix
// @description   Traduccion del script "Get MP3!", Agrega enlace en Youtube para convertir y descargar el video en formato mp3 
// @include       *.youtube.*
// @versionOriginal  Erich Lotto (Get MP3!) (http://userscripts.org/scripts/show/84564)
// @traduccion    Juampi_Mix
// ==/UserScript==

var separayt2 = location.href.split("&");
var urlcompactada = separayt2[0]
document.getElementById('watch-headline-user-info').innerHTML += '<b><a target="_blank" href="http://2conv.com/?url='+ urlcompactada + '" title="Convertir este video a formato mp3.  ||  Se abre el enlace en una nueva pestaña para mantener reproduciendo el vídeo.">Generar MP3!</a></b>';