// ==UserScript==
// @name          PcLigaTools 3.6.2
// @namespace     http://userscripts.org
// @description   Script para mejorar las caracteristicas de PcLiga.com
// @include       http://www.pcliga.com/*
// @include       http://pcliga.com/*
// ==/UserScript==


var urlEquipoVecino="pcliga.com/clasificacion_verequipo.asp";
var urlEquipoPropio="pcliga.com/plantilla_lista.asp";
var quitarHTTP= document.location.href.replace("http://","");
var quitarWWW= quitarHTTP.replace("www.","");
var urlVisitada=quitarWWW.split("?");
var urlBuscarJugadores="pcliga.com/fichajes_lista.asp";
var urlAlineacion="pcliga.com/alineacion_lista.asp";
var urlValores="pcliga.com/mercadovalores_cartera_micartera.asp";
var urlBuscarValores="pcliga.com/mercadovalores_buscar_ok.asp";

//buscar valores edicion pendejo
if(urlVisitada[0]==urlBuscarValores){
    var InicioAzulNegrita='<font color="blue"><b>';
    var FinalColorNegrita='</b></font>';
    var primero=1;
    var allHTMLTags=document.getElementsByTagName("*");
    for (var i=1; i<allHTMLTags.length; i++) {
        if (allHTMLTags.className=="textonoticias"){
            for (var j=1;j<allHTMLTags.rows.length;j++){
                var equipo =      allHTMLTags.rows[j].cells[0].firstChild.firstChild.nodeValue;
                var propietario = allHTMLTags.rows[j].cells[1].firstChild.firstChild.nodeValue;
                if(equipo == propietario){
                    allHTMLTags.rows[j].cells[0].innerHTML=InicioAzulNegrita+allHTMLTags.rows[j].cells[0].innerHTML+FinalColorNegrita;
                    allHTMLTags.rows[j].cells[1].innerHTML=InicioAzulNegrita+allHTMLTags.rows[j].cells[1].innerHTML+FinalColorNegrita;
                    allHTMLTags.rows[j].cells[2].innerHTML=InicioAzulNegrita+allHTMLTags.rows[j].cells[2].innerHTML+FinalColorNegrita;
                    allHTMLTags.rows[j].cells[3].innerHTML=InicioAzulNegrita+allHTMLTags.rows[j].cells[3].innerHTML+FinalColorNegrita;
                    allHTMLTags.rows[j].cells[4].innerHTML=InicioAzulNegrita+allHTMLTags.rows[j].cells[4].innerHTML+FinalColorNegrita;
                    allHTMLTags.rows[j].cells[5].innerHTML=InicioAzulNegrita+allHTMLTags.rows[j].cells[5].innerHTML+FinalColorNegrita;
                }
            }
            
        }
    }
}



//MR JUGADOR
var urlPropio="pcliga.com/plantilla_infojugador.asp";
var urlVecino="pcliga.com/fichajes_infojugador.asp";
var urlRenovar="pcliga.com/plantilla_renovar_haceroferta.asp";
var urlEstimarValor="pcliga.com/plantilla_renovar_estimarvalor.asp";
var urlEntrenar="pcliga.com/plantilla_entrenarstats.asp";
var urlOfertaVecino="pcliga.com/fichajes_cedido_haceroferta.asp";
var urlRenovarCedido="pcliga.com/plantilla_cedido_renovar_haceroferta.asp";

