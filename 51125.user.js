// ==UserScript==
// @name           Teisespor Pirateado Beta
// @namespace      http://www.mcodina.com.ar
// @description    Muestra un recuadro con links para descargar la pelicula que se esta viendo en el post
// @include        http://teisespor.activo-foro.com/tv-libros-cine-y-espectaculos-f6/*
// @exclude		   http://teisespor.activo-foro.com/tv-libros-cine-y-espectaculos-f6/
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

function trim(s){
	s = s.replace(/\s+/gi, ' '); //sacar espacios repetidos dejando solo uno
	s = s.replace(/^\s+|\s+$/gi, ''); //sacar espacios blanco principio y final
	return s;
}

function getName(t){
	var num = t.indexOf('<img src="http://illiweb.com/fa/subsilver/icon_minitime.gif" alt="" border="0">');
	var p = t.substring(113, num);
	p = p.replace(/&nbsp;/gi, '');
	p = p.replace(/&quot;/gi, '"');
	p = p.replace(/&aacute;/gi, '�');
	p = p.replace(/&eacute;/gi, '�');
	p = p.replace(/&iacute;/gi, '�');
	p = p.replace(/&oacute;/gi, '�');
	p = p.replace(/&uacute;/gi, '�');
	p = p.replace(/&ntilde;/gi, '�');
	p = trim(p);
	p = p.replace(/ /gi, '+');
	return p;
}

function sinAcentos(p) {
	p = p.replace(/&nbsp;/gi, '');
	p = p.replace(/&quot;/gi, '"');
	p = p.replace(/�/gi, 'a');
	p = p.replace(/�/gi, 'e');
	p = p.replace(/�/gi, 'i');
	p = p.replace(/�/gi, 'o');
	p = p.replace(/�/gi, 'u');
	p = trim(p);
	return p;
}

// postdetails
var postdetails = $('postdetails', 'span');
var cant = postdetails.length;
var texto = "";
var comp = '<img src="http://illiweb.com/fa/bbtech/icon_minipost.gif" alt="Mensaje" title="Mensaje" border="0">Tema: [review]';
comp = comp.toLowerCase();
var i;
for(i = 0; i < cant; i++){
	texto = postdetails[i].innerHTML;
	texto = texto.toLowerCase();
	if(texto.indexOf(comp) == "0") {
		var peli = getName(texto);
		var postbody = $('postbody', 'span');
		var caja = document.createElement('div');
		caja.id = "cajaLinks";
		var taringaLink = sinAcentos(peli);
		var taringa = "http://www.taringa.net/buscador/?q=%22" + taringaLink + "%22&categoria=13&sort_by=1&autor=";
		var links = "<span style='float: right;'><a href='#' onclick='javascript:document.getElementById(\"cajaLinks\").style.display=\"none\";'>Cerrar</a></span><br><a href='"+ taringa +"' target='_blank'>Buscar en Taringa</a><br><a href='http://www.google.com.ar/search?rls=ig&hl=es&q=%22" + peli + "%22+rapidshare&btnG=Buscar+con+Google&meta=&aq=f&oq=' target='_blank'>Buscar en Rapidshare</a><br><a href='http://www.google.com.ar/search?rls=ig&hl=es&q=%22" + peli + "%22+megaupload&btnG=Buscar+con+Google&meta=&aq=f&oq=' target='_blank'>Buscar en Megaupload</a><br><a href='http://www.google.com.ar/search?hl=es&rls=ig&q=%22"+peli+"%22+torrent&btnG=Buscar&meta=' target='_blank'>Buscar Torrent</a><br><a href='http://www.subdivx.com/index.php?buscar=" + peli + "&accion=5&masdesc=1&subtitulos=1&realiza_b=1' target='_blank'>Buscar Subt&iacute;tulos</a></p>";
		caja.innerHTML = links;
		caja.style.position = "fixed";
		caja.style.top = "20px";
		caja.style.right = "10px";
		caja.style.background = "#fff";
		caja.style.border = "1px solid #ccc";
		caja.style.padding = "5px";
		document.body.appendChild(caja);
		// postbody[0].innerHTML = mostrar.innerHTML + "<br>" + caja.innerHTML + "<br> ---------------------------- <br>" + postbody[0].innerHTML;
		break;
	}
}