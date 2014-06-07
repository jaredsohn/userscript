// ==UserScript==
// @name          PcligaToolsCharmed
// @namespace     http://userscripts.org
// @description   Script para mejorar las caracteristicas de PcLiga.com
// @include       http://www.pcliga.com/*
// @include       http://pcliga.com/*
// ==/UserScript==


// ********************************************************************************************************
// URL visitada.
// ********************************************************************************************************
var quitarHTTP = document.location.href.replace("http://","");
var quitarWWW = quitarHTTP.replace("www.","");
var urlVisitada = quitarWWW.split("?"); // posición 0 -> URL sin parámetros


// ********************************************************************************************************
// URLs utilizadas.
// ********************************************************************************************************
var URL_BASE = "pcliga.com/";

var urlFichaJugadorPropio = URL_BASE + "plantilla_infojugador.asp";
var urlFichaJugadorPropioRenovacion = URL_BASE + "plantilla_renovar_haceroferta.asp";
var urlFichaJugadorPropioEstimacionValor = URL_BASE + "plantilla_renovar_estimarvalor.asp";
var urlFichaJugadorPropioEntrenamientoStats = URL_BASE + "plantilla_entrenarstats.asp";
var urlFichaJugadorPropioJuvenilEntrenamientoStats = URL_BASE + "plantilla_entrenar.asp";
var urlFichaJugadorPropioCedidoRenovacion = URL_BASE + "plantilla_cedido_renovar_haceroferta.asp";
var urlStatsPlantillaPropia = URL_BASE + "plantilla_lista_stats.asp";
var urlStatsCedidosPlantillaPropia = URL_BASE + "plantilla_cedidos.asp";
var urlInfoEconomicaPlantillaPropia = URL_BASE + "plantilla_lista_economica.asp";
var urlAlineacion = URL_BASE + "alineacion_lista.asp";

var urlFichaJugadorAjeno = URL_BASE + "fichajes_infojugador.asp";
var urlFichaJugadorAjenoCedidoOferta = URL_BASE + "fichajes_cedido_haceroferta.asp";
var urlFichaJugadorAjenoOferta = URL_BASE + "fichajes_haceroferta.asp";
var urlStatsPlantillaAjena = URL_BASE + "clasificacion_verequipo.asp";

var urlMercadoBusquedaJugadores = URL_BASE + "fichajes_buscar.asp";


// ********************************************************************************************************
// Parámetros de configuración.
// ********************************************************************************************************

// Activación / desactivación de opciones.
var ACTIVAR_OPCION_MEDIAS_EXACTAS_PLANTILLAS = true;
var ACTIVAR_OPCION_RESUMEN_ECONOMICO_PLANTILLAS = true;

var ACTIVAR_OPCION_MEDIA_REAL_EXACTA_FICHA_JUGADOR = true;
var ACTIVAR_OPCION_MEDIA_REAL_POTENCIAL_JUVENIL = true;
var ACTIVAR_OPCION_BUSQUEDA_PRECIOS_MERCADO_FICHA_JUGADOR = true;
var ACTIVAR_OPCION_EDAD_RESET_FICHA_JUGADOR = true;
var ACTIVAR_OPCION_RENOVACION_OPTIMA = true;

var ACTIVAR_OPCION_BUSQUEDA_MERCADO_MEDIA_REAL_CON_DECIMALES = true;

var ACTIVAR_OPCION_WARNING_EF_ALINEACION = true;


// Otros parámetros configurables.

// Número de decimales.
var NUMERO_DECIMALES_STATS_JUGADORES = 1;
var NUMERO_DECIMALES_RESUMEN_ECONOMICO = 2;

// Valores límite y colores de EF.
var VALOR_LIMITE_EF_MALA = 79;
var VALOR_LIMITE_EF_REGULAR = 83;
var VALOR_LIMITE_EF_BUENA = 89;

var COLOR_EF_MUYBUENA = "rgb(0,100,0)"; // Verde oscuro
var COLOR_EF_BUENA = "rgb(0,185,0)"; // Verde claro
var COLOR_EF_REGULAR = "rgb(255,87,6)"; // Naranja 
var COLOR_EF_MALA =	"rgb(255,0,0)"; // Rojo


// ********************************************************************************************************
// Controlador
// ********************************************************************************************************

// Array para almacenar los datos de los jugadores de una plantilla.
// Indice -> Id del jugador
// Valor -> Array de datos del jugador
var jugadores = new Array();

// Variables globales para llevar el recuento de los jugadores de una plantilla encontrados y procesados.
var contJugadoresEncontrados = 0;
var contJugadoresProcesadosAjax = 0;

// Array para almacenar los datos de los jugadores cedidos por un equipo.
// Indice -> Id del jugador
// Valor -> Array de datos del jugador
var jugadoresCedidos = new Array();

// Variables globales para llevar el recuento de los jugadores cedidos por una plantilla encontrados y procesados.
var contJugadoresCedidosEncontrados = 0;
var contJugadoresCedidosProcesadosAjax = 0;

// Variable global para almacenar los datos de un jugador (ficha).
var jugador = new Array();

// Constantes para diferenciar los tipos de tabla de jugadores.
var TABLA_PLANTILLA_PROPIA = 0;
var TABLA_CEDIDOS_PLANTILLA_PROPIA = 1;
var TABLA_PLANTILLA_AJENA = 2;
var TABLA_CEDIDOS_PLANTILLA_AJENA = 3;

// Constantes edades jugador.
var SEMANAS_ANIO_JUGADOR_SENIOR = 57;
var SEMANAS_ANIO_JUGADOR_JUVENIL = 53;

// Ficha mensual de los juveniles.
var FICHA_MES_JUVENIL = 1000;


// 1. Media real exacta en ficha de jugadores.
// 2. Media real potencial en juveniles no promocionados.
// 3. Búsqueda de precios de mercado de jugadores similares.
// 4. Edad próximo reset.
// 5. Renovación óptima.
if (urlVisitada[0] == urlFichaJugadorPropio || urlVisitada[0] == urlFichaJugadorAjeno || urlVisitada[0] == urlFichaJugadorPropioRenovacion || 
	urlVisitada[0] == urlFichaJugadorPropioEstimacionValor || urlVisitada[0] == urlFichaJugadorPropioEntrenamientoStats || urlVisitada[0] == urlFichaJugadorPropioJuvenilEntrenamientoStats || 
	urlVisitada[0] == urlFichaJugadorPropioCedidoRenovacion || urlVisitada[0] == urlFichaJugadorAjenoOferta || urlVisitada[0] == urlFichaJugadorAjenoCedidoOferta) {
	
	if (ACTIVAR_OPCION_MEDIA_REAL_EXACTA_FICHA_JUGADOR || ACTIVAR_OPCION_MEDIA_REAL_POTENCIAL_JUVENIL || ACTIVAR_OPCION_BUSQUEDA_PRECIOS_MERCADO_FICHA_JUGADOR || 
		ACTIVAR_OPCION_EDAD_RESET_FICHA_JUGADOR || ACTIVAR_OPCION_RENOVACION_OPTIMA) { 
		// Para cualquiera de las opciones anteriores, obtenemos previamente todos los datos del jugador.
		jugador = extraerDatosJugador(document.getElementsByTagName("html")[0].innerHTML);
		if (ACTIVAR_OPCION_MEDIA_REAL_EXACTA_FICHA_JUGADOR) { 
			doMediaRealFichaJugador(); 
		}
		if (ACTIVAR_OPCION_MEDIA_REAL_POTENCIAL_JUVENIL) { 
			doMediaRealPotencialJuvenil(); 
		}
		if (ACTIVAR_OPCION_BUSQUEDA_PRECIOS_MERCADO_FICHA_JUGADOR) { 
			doBusquedaPreciosMercadoFichaJugador(); 
		}
		if (ACTIVAR_OPCION_EDAD_RESET_FICHA_JUGADOR) { 
			doEdadResetFichaJugador(); 
		}
		if (ACTIVAR_OPCION_RENOVACION_OPTIMA) { 
			if (urlVisitada[0] == urlFichaJugadorPropioRenovacion || urlVisitada[0] == urlFichaJugadorPropioCedidoRenovacion) {
				doRenovacionOptima(); 
			}
		}
	}
}

// 1. Medias exactas de stats en plantillas.
// 2. Resumen económico plantillas.
if (urlVisitada[0] == urlStatsPlantillaPropia) {	
	if (ACTIVAR_OPCION_MEDIAS_EXACTAS_PLANTILLAS) { 
		doMediasExactasPlantillas();
	}
}

if (urlVisitada[0] == urlStatsCedidosPlantillaPropia) {	
	if (ACTIVAR_OPCION_MEDIAS_EXACTAS_PLANTILLAS) { 
		doMediasExactasCedidosPlantillas();
	}
}

if (urlVisitada[0] == urlInfoEconomicaPlantillaPropia) {	
	if (ACTIVAR_OPCION_RESUMEN_ECONOMICO_PLANTILLAS) {
		doResumenEconomicaPlantilla();
	}
}

if (urlVisitada[0] == urlStatsPlantillaAjena) {	
	if (ACTIVAR_OPCION_MEDIAS_EXACTAS_PLANTILLAS) { 
		doMediasExactasPlantillas();
		doMediasExactasCedidosPlantillas();
	} else {
		if (ACTIVAR_OPCION_RESUMEN_ECONOMICO_PLANTILLAS) {
			doResumenEconomicaPlantilla();
		}
	}
}

// Búsqueda de jugadores por media real con decimales.
if (urlVisitada[0] == urlMercadoBusquedaJugadores) {	
	if (ACTIVAR_OPCION_BUSQUEDA_MERCADO_MEDIA_REAL_CON_DECIMALES) { 
		doBusquedaMediaRealConDecimales();
	}
}

// Warning EF (En forma) jugadores.
if (urlVisitada[0] == urlAlineacion) {	
	if (ACTIVAR_OPCION_WARNING_EF_ALINEACION) { 
		doWarningEFAlineacion();
	}
}

// ********************************************************************************************************
// Funciones de utilidad generales
// ********************************************************************************************************
// Determina si un número es par.
function esPar(numero) {
	return numero%2 == 0;
}
// Trunca un número decimal (se queda con la parte entera).
function truncar(numero) {
   return numero - numero % 1;
}