if(urlVisitada[0]==urlPropio || urlVisitada[0]==urlVecino || urlVisitada[0]==urlRenovar || urlVisitada[0]==urlEstimarValor || urlVisitada[0]== urlEntrenar  || urlVisitada[0]==urlOfertaVecino || urlVisitada[0]==urlRenovarCedido)
{
	var allHTMLTags=document.getElementsByTagName("*");
	var numValores=0;
	var totalValores=0;
	var mr=0;
	var salir=false;
	
	for (var i=0; i<allHTMLTags.length; i++) 
	{
		
									
		if(allHTMLTags[i].className=="cuadroinfojugador" && allHTMLTags[i].rows.length==12)
		{
			
			for(var j=0;j<10;j++)
			{	
	
				var partesCadena=allHTMLTags[i].rows[j].innerHTML.split(";");
				var valor=partesCadena[2].split("<");
				totalValores=totalValores+parseFloat(valor[0].replace(",", "."));
			}
				
			mr=totalValores/10;
			mr=mr.toFixed(2);
			salir=true;
		}

		if(allHTMLTags[i].innerHTML=="Media Real")
		{
			if(allHTMLTags[i+1].className=="cuadroinfojugador")
			{
				var cadena='<td style="font-size: 59px;" align="center" height="66" width="100%">91</td>';
				var finalCadena='</td>';
				var partesCadena=cadena.split(">");
				var primeraParte=partesCadena[0];
				var cadenaFinal=primeraParte+">"+mr+finalCadena;
				allHTMLTags[i+1].rows[0].innerHTML=cadenaFinal;
			}
			
			if(salir)
				i=allHTMLTags.length;
		}
			
	}	
	
}


//RENOVACION OPTIMA


if(urlVisitada[0]==urlRenovar || urlVisitada[0]==urlRenovarCedido)
{
	var rojaNegritaOn='<font color="red"><b>';
	var rojaNegritaOff='</b></font>';
	var edad=0;
	var form=document.getElementsByName("comprar");
	if(urlVisitada[0]==urlRenovar)
	{	var clausula=parseFloat(form[0].elements[2].value.replace(",", "."));
		var ficha=parseFloat(form[0].elements[3].value.replace(",", "."));
	}
	else
	{
		var clausula=parseFloat(form[0].elements[3].value.replace(",", "."));
		var ficha=parseFloat(form[0].elements[4].value.replace(",", "."));
	}
	var allHTMLTags=document.getElementsByTagName("*");
	
	
	var salir=false;
	
	for (var i=0; i<allHTMLTags.length; i++) 
	{
		if(allHTMLTags[i].className=="cuadroinfojugador" && allHTMLTags[i].rows.length==8)
		{
			var fila=allHTMLTags[i].rows[0];
			var edadVector=allHTMLTags[i].rows[0].cells[1].innerHTML.split("&");
			edad=edadVector[0];
			salir=true;
		}
		
		if(allHTMLTags[i].className=="cuadroinfojugador" && (allHTMLTags[i].rows.length==4 || allHTMLTags[i].rows.length==5))
		{
			var nuevaClausula=redondear(getClausulaRenovacion(edad,clausula));
			var nuevaFicha=redondear(getFichaRenovacion(edad,nuevaClausula,ficha));
			allHTMLTags[i].rows[0].cells[1].innerHTML+="  -- RENOVACION OPTIMA -->  "+rojaNegritaOn+nuevaClausula+ " Euros"+rojaNegritaOff;
			allHTMLTags[i].rows[1].cells[1].innerHTML+="  -- RENOVACION OPTIMA -->  "+rojaNegritaOn+nuevaFicha+ " Euros"+rojaNegritaOff;
			
			if(salir)
				i=allHTMLTags.length;
		}
	}
	
}




function getFichaRenovacion(edad,clausula,fichaActual)
{
	var nuevaFicha=0;
		
	if(edad<=27)
	{
		if(clausula<=30000000)
		{
			nuevaFicha=fichaActual+((fichaActual*18)/100);
		}
		if(clausula>30000000 && clausula<=50000000)
		{
			nuevaFicha=fichaActual+((fichaActual*23)/100);
		}
		if(clausula>50000000 && clausula<=70000000)
		{
			nuevaFicha=fichaActual+((fichaActual*28)/100);
		}
		if(clausula>70000000 && clausula<=90000000)
		{
			nuevaFicha=fichaActual+((fichaActual*33)/100);
		}
		if(clausula>90000000)
		{
			nuevaFicha=fichaActual+((fichaActual*38)/100);
		}
	}
	if(edad>27 && edad<=30)
	{
		nuevaFicha=fichaActual;
	}
	if(edad>30)
	{
		nuevaFicha=fichaActual-((fichaActual*10)/100);
	}
	
	return nuevaFicha;
}

