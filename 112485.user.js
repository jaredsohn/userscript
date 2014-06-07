// ==UserScript==
// @name T3.5 WW Crop counter
// @author :) -> modyfied by coin
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
// @version 1.10
// @description  Enables some Travian v3.5 features
// ==/UserScript==


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
	 * Recupera informacion generica inicial para el resto de funciones
	 */
	function getGeneralData(){
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
GM_log("Find...");
	
	if (find('//table[@class="traders"]', XPFirst)) {
GM_log("Found...");

		var t0 = new Date();
		var arr0Time = get("tp1").innerHTML.split(":");
		//alert( 'zmienne arr0Time to: ' + arr0Time);
		t0.setHours(arr0Time[0]);
		t0.setMinutes(arr0Time[1]);
		t0.setSeconds(arr0Time[2]);

		var tFix = new Date();
		tFix.setHours(parseInt(arr0Time[0])+1);
		
		//get the list of the incomming trasports.
		var oTransportTable = new Array();
		// recoge los nombres de cada uno
		xpathResult1 = find('//table[@class="traders"]//tr[@class="res"]//span[@class="f10"]', XPIter); 
		var oTimeTable = new Array();
		xpathResult2 = find('//table[@class="traders"]//div[@class="in"]', XPIter);
		while ((oTransportTable[oTransportTable.length] = xpathResult1.iterateNext())) {}
		while ((oTimeTable[oTimeTable.length] = xpathResult2.iterateNext())) {}
		var tmpT = new Date(t0);
		var tmpActualCrop = parseInt(actual[3]);
		var tmpTotal	= parseInt(total[3]);
		var tmpProduction = parseInt(produccion[3]);
		//alert(tmpProduction);
		var arrQFix = new Array(24); 	//24h period;
		var ECQFix = 0; 		//estimated Crop Quatity (pe perioade fixe de 1 h)
		for(var i=0;i<24;i++){arrQFix[i]=0}
		arrQFix[0]="-"

		for (i=0;i<oTransportTable.length-1;i++) {
			//celula cu cropu

			var oTCrop = oTransportTable[i].lastChild;

			//celula cu timpul estimat
			var oTTime = oTimeTable[i].childNodes[1];

			//celula cu timpul
			var oTimer= get("timer"+(i+1));
			
			// cantitate asteptata
			var qCrop = parseInt(oTCrop.nodeValue);
			//alert(qCrop);
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
		oRightDiv = get("sright");
		for(var i=0;i<24;i++){
			arrQFix[i] = "<TR><TD>"+i+"</TD><TD align=left nowrap >"+t0.toShortFormat()+"</TD><TD align=right>"+arrQFix[i]+"</TD>";
			t0.setHours(t0.getHours()+1);
			t0.setMinutes(0);
			t0.setSeconds(0);
		}
		oCQTable = elem("TABLE","<TR><TD></TD><TD>Period</TD><TD>Crop Quantity</TD></TR>"+arrQFix.join("</TR>"));
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

// GreaseMonkey ejecuta sus scripts en el evento DOMContentLoaded, por lo que se puede ejecutar directamente,
// Opera por el contrario necesita agregar la funcion a dicho evento
window.addEventListener('DOMContentLoaded', funcionPrincipal, false);
funcionPrincipal();