// Redondea un numero decimal al decimal indicado.
function redondear(numero, decimal) {
	var potencia = 1;
	for (var i = 0; i < decimal; i++) {
		potencia = 10 * potencia;
	}
	return Math.round(numero * potencia) / potencia;
}

// Sustituye todas las ocurrencias de "substringInicial" en "string" por "substringFinal".
function replaceAll(string, substringInicial, substringFinal) {
	return string.split(substringInicial).join(substringFinal);
}

// Convierte a string con n decimales el valor recibido.
function toStringConNDecimales(valor, numeroDecimales) {
	return valor.toFixed(numeroDecimales).toString();
}

// Añade ceros a la izquierda hasta completar una cadena de longitud "longitudTotal".
function setCerosIzquierda(cadena, longitudTotal) {
	var cadenaConCeros = cadena;
	var numCeros = longitudTotal - cadena.toString().length;
	for (var n = 0; n < numCeros; n++) {
		cadenaConCeros = "0" + cadenaConCeros;
	}
	return cadenaConCeros;
}

// Recibe una fecha, almacenada en un string, con el formato: DD/MM/YYYY, y la transforma en: YYYY/MM/DD.  
function transformarFechaAFormatoIngles(fechaString) {
	return fechaString.substring(6) + "/" + fechaString.substring(3,5) + "/" + fechaString.substring(0,2);
}

// Devuelve el número de días entre 2 fechas almacenadas en objetos Date.
function getNumDiasEntreFechas (fechaInicial, fechaFinal) {
	// Restamos las fechas y obtenemos la diferencia en milisegundos.
	var fechaResta = fechaFinal - fechaInicial;
	// Transformamos los milisegundos a días.
	fechaResta = (((fechaResta / 1000) / 60) / 60) / 24;  
	return fechaResta;
}

// Elimina caracteres invisibles de un string que almacena un html.
function eliminarCaracteresInvisibles(html) {
	// Eliminamos finales de línea, retornos de carro y tabuladores.
	html = replaceAll(html, "\n", "");
	html = replaceAll(html, "\r", "");
	html = replaceAll(html, "\t", "");
	return html;
}

// Recibe un elemento contenedor y cambia su padding lateral.
function establecerPaddingLateralContenedor(contenedor, padding) {
	contenedor.style.paddingRight = padding;
	contenedor.style.paddingLeft = padding;
}

// Recibe un elemento contenedor y lo vacía.
function vaciarContenedor(contenedor) {
	while (contenedor.firstChild) { 
		contenedor.removeChild(contenedor.firstChild);
	};
}

// Obtiene el nodo padre de la primera hoja de la rama.
function getNodoPadrePrimeraHoja(rama) {
	if (rama != null) {
		while (rama.firstChild) {
			rama = rama.firstChild;
		}
		return rama.parentNode;
	}
}

// Elimina el ancho de todas las columnas de tabla recibidas.
function eliminarAnchosColumnaTabla(filaCabeceraTabla) {
	var columnasTabla = filaCabeceraTabla.getElementsByTagName("td");
	for (var columna = 0; columna < columnasTabla.length; columna++) {
		columnasTabla[columna].width = "";
	}
}

// Ajusta el estilo de los div contenedores.
// Amplía el ancho del bloque central y estrecha el bloque derecho.
function ajustarEstilosContenedores() {
	getContenidoPagina().style.width = "720px";
	document.getElementById("subcontent").style.width = "100px";
	document.getElementById("subcontent").style.fontSize = "100%";
}

// Recibe: un array con el nombre de las columnas, un array con las filas y columnas de datos, y el contenedor donde ubicar la tabla.
function pintarTablaDatos(columnas, datos, contenedor) {
	var tabla = document.createElement("table");
	tabla.align = "center";
	tabla.style.textAlign = "center";
	tabla.style.fontWeight = "bold";
	tabla.className = "textonoticias";
	tabla.id = "tablaResumenEconomico";

	// Construimos la cabecera tabla.
	var cabeceraTabla = document.createElement("tr");
	for (var columna in columnas) {
		var columnaTabla = document.createElement("td");
		columnaTabla.className = "cabeceracentro";
		establecerPaddingLateralContenedor(columnaTabla, "8px");
		columnaTabla.appendChild(document.createTextNode(columnas[columna]));
		cabeceraTabla.appendChild(columnaTabla);
	}
	tabla.appendChild(cabeceraTabla);
	
	// Construimos el cuerpo de la tabla
	var contFilas = 0;
	for (var fila in datos) {
		contFilas++;
		var filaTabla = document.createElement("tr");
		for (var columnaFila in datos[fila]) {
			var datoColumna = document.createElement("td");
			datoColumna.style.backgroundColor = "#EEEEEE";
			datoColumna.appendChild(document.createTextNode(datos[fila][columnaFila]));
			filaTabla.appendChild(datoColumna);
		}
		tabla.appendChild(filaTabla);
	}
	
	// Vaciamos el contenedor e insertamos la tabla.
	vaciarContenedor(contenedor);
	contenedor.appendChild(tabla);
	contenedor.style.marginBottom = "10px";
	contenedor.style.display = "";
}

// Muestra un texto de feedback en lugar de una tabla de datos que va a ser procesada.
function mostrarFeedbackProcesandoTabla(idFeedback, textoFeedback, tabla) {
	if (tabla != null && tabla != undefined) {
		// Ocultamos la tabla.
		tabla.style.display = "none";
	} else {
		// Si no se especifica tabla, se utiliza la primera disponible en el contenido de la página.
		tabla = getContenidoPagina().getElementsByTagName("table")[0];
	}
	// Construimos un div con un texto de feedback para el usuario.
	var divFeedback = document.createElement("div");
	divFeedback.id = idFeedback;
	divFeedback.appendChild(document.createTextNode(textoFeedback));
	tabla.parentNode.insertBefore(divFeedback, tabla);
}

// Oculta un texto de feedback, identificado por un id, cuando la tabla de datos ya ha sido procesada.
function finalizarFeedbackProcesandoTabla(idFeedback, tabla) {
	// Ocultamos el div que contiene el texto de feedback.
	document.getElementById(idFeedback).style.display = "none";
	// Mostramos la tabla de datos.
	tabla.style.display = "";
}

// Petición Ajax.
// Recibe: URL, función de callback y parámetros de entrada de dicha función.	
function get(url, callback, callbackParam1, callbackParam2) {
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(xhr) { callback(callbackParam1, callbackParam2, xhr.responseText) }
    })
}

// Devuelve la posición absoluta (coordenadas X, Y) de un elemento HTML.
function getPosicionAbsoluta(elemento) {
	var y = 0;
	var x = 0;
	while (elemento.offsetParent) {
		x += elemento.offsetLeft;
		y += elemento.offsetTop;
		elemento = elemento.offsetParent;
	}
	return {top:y, left:x};
}

// Devuelve todos los elementos HTML del contenido de la página, de un tipo determinado (tipoElemento), que posean un atributo con el valor indicado.
function getAllElementosConValorAtributo(tipoElemento, atributo, valorAtributo) {
	var elementosEncontrados = new Array();
	var allElementosTipoElemento = getContenidoPagina().getElementsByTagName(tipoElemento);
	for (var elemento = 0; elemento < allElementosTipoElemento.length; elemento++) {
		// En caso de encontrar un elemento, lo almacenamos.
		if (allElementosTipoElemento[elemento].getAttribute(atributo) == valorAtributo) {
			elementosEncontrados[elementosEncontrados.length] = allElementosTipoElemento[elemento];
		}
	}
	return elementosEncontrados;
}

// Gestión de tooltips.
// Crea el div del tooltip.
function crearDivTooltip() {
	var divTooltip = document.createElement("div");
    divTooltip.id = "divTooltip";
	divTooltip.style.display = "none";
	divTooltip.style.backgroundColor = "rgb(255,254,240)";
	divTooltip.style.border = "1px solid rgb(83,130,172)";
	divTooltip.style.padding = "5px";
	divTooltip.onclick = function() { ocultarTooltip(); };
	getContenidoPagina().appendChild(divTooltip);
}

// Muestra el tooltip con el contenido relativo al elemento HTML recibido como parámetro.
function mostrarTooltip(contenido, elemento) {
	// Obtenemos el tooltip.
	var divTooltip = document.getElementById("divTooltip");
	if (divTooltip != null) {
		// Posicionamos el tooltip de forma relativa al elemento HTML recibido.
		var coordenadasElemento = getPosicionAbsoluta(elemento);
		divTooltip.style.top = coordenadasElemento.top - 125 + "px";
		divTooltip.style.left = coordenadasElemento.left - 150 + "px";
		divTooltip.style.position = "fixed";
		divTooltip.style.display = "block";
		divTooltip.innerHTML = contenido;
	}
}

// Oculta el tooltip.  
function ocultarTooltip() {
	var divTooltip = document.getElementById("divTooltip");
	if (divTooltip != null) {
		divTooltip.style.display = "none";
	}
}

// ********************************************************************************************************
// Funciones de utilidad específicas pcliga.
// ********************************************************************************************************
function mostrarJugador() {
	var jugadorS = "";
	for (dato in jugador) {
		jugadorS = jugadorS + dato + " = " + jugador[dato] + "\n";
	}
	alert(jugadorS);
}

// Extrae el id de un jugador a partir del href de un enlace que lo incluye como último parámetro.
function extraerIdJugador(enlace) {
	return enlace.href.substring(enlace.href.indexOf("idjugador=") + 10);
}

// Devuelve el div DOM que contiene el contenido principal de la página.
function getContenidoPagina() {
	return document.getElementById("content");
}

// A partir de la URL actual, extrae el dominio de la página:
// http://www.pcliga.com o http://pcliga.com
function extraerDominioPcLigaDeURL() {
	var urlActual = document.location.href;
	return (urlActual.indexOf("http://www." + URL_BASE) != -1) ? ("http://www." + URL_BASE) : ("http://" + URL_BASE);
}

// Calcula la fecha del próximo reset a partir de la fecha del último reset (que debe venir almacenada en un objeto Date).
function getFechaProximoReset(fechaUltimoReset) {
	var fechaProximoReset = new Date(fechaUltimoReset.getTime());
	fechaProximoReset.setDate(fechaProximoReset.getDate() + 56);
	return fechaProximoReset;
}

