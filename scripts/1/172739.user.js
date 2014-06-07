// ==UserScript==
// @name       Cuevana Catcher
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Catch cuevana.tv download links
// @match      http://www.cuevana.tv/player/play_new*
// @copyright  2013+, pabratte
// ==/UserScript==
url = String(window.location);
values = url.split("?")[1].split("&"); 
download_url = values[0].split("=")[1];
movie_id = values[1].split("=")[1];
tipo = values[2].split("=")[1];
def = values[3].split("=")[1];
host = values[4].split("=")[1];
download_url = download_url.replace(/%3A/gi, ":").replace(/%2F/gi, "/");

subtitle_download_url = "";
if ( tipo === 'serie') {
	var base = 'http://sc.cuevana.tv/files/s/sub/';
} else {
    var base = 'http://sc.cuevana.tv/files/sub/';
}
var hd = (def==='720') ? '_720': '';
subtitle_download_url = base + movie_id + '_ES' + hd + '.srt';

document.body.innerHTML = '<div align="center"><BR><BR><BR><a href='+download_url+'>Ir a la página de descarga</a><BR><BR><a href='+subtitle_download_url+'>Descargar subtitulos</a></div>';