function getClausulaRenovacion(edad,clausulaActual)
{
	var nuevaClausula=0;
	
	if(edad<=27)
		nuevaClausula=clausulaActual+(((clausulaActual*15)/100)-0.01);
	else
		nuevaClausula=clausulaActual;
		
	return nuevaClausula;
}



function redondear(num)
{ 		
	var original=parseFloat(num);
	if ((original*100%100)>=0.5)
	{
		var result=Math.round(original*100)/100+0.01;
	}
	else
	{
		var result=Math.round(original*100)/100; 		
	}
	
	result=result.toFixed(2);
	return result;
}




// FICHAJE OPTIMO

var urlFichaje="pcliga.com/fichajes_haceroferta.asp";


if(urlVisitada[0]==urlFichaje || urlVisitada[0]==urlOfertaVecino)
{

	var rojaNegritaOn='<font color="red"><b>';
	var rojaNegritaOff='</b></font>';
	var allHTMLTags=document.getElementsByTagName("*");
	
	for (var i=1; i<allHTMLTags.length; i++) 
	{
		if(allHTMLTags[i].className=="cuadroinfojugador" && allHTMLTags[i].rows.length==6 && allHTMLTags[i-1].tagName=="INPUT")
		{
			if(urlVisitada[0]==urlFichaje)
			{	var filaClausula=allHTMLTags[i].rows[2];
				var filaFicha=allHTMLTags[i].rows[1];
			}
			else
			{
				var filaClausula=allHTMLTags[i].rows[3];
				var filaFicha=allHTMLTags[i].rows[2];
			}
			
			//alert(filaFicha.cells[1].value);
			//alert(filaClausula.cells[1].innerHTML);
			
			var form=document.getElementsByName("comprar");
			
			
			
			var ficha=parseFloat(form[0].elements[2].value.replace(",", "."));
			var clausula=parseFloat(form[0].elements[3].value.replace(",", "."));
			var fichaNueva=redondear(getFichaFichaje(ficha));
			var clausulaNueva=redondear(getClausulaFichaje(clausula));
			
			//alert(filaFicha.cells[1].innerHTML);
			filaFicha.cells[1].innerHTML+="  -- FICHAJE OPTIMO -->  "+rojaNegritaOn+fichaNueva+ " Euros"+rojaNegritaOff;
			filaClausula.cells[1].innerHTML+="  -- FICHAJE OPTIMO -->  "+rojaNegritaOn+clausulaNueva+ " Euros"+rojaNegritaOff;
			
			i=allHTMLTags.length;
		}
	}
}



function getFichaFichaje(fichaActual)
{
	return (fichaActual+((fichaActual*10)/100));
}

function getClausulaFichaje(clausulaActual)
{
	return (clausulaActual+((clausulaActual*4)/100));
}




function doSomeRequest(servletName, servletArguments1,servletArguments2,servletArguments3){
	
    var servlet = servletName;                
    var arg1 = servletArguments1; 
	var arg2 = servletArguments2; 
	var arg3 = servletArguments3; 	
    var req = servlet + "?sctEdad=" + arg1+"&inpClausulaActual="+arg2+"&inpFichaActual="+arg3;            
    request=addrequest(req);                          
    request.onreadystatechange = function(){  
        
		//alert(request);
		//alert(req.responseText);
    }
}

function addrequest(req) {
    try {                                     //create a request for netscape, mozilla, opera, etc.
        request = new XMLHttpRequest();
    }catch (e) {

        try {                                 //create a request for internet explorer
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }catch (e) {                           //do some error-handling
            alert("XMLHttpRequest Error");
        }
    }

    request.open("GET", req, true);       //prepare the request
    request.send(null);  
	alert(request.responseText);
    return request;                           //return the request
}



// **************************************************************************************************************
// Nueva opción: Medias con decimales en la pantalla de plantilla (by Charmed :-)).

var urlPlantillaStats = "pcliga.com/plantilla_lista_stats.asp";

// Array para almacenar las medias exactas de los jugadores.
// Indice -> Id del jugador
// Valor -> Array de medias de stats (10 valores) + media real
var jugadores = new Array();