// Devuelve la tabla DOM que contiene a los jugadores de una plantilla (propia o ajena).
// Aplicable a las URL: urlStatsPlantillaPropia, urlInfoEconomicaPlantillaPropia y urlStatsPlantillaAjena.
function getTablaPlantilla() {
	var contenidoPagina = getContenidoPagina();
	if (urlVisitada[0] == urlStatsPlantillaPropia || urlVisitada[0] == urlStatsPlantillaAjena || urlVisitada[0] == urlInfoEconomicaPlantillaPropia) {
		if (existeTablaResumenEconomico()) { 
			return contenidoPagina.getElementsByTagName("table")[1];
		} else {
			return contenidoPagina.getElementsByTagName("table")[0];
		}
	} else {
		return null;
	}
}

// Devuelve la tabla DOM que contiene a los jugadores cedidos (propios o ajenos).
// Aplicable a las URL: urlStatsCedidosPlantillaPropia y urlStatsPlantillaAjena.
function getTablaCedidosPlantilla() {
	var contenidoPagina = getContenidoPagina();
	if (urlVisitada[0] == urlStatsPlantillaAjena) {
		if (existeTablaResumenEconomico()) { 
			return contenidoPagina.getElementsByTagName("table")[2];
		} else {
			return contenidoPagina.getElementsByTagName("table")[1];
		}
	} else {
		if (urlVisitada[0] == urlStatsCedidosPlantillaPropia) {
			return contenidoPagina.getElementsByTagName("table")[0];
		} else {
			return null;
		}
	}
}

// Comprueba si la página actual es de una plantilla (propia o ajena).
function isPaginaPlantilla() {
	return (isPaginaPlantillaPropia() || isPaginaPlantillaAjena());
}

// Comprueba si la página actual es de jugadores de una plantilla propia.
function isPaginaPlantillaPropia() {
	return urlVisitada[0] == urlStatsPlantillaPropia;
}

// Comprueba si la página actual es de jugadores de una plantilla ajena.
function isPaginaPlantillaAjena() {
	return urlVisitada[0] == urlStatsPlantillaAjena;
}

// Comprueba si la página actual es de jugadores cedidos (propios o ajenos).
function isPaginaCedidosPlantilla() {
	return (isPaginaCedidosPlantillaPropia() || isPaginaCedidosPlantillaAjena());
}

// Comprueba si la página actual es de jugadores cedidos por una plantilla propia.
function isPaginaCedidosPlantillaPropia() {
	return urlVisitada[0] == urlStatsCedidosPlantillaPropia;
}

// Comprueba si la página actual es de jugadores cedidos por una plantilla ajena.
function isPaginaCedidosPlantillaAjena() {
	return urlVisitada[0] == urlStatsPlantillaAjena;
}

// Comprueba si la página actual contiene la tabla de resumen económico.
function existeTablaResumenEconomico() {
	return (document.getElementById("tablaResumenEconomico") != null && document.getElementById("tablaResumenEconomico") != undefined);
}

// Obtiene la lista de jugadores a partir del tipo de tabla de jugadores que se está tratando.
function getListaJugadores(tipoTablaJugadores) {
	if (tipoTablaJugadores == TABLA_PLANTILLA_PROPIA || tipoTablaJugadores == TABLA_PLANTILLA_AJENA) {
		return jugadores;
	} else {
		return jugadoresCedidos;
	}
}

// Procesa los jugadores contenidos en una tabla.
// El parámetro isPlantilla indica si vamos a procesar una plantilla.
// En caso contrario, se procesarán jugadores cedidos.
function procesarJugadores(isPlantilla, callback) {
	// Obtenemos todos los enlaces de tipo jugador y hacemos peticiones ajax a sus fichas.
	var tablaJugadores = isPlantilla ? getTablaPlantilla() : getTablaCedidosPlantilla();
	var allEnlaces = tablaJugadores.getElementsByTagName("a");
	if (allEnlaces.length > 0) {
		for (var e = 0; e < allEnlaces.length; e++) {
			var enlaceActual = allEnlaces[e];
			// Si es un enlace correspondiente a un jugador, lo procesamos.
			if (enlaceActual.href.indexOf("_infojugador.asp?idjugador=") != -1) {
				isPlantilla ? contJugadoresEncontrados++ : contJugadoresCedidosEncontrados++;
				get(enlaceActual.href, callback, extraerIdJugador(enlaceActual), '');
			}
		}	
	} else {
		return 0;
	}
}

// Extrae los datos de un jugador a partir del HTML de su ficha.
function extraerDatosJugador(html) {
	// ----------------------------------------------------------------------------------------------------
	// Calcula la media real de las stats.
	function calcularMediaRealJugador(mediasExactas) {
		var sumaStats = 0;
		var numeroStats = 0;
		for (media in mediasExactas) {
			numeroStats++;
			sumaStats = sumaStats + mediasExactas[media];
		}
		return sumaStats/numeroStats;
	}

	// Extrae la media exacta de una stat indentificada por su nombre.
	function extraerMediaExactaStat(stat, html) {
		var posDecimalStat = html.indexOf(",", html.indexOf(stat.toUpperCase() + ":</td><td>")); 
		return parseFloat(html.substring(posDecimalStat - 2, posDecimalStat + 3).replace(",", "."));
	}

	// Extrae las medias exactas de las stats de un portero.
	function extraerMediasExactasPortero(html) {
		var mediasExactas = new Array();
		mediasExactas["calidad"] = extraerMediaExactaStat("calidad", html);
		mediasExactas["resistencia"] = extraerMediaExactaStat("resistencia", html);
		mediasExactas["velocidad"] = extraerMediaExactaStat("velocidad", html);
		mediasExactas["pase"] = extraerMediaExactaStat("pase", html);
		mediasExactas["entradas"] = extraerMediaExactaStat("entradas", html);
		mediasExactas["agresividad"] = extraerMediaExactaStat("agresividad", html);
		mediasExactas["remate"] = extraerMediaExactaStat("agilidad", html);
		mediasExactas["tiro"] = extraerMediaExactaStat("paradas", html);
		mediasExactas["conduccion"] = extraerMediaExactaStat("faltas", html);
		mediasExactas["desmarque"] = extraerMediaExactaStat("penaltys", html);
		mediasExactas["mediareal"] = calcularMediaRealJugador(mediasExactas);
		return mediasExactas;
	}

	// Extrae las medias exactas de las stats de un jugador de campo.
	function extraerMediasExactasJugador(html) {
		var mediasExactas = new Array();
		mediasExactas["calidad"] = extraerMediaExactaStat("calidad", html);
		mediasExactas["resistencia"] = extraerMediaExactaStat("resistencia", html);
		mediasExactas["velocidad"] = extraerMediaExactaStat("velocidad", html);
		mediasExactas["pase"] = extraerMediaExactaStat("pase", html);
		mediasExactas["entradas"] = extraerMediaExactaStat("entradas", html);
		mediasExactas["agresividad"] = extraerMediaExactaStat("agresividad", html);
		mediasExactas["remate"] = extraerMediaExactaStat("remate", html);
		mediasExactas["tiro"] = extraerMediaExactaStat("tiro", html);
		mediasExactas["conduccion"] = extraerMediaExactaStat("conduccion", html);
		mediasExactas["desmarque"] = extraerMediaExactaStat("desmarque", html);
		mediasExactas["mediareal"] = calcularMediaRealJugador(mediasExactas);
		return mediasExactas;
	}

	// Extrae datos adicionales de un jugador.
	function extraerDatosAdicionalesJugador(datos, html) {
		// ROL.
		busquedaRol = "<tr><td>Rol:</td><td>";
		posInicialRol = html.indexOf(busquedaRol) + busquedaRol.length; 
		posFinalRol = html.indexOf("</td></tr>", posInicialRol); 
		datos["rol"] = html.substring(posInicialRol, posFinalRol);
		
		// EDAD.
		busquedaEdad = "Edad:</td><td>";
		posInicialEdad = html.indexOf(busquedaEdad) + busquedaEdad.length;
		if (html.charAt(posInicialEdad) == '<') {
			// Jugadores en último año de contrato.
			posInicialEdad = html.indexOf(">", posInicialEdad) + 1; 
		}
		datos["edad"] = parseInt(html.substring(posInicialEdad, posInicialEdad + 2));
		
		// SEMANAS EDAD.
		busquedaEdadSemanas = "(y ";
		posInicialEdadSemanas = html.indexOf(busquedaEdadSemanas, posInicialEdad) + busquedaEdadSemanas.length; 
		posFinalEdadSemanas = html.indexOf(" ", posInicialEdadSemanas); 
		datos["edadSemanas"] = parseInt(html.substring(posInicialEdadSemanas, posFinalEdadSemanas));
		
		// CLÁUSULA.
		busquedaClausula = "CLAUSULA:</td>";
		posInicialClausula = html.indexOf(">", html.indexOf(busquedaClausula) + busquedaClausula.length) + 1; 
		posFinalClausula = html.indexOf("</td>", posInicialClausula);	
		clausula = replaceAll(html.substring(posInicialClausula, posFinalClausula), "€", "");
		clausula = replaceAll(clausula, "&nbsp;", "");
		datos["clausula"] = parseInt(replaceAll(clausula, ".", ""));	
		
		// ES JUVENIL.
		datos["esJuvenil"] = (html.indexOf("<tr><td>PROMOCION:</td>") != -1);
		
		if (datos["esJuvenil"]) {
			// JORNADAS PARA PROMOCIONAR.
			busquedaJornadasPromocion = "<tr><td>PROMOCION:</td>";
			posicionInicialJornadasPromocion = html.indexOf(">", html.indexOf(busquedaJornadasPromocion) + busquedaJornadasPromocion.length) + 1;
			posicionFinalJornadasPromocion = html.indexOf(" ", posicionInicialJornadasPromocion);
			datos["jornadasPromocion"] = parseInt(html.substring(posicionInicialJornadasPromocion, posicionFinalJornadasPromocion));
		}
		
		if (!datos["esJuvenil"]) {
			// FICHAS: JORNADA, MES y TEMPORADA.
			busquedaFichaJornada = "FICHA JORN./MES:</td>";
			posInicialFichaJornada = html.indexOf(">", html.indexOf(busquedaFichaJornada) + busquedaFichaJornada.length) + 1; 
			busquedaFinalFichaJornada = " / <b>";
			posFinalFichaJornada = html.indexOf(busquedaFinalFichaJornada, posInicialFichaJornada); 
			datos["fichaJornada"] = parseInt(replaceAll(html.substring(posInicialFichaJornada, posFinalFichaJornada), ".", ""));
		
			posInicialFichaMes = posFinalFichaJornada + busquedaFinalFichaJornada.length; 
			posFinalFichaMes = html.indexOf("</b>", posInicialFichaMes); 
			datos["fichaMes"] = parseInt(replaceAll(html.substring(posInicialFichaMes, posFinalFichaMes), ".", ""));
		
			busquedaFichaTemporada = "TEMPORADA:</td><td";
			posInicialFichaTemporada = html.indexOf(">", html.indexOf(busquedaFichaTemporada) + busquedaFichaTemporada.length) + 1; 
			posFinalFichaTemporada = html.indexOf("</td>", posInicialFichaTemporada);	
			fichaTemporada = replaceAll(html.substring(posInicialFichaTemporada, posFinalFichaTemporada), "€", "");
			fichaTemporada = replaceAll(fichaTemporada, "&nbsp;", "");
			datos["fichaTemporada"] = parseInt(replaceAll(fichaTemporada, ".", ""));
		} else {
			datos["fichaJornada"] = 0;
			datos["fichaMes"] = FICHA_MES_JUVENIL;
			datos["fichaTemporada"] = 0
		}			
		
		return datos;
	}
	
	// Comprueba si el jugador actual es portero.
	function esPortero(html) {
		return html.indexOf("<tr><td>Rol:</td><td>PORTERO</td></tr>") != -1;
	}
	// ----------------------------------------------------------------------------------------------------
	
	// 1. Extraemos las medias exactas.
	if (esPortero(html)) {
		datos = extraerMediasExactasPortero(html);
	} else {
		datos = extraerMediasExactasJugador(html);
	}
	
	// 2. Extraemos datos adicionales.
	return extraerDatosAdicionalesJugador(datos, html);
}


