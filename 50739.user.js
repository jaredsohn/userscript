// ==UserScript==
// @name           Bajar Videos Beta
// @namespace      http://www.mcodina.com.ar
// @description    Da un link para bajar el video de youtube
// @include        http://www.youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*
// ==/UserScript==
function gup( texto, name ){
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp ( regexS );
	var results = regex.exec( texto );
	if( results == null )
		return"";
	else
		return results[1];
}
function prueba() {
	var embed = document.getElementById('movie_player');
	var flashvars = embed.getAttribute('flashvars');
	var video_id = gup(flashvars, 'video_id');
	var t = gup(flashvars, 't');
	var url = 'http://www.youtube.com/get_video?fmt='+(parent.isHDAvailable?'22':'18')+'&video_id='+ video_id +'&t='+ t;
	document.location.href = url;
}
var bloqueAnt = document.getElementById('watch-other-vids');
var capa = document.createElement('div');
var a = document.createElement('span');
a.innerHTML = "<img src='http://i40.tinypic.com/nozplx.gif' alt='Descargar Video' style='cursor:pointer;' />";
a.addEventListener("click", prueba, false ); 
capa.appendChild(a);
bloqueAnt.parentNode.insertBefore(capa, bloqueAnt);