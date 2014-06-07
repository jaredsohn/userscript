// ==UserScript==
// @name           Enter to Win!
// @namespace      vaporgifts.com
// @version        1.3
// @description    Show button "Enter to Win!" in homepage
// @include        http://*steamgifts.com/*
// @updateURL      http://www.userscripts.org/scripts/source/120905.meta.js
// ==/UserScript==

$ = unsafeWindow.$;
console = unsafeWindow.console;
var urlSteam = "http://www.steamgifts.com";
var idTempOriginal = "xpath-temp";
var img = "http://www.fillow.com/AfcIcon/Icons/Ajaxloader.gif";
var loader = $(document.createElement("img")).attr("src", img).css({"float": "left", "width": "18px", "height" : "18px"});

function get(url, elemento) {
	setTimeout(function() {
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			onload: function(xhr) {
				generarBotonEnterToWin(url, xhr.responseText, elemento);
			}
		});
	}, 0);
}

function post(url, data, elemento) {
	setTimeout(function() {
		GM_xmlhttpRequest({
			method: "POST",
			url: url,
			data: data,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function() {
				wearConLosPuntos(elemento);
				get(url, elemento);
			}
		});
	}, 0);
}

function wearConLosPuntos(elemento) {
	var elemento_puntos_total = $('#navigation>ol>li:eq(2)>a');
	var puntos_totales_texto = elemento_puntos_total.text();
	var puntos_juego_texto = elemento.text()
	var puntos_total = parseFloat(puntos_totales_texto.match(/\d+/));
	var puntos_juego = parseFloat(puntos_juego_texto.match(/\d+/));
	nuevos_puntos = esBotonEnter(puntos_juego_texto) ? puntos_total-puntos_juego : puntos_total+puntos_juego;
	if (nuevos_puntos >= 0) elemento_puntos_total.text(puntos_totales_texto.replace(/\d+/, nuevos_puntos));
}

function crearDocumentTemporal(html, idTemp) {
	var div = document.createElement("div");
	div.id = idTemp ? idTemp : idTempOriginal; 
	div.innerHTML = html;
	div.style.display = "none";
	document.body.appendChild(div);
}

function obtenerKeyJuego(frase) {
	return frase.split("/")[4];
}

function removerDocumentTemporal(idTemp) {
	var idTemp = idTemp ? idTemp : idTempOriginal;
	$("#" + idTemp).remove();
}

function esBotonEnter(nombreBoton) {
	return nombreBoton.indexOf("Enter to Win") != -1;
}

function esBotonRemove(nombreBoton) {
	return nombreBoton.indexOf("Remove Entry") != -1;
}

function esBoton(nombreBoton) {
	return esBotonEnter(nombreBoton) || esBotonRemove(nombreBoton);
}

function generarEfectosContenedorJuego(contenedorJuego, nombreBoton) {
	if (esBotonRemove(nombreBoton)) {
		contenedorJuego.addClass("fade");
		contenedorJuego.hover(function() { contenedorJuego.addClass("over"); }, function() { contenedorJuego.removeClass("over"); })
	} else if (esBotonEnter(nombreBoton)) {
		contenedorJuego.removeClass("fade");
		contenedorJuego.hover(function(){}, function(){})
	}
}

function generarBotonEnterToWin(url, html, elemento) {

	var keyJuego = obtenerKeyJuego(url);
	var idTemp = idTempOriginal + "-" + keyJuego;
	
	crearDocumentTemporal(html, idTemp);
	var formulario = xpath(".//div[@id='" + idTemp + "']//*[@id='form_enter_giveaway']");
	removerDocumentTemporal(idTemp);
	if (!formulario[0]) {
		return false;
	}
	var f = $(formulario[0]).attr("id", "form-" + keyJuego).attr("action", url).css("float", "left");
	var enterToWin = $("a", f).first();
	
	var nombreBoton = enterToWin.text();
	var agregarClick = esBoton(nombreBoton);
	
	if (agregarClick) {
		enterToWin.click(function(e) {
			elemento.append(loader.clone());
			post(url, f.serialize(), elemento);
			return false;
		});
	}

	var contenedorJuego = elemento.parents(".post");
	generarEfectosContenedorJuego(contenedorJuego, nombreBoton);

	$("form", elemento).remove();
	elemento.html(f);
    $(elemento).data('cargando', false);
}

function sesionIniciada() {
	var login = $("#navigation ol a:eq(6)").attr("href");
	return login.indexOf("/?login") == -1;
}

function doMagic(elemento) {
    if ($(elemento).data('cargando') || listo(elemento)) return true;
    $(elemento).data('cargando', true);
	var contenedor = $(document.createElement("div")).css("float", "right").append(loader.clone());
	var title = $(".left .title:eq(0)", elemento);
	title.append(contenedor);
	var urlJuego = $("a:eq(0)", title).attr("href");
	if (!urlJuego) {
		return false;
	}
	get(urlSteam + urlJuego, contenedor);
}

if (sesionIniciada()) {
	$(".content .post").each(function(index, elemento) { doMagic(elemento) });
    $(".ajax_gifts").bind('DOMNodeInserted', function(e) {
        if($(e.target).hasClass('post')) { doMagic(e.target) }
    });
}

function listo(e) {
    return $(e).find('[name="form_key"]').length > 0
}

function xpath() {
	var elements = new Array();
	for (var i = 0; i < arguments.length; i++) {
		try {
			var iterator = document.evaluate(arguments[i], document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			for (var i = 0; i < iterator.snapshotLength; i++) {
				elements.push(iterator.snapshotItem(i));
			}
		} catch(e) {
			continue;
		}
	}
	return elements;
}