// ********************************************************************************************************
// Funciones principales 
// ********************************************************************************************************

function doMediaRealFichaJugador() {
	var cuadrosInfo = document.getElementsByClassName("cuadroinfojugador");
	// Accedemos al cuadro info número 5 y establecemos la media real.
	var tablaMediaReal = cuadrosInfo[4];
	tablaMediaReal.rows[0].cells[0].firstChild.nodeValue = toStringConNDecimales(jugador["mediareal"], 2);
}


function doMediaRealPotencialJuvenil() {
	if (jugador["esJuvenil"]) {
		var cuadrosInfo = document.getElementsByClassName("cuadroinfojugador");
		var tablaMedia = cuadrosInfo[3];
		// Modificamos el texto "Media".
		tablaMedia.parentNode.getElementsByTagName("h3")[0].firstChild.nodeValue = "MR Potencial";
		// Establecemos la media real potencial.
		tablaMedia.rows[0].cells[0].firstChild.nodeValue = toStringConNDecimales(((jugador["mediareal"] * 10) + jugador["jornadasPromocion"]) / 10, 2);
	}
}


// Modifica el DOM de una tabla de jugadores, estableciendo las nuevas medias con decimales.
function modificarDOMTablaJugadores(tipoTablaJugadores) {
	// ----------------------------------------------------------------------------------------------------	
	// Obtiene la columna que contiene el ID del jugador.
	function getColumnaIdjugador(columnas, tipoTablaJugadores) {
		switch (tipoTablaJugadores) {
			case TABLA_PLANTILLA_PROPIA: return columnas[3];
			case TABLA_PLANTILLA_AJENA: return columnas[4];
			case TABLA_CEDIDOS_PLANTILLA_PROPIA: return columnas[2];
			case TABLA_CEDIDOS_PLANTILLA_AJENA: return columnas[1];
		}
	}

	// Procesa el cambio de valor de las stats de un jugador.
	function procesarCambiosStatsJugador(idJugador, columnasFila, tipoTablaJugadores) {
		// ----------------------------------------------------------------------------------------------------
		// Funciones para procesar el entrenamiento de las stats mediante Ajax.
		// ----------------------------------------------------------------------------------------------------
		// Función callback Ajax.
		// Acualiza la stat que entrena el jugador.
		function actualizarStatEntrenamiento(enlaceStatNueva, enlaceStatAnterior, html) {
			if (enlaceStatAnterior != null) {
				// Eliminamos la "font red" de la stat anterior.
				var valorStatAnteriorParteEntera = enlaceStatAnterior.getElementsByTagName("b")[0].childNodes[0];
				var valorStatAnteriorParteDecimal = enlaceStatAnterior.getElementsByTagName("b")[0].childNodes[1];
				enlaceStatAnterior.removeChild(enlaceStatAnterior.firstChild);
				enlaceStatAnterior.appendChild(valorStatAnteriorParteEntera);
				enlaceStatAnterior.appendChild(valorStatAnteriorParteDecimal);
			}
			
			// Añadimos color rojo y negrita a la nueva stat.
			var valorStatNuevaParteEntera = enlaceStatNueva.childNodes[0];
			var valorStatNuevaParteDecimal = enlaceStatNueva.childNodes[1];
			vaciarContenedor(enlaceStatNueva);
			var fontColorRojo = document.createElement("font");
			fontColorRojo.color = "red";
			var textoNegrita = document.createElement("b");
			fontColorRojo.appendChild(textoNegrita);
			textoNegrita.appendChild(valorStatNuevaParteEntera);
			textoNegrita.appendChild(valorStatNuevaParteDecimal);
			enlaceStatNueva.appendChild(fontColorRojo);
		}
		
		// Obtiene el enlace a la stat de entrenamiento del jugador recibido.
		function getEnlaceStatEntrenandoJugador(idJugador) {
			// Obtenemos todos los enlaces de la tabla de jugadores.
			var tablaJugadores = getTablaPlantilla();
			var allEnlacesJugadores = tablaJugadores.getElementsByTagName("a");
			for (var e = 0; e < allEnlacesJugadores.length; e++) {
				var enlace = allEnlacesJugadores[e];
				// Si es un enlace del jugador y el texto está con la etiqueta "font", es el enlace buscado.
				if (enlace.title.indexOf("&idjugador=" + idJugador) != -1 && enlace.getElementsByTagName("font").length == 1) {
					return enlace;
				}
			}
			// Llegar a este punto significa que el jugador no está entrenando ninguna stat.
			return null;
		}

		// Obtiene el enlace a la nueva stat de entrenamiento correspondiente al href recibido.
		function getEnlaceStatNuevaEntrenamientoJugador(hrefEnlaceStatNueva) {
			// Obtenemos todos los enlaces de la tabla de jugadores.
			var tablaJugadores = getTablaPlantilla();
			var allEnlacesJugadores = tablaJugadores.getElementsByTagName("a");
			for (var e = 0; e < allEnlacesJugadores.length; e++) {
				var enlace = allEnlacesJugadores[e];
				// Si es el enlace buscado, lo devolvemos.
				if (enlace.title == hrefEnlaceStatNueva) {
					return enlace;
				}
			}
		}

		// Cambia el entrenamiento de una stat.
		function entrenarStat(hrefEnlaceStatNueva) {
			// Obtenemos el enlace a la stat anterior de entrenamiento.
			var enlaceTemporalStatNueva = document.createElement("a");
			enlaceTemporalStatNueva.href = hrefEnlaceStatNueva;
			enlaceStatAnterior = getEnlaceStatEntrenandoJugador(extraerIdJugador(enlaceTemporalStatNueva));
			
			// Obtenemos el enlace a la stat nueva de entrenamiento.
			enlaceStatNueva = getEnlaceStatNuevaEntrenamientoJugador(hrefEnlaceStatNueva);
			
			// Si don distintos enlaces, cambiamos el entrenamiento.
			if (enlaceStatAnterior == null || enlaceStatNueva.title != enlaceStatAnterior.title) {
				get(enlaceStatNueva.title, actualizarStatEntrenamiento, enlaceStatNueva, enlaceStatAnterior);
			}
		}		
		
		// Elimina el href a la stat de entrenamiento y lo incluye en el atributo "title" del mismo enlace y en un evento javascript de tipo onclick para gestionar su tratamiento. 
		// Nota: Se incluye en el atributo "title" por comodidad para realizar búsquedas posteriores.
		function modificarEnlaceStatEntrenamiento(enlaceStat) {
			var hrefEnlaceStat = enlaceStat.href;
			enlaceStat.onclick = function() { entrenarStat(hrefEnlaceStat) };
			enlaceStat.title = hrefEnlaceStat;
			enlaceStat.removeAttribute("href");
		}
		
		// ----------------------------------------------------------------------------------------------------
		// Funciones para procesar el cambio de valor de cada stat.
		// ----------------------------------------------------------------------------------------------------
		// Recibe un nodo DOM padre y modifica el texto (valorStat) de su hijo.
		function modificarStat(contenedorPadreStat, nombreStat, valorStat) {
			contenedorPadreStat.removeChild(contenedorPadreStat.firstChild);
			
			if (nombreStat == "mediareal") {
				// Añadimos como hijo a "valorStat" en negrita.
				var textoNegrita = document.createElement("b");
				contenedorPadreStat.appendChild(textoNegrita);
				textoNegrita.appendChild(document.createTextNode(valorStat));
			} else {
				// Creamos un span para darle estilo a la parte decimal del número.
				var spanPosicionesDecimales = document.createElement("span");
				spanPosicionesDecimales.style.fontSize = "9px";
				spanPosicionesDecimales.appendChild(document.createTextNode(valorStat.substring(3)));
			
				// Añadimos como hijos a la parte entera y a la parte decimal.
				contenedorPadreStat.appendChild(document.createTextNode(valorStat.substring(0, 3)));
				contenedorPadreStat.appendChild(spanPosicionesDecimales);
			}
			
			// Finalmente, aprovechamos para ampliar el padding del elemento contenedor.
			establecerPaddingLateralContenedor(contenedorPadreStat, "1px");
		}

		// Procesa el cambio de valor de la stat.
		function procesarCambioValorStat(columnaContenedoraStat, idJugador, nombreStat, tipoTablaJugadores) {
			modificarStat(getNodoPadrePrimeraHoja(columnaContenedoraStat), nombreStat, toStringConNDecimales(getListaJugadores(tipoTablaJugadores)[idJugador][nombreStat], NUMERO_DECIMALES_STATS_JUGADORES));
			// Finalmente, si estamos tratando la tabla de la plantilla propia, aprovechamos para modificar el enlace al entrenamiento de la stat.
			if (columnaContenedoraStat.getElementsByTagName("a").length > 0 && tipoTablaJugadores == TABLA_PLANTILLA_PROPIA) {
				modificarEnlaceStatEntrenamiento(columnaContenedoraStat.getElementsByTagName("a")[0]);
			}
		}
	
		// Obtiene la columna que contiene la MEDIA REAL.	
		function getColumnaMediaReal(columnas, tipoTablaJugadores) {
			switch (tipoTablaJugadores) {
				case TABLA_PLANTILLA_PROPIA: return columnas[16];
				case TABLA_PLANTILLA_AJENA: return columnas[16];
				case TABLA_CEDIDOS_PLANTILLA_PROPIA: return columnas[16];
				case TABLA_CEDIDOS_PLANTILLA_AJENA: return columnas[14];
			}
		}

		// Obtiene la columna que contiene la stat CALIDAD.
		function getColumnaCalidad(columnas, tipoTablaJugadores) {
			switch (tipoTablaJugadores) {
				case TABLA_PLANTILLA_PROPIA: return columnas[5];
				case TABLA_PLANTILLA_AJENA: return columnas[6];
				case TABLA_CEDIDOS_PLANTILLA_PROPIA: return columnas[6];
				case TABLA_CEDIDOS_PLANTILLA_AJENA: return columnas[4];
			}
		}
		
		// Obtiene la columna que contiene la stat RESISTENCIA.
		function getColumnaResistencia(columnas, tipoTablaJugadores) {
			switch (tipoTablaJugadores) {
				case TABLA_PLANTILLA_PROPIA: return columnas[6];
				case TABLA_PLANTILLA_AJENA: return columnas[7];
				case TABLA_CEDIDOS_PLANTILLA_PROPIA: return columnas[7];
				case TABLA_CEDIDOS_PLANTILLA_AJENA: return columnas[5];
			}
		}

		// Obtiene la columna que contiene la stat VELOCIDAD.	
		function getColumnaVelocidad(columnas, tipoTablaJugadores) {
			switch (tipoTablaJugadores) {
				case TABLA_PLANTILLA_PROPIA: return columnas[7];
				case TABLA_PLANTILLA_AJENA: return columnas[8];
				case TABLA_CEDIDOS_PLANTILLA_PROPIA: return columnas[8];
				case TABLA_CEDIDOS_PLANTILLA_AJENA: return columnas[6];
			}
		}
		
		// Obtiene la columna que contiene la stat PASE.	
		function getColumnaPase(columnas, tipoTablaJugadores) {
			switch (tipoTablaJugadores) {
				case TABLA_PLANTILLA_PROPIA: return columnas[8];
				case TABLA_PLANTILLA_AJENA: return columnas[9];
				case TABLA_CEDIDOS_PLANTILLA_PROPIA: return columnas[9];
				case TABLA_CEDIDOS_PLANTILLA_AJENA: return columnas[7];
			}
		}

		// Obtiene la columna que contiene la stat REMATE.	
		function getColumnaRemate(columnas, tipoTablaJugadores) {
			switch (tipoTablaJugadores) {
				case TABLA_PLANTILLA_PROPIA: return columnas[9];
				case TABLA_PLANTILLA_AJENA: return columnas[10];
				case TABLA_CEDIDOS_PLANTILLA_PROPIA: return columnas[10];
				case TABLA_CEDIDOS_PLANTILLA_AJENA: return columnas[8];
			}
		}

		// Obtiene la columna que contiene la stat TIRO.	
		function getColumnaTiro(columnas, tipoTablaJugadores) {
			switch (tipoTablaJugadores) {
				case TABLA_PLANTILLA_PROPIA: return columnas[10];
				case TABLA_PLANTILLA_AJENA: return columnas[11];
				case TABLA_CEDIDOS_PLANTILLA_PROPIA: return columnas[11];
				case TABLA_CEDIDOS_PLANTILLA_AJENA: return columnas[9];
			}
		}

		// Obtiene la columna que contiene la stat ENTRADAS.	
		function getColumnaEntradas(columnas, tipoTablaJugadores) {
			switch (tipoTablaJugadores) {
				case TABLA_PLANTILLA_PROPIA: return columnas[11];
				case TABLA_PLANTILLA_AJENA: return columnas[12];
				case TABLA_CEDIDOS_PLANTILLA_PROPIA: return columnas[12];
				case TABLA_CEDIDOS_PLANTILLA_AJENA: return columnas[10];
			}
		}
		
		// Obtiene la columna que contiene la stat AGRESIVIDAD.	
		function getColumnaAgresividad(columnas, tipoTablaJugadores) {
			switch (tipoTablaJugadores) {
				case TABLA_PLANTILLA_PROPIA: return columnas[12];
				case TABLA_PLANTILLA_AJENA: return columnas[13];
				case TABLA_CEDIDOS_PLANTILLA_PROPIA: return columnas[13];
				case TABLA_CEDIDOS_PLANTILLA_AJENA: return columnas[11];
			}
		}

		// Obtiene la columna que contiene la stat CONDUCCION.	
		function getColumnaConduccion(columnas, tipoTablaJugadores) {
			switch (tipoTablaJugadores) {
				case TABLA_PLANTILLA_PROPIA: return columnas[13];
				case TABLA_PLANTILLA_AJENA: return columnas[14];
				case TABLA_CEDIDOS_PLANTILLA_PROPIA: return columnas[14];
				case TABLA_CEDIDOS_PLANTILLA_AJENA: return columnas[12];
			}
		}
		
		// Obtiene la columna que contiene la stat DESMARQUE.	
		function getColumnaDesmarque(columnas, tipoTablaJugadores) {
			switch (tipoTablaJugadores) {
				case TABLA_PLANTILLA_PROPIA: return columnas[14];
				case TABLA_PLANTILLA_AJENA: return columnas[15];
				case TABLA_CEDIDOS_PLANTILLA_PROPIA: return columnas[15];
				case TABLA_CEDIDOS_PLANTILLA_AJENA: return columnas[13];
			}
		}
		// -----------------------------------------------------------------------------
		
		procesarCambioValorStat(getColumnaCalidad(columnasFila, tipoTablaJugadores), idJugador, "calidad", tipoTablaJugadores);
		procesarCambioValorStat(getColumnaResistencia(columnasFila, tipoTablaJugadores), idJugador, "resistencia", tipoTablaJugadores);
		procesarCambioValorStat(getColumnaVelocidad(columnasFila, tipoTablaJugadores), idJugador, "velocidad", tipoTablaJugadores);
		procesarCambioValorStat(getColumnaPase(columnasFila, tipoTablaJugadores), idJugador, "pase", tipoTablaJugadores);
		procesarCambioValorStat(getColumnaRemate(columnasFila, tipoTablaJugadores), idJugador, "remate", tipoTablaJugadores);
		procesarCambioValorStat(getColumnaTiro(columnasFila, tipoTablaJugadores), idJugador, "tiro", tipoTablaJugadores);
		procesarCambioValorStat(getColumnaEntradas(columnasFila, tipoTablaJugadores), idJugador, "entradas", tipoTablaJugadores);
		procesarCambioValorStat(getColumnaAgresividad(columnasFila, tipoTablaJugadores), idJugador, "agresividad", tipoTablaJugadores);
		procesarCambioValorStat(getColumnaConduccion(columnasFila, tipoTablaJugadores), idJugador, "conduccion", tipoTablaJugadores);
		procesarCambioValorStat(getColumnaDesmarque(columnasFila, tipoTablaJugadores), idJugador, "desmarque", tipoTablaJugadores);
		procesarCambioValorStat(getColumnaMediaReal(columnasFila, tipoTablaJugadores), idJugador, "mediareal", tipoTablaJugadores);
	}
	// Procesa el cambio de valor de la edad de un jugador.
	// ----------------------------------------------------------------------------------------------------
	function procesarCambioEdadJugador(idJugador, columnasFila, tipoTablaJugadores) {
		// Obtiene la columna que contiene la edad del jugador.	
		function getColumnaEdad(columnas, tipoTablaJugadores) {
			switch (tipoTablaJugadores) {
				case TABLA_PLANTILLA_PROPIA: return columnas[4];
				case TABLA_PLANTILLA_AJENA: return columnas[5];
				case TABLA_CEDIDOS_PLANTILLA_PROPIA: return columnas[3];
				case TABLA_CEDIDOS_PLANTILLA_AJENA: return columnas[3];
			}
		}
		// -----------------------------------------------------------------------------
		// Obtenemos la columna que contiene la edad.
		var columnaEdad = getColumnaEdad(columnasFila, tipoTablaJugadores);

		// Creamos un span para darle estilo a las semanas de la edad.
		var spanEdadSemanas = document.createElement("span");
		spanEdadSemanas.style.fontSize = "9px";
		spanEdadSemanas.appendChild(document.createTextNode(" (" + setCerosIzquierda(getListaJugadores(tipoTablaJugadores)[idJugador]["edadSemanas"], 2) + ")"));
		
		// Añadimos las semanas.
		getNodoPadrePrimeraHoja(columnaEdad).appendChild(spanEdadSemanas);	
	}
	// ----------------------------------------------------------------------------------------------------
	
	// Obtenemos todas las filas de la tabla de jugadores.
	var filasTablaJugadores;
	if (tipoTablaJugadores == TABLA_PLANTILLA_PROPIA || tipoTablaJugadores == TABLA_PLANTILLA_AJENA) {
		filasTablaJugadores = getTablaPlantilla().getElementsByTagName("tr");
	} else {
		filasTablaJugadores = getTablaCedidosPlantilla().getElementsByTagName("tr");
	}
	
	// Recorremos todas las filas de la tabla de jugadores (excepto la primera, que es la cabecera).
	for (var fila = 1; fila < filasTablaJugadores.length; fila++) {
		// Obtenemos el id del jugador actual.
		var columnasFila = filasTablaJugadores[fila].getElementsByTagName("td");
		var columnaIdJugador = getColumnaIdjugador(columnasFila, tipoTablaJugadores);
		var idJugador = extraerIdJugador(columnaIdJugador.getElementsByTagName("a")[0]);
		// Procesamos el cambio de sus stats.
		procesarCambiosStatsJugador(idJugador, columnasFila, tipoTablaJugadores);
		// Aprovechamos el mismo recorrido para procesar el cambio de edad de los jugadores (añadiendo las semanas).
		procesarCambioEdadJugador(idJugador, columnasFila, tipoTablaJugadores);
	}
	
	// Ajustamos estilos de tabla y contenedores.
	eliminarAnchosColumnaTabla(filasTablaJugadores[0]);
	ajustarEstilosContenedores();
}


