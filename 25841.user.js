// ==UserScript==
// @name Travian3 Beyond SC
// @author originally written by Travian3 Beyond 2.6c Victor Garcia (aka Croc) updated by bluelovers
// @version sc updated by bluelovers
// @description  Enables some Travian v3 features updated by bluelovers

// @include http://*.travian*/*.php*
// @include http://*.travian.*/*.php*
// @exclude http://*.travian*.*/hilfe.php*
// @exclude http://*.travian*.*/index.php*
// @exclude http://*.travian*.*/anleitung.php*
// @exclude http://*.travian*.*/impressum.php*
// @exclude http://*.travian*.*/anmelden.php*
// @exclude http://*.travian*.*/gutscheine.php*
// @exclude http://*.travian*.*/spielregeln.php*
// @exclude http://*.travian*.*/links.php*
// @exclude http://*.travian*.*/geschichte.php*
// @exclude http://*.travian*.*/tutorial.php*
// @exclude http://*.travian*.*/manual.php*
// @exclude http://*.travian*.*/ajax.php*
// @exclude http://*.travian*.*/ad/*
// @exclude http://*.travian*.*/chat/*
// @exclude http://forum*.travian*
// @exclude http://board*.travian*
// @exclude http://shop*.travian*
// @exclude *.css
// @exclude *.js
// ==/UserScript==

/*
 * This script is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/
 */

/**
 * xingulin: 載入 jQuery
 * 參考網址︰http://joanpiedra.com/jquery/greasemonkey/
 * Begin
 */
// Add jQuery
//var GM_JQ = elem('script');
//GM_JQ.src = 'http://jquery.com/src/jquery-latest.pack.js';
//GM_JQ.type = 'text/javascript';
//document.getElementsByTagName('head')[0].appendChild(GM_JQ);
//
//// Check if jQuery's loaded
//function GM_wait() {
//	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
//	else { $ = unsafeWindow.jQuery; letsJQuery(); }
//}
//GM_wait();
//
//// All your GM code must be inside this function
//function letsJQuery() {
//	funcionPrincipal();
//}
///**
// * End
//*/

function getInnerText(who) {
//	return (who['textContent'] ? who['textContent'] : who['innerHTML']);
	return (who.textContent ? who.textContent : who.innerHTML);
}

var aLang = new Array();
var aLangTroops = new Array();
var aLangBattleAnalyse = new Array();

// Funcion principal ejecutada cuando se ha cargado toda la pagina
function funcionPrincipal(e){
	// Momento de inicio de ejecucion del script
	var tiempo_ejecucion = new Date().getTime();

	var version = "2.6c MunLightDoll updated by  by bluelovers";

	var arrayRecursosCasilla = new Array();

	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;		// Constante que devuelve el primer elemento por XPath
	var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;		// Constante que devuelve una lista de elementos por XPath
	var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;		// Constante que deuvelve un iterador de elementos por XPath

	var actual = new Array(4);		// Informacion de recursos almacenados
	var total = new Array(4);		// Capacidad de los almacenes y granero
	var produccion = new Array(4);		// Produccion por segundo
	var imagenes = new Array();		// Imagenes pre-cargadas

	// Indica para que servidores esta disponible el servicio de Travian World
	// IMPORTANTE: Por favor, no cambiar / Please, don't change. Travian World is only available for the servers indicated below
	var tw_server = new Array();

	// Se estima cada linea como una altura de 20 pixeles
	var pixelsPorLinea = 20;

	var timestamp = new Date();

	var idioma2;

	if (find("//input[@name='login']", XPFirst)) {
		setTimeout(function() {
			if (document.getElementsByName('login')){
				var ex = ".//input[@value='login']";
				tag = document.evaluate(
				  	ex,
						document,
						null,
						XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
						null);

				var ex = ".//input[@type='password' and contains(@value, '*')]";
				tag2 = document.evaluate(
				  	ex,
						document,
						null,
						XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
						null);

				if(tag.snapshotLength && tag2.snapshotLength)
				{
					loginButton = tag.snapshotItem(0);
					loginButton.click();
				}
			} } , 10000);

		return false;
	} else if (location.href.match(/karte2.php($|\?z=)/)) {

		var areas = find("//area[@href='#']", XPList);
			for (var j = 0; j < areas.snapshotLength; j++){
				var area = areas.snapshotItem(j);

//				opener.location.href="karte.php?d=269313&c=0d", self.close()

				area.getAttribute('onclick').search(/karte.php\?d=(\d+)/);
				var z = RegExp.$1;

				area.setAttribute('z', z);
				area.onclick = false;
				area.setAttribute('onclick', '');

				_attachEvent(area, 'click', function (e) {
					window.location.href = 'karte2.php?z=' + e.target.getAttribute('z');
//					alert(e.target.getAttribute('z'));
					return doane(e);
				});

//				area.href = 'javascript:void(0);';
				area.href = 'karte.php?z='+z;
			}

		return false;
	}

	getGeneralData();

	getlocalStr(idioma);

	var buildingCost = new Array();
	initBuildCost();

	var uc, ats, dts, romans, teutons, gauls, nature;
	initTroopData();

	initImagenes();

	var cssStyle = "";
	cssStyle += "#tabla_mapa {width:800px;}";
	cssStyle += ".bttable {width:100%; height:129px;}";
	cssStyle += ".dcol {color:#A0A0A0;}";
	cssStyle += ".tb_coords { word-break: keep-all; font: 11px/1.5em Tahoma,Verdana,Arial !important; color:grey; }";

	cssStyle += '::selection {background-color: #DD0044;color: #FFFFFF;}::-moz-selection {background-color: #DD0044;color: #FFFFFF;}';

	cssStyle += '.inline {clear: both; display: inline;}';

	GM_addStyle(cssStyle);

	/* Acciones generales a todas las paginas */

//	getGeneralData();
	sanearEnlaces();
	hideAd();
	quickLinks();
	buildingLinks();
//	playerLinks();
	calculateFillTime();
	cityLinks();
	crearTooltip();
//	createMenu();
	borrarCuenta();
	confirmDelete();

	/* Acciones especificas para algunas paginas */
	if (location.href.indexOf('build.php?') != -1){
		quickCity();
		recursosMercado();
		tiempoExplorarUnidades();
		tiempoExplorar();
		QP_addOwnTownTotalTroopsTable();
	}
	if (location.href.indexOf('build.php') != -1){
		try {
			calculateBuildTime();
			tiempoExplorarUnidades();
			tiempoExplorar();
			mostrarVentas();
			getTransport_time_arrival();
		} catch (e) {}
	}
	if (location.href.indexOf('dorf1') != -1)		preCalculate1();
	if (location.href.indexOf('dorf2') != -1)		preCalculate2();
//	if (location.href.indexOf('berichte.php?id=') != -1)	reportBatalla();
	if (location.href.indexOf('a2b.php') != -1){
		quickCity();
		ataqueDefecto();

		// Travian: Battle Analyse
		genreporta2b();

		_attachEvent(document, 'keyup', a2b);
		_attachEvent(document, 'click', a2b);

		// Travian: Battle Analyse
	}
	if (location.href.indexOf('nachrichten.php') != -1)	{
		opcionOcultaMensajes();

		if (location.href.match(/nachrichten.php\?(.*&)?id=/) && location.href.indexOf('nachrichten.php?t=1') <= 0) _attachEvent(window, 'load', convertToBBLetters);
	}

	if (location.href.match(/allianz.php\?(.*&)?s=2&aid=(\d+)&tid=(\d+)/)) convertToBBLetters(1);
	if (location.href.match(/allianz.php\?(.*&)?ac=(newtopic|newpost)/)) convertToBBLetters_menu();

	if (location.href.indexOf('berichte.php') != -1)	{ opcionOcultaInformes(); }
//	if (location.href.match(/dorf3.php($|\?newdid=(\d+)$)/)) resumenAldeas();

	if (location.href.match(/dorf3.php/)) {
		if (location.href.search(/dorf3.php\?(.*&)?s=(\d+)/)) {
			var a = parseInt(RegExp.$2);

			switch (a) {
				case 2:
					resumenAldeas6();
					break;
				case 0:
					resumenAldeas3();
					break;
				case 5:
					resumenAldeas4();
					break;
				case 4:
					resumenAldeas5();
					break;
				case 3:
					resumenAldeas2();
					break;
				case 7:
					resumenAldeas7();
					break;
				case 8:
					resumenAldeas8();
					break;
				default:
					resumenAldeas();
					break;
			}
		} else {
			resumenAldeas();
		}

		resumomenu();
	}

	if (location.href.match(/build.php\?(.*)&s=2/))		puntosCultura();
	if (location.href.match(/build.php\?(.*)&t=1/)){	alianzaMercado(); filtrosMercado(); }
	if (location.href.match(/karte.php($|\?z=|\?new)/)){

		_attachEvent(window, 'load', function () {
			preCalculate3();

//			installMapEventHandler();
			desplazarMapa();
			infoRecursos();
			playerLinks();
		});
	}
	if (location.href.match(/karte.php($|\?d=)/)){
		MapaQuickSave();

		kartec();
	}
	if (location.href.match(/nachrichten.php($|\?t=|\?s=)/) || location.href.match(/berichte.php($|\?t=|\?s=)/)) opcionesMensajes();

	//if (location.href.match(/nachrichten.php$/))		blocNotas();
	if (location.href.match(/nachrichten.php$/) || location.href.match(/nachrichten.php($|\?.*s=)/))		archiveIGM();

	if (location.href.match(/spieler.php\?s=2/))			mostrarConfiguracion();
	if (location.href.match(/plus.php\?id=3/))		checkUpdate();


	if (location.href.match(/warsim.php/)) {
		parseBattleAnalyse();
	}

	if (location.href.match(/berichte.php\?(.*&)?id=/)) {
		try {
			parseBattleAnalyse();
		} catch(e){}
	}

	/* Mas acciones generales */

	mostrarMarcadores();
	setTimers();
	calcularTiempoEjecucion();
	playerLinks();
	fix_title();



	/**
	 * Funcion que no hace absolutamente nada. Usada cuando no hay mas remedio que usar alguna funcion
	 */
	function dummy(){}

	function getRandTimeRange(maxrange){ // input in milliseconds output in milliseconds
		var nr = Math.floor(maxrange * (0.6+0.4*Math.random()));
		//log(3, "Calculated RandTimeRange : "+nr+" ms.");
		return nr;
	}

	function getRandom(n,m){ return n+Math.floor(Math.random()*(m-n)); }

	/**
	 * Funcion que extrae el nombre de un fichero de una ruta o URL
	 *
	 * Params:
	 * 	path: Ruta o URL para extraer el nombre del fichero
	 *
	 * Returns:
	 *	El nombre del fichero al que apunta la ruta o URL
	 */
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
	function get(id){ return $(id); }

	function $(id){ return document.getElementById(id); }

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

	/**
	 * Convierte ciertas entidades HTML en su equivalente ASCII
	 *
	 * Params:
	 *	string: Cadena a convertir
	 *
	 * Returns:
	 *	Cadena convertida
	 */
	function decodeEntity(string){
		return string.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&apos;/g,"'").replace(/&quot;/g,"\"").replace(/&amp;/g, "&");
	}

	/**
	* Elimina un elemento
	*
	* Param:
	*	elem	El elemento a eliminar
	*/

	function removeElement(elem){ if (elem) elem.parentNode.removeChild(elem) }

	/**
	 * Mueve un elemento de lugar en un arbol DOM
	 *
	 * Params:
	 *	elem: Elemento a desplazar
	 *	dest: Nuevo padre del elemento
	 */
	function moveElement(elem, dest){
		removeElement(elem);
		dest.appendChild(elem);
	}

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

	function insertBefore(node, referenceNode) {
		node.parentNode.insertBefore(referenceNode, node);
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
	function elem(tag, content, idt, idv, class){
		var ret = document.createElement(tag);
//		ret.innerHTML = content;

		if(content) {
			switch (tag.toLowerCase()) {
				case 'img':
					ret.src = content;
					break;
				case 'input':
					ret.name = content;
					break;
				default:
					ret.innerHTML = content;
					break;
			}
		}
		if(idt) {
			if (typeof idt != 'array') {
				ret.setAttribute(idt, idv);
			} else {
				for (a in idt)
					ret.setAttribute(a, idt[a]);
			}
		}

		if (idv && typeof idv == 'array') {
			for (a in style)
				ret.style[a] = style[a];
		}

		if(class) ret.className = class;

		return ret;
	}

	function textelem(s) {
		return document.createTextNode(s);
	}

	function $names(name, doc)
	{
		if(!doc) var doc = document;
		return doc.getElementsByName(name);
	}

	function $tags(tag, doc) {
		if(!doc) var doc = document;
		return doc.getElementsByTagName(tag);
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
	function find(xpath, xpres, startnode, doc){
		if (!startnode) {startnode=document;}
		doc = doc != null ? doc : document;

		xpres = xpres ? xpres : XPFirst;

		var ret = doc.evaluate(xpath, startnode, null, xpres, null);
		return  xpres == XPFirst ? ret.singleNodeValue : ret;
	}

	/**
	 * xingulin︰
	 * 注意︰
	 *	原始程式有中文亂碼的問題，因為 GM_setValue()  與 GM_getValue() 不支援 UTF-8 字集，修改如下︰
	 *		GM_setValue(name, encodeURI(value))
	 *		decodeURI(GM_getValue(name, null))
	 * 參考網址︰
	 *	http://angusdev.mysinablog.com/index.php?op=ViewArticle&articleId=513171
	 *	http://www.nabble.com/-greasemonkey-users--GM_setValue-loses-unicode-characters-t2840046.html
	 */

	/**
	 * Crea o actualiza el valor de una cookie con una determinada duracion
	 *
	 * 變量：
	 *	name	Nombre de la cookie
	 *	value	Contenido de la cookie
	 *	days	Duracion de la validez de la cookie
	*/

	function fixcookiesname(name) {
		var cookiepre = document.domain ? document.domain: window.location.hostname;
		return cookiepre + '_' + name;
	}

	function getcookies(name, defaultVal) {
		name = fixcookiesname(name);
		if (typeof GM_getValue == 'undefined') {
			var ca = document.cookie.split(';');
			var nameEQ = name + "=";
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length); // Elimina espacios
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return defaultVal;
		} else return decodeURI(GM_getValue(name, defaultVal));
	}
	function setcookie(name, value, days) {
		name = fixcookiesname(name);
		if (typeof GM_setValue == "undefined") {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			} else {
				var expires = "";
			}
			document.cookie = name + "=" + value + expires + "; path=/";
		} else GM_setValue(name, encodeURI(value));
	}

	function getcookie(name, defaultVal) {
		return getcookies(name, defaultVal);
	}
	function setcookies(name, defaultVal) {
		return setcookie(name, value, days);
	}

	function createCookie(name, value, days){

		return setcookie(name, value, days);

		if (typeof GM_setValue == "undefined"){
			if (days){
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			}else{ var expires = ""; }
			document.cookie = name + "=" + value + expires + "; path=/";
		}else GM_setValue(name, encodeURI(value));
	}

	function setOption(key, value) {
		var options = readCookie("options");
		if(options != '') options = options.split(",");
		else options = [];
		var myOption = options.indexOf(key);
		if(myOption < 0) {
		  options.push(key);
		  options.push(encodeURIComponent(value));
		} else {
		  options[myOption + 1] = encodeURIComponent(value);
		}
		options.join(",");
		createCookie("options", options);
	}

	/**
	 * @param key: name of the parameter in the cookie.
	 * @param defaultValue: this is returned if the parameter is not found in the cookie.
	 * @param type: if set, type conversion occurs. Values {string, integer, boolean} The conversion occurs only if it is not the defaultValue being returned.
	 */
	function getOption(key, defaultValue, type) {
		var options = readCookie('options');
		options = options.split(",");
		var myOption = options.indexOf(key);
		if(myOption < 0) {return defaultValue;}
		switch(type) {
		  case "boolean":
			 var myOption = ( options[myOption + 1] == "true" || options[myOption + 1] == "1") ? true:false;
		  break;
		  case "integer":
			 var myOption = parseInt(options[myOption + 1]);
		  break;
		  case "string":
		  default:
			 var myOption = decodeURIComponent(options[myOption + 1]);
			 break;
		}
		return myOption;
	}


	/**
	 * Recupera el valor de una cookie
	 *
	 * 變量：
	 *	name	Nombre de la cookie
	 *
	 * 返回值：
	 *	Contenido de la cookie o null si no existe
	 */
	function readCookie(name, defaultVal){

		return getcookies(name, defaultVal);

		if (typeof GM_getValue == 'undefined'){
			var ca = document.cookie.split(';');
			var nameEQ = name + "=";
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length); // Elimina espacios
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return defaultVal;
		}else return decodeURI(GM_getValue(name, defaultVal));
	}

	/**
	 * Elimina una cookie
	 *
	 * 變量：
	 *	name	Nombre de la cookie
	 */
	function eraseCookie(name){ createCookie(name, "", -1); }

	function eatcookie(name) {
		setcookie(name, '', -1);
	}

	/**
	 * Crea una ruta a una imagen basandose en el path del pack grafico
	 *
	 * Params:
	 *	ref	Ruta relativa a la imagen
	 *
	 * Returns:
	 *	Ruta absoluta a la imagen
	 */
	function img(ref, lang_dependant){ return (!lang_dependant ? pack_grafico + "img/un/" + ref : pack_grafico + "img/" + idioma + '/' + ref); }

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
	function zid2x(z){ return (((z - 1) % 801) - 400); }
	function zid2y(z){ return (400 - (parseInt(((z - 1) / 801)))); }

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
		}else var t = "0:00:0?";
		return t;
	}

	function formatear_tiempo2(s){
		if(s > -1){
			var horas = Math.floor(s/3600);
			var minutos = Math.floor(s/60) % 60;
			var segundos = s % 60;
			var t = horas + ":" + LZ(minutos);
		}else var t = "00:0?";
		return t;
	}

	/**
	 * Funcion encargada de mostrar el texto de recursos restantes para una construccion
	 */
	function calculateBuildTime(){
		// Las celdas son los enlaces susceptibles de ser sustituidos por la nueva informacion
		var celdas = find("//span[@class='c']", XPList);
		// Las tablas son por cada uno de los edificios ampliables que se han detectado en la pagina
		var tablas = find("//table[@class='f10' and not(@width)]", XPList);
		var k = celdas.snapshotLength - 1;

		// Se comienza por el final para evitar confusiones con otra informacion, ya que suele
		// estar lo ultimo en el caso de un unico edificio
		for(j = tablas.snapshotLength - 1; j >= 0; j--) {
			var tabla = tablas.snapshotItem(j);
			var celda = tabla.rows[0].firstChild;
			var recursos = celda.textContent.split("|").splice(0,4);
			if(recursos.length != 4) continue;

			var a = calculateResourceTime(recursos);
			var b = celdas.snapshotItem(k);
			// Por si hay mas tablas que celdas
			if (b){
				// Si lo que hay antes de la celda es un enlace, entonces se trata de la cola del Plus
				if (b.firstChild && b.previousSibling && b.previousSibling.previousSibling.nodeName == 'A') continue;
				// Se elimina la informacion existente antes de poner la nueva
				if (a != null){
					if (b.firstChild && b.previousSibling && b.previousSibling.previousSibling.nodeName == 'TABLE') while(b.hasChildNodes()) b.removeChild(b.firstChild);
					b.appendChild(div(a));
					k--;
				}
			}
		}
	}

	/**
	 * Recupera el identificador de la aldea activa
	 *
	 * Returns:
	 *	El ID de la aldea o 0 si es la unica aldea
	 */
	function getIdAldea(mode){
//		var a = find("//span[@class='c2']/a", XPFirst);

		var a = find("//a[@class='active_vl']", XPFirst);

		if (a){
			if (mode) {
				return a.parentNode.innerHTML;
			} else {
				a.getAttribute("href").search(/\?newdid=(\d+)/);
				return RegExp.$1;
			}
		} else return 0;
	}

	/**
	 * Calcula el desplazamiento en pixeles a partir del 23� enlace
	 * lateral (aldeas o enlaces personalizados)
	 *
	 * Returns:
	 *	El desplazamiento en pixeles
	 */
	function longitudPantalla(){
		var enlaces = 0;

		// Se estima que caben 19 enlaces hasta que empiecen a ser demasiados y a ser tenidos en cuenta
		var a = find("//div[@id='lright1']//span[text()]", XPList).snapshotLength;
		if (a > 0) a += 3;

		var b = obtenerValorCookie("marcadores").length;
		if (b > 0) a += b + 2;

		var c = find("//ul/li", XPList);
		if (c > 0) a += c + 2;

		a -= 23;
		if (a > 0) enlaces += a * pixelsPorLinea;

		// Se tiene en cuenta el numero de construcciones
		var a = find("//div[@id='ba']//table[@class='f10' and @width='100%']//tr", XPList).snapshotLength - 2;
		if (a) enlaces += pixelsPorLinea * (a > 0 ? a : 0);

		// Se tiene en cuenta el banner de publicidad
		var a = find("//iframe", XPFirst);
		if (a != null) enlaces += parseInt(a.height);


		return enlaces;
	}

	/**
	 * Calcula los recursos restantes y el tiempo necesario para unas cantidades deseadas y devuelve
	 * una cadena de texto en HTML con esa informacion
	 *
	 * Params:
	 *	necesario:	Array con la cantidad deseada de cada tipo de recurso
	 *
	 * Returns:
	 *	Cadena de texto en HTML con la informacion sobre el tiempo y recursos que faltan
	 */

//	//計算資源時間
//	function calculateResourceTime(necesario){
//		var texto_restante = '';
//		var tiempo_max = 0;
//		var a = null;
//
//		// Calcula y crea una cadena con lo que falta de cada recurso
//		for (i = 0; i < 4; i++){
//			restante = necesario[i] - actual[i];
//			if (restante > 0){
//				texto_restante += '<img src="' + img('r/' + (i+1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '"><span id="timeout' + i + '">' + restante + '</span> | ';
//				var tiempo = Math.round(restante / produccion[i]);
//				if (tiempo > tiempo_max) tiempo_max = tiempo;
//				if (tiempo < 0) tiempo_max = 'Infinity';
//								if (total[i] - actual[i] == 0) tiempo_max = 'Infinity';
//			}
//		}
//
//		// Calcula y crea una cadena con el tiempo que falta hasta conseguir los recursos
//		if (tiempo_max == 'Infinity'){
//			a = T('FALTA') + ' ' + texto_restante + ' <br><img src="' + img('a/clock.gif') + '" width="18" height="12" title="' + T('TIEMPO') + '"> ' + T('NUNCA');
//		}else if (tiempo_max > 0){
//			var tiempo2 = formatear_tiempo(tiempo_max + 5); // Introduce un margen de 5 segundos para compensar la desviancion de los temporizadores de javascript
//			var fecha = new Date();
//			fecha.setTime(fecha.getTime() + (tiempo_max * 1000));
//
//			a = T('FALTA') + ' ' + texto_restante + ' <br><img src="' + img('a/clock.gif') + '" width="18" height="12" title="' + T('TIEMPO') + '"> <span id="timeout">' + tiempo2 + '</span><br/> ' + T('LISTO') + ' ' + calcularTextoTiempo(fecha);
//		}
//		return a;
//	}

	//計算資源時間
	function calculateResourceTime(necesario, special_case)
	{
		var texto_restante = '';
		var tiempo_max = 0;
		var a = null;

		// Calcula y crea una cadena con lo que falta de cada recurso
		for (i = 0; i < 4; i++){
			restante = necesario[i] - actual[i];
			if (restante > 0){

				var tiempo = Math.round(restante / produccion[i]);

				if ((total[i] - actual[i] <= 0) || (total[i] - restante < 0)) tiempo_max = 'Infinity';

				if (tiempo < 0 || tiempo_max == 'Infinity' || produccion[i] < 0) {
					tiempo_max = 'Infinity';
				} else if (tiempo > tiempo_max) tiempo_max = tiempo;

				texto_restante += '<div class="inline" removeable="1">';

				texto_restante += '<img '+'_title="'+total[i]+':'+actual[i]+':'+restante+':'+produccion[i]+'"'+' src="' + img('r/' + (i+1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '"><span ' + (total[i] != actual[i] ? 'id="timeout' + (i) + '"' : '') + (tiempo_max == 'Infinity' ? ' noreload="1"' : '') + '>' + restante + '</span> ';

				texto_restante += '( ' + (tiempo_max == 'Infinity' ? T('NUNCA') : '<span id="timeout" noreload="1">' + formatear_tiempo(Math.round(restante / produccion[i])) + '</span>') + ' )';
				texto_restante += ((special_case) ? '<br />' : ' | ');

				texto_restante += '</div>';
			}
		}

		// Calcula y crea una cadena con el tiempo que falta hasta conseguir los recursos
		if (tiempo_max == 'Infinity'){
			a = T('FALTA') + ' ' + texto_restante + ' <img src="' + img('a/clock.gif') + '" width="18" height="12" title="' + T('TIEMPO') + '"> ' + T('NUNCA');
		}else if (tiempo_max > 0){
			var tiempo2 = formatear_tiempo(tiempo_max); // Introduce un margen de 5 segundos para compensar la desviancion de los temporizadores de javascript
			var fecha = new Date();
//			fecha.setTime(fecha.getTime() + (tiempo_max * 1000));
			fecha.setTime(timestamp.getTime() + (tiempo_max * 1000));

			a = T('FALTA') + ((special_case) ? '<br />' : '  ') + '' + texto_restante + ' <img src="' + img('a/clock.gif') + '" width="18" height="12" title="' + T('TIEMPO') + '"> <span id="timeout">' + tiempo2 + '</span><br/> ' + T('LISTO') + ' ' + calcularTextoTiempo(fecha);
		}
		//資源時間
		/*
		if ((tiempo_max == 'Infinity')||(tiempo_max > 0)){
			a='<div style="color:#999">' + a + '</div>';
		}
		*/
		return a;
	}

	/**
	 * Formatea el tiempo necesario hasta alcanzar determinada fecha
	 *
	 * Params:
	 *	fecha:	Objeto de tipo Date con la fecha futura
	 *
	 * Returns:
	 *	Cadena de texto con el calculo de tiempo restante
	 */
	function calcularTextoTiempo(fecha){
//		ahora = new Date();
		ahora = timestamp;

		// Calcula la diferencia de horas entre la fecha dada y la actual
		// para saber si se trata de las proximas 72 horas
		horas = ((fecha.getTime() - ahora.getTime()) / 1000 / 60 / 60);
		horas += ahora.getHours() + (ahora.getMinutes() / 60);
		if (horas < 24) tiempo_restante = T('HOY');
		else if (horas < 48) tiempo_restante = T('MANYANA');
		else if (horas < 72) tiempo_restante = T('PAS_MANYANA');
		else tiempo_restante = T('EL') + " " + LZ((fecha.getMonth()+1)) + "/" + LZ(fecha.getDate());

		return tiempo_restante + " " + T('A_LAS') + " " + LZ(fecha.getHours()) + ":" + LZ(fecha.getMinutes()) + ":" + LZ(fecha.getSeconds());
	}

	/**
	 * Calcula el tiempo maximo estimado hasta conseguir los recursos especificados basandose
	 * en la cantidad actual y en la produccion de cada tipo de recurso
	 *
	 * Params:
	 *	necesario:	Array con la cantidad deseada de cada tipo de recurso
	 *
	 * Returns:
	 *	Tiempo maximo en segundos hasta conseguir los recursos deseados
	 */
	function calculateTime(necesario){
		var tiempo_max = 0;
		var tiempo = 0;

		for (i = 0; i < 4; i++){
			var restante = necesario[i] - actual[i];
			if (restante > 0){
				tiempo = Math.round(restante / produccion[i]);
				if (tiempo > tiempo_max) tiempo_max = tiempo;
				if (tiempo < 0) tiempo_max = 'Infinity';
			}
		}

		if (tiempo_max > 0 && tiempo_max != 'Infinity') tiempo_max = formatear_tiempo(tiempo_max + 5); // Se introduce un margen de 5 segundos para compensar posibles desviaciones en los temporizadores de javascript
		return tiempo_max;
	}

	function calculateHighlight (produccionHora, tiempo, tiempoRestante) {
		var color = '';

		if (produccionHora < 0) {
			color = '#FF0000';
		} else if (tiempo <= 3600) {
			color = 'Magenta';
		} else if (tiempo <= 18000) {
			color = '#ffa500';
		} else if (tiempo <= 36000) {
			color = '#7b68ee';
		}

		var ret = tiempoRestante;
		if (color != '') ret = '<font color="' + color + '">' + ret + '</font>';

		return ret;
	}

	/**
	 * Calcula y muestra el tiempo estimado hasta el llenado/vaciado de los almacenes y graneros
	 */
	function calculateFillTime(){
		// Por cada tipo de recurso calcula el tiempo hasta el llenao
		for (var i = 0; i < 4; i++){
			if (produccion[i] < 0) var tiempo = Math.round(actual[i] / -produccion[i]);
			// Si la produccion es 0, el tiempo es infinito
			else if (produccion[i] == 0) var tiempo = -1;
			// Si la produccion es negativa, se calcula el tiempo hasta el vaciado
			else var tiempo = Math.round((total[i] - actual[i]) / produccion[i]);
						if(getv2()!=1){
						var produccionHora = get('l' + (4-i)).title;} else{
						var produccionHora = get('l' + (1+i)).title;}
						var tiempoRestante = "<span id='timeouta' style='font-weight:bold' noreload='1'>" + formatear_tiempo(tiempo) + "</span>";
						var celda = elem("span", "<span style='font-size:9px; color:#909090; position: absolute; top:13px; height: 20px; text-align:left;'>(" + (produccionHora > 0 ? '+' : '') + produccionHora + ', ' + calculateHighlight(produccionHora, tiempo, tiempoRestante) + ')</span>');
						//var celda = elem("DIV", "<span style='font-size:9px; color:#909090; position: absolute; top:13px; height: 20px; text-align:left;'>(" + (produccionHora > 0 ? '+' : '') + produccionHora + ', ' + (produccionHora < 0 ? '<font color="#FF0000">' + tiempoRestante + '</font>' : tiempoRestante) + ')</span>');
			if(getv2()!=1){
				var a = get('l'+(4-i)).previousSibling;
			} else {
				var a = get('l'+(1+i)).previousSibling;
			}
			// FIXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
			if (a.nodeName == '#text') a = a.previousSibling;
			a.appendChild(celda);
		}

		get('l1').style.cssText = 'padding-bottom: 5px;';
	}

	/**
	 * Traduce una cadena de texto usando el idioma global detectado
	 *
	 * Params:
	 *	texto:	Cadena de texto a traducir
	 *
	 * Returns:
	 *	Cadena de texto traducida
	 */
	function T(texto){
		// Intenta usar el array del idioma, y si no esta disponible utiliza el castellano por defecto
//		try{
//			eval('var language = lang_' + idioma);
//		}catch(e){
//			eval('var language = lang_hk');
//		}
//
//		texto = texto.toUpperCase();
//
//		// Si una cadena concreta no esta traducida en el idioma, utiliza por defecto el castellano
//		if (language[texto] == undefined) {
//			return language[texto] == undefined ? '!'+texto+'!' : lang_hk[texto];
//		} else {
//			return language[texto];
//		}

		texto = texto.toUpperCase();

		try{
			return aLang[texto] == undefined ? '!'+texto+'!' : aLang[texto];
		}catch(e){
			return '!'+texto+'!';
		}

	}

	function Traduz(texto) {
		return T(texto);
	}

	/**
	 * Traduce una cadena de texto usando el idioma global detectado
	 *
	 * Params:
	 *	texto: Cadena de texto a traducir
	 *	args: Argumentos a sustituir en la cadena a traducir
	 *
	 * Returns:
	 * 	Cadena de texto traducida
	 */
	function F(texto, args){
//		// "args" debe ser un array asociativo del tipo {'a':'b', 'c':'d'} y puede ser opcional
//		try{ eval('var language = lang_' + idioma); }
//		catch(e){ eval('var language = lang_es'); }
//		if (language[texto] == undefined) texto = lang_es[texto]; else texto = language[texto];

		texto = aLang[texto] == undefined ? '!'+texto+'!' : aLang[texto];

		if (args != undefined) for(var i in args) texto = texto.replace(i, args[i]);
		return texto;
	}

	/**
	 * Recupera informacion generica inicial para el resto de funciones
	 */
	function getv2(){
	//			find("//script[@type='text/javascript']", XPFirst).src.search(/(\d).js$/);
				var a=document.title;
				if (a=="Travian cnt") {
				return 1 }else {
				return 3}
		}
	function getGeneralData(){
		// Idioma
//		find("//script[@type='text/javascript']", XPFirst).src.search(/\/([^\/]+)?3.js$/);
		var xtemp = find("//img[contains(@src, 'plus.gif')]", XPFirst);

		if (xtemp) {
			xtemp.src.search(/\/img\/([^\/]+)\//);
			idioma = RegExp.$1;
		} else {
			idioma = 'tw';
		}

		document.title.search(/travian\s(\w+$)/i);
		idioma2 = RegExp.$1;

		// Ruta al pack grafico
		find("//link[@rel='stylesheet'][2]", XPFirst).href.search(/^(.*\/)(.*)\.css$/);
		pack_grafico = RegExp.$1;

//		alert(find("//link[@rel='stylesheet'][2]", XPFirst).href);

		// Identificador de aldea actual
		id_aldea = getIdAldea();

		// Identificador de usuario
		find("//td[@class='menu']", XPFirst).innerHTML.search(/spieler.php\?uid=(\d+)/);
		uid = RegExp.$1;

		// Nombre del servidor
		location.href.search(/http:\/\/(.*)\//);
		server = RegExp.$1;

		// Por cada tipo de recurso: cantidad actual almacenada, capacidad total del almacen / granero y produccion por segundo
		for (var i = 0; i < 4; i++){
			var a = get('l' + (4-i));
			actual[i] = a.innerHTML.split("/")[0];
			total[i] = a.innerHTML.split("/")[1];
			produccion[i] = a.title/3600;
		}

		// Plus
		if (find("//img[contains(@src, 'travian1.gif')]", XPFirst)) plus = true; else plus = false;


		storeurl=readCookie("storeurl", '');
	}
	/**
	 * Oculta el anuncio de publicidad
	 */
	function hideAd(){
		var ad = find("//iframe", XPFirst);
		if (ad) ad.style.display = 'none';
	}

	/**
	 * Crea nuevos enlaces en la barra de menu izquierda. Son enlaces internos y externos al juego separados por una linea
	 */
	function quickLinks(){
		var menu = find("//td[@class='menu']", XPFirst);
		for (var j = 0; j < 2; j++) for (var i = 0; i < menu.childNodes.length; i++) if (menu.childNodes[i].nodeName == 'BR') removeElement(menu.childNodes[i]);
		var links = [	0,
				[T('LOGIN'), "login.php"],
				[T('ENV_TROPAS'), "a2b.php"],
				["聯盟概況", "allianz.php"],
				["　" + T('ALIANZA_ATTACK'), "allianz.php?s=3"],
				[T('SIM'), "warsim.php"],
				[T('MAPA'), "http://travmap.shishnet.org/?lang=zh", "_blank"],
				0,
				["行宮", "build.php?gid=25"],
				["皇宮", "build.php?gid=26"],
				["英雄園", "build.php?gid=37"],
//				["市鎮廳", "build.php?gid=24"],
				["中心大樓", "build.php?gid=15"],
				[T('CHECKNEW'), "http://userscripts.org/users/51651/scripts", "_blank"],
		];

		for(var i = 0; i < links.length; i++){
			if(links[i]){
				var a = elem("A", links[i][0]);
				a.href = links[i][1];
				if(links[i][2]) a.setAttribute('target', links[i][2]);
				menu.appendChild(a);
			}else menu.appendChild(elem('HR'));
		}

		GM_registerMenuCommand('Travian Beyond > '+T('CHECKNEW'), function(){ GM_openInTab("http://userscripts.org/users/51651/scripts")});
	}

	/**
	 * Anyade un dialogo de confirmacion a los enlaces de cancelacion de construcciones
	 */
	function confirmDelete(){
		var links = find("//img[contains(@src, 'del.gif')]", XPList);
		for (var i = 0; i < links.snapshotLength; i++){
			links.snapshotItem(i).setAttribute('onClick', 'javascript:return confirm("' + T('SEGURO') + '");');
		}
	}

	/**
	 * Anyade nuevos enlaces a edificios en la barra superior
	 */
	function buildingLinks(){
		// Localiza la barra de enlaces superiores
		var barra = find("//div[@id='ltop5']", XPFirst);

		// Asocia el mapa del mercado con la imagen especifica creada
		barra.innerHTML += '<img usemap="#mercado" class="fl2" src="data:image/gif;base64,' + imagenes["mercado"] + '" border="0" title="' + T('MERCADO') + '">';

		// Asocia el mapa de los edificios militares con la imagen creada a tal efecto
		barra.innerHTML += '<img usemap="#militar" class="fl2" src="data:image/gif;base64,' + imagenes["militar"] + '" border="0" title="' + T('CUARTEL') + '">';

		// Mapa para el mercado
		barra.innerHTML += '<map name="mercado"><area shape="rect" coords="0,0,70,50" href="build.php?gid=17" title="' + T('ENVIAR') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=17&t=1" title="' + T('COMPRAR') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=17&t=2" title="' + T('VENDER') + '"></map>';

		// Mapa para los edificios militares
		barra.innerHTML += '<map name="militar"><area shape="rect" coords="0,0,35,50" href="build.php?gid=16" title="' + T('PUNTO') + '"><area shape="rect" coords="35,0,70,50" href="build.php?gid=19" title="' + T('CUARTEL') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=20" title="' + T('CORRAL') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=21" title="' + T('TALLER') + '"></map>';

		// Desplaza el menu del Plus a la izquierda para hacer hueco a las nuevas imagenes
		var a = find("//a[contains(@href, 'plus.php')]", XPFirst);
		a.style.marginLeft = '0px';
		a.style.position = 'absolute';
		a.style.left = '-250px';
	}

	/**
	 * Crea un enlace al servicio de estadisticas de Travian World que recibe la busqueda como parametro
	 *
	 * Params:
	 *	param	Parametro de busqueda para la estadistica
	 */
	function createStatLink(param){
		var statlink = elem('a', "<img src='data:image/gif;base64," + imagenes["stat"] + "' style='margin:0px 1px 0px 1px; display: inline' title='" + T('STAT') + "' alt='Stat' border=0>");
		statlink.href = "javascript:void(0);";
		var ref = 'http://www.denibol.com/proyectos/travian_world/stat2.php?server=' + server + '&' + param;
		statlink.addEventListener("mouseover", function(){ timeout = setTimeout(function(){ var a = get("tb_tooltip"); a.innerHTML = "<img src='" + ref + "' border='0'/>"; a.style.display = 'block'; }, 1000); }, 0);
		statlink.addEventListener("mouseout", function(){ clearTimeout(timeout); get("tb_tooltip").style.display = 'none'; }, 0);
		statlink.addEventListener("click", function(){ var popup = window.open(ref, 'popup', 'width=350, height=250'); popup.focus(); return false; }, 0);
		return statlink;
	}

	//show distance from all villages in tooltip
	function getVillageDist(x,y)  {
		return function(e) {
			var cities = find("//div[@id='lright1']//table[@class='f10']", XPFirst);
			if(cities){
				var txt1=new Array();
				txt1.push('<tr><td colspan=2 align=center><b>'+x+'|'+y+'</b><tr><td style="border-bottom:solid 1px #00C000;"><b>'+T('ALDEA')+'</b><td align=right style="border-bottom:solid 1px #00C000;"><b>'+T('Dist')+'</b>');
				cities = cities.firstChild;
				for (var j = 0; j < cities.childNodes.length; j++){
					var city = cities.childNodes[j];
					var cityname=city.childNodes[0].childNodes[2].textContent;
					city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
					var x2=parseInt(RegExp.$1,10);
					var y2=parseInt(RegExp.$2,10);
					var dist=Math.sqrt(Math.pow(x-x2,2)+Math.pow(y-y2,2)).toFixed(2);
					txt1.push('<tr><td>'+cityname+'<td align=right>'+dist);
				}
//				var table = elem('table', txt1.join(''));
//				var tooltip = get('tb_tooltip');
////				document.body.appendChild(tooltip);
//
//				tooltip.innerHTML = "";
//				tooltip.appendChild(table);
//				tooltip.style.display = 'block';

				timeout = setTimeout(function(){
					var div = get("tb_tooltip");

					div.innerHTML = "";
					div.appendChild(elem('table', txt1.join('')));

					div.style.display = 'block';
				}, 100);


			}
		}
	}

	/**
	 * Crea un enlace para mandar un IGM cuando aparece un enlace al perfil de un jugador, un enlace de
	 * ataque rapido cuando aparece un enlace a una ubicacion del mapa, y otro enlace de estadisticas si
	 * esta soportado para el idioma del servidor activo
	 */
	function playerLinks(){
		var links = document.getElementsByTagName("a");

		var arrayplayerLinks = new Array();

		if (!idioma2) {
			document.title.search(/travian\s(\w+$)/i);
			idioma2 = RegExp.$1;
		}

		var vx = 0, vy = 0;

		if(find("//a[@class='active_vl']",XPFirst) != null) {
			find("//a[@class='active_vl']",XPFirst).parentNode.nextSibling.textContent.match(/\(([-\d]+)\n\|\n([-\d]+)\)/);
			vx = RegExp.$1;
			vy = RegExp.$2;
		}

		for(var i = 0; i < links.length; i++){

//			if (links[i].className == 'done') continue;
			if (links[i].className == 'done' || links[i].getAttribute('done')) continue;

			// Por cada enlace a una ficha de jugador
			if(links[i].href.search(/spieler.php\?uid=(\d+$)/) > 0) {
				var a = RegExp.$1;
				if (a == 0) continue;
				if (links[i].parentNode.className == 'menu') continue;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('uid=' + a), links[i].nextSibling);

				if (arrayplayerLinks[links[i].href]) {
					var linkspan = elem('span', arrayplayerLinks[links[i].href]);
				} else {
					var linkspan = elem('span', "");

					var igmlink2 = elem('a', "<img src='" + img("a/external.gif") + "' style='margin:3px 0px 1px 3px; display: inline' border=0>", 'target', '_blank', 'done');
					igmlink2.href = 'spieler.php?uid=' + a;
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					// Introduce el enlace para enviar mensajes usando su ID
					var igmlink2 = elem('a', "<img src='data:image/gif;base64," + imagenes["igm"] + "' style='margin:3px 0px 1px 3px; display: inline' _title='" + T('ENVIAR_IGM') + "' _alt='" + T('ENVIAR_IGM') + "' border=0>", 'target', '_blank', 'done');
					igmlink2.href = 'nachrichten.php?t=1&id=' + a;
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					var igmlink2 = elem('a', '<img src="'+img('a/b1.gif')+'">', 'target', '_blank', 'done');
					igmlink2.href = "http://www.travutils.com/?s=" + idioma2 + "&idu=" + a;

					igmlink2.style.cssText = 'display: inline; margin-left: 5px; color: #6F84FF';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					var igmlink2 = elem('a', '<img src="'+img('a/b2.gif')+'">', 'target', '_blank', 'done');
					igmlink2.href = "http://travian.ws/analyser.pl?s=" + idioma2 + "&uid=" + a;

					igmlink2.style.cssText = 'display: inline; margin-left: 5px; color: #6F84FF';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					arrayplayerLinks[links[i].href] = linkspan.innerHTML;
				}

				links[i].parentNode.insertBefore(linkspan, links[i].nextSibling);

			// Por cada enlace a una localizacion del mapa

			}else if (links[i].href.search(/karte.php\?z=(\d+)/) > 0){
				var a = RegExp.$1;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('id=' + a), links[i].nextSibling);

				if (arrayplayerLinks[links[i].href]) {
					var linkspan = elem('span', arrayplayerLinks[links[i].href]);
				} else {
					var linkspan = elem('span', "");

					var igmlink2 = elem('a', "<img src='" + img("a/external.gif") + "' style='margin:3px 0px 1px 3px; display: inline' border=0>");
					igmlink2.href = links[i].href;

					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					var igmlink2 = elem('span', ' ( ' + zid2x(a) + ' | ' + zid2y(a) + ' ) ', null, null, 'done tb_coords');
//					igmlink2.style.cssText = 'word-break: keep-all; font: 11px/1.5em Tahoma,Verdana,Arial !important; color:grey;';
//					igmlink2.className = 'tb_coords';

					igmlink2.setAttribute('done', 1);

					if (vx || vy) {
						igmlink2.addEventListener("mouseover", getVillageDist(zid2x(a), zid2y(a)), 0);
						igmlink2.addEventListener("mouseout", function(){ clearTimeout(timeout); timeout = 0; get("tb_tooltip").style.display = 'none'; }, 0);
					}

					linkspan.appendChild(igmlink2);

					var igmlink2 = elem('a',"<img src='" + img("a/att_all.gif") + "' style='margin:3px 0px 1px 3px; display: inline' height='10' width='10' _title='" + T('ATACAR') + "' _alt='" + T('ATACAR') + "' border='0'>");
					igmlink2.href = 'a2b.php?z=' + a;
					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					var igmlink2 = elem('a',T('ALDEA_EXTRA2'));
					igmlink2.href = 'build.php?z=' + a + '&gid=17';
					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					var igmlink2 = elem('a',T('ALDEA_EXTRA3'));
					igmlink2.href = 'karte.php?z=' + a;
					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					var igmlink2 = elem('a',"<img src='" + imagenes["cropfinder"] + "' style='margin:3px 0px 1px 3px; display: inline' height='12' border='0'>");
					igmlink2.href = 'http://crop-finder.com/' + idioma2 + '/' + zid2x(a) + '|' + zid2y(a) + '/';
					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);


					arrayplayerLinks[links[i].href] = linkspan.innerHTML;
				}

				links[i].parentNode.insertBefore(linkspan, links[i].nextSibling);
			}else if (links[i].href.search(/karte.php\?d=(\d+)/) > 0){
				var a = RegExp.$1;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('id=' + a), links[i].nextSibling);

				if (arrayplayerLinks[links[i].href]) {
					var linkspan = elem('span', arrayplayerLinks[links[i].href]);
				} else {
					var linkspan = elem('span', "");

					var igmlink2 = elem('a', "<img src='" + img("a/external.gif") + "' style='margin:3px 0px 1px 3px; display: inline' border=0>");
					igmlink2.href = links[i].href;

					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					var igmlink2 = elem('span', ' ( ' + zid2x(a) + ' | ' + zid2y(a) + ' ) ', null, null, 'done tb_coords');
//					igmlink2.style.cssText = 'word-break: keep-all; font: 11px/1.5em Tahoma,Verdana,Arial !important; color:grey;';
//					igmlink2.className = 'tb_coords';

					igmlink2.setAttribute('done', 1);

					if (vx || vy) {
						igmlink2.addEventListener("mouseover", getVillageDist(zid2x(a), zid2y(a)), 0);
						igmlink2.addEventListener("mouseout", function(){ clearTimeout(timeout); timeout = 0; get("tb_tooltip").style.display = 'none'; }, 0);
					}

					linkspan.appendChild(igmlink2);

					var igmlink2 = elem('a',"<img src='" + img("a/att_all.gif") + "' style='margin:3px 0px 1px 3px; display: inline' height='10' width='10' _title='" + T('ATACAR') + "' _alt='" + T('ATACAR') + "' border='0'>");
					igmlink2.href = 'a2b.php?z=' + a;
					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					var igmlink2 = elem('a',T('ALDEA_EXTRA2'));
					igmlink2.href = 'build.php?z=' + a + '&gid=17';
					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					var igmlink2 = elem('a',T('ALDEA_EXTRA3'));
					igmlink2.href = 'karte.php?z=' + a;
					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					var igmlink2 = elem('a',"<img src='" + imagenes["cropfinder"] + "' style='margin:3px 0px 1px 3px; display: inline' height='12' border='0'>");
					igmlink2.href = 'http://crop-finder.com/' + idioma2 + '/' + zid2x(a) + '|' + zid2y(a) + '/';
					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);


					arrayplayerLinks[links[i].href] = linkspan.innerHTML;
				}

				links[i].parentNode.insertBefore(linkspan, links[i].nextSibling);

				links[i].addEventListener("mouseover", crearEventoRecursosCasilla(links[i].href, links[i]), 0);
				links[i].addEventListener("mouseout", function(){ clearTimeout(timeout); timeout = 0; get("tb_tooltip").style.display = 'none'; }, 0);

//				var atklink = elem('span',
//					"<a href='a2b.php?z=" + a + "'><img src='" + img("a/att_all.gif") + "' style='margin:3px 0px 1px 3px; display: inline' height='10' width='10' title='" + T('ATACAR') + "' alt='" + T('ATACAR') + "' border='0'></a>"
//					+ "<a href='build.php?z=" + a + "&gid=17'>" + T('ALDEA_EXTRA2') + "</a>"
//					+ "<a href='karte.php?z=" + a + "'>" + T('ALDEA_EXTRA3') + "</a>"
//				);
//
//				links[i].parentNode.insertBefore(atklink, links[i].nextSibling);

//				city.appendChild(elem("TD", "<a href='build.php?z=" + id + "&gid=17'>" + T('ALDEA_EXTRA2') + "</a>"));
//				city.appendChild(elem("TD", "<a href='karte.php?z=" + id + "'>" + T('ALDEA_EXTRA3') + "</a>"));

			// Por cada enlace a la ficha de una alianza
			}else if (links[i].href.search(/allianz.php\?aid=(\d+$)/) > 0){
				var a = RegExp.$1;
				if (a == 0) continue;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('aid=' + a), links[i].nextSibling);

				if (arrayplayerLinks[links[i].href]) {
					var linkspan = elem('span', arrayplayerLinks[links[i].href]);
				} else {
					var linkspan = elem('span', "");

					var igmlink2 = elem('a', "<img src='" + img("a/external.gif") + "' style='margin:3px 0px 1px 3px; display: inline' border=0>");
					igmlink2.href = links[i].href;

					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					var igmlink2 = elem('a', '<img src="'+img('a/b1.gif')+'">');
					igmlink2.href = "http://www.travutils.com/?s=" + idioma2 + "&ida=" + a;

					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);
					igmlink2.style.cssText = 'display: inline; margin-left: 5px; color: #6F84FF';

					linkspan.appendChild(igmlink2);

					var igmlink2 = elem('a', '<img src="'+img('a/b2.gif')+'">');
					igmlink2.href = "http://travian.ws/analyser.pl?s=" + idioma2 + "&aid=" + a;

					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);
					igmlink2.style.cssText = 'display: inline; margin-left: 5px; color: #6F84FF';

					linkspan.appendChild(igmlink2);

					arrayplayerLinks[links[i].href] = linkspan.innerHTML;
				}

				links[i].parentNode.insertBefore(linkspan, links[i].nextSibling);

			}else if (links[i].href.search(/allianz.php\?s=2/) > 0){

				if (arrayplayerLinks[links[i].href]) {
					var linkspan = elem('span', arrayplayerLinks[links[i].href]);
				} else {
					var linkspan = elem('span', "");

					var igmlink2 = elem('a', "<img src='" + img("a/external.gif") + "' style='margin:3px 0px 1px 3px; display: inline' border=0>");
					igmlink2.href = links[i].href;

					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					arrayplayerLinks[links[i].href] = linkspan.innerHTML;
				}

				links[i].parentNode.insertBefore(linkspan, links[i].nextSibling);

			} else if (links[i].href.search(/berichte.php\?id=(\d+$)/) > 0){
				var a = RegExp.$1;
				if (a == 0) continue;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('aid=' + a), links[i].nextSibling);

				if (arrayplayerLinks[links[i].href]) {
					var linkspan = elem('span', arrayplayerLinks[links[i].href]);
				} else {
					var linkspan = elem('span', "");

					var igmlink2 = elem('a', "<img src='" + img("a/external.gif") + "' style='margin:3px 0px 1px 3px; display: inline' border=0>");
					igmlink2.href = 'berichte.php?id=' + a;

					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					arrayplayerLinks[links[i].href] = linkspan.innerHTML;
				}

				links[i].parentNode.insertBefore(linkspan, links[i].nextSibling);

			} else if (links[i].href.search(/nachrichten.php\?id=(\d+$)/) > 0){
				var a = RegExp.$1;
				if (a == 0) continue;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('aid=' + a), links[i].nextSibling);

				if (arrayplayerLinks[links[i].href]) {
					var linkspan = elem('span', arrayplayerLinks[links[i].href]);
				} else {
					var linkspan = elem('span', "");

					var igmlink2 = elem('a', "<img src='" + img("a/external.gif") + "' style='margin:3px 0px 1px 3px; display: inline' border=0>");
					igmlink2.href = 'nachrichten.php?id=' + a;

					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					arrayplayerLinks[links[i].href] = linkspan.innerHTML;
				}

				links[i].parentNode.insertBefore(linkspan, links[i].nextSibling);

			} else if (links[i].href.search(/build.php\?id=\d+&t=1&a=(.+$)/) > 0){
				var a = RegExp.$1;
				if (a == 0) continue;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('aid=' + a), links[i].nextSibling);

				if (arrayplayerLinks[links[i].href]) {
					var linkspan = elem('span', arrayplayerLinks[links[i].href]);
				} else {
					var linkspan = elem('span', "");

					var igmlink2 = elem('a', "<img src='" + img("a/external.gif") + "' style='margin:3px 0px 1px 3px; display: inline' border=0>");
					igmlink2.href = links[i].href;

					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					arrayplayerLinks[links[i].href] = linkspan.innerHTML;
				}

				links[i].parentNode.insertBefore(linkspan, links[i].nextSibling);
			} else if (links[i].href.search(/a2b.php\?d=(\d+)&c=.+$/) > 0){
				var a = RegExp.$1;
				if (a == 0) continue;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('aid=' + a), links[i].nextSibling);

				if (arrayplayerLinks[links[i].href]) {
					var linkspan = elem('span', arrayplayerLinks[links[i].href]);
				} else {
					var linkspan = elem('span', "");

					var igmlink2 = elem('a', "<img src='" + img("a/external.gif") + "' style='margin:3px 0px 1px 3px; display: inline' border=0>");
					igmlink2.href = links[i].href;

					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					arrayplayerLinks[links[i].href] = linkspan.innerHTML;
				}

				links[i].parentNode.insertBefore(linkspan, links[i].nextSibling);

			} else if (links[i].href.search(/build.php\?id=(\d+)&a=(\d+)&t=.+$/) > 0){
//			http://s4.travian.tw/build.php?id=39&a=4&t=11813131

				var a = RegExp.$1;
				if (a == 0) continue;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('aid=' + a), links[i].nextSibling);

				if (arrayplayerLinks[links[i].href]) {
					var linkspan = elem('span', arrayplayerLinks[links[i].href]);
				} else {
					var linkspan = elem('span', "");

					var igmlink2 = elem('a', "<img src='" + img("a/external.gif") + "' style='margin:3px 0px 1px 3px; display: inline' border=0>");
					igmlink2.href = links[i].href;

					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					arrayplayerLinks[links[i].href] = linkspan.innerHTML;
				}

				links[i].parentNode.insertBefore(linkspan, links[i].nextSibling);

			} else if (links[i].href.search(/travilog.org.ua/i) > 0) {
				if (arrayplayerLinks[links[i].href]) {
					var linkspan = elem('span', arrayplayerLinks[links[i].href]);
				} else {
					var linkspan = elem('span', "");

					var igmlink2 = elem('a', "<img src='" + img("a/external.gif") + "' style='margin:3px 0px 1px 3px; display: inline' border=0>");
					igmlink2.href = links[i].href;

					igmlink2.target = '_blank';
					igmlink2.className = 'done';
					igmlink2.setAttribute('done', 1);

					linkspan.appendChild(igmlink2);

					arrayplayerLinks[links[i].href] = linkspan.innerHTML;
				}

				links[i].parentNode.insertBefore(linkspan, links[i].nextSibling);
			}

			if (!links[i].className) links[i].className = 'done';
			links[i].setAttribute('done', 1);
		}
	}

	/**
	 * Anyade un nuevo boton en la vista de informes y mensajes para marcar todas las casillas
	 */
	function opcionesMensajes(){

		var a = find("//*[@class='s7']", XPList);
		var fila;

		for (var i = 0; i < a.snapshotLength - 1; i++){
			fila = a.snapshotItem(i);
			if ((fila.firstChild != null) && (fila.firstChild.nodeName == "INPUT")){
				fila.innerHTML += ' <input class="std" name="mtodo" type="button" value="' + T('MARK') + '" onClick="for(var x = 0; x < document.msg.elements.length; x++) document.msg.elements[x].checked = \'checked\';"/>';
				if (!plus) fila.innerHTML += ' <input class="std" name="archive" type="Submit" value="' + T('ARCHIVE') + '"/>';
				break;
			}
		}

		var a = find("//p[@class='txt_menue']", XPFirst);
		if (a && location.href.indexOf('nachrichten.php?t=1') <= 0) {

			var Input3 = elem('input', null, 'value', getOption("opcionesmensajespreload",0,"integer"), 'fm');
			Input3.size = 4;
			Input3.addEventListener('change', function(){
				setOption('opcionesmensajespreload', this.value);
				document.location.reload();

			}, false);

			if (location.href.match(/berichte.php/)) {
				var Input4 = elem('input', null, 'value', getOption("deleteberichte_t3",0,"integer"), 'fm');
				Input4.size = 4;
				Input4.addEventListener('change', function(){
					setOption('deleteberichte_t3', this.value);

				}, false);
				insertAfter(a, Input4);
				insertAfter(a, document.createTextNode(' ' + T('deleteberichte_t3')));

//				fila.innerHTML += ' <input class="std" type="button" value="' + T('deleteberichte_t3_button') + '"/>';

				var Input5 = createElementAppend('input', fila, null, 'type', 'button', 'std');
				Input5.value = T('deleteberichte_t3_button');
				_attachEvent(Input5, 'click', function () {

					if (getOption("deleteberichte_t3",0,"integer") <= 0) return;

					var ids = find("//form[@name='msg']//input[contains(@name, 'n') and @type='checkbox']", XPList);

					for (var i = 0; i < ids.snapshotLength ; i++){
						var linkid = ids.snapshotItem(i).value;

						ajaxRequest('berichte.php?id='+linkid, "GET", null, function (t) {
							var ajaxdoc = new ajaxCreateDocument(t);
							var ans = ajaxdoc.ans;
							var ansdoc = ajaxdoc.ansdoc;


							var tab=find("//table[@class='tbg']/tbody", XPList, ans, ansdoc);

							if(tab.snapshotItem(1)==undefined)return;
							if(tab.snapshotItem(1).parentNode.id=='MeXaon_ver_table')return;
							if(tab.snapshotItem(1).parentNode.getElementsByTagName("td").length < 24)return;
							if(tab.snapshotItem(1).getElementsByTagName("td")[0].textContent.charCodeAt(0)==160) return;

							// fix anchors
							var fa = tab.snapshotItem(0).getElementsByTagName('a');
							for( var i = 0; i < fa.length; i++) {
								fa[i].href = fa[i].href;
							}
							//

							var table=tab.snapshotItem(1).getElementsByTagName("td");

							var troops=0; //1-romans 2-teutons 3-gauls
							var tm;

							if(table[3].innerHTML.indexOf("u/1.gif")>0) troops=1;
							if(table[3].innerHTML.indexOf("u/11.gif")>0) troops=2;
							if(table[3].innerHTML.indexOf("u/21.gif")>0) troops=3;
							switch (troops){
								case 1:tm=romans;break;
								case 2:tm=teutons;break;
								case 3:tm=gauls;break;
								default:tm=null;break;
							}

							var statushero=0;

							if(table[13].innerHTML.indexOf("img")>0) {statushero=1;}
							var tda=14+statushero;

							var eat = 0;

							for(var i=0;i<=(9+statushero);i++){
								eat = eat + table[tda+i].textContent*tm[i][7];
							}

//							alert(eat);
							var deleteberichte_t3 = getOption("deleteberichte_t3",0,"integer");

							if (eat <= deleteberichte_t3 || !deleteberichte_t3) {
								t.url.match(/\?id=(\d+)/);
								var linkid = RegExp.$1;

								var ids = find("//form[@name='msg']//input[@value='"+linkid+"' and @type='checkbox']", XPFirst);
								ids.checked = true;
							}

						}, dummy);

//						alert(linkid);

//						alert(linkid);
					}
				});

				insertBefore(Input5, document.createTextNode(' '));
			}

			insertAfter(a, Input3);
			insertAfter(a, document.createTextNode(T('PRELOAD')));
			insertAfter(a, elem("P"));
		}

		opcionesMensajesPage();
	}

	function opcionesMensajesPage (page) {
		var prepage = 10;
		var opcionesmensajespreload = getOption("opcionesmensajespreload",0,"integer");

		if (!opcionesmensajespreload) {
			return 1;
		} else if (!page) {
			return opcionesMensajesPage (1);
		}

		location.href.match(/\?(.*&)?s=(\d+)/);
		var pagenow = RegExp.$2;
		pagenow = pagenow ? pagenow : 0;

		var pagelink = find("//form[@name='msg']//table[@class='tbg']//tr[@class='rbg'][2]//td[@class='r7']//a", XPList);

		if (page <= opcionesmensajespreload) {
//			 setTimeout(opcionesMensajesPage(1),getRandTimeRange(600));

//			var linkpages = xpathEvaluate("//form[@name='msg']//table[@class='tbg']//tr[@class='rbg'][2]//td[@class='r7']//a[contains(@href, 's=')]");

			var linkxpres = "//form[@name='msg']//table[@class='tbg']//tr[@class='rbg'][2]//td[@class='r7']//a[contains(@href, 's=')]";
			var linkpages = find(linkxpres, XPList);
			if (!linkpages.snapshotLength) {
				linkxpres = "//form[@name='msg']//table[@class='tbg']//tr[@class='rbg'][2]//td[3]//a[contains(@href, 's=')]";
				linkpages = find(linkxpres, XPList);
			}

			if (linkpages.snapshotLength > 0) {
				for (var i=0; i<linkpages.snapshotLength; i++) {
					if (linkpages.snapshotItem(i).href.search(/s=(\d+)/)) {
						var a = parseInt(RegExp.$1);
						if (a == 0) continue;

						var npage = 0;

						if (a <= pagenow || (i == 0 && linkpages.snapshotLength > 1)) {
							npage = a - prepage * opcionesmensajespreload;
							if (npage <= 0) npage = 0;
							linkpages.snapshotItem(i).href = linkpages.snapshotItem(i).href.replace(/(s=(\d+))/igm, "s="+npage);
						} else {
							npage = a + prepage;
						}

						if (npage <= 0) npage = 0;

//						alert(a+':'+npage);

//						linkpages.snapshotItem(i).href = linkpages.snapshotItem(i).href.replace(/(s=(\d+))/igm, "s="+npage);
					}
				}

//				if (!a || npage <= (pagenow + page * prepage)) return;
				if (!a || a < pagenow) return;

//				alert(a +':' + npage + ':' + (pagenow + (page) * prepage));

				ajaxRequest(linkpages.snapshotItem(i-1).href, "GET", null,
					function (t) {
//						var prepage = 10;
//						var opcionesmensajespreload = getOption("opcionesmensajespreload",0,"integer");

						pagenow = parseInt(pagenow) + (page * prepage);

						var ajaxdoc = new ajaxCreateDocument(t);
						var ans = ajaxdoc.ans;
						var ansdoc = ajaxdoc.ansdoc;

						var xpres = ansdoc.evaluate("//form[@name='msg']//table[@class='tbg']//tr", ans, null, XPList, null);

						var linktr = find("//form[@name='msg']//table[@class='tbg']//tr[@class='rbg'][2]", XPFirst);

						for(var i=1;i<xpres.snapshotLength-1; i++) {
							var mrow = xpres.snapshotItem(i);

							insertBefore(linktr, mrow);
						}

						var linkpages2 = find(linkxpres, XPList, ans, ansdoc);
						var linkpages = find(linkxpres, XPList);
//						if (linkpages.snapshotLength > 0) {

							if (linkpages.snapshotLength > 0 && linkpages2.snapshotLength > 0) {
								for (var i=0; i<linkpages.snapshotLength; i++) {
									if (linkpages.snapshotItem(i).href.search(/s=(\d+)/)) {
										var a = parseInt(RegExp.$1);
										if (a == 0) continue;

//										var npage = 0;

										if (a < pagenow || (i == 0 && linkpages.snapshotLength > 1)) {
											npage = a - prepage;

//											alert(a+':'+npage+':'+opcionesmensajespreload+':'+prepage+':'+pagenow);
										} else {
											npage = a + prepage * (opcionesmensajespreload + 0);


//											alert(a+':'+npage+':'+opcionesmensajespreload);

											linkpages.snapshotItem(i).href = linkpages.snapshotItem(i).href.replace(/(s=(\d+))/igm, "s="+npage);
										}
									}

//									alert(a+':'+npage+':'+opcionesmensajespreload);
								}

								page++;
								if (page <= opcionesmensajespreload && linkpages2.snapshotLength > 1) {
									opcionesMensajesPage(page);

//									alert(page);
								}
							}


//							for (var i=0; i<linkpages.snapshotLength; i++) {
//								if (linkpages2.snapshotItem(i).href.search(/s=(\d+)/)) {
//									var a = parseInt(RegExp.$1);
//									if (a == 0) continue;
//
//									var npage = 0;
//
//									if (a <= pagenow || (i == 0 && linkpages.snapshotLength > 1)) {
//										npage = a - prepage;
//									} else {
//										npage = a + prepage;
//									}
//
//									if (npage <= 0) npage = 0;
//
//									linkpages2.snapshotItem(i).href = linkpages.snapshotItem(i).href.replace(/(s=(\d+))/igm, "s="+npage);
//								}
//							}
//
//							page++;
//							if (page <= opcionesmensajespreload && npage > pagenow) {
//								opcionesMensajesPage(page);
//							}
//						}

						playerLinks();

//						alert(i + xpres.snapshotItem(i).innerHTML);
					}
				, dummy);
			}
		}



	}

	function ajaxCreateDocument (xmlHttpRequest) {
		this.ans = elem("DIV", xmlHttpRequest.responseText);
		this.ansdoc = document.implementation.createDocument("", "", null);
		this.ansdoc.appendChild(this.ans);
	}

	/**
	 * Crea eventos para enviar al formulario de envio de materias primas del mercado las coordenadas
	 * de las propias aldeas.
	 *
	 * Codigo sugerido por Bafox
	 */
	function quickCity(){
		// Comprueba si esta el formulario de envio
		if (find("//form[@name='snd']", XPFirst) == null) return;
		var ciudades = new Array();

		// Recupera la coordenada X
		var n = find("//table[@class='dtbl']//td[@class='right dlist1']", XPList);
		for(var i = 0; i < n.snapshotLength; i++){
			ciudades[i] = new Object();
			try{ ciudades[i].x = n.snapshotItem(i).innerHTML.split('(')[1]; }catch(e){}
		}

		// Recupera la coordenada Y
		n = find("//table[@class='dtbl']//td[@class='left dlist3']", XPList);
		for(var i = 0; i < n.snapshotLength; i++){
			try{ ciudades[i].y = n.snapshotItem(i).innerHTML.split(')')[0]; } catch(e){}
		}

		// Por cada par de coordenadas crea un evento para copiarlas al formulario
		n = find("//table[@class='dtbl']//tr", XPList);
		for (var i = 0; i < ciudades.length; i++){
			var elem = n.snapshotItem(i);
			elem.setAttribute('onClick',"snd.x.value='" + ciudades[i].x + "';snd.y.value='" + ciudades[i].y + "'");
			elem.setAttribute('onMouseOver', 'this.style.color="red"');
			elem.setAttribute('onMouseOut', 'this.style.color="black"');
			elem.style.cursor = "pointer";
		}
	}

	/**
	 * Calcula y muestra informacion adicional en los informes de los ataques
	 * Codigo inicial de Bafox
	 */
	function reportBatalla(){
		var t = find("//table[@class='tbg']//table[@class='tbg']", XPList);
		if (t.snapshotLength < 2) return;

		// Encuentra y suma todas las cantidades del botin
		var botin = null;
		var a = find("//tr[@class='cbg1']", XPList);
		if (a.snapshotLength >= 3){
			// FIXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
			if (a.snapshotItem(1).childNodes.length == 4){
				var b = a.snapshotItem(1).childNodes[3];
			}else{
				var b = a.snapshotItem(1).childNodes[1];
			}
			if (b.childNodes.length == 8){
				var cantidades_botin = new Array();
				cantidades_botin[0] = parseInt(b.childNodes[1].nodeValue);
				cantidades_botin[1] = parseInt(b.childNodes[3].nodeValue);
				cantidades_botin[2] = parseInt(b.childNodes[5].nodeValue);
				cantidades_botin[3] = parseInt(b.childNodes[7].nodeValue);
				botin = arrayToInt(cantidades_botin);
				var info_botin = '';
				for (var i = 0; i < 4; i++){
					info_botin += '<img src="' + img('r/' + (i + 1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">';
					info_botin += cantidades_botin[i];
					if (i < 3) info_botin += ' + '; else info_botin += ' = ';
				}
				info_botin += botin;
				b.innerHTML = info_botin;
			}
		}

		var perds = new Array();
		var carry = new Array();
		// Por cada participante en la batalla (atacante, defensor y posibles apoyos)
		for(var g = 0; g < t.snapshotLength; g++){
			carry[g] = 0;
			var tt = t.snapshotItem(g);
			var num_elementos = tt.rows[1].cells.length - 1;
			for(var j = 1; j < 11; j++){
				// Recupera la cantidades de tropa de cada tipo que han intervenido
				var u = uc[tt.rows[1].cells[j].getElementsByTagName('img')[0].src.replace(/.*\/.*\//,'').replace(/\..*/,'')];
				var p = tt.rows[3] ? tt.rows[3].cells[j].innerHTML : 0;
				// Basandose en el coste por unidad y su capacidad, se calculan las perdidas y la capacidad de carga total
				var ptu = arrayByN(u, p);
				perds[g] = arrayAdd(perds[g], ptu.slice(0, 4));
				carry[g] += (tt.rows[2] ? tt.rows[2].cells[j].innerHTML - p : 0) * u[4];
			}

			// Anyade la nueva informacion como una fila adicional en cada tabla
//			另有插件  將其移除
//			var informe = elem("TD");
//			for (var i = 0; i < 4; i++){
//				informe.innerHTML += '<img src="' + img('r/' + (i + 1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">';
//				informe.innerHTML += perds[g][i];
//				if (i < 3) informe.innerHTML += ' + '; else informe.innerHTML += ' = ';
//			}
//			var perdidas = arrayToInt(perds[g]);
//			informe.innerHTML += perdidas;
//			informe.colSpan = num_elementos;
//			informe.className = "s7";
//			var fila = elem("TR");
//			fila.className = "cbg1";
//			fila.appendChild(elem("TD", T('PERDIDAS')));
//			fila.appendChild(informe);
//			tt.appendChild(fila);

			// Solo para el atacante se calcula y muestra la rentabilidad y eficiencia del ataque
			if (g == 0 && botin != null){
				var datos = elem("TD");
				var fila_datos = elem("TR");
				datos.colSpan = num_elementos;

				// La rentabilidad muestra el botin en comparacion con las perdidas

				var rentabilidad = Math.round((botin - perdidas) * 100 / botin);
				if (botin == 0)	if (perdidas == 0) rentabilidad = 0; else rentabilidad = -100;
				datos.innerHTML = rentabilidad + "%";
				datos.className = "s7";
				fila_datos.className = "cbg1";
				fila_datos.appendChild(elem("TD", T('RENT')));
				fila_datos.appendChild(datos);
				tt.appendChild(fila_datos);

				var datos = elem("TD");
				var fila_datos = elem("TR");
				datos.colSpan = num_elementos;

				// La eficiencia muestra el botin en comparacion con la cantidad de tropas utilizadas

				var eficiencia = 100 - Math.round((carry[g] - botin) * 100 / carry[g]);
				if (carry[g] == 0) eficiencia = 0;
				datos.innerHTML = eficiencia + "%";
				datos.className = "s7";
				fila_datos.className = "cbg1";
				fila_datos.appendChild(elem("TD", T('EFICIENCIA')));
				fila_datos.appendChild(datos);
				tt.appendChild(fila_datos);

			}
		}
	}

	/**
	 * Realiza un resumen de la pagina de produccion
	 * It makes a summary of the production page
	 * 生産
	 */
	function preCalculate1(){
		var datos = 0;

		// Crea una matriz inicializada a 0 con todos los posibles niveles de cada tipo de recurso
		var grid = new Array(4);
		for(i = 0; i < 4; i ++) {
			grid[i] = new Array(26);
			for(j = 0; j <= 25; j++) {
				grid[i][j] = 0;
			}
		}

		// Solo hay 6 tipos de aldeas de 15 casillas cada uno. Se describe el tipo de recurso por casilla
		var dist = [
			[3, 3, 0, 3, 3, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], // 9 cereales
			[2, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 2, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[3, 3, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3] // 15 cereales
		];

		find("//div[starts-with(@id, 'f')]", XPFirst).id.search(/f(\d)/);
		var tipo = RegExp.$1;

		// Recupera todas las casillas y rellena la matriz con los niveles detectados
		for (var i = 1; i <= 18; i++){
			var a = find("//img[@class='rf" + i + "']", XPFirst);
			if (a){
				a.src.search(/\/s(\d+).gif$/);
				grid[dist[tipo - 1][i - 1]][RegExp.$1]++;
			}else{
				grid[dist[tipo - 1][i - 1]][0]++;
			}
		}
		// Crea una tabla mostrando por cada tipo de recurso un representante de cada nivel que se ha encontrado
		// Muestra al lado de cada uno los recursos y tiempo restantes hasta poder subirlo de nivel
		var table = elem('TABLE');
		table.setAttribute("class", "tbg");
		table.setAttribute("align", "center");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "2");
		var fila1 = elem('TR');
		var fila2 = elem('TR');
		fila1.setAttribute("class", "rbg");
		table.appendChild(fila1);
		table.appendChild(fila2);
		for (var i = 0; i < 4; i++)
		{
			var td1 = elem('TD', '<img src="' + img('r/' + (i+1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">');
			fila1.appendChild(td1);

			var td2 = elem('TD');
			td2.setAttribute('valign', 'top');
			fila2.appendChild(td2);

			var table2 = elem('TABLE');
			table2.setAttribute("align", "center");
			td2.appendChild(table2);
			for (var j = 0; j < 25; j++)
			{
				if (grid[i][j] > 0 && buildingCost[i][j+1] != null)
				{
					datos = 1;
					var fila3 = elem('TR');
					//var tipDiv = elem('DIV');
					fila3.setAttribute('id', 'tip_' + i + '_' + j);
					var imagen = '<div style="width: 0%;"><img src="data:image/gif;base64,' + imagenes["r" + i] + '" border="0" title="' + T('RECURSO' + (i+1)) + '">';
					if (j > 0) imagen += '<img src="' + img('g/s/s' + j + '.gif') + '" style="position:relative; bottom:52px; left: 27px;" border="0">';
					imagen += '</div>';
					var td = elem("TD", imagen);
					fila3.appendChild(td);

					var restante = calculateResourceTime(buildingCost[i][j+1], true);
					var td3 = elem('TD');
					//td3.setAttribute('class', 'c f7');
					td3.setAttribute('style','color:#333; font-size: 12px; vertical-align: top');

					fila3.appendChild(td3);
					table2.appendChild(fila3);

					if (restante != null) td3.innerHTML = restante;
					else td3.innerHTML = '<span style="color: #FF6F0F; font-weight: bold;">' + T('SUBIR_NIVEL') + '</span>';

					var cpPerDay = [buildingCost[i][j][4], buildingCost[i][j + 1][4]];
					td3.innerHTML += '<br>' + T('CPPERDAY') + ": " + cpPerDay[0] + " → " + cpPerDay[1];
				}
			}
		}
//		table.style.position = 'absolute';
		table.setAttribute("id", "resumen");
		// Se desplaza la tabla hacia abajo para no interferir con la lista de aldeas / enlaces derecha
//		table.style.top = 580 + longitudPantalla() + 'px';
		if (datos == 1) {

			var divt = elem('DIV');
			divt.style.display = 'block';
			divt.style.position = 'absolute';




			var oh = 290;
			var height = get('ltrm') ? get('ltrm').clientHeight : 0;
			var height2 = get('lbau1') ? get('lbau1').clientHeight : 0;
			var height3 = get('ltbw0') ? get('ltbw0').clientHeight - 60 : 0;

			oh = oh - (height3 > 0 ? height3 : 0);

			divt.style.top = 610 + ((oh - height - height2) >= 0 ? 0 : (height + height2 - oh)) + 'px';

			divt.appendChild(table);
			document.body.appendChild(divt);

//			document.body.appendChild(table);
		}

//		/**
//		* xingulin︰加上資源田提示 tip
//		* Begin
//		*/
//		// 加入 tip 區塊
//		if($('#lbau1').length != 0)
//		{
//			$('#lbau1').after("<div id='stateTip'  style='border: 1px solid #CCC;  color: #333; display: none; font-size: 12px; width: 500px; height: 75px;'></div>");
//		}
//		else
//		{
//			$('#lmid2').append("<div id='stateTip' style='position: absolute; left: 30px;  color: #333;  top: 350px;  font-size: 12px; width: 500px; height: 75px; border: 1px solid #CCC; display: none;'></div>");
//		}
//
//		// 幫每個資源田加上 Hover Event Handler，處理 tip 的顯示與隱藏
//		//for (var i = 1; i <= 18; i++)
//		$('//map[@name="rx"]/area').each(function(i)
//		{
//			if(i != 18) // 跳過最後一個<area />(村莊中心)
//			{
//				var resource;
//				var resource_level;
//				var resource_type;
//				if ( resource = $('img.rf' + (i + 1) + ':eq(0)') )
//				{
//					$(resource).attr('src').search(/\/s(\d+).gif$/);
//					resource_level = parseInt(RegExp.$1);
//					resource_type = parseInt(dist[tipo - 1][i]);
//					$($('//map[@name="rx"]/area:eq(' + i + ')')).hover
//					(
//						function()
//						{
//							var imagen = '<div style="width: 0%;"><img src="data:image/gif;base64,' + imagenes["r" + resource_type] + '" border="0" title="' + T('RECURSO' + (resource_type + 1)) + '">';
//							if (resource_level > 0)
//								imagen += '<img src="' + img('g/s/s' + resource_level + '.gif') + '" style="position:relative; bottom:52px; left: 27px;" border="0">';
//							imagen += '</div>';
//
//							var restante = calculateResourceTime(buildingCost[resource_type][resource_level + 1], false);
//							if(restante == null)
//							{
//								restante = '<span style="color: #FF6F0F; font-weight: bold;">' + T('SUBIR_NIVEL') + '</span>';
//							}
//
//							$('#stateTip').attr('innerHTML', '<div style="float: left; display: table-cell">' + imagen + '</div><div style="float: left; display: table-cell; padding-top: 10px; width: 400px;">' + restante + '</div>');
//							if($('#lbau1').length != 0)
//							{
//								$('#summary').css('top', parseInt($('#summary').css('top')) + (parseInt($('#lbau1').attr('height')) + $('#stateTip').height() - 115));
//							}
//							else
//							{
//								$('#summary').css('top', parseInt($('#summary').css('top')) + ($('#stateTip').height() - 115));
//							}
//							$('#stateTip').show();
//						},
//						function()
//						{
//							$('#summary').css('top', 580 + longitudPantalla() + 'px');
//							$('#stateTip').hide();
//							$('#stateTip').attr('innerHTML', '');
//						}
//					);
//
//				}
//			}
//		});
//		/**
//		* END
//		*/
	}

	/**
	 * It makes a summary of the page of buildings of the village
	 * 建築物列表
	 */
//	function preCalculate2(){
//		var data = 0;
//		var buildingsImages = new Array();
//		var buildingsDescs = new Array();
//		var buildingsLinks = new Array();
//
//		// recoge los nombres de cada uno
//		xpathResult = find('//map[@name="map1"]/area/@title', XPIter);
//		while ((buildingsDescs[buildingsDescs.length] = xpathResult.iterateNext())) {}
//
//		// los enlaces para acceder directamente a ellos
//		xpathResult = find('//map[@name="map1"]/area/@href', XPIter);
//		while ((buildingsLinks[buildingsLinks.length] = xpathResult.iterateNext())) {}
//
//
//		// Procesa as imagenes de los edificios
//		//var xpathResult = find('//td[@class="s3"]/img/@src', XPIter);
//		var xpathResult = find('//div[@id="lmid2"]/img/@src', XPIter);
//		buildingsImages[0] = document.createTextNode(img("g/g16.gif"));
//		while ((buildingsImages[buildingsImages.length] = xpathResult.iterateNext())) {}
//		// Soporte para murallas
//		var a = find("//div[starts-with(@class, 'd2_x')]", XPFirst);
//		if (a){
//			switch(a.className){
//				case 'd2_x d2_0': break;
//				case 'd2_x d2_1': var b = "g/g31.gif"; break;
//				case 'd2_x d2_11': var b = "g/g32.gif"; break;
//				case 'd2_x d2_12': var b = "g/g33.gif"; break;
//			}
//			if (b) buildingsImages[buildingsDescs.length - 4] = document.createTextNode(img(b));
//		}
//
//		//主層表格
//		var rowcell = 3;
//		var table = elem('TABLE');
//		//table.setAttribute("class", "tbg");
//		//table.setAttribute("align", "center");
//		table.setAttribute("cellspacing", "0");
//		table.setAttribute("cellpadding", "3");
//		table.setAttribute("style", "width:100%;border-collapse:collapse;");
//		var colgroup = elem('COLGROUP');
//		var col = elem('COL');
//		col.setAttribute("style", 'width:' + Math.floor(100 /rowcell) +'%;');
//		col.setAttribute("span", rowcell);
//		colgroup.appendChild(col);
//		table.appendChild(colgroup);
//
//		var tablecell  = new Array();
//		var j = 0;
//		//顯示方式
//		for(var i = 0; i < buildingsDescs.length - 3; i++)
//		{
//			if(buildingsDescs[i] != null && basename(buildingsImages[i].nodeValue) != 'iso.gif')
//			{
//				// Por cada edificio se recoge su nivel y su codigo en el juego
//				buildingLevel = buildingsDescs[i].nodeValue.split(" ");
//				buildingLevel = parseInt(buildingLevel[buildingLevel.length-1]);
//
//				buildingCode = buildingsImages[i].nodeValue.split("/");
//				buildingCode = buildingCode[buildingCode.length-1].split(".");
//				buildingCode = parseInt(buildingCode[0].substring(1, buildingCode[0].length));
//
//				// Si es actualizable se muestra junto con los recursos que necesita
//				if (buildingCost[buildingCode] != null && buildingCost[buildingCode][buildingLevel+1] != null)
//				{
//					data = 1;
//					tablecell[j] = elem("TD");
//					//tablecell[j].setAttribute('class', 'f10');
//					tablecell[j].setAttribute("style", "border:1px solid #C0C0C0;vertical-align:top;");
//					var title = elem("DIV");
//					var state = elem("DIV");
//					var state2 = elem("DIV");
//
//					title.setAttribute('class', 'f10');
//					title.innerHTML = '<a href="' + buildingsLinks[i].nodeValue + '">' + buildingsDescs[i].nodeValue + '</a>&nbsp;&nbsp;<span>(<a href="javascript:void(null)" class="tip" style="color: #387AD7;">展開/折疊</a>)</span>';
//
//					var restante = calculateResourceTime(buildingCost[buildingCode][buildingLevel+1]);
//					//將此處更改為升級2級 by Arrack
//					if (buildingCost[buildingCode] != null && buildingCost[buildingCode][buildingLevel+2] != null)
//					{
//
//						var restante_temp=[0,0,0,0];
//
//						for (var ii = 0; ii < 4; ii++){
//							restante_temp[ii] = buildingCost[buildingCode][buildingLevel+1][ii]+buildingCost[buildingCode][buildingLevel+2][ii];
//						}
//
//						var restante2 = calculateResourceTime(restante_temp);
//
//						//var restante2 = calculateResourceTime(buildingCost[buildingCode][buildingLevel+2]);
//					}
//					//state.setAttribute('class', 'c f10');
//					state.setAttribute('style','color:#333; font-size: 12px; margin-top: 5px;');
//
//					state.innerHTML += T('UPLV') + (buildingLevel+1) + '<br>';
//
//					if (restante != null)
//					{
//						state.innerHTML += restante;
//					}
//					else // 可升級
//					{
//						//明顯的連結標示
//						state.innerHTML += '<a href="' + buildingsLinks[i].nodeValue + '" style="color: #FF6F0F;">' + T('SUBIR_NIVEL') + '</a>';
//					}
//
//					//state.innerHTML += '<br>--<br>' + T('UPLV') + (buildingLevel+2) + '<br>';
//					state2.setAttribute('style', 'display: none; font-size: 12px; color: #333; margin-top: 10px; padding-top: 10px; border-top: 1px dashed');
//					state2.setAttribute('class', 'state2');
//					state2.innerHTML = T('UPLV') + (buildingLevel+2) + '<br>';
//
//					if (restante2 != null)
//					{
//						state2.innerHTML += restante2;
//					}
//					else // 可升級
//					{
//						//明顯的連結標示
//						state2.innerHTML += '<a href="' + buildingsLinks[i].nodeValue + '" style="color: #FF6F0F;">' + T('SUBIR_NIVEL') + '</a>';
//					}
//
//
//					tablecell[j].appendChild(title);
//					tablecell[j].appendChild(state);
//					tablecell[j].appendChild(state2);
//					j++;
//				}
//
//			}
//		}
//
//
//		var tablerow = new Array();
//		var rowno = Math.ceil(tablecell.length / rowcell);
//		for(var i = 0; i < rowno; i++)
//		{
//			tablerow[i] = elem("TR");
//
//			// xingulin: 奇數行加上背景色
//			if(i % 2 == 0) {
//				tablerow[i].setAttribute('style', 'background-color: #E5EDF7');
//			}
//		}
//
//		var k = 0;
//		var l = 0;
//		for(var i = 0; i < tablecell.length; i++) {
//			tablerow[k].appendChild(tablecell[i]);
//			l++;
//			if(l % rowcell == 0) {k++;}
//		}
//		//填補空格
//		if(tablecell.length%rowcell != 0){
//			for(var i = 0; i < rowcell-(tablecell.length % rowcell); i++) {
//				var emptycell = elem("TD");
//				emptycell.setAttribute("style", "border:1px solid #C0C0C0;vertical-align:top;");
//				tablerow[rowno - 1].appendChild(emptycell);
//			}
//		}
//		for(var i = 0; i < rowno; i++) {
//			 table.appendChild(tablerow[i]);
//		}
//		table.style.position = 'absolute';
//		//table.setAttribute("id", "resumen");
//		// Se desplaza la table hacia abajo para no interferir con la lista de aldeas / enlaces derecha
//		table.style.top = 625 + longitudPantalla() + 'px';
//		if (data == 1) document.body.appendChild(table);
//
//		/**
//		 * xingulin︰加入切換升兩級的提示區塊的 Click Event Handler
//		 * Begin
//		 */
//		$("a.tip").each(function(i)
//		{
//			$(this).click
//			(
//				function()
//				{
//					$($("div.state2").get(i)).toggle();
//				}
//			);
//		});
//		/**
//		 * End
//		 */
//	}

	function preCalculate2(){
		var edificiosPorFila = 3; // hany epulet legyen egy sorban
		var datos = 0;
		var buildingsImages = new Array();
		var buildingsDescs = new Array();
		var buildingsLinks = new Array();

		var ii = 0;

		var xpathResult = find("//div[@id='lmid2']/img[contains(@src, 'img\/un\/special\/')]");
		if (!xpathResult) {
			xpathResult = find("//div[@id='lmid2']/div[@class='dname']");

			var v = {
				'NewyearRocket_turquoise_1a.gif' : 'position: absolute; z-index: 20; left: 161px; top: 168px;',
				'NewyearRocket_purple_1a.gif' : 'position: absolute; z-index: 20; left: 265px; top: 148px;',
				'NewyearRocket_yellow_1a.gif' : 'position: absolute; z-index: 20; left: 200px; top: 248px;',
				'NewyearRocket_orange_1a.gif' : 'position: absolute; z-index: 20; left: 300px; top: 0px;',
				'NewyearRocket_green_1a.gif' : 'position: absolute; z-index: 20; left: 110px; top: 230px;',
				'NewyearRocket_red_1a.gif' : 'position: absolute; z-index: 20; left: 328px; top: 210px;'
			};

			for (k in v) {
				var imge = elem('img');
				imge.src = 'img/un/special/' + k;
				imge.style.cssText = v[k];
				imge.height = 140;
				imge.width = 75;
				imge.border = 0;

				insertAfter(xpathResult, imge);
			}
		}

		// recoge los nombres de cada uno
		var xpathResult = find('//map[@name="map1"]/area/@title', XPIter);
		while ((buildingsDescs[buildingsDescs.length] = xpathResult.iterateNext())) {}

		// los enlaces para acceder directamente a ellos
		xpathResult = find('//map[@name="map1"]/area/@href', XPIter);
		while ((buildingsLinks[buildingsLinks.length] = xpathResult.iterateNext())) {}

		// Procesa as imagenes de los edificios
//		var xpathResult = find('//div[@id="lmid2"]/img/@src', XPIter);
		var xpathResult = find("//div[@id='lmid2']/img[contains(@class, 'd')]/@src", XPIter);

		buildingsImages[0] = document.createTextNode(img("g/g16.gif"));
		while ((buildingsImages[buildingsImages.length] = xpathResult.iterateNext())) {}

		// Soporte para murallas
		var a = find("//div[starts-with(@class, 'd2_x')]", XPFirst);
		if (a){
			switch(a.className){
				case 'd2_x d2_0': break;
				case 'd2_x d2_1': var b = "g/g31.gif"; break;
				case 'd2_x d2_11': var b = "g/g32.gif"; break;
				case 'd2_x d2_12': var b = "g/g33.gif"; break;
			}
			if (b) buildingsImages[buildingsDescs.length - 4] = document.createTextNode(img(b));
		}

		var table = elem('TABLE');
		table.setAttribute("class", "tbg");
		table.setAttribute("align", "left");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "2");



		var j = 0;
		for(var i = 0; i < buildingsDescs.length - 3; i++) {
			if(buildingsDescs[i] != null && basename(buildingsImages[i].nodeValue) != 'iso.gif') {
				// Por cada edificio se recoge su nivel y su codigo en el juego
				var buildingLevel = buildingsDescs[i].nodeValue.split(" ");
				buildingLevel = parseInt(buildingLevel[buildingLevel.length-1]);

				var buildingCode = buildingsImages[i].nodeValue.split("/");
				buildingCode = buildingCode[buildingCode.length-1].split(".");
				if (buildingCode[0].search(/(\d+)/)) buildingCode = parseInt(RegExp.$1);
//				buildingCode = parseInt(buildingCode[0].substring(1, buildingCode[0].length));

				// Si es actualizable se muestra junto con los recursos que necesita
				if (buildingCost[buildingCode] != null && buildingCost[buildingCode][buildingLevel+1] != null){
					// Se reparten los edificios entre las columnas disponibles en las filas que haga falta
					if (j % edificiosPorFila == 0){
						var fila = elem('TR');

						if(j % 2 == 0) {
							fila.setAttribute('style', 'background-color: #E5EDF7');
						}

						table.appendChild(fila);
					}
					j++;
					datos = 1;

					// Soporte para murallas
					switch(buildingCode){
						case 31: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["empalizada"]; break;
						case 32: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["muralla"]; break;
						case 33: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["terraplen"]; break;
					}



					var td = elem("TD");
					td.setAttribute('width','25%');
					td.setAttribute('valign','bottom');
					fila.appendChild(td);

					var table2 = elem('TABLE');
					table2.setAttribute("align", "left");
					table2.setAttribute('class','bttable');

//					table2.setAttribute("height", "100%");
//					table2.setAttribute("width", "100%");

					table2.setAttribute("cellspacing", "0");
					table2.setAttribute("cellpadding", "0");

					td.appendChild(table2);

					var nametr = elem('TR');
					table2.appendChild(nametr);
					var nametd = elem('TD','<a href="' + buildingsLinks[i].nodeValue + '" title="'+ buildingsDescs[i].nodeValue +'">' + buildingsDescs[i].nodeValue+'</a>' );
					nametd.setAttribute('colspan',"2");
					nametd.setAttribute('class', 'f10');
					nametr.appendChild(nametd);

					var fila2 = elem('TR');
					table2.appendChild(fila2);

					var td2 = elem("TD");
					td2.setAttribute('class', 'f10');
					td2.innerHTML = '<a href="' + buildingsLinks[i].nodeValue + '" title="'+ buildingsDescs[i].nodeValue +'"><img src="' + buildingsImages[i].nodeValue + '" border="0"></a>';
					fila2.appendChild(td2);

					var cpPerDay = [buildingCost[buildingCode][buildingLevel][4], buildingCost[buildingCode][buildingLevel + 1][4]];

					var restante = calculateResourceTime(buildingCost[buildingCode][buildingLevel+1], 1);
					var td3 = elem("TD");
//					td3.setAttribute('class', 'dcol f7');
					td3.setAttribute('style','color:#333; font-size: 12px; padding-bottom: 5px;');
					td3.setAttribute('valign','bottom');
					fila2.appendChild(td3);

					if (restante != null) {
						td3.setAttribute('valign', 'bottom');
// 						td3.setAttribute('align', 'left');
						td3.innerHTML = restante;
					} else {
						td3.setAttribute('valign', 'center');
//					 td3.innerHTML = T('SUBIR_NIVEL');

						td3.innerHTML += '<a href="' + buildingsLinks[i].nodeValue + '" style="color: #FF6F0F;">' + T('SUBIR_NIVEL') + '</a>';
					}

					td3.innerHTML += '<br>' + T('CPPERDAY') + ": " + cpPerDay[0] + " → " + cpPerDay[1];
				}
			}
		}

		while (j % edificiosPorFila != 0) {
			fila.appendChild(elem("TD", '', 'style', 'background-color: #FFFFFF'));
			j++;
		}
		//table.style.position = 'absolute';
		table.setAttribute("id", "resumen");
		// Se desplaza la tabla hacia abajo para no interferir con la lista de aldeas / enlaces derecha
		//table.style.top = 625 + longitudPantalla() + 'px';
		if (datos == 1)  {
			var middleblock = get('lmidall');
			middleblock.appendChild(elem('BR'));
			middleblock.appendChild(table);
		}
	}

	/**
	 * Realiza un resumen de la pagina del mapa
	 * 地圖預處理
	 */
	function preCalculate3(){

//		return;
//
//		var datos = 0;
//		var a = find("//*/area[@onmouseover]", XPList);
//		//fix by arrack 移動地圖的問題
//		var b=document.getElementById('table_map');
//		if(b){
//			//alert(b.innerHTML);
//			b.innerHTML='';
//		}
//		var table = elem('TABLE');
//		table.setAttribute("id", "table_map");
//		table.setAttribute("sortCol", -1);
//		table.setAttribute("class", "tbg");
//		table.setAttribute("align", "center");
//		table.setAttribute("cellspacing", "1");
//		table.setAttribute("cellpadding", "2");
//		var thead = elem("THEAD");
//		var tbody = elem("TBODY");
//		var row = elem('TR');
//		row.setAttribute('class', "rbg");
//		thead.appendChild(row);
//		table.appendChild(thead);
//		var etiquetas_table = ["JUGADOR", "ALIANZA", "ALDEAS", "HAB", "COORD", "ACCION"];
//
//		for (var i = 0; i < 6; i++){
//			var td = elem('TD', T(etiquetas_table[i]));
//			if (i < 4){
//				switch(i){
//					case 3: td.addEventListener("click", sortTable('table_map', i, 'int'), 0); break;
//					//有待除錯
//					default: td.addEventListener("click", sortTable('table_map', i), 0);
//				}
//				td.style.cursor = "pointer";
//			}
//			row.appendChild(td);
//		}
//		// Procesa todas las casillas visibles del mapa
//		for(var i = 0; i < a.snapshotLength; i++) {
//			var aldea = a.snapshotItem(i);
//			var mouseOver = aldea.getAttribute("onmouseover");
//			// Por cada aldea se muestra toda la informacion posible y enlaces rapidos para atacar y enviar recursos
//			if(mouseOver.substring(0,1) != "x") {
//				datos = 1;
//				var row = elem('TR');
//				tbody.appendChild(row);
//				datos_aldea = mouseOver.substring(4, mouseOver.length - 1).split(",");
//				var href = aldea.getAttribute("href");
//				row.appendChild(elem('TD', datos_aldea[1].substring(1, datos_aldea[1].length - 1)));
//				row.appendChild(elem('TD', datos_aldea[3].substring(1, datos_aldea[3].length - 1)));
//				row.appendChild(elem('TD', datos_aldea[0].substring(1, datos_aldea[0].length - 1)));
//				row.appendChild(elem('TD', datos_aldea[2].substring(1, datos_aldea[2].length - 1)));
//				row.appendChild(elem('TD', '<a href="' + href + '">' + datos_aldea[4].substring(1, datos_aldea[4].length - 1) + ", " + datos_aldea[5].substring(1, datos_aldea[5].length - 1) + '</a>'));
//				row.appendChild(elem('TD', '<a href="' + href.replace("karte.php?d", "a2b.php?z") + '">' + T('ATACAR') + '</a> / <a href="' + href.replace("karte.php?d", "build.php?ze") + '&gid=17">' + T('COMERCIAR') + '</a>'));
//			}
//		}
//		table.appendChild(tbody);
//		table.style.position = 'absolute';
//		//table.setAttribute("id", "resumen");
//		table.style.top = 580 + longitudPantalla() + 'px';
//		if (datos == 1) document.body.appendChild(table);

		installMapEventHandler();
	}

	function eventtableover(ev){
		marker=get('mapmarker');
		var tar=ev.target
		for(var i=0;i<5;i++){if(tar.nodeName!='TR'){tar=tar.parentNode;}else break;}
		marker.className=tar.getAttribute('mt');
		marker.style.display='';
	};

	function area_onmouseover (e) {
		for(var i = 6; i > -1; i--)
		{
			for(var j = 0; j < 7; j++)
			{
				$('i_'+j+'_'+i).style.cssText = '';

				if (e.target.id == 'a_'+j+'_'+i) {
					$('i_'+j+'_'+i).style.cssText = 'padding: 3px; margin-left: -3px;';
				}
			}
		}
	}

	function area_onmouseout (e) {
		e.target.style.cssText = '';
	}

	function installMapEventHandler() {
//		var origpe = unsafeWindow.ve;
//		unsafeWindow.ve = function(pd,qd) {
//			var rv = origpe(pd,qd);
//			setTimeout(infoRecursos,10);
//
////			setTimeout(preCalculate3, 10);
//			return rv;
//		};

		var allArrows = find("//area[starts-with(@id, 'ma_n')]", XPList);
		for (var xi = 0; xi < allArrows.snapshotLength; xi++) {
			_attachEvent(allArrows.snapshotItem(xi), 'click', function () {
				infoRecursos();
				playerLinks();
				});
		}

		for(var i=1;i<50;i++){
			var k1=(i-1)%7;
			var k2=Math.floor((49-i)/7);

			var area = get("a_"+k1+"_"+k2);
			var mevobj = createMapInfoObj(area,i-1);
			area.addEventListener("mouseover",mevobj.mouseOverEvent,false);
			area.addEventListener("mouseout", mevobj.mouseOutEvent,false);

//			area.addEventListener("mouseover", crearEventoRecursosCasilla(area.href, links[i]), 0);
//			area.addEventListener("mouseout", function(){ clearTimeout(timeout); timeout = 0; get("tb_tooltip").style.display = 'none'; }, 0);
		}
	}

	function createMapInfoObj(area,pos){
		var mev = new Object();
		mev.area=area;
		mev.pict=get("i_"+area.id.substring(2));
		mev.pos=pos;
		mev.timeout=0;

		mev.mouseOverEvent = function(){
//			if (mev.pict.src.match(/\/(d|t)\d*.gif$/)) {
//				mev.timeout = setTimeout(function(){
//				ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout!=0) procesarCasilla(t,mev)}, dummy); }
//				, 300);
//			}

			var mapdata = arrayRecursosCasilla[mev.area.href] ? arrayRecursosCasilla[mev.area.href] : mev.area.getAttribute("casilla");

			if (mapdata) {
				timeout = setTimeout(function(){
					var div = get("tb_tooltip");
					div.style.display = 'block';
					div.innerHTML = mapdata;
				}, 100);
			} else {
				if (mev.pict.src.match(/\/(d|t)\d*.gif$/)) {
					mev.timeout = setTimeout(function(){
					ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout!=0) procesarCasilla(t,mev)}, dummy); }
					, 300);
				}
			}

			};
		mev.mouseOutEvent = function(){ clearTimeout(mev.timeout); mev.timeout = 0; get("tb_tooltip").style.display = 'none'; };
		mev.scan = function(){

			var mapdata = arrayRecursosCasilla[mev.area.href] ? arrayRecursosCasilla[mev.area.href] : mev.area.getAttribute("casilla");

			if (mapdata) {
				timeout = setTimeout(function(){
					var div = get("tb_tooltip");
					div.style.display = 'block';
					div.innerHTML = mapdata;
				}, 100);
			} else {
//				ajaxRequest(mev.area.href, "GET", null, function(t) {parseFieldType(t,mev)}, dummy);
				ajaxRequest(mev.area.href, "GET", null, function(t) {procesarCasilla2(t,mev.area)}, dummy);
			}
		};
		return mev;
	}

	/**
	* Ordena en orden ascendete y descendente
	*
	* Params:
	* 	sTableID: 	ID de la tabla a ordenar
	* 	iCol: 		Indice de la columna a ordenar
	* 	sDataType:	Tipo de datos de la columna, valor por defecto:texto
	*/
	function sortTable(sTableID, iCol, sDataType) {
		return function(){
			var oTable = document.getElementById(sTableID);
			var oTBody = oTable.tBodies[0];
			var colDataRows = oTBody.rows;
			var aTRs = new Array;

			for (var i = 0; i < colDataRows.length; i++) aTRs[i] = colDataRows[i];
			if (oTable.getAttribute("sortCol") == iCol) aTRs.reverse();
			else aTRs.sort(generateCompareTRs(iCol, sDataType));

			var oFragment = document.createDocumentFragment();
			for (var i = 0; i < aTRs.length; i++) oFragment.appendChild(aTRs[i]);

			oTBody.appendChild(oFragment);
			oTable.setAttribute("sortCol", iCol);
		};
	}

	/**
	 * Convierte un elemento a un determinado tipo segun un argumento
	 *
	 * Params:
	 *	elemento: elemento a convertir
	 *	sDataType: nuevo tipo de datos (int o float)
	 *
	 * Returns:
	 *	El elemento convertido al nuevo tipo de datos
	 */
	function convert(element, sDataType) {
		switch(sDataType) {
			case "int": return ((element.nodeValue == null) || !element.nodeValue.match(/\d+/)) ? 0 : parseInt(element.nodeValue);
			case "float": return ((element.nodeValue == null) || !element.nodeValue.match(/\d+/)) ? 0 : parseFloat(element.nodeValue);
			default: return (element == null) ? '' : element.textContent.toLowerCase();
		}
	}

	/**
	 * Realiza una comparaci�n entre las casillas de la misma columna en distintas filas
	 *
	 * Params:
	 *	iCol: numero de columna dentro de la fila a comparar
	 *	sDataType: tipo de datos de la comparacion
	 *
	 * Returns:
	 * 	Devuelve -1, 1 o 0 segun el resultado de la comparacion
	 */
	function generateCompareTRs(iCol, sDataType) {
		return function compareTRs(oTR1, oTR2) {
			var vValue1 = convert(oTR1.cells[iCol].firstChild, sDataType);
			var vValue2 = convert(oTR2.cells[iCol].firstChild, sDataType);

			if (vValue1 < vValue2) return -1;
			else if (vValue1 > vValue2) return 1;
			else return 0;
		};
	}

	/**
	 * Implementa y muestra un bloc de notas. Guarda las notas como cookies en el navegador local
	 */
	function blocNotas(){
		var a = find("//form[@name='msg']", XPFirst);

		// Carga las notas previas si existen
		var notas = readCookie("notas_" + server);
		if (notas == null) notas = ''; else notas = unescape(notas);

		// Crea la estructura HTML del bloc
		var tabla = elem("TABLE");
		var tr = elem("TR");
		var td = elem("TD");
		var p1 = elem("P");
		var p2 = elem("P");
		var textarea = elem("TEXTAREA", notas);
		var input = elem("INPUT");

		tabla.setAttribute("width", "430");
		td.setAttribute("align", "center");
		td.setAttribute("background", img('msg/block_bg.gif', true));
		textarea.setAttribute("cols", "30");
		textarea.setAttribute("rows", "16");
		textarea.setAttribute("style", 'background-image: url(' + img('msg/underline.gif', true) + '); border : 0px; overflow:auto');
		input.setAttribute("type", "image");
		input.setAttribute("border", "0");
		input.setAttribute("src", img('b/s1.gif', true));
		// En el evento del boton de guardado actualiza el valor de la cookie (1 a�o de duracion por defecto)
		input.addEventListener("click", function(){ createCookie("notas_" + server, escape(textarea.value), 365); alert(T('GUARDADO')); }, 0);

		td.appendChild(elem("P", "&nbsp;"));

		p1.appendChild(textarea);
		td.appendChild(p1);
		p2.appendChild(input);
		td.appendChild(p2);
		tr.appendChild(td);
		tabla.appendChild(tr);
		a.parentNode.appendChild(elem("P"));
		a.parentNode.appendChild(tabla);
	}

	/**
	* Crea una funcion que se encarga del evento al desplazarse en el mapa. Actualiza la direccion destino en
	* base al desplazamiento configurado
	*
	* Params:
	* 	i:	Ordinal sobre la orientacion de la flecha
	*
	* Returns
	*	La funcion que gestiona el evento
	**/

	function createEventoMapa(e, i, href){
		var funcion = function (){

//			alert(href);

			if (href == 'javascript:void(0)' || href == 'javascript: void(0)') {

//				infoRecursos();
//				desplazarMapa();
//				preCalculate3();

				return 0;
			}


			var despl = [-801, 1, 801, -1];
//			var d = document.getElementsByName("desp")[0].value;
//			var d = parseInt(document.getElementsByName("desp")[0].value);

			var d = readCookie("desp");

//			if (d < 1) d = 1;
			if (d < 1 || d > 20 || d == 'NaN' || d == NaN || !d || d == null || d == 'null') d = 3;
			// Actualiza el valor de la cookie
			createCookie("desp", d, 365);
			var base = parseInt(e.href.split("=")[1]);
			ajaxRequest("ajax.php?action=map_content&z=" + (base + (despl[i] * (d - 1))), "GET", null,
				function(t){
					try {
						if (t.responseText) get("map_content").innerHTML = t.responseText;
						infoRecursos();
						desplazarMapa();
						removeElement(get("tabla_mapa"));
						preCalculate3();
					} catch (E) {}
				}
			, dummy);
		};
		return funcion;
	}

	/**
	 * Crea una casilla para introducir el desplazamiento deseado en el mapa e inserta los
	 * eventos en las flechas de direccion
	 */
	function desplazarMapa(){
		// Crea y anyade la casilla del desplazamiento
//		var b = find("//form[@method='post']", XPFirst).parentNode;

		// bluelovers
		var b = find("//form[@action='karte.php']", XPFirst);
		if (b) {
			b = b.parentNode;
		} else {
			return;
		}
		// bluelovers

//		var tr = elem("TR");
//		// Carga el ultimo valor utilizado si existe
//		var d = readCookie("desp");
//
//		// bluelovers
//		d = parseInt(d);
//		if (d < 1 || d > 20 || d == 'NaN' || d == NaN || !d) d = 5;
//		// bluelovers
//
//		var td1 = elem("TD", "<b>" + T('DESP_ABR') + "</b>");
//		var td2 = elem("TD", '<input name="desp" value="' + (d == null ? '1' : d) + '" size="2" maxlength="4" class="fm fm25">');
//		td1.setAttribute("colspan", 2);
//		td2.setAttribute("colspan", 2);
//		tr.appendChild(td1);
//		tr.appendChild(td2);
//		b.appendChild(tr);

//		if (location.href.match(/karte.php($|\?z=)/) && arrayValueExist(tw_server, server)){
//			var center_id = xy2id(find("//input[@name='xp']", XPFirst).value, find("//input[@name='yp']", XPFirst).value);
//			var href = "http://www.denibol.com/proyectos/travian_world/karte3.php?z=" + center_id + "&server=" + server + "&user=" + uid;
//			var td3 = elem("TD", '<a href="' + href + '" onClick="pop(\'' + href + '\'); return false;" target="_blank"><img src="' + img('m/max.gif') + '" width="33" height="25" border="0" alt="' + T('MAP_EXT') + '" title="' + T('MAP_EXT') + '"></a>');
//			td3.setAttribute("colspan", 2);
//			tr.appendChild(td3);
//		}

		// Inserta los eventos para manipular los desplazamientos
		var a = find("//map/area[@onclick]", XPList);
		for (var i = 0; i < a.snapshotLength; i++){
			var b = a.snapshotItem(i);
			b.setAttribute("onclick", '');
			b.addEventListener("click", createEventoMapa(b, i % 4, b.href), 0);
//			b.href = 'javascript:void(0)';
		}
	}

	/**
	 * Crea una nueva columna en las ofertas del mercado para mostrar la alianza de los
	 * vendedores
	 */
	function alianzaMercado(){
		var a = find("//tr[@class='rbg']", XPFirst).parentNode;

		// Prepara la insercion de la nueva columna
		var b = a.getElementsByTagName("TR");
		// FIXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
		b[0].childNodes[b[0].childNodes.length == 3 ? 1 : 0].setAttribute('colspan', '8');
		b[b.length - 1].childNodes[0].setAttribute("colspan", "8");

		// Crea e inserta la columna
		var columna = elem("TD");
		columna.innerHTML = T('ALIANZA');
		b[1].appendChild(columna);

		// Rellena la columna con los nombres de las alianzas

		for(var i = 2; i < b.length - 1; i++){
			var alianza = elem("TD");
			// FIXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
			var alianza_txt = b[i].childNodes[b[i].childNodes.length == 12 ? 8 : 4].getAttribute('title');
			if (alianza_txt != null) alianza.innerHTML = alianza_txt;
			b[i].appendChild(alianza);
		}
	}

	/**
	 * Crea una funcion que procesa el evento al seleccionar una cantidad de un recurso al enviar materias primas
	 * desde el mercado
	 *
	 * Params:
	 *	recurso:	Ordinal del recurso
	 *	cantidad:	Cantidad a incrementar del determinado recurso
	 *
	 * Returns:
	 *	La funcion que gestiona el evento
	 */
	function crearEventoRecursosMercado(recurso, cantidad){
		return function(){
//			var a = document.getElementsByTagName('input')[recurso + 1].value;
			var a = get('r' + (recurso + 1)).value;
			if (a == '') var suma = 0; else var suma = parseInt(a);
			suma += cantidad;
			// La cantidad a enviar no puede superar lo disponible
			if (suma > actual[recurso]) suma = actual[recurso];
			// La cantidad a enviar no debe poder superar la capacidad de los comerciantes disponibles
			var max_capacidad = parseInt(find("//p//b", XPFirst).innerHTML);
			var max_comercian = parseInt(find("//table[@class='f10']//tr//td[@colspan='2']", XPFirst).innerHTML.split(' ')[1].split('/')[0]);
			var max_transport = max_capacidad * max_comercian;
			if (suma > max_transport) suma = max_transport;

//			document.getElementsByTagName('input')[recurso + 1].value = suma;
			get('r' + (recurso + 1)).value = suma;
		}
	}

	/**
	 * Inserta nuevas cantidades seleccionables al enviar recursos desde el mercado
	 商人
	 */
	function recursosMercado(){
		if (find("//input[@type='text']", XPList).snapshotLength != 7) return;

		// Array con las nuevas cantidades
		var max_capacidad = parseInt(find("//p//b", XPFirst).innerHTML);
		/*
		var cantidades = [100, 250, 500, 1000];
		var repetido = false;
		for (var i = 0; i < cantidades.length; i++) if (max_capacidad == cantidades[i]){ repetido = true; break; }
		if (!repetido) cantidades = [100, 500, 1000, max_capacidad];
		*/
		if(max_capacidad ==null){max_capacidad=500;}

		var cpcty = readCookie('cpcty', 0);
		max_capacidad = cpcty <= 0 ? max_capacidad : cpcty;

		var cantidades =[max_capacidad,max_capacidad*2,max_capacidad*3,max_capacidad*4]

		var a = find("//table[@class='f10']", XPFirst);
		var k = 0;
		// FIXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
		a = a.childNodes[a.childNodes.length == 2 ? 1 : 0].childNodes;
		for (var i = 0; i < a.length; a.length == 8 ? i += 2 : i++){
			// Se eliminan las posibilidades originales
			// FIXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
			a[i].removeChild(a[i].childNodes[a[i].childNodes.length > 4 ? 5 : 3]);

			// Por cada nueva cantidad y recurso se crea un enlace con el evento asociado
			for(var j = 0; j < cantidades.length; j++){
				var enlace = elem('A');
				enlace.href = "javascript:void(0)";
				enlace.innerHTML = '(' + cantidades[j] + ')';
				enlace.addEventListener('click', crearEventoRecursosMercado(k, cantidades[j]), false);

				a[i].appendChild(enlace);
			}
			k++;
		}

		//add code by Arrack
		//var a = elem('DIV');
		//商人全部增加
		var a = find("//p[@class='txt_menue']", XPFirst);
		var b = elem('DIV');
		b.setAttribute("style","padding-top::5px;background-color: #FFFFCC;");
		//a.setAttribute("style","position:relative; top:999px;");
		//setAttribute("style","position:relative; bottom:52px;");
		b.innerHTML=T('ADD_ALL')+':';
		for(var j = 0; j < cantidades.length; j++){
			var enlace = elem('A');
			enlace.href = "javascript:void(0)";
			enlace.innerHTML = '(' + cantidades[j] + ')';
			enlace.addEventListener('click', crearEventoRecursosMercado_ALL(cantidades[j]), false);

			b.appendChild(enlace);
		}

		var enlace = elem('A');
		enlace.href = "javascript:void(0)";
		enlace.innerHTML = '(CLEAR)';
		enlace.addEventListener('click', crearEventoRecursosMercado_ALL(0), false);

		b.appendChild(enlace);
		a.appendChild(b);

		var form = document.getElementsByName('id')[0].parentNode;

		var inputCpcty = elem('input');
			inputCpcty.value = cpcty;
			inputCpcty.className = 'fm';
			inputCpcty.size = 4;
			inputCpcty.addEventListener('change', function(){
				createCookie('cpcty', this.value);
				cpcty = this.value;

				document.location.reload();
			}, false);

			var setCpctyBar = elem('span');
			setCpctyBar.appendChild(document.createTextNode(T('CPCTY1')));
			setCpctyBar.appendChild(inputCpcty);
			form.parentNode.insertBefore(setCpctyBar, form);
	}
	//function crearEventoRecursosMercado(recurso, cantidad){
	function crearEventoRecursosMercado_ALL(cantidad){
		return function(){
			var recurso=0;

			var max_capacidad = parseInt(find("//p//b", XPFirst).innerHTML);
			var max_comercian = parseInt(find("//table[@class='f10']//tr//td[@colspan='2']", XPFirst).innerHTML.split(' ')[1].split('/')[0]);
			var max_transport = max_capacidad * max_comercian;

			for(var j = 0; j < 4; j++){
				recurso=j;

//				var a = document.getElementsByTagName('input')[recurso + 1].value;
				var a = get('r' + (recurso + 1)).value;

				if (a == '') var suma = 0; else var suma = parseInt(a);
				if(cantidad!=0){
					suma += cantidad;
				}else{
					suma=0;
				}
				// La cantidad a enviar no puede superar lo disponible
				if (suma > actual[recurso]) suma = actual[recurso];
				// La cantidad a enviar no debe poder superar la capacidad de los comerciantes disponibles

				if (suma > max_transport) suma = max_transport;

//				document.getElementsByTagName('input')[recurso + 1].value = suma;
				get('r' + (recurso + 1)).value = suma;
			}
		}
	}

	/*
	 * Check if this is a 3X speed server
	 * TeYoU: 檢查是否為SPEED伺服器
	 */
	 function check3X(){
		var url = location.href;
		if(url.match("speed"))
			return true;
		return false;
	 }

	/**
	 * Calcula el numero de aldeas que se posee en funcion de los puntos de cultura disponibles.
	 * Funcion estandard no valida para version Speed
	 *
	 * Params:
	 *	puntos: cantidad de puntos de cultura
	 *
	 * Returns:
	 * 	el numero de aldeas que se dispone con esos puntos
	 */
	 //TeYoU: 計算文明點的 (Point)
	function pc2aldeas(puntos){ return Math.round(Math.pow((puntos / 1000) / 1.6, 1 / 2.3)); }
	function pc2aldeas3X(puntos){ return Math.round(Math.pow((puntos / 100) / 16 * 3, 1 / 2.3)); }

	/**
	 * Calcula el numero de puntos necesarios para obtener un determinada cantidad de aldeas
	 * Funcion estandard no valida para version Speed
	 *
	 * Params:
	 *	aldeas: numero de aldeas
	 *
	 * Returns:
	 * 	cantidad de puntos de cultura necesarios
	 */
	 //TeYoU: 計算文明點的 (Village)
	function aldeas2pc(aldeas){ return Math.round(1.6 * Math.pow(aldeas, 2.3)) * 1000; }
	function aldeas2pc3X(aldeas){ return Math.round(16 / 3 * Math.pow(aldeas, 2.3)) * 100; }

	/**
	 * puntosCultura = CulturePoints
	 * Calcula y muestra los puntos de cultura necesarios para la siguiente aldea y el tiempo para conseguirlo, o
	 * las aldeas adicionales que se pueden fundar con los puntos actuales
	 */
	function puntosCultura(){
		var a = find("//div[@id='lmid2']//b", XPList);
		if (a.snapshotLength != 5) return;

		// Produccion de puntos de cultura de todas las aldeas
		var pc_prod_total = parseInt(a.snapshotItem(2).innerHTML);
		// Cantidad de puntos de cultura actuales
		var pc_actual = parseInt(a.snapshotItem(3).innerHTML);
		// Puntos de cultura necesarios para fundar la siguiente aldea
		var pc_aldea_prox = parseInt(a.snapshotItem(4).innerHTML);

		// 下一個的村莊數
		var aldeas_actuales = (check3X() )? pc2aldeas3X(pc_aldea_prox) : pc2aldeas(pc_aldea_prox) ;
		// 目前村莊數
		var aldeas_posibles = (check3X() )? pc2aldeas3X(pc_actual) : pc2aldeas(pc_actual) ;

		var texto = '<table class="tbg" align="center" cellspacing="1" cellpadding="2"><tr class="rbg"><td>' + T('ALDEA') + '</td><td>' + T('PC') + "</td></tr>";
		var j = pc_f = 0;
		for (var i = 0; i < 3; i++){
			var idx = i + j;

			texto += '<tr><td>' + (aldeas_actuales + idx + 1) + '</td><td>';

			// 下一級需要的文明
			var pc_necesarios = (check3X() )? aldeas2pc3X(aldeas_actuales + idx) : aldeas2pc(aldeas_actuales + idx) ;

			// Si hay PC de sobra
			if (pc_necesarios < pc_actual) {
				texto += T('FUNDAR');
				pc_f = 1;
			}
			else{
				// Tiempo en segundos hasta conseguir los puntos de cultura necesarios
				var tiempo = ((pc_necesarios - pc_actual) / pc_prod_total) * 86400;

				var fecha = new Date();
//				fecha.setTime(fecha.getTime() + (tiempo * 1000));
				fecha.setTime(timestamp.getTime() + (tiempo * 1000));
				var texto_tiempo = calcularTextoTiempo(fecha);

				texto += T('FALTA') + ' <b>' + (pc_necesarios - pc_actual) + '</b> ' + T('PC') +'<br/>';
				texto += T('LISTO') + " " + texto_tiempo;
			}
			texto += '</td></tr>';

			if (pc_f && pc_necesarios >= pc_actual) {
				j = idx + 1;
				pc_f = i = 0;
			}
		}
		texto += '</table>';

		a.snapshotItem(4).parentNode.innerHTML += "<p>" + texto + "</p>";
	}

	/**


	 * Oculta un elemento y le asgina un atributo de tipo filtro
	 *
	 * Params:
	 *	oferta: elemento a modificar
	 *	filtro: nombre del filtro que se le aplicara como atributo
	 */
	function asignarFiltro(oferta, filtro){
		oferta.setAttribute("style", "display:none");
		oferta.setAttribute("filtro" + filtro, "on");
	}

	/**
	 * Elimina un atributo de tipo filtro de un elemento y elimina su estilo si no tiene ningun filtro activo
	 *
	 * Params:
	 *	oferta: elemento a modificar
	 *	filtro: nombre del filtro a quitar
	 *	filtros: lista de filtros a comprobar para quitar el estilo
	 */
	function quitarFiltro(oferta, filtro, filtros){
		oferta.removeAttribute("filtro" + filtro);
		var remove = true;
		for (var i = 0; i < filtros.length; i++) if (oferta.getAttribute("filtro" + filtros[i]) == 'on') remove = false;
		if (remove == true) oferta.removeAttribute("style");
	}

	/**
	 * Crea la funcion que gestiona el evento de los filtros en el mercado
	 *
	 * Param:
	 *	tipo	Tipo de filtro (0 para ofrezco, 1 para busco y 2 para tipo)
	 *	recurso	Recurso del filtro (0-4 recursos basicos, 5 para cualquiera)
	 *
	 * Returns:
	 *	La funcion que gestiona el evento
	 */
	function funcionFiltrosMercado(tipo, recurso){
		var funcion = function (){
			var a = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]//tr[not(@class)]", XPList);
			for (var i = 0; i < a.snapshotLength - 1; i++){
				var b = a.snapshotItem(i);
				// FIXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
				if (b.childNodes.length > 8) var error = true; else var error = false;
				b.childNodes[error ? 1 : 0].firstChild.src.search(/\/(\d).gif$/); var ofrezco = RegExp.$1;
				b.childNodes[error ? 4 : 2].firstChild.src.search(/\/(\d).gif$/); var busco = RegExp.$1;
				var ofrezco_cantidad = parseInt(b.childNodes[error ? 2 : 1].innerHTML);
				var busco_cantidad = parseInt(b.childNodes[error ? 6 : 3].innerHTML);
				if (b.childNodes[error ? 11 : 6].className == 'c') var carencia = true; else var carencia = false;
				var tiempo = calcular_segundos(b.childNodes[error ? 10 : 5].innerHTML);

				// Para mantener 4 filtros activos a la vez sobre cada oferta, utiliza 3 atributos distintos
				// sobre cada fila
				switch(tipo){
					case 0: if ((ofrezco != recurso) && recurso != 5) asignarFiltro(b, "Ofrezco");
						else quitarFiltro(b, "Ofrezco", ["Busco", "Tipo", "Carencia", "Tiempo"]);
						break;
					case 1: if ((busco != recurso) && recurso != 5) asignarFiltro(b, "Busco");
						else quitarFiltro(b, "Busco", ["Ofrezco", "Tipo", "Carencia", "Tiempo"]);
						break;
					case 2: switch(recurso){
							case 1: if (ofrezco_cantidad != busco_cantidad) asignarFiltro(b, "Tipo");
								else quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
							case 2: if (ofrezco_cantidad <= busco_cantidad) asignarFiltro(b, "Tipo");
								else quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
							case 3: if (ofrezco_cantidad >= busco_cantidad) asignarFiltro(b, "Tipo");
								else quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
							case 4: quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
						} break;
					case 3: switch(recurso){
							case 1: if (carencia == true) asignarFiltro(b, "Carencia");
								else quitarFiltro(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]);
								break;
							case 2: quitarFiltro(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]);
								break;
						} break;
					case 4: switch(recurso){
							case 1: if (tiempo > (60*60)) asignarFiltro(b, "Tiempo");
								else quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;
							case 2: if (tiempo > (2*60*60)) asignarFiltro(b, "Tiempo");
								else quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;
							case 3: if (tiempo > (3*60*60)) asignarFiltro(b, "Tiempo");
								else quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;
							case 4: quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;
						} break;
				}
			}

			// Para mantener un unico sombreado por cada filtro, activa el que se ha seleccionado y elimina
			// el resto de su tipo
			for (var i = 0; i < 5; i++){
				for (var j = 0; j < 6; j++){
					var a = find("//td[@id='filtro" + i + j + "']", XPFirst);
					if (a){
						if (i == tipo && j == (recurso - 1)){
							a.setAttribute("style", "background-color:#F5F5F5");
						}else if (i == tipo){
							a.removeAttribute("style");
						}
					}
				}
			}
		};
		return funcion;
	}

	/**
	 * Establece filtros por tipo de recurso y proporcion de intercambio en las oferta de venta del
	 * mercado
	 */
//	function filtrosMercado(){
//		var table = elem("TABLE");
//		table.setAttribute("class", "tbg");
//		table.setAttribute("style", "width:100%");
//		table.setAttribute("cellspacing", "1");
//		table.setAttribute("cellpadding", "2");
//
//		// Se crea la tabla con 3 filas, Ofrezco, Busco y Tipo
//		var etiquetas = [T('OFREZCO'), T('BUSCO')];
//		for (var j = 0; j < 2; j++){
//			var tr = elem("TR");
//			tr.appendChild(elem("TD", etiquetas[j]));
//			// Para Ofrezco y Busco se muestran 4 materiales y un quinto comodin
//			for (var i = 0; i < 4; i++){
//				var td = elem("TD");
//				td.setAttribute("id", "filtro" + j + i);
//				var ref = elem("A", "<img src='" + img('r/' + (i+1) + '.gif') + "' width='18' height='12' border='0' title='" + T('RECURSO' + (i+1)) + "'>");
//				td.addEventListener("click", funcionFiltrosMercado(j, i+1), 0);
//				td.appendChild(ref);
//				tr.appendChild(td);
//			}
//			var td = elem("TD");
//			td.setAttribute("style", "background-color:#F5F5F5");
//			td.setAttribute("id", "filtro" + j + "4");
//			var ref = elem("A", T('CUALQUIERA'));
//			ref.setAttribute("href", "javascript:void(0)");
//			td.addEventListener("click", funcionFiltrosMercado(j, 5), 0);
//			td.appendChild(ref);
//			tr.appendChild(td);
//			table.appendChild(tr);
//		}
//
//		// Tipo de transaccion segun la relacion entre oferta y demanda
//		var tr = elem("TR");
//		tr.appendChild(elem("TD", T('TIPO')));
//		table.appendChild(tr);
//		var etiquetas_tipo = ["1:1", "1:>1", "1:<1", "1:x"];
//		for (var i = 0; i < 4; i++){
//			var td = elem("TD");
//			td.setAttribute("id", "filtro" + 2 + i);
//			if (i == 3) td.setAttribute("style", "background-color:#F5F5F5");
//			var ref = elem("A", etiquetas_tipo[i]);
//			ref.setAttribute("href", "javascript:void(0)");
//			td.addEventListener("click", funcionFiltrosMercado(2, (i+1)), 0);
//			td.appendChild(ref);
//			tr.appendChild(td);
//		}
//		tr.appendChild(elem("TD"));
//
//		// Tiempo maximo de transporte
//		var tr = elem("TR");
//		tr.appendChild(elem("TD", T('MAXTIME')));
//		table.appendChild(tr);
//		var etiquetas_tipo = ["1", "2", "3", ">3"];
//		for (var i = 0; i < 4; i++){
//			var td = elem("TD");
//			td.setAttribute("id", "filtro" + 4 + i);
//			if (i == 3) td.setAttribute("style", "background-color:#F5F5F5");
//			var ref = elem("A", etiquetas_tipo[i]);
//			ref.setAttribute("href", "javascript:void(0)");
//			td.addEventListener("click", funcionFiltrosMercado(4, (i+1)), 0);
//			td.appendChild(ref);
//			tr.appendChild(td);
//		}
//		tr.appendChild(elem("TD"));
//
//		// Filtro por disponibilidad de recursos y mercaderes
//		var tr = elem("TR");
//		tr.appendChild(elem("TD", T('DISPONIBLE')));
//		table.appendChild(tr);
//		var etiquetas_carencia = [T('SI'), T('NO')];
//		for (var i = 0; i < 2; i++){
//			var td = elem("TD");
//			td.setAttribute("colspan", "2");
//			td.setAttribute("id", "filtro" + 3 + i);
//			if (i == 1) td.setAttribute("style", "background-color:#F5F5F5");
//			var ref = elem("A", etiquetas_carencia[i]);
//			ref.setAttribute("href", "javascript:void(0)");
//			td.addEventListener("click", funcionFiltrosMercado(3, (i+1)), 0);
//			td.appendChild(ref);
//			tr.appendChild(td);
//		}
//		tr.appendChild(elem("TD"));
//
//		// Busca la tabla de ofertas y la inserta justo antes
//		var a = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]", XPFirst);
//		var p = elem("P");
//		p.appendChild(table);
//		a.parentNode.insertBefore(p, a);
//	}

function filtrosMercado(){

	/**
	 * Crea la funcion que gestiona el evento de los filtros en el mercado
	 *
	 * Param:
	 *	tipo	Tipo de filtro (0 para ofrezco, 1 para busco y 2 para tipo)
	 *	recurso	Recurso del filtro (0-4 recursos basicos, 5 para cualquiera)
	 *
	 * Returns:
	 *	La funcion que gestiona el evento
	 */
	function funcionFiltrosMercado(tipo, recurso){
		return function () {
			setOption("market"+tipo,recurso);
			filterMarket(tipo,recurso);
		}
	}

	function filterMarket(tipo, recurso){
			var a = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]//tr[not(@class)]", XPList,get("lmid2"));
			for (var i = 0; i < a.snapshotLength - 1; i++){
				var b = a.snapshotItem(i);
				// FIXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
				if (b.childNodes.length > 8) var error = true; else var error = false;
				b.childNodes[error ? 1 : 0].firstChild.src.search(/\/(\d).gif$/); var ofrezco = RegExp.$1;
				b.childNodes[error ? 4 : 2].firstChild.src.search(/\/(\d).gif$/); var busco = RegExp.$1;
				var ofrezco_cantidad = parseInt(b.childNodes[error ? 2 : 1].innerHTML);
				var busco_cantidad = parseInt(b.childNodes[error ? 6 : 3].innerHTML);
				if (b.childNodes[error ? 11 : 6].className == 'c') var carencia = true; else var carencia = false;
				var tiempo = calcular_segundos(b.childNodes[error ? 10 : 5].innerHTML);

				// Para mantener 4 filtros activos a la vez sobre cada oferta, utiliza 3 atributos distintos
				// sobre cada fila
				switch(tipo){
					case 0: if ((ofrezco != recurso) && recurso != 5) asignarFiltro(b, "Ofrezco");
						else quitarFiltro(b, "Ofrezco", ["Busco", "Tipo", "Carencia", "Tiempo"]);
						break;
					case 1: if ((busco != recurso) && recurso != 5) asignarFiltro(b, "Busco");
						else quitarFiltro(b, "Busco", ["Ofrezco", "Tipo", "Carencia", "Tiempo"]);
						break;
					case 2: switch(recurso){
							case 1: if (ofrezco_cantidad <= busco_cantidad) asignarFiltro(b, "Tipo");
								else quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
							case 2: if (ofrezco_cantidad < busco_cantidad) asignarFiltro(b, "Tipo");
								else quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
							case 3: if (ofrezco_cantidad >= busco_cantidad) asignarFiltro(b, "Tipo");
								else quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
							case 4: quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
						} break;
					case 3: switch(recurso){
							case 1: if (carencia == true) asignarFiltro(b, "Carencia");
								else quitarFiltro(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]);
								break;
							case 2: quitarFiltro(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]);
								break;
						} break;
					case 4: switch(recurso){
							case 1: if (tiempo > (60*60)) asignarFiltro(b, "Tiempo");
								else quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;
							case 2: if (tiempo > (2*60*60)) asignarFiltro(b, "Tiempo");
								else quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;
							case 3: if (tiempo > (3*60*60)) asignarFiltro(b, "Tiempo");
								else quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;
							case 4: quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;
						} break;
				}
			}

			// Para mantener un unico sombreado por cada filtro, activa el que se ha seleccionado y elimina
			// el resto de su tipo
			for (var i = 0; i < 5; i++){
				for (var j = 0; j < 6; j++){
					var a = find("//td[@id='filtro" + i + j + "']", XPFirst);
					if (a){
						if (i == tipo && j == (recurso - 1)){
							a.setAttribute("style", "background-color:#E5E5E5");
						}else if (i == tipo){
							a.removeAttribute("style");
						}
					}
				}
			}
	}

	function applyMarketFilters() {
		var defaults=[5,5,4,2,4];
		for (var i = 0; i < 5; i++){
			var marketi = getOption("market"+i,defaults[i],"integer");
			if (marketi!=defaults[i]) filterMarket(i,marketi);
		}
	}

	function createPreloadFunc(page) {
		return function() {
				var pageu = page * 40;

				ajaxRequest("build.php?id="+linkid+"&t=1&u="+(page*40)+"#h2", "GET", null,
				function(t){
				  var ans = elem("DIV", t.responseText);
				  var ansdoc = document.implementation.createDocument("", "", null);
				  ansdoc.appendChild(ans);
				  var xpres = ansdoc.evaluate("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]/tbody/tr", ans, null, XPList, null);
//				  log(2,"preload return."+xpres.snapshotLength);

				  var linktrl = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]/tbody/tr", XPList,get("lmid2"));
				  var linktrlind=3;
				  var linktr = linktrl.snapshotItem(linktrlind);
				  var linktimedata = calcular_segundos(linktr.childNodes[linktr.childNodes.length >= 12 ? 10 : 6].innerHTML);

				  for(var i=2;i<xpres.snapshotLength-1; i++) {
					var mrow = xpres.snapshotItem(i);
					var timedata = calcular_segundos(mrow.childNodes[mrow.childNodes.length == 12 ? 10 : 6].innerHTML);
					var alianza = elem("TD");
					var playercell = mrow.childNodes[mrow.childNodes.length == 12 ? 8 : 4];
					var alianza_txt = playercell.getAttribute('title');
					if (alianza_txt != null) alianza.innerHTML = alianza_txt;
					mrow.appendChild(alianza);

//					var a = playercell.innerHTML.match(/karte.php\?d=(\d+)/)[0];
//
//					var atklink = elem('a',"<img src='" + img("a/att_all.gif") + "' style='margin:3px 0px 1px 3px; display: inline' height='10' width='10' title='" + T('ATACAR') + "' alt='' border='0'>");
//					atklink.href = 'a2b.php?z=' + a;
//					playercell.insertBefore(atklink, playercell.firstChild.nextSibling);

//					log(2,"mrow "+i+" time is: "+ timedata); // timedata is in seconds
					while(linktimedata<timedata&&linktrlind<linktrl.snapshotLength-1) {
						linktrlind++
						linktr = linktrl.snapshotItem(linktrlind);
						if (linktr.innerHTML.indexOf('class="rowpic"')<0) {
							linktimedata = calcular_segundos(linktr.childNodes[linktr.childNodes.length >= 12 ? 10 : 6].innerHTML);
						} else {
							linktimedata=999999;
						}
//						log(2,"mrow "+i+":"+linktrlind+" comptime is: "+ linktimedata+" lgt:"+linktrl.snapshotLength); // timedata is in seconds
					}
					linktr.parentNode.insertBefore(mrow,linktr);
				  }
				  applyMarketFilters();

					var marketpreload = getOption("marketpreload",0,"integer");
				  if (page<marketpreload) {
					 setTimeout(createPreloadFunc(page+1),getRandTimeRange(600));
				  } else {
					playerLinks();
				  }
				}
			, dummy);
		}
	}


		var table = elem("TABLE");
		table.setAttribute("class", "tbg");
		table.setAttribute("style", "width:100%");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "2");

		// Se crea la tabla con 3 filas, Ofrezco, Busco y Tipo
		var etiquetas = [T('OFREZCO'), T('BUSCO')];
		for (var j = 0; j < 2; j++){
			var marketj = getOption("market"+j,5,"integer");
			var tr = elem("TR");
			tr.appendChild(elem("TD", etiquetas[j]));
			// Para Ofrezco y Busco se muestran 4 materiales y un quinto comodin
			for (var i = 0; i < 4; i++){
				var td = elem("TD");
				td.setAttribute("id", "filtro" + j + i);
				var ref = elem("A", "<img src='" + img('r/' + (i+1) + '.gif') + "' width='18' height='12' border='0' title='" + T('RECURSO' + (i+1)) + "'>");
				if (i+1 == marketj) td.setAttribute("style", "background-color:#E5E5E5");
				td.addEventListener("click", funcionFiltrosMercado(j, i+1), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			}
			var td = elem("TD");
			if (marketj==5) td.setAttribute("style", "background-color:#E5E5E5");
			td.setAttribute("id", "filtro" + j + "4");
			var ref = elem("A", T('CUALQUIERA'));
			ref.setAttribute("href", "javascript:void(0)");
			td.addEventListener("click", funcionFiltrosMercado(j, 5), 0);
			td.appendChild(ref);
			tr.appendChild(td);
			table.appendChild(tr);
		}

		// Tipo de transaccion segun la relacion entre oferta y demanda
		var market2 = getOption("market2",4,"integer");
		var tr = elem("TR");
		tr.appendChild(elem("TD", T('TIPO')));
		table.appendChild(tr);
		var etiquetas_tipo = ["1:>1", "1:1", "1:<1", "1:x"];
		for (var i = 0; i < 4; i++){
			var td = elem("TD");
			td.setAttribute("id", "filtro" + 2 + i);
			if (i+1 == market2) td.setAttribute("style", "background-color:#E5E5E5");
			var ref = elem("A", etiquetas_tipo[i]);
			ref.setAttribute("href", "javascript:void(0)");
			td.addEventListener("click", funcionFiltrosMercado(2, (i+1)), 0);
			td.appendChild(ref);
			tr.appendChild(td);
		}
		tr.appendChild(elem("TD"));

		// Tiempo maximo de transporte
		var market4 = getOption("market4",4,"integer");
		var tr = elem("TR");
		tr.appendChild(elem("TD", T('MAXTIME')));
		table.appendChild(tr);
		var etiquetas_tipo = ["1", "2", "3", ">3"];
		for (var i = 0; i < 4; i++){
			var td = elem("TD");
			td.setAttribute("id", "filtro" + 4 + i);
			if (i+1 == market4) td.setAttribute("style", "background-color:#E5E5E5");
			var ref = elem("A", etiquetas_tipo[i]);
			ref.setAttribute("href", "javascript:void(0)");
			td.addEventListener("click", funcionFiltrosMercado(4, (i+1)), 0);
			td.appendChild(ref);
			tr.appendChild(td);
		}
		tr.appendChild(elem("TD"));

		// Filtro por disponibilidad de recursos y mercaderes
		var market3=getOption("market3",2,"integer");
		var tr = elem("TR");
		tr.appendChild(elem("TD", T('DISPONIBLE')));
		table.appendChild(tr);
		var etiquetas_carencia = [T('SI'), T('NO')];
		for (var i = 0; i < 2; i++){
			var td = elem("TD");
			td.setAttribute("colspan", "2");
			td.setAttribute("id", "filtro" + 3 + i);
			if (i+1 == market3) td.setAttribute("style", "background-color:#E5E5E5");
			var ref = elem("A", etiquetas_carencia[i]);
			ref.setAttribute("href", "javascript:void(0)");
			td.addEventListener("click", funcionFiltrosMercado(3, (i+1)), 0);
			td.appendChild(ref);
			tr.appendChild(td);
		}
		tr.appendChild(elem("TD"));
		applyMarketFilters();

		// Busca la tabla de ofertas y la inserta justo antes
		var a = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]", XPFirst,get("lmid2"));
		var p = elem("P");
		p.appendChild(table);

//		setOption('marketpreload', 1);

		var Input3 = elem('input');
			Input3.value = getOption("marketpreload",0,"integer");
			Input3.className = 'fm';
			Input3.size = 4;
			Input3.addEventListener('change', function(){
				setOption('marketpreload', this.value);
				document.location.reload();

			}, false);

		p.appendChild(elem("P"));
		p.appendChild(document.createTextNode(T('MARKETPRELOADPAGE')));
		p.appendChild(Input3);

		a.parentNode.insertBefore(p, a);

		// market preload
		var linkid=find('//td[@class="rowpic"]/a',XPFirst,a).href.match('id=([0-9]*)&')[1];
//		log(2,"linkid:"+linkid); // http://s3.travian.hu/build.php?id=30&t=1&u=40#h2

		var marketpreload = getOption("marketpreload",0,"integer");
		if (0<marketpreload) {
			 setTimeout(createPreloadFunc(1),getRandTimeRange(600));

			var linkpages = xpathEvaluate("//a[contains(@href, '&t=1&u=')]");
			if (linkpages.snapshotLength > 0) {
				for (var i=0; i<linkpages.snapshotLength; i++) {
					if (linkpages.snapshotItem(i).href.search(/&t=1&u=(\d+)\#/)) {
						var a = RegExp.$1;
						if (a == 0) continue;

						var npage = 0;

						if (i == 0 && linkpages.snapshotLength > 1) {
							npage = parseInt(a) - marketpreload * 40;
						} else {
							npage = parseInt(a) + marketpreload * 40;
						}

						if (npage <= 0) npage = 0;

						if (marketpreload) {
							linkpages.snapshotItem(i).href = "build.php?id="+linkid+"&t=1&u="+npage+"#h2";
						}
					}
				}
			}
		}

	}

	/**
	 * Crea una funcion encargada de calcular e insertar el coste necesario segun una cantidad de una casilla
	 *
	 * Params:
	 *	id: identificador de unidad
	 *	coste: coste de una sola unidad
	 *
	 * Returns:
	 *	la funcion de procesamiento
	 */
		function crearFuncionExplorarUnidades(id, coste){
				var funcion = function (){
						var a = find("//input[@type='text']", XPList).snapshotItem(id - 1);
						var b = find("//div[@name='exp" + id + "']", XPFirst);
						var c = calculateResourceTime(arrayByN(coste, a.value));
						if (c) b.innerHTML = c; else b.innerHTML = '';
				};
				return funcion;
		}

		function tiempoExplorarUnidades(){
				if (!find("//form[@name='snd']//input[@type='image' and @value='ok']", XPFirst)) return;
				var a = find("//table[@class='tbg']//tr[not(@class)]//table[@class='f10']", XPList);
				for (var i = 0; i < a.snapshotLength; i++){
						var b = a.snapshotItem(i);
			var c = b.getElementsByTagName("TD")[2].textContent.split(" ")[0].split("|");

			var div = elem("DIV");
						div.setAttribute("name", "exp" + (i+1));
						var tr = elem("TR");
						var td = elem("TD");
						td.setAttribute("colspan", "2");
						td.setAttribute("class", "c f7 s7");
						td.appendChild(div);
						tr.appendChild(td);

						// FIXME: Apanyo para Firefox. FF mete un nodo extra al principio de la tabla
						var d = b.childNodes;
						d[d.length - 1].appendChild(tr);

						b.parentNode.parentNode.getElementsByTagName("INPUT")[0].addEventListener("keyup", crearFuncionExplorarUnidades((i+1), c), 0);
				}
		}

		function tiempoExplorar(){
				var a = find("//table[@class='tbg']//tr[@class='cbg1']", XPFirst);
		// FIXME: Apanyo para Firefox. FF mete varios nodos extras entre las columnas
				if (a == null || (a.childNodes.length != 2 && a.childNodes.length != 4)) return;

		var a = a.parentNode.childNodes;
		for (var i = 1; i < a.length; i++){
			var b = a[i];
			var c = b.getElementsByTagName("DIV");
			if (c.length == 2 && c[1].className == 'c'){
				var d = b.getElementsByTagName("TD")[3].textContent.split("|").splice(0,4);
				var e = calculateResourceTime(d);
				if (e) c[1].innerHTML = e;
			}
		}
		}

		/**
		 * Modifica el valor por defecto del tipo de ataque a enviar
		 */
		function ataqueDefecto(){
				var accion = 4; // 2 -> Apoyo, 3 -> Ataque, 4 -> Atraco

				var cities = find("//div[@id='lright1']//table[@class='f10']", XPFirst);
				if(cities && location.href.search(/z=(\d+)/) >= 0){
						var z = RegExp.$1;
						cities = cities.firstChild;
						for (var i = 0; i < cities.childNodes.length; i++){
								var city = cities.childNodes[i];
				city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
								var id = xy2id(RegExp.$1, RegExp.$2);
								if (id == z) accion = 2;
						}
				}

				var o = find("//input[@name='c' and @value='" + accion + "']", XPFirst);
				if (o) o.checked = true;
		}

	/**
	 * Inserta un nuevo marcador y lo almacena
	 *
	 * Params:
	 *	texto:	Texto del marcador
	 *	enlace:	Enlace a donde apunta el marcador
	 */
	function agregarElementoCookie(cookie, values){
		var nuevo = '';
		for (var i = 0; i < values.length; i++){
			if (values[i] != ''){
				nuevo += values[i];
				if (i != values.length - 1) nuevo += '$';
			}else return;
		}
		var a = readCookie(cookie + "_" + server);
		if (a != null && a != '' && a != 'null' && a != 'undefined') a += "$$" + nuevo;
		else a = nuevo;
		createCookie(cookie + "_" + server, a, 365);
	}

	/**
	 * Crea el evento de eliminar un marcador. Lo elimina y ademas refresca la lista donde estan mostrados
	 *
	 * Params:
	 * 	num:	Identificador de marcador a eliminar
	 */
	function crearEventoEliminarCookie(cookie, num, funcion){
				return function(){
			var a = readCookie(cookie + "_" + server);
			if (a != null){
				a = a.split("$$");
				a.splice(num, 1);
				createCookie(cookie + "_" + server, a.join("$$"), 365);
				removeElement(find("//*[@id='" + cookie + "']", XPFirst));
				funcion();
			}
		}
	}

	/**
	 * Recupera los marcadores almacenados. Dos marcadores estan separados por el simbolo $$ y
	 * en cada marcador el enlace y el texto estan separados por $. No se espera encontrar esos simbolos
	 * en el texto o en los enlaces, ya que de lo contrario fallaria.
	 *
	 * Returns:
	 *	Un array con cada uno de los marcadores
	 */
	function obtenerValorCookie(cookie){
		// Importar marcadores de versiones antiguas del script
		// FIXME: Eliminar dentro de unas cuantas versiones
		var b = readCookie(cookie);
		if (b != null && b != '' && b != 'undefined'){
			createCookie(cookie + "_" + server, b, 365);
			eraseCookie(cookie);
		}

		var res = new Array();
		var a = readCookie(cookie + "_" + server);

		if (a != null && a != '' && a != 'undefined'){
			a = a.split("$$");
			for (var i = 0; i < a.length; i++) res[i] = a[i].split("$");
		}
		return res;
	}

	/**
	 * Muestra los marcadores almacenados
	 //書籤
	 */
	function mostrarMarcadores(){
		// Intenta insertarlos en la lista derecha, si no existe la crea
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba){
			ba = elem("DIV");
			ba.setAttribute("id", "lright1");
			find("//body", XPFirst).appendChild(ba);
		}
		var div = elem("DIV");
		var titulo = elem("B", T('MARCADORES') + ":");
		var enlace = elem("A", T('ANYADIR'));
		var tabla = elem("TABLE");
		tabla.setAttribute("class", "f10");
		div.setAttribute("id", "marcadores");
		enlace.href = "javascript:void(0);";
		// Al anyadir se pide el texto y el enlace, si se cancela o se deja vacio alguno se aborta
		// Despues de insertar se refresca la lista volviendola a insertar
		enlace.addEventListener("click", function(){
								var a = prompt(T('ENLACE'));
								if (a == null || a == '' || a == 'undefined') return;
								var b = prompt(T('TEXTO'));
								if (b == null || b == '' || b == 'undefined') return;
								agregarElementoCookie("marcadores", [b, a]);
								removeElement(find("//div[@id='marcadores']", XPFirst));
								mostrarMarcadores();
						}, 0);
		titulo.setAttribute("class","f10");
		div.appendChild(titulo);
		div.appendChild(document.createTextNode(" (")); div.appendChild(enlace); div.appendChild(document.createTextNode(")"));
		div.appendChild(tabla);
//		var p = elem("P");
//		p.appendChild(div);
//		ba.appendChild(p);

//		document.title.search(/travian\s(\w+$)/i);
//		var idioma2 = RegExp.$1;

		// Se obtienen los marcadores y se insertan junto con un enlace para eliminarlos
		var marcadores = obtenerValorCookie("marcadores");

//		alert(idioma2);

//		var p = elem("P");
//		p.appendChild(div);
		ba.appendChild(div);

		if (!marcadores.length) return 0;

		for (var i = 0; i < marcadores.length; i++){
			var tr = elem("TR");
//			var td = elem("TD", "<span>&#8226;</span>&nbsp; <a href='" + marcadores[i][1] + "'>" + marcadores[i][0] + "</a>");


			if (marcadores[i][1].search(/karte.php\?d=(\d+)/) > 0){
				var a = RegExp.$1;

				var td = elem("TD",
					"<span>&#8226;</span>&nbsp; <a href='" + marcadores[i][1] + "' class='done' done='1'>" + marcadores[i][0] + "</a>"

					+ '<span class="done" style="word-break: keep-all; font: 11px/1.5em Tahoma,Verdana,Arial !important; color:grey;"> ( ' + zid2x(a) + ' | ' + zid2y(a) + ' ) </span>'

					+ " <a href='a2b.php?z=" + a + "' done='1'><img src='" + img("a/att_all.gif") + "' style='margin:3px 0px 1px 3px; display: inline' height='10' width='10' title='" + T('ATACAR') + "' alt='" + T('ATACAR') + "' border='0'></a>"
					+ " <a href='build.php?z=" + a + "&gid=17' done='1'>" + T('ALDEA_EXTRA2') + "</a>"
					+ " <a href='karte.php?z=" + a + "' done='1'>" + T('ALDEA_EXTRA3') + "</a>"
					+ " <a href='" + 'http://crop-finder.com/' + idioma2 + '/' + zid2x(a) + '|' + zid2y(a) + '/' + "' target='_blank' done='1'>" + "<img src='" + imagenes["cropfinder"] + "' style='margin:3px 0px 1px 3px; display: inline' height='12' border='0'>" + "</a>"
				);
			} else {
				var td = elem("TD", "<span>&#8226;</span>&nbsp; <a href='" + marcadores[i][1] + "'>" + marcadores[i][0] + "</a>");
			}

			var enlace = elem("A", " <img src='" + img('a/del.gif') + "' width='12' height='12' border='0' title='" + T('ELIMINAR') + "'>");
			enlace.href = "javascript:void(0);";
			enlace.addEventListener("click", crearEventoEliminarCookie("marcadores", i, mostrarMarcadores), 0);
			td.appendChild(enlace);
			tr.appendChild(td);
			tabla.appendChild(tr);
		}
	}

	/**
	 * Crea enlaces directos en la lista de aldeas para enviar tropas o enviar comerciantes
	 */
		function cityLinks(){
		// Localiza la lista de aldeas
				var cities = find("//div[@id='lright1']//table[@class='f10']", XPFirst);
				if (!cities) return;

			document.title.search(/travian\s(\w+$)/i);
			var idioma2 = RegExp.$1;

			cities = cities.firstChild;
			for (var i = 0; i < cities.childNodes.length; i++){
				// Utiliza el texto de las coordenadas para averiguar el ID necesario para los enlaces
				var city = cities.childNodes[i];
				city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
				var id = xy2id(RegExp.$1, RegExp.$2);
				/*
				city.appendChild(elem("TD", "<a href='a2b.php?z=" + id + "'><img src='" + img('a/def1.gif') + "' width='12' border='0' title='" + T('ENV_TROPAS') + "'></a>"));
				city.appendChild(elem("TD", "<a href='build.php?z=" + id + "&gid=17'><img src='" + img('r/4.gif') + "' height='12' border='0' title='" + T('ENVIAR') + "'></a>"));
				*/
				city.appendChild(elem("TD", "<a done='1' href='a2b.php?z=" + id + "'>" + T('ALDEA_EXTRA1') + "</a>"));
				city.appendChild(elem("TD", "<a done='1' href='build.php?z=" + id + "&gid=17'>" + T('ALDEA_EXTRA2') + "</a>"));
				city.appendChild(elem("TD", "<a done='1' href='karte.php?z=" + id + "'>" + T('ALDEA_EXTRA3') + "</a>"));
				city.appendChild(elem("TD", "<a done='1' href='http://crop-finder.com/" + idioma2 + "/" + zid2x(id) + "|" + zid2y(id) + "/' target='_blank'>" + '<img src="' + imagenes["cropfinder"] + '" height="12">' + "</a>"));
			}
	}

	/**
	 * Convierte todos los enlaces a la propia pagina del tipo "#" como enlaces vacios de javascript
	 */
	function sanearEnlaces(){
		var a = find("//a[@href='#']", XPList);
		for (var i = 0; i < a.snapshotLength; i++) a.snapshotItem(i).href = 'javascript:void(0)';
	}

	/**
	 * Muestra una tabla en la pagina de perfil con los valores almacenados en cookies por el script
	 */
		function mostrarConfiguracion(){
				var a = find("//form", XPFirst);
				var tabla = elem("TABLE");
				tabla.setAttribute("cellspacing", "1");
				tabla.setAttribute("cellpadding", "2");
				tabla.setAttribute("class", "tbg");
				tabla.setAttribute("id", "configuracion");

				var fila = elem("TR");
				var td = elem("TD", "Travian Beyond");
				td.setAttribute("class", "rbg");
				td.setAttribute("colspan", "2");
				fila.appendChild(td);
				tabla.appendChild(fila);

		// Parametros reconocidos
				var parametros = ["desp", "marcadores_" + server, "notas_" + server, "ventas_" + server, 'cpcty'];
				for (var i = 0; i < parametros.length; i++){
						fila = elem("TR");
						fila.appendChild(elem("TD", parametros[i]));
						var valor = readCookie(parametros[i]);
						fila.appendChild(elem("TD", "<input type='text' name='" + parametros[i] + "' value='" + (valor != null ? valor : '') + "' class='fm' style='width:275px;'/>"));
						tabla.appendChild(fila);
				}

				var parametros = ["marketpreload", 'allowlink', 'htmlon'];
				for (var i = 0; i < parametros.length; i++){
						fila = elem("TR");
						fila.appendChild(elem("TD", parametros[i]));
						var valor = getOption(parametros[i]);
						fila.appendChild(elem("TD", "<input id='setoption' type='text' name='" + parametros[i] + "' value='" + (valor != null ? valor : '') + "' class='fm' style='width:275px;'/>"));
						tabla.appendChild(fila);
				}

				insertAfter(a, tabla);

				var imagen = elem("IMG");
				imagen.setAttribute("src", img('b/s1.gif', true));
				imagen.addEventListener("click", function(){
						var parametros = get('configuracion').getElementsByTagName("INPUT");
						for (var i = 0; i < parametros.length; i++) {
							if (parametros.id == 'setoption') {
								setOption(parametros[i].name, parametros[i].value);
							} else {
								createCookie(parametros[i].name, parametros[i].value, 365);
							}
						}

						alert(T('GUARDADO'));
				}, 0);
				var p = elem("P");
				p.setAttribute("align", "center");
				p.appendChild(imagen);
				insertAfter(tabla, p);
		}

	/**
	 * Calcula y muestra el tiempo que ha tardado desde el inicio de ejecucion del script
	 */
	function calcularTiempoEjecucion(){
//		var tiempo = new Date().getTime() - tiempo_ejecucion;
		var tiempo = timestamp.getTime() - tiempo_ejecucion;
//		var div = find("//div[@id='ltime']/b", XPFirst);

		var div = xpath("//div[@id='ltime']/b");
		if (div.snapshotLength == 0) return;

		div = div.snapshotItem(0);

//		div.appendChild(elem("span", "TB: " + tiempo + " ms"));

//		insertAfter(elem("span", "&nbsp;ms&nbsp;TB: <b>" + tiempo + "</b>"), div);
		xpath("//div[@id='ltime']").snapshotItem(0).insertBefore(elem("span", "&nbsp;ms,&nbsp;TB: <b>" + tiempo + "</b>"), div.nextSibling);

//		div.innerHTML=div.innerHTML.replace(" ms<br>",'ms.&nbsp;TB: <b>'+tiempo+'</b>ms<br>');
	}

	/**
	 * Procesa una respuesta XmlHttpRequest de la pagina de una casilla para mostrar un tooltip con
	 * informacion sobre sus recursos
	 */
	function procesarCasilla2(t, who){
		if (timeout == null || !timeout || timeout == 0) return;

		// Solo hay 6 tipos de casillas
		var dist = [
			[3, 3, 3, 9],
			[3, 4, 5, 6],
			[4, 4, 4, 6],
			[4, 5, 3, 6],
			[5, 3, 4, 6],
			[1, 1, 1, 15]
		];

		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ans = elem('DIV');
		ans.innerHTML = t.responseText;
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);
		// Parece haber dos versiones del juego, asi que se contemplan las dos
		if (ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue)
			ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue.id.search(/f(\d)/);
		else
			ansdoc.evaluate("//img[@id='resfeld']", ans, null, XPFirst, null).singleNodeValue.src.search(/\/f(\d)\.jpg$/);

		var info = dist[RegExp.$1 - 1];
		var div = get("tb_tooltip");
		div.style.display = 'block';
		div.innerHTML = '';
		for (var i = 1; i < 5; i++) div.innerHTML += '<img src="' + img('r/' + i + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + i) + '">' + info[i-1] + ' ';

		if (who.href) {
			arrayRecursosCasilla[who.href] = div.innerHTML;
			who.setAttribute("casilla", div.innerHTML);
		}
	}

	function procesarCasilla(t,mev){
		var fieldtype=parseFieldType(t,mev);
		showFieldTypeInTooltip(fieldtype,mev);
	}

	function parseFieldType(t,mev){
//		log(1,"fieldtypeparseresp: "+mev.pos);
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ans = elem('DIV');
		ans.innerHTML = t.responseText;
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);
		// Parece haber dos versiones del juego, asi que se contemplan las dos
		if (ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue)
			ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue.id.search(/f(\d)/);
		else
			ansdoc.evaluate("//img[@id='resfeld']", ans, null, XPFirst, null).singleNodeValue.src.search(/\/f(\d)\.jpg$/);

		var fieldtype = RegExp.$1;
		//save to storage
		var pos = mev.area.href.match(/d=(\d+)/).pop();

		if (fieldtype>6) {
//			log(1,"invalid fieldtype at pos:"+pos+" ft:"+fieldtype);
			return;
		}
		showCellInfo(mev.pos+1,fieldtype);

		if (storeurl!='') gmAjaxRequest(storeurl,"POST","cmd=mapset&namespace="+server+"&pos="+pos+"&value="+fieldtype,dummy);
		return fieldtype;
	}

	function showCellInfo(pos,type) {
		var itext=['','(9)','<img src='+img('r/3.gif',false)+'>','(6)','<img src='+img('r/2.gif',false)+'>','<img src='+img('r/1.gif',false)+'>','(15)'];
		log(3,"cellinfo pos:"+pos+" type:'"+type+"'");

		var celldiv = get('map_info_'+pos);
		celldiv.innerHTML=itext[type];

		var showInfo = getOption("showmapinfo",true,"boolean") ? 1 : 1;
		celldiv.style.display=showInfo?'':'none';
	}

	function showFieldTypeInTooltip(fieldtype, mev) {

		var div = get("tb_tooltip");

		if (mev.area.getAttribute("casilla")) {
			div.innerHTML = mev.area.getAttribute("casilla");
			div.style.display = 'block';

			return;
		}

		// Solo hay 6 tipos de casillas
		var dist = [
			[3, 3, 3, 9],
			[3, 4, 5, 6],
			[4, 4, 4, 6],
			[4, 5, 3, 6],
			[5, 3, 4, 6],
			[1, 1, 1, 15]
		];
		var info = dist[fieldtype-1];
		div.innerHTML = '';
		for (var i = 1; i < 5; i++) div.innerHTML += '<img src="' + img('r/' + i + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + i) + '">' + info[i-1] + ' ';

		div.style.display = 'block';

		if (mev.area.href) {
			arrayRecursosCasilla[mev.area.href] = div.innerHTML;
			mev.area.setAttribute("casilla", div.innerHTML);
		}
	}

	/**
	 * Actualiza la posicion del tooltip. Solo puede haber un tooltip a la vez porque solo hay un puntero de cursos
	 */
	function updateTooltip(e){
//		var div = get("tb_tooltip");
//		div.style.left = (e.pageX + 15) + "px";
//		div.style.top = (e.pageY + 5) + "px";

		var dx = 15;
		var dy = 10;

		var div = get("tb_tooltip");
		//if(div.clientWidth==0 || div.clientHeight==0) return;
		if(div.clientWidth!=0 && e.pageX+dx+div.clientWidth - document.documentElement.scrollLeft > document.documentElement.clientWidth)
			div.style.left = (e.pageX - dx - div.clientWidth) + "px";
		else
			div.style.left = (e.pageX + dx) + "px";

		if(div.clientHeight!=0 && e.pageY+dy+div.clientHeight - document.documentElement.scrollTop > document.documentElement.clientHeight)
			div.style.top = (e.pageY - dy - div.clientHeight) + "px";
		else
			div.style.top = (e.pageY + dy) + "px";
	}

	/**
	 * Crea el objeto usado para meter la informacion del tooltip
	 */
	function crearTooltip(){
		var div = elem("DIV");
		div.setAttribute("id", "tb_tooltip");
		div.setAttribute("style", "position:absolute; display: block; padding: 4px; z-index: 100; border: solid 1px #CCC; background-color: #FEFFE3; display: none;");
		document.body.appendChild(div);

		// Solo puede haber un tooltip simultaneamente
		document.addEventListener("mousemove", updateTooltip, 0);
	}

//	function createMenu()
//	{
//		//var menu = $('<table id="tb_menu" cellspacing="2" cellpadding="2" style="font-size: 12px; border: 1px solid #CCC; z-index: 100; width: 160px; position: absolute; background-color: #FFF; display: none"><tr style="background-image: url(img/un/a/c2.gif);" height="20"><td width="140" align="center" style="font-weight: bold" id="menu_title"></td><td><a id="close_menu" href="javascript: void(null);" style="color: #333; font-weight: normal;">X</a></td></tr><tr height="20"><td colspan="2" id="menu_1"></td></tr><tr height="20"><td colspan="2" id="menu_2"></td></tr></table>');
//		//change by arrack
//		var menu = $('<table id="tb_menu" cellspacing="2" cellpadding="2" style="font-size: 12px; border: 1px solid #CCC; z-index: 100; width: 160px; position: absolute; background-color: #FFF; display: none"><tr style="background-image: url(img/un/a/c2.gif);" height="20"><td width="140" align="center" style="font-weight: bold" id="menu_title"></td><td><a id="close_menu" href="javascript: void(null);" style="color: #333; font-weight: normal;">X</a></td></tr><tr height="20"><td colspan="2" id="menu_1"></td></tr></table>');
//
//		$(menu).find('#close_menu').click(function() {
//			$('#tb_menu').hide();
//		});
//		$(document.body).append(menu);
//	}

	/**
	 * Crea el evento de cuando se coloca el raton sobre una casilla del mapa
	 *
	 * Params:
	 *	href: URL de la casilla
	 */
	function crearEventoRecursosCasilla(href, who){
		// Espera 1 segundo antes de realizar la peticion asincrona
		return function(){

			if (href == 'javascript:void(0)' || href == 'javascript: void(0)') {
				return 0;
			}

			var mapdata = arrayRecursosCasilla[href] ? arrayRecursosCasilla[href] : who.getAttribute("casilla");

			if (mapdata) {
				timeout = setTimeout(function(){
					var div = get("tb_tooltip");
					div.style.display = 'block';
					div.innerHTML = mapdata;
				}, 100);
			} else {
				timeout = setTimeout(function(){
					ajaxRequest(href, "GET", null, function (t) { procesarCasilla2(t, who); }, dummy);
				}, 1000);
			}
		};
		//return function(){ alert(href); timeout = setTimeout(function(){ ajaxRequest(href, "GET", null, function() { alert("success")}, dummy); }, 1000); };
	}

//	//建立地圖
//	function createMenuToResource(href, xPos, yPos, xPagePos, yPagePos)
//	{
//		$('#tb_menu').find('#menu_title').html(T('MAP') + " (" + xPos + "," + yPos + ")");
//		//$('#tb_menu').find('#menu_1').html("<a href='" + href + "'>" + T('OPENLINK') + "</a>");
//		$('#tb_menu').find('#menu_1').html('<a href="javascript: void(null);">' + T('OPENRESINFO') + '</a>');
//		//$('#tb_menu').find('#menu_2').html('<a href="javascript: void(null);">' + T('OPENRESINFO') + '</a>');
//		$('#tb_menu #menu_1 a').eq(0).click(function() {
//			timeout = setTimeout(function() {
//					$.ajax({
//						type: "GET",
//						url: href,
//						success: function(msg){
//							procesarCasilla(msg, xPos, yPos);
//						}
//					});
//				}, 0);
//		});
//		$('#tb_menu').css('display', 'block');
//		$('#tb_menu').css('left', (xPagePos + 5) + "px");
//		$('#tb_menu').css('top', (yPagePos + 5) + "px");
//
//	}

	/**
	 * Agrega un evento para mostrar la informacion de recursos sobre las casillas del mapa
	 */
//	function infoRecursos(){
////		var casillas = find("//img[starts-with(@class, 'mt')]", XPList);
////		var areas = find("//map//area[@shape='poly' and not(@onclick)]", XPList);
////
////		for (var i = 0; i < casillas.snapshotLength; i++){
////			if (casillas.snapshotItem(i).src.match(/\/(d|t)\d*.gif$/)){
////			var area = areas.snapshotItem(i);
////				area.addEventListener("mouseover", crearEventoRecursosCasilla(area.href, area), 0);
////				area.addEventListener("mouseout", function(){ clearTimeout(timeout); timeout = 0; get("tb_tooltip").style.display = 'none'; }, 0);
////			}
////		}
//	}

		/**
	 * Agrega un evento para mostrar la informacion de recursos sobre las casillas del mapa
	 * Map resourceinfo generator
	 */
	function infoRecursos(){

	/**
	 * Actualiza la posicion del tooltip. Solo puede haber un tooltip a la vez porque solo hay un puntero de cursos
	 */
//	function updateTooltip(e){
//		var div = get("tb_tooltip");
//		div.style.left = (e.pageX + 5) + "px";
//		div.style.top = (e.pageY + 5) + "px";
//	}

	function processMapGetResponse(r) {
//		log(1,"server response is:'"+r+"'");
		var cellinfos = r.split(",");
		for (var i=0;i<49;i++) {
			if (cellinfos[i]>0&&cellinfos[i]<10) showCellInfo(i+1,cellinfos[i]);
		}
	}

	/**
	 * Crea el objeto usado para meter la informacion del tooltip
	 */
//	function crearTooltip(){
//		var div = elem("DIV");
//		div.setAttribute("id", "tb_tooltip");
//		div.setAttribute("style", "position:absolute; display: block; padding: 4px; z-index: 100; border: solid 1px #00C000; background-color: #FEFFE3; display: none;");
//		document.body.appendChild(div);
//
//		// Solo puede haber un tooltip simultaneamente
//		document.addEventListener("mousemove", updateTooltip, 0);
//	}


			/**
	 * Crea una funcion que se encarga del evento al desplazarse en el mapa. Actualiza la direccion destino en
	 * base al desplazamiento configurado
	 *
	 * Params:
	 * 	i:	Ordinal sobre la orientacion de la flecha
	 *
	 * Returns:
	 *	La funcion que gestiona el evento
	 */
	function createEventoMapa(i, href){
		var funcion = function (){
			var despl = [-801, 1, 801, -1];
			var d = parseInt(document.getElementsByName("desp")[0].value);
			if (isNaN(d) || d < 1) d = 1;
			setOption("desp", d);
			var base = parseInt(href.split("=")[1]);
			var zval = i<4?(base + (despl[i] * (d - 1))):(base + (despl[i%4] * 6));
//			log(1,"base: "+base+" i:"+i+" d:"+d+" despli:"+despl[i]+" zval:"+zval);
			ajaxRequest("ajax.php?action=map_content&z=" + zval, "GET", null,
				function(t){
					get("map_content").innerHTML = t.responseText;
					infoRecursos();
					removeElement(get("tabla_mapa"));
					genMapTable();
				}
			, dummy);
		};
		return funcion;
	}

	function mapScan() {
		var mapcontent=get('map_content');
		var j=0;
		for(var i=1;i<50;i++){
			if (get('map_info_'+i).innerHTML=='') {
				var k1=(i-1)%7;
				var k2=Math.floor((49-i)/7);
				if (get("i_"+k1+"_"+k2).src.match(/\/(d|t)\d*.gif$/)) {
//				log(1,'map cell should be scanned: '+i+" a_"+k1+"_"+k2);
					var area = get("a_"+k1+"_"+k2);
					var mevobj = createMapInfoObj(area,i-1);
					setTimeout(mevobj.scan,j*600+getRandTimeRange(600));
				j++;
				}
			}
		}
	}

	function changeHide() {
		var showInfo = getOption("showmapinfo",true,"boolean");
		showInfo=!showInfo;
		var changeHidea = get("changehide");
		changeHidea.innerHTML=(showInfo?T('HIDEINFO'):T('SHOWINFO'));
		for(var i=1;i<50;i++){
			get('map_info_'+i).style.display=showInfo?'':'none';
		}

		setOption("showmapinfo",showInfo);
	}

	/**
	 */
	function desplazarMapa(){
		if (get('map_opts'))
			removeElement(get('map_opts'));

		// Crea y anyade la casilla del desplazamiento
		var b = find("//form[@method='post']", XPFirst).parentNode;
		var ctable = elem("TABLE");
		ctable.setAttribute("id", "map_opts");
		var ctbody = elem("TBODY");

		if (storeurl!='') {
			var showInfo = getOption("showmapinfo",true,"boolean");
			var changeHidea = elem("A",showInfo?T('HIDEINFO'):T('SHOWINFO'));
			changeHidea.setAttribute("id", "changehide");
			changeHidea.addEventListener("click", changeHide, 0);
			changeHidea.href = 'javascript:void(0)';
			var trc = elem("TR");
			var tdc = elem("TD");
			tdc.setAttribute("colspan", 2);
			tdc.appendChild(changeHidea);
			trc.appendChild(tdc);
			ctbody.appendChild(trc);

			var mapScana = elem("A",T('MAPSCAN'));
			mapScana.setAttribute("id", "mapscan");
			mapScana.addEventListener("click", mapScan, 0);
			mapScana.href = 'javascript:void(0)';
			trc = elem("TR");
			tdc = elem("TD");
			tdc.setAttribute("colspan", 2);
			tdc.appendChild(mapScana);
			trc.appendChild(tdc);
			ctbody.appendChild(trc);
		}
		ctable.appendChild(ctbody);
		b.appendChild(ctable);

		document.addEventListener("mousemove", updateTooltip, 0);

		// Inserta los eventos para manipular los desplazamientos
//		var a = find("//map/area[@onclick]", XPList);
//		for (var i = 0; i < a.snapshotLength; i++){
//			var b = a.snapshotItem(i);
//			b.setAttribute("onclick", '');
//			b.addEventListener("click", createEventoMapa(i, b.href), 0);
//			b.href = 'javascript:void(0)';
//		}
	}

	/**
	 * Realiza un resumen de la pagina del mapa
	 */
//	function genMapTable(){
//		if (get('tabla_mapa')) removeElement(get('tabla_mapa'));
//
//		var table = elem('TABLE');
//
//		table.setAttribute("id", "tabla_mapa");
//		table.setAttribute("sortCol", -1);
//		table.setAttribute("class", "tbg");
//		table.setAttribute("align", "left");
//		table.setAttribute("cellspacing", "1");
//		table.setAttribute("cellpadding", "2");
//		var thead = elem("THEAD");
//		var tbody = elem("TBODY");
//		var fila = elem('TR');
//		fila.setAttribute('class', "rbg");
//		thead.appendChild(fila);
//		table.appendChild(thead);
////		var etiquetas_tabla = ["JUGADOR", "ALIANZA", "ALDEA", "HAB", "COORD", "ACCION"];
//		var etiquetas_tabla = ["JUGADOR", "ALIANZA", "ALDEA", "HAB"];
//		for (var i = 0; i < etiquetas_tabla.length; i++){
//			var td = elem('TD', T(etiquetas_tabla[i]));
//			if (i < 4){
//				switch(i){
//					case 3: td.addEventListener("click", sortTable('tabla_mapa', i, 'int'), 0); break;
//					default: td.addEventListener("click", sortTable('tabla_mapa', i), 0);
//				}
//				td.style.cursor = "pointer";
//			}
//			fila.appendChild(td);
//		}
//		var datos = 0;
//		var area;
//		for(var i = 0; i < 7; i++)
//			for(var j = 0; j < 7; j++) {
//				area = document.getElementById('a_'+i+'_'+j).wrappedJSObject;//.getAttribute('details');//lmc.ad[i][j];
//				var cellinfo=area.details;
////				log(1,'cellinfo i:'+i+' j:'+j+' x: '+cellinfo.x+' y: '+cellinfo.y);
//
//				_attachEvent(area, 'mouseover', area_onmouseover);
//
//				if (cellinfo && cellinfo.name !=null ) {
//					datos=1;
//					var inforow = elem('TR');
//					var href=area.href;
//
//					inforow.appendChild(elem('TD', cellinfo.name));
//					inforow.appendChild(elem('TD', cellinfo.ally));
//					inforow.appendChild(elem('TD', '<a href="' + href + '">' + cellinfo.dname + '</a>'));
//					inforow.appendChild(elem('TD', cellinfo.ew));
//
////					inforow.appendChild(elem('TD', '<a href="' + href + '">' + cellinfo.x + ", " + cellinfo.y + '</a>'));
////					inforow.appendChild(elem('TD', '<a href="' + href.replace("karte.php?d", "a2b.php?z") + '">' + T('ATACAR') + '</a> / <a href="' + href.replace("karte.php?d", "build.php?z") + '&gid=17">' + T('COMERCIAR') + '</a>'));
//					tbody.appendChild(inforow);
//				}
//			}
//
//		table.appendChild(tbody);
//		if (datos == 1)  {
//
//			if (get('tabla_mapa_div')) {
//				var divt = get('tabla_mapa_div');
//			} else {
//				var divt = elem('DIV');
//				divt.style.display = 'block';
//				divt.style.position = 'absolute';
//				divt.id = 'tabla_mapa_div';
//				divt.style.top = 610 + longitudPantalla() + 'px';
//				document.body.appendChild(divt);
//			}
//
//			divt.appendChild(table);
//
//			playerLinks();
//
////			var middleblock = get('lmidall');
////			//middleblock.appendChild(elem('BR'));
////			middleblock.appendChild(table);
//		}

		//	// Realiza un resumen de la pagina del mapa

	function  genMapTable(){

		if (get('tabla_mapa')) removeElement(get('tabla_mapa'));
		var datos = 0;
		var table = elem('TABLE');
		table.setAttribute("id", "tabla_mapa");
		table.setAttribute("sortCol", -1);
		table.setAttribute("class", "tbg");
		table.setAttribute("align", "center");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "2");
		var thead = elem("THEAD");
		var tbody = elem("TBODY");
		var fila = elem('TR');
		fila.setAttribute('class', "rbg");
		thead.appendChild(fila);
		table.appendChild(thead);
//		var etiquetas_tabla = ['JUGADOR', 'ALIANZA', 'ALDEAS', 'HAB', 'MAT_PRIMAS' , 'COORD', 'ACCION'];
		var etiquetas_tabla = ['JUGADOR', 'ALIANZA', 'ALDEAS', 'HAB'];
		for (var i = 0; i < etiquetas_tabla.length; i++){
			var td = elem('TD', Traduz(etiquetas_tabla[i]));
			if (i < 5){
				switch(i){
					case 3: td.addEventListener("click", sortTable('tabla_mapa', i, 'int'), 0); break;
					case 4: td.setAttribute('id', 'SLY_69'); break;
					default: td.addEventListener("click", sortTable('tabla_mapa', i), 0);
				}
				td.style.cursor = "pointer";

				if (etiquetas_tabla[i] == 'MAT_PRIMAS') td.style.display = 'none';
			}
			fila.appendChild(td);
		}
		// Procesa todas las casillas del mapa
		var area;
		var f_id_aldea = 0;
		for(var i = 6; i > -1; i--)
		{
			for(var j = 0; j < 7; j++)
			{
				f_id_aldea++;
				area = get('a_'+j+'_'+i).wrappedJSObject;

				_attachEvent(area, 'mouseover', area_onmouseover);
				_attachEvent(area, 'mouseout', area_onmouseout);

				area.setAttribute("casilla", '');
				arrayRecursosCasilla[area.href] = '';

				var imga = get('i_'+j+'_'+i).src.match(/img\/un\/m\/(\w)(\d+)\.gif/i).pop();
				var t=RegExp.$1;
				var v=RegExp.$2;

				var cellinfo=area.details;
				datos=1;
				var inforow = elem('TR');

				switch(t){
					case 'o':
						switch(v){
							case '1':
							case '2':
								cont='+25%<img src='+img('r/1.gif')+'>';
								break;
							case '3':
								cont='+25%<img src='+img('r/1.gif')+'> +25%<img src='+img('r/4.gif')+'>';
								break;
							case '4':
							case '5':
								cont='+25%<img src='+img('r/2.gif')+'>';
								break;
							case '6':
								cont='+25%<img src='+img('r/2.gif')+'> +25%<img src='+img('r/4.gif')+'>';
								break;
							case '7':
							case '8':
								cont='+25%<img src='+img('r/3.gif')+'>';
								break;
							case '9':
								cont='+25%<img src='+img('r/3.gif')+'> +25%<img src='+img('r/4.gif')+'>';
								break;
							case '10':
							case '11':
								cont='+25%<img src='+img('r/4.gif')+'>';
								break;
							case '12':
								cont='+50%<img src='+img('r/4.gif')+'>';
								break;
							default:
								cont='err<img src='+img('a/del.gif')+'>'
						};

						if (!cellinfo.done) {
							cont = ' <span style="word-break: keep-all; font: 11px/1.5em Tahoma,Verdana,Arial !important; color:grey;">' + cont + '</span>';
							cellinfo.dname = cellinfo.dname || T('OASIS');
							cellinfo.dname += cont;
						}

						cellinfo.done = 1;
					default:
						if (!cellinfo.dname) continue;

						break;
				}

				if (cellinfo && cellinfo.name !=null )
				{
					inforow.appendChild(elem('TD', cellinfo.name));
					inforow.appendChild(elem('TD', cellinfo.ally));
					var temp = elem('TD', '<a href="' + area.href + '">' + cellinfo.dname + '</a>');
					temp.style.cursor = "pointer";
					temp.addEventListener('click',eventtableover,false);
					inforow.appendChild(temp);
					inforow.appendChild(elem('TD', cellinfo.ew));
				}
				else
				{
					inforow.appendChild(elem('TD', '-'));
					inforow.appendChild(elem('TD', '-'));
					var temp = elem('TD', '<a href="' + area.href + '">' + cellinfo.dname + '</a>');
					temp.style.cursor = "pointer";
					temp.addEventListener('click',eventtableover,false);
					inforow.appendChild(temp);
					inforow.appendChild(elem('TD', '-'));
				}
//				var href=area.href;
//				temp = (elem('TD', Traduz('CLICAME')));
//				temp.setAttribute('lk', href);
//				temp.setAttribute('id', 'SLY_' + f_id_aldea);
//				temp.addEventListener("click", function() {adiciona_recursos(this.getAttribute('lk'), this.getAttribute('id'))}, 0);
//				temp.style.cursor = "pointer";
//
//				temp.style.display = 'none';

//				inforow.appendChild(temp);
//				inforow.appendChild(elem('TD', '<a href="' + href + '">' + cellinfo.x + " | " + cellinfo.y + '</a>'));
//				inforow.appendChild(elem('TD', '<a href="' + href.replace("karte.php?d", "a2b.php?z") + '">' + Traduz('ATACAR') + '</a> / <a href="' + href.replace("karte.php?d", "build.php?z") + '&gid=17">' + Traduz('COMERCIAR') + '</a>'));
				tbody.appendChild(inforow);
				inforow.setAttribute('mt', 'mt' + (f_id_aldea));
			}
		}
		table.appendChild(tbody);
		table.style.position = 'absolute';
		table.style.top = 580 + 'px';
		if (datos == 1) document.body.appendChild(table);
//		get('SLY_69').addEventListener("click", function() {for (var i = 1; i < 50; i++) {adiciona_recursos(get('SLY_' + i).getAttribute('lk'), get('SLY_' + i).getAttribute('id'))};}, 0);
		find('//div[@id="map_content"]/div[@class="mdiv"]/img',XPList).snapshotItem(0).parentNode.appendChild(elem('div','<img id="mapmarker" class="mt1" src="data:image/gif;base64,' + imagenes["imgmarker"] + '" style="z-index: 100; color: RGB(249, 201, 16); display: none">'));

	}

	function genMapInfoBlock() {
		var mapinfo = get("map_info");
		if (mapinfo) { removeElement(mapinfo); }
		var firstpos=get("a_0_6").href.match(/d=(\d+)/).pop();
//		log(1,"mapfirstpos:"+firstpos);
		mapinfo = elem("div");
		mapinfo.setAttribute("id","map_info");
		for(var i=1;i<50;i++){
			var divs=elem('div','<div id="map_info_'+i+'" t="0" style="position:relative;left:31px;top:48px;z-index: 90;border: solid 1px #00C000; background-color: #FEFFE3;-moz-border-radius: 8px; display: none"></div>')
			divs.className='mt'+i;
			divs.setAttribute("style","z-index: 2;");
			mapinfo.appendChild(divs);
		}
		get("a_0_6").parentNode.appendChild(mapinfo);
		if (storeurl!='') gmAjaxRequest(storeurl,"POST","cmd=mapget&namespace="+server+"&pos="+firstpos,processMapGetResponse);
	}

		genMapTable();
		desplazarMapa();
		crearTooltip();
		var mapcontent=get('map_content');
		var casillas = find("//div[@class='mdiv' and @style='z-index: 2;']/img", XPList,mapcontent); // areatypeimage
		var areas = find("//map//area[@shape='poly' and (@coords)]", XPList,mapcontent);
		if (areas.snapshotLength>0) {
			genMapInfoBlock();

			var oasisdata='';
			for (var i = 0; i < casillas.snapshotLength; i++){
				var area = areas.snapshotItem(i);
				if (casillas.snapshotItem(i).src.match(/\/o(\d+)\.gif/)){
					var otype = casillas.snapshotItem(i).src.match(/\/o(\d+)\.gif/).pop();
					if (otype && storeurl!='') {
						var pos = area.href.match(/d=(\d+)/).pop();
						oasisdata+="&pos="+pos+"&value="+(Number(otype)+10);
//						log(2,"src["+i+"] pos:"+pos+" type:"+otype);
					}
				}
			}
			if (storeurl!=''&&oasisdata!='') gmAjaxRequest(storeurl,"POST","cmd=mapset&namespace="+server+oasisdata,dummy);

		}

	}

	/**
	 * Funcion que realiza una peticion XML asincrona
	 *
	 * Params:
	 *	url: Direccion a la que realizar la peticion
	 *	method: Metodo de la peticion. Puede ser GET o POST
	 *	param: Parametros codificados como URI (solo con POST, null si no se usan)
	 *	onSuccess: Funcion a invocar cuando se reciba el resultado
	 *	onFailure: Funcion a invocar si la peticion falla
	 */
	function ajaxRequest(url, method, param, onSuccess, onFailure){
		var xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.onreadystatechange = function() {
			if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200 && onSuccess != null) onSuccess(xmlHttpRequest);
			else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200 && onFailure != null) onFailure(xmlHttpRequest);
		};
		xmlHttpRequest.open(method, url, true);
		xmlHttpRequest.url = url;

		method = method.toUpperCase();

		if (method == 'POST') xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlHttpRequest.send(param);
	}

	function gmAjaxRequest(url, method, param, onSuccess){
		GM_xmlhttpRequest({ method: method,url: url, headers:{'Content-type':'application/x-www-form-urlencoded'},
		data: param, onload: function(responseDetails) { onSuccess(responseDetails.responseText); }});
	}

	//導出短信息
	function archiveIGM(){
		var a = find("//form[@name='msg']", XPFirst);
		// Creates structure HTML of the pad
		var table = elem("TABLE");
		var row1 = elem("TR");
		var row2 = elem("TR");
		var row3 = elem("TR");
		var cell1 = elem("TD");
		var cell2 = elem("TD");
		var cell3 = elem("TD");
		var p = elem("P");
		var textarea = elem("TEXTAREA", "");
		var input = elem("INPUT");
		//設定屬性
		table.setAttribute("class", "tbg");
		table.setAttribute("cellpadding", "2");
		table.setAttribute("cellspacing", "1");
		row1.setAttribute("class", "rbg");
		cell1.innerHTML = T('IGMOUTPUT');
		textarea.setAttribute("name", "IGMoutput");
		textarea.setAttribute("rows", "12");
		textarea.setAttribute("style", 'font-size: 10pt; width: 98%;overflow-x:none');
		row3.setAttribute("class", "rbg");
		input.setAttribute("type", "button");
		input.setAttribute("value", T('IGMOUTPUT'));
		input.addEventListener("click", function(){ outputIGM(); }, 0);

		row1.appendChild(cell1);
		cell2.appendChild(textarea);
		row2.appendChild(cell2);
		cell3.appendChild(input);
		row3.appendChild(cell3);
		table.appendChild(row1);
		table.appendChild(row2);
		table.appendChild(row3);
		a.parentNode.appendChild(p);
		a.parentNode.appendChild(table);
	}

	function getIGM(t){
		var ans = elem('DIV');
		ans.innerHTML = t.responseText;
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);
		var igmsingle = '';
		igmsingle += T('IGMSENTER') + ':' + ansdoc.evaluate("//form[@action='nachrichten.php']//tr[2]/td[3]", ans, null, XPFirst, null).singleNodeValue.textContent + '\n';
		igmsingle += T('IGMTITLE') + ':' + ansdoc.evaluate("//form[@action='nachrichten.php']//tr[3]/td[2]", ans, null, XPFirst, null).singleNodeValue.textContent + '\n';
		igmsingle += T('IGMDATE') + ':' + ansdoc.evaluate("//form[@action='nachrichten.php']//tr[2]/td[4]", ans, null, XPFirst, null).singleNodeValue.textContent + ',';
		igmsingle += T('IGMTIME') + ':' + ansdoc.evaluate("//form[@action='nachrichten.php']//tr[3]/td[3]", ans, null, XPFirst, null).singleNodeValue.textContent + '\n';
		igmsingle += ansdoc.evaluate("//form[@action='nachrichten.php']//tr[5]/td[2]", ans, null, XPFirst, null).singleNodeValue.textContent;
		igmsingle += '\n\n==========\n\n';
		//return igmsingle;
		var a = find("//textarea[@name='IGMoutput']", XPFirst);
		a.value+=igmsingle;
	}

	function outputIGM(){
		var igms = find("//form[@name='msg']//td[2]/a", XPList);
		var a = find("//textarea[@name='IGMoutput']", XPFirst);
		a.value='';

		for (var i = igms.snapshotLength -1; i >=0 ; i--){
			var igmlink = igms.snapshotItem(i);
			ajaxRequest(igmlink.href, "GET", null, getIGM, dummy);
		}
	}

	function changeText(){
		try{
			eval('var text = text_' + language);
			reemplazartextRecursivo(document.body, text);
		}catch(e){}
	}

	/**
	 * Inserta un enlace y peticion bajo demanda de la ultima version disponible del script
	 */
	function checkUpdate(){
		var b = find("//div[@id='lmid2']", XPFirst);
		var div = elem("DIV");
		div.innerHTML = "<b>Travian Beyond v" + version + "</b><br/>";
		var a = elem("T","目前最新版本為 <img style='vertical-align: bottom;' src='http://www.denibol.com/proyectos/travian_beyond/version.php'/>");
		var div2 = elem("DIV");
		div2.appendChild(a);
		div.appendChild(div2);
		b.appendChild(div);
	}

	function mostrarVentas(){
		if (!find("//input[@type='hidden' and @name='t' and @value='2']", XPFirst)) return;
		find("//form", XPFirst).setAttribute("name", "sell");

		var a = find("//input[@type='image' and @name='s1']", XPFirst);
		a.addEventListener("click", function(){
			var param = ["m1", "m2", "rid1", "rid2", "d2"];
			var checks = ["d1", "ally"];
			var values = new Array();
			for(var i = 0; i < param.length; i++) eval("values[" + i + "] = find(\"//*[@name='" + param[i] + "']\", XPFirst).value");
			for(var i = 0; i < checks.length; i++){
				try{
					eval("var b = find(\"//*[@name='" + checks[i] + "']\", XPFirst).checked");
					if (b == true) values[i + param.length] = '1'; else values[i + param.length] = '0';
				}catch(e){}
			}
			agregarElementoCookie("ventas", values);
		}, 0);

		var ventas = obtenerValorCookie("ventas");

		if (ventas.length > 0){
			var tabla = elem("TABLE");
			tabla.setAttribute("id", "ventas");
			tabla.setAttribute("class", "tbg");
			tabla.setAttribute("align", "center");
			tabla.setAttribute("cellspacing", "1");
			tabla.setAttribute("cellpadding", "2");

			var tr = elem("TR");
			tr.setAttribute("class", "rbg");
			var columnas = [T('OFREZCO'), T('BUSCO'), T('MAXTIME'), T('ALIANZA'), T('VENDER'), T('ELIMINAR')];
			for (var i = 0; i < columnas.length; i++) tr.appendChild(elem("TD", columnas[i]));
			tabla.appendChild(tr);

			for (var i = 0; i < ventas.length; i++){
				var tr = elem("TR");

				td = elem("TD", '<img src="' + img('r/' + (ventas[i][2]) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (ventas[i][2])) + '"> ' + ventas[i][0]); tr.appendChild(td);
				td = elem("TD", '<img src="' + img('r/' + (ventas[i][3]) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (ventas[i][3])) + '"> ' + ventas[i][1]); tr.appendChild(td);
				td = elem("TD", ventas[i][5] == '1' ? ventas[i][4] : T('NO')); tr.appendChild(td);
				td = elem("TD", ventas[i][6] == '1' ? T('SI') : T('NO')); tr.appendChild(td);

				td = elem("TD", '<a href="javascript:void(0);" onClick="sell.m1.value=' + ventas[i][0] + ';sell.m2.value=' + ventas[i][1] + ';sell.rid1.value=' + ventas[i][2] + ';sell.rid2.value=' + ventas[i][3] + ';sell.d2.value=' + ventas[i][4] + ';sell.d1.checked=' + (ventas[i][5] == '1') + (ventas[i][6] ? ';sell.ally.checked=' + (ventas[i][6] == '1') : '') + ';sell.submit();"><img src="' + img('b/ok1.gif', true) + '" title="' + T('VENDER') + '" alt="' + T('VENDER') + '" border="0"></a>'); tr.appendChild(td);
				tabla.appendChild(tr);


				var enlace = elem("A", " <img src='" + img('a/del.gif') + "' width='12' height='12' border='0' title='" + T('ELIMINAR') + "'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("click", crearEventoEliminarCookie("ventas", i, mostrarVentas), 0);
				var td = elem("TD");
				td.appendChild(enlace);
				tr.appendChild(td);;
			}
			insertAfter(a, tabla);
		}
	}

//	function procesarAldea(t){
//		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
//		var ans = elem("DIV", t.responseText);
//		var ansdoc = document.implementation.createDocument("", "", null);
//		ansdoc.appendChild(ans);
//
//		// ID de aldea
//		ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
//		var did = RegExp.$1;
//		var times = new Array();
//
//		// Materias primas
//		var a = '';
//		for (var i = 1; i < 5; i++){
//			var b = ansdoc.getElementById("l" + (i));
//			var perc = Math.round((b.innerHTML.split("/")[0] * 100) / b.innerHTML.split("/")[1]);
//			var cant = b.innerHTML.split("/")[0];
//			// Espero que la "k" sea internacional
//			if (cant % 1000 == 0) txt_cant = (cant / 1000) + "k"; else txt_cant = cant;
//			var c = '';
//			c += '<img src="' + img('r/' + i + '.gif') + '" border="0" title="' + T('RECURSO' + i) + '">';
//			c += '<span title="' + b.title + '">' + (cant < 0 ? '<font color="#ff0000">' + txt_cant + '</font>' : txt_cant) + '</span> <span style="font-size:9px; color:#909090" title="' + b.innerHTML + '">(' + perc + '%)</span>';
//			a += '<nobr>' + c + '</nobr>';
//			if (i != 4) a += " | ";
//		}
//		find("//td[@id='aldea" + did + "_0" + "']", XPFirst).innerHTML = a;
//
//		// Ataques
//		var casilla = find("//td[@id='aldea" + did + "_1" + "']", XPFirst);
//		var a = ansdoc.evaluate("//div[@id='ltbw1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
//		if (a){
//			var a = a.firstChild;
//			var b = new Array();
//			for (var i = 0; i < a.childNodes.length; i++){
//				var tr = a.childNodes[i];
//				// FIXME: Apanyo para FF. Firefox mete nodos vacios
//				var error = (tr.childNodes.length == 5 ? false : true);
//				times.push(tr.childNodes[error ? 9 : 4].textContent.split(" ")[0]);
//				b[i] = '<nobr><a href="build.php?newdid=' + did + '&gid=16" title="' + tr.childNodes[error ? 3 : 1].textContent.split(" ")[1] + '">' + tr.childNodes[error ? 1 : 0].firstChild.innerHTML + "</a> <span id='timeouta'>" + tr.childNodes[error ? 9 : 4].textContent.split(" ")[0] + '</span></nobr>';
//			}
//			casilla.innerHTML = b.join(" | ");
//		}else casilla.innerHTML = '-';
//
//		// Construcciones
//		var casilla = find("//td[@id='aldea" + did + "_2" + "']", XPFirst);
//		var a = ansdoc.evaluate("//div[@id='lbau1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
//		if (a){
//			var b = new Array();
//			for (var i = 0; i < a.firstChild.childNodes.length; i++){
//				times.push(a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0]);
//				b[i] = '<nobr><img src="' + img('a/bau.gif') + '" title="' + a.firstChild.childNodes[i].childNodes[1].innerHTML + '"/> <span id="timeouta">' + a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0] + "</span></nobr>";
//			}
//			casilla.innerHTML = b.join(" | ");
//		}else casilla.innerHTML = '-';
//
//		// Tropas
//		var casilla = find("//td[@id='aldea" + did + "_3" + "']", XPFirst);
//		var a = ansdoc.evaluate("//div[@id='ltrm']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue.firstChild;
//		if (a.firstChild.childNodes.length == 3){
//			var b = new Array();
//			for (var i = 0; i < a.childNodes.length; i++){
//				var tr = a.childNodes[i];
//				tr.childNodes[0].firstChild.firstChild.setAttribute("title", tr.childNodes[2].innerHTML);
//				b[i] = '<nobr>' + tr.childNodes[0].firstChild.innerHTML + tr.childNodes[1].innerHTML + '</nobr>';
//			}
//			casilla.innerHTML = b.join(" | ");
//		}else casilla.innerHTML = '-';
//
//		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
//		find("//span[@class='c2']", XPFirst).removeAttribute("class");
//		find("//a[contains(@href, '" + did + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';
//
//				// Auto Refresh
//		if (times.length > 0){
//					var time = Number.POSITIVE_INFINITY;
//					for (var i = 0; i < times.length; i++) {
//							times[i] = calcular_segundos(times[i]);
//							if (times[i] < time) time = times[i];
//					}
//					setTimeout(crearEventoActualizarAldea(did), 1000 * time);
//		}
//
//		// FIXME: Firefox rendering bug
//		casilla.parentNode.setAttribute("style", "width:100%");
//	}

	function procesarAldea(t){
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// ID de aldea
		ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
		var did = RegExp.$1;

		var times = new Array();

		// Materias primas
		var a = '';
		var imgno = 1;
		/*修正顯示相反的問題 */
		for (var i = 4; i >= 1; i--){

			var b = ansdoc.getElementById("l" + (i));
			var perc = Math.round((b.innerHTML.split("/")[0] * 100) / b.innerHTML.split("/")[1]);
			var cant = b.innerHTML.split("/")[0];
			// Espero que la "k" sea internacional
			if (cant % 1000 == 0) txt_cant = (cant / 1000) + "k"; else txt_cant = cant;
			var c = '';

			/* TeYoU: 資源概況 dorf3.php */
			c += '<img src="' + img('r/' + imgno++ + '.gif') + '" border="0" title="' + T('RECURSO' + i) + '">';
			c += '<span title="' + b.title + '">' + (cant < 0 ? '<font color="#ff0000">' + txt_cant + '</font>' : txt_cant) + '</span> <span style="font-size:9px; color:#909090" title="' + b.innerHTML + '">(' + perc + '%)</span>';
			a += '<nobr>' + c + '</nobr>';
			if (i != 4) a += " | ";
		}
		find("//td[@id='aldea" + did + "_0" + "']", XPFirst).innerHTML = a;

		// Ataques
		var casilla = find("//td[@id='aldea" + did + "_1" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='ltbw1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a){
			var a = a.firstChild;
			var b = new Array();
			for (var i = 0; i < a.childNodes.length; i++){
				var tr = a.childNodes[i];
				// FIXME: Apanyo para FF. Firefox mete nodos vacios
				var error = (tr.childNodes.length == 5 ? false : true);
				times.push(tr.childNodes[error ? 9 : 4].textContent.split(" ")[0]);
//				b[i] = '<nobr><a href="build.php?newdid=' + did + '&gid=16" title="' + tr.childNodes[error ? 3 : 1].textContent.split(" ")[1] + '">' + tr.childNodes[error ? 1 : 0].firstChild.innerHTML + "</a> <span id='timeouta'>" + tr.childNodes[error ? 9 : 4].textContent.split(" ")[0] + '</span></nobr>';
				b[i] = '<nobr><a href="build.php?newdid=' + did + '&gid=16" title="' + tr.childNodes[error ? 3 : 1].textContent.split(" ")[1] + '">' + tr.childNodes[error ? 1 : 0].firstChild.innerHTML + "</a> "+ tr.childNodes[error ? 3 : 1].textContent+ ' ' + tr.childNodes[error ? 5 : 2].textContent + " <span id='timeouta'>" + tr.childNodes[error ? 9 : 4].textContent.split(" ")[0] + '</span></nobr>';
			}
			casilla.innerHTML = b.join(" | ");
		}else casilla.innerHTML = '-';

		// Construcciones
		var casilla = find("//td[@id='aldea" + did + "_2" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='lbau1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a){
			var b = new Array();
			for (var i = 0; i < a.firstChild.childNodes.length; i++){
				times.push(a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0]);
				b[i] = '<nobr><img src="' + img('a/bau.gif') + '" title="' + getInnerText(a.firstChild.childNodes[i].childNodes[1]) + '"/> <span id="timeouta" title="' + getInnerText(a.firstChild.childNodes[i].childNodes[1]) + '">' + a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0] + "</span></nobr>";
			}
			casilla.innerHTML = b.join(" | ");
		}else casilla.innerHTML = '-';

		// Tropas
		var casilla = find("//td[@id='aldea" + did + "_3" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='ltrm']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue.firstChild;
		if (a.firstChild.childNodes.length == 3){
			var b = new Array();
			for (var i = 0; i < a.childNodes.length; i++){
				var tr = a.childNodes[i];
				tr.childNodes[0].firstChild.firstChild.setAttribute("title", tr.childNodes[2].innerHTML);
				b[i] = '<nobr>' + tr.childNodes[0].firstChild.innerHTML + tr.childNodes[1].innerHTML + '</nobr>';
			}
			casilla.innerHTML = b.join(" | ");
		}else casilla.innerHTML = '-';

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + did + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';

//		switchActiveVillage_list(did);

		// Auto Refresh
		if (times.length > 0){
					var time = Number.POSITIVE_INFINITY;
					for (var i = 0; i < times.length; i++) {
							times[i] = calcular_segundos(times[i]);
							if (times[i] < time) time = times[i];
					}
					//TeYoU: 註解自動更新
					//setTimeout(crearEventoActualizarAldea(did), 1000 * time);
		}

		// FIXME: Firefox rendering bug
		casilla.parentNode.setAttribute("style", "width:100%");
	}

	function crearEventoActualizarAldea(did){
		return function(){
			find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b3.gif');
			ajaxRequest("dorf1.php?newdid=" + did, "GET", null, procesarAldea,
				function(){ find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b4.gif'); }
			);
		};
	}

//	function resumenAldeas(){
//		if (plus) return;
//		var ba = find("//div[@id='lright1']", XPFirst);
//		if (!ba) return;
//
//		var aldeas = ba.getElementsByTagName("A");
//		var a = find("//div[@id='lmid2']", XPFirst);
//
//		var tabla = elem("TABLE");
//		tabla.setAttribute("class", "tbg");
//		tabla.setAttribute("align", "center");
//		tabla.setAttribute("cellspacing", "1");
//		tabla.setAttribute("cellpadding", "2");
//
//		var tr = elem("TR");
//		var td = elem("TD", T('RESUMEN'));
//		td.setAttribute("colspan", "3");
//		tr.appendChild(td);
//		tr.setAttribute("class", "rbg");
//		tabla.appendChild(tr);
//
//		for (var i = 0; i < aldeas.length; i++){
//			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
//				var did = RegExp.$1;
//				var tr = elem("TR");
//
//				var td = elem("TD");
//				var enlace = elem("A", "<img src='" + img('a/b5.gif') + "' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
//				enlace.href = "javascript:void(0);";
//				enlace.addEventListener("click", crearEventoActualizarAldea(did), 0);
//				var nobr = elem("NOBR");
//				nobr.appendChild(enlace);
//				nobr.appendChild(elem("SPAN", ' <a href="dorf1.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
//				td.appendChild(nobr);
//				td.setAttribute("rowspan", "2");
//				td.setAttribute("align", "left");
//				tr.appendChild(td);
//
//				for (var j = 0; j < 4; j++){
//					if (j != 2 && j != 0) tr = elem("TR");
//					td = elem("TD", "-");
//					td.setAttribute("id", "aldea" + did + "_" + j);
//					td.setAttribute("align", "center");
//					if (j != 1 && j != 2) td.setAttribute("width", "100%");
//					if (j == 0) td.setAttribute("colspan", "2");
//					else if(j == 3){
//						td.setAttribute("colspan", "3");
//						td.setAttribute("style", "border-bottom-style: solid; border-bottom-width: thin");
//					}
//					tr.appendChild(td);
//					if (j != 1) tabla.appendChild(tr);
//				}
//			}
//		}
//		if (a.firstChild) insertAfter(a.firstChild, tabla);
//		else a.appendChild(tabla);
//	}

	function switchActiveVillage_list(currentActiveVillage) {
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + currentActiveVillage + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';
	}

	function switchActiveVillage(did, surl, sw) {
		if(!isInt(did)) {return;	}

		surl = surl ? surl + '&newdid=' + did : "dorf1.php?newdid="+did;

	//	get("dorf1.php?newdid="+did, null, null);
		ajaxRequest(surl, 'GET', null, (!sw ? null : function () {
			var currentActiveVillage = getActiveVillage();
			find("//span[@class='c2']", XPFirst).removeAttribute("class");
			find("//a[contains(@href, '" + currentActiveVillage + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';
		}), null);

		if (sw) {
			ajaxRequest(surl, 'GET', null, function () {
				var currentActiveVillage = getActiveVillage();
//				find("//span[@class='c2']", XPFirst).removeAttribute("class");
//				find("//a[contains(@href, '" + currentActiveVillage + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';

				switchActiveVillage_list(currentActiveVillage);
			}, null);
		} else {
			ajaxRequest(surl, 'GET', null, null, null);
		}

		return;
	}

	function isInt(x) {
		var y = parseInt(x);
		if (isNaN(y)) {return false;}
		return x==y && x.toString()==y.toString();
	}

	/** @return newdid of the currently selected village */
	function getActiveVillage() {
		var oActiveLink = xpath("//a[@class='active_vl']");
		if(oActiveLink.snapshotLength > 0) {
			var sHref = oActiveLink.snapshotItem(0).href;
			var aMatch = sHref.match(/newdid=([0-9]*)/i);
			if(!aMatch) {
				return false;
			} else {
				return aMatch[1];
			}
		} else {
			return false;
		}
	}

	/** @return name of one of your one villages. */
	function getVillageName(iVillageDid) {
		if(iVillageDid == '' || iVillageDid == 'null') {  //no village id
			return '';
		}
		var sVillageName = '';
		var xpathResult = xpath("id('lright1')/table/tbody/tr/td/a[contains(@href, '" +iVillageDid+ "')]");
		if(xpathResult.snapshotLength > 0) {
			return xpathResult.snapshotItem(0).innerHTML;
		} else {
			return 'unknown';
		}
	}

	function getElementsByClassName(oElm, strTagName, strClassName){ // searches the oElm for strTagName objects with strClassName class
		var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);

		var arrReturnElements = new Array();
		strClassName = strClassName.replace(/\-/g, "\\-");
		var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
		var oElement;
		for(var i=0; i<arrElements.length; i++){
			oElement = arrElements[i];
			if(oRegExp.test(oElement.className)){
				arrReturnElements.push(oElement);
			}
		}
		return arrReturnElements;
	}

	function resumenAldeas(){
//		if (plus) return;
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba) return;

		var aldeas = ba.getElementsByTagName("A");
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = elem("TABLE");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("align", "center");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");

		var tr = elem("TR");

		/**
		 * TeYoU
		 * 整體檢視頁面 訊息 Refresh
		 */
		var FullRefresh = elem("A",T('REFRESH_INFORMARION'));
		FullRefresh.href="javascript:void(0);";
		FullRefresh.addEventListener("click", function(){
										//自動點擊
										var j = 1;
										var aldeas = ba.getElementsByTagName("A");
										for (var i = 0; i < aldeas.length; i++){
											if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
												var did = RegExp.$1;
												setTimeout(crearEventoActualizarAldea(did,1), 1000 * 1);

												j++;
											}
										}

										var currentActiveVillage = getActiveVillage();
										setTimeout(switchActiveVillage(currentActiveVillage,'',1), (1000 * j));
									}, 0);
		tr.appendChild(FullRefresh);

		var td2 = elem("TD",  T('RESUMEN'));
		td2.setAttribute("colspan", "2");
		tr.appendChild(td2);
		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++){
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
				var did = RegExp.$1;
				var tr = elem("TR");

				var td = elem("TD");
				//TeYoU: 概況黃色按鈕
				var enlace = elem("A", "<img src='" +/*灰色按鈕 */ img('a/b5.gif') + "' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("click", crearEventoActualizarAldea(did), 0);
				var nobr = elem("NOBR");
				nobr.appendChild(enlace);
//				nobr.appendChild(elem("SPAN", ' <a href="dorf1.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
				nobr.appendChild(elem("SPAN", ' <a href="javascript:void(0);" onclick="crearEventoActualizarAldea(' + did + ');">' + aldeas[i].innerHTML + '</a>'));

				td.appendChild(nobr);
				td.setAttribute("rowspan", "2");
				td.setAttribute("align", "left");
				tr.appendChild(td);

				/* TeYoU: 產生資源概況 */
				for (var j = 0; j < 4; j++){
					if (j != 2 && j != 0) tr = elem("TR");
					td = elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "center");
					if (j != 1 && j != 2) td.setAttribute("width", "100%");
					if (j == 0) td.setAttribute("colspan", "2");
					else if(j == 3){
						td.setAttribute("colspan", "3");
						td.setAttribute("style", "border-bottom-style: solid; border-bottom-width: thin");
					}
					tr.appendChild(td);
					if (j != 1) tabla.appendChild(tr);
				}
			}
		}
//		if (a.firstChild) insertAfter(a.firstChild, tabla);
//		else a.appendChild(tabla);

		a.appendChild(elem('p', ''));
		a.appendChild(tabla);
	}

/** Tableau dépot */
/**---------------------------------------------------------------------------------------------------------------------------------------*/

	function crearEventoActualizarAldea1(did){
		return function(){
			find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b3.gif');
			ajaxRequest("dorf1.php?newdid=" + did, "GET", null, procesarArmazem,
				function(){ find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b4.gif'); }
			);
		};
	}

	function procesarArmazem(t){
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// ID de aldea
		ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
		var did = RegExp.$1;

		// Materias primas
		var a = ''; var c = 0;	var Tiempos = new Array(4);
		for (var i = 4; i > 0; i--){
			var b = ansdoc.getElementById("l" + i);
			var d = ansdoc.getElementById("l" + i).title;
			var perc = Math.round((b.innerHTML.split("/")[0] * 100) / b.innerHTML.split("/")[1]);
			var perc1 = (b.innerHTML.split("/")[0]);
			var perc2 = (b.innerHTML.split("/")[1]);
			var neg = ''; var color= ''; var color1= '';
			if (perc > 60) {color = '<font color=orange>'; color1= '</font>';}
			if (perc > 90) {color = '<font color=red>'; color1= '</font>';}
			if (perc < 20) {color = '<font color=green>'; color1= '</font>';}
			if (d < 1) {neg = '<font color=red>'; color1= '</font>';}
			a = '<nobr><span title="' + b.innerHTML.split("/")[0] + '/' + b.innerHTML.split("/")[1] + ' + ' + d + '"> <b>' + color + perc + '</b>%' + color1 + ' </span></nobr>';
			if (d < 0) var tiempo = Math.round((perc1 / -d)*3600);
			// Si la produccion es 0, el tiempo es infinito
			else if (d == 0) var tiempo = -1;
			// Si la produccion es negativa, se calcula el tiempo hasta el vaciado
			else var tiempo = Math.round(((perc2 - perc1) / d)*3600);

			Tiempos[i]= tiempo;
			if (i > 1) {
				find("//td[@id='aldea" + did + "_"+ c + "']", XPFirst).innerHTML = 	a;
			}
			c++;
			if (i == 2) {
				var min = Tiempos[4];
				for(j = 4; j > 1; j--){if(Tiempos[j] < min){
					min = Tiempos[j];}
				}
				clock= "<span id='timeouta'>" + formatear_tiempo(min) + "</span>";

				var tiempoRestante =  "" + calculateHighlight (1, min, clock);
				find("//td[@id='aldea" + did + "_"+ 3 + "']", XPFirst).innerHTML = tiempoRestante;
			}

			if (i == 1) {
				find("//td[@id='aldea" + did + "_"+ 4 + "']", XPFirst).innerHTML = 	a;
				var tiempoRestante = neg + "<span id='timeouta'>" + formatear_tiempo(tiempo) + "</span>" + color1 ;
				find("//td[@id='aldea" + did + "_"+ 5 + "']", XPFirst).innerHTML = tiempoRestante;
			}

	//	find("//td[@id='aldea" + did + "_"+ c + "']", XPFirst).innerHTML = tiempoRestante;
		}
		// Construcciones
		var casilla = find("//td[@id='aldea" + did + "_6" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='lbau1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a){
			var b = new Array();
			for (var i = 0; i < a.firstChild.childNodes.length; i++){
				b[i] = '<nobr><img src="' + img('a/bau.gif') + '" title="' + a.firstChild.childNodes[i].childNodes[1].innerHTML + " " + a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0] + '"></nobr>';
			}
			casilla.innerHTML = b.join(" ");
		} else casilla.innerHTML = '-';

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + did + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';

//		switchActiveVillage_list(did);

	//  setTimeout(crearEventoActualizarAldea3(did), 1000 * 10);
		// FIXME: Firefox rendering bug
		casilla.parentNode.setAttribute("style", "width:100%");
	}

	function resumenAldeas2(){
//		if (plus) return;
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba) return;

		var aldeas = ba.getElementsByTagName("A");
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = elem("TABLE");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("align", "center");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");

		var tr = elem("TR");

		/**
		 * TeYoU
		 * Vue d'ensemble pages message Refresh
		 */
		var FullRefresh = elem("A",T('REFRESH_INFORMARION'));
		FullRefresh.href="javascript:void(0);";
		FullRefresh.addEventListener("click", function(){
										//Cliquez automatique
										var aldeas = ba.getElementsByTagName("A");
										for (var i = 0; i < aldeas.length; i++){
											if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
												var did = RegExp.$1;
												setTimeout(crearEventoActualizarAldea1(did), 1000 * 1);
											}
										}
									}, 0);


//		var td2 = elem("TD", "<img src='img/un/r/1.gif'>" + '</td><td>' + "<img src='img/un/r/2.gif'>" + '</td><td>' + "<img src='img/un/r/3.gif'>" + '</td><td>' + "<img src='img/un/a/clock.gif'>" + '</td><td>' + "<img src='img/un/r/4.gif'>" + '</td><td>' + "<img src='img/un/a/clock.gif'>" + '</td>');
////		td2.setAttribute("colspan", "7");
//		tr.appendChild(td2);

		var td2 = elem("TD", '');
		td2.appendChild(FullRefresh);
		tr.appendChild(td2);

		tr.appendChild(elem("TD", '<img src="' + img('r/1.gif') + '">'));
		tr.appendChild(elem("TD", '<img src="' + img('r/2.gif') + '">'));
		tr.appendChild(elem("TD", '<img src="' + img('r/3.gif') + '">'));
		tr.appendChild(elem("TD", '<img src="' + img('a/clock.gif') + '">'));
		tr.appendChild(elem("TD", '<img src="' + img('r/4.gif') + '">'));
		tr.appendChild(elem("TD", '<img src="' + img('a/clock.gif') + '">'));
		tr.appendChild(elem("TD", ''));

		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++){
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
				var did = RegExp.$1;
				var tr = elem("TR");

				var td = elem("TD");
				//TeYoU: Vue d'ensemble bouton jaune
				var enlace = elem("A", "<img src='" +/*Bouton gris */ img('a/b5.gif') + "' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("click", crearEventoActualizarAldea1(did), 0);
				var nobr = elem("NOBR");
				nobr.appendChild(enlace);
				nobr.appendChild(elem("SPAN", ' <a  href="dorf1.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
				td.appendChild(nobr);
				td.setAttribute("rowspan", "1");
				td.setAttribute("align", "left");
				tr.appendChild(td);

 /* test*/
				for (var j = 0; j < 7; j++){
					td = elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "Center");
					tr.appendChild(td);
					if (j != 4) tabla.appendChild(tr);
				}
		}
		}
//	posvilleinfo = readCookie("posvilleinfo" + server);
//	if(posvilleinfo==true || posvilleinfo == null) {
//		if (a.firstChild) insertAfter(a.firstChild, tabla);
//		else a.appendChild(tabla);
//		}
//	posvilleinfo = readCookie("posvilleinfo" + server);
//	if(posvilleinfo==false || posvilleinfo == null) {
//		a.appendChild(elem('p', ''));
//		a.appendChild(tabla);
//		}

		a.appendChild(elem('p', ''));
		a.appendChild(tabla);
	}

/** Tableau mini */
/**---------------------------------------------------------------------------------------------------------------------------------------*/

	function crearEventoActualizarAldea2(did){
		return function(){
			find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b3.gif');
			ajaxRequest("dorf1.php?newdid=" + did, "GET", null, procesarAldeaMini,
				function(){ find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b4.gif'); }
			);
		};
	}

		function procesarAldeaMini(t){
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// ID de aldea
		ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
		var did = RegExp.$1;

		var times = new Array();

		// Ataques
		var casilla = find("//td[@id='aldea" + did + "_0" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='ltbw1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (!a) var a = ansdoc.evaluate("//div[@id='ltbw0']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a){
			var a = a.firstChild;
			var b = new Array();
			for (var i = 0; i < a.childNodes.length; i++){
				var tr = a.childNodes[i];
				// FIXME: Apanyo para FF. Firefox mete nodos vacios
				var error = (tr.childNodes.length == 5 ? false : true);
				times.push(tr.childNodes[error ? 9 : 4].textContent.split(" ")[0]);
				b[i] = '<nobr><a href="build.php?newdid=' + did + '&gid=16" title="' + tr.childNodes[error ? 3 : 1].textContent.split(" ")[1] + '">' + tr.childNodes[error ? 1 : 0].firstChild.innerHTML + "</a> <span id='timeouta'>" + tr.childNodes[error ? 9 : 4].textContent.split(" ")[0] + '</span></nobr>';
			}
			casilla.innerHTML = b.join(" | ");
		}else casilla.innerHTML = '-';

		// Construcciones
		var casilla = find("//td[@id='aldea" + did + "_1" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='lbau1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a){
			var b = new Array();
			for (var i = 0; i < a.firstChild.childNodes.length; i++){
				times.push(a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0]);
				b[i] = '<nobr><img src="' + img('a/bau.gif') + '" title="' + a.firstChild.childNodes[i].childNodes[1].innerHTML + '"/> <span id="timeouta">' + a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0] + "</span></nobr>";
			}
			casilla.innerHTML = b.join(" ");
		}else casilla.innerHTML = '-';

		// Tropas
		var casilla = find("//td[@id='aldea" + did + "_2" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='ltrm']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue.firstChild;
		if (a.firstChild.childNodes.length == 3){
			var b = new Array();
			for (var i = 0; i < a.childNodes.length; i++){
				var tr = a.childNodes[i];
				tr.childNodes[0].firstChild.firstChild.setAttribute("title", tr.childNodes[2].innerHTML +" "+tr.childNodes[1].innerHTML.split(">")[1].split("<")[0]);
				b[i] = '<nobr>' + tr.childNodes[0].firstChild.innerHTML + '</nobr>';
			}
			casilla.innerHTML = b.join("");
		}else casilla.innerHTML = '-';


		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + did + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';

		// FIXME: Firefox rendering bug
		casilla.parentNode.setAttribute("style", "width:100%");
	}

	function resumenAldeas3(){
//		if (plus) return;
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba) return;

		var aldeas = ba.getElementsByTagName("A");
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = elem("TABLE");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("align", "center");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");

		var tr = elem("TR");

		/**
		 * TeYoU
		 * Vue d'ensemble pages message Refresh
		 */
		var FullRefresh = elem("A",T('REFRESH_INFORMARION'));
		FullRefresh.href="javascript:void(0);";
		FullRefresh.addEventListener("click", function(){
										//Cliquez automatique
										var aldeas = ba.getElementsByTagName("A");
										for (var i = 0; i < aldeas.length; i++){
											if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
												var did = RegExp.$1;
												setTimeout(crearEventoActualizarAldea2(did), 1000 * 1);
											}
										}
									}, 0);
		tr.appendChild(FullRefresh);

		var td2 = elem("TD", T('ATT') + ' | ' + T('CONS') + ' | ' + T('TROP'));
		td2.setAttribute("colspan", "7");
		tr.appendChild(td2);
		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++){
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
				var did = RegExp.$1;
				var tr = elem("TR");

				var td = elem("TD");
				//TeYoU: Vue d'ensemble bouton jaune
				var enlace = elem("A", "<img src='" +/*Bouton gris */ img('a/b5.gif') + "' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("click", crearEventoActualizarAldea2(did), 0);
				var nobr = elem("NOBR");
				nobr.appendChild(enlace);
				nobr.appendChild(elem("SPAN", ' <a  href="dorf1.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
				td.appendChild(nobr);
				td.setAttribute("rowspan", "1");
				td.setAttribute("align", "left");
				tr.appendChild(td);

 /* test*/
				for (var j = 0; j < 3; j++){
					td = elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "Center");
					tr.appendChild(td);
					if (j != 3) tabla.appendChild(tr);
				}
		}
		}
//	posvilleinfo = readCookie("posvilleinfo" + server);
//	if(posvilleinfo==true || posvilleinfo == null) {
//		if (a.firstChild) insertAfter(a.firstChild, tabla);
//		else a.appendChild(tabla);
//		}
//	posvilleinfo = readCookie("posvilleinfo" + server);
//	if(posvilleinfo==false || posvilleinfo == null) {
//		a.appendChild(elem('p', ''));
//		a.appendChild(tabla);
//		}

		a.appendChild(elem('p', ''));
		a.appendChild(tabla);

	}

/** Tableau troupes */
/**---------------------------------------------------------------------------------------------------------------------------------------*/

	function crearEventoActualizarAldea3(did){
		return function(){
			find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b3.gif');
			ajaxRequest("dorf1.php?newdid=" + did, "GET", null, procesarTropas,
				function(){ find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b4.gif'); }
			);
		};
	}

	function procesarTropas(t){

		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);
		var a = ''
		// ID de aldea
		ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
		var did = RegExp.$1;
		var times = new Array();

		find("//td[@id='aldea" + did + "_0" + "']", XPFirst).innerHTML = a;
		// Tropas complet
		var casilla = find("//td[@id='aldea" + did + "_0" + "']", XPFirst); //class="b f16"
		var a = ansdoc.evaluate("//div[@id='ltrm']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue.firstChild;
		if (a.firstChild.childNodes.length == 3){
			var b = new Array();
			for (var i = 0; i < a.childNodes.length; i++){
				var tr = a.childNodes[i];
				tr.childNodes[0].firstChild.firstChild.setAttribute("title", tr.childNodes[2].innerHTML);
				b[i] = '<nobr>' + tr.childNodes[0].firstChild.innerHTML + '<span>' + tr.childNodes[1].innerHTML + '</nobr>';
			}
			casilla.innerHTML = b.join(" | ");
		}else casilla.innerHTML = '-';

		find("//td[@id='aldea" + did + "_1"+ "']", XPFirst).innerHTML = '<a href="build.php?gid=16&newdid=' + did + '"><img src="img/un/a/b4.gif" width="5" ></a>';

		// céréale
 {		var a = '';
		for (var i = 4; i < 5; i++){
			var b = ansdoc.getElementById("l" + (5-i));
			var perc = Math.round((b.title.split("/")[0] * 100) / b.title.split("/")[1]);
			var cant = b.innerHTML.split("/")[0];
			var color= '';
			if (b.title < 0) {color = '<font color=red>';}
			if (b.title > 0) {color = '<font color=gray>';}
			var c = '';
			c += color + b.title ;
			a += '<nobr>' + c + '</nobr>';
		}
		find("//td[@id='aldea" + did + "_2" + "']", XPFirst).innerHTML = a;
	}

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + did + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';

		// Auto Refresh
		if (times.length > 0){
					var time = Number.POSITIVE_INFINITY;
					for (var i = 0; i < times.length; i++) {
							times[i] = calcular_segundos(times[i]);
							if (times[i] < time) time = times[i];
					}
					//TeYoU: ??????
					//setTimeout(crearEventoActualizarAldea(did), 1000 * time);
		}

		// FIXME: Firefox rendering bug
		casilla.parentNode.setAttribute("style", "width:100%");
	}


	function resumenAldeas4(){
//		if (plus) return;
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba) return;

		var aldeas = ba.getElementsByTagName("A");
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = elem("TABLE");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("align", "center");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");

		var tr = elem("TR");

		/**
		 * TeYoU
		 * Vue d'ensemble pages message Refresh
		 */
		var FullRefresh = elem("A",T('REFRESH_INFORMARION'));
		FullRefresh.href="javascript:void(0);";
		FullRefresh.addEventListener("click", function(){
										//Cliquez automatique
										var aldeas = ba.getElementsByTagName("A");
										for (var i = 0; i < aldeas.length; i++){
											if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
												var did = RegExp.$1;
												setTimeout(crearEventoActualizarAldea3(did), 1000 * 1);
											}
										}
									}, 0);
		tr.appendChild(FullRefresh);

		var td2 = elem("TD",  T('TROP') + ' ' + T('IN') + ' ' + T('ALDEA'));
		td2.setAttribute("colspan", "7");
		tr.appendChild(td2);
		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++){
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
				var did = RegExp.$1;
				var tr = elem("TR");

				var td = elem("TD");
				//TeYoU: Vue d'ensemble bouton jaune
				var enlace = elem("A", "<img src='" +/*Bouton gris */ img('a/b5.gif') + "' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("click", crearEventoActualizarAldea3(did), 0);
				var nobr = elem("NOBR");
				nobr.appendChild(enlace);
				nobr.appendChild(elem("SPAN", ' <a  href="dorf1.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
				td.appendChild(nobr);
				td.setAttribute("rowspan", "1");
				td.setAttribute("align", "left");
				tr.appendChild(td);

 /* test*/
				for (var j = 0; j < 3; j++){
					td = elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "Center");
					tr.appendChild(td);
					if (j != 3) tabla.appendChild(tr);
				}
		}
		}
//	posvilleinfo = readCookie("posvilleinfo" + server);
//	if(posvilleinfo==true || posvilleinfo == null) {
//		if (a.firstChild) insertAfter(a.firstChild, tabla);
//		else a.appendChild(tabla);
//		}
//	posvilleinfo = readCookie("posvilleinfo" + server);
//	if(posvilleinfo==false || posvilleinfo == null) {
//		a.appendChild(elem('p', ''));
//		a.appendChild(tabla);
//		}

		a.appendChild(elem('p', ''));
		a.appendChild(tabla);

	}

/** Tableau ressource */
/**---------------------------------------------------------------------------------------------------------------------------------------*/


	function crearEventoActualizarAldea5(did){
		return function(){
			find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b3.gif');
			ajaxRequest("dorf1.php?newdid=" + did, "GET", null, procesarArmazembis,
				function(){ find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b4.gif'); }
			);
		};
	}

	function procesarArmazembis(t){
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// ID de aldea
		ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
		var did = RegExp.$1;

		// Materias primas
		var a = ''; var c = 0;	var Tiempos = new Array(4);
		for (var i = 4; i > 0; i--){
			var b = ansdoc.getElementById("l" + i);
			var d = ansdoc.getElementById("l" + i).title;
			var cant = b.innerHTML.split("/")[0];
			if (cant % 1000 == 0) txt_cant = (cant / 1000) + "k"; else txt_cant = cant;
			var perc = Math.round((b.innerHTML.split("/")[0] * 100) / b.innerHTML.split("/")[1]);
			var perc1 = (b.innerHTML.split("/")[0]);
			var perc2 = (b.innerHTML.split("/")[1]);

			var neg = ''; var color= ''; var color1= '';

//			if (perc > 60) {color = '<font color=orange>'; color1= '</font>';}
//			if (perc > 90) {color = '<font color=red>'; color1= '</font>';}
//			if (perc < 20) {color = '<font color=green>'; color1= '</font>';}
//			if (d < 1) {neg = '<font color=red>'; color1= '</font>';}

			if (d < 0) var tiempo = Math.round((perc1 / -d)*3600);
			// Si la produccion es 0, el tiempo es infinito
			else if (d == 0) var tiempo = -1;
			// Si la produccion es negativa, se calcula el tiempo hasta el vaciado
			else var tiempo = Math.round(((perc2 - perc1) / d)*3600);

			a = '<nobr><span title="' + b.innerHTML.split("/")[0] + '/' + b.innerHTML.split("/")[1] + ' + ' + d + '"> <b>' + calculateHighlight(d, tiempo, cant) + '</b>' + color1 + ' </span></nobr>';

			Tiempos[i]= tiempo;

			if (i > 1) {find("//td[@id='aldea" + did + "_"+ c + "']", XPFirst).innerHTML = 	a;}c++;

			if (i == 2) {
				var min = Tiempos[4];
				for(j = 4; j > 1; j--){
					if(Tiempos[j] < min){
						min = Tiempos[j];
					}
				}
				clock= "<span id='timeouta'>" + formatear_tiempo(min) + "</span>";

				var tiempoRestante =  "" + calculateHighlight (1, min, clock);
				find("//td[@id='aldea" + did + "_"+ 3 + "']", XPFirst).innerHTML = tiempoRestante;
			}

			if (i == 1) {
				find("//td[@id='aldea" + did + "_"+ 4 + "']", XPFirst).innerHTML = 	a;
				var tiempoRestante = calculateHighlight(d, tiempo, "<span id='timeouta'>" + formatear_tiempo(tiempo) + "</span>") ;
				find("//td[@id='aldea" + did + "_"+ 5 + "']", XPFirst).innerHTML = tiempoRestante;
			}

	//	find("//td[@id='aldea" + did + "_"+ c + "']", XPFirst).innerHTML = tiempoRestante;
		}
		// Construcciones
		var casilla = find("//td[@id='aldea" + did + "_6" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='lbau1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a){
			var b = new Array();
			for (var i = 0; i < a.firstChild.childNodes.length; i++){
			b[i] = '<nobr><img src="' + img('a/bau.gif') + '" title="' + a.firstChild.childNodes[i].childNodes[1].innerHTML + " " + a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0] + '"></nobr>'; }
			casilla.innerHTML = b.join(" ");
		}else casilla.innerHTML = '-';

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + did + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';

	//  setTimeout(crearEventoActualizarAldea3(did), 1000 * 10);
		// FIXME: Firefox rendering bug
		casilla.parentNode.setAttribute("style", "width:100%");
	}

	function resumenAldeas6(){
//		if (plus) return;
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba) return;

		var aldeas = ba.getElementsByTagName("A");
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = elem("TABLE");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("align", "center");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");

		var tr = elem("TR");

		/**
		 * TeYoU
		 * Vue d'ensemble pages message Refresh
		 */
		var FullRefresh = elem("A",T('REFRESH_INFORMARION'));
		FullRefresh.href="javascript:void(0);";
		FullRefresh.addEventListener("click", function(){
										//Cliquez automatique
										var aldeas = ba.getElementsByTagName("A");
										for (var i = 0; i < aldeas.length; i++){
											if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
												var did = RegExp.$1;
												setTimeout(crearEventoActualizarAldea5(did), 1000 * 1);
											}
										}
									}, 0);
		var td2 = elem("TD", '');
		td2.appendChild(FullRefresh);
		tr.appendChild(td2);

//		var td2 = elem("TD", "<img src='img/un/r/1.gif'>" + '</td><td>' + "<img src='img/un/r/2.gif'>" + '</td><td>' + "<img src='img/un/r/3.gif'>" + '</td><td>' + "<img src='img/un/a/clock.gif'>" + '</td><td>' + "<img src='img/un/r/4.gif'>" + '</td><td>' + "<img src='img/un/a/clock.gif'>" + '</td>');
////		td2.setAttribute("colspan", "7");
//		tr.appendChild(td2);

		tr.appendChild(elem("TD", '<img src="img/un/r/1.gif">'));
		tr.appendChild(elem("TD", '<img src="' + img('r/2.gif') + '">'));
		tr.appendChild(elem("TD", '<img src="' + img('r/3.gif') + '">'));
		tr.appendChild(elem("TD", '<img src="' + img('a/clock.gif') + '">'));
		tr.appendChild(elem("TD", '<img src="' + img('r/4.gif') + '">'));
		tr.appendChild(elem("TD", '<img src="' + img('a/clock.gif') + '">'));
		tr.appendChild(elem("TD", ''));

		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++){
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
				var did = RegExp.$1;
				var tr = elem("TR");

				var td = elem("TD");
				//TeYoU: Vue d'ensemble bouton jaune
				var enlace = elem("A", "<img src='" +/*Bouton gris */ img('a/b5.gif') + "' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("click", crearEventoActualizarAldea5(did), 0);
				var nobr = elem("NOBR");
				nobr.appendChild(enlace);
				nobr.appendChild(elem("SPAN", ' <a  href="dorf1.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
				td.appendChild(nobr);
				td.setAttribute("rowspan", "1");
				td.setAttribute("align", "left");
				tr.appendChild(td);

 /* test*/
				for (var j = 0; j < 7; j++){
					td = elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "Center");
					tr.appendChild(td);
					if (j != 4) tabla.appendChild(tr);
				}
		}
		}
//	posvilleinfo = readCookie("posvilleinfo" + server);
//	if(posvilleinfo==true || posvilleinfo == null) {
//		if (a.firstChild) insertAfter(a.firstChild, tabla);
//		else a.appendChild(tabla);
//		}
//	posvilleinfo = readCookie("posvilleinfo" + server);
//	if(posvilleinfo==false || posvilleinfo == null) {
//		a.appendChild(elem('p', ''));
//		a.appendChild(tabla);
//		}

		a.appendChild(elem('p', ''));
		a.appendChild(tabla);

	}

/** Tableau PC  sauf palais*/
/**---------------------------------------------------------------------------------------------------------------------------------------*/


	function crearEventoActualizarAldea4(did){
		return function(){
			find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b3.gif');
			ajaxRequest("build.php?newdid=" + did + "&gid=25&s=4", "GET", null, procesarPC,
			function(){ find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b4.gif'); }
			);
		};
	}

	function procesarPC(t){
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// ID de aldea
		ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
		var did = RegExp.$1;

		// info PC
		var a = ansdoc.evaluate("//div[@id='lmid2']//b", ans, null, XPFirst, null).singleNodeValue;

		if (a == null) return;

	//	if (a.snapshotLength != 5) return;
		var lvl = a.innerHTML.split(T('LVL'))[1].split("</b>")[0];

		var b = ansdoc.evaluate("//table[@class='tbg']", ans, null, XPFirst, null).singleNodeValue;
		aldeis= b.innerHTML.split("(").length;
//		gg = b.getElementsByTagName("A").length;

//		if(gg>1) hehe = b.getElementsByTagName("A")[1].innerHTML; else hehe = "";
//		if(gg>3) hehe1 = b.getElementsByTagName("A")[3].innerHTML; else hehe1 = "";

		// Pontos Cultura
		find("//td[@id='aldea" + did + "_"+ 0 + "']", XPFirst).innerHTML = lvl;
		find("//td[@id='aldea" + did + "_"+ 1 + "']", XPFirst).innerHTML = (aldeis-1) + "/" + parseInt(lvl/10);
//		find("//td[@id='aldea" + did + "_"+ 3 + "']", XPFirst).innerHTML = hehe;
//		find("//td[@id='aldea" + did + "_"+ 4 + "']", XPFirst).innerHTML = hehe1;

//		find("//td[@id='aldea" + did + "_"+ 3 + "']", XPFirst).innerHTML = '';
//		find("//td[@id='aldea" + did + "_"+ 4 + "']", XPFirst).innerHTML = '';

		var b = xpath("//table[@class='tbg']//a", ans, ansdoc);
		if (b.snapshotLength) {

			get("aldea" + did + "_"+ 3).innerHTML = '';
			get("aldea" + did + "_"+ 3).appendChild(b.snapshotItem(1));

			if (b.snapshotLength >3) {
				get("aldea" + did + "_"+ 4).innerHTML = '';
				get("aldea" + did + "_"+ 4).appendChild(b.snapshotItem(3));
			}
		}

		find("//td[@id='aldea" + did + "_"+ 2 + "']", XPFirst).innerHTML = '<a href="build.php?gid=25&newdid=' + did + '"><img src="img/un/a/b4.gif" width="5" ></a>';

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + did + "') and ancestor::div[@id='ba']]", XPFirst).parentNode.firstChild.className = 'c2';

		// FIXME: Firefox rendering bug
//		casilla.parentNode.setAttribute("style", "width:100%");
		var casilla = find("//td[@id='aldea" + did + "_1" + "']", XPFirst);
		casilla.parentNode.setAttribute("style", "width:100%");
	}

	function resumenAldeas5(){
//		if (plus) return;
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba) return;

		var aldeas = ba.getElementsByTagName("A");
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = elem("TABLE");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("align", "center");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");

		var tr = elem("TR");

		/**
		 * TeYoU
		 * Vue d'ensemble pages message Refresh
		 */
		var FullRefresh = elem("A",T('REFRESH_INFORMARION'));
		FullRefresh.href="javascript:void(0);";
		FullRefresh.addEventListener("click", function(){
										//Cliquez automatique
										var aldeas = ba.getElementsByTagName("A");
										for (var i = 0; i < aldeas.length; i++){
											if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
												var did = RegExp.$1;
												setTimeout(crearEventoActualizarAldea4(did), 1000 * 1);
											}
										}
									}, 0);
//		tr.appendChild(FullRefresh);

		var td2 = elem("TD", '');
		td2.appendChild(FullRefresh);
		tr.appendChild(td2);

		tr.appendChild(elem("TD", T('LvL')));
		tr.appendChild(elem("TD", T('Slot')));
		tr.appendChild(elem("TD", ''));
		tr.appendChild(elem("TD", T('EXT') + '1'));
		tr.appendChild(elem("TD", T('EXT') + '2'));


//		var td2 = elem("TD", T('LvL') + ' | ' + T('Slot') + ' | ' + T('EXT') +'1' + ' | ' + T('EXT') +'2');
//		td2.setAttribute("colspan", "5");
//		tr.appendChild(td2);
		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++){
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
				var did = RegExp.$1;
				var tr = elem("TR");

				var td = elem("TD");
				//TeYoU: Vue d'ensemble bouton jaune
				var enlace = elem("A", "<img src='" + img('a/b5.gif') + "' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("click", crearEventoActualizarAldea4(did), 0);
				var nobr = elem("NOBR");
				nobr.appendChild(enlace);
				nobr.appendChild(elem("SPAN", ' <a href="dorf1.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
				td.appendChild(nobr);
				td.setAttribute("rowspan", "1");
				td.setAttribute("align", "left");
				tr.appendChild(td);

 /* test*/
				for (var j = 0; j < 5; j++){
					td = elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "Center");
					tr.appendChild(td);
					if (j != 5) tabla.appendChild(tr);
				}
		}
		}
//	posvilleinfo = readCookie("posvilleinfo" + server);
//	if(posvilleinfo==true || posvilleinfo == null) {
//		if (a.firstChild) insertAfter(a.firstChild, tabla);
//		else a.appendChild(tabla);
//		}
//	posvilleinfo = readCookie("posvilleinfo" + server);
//	if(posvilleinfo==false || posvilleinfo == null) {
//		a.appendChild(elem('p', ''));
//		a.appendChild(tabla);
//		}

		a.appendChild(elem('p', ''));
		a.appendChild(tabla);

	}

/** Tableau petie fete */
/**---------------------------------------------------------------------------------------------------------------------------------------*/


	function crearEventoActualizarAldea6(did){
		return function(){
			find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b3.gif');
			ajaxRequest("build.php?newdid=" + did + "&gid=24", "GET", null, procesarPF,
			function(){ find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b4.gif'); }
			);
		};
	}

	function procesarPF(t){
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// ID de aldea
		ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
		var did = RegExp.$1;

		// info lvl
//		var a = ansdoc.evaluate("//div[@id='lmid2']//b", ans, null, XPFirst, null).singleNodeValue;
//		var a = ansdoc.evaluate("//form[@action='build.php']//a", ans, null, XPFirst, null).singleNodeValue;

		var xp = xpath('//h1', ans, ansdoc);
		if (xp.snapshotLength == 0) return;
//		var lvl = xp.snapshotItem(0).innerHTML.split(T('LVL'))[1].split("</b>")[0];

		var lvl = xp.snapshotItem(0).innerHTML.split(T('LVL'));

		if (lvl.length <= 1) return;
		lvl = lvl[1].split("</b>")[0];

		if (!lvl) return;

	//	if (a.snapshotLength != 5) return;
//		var lvl = a.innerHTML.split(T('LVL'))[1].split("</b>")[0];
//		var b = ansdoc.evaluate("//table[@class='tbg']", ans, null, XPFirst, null).singleNodeValue;
//		aldeis= b.innerHTML.split("(").length;
//
//		gg = b.getElementsByTagName("A").length;
//		if(gg>1) fete1 = b.getElementsByTagName("A")[1].innerHTML; else fete1 = "";
//		if(gg>3) fete2 = b.getElementsByTagName("A")[3].innerHTML; else fete2 = "";

		var b = xpath("//form//table[@class='tbg']//table[@class='f10']//a", ans, ansdoc);
		var c = xpath("//form//table[@class='tbg']//td[@width='28%']", ans, ansdoc);

		// Fete
		find("//td[@id='aldea" + did + "_"+ 0 + "']", XPFirst).innerHTML = lvl;

		if (c.snapshotLength) {
			for(var i=0; i<c.snapshotLength; i++) {
				find("//td[@id='aldea" + did + "_"+ (i+1) + "']", XPFirst).innerHTML = '<a href="build.php?gid=24&newdid=' + did + '">' + getInnerText(c.snapshotItem(i)) + '</a>' ;
			}
//			find("//td[@id='aldea" + did + "_"+ 2 + "']", XPFirst).innerHTML = '<a href="build.php?gid=24&newdid=' + did + '">' + getInnerText(c.snapshotItem(2)) + '</a>' ;
		}

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
//		find("//span[@class='c2']", XPFirst).removeAttribute("class");
//		find("//a[contains(@href, '" + did + "') and ancestor::div[@id='ba']]", XPFirst).parentNode.firstChild.className = 'c2';

//		switchActiveVillage_list(did);

		// FIXME: Firefox rendering bug
		var casilla = find("//td[@id='aldea" + did + "_1" + "']", XPFirst);
		casilla.parentNode.setAttribute("style", "width:100%");
	}

	function resumenAldeas7(){
//		if (plus) return;
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba) return;

		var aldeas = ba.getElementsByTagName("A");
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = elem("TABLE");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("align", "center");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");

		var tr = elem("TR");

		/**
		 * TeYoU
		 * Vue d'ensemble pages message Refresh
		 */
		var FullRefresh = elem("A",T('REFRESH_INFORMARION'));
		FullRefresh.href="javascript:void(0);";
		FullRefresh.addEventListener("click", function(){
										//Cliquez automatique
										var aldeas = ba.getElementsByTagName("A");
										for (var i = 0; i < aldeas.length; i++){
											if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
												var did = RegExp.$1;
												setTimeout(crearEventoActualizarAldea6(did), 1000 * 1);
											}
										}
									}, 0);
//		tr.appendChild(FullRefresh);

		var td2 = elem("TD", '');
		td2.appendChild(FullRefresh);
		tr.appendChild(td2);

		tr.appendChild(elem("TD", T('LvL')));
		tr.appendChild(elem("TD", T('FT1')));
		tr.appendChild(elem("TD", T('FT2')));

//		var td2 = elem("TD", T('LvL') + ' | ' + T('FT1')+ ' | ' + T('FT2'));
//		td2.setAttribute("colspan", "4");
//		tr.appendChild(td2);
		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++){
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
				var did = RegExp.$1;
				var tr = elem("TR");

				var td = elem("TD");
				//TeYoU: Vue d'ensemble bouton jaune
				var enlace = elem("A", "<img src='" + img('a/b5.gif') + "' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("click", crearEventoActualizarAldea6(did), 0);
				var nobr = elem("NOBR");
				nobr.appendChild(enlace);
				nobr.appendChild(elem("SPAN", ' <a  href="dorf1.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
				td.appendChild(nobr);
				td.setAttribute("rowspan", "1");
				td.setAttribute("align", "left");
				tr.appendChild(td);

 /* test*/
				for (var j = 0; j < 3; j++){
					td = elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "Center");
					tr.appendChild(td);
					if (j != 3) tabla.appendChild(tr);
				}
		}
		}
//	posvilleinfo = readCookie("posvilleinfo" + server);
//	if(posvilleinfo==true || posvilleinfo == null) {
//		if (a.firstChild) insertAfter(a.firstChild, tabla);
//		else a.appendChild(tabla);
//		}
//	posvilleinfo = readCookie("posvilleinfo" + server);
//	if(posvilleinfo==false || posvilleinfo == null) {
//		a.appendChild(elem('p', ''));
//		a.appendChild(tabla);
//		}

		a.appendChild(elem('p', ''));
		a.appendChild(tabla);

	}

/** Tableau Manoir */
/**---------------------------------------------------------------------------------------------------------------------------------------*/


	function crearEventoActualizarAldea7(did){
		return function(){
			find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b3.gif');
			ajaxRequest("build.php?newdid=" + did + "&gid=37&land", "GET", null, procesarMA,
			function(){ find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b4.gif'); }
			);
		};
	}

	function procesarMA(t){
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// ID de aldea
		ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
		var did = RegExp.$1;

		// info
		var a = ansdoc.evaluate("//div[@id='lmid2']//b", ans, null, XPFirst, null).singleNodeValue;

	//	if (a.snapshotLength != 5) return;
		var lvl = a.innerHTML.split(T('LVL'))[1].split("</b>")[0];

		var b = ansdoc.evaluate("//table[@class='tbg']", ans, null, XPFirst, null).singleNodeValue;
		aldeis= b.innerHTML.split("(").length;
		gg = b.getElementsByTagName("A").length;

		if(gg>1) hehe = b.getElementsByTagName("A")[1].innerHTML; else hehe = "";
		if(gg>2) hehe1 = b.getElementsByTagName("A")[2].innerHTML; else hehe1 = "";
		if(gg>3) hehe2 = b.getElementsByTagName("A")[3].innerHTML; else hehe2 = "";

		// Pontos Cultura
		find("//td[@id='aldea" + did + "_"+ 0 + "']", XPFirst).innerHTML = lvl;
		find("//td[@id='aldea" + did + "_"+ 1 + "']", XPFirst).innerHTML = (aldeis-2) + "/" + parseInt(lvl/10);
		find("//td[@id='aldea" + did + "_"+ 2 + "']", XPFirst).innerHTML = '<a href="build.php?gid=37&newdid=' + did + '"><img src="img/un/a/b4.gif" width="5" ></a>';
		find("//td[@id='aldea" + did + "_"+ 3 + "']", XPFirst).innerHTML = hehe;
		find("//td[@id='aldea" + did + "_"+ 4 + "']", XPFirst).innerHTML = hehe1;
		find("//td[@id='aldea" + did + "_"+ 5 + "']", XPFirst).innerHTML = hehe2;

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + did + "') and ancestor::div[@id='ba']]", XPFirst).parentNode.firstChild.className = 'c2';

//		switchActiveVillage_list(did);

		// FIXME: Firefox rendering bug
		casilla.parentNode.setAttribute("style", "width:100%");
	}

	function resumenAldeas8(){
//		if (plus) return;
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba) return;

		var aldeas = ba.getElementsByTagName("A");
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = elem("TABLE");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("align", "center");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");

		var tr = elem("TR");

		/**
		 * TeYoU
		 * Vue d'ensemble pages message Refresh
		 */
		var FullRefresh = elem("A",T('REFRESH_INFORMARION'));
		FullRefresh.href="javascript:void(0);";
		FullRefresh.addEventListener("click", function(){
										//Cliquez automatique
										var aldeas = ba.getElementsByTagName("A");
										for (var i = 0; i < aldeas.length; i++){
											if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
												var did = RegExp.$1;
												setTimeout(crearEventoActualizarAldea7(did), 1000 * 1);
											}
										}
									}, 0);
		tr.appendChild(FullRefresh);

		var td2 = elem("TD", T('LvL') + ' | ' + T('Slot') + ' | ' + T('EXT') +'1' + ' | ' +'2'+ ' | ' +'3');
		td2.setAttribute("colspan", "6");
		tr.appendChild(td2);
		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++){
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
				var did = RegExp.$1;
				var tr = elem("TR");

				var td = elem("TD");
				//TeYoU: Vue d'ensemble bouton jaune
				var enlace = elem("A", "<img src='" + img('a/b5.gif') + "' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("click", crearEventoActualizarAldea7(did), 0);
				var nobr = elem("NOBR");
				nobr.appendChild(enlace);
				nobr.appendChild(elem("SPAN", ' <a  href="dorf1.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
				td.appendChild(nobr);
				td.setAttribute("rowspan", "1");
				td.setAttribute("align", "left");
				tr.appendChild(td);

 /* test*/
				for (var j = 0; j < 6; j++){
					td = elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "Center");
					tr.appendChild(td);
					if (j != 6) tabla.appendChild(tr);
				}
		}
		}
//	posvilleinfo = readCookie("posvilleinfo" + server);
//	if(posvilleinfo==true || posvilleinfo == null) {
//		if (a.firstChild) insertAfter(a.firstChild, tabla);
//		else a.appendChild(tabla);
//		}
//	posvilleinfo = readCookie("posvilleinfo" + server);
//	if(posvilleinfo==false || posvilleinfo == null) {
//		a.appendChild(elem('p', ''));
//		a.appendChild(tabla);
//		}

		a.appendChild(elem('p', ''));
		a.appendChild(tabla);

	}

/**
-----------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

	/**
	 * Modifica el estilo del mensaje de borrado de cuenta para adaptarlo a los cambios que realiza el script
	 */
	function borrarCuenta(){
		var a = find("//p[parent::div[@id='lleft'] and @style]", XPFirst);
		if (a){
			moveElement(a, document.body);
			a.setAttribute("style", "position:absolute; display: block; padding: 4px; z-index: 2; border: solid 1px #00C000; background-color: #FEFFE3; width:130px; text-align:center; right:0px; top:0px;");
		}
	}

	/**
	 * Agrega una nueva opcion en cualquier menu superior de opciones
	 *
	 * Params:
	 *	texto: texto para colocar al final de menu
	 */
	function opcionMenuSuperior(texto){
		var a = find("//p[@class='txt_menue']", XPFirst);
		if (a) {
			a.innerHTML += texto;
		}
	}

	function opcionOcultaMensajes(){ if (!plus) opcionMenuSuperior(' | <a href="nachrichten.php?t=3">' + T('ARCHIVE') + '</a>'); }
	function opcionOcultaInformes(){ if (!plus) opcionMenuSuperior(' | <a href="berichte.php?t=5">' + T('ARCHIVE') + '</a>'); }

	var window_reloaded = false;

	function window_reload (url) {
		if (window_reloaded) return false;
		window_reloaded = true;

		if (url) {
			location.href = url;
		} else {
			document.location.reload();
		}
	}

	function crearTemporizadorRecurso(i,f){
		return function(){
			/*
			 * Actualiza las cantidades restantes por cada tipo de recurso si corresponde hacerlo en este
			 * ciclo de reloj segun la adaptacion de frecuencias anterior
			 */

			f = f < 0 ? -1 : 1;

			var recursos = find("//*[@id='timeout" + i + "']", XPList);
			for (var j = 0; j < recursos.snapshotLength; j++){
//				recursos.snapshotItem(j).title = f;

				var cantidad = recursos.snapshotItem(j).innerHTML - f;
				if (cantidad >= 0) {
					recursos.snapshotItem(j).innerHTML = cantidad;
				} else if (recursos.snapshotItem(j).getAttribute('noreload') != 1) {
					recursos.snapshotItem(j).setAttribute('noreload') = 1;
					window_reload();
				} else {
					recursos.snapshotItem(j).setAttribute('noreload') = 1;
					recursos.snapshotItem(j).setAttribute('id') = '';
					recursos.snapshotItem(j).id = '';

					var tbodyNode = recursos.snapshotItem(j).parentNode.parentNode;
					if (tbodyNode.childNodes.length <= 2) {
						var resourceCellNode = tbodyNode.parentNode.parentNode;
						removeElement(tbodyNode.parentNode);
						resourceCellNode.setAttribute('valign', 'center');
						resourceCellNode.innerHTML = T('SUBIR_NIVEL');
					} else {
//						removeElement(recursos.snapshotItem(j).parentNode);

						if (recursos.snapshotItem(j).parentNode && recursos.snapshotItem(j).parentNode.getAttribute('removeable')) {
							removeElement(recursos.snapshotItem(j).parentNode);
						}
					}
				}
			}
		};
	}

	/**
	 * Crea el temporizador encargado de actualizar los nuevos relojes y las cantidades de recursos que faltan
	 */
	function setTimers(){
		// Calcula cada cuantos segundos debe actualizar cada contador de recursos restantes para
		// aprovechar el temporizador del resto de relojes
		var frecuencia = new Array(4);
		for (var i = 0; i < 4; i++){
			frecuencia[i] = (1 / Math.abs(produccion[i])) * 1000;
//			if (!isFinite(frecuencia[i]) || frecuencia[i] < 0) frecuencia[i] = Number.POSITIVE_INFINITY;
//			if (total[i] - actual[i] == 0) frecuencia[i] = Number.POSITIVE_INFINITY;

//			var ti = Math.floor(frecuencia[i]);
			var ti =  Math.floor(frecuencia[i]);
//			if (ti < 500) ti = 500;

			setInterval(crearTemporizadorRecurso(i,produccion[i]), ti);

//			alert(i + ':' + ti+':'+frecuencia[i]+':'+produccion[i]*60*60);
		}

		setInterval(function () {

			/*
			 * Se distinguen dos tipos de temporizadores, timeout y timeouta. Solo los primeros
			 * provocan que la pagina se actualice al llegar a 0.
			 */
			var relojes = find("//*[@id='timeout' or @id='timeouta']", XPList);
			for (var i = 0; i < relojes.snapshotLength; i++){
				var tiempo = calcular_segundos(relojes.snapshotItem(i).innerHTML) - 1;

				relojes.snapshotItem(i).innerHTML = formatear_tiempo(tiempo);

				if (tiempo > 0) {
//					relojes.snapshotItem(i).innerHTML = formatear_tiempo(tiempo);
				} else if (relojes.snapshotItem(i).id == 'timeout' && relojes.snapshotItem(i).getAttribute('noreload') != 1) {
					relojes.snapshotItem(i).setAttribute('noreload', 1);
					window_reload();
				} else {
					relojes.snapshotItem(i).setAttribute('noreload', 1);
					relojes.snapshotItem(i).id = '';

					if (relojes.snapshotItem(i).parentNode && relojes.snapshotItem(i).parentNode.getAttribute('removeable')) {
						removeElement(relojes.snapshotItem(i).parentNode);
					}
				}
			}

			var relojes = find("//*[@id='rtimeout']", XPList);
			for (var i = 0; i < relojes.snapshotLength; i++){
				var tiempo = calcular_segundos(relojes.snapshotItem(i).innerHTML) + 1;
				relojes.snapshotItem(i).innerHTML = formatear_tiempo(tiempo);
			}
		},1000);

//		setInterval(function () {
//			var relojes = find("//*[@id='rtimeout']", XPList);
//			for (var i = 0; i < relojes.snapshotLength; i++){
//				var tiempo = calcular_segundos(relojes.snapshotItem(i).innerHTML) + 1;
//				relojes.snapshotItem(i).innerHTML = formatear_tiempo(tiempo);
//			}
//		},1000);

	}


	//Create by Arrack 儲存地點
	function MapaQuickSave(){
		// Intenta insertarlos en la lista derecha, si no existe la crea
			var ba = find("//div[@class='map_details_actions']", XPFirst);

			if (!ba) return;

			/*
			ba.innerHTML.search(/\?z=(\d+)/);
			var linkid = RegExp.$1;
			*/
			var div = elem("DIV");
			var enlace = elem("A", T('SAVEMAPURL2'));
			var tabla = elem("TABLE");
			tabla.setAttribute("class", "f10");
			var tr = elem("TR");
			var td = elem("TD");
			enlace.href = "javascript:void(0);";
			// Al anyadir se pide el texto y el enlace, si se cancela o se deja vacio alguno se aborta
			// Despues de insertar se refresca la lista volviendola a insertar
			enlace.addEventListener("click", function(){
									var a = window.location;
									var b = prompt(T('SAVEMAPURL1'));
									if (b == null || b == '' || b == 'undefined') return;
									agregarElementoCookie("marcadores", [b, a]);
									removeElement(find("//div[@id='marcadores']", XPFirst));
									mostrarMarcadores();
							}, 0);
			td.appendChild(enlace);
			tr.appendChild(td);
			tabla.appendChild(tr);
			div.appendChild(tabla);
			ba.appendChild(div);
	}

	function getActiveVillageCoordZ() {
		var activeVillageLink = xpathEvaluate('//a[@class="active_vl"]/../../td/table/tbody/tr/td');
		var coordXCurrentActiveVillage = -10000;
		var coordYCurrentActiveVillage = -10000;
		if (activeVillageLink.snapshotLength > 0) {
			coordXCurrentActiveVillage = parseInt(activeVillageLink.snapshotItem(0).innerHTML.replace("(", ""));
			coordYCurrentActiveVillage = parseInt(activeVillageLink.snapshotItem(2).innerHTML.replace(")", ""));

			return xy2id(coordXCurrentActiveVillage, coordYCurrentActiveVillage);
		} else {
			return 0;
		}
	}

	function createElemRadio (name, value, checked, enabled) {
		var myRadioInput = elem('input');

		myRadioInput.type = 'radio';
		myRadioInput.name = name;
		myRadioInput.value = value;

		if (checked) {
			myRadioInput.setAttribute('checked', 'checked');
		} else {
			myRadioInput.removeAttribute('checked');
		}

		return myRadioInput;
	}

	function createElemCheckbox (name, value, checked, enabled) {
		var myRadioInput = elem('input');

		myRadioInput.type = 'checkbox';
		myRadioInput.name = name;
		myRadioInput.value = value;

		if (checked) {
			myRadioInput.setAttribute('checked', 'checked');
		} else {
//			myRadioInput.setAttribute('checked', '');
//			myRadioInput.removeAttribute('checked');
		}

		return myRadioInput;
	}

	function createElementAppend(newElementTag, parentElement, content, idt, idv, class) {
//		var newElement = document.createElement(newElementTag);
		var newElement = elem(newElementTag, content, idt, idv, class);

		parentElement.appendChild(newElement);
		return newElement;
	}

	function createElemAppendAndSetInner(newElementTag, parentElement, innerHTM, idt, idv, class) {
		var newElement = createElementAppend(newElementTag, parentElement);
		newElement.innerHTML = innerHTM;
		return newElement;
	}

	/** createElemTravianTable */
	function createElemTravianTable(tableTitle, tableParent, isTitleSingleCell) {
		var table = createElementAppend('table', tableParent);
		table.className = "tbg";
		table.cellSpacing = "1";
		table.cellPadding = "2";

		var tbody = createElementAppend('tbody', table);

		var tr = createElementAppend('tr', tbody);
		tr.className = "rbg";

		var td = createElemAppendAndSetInner('td', tr, tableTitle);

		if (isTitleSingleCell) {
			td.colSpan = "0";
		}

		return tbody;
	}

	/** createElemTravianButton */
	function createElemTravianButton(buttonText, buttonParent, buttonId) {//, buttonEventListenerFunction) {
		var button = elem('input');
		button.type = "button";
		button.value = buttonText;
		button.id = buttonId;
		button.className = "std";
	//	button.addEventListener('click',	function() {buttonEventListenerFunction();}, true);
		buttonParent.appendChild(button);
		return button;
	}

	/**
	* createElemTravianCPTable
	*/
	function createElemTravianCPTable(tableParent, villagesText, cpText, currentTotalCPs, currentTotalCPsPerDay) {
		var tbody = createElemTravianTable(villagesText, tableParent, false);
		createElemAppendAndSetInner('td', tbody.rows[0], cpText);
		createElemAppendAndSetInner('td', tbody.rows[0], '<img src="'+IMGS_CLOCK+'"/>');


		var cpArray;
		switch (CONFIG_TRAVIAN_SERVER_TYPE) {
			case DEF_TRAVIAN_SERVER_TYPE_2:		cpArray = DEF_CP_TRAVIAN_2;		break;
			case DEF_TRAVIAN_SERVER_TYPE_3:		cpArray = DEF_CP_TRAVIAN_3;		break;
			case DEF_TRAVIAN_SERVER_TYPE_SPEED:	cpArray = DEF_CP_TRAVIAN_SPEED;	break;
			default: debug(DBG_HIGHEST, "[createElemTravianCPTable] ERROR: wrong CONFIG_TRAVIAN_SERVER_TYPE " + CONFIG_TRAVIAN_SERVER_TYPE); break;
		}


		var nextVillage = searchCPValue(currentTotalCPs, cpArray);

		var numberOfVillages = xpathEvaluate('//div[@id="lright1"]/table[1]/tbody/tr/td/a[contains(@href, "newdid")]').snapshotLength;

		var villagesToBeBuiltWithCurrentCPs = (nextVillage-1) - numberOfVillages;

		if (villagesToBeBuiltWithCurrentCPs > 0) {
			createElemTravianCPTableRow(tbody, cpArray, numberOfVillages, currentTotalCPs, currentTotalCPsPerDay);
			if (villagesToBeBuiltWithCurrentCPs > 1) {
				createElemTravianCPTableRow(tbody, false, "...", currentTotalCPs, currentTotalCPsPerDay);

			}
		}

		for(var i=0; i<3; i++) {
			createElemTravianCPTableRow(tbody, cpArray, nextVillage - 1 + i, currentTotalCPs, currentTotalCPsPerDay);
		}
	}

	/**  createElemTravianCPTableRow */
	function createElemTravianCPTableRow(rowParent, cpArray, index, currentTotalCPs, currentTotalCPsPerDay) {
		var tr = createElementAppend('tr', rowParent);
		tr.style.backgroundColor = "palegreen";
		var td = createElemAppendAndSetInner('td', tr, index);
		var timeToReachNextLevel = 0;
		if (cpArray) {
			var cpValueOfLevel = "?";
			if (index < cpArray.length) {
				cpValueOfLevel = cpArray[index];
				if (cpValueOfLevel > currentTotalCPs) {
					timeToReachNextLevel = (cpValueOfLevel - currentTotalCPs) / currentTotalCPsPerDay;
					tr.style.backgroundColor = "lightpink";
				}
			}

			var td = createElemAppendAndSetInner('td', tr, cpValueOfLevel);
		} else {
			var td = createElemAppendAndSetInner('td', tr, "...");
		}
		timeToReachNextLevel = timeInSecondsToColonSeparatedTxtWithDays(timeDaysToSeconds(timeToReachNextLevel));
		var td = createElemAppendAndSetInner('td', tr, timeToReachNextLevel);
		return tr;
	}

	function QP_addOwnTownTotalTroopsTable () {

		var a = find('//div[@id="lmid2"]/p/a[contains(@href, "a2b.php")]');

		if (!a) return;

		var activeVillageCoordZ = getActiveVillageCoordZ();

		if (!activeVillageCoordZ) {
			var a = find('//div[@id="lmid2"]/table/tbody/tr/td[1]/a[contains(@href, "karte.php?d=")]');

			if (a) {
				a.href.search(/karte\.php\?d=(\d+)/);
				activeVillageCoordZ = RegExp.$1;
			}
		}

		var ownTroopsTables2 = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td[1]/a[not(contains(@href, ' + activeVillageCoordZ + '))]/../../../..');
		var ownTroopsTables = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td[1]/a[contains(@href, ' + activeVillageCoordZ + ')]/../../../..|//div[@id="lmid2"]/p[@class="b f16"]');

		var ownAttack2 = new Array(0, 0, 0, 0, 1);

		if (ownTroopsTables2.snapshotLength > 0) {
			var newTable2 = new Array();

			for(var i=0, len=ownTroopsTables2.snapshotLength; i<len; i++) {
				var currentTable = ownTroopsTables2.snapshotItem(i);
				if (currentTable.nodeName == "P") { break; }

				var currentTroopsCells = xpathEvaluateInContext(currentTable, 'tbody/tr[3]').snapshotItem(0);
				var currentTroopsIconCell = xpathEvaluateInContext(currentTable, 'tbody/tr[2]').snapshotItem(0);

				if (currentTroopsCells.cells[1].textContent == '?') {


					var currentTroopsTitleCell = xpathEvaluateInContext(currentTable, 'tbody/tr[1]').snapshotItem(0);

					var attcolor = ['YellowGreen', 'Purple', 'red'];

					for (var iii=0; iii < 3; iii++) {
						var att = T('TROOPATTACK' + (iii+1));

						if (currentTroopsTitleCell.cells[1].textContent.substr(0, att.length) == att) {
							currentTable.style.cssText = 'border: 1px solid ' + attcolor[iii] + ';';

							currentTable.attacktype = (iii+1);
							currentTable.setAttribute('attacktype', (iii+1));

							currentTable.name = 'attacktypetable';
							currentTable.setAttribute('name', 'attacktypetable');

							ownAttack2[iii] += 1;
						}
					}

					continue;
				}

				var troops, tm;
				if(currentTroopsIconCell.cells[1].innerHTML.indexOf("u/1.gif")>0) {
					troops = 1;
				} else if(currentTroopsIconCell.cells[1].innerHTML.indexOf("u/11.gif")>0) {
					troops = 2;
				} else if(currentTroopsIconCell.cells[1].innerHTML.indexOf("u/21.gif")>0) {
					troops = 3;
				}

				var newtm = 0;

				if (troops && !newTable2[troops]) {
					newtm = 1;

					newTable2[troops] = new Array();

					newTable2[troops]['newTable'] = currentTable.cloneNode(true);
					newTable2[troops]['newTableTitleRow'] = newTable2[troops]['newTable'].rows[0];
					newTable2[troops]['newTableIconsRow'] = newTable2[troops]['newTable'].rows[1];
					newTable2[troops]['newTableTroopsRow'] = newTable2[troops]['newTable'].rows[2];
					newTable2[troops]['newTableCropRow'] = newTable2[troops]['newTable'].rows[3];

					newTable2[troops]['newTableIconsRow'].cells[0].width = newTable2[troops]['newTable'].rows[0].cells[0].width;

					newTable2[troops]['num'] = 0;
				}

				newTable2[troops]['num']++;

				if (currentTroopsCells.cells.length == 12 && newTable2[troops]['newTableTroopsRow'].cells.length < 12) {
					// clone the hero icon cell
					var currentTroopsHeroIconCell = xpathEvaluateInContext(currentTable, 'tbody/tr[2]/td[12]').snapshotItem(0);
					newTable2[troops]['newTableIconsRow'].appendChild(currentTroopsHeroIconCell.cloneNode(true));
					// create the hero amount cell (with 0 amount, it will be added as normal)
					var newHeroAmountCell = currentTroopsCells.cells[11].cloneNode(true);
					newHeroAmountCell.innerHTML = 0;
					newTable2[troops]['newTableTroopsRow'].appendChild(newHeroAmountCell);

					newTable2[troops]['newTableCropRow'].cells[1].colSpan = 11;
				}

				switch (troops){
					case 1:tm=romans;break;
					case 2:tm=teutons;break;
					case 3:tm=gauls;break;
					default:tm=null;break;
				}

				var atstemp = []
				var dtstemp = [];

				atstemp[0] = 0;
				atstemp[8] = 0;
				atstemp[9] = 0;
				dtstemp[0] = 0;
				dtstemp[1] = 0;

				var attHTML = '';

				// ADDS UP THE TROOPS
				for(var j=1; j<currentTroopsCells.cells.length; j++) {	// cell 0 has the word "troops"
					var n = parseInt(currentTroopsCells.cells[j].textContent);

//					newTable2[troops]['newTableTroopsRow'].cells[j].textContent = parseInt(newTable2[troops]['newTableTroopsRow'].cells[j].textContent) + n;

					dtstemp[0]=dtstemp[0] + n*tm[j-1][1];	// def1
					dtstemp[1]=dtstemp[1] + n*tm[j-1][2];	// def2
				}

				if (dtstemp[0]) attHTML += '<img title="'+aLangBattleAnalyse[2]+'" src="'+img('a/def_i.gif')+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+dtstemp[0]+'</i></font><br>';
				if (dtstemp[1]) attHTML += '<img title="'+aLangBattleAnalyse[3]+'" src="'+img('a/def_c.gif')+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+dtstemp[1]+'</i></font><br>';

				if (attHTML) attHTML += "\n";

				currentTroopsIconCell.cells[0].innerHTML = attHTML;
			}

			var paragraph = xpathEvaluate('//div[@id="lmid2"]/p[@class="f10"]').snapshotItem(0);

			var ok = 0;

			for (troops=3; troops>=1; troops--) {
				if (!newTable2[troops]) continue;;

				ok = 1;

				var newTableTitleCell = newTable2[troops]['newTableTitleRow'].cells[0];
				newTable2[troops]['newTableTitleRow'].innerHTML = "";
				newTable2[troops]['newTableTitleRow'].appendChild(newTableTitleCell);
				newTableTitleCell.colSpan = 0;

				newTableTitleCell.innerHTML = '<span class="c0">' + T('RACE' + (troops-1)) + T('REIN') + '(' + newTable2[troops]['num'] + ')' + '</span>';

				newTable2[troops]['newTable'].innerHTML = "";
				newTable2[troops]['newTable'].appendChild(newTable2[troops]['newTableTitleRow']);
				newTable2[troops]['newTable'].appendChild(newTable2[troops]['newTableIconsRow']);
				newTable2[troops]['newTable'].appendChild(newTable2[troops]['newTableTroopsRow']);

				switch (troops){
					case 1:tm=romans;break;
					case 2:tm=teutons;break;
					case 3:tm=gauls;break;
					default:tm=null;break;
				}

				if (tm) {
					newTable2[troops]['newTableCropRow'].cells[1].textContent = 0;

					var atstemp = []
					var dtstemp = [];

					atstemp[0] = 0;
					atstemp[8] = 0;
					atstemp[9] = 0;
					dtstemp[0] = 0;
					dtstemp[1] = 0;

					for(var j=1; j<newTable2[troops]['newTableTroopsRow'].cells.length; j++) {	// cell 0 has the word "troops"
						var n = parseInt(newTable2[troops]['newTableTroopsRow'].cells[j].textContent);

//						atstemp[0]=atstemp[0] + n*tm[j-1][0];
//
//						atstemp[8]=atstemp[8] + n*tm[11][j-1]*tm[j-1][0];
//						atstemp[9]=atstemp[9] + n*tm[12][j-1]*tm[j-1][0];

						dtstemp[0]=dtstemp[0] + n*tm[j-1][1];	// def1
						dtstemp[1]=dtstemp[1] + n*tm[j-1][2];	// def2

						newTable2[troops]['newTableCropRow'].cells[1].textContent = parseInt(newTable2[troops]['newTableCropRow'].cells[1].textContent) + n * tm[j-1][7];

						newTable2[troops]['newTableTroopsRow'].cells[j].innerHTML = "\t" + n;
					}

					var attHTML = '';

//					if (atstemp[8]) attHTML += '<img title="'+aLangBattleAnalyse[17]+'" src="'+imagenes["imgatti"]+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+atstemp[8]+'</i></font><br>';
//					if (atstemp[9]) attHTML += '<img title="'+aLangBattleAnalyse[18]+'" src="'+imagenes["imgattc"]+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+atstemp[9]+'</i></font><br>';
//					if (atstemp[0]) attHTML += '<img title="'+aLangBattleAnalyse[0]+'" src="'+img('a/att_all.gif')+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+atstemp[0]+'</i></font><br>';

					if (dtstemp[0]) attHTML += '<img title="'+aLangBattleAnalyse[2]+'" src="'+img('a/def_i.gif')+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+dtstemp[0]+'</i></font><br>';
					if (dtstemp[1]) attHTML += '<img title="'+aLangBattleAnalyse[3]+'" src="'+img('a/def_c.gif')+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+dtstemp[1]+'</i></font><br>';

					if (attHTML) attHTML += "\n";

					newTable2[troops]['newTableIconsRow'].cells[0].innerHTML = attHTML;
				}

				newTable2[troops]['newTableCropRow'].cells[1].innerHTML += ' <img class="res" src="' + img('r/4.gif') + '" alt="' +T('CROP')+ '"> ' + T('HOURS');

				newTable2[troops]['newTable'].appendChild(newTable2[troops]['newTableCropRow']);

				// add the newly created table with the totals

				if (troops < 3) insertAfter(paragraph, elem('br'));

				insertAfter(paragraph, newTable2[troops]['newTable']);

//				paragraph.parentNode.insertBefore(newTable2[troops]['newTable'], paragraph.nextSibling);
			}

			if (ok) {
				var igmlink2 = elem('p', "<b>" + T('addOwnTownTotalTroopsTable1') + "</b><p/>");
				insertAfter(paragraph, igmlink2);
			}
		}

//		var ownTroopsTables = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td[1]/a[contains(@href, ' + activeVillageCoordZ + ')]/../../../..|//div[@id="lmid2"]/p[@class="b f16"]');

		if (ownTroopsTables.snapshotLength > 0) {
			var newTable = ownTroopsTables.snapshotItem(0).cloneNode(true);
			var newTableTitleRow = newTable.rows[0];
			var newTableIconsRow = newTable.rows[1];
			var newTableTroopsRow = newTable.rows[2];
			var newTableCropRow = newTable.rows[3];

			newTableIconsRow.cells[0].width = newTable.rows[0].cells[0].width;
//			newTableCropRow.cells[0].width = newTable.rows[0].width;


			var troops, tm;

			if(newTableIconsRow.cells[1].innerHTML.indexOf("u/1.gif")>0) {
				troops = 1;
			} else if(newTableIconsRow.cells[1].innerHTML.indexOf("u/11.gif")>0) {
				troops = 2;
			} else if(newTableIconsRow.cells[1].innerHTML.indexOf("u/21.gif")>0) {
				troops = 3;
			}

			switch (troops){
				case 1:tm=romans;break;
				case 2:tm=teutons;break;
				case 3:tm=gauls;break;
				default:tm=null;break;
			}

			for(var i=0, len=ownTroopsTables.snapshotLength; i<len; i++) {	// table 0 is the cloned one above
				var currentTable = ownTroopsTables.snapshotItem(i);
				// doesn't count on oasis to not double count
				if (currentTable.nodeName == "P") { break; }

				var currentTroopsCells = xpathEvaluateInContext(currentTable, 'tbody/tr[3]').snapshotItem(0);
				var currentTroopsIconCell = xpathEvaluateInContext(currentTable, 'tbody/tr[2]').snapshotItem(0);

				// creates the hero column in case it wasn't in the "totals" table but the hero belongs to this town now
				if (i > 0 && currentTroopsCells.cells.length == 12) {
					// clone the hero icon cell
					var currentTroopsHeroIconCell = xpathEvaluateInContext(currentTable, 'tbody/tr[2]/td[12]').snapshotItem(0);
					newTableIconsRow.appendChild(currentTroopsHeroIconCell.cloneNode(true));
					// create the hero amount cell (with 0 amount, it will be added as normal)
					var newHeroAmountCell = currentTroopsCells.cells[11].cloneNode(true);
					newHeroAmountCell.innerHTML = 0;
					newTableTroopsRow.appendChild(newHeroAmountCell);

					newTableCropRow.cells[1].colSpan = 11;
				}

				var currentTroopsTitleCell = xpathEvaluateInContext(currentTable, 'tbody/tr[1]').snapshotItem(0);

				var attcolor = ['YellowGreen', 'Purple', 'red', 'blue'];

				for (var iii=0; iii < 4; iii++) {
					var att = T('TROOPATTACK' + (iii+1));

					if (iii != 3 && currentTroopsTitleCell.cells[1].textContent.substr(0, att.length) == att) break;

					if (
						(iii != 3 && currentTroopsTitleCell.cells[1].textContent.substr(0, att.length) == att)

						||

						(iii == 3 && currentTroopsTitleCell.cells[1].textContent.substr(0, att.length) != att)
					) {
//						currentTable.style.cssText = 'border: 1px solid ' + attcolor[iii] + ';';

						currentTable.attacktype = (iii+1);
						currentTable.setAttribute('attacktype', (iii+1));

						currentTable.name = 'attacktypetable';
						currentTable.setAttribute('name', 'attacktypetable');

						ownAttack2[iii] += 1;
					}
				}

				var atstemp = []
				var dtstemp = [];

				atstemp[0] = 0;
				atstemp[8] = 0;
				atstemp[9] = 0;
				dtstemp[0] = 0;
				dtstemp[1] = 0;

				var attHTML = '';

				// ADDS UP THE TROOPS
				for(var j=1; j<currentTroopsCells.cells.length; j++) {	// cell 0 has the word "troops"

					var n = parseInt(currentTroopsCells.cells[j].textContent);

					if(i > 0) newTableTroopsRow.cells[j].textContent = parseInt(newTableTroopsRow.cells[j].textContent) + n;

					atstemp[0]=atstemp[0] + n*tm[j-1][0];

					atstemp[8]=atstemp[8] + n*tm[11][j-1]*tm[j-1][0];
					atstemp[9]=atstemp[9] + n*tm[12][j-1]*tm[j-1][0];

					dtstemp[0]=dtstemp[0] + n*tm[j-1][1];	// def1
					dtstemp[1]=dtstemp[1] + n*tm[j-1][2];	// def2
				}

				if (atstemp[8]) attHTML += '<img title="'+aLangBattleAnalyse[17]+'" src="'+imagenes["imgatti"]+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+atstemp[8]+'</i></font><br>';
				if (atstemp[9]) attHTML += '<img title="'+aLangBattleAnalyse[18]+'" src="'+imagenes["imgattc"]+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+atstemp[9]+'</i></font><br>';
				if (atstemp[0]) attHTML += '<img title="'+aLangBattleAnalyse[0]+'" src="'+img('a/att_all.gif')+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+atstemp[0]+'</i></font><br>';

				if (dtstemp[0]) attHTML += '<img title="'+aLangBattleAnalyse[2]+'" src="'+img('a/def_i.gif')+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+dtstemp[0]+'</i></font><br>';
				if (dtstemp[1]) attHTML += '<img title="'+aLangBattleAnalyse[3]+'" src="'+img('a/def_c.gif')+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+dtstemp[1]+'</i></font><br>';

				if (attHTML) attHTML += "\n";

				currentTroopsIconCell.cells[0].innerHTML = attHTML;

				if (i > 0) {
					var currentCropCells = xpathEvaluateInContext(currentTable, 'tbody/tr[4]').snapshotItem(0);
					newTableCropRow.cells[1].textContent = parseInt(newTableCropRow.cells[1].textContent) + parseInt(currentCropCells.cells[1].textContent);
				}
			}
			// make the totals 0s greyed out and the non-0s non-grayed out
			for(var j=1; j<newTableTroopsRow.cells.length; j++) {	// cell 0 has the word "troops"
				newTableTroopsRow.cells[j].className = (newTableTroopsRow.cells[j].textContent == 0) ? "c" : "";
			}
			// change the title row
			var newTableTitleCell = newTableTitleRow.cells[0];
			newTableTitleRow.innerHTML = "";
			newTableTitleRow.appendChild(newTableTitleCell);
			newTableTitleCell.colSpan = 0;
			// remove all and re-insert the 1st 3 rows - removes the upkeep/arrival row

//			var troops, tm;
//
//			if(newTableIconsRow.cells[1].innerHTML.indexOf("u/1.gif")>0) {
//				troops = 1;
//			} else if(newTableIconsRow.cells[1].innerHTML.indexOf("u/11.gif")>0) {
//				troops = 2;
//			} else if(newTableIconsRow.cells[1].innerHTML.indexOf("u/21.gif")>0) {
//				troops = 3;
//			}
//
//			switch (troops){
//				case 1:tm=romans;break;
//				case 2:tm=teutons;break;
//				case 3:tm=gauls;break;
//				default:tm=null;break;
//			}

			if (tm) {
				newTableCropRow.cells[1].textContent = 0;

				var atstemp = []
				var dtstemp = [];

				atstemp[0] = 0;
				atstemp[8] = 0;
				atstemp[9] = 0;
				dtstemp[0] = 0;
				dtstemp[1] = 0;

				for(var j=1; j<newTableTroopsRow.cells.length; j++) {	// cell 0 has the word "troops"
					var n = parseInt(newTableTroopsRow.cells[j].textContent);

					atstemp[0]=atstemp[0] + n*tm[j-1][0];

					atstemp[8]=atstemp[8] + n*tm[11][j-1]*tm[j-1][0];
					atstemp[9]=atstemp[9] + n*tm[12][j-1]*tm[j-1][0];

					dtstemp[0]=dtstemp[0] + n*tm[j-1][1];	// def1
					dtstemp[1]=dtstemp[1] + n*tm[j-1][2];	// def2

					newTableCropRow.cells[1].textContent = parseInt(newTableCropRow.cells[1].textContent) + n * tm[j-1][7];

					newTableTroopsRow.cells[j].innerHTML = "\t" + n;
				}

				var attHTML = '';

				if (atstemp[8]) attHTML += '<img title="'+aLangBattleAnalyse[17]+'" src="'+imagenes["imgatti"]+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+atstemp[8]+'</i></font><br>';
				if (atstemp[9]) attHTML += '<img title="'+aLangBattleAnalyse[18]+'" src="'+imagenes["imgattc"]+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+atstemp[9]+'</i></font><br>';
				if (atstemp[0]) attHTML += '<img title="'+aLangBattleAnalyse[0]+'" src="'+img('a/att_all.gif')+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+atstemp[0]+'</i></font><br>';

				if (dtstemp[0]) attHTML += '<img title="'+aLangBattleAnalyse[2]+'" src="'+img('a/def_i.gif')+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+dtstemp[0]+'</i></font><br>';
				if (dtstemp[1]) attHTML += '<img title="'+aLangBattleAnalyse[3]+'" src="'+img('a/def_c.gif')+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+dtstemp[1]+'</i></font><br>';

				if (attHTML) attHTML += "\n";

				newTableIconsRow.cells[0].innerHTML = attHTML;
			}

			newTableCropRow.cells[1].innerHTML += ' <img class="res" src="' + img('r/4.gif') + '" alt="' +T('CROP')+ '"> ' + T('HOURS');

			newTable.innerHTML = "";
			newTable.appendChild(newTableTitleRow);
			newTable.appendChild(newTableIconsRow);
			newTable.appendChild(newTableTroopsRow);

			newTable.appendChild(newTableCropRow);

			// add the newly created table with the totals
			var paragraph = xpathEvaluate('//div[@id="lmid2"]/p[@class="f10"]').snapshotItem(0);
			paragraph.parentNode.insertBefore(newTable, paragraph.nextSibling);

			var igmlink2 = elem('p', "<b>" + T('addOwnTownTotalTroopsTable') + "</b><p/>");

			paragraph.parentNode.insertBefore(igmlink2, paragraph.nextSibling);
		}

		var paragraph = xpathEvaluate('//div[@id="lmid2"]/p[@class="txt_menue"]').snapshotItem(0);

		if (arrayToInt(ownAttack2) > 1) {
//			insertAfter(paragraph, elem('br'));

			var igmlink2 = elem('p', "<b>" + T('addOwnTownTotalTroopsTable2') + "</b><p/>");
			insertBefore(paragraph, igmlink2);

			for (var iii=0; iii < ownAttack2.length; iii++) {
				if (ownAttack2[iii] > 0) {
					var att = T('TROOPATTACK' + (iii+1));

					var a = elem('A', att + '(' + (iii == 4 ? arrayToInt(ownAttack2) - 1 : ownAttack2[iii]) + ')');
					a.href = 'javascript:void(0);';

					a.attacktype = (iii+1);
					a.setAttribute('attacktype', (iii+1));

					a.style.cssText = 'margin-right: 10px;';

					_attachEvent(a, 'click', function (e) {
						e = e ? e : window.even;

						var t = $names('attacktypetable');

						for (var ti=0; ti<t.length; ti++) {
							t[ti].style.display = in_array(e.target.getAttribute('attacktype'), [t[ti].getAttribute('attacktype'), 5]) ? '' : 'none';
						}
					});

					insertBefore(paragraph, a);
				}
			}

			var el = elem('INPUT');
			el.type = 'checkbox';
			el.value = 1;
			el.name = 'auto_reload';
			el.hideFocus = true;

			if (getcookies('_auto_reload_', 0) > 0) {
				el.checked = true;
			}

//			alert(unsafeWindow.auto_reload);

			unsafeWindow.auto_reload = getcookies('_auto_reload_', 0);

//			alert(unsafeWindow.auto_reload);

			_attachEvent(el, ['click', 'change'], function (e) {
				var who = e.target;

				setcookie('_auto_reload_', who.checked ? 1 : 0);

				unsafeWindow.auto_reload = getcookies('_auto_reload_', 0);
			});

			var elt = textelem(T('auto_reload'));

			var ee = elem('label');
			ee.appendChild(el);
			ee.appendChild(elt);

			ee.style.cssText = 'float: none;';

			var ep = elem('p');
			ep.appendChild(ee);

			insertBefore(paragraph, ep);
		}
	}

	function resumomenu(){
	//	if (plus) return;
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba) return;

		if (plus) {
			var a = find("//div[@id='lmid2']//p[@class='txt_menue']", XPFirst);

//			a.appendChild(elem('span', ' | <a href="dorf3.php?s=0">' + T("MINI") + '</a>'));

			a.appendChild(elem('span', ' | <a href="dorf3.php?s=6">' + T("TROP") + '2</a>'));
			a.appendChild(elem('span', ' | <a href="dorf3.php?s=7">' + T("FT") + '</a>'));
			a.appendChild(elem('span', ' | <a href="dorf3.php?s=8">' + T("MAN") + '</a>'));
		} else {
			find("//span[@class='c b']", XPFirst).innerHTML = '<a href="dorf3.php?s=0">' + T("MINI") + '</a></span> | <a href="dorf3.php?s=2">' + T("RESS") + '</a>'; //</span> | <span class="c c"><a href="dorf3.php?s=2"> Prod. Trav+ </a>'; // ne rien mettre
			find("//span[@class='c b']", XPFirst).setAttribute("class", "c c"); // ressources
			find("//span[@class='c b']", XPFirst).setAttribute("class", "c d"); // Dépôt de ressource
			find("//span[@class='c b']", XPFirst).setAttribute("class", "c e"); // PC
			find("//span[@class='c b']", XPFirst).setAttribute("class", "c f"); // Troupes

			find("//span[@class='c d']", XPFirst).innerHTML = '<a href="dorf3.php?s=3">' + T("DEP") + '</a>';//</span> | <a href="dorf3.php?s=1"> test2 </a></span> | <a href="dorf3.php?s=1"> test3 </a></span> | <a href="dorf3.php?s=2"> test4 </a>';
			find("//span[@class='c e']", XPFirst).innerHTML = '<a href="dorf3.php?s=4">' + T("PC") + '</a>';
			find("//span[@class='c f']", XPFirst).innerHTML = '<a href="dorf3.php?s=5">' + T("TROP") + '</a></span> | <span class="c f"><a href="dorf3.php?s=7">' + T("FT") + '</a></span> | <span class="c f"><a href="dorf3.php?s=8">' + T("MAN") + '</a></span>';
		}

		tabela = find("//table[@class='tbg']", XPFirst).innerHTML;
		//find("//table[@class='tbg']", XPFirst).innerHTML = '';
		return tabela;
	}

	function preg_replace(search, replace, str, mode) {
		var len = search.length;

		if (mode) {

			for(var i = 0; i < len; i++) {
				str = str.replace(search[i], typeof replace == 'string' ? replace : (replace[i] ? replace[i] : replace[0]));
			}

		} else {

			for(var i = 0; i < len; i++) {
				re = new RegExp(search[i], "ig");
				str = str.replace(re, typeof replace == 'string' ? replace : (replace[i] ? replace[i] : replace[0]));
			}

		}
		return str;
	}

	function addslashes(str) {
		return preg_replace(['\\\\', '\\\'', '\\\/', '\\\(', '\\\)', '\\\[', '\\\]', '\\\{', '\\\}', '\\\^', '\\\$', '\\\?', '\\\.', '\\\*', '\\\+', '\\\|'], ['\\\\', '\\\'', '\\/', '\\(', '\\)', '\\[', '\\]', '\\{', '\\}', '\\^', '\\$', '\\?', '\\.', '\\*', '\\+', '\\|'], str);
	}

	function splitN (a, c) {
		var value = a.split(c);

		for (var i=0; i<value.length; i++) {
			value[i] = parseInt(value[i]);
		}

		return value;
	}

	function convertToBBLetters (closehtmlon) {
		function parseBBCode(str, htmlon, allowlink, allowcoords) {
//			var ret;
//			ret=str;
//			ret=ret.replace(/\[b\](.*?)\[\/b\]/gi,'<span style="font-weight:bold">$1</span>');
//			ret=ret.replace(/\[i\](.*?)\[\/i\]/gi,'<span style="font-style:italic">$1</span>');
//			ret=ret.replace(/\[u\](.*?)\[\/u\]/gi,'<span style="text-decoration:underline">$1</span>');
//			ret=ret.replace(/\[color=(.*?)\](.*?)\[\/color\]/gi,'<span style="color:$1">$2</span>');

			var ret = str;

			if (allowlink) {
				if (htmlon) {
					ret=ret.replace(/((<br>|<br \/>|\b|\n|\t)[^'\[\]\<\>\"])((https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|ed2k){1}:\/\/[\w\.\/\?\[&amp;|&\]=\$\-_\.\+!\*'\(\)]+)([^\[\"'](<br>|<br \/>|\n|\r|\b|\s)+)?/gim, '$1<a href="$3" _target="_blank" title="$3">$3</a>$5');
				} else {
					ret=ret.replace(/((<br>|<br \/>|\b|\n|\t)[^'\[\]\<\>\"])((https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|ed2k){1}:\/\/[\w\.\/\?\[&amp;|&\]=\$\-_\.\+!\*'\(\)]+)([^\[\"'](<br>|<br \/>|\n|\r|\b|\s)+)?/gim, '$1<a href="$3" _target="_blank" title="$3">$3</a>$5');
				}
			}

//			ret= ret.replace(/(<br>|<br \/>|\b|$)(https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|ed2k){1}:\/\/([^\[\"']+?)(<br>|<br \/>|\b|$)/igm, '<a href="$2://$3" target="_blank" title="$2://$3">$2://$3</a>');

			var searcharray = [
//				'\\\[b\\\](.*?)\\\[\\\/b\\\]'
//				, '\\\[i\\\](.*?)\\\[\\\/i\\\]'
//				, '\\\[u\\\](.*?)\\\[\\\/u\\\]'
//				, '\\\[color=(.*?)\\\]([^\]co].*)\\\[\\\/color\\\]'

				'\\\[b\\\]'
				, '\\\[\\\/b\\\]'

				, '\\\[i\\\]'
				, '\\\[\\\/i\\\]'

				, '\\\[u\\\]'
				, '\\\[\\\/u\\\]'

				, '\\\[color=([^\\\[\\\<].+?)\\\]'
				, '\\\[\\\/color\\\]'

				, '\\\['+addslashes(T('total'))+'\\\]'

//				, '\\n\\t\\\['

				, '\\\['+addslashes(aLangBattleAnalyse[17])+'\\\]'
				, '\\\['+addslashes(aLangBattleAnalyse[18])+'\\\]'
				, '\\\['+addslashes(aLangBattleAnalyse[2])+'\\\]'
				, '\\\['+addslashes(aLangBattleAnalyse[3])+'\\\]'
				, '\\\['+addslashes(aLangBattleAnalyse[0])+'\\\]'
			];

			var replacearray = [
//				'<b style="font-weight:bold">$1</b>'
//				, '<i style="font-style:italic">$1</i>'
//				, '<u style="text-decoration:underline">$1</u>'
//				, '<span style="color:$1">$2</span>'

				'<b style="font-weight:bold">'
				, '</b>'

				, '<i style="font-style:italic">'
				, '</i>'

				, '<u style="text-decoration:underline">'
				, '</u>'

				, '<font style="color:$1">'
				, '</font>'

				, '<img src="' + imagenes["imgpackgo"] + '" title="' + T('total') + '">'

//				, '\n　　['

				, '<img src="' + imagenes["imgatti"] + '" title="' + aLangBattleAnalyse[17] + '">'
				, '<img src="' + imagenes["imgattc"] + '" title="' + aLangBattleAnalyse[18] + '">'
				, '<img src="' + img('a/def_i.gif') + '" title="' + aLangBattleAnalyse[2] + '">'
				, '<img src="' + img('a/def_c.gif') + '" title="' + aLangBattleAnalyse[3] + '">'
				, '<img src="' + img('a/att_all.gif') + '" title="' + aLangBattleAnalyse[0] + '">'
			];

			ret = preg_replace(searcharray, replacearray, ret);

			var searcharray = [
				'['+T('total')+']'
				, '['+aLangBattleAnalyse[17]+']'
				, '['+aLangBattleAnalyse[18]+']'
				, '['+aLangBattleAnalyse[2]+']'
				, '['+aLangBattleAnalyse[3]+']'
				, '['+aLangBattleAnalyse[0]+']'
			];

			var replacearray = [
				'<img src="' + imagenes["imgpackgo"] + '" title="' + T('total') + '">'
				, '<img src="' + imagenes["imgatti"] + '" title="' + aLangBattleAnalyse[17] + '">'
				, '<img src="' + imagenes["imgattc"] + '" title="' + aLangBattleAnalyse[18] + '">'
				, '<img src="' + img('a/def_i.gif') + '" title="' + aLangBattleAnalyse[2] + '">'
				, '<img src="' + img('a/def_c.gif') + '" title="' + aLangBattleAnalyse[3] + '">'
				, '<img src="' + img('a/att_all.gif') + '" title="' + aLangBattleAnalyse[0] + '">'
			];

			ret = preg_replace(searcharray, replacearray, ret, 1);

			ret= ret.replace(/\[url=www.([^\[\"']+?)\](.+?)\[\/url\]/ig, '<a href="http://www.$1" target="_blank" title="http://www.$1">$2</a>');
			ret= ret.replace(/\[url\]\s*(www.|https?:\/\/|ftp:\/\/|gopher:\/\/|news:\/\/|telnet:\/\/|rtsp:\/\/|mms:\/\/|callto:\/\/|bctp:\/\/|ed2k:\/\/){1}([^\[\"']+?)\s*\[\/url\]/ig, '<a href="$1://$2" target="_blank" title="$1://$2">$3</a>');

			for (var i=aLangTroops.length-1; i>=0; i--) {
				for (var j=0; j<aLangTroops[i].length; j++) {
					ret = preg_replace(['\\\['+addslashes(aLangTroops[i][j])+'\\\]'], ['<img src="' + img('u/'+(j < 10 ? (i*10+j+1) : 'hero')+'.gif') + '" _class="res" title="' + aLangTroops[i][j] + '">'], ret);

//					alert('['+addslashes(aLangTroops[i][j])+'] = ' + img('u/'+(i*j+1)+'.gif' + ret));
//
//					return ret;
				}
			}

			for (i=1; i<=4; i++) {
				ret = preg_replace(['\\\['+addslashes(T('RECURSO'+i))+'\\\]'], ['<img src="' + img('r/'+i+'.gif') + '" class="res" title="' + T('RECURSO' + i) + '">'], ret);
			}

			ret = ret.replace(/\[img\]\s*([^\[\<\r\n]+?)\s*\[\/img\]/ig, '<a rel="clearbox[bb_img]" href="$1" target="_blank"><img class="bb_img" src="$1" border="0" alt="" /></a>');

			if (allowcoords) {
				var coords = ret.match(/(?!\<span.+?\>\s?)([\(]?)([ |　]?)(\-?[0-9]{1,3})\s?\|\s?(\-?[0-9]{1,3})([ |　]?)([\)]?)(?!\s?\<\/span\>)/gi);

				var coordsz, x, y, z;

				var coordsData = new Array();

				if (coords) {
					for (var i=0; i<coords.length; i++) {
						coords[i].match(/(\-?[0-9]{1,3})\s?\|\s?(\-?[0-9]{1,3})/ig);
						var x = RegExp.$1;
						var y = RegExp.$2;

						if ( x > 400 || y > 400) continue;

						var z = xy2id(x, y);
//						if (coordsData[coords[i]]) continue;

//						var coordsz = x + ' | ' + y;
						coordsz = ' (' + x + '|' + y + ') ';

//						if (coords[i] != coordsz) {
//							ret = ret.replace(coords[i], coordsz);
//							coords[i] = coordsz;
//						}

						ret = ret.replace(coords[i], coordsz);
						ret = ret.replace(' ' + coordsz + ' ', coordsz);
						ret = ret.replace(' ( ' + coordsz + ' ) ', coordsz);
						ret = ret.replace('( ' + coordsz + ' )', coordsz);
						ret = ret.replace('(' + coordsz + ')', coordsz);

//						ret = preg_replace(
//							[
//								coords[i]
//								, ' ' + coordsz + ' '
//								, ' ( ' + coordsz + ' ) '
//								, '( ' + coordsz + ' )'
//								, coords[i] + ' | ' + coords[i]
//								, '('+coords[i] + ' | ' + coords[i]+')'
//								, '( '+coords[i] + ' | ' + coords[i]+' )'
//								, ' ( '+coords[i] + ' | ' + coords[i]+' ) '
//								, ' ('+coords[i] + ' | ' + coords[i]+') '
//							]
//							, [
//								coordsz
//							]
//							, ret
//						);

						coordsData[z] = z;

//						ret = ret.replace(coords[i]
//						, '<span class="tb_coords"> ( ' + coordsz + ' ) </span>'
//						+ '<a href="a2b.php?z=' + z + '" target="_blank"><img src="' + img("a/att_all.gif") + '" style="margin:3px 0px 1px 3px; display: inline" height="10" width="10" border="0"></a>'
//						+ '<a href="build.php?z=' + z + '&gid=17" target="_blank">' + T('ALDEA_EXTRA2') + '</a>'
//						+ '<a href="karte.php?z=' + z + '" target="_blank">' + T('ALDEA_EXTRA3') + '</a> '
//						);

					}

					document.title.search(/travian\s(\w+$)/i);
					var idioma2 = RegExp.$1;

					for (var key in coordsData) {
						z = key;

						x = zid2x(z);
						y = zid2y(z);

						coordsz = "\s?\\\(\s?" + x + "\s?\\|\s?" + y + "\s?\\\)\s?";
						coordsz2 = '( ' + x + ' | ' + y + ' )';

//						ret = ret.replace('/'+coordsz+'/g'
//							, '<span class="tb_coords"> ' + coordsz2 + ' </span>'
//							+ '<a href="a2b.php?z=' + z + '" target="_blank"><img src="' + img("a/att_all.gif") + '" style="margin:3px 0px 1px 3px; display: inline" height="10" width="10" border="0"></a>'
//							+ '<a href="build.php?z=' + z + '&gid=17" target="_blank">' + T('ALDEA_EXTRA2') + '</a>'
//							+ '<a href="karte.php?z=' + z + '" target="_blank">' + T('ALDEA_EXTRA3') + '</a> '
//							);

						ret = preg_replace([coordsz]
							, '<span class="tb_coords"> ' + coordsz2 + ' </span>'
							+ '<a href="a2b.php?z=' + z + '" target="_blank" done="1"><img src="' + img("a/att_all.gif") + '" style="margin:3px 0px 1px 3px; display: inline" height="10" width="10" border="0"></a>'
							+ '<a href="build.php?z=' + z + '&gid=17" target="_blank" done="1">' + T('ALDEA_EXTRA2') + '</a>'
							+ '<a href="karte.php?z=' + z + '" target="_blank" done="1">' + T('ALDEA_EXTRA3') + '</a> '

							+ " <a href='" + 'http://crop-finder.com/' + idioma2 + '/' + zid2x(z) + '|' + zid2y(z) + '/' + "' target='_blank' done='1'>" + "<img src='" + imagenes["cropfinder"] + "' style='margin:3px 0px 1px 3px; display: inline' height='12' border='0'>" + "</a>"

							, ret);

//						ret = ret.replace(coordsz
//							, '<span class="tb_coords"> ' + coordsz2 + ' </span>'
//							+ '<a href="a2b.php?z=' + z + '" target="_blank"><img src="' + img("a/att_all.gif") + '" style="margin:3px 0px 1px 3px; display: inline" height="10" width="10" border="0"></a>'
//							+ '<a href="build.php?z=' + z + '&gid=17" target="_blank">' + T('ALDEA_EXTRA2') + '</a>'
//							+ '<a href="karte.php?z=' + z + '" target="_blank">' + T('ALDEA_EXTRA3') + '</a> '
//							);

//						alert(coordsz);
					}
				}
			}

			if (!htmlon) ret = preg_replace(["\t+","(\r\n|\n|\r)"], [' ', '<br />'], ret);
			if (htmlon) ret = preg_replace(['&amp;', '&nbsp;', '&lt;', '&gt;'], ['&', ' ', '<', '>'], ret);

			ret = preg_replace([">br>"], ['<br />'], ret);

//			ret=ret.replace(/\[url\](.*?)\[\/url\]/gi,'<a href="$1" target="_blank">$1</a>');
//			ret=ret.replace(/\[url=(.*?)\](.*?)\[\/url\]/gi,'<a href="$1" target="_blank">$2</a>');
//			ret=ret.replace(/\[img\](.*?)\[\/img\]/gi,'<img src="$1" />');
//			ret=ret.replace(/(<br>|<br \/>|\b|^)((ftp|http|https|file):\/\/[\w\.\/\?&=\$\-_\.\+!\*'\(\)]+)(<br>|<br \/>|\b|$)/gim, '$1<a href="$2" target="_blank">$2</a>$4');
//			coords=ret.match(/\W\-?\d+\W\-?\d+\W/gi);
//			root="http://"+document.domain;
//			if (coords)
//			{
//				for (i=0;i<coords.length;i++)
//				{
//					current=coords[i];
//					xs=current.replace(/\W(\-?\d+)\W(\-?\d+)\W/gi,"$1");
//					ys=current.replace(/\W(\-?\d+)\W(\-?\d+)\W/gi,"$2");
//					x=parseInt(xs)-400;
//					y=400-parseInt(ys);
//					z=801*(y+1)+x;
//					ret=ret.replace(current,current+'[<a href="'+root+'/a2b.php?z='+z+'">T</a>  '+
//					'<a href="'+root+'/build.php?z='+z+'&gid=17">M</a>  <a href="'+root+'/karte.php?z='+z+'">C</a>]');
//				}
//			}
			return ret;
		}

		var coordsData = new Array();

		var OurArea = xpath("//form[@action='nachrichten.php']//td[@colspan='3']");

		if (!OurArea.snapshotLength) OurArea = xpath("//table[@class='tbg']//div[@class='postbody']");

		if (OurArea.snapshotLength) {
			var useLinkification = getElementsByClassName(document, 'a', 'linkification-ext').length > 0 ? 1 : 0;

			var allowlink = getOption("allowlink", useLinkification ? false : true, "boolean");
			var htmlon = getOption("htmlon", useLinkification ? true : false, "boolean");
			var allowcoords = getOption("allowcoords", useLinkification ? false : true, "boolean");

			if (closehtmlon) htmlon = true;

			for (var i = 0; i < OurArea.snapshotLength; i++) {
				var LetterArea = OurArea.snapshotItem(i);

//				if (htmlon) {
//					LetterArea.innerHTML = parseBBCode(LetterArea.innerHTML, htmlon, allowlink, allowcoords);
//				} else {
//					LetterArea.innerHTML = parseBBCode(htmlon ? LetterArea.innerHTML : getInnerText(LetterArea), htmlon, allowlink, allowcoords);
//				}

				LetterArea.innerHTML = parseBBCode(htmlon ? LetterArea.innerHTML : getInnerText(LetterArea), htmlon, allowlink, allowcoords);
			}

			playerLinks();

			var a = find("//input[@type='image' and @name='s1']", XPFirst);

			if (!a) {
				a = find("//table[@class='tbg']", XPFirst);

				if (!a) return;
			};

			var elel = elem('label', '');

			var elec = createElemCheckbox('htmlon', 1, !htmlon);
			elel.appendChild(elec);

			elel.addEventListener('change', function(){
				htmlon = htmlon ? false : true;

				setOption('htmlon', htmlon);

				document.location.reload();
			}, false);

			var elec = elem('span', T('htmlon'));
			elel.appendChild(elec);

			insertAfter(a, elel);


			var elel = elem('label', '');

			var elec = createElemCheckbox('allowlink', 1, allowlink);
			elel.appendChild(elec);

			elel.addEventListener('change', function(){
				allowlink = allowlink ? false : true;

				setOption('allowlink', allowlink);

				document.location.reload();
			}, false);

			var elec = elem('span', T('allowlink'));
			elel.appendChild(elec);

			insertAfter(a, elel);

			var elel = elem('label', '');

			var elec = createElemCheckbox('allowcoords', 1, allowcoords);
			elel.appendChild(elec);

			elel.addEventListener('change', function(){
				allowcoords = allowcoords ? false : true;

				setOption('allowcoords', allowcoords);

				document.location.reload();
			}, false);

			var elec = elem('span', T('allowcoords'));
			elel.appendChild(elec);

			insertAfter(a, elel);

			var tag		= elem('link');
			tag.href	= 'http://www.clearbox.hu/EN/css/clearbox.css';
			tag.type	= 'text/css';
			tag.rel		= 'stylesheet';

			document.getElementsByTagName('head')[0].appendChild(tag);

			var tag		= elem('script');
			tag.src		= 'http://www.clearbox.hu/EN/js/clearbox.js';
			tag.type	= 'text/javascript';

			document.getElementsByTagName('head')[0].appendChild(tag);

			var cssStyle = '';

			cssStyle = 'img.bb_img {max-height: 120px;}';
			cssStyle += 'a img.bb_img, #CB_Thumbs2 a {border:1px solid #EEEEEE;padding:1px;opacity:0.7;}';
			cssStyle += 'a:hover img.bb_img, #CB_Thumbs2 a:hover {border:1px solid #B5DA32;opacity:1;}';

			GM_addStyle(cssStyle);

			function box_wait() {
				if(typeof unsafeWindow.CB_PicDir == 'undefined' && typeof CB_PicDir == 'undefined') { window.setTimeout(box_wait,1000); }
				else if (unsafeWindow.CB_PicDir) { unsafeWindow.CB_PicDir = 'http://www.clearbox.hu/pic'; }
				else { CB_PicDir = 'http://www.clearbox.hu/pic'; }
			}

//			window.setTimeout(box_wait,1000);

			_attachEvent(window, 'load', box_wait);
		}
	}

	function convertToBBLetters_menu () {
		var script = elem('script');
		script.setAttribute("type","text/javascript");
		script.setAttribute("language","javascript");
		script.text =
		'function addBBCode(tag,value) {' +
			'if (value=="0") return;' +
			'var message = document.getElementsByName("text")[0];' +
			'if (value=="") {' +
				'var str1 = "[" + tag + "]";' +
				'var str2 = "[/" + tag + "]";}' +
			'else {' +
				'var str1 = "[" + tag + "=" + value + "]";' +
				'var str2 = "[/" + tag + "]";}' +
			'message.focus();' +
			'if (message.isTextEdit) {' +
				'var sel = document.selection;' +
				'var rng = sel.createRange();' +
				'var seltext = rng.text;' +
				'rng.text = str1 + seltext + str2;' +
				'rng.collapse(false);' +
				'rng.move("character",-str2.length);' +
				'rng.moveStart("character",-seltext.length);' +
				'rng.select();' +
			'} else {' +
				'var start = message.selectionStart;' +
				'var starttext = message.value.substring(0,start);' +
				'var seltext = message.value.substring(start,message.selectionEnd);' +
				'var endtext = message.value.substring(message.selectionEnd,message.textLength);' +
				'message.value = starttext + str1 + seltext + str2 + endtext;' +
				'message.selectionStart = start + str1.length;' +
				'message.selectionEnd = start + str1.length + seltext.length;' +
			'}' +
			'message.focus();' +
		'}';
		var form = document.getElementsByTagName("form")[0];
		form.parentNode.insertBefore(script,form);
		var igm = document.getElementsByTagName("textarea")[0];
		var logo = elem("tr");
		var logo1 = elem("tr");
//		logo.innerHTML += "<select onchange='addBBCode(\"font\",this.value)'><option value='0'>FONT</option><option value='arial'><span style='font-family:Arial'>Arial</span></option><option value='comic sans ms'><span style='font-family:comic sans ms'>Comic</span></option><option value='courier new'><span style='font-family:courier new'>Courier</span></option><option value='tahoma'><span style='font-family:tahoma'>Tahoma</span></option><option value='times new roman'><span style='font-family:times new roman'>Times</span></option><option value='verdana'><span style='font-family:verdana'>Verdana</span></option></select> ";
//		logo.innerHTML += "<select onchange='addBBCode(\"size\",this.value)'><option value='0'>SIZE</option><option value='7'>tiny</option><option value='10'>small</option><option value='12'>normal</option><option value='16'>big</option><option value='20'>huge</option></select> ";
		logo.innerHTML += "<select onchange='addBBCode(\"color\",this.value)'><option value='0'>COLOR</option><option value='black' style='color:black'>black</option><option value='silver' style='color:silver'>silver</option><option value='gray' style='color:gray'>gray</option><option value='maroon' style='color:maroon'>maroon</option><option value='#A52A2A' style='color:brown'>brown</option><option value='red' style='color:red'>red</option><option value='orange' style='color:#FFA500'>orange</option><option value='yellow' style='color:yellow'>yellow</option><option value='lime' style='color:lime'>lime</option><option value='green' style='color:green'>green</option><option value='olive' style='color:olive'>olive</option><option value='teal' style='color:teal'>teal</option><option value='aqua' style='color:aqua'>aqua</option><option value='blue' style='color:blue'>blue</option><option value='navy' style='color:navy'>navy</option><option value='purple' style='color:purple'>purple</option><option value='fuchsia' style='color:fuchsia'>fuchsia</option><option value='#FFC0CB' style='color:pink'>pink</option><option value='white' style='color:white'>white</option></select> ";
		logo1.innerHTML += "<a href='javascript:addBBCode(\"b\",\"\")'><img src='http://forum.travian.com.ar/images/travian/editor/bold.gif' alt='Bold Text' title='Bold Text' border='0' /></a><a href='javascript:addBBCode(\"i\",\"\")'><img src='http://forum.travian.com.ar/images/travian/editor/italic.gif' alt='Italic Text' title='Italic Text' border='0' /></a><a href='javascript:addBBCode(\"u\",\"\")'><img src='http://forum.travian.com.ar/images/travian/editor/underline.gif' alt='Underlined Text' title='Underlined Text' border='0' /></a><img src='http://forum.travian.com.ar/images/travian/editor/separator.gif' alt='Separador' title='Separador' border='0' /> ";
//		logo1.innerHTML += "<a href='javascript:addBBCode(\"align\",\"\left\")'><img src='http://forum.travian.com.ar/images/travian/editor/justifyleft.gif' alt='Left Text' title='Left Text' border='0' /></a>";
//		logo1.innerHTML += "<a href='javascript:addBBCode(\"align\",\"\center\")'><img src='http://forum.travian.com.ar/images/travian/editor/justifycenter.gif' alt='Center Text' title='Center Text' border='0' /></a>";
//		logo1.innerHTML += "<a href='javascript:addBBCode(\"align\",\"\rright\")'><img src='http://forum.travian.com.ar/images/travian/editor/justifyright.gif' alt='Right Text' title='Right Text' border='0' /></a> <img src='http://forum.travian.com.ar/images/travian/editor/separator.gif' alt='Separador' title='Separador' border='0' /> ";
//		logo1.innerHTML += "<a href='javascript:addBBCode(\"url\",\"\")'><img src='http://forum.travian.com.ar/images/travian/editor/createlink.gif' alt='Add Link' title='Add Link' border='0' /></a>";
		logo1.innerHTML += "<a href='javascript:addBBCode(\"img\",\"\")'><img src='http://forum.travian.com.ar/images/travian/editor/insertimage.gif' alt='Insert Image' title='Insert Image' border='0' /></a><img src='http://forum.travian.com.ar/images/travian/editor/separator.gif' alt='Separador' title='Separador' border='0' /> ";
//		logo1.innerHTML += "<a href='javascript:addBBCode(\"quote\",\"\")'><img src='http://forum.travian.com.ar/images/travian/editor/quote.gif' alt='Citar' title='Citar' border='0' /></a>";

		igm.parentNode.insertBefore(logo, igm);
		igm.parentNode.insertBefore(logo1, igm);
	}

	function parseBattleAnalyse() {

		var tab;
		var warsim=0;

		var worksave = 1;
		var saveBeta = '';

		var survi = new Array();

		var defcord = 0;
		var atttroops = 0;

		function mainBattleAnalyse(){
			if(readCookie('oazis')==undefined)createCookie('oazis','');

			tab=find("//table[@class='tbg']/tbody",XPList);
			if (window.location.href.match(/warsim.php/)){

				if(find('//table[@class="f10"]',XPList).snapshotLength>0){
					nn=find('//table[@class="f10"]/tbody/tr/td[2]/div',XPList);
					if(nn.snapshotLength==0)return;
					imgpa=elem('img');
					imgpa.id='ba_imgp';
					imgpa.src=imagenes["imgpaste"];
					imgpa.setAttribute('style', 'cursor:pointer');
					imgpa.addEventListener('click',function (ev){
						var mass=readCookie('oazis').split(',');
						if(document.getElementsByName('a2_'+mass[0]).length==0)return;
						for(var i=1;i<11;i++){
							document.getElementsByName('a2_'+parseInt(30+i))[0].value=0;
						};
						for(var i=0;i<mass.length-1;i+=2){
							document.getElementsByName('a2_'+mass[i])[0].value=mass[i+1];
						};
					},false);
					nn.snapshotItem(0).childNodes[0].appendChild(imgpa);
					var mass=readCookie('oazis').split(',');
					if(document.getElementsByName('a2_'+mass[0]).length==0){
						imgpa.style.display='none';
					};
				};
				if(tab.snapshotLength<3)return;
			// Warsim
				warsim=1;
			// End Warsim
			}else{
				if(tab.snapshotItem(1)==undefined)return;
				if(tab.snapshotItem(1).parentNode.id=='MeXaon_ver_table')return;
				if(tab.snapshotItem(1).parentNode.getElementsByTagName("td").length < 24)return;
				if(tab.snapshotItem(1).getElementsByTagName("td")[0].textContent.charCodeAt(0)==160) return;
				// fix anchors
					var fa = tab.snapshotItem(0).getElementsByTagName('a');
					for( var i = 0; i < fa.length; i++) {
						fa[i].href = fa[i].href;
					}
				//

				if (worksave > 1) {
					saveBeta =getInnerText(tab.snapshotItem(0));
				} else {
					saveBeta ='<table><tbody>' + tab.snapshotItem(0).innerHTML + '</tbody></table>';
				}
			}

			table=tab.snapshotItem(1-warsim).getElementsByTagName("td");
			attacktable();
			for(var i=(2-warsim);i<tab.snapshotLength;i++){
				if(tab.snapshotItem(i).parentNode.id!='MeXaon_ver_table'){
					table=tab.snapshotItem(i).getElementsByTagName("td");
					deftable();
				};
			}
			generatereport();
		}

		function attacktable(){
			var statushero=0;
			var statustrap=0;
			var troops=0; //1-romans 2-teutons 3-gauls
			var lostres=new Array(0,0,0,0);
			var atstemp=new Array(0,0,0,0,0,0,0,0,0,0);
			if(table[3-warsim*2].innerHTML.indexOf("u/1.gif")>0) troops=1;
			if(table[3-warsim*2].innerHTML.indexOf("u/11.gif")>0) troops=2;
			if(table[3-warsim*2].innerHTML.indexOf("u/21.gif")>0) troops=3;
			switch (troops){
				case 1:tm=romans;break;
				case 2:tm=teutons;break;
				case 3:tm=gauls;break;
				default:tm=null;break;
			}

			atttroops = troops -1;

//			var perds = new Array();
//			var carry = new Array();
//			var survi = new Array();

			var rescell=find("//tr[@class='cbg1']/td[@class='s7']",XPFirst);
			if(tm!=null){
				if(table[13-warsim*2].innerHTML.indexOf("img")>0) {statushero=1;ats[5]=1;}
				var tda=14+statushero-warsim*2;
				var tdl=25+statushero*2-warsim*2;
				var tdt=0;
				if(!warsim&&(table.rows>4)){
					if(table[36+statushero*3].getAttribute('colspan')==null)tdt=36+statushero*3;
				}
				for(var i=0;i<=(9+statushero);i++){
					atstemp[0]=atstemp[0]+table[tda+i].textContent*tm[i][0];
					lostres[0]=lostres[0]+table[tdl+i].textContent*tm[i][3];
					lostres[1]=lostres[1]+table[tdl+i].textContent*tm[i][4];
					lostres[2]=lostres[2]+table[tdl+i].textContent*tm[i][5];
					lostres[3]=lostres[3]+table[tdl+i].textContent*tm[i][6];
					atstemp[4]=atstemp[4]+table[tda+i].textContent*tm[i][7];
					atstemp[6]=atstemp[6]+table[tdl+i].textContent*tm[i][7];
					atstemp[8]=atstemp[8]+table[tda+i].textContent*tm[11][i]*tm[i][0];
					atstemp[9]=atstemp[9]+table[tda+i].textContent*tm[12][i]*tm[i][0];
					if(tdt!=0){
						atstemp[7]=atstemp[7]+table[tdt+i].textContent*tm[i][7];
						atstemp[3]=atstemp[3]+(table[tda+i].textContent-table[tdl+i].textContent-table[tdt+i].textContent)*tm[i][9];
					}else{
						atstemp[3]=atstemp[3]+(table[tda+i].textContent-table[tdl+i].textContent)*tm[i][9];
					}

//					survi[i] = table[tda+i].textContent - table[tdl+i].textContent;
					survi[i] = table[tda+i].textContent;

					table[tda+i].innerHTML = "\t" + table[tda+i].textContent + "";

					if (table[tdl+i]) {
						survi[i] -= table[tdl+i].textContent;
						table[tdl+i].innerHTML = "\t" + table[tdl+i].textContent;
					}

//					tag					= elem("input");
//					tag.id				= 'ajax_t' + (i+1);
//					tag.name			= 't' + (i+1);
//					tag.value			= parseInt(table[tda+i].textContent);
//					tag.style.cssText	= "width: 85%; height: 99%; color: #009900; font-size: 8pt; background-color: #F0FFF0; border: 1px solid #71D000; padding-bottom: 2px; padding-left: 3px; padding-top: 2px;";
//					tag.style.display	= "none";
//
//					table[tda+i].id		= 't' + (i+1);
//
//					table[tda+i].appendChild(tag);

//					_attachEvent(table[tda+i], 'click', function (event) {
//						event = event ? event : window.event;
//
//						var who = event.target;
//
//						if (who.getAttribute("mode")) {
//
//						} else {
//
//							for (i = 1; i<=11; i++) {
//								if ($('txt_t' + i)) $('txt_t' + i).style.display = '';
//								if ($('ajax_t' + i)) $('ajax_t' + i).style.display = 'none';
//							}
//
//							who.setAttribute("mode", 1);
//							who.setAttribute("num", who.textContent);
//
//							$('txt_' + who.id).style.display = 'none';
//							$('ajax_' + who.id).style.display = '';
//						}
//					});
//
//					_attachEvent($('ajax_t' + (i+1)), 'blur', function (event) {
//						event = event ? event : window.event;
//
//						var who = $(event.target.name);
//
//						if (who.getAttribute("mode")) {
//							who.setAttribute("mode", 0);
//
//							$('txt_' + who.id).style.display = '';
//							$('ajax_' + who.id).style.display = 'none';
//						} else {
//							who.setAttribute("mode", 1);
//
//							$('txt_' + who.id).style.display = 'none';
//							$('ajax_' + who.id).style.display = '';
//						}
//					});

				}

				atstemp[1]=lostres[0]+lostres[1]+lostres[2]+lostres[3];
				if (rescell!=null){
					res=rescell.textContent.split(" ");
					atstemp[2]=parseInt(res[0])+parseInt(res[1])+parseInt(res[2])+parseInt(res[3]);
//					rescell.appendChild(elem('span','<i><b> ('+atstemp[2]+')</b></i>', null, null, 'f8'));

					rescell.innerHTML = '';
					for(var i=0; i<4; i++) {
						rescell.innerHTML += '<img src="'+img('r/'+(i+1)+'.gif')+'" class="res" title="' + T('RECURSO'+(i+1)) + '"> '+res[i]+'&nbsp;';
					}
					rescell.innerHTML = '' + rescell.innerHTML + ' <img src="'+imagenes["imgpackgo"]+'" title="'+T('total')+'"> <i><b class="f8">('+atstemp[2]+')</b></i>';

				}



				attHTML = '<img title="'+aLangBattleAnalyse[17]+'" src="'+imagenes["imgatti"]+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+atstemp[8]+'</i></font><br>';
				attHTML += '<img title="'+aLangBattleAnalyse[18]+'" src="'+imagenes["imgattc"]+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+atstemp[9]+'</i></font><br>';
				attHTML += '<img title="'+aLangBattleAnalyse[0]+'" src="'+img('a/att_all.gif')+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+atstemp[0]+'</i></font>' + "<br>\n";
				table[2-warsim*2].innerHTML=attHTML;

				if (atstemp[1]) {



				rowi=elem("tr", '', '', '', "cbg1");
				cell1=elem("td");
				cell1.innerHTML='<font class="f8"><i>'+aLangBattleAnalyse[1]+'</i></font>';
				cell2=elem("td");
				cell2.setAttribute("align","left");
				cell2.setAttribute("colspan",10+statushero);

				cell2.innerHTML = '';

				for(var i=0; i<4; i++) {
//					cell2.innerHTML='<font class="f8"><i><img src="'+img('r/1.gif')+'" class="res" title="' + T('RECURSO'+i) + '">'+lostres[0]+'&nbsp;<img src="'+img('r/2.gif')+'">'+lostres[1]+'&nbsp;<img src="'+img('r/3.gif')+'">'+lostres[2]+'&nbsp;<img src="'+img('r/4.gif')+'">'+lostres[3]+'&nbsp; <b>(-'+atstemp[1]+')</b></i></font>';

					cell2.innerHTML += '<img src="'+img('r/'+(i+1)+'.gif')+'" class="res" title="' + T('RECURSO'+(i+1)) + '"> '+lostres[i]+'&nbsp;';
				}

				cell2.innerHTML='<font class="f8"><i>' + cell2.innerHTML + ' <img src="'+imagenes["imgpackgo"]+'" title="'+T('total')+'"> <b>(-'+atstemp[1]+')</b></i></font>';

				rowi.appendChild(cell1);
				rowi.appendChild(cell2);
				table[0].parentNode.parentNode.appendChild(rowi);

//				alert(123);

				if (arrayToInt(survi)) {

//					alert(123);

					rowi=elem("tr", '', '', '', "tbu");
					rowi.appendChild(elem("TD", T('SORTUDOS'), '', '', 'li ou'));
					for(var i=0;i<=(9+statushero);i++){
						var informe = elem("TD");
						informe.innerHTML = survi[i];

						informe.className = !survi[i] ? 'ou c' : 'ou';

						rowi.appendChild(informe);
					}

//					alert(123);

					informe.className += ' re';

					if (rescell && rescell.parentNode) rescell.parentNode.className = '';

					var tdtt = 36 + statushero*3 - warsim*2;

//					alert(123);

					insertAfter(table[(table[tdtt] && table[tdtt].getAttribute('colspan')==null) != 0 ? tdtt : tdl].parentNode, rowi);
				}


//				alert(123);


			}
			};
			for(var i=0;i<ats.length;i++){
				ats[i]=ats[i]+atstemp[i];
			};
		};

		function deftable(){
			var statushero=0;
			var troops=0; //1-romans 2-teutons 3-gauls 4-nature
			var lostres=new Array(0,0,0,0);
			var dtstemp=new Array(0,0,0,0,0,0);
			var lostEnable = 1

			if(table[3-warsim*2].innerHTML.indexOf("u/1.gif")>0) troops=1;
			if(table[3-warsim*2].innerHTML.indexOf("u/11.gif")>0) troops=2;
			if(table[3-warsim*2].innerHTML.indexOf("u/21.gif")>0) troops=3;
			if(table[3-warsim*2].innerHTML.indexOf("u/31.gif")>0) troops=4;
			switch (troops){
				case 1:tm=romans;break;
				case 2:tm=teutons;break;
				case 3:tm=gauls;break;
				case 4:tm=nature;break;
				default:tm=null;break;
			}

//			var perds = new Array();
//			var carry = new Array();
			var survi = new Array();

//			for (i=0; i<table.length; i++) {
//				if (table[i].colSpan == 10) {
//					alert(i + ' : ' + table[i].innerHTML);
//				}
//			}

			if(tm!=null){
				if(table[13].innerHTML.indexOf("img")>0) {statushero=1;dts[4]=1;}
				var tda=14+statushero-warsim*2;
				var tdl=25+statushero*2-warsim*2;
				if (!table[tdl]) {
					lostEnable = 0;
				}

				if (table[1].innerHTML.search(/karte.php\?d=(\d+)/) > 0) {
					var a = RegExp.$1;

					if (a > 0) defcord = a;
				}

				for(var i=0;i<=(9+statushero);i++){
//					survi[i] = table[tda+i].textContent;

					dtstemp[0]=dtstemp[0]+table[tda+i].textContent*tm[i][1];	// def1
					dtstemp[1]=dtstemp[1]+table[tda+i].textContent*tm[i][2];	// def2
					dtstemp[3]=dtstemp[3]+table[tda+i].textContent*tm[i][7];
					if (lostEnable){
						lostres[0]=lostres[0]+table[tdl+i].textContent*tm[i][3];
						lostres[1]=lostres[1]+table[tdl+i].textContent*tm[i][4];
						lostres[2]=lostres[2]+table[tdl+i].textContent*tm[i][5];
						lostres[3]=lostres[3]+table[tdl+i].textContent*tm[i][6];
						dtstemp[5]=dtstemp[5]+table[tdl+i].textContent*tm[i][7];

						survi[i] = table[tda+i].textContent - table[tdl+i].textContent;

						table[tdl+i].innerHTML = "\t" + table[tdl+i].textContent;
					}

					table[tda+i].innerHTML = "\t" + table[tda+i].textContent;
				}

				dtstemp[2]=lostres[0]+lostres[1]+lostres[2]+lostres[3];
				table[2-warsim*2].innerHTML='<img title="'+aLangBattleAnalyse[2]+'" src="'+img('a/def_i.gif')+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+dtstemp[0]+'</i></font><br><img title="'+aLangBattleAnalyse[3]+'" src="'+img('a/def_c.gif')+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+dtstemp[1]+'</i></font>' + "<br>\n";

			if (dtstemp[2]) {

			rowi=elem("tr");
			cell1=elem("td");
			cell1.innerHTML='<font class="f8"><i>'+aLangBattleAnalyse[1]+'</i></font>';
			cell2=elem("td");
			cell2.setAttribute("align","left");
			cell2.setAttribute("colspan",10+statushero);
//			cell2.innerHTML='<font class="f8"><i><img src="'+img('r/1.gif')+'">'+lostres[0]+'&nbsp;<img src="'+img('r/2.gif')+'">'+lostres[1]+'&nbsp;<img src="'+img('r/3.gif')+'">'+lostres[2]+'&nbsp;<img src="'+img('r/4.gif')+'">'+lostres[3]+'&nbsp; <b>(-'+dtstemp[2]+')</b></i></font>';

			cell2.innerHTML = '';
			for(var i=0; i<4; i++) {
				cell2.innerHTML += '<img src="'+img('r/'+(i+1)+'.gif')+'" _class="res" title="' + T('RECURSO'+(i+1)) + '"> '+lostres[i]+'&nbsp;';
			}

			cell2.innerHTML='<font class="f8"><i>'+cell2.innerHTML+' <img src="'+imagenes["imgpackgo"]+'" title="'+T('total')+'"> <b>(-'+dtstemp[2]+')</b></i></font>';

			rowi.appendChild(cell1);
			rowi.appendChild(cell2);
			table[0].parentNode.parentNode.appendChild(rowi);

			}

			if (lostEnable && (dtstemp[2] || troops == 4 || arrayToInt(survi))) {
				rowi=elem("tr", '', '', '', "tbu");
				rowi.appendChild(elem("TD", T('SORTUDOS'), '', '', 'li ou'));
				for(var i=0;i<=(9+statushero);i++){
					var informe = elem("TD");
					informe.innerHTML = survi[i];
					informe.className = !survi[i] ? 'ou c' : 'ou';

					rowi.appendChild(informe);
				}

				informe.className += ' re';

				insertAfter(table[tdl] ? table[tdl].parentNode : table[tda].parentNode, rowi);
			}

			};
			for(var i=0;i<dts.length;i++){
				dts[i]=dts[i]+dtstemp[i];
			}
		}

		function generatereport(){
			if(ats[3]==0)ats[2]=0;
			var lostA=ats[2]-ats[1];
			var lostB=dts[2]+ats[2];

			trep=elem("table");
			row1=elem("tr");
			row2=elem("tr");
			row3=elem("tr");
			row4=elem("tr");
			row5=elem("tr");

			cell=elem("td");
			cell.appendChild(elem("b",aLangBattleAnalyse[4], null, null, "c1 b"));
			cell.setAttribute("colspan","5");
			row1.className="cbg1";
			row1.appendChild(cell);

			cell1=elem("td");
			cell1.innerHTML="&nbsp;";
			cell2=elem("td");
			cell2.appendChild(elem("font","<i>"+aLangBattleAnalyse[5]+"</i>", null, null, "f8"));
			cell3=elem("td");
			cell3.appendChild(elem("font","<i>"+aLangBattleAnalyse[6]+"</i>", null, null, "f8"));
			cell4=elem("td");
			cell4.appendChild(elem("font","<i>"+aLangBattleAnalyse[7]+"</i>", null, null, "f8"));
			cell5=elem("td");
			cell5.appendChild(elem("font","<i>"+aLangBattleAnalyse[8]+"</i>", null, null, "f8"));
			row2.appendChild(cell1);
			row2.appendChild(cell2);
			row2.appendChild(cell3);
			row2.appendChild(cell4);
			row2.appendChild(cell5);

			cell1=elem("td");
			cell1.className="c2 b";
			cell1.innerHTML=aLangBattleAnalyse[15];
			cell2=elem("td");
			cell2.setAttribute("align","right");
			cell2.innerHTML=lostA+'*<img src="'+img('r/4.gif')+'" title="'+aLangBattleAnalyse[9]+'">';
			cell3=elem("td");
			cell3.setAttribute("align","right");
			cell3.innerHTML=ats[4]+'*<img src="'+img('r/5.gif')+'" title="'+aLangBattleAnalyse[10]+'">';
			cell4=elem("td");
			cell4.setAttribute("align","right");
			if(ats[5]==0){
					cell4.innerHTML='0*<img src="'+img('a/del.gif')+'" title="'+aLangBattleAnalyse[11]+'">';
			}else cell4.innerHTML=dts[5]+'*<img src="'+img('u/hero.gif')+'" title="'+aLangBattleAnalyse[12]+'">';
			cell5=elem("td");
			cell5.setAttribute("align","right");
			cell5.setAttribute("rowspan","2");
			cell5.innerHTML=ats[2]+'*<img src="'+imagenes["imgpackgo"]+'" title="'+aLangBattleAnalyse[13]+'"><br>'+ats[3]+'*<img src="'+imagenes["imgpack"]+'" title="'+aLangBattleAnalyse[14]+'">';
			row3.appendChild(cell1);
			row3.appendChild(cell2);
			row3.appendChild(cell3);
			row3.appendChild(cell4);
			row3.appendChild(cell5);

			cell1=elem("td");
			cell1.className="c1 b";
			cell1.innerHTML=aLangBattleAnalyse[16];
			cell2=elem("td");
			cell2.setAttribute("align","right");
			cell2.innerHTML=(-lostB)+'*<img src="'+img('r/4.gif')+'" title="'+aLangBattleAnalyse[9]+'">';
			cell3=elem("td");
			cell3.setAttribute("align","right");
			cell3.innerHTML=dts[3]+'*<img src="'+img('r/5.gif')+'" title="'+aLangBattleAnalyse[10]+'">';
			cell4=elem("td");
			cell4.setAttribute("align","right");
			if(dts[4]==0){
					cell4.innerHTML='0*<img src="'+img('a/del.gif')+'" title="'+aLangBattleAnalyse[11]+'">';
			}else cell4.innerHTML=ats[6]+'*<img src="'+img('u/hero.gif')+'" title="'+aLangBattleAnalyse[12]+'">';
			row4.appendChild(cell1);
			row4.appendChild(cell2);
			row4.appendChild(cell3);
			row4.appendChild(cell4);

			if (warsim != 1 && worksave >= 1) {
				var travilogForm = elem("form");
				travilogForm.setAttribute('action', 'http://travilog.org.ua');
				travilogForm.setAttribute('method', 'post');
				travilogForm.setAttribute('target', 'tba_travilogIFrame');
				travilogForm.setAttribute('id', 'tba_travilogForm');

				_attachEvent(travilogForm, 'submit', function() {
					$("tba_travilogIframeRow").style.display = "";
					$("tba_travilogIframeRowDiv").style.display = "";
					$("tba_travilogIFrameId").style.display = "none";
				});

				var data1 = elem("input");
				data1.setAttribute("type", "hidden");
				data1.setAttribute("name", "new_old");
				data1.setAttribute("value", "new");

				var data2 = elem("input");
				data2.setAttribute("type", "hidden");
				data2.setAttribute("name", "act");
				data2.setAttribute("value", "inputlog");

				var data3 = elem("input");
				data3.setAttribute("type", "hidden");
				data3.setAttribute("name", "server");
				data3.setAttribute("value", "");

				var data4 = elem("input");
				data4.setAttribute("type", "hidden");
				data4.setAttribute("name", "lng");
				data4.setAttribute("value", idioma ? idioma : 'en');

				var data5 = elem("input");
				data5.setAttribute("type", "hidden");
				data5.setAttribute("name", "tools");
				data5.setAttribute("value", (worksave > 1 ? "" : "tba"));

				var data6 = elem("input");
				data6.setAttribute("type", "hidden");
				data6.setAttribute("name", "GMT");
//				var cd = new Date()
				var cd = timestamp;
				data6.setAttribute("value", cd.getTimezoneOffset());

				var data7 = elem("input");
				data7.setAttribute("type", "hidden");
				data7.setAttribute("name", "text");
				data7.value = saveBeta;

				var button1 = elem("input");
				button1.setAttribute("type", "submit");
				button1.setAttribute("value", T("savereport"));
				button1.setAttribute("onclick", "document.getElementById('tba_travilogForm').submit()");

				var button2 = elem("input");
				button2.setAttribute("type", "checkbox");
				button2.setAttribute("name", "anonymous");
				button2.setAttribute("value", "1");

				travilogForm.appendChild(data1);
				travilogForm.appendChild(data2);
				travilogForm.appendChild(data3);
				travilogForm.appendChild(data4);
				travilogForm.appendChild(data5);
				travilogForm.appendChild(data6);
				travilogForm.appendChild(data7);
				travilogForm.appendChild(button1);
				travilogForm.appendChild(button2);
				travilogForm.appendChild(elem("span", T("anonymize")));

				var travilogIFrame = elem("iframe");
				travilogIFrame.setAttribute('name', 'tba_travilogIFrame');
				travilogIFrame.setAttribute('id', 'tba_travilogIFrameId');

				_attachEvent(travilogIFrame, 'load', function() {
					$("tba_travilogIFrameId").style.display = "";
					$("tba_travilogIframeRowDiv").style.display = "none";
				});

				travilogIFrame.setAttribute('style', 'border: 0px; width: 100%; height: 7.5em');
				travilogIFrame.innerHTML = "Loading";

				var divLoading = elem('div');
				divLoading.id = 'tba_travilogIframeRowDiv';
				divLoading.innerHTML = "<b>--= Loading =--</b>";

				cell1 = elem("td");
				cell1.setAttribute('colspan', '5');
				cell1.setAttribute('align', 'left');
				cell1.appendChild(travilogForm);

				row6=elem("tr");
				row6.appendChild(cell1);

				cell1 = elem("td");
				cell1.setAttribute('colspan', '5');
		//		cell1.setAttribute('align', 'left');
				cell1.appendChild(divLoading);
				cell1.appendChild(travilogIFrame)

				row7=elem("tr");
				row7.id = 'tba_travilogIframeRow';
				row7.style.display = 'none';
				row7.appendChild(cell1);
			}


			trep.setAttribute("cellpadding","2");
			trep.setAttribute("cellspacing","1");
			trep.className="tbg";
			trep.appendChild(row1);
			trep.appendChild(row2);
			trep.appendChild(row3);
			trep.appendChild(row4);
			if (warsim != 1 && worksave >= 1) {
				trep.appendChild(row5);
				trep.appendChild(row6);
				trep.appendChild(row7);
			}

			tab.snapshotItem(0).getElementsByTagName("td")[5].appendChild(elem("p"));
			if(warsim==0){
				tab.snapshotItem(0).getElementsByTagName("td")[5].appendChild(trep);
			}else{
				tab.snapshotItem(1).parentNode.parentNode.insertBefore(trep,tab.snapshotItem(1).parentNode.nextSibling);
				tab.snapshotItem(1).parentNode.parentNode.insertBefore(elem('p'),tab.snapshotItem(1).parentNode.nextSibling);
			};

			berichteButton(trep);
		}

		function berichteButton(who) {

			if (warsim) return 0;

			location.href.match(/id=(\d+)/);
			var delreporthref = 'berichte.php\?n1=' + RegExp.$1 + '&del=Delete';
			var delreport = elem("p");

			delreport.className = "cbg1";
			delreport.innerHTML = '<td class=rgb colspan=2>&nbsp;<input style="font-weight:bold; font-size:8pt; height:14pt" onClick="document.location.href=\'' + delreporthref + '\'" type=button value="' + T('ELIMINAR') + '">';

			insertBefore(who, delreport);

			var troops = 0;

			if(table[3-warsim*2].innerHTML.indexOf("u/1.gif")>0) troops=1;
			if(table[3-warsim*2].innerHTML.indexOf("u/11.gif")>0) troops=2;
			if(table[3-warsim*2].innerHTML.indexOf("u/21.gif")>0) troops=3;

			if (atttroops >= 0) {
				var table2 = elem('div');

				table2.className = 'p1';
				table2.cellSpacing = 1;
				table2.cellPadding = 3;

				var table1 = elem('table');

				table1.className = 'tbg';
				table1.cellSpacing = 1;
				table1.cellPadding = 2;


				table2.appendChild(table1);

				var tr1 = elem('tr');
				var tr2 = elem('tr');
				var tr3 = elem('tr');
				tr3.className = 'cbg1';


				table1.appendChild(tr3);
				table1.appendChild(tr1);
				table1.appendChild(tr2);


				var td3 = elem('td', '<b class="c1 b">' + T('SENDTROP') + '</b>');
				td3.colSpan = 12;
				tr3.appendChild(td3);



				var td1 = elem('td', T('TROP'));
				tr1.appendChild(td1);
				var td2 = elem('td', '');
				tr2.appendChild(td2);

				for (var i=1;i<=10;i++){
					var td1 = elem('td', '<img src="' + img('u/' + (i + atttroops*10) + '.gif') + '">');
					tr1.appendChild(td1);

					var td2 = elem('td');
					tr2.appendChild(td2);

					var input1 = elem('input');
					input1.type = 'text';
					input1.maxlength = 6;
					input1.size = 2;
					input1.value = survi[i-1];
					input1.name = 't' + i;
					input1.id = 't' + i;
					input1.className = 'fm';

					if (i == 8) {
						input1.disabled = true;
						input1.value = 0;
					}

					td2.appendChild(input1);
				}

				var td1 = elem('td', '<img src="' + img('u/hero.gif') + '">');
				tr1.appendChild(td1);

				var td2 = elem('td');
				tr2.appendChild(td2);

				var input1 = elem('input');
				input1.type = 'text';
				input1.maxlength = 6;
				input1.size = 2;
				input1.value = survi[i-1] ? survi[i-1] : 0;
				input1.name = 't' + i;
				input1.id = 't' + i;
				input1.className = 'fm';

				td2.appendChild(input1);

				insertBefore(who, table2);

				var html1 = '';

				for (var j = 2; j<= 6; j++) {

					html1 += '<option value="'+j+'"' +(j == 4 ? ' selected' : '')+ '>'+T('typeAttack'+j)+'</option>';
				}

				html1 = '<select id="typeAttack" class="fm" name="typeAttack">' + html1 + '</select>';

				var td4 = elem('p', T('typeAttack') + ' ' + html1, 'align', 'left');

				var input2 = elem('input');
				input2.value = T('SENDTROP');
				input2.type = 'button';
				input2.style.cssText = 'margin-left: 3em;';

				_attachEvent(input2, 'click', function (e) {

					var c = $('typeAttack').value;
					var spy = 0;

					if (c>4)
					{
						spy = c-4;
						c=3;
					}

					var postvar = "id=39&c=" +c+ "&kid=" +defcord;

					if (spy){
						if (atttroops == 2 && $('t' + 3).value > 0)
						{
							for(var i = 1; i <= 11; i++) {
								postvar += "&t" +i+ "=" + (i == 3 ? $('t' + i).value : 0);
							}
						}
						else if (atttroops != 2 && $('t' + 4).value >0)
						{
							for(var i = 1; i <= 11; i++) {
								postvar += "&t" +i+ "=" + (i == 4 ? $('t' + i).value : 0);
							}
						}
						postvar += "&spy=" +spy;
					} else {
						for(var i = 1; i <= 11; i++) {
							postvar += "&t" +i+ "=" +$('t' + i).value;
						}

						if(0 && $('t8').value > 0) {
							if($('t' + 11).value) {
								postvar += "&kata=" +troops[11][wavesSent];
							}
							if($('t' + i2).value) {
								postvar += "&kata2=" +troops[12][wavesSent];
							}
						}
					}

					postvar = postvar + '&s1=ok&attacks=&cords=' + '&a=' + getRandom(10000, 99999);

//					alert(document.location.protocol + '//' + document.location.hostname + '/a2b.php?' + postvar);

					var did = getIdAldea();

					if (did) switchActiveVillage(did);

					setTimeout(function () {ajaxRequest(
						'a2b.php'
						, 'post'
						, postvar
						, function () {
							$('ajax_send_request').innerHTML += ($('ajax_send_request').innerHTML ? '<br>' : '') + T('SENDTROP_OK') + ' : ' + getIdAldea(1);
						}
						, function () {
							alert(T('SENDTROP_FAIL'));
						}
					)}, 500);

					return doane(e);
				});

				td4.appendChild(input2);

				var input3 = elem('a', T('SEETROP'));
				input3.href = 'build.php?gid=16';
				input3.target = '_blank';
				input3.style.cssText = 'margin-left: 3em;';

				td4.appendChild(input3);

				var input4 = elem('p', T('SENDTROP_TIP'));
				input4.className = 'c';

				td4.appendChild(input4);

				var input4 = elem('p');
				input4.id = 'ajax_send_request';
				input4.style.color = 'red';

				td4.appendChild(input4);

				insertAfter(table1, td4);

				insertAfter(table2, elem('p'));
			}


		}

		mainBattleAnalyse();



	}

//	//td[@class='r7']/a/img[contains(@src, 'del.gif')]
//
//	function parentNodeTag2(startnode, targettag) {
//		if (startnode.parentNode.tagName.toUpperCase() == targettag.toUpperCase()) {
//
//		}
//	}

	function genreporta2b(){
		var trep=elem("table");
		var row1=elem("tr");
		var row2=elem("tr");
		var row3=elem("tr");

		var cell=elem("td");
		cell.appendChild(elem("b", aLangBattleAnalyse[4], null, null,"c1 b"));
		cell.setAttribute("colspan","5");
		row1.className="cbg1";
		row1.appendChild(cell);

		var cell1=elem("td");
		cell1.style.width='60%';
		cell1.setAttribute('colspan','3');
		cell1.appendChild(elem("font","<i>"+aLangBattleAnalyse[15]+"</i>", null, null, "f8"));
		var cell3=elem("td");
		cell3.style.width='20%';
		cell3.appendChild(elem("font","<i>"+aLangBattleAnalyse[6]+"</i>", null, null, "f8"));
		var cell5=elem("td");
		cell5.style.width='20%';
		cell5.appendChild(elem("font","<i>"+aLangBattleAnalyse[8]+"</i>", null, null, "f8"));
		row2.appendChild(cell1);
		row2.appendChild(cell3);
		row2.appendChild(cell5);

		cell1=elem("td");
		cell1.setAttribute("align","right");
		cell1.innerHTML='<span id="ats0">'+ats[0]+'</span>*<img src="'+img('a/att_all.gif')+'" title="'+aLangBattleAnalyse[0]+'">';
		var cell2=elem("td");
		cell2.setAttribute("align","right");
		cell2.innerHTML='<span id="ats1">'+ats[1]+'</span>*<img src="'+img('a/def_i.gif')+'" title="'+aLangBattleAnalyse[2]+'">';
		cell3=elem("td");
		cell3.setAttribute("align","right");
		cell3.innerHTML='<span id="ats2">'+ats[2]+'</span>*<img src="'+img('a/def_c.gif')+'" title="'+aLangBattleAnalyse[3]+'">';
		var cell4=elem("td");
		cell4.setAttribute("align","right");
		cell4.innerHTML='<span id="ats4">'+ats[4]+'</span>*<img src="'+img('r/5.gif')+'" title="'+aLangBattleAnalyse[10]+'">';
		cell5=elem("td");
		cell5.setAttribute("align","right");
		cell5.setAttribute("rowspan","2");
		cell5.innerHTML='<span id="ats3">'+ats[3]+'</span>*<img src="'+imagenes["imgpack"]+'" title="'+aLangBattleAnalyse[14]+'">';
		row3.appendChild(cell1);
		row3.appendChild(cell2);
		row3.appendChild(cell3);
		row3.appendChild(cell4);
		row3.appendChild(cell5);

		trep.setAttribute("cellpadding","2");
		trep.setAttribute("cellspacing","1");
		trep.className="tbg";
		trep.appendChild(row1);
		trep.appendChild(row2);
		trep.appendChild(row3);

		var t=find('//div[@id="lmid2"]/form/table[@class="f10"]',XPList);
		t.snapshotItem(0).parentNode.insertBefore(trep,t.snapshotItem(0));
		t.snapshotItem(0).parentNode.insertBefore(elem('p'),t.snapshotItem(0));
	}

	function a2b(){
		ats=[0,0,0,0,0,0,0,0];
		var list=find('//table[@class="p1"]/tbody/tr/td/table[@class="f10"]/tbody/tr/td/input',XPList);
		if(list.snapshotLength==0){alert('Error:Find Table,a2b');return;}
		if(list.snapshotItem(0).parentNode.parentNode.childNodes[1].innerHTML.indexOf("u/1.gif")>0) troops=1;
		if(list.snapshotItem(0).parentNode.parentNode.childNodes[1].innerHTML.indexOf("u/11.gif")>0) troops=2;
		if(list.snapshotItem(0).parentNode.parentNode.childNodes[1].innerHTML.indexOf("u/21.gif")>0) troops=3;
		switch (troops){
			case 1:tm=romans;break;
			case 2:tm=teutons;break;
			case 3:tm=gauls;break;
			default:tm=null;break;
		}
		if(tm==null){alert('Error:Bad troops,a2b');return;}
		for(var i=0;i<list.snapshotLength;i++){
			unit=parseInt(list.snapshotItem(i).getAttribute('name').match(/(\d+)/).pop())-1;
			val=parseInt(list.snapshotItem(i).value);
			if(isNaN(val))val=0;
			ats[0]=ats[0]+val*tm[unit][0];	// attack
			ats[1]=ats[1]+val*tm[unit][1];	// def1
			ats[2]=ats[2]+val*tm[unit][2];	// def2
			ats[3]=ats[3]+val*tm[unit][9];	// load
			ats[4]=ats[4]+val*tm[unit][7];	// food
		}
		eats0=$('ats0');
		eats1=$('ats1');
		eats2=$('ats2');
		eats3=$('ats3');
		eats4=$('ats4');
		eats0.textContent=ats[0];
		eats1.textContent=ats[1];
		eats2.textContent=ats[2];
		eats3.textContent=ats[3];
		eats4.textContent=ats[4];
	};

	function kartec () {
		nn=$('pr');
		if(nn != null) {
			imgc=elem('img');
			imgc.src=imagenes["imgcopy"];
			imgc.id='tba_imgcopy';
			imgc.setAttribute('style', 'cursor:pointer');
			imgc.addEventListener('click',function(ev){
				var str='';
				var tdl=find('//div[@id="pr"]/table/tbody/tr/td',XPList);
				var race=parseInt(tdl.snapshotItem(0).firstChild.src.match(/u\/(\d+)/).pop()/10);
				for(var i=0;i<tdl.snapshotLength;i+=3){
					ut=parseInt(tdl.snapshotItem(i).firstChild.src.match(/u\/(\d+)/).pop());
					uc=parseInt(tdl.snapshotItem(i+1).innerHTML.match(/(\d+)/).pop());
					str=str+ut+','+uc+',';
				}
				createCookie('oazis',str);
			},false);
			nn.childNodes[1].appendChild(imgc);
			oazicinfo();
		}
	}

	function oazicinfo(){
		var m=[0,0,0,0];
		var tdl=find('//div[@id="pr"]/table/tbody/tr/td',XPList);
		if(tdl.snapshotItem(0).firstChild.src.match(/u\/(\d+)/)==undefined){
			$('tba_imgcopy').style.display='none';
			return;
		};
		var race=parseInt(tdl.snapshotItem(0).firstChild.src.match(/u\/(\d+)/).pop()/10)*10;
		for(var i=0;i<tdl.snapshotLength;i+=3){
			ut=parseInt(tdl.snapshotItem(i).firstChild.src.match(/u\/(\d+)/).pop())-race-1;
			uc=parseInt(tdl.snapshotItem(i+1).innerHTML.match(/(\d+)/).pop());
			m[0]=m[0]+uc*nature[ut][0];	//att
			m[1]=m[1]+uc*nature[ut][1];	//def1
			m[2]=m[2]+uc*nature[ut][2]; //def2
			m[3]=m[3]+uc*nature[ut][7]; //food
		}
		trep=elem("table");
		row1=elem("tr");
		row2=elem("tr");
		row3=elem("tr");
		row4=elem("tr");

		cell1=elem("td");
		cell1.setAttribute("align","right");
		cell1.innerHTML=+m[0]+'*<img src="'+img('a/att_all.gif')+'" title="'+aLangBattleAnalyse[0]+'">';
		row1.appendChild(cell1);

		cell1=elem("td");
		cell1.setAttribute("align","right");
		cell1.innerHTML='<span id="ats1">'+m[1]+'</span>*<img src="'+img('a/def_i.gif')+'" title="'+aLangBattleAnalyse[2]+'">';
		row2.appendChild(cell1);

		cell1=elem("td");
		cell1.setAttribute("align","right");
		cell1.innerHTML='<span id="ats2">'+m[2]+'</span>*<img src="'+img('a/def_c.gif')+'" title="'+aLangBattleAnalyse[3]+'">';
		row3.appendChild(cell1);

		cell1=elem("td");
		cell1.setAttribute("align","right");
		cell1.innerHTML='<span id="ats4">'+m[3]+'</span>*<img src="'+img('r/5.gif')+'" title="'+aLangBattleAnalyse[10]+'">';
		row4.appendChild(cell1);

		trep.setAttribute("style","width: 80%");
		trep.className="tbg";
		trep.appendChild(row1);
		trep.appendChild(row2);
		trep.appendChild(row3);
		trep.appendChild(row4);

		$('pr').appendChild(trep);
	}



	function getServerTimeAdd (referenceSeconds) {
		var sTime = document.evaluate(
				"id('tp1')",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);

		sTime = sTime.snapshotItem(0).textContent;
		var aMatch = sTime.match(/^([0-9]{1,2}):([0-9]{2}):([0-9]{2})$/i);

		var hours = minutes = seconds = 0;

		var sDate = new Date();
		var ad = 0;

		sDate.setHours((parseInt(aMatch[1]) + ((sDate.getSeconds >= (60-ad) && sDate.getMinutes >= 59) ? 1 : 0)) % 24);
		sDate.setMinutes((parseInt(aMatch[2]) + ((sDate.getSeconds >= (60-ad)) ? 1 : 0)) % 60);
		sDate.setSeconds((parseInt(aMatch[3]) + ad) % 60);
		sDate.setMilliseconds(950);

		var aDate = new Date(sDate.getTime() + referenceSeconds*1000);

		seconds = aDate.getSeconds();
		minutes = aDate.getMinutes();
		hours = aDate.getHours();

		seconds = seconds.toString();
		minutes = minutes.toString();
		hours = hours.toString();
		seconds = seconds.replace(/\b(\d)\b/g, '0$1');
		minutes = minutes.replace(/\b(\d)\b/g, '0$1');
		hours = hours.replace(/\b(\d)\b/g, '0$1');

		return hours + ':' + minutes + ':' + seconds;
	}

	function getTransport_time_arrival () {
		var re = /.*a2b\.php/i;

		if (!re.test(window.location.href) && document.getElementsByName("kid").length>0) {



			var xpathres = xpath("//form[@name='snd']//td[@width='55%']//td");
			var sTim = xpathres.snapshotItem(3).textContent;
			var aTim = sTim.split(":");
			var iseconds = parseInt(aTim[0],10)*60*60+parseInt(aTim[1],10)*60+parseInt(aTim[2],10);

//			alert(xpathres.snapshotItem(3).parentNode.tagName);

			var tr = elem('tr');

			tr.appendChild(elem('td', T('TIME_ARRIVAL')));
			tr.appendChild(elem('td', '<span id="rtimeout">'+getServerTimeAdd(iseconds)+'</span>'));

			insertAfter(xpathres.snapshotItem(3).parentNode, tr);
		} else {

		}


	}

	function fix_title()
	{
		var xp = xpath('//h1');
		if (xp.snapshotLength == 0) return;
		var title = xp.snapshotItem(0).innerHTML.replace(/\<[^>]*?\>/g, '');

		var title = getInnerText(xp.snapshotItem(0)).replace(/\<[^>]*?\>/g, '');

		if (window.location.pathname.indexOf('/dorf2.php') == 0)
			title = String.fromCharCode(164, 32) + title;
		document.title += ' - ' + title;
	}

	function xpath(xp, context, doc)
	{

		doc = doc != null ? doc : document;
		context = context != null ? context : document;

		return doc.evaluate(xp, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

//		return document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	/**
	* xpathEvaluate Finds nodes in the HTML DOM using XPath expression.
	* @param {String} xpathExpr XPath expression to be evaluated and found in the document.
	* @return Node iterator with the nodes that obey the XPath expression.
	*/
	function xpathEvaluate(xpathExpr) {
		return document.evaluate(xpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	}


	/**
	* xpathEvaluate Finds nodes in the HTML DOM using XPath expression.
	* @param {Node} context Node from where to search.
	* @param {String} xpathExpr XPath expression to be evaluated and found in the document.
	* @return Node iterator with the nodes that obey the XPath expression.
	*/
	function xpathEvaluateInContext(context, xpathExpr) {
//		return find(xpathExpr, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, context);

		return document.evaluate(xpathExpr, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	}

	/**
	 * Custom log function .
	 * @param {int} level
	 * @param:{int} msg Message to log.
	 */
	function log(level, msg) {
//		if (level <= LOG_LEVEL) {
//			if (console != undefined) {
//				console.log(msg);
//				if (storeurl!=''&& LOG_LEVEL>128)
//					gmAjaxRequest(storeurl,"POST","cmd=log&namespace="+server+"_"+uid+"&msg="+encodeURIComponent(msg),dummy);
//			}
//		}
	}

	function getlocalStr (slang) {

		if (!idioma) {
			var xtemp = find("//img[contains(@src, 'plus.gif')]");

			if (xtemp) {
				xtemp.src.search(/\/img\/([^\/]+)\//);
				idioma = RegExp.$1;
			} else {
				idioma = 'tw';
			}
		}

		slang = slang ? slang : idioma;

		if (!in_array(slang, ['tw', 'hk']) || !slang) {
			aLang = [];

			getlocalStr('tw');
		}

		switch(slang) {
			case "en":
			case "uk":
			case "us":
				aLang['ALIANZA'] 	= 'Alianza';
				aLang['PERFIL'] 	= 'Perfil';
				aLang['SIM'] 		= 'Simulador';
				aLang['CALC'] 	= 'Calculadora';
				aLang['SEGURO'] 	= 'Estas seguro?';
				aLang['MARK'] 	= 'Marcar Todos';
				aLang['PERDIDAS'] 	= 'P&eacute;rdidas en materiales';
				aLang['RENT'] 	= 'Rentabilidad';
				aLang['SUBIR_NIVEL'] 	= 'Ya puedes subirlo de nivel';
				aLang['JUGADOR'] 	= 'Jugador';
				aLang['ALDEA'] 	= 'Aldea';
				aLang['HAB'] 		= 'Habitantes';
				aLang['COORD'] 	= 'Coordenadas';
				aLang['ACCION'] 	= 'Acciones';
				aLang['ATACAR'] 	= 'Atacar';
				aLang['COMERCIAR'] 	= 'Comerciar';
				aLang['GUARDADO'] 	= 'Guardado';
				aLang['DESP_ABR'] 	= 'Desp.';
				aLang['FALTA'] 	= 'Falta';
				aLang['HOY'] 		= 'hoy';
				aLang['MANYANA'] 	= 'ma&ntilde;ana';
				aLang['PAS_MANYANA'] 	= 'pasado ma&ntilde;ana';
				aLang['MERCADO']	= 'Mercado';
				aLang['CUARTEL']	= 'Cuartel';
				aLang['PUNTO']	= 'Punto de encuentro';
				aLang['CORRAL']	= 'Establo';
				aLang['TALLER']	= 'Taller';
				aLang['ENVIAR']	= 'Enviar';
				aLang['COMPRAR']	= 'Comprar';
				aLang['VENDER']	= 'Vender';
				aLang['ENVIAR_IGM']	= 'Enviar IGM';
				aLang['LISTO']	= 'Todo listo';
				aLang['EL']		= 'el';
				aLang['A_LAS']	= 'a las';
				aLang['EFICIENCIA']	= 'Eficiencia';
				aLang['NUNCA']	= 'Nunca';
				aLang['PC']		= 'punto(s) de cultura';
				aLang['FUNDAR']	= 'Ya puedes fundarla o conquistarla';
				aLang['ALDEAS']	= 'aldea(s)';
				aLang['ENV_TROPAS']	= 'Enviar Tropas';
				aLang['RECURSO1']	= 'Le&ntilde;a';
				aLang['RECURSO2']	= 'Barro';
				aLang['RECURSO3']	= 'Hierro';
				aLang['RECURSO4']	= 'Cereales';
				aLang['TIEMPO']	= 'Tiempo';
				aLang['COMP']		= 'Compactador';
				aLang['STAT']		= 'Estad&iacute;stica';
				aLang['OFREZCO']	= 'Ofrezco';
				aLang['BUSCO']	= 'Busco';
				aLang['TIPO']		= 'Tipo';
				aLang['CUALQUIERA']	= 'Cualquiera';
				aLang['DETALLES']	= 'Detalles';
				aLang['MAP_EXT']	= 'Mapa extendido';
				aLang['DISPONIBLE']	= 'S&oacute;lo disponibles';
				aLang['SI']		= 'S&iacute;';
				aLang['NO']		= 'No';
				aLang['LOGIN']	= 'Login';
				aLang['MARCADORES']	= 'Marcadores';
				aLang['ANYADIR']	= 'A&ntilde;adir';
				aLang['ENLACE']	= 'Direccion del nuevo marcador';
				aLang['TEXTO']	= 'Texto para el nuevo marcador';
				aLang['ELIMINAR']	= 'Eliminar';
				aLang['MAPA']		= 'Mapa';
				aLang['VERSION']	= 'La &uacute;ltima versi&oacute;n disponible es';
				aLang['MAXTIME']	= 'Tiempo m&aacute;ximo';
				aLang['CHECK']	= 'Comprobar nueva versi&oacute;n';
				aLang['MAT_PRIMAS']	= 'Materias';
				aLang['ATAQUES']	= 'Ataques';
				aLang['CONSTR']	= 'Constr.';
				aLang['TROPAS']	= 'Tropas';
				aLang['ACTUALIZAR']	= 'Actualizar';
				aLang['ARCHIVE']	= 'Archivo';
				aLang['RESUMEN']	= 'Resumen';

				aLang['CPCTY1'] = 'Each merchant can carry: ';
				aLang['CPCTY2'] = 'Default value';
				aLang['CPCTY3'] = 'Customize ';
				aLang['RECORD1'] = 'Save the latest ';
				aLang['RECORD2'] = ' records.';
				aLang['DELETE'] = 'Delete';
				aLang['LUMBER'] = 'Lumber';
				aLang['CLAY'] = 'Clay';
				aLang['IRON'] = 'Iron';
				aLang['CROP'] = 'Crop';
				aLang['OFFER'] = 'Offering';
				aLang['SEARCH'] = 'Searching';
				aLang['MAXTIME'] = 'Max Time';
				aLang['ALLIANCE'] = 'Alliance';
				aLang['UNLIMITED'] = 'Unlimited';
				aLang['YES'] = 'Yes';
				aLang['NO'] = 'No';

				aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
				aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
				aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls

				aLangBattleAnalyse = ["Total size of attack","Equivalent of losses","Total size of protection against infantry",
								"Total size of protection against a cavalry","The general statistics","Difference of losses","Consumption",
								"Exp of heroes","Capacity","Equivalent lost in grain","Nominal consumption of grain by army",
								"The hero was not","Hero","Quantity of the carried away raw material","The maximal capacity survived",
								"Attacking","Defending"];

				break;
			case "cn":
				aLang['ALIANZA'] 	= '\联\盟';
				aLang['PERFIL'] 	= '\个\人\资\料';
				aLang['SIM'] 		= '\战\斗\模\拟\器';
				aLang['CALC'] 	= 'Travian\计\算\机';
				aLang['SEGURO'] 	= '\你\真\的\确\定?';
				aLang['MARK'] 	= '\全\选';
				aLang['PERDIDAS'] 	= '\战\损';
				aLang['RENT'] 	= '\得\益';
				aLang['SUBIR_NIVEL'] 	= '\已\可\升\级\！';
				aLang['JUGADOR'] 	= '\玩\家';
				aLang['ALDEA'] 	= '\村\庄';
				aLang['HAB'] 		= '\人\口';
				aLang['COORD'] 	= '\座\标';
				aLang['ACCION'] 	= '\行\动';
				aLang['ATACAR'] 	= '\攻\击';
				aLang['COMERCIAR'] 	= '\运\送\资\源';
				aLang['GUARDADO'] 	= '\储\存';
				aLang['DESP_ABR'] 	= '\移\动\格\数';
				aLang['FALTA'] 	= '\尚\缺';
				aLang['HOY'] 		= '\今\天';
				aLang['MANYANA'] 	= '\明\天';
				aLang['PAS_MANYANA'] 	= '\后\天';
				aLang['MERCADO'] 	= '\市\场';
				aLang['CUARTEL'] 	= '\兵\营';
				aLang['PUNTO'] 	= '\集\结\点';
				aLang['CORRAL'] 	= '\马\厩';
				aLang['TALLER'] 	= '\工\场';
				aLang['ENVIAR'] 	= '\运\送\资\源';
				aLang['COMPRAR'] 	= '\买';
				aLang['VENDER'] 	= '\卖';
				aLang['ENVIAR_IGM'] 	= '\发\送\讯\息';
				aLang['LISTO'] 	= '\建\造\可\于';
				aLang['EL'] 		= '\-';
				aLang['A_LAS'] 	= '\-';
				aLang['EFICIENCIA'] 	= '\效\率';
				aLang['NUNCA']	= '\永\不';
				aLang['PC']			= '\文\明\点';
				aLang['FUNDAR']		= '\您\可\以\兴\建\或\者\占\领\一\座\村\庄';
				aLang['ALDEAS']		= '\村\庄';
				aLang['ENV_TROPAS']	= '出兵';
				aLang['RECURSO1']	 = '\木\材';
				aLang['RECURSO2']	 = '\砖\块';
				aLang['RECURSO3']	 = '\钢\铁';
				aLang['RECURSO4']	 = '\谷\物';
				aLang['TIEMPO']		= '\时\间';
				aLang['COMP']		 = '\报\告\压\缩\器';
				aLang['STAT']		= '\统\计';
				aLang['OFREZCO']	= '\提\供';
				aLang['BUSCO']	= '\需\求';
				aLang['TIPO']		= '\比\例';
				aLang['DISPONIBLE']	= '\是\否\显\示\商\人\足\够\的';
				aLang['CUALQUIERA']	= '\任\何';
				aLang['SI']		= '\是';
				aLang['NO']		= '\否';
				aLang['LOGIN']	= '\登\入';
				aLang['MARCADORES']	= '\书\签';
				aLang['ANYADIR']	  = '\加\入';
				aLang['ENLACE']		= '\新\书\签\网\址';
				aLang['TEXTO']		= '新书签标题';
				aLang['MAXTIME']	= '最大运输时间';
				aLang['ELIMINAR']	= '\删\除';
				aLang['MAPA']		= '\地\图 \(TravMap\)';
				aLang['ARCHIVE']	= '\存\档';
				aLang['RESUMEN']	= '\概\况';

				aLang['DEP'] = '仓库';
				aLang['TROP'] = '军队';

				aLang['SENDTROP'] = '派遣军队';

				aLang['SENDTROP_TIP'] = '＊目前没有设计检查是否真正成功派遣军队。<br>＊请自行检查集结点';

				aLang['SENDTROP_OK'] = '派遣军队完成';
				aLang['SENDTROP_FAIL'] = '派遣军队失败';

				aLang['SEETROP'] = '集结点';

				aLang['TYPEATTACK'] = '攻击类型：';

				aLang['TYPEATTACK4'] = "抢夺攻击";
				aLang['TYPEATTACK3'] = "正常攻击";

				aLang['TYPEATTACK2'] = "增援";

				aLang['TYPEATTACK5'] = "侦察资源/军队";
				aLang['TYPEATTACK6'] = "侦察防御/军队";

				aLang['RESS'] = '资源';
				aLang['MINI'] = '简易';
				aLang['FT'] = '派对';
				aLang['FT1'] = '小型派对';
				aLang['FT2'] = '大型派对';

				aLang['LVL'] = '等级';
				aLang['EXT'] = '扩展';
				aLang['SLOT'] = '额度';
				aLang['MAN'] = '绿洲';
				aLang['OASIS'] = '荒废的山谷';
				aLang['IN'] = '在';

				aLang['DIST'] = '距离';

				aLang['ATT'] = aLang['ATACAR'];
				aLang['CONS'] = '建筑物';

				//for new
				aLang['ALDEA_EXTRA1'] 	= '<img src="img/un/a/def1.gif" width="12" border="0" _title="出兵">';
				aLang['ALDEA_EXTRA2'] 	= '<img src="img/un/r/4.gif" border="0" _title="运送资源">';
				aLang['ALDEA_EXTRA3'] 	= '<img src="img/un/u/44.gif" width="12" border="0" _title="观看地图">';
				aLang['UPLV'] 	= '升级到等级';

				aLang['ALIANZA_FORUM'] 	= '联盟论坛';
				aLang['ALIANZA_CHAT'] 	= '联盟 Chat';
				aLang['ALIANZA_ATTACK'] 	= '联盟攻击';
				aLang['ALIANZA_NEWS'] 	= '联盟新闻';
				aLang['ALIANZA_OPTION'] 	= '联盟选项';

				//导出短消息用
				aLang['IGMTITLE'] = '主题';
				aLang['IGMSENTER'] = '寄件人';
				aLang['IGMDATE'] = '日期';
				aLang['IGMTIME'] = '时间';
				aLang['IGMOUTPUT'] = '显示全部信件内容';

				//
				aLang['OPENLINK']='开启连结';
				aLang['MAP']='地图';
				aLang['ADD_ALL']='全部增加';
				aLang['SAVEMAPURL1']='请输入名称';
				aLang['SAVEMAPURL2']='&raquo; 将此地点存入书签';

				aLang['QUERYMODE']='查询资源';
				aLang['REFRESH_INFORMARION'] = '查看全部';

				// Travian Selling Assistant

				aLang['CPCTY1'] = '自订单位商人运载量: ';
				aLang['CPCTY2'] = '使用预设值 ';
				aLang['CPCTY3'] = '自订 ';
				aLang['RECORD1'] = '储存过去最新 ';
				aLang['RECORD2'] = ' 笔纪录。';
				aLang['DELETE'] = '删除';
				aLang['LUMBER'] = aLang['RECURSO1'];
				aLang['CLAY'] = aLang['RECURSO2'];
				aLang['IRON'] = aLang['RECURSO3'];
				aLang['CROP'] = aLang['RECURSO4'];
				aLang['OFFER'] = '提供';
				aLang['SEARCH'] = '搜寻';
				aLang['MAXTIME'] = '单向运输时间(小时)';
				aLang['ALLIANCE'] = '联盟';
				aLang['UNLIMITED'] = '无上限';
				aLang['YES'] = '是';
				aLang['NO'] = '否';

				aLang['MARKETPRELOADPAGE'] = '预先载入页数：';

				aLang['HOURS'] = '每小时';

				aLang['CHECKNEW']	= '\检\查\新\版\本';

				aLang['ADDOWNTOWNTOTALTROOPSTABLE'] = '此村庄拥有的士兵';

				aLang['SAVEREPORT'] = '储存战报';
				aLang['ANONYMIZE'] = '匿名';

				aLang['TOTAL'] = '总计';
				aLang['PRELOAD'] = '预先载入页数：';
				aLang['DELETEBERICHTE_T3'] = '选择攻方粮食消耗小于：';
				aLang['DELETEBERICHTE_T3_BUTTON'] = '战报筛选';

				aLang['ALLOWCOORDS'] = '开启分析座标';
				aLang['ALLOWLINK'] = '开启分析网址';
				aLang['HTMLON'] = '强化网址分析';

				aLang['SORTUDOS'] = '存活';

				aLang['TIME_ARRIVAL'] = '到达时间';

				aLangTroops[0] = ["古罗马步兵", "禁卫兵", "帝国兵", "使者骑士", "帝国骑士", "将军骑士", "冲撞车", "火焰投石机", "参议员", "开拓者", "英雄"];	//Romans
				aLangTroops[1] = ["棍棒兵", "矛兵", "斧头兵", "侦察兵", "游侠", "条顿骑士", "冲撞车", "投石车", "司令官", "开拓者", "英雄"];					//Teutons"
				aLangTroops[2] = ["方阵兵", "剑士", "探路者", "雷法师", "德鲁伊骑兵", "海顿圣骑", "冲撞车", "投石车", "族长", "开拓者", "英雄", "陷阱"];				//Gauls

				aLangBattleAnalyse = ["总攻击力","平均战损","对步兵防御力",
								"对骑兵防御力","统计","资源损失","粮食消耗",
								"英雄经验","掠夺容量","资源得失","占用人口",
								"没有英雄","英雄","掠夺资源量","剩余容量",
								"进攻方","防守方","步兵攻击力",
								"骑兵攻击力"];

				break;
			case "hk":
			case "tw":
			default:
				aLang['ALIANZA'] 	= '\聯\盟';
				aLang['PERFIL'] 	= '\個\人\資\料';
				aLang['SIM'] 		= '\戰\鬥\模\擬\器';
				aLang['CALC'] 	= 'Travian\計\算\機';
				aLang['SEGURO'] 	= '\你\真\的\確\定?';
				aLang['MARK'] 	= '\全\選';
				aLang['PERDIDAS'] 	= '\戰\損';
				aLang['RENT'] 	= '\得\益';
				aLang['SUBIR_NIVEL'] 	= '\已\可\升\級\！';
				aLang['JUGADOR'] 	= '\玩\家';
				aLang['ALDEA'] 	= '\村\莊';
				aLang['HAB'] 		= '\人\口';
				aLang['COORD'] 	= '\座\標';
				aLang['ACCION'] 	= '\行\動';
				aLang['ATACAR'] 	= '\攻\擊';
				aLang['COMERCIAR'] 	= '\運\送\資\源';
				aLang['GUARDADO'] 	= '\儲\存';
				aLang['DESP_ABR'] 	= '\移\動\格\數';
				aLang['FALTA'] 	= '\尚\缺';
				aLang['HOY'] 		= '\今\天';
				aLang['MANYANA'] 	= '\明\天';
				aLang['PAS_MANYANA'] 	= '\後\天';
				aLang['MERCADO'] 	= '\市\場';
				aLang['CUARTEL'] 	= '\兵\營';
				aLang['PUNTO'] 	= '\集\結\點';
				aLang['CORRAL'] 	= '\馬\廄';
				aLang['TALLER'] 	= '\工\場';
				aLang['ENVIAR'] 	= '\運\送\資\源';
				aLang['COMPRAR'] 	= '\買';
				aLang['VENDER'] 	= '\賣';
				aLang['ENVIAR_IGM'] 	= '\發\送\訊\息';
				aLang['LISTO'] 	= '\建\造\可\於';
				aLang['EL'] 		= '\-';
				aLang['A_LAS'] 	= '\-';
				aLang['EFICIENCIA'] 	= '\效\率';
				aLang['NUNCA']	= '\永\不';
				aLang['PC']			= '\文\明\點';
				aLang['CPPERDAY'] = "文明點（每天）";
				aLang['FUNDAR']		= '\您\可\以\興\建\或\者\佔\領\一\座\村\莊';
				aLang['ALDEAS']		= '\村\莊';
				aLang['ENV_TROPAS']	= '出兵';
				aLang['RECURSO1']	 = '\木\材';
				aLang['RECURSO2']	 = '\磚\塊';
				aLang['RECURSO3']	 = '\鋼\鐵';
				aLang['RECURSO4']	 = '\穀\物';
				aLang['TIEMPO']		= '\時\間';
				aLang['COMP']		 = '\報\告\壓\縮\器';
				aLang['STAT']		= '\統\計';
				aLang['OFREZCO']	= '\提\供';
				aLang['BUSCO']	= '\需\求';
				aLang['TIPO']		= '\比\例';
				aLang['DISPONIBLE']	= '忽略資源不足的項目';
				aLang['CUALQUIERA']	= '\任\何';
				aLang['SI']		= '\是';
				aLang['NO']		= '\否';
				aLang['LOGIN']	= '\登\入';
				aLang['MARCADORES']	= '\書\籤';
				aLang['ANYADIR']	  = '\加\入';
				aLang['ENLACE']		= '\新\書\籤\網\址';
				aLang['TEXTO']		= '新書籤標題';
				aLang['MAXTIME']	= '最大運輸時間';
				aLang['ELIMINAR']	= '\刪\除';
				aLang['MAPA']		= '\地\圖 \(TravMap\)';
				aLang['ARCHIVE']	= '\存\檔';
				aLang['RESUMEN']	= '\概\況';

				aLang['DEP'] = '倉庫';
				aLang['TROP'] = '軍隊';

				aLang['SENDTROP'] = '派遣軍隊';

				aLang['SENDTROP_TIP'] = '＊目前沒有設計檢查是否真正成功派遣軍隊。<br>＊請自行檢查集結點';

				aLang['SENDTROP_OK'] = '派遣軍隊完成';
				aLang['SENDTROP_FAIL'] = '派遣軍隊失敗';

				aLang['SEETROP'] = '集結點';

				aLang['TROOPATTACK1'] = "增援";
				aLang['TROOPATTACK2'] = "搶奪";
				aLang['TROOPATTACK3'] = "攻擊";
				aLang['TROOPATTACK4'] = "自軍";
				aLang['TROOPATTACK5'] = "全部";

				aLang['AUTO_RELOAD'] = '允許頁面自動重新整理';

				aLang['TYPEATTACK'] = '攻擊類型：';

				aLang['TYPEATTACK4'] = "搶奪攻擊";
				aLang['TYPEATTACK3'] = "正常攻擊";

				aLang['TYPEATTACK2'] = "增援";

				aLang['TYPEATTACK5'] = "偵察資源/軍隊";
				aLang['TYPEATTACK6'] = "偵察防禦/軍隊";

				aLang['RESS'] = '資源';
				aLang['MINI'] = '簡易';
				aLang['FT'] = '派對';
				aLang['FT1'] = '小型派對';
				aLang['FT2'] = '大型派對';

				aLang['LVL'] = '等級';
				aLang['EXT'] = '擴展';
				aLang['SLOT'] = '額度';
				aLang['MAN'] = '綠洲';
				aLang['OASIS'] = '荒廢的山谷';
				aLang['IN'] = '在';

				aLang['DIST'] = '距離';

				aLang['ATT'] = aLang['ATACAR'];
				aLang['CONS'] = '建築物';

				//for new
				aLang['ALDEA_EXTRA1'] 	= '<img src="img/un/a/def1.gif" width="12" border="0" _title="出兵">';
				aLang['ALDEA_EXTRA2'] 	= '<img src="img/un/r/4.gif" border="0" _title="運送資源">';
				aLang['ALDEA_EXTRA3'] 	= '<img src="img/un/u/44.gif" width="12" border="0" _title="觀看地圖">';
				aLang['UPLV'] 	= '升級到等級';

				aLang['ALIANZA_FORUM'] 	= '聯盟論壇';
				aLang['ALIANZA_CHAT'] 	= '聯盟 Chat';
				aLang['ALIANZA_ATTACK'] 	= '聯盟攻擊';
				aLang['ALIANZA_NEWS'] 	= '聯盟新聞';
				aLang['ALIANZA_OPTION'] 	= '聯盟選項';

				//導出短消息用
				aLang['IGMTITLE'] = '主題';
				aLang['IGMSENTER'] = '寄件人';
				aLang['IGMDATE'] = '日期';
				aLang['IGMTIME'] = '時間';
				aLang['IGMOUTPUT'] = '顯示全部信件內容';

				//
				aLang['OPENLINK']='開啟連結';
				aLang['MAP']='地圖';
				aLang['ADD_ALL']='全部增加';
				aLang['SAVEMAPURL1']='請輸入名稱';
				aLang['SAVEMAPURL2']='&raquo; 將此地點存入書籤';

				aLang['QUERYMODE']='查詢資源';
				aLang['REFRESH_INFORMARION'] = '查看全部';

				// Travian Selling Assistant

				aLang['CPCTY1'] = '自訂單位商人運載量: ';
				aLang['CPCTY2'] = '使用預設值 ';
				aLang['CPCTY3'] = '自訂 ';
				aLang['RECORD1'] = '儲存過去最新 ';
				aLang['RECORD2'] = ' 筆紀錄。';
				aLang['DELETE'] = '刪除';
				aLang['LUMBER'] = aLang['RECURSO1'];
				aLang['CLAY'] = aLang['RECURSO2'];
				aLang['IRON'] = aLang['RECURSO3'];
				aLang['CROP'] = aLang['RECURSO4'];
				aLang['OFFER'] = '提供';
				aLang['SEARCH'] = '搜尋';
				aLang['MAXTIME'] = '單向運輸時間(小時)';
				aLang['ALLIANCE'] = '聯盟';
				aLang['UNLIMITED'] = '無上限';
				aLang['YES'] = '是';
				aLang['NO'] = '否';

				aLang['MARKETPRELOADPAGE'] = '預先載入頁數：';

				aLang['HOURS'] = '每小時';

				aLang['CHECKNEW']	= '\檢\查\新\版\本';

				aLang['ADDOWNTOWNTOTALTROOPSTABLE'] = '此村莊擁有的士兵';
				aLang['ADDOWNTOWNTOTALTROOPSTABLE1'] = '此村莊擁有的援軍';

				aLang['ADDOWNTOWNTOTALTROOPSTABLE2'] = '前往此村莊的軍隊';

				aLang['SAVEREPORT'] = '儲存戰報';
				aLang['ANONYMIZE'] = '匿名';

				aLang['TOTAL'] = '總計';
				aLang['PRELOAD'] = '預先載入頁數：';
				aLang['DELETEBERICHTE_T3'] = '選擇攻方糧食消耗小於：';
				aLang['DELETEBERICHTE_T3_BUTTON'] = '戰報篩選';

				aLang['ALLOWCOORDS'] = '開啟分析座標';
				aLang['ALLOWLINK'] = '開啟分析網址';
				aLang['HTMLON'] = '強化網址分析';

				aLang['SORTUDOS'] = '存活';

				aLang['TIME_ARRIVAL'] = '到達時間';

				aLang['RACE0'] = '羅馬人';
				aLang['RACE1'] = '條頓人';
				aLang['RACE2'] = '高盧人';

				aLang['REIN'] = '援軍';

				aLangTroops[0] = ["古羅馬步兵", "禁衛兵", "帝國兵", "使者騎士", "帝國騎士", "將軍騎士", "衝撞車", "火焰投石機", "參議員", "開拓者", "英雄"];	//Romans
				aLangTroops[1] = ["棍棒兵", "矛兵", "斧頭兵", "偵察兵", "遊俠", "條頓騎士", "衝撞車", "投石車", "司令官", "開拓者", "英雄"];					//Teutons"
				aLangTroops[2] = ["方陣兵", "劍士", "探路者", "雷法師", "德魯伊騎兵", "海頓聖騎", "衝撞車", "投石車", "族長", "開拓者", "英雄", "陷阱"];				//Gauls

				aLangBattleAnalyse = ["總攻擊力","平均戰損","對步兵防御力",
								"對騎兵防御力","統計","資源損失","糧食消耗",
								"英雄經驗","掠奪容量","資源得失","占用人口",
								"没有英雄","英雄","掠奪資源量","剩餘容量",
								"進攻方","防守方","步兵攻擊力",
								"騎兵攻擊力"];

				break;
		}
	}

	function initBuildCost() {
		// Lenyador
		var lenyadorCost = [
			[0, 0, 0, 0, 0],
			[40, 100, 50, 60, 1],
			[65, 165, 85, 100, 1],
			[110, 280, 140, 165, 2],
			[185, 465, 235, 280, 2],
			[310, 780, 390, 465, 2],
			[520, 1300, 650, 780, 3],
			[870, 2170, 1085, 1300, 4],
			[1450, 3625, 1810, 2175, 4],
			[2420, 6050, 3025, 3630, 5],
			[4040, 10105, 5050, 6060, 6], // Level 10
			[6750, 16870, 8435, 10125, 7],
			[11270, 28175, 14090, 16905, 9],
			[18820, 47055, 23525, 28230, 11],
			[31430, 78580, 39290, 47150, 13],
			[52490, 131230, 65615, 78740, 15],
			[87660, 219155, 109575, 131490, 18],
			[146395, 365985, 182995, 219590, 22],
			[244480, 611195, 305600, 366715, 27],
			[408280, 1020695, 510350, 612420, 32],
			[681825, 1704565, 852280, 1022740, 38], // Level 20
			[1138650, 2846620, 1423310, 1707970, 38],
			[1901540, 4753855, 2376925, 2852315, 38],
			[3175575, 7938935, 3969470, 4763360, 38],
			[5303210, 13258025, 6629015, 7954815, 38],
			[8856360, 22140900, 11070450, 13284540, 38] // Level 25
		];

		// Barrera
		var barroCost = [
			[0, 0, 0, 0, 0],
			[80, 40, 80, 50, 1],
			[135, 65, 135, 85, 1],
			[225, 110, 225, 140, 2],
			[375, 185, 375, 235, 2],
			[620, 310, 620, 390, 2],
			[1040, 520, 1040, 650, 3],
			[1735, 870, 1735, 1085, 4],
			[2900, 1450, 2900, 1810, 4],
			[4840, 2420, 4840, 3025, 5],
			[8080, 4040, 8080, 5050, 6], // Level 10
			[13500, 6750, 13500, 8435, 7],
			[22540, 11270, 22540, 14090, 9],
			[37645, 18820, 37645, 23525, 11],
			[62865, 31430, 62865, 39290, 13],
			[104985, 52490, 104985, 65615, 15],
			[175320, 87660, 175320, 109575, 18],
			[292790, 146395, 292790, 182995, 22],
			[488955, 244480, 488955, 305600, 27],
			[816555, 408280, 816555, 510350, 32],
			[1363650, 681825, 1363650, 852280, 38], // Level 20
			[2277295, 1138650, 2277295, 1423310, 38],
			[3803085, 1901540, 3803085, 2376925, 38],
			[6351150, 3175575, 6351150, 3969470, 38],
			[10606420, 5303210, 10606420, 6629015, 38],
			[17712720, 8856360, 17712720, 11070450, 38] // Level 25
		];

		// Mina de hierro
		var hierroCost = [
			[0, 0, 0, 0, 0],
			[100, 80, 30, 60, 1],
			[165, 135, 50, 100, 1],
			[280, 225, 85, 165, 2],
			[465, 375, 140, 280, 2],
			[780, 620, 235, 465, 2],
			[1300, 1040, 390, 780, 3],
			[2170, 1735, 650, 1300, 4],
			[3625, 2900, 1085, 2175, 4],
			[6050, 4840, 1815, 3630, 5],
			[10105, 8080, 3030, 6060, 6], // Level 10
			[16870, 13500, 5060, 10125, 7],
			[28175, 22540, 8455, 16905, 9],
			[47055, 37645, 14115, 28230, 11],
			[78580, 62865, 23575, 47150, 13],
			[131230, 104985, 39370, 78740, 15],
			[219155, 175320, 65745, 131490, 18],
			[365985, 292790, 109795, 219590, 22],
			[611195, 488955, 183360, 366715, 27],
			[1020695, 816555, 306210, 612420, 32],
			[1704565, 1363650, 511370, 1022740, 38], // Level 20
			[2846620, 2277295, 853985, 1707970, 38],
			[4753855, 3803085, 1426155, 2852315, 38],
			[7938935, 6351150, 2381680, 4763360, 38],
			[13258025, 10606420, 3977410, 7954815, 38],
			[22140900, 17712720, 6642270, 13284540, 38] // Level 25
		];

		// Granja
		var cerealCost = [
			[0, 0, 0, 0, 0],
			[70, 90, 70, 20, 1],
			[115, 150, 115, 35, 1],
			[195, 250, 195, 55, 2],
			[325, 420, 325, 95, 2],
			[545, 700, 545, 155, 2],
			[910, 1170, 910, 260, 3],
			[1520, 1950, 1520, 435, 4],
			[2535, 3260, 2535, 725, 4],
			[4235, 5445, 4235, 1210, 5],
			[7070, 9095, 7070, 2020, 6], // Level 10
			[11810, 15185, 11810, 3375, 7],
			[19725, 25360, 19725, 5635, 9],
			[32940, 42350, 32940, 9410, 11],
			[55005, 70720, 55005, 15715, 13],
			[91860, 118105, 91860, 26245, 15],
			[153405, 197240, 153405, 43830, 18],
			[256190, 329385, 256190, 73195, 22],
			[427835, 550075, 427835, 122240, 27],
			[714485, 918625, 714485, 204140, 32],
			[1193195, 1534105, 1193195, 340915, 38], // Level 20
			[1992635, 2561960, 1992635, 569325, 38],
			[3327700, 4278470, 3327700, 950770, 38],
			[5557255, 7145045, 5557255, 1587785, 38],
			[9280620, 11932225, 9280620, 2651605, 38],
			[15498630, 19926810, 15498630, 4428180, 38] // Level 25
		];

		// Almacen
		var warehouseCost = [
			[0, 0, 0, 0, 0],
			[130, 160, 90, 40, 1],
			[165, 205, 115, 50, 1],
			[215, 260, 145, 65, 2],
			[275, 335, 190, 85, 2],
			[350, 430, 240, 105, 2],
			[445, 550, 310, 135, 3],
			[570, 705, 395, 175, 4],
			[730, 900, 505, 225, 4],
			[935, 1155, 650, 290, 5],
			[1200, 1475, 830, 370, 6], // Level 10
			[1535, 1890, 1065, 470, 7],
			[1965, 2420, 1360, 605, 9],
			[2515, 3095, 1740, 775, 11],
			[3220, 3960, 2230, 990, 13],
			[4120, 5070, 2850, 1270, 15],
			[5275, 6490, 3650, 1625, 18],
			[6750, 8310, 4675, 2075, 22],
			[8640, 10635, 5980, 2660, 27],
			[11060, 13610, 7655, 3405, 32],
			[14155, 17420, 9800, 4355, 38] // Level 20
		];

		// Academia
		var academyCost = [
			[0, 0, 0, 0, 0],
			[220, 160, 90, 40, 5],
			[280, 205, 115, 50, 6],
			[360, 260, 145, 65, 7],
			[460, 335, 190, 85, 8],
			[590, 430, 240, 105, 10],
			[755, 550, 310, 135, 12],
			[970, 705, 395, 175, 14],
			[1240, 900, 505, 225, 17],
			[1585, 1155, 650, 290, 21],
			[2030, 1475, 830, 370, 25], // Level 10
			[2595, 1890, 1065, 470, 30],
			[3325, 2420, 1360, 605, 36],
			[4255, 3095, 1740, 775, 43],
			[5445, 3960, 2230, 990, 51],
			[6970, 5070, 2850, 1270, 62],
			[8925, 6490, 3650, 1625, 74],
			[11425, 8310, 4675, 2075, 89],
			[14620, 10635, 5980, 2660, 106],
			[18715, 13610, 7655, 3405, 128],
			[23955, 17420, 9800, 4355, 153] // Level 20
		];

		// Molino
		var flourMillCost = [
			[0, 0, 0, 0, 0], // Level 0
			[500, 440, 380, 1240, 1],
			[900, 790, 685, 2230, 1],
			[1620, 1425, 1230, 4020, 2],
			[2915, 2565, 2215, 7230, 2],
			[5250, 4620, 3990, 13015, 2] // Level 5
		];

		// Ladrillar
		var brickyardCost = [
			[0, 0, 0, 0, 0],
			[440, 480, 320, 50, 1],
			[790, 865, 575, 90, 1],
			[1425, 1555, 1035, 160, 2],
			[2565, 2800, 1865, 290, 2],
			[4620, 5040, 3360, 525, 2] // Level 5
		];

		// Serreria
		var sawmillCost = [
			[0, 0, 0, 0, 0],
			[520, 380, 290, 90, 1],
			[935, 685, 520, 160, 1],
			[1685, 1230, 940, 290, 2],
			[3035, 2215, 1690, 525, 2],
			[5460, 3990, 3045, 945, 2] // Level 5
		];

		// Fundicion de hierro
		var ironFoundryCost = [
			[0, 0, 0, 0, 0],
			[200, 450, 510, 120, 1],
			[360, 810, 920, 215, 1],
			[650, 1460, 1650, 390, 2],
			[1165, 2625, 2975, 700, 2],
			[2100, 4725, 5355, 1260, 2] // Level 5
		];

		// Panaderia
		var bakeryCost = [
			[0, 0, 0, 0, 0],
			[1200, 1480, 870, 1600, 1],
			[2160, 2665, 1565, 2880, 1],
			[3890, 4795, 2820, 5185, 2],
			[7000, 8630, 5075, 9330, 2],
			[12595, 15535, 9135, 16795, 2] // Level 5
		];

		// Mercado
		var marketplaceCost = [
			[0, 0, 0, 0, 0],
			[80, 70, 120, 70, 4],
			[100, 90, 155, 90, 4],
			[130, 115, 195, 115, 5],
			[170, 145, 250, 145, 6],
			[215, 190, 320, 190, 7],
			[275, 240, 410, 240, 9],
			[350, 310, 530, 310, 11],
			[450, 395, 675, 395, 13],
			[575, 505, 865, 505, 15],
			[740, 645, 1105, 645, 19], // Level 10
			[945, 825, 1415, 825, 22],
			[1210, 1060, 815, 1060, 27],
			[1545, 1355, 2320, 1355, 32],
			[1980, 1735, 2970, 1735, 39],
			[2535, 2220, 3805, 2220, 46],
			[3245, 2840, 4870, 2840, 55],
			[4155, 3635, 6230, 3635, 67],
			[5315, 4650, 7975, 4650, 80],
			[6805, 5955, 10210, 5955, 96],
			[8710, 7620, 13065, 7620, 115] // Level 20
		];

		// Granero
		var granaryCost = [
			[0, 0, 0, 0, 0],
			[80, 100, 70, 20, 1],
			[100, 130, 90, 25, 1],
			[130, 165, 115, 35, 2],
			[170, 210, 145, 40, 2],
			[215, 270, 190, 55, 2],
			[275, 345, 240, 70, 3],
			[350, 440, 310, 90, 4],
			[450, 565, 395, 115, 4],
			[575, 720, 505, 145, 5],
			[740, 920, 645, 185, 6], // Level 10
			[945, 1180, 825, 235, 7],
			[1210, 1510, 1060, 300, 9],
			[1545, 1935, 1355, 385, 11],
			[1980, 2475, 1735, 495, 13],
			[2535, 3170, 2220, 635, 15],
			[3245, 4055, 2840, 810, 18],
			[4155, 5190, 3635, 1040, 22],
			[5315, 6645, 4650, 1330, 27],
			[6805, 8505, 5955, 1700, 32],
			[8710, 10890, 7620, 2180, 38] // Level 20
		];

		// Armeria
		var blacksmithCost = [
			[0, 0, 0, 0, 0],
			[170, 200, 380, 130, 2],
			[220, 255, 485, 165, 3],
			[280, 330, 625, 215, 3],
			[355, 420, 795, 275, 4],
			[455, 535, 1020, 350, 5],
			[585, 685, 1305, 445, 6],
			[750, 880, 1670, 570, 7],
			[955, 1125, 2140, 730, 9],
			[1225, 1440, 2740, 935, 10],
			[1570, 1845, 3505, 1200, 12], // Level 10
			[2005, 2360, 4485, 1535, 15],
			[2570, 3020, 5740, 1965, 18],
			[3290, 3870, 7350, 2515, 21],
			[4210, 4950, 9410, 3220, 26],
			[5390, 6340, 12045, 4120, 31],
			[6895, 8115, 15415, 5275, 37],
			[8825, 10385, 19730, 6750, 44],
			[11300, 13290, 25255, 8640, 53],
			[14460, 17015, 32325, 11060, 64],
			[18510, 21780, 41380, 14155, 77] // Level 20
		];

		// Armamentaria
		var armouryCost = [
			[0, 0, 0, 0, 0],
			[130, 210, 410, 130, 2],
			[165, 270, 525, 165, 3],
			[215, 345, 670, 215, 3],
			[275, 440, 860, 275, 4],
			[350, 565, 1100, 350, 5],
			[445, 720, 1410, 445, 6],
			[570, 925, 1805, 570, 7],
			[730, 1180, 2310, 730, 9],
			[935, 1515, 2955, 935, 10],
			[1200, 1935, 3780, 1200, 12], // Level 10
			[1535, 2480, 4840, 1535, 15],
			[1965, 3175, 6195, 1965, 18],
			[2515, 4060, 7930, 2515, 21],
			[3220, 5200, 10150, 3220, 26],
			[4120, 6655, 12995, 4120, 31],
			[5275, 8520, 16630, 5275, 37],
			[6750, 10905, 21290, 6750, 44],
			[8640, 13955, 27250, 8640, 53],
			[11060, 17865, 34880, 11060, 64],
			[14155, 22865, 44645, 14155, 77] // Level 20
		];

		// Edificio principal
		var mainBuildingCost = [
			[0, 0, 0, 0, 0],
			[70, 40, 60, 20, 2],
			[90, 50, 75, 25, 3],
			[115, 65, 100, 35, 3],
			[145, 85, 125, 40, 4],
			[190, 105, 160, 55, 5],
			[240, 135, 205, 70, 6],
			[310, 175, 265, 90, 7],
			[395, 225, 340, 115, 9],
			[505, 290, 430, 145, 10],
			[645, 370, 555, 185, 12], // Level 10
			[825, 470, 710, 235, 15],
			[1060, 605, 905, 300, 18],
			[1355, 775, 1160, 385, 21],
			[1735, 990, 1485, 495, 26],
			[2220, 1270, 1900, 635, 31],
			[2840, 1625, 2435, 810, 37],
			[3635, 2075, 3115, 1040, 44],
			[4650, 2660, 3990, 1330, 53],
			[5955, 3405, 5105, 1700, 64],
			[7620, 4355, 6535, 2180, 77] // Level 20
		];

		// Plaza de reuniones
		var rallyPointCost = [
			[0, 0, 0, 0, 0],
			[110, 160, 90, 70, 1],
			[140, 205, 115, 90, 1],
			[180, 260, 145, 115, 2],
			[230, 335, 190, 145, 2],
			[295, 430, 240, 190, 2],
			[380, 550, 310, 240, 3],
			[485, 705, 395, 310, 4],
			[620, 900, 505, 395, 4],
			[795, 1155, 650, 505, 5],
			[1015, 1475, 830, 645, 6], // Level 10
			[1300, 1890, 1065, 825, 7],
			[1660, 2420, 1360, 1060, 9],
			[2130, 3095, 1740, 1355, 11],
			[2725, 3960, 2230, 1735, 13],
			[3485, 5070, 2850, 2220, 15],
			[4460, 6490, 3650, 2840, 18],
			[5710, 8310, 4675, 3635, 22],
			[7310, 10635, 5980, 4650, 27],
			[9360, 13610, 7655, 5955, 32],
			[11980, 17420, 9800, 7620, 38] // Level 20
		];

		// Embajada
		var embassyCost = [
			[0, 0, 0, 0, 0],
			[180, 130, 150, 80, 5],
			[230, 165, 190, 100, 6],
			[295, 215, 245, 130, 7],
			[375, 275, 315, 170, 8],
			[485, 350, 405, 215, 10],
			[620, 445, 515, 275, 12],
			[790, 570, 660, 350, 14],
			[1015, 730, 845, 450, 17],
			[1295, 935, 1080, 575, 21],
			[1660, 1200, 1385, 740, 25], // Level 10
			[2125, 1535, 1770, 945, 30],
			[2720, 1965, 2265, 1210, 36],
			[3480, 2515, 2900, 1545, 43],
			[4455, 3220, 3715, 1980, 51],
			[5705, 4120, 4755, 2535, 62],
			[7300, 5275, 6085, 3245, 74],
			[9345, 6750, 7790, 4155, 89],
			[11965, 8640, 9970, 5315, 106],
			[15315, 11060, 12760, 6805, 128],
			[19600, 14155, 16335, 8710, 153] // Level 20
		];

		// Cuartel
		var barracksCost = [
			[0, 0, 0, 0, 0],
			[210, 140, 260, 120, 1],
			[270, 180, 335, 155, 1],
			[345, 230, 425, 195, 2],
			[440, 295, 545, 250, 2],
			[565, 375, 700, 320, 2],
			[720, 480, 895, 410, 3],
			[925, 615, 1145, 530, 4],
			[1180, 790, 1465, 675, 4],
			[1515, 1010, 1875, 865, 5],
			[1935, 1290, 2400, 1105, 6], // Level 10
			[2480, 1655, 3070, 1415, 7],
			[3175, 2115, 3930, 1815, 9],
			[4060, 2710, 5030, 2320, 11],
			[5200, 3465, 6435, 2970, 13],
			[6655, 4435, 8240, 3805, 15],
			[8520, 5680, 10545, 4870, 18],
			[10905, 7270, 13500, 6230, 22],
			[13955, 9305, 17280, 7975, 27],
			[17865, 11910, 22120, 10210, 32],
			[22865, 15245, 28310, 13065, 38] // Level 20
		];

		// Corral / Establo
		var stableCost = [
			[0, 0, 0, 0, 0],
			[260, 140, 220, 100, 2],
			[335, 180, 280, 130, 3],
			[425, 230, 360, 165, 3],
			[545, 295, 460, 210, 4],
			[700, 375, 590, 270, 5],
			[895, 480, 755, 345, 6],
			[1145, 615, 970, 440, 7],
			[1465, 790, 1240, 565, 9],
			[1875, 1010, 1585, 720, 10],
			[2400, 1290, 2030, 920, 12], // Level 10
			[3070, 1655, 2595, 1180, 15],
			[3930, 2115, 3325, 1510, 18],
			[5030, 2710, 4255, 1935, 21],
			[6435, 3465, 5445, 2475, 26],
			[8240, 4435, 6970, 3170, 31],
			[10545, 5680, 8925, 4055, 37],
			[13500, 7270, 11425, 5190, 44],
			[17280, 9305, 14620, 6645, 53],
			[22120, 11910, 18715, 8505, 64],
			[28310, 15245, 23955, 10890, 77] // Level 20
		];

		// Taller
		var workshopCost = [
			[0, 0, 0, 0, 0],
			[460, 510, 600, 320, 4],
			[590, 655, 770, 410, 4],
			[755, 835, 985, 525, 5],
			[965, 1070, 1260, 670, 6],
			[1235, 1370, 1610, 860, 7],
			[1580, 1750, 2060, 1100, 9],
			[2025, 2245, 2640, 1405, 11],
			[2590, 2870, 3380, 1800, 13],
			[3315, 3675, 4325, 2305, 15],
			[4245, 4705, 5535, 2950, 19], // Level 10
			[5430, 6020, 7085, 3780, 22],
			[6950, 7705, 9065, 4835, 27],
			[8900, 9865, 11605, 6190, 32],
			[11390, 12625, 14855, 7925, 39],
			[14580, 16165, 19015, 10140, 46],
			[18660, 20690, 24340, 12980, 55],
			[23885, 26480, 31155, 16615, 67],
			[30570, 33895, 39875, 21270, 80],
			[39130, 43385, 51040, 27225, 96],
			[50090, 55535, 65335, 34845, 115] // Level 20
		];

		// Escondite
		var crannyCost = [
			[0, 0, 0, 0, 0],
			[40, 50, 30, 10, 1],
			[50, 65, 40, 15, 1],
			[65, 80, 50, 15, 2],
			[85, 105, 65, 20, 2],
			[105, 135, 80, 25, 2],
			[135, 170, 105, 35, 3],
			[175, 220, 130, 45, 4],
			[225, 280, 170, 55, 4],
			[290, 360, 215, 70, 5],
			[370, 460, 275, 90, 6] // Level 10
		];

		// Ayuntamiento
		var ayuntamientoCost = [
			[0, 0, 0, 0, 0],
			[1250, 1110, 1260, 600, 6],
			[1600, 1420, 1615, 770, 7],
			[2050, 1820, 2065, 985, 9],
			[2620, 2330, 2640, 1260, 10],
			[3355, 2980, 3380, 1610, 12],
			[4295, 3815, 4330, 2060, 15],
			[5500, 4880, 5540, 2640, 18],
			[7035, 6250, 7095, 3380, 21],
			[9005, 8000, 9080, 4325, 26],
			[11530, 10240, 11620, 5535, 31], // Level 10
			[14755, 13105, 14875, 7085, 37],
			[18890, 16775, 19040, 9065, 45],
			[24180, 21470, 24370, 11605, 53],
			[30950, 27480, 31195, 14855, 64],
			[39615, 35175, 39930, 19015, 77],
			[50705, 45025, 51110, 24340, 92],
			[64905, 57635, 65425, 31155, 111],
			[83075, 73770, 83740, 39875, 133],
			[106340, 94430, 107190, 51040, 160],
			[136115, 120870, 137200, 65335, 192] // Level 20
		];

		// Residencia
		var residenceCost = [
			[0, 0, 0, 0, 0],
			[580, 460, 350, 180, 2],
			[740, 590, 450, 230, 3],
			[950, 755, 575, 295, 3],
			[1215, 965, 735, 375, 4],
			[1555, 1235, 940, 485, 5],
			[1995, 1580, 1205, 620, 6],
			[2550, 2025, 1540, 790, 7],
			[3265, 2590, 1970, 1015, 9],
			[4180, 3315, 2520, 1295, 11],
			[5350, 4245, 3230, 1660, 12], // Level 10
			[6845, 5430, 4130, 2125, 15],
			[8765, 6950, 5290, 2720, 18],
			[11220, 8900, 6770, 3480, 21],
			[14360, 11390, 8665, 4455, 26],
			[18380, 14580, 11090, 5705, 31],
			[23530, 18660, 14200, 7300, 37],
			[30115, 23885, 18175, 9345, 44],
			[38550, 30570, 23260, 11965, 53],
			[49340, 39130, 29775, 15315, 64],
			[63155, 50090, 38110, 19600, 77] // Level 20
		];

		// Palacio
		var palaceCost = [
			[0, 0, 0, 0, 0],
			[550, 800, 750, 250, 6],
			[705, 1025, 960, 320, 7],
			[900, 1310, 1230, 410, 9],
			[1155, 1680, 1575, 525, 10],
			[1475, 2145, 2015, 670, 12],
			[1890, 2750, 2575, 860, 15],
			[2420, 3520, 3300, 1100, 18],
			[3095, 4505, 4220, 1405, 21],
			[3965, 5765, 5405, 1800, 26],
			[5075, 7380, 6920, 2305, 31], // Level 10
			[6495, 9445, 8855, 2950, 37],
			[8310, 12090, 11335, 3780, 45],
			[10640, 15475, 14505, 4835, 53],
			[13615, 19805, 18570, 6190, 64],
			[17430, 25355, 23770, 7925, 77],
			[22310, 32450, 30425, 10140, 92],
			[28560, 41540, 38940, 12980, 111],
			[36555, 53170, 49845, 16615, 133],
			[46790, 68055, 63805, 21270, 160],
			[59890, 87110, 81670, 27225, 192] // Level 20
		];

		// Plaza de torneos
		var tournamentSquareCost = [
			[0, 0, 0, 0, 0],
			[1750, 2250, 1530, 240, 1],
			[2240, 2880, 1960, 305, 1],
			[2865, 3685, 2505, 395, 2],
			[3670, 4720, 3210, 505, 2],
			[4700, 6040, 4105, 645, 2],
			[6015, 7730, 5255, 825, 3],
			[7695, 9895, 6730, 1055, 4],
			[9850, 12665, 8615, 1350, 4],
			[12610, 16215, 11025, 1730, 5],
			[16140, 20755, 14110, 2215, 6], // Level 10
			[20660, 26565, 18065, 2835, 7],
			[26445, 34000, 23120, 3625, 9],
			[33850, 43520, 29595, 4640, 11],
			[43330, 55705, 37880, 5940, 13],
			[55460, 71305, 48490, 7605, 15],
			[70990, 91270, 62065, 9735, 18],
			[90865, 116825, 79440, 12460, 22],
			[116000, 150000, 102000, 15950, 27],
			[149000, 191000, 130000, 20415, 32],
			[190560, 245005, 166600, 26135, 38] // Level 20
		];

		// Tesoro
		var tesoroCost = [
			[0, 0, 0, 0, 0],
			[2880, 2740, 2580, 990, 10],
			[3685, 3505, 3300, 1265, 12],
			[4720, 4490, 4225, 1620, 14],
			[6040, 5745, 5410, 2075, 17],
			[7730, 7355, 6925, 2660, 20],
			[9895, 9415, 8865, 3400, 24],
			[12665, 12050, 11345, 4355, 29],
			[16215, 15425, 14525, 5575, 34],
			[20755, 19745, 18590, 7135, 41],
			[26565, 25270, 23795, 9130, 50] // Level 10
		];

		// Oficina de comercio
		var oficinaComercioCost = [
			[0, 0, 0, 0, 0],
			[1400, 1330, 1200, 400, 4],
			[1790, 1700, 1535, 510, 4],
			[2295, 2180, 1965, 655, 5],
			[2935, 2790, 2515, 840, 6],
			[3760, 3570, 3220, 1075, 7],
			[4810, 4570, 4125, 1375, 9],
			[6155, 5850, 5280, 1760, 11],
			[7880, 7485, 6755, 2250, 13],
			[10090, 9585, 8645, 2880, 15],
			[12915, 12265, 11070, 3690, 19], // Level 10
			[16530, 15700, 14165, 4720, 22],
			[21155, 20100, 18135, 6045, 27],
			[27080, 25725, 23210, 7735, 32],
			[34660, 32930, 29710, 9905, 39],
			[44370, 42150, 38030, 12675, 46],
			[56790, 53950, 48680, 16225, 55],
			[72690, 69060, 62310, 20770, 67],
			[93045, 88395, 79755, 26585, 80],
			[119100, 113145, 102085, 34030, 96],
			[152445, 144825, 130670, 43555, 115] // Level 20
		];

		// Cuartel grande
		var greatBarrackCost = [
			[0, 0, 0, 0, 0],
			[630, 420, 780, 360, 1],
			[805, 540, 1000, 460, 1],
			[1030, 690, 1280, 590, 2],
			[1320, 880, 1635, 755, 2],
			[1690, 1125, 2095, 965, 2],
			[2165, 1445, 2680, 1235, 3],
			[2770, 1845, 3430, 1585, 4],
			[3545, 2365, 4390, 2025, 4],
			[4540, 3025, 5620, 2595, 5],
			[5810, 3875, 7195, 3320, 6], // Level 10
			[7440, 4960, 9210, 4250, 7],
			[9520, 6345, 11785, 5440, 9],
			[12185, 8125, 15085, 6965, 11],
			[15600, 10400, 19310, 8915, 13],
			[19965, 13310, 24720, 11410, 15],
			[25555, 17035, 31640, 14605, 18],
			[32710, 21810, 40500, 18690, 22],
			[41870, 27915, 51840, 23925, 27],
			[53595, 35730, 66355, 30625, 32],
			[68600, 45735, 84935, 39200, 38] // Level 20
		];

		// Corral / Establo grande
		var greatStableCost = [
			[0, 0, 0, 0, 0],
			[780, 420, 660, 300, 2],
			[1000, 540, 845, 385, 3],
			[1280, 690, 1080, 490, 3],
			[1635, 880, 1385, 630, 4],
			[2095, 1125, 1770, 805, 5],
			[2680, 1445, 2270, 1030, 6],
			[3430, 1845, 2905, 1320, 7],
			[4390, 2365, 3715, 1690, 9],
			[5620, 3025, 4755, 2160, 10],
			[7195, 3875, 6085, 2765, 12], // Level 10
			[9210, 4960, 7790, 3540, 15],
			[11785, 6345, 9975, 4535, 18],
			[15085, 8125, 12765, 5805, 21],
			[19310, 10400, 16340, 7430, 26],
			[24720, 13310, 20915, 9505, 31],
			[31640, 17035, 26775, 12170, 37],
			[40500, 21810, 34270, 15575, 44],
			[51840, 27915, 43865, 19940, 53],
			[66355, 35730, 56145, 25520, 64],
			[84935, 45735, 71870, 32665, 77] // Level 20
		];

		// Muralla
		var wallRomansCost = [
			[0, 0, 0, 0, 0],
			[70, 90, 170, 70, 1],
			[90, 115, 220, 90, 1],
			[115, 145, 280, 115, 2],
			[145, 190, 355, 145, 2],
			[190, 240, 455, 190, 2],
			[240, 310, 585, 240, 3],
			[310, 395, 750, 310, 4],
			[395, 505, 955, 395, 4],
			[505, 650, 1225, 505, 5],
			[645, 830, 1570, 645, 6], // Level 10
			[825, 1065, 2005, 825, 7],
			[1060, 1360, 2570, 1060, 9],
			[1355, 1740, 3290, 1355, 11],
			[1735, 2230, 4210, 1735, 13],
			[2220, 2850, 5390, 2220, 15],
			[2840, 3650, 6895, 2840, 18],
			[3635, 4675, 8825, 3635, 22],
			[4650, 5980, 11300, 4650, 27],
			[5955, 7655, 14460, 5955, 32],
			[7620, 9800, 18510, 7620, 38] // Level 20
		];

		// Empalizada
		var wallGaulsCost = [
			[0, 0, 0, 0, 0],
			[160, 100, 80, 60, 1],
			[205, 130, 100, 75, 1],
			[260, 165, 130, 100, 2],
			[335, 210, 170, 125, 2],
			[430, 270, 215, 160, 2],
			[550, 345, 275, 205, 3],
			[705, 440, 350, 265, 4],
			[900, 565, 450, 340, 4],
			[1155, 720, 575, 430, 5],
			[1475, 920, 740, 555, 6], // Level 10
			[1890, 1180, 945, 710, 7],
			[2420, 1510, 1210, 905, 9],
			[3095, 1935, 1545, 1160, 11],
			[3960, 2475, 1980, 1485, 13],
			[5070, 3170, 2535, 1900, 15],
			[6490, 4055, 3245, 2435, 18],
			[8310, 5190, 4155, 3115, 22],
			[10635, 6645, 5315, 3990, 27],
			[13610, 8505, 6805, 5105, 32],
			[17420, 10890, 8710, 6535, 38] // Level 20
		];

		// Terraplen
		var wallTeutonsCost = [
			[0, 0, 0, 0, 0],
			[120, 200, 0, 80, 1],
			[155, 255, 0, 100, 1],
			[195, 330, 0, 130, 2],
			[250, 420, 0, 170, 2],
			[320, 535, 0, 215, 2],
			[410, 685, 0, 275, 3],
			[530, 880, 0, 350, 4],
			[675, 1125, 0, 450, 4],
			[865, 1440, 0, 575, 5],
			[1105, 1845, 0, 740, 6], // Level 10
			[1415, 2360, 0, 945, 7],
			[1815, 3020, 0, 1210, 9],
			[2320, 3870, 0, 1545, 11],
			[2970, 4950, 0, 1980, 13],
			[3805, 6340, 0, 2535, 15],
			[4870, 8115, 0, 3245, 18],
			[6230, 10385, 0, 4155, 22],
			[7975, 13290, 0, 5315, 27],
			[10210, 17015, 0, 6805, 32],
			[13065, 21780, 0, 8710, 38] // Level 20
		];

		var cerveceriaCost = [
			[0, 0, 0, 0, 0],
			[1200, 1400, 1050, 2200, 1],
			[1535, 1790, 1345, 2815, 1],
			[1965, 2295, 1720, 3605, 2],
			[2515, 2935, 2200, 4615, 2],
			[3220, 3760, 2820, 5905, 2],
			[4125, 4810, 3610, 7560, 3],
			[5280, 6155, 4620, 9675, 4],
			[6755, 7880, 5910, 12385, 4],
			[8645, 10090, 7565, 15855, 5],
			[11070, 12915, 9685, 20290, 6], // Level 10
			[14165, 16530, 12395, 25975, 7],
			[18135, 21155, 15865, 33245, 9],
			[23210, 27080, 20310, 42555, 11],
			[29710, 34660, 25995, 54470, 13],
			[38030, 44370, 33275, 69720, 15],
			[48680, 56790, 42595, 89245, 18],
			[62310, 72690, 54520, 114230, 22],
			[79755, 93045, 69785, 146215, 27],
			[102085, 119100, 89325, 187155, 32],
			[130670, 152445, 114335, 239560, 38] // Level 20
		];

		var casaHeroeCost = [
			[0, 0, 0, 0, 0],
			[700, 670, 700, 240, 1],
			[930, 890, 930, 320, 1],
			[1240, 1185, 1240, 425, 2],
			[1645, 1575, 1645, 565, 2],
			[2190, 2095, 2190, 750, 2],
			[2915, 2790, 2915, 1000, 3],
			[3875, 3710, 3875, 1330, 4],
			[5155, 4930, 5155, 1765, 4],
			[6855, 6560, 6855, 2350, 5],
			[9115, 8725, 9115, 3125, 6], // Level 10
			[12125, 11605, 12125, 4155, 7],
			[16125, 15435, 16125, 5530, 9],
			[21445, 20525, 21445, 7350, 11],
			[28520, 27300, 28520, 9780, 13],
			[37935, 36310, 37935, 13005, 15],
			[50450, 48290, 50450, 17300, 18],
			[67100, 64225, 67100, 23005, 22],
			[89245, 85420, 89245, 30600, 27],
			[118695, 113605, 118695, 40695, 32],
			[157865, 151095, 157865, 54125, 37] // Level 20
		];

		var trampaCost = [
			[0, 0, 0, 0, 0],
			[100, 100, 100, 100, 1],
			[130, 130, 130, 130, 1],
			[165, 165, 165, 165, 2],
			[210, 210, 210, 210, 2],
			[270, 270, 270, 270, 2],
			[345, 345, 345, 345, 3],
			[440, 440, 440, 440, 4],
			[565, 565, 565, 565, 4],
			[720, 720, 720, 720, 5],
			[920, 920, 920, 920, 6], // Level 10
			[1180, 1180, 1180, 1180, 7],
			[1510, 1510, 1510, 1510, 9],
			[1935, 1935, 1935, 1935, 11],
			[2475, 2475, 2475, 2475, 13],
			[3170, 3170, 3170, 3170, 15],
			[4055, 4055, 4055, 4055, 18],
			[5190, 5190, 5190, 5190, 22],
			[6645, 6645, 6645, 6645, 27],
			[8505, 8505, 8505, 8505, 32],
			[10890, 10890, 10890, 10890, 38] // Level 20
		];

		var canteroCost = [
			[0, 0, 0, 0, 0],
			[155, 130, 125, 70, 1],
			[200, 165, 160, 90, 1],
			[255, 215, 205, 115, 2],
			[325, 275, 260, 145, 2],
			[415, 350, 335, 190, 2],
			[535, 445, 430, 240, 3],
			[680, 570, 550, 310, 4],
			[875, 730, 705, 395, 4],
			[1115, 935, 900, 505, 5],
			[1430, 1200, 1155, 645, 6], // Level 10
			[1830, 1535, 1475, 825, 7],
			[2340, 1965, 1890, 1060, 9],
			[3000, 2515, 2420, 1355, 11],
			[3840, 3220, 3095, 1735, 13],
			[4910, 4120, 3960, 2220, 15],
			[6290, 5275, 5070, 2840, 18],
			[8050, 6750, 6490, 3635, 22],
			[10300, 8640, 8310, 4650, 27],
			[13185, 11060, 10635, 5955, 32],
			[16880, 14155, 13610, 7620, 38] // Level 20
		];

		var greatWarehouseCost = [
			[0, 0, 0, 0, 0, 0],
			[650, 800, 450, 200, 1],
			[830, 1025, 575, 255, 1],
			[1065, 1310, 735, 330, 2],
			[1365, 1680, 945, 420, 2],
			[1745, 2145, 1210, 535, 2],
			[2235, 2750, 1545, 685, 3],
			[2860, 3520, 1980, 880, 4],
			[3660, 4505, 2535, 1125, 4],
			[4685, 5765, 3245, 1440, 5],
			[5995, 7380, 4150, 1845, 6], // Level 10
			[7675, 9445, 5315, 2360, 7],
			[9825, 12090, 6800, 3020, 9],
			[12575, 15475, 8705, 3870, 11],
			[16095, 19805, 11140, 4950, 13],
			[20600, 25355, 14260, 6340, 15],
			[26365, 32450, 18255, 8115, 18],
			[33750, 41540, 23365, 10385, 22],
			[43200, 53170, 29910, 13290, 27],
			[55295, 68055, 38280, 17015, 32],
			[70780, 87110, 49000, 21780, 38] // Level 20
		];

		var greatGranaryCost = [
			[0, 0, 0, 0, 0],
			[400, 500, 350, 100, 1],
			[510, 640, 450, 130, 1],
			[655, 820, 575, 165, 2],
			[840, 1050, 735, 210, 2],
			[1075, 1340, 940, 270, 2],
			[1375, 1720, 1205, 345, 3],
			[1760, 2200, 1540, 440, 4],
			[2250, 2815, 1970, 565, 4],
			[2880, 3605, 2520, 720, 5],
			[3690, 4610, 3230, 920, 6], // Level 10
			[4720, 5905, 4130, 1180, 7],
			[6045, 7555, 5290, 1510, 9],
			[7735, 9670, 6770, 1935, 11],
			[9905, 12380, 8665, 2475, 13],
			[12675, 15845, 11090, 3170, 15],
			[16225, 20280, 14200, 4055, 18],
			[20770, 25960, 18175, 5190, 22],
			[26585, 33230, 23260, 6645, 27],
			[34030, 42535, 29775, 8505, 32],
			[43555, 54445, 38110, 10890, 38] // Level 20
		];

//		var maravillaCost = [
//				[0, 0, 0, 0],
//				[49800, 52700, 54800, 4400],
//				[50695, 53650, 55785, 4480],
//				[51610, 54615, 56790, 4560],
//				[52540, 55595, 57815, 4640],
//				[53485, 56600, 58855, 4725], // Nivel 5
//				[54445, 57615, 59915, 4810],
//				[55425, 58655, 60990, 4895],
//				[56425, 59710, 62090, 4985],
//				[57440, 60785, 63205, 5075],
//				[58475, 61880, 64345, 5165], // Nivel 10
//				[59525, 62990, 65505, 5260],
//				[60600, 64125, 66680, 5355],
//				[61690, 65280, 67880, 5450],
//				[62800, 66455, 69105, 5550],
//				[63930, 67650, 70350, 5650], // Nivel 15
//				[65080, 68870, 71615, 5750], // Interpolado
//				[66250, 70110, 72905, 5855],
//				[67445, 71370, 74215, 5960],
//				[68660, 72655, 75550, 6065],
//				[69895, 73965, 76910, 6175], // Nivel 20
//				[71150, 75295, 78295, 6285],
//				[72430, 76650, 79705, 6400],
//				[73735, 78030, 81140, 6515],
//				[75065, 79435, 82600, 6630],
//				[76415, 80865, 84085, 6750], // Nivel 25
//				[77790, 82320, 85600, 6875],
//				[79190, 83800, 87140, 6995],
//				[80615, 85310, 88710, 7125],
//				[82065, 86845, 90305, 7250],
//				[83545, 88410, 91930, 7380], // Nivel 30
//				[85050, 90000, 93585, 7515],
//				[86580, 91620, 95270, 7650],
//				[88135, 93270, 96985, 7785],
//				[89725, 94950, 98730, 7925],
//				[91340, 96655, 101000, 8070], // Nivel 35
//				[92985, 98395, 102000, 8215],
//				[94655, 100000, 104000, 8365],
//				[96360, 102000, 106000, 8515],
//				[98095, 104000, 108000, 8665],
//				[99860, 106000, 110000, 8825], // Nivel 40
//				[102000, 108000, 112000, 8980],
//				[103000, 110000, 114000, 9145],
//				[105000, 111000, 116000, 9310],
//				[107000, 113000, 118000, 9475],
//				[109000, 116000, 120000, 9645], // Nivel 45
//				[111000, 118000, 122000, 9820],
//				[113000, 120000, 125000, 9995],
//				[115000, 122000, 127000, 10175],
//				[117000, 124000, 129000, 10360],
//				[119000, 126000, 131000, 10545], // Nivel 50
//				[122000, 129000, 134000, 10735],
//				[124000, 131000, 136000, 10930],
//				[126000, 133000, 139000, 11125],
//				[128000, 136000, 141000, 11325],
//				[131000, 138000, 144000, 11530], // Nivel 55
//				[133000, 141000, 146000, 11740],
//				[135000, 143000, 149000, 11950],
//				[138000, 146000, 151000, 12165],
//				[140000, 148000, 154000, 12385],
//				[143000, 151000, 157000, 12605], // Nivel 60
//				[145000, 154000, 160000, 12835],
//				[148000, 156000, 163000, 13065],
//				[151000, 159000, 166000, 13300],
//				[153000, 162000, 169000, 13540],
//				[156000, 165000, 172000, 13780], // Nivel 65
//				[159000, 168000, 175000, 14030],
//				[162000, 171000, 178000, 14285],
//				[165000, 174000, 181000, 14540],
//				[168000, 177000, 184000, 14800],
//				[171000, 180000, 188000, 15070], // Nivel 70
//				[174000, 184000, 191000, 15340],
//				[177000, 187000, 194000, 15615],
//				[180000, 190000, 198000, 15895],
//				[183000, 194000, 202000, 16180],
//				[186000, 197000, 205000, 16475], // Nivel 75
//				[190000, 201000, 209000, 16770],
//				[193000, 204000, 213000, 17070],
//				[197000, 208000, 216000, 17380],
//				[200000, 212000, 220000, 17690],
//				[204000, 216000, 224000, 18010], // Nivel 80
//				[208000, 220000, 228000, 18335],
//				[211000, 224000, 232000, 18665],
//				[215000, 228000, 237000, 19000],
//				[219000, 232000, 241000, 19345],
//				[223000, 236000, 245000, 19690], // Nivel 85
//				[227000, 240000, 250000, 20045],
//				[231000, 244000, 254000, 20405],
//				[235000, 249000, 259000, 20775],
//				[239000, 253000, 263000, 21145],
//				[244000, 258000, 268000, 21530], // Nivel 90
//				[248000, 262000, 273000, 21915],
//				[253000, 267000, 278000, 22310],
//				[257000, 272000, 283000, 22710],
//				[262000, 277000, 288000, 23120],
//				[266000, 282000, 293000, 23535], // Nivel 95
//				[271000, 287000, 298000, 23960],
//				[276000, 292000, 304000, 24390],
//				[281000, 297000, 309000, 24830],
//				[286000, 303000, 315000, 25280],
//				[291000, 308000, 320000, 25735], // Nivel 100
//		];
		var maravillaCost = [
			[0, 0, 0, 0, 0],
			[66700, 69050, 72200, 13200, 0],
			[68535, 70950, 74185, 13565, 0],
			[70420, 72900, 76225, 13935, 0],
			[72355, 74905, 78320, 14320, 0],
			[74345, 76965, 80475, 14715, 0],
			[76390, 79080, 82690, 15120, 0],
			[78490, 81255, 84965, 15535, 0],
			[80650, 83490, 87300, 15960, 0],
			[82865, 85785, 89700, 16400, 0],
			[85145, 88145, 92165, 16850, 0], // Nivel 10
			[87485, 90570, 94700, 17315, 0],
			[89895, 93060, 97305, 17790, 0],
			[92365, 95620, 99980, 18280, 0],
			[94905, 98250, 102730, 18780, 0],
			[97515, 100950, 105555, 19300, 0],
			[100195, 103725, 108460, 19830, 0],
			[102950, 106580, 111440, 20375, 0],
			[105785, 109510, 114505, 20935, 0],
			[108690, 112520, 117655, 21510, 0],
			[111680, 115615, 120890, 22100, 0], // Nivel 20
			[114755, 118795, 124215, 22710, 0],
			[117910, 122060, 127630, 23335, 0],
			[121150, 125420, 131140, 23975, 0],
			[124480, 128870, 134745, 24635, 0],
			[127905, 132410, 138455, 25315, 0],
			[131425, 136055, 142260, 26010, 0],
			[135035, 139795, 146170, 26725, 0],
			[138750, 143640, 150190, 27460, 0],
			[142565, 147590, 154320, 28215, 0],
			[146485, 151650, 158565, 28990, 0], // Nivel 30
			[150515, 155820, 162925, 29785, 0],
			[154655, 160105, 167405, 30605, 0],
			[158910, 164505, 172010, 31450, 0],
			[163275, 169030, 176740, 32315, 0],
			[167770, 173680, 181600, 33200, 0],
			[172380, 178455, 186595, 34115, 0],
			[177120, 183360, 191725, 35055, 0],
			[181995, 188405, 197000, 36015, 0],
			[186995, 193585, 202415, 37005, 0],
			[192140, 198910, 207985, 38025, 0], // Nivel 40
			[197425, 204380, 213705, 39070, 0],
			[202855, 210000, 219580, 40145, 0],
			[208430, 215775, 225620, 41250, 0],
			[214165, 221710, 231825, 42385, 0],
			[220055, 227805, 238200, 43550, 0],
			[226105, 234070, 244750, 44745, 0],
			[232320, 240505, 251480, 45975, 0],
			[238710, 247120, 258395, 47240, 0],
			[245275, 253915, 265500, 48540, 0],
			[252020, 260900, 272800, 49875, 0], // Nivel 50
			[258950, 268075, 280305, 51245, 0],
			[266070, 275445, 288010, 52655, 0],
			[273390, 283020, 295930, 54105, 0],
			[280905, 290805, 304070, 55590, 0],
			[288630, 298800, 312430, 57120, 0],
			[296570, 307020, 321025, 58690, 0],
			[304725, 315460, 329850, 60305, 0],
			[313105, 324135, 338925, 61965, 0],
			[321715, 333050, 348245, 63670, 0],
			[330565, 342210, 357820, 65420, 0], // Nivel 60
			[339655, 351620, 367660, 67220, 0],
			[348995, 361290, 377770, 69065, 0],
			[358590, 371225, 388160, 70965, 0],
			[368450, 381435, 398835, 72915, 0],
			[378585, 391925, 409800, 74920, 0],
			[388995, 402700, 421070, 76985, 0],
			[399695, 413775, 432650, 79100, 0],
			[410685, 425155, 444550, 81275, 0],
			[421980, 436845, 456775, 83510, 0],
			[433585, 448860, 469335, 85805, 0], // Nivel 70
			[445505, 461205, 482240, 88165, 0],
			[457760, 473885, 495505, 90590, 0],
			[470345, 486920, 509130, 93080, 0],
			[483280, 500310, 523130, 95640, 0],
			[496570, 514065, 537520, 98270, 0],
			[510225, 528205, 552300, 100975, 0],
			[524260, 542730, 567490, 103750, 0],
			[538675, 557655, 583095, 106605, 0],
			[553490, 572990, 599130, 109535, 0],
			[568710, 588745, 615605, 112550, 0], // Nivel 80
			[584350, 604935, 632535, 115645, 0],
			[600420, 621575, 649930, 118825, 0],
			[616930, 638665, 667800, 122090, 0],
			[633895, 656230, 686165, 125450, 0],
			[651330, 674275, 705035, 128900, 0],
			[669240, 692820, 724425, 132445, 0],
			[687645, 711870, 744345, 136085, 0],
			[706555, 731445, 764815, 139830, 0],
			[725985, 751560, 785850, 143675, 0],
			[745950, 772230, 807460, 147625, 0], // Nivel 90
			[766460, 793465, 829665, 151685, 0],
			[787540, 815285, 852480, 155855, 0],
			[809195, 837705, 875920, 160140, 0],
			[831450, 860745, 900010, 164545, 0],
			[854315, 884415, 924760, 169070, 0],
			[877810, 908735, 950190, 173720, 0],
			[901950, 933725, 976320, 178495, 0],
			[926750, 959405, 1003170, 183405, 0],
			[952235, 985785, 1030760, 188450, 0],
			[978425, 1012895, 1059105, 193630, 0] // Nivel 100
		];

		buildingCost = new Array();

		buildingCost[0] = lenyadorCost;
		buildingCost[1] = barroCost;
		buildingCost[2] = hierroCost;
		buildingCost[3] = cerealCost;

		buildingCost[5] = sawmillCost;
		buildingCost[6] = brickyardCost;
		buildingCost[7] = ironFoundryCost;
		buildingCost[8] = flourMillCost;
		buildingCost[9] = bakeryCost;
		buildingCost[10] = warehouseCost;
		buildingCost[11] = granaryCost;
		buildingCost[12] = blacksmithCost;
		buildingCost[13] = armouryCost;
		buildingCost[14] = tournamentSquareCost;
		buildingCost[15] = mainBuildingCost;
		buildingCost[16] = rallyPointCost;
		buildingCost[17] = marketplaceCost;
		buildingCost[18] = embassyCost;
		buildingCost[19] = barracksCost;
		buildingCost[20] = stableCost;
		buildingCost[21] = workshopCost;
		buildingCost[22] = academyCost;
		buildingCost[23] = crannyCost;
		buildingCost[24] = ayuntamientoCost;
		buildingCost[25] = residenceCost;
		buildingCost[26] = palaceCost;
		buildingCost[27] = tesoroCost;
		buildingCost[28] = oficinaComercioCost;
		buildingCost[29] = greatBarrackCost;
		buildingCost[30] = greatStableCost;
		buildingCost[31] = wallGaulsCost;
		buildingCost[32] = wallRomansCost;
		buildingCost[33] = wallTeutonsCost;
		buildingCost[34] = canteroCost;
		buildingCost[35] = cerveceriaCost;
		buildingCost[36] = trampaCost;
		buildingCost[37] = casaHeroeCost;
		buildingCost[38] = greatWarehouseCost;
		buildingCost[39] = greatGranaryCost;
		buildingCost[40] = maravillaCost;

	}

	function initTroopData() {
		// Costes de produccion de cada unidad y su carga
		uc = new Array();

		// Romanos
		uc[1] = [120, 100, 180, 40, 40]; // Legionario
		uc[2] = [100, 130, 160, 70, 20]; // Pretoriano
		uc[3] = [150, 160, 210, 80, 50]; // Imperano
		uc[4] = [140, 160, 20, 40, 0]; // Legati
		uc[5] = [550, 440, 320, 100, 100]; // Imperatoris
		uc[6] = [550, 640, 800, 180, 70]; // Caesaris
		uc[7] = [900, 360, 500, 70, 0]; // Carnero
		uc[8] = [950, 1350, 600, 90, 0]; // Catapulta
		uc[9] = [30750, 27200, 4500, 37500, 0]; // Senador
		uc[10] = [5800, 5300, 7200, 5500, 1600]; // Descubridor
		// Germanos
		uc[11] = [95, 75, 40, 40, 60]; // Lanzador porras
		uc[12] = [145, 70, 85, 40, 40]; // Luchador lanza
		uc[13] = [130, 120, 170, 70, 50]; // Luchador hacha
		uc[14] = [160, 100, 50, 50, 0]; // Emisario
		uc[15] = [370, 270, 290, 75, 110]; // Paladin
		uc[16] = [450, 515, 480, 80, 80]; // Caballista teutona
		uc[17] = [1000, 300, 350, 70, 0]; // Ariete
		uc[18] = [900, 1200, 600, 60, 0]; // Catapulta
		uc[19] = [35500, 26600, 25000, 27200, 0]; // Cabecilla
		uc[20] = [7200, 5500, 5800, 6500, 1600]; // Descubridor
		// Galos
		uc[21] = [100, 130, 55, 30, 30]; // Falange
		uc[22] = [140, 150, 185, 60, 45]; // Luchador espada
		uc[23] = [170, 150, 20, 40, 0]; // Batidor
		uc[24] = [350, 450, 230, 60, 75]; // Rayo
		uc[25] = [360, 330, 280, 120, 35]; // Druida
		uc[26] = [500, 620, 675, 170, 65]; // Haeduanos
		uc[27] = [950, 555, 330, 75, 0]; // Carnero
		uc[28] = [960, 1450, 630, 90, 0]; // Catapulta
		uc[29] = [30750, 45400, 31000, 37500, 0]; // Cacique
		uc[30] = [5500, 7000, 5300, 4900, 1600]; // Descubridor
		// Fauna
		uc[31] = [0, 0, 0, 0, 0]; // Rata
		uc[32] = [0, 0, 0, 0, 0]; // Aranya
		uc[33] = [0, 0, 0, 0, 0]; // Serpiente
		uc[34] = [0, 0, 0, 0, 0]; // Murcielago
		uc[35] = [0, 0, 0, 0, 0]; // Jabali
		uc[36] = [0, 0, 0, 0, 0]; // Lobo
		uc[37] = [0, 0, 0, 0, 0]; // Oso
		uc[38] = [0, 0, 0, 0, 0]; // Cocodrilo
		uc[39] = [0, 0, 0, 0, 0]; // Tigre
		uc[40] = [0, 0, 0, 0, 0]; // Elefante
		// Natares
		uc[41] = [0, 0, 0, 0, 0]; // Pikeman
		uc[42] = [0, 0, 0, 0, 0]; // Thorned warrior
		uc[43] = [0, 0, 0, 0, 0]; // Guardsman
		uc[44] = [0, 0, 0, 0, 0]; // Birds of prey
		uc[45] = [0, 0, 0, 0, 0]; // Axerider
		uc[46] = [0, 0, 0, 0, 0]; // Natarian knight
		uc[47] = [0, 0, 0, 0, 0]; // Warelephant
		uc[48] = [0, 0, 0, 0, 0]; // Ballista
		uc[49] = [0, 0, 0, 0, 0]; // Natarian emperor
		uc[50] = [0, 0, 0, 0, 0]; // Settler
		// Otra nueva raza! (demonios? ojos rojos?)
		uc[51] = [0, 0, 0, 0, 0];
		uc[52] = [0, 0, 0, 0, 0];
		uc[53] = [0, 0, 0, 0, 0];
		uc[54] = [0, 0, 0, 0, 0];
		uc[55] = [0, 0, 0, 0, 0];
		uc[56] = [0, 0, 0, 0, 0];
		uc[57] = [0, 0, 0, 0, 0];
		uc[58] = [0, 0, 0, 0, 0];
		uc[59] = [0, 0, 0, 0, 0];
		uc[60] = [0, 0, 0, 0, 0];

		uc[98] = [0, 0, 0, 0, 0]; // Trampa?
		uc[99] = [0, 0, 0, 0, 0]; // Trampa?

		//0-attack 1-lostunits 2-load 3-maxload 4-food 5-statushero 6-lostfood 7-trap 8-i 9-c
		ats = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		//0-def1 1-def2 2-lostunits 3-food 4-statushero 5-lostfood
		dts = new Array(0, 0, 0, 0, 0, 0);

		// Travian: Battle Analyse
		//0-att 1-def1 2-def2 3-lumber 4-clay 5-iron 6-crop 7-food 8-speed 9-load
		//0-攻擊 1-步防 2-騎防 3-木 4-磚 5-鋼 6-米 7-吃米 8-移動 9-負載
		romans = new Array();
		romans[0] = new Array(40, 35, 50, 120, 100, 180, 40, 1, 6, 40); // Legionnaire
		romans[1] = new Array(30, 65, 35, 100, 130, 160, 70, 1, 5, 20); // Praetorian
		romans[2] = new Array(70, 40, 25, 150, 160, 210, 80, 1, 7, 50); // Imperian
		romans[3] = new Array(0, 20, 10, 140, 160, 20, 40, 2, 16, 0); // Equites Legati
		romans[4] = new Array(120, 65, 50, 550, 440, 320, 100, 3, 14, 100); // Equites Imperatoris
		romans[5] = new Array(180, 80, 105, 550, 640, 800, 180, 4, 10, 70); // Equites Caesaris
		romans[6] = new Array(60, 30, 75, 900, 360, 500, 70, 3, 4, 0); // Battering Ram
		romans[7] = new Array(75, 60, 10, 950, 1350, 600, 90, 6, 3, 0); // Fire catapult
		romans[8] = new Array(50, 40, 30, 30750, 27200, 45000, 37500, 4, 4, 0); // Senator
		romans[9] = new Array(0, 80, 80, 5800, 5300, 7200, 5500, 1, 5, 1600); // Settler
		romans[10] = new Array(0, 0, 0, 0, 0, 0, 0, 6, 0, 0); // Hero
		romans[11] = new Array(1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0);
		romans[12] = new Array(0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0);

		teutons = new Array();
		teutons[0] = new Array(40, 20, 5, 95, 75, 40, 40, 1, 7, 60); // Clubswinger
		teutons[1] = new Array(10, 35, 60, 145, 70, 85, 40, 1, 7, 40); // Spearfighter
		teutons[2] = new Array(60, 30, 30, 130, 120, 170, 70, 1, 6, 50); // Axefighter
		teutons[3] = new Array(0, 10, 5, 160, 100, 50, 50, 1, 9, 0); // Scout
		teutons[4] = new Array(55, 100, 40, 370, 270, 290, 75, 2, 10, 110); // Paladin
		teutons[5] = new Array(150, 50, 75, 450, 515, 480, 80, 3, 9, 80); // Teuton Knight
		teutons[6] = new Array(65, 30, 80, 1000, 300, 350, 70, 3, 4, 0); // Ram
		teutons[7] = new Array(50, 60, 10, 900, 1200, 600, 60, 6, 3, 0); // Catapult
		teutons[8] = new Array(40, 60, 40, 35500, 26600, 25000, 27200, 4, 4, 0); // Chief
		teutons[9] = new Array(10, 80, 80, 7200, 5500, 5800, 6500, 1, 5, 1600); // Settler
		teutons[10] = new Array(0, 0, 0, 0, 0, 0, 0, 6, 0, 0); // Hero
		teutons[11] = new Array(1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0);
		teutons[12] = new Array(0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0);

		gauls = new Array(10);
		gauls[0] = new Array(15, 40, 50, 100, 130, 55, 30, 1, 7, 30); // Phalanx
		gauls[1] = new Array(65, 35, 20, 140, 150, 185, 60, 1, 6, 45); // Swordfighter
		gauls[2] = new Array(0, 20, 10, 170, 150, 20, 40, 2, 17, 0); // Pathfinder
		gauls[3] = new Array(90, 25, 40, 350, 450, 230, 60, 2, 19, 75); // Theutates Thunder
		gauls[4] = new Array(45, 115, 55, 360, 330, 280, 120, 2, 16, 35); // Druidrider
		gauls[5] = new Array(140, 50, 165, 500, 620, 675, 170, 3, 13, 65); // Haeduan
		gauls[6] = new Array(50, 30, 105, 950, 555, 330, 75, 3, 4, 0); // Ram
		gauls[7] = new Array(70, 45, 10, 960, 1450, 630, 90, 6, 3, 0); // Trebuchet
		gauls[8] = new Array(40, 50, 50, 30750, 45400, 31000, 37500, 4, 5, 0); // Chieftain
		gauls[9] = new Array(0, 80, 80, 5500, 7000, 5300, 4900, 1, 5, 1600); // Settler
		gauls[10] = new Array(0, 0, 0, 0, 0, 0, 0, 6, 0, 0); // Hero
		gauls[11] = new Array(1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0);
		gauls[12] = new Array(0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0);

		nature = new Array(10)
		nature[0] = new Array(10, 25, 10, 0, 0, 0, 0, 1, 20, 0); // Rat
		nature[1] = new Array(20, 35, 40, 0, 0, 0, 0, 1, 20, 0); // Spider
		nature[2] = new Array(60, 40, 60, 0, 0, 0, 0, 1, 20, 0); // Serpent
		nature[3] = new Array(80, 66, 50, 0, 0, 0, 0, 1, 20, 0); // Bat
		nature[4] = new Array(50, 70, 33, 0, 0, 0, 0, 2, 20, 0); // Wild boar
		nature[5] = new Array(100, 80, 70, 0, 0, 0, 0, 2, 20, 0); // Wolf
		nature[6] = new Array(250, 140, 200, 0, 0, 0, 0, 3, 20, 0); // Bear
		nature[7] = new Array(450, 380, 240, 0, 0, 0, 0, 3, 20, 0); // Crocodile
		nature[8] = new Array(200, 170, 250, 0, 0, 0, 0, 3, 20, 0); // Tiger
		nature[9] = new Array(600, 440, 520, 0, 0, 0, 0, 5, 20, 0); // Elephant
		// Travian: Battle Analyse
	}

	function initImagenes() {
		var imgPrefixGIF	= 'data:image/gif;base64,';
		var imgPrefixPNG	= 'data:image/png;base64,';

		var imgPrefix		= imgPrefixGIF;

		// Imagen de un sobre para enviar IGM
		imagenes["igm"] = 'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAICAYAAAAvOAWIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QsKFws6qttDxQAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAkUlEQVQY05XQTUpDQRAE4K8yz9BuPEduEH8C2Tw8haeT3CQbPZEiIeNmhLdIAvamqerqaqqDdxxwcr0mvAWv+MYHfi4I13hErXCuqmOSp9batFS11qYk26o64gzzmCXJPsl64DvskYHn1cKo995PvfdnPOBl5OjLa/PY3qEGtxm9Bh/MfwG/8Hkj4Bb3+c/rfgHKwRzhskmMfQAAAABJRU5ErkJggg==';
		// Imagen compuesta para el mercado con 3 secciones: enviar recursos, compra y venta
		imagenes["mercado"] = 'R0lGODlhRgBkAOf/AAABAAYIDhUDABgJAhAPCgQfBSEXBAAbTh8YDRsYHRcYKSsXAAQhQkcMAB0dGygcAzQYBDoeAyglFTEiDSYnERgyCzkmB0EpAAI1cSwuKiU5I10jCTs0D3cYAkMwEDs0HUkxC08wAjU5HEwyBD80HTk2KjU3OlYxAig7UEQ2MSJTAwJLiSNCYBpUIUs5Nz1APE09IVg8Dls5HFVADUhANUJHIVBCGEhBOy9WD2k7CExHIDpITUFGSWlAB1xANA9sHoI1EmdFDGRGFFVKKm87NVNFTC9ZVY42E2NNETVSdkJQYWRMGk9PTU5VNlBXK2FRH1VSRjRmOXNPEmJORlFUWHxPAGtQNHFSIXtSDWleF1RkOHFaKIRSIGBjLzOBCVlfZVljU15fXH5bHkBlk2RfWMI/CLRFD0RnjHlhHHdYVIlcEIxYIIlfBHBjN1dkeIdeGmhnTYVlCVpyPnZkPnNpMWBxVoBnOHJoXW10LmpxSIhhUZxkDHhqUWpta4hyBnJxSJRoHZloEm1wYmB0dn50KJNsJ99NBXZycIN+HoduaatvD3p3daFzIZV9DqhzEJ1+AnyFO0uEynp8eYh7W3OJTHGHXYyBOXl+gp96MHx/dnuCcLV4Do54e558RbF9I759CZCKVpqRG4mOaqiRCoGVY8iEEIqNio6XT8GHJIeaYY6RiJeRcpyZO5KSgYqSmrWaEJCVl5KjaM2SLNWTIZmcmaCehMOYSpyflpWgrZmmgpqiqsyrAOSbHaCmqN+gL5yruO6hG6mtqaa4jam1or23aqmzt928Aq22q/GsMbO1sqa6yMauuMK3l+fHA7e9v+zGAf61MbTHqrfDyrnNpvTPAbbI1rzKwMTGw7zSor/Ky77L0sLOvLzVrMrMyf3ZAtTQwsXZu8bT2s7VvMnYxczX2M3a0svY59XX087a4uzV0tze2tPqwdrm0Nfqydbk7N7o3tfo9+Xn4+Dp6+fr2ufr5ePw2d/t9Ob23+/y7uX1/fD26Pj37vb49PD7/P3//P///yH5BAEKAP8ALAAAAABGAGQAAAj+AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzpk2FknL2ctZNXbyfP891cwZLEs1e3fwpXcq0qT98RGEuxeePn9Wr/ARiZQoV1qGU6qb6s/e0qll+Z6+WReuvm0lYYcuSVTrXHlW7Y/PizUfVqtJrI5MpZVs2nVKqThEfXtx3cK9FHmHJG+xv8uR8S9NZ9pcOH7papOQZ5kyXaj5+iN1uDLMILT7EVEe/dtotFqtXjUj1U4p5sWHX/uJtnEy3stO5VPFtIxVqFzVv1EINQ6x56e7ZaLNibLx0M3HS8L7+kWrknNqzZ9SMnVJH2LjcxfwAWyxNuv7dv6dCGTNvzFiz89FJU9Z3xN2HmDMUhdUeU5iNJk8miDz3zC79NWPhebsIM1d9pAGHHIIRxcWZd03hMwwUUgTySnq7/PeMi+ZZItpclyk12mBoxQOiQyIy5eCNx3CgxiaKqLGfhf814x96r0Tj41K9TTYaWufI1xA6Sk22YVP5DKPDHkRuAkgj1FjYn3//edMMHt18V5Z7/vBVFT/9FGOlQkn5mA9Z96WzDh5qfLLJoHtg4s2LaCLZzCtOiJPXZhzqlWUyDUnpZpZKgROLHGiUUsqgmwQCyIVJomfMK4QEU5ZiTMnDKj7+aO2oUFNSLjWNKF3EMEIMWCjy6aBqOJckNbg14kcX47Bl2GTwuLesbMH1stB9bsazTR5bBBGEFG8EMYEUgg4qxijQKblLHB4IAYIFdIAyT282OjUVYtdImxCtecXThQUeBIHFEh70qogimwi6RyHG7GJLIzMg4EEVEVSSiw1/1IKPm82mgxmfeVUGi6wExVPfjfjMI4ITlMDQRitPfPKroJ6UIgQHSMywRAwBeODJBLmU04ooOszBDD753NiqWP4kQ+lBXLr3jRPDMMNJJeps8YmgqIS5CQjfcutJK1bwMosleQwjTC611ACHk8bJs09sTyXnzzmwINR2ie908U3+LS5U0o0UnpYiqCNEgiAEIJ4g44kPMkhRSCmegCJHNOxoAUUX9AR3jCqQDKPPm2NR9THTmC77lDpdiNMHBiiA8YQaQuzxqSOCBnHFG774YkYDAUyxTCKdoMIIKJXUUY4c8+AzjRMy9PBE2eps6U8vSxO0WJxilaNFLElgYIQGD8DAAQKAhxmEGJ74IosLKEjASTqcFOEJNLJg0kYqlNTDzz7f5OGBFFhAgx1qsSyqdKMX5ygIpuJlnHNwQAMrOAAFnsCvGIhBCpv41Qh0Rj8lMGAAMEiBBN4gC18gg34P0MTb0HKNGgzhCjmYQQ3Y0SpYqEYg5+iODvdWDjRIQQH+HwgBCEaAPlkE4moZnIABGIEMX0wAAULwRAwC0cQSMiIGA7gEO1yFj6dBQRCU0EINvqGl1/QiGwTpkcbKUokFwEEHskDFG2YgBFTI4o5bCNQsSsGvK4DAE3HM3R3jWIglWGAGF3hBNroxjW/AoQYsGIQ+hOGEbXBlJwQxXWbw0Y9VRGADG5jBGzwhBjvakRetwMUV9lCFCXhgADswQQ5MGEdZeOIK/JpBDCwgAF3kwxUfMIAEVuAGf9BDb6ShSjGql40ABEAAzgQAAAIAAHWswQxlMAMEAlDE3PFiD5mAhzkkMYAFLAAG2chEAgwAiCa+wQPwlEEIIvABSYTjF1b+6MEDIJCAHWCjHF2YpjOpWQx7/aMbfblKP/TBjmQcwRBl4AIMCpAFRsgCGZ+4gi6qoY1+5MMUNyCDLnBxCVpkoAQysIEHYhCDIIygBF/QRj6YQD5UBEIGEJiBDYbQBXYkNGnJSOA/nIEY14gDG9M4RyKAIANWQMILOODCJjCRiWrsCR3acEc++iGPLwBACUMhAwEQ0NITgGAR8vCoNqaQhg+MoBSoAMQMALGHLqzjKf9ASzYQKJBr9CUer4nGNszhjmqEQxuCwIEXVDABPlTDH+K0hzvC4Q552EMevfhCMeJU0AEI4AJQKAY/pLHZcIAhCsdYxASq4AtGAAMQYJj+Bnb8US+htokx7ShHNqqBDnf0oxp1wIEmZOoOZ+iBCL3IBznQ0dve5sMc1dCFTHVxA1NsVRcm+AIuvvCDH9AiH8pYhBiwYAddyEMd10DNU/aqDhwa6CnsYMc4pHFYczwXHv3oAwIksIAGUCEf7iAHObIhj3zowhKjeMUrQJENj+LDFTzggw3scIcWVMAEjwXvJaoBjwBHryzO0EV7/3GOyfwjL35hBz2skQ132EMbRYimNKVJgC9QAQDSyIc0/LAL9DzDGH7IMTy+YAdbCKETWwiAApIRDnLYAx7wYG40wLEUsiSjGCP2CVP80g+rTKMc8rjENAFQglIoYgwsmPH+NN1hjj84p8fP8MYrTNEPV8yYmtKk5iXQYQ908EDN00zAU3pxDXkI5LxxM9Bu+KEOB8yYFspAchLG4GhpvgDKq4Dzj3dBiGr04xclIACgM+AKyaLjGsPQRAak6YBF5BAfhCYIluBUVH+sWppfsKo7zhCJMQTCA9KcQHLJ0QZLEOPYdLgEPMKhDnSQQc0ZyEc+wnGNadSDKrQAQAYI5Iob/uMaOkymPw4xYwJ8uclMSEISCoEKaUZgAsHIxhfMAeVf3gLAfDbHnR1AjmtsQx71KEsCAgArfNgjHeqAi6zjVReoqLkPJbOGOWhBAzIoYxKinoEHgHCEL9ijHyCHBRn+eNAHdGTDHia4czTe8R4x02JLzuiFodMoL3+kfMYN5sc6wLFcc8jDHDyA5xjS0AELwMEUtMgEDATQAB/AQx7ZuHGej1EV6hDABGKBdfUGEhYSnQPQVceHPtYRjWtoIxz5QIcbIrGDC0jhBCcIgRBPUAY9RLkYfVCzKfLyGiYEwHRUkQcsyGEQEdXKFGq+QVHRoo9xsFiyv1DCCLAgC0YAQg2MaC0VnAFgctxCzVRgSjECYArgTOYasBCOQYxWFa/OOPQc46Q/2PGOY3A+G1CwwSzUd1Fg2IG31njH59TMA8NcLAEpwItsMHkQcjCGHzdQ8yXekxw6tUMc4TCHOS7+8QZUeH8TV/juNsDRD05WeppLWQQAwN0UdMBCqAeZNWJuPs33cSUt+HiHNchxT1VMohW6UAzkIA/3sBZMcGdEdQ4BcAjv4Sq00Av4kBA5tBkHOGPTRxaGQRZ8Ig+ooQ/v8G/0Rg7ccA/64BfJIWZ5tgz4YAImYHA+kg664G0GgQ4kg3gzhnX3pxSwkACT8Rr6cH3vAA7vYBXvFQzSl23LEG74oAvBwBDFQBwHB2jpQBa1gg/LAACLABuY0Q8A4CGMkQ5qZgIE0AeoERuYkQ2LUAxXMhr5FYajgRn4AAsAEHpwghoC0DEjMhZ0AmgJUB1MkXAgkxADuCr0BwAJ8DH+y7CDAHAIhGEPhAEASMMVhbhZC5QOv/B+D+EMrpJ+ogZoAOAASVgr9AGJfJclsOIPYTBjTCA3hpEPzkALaAQRzqCCfSEPtBAGL3ADJiAJgnEdxSEbAKAYxPEb/mCDAdCDTNENi7AMqgcRJ7cWcSJ7gwEbvFF1/hAANoIYvQEr5yAJi9ALVTYW3eAKzjBiIZKEHLMqpSiK90Fw2AMtW/IatdINnNAL5igR8qCC4oYXcBKOg4GN+PKLTpENsCBiF6EOWFaJmbExvlEVwWgcc8F6VMgZznAJyXCPFZEO0qCP4eYjxIEZ/ACQTpGBaDEa7tALsHCRHHEOy9B1NtIg8jK0GQRXKx9JK+ngCnzlEe6wDNWwRk1Rku7BD3eIPdczIOegCyk5cx+BD+cwi+pAIkdzjTpkGc+iC6aAQNohEvYwFMugGVAobvggAJvIIafmCjh5DhF4EvJADs4wi84wheEGkIGXDsswUrTQkmm5EvJwDtKgC365E8vQlgCwDMngl2ZJPSU2E/iAcEPhDErjDMt0Dd1QYll5E4nGRXl5E5q5mZzZmZ75maAZmqI5mqRZmqZ5EAEBADs=';
		// Imagen compuesta para militar con 4 secciones: plaza de reuniones, cuartel, establo / corral y taller
		imagenes["militar"] = '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';
		// Imagen de una grafica para las estadisticas
		imagenes["stat"] = 'R0lGODlhDAAKAIABAAAAAP///yH5BAEAAAEALAAAAAAMAAoAAAIVjA1wi82eFJP0RIhD1Xn77mhKIhoFADs=';

		// Imagenes de los tipos de murallas
		imagenes["empalizada"] = 'R0lGODdhSwBkAOf/ABYJAREMFBIRBCIMBxYQKiIaDS0YACQdAhk3AEAkBSEtODsnEzoqBjQuBCotJiwzHkcsAEIwADgwH0EvMS1HDEY+EyNSCFU4FVA8DktCAU48GVY8BEBFEmU3BFNBBWM7AkxGLyhhAkhMQF9ENj9bFEVPUGxLAFdPKGJRAGpKEUpTOHNJDGRTDSxyBH1HEDhsBmNUGVpTOWlPJkJiLlRbJ35OBWVXJTxuG3lWCG9cBnRWGWVbNGNkIDh/CGNiRkh9FndnDkp7KH9mD2BpWFp0LodjEmBqaYJmKV11QV9qeo5pAZhjCHtrLVN+OnZmXXxqOXJjeoNmPopuAXdtRYVzA0aSCYxoMHtrUoRyGnJzV1SMJW51ZZt6D518AIqCF7ZwAJR/DqN1G5N+IJp7H1KhGFCoAmWSQK51HF+bM6x9A4l/WJeIAnWKV2+QSoKDZZCFOZqBOX2FdJaCSKeGBlOzC4KApZGMT3+LipGFe6l/X2GxHIGTcqyLKqOPMLePDpmRZpOSc7OUFV+/FomWgcWQBJGThK2aHIqdbIeiXnavSMCbAaWOl4KqYbqhALqcO7SbW5GqdJimhqWhhJ+khaulYJimkLenQ7yjVqSkk9SkEcWtFM6qFLCofs2rMcWyOMquSKq0h567hqCyseOxBaqusd22Caq3lqi2oaCy0Leylda+DJXNbbS0o9e+Wa/Mo8fBoLXGubjIqODFTLnHsL7Io8fIi6/G2rHJxrzFxcbEsLfVjs7Hm7jSnsXHvsfQn6jawMTXyc7YstnVrc3Zwc3butjVwMXb2d3Wtc/X2dXYzsHd6sXa+dnmxtzkzNfnzcvl+d3k09Dj/drtudDq7+npu9Ts59Xp9c/s9+vl0eroxd3vx+DuztLt//HpweTs2PbqtvTqvObq5+vsz+fr4fb0lOH02tb0//7n4+bv+uDy+/3xvNz3++321vzwz+H39er16f3zxPvzy/ny3fTz6vD34Pr4wPL18fn5yvH2+fv41fz9vef+/ff68Pb7/vn7+P3//CwAAAAASwBkAAAI/gD/CRxIkKC/gwj9FVzI0GDChw0jSlzYr2I/fxYzYsx48eLDgwI5cvznsd/EkyMRekRo76O/lvPs2cOHLyFMlwdrKvynsCLDjA1NCnQps6i9mEaN8rP3bt68cU/HJRsHFanMc/b+nUPIM6RIgj4pIjx38VxNe1iLhkv61JtbbG69QXM2bNYpWsWmQg03LlxMf/PO8UxYkDDJi2C9XqT5Ep9MvkepUoXrtpyzy86aMYsVKxKbQ6ZiDSsGrTQ0bNjk8aMnr/U8eefmJayIESRJg0JtynTslKo3uJTFbWsmjhmxYMF4+QoFqU2TJm1CiRZNa1izbO3yaW/XTp441MnC/vkT/LGrw35mizp+bO9tOXGWvV1m5oxZMFe8QjFC9DxIEOiQhGKKKbQcQ0021IADTjf3xANPN8ewkksyM6m0klA+9eQPTfhgtRZf47jVjDPF0bdNfc4kxwgjiSSChn833OCfGfuBdkw34MSjI47dxAOhJKwUM05L4x2m0E4DlZQWTfb41RaJKNbHzInG6cIiGmRUocUNTcSoRZZotAEJLdncQ02PO1IjDC2hDQPNkPigd1BHO3lE1kVN5hkOiPKJI6Vx2kiDWShY0qEHGS00gcQMN1RBxqFoIOLLMe2Y6aOPvrwSiWjOvDkPY1wh6dVLM+nJFzQjzmccMbG4Io02/tCUo40ZaECqBRtxqBBEFXrQUYYeZtRyTDDCUENNPtQEQwtoxBg3GjLixUkWRgvlpFZs45Q2zDCYsRrLLLEQUw40/DjDSxMwIgCKEXs08UMPWf7QBiigsAGJL9TEIw4tmw7DDDPDnMJKL8hsJZR5t81p1jl8vZNMMbPYZQoxzWKmTTmWyTMLNO/84sAdhQwBggNbEMMGAhbcQAInPljQAgU0mAmIKcMQU1wzpgyCBx7FtMSTSQcDXZtj2Q4DDCynYFLIIJX4u83TzJQTjje8EEFEExaQMUMBeACywBX35DJCMZyYsugNL/Twwh5EUBAufaxOksUUV7wClUmihsTS/qnJAMMKJpiIIsodQ1RS34nlNIMxLWb0UAUddFgQxwNscIBEGztMEY/VFrhcRQudo9HDDbz8S0wkWcTwhByPYIPhbQ4dNQ80dcEiCimi4ELKHXHEwe3T5WxzMRst0CGIIHS0wIYFaISgRQ8/WGDGl47zGkIPZSBPBiSzBJzFDjAAIcYl7eRdGKm024UJLrggg4zud5RQyYjiaLMNO6aEwKuhhjpfxuOCKIPoyHA845FBf8cTRBUYMYtKfA8GOeDCGDyBDWpRpB/4eMq2GliJSrQPGdZ4nxGMsIVZlMMb7GCGN9jwA+TBiw5VeAEaAljAFvSgV8gThB6ap4cftCBR/nsQmQ1yIIQucOET7chKRJ4SsViYohKDGETudneHLRghDiKoxJSiVo5fhIAMvqpCFUKABAuIsQpqu0EIsFSG/40xRhTo3AxEEAMbsEAJXODCHD6RjXlEpB/vcAVzQhEJKA5iC0PYAiKHcIpK0Oxp8NlGLGZwvS1ZgAKsAMQl4UgDCsjocz8IgQX2AA03+OABKgCBDIAgBC50YQ5+4KP5BuIPZuiHEaBwxYBCE7HLEKNmzNCGNthRjkiwgh/ECAURVCABVuziHOLQRdsQ4IYRgOAUKXtB59zADnSUIxQiAEEFhFCELhjRD4H4RDfmEZaQ8IQfvFjFikLhimAcRxtb/nyaMJlBD2hgwggioFQ7AEEESFzBCeA4hzyQJYMr0KICcstCJUSRDFqMgx2xKMEDJAADHFBBCuacAyxb0Q3BMOQd79DFKhJhBkS4omL/ut+ILFMOYmQBEKmQR3bYcAMtBAEUTvhAHuTwBko8QQMicMIxQFCJUyCCEW0Ihja2QAo3eEAIrXzlHPgwB0c44hh+PFhW+kEPbah0pYyAxGVOWI5h0IMe5WigN/aVD3jEA1k/eFQLSOADK6wgBTA4ggs6kAAZyIADJNBCFcpABjZU4gA+sAEQwJDHV6bBiH14RM8Kwg+FlEMaq1gpSyEhrlh5gx7OiEMxWCEJ7cTjHveo/oc8hJFXOhwwC8c6Ri5ScIbeKuERPNUD8uiAABFUwAMoGIMRlzuHMfBBDpwohmzC4g2ZlOOsehgtMZxBj+6xwgeTaEY+XhsPcMDjG3ZVByVs+AISAIIeuRjYBc7wBULIoR2zmIHLbmCBABRgslJQQiC4cFk+cEEMcvhDKnomKme4gx6/UGmL0GAGSASjED7ARCoAMQlx5EMd94AHPBo03nqYiQ1NIAENqEGKwtGDE2FIgwkAsQ133KISM0CAAARQgRyAoQsCNqc5xQCHP3AiFeHpiUCG8Q5vBINFLgqCGUBBDUm8wsPjzQeD6gEPcIT4QVzmDjW0QYss4IEW7KDH/iHGcAYc7OEe2nhHHBqwAw2koA9dKMIcuhCINKSBD3x4gx0mcQpYrEVUxHhHFxkxPZ+2wReu7ZGIwVEPcLRDRyIesT4sHY9jcEIevdAGnMORiiV8oQZ7eMcwdnCCAcigCGDYqhLmwAVFzCEQXUDwzE4BjHDECXbEKI0rGG0GKSPiGPfgjoJEHI92oLfLIlYHl+MhD2z4YBD02EY2MEaPSph6CW4wAgQagAMwFCHGsFxCF8KQCXTCwQ6cmEQsYGGMtRQk2OWIBbHFFIpka9lBmDaveZvN7HxwAhDiOM39LsZdTHwhDDXYgQL6IAIx5CAHVFgDELpABS+swQ9rEMMb/v5A6FsAoxrpaOc/gJGtWEACQKCgBSckoaN4qEMd8OAOzuFxLO28ghlqcAN8LLMNb8iq221OAAYcYIAALKAAAgBABgCwgAUIQAML2AG8JVFoY1xjGuv49UASXY1ZQMJeoEjFFVAgg0tnuh0ipgZs75ENQGBiC9mYUvCc8TRnyCobqTgDBgxgiAYc4QAHsMQEGsCDCMDgBALYAAOGkIpUFPoWxpjGNNKhxIEMYxxlPwQbQCGMVGjAEkwYr4O+wekR74IatABEM95xP3bcbxs0dYY02PGHMwyAATk4wAcOgAIPsMAQDHAEFRrAgDGkYAiD6Lrmr5GOdMTpYO+wxzhg/rGHSOwCHKkYgSHgoKMvZ1pHr98FMQqRDNRuI5h6bwY0pAGNKXyBARjYhAY6UQFDSGEJhMACozAHDIADmZAD10Zvmad5m4cPBTEO/hAOubAFbvAK4CAMC2AIOIBsc2dXNQdb1HAMKrAxzpBC77ddzFAM0tALO/AFFVAEm4AChBABmoADUpAGKTAKXCAAUpAJMDAEomAMysCA61B9YicQsmEPvZAFavAK8SANEsAHVkAL+WB+OnJpDHIPwZAFWDQIwYNP2xIMr8ALtyADhAABY6AIHaAIHqAKOMAHacADOigAa7AJJ7AHXseA12AN1YcO1ycQceIPvaAGfyAMCyUB/mCQBqnQDjfXbK9lXnbVDe3QDX+ACQdQQnWxS5Z3BaZmAHMgBDLQBRkwChmQCVxQBKNwBALQbipwC5pnDtewDtewh2HngLDzEsWgBoBwDPCgDyIAA2mACfkADurAHfBQjB7oI9qRDZPgBiUUC5UQCdLoBiBwBmNQAH6gBCkwByiQCaMoBFJQCjoAAJugBENgDOtgDtMAi3s4DXz4h4txDoM4BX9QDPGQBAwQCHhQXiKmc5k2YjeHc1XIDLMQCVHUfSrwADAAAwDgB1JgAl2QAwE4CjjABaOgAxFQCjiwBWBnDrI4i9xgDdbgh2KXE8eQB1hwBDLgBE5wAIagBvkA/ncOMnCZJm31UA/SRnduoALSGAmQAEV/MAQHkAlUYINS4AcwsAkmwAWlkAIsUAoocAfrMJXmYA7WsIfc8AwjiSEvEQ6v8AhiwAVhgJEAMAdqwB0+YleZNndz9w3fYGL8MghD4JMdVAlDEAGjIAVSkAM3qANK2QWlsAE5MAobIAqyOJXrYA1Z+QzRgA5+KBQtIQ+5cAkElgaB4AUDEAgYoAapMF7QNmIDp2X3YF48IgyvAAh7cAiNZApGAASjwJd8qQQoUApK4AejAAFUsAkNcAseWZXcMIvK8AzPwA2MQRJoMQ+7cAlgEGNpAAYDwAU2YAAggGxrqR35cAyAEAN4/oANyuZswtANqfAHwHAKsSACg1lOLDAHSmACqlAEgUCYhpAJIqAM6VCV5rCYz6AMI/mYQ6F9ufAIY0BgYGAIA1AENlAAB4ANNmdXZsIJ1AgAASAAB4AJyiZwT4gLcUAMIGCRQpAGMjAHRYADpXCUipACmqAITrAO6ECV+MmHYYcY/yA7ufAHQFAEN9gHFXABWHACEiAMxlheQ1BnAzABAcAENAAAeCAP5KAO5HAOxEgO0qAMC8AHgTkHJqAJXLACqsAFhJAJLqAJa5AE71CVs8iYivmOf/gPRJMLgDAFTMACJpACV/cGiyACwvBa7WAHEGoHWDBZBQABBtAABbAL/rEVD295D8OACXggARkgBABwAACABSwwABjgBRjgAVLHA1CwD+m4mO2ID+mgokjyGL1QCW6gBlMQAQCgAhUQCFCAB7u3CxNQATAgABkABl7gBwzQCRGQARKQC/lQJvVAD5SgARiABTIAAiBAVXWQkFAAUEkQrUMwBLZwDb8pnM9Afe4QDkYodr4WDuNZCYcACD4gAbTwAH4QBbESBxxAdSbgAV5ACBugCAyQCRsAA4E6CfkgW5zAA57QCp/QB04QC8BwDfd5De6QjunIjpy6DllJnOngDtZgDn14ML6GD8bQSB0ECA1ADA6gCEeACQ8QAHYQAXiJA4HgByaQBvm4/gJisAA8cAD6IAxO4Ait0AmBwAd90AdvUAnVUA3LYA77MA3cAIvV4A7mUA2dOpXuUJ8iWYQ0IRR9EQ7G8At7EI1uwAHM4AAswJBDMAAsAAauuQKKUARFgAUeMAcroAkRYAAHIAk74AWtwAc6IAVC4AiyYAU7UAjpsA+xiJhKW5ULW4RFKJKG62tKNiThgAwdNAioEwOn4AAAIAAFwAIJ0AlcAAajkAKZAAR+kAM6UARKoAqWQAAMMABwIAtFIANggANw4AkygANYkAJ4gAwNW7TmEA3p+AxFSLH3KZyzeA3VIB7Usifg2kiR4AZXAACSKwABQAOG0AGZUANzkAko/jAKPEAIGmCjNdAIKNAATBABcFAETGAIKHAJj5AAJuAFJuAJlLAFtmAO5VCE3DCV1WAOCXuf0SCc1qAM1VBvh0YS0BIOvXAKS7MFIEAADZCrEZAGnYABo1AEfmAIMLgCm5ABXQAEOWCjnhABlOsFhpADlzAGEFC+G+AIm5ACcAAEkXCf6CC01bAP9euwnvp1xgAMwEAhShQe4ZAMrBAHWxADJ3ACWOWNmRAIG0CbmwBk4qibYZADOIADXWAIEeAAE5ABT9AJY5B4gZAAfNAKCyAFhkADb6AGuou/sOiw1xAN+zuL03DDsJAL0BAOQFMMe9ILhbAFPnACKOAJauuD/qMABiaQCTBIBUqgCCIaAXPAAg9JBRsAABIgARUgC3IwADqLAX3QCh5wBG+AAjnQChkwBYa5DjIMi8GZrdzwxuN5ChsTEwLRC3zBplNgR2CgCmNQm7MpBWIwCkKwCYmYjbqpCCYABh7ABQYAABFQADYgBAzAB2PAAH3QCRoAA4YwAuWbAP7KA6aADrq7DtMAkul4wxHTPUPSEUKSDK/wB0yABUIwB6WQA2lACEJQCkKwBpkgBKNABX5gRIpwAI0AA0qQAX5gABHgCRzAADAwB2KgAZ/gCRegA0gpBXJgAEIwBn3gCB5wB9FgDsowiwo7DUdzCjTzebIhEHaMDa9w/glwIAUE9s64JgWvGQjynJd+EAaBEAgMoAgbwAUeYAgaEAGNkAEw0AnI2gpzkABMwAcfYAifkABYQAUJIAZzcAkyMAS3MLT26Q6rTAu0QAzNMCQ7ISTYkJx9kEe2KQSZYE68vAmE4JpHGQZLLAGbAAFpgAKKsAAJoAgZAAReIAMBuwNg4AcncAl8MAJe4JxiwAeXgAJAIAc7IAr1ScrvcAqRYAov5QzYANYKIV1jTdh5RAiEgAWjcFkHqAiEMJg5MAdh0AhLAACacAFLwANzEAEbkAkAIAN4Kwcb8AligAKfgAUMQAVPMABY4Ad8wAGf/AlFcAWkQLHh4Lih0SzM/vDVFfIP2BAO2CAMnp2GijC6YWAIiLwJfrAEpUAIfuABPKCsjmy2YJADnPsAv2gJgTAGRSAElqDbjiAFECAHhsAFG1AEsoAFTAAER6ADecAKW5BF31Ix3lDOCjEO1ZacBpYG7cYFmYADiqAILqAIXSAFmxDBGLAFg4AJE7ABa3C2QiCDD0AKcjAF4QOwZisLfZAAVuAITEDNrRAFJkAFHpBZYPAAPuAG0Rcu1tHgLWES2DAPne0IP6YIMRbBjbAJS7AJqmAIBrABIwAId0AK6FAHLCAGw8wC8KwAt7MIMfAGlpADStAKmqABUWAIztcKrQAELFDgYiAEhkAFGlB5/lkQCeTJLUZOLU6R3ZcAS12gCGngB9OrCFWuAyiQAU6wC6BwB6IAdtZQAsE9BxDwiQpwC6iACqKgBhFgBa0gC8Vs4yzgCZ+gA2/gBSlgBUzgCUzwBBCSDaYgjUT+JsTbD4OenI7gB4auCJuA53k+AVfACtDQGf57Dc9QDqiAAbKgCHmtBCJgC7bg6agwBE/AB0WgA+O3AoGgyXxw42+wAZawA2BzD93QDdmwC69AC+HSDNhAJP/gFLN1CcDuB37ABYbgvb93Am4wC87wm/f5C8+wDNfwCxIgkRCgCDmgAstwC9iOClmQAeUbBSzQB5fAApZwCQsAA6mO7rC1Ixe4/iYFIiRE0g8ygQ3HQNiwtO8sAAQSIAJEMAOQYAvGIL/csAzckJXLkA6o0AA+mAkXMATrMIQTPwgcwAKOwAdHgAGfoJlR8ASWUAFgow/TpiAJIgzCQAzHABUgIRvzIAyUwAdahQVWj5oB8gvKcJ/coAw7X7TcUA3XIAIfkAGqUAFSOQ3LsAzXfguDYwJPYAViIOMyMAZYYAkRoAYmFg8mpiDgwHrsLgyo4TO8rvItPwZU0KdM4AapAAp7wJs+3/fDaZ8LawsBcKUFcAtT+c3PYO3WfgccAASyEAYrcAlr8AQR8AcN4iDMtiCQv+6pUdIkcRDFoM42YANBNwl7cAqu/hj3z3Cf9lmfVbkPzxAAYvDjbS+Livn6toALQXQCMJDJcBABGMAJ91CFaun7PLcg654N8sAVITEPmKAGQScJmDBRmdfRBou7vkv9AGFOYIkGB+5c43bNHDdr1sLdwrUHDyYJLLAwuAIu3r122eDFgwfv3r2P4Ey2ayev3z+WLP3Zy8WqUqVTt4whe6ZMoUCB7tbx5LlunbI7hYQ+E7guXTVnqSbdsTcIBIcGarqB+0gtXjd44EaGNNlNrLh5/vyxXNmvH7ZZlWABs3YN4U5z19Zx25d3H7eg5qqZ22fublx30IBVyhIpHDtpweLEyacvX7yNIUOOpEYSXLd4Keep/m3Zsl81Y8amCd3586e5dP/2pUP3jJtQwUL5mnO3zx2wU5FMmWIWfJs2WqbuUcs3GeRHsF05i82Grey/laH9pTN32u60urWFptvLLVq02YH9Ltz77h3vPXu0aRu+rZyz966y7JlsOR5Wk/dMxstGHGzMCi00fLi7ZhqF6AKsn33QES8adLCrRjV3qpmmGmJ628MUX+DbZhtmnHGGGW2cieUVWjgR6yRw2jFps2488we0Av/BZ50FT5vmNJ++I48bvlRbp0djYDmlkkiWnIUYZrJphkQnRxyxxFhMoUWbbGZsMcZuspFnnhvR6gc2uc4sUql0rHnmmWuesUYpwTIE/gaWSvDIYgof9ogkFmdEJJGZZoghtMQRiSmOFlqEOUasFrvJB6XpqisQnwnXjGuahhpq002dEpymNDsjyWKHEyo44YQhTHFGHGboIdEbQ0lsZsRgXClul2OEuapXlMIcU61+8LG0oWs2vSa2hpSxRsGbbhFlkD3c8OEEDDDYAIILYhhkGBOd8UZEcQwNjhlinCHGlWBiCWbXRrcE87Mx0cIHNmvQYfNNZtu0RhllQoV2kC2qPbWCDVJYYQMZdgAkl2YA3eZPcst1kph1g6Gl3WyyaUccYCkNTS1iY+M3GmXgVMa0BFPGBZMrZEhBBg2wTaEGHFZYGJAmo6SymVqb/hnGmaCFlpJQYYg5Bhtv5KnxrAKrGxad2KLpd9NlSysNWkCm0MGEFT5IYYMVaijChBSuUMOUWM49VNCKzS2RaKCHKcaZZrCxpyyngx3WUnytdmgaZKZJ+UhM/rCiiCWW+HoFHIqoQYcUngBkkliGIQZzoQnN/NwoSYQmdGiaGWcce87Bx6wan/6n6ZGlDqchTUM15pY6T5FEDTjCWLyIFRAuIngdpnDD8p1rtZtQzInx2WdvoCm99HDwsccskIO1h9h0wlkHn3DCqSac0upkhRVA5Nj9jDNwSCEFHY6w4ogn1PgjFVMyx3wYoH0WtJnQvSndPMYRDnuE4yX+OMdZ/q73tAP2TSjo+J4xknEkWLBCEn9AXxjgYIUoPMGDagBh5U4xi2EMQ3T+Ex00vOENAfLDHtWDofUWyDoyEcuGB/peMpKBjF7EhBOveEQQH/EHQEjigkZMBStykYtkFCN0KBTdO0z3wtRZL4Gro04W52UjtZiFev7w3vdKh4xk9PAVrzjGGZNYPiX2sBi9GEYyQpeMcYQuegR8YfW6KCwCaXFeY3LdS4hVwHOE4xyHPEcxznGMRDYSGWQMBzIiKUYpBvAd9nBh9bK4NwXOkG9ocUkXszfI74UjGYhU5ADDMY9CllKMYswjFfHRD9XtzSWg/GOwyKQ6WpolewUMIwENiPm9QcYyjLHMXh+vBxob5VKXIWsdAmmZQGQSC4x5PEfffrnN6lXRlpTypDNvlJbWCauctOxHAr+YugSqpXq1pN4saRlNMoVTnPe8kVmyWUsZWk+aq+OnDO2JT3wyUzS9rCXUOhlNgLbOjw8laERpSB1PzpOiWhTWQCW6UWge9KJ/BJk5OVqggAAAOw==';
		imagenes["muralla"] = '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';
		imagenes["terraplen"] = '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';

		// Imagenes para cada una de las celdas productoras de un recurso
		imagenes["r0"] = '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';
		imagenes["r1"] = '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';
		imagenes["r2"] = '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';
		imagenes["r3"] = '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';

		// Itt kezdodnek a css-ek;

		// Travian: Battle Analyse
		imagenes["imgpack"]= imgPrefixPNG + "R0lGODlhEAAQAOYAAAAAAP////z6/Pz+/Pz+9Pz65Pz67Pz21PTu1Pz23OzGROTSlPzqrPzuvOzivPzyzOzCROS6RNy2TNSyVPzafNS6dOTKhPzilPzinPzmpNzKlOzapPzqtPTmvPzuxPTqzPzy1PTu3Pz25PS+POS2POy+ROS2RNSqRNSuTNy2VPzWdNy+dOTGfOzOhPTWjPzelOzSlOTOlOzWnPzmrPzqvOzevPzuzOy2PPS+ROSyRPzGTOy6TPTCVNyyVNSuVPTKbOS+bNy6bPTOfPzajOzOjPTWlPTerPzmtPTq1OSqNPzCTOy2TNyuVNSqVPTOhOTCfOzKhPTSjPzalNzCjPzirOzatOSqPMyaPNSmVNyyZNy2dOzGhNy6fPTOjOzKjPzanOzWrOzexMyOLMSKLNyeNMySNMyWPOSuVNSmXOS2bNy6hOzavPzqzPz27MyONNSiVOzChOTKpNSiXPzy5MyORMySTOSydNSWVP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHgALAAAAAAQABAAAAfqgHiCggMhFk8gA4OLggYbKTIWPgttjHgEDkAxIiJGMys+YAKDHywsCAQENEwuVEVZEx14MBIbSDUaUxVBUkJfVFBYXBMFbDAtQD1mHwc0LypUQ2UpBSBHTkJCZ1QcGCo4JC5mKSIgIDRDP0tDQzo3JTtEZj0iBw82HFI8SiMKJSY5vLhBUe5BAw4zKChQEIGEFStbxJwokMADBwZULvjLkYRMGjhjVnDpkKBBBgwvIHA8s8VOnTd4qjR5YuMBgwsRcnSBc6dOnEFt4lx58sBDFCJyxqiZYwkEFzFEtNDJgsTSojBo5KxRtCgQADs=";
		imagenes["imgpackgo"]= imgPrefixPNG + "R0lGODlhEAAQAOYAAAAAAP///xx6BESSLEyWNFyiRJTChDSGFJzGjCx+BFyePESOHGSiRDyKDESSFDyGDIS2ZJzChKTKjEySHFSaJHSqTIy6bKTGjKzOlFyaLGSeNHyuVKzKlISyXGSeLGyiNHSmPLTOlPz+9Pz65Pz21PTu1Pz23PTmtPzuvPzyzNy2TNSyVNy+ZPzehNS6dOTKhPzinPzmpNzKlOzapPzqtPTmvPzuxPzy1Pz25PS+POy+TNSqRNSuTNy2VPzWdNy+dOTGfOzOhPTWjPzelOzSlOzWnPzqvOzevPzuzOSyROy6TPTCVNyyVNSuVPTKbOS+bPzWfNy6bPTOfPzajOzOjPTWlPTerPzmtPTq1OSyTNyuVNSqVPTOhOTCfOzKhPzalNzCjOTKlPzirMyaPNSmVNyyZNy2dOzGhNy6fPzanOzWrOzexMyOLMSKLMySNMyWPNSmXOzavPzqzNSiXMyORP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHUALAAAAAAQABAAAAffgHWCg3UvXTeEiYJFPUUvTUSKgyxEODhWJz8raolAQCUiIkhaUGJVZWWCRCozWEcyYC5RVVJpYl5kaCsjckRBT0xuSCZGQz4xLW49IzdXXFJSWWI0MD45SUJvPTg3N0ZTTllTUyAaOkpUbkw4JClIRl9LSzkfGxlZXm483CkoNCAfPnjYgKGCgzNsdowwYcNIjA8hMHDgYEECgwNtfqCpwTCGBgwWLEDoACGCggSCtnRBkiKDBAkXEEAwwGABoTBjulCY4KCBApoDJKFhQ8UMnQcFCEgStAbOnDgHBBAKBAA7";
		imagenes["imgcopy"]= imgPrefixPNG + "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAHMAaQBai4lpJQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9ALFw00KOKzIOYAAAF8SURBVHiclZGxjtNAFEWP40UpE4oUKf0HLtLRsGMKFJbGNPGHQLTaBimSRZfPmPQIZavkF7ZyRZEGLU2Q0IR1PGNnKCI7BDsWjDTS09y5590340wmE8uFtVgsnLK21r5sunMFEMdxTZjP5wgh7Gq1cmri3wAAz/POBNd1uf/ymddv3rZCOm30D7d3AAghLo551XSoU8Wnj+/5/mPP1+SBVzfviKJoXepSyuuLCXSqsFqRZ088f/YTu38EIAxD4jhmMBgQBMG6EfCnudCKQ7bD0QqA4XCI53m4rstyuawgnTZzoVOcPKuNOJ1OAQiCYF29QZO50AoO+pRQa2azGdvtliRJGI/HpwRN5iJL6dhjAmMMWmu01nS7XZRSp1943CR8M0/Y/Bc2SyHfccj3kO2w+TFBnucVoNwV4IW4afrNavm+f5bAGENRFEeAlPJaSlkzRVG0DsOQfr+PMaZKUIIqQFvn0WhEr9c761zW/wTYbDY1838lEEK0yfi+z29BFRgySKHeAQAAAABJRU5ErkJggg==";
		imagenes["imgpaste"]= imgPrefixPNG + "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAHMAaQBai4lpJQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9ALFw00HbQA5MUAAAHMSURBVHichZM9aFNRFMd/j/e6FyoFJ0mqiy7ZTQikAUGlgzgp3US6ZBE6KA6ObumcwS0OLhFBgkQcSkimQsmHWQRFYjEggqZ5ybsf7zg076WxaXrgcOHe8//d83GvwwLbSKzK1u0kl9c0h602r9/iLIoD8ADS6bSc3tzZXuHh40+0D/ZIJNvAK/n+Kz0nrNfrDoCXyWSkXC6jlALgTWmTe9sfaR/sMRj8IAi+cuPqJaDOzpN9rLVYaykUCtLr9RxPRFBK0Wg0sNYC8OjBNQD+jK5P71sH1qnVamitMcbEsV6UUkRe23jGzSuGSqVypt5mswlAMpkkDMMZIAgCjDGEYYi1Nj4slUpnIMVikW63y2QymQGUUjEggkSWSCTmAK7r8uH9O27d2aLf788AWmtEJIYss92nzwHI5XLiiUhcwkUANR7y8sUug99jvnw+ZPPufeIpXARQ4yGihthgxOrKMUyOTnoQAbTWAAsBp8VGHSNqiBMMZ008XULky8Q2GOOImmUAnAtYJA7VXxwzHaPv+1SrVTzv5E39D1gkDgMfogxarZbT6XTmPpPrumSzWX5+63KkfcSMQE1X7SN6BEadO2YA8vm8AEs9lUrJP7/afV7h9kN4AAAAAElFTkSuQmCC";
		imagenes["imgatti"]= imgPrefixPNG + "R0lGODlhEAAQAOYAAJoxM5EqLocoK8BKTre6vsnKy6mqq/T58nu0X1qNQOTv3srivFN8OU1zNVuGPnGiUFqAQXqnXJG9c4yyc4Kla+rz5FqEPVF3N0xuNGqYSoKtZIWvaIClZoivbZnAfpq9gcfcuNnozsXatevv4vH06vj49KGhoJ2dnNjUwevj1uamSNKeUuKrW7+RT7SKTeizZLOMVKOCUamPaa2VcsashtnBnamXfMSxlsOJN7KEQ+fWv9HLw7Kro/Ls5qmop7KNeqRuX71vZrJVTqlSTbtMTOrq6unp6eXl5ePj4+Li4t3d3dra2tjY2NbW1tDQ0M7OzsrKysnJycjIyMbGxsXFxcPDw729vbu7u7m5ubi4uLa2trW1tbOzs66urqurq6mpqaWlpaOjo6KiopOTk////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGQALAAAAAAQABAAAAengFlWWmSFhlJXXIZkYFFFUYtNSklii2RdVUdPhV1JS16WhSZTSFBPVEhjoYZfS0xYRlsFq4ZhTU4ntIsEBig/QENBJZY1MDcpPkICAgBEI6EzLywxQQECAQM9ljw5LTo2CwkNCQgVizIrODuFFRkYDhoKiy4qNIsRDRYRILqFGvkZJIgwR2sDAwYWHnjoMEFeqA8NIFi4kGHDBA2rQnCgQILMgQOFAgEAOw==";
		imagenes["imgattc"]= imgPrefixPNG + "R0lGODlhEAAQAPcAAAEBAxEYIyktMxIXHictNMnKy1x4kig8TVd4k0JYajFRaUlrhhklLVZnc0ZleElpfGB+j4eXoExTV0VldV15hxsjJ1R4iEdhbU1pdnCLmHCDjCs7Qp+ts0hfZ05ueU1nb0lhaVRud5Oip0pqc5qxuG58gE5VV2tydExnbmJ9hBEVFm+Ch7jEx7C4ulVkZ3+Tl3uFh7m+v77O0Wdtbougo5yqrIqcnrPDxYiQkY6YmbC7vK+6uyswMMvY2MDMzL/Ly3B3d2BmZj9DQz5CQi0wMM7a2s3Z2cPPz73IyLvGxrG8vJukpFNYWMTPz5CYmI6Wlo2VlX6FhX2EhGhublleXs7Z2Tw/Pzs+PikrK52kpJGXlx0eHr/Fxc7a2aawr6avrnN6eW1ycYKHhl9nZTw/PlxhXVNYU4mNiaGhoOamSNKeUr+RT7SKTeizZLOMVKmPaa2VcsashtnBncSxlsOJN7KEQ9HLw7KrowMCAerq6unp6eXl5ePj4+Li4t3d3dra2tjY2NbW1s7OzsrKysnJycjIyMbGxsXFxcPDw729vbu7u7m5ubi4uLa2trW1tbOzs66urqurq6mpqaWlpaOjo6KiopOTkwAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJgALAAAAAAQABAAAAjfABklaoSpoMFCih4ZxDSJUB5CCwP56VNpISZIiPYIKgipz59IFguiMcRnkKBDfCyFNCjpD6BFehwVKBhBRkhKMVqcMFNmTIASJkJymSEAwIADChoQSGBQjps5O0JsYLDAAAISLDgshNPmUgUMDoqIOfPCSxaDd+qswWNhgoYuVHT8IAPmCKY3aujYUfGAQpMvQYoUyQEDCSY2aeJg8jDiRhEfVnAUyQAhjMUPKXpUgSJkiAQQF7TYNYiCRhEjW6Jg4uFiBZMlCzuIEGyloBMiWIBIWWijhuArBpNMeaIkIAA7";
		// Travian: Battle Analyse

		imagenes["cropfinder"]= imgPrefixGIF + "R0lGODlhDgAOAPcAAP//////zP//mf//Zv//M///AP/M///MzP/Mmf/MZv/MM//MAP+Z//+ZzP+Zmf+ZZv+ZM/+ZAP9m//9mzP9mmf9mZv9mM/9mAP8z//8zzP8zmf8zZv8zM/8zAP8A//8AzP8Amf8AZv8AM/8AAMz//8z/zMz/mcz/Zsz/M8z/AMzM/8zMzMzMmczMZszMM8zMAMyZ/8yZzMyZmcyZZsyZM8yZAMxm/8xmzMxmmcxmZsxmM8xmAMwz/8wzzMwzmcwzZswzM8wzAMwA/8wAzMwAmcwAZswAM8wAAJn//5n/zJn/mZn/Zpn/M5n/AJnM/5nMzJnMmZnMZpnMM5nMAJmZ/5mZzJmZmZmZZpmZM5mZAJlm/5lmzJlmmZlmZplmM5lmAJkz/5kzzJkzmZkzZpkzM5kzAJkA/5kAzJkAmZkAZpkAM5kAAGb//2b/zGb/mWb/Zmb/M2b/AGbM/2bMzGbMmWbMZmbMM2bMAGaZ/2aZzGaZmWaZZmaZM2aZAGZm/2ZmzGZmmWZmZmZmM2ZmAGYz/2YzzGYzmWYzZmYzM2YzAGYA/2YAzGYAmWYAZmYAM2YAADP//zP/zDP/mTP/ZjP/MzP/ADPM/zPMzDPMmTPMZjPMMzPMADOZ/zOZzDOZmTOZZjOZMzOZADNm/zNmzDNmmTNmZjNmMzNmADMz/zMzzDMzmTMzZjMzMzMzADMA/zMAzDMAmTMAZjMAMzMAAAD//wD/zAD/mQD/ZgD/MwD/AADM/wDMzADMmQDMZgDMMwDMAACZ/wCZzACZmQCZZgCZMwCZAABm/wBmzABmmQBmZgBmMwBmAAAz/wAzzAAzmQAzZgAzMwAzAAAA/wAAzAAAmQAAZgAAMwAAAGdnZxUVFf767PK5C/O+GfTCJ/bKQfXLSvfOUffRWvfVavjXbfjZdvjbgPrhlfG1A/TCMrqcRvjTZcirVdy/aPvnr/zuxP734v745/v6997e3tPT06ysrIyMjIKCgmlpaU5OTk1NTUZGRkNDQz8/Pzc3NxYWFv///yH5BAEAAP8ALAAAAAAOAA4AAAiPAP8JFAiv3T934P69MzhwIDh16sCZ68aw4T9z4caV+8YtXkNt6rqBK7duHTtv28RZNAduXTwA68R1e/cxXL4V8ealI7fN3cB34fAFqkdv5zl05Rriw9aPXz6O22gOXNrUn7hz7tCZG6jPXtNsB7/9i8dwnz1W/MAKrPjvnjxW+tRaFHhvhRW5c//RS5u3YUAAOw%3D%3D";

		// by Travian3 Beyond - ML&CN
		//image for the Add bookmark link (Thank you, DMaster !)
		imagenes["addbookmark"] = imgPrefixGIF + 'R0lGODlhEAAQAOZ/APV+AfaRA/748/qdVfvKpvl0CvV6APunC/54AvZ8JP/7+P/t3f/9/P/49PijB/2rDv/59P3Dk/7z6v/ewP/HaPeBAvx7DP/u4P62OPzBVv+xSfidBv3o2f/Kc/eQRf/z6fyiM//cr/7q2fSPAfuwKvzQsP/FYvuLBf2uDv+xa//69fuLDv++T//9+/V1Fv+4cP25QvR2APmwJv/VkPSDAPWgAvyqDf/Kmv67RvecBf/lzf/w4v/KcfRpAf/37/iPQf/MlPaEBv/Vp//dpP/gxPipB/q0gP/YtfvJo/eiDvzLpf/isf/Nof/XsvzUtv/IbP+mRP2pEf6sE/+vF/iaVfyfUv+TJf+vGPqoGP/17P717v/VmPusbvmLNPytbv2safaCLf+9dfuZJPhvAf+jU/+mV//DXP/RhvWUAv/Xk/WBAP/38vehBvmmCf2pDvV5H//Lnf/8+fy6RP2XP//+/fafBP7AV//lz/+ybf+/U/++Uf7CWPx9CvRpBP/27v///yH5BAEAAH8ALAAAAAAQABAAAAezgH+Cg39ZO4SIiE0piY0QeAgijYgTYSBck4MKEVsZBReIDAo+C3dHQkMUYnM3RAt+cUxlZC9AIUtpT3saUFZ8BV4qVSswHTNnPCZmdnIyQT9afwwDFVgYLHl6OCRJAD8Ngy0DYwdSU1dRGz0e4IQfFm4PNg8HOX0ciToIKG1sDg51YjhJBOdEETQGDASoQcNIoi8B1CQgUAIMgBFUEnVxEUGAIAVI3iSgQ0iBEgmJ1hBoFwgAOw==';
		//image for the Add this page as bookmark (Thank you, DMaster !)
		imagenes["addbookmarkthispage"] = imgPrefixGIF + 'R0lGODlhFwAQAOZ/AP/69v+rQ/l8GPV+AfaEMf/RlfqKL/2qDP3Zvf/Kmv6SMvuuI/738f/x5v/kzf/m0vacBP/48v/PgPlxBfumZf/v4f717fu7i/dxCv/27//HlP/BivWRAv/GZv/59faEA/mscf/8+vmlCP16CfyMBf+1MvzHnv/BW/ZsBP/Fkf6ubf/Ytf+DFfulYvuzef26RP7n1fypZv///v/s3f7q2fqhWv/9/P57B//Sqv+zb/mAIf/fwv/69f/+/f+6ff7dwv6mWv2HIf6zLP/VsPvLqP+sYv/Oif2taf+fSfZ/JvigBvR4APicWPqpGf+LJP6/VPuWB//UpPmna//coP/frP/79/mvef7r3feNQPSMAf/juPy3gPhzCPeTSfyWQv+aQPyhL/7z6vmeDPvBl/qpbfusbviECf2qaPeiEvqmH/2pYv/AdP/o1f+uZ/6jNP+oWv+zXP/hx/zRsfuTHP7Xtf/Ylv/Lc//Ej//NoP/Ibf+/eft5DP58DPq4h/+9gv///yH5BAEAAH8ALAAAAAAXABAAAAf/gH9/PAkbgocAFRmHgkM4EYdVGgqQjBU+OIx/AG13kD0rLJWMO3pHNpo8RRshGUgqmn8NGkYCP7EJCjMafAiHMiFVO1F1YDEVHj2HcSxnTgYwIQ8PDjsreFp1JyNfPikadCFsBjojLX8efgFwawVUUxIdTwFuc2ZlkGoYNzWCHlsT0rzIY6fDiRcL0HwAwUAQkAn8EPVBIWZBiRJCmkAYYKWhoDdcbpxD5ILEgZMHlHyQ4lFQDi5BDDxglMCkiJtKBlywpEDHGQy+BFXJAUUEhwEcIGRhEubQjj0UZqAgc6iBl41YxnRZwoEAjUMqUFwJAUKAB0EOMCQhYuFPBjkEKZbc+lNFAIgQbikYOEvDRANNFkzAoKuAwiJBFlzs/IMqlg1lG1y0/RMIADs=';
		//image for the bookmark spacer (Thank you, DMaster !)
		imagenes["addbookmarkspacer"] = imgPrefixGIF + 'R0lGODlhEwAQAOZrAP/+/f/8+vZrAPumZP/59f/7+P/JmP+SMf57B/x0APhuAPmAIf7r3fuiWvlvAP/69f/Gkvy0ef/BivqCIv727/+rYf/Ej/3ZvP/Ci/2qZ/dyDPdxCPqRPvumYv56CP/s3f6RMvytbPulYv58DP/t3f95AfqmZ/+JIP/9/Py8iv6nWv2NLvp+F/mIL/+EFvmKMv/hxv+aQPuxeP+uZ/VrBPqtcf/Sqv/GlPyqaP/69v+oWvhxB/uyef/Aiv/48//17f61ePxzAP/p1f/27/mrcf2QMf+MJv/27v7s3f57CP+LJPqpbf/Ytv/48vdtBP/9+/dsAPhyB/3Kov/79//59P/Wsv+CFP7n1f3YvPqILv/t3Pd4F//ewf3l0/+fSPyUPvt5DP/VsP/48f2pYv6vbfhzCP2HIf+IH/+mVv717f+wa////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGsALAAAAAATABAAAAengGtrDwYSgoeIYTZihwU3RVSIkjkzFk1rAEwuPpKdDxUYAUdeIZ2mBgcfECMXpp0wVjhKWVcorodPQisLHiKYt4hjGwgNaydnQUBVMSUJJGhGCV9rKjvEaw4KAjJSDlACDBPaHGs6UUkdwJJqZWYtXeqCWgcLGRpY8WtcYCZINEv5yDhhEKDGFgLqprAgEmDNkAEvEAIwVQDEAAqHfvBIcatHhDSCAgEAOw==';
		//image for the bookmark edit (Thank you, DMaster !)
		imagenes["editbookmark"] = imgPrefixGIF + 'R0lGODlhEAAQAOZ/AP/x5P7z6v7t3/SdBv/8+fq3hv/lzv/69P/cvP/17PiYUffYS/VuCfpzBfhuAfV5HfVqAffZhf/Fkfq8jvmqcf/7+f7p2PZ/KfV2Gf+3d/K/NvVqBPeuKP738fu+j//+/fZyEP/38f/Djv+cRfngqP/38PVzE/nplfbcb/+zb/isMf/Hlv+9hPXaZvTCSPTRYfnWZfeCKvXHWf+4efq6jPffefp+HP+gS/WcEfXTav/o0/jhiPbcaf+MJ/7IkvrbofVxEP/GkvXUJP/Qpv/TrPyrVfLMJf+uZvfQPPfhZvmwevz03P7v5P7m1P/Ytf7ox/PCQvadIvzJovLLQvjNTvnaafjWUvveqvjaU/G4Hf/XtO/DHP1+EPixNf2gUfu5XP+oW//jyv/kyvzln/2xcfZxEPdvBv+SMvqdMPSYFPafF/u9jPjUX/XMLf53Af+8f/qHKvnnifvqw/SeCv7q3P+JIP/u3/+fS/nWbPnfo/vuzP7uz//Il//LnP/o1P///yH5BAEAAH8ALAAAAAAQABAAAAfYgH+CgwRBd3aDiX8fJYs6TiIsBH8Jk4IJWnxhRAgAe24jK2deAoIARwB9Fno5UzVPEmNmTYNDGSdQUSBlaRpJHBSJGWIaGxMBARMbWW0xlwYpcg4TiR4OLQ5rATdvBi8gHYkhXBFVag82aFRbQOGDB3URC3MmAVIMRhAeiQg9KBAFLAiCg8dFAxEhDhiQ8IPNhURkvsSRUQTMDB9XlqhQMshPgwUckPDIQ2IHjC5CMAj8I0DBAwoXIGCxguMCBQYKSgkiwORPhQIDBtCo8IeOJUUsMTxwlygQADs=';
		//image for the "Close" button in the Travian Beyond Setup
	}
};

function _attachEvent(obj, evt, func) {
	if(obj.addEventListener) {
		if (is_array(evt)) {
			for(var i=0; i<evt.length; i++) {
				obj.addEventListener(evt[i], func, false);
			}
		} else {
			obj.addEventListener(evt, func, false);
		}
	} else if(obj.attachEvent) {
		if (is_array(evt)) {
			for(var i=0; i<evt.length; i++) {
				obj.attachEvent("on" + evt[i], func);
			}
		} else {
			obj.attachEvent("on" + evt, func);
		}
	}
}

function is_array(needle) {
	return (typeof needle == 'array') ? true : false;
}

function in_array(needle, haystack) {
	if(typeof needle == 'string' || typeof needle == 'number') {
		for(var i in haystack) {
			if(haystack[i] == needle) {
					return true;
			}
		}
	}
	return false;
}

function doane(event) {
	try {
		e = event ? event : window.event;
		if(0 && is_ie) {
			e.returnValue = false;
			e.cancelBubble = true;
		} else if(e) {
			e.stopPropagation();
			e.preventDefault();
		}
	} catch (e) {}

	return false;
}

// GreaseMonkey ejecuta sus scripts en el evento DOMContentLoaded, por lo que se puede ejecutar directamente,
// Opera por el contrario necesita agregar la funcion a dicho evento

_attachEvent(window, 'DOMContentLoaded', funcionPrincipal);
if (document.body) funcionPrincipal();
