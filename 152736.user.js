// ==UserScript==
// @name           test script (please ignore)
// @namespace      vaporgifts.com
// @version        1.2.3
// @description    Show button "Enter to Win!" in homepage and auto-enter contests
// @include        http://*steamgifts.com/*
// @include        https://*steamgifts.com/*
// @grant 		   GM_xmlhttpRequest
// ==/UserScript==

var urlSteam = "http://www.steamgifts.com";
console = unsafeWindow.console;

if(unsafeWindow.$){

	$ = unsafeWindow.$;

	var idTempOriginal = "xpath-temp";
	var img = "http://www.fillow.com/AfcIcon/Icons/Ajaxloader.gif";
	var loader = $(document.createElement("img")).attr("src", img).css({"float": "left", "width": "18px", "height" : "18px"});

	var availablePoints = 0;
	var autoEnterDelay = 2000;
	var curDelay = 2000;

	function determinePoints(){
		var elemento_puntos_total = $('#navigation>ol>li:eq(2)>a');
		var puntos_totales_texto = elemento_puntos_total.text();
		var puntos_total = parseFloat(puntos_totales_texto.match(/\d+/));
		return puntos_total;
	}

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

		// Determine how many points this item will cost
		var puntos_juego = parseFloat(nombreBoton.match(/\d+/));

		var clickEnter = function(e){
			if(esBotonEnter(nombreBoton)){
				// If there aren't enough points, do nothing
				if (puntos_juego > availablePoints) {
					return false;
				}
			}
			elemento.append(loader.clone());
			post(url, f.serialize(), elemento);
			return false;
		}
		
		if (agregarClick) {
			enterToWin.click(function(e) {
				clickEnter(e);
				return false;
			});
		}
		
		if(esBotonEnter(nombreBoton) && availablePoints >= puntos_juego){
			// Automatically click the button after a delay
			setTimeout(function() {
				clickEnter();
			}, curDelay);
			curDelay += autoEnterDelay;
		}

		var contenedorJuego = elemento.parents(".post");
		generarEfectosContenedorJuego(contenedorJuego, nombreBoton);

		$("form", elemento).remove();
		elemento.html(f);
	}

	function sesionIniciada() {
		var login = $("#navigation ol a:eq(6)").attr("href");
		return login.indexOf("/?login") == -1;
	}

	function doMagic(elemento) {
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
		availablePoints = determinePoints();
		$(".content .post").each(function(index, elemento) { doMagic(elemento) });
		// Reload page after 10 minutes
		setTimeout(function() {
			unsafeWindow.location.reload();
		}, 600000);
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
	
}else{
	// jQuery not detected. Must be a maintenance page or something. Attempt to go back to home page after 5 minutes
	setTimeout(function() {
		if(unsafeWindow.location.href != urlSteam){
			unsafeWindow.location.href = urlSteam;
		}
	}, 300000);
}