function doMediasExactasPlantillas() {
	// ---------------------------------------------------------------------------------------------------
	// Función callback Ajax.
	function procesarMediasExactasPlantilla(idJugador, nada, html) {
		contJugadoresProcesadosAjax++;
		// Obtenemos y almacenamos el array de datos del jugador procesado.
		jugadores[idJugador] = extraerDatosJugador(html);
		// Cuando se haya procesado el último jugador, procedemos a repintar/modificar la pantalla.
		if (contJugadoresProcesadosAjax == contJugadoresEncontrados) {	
			pintarMediaRealPlantilla();
			modificarDOMTablaJugadores(isPaginaPlantillaPropia() ? TABLA_PLANTILLA_PROPIA : TABLA_PLANTILLA_AJENA);
			// Cuando tenemos todo el DOM modificado, mostramos la tabla.
			finalizarFeedbackProcesandoTabla("feedbackTablaPlantilla", getTablaPlantilla());
			// Si es una plantilla ajena, pintamos también el resumen económico.
			if (isPaginaPlantillaAjena() && ACTIVAR_OPCION_RESUMEN_ECONOMICO_PLANTILLAS) {
				doResumenEconomicaPlantilla();
			}
		}
	}
	
	// Calcula la media real de las medias reales de los jugadores.
	function calcularMediaRealPlantilla() {
		var sumaMediasReales = 0;
		var numeroJugadores = 0;
		for (jugador in jugadores) {
			numeroJugadores++;
			sumaMediasReales = sumaMediasReales + jugadores[jugador]["mediareal"];
		}
		return sumaMediasReales/numeroJugadores;
	}
	
	// Pinta la media real de la plantilla (junto al encabezado de la página). 
	function pintarMediaRealPlantilla() {
		var tituloPlantilla = (urlVisitada[0] == urlStatsPlantillaPropia) ? getContenidoPagina().getElementsByTagName("h1")[0] : 
																			getContenidoPagina().getElementsByTagName("h2")[0];
		var spanMediaRealPlantilla = document.createElement("span");
		spanMediaRealPlantilla.id = "textoMediaRealPlantilla";
		spanMediaRealPlantilla.style.fontWeight = "bold";
		var mediaRealPlantilla = document.createTextNode(" (MR: " + toStringConNDecimales(calcularMediaRealPlantilla(), 2) + ")");
		spanMediaRealPlantilla.appendChild(mediaRealPlantilla);
		tituloPlantilla.appendChild(spanMediaRealPlantilla);
	}
	// ----------------------------------------------------------------------------------------------------
	
	// 1. Ocultamos los jugadores de la plantilla.
	mostrarFeedbackProcesandoTabla("feedbackTablaPlantilla", "Procesando medias exactas de plantilla...", getTablaPlantilla());
	
	// 2. Procesamos todos los jugadores y pintamos sus medias exactas.
	procesarJugadores(true, procesarMediasExactasPlantilla);
}


