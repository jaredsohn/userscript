// ==UserScript==
// @name           meneame.net - Mostrar miniaturas
// @namespace      *
// @description    Muestra miniaturas en los enlaces a imágenes de los comentarios, en lugar de un icono.
// @author         Dave Ruiz
// @include        http://*.meneame.net/*
// @include        https://*.meneame.net/*
// ==/UserScript==
(function() {
	var c = document.getElementsByClassName("comment-body"), i, e;
	for(i in c)
	{
		e=c[i].getElementsByClassName("fancybox");
		if (e.length>0) 
			for (i2 in e)
				e[i2].innerHTML="<img src='"+e[i2].href+"' width='60'/>";

	}
})()