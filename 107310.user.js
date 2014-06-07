// ==UserScript==
// @name           musica aleatoria
// @namespace      goear
// @include        http://www.goear.com/categories.php?c=*
// @resource jquery	https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @resource jqueryUI	https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/jquery-ui.min.js
// ==/UserScript==

// ********************************************************************************
//                         FUNCIONES
// ********************************************************************************

function cargarMusica() {
	debug("reproducimos un tema");
	var pos = Math.floor(Math.random() * enlaces.size());
	if (enlaces.size() == 0) {
		debug("No nos quedan temas");
		location.reload();
	} else {
		var urls = "";
		jQuery(enlaces).each(function(pos) {
			urls += pos + ")" + jQuery(this).attr("href") + "\n";
		});
		debug(urls);
		debug("Posicion: " + pos);
		var elem = enlaces.filter(":eq("  + pos + ")");
		elem.parents("div.separador:eq(0)").remove();
		enlaces = enlaces.not(elem);
		var url = elem.attr("href");
		debug("Reproduciendo: " + url);
		var v = window.open(url);
		setTimeout(
			function() {
				v.close();
			},
			((minutosParaNuevaCancion * 60) - 1) * 1000
		);
		
		debug("cuando cerremos, volvemos a llamar al script");
		var w = window;
		jQuery(v).load(function() {
			debug("cargado popup");
			/*
			setTimeout(function() {
				v.k = function () {
					debug("K!!!");
				};
			}, 1000);
			*/
			/*
			jQuery(v).unload(function() {
				ejecutar();
				cargarMusica();
			});
			*/
		});
		
	}
}

function ejecutar() {
	if (intervalo) {
		clearInterval(intervalo);
	}
	intervalo = setInterval(cargarMusica, minutosParaNuevaCancion * 60 * 1000);
}

function debug(obj) {
	if (isDebug) {
		GM_log(obj);
	}
}

function botonPlay() {
	jQuery(htmlBotonPlay).insertAfter(jQuery("h3")).click(function() {
		cargarMusica();
		ejecutar()
	});
}






// ********************************************************************************
//                         Comienzo de la ejecucion del script           
// ********************************************************************************

isDebug = false;

debug("vamos!");

// Cargamos jQuery
eval(GM_getResourceText("jquery"));

debug("fuera publicidad");
jQuery("iframe").remove();

debug("cargamos la lista de enlaces");
enlaces = jQuery(".separador a.b1");
minutosParaNuevaCancion = 4.5;
htmlBotonPlay = '<center><img src="http://www.up.edu.pe/blogs/ingeniaup/SiteAssets/Lists/EntradasDeBlog/NewPost/20090120194511-videos-didacticos-play.jpg" style="width: 150px; cursor: pointer;" /></center>';
intervalo = null;
ejecutar();
cargarMusica();
botonPlay();
setTimeout(function() {
	window.focus();
}, 100);