function doMediasExactasCedidosPlantillas() {
	// ----------------------------------------------------------------------------------------------------
	// Función callback Ajax.
	function procesarMediasExactasCedidosPlantilla(idJugador, nada, html) {
		contJugadoresCedidosProcesadosAjax++;
		// Obtenemos y almacenamos el array de datos del jugador procesado.
		jugadoresCedidos[idJugador] = extraerDatosJugador(html);
		// Cuando se haya procesado el último jugador, procedemos a repintar/modificar la pantalla.
		if (contJugadoresCedidosProcesadosAjax == contJugadoresCedidosEncontrados) {
			modificarDOMTablaJugadores(isPaginaCedidosPlantillaPropia() ? TABLA_CEDIDOS_PLANTILLA_PROPIA : TABLA_CEDIDOS_PLANTILLA_AJENA);
			// Cuando tenemos todo el DOM modificado, mostramos la tabla.
			finalizarFeedbackProcesandoTabla("feedbackTablaCedidosPlantilla", getTablaCedidosPlantilla());
		}
	}
	// ----------------------------------------------------------------------------------------------------
	
	// 1. Ocultamos los jugadores cedidos.
	mostrarFeedbackProcesandoTabla("feedbackTablaCedidosPlantilla", "Procesando medias exactas de jugadores cedidos...", getTablaCedidosPlantilla());
	
	// 2. Procesamos todos los jugadores y pintamos sus medias exactas.
	if (procesarJugadores(false, procesarMediasExactasCedidosPlantilla) == 0) {
		finalizarFeedbackProcesandoTabla("feedbackTablaCedidosPlantilla", getTablaCedidosPlantilla());
	}
}

		
function doResumenEconomicaPlantilla() {
	// ----------------------------------------------------------------------------------------------------
	// Función callback Ajax.
	function procesarResumenEconomicoPlantilla(idJugador, nada, html) {
		contJugadoresProcesadosAjax++;
		// Obtenemos y almacenamos el array de datos del jugador procesado.
		jugadores[idJugador] = extraerDatosJugador(html);
		// Cuando se haya procesado el último jugador, procedemos a pintar el resumen económico.
		if (contJugadoresProcesadosAjax == contJugadoresEncontrados) {	
			pintarResumenEconomico();
		}
	}
	
	// Pinta el resumen económico de la plantilla en una tabla.
	function pintarResumenEconomico() {
		var sumaClausulas = 0;
		var sumaFichasJornada = 0;
		var sumaFichasTemporada = 0;
		
		// Preparamos el nombre de las columnas de la tabla.
		var columnasTabla = new Array();
		columnasTabla[0] = "VALOR TOTAL";
		columnasTabla[1] = "FICHAS TEMPORADA";
		columnasTabla[2] = "FICHAS JORNADA";
		
		// Preparamos los datos de las filas de la tabla.
		var datosTabla = new Array();
		for (jugador in jugadores) {
			sumaClausulas = sumaClausulas + jugadores[jugador]["clausula"];
			sumaFichasJornada = sumaFichasJornada + jugadores[jugador]["fichaJornada"];
			sumaFichasTemporada = sumaFichasTemporada + jugadores[jugador]["fichaTemporada"];
		}
		datosTabla[0] = new Array(
									replaceAll(toStringConNDecimales((sumaClausulas/1000000), NUMERO_DECIMALES_RESUMEN_ECONOMICO) + "M", ".", ","), 
									replaceAll(toStringConNDecimales((sumaFichasTemporada/1000000), NUMERO_DECIMALES_RESUMEN_ECONOMICO) + "M", ".", ","), 
									replaceAll(toStringConNDecimales((sumaFichasJornada/1000000), NUMERO_DECIMALES_RESUMEN_ECONOMICO) + "M", ".", ",")
								);

		// Pintamos la tabla resumen.
		pintarTablaDatos(columnasTabla, datosTabla, document.getElementById("feedbackResumenEconomicoPlantilla"));
	}
	// ----------------------------------------------------------------------------------------------------
	// 1. Mostramos feedback de la operación en curso.
	mostrarFeedbackProcesandoTabla("feedbackResumenEconomicoPlantilla", "Procesando resumen económico de plantilla...");
	
	// 2. Procesamos todos los jugadores y pintamos el resumen económico de la plantilla.
	if (jugadores.length == 0) {
		procesarJugadores(true, procesarResumenEconomicoPlantilla);
	} else {
		pintarResumenEconomico();
	}
}


function doBusquedaMediaRealConDecimales() {
	// Obtenemos uno de los deplegables que filtran las medias reales (cualquiera de los dos).
	var selectMediaRealMinima = document.getElementsByName("mediarealmin")[0];
	
	// Obtenemos al padre de los desplegables (td) y lo vaciamos.
	var padreSelects = selectMediaRealMinima.parentNode;
	vaciarContenedor(padreSelects);
	
	// Creamos campos de texto equivalentes a los desplegables borrados.
	var campoTextoMediaRealMinima = document.createElement("input");
	campoTextoMediaRealMinima.type = "text";
	campoTextoMediaRealMinima.name = "mediarealmin";
	campoTextoMediaRealMinima.size = "5"
	padreSelects.appendChild(campoTextoMediaRealMinima);
	
	padreSelects.appendChild(document.createTextNode(" a "));
	
	var campoTextoMediaRealMaxima = document.createElement("input");
	campoTextoMediaRealMaxima.type = "text";
	campoTextoMediaRealMaxima.name = "mediarealmax";
	campoTextoMediaRealMaxima.size = "5"
	padreSelects.appendChild(campoTextoMediaRealMaxima);
	
	// Sustituimos el action del formulario para que, por defecto, ordene los resultados de búsqueda por media real descendente.
	// Asimismo, validamos el valor de los nuevos campos.
	var formulario = document.getElementById("form1");
	formulario.action = "fichajes_lista.asp?reset=si&orden=mr%20desc";
	formulario.onsubmit = function() {  
		if (campoTextoMediaRealMinima.value.trim().length == 0) { campoTextoMediaRealMinima.value = 46; }
		if (campoTextoMediaRealMaxima.value.trim().length == 0) { campoTextoMediaRealMaxima.value = 99; }
		campoTextoMediaRealMinima.value = campoTextoMediaRealMinima.value.replace(",", ".");
		campoTextoMediaRealMaxima.value = campoTextoMediaRealMaxima.value.replace(",", ".");
	};
}