// Variables globales para llevar el recuento de jugadores encontrados y procesados.
var contJugadoresEncontrados = 0;
var contJugadoresProcesadosAjax = 0;

if (urlVisitada[0] == urlPlantillaStats) {	
	ocultarJugadores();
	procesarJugadores();
}

// Oculta todos los jugadores de la plantilla.
function ocultarJugadores() {
	var contenidoPagina = document.getElementById("content");
	// Ocultamos la tabla que contiene a todos los jugadores.
	contenidoPagina.getElementsByTagName("table")[0].style.display = "none";
	// Construimos un div con un texto de feedback para el usuario.
	var divFeedback = document.createElement("div");
	divFeedback.id = "textoFeedback";
	divFeedback.appendChild(document.createTextNode("Procesando medias exactas de plantilla..."));
	contenidoPagina.appendChild(divFeedback);
}

// Muestra todos los jugadores de la plantilla, una vez procesada ésta.
function mostrarJugadores() {
	// Ocultamos el div que contiene el texto de feedback.
	document.getElementById("textoFeedback").style.display = "none";
	// Mostramos la tabla de los jugadores.
	document.getElementById("content").getElementsByTagName("table")[0].style.display = "";
}

// Extrae el id de un jugador a partir del href de un enlace que lo incluye como último parámetro.
function extraerIdJugador(enlace) {
	return enlace.href.substring(enlace.href.indexOf("idjugador=") + 10);
}

// Procesa todos los jugadores de la plantilla.
function procesarJugadores() {
	// Obtenemos todos los enlaces de tipo jugador y hacemos peticiones ajax a sus fichas.
	var allEnlaces = document.getElementsByTagName("a");
	for (var e = 0; e < allEnlaces.length; e++) {
		var enlaceActual = allEnlaces[e];
		// Si es un enlace correspondiente a un jugador, lo procesamos.
		if (enlaceActual.href.indexOf("plantilla_infojugador.asp?idjugador=") != -1) {
			contJugadoresEncontrados++;
			get(enlaceActual.href, procesarJugador, extraerIdJugador(enlaceActual), '');
		}
	}
}

// Función callback Ajax.
// Una vez obtenidos los datos de un jugador, lo procesa.
function procesarJugador(idJugador, nada, html) {
	contJugadoresProcesadosAjax++;
	// Obtenemos y almacenamos el array de medias exactas del jugador procesado.
	jugadores[idJugador] = extraerMediasExactas(html);
	// Cuando se haya procesado el último jugador, procedemos a repintar/modificar la pantalla.
	if (contJugadoresProcesadosAjax == contJugadoresEncontrados) {	
		pintarMediaRealPlantilla();
		modificarDOMPantallaPlantilla();
	}
}

// -------------------------------------------------------------------------------------
// Funciones para procesar y modificar el DOM de la pantalla que muestra la plantilla.
// -------------------------------------------------------------------------------------

// Convierte a string con n decimales el valor recibido.
function toStringConNDecimales(valor, numeroDecimales) {
	return valor.toFixed(numeroDecimales).toString();
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
	var tituloPlantilla = document.getElementById("content").getElementsByTagName("h1")[0];
	var spanMediaRealPlantilla = document.createElement("span");
	spanMediaRealPlantilla.id = "textoMediaRealPlantilla";
	var mediaRealPlantilla = document.createTextNode(" (MR: " + toStringConNDecimales(calcularMediaRealPlantilla(), 2) + ")");
	spanMediaRealPlantilla.appendChild(mediaRealPlantilla);
	tituloPlantilla.appendChild(spanMediaRealPlantilla);
}

