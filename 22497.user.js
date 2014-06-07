// ==UserScript==
// @name Travian3 WW
// @author Hora_ce
// @include http://*.travian.*/*.php*
// @exclude http://*.travian.*/hilfe.php*
// @exclude http://*.travian.*/log*.php*
// @exclude http://*.travian.*/index.php*
// @exclude http://*.travian.*/anleitung.php*
// @exclude http://*.travian.*/impressum.php*
// @exclude http://*.travian.*/anmelden.php*
// @exclude http://*.travian.*/gutscheine.php*
// @exclude http://*.travian.*/spielregeln.php*
// @exclude http://*.travian.*/links.php*
// @exclude http://*.travian.*/geschichte.php*
// @exclude http://*.travian.*/tutorial.php*
// @exclude http://*.travian.*/ad/*
// @exclude http://*.travian.*/chat/*
// @exclude http://forum.travian.*
// @exclude http://shop.travian.*
// @version 1.0
// @description  Enables some Travian v3 features
// ==/UserScript==

/* 
 * This script is licensed under the 
 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/ 
 */

// Funcion principal ejecutada cuando se ha cargado toda la pagina
function funcionPrincipal(e){
	// Momento de inicio de ejecucion del script
	var tiempo_ejecucion = new Date().getTime();

	var version = "1.0";


	var actual = new Array(4);		// Informacion de recursos almacenados
	var total = new Array(4);		// Capacidad de los almacenes y granero
	var produccion = new Array(4);		// Produccion por segundo

	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;		// Constante que devuelve el primer elemento por XPath
	var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;		// Constante que devuelve una lista de elementos por XPath
	var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;		// Constante que deuvelve un iterador de elementos por XPath

	/**
	 * Funcion que no hace absolutamente nada. Usada cuando no hay mas remedio que usar alguna funcion
	 */
	function dummy(){}
	
	function basename(path) { return path.replace( /.*\//, "" ); }

	/**
	 * Funcion que convierte un numero en su version de 2 digitos. Anyade un 0 si solo tiene un digito
	 *
	 * Params:
	 *	n	Numero a convertir
	 * 
	 * Returns:
	 * 	El numero convertido con al menos dos digitos
	 */
	function LZ(n){	return (n > 9 ? n : '0' + n); }

	/**
	 * Crea un nuevo elemento de tipo DIV con un contenido prefijado
	 * 
	 * Params:
	 *	content	Contenido del nuevo elemento creado
	 * 
	 * Returns:
	 * 	Referencia al nuevo elemento
	 */
	function div(content){ return elem("div", content); }

	/**
	 * Wrapper para la funcion getElementById
	 *
	 * Params:
	 *	id	Texto del ID del elemento a buscar
	 * 
	 * Returns:
	 * 	Elemento del documento con el ID especificado
	 */
	function get(id){ return document.getElementById(id); }

	/**
	 * Multiplica cada elemento de un array por un valor
	 *
	 * Params:
	 *	a	Array con los elementos a procesar
	 *	n	Valor numero por el que multiplicar el array
	 *
	 * Returns:
	 *	Nuevo array con los valores calculados
	 */
	function arrayByN(a, n){ 
		var b = arrayClone(a); 
		for(var i in b){ b[i] *= n; } 
		return b; 
	} 

	/**
	 * Realiza una copia por valor de un array
	 * 
	 * Params:
	 *	a	Array a copiar
	 *
	 * Returns:
	 *	Referencia a un nuevo array con el mismo contenido que el original
	 */
	function arrayClone(a){ 
		var b = new Array(); 
		for(var i in a){ b[i] = a[i]; } 
		return b; 
	} 

	/**
	 * Suma el contenido de dos arrays. Si cualquiera de los dos tiene valor nulo, se devuelve una copia del otro
	 * 
	 * Params:
	 *	a	Primer array sumando
	 *	b	Segundo array sumando
	 *
	 * Returns:
	 *	Referencia a un nuevo array con la suma
	 */
	function arrayAdd(a, b){ 
		if(!a){ return arrayClone(b); } 
		if(!b){ return arrayClone(a); } 
		var c = new Array(); 
		for(var i = 0; i < Math.max(a.length,b.length); c[i] = a[i] + b[i++]); 
		return c; 
	}

	/**
	 * Comprueba si un valor esta presente en un array determinado
	 *
	 * Params:
	 *	array	Array a comprobar
	 *	value	Valor a buscar en el array
	 *
	 * Returns:
	 *	true si el valor esta en el array, false en caso contrario
	 */
	function arrayValueExist(array, value){
		for(var i = 0; i < array.length; i++) if (array[i] == value) return true;
		return false;
	}

	// Removes leading whitespaces
	String.prototype.LTrim = function () {
		return this.replace(/^\s+/, '');
	}

	// Removes ending whitespaces
	String.prototype.RTrim = function () {
		return this.replace(/\s+$/, '');
	}

	// Removes leading and ending whitespaces
	String.prototype.trim = function () {
		return this.LTrim().RTrim();
	}

	Date.prototype.toShortFormat = function(){
			return this.getDate()+"/"+LZ(this.getMonth()+1) + " "+LZ(this.getHours())+":"+LZ(this.getMinutes()); //+":"+LZ(this.getSeconds());
	}
	
	/**
	 * Elimina un elemento
	 *
	 * Param:
	 *	elem	El elemento a eliminar
	 */
	function removeElement(elem){ if (elem) elem.parentNode.removeChild(elem) }

	/**
	 * Suma todos los valores de un array
	 * 
	 * Params:
	 *	a	Array a sumar
	 *
	 * Returns:
	 *	Valor con la suma de todos los elementos del array
	 */
	function arrayToInt(a){ 
		var h = 0; 
		for(var i in a){ h += a[i]; }
		return h; 
	}

	/**
	 * Inserta un nodo despues de otro
	 * 
	 * Params:
	 *	node		Nodo de referencia
	 *	referenceNode	Nodo a insertar
	 */
	function insertAfter(node, referenceNode) {
		node.parentNode.insertBefore(referenceNode, node.nextSibling);
	}

	/**
	 * Crea un elemento cualquiera con un contenido
	 * 
	 * Params:
	 *	tag	Etiqueta del nuevo elemento
	 *	content	Contenido del nuevo elemento en formato texto
	 *
	 * Returns:
	 *	Referencia al nuevo elemento creado
	 */
	function elem(tag, content){ 
		var ret = document.createElement(tag);  
		ret.innerHTML = content;  
		return ret;
	}

	/**
	 * Realiza una busqueda en el documento usando XPath
	 * 
	 * Params:
	 *	xpath	Expresion de busqueda
	 *	xpres	Tipo de busqueda
	 *
	 * Returns:
	 *	Referencia a un elemento resultado de XPath
	 */
	function find(xpath, xpres){
		var ret = document.evaluate(xpath, document, null, xpres, null);
		return  xpres == XPFirst ? ret.singleNodeValue : ret;
	}

	/**
	 * Crea o actualiza el valor de una cookie con una determinada duracion
	 * 
	 * Params:
	 *	name	Nombre de la cookie
	 *	value	Contenido de la cookie
	 *	days	Duracion de la validez de la cookie
	 */
	function createCookie(name, value, days){
		if (typeof GM_setValue == "undefined"){
			if (days){
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			}else{ var expires = ""; }
			document.cookie = name + "=" + value + expires + "; path=/";
		}else GM_setValue(name, value);
	}

	/**
	 * Recupera el valor de una cookie
	 * 
	 * Params:
	 *	name	Nombre de la cookie
	 *
	 * Returns:
	 *	Contenido de la cookie o null si no existe
	 */
	function readCookie(name){
		if (typeof GM_getValue == 'undefined'){
			var ca = document.cookie.split(';');
			var nameEQ = name + "=";
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length); // Elimina espacios
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		}else return GM_getValue(name, null);
	}

	/**
	 * Elimina una cookie
	 * 
	 * Params:
	 *	name	Nombre de la cookie
	 */
	function eraseCookie(name){ createCookie(name, "", -1); }

	/**
	 * Calcula el identificador de una casilla partiendo de sus coordenadas X e Y
	 *
	 * Params:
	 *	x	Coordenada X
	 *	y	Coordenada Y
	 *
	 * Returns:
	 *	ID de la casilla correspondiente a las coordenadas
	 */
	function xy2id(x, y){ return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400))); }

	/**
	 * Calcula el numero de segundos de una hora expresada en formato xx:xx:xx
	 * 
	 * Params:
	 *	myElement	Texto con la hora a calcular
	 *
	 * Returns:
	 *	Numero de segundos que expresa la hora
	 */
	function calcular_segundos(myElement) {
		var p = myElement.split(":");
		return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);
	}

	/**
	 * Convierte una cantidad en segundos en su representacion en horas. 
	 * Funcion inversa de "calcular_segundos"
	 * 
	 * Params:
	 *	s	Numero de segundos
	 *
	 * Returns:
	 *	Texto con la representacion en horas o la cadena "0:00:0?" si es negativo
	 */
	function formatear_tiempo(s){
		if(s > -1){
			var horas = Math.floor(s/3600);
			var minutos = Math.floor(s/60) % 60;
			var segundos = s % 60;
			var t = horas + ":" + LZ(minutos) + ":" + LZ(segundos);
		}else{
			var t = "0:00:0?";
		}
		return t;
	}

	/**
	 * Recupera informacion generica inicial para el resto de funciones
	 */
	function getGeneralData(){
		// Idioma
		//find("//script[@type='text/javascript']", XPFirst).src.search(/\/([^\/]+)?3.js$/);
		find("//img[contains(@src, 'plus.gif')]", XPFirst).src.search(/\/img\/([^\/]+)\//);
		idioma = "en";//RegExp.$1;
		idioma = RegExp.$1;
		// Ruta al pack grafico
		find("//link[@rel='stylesheet']", XPFirst).href.search(/^(.*\/)(.*).css$/);
		pack_grafico = RegExp.$1;
		// Identificador de usuario
		find("//td[@class='menu']", XPFirst).innerHTML.search(/spieler.php\?uid=(\d+)"/);
		uid = RegExp.$1;
		// Nombre del servidor
		location.href.search(/http:\/\/(.*)\//);
		server = RegExp.$1;
		// Por cada tipo de recurso: cantidad actual almacenada, capacidad total del almacen / granero y produccion por segundo
		for (var i = 0; i < 4; i++){
			actual[3-i] = get('l'+(i+1)).innerHTML.split("/")[0];
			total[3-i] = get('l'+(i+1)).innerHTML.split("/")[1];
			produccion[3-i] = get('l'+(i+1)).title/3600;
		}
	}

	/**
	 * Funcion que devuelve la version del juego de Travian que esta tratando
	 *
	 * Returns:
	 *      La version del juego
	 */
	function getVersion(){
		find("//script[@type='text/javascript']", XPFirst).src.search(/(\d).js$/);
		//return RegExp.$1; return "3";
	}

	function pc2aldeas(puntos){ return Math.round(Math.pow((puntos / 1000) / 1.6, 1 / 2.3)); }
	function aldeas2pc(aldeas){ return Math.round(1.6 * Math.pow(aldeas, 2.3)) * 1000; }

	/**
	 * Convierte todos los enlaces a la propia pagina del tipo "#" como enlaces vacios de javascript
	 */
	function sanearEnlaces(){
		var a = find("//a[@href='#']", XPList);
		for (var i = 0; i < a.snapshotLength; i++) a.snapshotItem(i).href = 'javascript:void(0)';
	}

	/**
	 * Calcula y muestra el tiempo que ha tardado desde el inicio de ejecucion del script
	 */
	function calcularTiempoEjecucion(){
		var tiempo = new Date().getTime() - tiempo_ejecucion;
		var div = find("//div[@id='ltime']", XPFirst);
		div.appendChild(elem("P", "TB: " + tiempo + " ms"));
	}


	/* Acciones generales a todas las paginas */
	getGeneralData();
	sanearEnlaces();

	/* Acciones especificas para algunas paginas */
	if ((location.href.match(/build.php\?(.*)id=17/) ||(location.href.match(/build.php\?(.*)id=35/))) && !(location.href.match(/t=1/) || location.href.match(/t=2/))) {

		var t0 = new Date();
		var arr0Time = get("tp1").innerHTML.split(":");

		t0.setHours(arr0Time[0]);
		t0.setMinutes(arr0Time[1]);
		t0.setSeconds(arr0Time[2]);

		var tFix = new Date();
		tFix.setHours(parseInt(arr0Time[0])+1);
		
		//get the list of the incomming trasports.
		var oTransportTable = new Array();

		// recoge los nombres de cada uno
		xpathResult = find('//form[@name="snd"]//tr[@class="cbg1"]//td[@class="s7"]', XPIter);
		while ((oTransportTable[oTransportTable.length] = xpathResult.iterateNext())) {}

		var tmpT = new Date(t0);
		var tmpActualCrop = parseInt(actual[3]);
		var tmpTotal	= parseInt(total[3]);
		var tmpProduction = parseInt(produccion[3]);

		var arrQFix = new Array(24); 	//24h period;
		var ECQFix = 0; 		//estimated Crop Quatity (pe perioade fixe de 1 h)
		for(var i=0;i<24;i++){arrQFix[i]=0}
		arrQFix[0]="-"

		for (i=0;i<oTransportTable.length-1;i++) {
			//celula cu cropu
			var oTCrop = oTransportTable[i].firstChild.childNodes[oTransportTable[i].firstChild.childNodes.length-1];

			//celula cu timpul estimat
			var oTTime = oTransportTable[i].parentNode.previousSibling.previousSibling.childNodes[2].firstChild;

			//celula cu timpul
			var oTimer= get("timer"+(i+1));
			
			// cantitate asteptata
			var qCrop = parseInt(oTCrop.nodeValue);
			qCrop = isNaN(qCrop)?0:qCrop;

			// timpul transport
			var tTime = oTTime.nodeValue.split(" ")[1];

			// timpul estimat
			var ti = new Date(t0);
			ti.setSeconds(ti.getSeconds()+calcular_segundos(oTimer.innerHTML));

			// delta t = intervalul de timp dintre t[i-1] si t[i]
			var dt = (ti-tmpT)/1000; //time difference in seconds
			
			// calculeaza crop la timpul estimat! ECQ = Estimated Crop Quantity 
			//ECQ = CurrentCrop+qCrop+(qProductieCrop*dt);
			ECQ = tmpActualCrop+qCrop+(tmpProduction*dt);

			if (ECQ>tmpTotal) {
				sResult = "<font color=green><b>+"+(ECQ-tmpTotal)+"!!!</b></font>"
			}
			else {
				if (ECQ>0){
					sResult = "<font color=green>"+(ECQ)+"</font>"
				}
				else {
					sResult = "<font color=red><b>"+(ECQ)+"!!!</b></font>"
				}
			}


			oSpan = elem("SPAN","  ["+sResult+"]");
			oTTime.parentNode.appendChild(oSpan);

			iHour = Math.floor((ti-t0)/(3600*1000))+1;
			// calculeaza total crop /h

			arrQFix[iHour] += qCrop;
			
			tmpT = ti;
			tmpActualCrop=ECQ;
			if (ECQ>tmpTotal) tmpActualCrop=tmpTotal;
		}

		//build time table
		oRightDiv = get("lright1");
		for(var i=0;i<24;i++){
			arrQFix[i] = "<TR><TD>"+i+"</TD><TD align=left nowrap >"+t0.toShortFormat()+"</TD><TD align=right>"+arrQFix[i]+"</TD>";
			t0.setHours(t0.getHours()+1);
			t0.setMinutes(0);
			t0.setSeconds(0);
		}
		oCQTable = elem("TABLE","<TR class='cbg1'><TD></TD><TD>Period</TD><TD>Crop Quantity</TD></TR>"+arrQFix.join("</TR>"));
		//class="tbg" cellspacing="1" cellpadding="2"
		oCQTable.setAttribute("class", "tbg");
		oCQTable.setAttribute("width", "300");
		oCQTable.setAttribute("cellspacing", "1");
		oCQTable.setAttribute("cellpadding", "2");
		oRightDiv.appendChild(oCQTable);
	}
	

	/* Mas acciones generales */ 
	calcularTiempoEjecucion();
	/**/
};

function short_time_format(s){
	if(s > -1){
		var horas = Math.floor(s/3600);
		var minutos = Math.floor(s/60) % 60;
		var t = horas + ":" + ((minutos<=9)?"0":"")+minutos;
	}else{
		var t = "0:0?";
	}
	return t;
}
// GreaseMonkey ejecuta sus scripts en el evento DOMContentLoaded, por lo que se puede ejecutar directamente,
// Opera por el contrario necesita agregar la funcion a dicho evento
window.addEventListener('DOMContentLoaded', funcionPrincipal, false);
if (document.body) funcionPrincipal();

/*
TODO:
	- Solo mostrar ampliaciones de niveles superiores al 10 para la aldea principal
	- Calculo de tiempo de llegada de ataque para coordinar ataques
        - Bloc de notas para cada aldea o jugador?
	- Conseguir enlace a una calculadora multilenguaje
	- Cola de espera (lo ultimo que hare cuando abandone el desarrollo del script, no antes)
	- Traduccion a turco, polaco, rumano y danes

FIXME:
	- El refresco de materiales falla cuando se produce mas de 3600 la hora de un material concreto
	- Comprobar los costes de los niveles de todos los edificios asi como las diferencias entre servidores (http://help.travian.com)
	- Costes para los niveles de las minas a partir del 10
	- Refinar las traducciones en ingles, italiano, aleman, frances, holandes, portugues y ruso
	- Mejorar los apaños en el codigo marcados por FIXMEs
	- Comentar mas en detalle algunas cosas
*/