function doBusquedaPreciosMercadoFichaJugador() {
	var contEdadesEncontradas = 0;
	var contEdadesProcesadas = 0;
	var datosTablaPrecios;
	
	//-------------------------------------------------------------------------------------------------------------
	// Extrae el precio de mercado de los jugadores cuya media real se corresponda con la recibida.
	function extraerPrecioMercado(edad, media, html) {	
		// Limpiamos el HTML recibido.
		html = eliminarCaracteresInvisibles(html);
		// Obtenemos el HTML de la tabla de datos.
		var posicionInicioContenidoPagina = html.indexOf("<div id=\"content\">");
		var tablaDatos = html.substring(html.indexOf("<table", posicionInicioContenidoPagina), html.indexOf("</table>", posicionInicioContenidoPagina));
		// Comprobamos si el precio buscado (correspondiente a la media recibida) está disponible.
		var busquedaMedia = "\"><td align=center>" + media + "</td><td align=center>";
		if (tablaDatos.indexOf(busquedaMedia) != -1) {
			// Si existe la media, obtenemos todos los datos.
			// Número de operaciones.
			var posicionInicialNumeroOperaciones = tablaDatos.indexOf(busquedaMedia) + busquedaMedia.length;
			var posicionFinalNumeroOperaciones = tablaDatos.indexOf("</td><td align=right><a href=\"", posicionInicialNumeroOperaciones);
			var numeroOperaciones = tablaDatos.substring(posicionInicialNumeroOperaciones, posicionFinalNumeroOperaciones);
			// Precio medio de mercado.
			var busquedaInicioPrecioMercado = "\">";
			var posicionInicialPrecioMercado = tablaDatos.indexOf(busquedaInicioPrecioMercado, posicionFinalNumeroOperaciones) + busquedaInicioPrecioMercado.length;
			var posicionFinalPrecioMercado = tablaDatos.indexOf("</a>", posicionInicialPrecioMercado);
			var precioMercado = tablaDatos.substring(posicionInicialPrecioMercado, posicionFinalPrecioMercado-1);
			// Devolvemos un array con los tres datos de la tabla.	
			return new Array(edad, media, numeroOperaciones, precioMercado);
		} else {
			return null;
		}
	}	
	//-------------------------------------------------------------------------------------------------------------
	// Función callback Ajax.
	function buscarPreciosEdad(mediasEdad, edad, html) {
		// Incrementamos el número de edades procesadas.
		contEdadesProcesadas++;
		
		// Buscamos el precio de mercado de cada media asociada a la edad procesada.
		for (media in mediasEdad) {
			var precioMedia = extraerPrecioMercado(edad, mediasEdad[media], html);
			if (precioMedia != null) {
				datosTablaPrecios[datosTablaPrecios.length] = precioMedia;
			}
		}
		
		// Si ya hemos procesado todas las edades, pintamos la tabla de precios.
		if (contEdadesEncontradas == contEdadesProcesadas) {
			if (datosTablaPrecios.length > 0) {
				// Preparamos el nombre de las columnas de la tabla.
				var columnasTabla = new Array();
				columnasTabla[0] = "Edad";
				columnasTabla[1] = "Media real";
				columnasTabla[2] = "Operaciones";
				columnasTabla[3] = "Precio medio (€)";
				// Pintamos la tabla en el tooltip.
				pintarTablaDatos(columnasTabla, datosTablaPrecios, document.getElementById("divTooltip"));
			} else {
				document.getElementById("divTooltip").innerHTML = "<b>No se han encontrado datos de jugadores similares.</b>";
			}
		}
	}
	//-------------------------------------------------------------------------------------------------------------
	// Obtiene las edades y medias reales a las que buscar precios de mercado.
	// Combinaciones posibles:
	// 1. [trunc(edad), trunc(mr)] -> Siempre
	// 2. [trunc(edad), round(mr)] -> Si (trunc(mr) != round(mr))
	// 3. [round(edad), trunc(mr)] -> Si (edadSemanas > 28)
	// 4. [round(edad), round(mr)] -> Si (edadSemanas > 28) y (trunc(mr) != round(mr))
	function obtenerEdadesYMedias(datosJugador) {
		var edadesMedias = new Array(); 
		var mediasEdad = new Array(); 
		var mediasEdadSuperior = new Array();
		
		// Obtenemos las edades y la media real.
		var edad = parseInt(datosJugador["edad"]);
		var edadSemanas = parseInt(datosJugador["edadSemanas"]);
		var mediaReal = parseFloat(datosJugador["mediareal"]);

		// Obtenemos las medias reales a buscar para la edad del jugador.
		mediasEdad[0] = truncar(mediaReal);
		if (redondear(mediaReal, 0) != mediasEdad[0]) {
			mediasEdad[1] = redondear(mediaReal, 0); 
		}
		edadesMedias[edad] = mediasEdad;
		
		// Si procede, obtenemos las medias reales a buscar para la edad del jugador reondeada.
		if (edadSemanas > 28) {
			mediasEdadSuperior[0] = truncar(mediaReal);
			if (redondear(mediaReal, 0) != mediasEdadSuperior[0]) {
				mediasEdadSuperior[1] = redondear(mediaReal, 0); 
			}
			edadesMedias[edad+1] = mediasEdadSuperior;
		}
		
		return edadesMedias;	
	} 
	//-------------------------------------------------------------------------------------------------------------
	// Procesa la búsqueda de edades y medias reales a las que buscar precios de mercado.
	function procesarBusquedaPreciosMercado(datosJugador) {
		// Obtenemos los datos de búsqueda.
		var edadesMedias = obtenerEdadesYMedias(datosJugador);
		for (edad in edadesMedias) {
			// Obtenemos la tabla de datos/precios de cada edad mediante una petición Ajax a la página correspondiente.
			contEdadesEncontradas++;
			get(extraerDominioPcLigaDeURL() + "mercado_baremador.asp?edad=" + edad, buscarPreciosEdad, edadesMedias[edad], edad);
		}
	}	
	//-------------------------------------------------------------------------------------------------------------

	// Accedemos a la tabla que contiene el precio estimado del jugador.
	var tablaPrecioEstimado = getContenidoPagina().getElementsByTagName("table")[0].getElementsByTagName("table")[1];
	
	// Accedemos a la columna de la tabla.
	var columnaTablaPrecioEstimado = tablaPrecioEstimado.rows[1].cells[1];
	
	// Creamos el tooltip que almacenará los resultados de la búsqueda.
	crearDivTooltip();
	
	// Creamos la imagen que será el punto de entrada de la búsqueda.
	var imagenBusqueda = document.createElement("img");
	imagenBusqueda.title = "Buscar precios mercado jugadores similares";
	imagenBusqueda.src = "http://cdn.imghack.se/images/83d428d7f3276d8ecf766a6275a89f76.png";
	
	// Creamos el enlace que envuelve a la imagen anterior.
	var enlaceBusqueda = document.createElement("a");
	enlaceBusqueda.href = "#";
	enlaceBusqueda.onclick = function() { 
		// Reseteamos el array de datos.
		datosTablaPrecios = new Array();
		// Mostramos un tooltip de feedback.
		mostrarTooltip("<b>Buscando precios mercado...</b>", this); 
		// Iniciamos el proceso de búsqueda.
		procesarBusquedaPreciosMercado(jugador); 
	};
	enlaceBusqueda.appendChild(imagenBusqueda);

	// Añadimos el enlace a la columna de la tabla.
	columnaTablaPrecioEstimado.appendChild(document.createTextNode(" "));
	columnaTablaPrecioEstimado.appendChild(enlaceBusqueda);
}


function doEdadResetFichaJugador() {
	//-------------------------------------------------------------------------------------------------------------
	// Obtiene la edad que tendrá el jugador el día del reset a partir de su edad actual y los días que faltan hasta el reset.
	function getEdadJugadorReset(numDiasReset) {
		// Obtenemos los datos actuales del jugador.
		var edad = jugador["edad"];
		var semanas = jugador["edadSemanas"];
		var esJuvenil = jugador["esJuvenil"];
		
		// Sumamos los días que faltan hasta el reset al número de semanas del jugador.
		semanas = semanas + numDiasReset;
		
		// Si el número de semanas anterior implica que cumple edad, adaptamos los nuevos datos.
		if (esJuvenil) {
			if (semanas >= SEMANAS_ANIO_JUGADOR_JUVENIL) {
				semanas = semanas - SEMANAS_ANIO_JUGADOR_JUVENIL;
				edad = edad + 1;
			}		
		} else {
			if (semanas >= SEMANAS_ANIO_JUGADOR_SENIOR) {
				semanas = semanas - SEMANAS_ANIO_JUGADOR_SENIOR;
				edad = edad + 1;
			}
		}
		
		return {edad: edad, semanas: semanas};
	}
	
	//-------------------------------------------------------------------------------------------------------------
	// Extrae la fecha del último reset a partir del html que contiene el palmarés de una liga.
	function extraerFechaUltimoReset(html) {
		// Limpiamos el HTML recibido.
		html = eliminarCaracteresInvisibles(html);
		
		// Obtenemos el HTML de la tabla de datos.
		var posicionInicioContenidoPagina = html.indexOf("<div id=\"content\">");
		var tablaDatos = html.substring(html.indexOf("<table", posicionInicioContenidoPagina), html.indexOf("</table>", posicionInicioContenidoPagina));
		
		// Obtenemos la fila de la tabla que contiene la fecha buscada (segunda fila).
		var busquedaFinalPrimeraFila = "</tr>";
		var posicionFinalPrimeraFila = tablaDatos.indexOf(busquedaFinalPrimeraFila) + busquedaFinalPrimeraFila.length;
		var filaDatos = tablaDatos.substring(tablaDatos.indexOf("<tr", posicionFinalPrimeraFila), tablaDatos.indexOf("</tr>", posicionFinalPrimeraFila)); 
		
		// Obtenemos la fecha buscada (texto de primera columna de fila).
		return filaDatos.substring(filaDatos.indexOf("</td>") - 10, filaDatos.indexOf("</td>"));
	}
	
	//-------------------------------------------------------------------------------------------------------------
	// Función callback Ajax.
	// Obtiene la edad que tendrá el jugador en el momento del próximo reset, y la pinta en su ficha.
	function procesarEdadJugadorReset(nada, nada, html) {
		// Obtenemos la fecha del último reset.
		var fechaUltimoReset = new Date(transformarFechaAFormatoIngles(extraerFechaUltimoReset(html)) + " 00:00:00");
		// A partir de la fecha anterior, calculamos la fecha del próximo reset.
		var fechaProximoReset = getFechaProximoReset(fechaUltimoReset);
		
		// Obtenemos la fecha actual.
		var fechaActual = new Date();
		
		// Obtenemos la diferencia días entre hoy y la fecha del próximo reset.
		var numDiasReset = getNumDiasEntreFechas(fechaActual, fechaProximoReset);

		// Si no es el último día, obtenemos la parte entera y sumamos una unidad.
		// En caso contrario, establecemos 0.
		(numDiasReset > 0) ? numDiasReset = truncar(numDiasReset) + 1 : numDiasReset = 0; 
		
		// Obtenemos la edad que tendrá el jugador transcurridos los días anteriores.
		var edadReset = getEdadJugadorReset(numDiasReset);
		var textoEdadReset = edadReset.edad + " AÑOS (Y " + edadReset.semanas + " SEMANAS)";

		// Accedemos a la tabla que contiene la edad del jugador.
		var tablaEdad = getContenidoPagina().getElementsByTagName("table")[0].getElementsByTagName("table")[0];
		
		// Creamos una nueva fila, con dos columnas, para la edad del reset.
		var filaEdadReset = document.createElement("tr");
		
		var columnaNombreEdadReset = document.createElement("td");
		var textoColumnaNombreEdadReset = document.createTextNode("Edad reset:");
		columnaNombreEdadReset.appendChild(textoColumnaNombreEdadReset);
		
		var columnaValorEdadReset = document.createElement("td");
		columnaValorEdadReset.style.color = "green";
		var textoColumnaValorEdadReset = document.createTextNode(textoEdadReset);
		columnaValorEdadReset.appendChild(textoColumnaValorEdadReset);
		
		filaEdadReset.appendChild(columnaNombreEdadReset);
		filaEdadReset.appendChild(columnaValorEdadReset);

		// Colocamos la fila anterior a continuación de la fila que contiene la edad.
		tablaEdad.rows[1].parentNode.insertBefore(filaEdadReset, tablaEdad.rows[1]);
	}
	//-------------------------------------------------------------------------------------------------------------

	get(extraerDominioPcLigaDeURL() + "palmares_grupo.asp?grupo=1", procesarEdadJugadorReset, '', '');
}