// Recibe un elemento contenedor y cambia su padding lateral.
function establecerPaddingLateralContenedor(contenedor, padding) {
	contenedor.style.paddingRight = padding;
	contenedor.style.paddingLeft = padding;
}

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
function procesarCambioValorStat(columnaContenedoraStat, idJugador, nombreStat) {
	// Tres casos
	// 1. Menor de 25 años y no entrenando stat.
	// 2. Menor de 25 años y entrenando stat.
	// 3. Mayor de 25 años.
	var enlacesColumnaStat = columnaContenedoraStat.getElementsByTagName("a");
	if (enlacesColumnaStat.length == 0) {
		// Caso 3: mayor de 25 años.
		modificarStat(columnaContenedoraStat, nombreStat, toStringConNDecimales(jugadores[idJugador][nombreStat], 2));
	} else {
		var fontColumnaStat = columnaContenedoraStat.getElementsByTagName("font");
		if (fontColumnaStat.length == 1) {
			// Caso 2: menor de 25 años y entrenando stat.
			modificarStat(columnaContenedoraStat.getElementsByTagName("b")[0], nombreStat, toStringConNDecimales(jugadores[idJugador][nombreStat], 2));
		} else {
			// Caso 1: menor de 25 años y no entrenando stat.
			modificarStat(columnaContenedoraStat.getElementsByTagName("a")[0], nombreStat, toStringConNDecimales(jugadores[idJugador][nombreStat], 2));
		}
		// Finalmente, aprovechamos para modificar el enlace al entrenamiento de la stat.
		modificarEnlaceStatEntrenamiento(columnaContenedoraStat.getElementsByTagName("a")[0]);
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

// Elimina el ancho de todas las columnas de tabla recibidas.
function eliminarAnchosColumnaTablaJugadores(filaCabeceraTabla) {
	var columnasTabla = filaCabeceraTabla.getElementsByTagName("td");
	for (var columna = 0; columna < columnasTabla.length; columna++) {
		columnasTabla[columna].width = "";
	}
}

// Ajusta el estilo de los div contenedores.
function ajustarEstilosContenedores() {
	// Ampliamos el ancho del bloque central y estrechamos el bloque derecho.
	document.getElementById("content").style.width = "720px";
	document.getElementById("subcontent").style.width = "100px";
	document.getElementById("subcontent").style.fontSize = "100%";
}

// Modifica el DOM de la pantalla estableciendo las nuevas medias con decimales.
function modificarDOMPantallaPlantilla() {
	// Obtenemos la tabla de jugadores y todas sus filas.
	var tablaJugadores = document.getElementById("content").getElementsByTagName("table")[0];
	var filasTablaJugadores = tablaJugadores.getElementsByTagName("tr");
	
	// Recorremos todas las filas de la tabla de jugadores (excepto la primera, que es la cabecera).
	for (var fila = 1; fila < filasTablaJugadores.length; fila++) {
		// Obtenemos el id del jugador actual.
		var columnasFila = filasTablaJugadores[fila].getElementsByTagName("td");
		var columnaIdJugador = columnasFila[3];
		var idJugador = extraerIdJugador(columnaIdJugador.getElementsByTagName("a")[0]);
		// Actualizamos el valor de las stats del jugador actual.
		procesarCambioValorStat(columnasFila[5], idJugador, "calidad");
		procesarCambioValorStat(columnasFila[6], idJugador, "resistencia");
		procesarCambioValorStat(columnasFila[7], idJugador, "velocidad");
		procesarCambioValorStat(columnasFila[8], idJugador, "pase");
		procesarCambioValorStat(columnasFila[9], idJugador, "remate");
		procesarCambioValorStat(columnasFila[10], idJugador, "tiro");
		procesarCambioValorStat(columnasFila[11], idJugador, "entradas");
		procesarCambioValorStat(columnasFila[12], idJugador, "agresividad");
		procesarCambioValorStat(columnasFila[13], idJugador, "conduccion");
		procesarCambioValorStat(columnasFila[14], idJugador, "desmarque");
		procesarCambioValorStat(columnasFila[16], idJugador, "mediareal");
	}
	
	// Ajustamos estilos de tabla y contenedores.
	eliminarAnchosColumnaTablaJugadores(filasTablaJugadores[0]);
	ajustarEstilosContenedores();
	
	// Cuando tenemos todo el DOM modificado, mostramos la tabla.
	mostrarJugadores();
}

// ----------------------------------------------------------------------------------
// Funciones para procesar y extraer datos del HTML de las fichas de los jugadores.
// ----------------------------------------------------------------------------------

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
	var posFinalStat = html.indexOf("</font></td></tr>", html.indexOf(stat.toUpperCase() + ":</td><td>")); 
	return parseFloat(html.substring(posFinalStat-5, posFinalStat).replace(",", "."));
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

// Comprueba si el jugador actual es portero.
function esPortero(html) {
	return html.indexOf("<tr><td>Rol:</td><td>PORTERO</td></tr>") != -1;
}

// Extrae las medias exactas de las stats de un jugador.
function extraerMediasExactas(html) {
	return esPortero(html) ? extraerMediasExactasPortero(html) : extraerMediasExactasJugador(html);
}

// -------------------------------------------------------------------------------------
// Funciones para procesar el entrenamiento de las stats mediante Ajax.
// -------------------------------------------------------------------------------------

// Obtiene el enlace a la stat de entrenamiento del jugador recibido.
function getEnlaceStatEntrenandoJugador(idJugador) {
	// Obtenemos todos los enlaces de la tabla de jugadores.
	var tablaJugadores = document.getElementById("content").getElementsByTagName("table")[0];
	var allEnlacesJugadores = tablaJugadores.getElementsByTagName("a");
	for (var e = 0; e < allEnlacesJugadores.length; e++) {
		var enlace = allEnlacesJugadores[e];
		// Si es un enlace del jugador y el texto está con la etiqueta "font", es el enlace buscado.
		if (enlace.title.indexOf("&idjugador=" + idJugador) != -1 && enlace.getElementsByTagName("font").length == 1) {
			return enlace;
		}
	}
}

// Obtiene el enlace a la nueva stat de entrenamiento correspondiente al href recibido.
function getEnlaceStatNuevaEntrenamientoJugador(hrefEnlaceStatNueva) {
	// Obtenemos todos los enlaces de la tabla de jugadores.
	var tablaJugadores = document.getElementById("content").getElementsByTagName("table")[0];
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
	if (enlaceStatNueva.title != enlaceStatAnterior.title) {
		get(enlaceStatNueva.title, actualizarStatEntrenamiento, enlaceStatNueva, enlaceStatAnterior);
	}
}

// Función callback Ajax.
// Acualiza la stat que entrena el jugador.
function actualizarStatEntrenamiento(enlaceStatNueva, enlaceStatAnterior, html) {
	// Eliminamos la "font red" de la stat anterior.
	var valorStatAnteriorParteEntera = enlaceStatAnterior.getElementsByTagName("b")[0].childNodes[0];
	var valorStatAnteriorParteDecimal = enlaceStatAnterior.getElementsByTagName("b")[0].childNodes[1];
	enlaceStatAnterior.removeChild(enlaceStatAnterior.firstChild);
	enlaceStatAnterior.appendChild(valorStatAnteriorParteEntera);
	enlaceStatAnterior.appendChild(valorStatAnteriorParteDecimal);
	
	// Añadimos color rojo y negrita a la nueva stat.
	var valorStatNuevaParteEntera = enlaceStatNueva.childNodes[0];
	var valorStatNuevaParteDecimal = enlaceStatNueva.childNodes[1];
	while (enlaceStatNueva.firstChild) { enlaceStatNueva.removeChild(enlaceStatNueva.firstChild); };
	var fontColorRojo = document.createElement("font");
	fontColorRojo.color = "red";
	var textoNegrita = document.createElement("b");
	fontColorRojo.appendChild(textoNegrita);
	textoNegrita.appendChild(valorStatNuevaParteEntera);
	textoNegrita.appendChild(valorStatNuevaParteDecimal);
	enlaceStatNueva.appendChild(fontColorRojo);
}

// -------------------------------------------------------------------------------------
// Ajax.
// -------------------------------------------------------------------------------------

// Peticion Ajax.
// Recibe: URL, función de callback y parámetros de entrada de dicha función.	
function get(url, callback, callbackParam1, callbackParam2) {
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(xhr) { callback(callbackParam1, callbackParam2, xhr.responseText) }
    })
}

// **************************************************************************************************************