// ==UserScript==
// @name           Boton Youtube
// @namespace      http://www.mcodina.com.ar
// @description    Agrega un boton para insertar videos de YouTube
// @include        http://teisespor.activo-foro.com/post.forum?mode=*
// @include        http://teisespor.activo-foro.com/msg.forum?mode=*
// ==/UserScript==
function $(classname, tag, node) {
	if(!tag) tag = "*";
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName(tag);
	for(var i=0,j=els.length; i<j; i++)
	if(re.test(els[i].className))a.push(els[i]);
	return a;
}
function $$( texto, name ){
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp ( regexS );
	var results = regex.exec( texto );
	if( results == null )
		return"";
	else
		return results[1];
}
function insertEmbedYouTube() {
	var url = prompt('Inserte aqui la direccion del video\n Ejemplo: http://www.youtube.com/watch?v=BWVIdmnGH9k', 'http://');
	var pattern = new RegExp();
	pattern.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
	if (pattern.test(url) && (url!='')) {
		var id = $$(url, 'v');
		var txt = document.getElementsByName('message');
		var anterior = txt[0].value;
		var embedCreado = "<embed \
src='http://www.youtube.com/v/" + id + "&hl=es&fs=1&' \
type='application/x-shockwave-flash' \
allowscriptaccess='always' \
allowfullscreen='true' \
width='425' \
height='344'>\
</embed>";
		txt[0].value = anterior + embedCreado;
		return;
	}
}
var forumline = $('forumline', 'table');
var row2 = $('row2', 'td', forumline[1]);
var post_icon = row2[1].getElementsByTagName('input');
if(post_icon[0].name == "post_icon"){
	var trs = row2[2].getElementsByTagName('tr');
} else {
	var trs = row2[1].getElementsByTagName('tr');
}
var tdYoutube = document.createElement('td');
var botonYouTube = document.createElement('input');
botonYouTube.type = "button";
botonYouTube.value = "YouTube";
botonYouTube.addEventListener('click', insertEmbedYouTube, false);
tdYoutube.appendChild(botonYouTube);
trs[1].appendChild(tdYoutube);