function doRenovacionOptima() {
	// Obtiene la ficha óptima de renovación.
	//-------------------------------------------------------------------------------------------------------------
	function getFichaRenovacionOptima(edad, fichaActual, clausula) {
		var nuevaFicha = 0;
				
		// A) Si tiene menos de 28 años, pide un incremento en función de su cláusula. 
		if (edad < 28) {
			var incrementoFicha = 0;
			if (clausula <= 30000000) { incrementoFicha = 1.18; }
			if (clausula > 30000000 && clausula <= 50000000) { incrementoFicha = 1.23; }
			if (clausula > 50000000 && clausula <= 70000000) { incrementoFicha = 1.28; }
			if (clausula > 70000000 && clausula <= 90000000) { incrementoFicha = 1.33; }
			if (clausula > 90000000) { incrementoFicha = 1.38; }
			nuevaFicha = (incrementoFicha * fichaActual) + 0.01;
		}

		// B) Si tiene entre 28 y 30 años, se mantiene la ficha.
		if (edad >= 28 && edad <= 30) { nuevaFicha = fichaActual; }
		
		// C) Si tiene más de 30 años, admite un decremento del 10%.
		if (edad > 30) { nuevaFicha = (0.9 * fichaActual) + 0.01; }

		return nuevaFicha;
	}
	//-------------------------------------------------------------------------------------------------------------
	// Obtiene la cláusula óptima de renovación.
	// Edad >= 28 -> Misma cláusula.
	// Edad < 28 -> 15% de aumento - 0.01€.
	function getClausulaRenovacionOptima(edad, clausulaActual) {
		return (edad >= 28) ? clausulaActual : clausulaActual + ((0.15 * clausulaActual) - 0.01);
	}	
	//-------------------------------------------------------------------------------------------------------------
	// Obtenemos los valores exactos de cláusula y ficha.
	var clausulaExactaActual = parseFloat(document.getElementsByName("rescision")[0].value.replace(",", "."));
	var fichaExactaActual = parseFloat(document.getElementsByName("ofertajugador")[0].value.replace(",", "."));
	
	// Obtenemos los valores óptimos de renovación de cláusula y ficha.
	var clausulaRenovacionOptima = redondear(getClausulaRenovacionOptima(jugador["edad"], clausulaExactaActual), 2);
	var fichaRenovacionOptima = redondear(getFichaRenovacionOptima(jugador["edad"], fichaExactaActual, clausulaRenovacionOptima), 2);
	
	var tablaDatosRenovacion = getContenidoPagina().getElementsByTagName("form")[0].getElementsByTagName("table")[0];
	
	// Creamos una columna con el dato de la cláusula óptima de renovación.
	var filaClausulaTablaDatosRenovacion = tablaDatosRenovacion.rows[0];
	var columnaClausulaTablaDatosRenovacion = document.createElement("td");
	columnaClausulaTablaDatosRenovacion.style.backgroundColor = "rgb(253,225,226)";
	columnaClausulaTablaDatosRenovacion.innerHTML = "Óptima: <b>" + clausulaRenovacionOptima.toString().replace(".", ",") + "</b> €";
	filaClausulaTablaDatosRenovacion.appendChild(columnaClausulaTablaDatosRenovacion);
	
	// Creamos una columna con el dato de la ficha óptima de renovación.
	var filaFichaTablaDatosRenovacion = tablaDatosRenovacion.rows[1];
	var columnaFichaTablaDatosRenovacion = document.createElement("td");
	columnaFichaTablaDatosRenovacion.style.backgroundColor = "rgb(253,225,226)";
	columnaFichaTablaDatosRenovacion.innerHTML = "Óptima: <b>" + fichaRenovacionOptima.toString().replace(".", ",") + "</b> €";
	filaFichaTablaDatosRenovacion.appendChild(columnaFichaTablaDatosRenovacion);
	
	// Creamos una columna con un texto de warning.
	var filaWarningTablaDatosRenovacion = tablaDatosRenovacion.rows[2];
	var columnaWarningTablaDatosRenovacion = document.createElement("td");
	columnaWarningTablaDatosRenovacion.style.backgroundColor = "rgb(253,225,226)";
	columnaWarningTablaDatosRenovacion.style.color = "red";
	columnaWarningTablaDatosRenovacion.innerHTML = "<i>Valores estimados</i>";
	filaWarningTablaDatosRenovacion.appendChild(columnaWarningTablaDatosRenovacion);
	
	// Creamos un nuevo botón que sirva para aplicar la renovación óptima.
	var ultimaFilaTablaDatosRenovacion = tablaDatosRenovacion.rows[tablaDatosRenovacion.rows.length-1];
	var botonRenovacionOptima = document.createElement("input");
	botonRenovacionOptima.type = "button";
	botonRenovacionOptima.value = "APLICAR RENOVACIÓN ESTIMADA";
	botonRenovacionOptima.onclick = function() { 
		 document.getElementsByName("rescision")[0].value = clausulaRenovacionOptima.toString().replace(".", ",");
		 document.getElementsByName("ofertajugador")[0].value = fichaRenovacionOptima.toString().replace(".", ",");
	};
	var columnaBotonRenovacionOptima = document.createElement("td");
	columnaBotonRenovacionOptima.appendChild(botonRenovacionOptima);
	ultimaFilaTablaDatosRenovacion.appendChild(columnaBotonRenovacionOptima);
}


function doWarningEFAlineacion() {
	var EFMuyBuena = "Muy buena";
	var EFBuena = "Buena";
	var EFRegular = "Regular";
	var EFMala = "Mala";
	
	//-------------------------------------------------------------------------------------------------------------
	// Devuelve el estado de EF (muy buena, buena, regular o mala) a partir del valor exacto de EF del jugador.
	function getEstadoEF(valorEF) {
		var estadoEF = EFMuyBuena;
		if (valorEF <= VALOR_LIMITE_EF_MALA) {
			estadoEF = EFMala;
		}
		if (valorEF > VALOR_LIMITE_EF_MALA && valorEF <= VALOR_LIMITE_EF_REGULAR) {
			estadoEF = EFRegular;
		}
		if (valorEF > VALOR_LIMITE_EF_REGULAR && valorEF <= VALOR_LIMITE_EF_BUENA) {
			estadoEF = EFBuena;
		}
		return estadoEF;
	}
	//-------------------------------------------------------------------------------------------------------------
	
	// 1. Obtenemos todas las celdas/columnas que almacenan el EF de los jugadores.
	var celdasEFJugador = getAllElementosConValorAtributo("td", "bgcolor", "#d0d0d0");
	
	// 2. Recorremos todas las celdas y establecemos colores según corresponda.
	for (celdaEFJugador in celdasEFJugador) {
		// 2.1. Obtenemos el valor de EF del jugador actual y vaciamos su contenedor.
		var valorEFJugadorActual = getNodoPadrePrimeraHoja(celdasEFJugador[celdaEFJugador]).firstChild.nodeValue;
		vaciarContenedor(celdasEFJugador[celdaEFJugador]);
		
		// 2.2. Obtenemos el estado de EF en función del valor anterior.
		var estadoEFJugadorActual = getEstadoEF(parseInt(valorEFJugadorActual));
		
		// 2.3. Creamos un span que envuelva al valor de EF y que contenga un atributo "title" a modo de leyenda.
		var spanEFJugadorActual = document.createElement("span");
		spanEFJugadorActual.title = estadoEFJugadorActual;
		var textoEF = document.createTextNode(valorEFJugadorActual);
		spanEFJugadorActual.appendChild(textoEF);
		celdasEFJugador[celdaEFJugador].appendChild(spanEFJugadorActual);
		
		// 2.4. Ponemos fondo blanco y negrita a la celda del jugador.
		celdasEFJugador[celdaEFJugador].style.backgroundColor = "rgb(238,238,238)";
		celdasEFJugador[celdaEFJugador].style.fontWeight = "bold";
		
		// 2.5. En función del estado de EF, pintamos el valor en uno u otro color.
		switch (estadoEFJugadorActual) {
			case EFMuyBuena:	celdasEFJugador[celdaEFJugador].style.color = COLOR_EF_MUYBUENA; break;
			case EFBuena:		celdasEFJugador[celdaEFJugador].style.color = COLOR_EF_BUENA; break;
			case EFRegular: 	celdasEFJugador[celdaEFJugador].style.color = COLOR_EF_REGULAR; break;
			case EFMala:		celdasEFJugador[celdaEFJugador].style.color = COLOR_EF_MALA; break;
		}
	}
}