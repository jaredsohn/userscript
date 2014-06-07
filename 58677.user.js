// ==UserScript==
// @name           miguelo-prueba
// @namespace     miguelo-prueba
// @description    un script sin mas

// @include        http://s*.ikariam.*
// @exclude        http://support.ikariam.*

// @require        http://buzzy.hostoi.com/AutoUpdater.js
// @require        http://buzzy.hostoi.com/Ikariam/BD.js
// @require        http://buzzy.hostoi.com/Ikariam/Idioma.js
// @require        http://buzzy.hostoi.com/Ikariam/Lista.js
// @require        http://buzzy.hostoi.com/Ikariam/Imagenes.js
// @require        http://buzzy.hostoi.com/Ikariam/InfoCiudades.js

// @license        Creative Commons Reconocimiento-No comercial-Sin obras derivadas 3.0 España License
// @author         Buzzy
// @version        2.40
// @date           27/09/09

// @resource       bg_header		http://buzzy.hostoi.com/Ikariam/img/bg_header.jpg
// ==/UserScript==

//--------------- LIBRERÍA ---------------//

function eliminaNodo(e){if(e)e.parentNode.removeChild(e);}
function colocaDelante(e1,e2){if(e2)e2.parentNode.insertBefore(e1,e2);}
function colocaDetras(e1,e2){if(e2)e2.parentNode.insertBefore(e1,e2.nextSibling);}
function swapNodos(e1,e2){if(e1&&e2){var nextSibling=e1.nextSibling;var parentNode=e1.parentNode;e2.parentNode.replaceChild(e1,e2);parentNode.insertBefore(e2,nextSibling)}}//El primer nodo tiene que ser posterior al segundo nodo.
function addGlobalStyle(css){var head=document.getElementsByTagName("head")[0];if(head){var style=document.createElement("style");style.type="text/css";style.innerHTML=css;head.appendChild(style)}}
function getHrefParam(param,href){var re=new RegExp(param+"="+"\\w+");var r=re.exec(href);if(r!=null){var s=r+"";return s.split("=")[1]}else{return r}}
function trim(cad){return cad.replace(/^\s+|\s+$/g,"")}
function seg2Time(t){var tiempo=[];tiempo[0]=Math.floor(t/86400);t-=tiempo[0]*86400;tiempo[1]=Math.floor(t/3600);t-=tiempo[1]*3600;tiempo[2]=Math.floor(t/60);t-=tiempo[2]*60;tiempo[3]=Math.ceil(t);return tiempo}

//--------------- fin LIBRERÍA ---------------//


//--------------- FUNCIONES ---------------//

/**
 * Añade un estilo global.
 */
function estiloGlobal (){
	addGlobalStyle (
		".headerReloaded { background: url(" + Img.headerPanel + "); height: 5px; z-index: 10000; }" +
		".bodyReloaded { background: url(" + Img.bodyPanel + ") repeat-y; z-index: 10000; }" +
		".footerReloaded { background: url(" + Img.footerPanel + "); height: 5px; z-index: 10000; }" +
		".calc_td { float: left; padding-bottom: 5px; }" +
		".calc_tiempo { text-align: right; }" +
		"#worldmap_iso #scrollcover { height: 563px; }" +
		"#GF_toolbar ul { width: 1000px; }" +
		"#GF_toolbar li.version { position: absolute; left: 820px; }" +
		"#GF_toolbar li.serverTime { position: absolute; left: 880px; }" +
		"#advisors a.plusteaser { display: none; }" +
		".premiumExchange { display: none; }" +
		"#globalResources .transporters a { top: 17px; }" +
		"#globalResources .gold a { top: 49px; }" +
		"#fleetMovements .info { display: none; }" +
		".cannotbuild a { display: none; }" +
		".etiqueta { border: solid thin #D2D2D2; background-color: #F4F4F4; -moz-border-radius: 5px; padding: 5px; width: 200px; display: none; position: fixed; z-index: 1000; }" +
		".inputOpciones input { margin-right: 4px; }"
	);
}

/**
 * Consulta el nombre de la ciudad.
 * @param str texto con el nombre de la ciudad y las coordenadas. Parámetro opcional.
 * @return nombre de la ciudad.
 */
function consultaNombre (str){
	var nombre = "";
	
	if (!str){
		if (pagina == "relatedCities"){
			var ciudad = document.getElementsByClassName ("occupiedCities coords dropbutton")[0];
			if (!ciudad){
				ciudad = document.getElementsByClassName ("deployedCities coords dropbutton")[0];
			}
			
			nombre = ciudad.childNodes[2].textContent.split ("]")[1].substr (1);
		}else{
			nombre = document.getElementsByClassName ("optionList")[0].previousSibling.childNodes[2].textContent.split ("]")[1].substr (1);
		}
	}else{
		nombre = str.split ("]")[1].substr (1);
	}
	
	return nombre;
}

/**
 * Crea, si es necesario, la variable que guarda el nombre de las ciudades con su bien de lujo.
 * También la actualiza si se ha creado una nueva ciudad.
 * @return true si la ciudad actual es mía, sinó, false.
 */
function compruebaVariableCiudades (){
	var ciudades = GM_getValue (server + "ordenCiudades");
	var lista = document.getElementsByClassName ("optionList")[0];
		
	if (!ciudades){
		//Inicializo la cadena
		var cad = [];
		var j = 0;
		var stop = false;
		while (j<lista.childNodes.length && !stop){
			if (lista.childNodes[j].title != ""){
				cad[j] = consultaNombre (lista.childNodes[j].childNodes[2].textContent) + "|-1";
			}else{
				stop = true;
			}
			
			j++;
		}
		
		GM_setValue (server + "ordenCiudades", cad.join ("#"));
		
		ciudades = cad;
	}else{
		ciudades = ciudades.split ("#");
	}
	
	var nombreCiudad = consultaNombre ();
	
	//Calculo el número de ciudades sin contar las que no son mías
	var num = 0;
	var mia = false;
	
	for (var i=0; i<lista.childNodes.length; i++){
		var nombre = consultaNombre (lista.childNodes[i].childNodes[2].textContent);
		
		if (lista.childNodes[i].title != ""){
			num++;
			
			if (nombre == nombreCiudad){
				mia = true;
			}
		}
	}

	if (ciudades.length != num){
		//Hay una nueva ciudad, actualizamos
		ciudades = ciudades.join ("#");
		ciudades += "#" + nombre + "|-1";
		GM_setValue (server + "ordenCiudades", ciudades);
	}
	
	return mia;
}

/**
 * Transforma un número en una cadena con separación de grupos de 3 cifras con comas.
 * @param num número sin comas.
 * @return cadena con comas.
 */
function transformaCifra (num){
	var negativo = false;

	if (num < 0){
		num = num*-1;
		negativo = true;
	}
	
	var cad = new Array ();
	var n = num;
	var i = n.toString ().length - 1;
	while (n >= 10){
		cad[i] = n%10;
		n = parseInt(n/10);
		i--;
	}
	cad[0] = n;
	
	var cad2 = "";
	var j = 0;
	for (var i=cad.length-1; i>=0; i--){
		cad2 = cad[i] + cad2;
		
		if (cad.length > 3){
			j++;
			if (j == 3 && i != 0){
				j = 0;
				cad2 = "," + cad2;
			}
		}
	}
	
	if (negativo){
		cad2 = "-" + cad2;
	}
	
	return cad2;
}

/**
 * Actualiza el nombre del objeto de la ciudad si es necesario.
 */
function actualizaNombreCiudad (){
	/**
	 * Actualiza el nombre del objeto que guarda información de la ciudad y la variable ordenCiudades.
	 * @param div capa donde se encuentran los nombres.
	 */
	function actualizaNombre (div){
		var nombreActual = div.childNodes[9].childNodes[1].textContent;
		var nuevoNombre = div.childNodes[11].childNodes[1].value;
		
		//Comprobamos si el nuevo nombre no está repetido.
		var ciudades = document.getElementsByClassName ("optionList")[0].childNodes;
		var j = 0;
		var stop = false;
		while (j<ciudades.length && !stop){
			var nombreCiudad = consultaNombre (ciudades[j].childNodes[2].textContent);
			
			if (nombreCiudad == nuevoNombre){
				stop = true;
			}
			
			j++;
		}
		
		var boton = div.childNodes[11].childNodes[3];
		boton.type = "button";
		var formu = document.getElementsByTagName ("form")[0];
		formu.setAttribute ("onsubmit", "return false;");

		if (stop){
			alert (Lang["cityNameAlert"].split ("{x}")[0] + nuevoNombre + Lang["cityNameAlert"].split ("{x}")[1]);
			boton.blur ();
		}else{
			formu.submit ();
			
			//Actualizo la variable ordenCiudades
			var cad = GM_getValue (server + "ordenCiudades");
			cad = cad.replace (Ciudad.getNombre (), nuevoNombre);
			GM_setValue (server + "ordenCiudades", cad);
			
			//Actualizo el objeto ciudad
			Ciudad.actualizaNombre (nuevoNombre);
		}
	}
	
	//Añado un listener en el botón para renombrar una ciudad para actualizar la variable
	if (pagina == "renameCity"){
		var div = document.getElementsByClassName ("content")[1];
		div.childNodes[11].childNodes[3].addEventListener ("click", function (){ actualizaNombre (div); }, false);
		div.childNodes[11].childNodes[1].addEventListener ("keypress", function (e){ if (e.keyCode == 13) actualizaNombre (div); }, true);
	}
}

/**
 * Elimina la publicidad Premium.
 */
function eliminaPublicidad (){
	eliminaNodo (document.getElementById ("GF_toolbar").childNodes[3].childNodes[3]);
	eliminaNodo (document.getElementById ("viewCityImperium"));
	eliminaNodo (document.getElementById ("viewMilitaryImperium"));
	eliminaNodo (document.getElementById ("viewResearchImperium"));
	eliminaNodo (document.getElementById ("viewDiplomacyImperium"));
	eliminaNodo (document.getElementById ("trader"));
	eliminaNodo (document.getElementById ("globalResources").childNodes[3].childNodes[3]);
	eliminaNodo (document.getElementById ("setPremiumTransports"));
	eliminaNodo (document.getElementById ("viewDiplomacyImperium"));
	
	if (pagina != "tradeAdvisor"){
		eliminaNodo (document.getElementsByClassName ("next")[0]);
	}
	
	var archivo = document.getElementsByClassName ("yui-nav")[0];
	if (archivo){
		eliminaNodo (archivo.childNodes[5]);
	}
	
	if (pagina == "city"){
		eliminaNodo (document.getElementById ("reportInboxLeft"));
	}

	var tag = document.getElementsByClassName ("selected")[0];
	if (!tag) return;
	
	tag = tag.parentNode;
	
	//Elimino guardar en archivo bandeja de entrada
	if (tag.childNodes[1].className == "selected"){
		var span = document.getElementsByClassName ("reply");
		if (span){
			for (var i=0; i<span.length; i++){
				span[i].removeChild (span[i].childNodes[3]);
			}
		}
		
		var contrato = document.getElementsByClassName ("decision");
		if (contrato){
			for (var i=0; i<contrato.length; i++){
				eliminaNodo (contrato[i].nextSibling.nextSibling);
			}
		}
	}
	
	//Elimino guardar en archivo bandeja de salida
	if (tag.childNodes[3].className == "selected"){
		span = document.getElementsByClassName ("msgText");
		if (span){
			for (var i=0; i<span.length; i++){
				span[i].removeChild (span[i].childNodes[5]);
			}
		}
	}
	
}

function eliminaBarraNavegacion (){
	addGlobalStyle (
		"#mainview h1 {" +
			"margin: 0;" +
			"text-align: center;" +
		"}" +
		
		"#breadcrumbs {" +
			"display: none;" + 
		"}"
	);
}

/**
 * Modifica algunos elementos gráficos y añade mejoras varias (las que no se pueden activar/desactivar).
 */
function cambiaUI (){
	/**
	 * Modifica de lugar las coordenadas de la isla.
	 */
	function coordenadas (){
		var info;
		
		if (pagina == "worldmap_iso"){

			document.getElementById ("islandName").textContent = document.getElementById ("islandBread").childNodes[0].textContent;
		
			info = document.getElementById ("information");
			if (info){
				info.childNodes[3].addEventListener ("DOMSubtreeModified", function (){ document.getElementById ("islandName").textContent = document.getElementById ("islandBread").childNodes[0].textContent; }, false);
			}
		}

		if (pagina == "city" || pagina == "relatedCities"){
			if (pagina == "city"){
				info = document.getElementById ("information");
			}else{
				info = document.getElementById ("backTo");
			}
			
			if (info){
				var barra = document.getElementById ("breadcrumbs");
				var nombre = barra.childNodes[3].textContent.split ("[");
				info.childNodes[1].innerHTML =	"<a href='" + barra.getElementsByTagName ("a")[0].href + "' style='position: absolute; left: 5px; top: 4px;'><img src='http://" + host + "/skin/layout/icon-world.gif'/></a>" +
												"<span>" + nombre[0] + " [" + nombre[1] + "</span>";
				info.childNodes[1].childNodes[1].style.cursor = "pointer";
				info.childNodes[1].childNodes[1].addEventListener ("mouseover",
													function (){
														this.style.textDecoration = "underline";
													},
													false);
				info.childNodes[1].childNodes[1].addEventListener ("mouseout",
													function (){
														this.style.textDecoration = "none";
													},
													false);
				info.childNodes[1].childNodes[1].addEventListener ("click",
													function (){
														window.open (document.getElementById ("breadcrumbs").getElementsByTagName ("a")[1].href, "_self");
													},
													false);
			}
		}
		
		if (pagina == "island"){
			info = document.getElementById ("infocontainer");
			var nombre = document.getElementById ("breadcrumbs").childNodes[3].textContent.split ("[");
			info.childNodes[0].innerHTML =	"<a href='" + document.getElementById ("breadcrumbs").getElementsByTagName ("a")[0].href + "' style='position: absolute; left: 5px; top: 4px;'><img src='http://" + host + "/skin/layout/icon-world.gif'/></a>" +
											nombre[0] + " [" + nombre[1];
		}
	}
	
	/**
	 * Muestra la cantidad de vino necesária hasta que la población esté al máximo de capacidad.
	 */
	function vinoPoblacion (){
		if (pagina == "townHall"){
			vinoHora = document.getElementsByClassName ("serving")[0];
			if (vinoHora){
				//Existe taberna
				vinoHora = Math.floor (BaseDatos.taberna[parseInt (vinoHora.childNodes[0].textContent.replace ("+", ""))/60 - 1]*(1 - Ciudad.getPrensa ()/100));
				
				var poblacion = document.getElementsByClassName ("space")[0];
				var poblacionActual = parseInt (poblacion.childNodes[1].textContent);
				var poblacionTotal = parseInt (poblacion.childNodes[3].textContent);
				var num = poblacion.nextSibling.nextSibling.childNodes[3].textContent;
				var poblacionHora = parseFloat (num.match (/\d+/g).join ("."));
				
				if (num.search ("-") != -1 > 0 && (poblacionTotal != poblacionActual)){
					addGlobalStyle (
						"#townHall #CityOverview .stats { height: 155px; }"
					);
					
					var tiempoHora = ((poblacionTotal - poblacionActual)/poblacionHora);
					var tiempo = seg2Time (tiempoHora*3600);
					var vino = Math.ceil (tiempoHora*vinoHora);
					var t = "";
					var tmp = Lang["time"].split ("|");
					
					for (var i=0; i<3; i++){
						if (tiempo[i] != 0){
							t += tiempo[i] + tmp[i] + " ";
						}
					}
					
					var lista = document.getElementsByClassName ("stats")[0];
					
					var listaTiempo = document.createElement ("li");
					listaTiempo.style.position = "absolute";
					listaTiempo.style.left = "100px";
					listaTiempo.style.top = "72px";
					listaTiempo.style.backgroundImage = "url(http://" + host + "/skin/icons/growth_positive.gif)";
					listaTiempo.innerHTML =	"<span>" + Lang["time2"] + ":</span>" +
											"<span style='position: relative; left: 3px;'>" + t + "</span>" +
											"<img title='" + Lang["time2TitleTime"] + "' style='position: absolute; left: 170px; top: 3px;' src='" + Img.info + "'/>";
					
					var labelVino = document.getElementsByClassName ("cat wine")[0].childNodes[1].textContent;
					
					var listaVino = document.createElement ("li");
					listaVino.style.position = "absolute";
					listaVino.style.left = "100px";
					listaVino.style.top = "100px";
					listaVino.style.backgroundImage = "url(" + Img.vino + ")";
					listaVino.innerHTML =	"<span style='position: relative; left: 3px;'>" + labelVino + ":</span>" +
											"<span style='position: relative; left: 6px;'>" + vino + "</span>" +
											"<img title='" + Lang["time2TitleWine"] + "' style='position: absolute; left: 170px; top: 3px;' src='" + Img.info + "'/>";

					lista.appendChild (listaTiempo, lista);						
					lista.appendChild (listaVino, lista);
				}
			}
		}
	}

	if (pagina == "diplomacyAdvisorTreaty"){
		var span = document.getElementsByClassName ("button")[0];
		if (span){
			span.parentNode.parentNode.style.height = "50px";
			span.style.position = "relative";
			span.style.right = "225px";
			span.style.top = "15px";
		}
	}
	
	document.getElementById ("footer").innerHTML = "<center>" + Ciudad.getNombre () + "</center>";
	
	coordenadas ();
	vinoPoblacion ();
}

/**
 * Crea un botón para cambiar entre iconos normales y Premium.
 */
function creaIconoPremium (){
	/**
	 * Cambia entre iconos normales o Premium.
	 */
	function cambiaImg (){
		if (GM_getValue (server + "iconosPremium")){
			GM_setValue (server + "iconosPremium", false);
		}else{
			GM_setValue (server + "iconosPremium", true);
		}
		window.location.reload ();
	}

	//Compruebo si hay que poner iconos Premium
	var premium = GM_getValue (server + "iconosPremium", false);
	if (premium){
		addGlobalStyle (
			"#advisors #advCities a.normal { background-image: url(skin/layout/advisors/mayor_premium.gif); }" +
			"#advisors #advMilitary a.normal { background-image: url(skin/layout/advisors/general_premium.gif); }" +
			"#advisors #advResearch a.normal { background-image: url(skin/layout/advisors/scientist_premium.gif); }" +
			"#advisors #advDiplomacy a.normal { background-image: url(skin/layout/advisors/diplomat_premium.gif); }" +
			"#advisors #advCities a.normalactive { background-image: url(skin/layout/advisors/mayor_premium_active.gif); }" +
			"#advisors #advMilitary a.normalactive { background-image: url(skin/layout/advisors/general_premium_active.gif); }" +
			"#advisors #advResearch a.normalactive { background-image: url(skin/layout/advisors/scientist_premium_active.gif); }" +
			"#advisors #advDiplomacy a.normalactive { background-image: url(skin/layout/advisors/diplomat_premium_active.gif); }" +
			"#advisors #advMilitary a.normalalert { background-image: url(skin/layout/advisors/general_premium_alert.gif); }"
		);
	}

	var nuevoBoton = document.createElement ("img");
	nuevoBoton.setAttribute ("id", "botonImg");
	nuevoBoton.style.position = "absolute";
	nuevoBoton.style.right = "12px";
	nuevoBoton.style.top = "111px";
	nuevoBoton.style.cursor = "pointer";
	nuevoBoton.style.zIndex = "10000";
	if (premium){
		nuevoBoton.title = Lang["advisorPremiumIcon"];
	}else{
		nuevoBoton.title = Lang["advisorIcon"];
	}
	nuevoBoton.src = Img.premium;

	colocaDetras (nuevoBoton, document.getElementById ("header"));
	
	nuevoBoton.addEventListener ("click", cambiaImg, false);
}

/**
 * Permite ordenar las ciudades y añade un icono del bien de lujo de la ciudad.
 */
function ordenImagenCiudades (){
	/**
	 * Actualiza la variable ordenCiudades.
	 */
	function guardar (){
		var ciudades = GM_getValue (server + "ordenCiudades").split ("#");
		var lista = document.getElementsByClassName ("optionList")[n];
		var aux = [];
		
		var i = 0;
		var stop = false;
		while (i<lista.childNodes.length && !stop){
			var nombre = consultaNombre (lista.childNodes[i].childNodes[2].textContent);
		
			if (lista.childNodes[i].title != ""){
				var j = 0;
				var stop2 = false;
				while (j<ciudades.length && !stop2){
					if (nombre == ciudades[j].split ("|")[0]){
						aux[i] = nombre + "|" + ciudades[j].split ("|")[1];
						stop2 = true;
					}
					
					j++;
				}
			}else{
				stop = true;
			}
			
			i++;
		}
		
		GM_setValue (server + "ordenCiudades", aux.join ("#"));
	}

	/**
	 * Intercambia los nodos de las ciudades.
	 * @param b true si se intercambia con el de arriba, sinó, false.
	 * @param nodo nodo donde que se ha apretado.
	 */
	function cambiaNodos (b, nodo){
		var num = parseInt (nodo.className.split ("_")[1]);
		var lista = document.getElementsByClassName ("optionList")[n];
		
		if (b){
			var nodo2 = nodo.previousSibling;
			if (nodo2){
				var clase1 = nodo.className;
				clase1 = "fila_" + (parseInt (clase1.split ("_")[1]) - 1);
				nodo.className = clase1;
				var clase2 = nodo2.className;
				clase2 = "fila_" + (parseInt (clase2.split ("_")[1]) + 1);
				nodo2.className = clase2;
				
				if (nodo == nodo.parentNode.lastChild){
					if (lista.childNodes[lista.childNodes.length - 1].title == ""){
						lista.childNodes[lista.childNodes.length - 1].className = "deployedCities coords";
					}else{
						lista.childNodes[lista.childNodes.length - 1].className = "coords";
					}
				}
				
				swapNodos (nodo, nodo2);
					
				//Intercambio las ciudades
				for (var i=0; i<lista.childNodes.length; i++){
					if (num == i){
						swapNodos (lista.childNodes[i], lista.childNodes[i-1]);
					}

					if (i == 0){
						lista.childNodes[0].className = "coords first";
					}else if (i > 0 && i < lista.childNodes.length - 1){
						lista.childNodes[i].className = "coords";
					}else{
						if (lista.childNodes[i].title == ""){
							lista.childNodes[i].className = "deployedCities coords last";
						}else{
							lista.childNodes[i].className = "coords last";
						}
					}
				}
			}
		}else{
			var nodo2 = nodo.nextSibling;
			if (nodo2 && nodo2.className != "fila_x"){
				var clase1 = nodo.className;
				clase1 = "fila_" + (parseInt (clase1.split ("_")[1]) + 1);
				nodo.className = clase1;
				var clase2 = nodo2.className;
				clase2 = "fila_" + (parseInt (clase2.split ("_")[1]) - 1);
				nodo2.className = clase2;
				
				swapNodos (nodo2, nodo);
				
				//Intercambio las ciudades
				for (var i=0; i<lista.childNodes.length; i++){
					if (num == i){
						swapNodos (lista.childNodes[i+1], lista.childNodes[i]);
					}
					
					if (i == 0){
						lista.childNodes[0].className = "coords first";
					}else if (i > 0 && i < lista.childNodes.length - 1){
						lista.childNodes[i].className = "coords";
					}else{
						if (lista.childNodes[i].title == ""){
							lista.childNodes[i].className = "deployedCities coords last";
						}else{
							lista.childNodes[i].className = "coords last";
						}
					}
				}
			}
		}
		
		guardar ();
	}

	/**
	 * Añade una fila con la imagen del bien de lujo y las flechas.
	 * @param num número de fila.
	 * @param nombre nombre de la ciudad de la fila.
	 * @param b true si es una fila de mi ciudad, sinó, false.
	 */
	function creaFila (num, nombre, b){
		var fila = document.createElement ("tr");
		fila.style.height = "24px";
		fila.style.border = "thin solid #A58151";
		if (b){
			fila.className = "fila_" + num;
		}else{
			fila.className = "fila_x";
		}
		
		var img = "";
		if (!b){
			img = "<img src='" + Img.unidadesNoBonus + "'/>";
		}
		
		var columna = document.createElement ("td");
		columna.innerHTML = img;
		columna.style.width = "30px";
		
		if (b){
			columna.className = "ciudadesIcono";
			columna.title = nombre;
		}
		
		fila.appendChild (columna);
		
		if (b){
			var flecha = document.createElement ("img");
			flecha.style.cursor = "pointer";
			flecha.style.position = "relative";
			flecha.style.left = "4px";
			flecha.style.top = "-2px";
			flecha.style.display = "block";
			flecha.src = Img.ciudadesFlechaArriba;
			flecha.addEventListener ("click", function (){ cambiaNodos (true, this.parentNode.parentNode); }, false);
			
			var flecha2 = document.createElement ("img");
			flecha2.style.cursor = "pointer";
			flecha2.style.position = "relative";
			flecha2.style.left = "4px";
			flecha2.style.bottom = "-2px";
			flecha2.style.display = "block";
			flecha2.src = Img.ciudadesFlechaAbajo;
			flecha2.addEventListener ("click", function (){ cambiaNodos (false, this.parentNode.parentNode); }, false);
		}
		
		columna = document.createElement ("td");
		
		if (b){
			columna.appendChild (flecha);
			columna.appendChild (flecha2);
		}
							
		columna.style.width = "15px";
		fila.appendChild (columna);

		tabla.appendChild (fila);
	}
	
	/**
	 * Valida si el atributo que se ha modificado es el que oculta y hace visible la lista.
	 * @param nodo nodo del atributo que se modifica.
	 */
	function valida (nodo){
		var tablaIconos = document.getElementById ("tablaIconosCiudades");
		if (nodo.className == "optionList"){
			tablaIconos.style.visibility = "hidden";
			tablaAbierta = false;
		}else{
			tablaIconos.style.visibility = "visible";
			tablaAbierta = true;
		}	
	}
	
	var tablaAbierta = false;
	var n;
	if (pagina == "relatedCities"){
		n = 1;
	}else{
		n = 0;
	}
	var lista = document.getElementsByClassName ("optionList")[n];
	var ciudades = GM_getValue (server + "ordenCiudades").split ("#");

	var tabla = document.createElement ("table");
	tabla.id = "tablaIconosCiudades";
	tabla.border = "1";
	tabla.innerHTML = "";
	tabla.style.width = "45px";
	tabla.style.position = "relative";
	tabla.style.top = "32px";
	if (pagina == "museum"){
		tabla.style.left = "-19.6em";
		addGlobalStyle (
			"#museum table td{" +
				"padding: 0;" +
			"}"
		);
	}else if (pagina == "options"){
		tabla.style.left = "-19.6em";
		addGlobalStyle (
			"#options table td, #options table th {" +
				"padding: 0;" +
			"}"
		);
	}else{
		tabla.style.right = "33px";
	}
	tabla.style.border = "thin solid #A58151";
	tabla.style.backgroundImage = "url(" + Img.ciudadesFondo + ")";
	tabla.style.visibility = "hidden";

	var i = 0;
	while (i<ciudades.length){
		var stop = false;
		var j = i;
		while (j<lista.childNodes.length && !stop){
			if (lista.childNodes[j].title != ""){
				var nombre = consultaNombre (lista.childNodes[j].childNodes[2].textContent);

				if (nombre == ciudades[i].split ("|")[0]){
					stop = true;
					swapNodos (lista.childNodes[j], lista.childNodes[i]);
				}
			}else{
				stop = true;
			}
			
			j++;
		}
		
		creaFila (i, nombre, true);
		
		if (i == 0){
			lista.childNodes[0].className = "coords first";
		}else{
			lista.childNodes[i].className = "coords";
		}
		
		i++;
	}

	for (var j=i; j<lista.childNodes.length; j++){
		creaFila (-1, "", false);
	}
	
	var nodo = lista.childNodes[lista.childNodes.length - 1];
	if (nodo.title == ""){
		nodo.className = "deployedCities coords last";
	}else{
		nodo.className = "coords last";
	}
	
	colocaDelante (tabla, document.getElementById ("changeCityForm"));

	//Añado un listener al botón para mostrar la lista de ciudades
	document.getElementsByClassName ("optionList")[n].addEventListener ("DOMAttrModified", function (){ valida (this); }, false);
}

/**
 * Crea un panel con accesos a más paneles.
 */
function menuPaneles (){
	if (pagina == "city" && Ciudad.getMia ()){
		//Cargo la disposición de los paneles (abiertos o cerrados)
		var menu = GM_getValue (server + "menu", "0#0#0").split ("#");
	
		var menuAbierto = false;
		var pos = document.getElementById ("information");
		
		//Menú de los paneles
		var capa = document.createElement ("div");
		capa.id = "menuPaneles";
		capa.className = "dynamic";
		capa.style.display = "none";
		
		capa.innerHTML =	"<h3 class='header'>" + Lang["menu"] + "</h3>" +
							"<div class='content' style='height: 20px;'>" +
								"<img id='iconoMenuPuntos' title='" + Lang["pointsPlayer"] + "' style='cursor: pointer; position: absolute; top: 3px; left: 60px;' src='" + Img.menuPanelPuntos + "'/></li>" +
								"<img id='iconoMenuTransporte' title='" + Lang["moveUnits"] + "' style='cursor: pointer; position: absolute; top: 3px; left: 100px;' src='" + Img.menuPanelTransporte + "'/></li>" +
								"<img id='iconoMenuImagen' title='" + Lang["cityImage"] + "' style='cursor: pointer; position: absolute; top: 3px; left: 140px;' src='" + Img.menuPanelImagenFondo + "'/></li>" +
							"</div>" +
							"<div class='footer'></div>";
		
		colocaDetras (capa, pos);
		
		//Botón para abrir el menú
		var panel = document.createElement ("img");
		panel.setAttribute ("width", "19px");
		panel.src = Img.panelImagenFondo;
		panel.style.position = "absolute";
		panel.style.top = "5px";
		panel.style.right = "5px";
		panel.style.cursor = "pointer";
		panel.title = Lang["openMenu"];
		panel.addEventListener ("click",
								function (){
									if (!menuAbierto){
										document.getElementById ("menuPaneles").style.display = "inline";
										menuAbierto = true;
									}else{
										document.getElementById ("menuPaneles").style.display = "none";
										menuAbierto = false;
									}
								},
								false);

		pos.appendChild (panel);
		
		//Listener de los iconos del panel
		var img = document.getElementById ("iconoMenuPuntos");
		img.addEventListener (	"click",
								function (){
									if (menu[1] == "0"){
										creaPanelPuntos ();
										menu[1] = "1";
										GM_setValue (server + "menu", menu.join ("#"));
									}else{
										eliminaNodo (document.getElementById ("menuPanelPuntos"));
										menu[1] = "0";
										GM_setValue (server + "menu", menu.join ("#"));
									}
								},
								false);
		
		img = document.getElementById ("iconoMenuTransporte");
		img.addEventListener (	"click",
								function (){
									if (menu[0] == "0"){
										creaPanelTransporte ();
										menu[0] = "1";
										GM_setValue (server + "menu", menu.join ("#"));
									}else{
										eliminaNodo (document.getElementById ("menuPanelTransporte"));
										menu[0] = "0";
										GM_setValue (server + "menu", menu.join ("#"));
									}
								},
								false);
								
		img = document.getElementById ("iconoMenuImagen");
		img.addEventListener (	"click",
								function (){
									if (menu[2] == "0"){
										creaPanelImagen ();
										menu[2] = "1";
										GM_setValue (server + "menu", menu.join ("#"));
									}else{
										eliminaNodo (document.getElementById ("menuPanelImagen"));
										menu[2] = "0";
										GM_setValue (server + "menu", menu.join ("#"));
									}
								},
								false);
								
		//Creo los paneles
		if (menu[2] == "1"){
			creaPanelImagen ();
		}
		
		if (menu[0] == "1"){
			creaPanelTransporte ();
		}
		
		if (menu[1] == "1"){
			creaPanelPuntos ();
		}
	}
}

/**
 * Crea un panel para saber la puntuación del jugador.
 */
function creaPanelPuntos (){
	var capa = document.createElement ("div");
	capa.id = "menuPanelPuntos";
	capa.className = "dynamic";
	
	if (panelesScript[0] == "1"){
		var abierto = true;
		var imagen = Img.minimizarPanel;
		var vis = "visible";
		var hei = "auto";
	}else{
		var abierto = false;
		var imagen = Img.maximizarPanel;
		var vis = "hidden";
		var hei = "0";
	}
	
	capa.innerHTML =	"<h3 class='header'>" + Lang["pointsPlayer"] + "<img src='" + imagen + "' style='position: absolute; right: 5px; top: 7px; cursor: pointer;'/></h3>" +
						"<div class='content' style='visibility: " + vis + "; height: " + hei + ";'>" +
							"<table style='width: 100%;'>" +
								"<tr>" +
									"<td style='padding: 5px;'>" + Lang["score"] + "</td>" +
									"<td id='menuPuntuacion' style='font-weight: bold; text-align: right; padding-right: 5px;'>...</td>" +
								"</tr>" +
								"<tr>" +
									"<td style='padding: 5px;'>" + Lang["generals"] + "</td>" +
									"<td id='menuGenerales' style='font-weight: bold; text-align: right; padding-right: 5px;'>...</td>" +
								"</tr>" +
							"</table>" +
						"</div>" +
						"<div class='footer'></div>";
	
	colocaDetras (capa, document.getElementById ("menuPaneles"));
	
	document.getElementById ("menuPanelPuntos").getElementsByTagName ("img")[0].addEventListener (
		"click",
		function (){
			var contenido = this.parentNode.parentNode.childNodes[1];
			
			if (abierto){
				abierto = false;
				this.src = Img.maximizarPanel;
				contenido.style.visibility = "hidden";
				contenido.style.height = "0";
				panelesScript[0] = 0;
				GM_setValue (server + "paneles", panelesScript.join ("#"));
			}else{
				abierto = true;
				this.src = Img.minimizarPanel;
				contenido.style.height = "auto";
				contenido.style.visibility = "visible";
				panelesScript[0] = 1;
				GM_setValue (server + "paneles", panelesScript.join ("#"));
			}
		},
		false
	);
	
	//Obtengo la puntuación total
	var url = "http://" + host + "/index.php?view=highscore&showMe=1";
	
	GM_xmlhttpRequest ({
		method: "GET",
		url: url,
		headers: {
			"User-agent": "Mozilla/5.0",
			"Accept": "text/html",
		},
		onload: function (respuesta){
			var pagina = document.implementation.createDocument ("", "", null);
			var html = document.createElement ("html");
			html.innerHTML = respuesta.responseText;
			pagina.appendChild (html);

			var fila = pagina.getElementsByClassName ("own")[0];
			if (!fila){
				pagina.getElementsByClassName ("alt own")[0];
			}
			
			document.getElementById ("menuPuntuacion").textContent = fila.childNodes[7].textContent;
			
			//Obtengo las generales
			url = "http://" + host + "/index.php";
			var boton = pagina.getElementById ("offset").parentNode.childNodes[7].value;
			
			GM_xmlhttpRequest ({
				method: "POST",
				url: url,
				data: "highscoreType=army_score_main&offset=-1&view=highscore&submit=" + boton + "&searchUser=&view=highscore",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function (respuesta){
					var pagina = document.implementation.createDocument ("", "", null);
					var html = document.createElement ("html");
					html.innerHTML = respuesta.responseText;
					pagina.appendChild (html);
					
					var fila = pagina.getElementsByClassName ("own")[0];
					if (!fila){
						pagina.getElementsByClassName ("alt own")[0];
					}

					document.getElementById ("menuGenerales").textContent = fila.childNodes[7].textContent;
				}
			});
		}
	});
}

/**
 * Crea un panel para poder desplegar unidades.
 */
function creaPanelTransporte (){
	/**
	 * Crea la lista de ciudades.
	 * @return contenido para añadir al panel.
	 */
	function creaContenido (){
		var contenido = "<ul id='listaIconosTransportar'>";
		var ciudades = GM_getValue (server + "ordenCiudades").split ("#");
		var top = 3;

		for (var i=0; i<ciudades.length; i++){
			var ciudad = ciudades[i].split ("|")[0];
			
			if (ciudad != Ciudad.getNombre ()){
				contenido += "<li style='padding: 5px 0 4px 5px;'>";
				contenido += "<span>" + ciudad + "</span>";
				contenido +=	"<img title='" + Lang["moveResources"] + "' style='cursor: pointer; position: absolute; right: 65px; top: " + top + "px;' src='" + Img.transportarRecursos + "'/>" +
								"<img title='" + Lang["moveTroops"] + "' style='cursor: pointer; position: absolute; right: 36px; top: " + top + "px;' src='" + Img.transportarTropas + "'/>" +
								"<img title='" + Lang["moveFleets"] + "' style='cursor: pointer; position: absolute; right: 7px; top: " + top + "px;' src='" + Img.transportarFlotas + "'/>";
				contenido += "</li>";
				
				top += 25;
			}
		}
		
		contenido += "</ul>";
		
		return contenido;
	}
	
	/**
	 * Calcula la dirección donde redirigir la página para enviar unidades.
	 * @param ciudad ciudad a la que se quieren enviar unidades.
	 * @param n 0 si se transportan recursos, 1, si se envian tropas y 2 si se envian flotas.
	 */
	function calculaDireccion (ciudad, n){
		var url = "http://" + host + "/index.php?";
		switch (n){
			case 0:
				url += "view=transport&destinationCityId=";
				break;
			case 1:
				url += "view=deployment&deploymentType=army&destinationCityId=";
				break;
			case 2:
				url += "view=deployment&deploymentType=fleet&destinationCityId=";
				break;
		}
		
		url += GM_getValue (server + ciudad).split ("#")[4];
		
		window.open (url, "_self");
	}

	var capa = document.createElement ("div");
	capa.id = "menuPanelTransporte";
	capa.className = "dynamic";
	
	if (panelesScript[1] == "1"){
		var abierto = true;
		var imagen = Img.minimizarPanel;
		var vis = "visible";
		var hei = "auto";
	}else{
		var abierto = false;
		var imagen = Img.maximizarPanel;
		var vis = "hidden";
		var hei = "0";
	}
	
	var contenido = creaContenido ();
	
	capa.innerHTML =	"<h3 class='header'>" + Lang["moveUnits"] + "<img src='" + imagen + "' style='position: absolute; right: 5px; top: 7px; cursor: pointer;'/></h3>" +
						"<div class='content' style='visibility: " + vis + "; height: " + hei + ";'>" + contenido + "</div>" +
						"<div class='footer'></div>";
	
	var panelPuntos = document.getElementById ("menuPanelPuntos");
	if (panelPuntos){
		colocaDetras (capa, panelPuntos);
	}else{
		colocaDetras (capa, document.getElementById ("menuPaneles"));
	}
	
	document.getElementById ("menuPanelTransporte").getElementsByTagName ("img")[0].addEventListener (
		"click",
		function (){
			var contenido = this.parentNode.parentNode.childNodes[1];
			
			if (abierto){
				abierto = false;
				this.src = Img.maximizarPanel;
				contenido.style.visibility = "hidden";
				contenido.style.height = "0";
				panelesScript[1] = 0;
				GM_setValue (server + "paneles", panelesScript.join ("#"));
			}else{
				abierto = true;
				this.src = Img.minimizarPanel;
				contenido.style.height = "auto";
				contenido.style.visibility = "visible";
				panelesScript[1] = 1;
				GM_setValue (server + "paneles", panelesScript.join ("#"));
			}
		},
		false
	);

	//Añado listeners a todos los iconos
	var lista = document.getElementById ("listaIconosTransportar");
	for (var i=0; i<lista.childNodes.length; i++){
		var img = lista.childNodes[i].getElementsByTagName ("img");
		img[0].addEventListener ("click", function (){ calculaDireccion (this.parentNode.childNodes[0].textContent, 0); }, false);
		img[1].addEventListener ("click", function (){ calculaDireccion (this.parentNode.childNodes[0].textContent, 1); }, false);
		img[2].addEventListener ("click", function (){ calculaDireccion (this.parentNode.childNodes[0].textContent, 2); }, false);
	}
}

/**
 * Crea un panel para poder cambiar la imagen de la ciudad.
 */
function creaPanelImagen (){
	var capa = document.createElement ("div");
	capa.id = "menuPanelImagen";
	capa.className = "dynamic";
	
	if (panelesScript[0] == "1"){
		var abierto = true;
		var imagen = Img.minimizarPanel;
		var vis = "visible";
		var hei = "auto";
	}else{
		var abierto = false;
		var imagen = Img.maximizarPanel;
		var vis = "hidden";
		var hei = "0";
	}
	
	capa.innerHTML = "<h3 class='header'>" + Lang["cityImage"] + "<img src='" + imagen + "' style='position: absolute; right: 5px; top: 7px; cursor: pointer;'/></h3>" +
					"<div class='content' style='visibility: " + vis + "; height: " + hei + ";'>" +
						"<table style='width: 100%;'>" +
							"<tr>" +
								"<td style='padding-left: 5px;'>" + Ciudad.getNombre () + "</td>" +
								"<td style='padding-right: 5px; text-align: right'>" + Lang["cityLevel"] + ": <select id='selectImagen'></select></td>" +
							"</tr>" +
						"</table>" +
					"</div>" +
					"<div class='footer'></div>";
					
	var panel = document.getElementById ("menuPanelTransporte");
	if (panel){
		colocaDetras (capa, panel);
	}else{
		panel = document.getElementById ("menuPanelPuntos");
		if (panel){
			colocaDetras (capa, panel);
		}else{
			colocaDetras (capa, document.getElementById ("menuPaneles"));
		}
	}
	
	document.getElementById ("menuPanelImagen").getElementsByTagName ("img")[0].addEventListener (
		"click",
		function (){
			var contenido = this.parentNode.parentNode.childNodes[1];
			
			if (abierto){
				abierto = false;
				this.src = Img.maximizarPanel;
				contenido.style.visibility = "hidden";
				contenido.style.height = "0";
				panelesScript[2] = 0;
				GM_setValue (server + "paneles", panelesScript.join ("#"));
			}else{
				abierto = true;
				this.src = Img.minimizarPanel;
				contenido.style.height = "auto";
				contenido.style.visibility = "visible";
				panelesScript[2] = 1;
				GM_setValue (server + "paneles", panelesScript.join ("#"));
			}
		},
		false
	);
	
	//Consultamos el nivel de la ciudad
	var filtro = new RegExp (/\d+/);
	var nivel = filtro.exec (document.getElementById ("position0").childNodes[3].title);
	
	//Actualizo el nivel original (y el nivel modificado si es el caso)
	Ciudad.setNivelOriginal (nivel);
	
	var select = document.getElementById ("selectImagen");
	for (var i=1; i<=24; i++){
		var op = new Option (i, i);
		if (i == Ciudad.getNivelModificado ()){
			op.selected = true;
		}
		select.add (op, null);
	}
	
	addGlobalStyle (
		"#city #container .phase" + Ciudad.getNivelOriginal () + " {" +
			"background-image: url(skin/img/city/city_level" + Ciudad.getNivelModificado () + ".jpg);" +
		"}"
	)

	select.addEventListener ("change",
							function (){
								Ciudad.setNivelModificado (this.value);
								window.location.reload ();
							},
							false);
}

/**
 * Cambia de lugar las coordenadas de la isla.
 */
function cambiaCoords (){
	var info;
	
	if (pagina == "worldmap_iso"){

		document.getElementById ("islandName").textContent = document.getElementById ("islandBread").childNodes[0].textContent;
	
		info = document.getElementById ("information");
		if (info){
			info.childNodes[3].addEventListener ("DOMSubtreeModified", function (){ document.getElementById ("islandName").textContent = document.getElementById ("islandBread").childNodes[0].textContent; }, false);
		}
	}

	if (pagina == "city" || pagina == "relatedCities"){
		if (pagina == "city"){
			info = document.getElementById ("information");
		}else{
			info = document.getElementById ("backTo");
		}
		
		if (info){
			var barra = document.getElementById ("breadcrumbs");
			var nombre = barra.childNodes[3].textContent.split ("[");
			info.childNodes[1].innerHTML =	"<a href='" + barra.getElementsByTagName ("a")[0].href + "' style='position: absolute; left: 5px; top: 4px;'><img src='http://" + host + "/skin/layout/icon-world.gif'/></a>" +
											"<span>" + nombre[0] + " [" + nombre[1] + "</span>";
			info.childNodes[1].childNodes[1].style.cursor = "pointer";
			info.childNodes[1].childNodes[1].addEventListener ("mouseover",
												function (){
													this.style.textDecoration = "underline";
												},
												false);
			info.childNodes[1].childNodes[1].addEventListener ("mouseout",
												function (){
													this.style.textDecoration = "none";
												},
												false);
			info.childNodes[1].childNodes[1].addEventListener ("click",
												function (){
													window.open (document.getElementById ("breadcrumbs").getElementsByTagName ("a")[1].href, "_self");
												},
												false);
		}
	}
	
	if (pagina == "island"){
		info = document.getElementById ("infocontainer");
		var nombre = document.getElementById ("breadcrumbs").childNodes[3].textContent.split ("[");
		info.childNodes[0].innerHTML =	"<a href='" + document.getElementById ("breadcrumbs").getElementsByTagName ("a")[0].href + "' style='position: absolute; left: 5px; top: 4px;'><img src='http://" + host + "/skin/layout/icon-world.gif'/></a>" +
										nombre[0] + " [" + nombre[1];
	}
}

/**
 * Crea botones para aumentar de 500 en 500 los recursos para transportar.
 * También crea botones de reset.
 */
function creaBotonesRecursos (){
	/**
	 * Suma puntos en los recursos para ser transportados.
	 * @param num número de recursos a sumar.
	 * @param boton botón que se ha apretado.
	 * @param i número de hijo del nodo padre.
	 */
	function sumaPuntos (num, boton, i){
		boton.blur ();

		var input = document.getElementsByClassName ("resourceAssign")[0].childNodes[i].childNodes[5];
		
		var n = parseInt (input.value);
		if (!n){
			n = 0;
		}
		input.value = n + num;

		//Simulamos key up para actualizar el valor
		var evt = document.createEvent ("KeyEvents");
		evt.initKeyEvent ("keyup", true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent (evt);

	}

	/**
	 * Pone a 0 los puntos de los recursos para ser transportados.
	 * @param boton botón que se ha apretado.
	 * @param i número de hijo del nodo padre.
	 */
	function resetPuntos (boton, i){
		boton.blur ();

		var input = document.getElementsByClassName ("resourceAssign")[0].childNodes[i].childNodes[5];
		
		input.value = 0;

		//Simulamos keyup para actualizar el valor
		var evt = document.createEvent ("KeyEvents");
		evt.initKeyEvent ("keyup", true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent (evt);
	}

	/**
	 * Pone el máximo de los recursos.
	 * @param boton botón que se ha apretado.
	 * @param i número de hijo del nodo padre.
	 */
	function maxPuntos (boton, i){
		var input = document.getElementsByClassName ("resourceAssign")[0].childNodes[i].childNodes[5];
		input.style.color = "#FFFBF2";
		input.value = 1000000000;

		//Simulamos keyup para actualizar el valor
		var evt = document.createEvent ("KeyEvents");
		evt.initKeyEvent ("keyup", true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent (evt);
		
		input.style.color = "#000";
	}

	/**
	 * Crea y añade los botones de +500 y Reset.
	 * @param barras elemento donde se añaden los botones.
	 * @param i número de hijo de barras donde añadir los botones.
	 */
	function creaBotones (barras, i){
		var boton1 = document.createElement ("input");
		boton1.setAttribute ("type", "button");
		boton1.setAttribute ("class", "button");
		boton1.setAttribute ("value", "+500");
		boton1.style.position = "absolute";
		boton1.style.left = "515px";
		boton1.style.bottom = "-4px";
		
		var boton2 = document.createElement ("input");
		boton2.setAttribute ("type", "button");
		boton2.setAttribute ("class", "button");
		boton2.setAttribute ("value", "+1000");
		boton2.style.position = "absolute";
		boton2.style.left = "584px";
		boton2.style.bottom = "-4px";
		
		var boton3 = document.createElement ("span");
		boton3.style.position = "absolute";
		boton3.style.left = "410px";
		boton3.style.top = "32px";
		boton3.style.width = "126px";
		boton3.innerHTML = "<div><center><span style='cursor: pointer;'><b><u>" + Lang["max"] + "</u></b></span></center></div>";
		
		var boton4 = document.createElement ("span");
		boton4.style.position = "absolute";
		boton4.style.left = "410px";
		boton4.style.top = "-10px";
		boton4.style.width = "126px";
		boton4.innerHTML = "<div><center><span style='cursor: pointer;'><b><u>reset</u></b></span></center></div>";

		boton1.addEventListener ("click", function (){ sumaPuntos (500, this, i); }, false);
		boton2.addEventListener ("click", function (){ sumaPuntos (1000, this, i); }, false);
		boton3.childNodes[0].childNodes[0].childNodes[0].addEventListener ("click", function (){ maxPuntos (this, i); }, false);
		boton4.childNodes[0].childNodes[0].childNodes[0].addEventListener ("click", function (){ resetPuntos (this, i); }, false);
		
		barras.childNodes[i].appendChild (boton1);
		barras.childNodes[i].appendChild (boton2);
		barras.childNodes[i].appendChild (boton3);
		barras.childNodes[i].appendChild (boton4);
	}

	//Botones en el transporte
	if (pagina == "transport"){
		var barras = document.getElementsByClassName ("resourceAssign")[0];
		
		if (barras){
			barras.childNodes[1].style.marginTop = "15px";
			for (var i=1; i<barras.childNodes.length - 1; i += 2){
				barras.style.marginTop = "10px";
				barras.childNodes[i].style.left = "-76px";
				barras.childNodes[i].style.marginBottom = "26px";
				barras.childNodes[i].childNodes[5].style.top = "8px";
				
				creaBotones (barras, i);
			}
		}
	}else if (pagina == "colonize"){
		//Botones en crear una colonia
		var barras = document.getElementsByClassName ("resourceAssign")[0];
		
		if (barras){
			barras.childNodes[1].style.marginTop = "15px";
			for (var i=1; i<barras.childNodes.length - 2; i += 2){
				barras.style.marginTop = "10px";
				barras.childNodes[i].style.left = "-76px";
				barras.childNodes[i].style.marginBottom = "26px";
				barras.childNodes[i].childNodes[5].style.top = "8px";
				
				creaBotones (barras, i);
			}
			
			var barra = barras.childNodes[barras.childNodes.length - 2];
			barra.style.position = "relative";
			barra.style.right = "70px";
		}
	}
}

/**
 * Informa si hay ganancia o pérdida de oro cuando los trabajadores se aumentan o disminuyen en el aserradero, mina o academia.
 * También añade el oro total ganado entre todas las ciudades.
 */
function informaOroMinas (){
	/**
	 * Al aumentar o disminuir los trabajadores/investigadores comprueba si hay ganancia o pérdida de oro.
	 * También añade el oro total de las ciudades.
	 * @param manutencion oro que necesitan las tropas.
	 * @param ingresos etiqueta con el oro restante de los trabajadores.
	 * @param resultado oro total ganado sin contar la ciudad actual.
	 */
	function compruebaOro (manutencion, ingresos, resultado){
		var oroCiudad = parseInt (ingresos.textContent) - manutencion;
		if (oroCiudad < 0){
			ingresos.style.color = "#FF0000";
			ingresos.style.fontWeight = "bold";
		}else{
			ingresos.style.color = "#612D04";
			ingresos.style.fontWeight = "normal";
		}

		document.getElementById ("oroCiudades").textContent = transformaCifra (resultado + oroCiudad);
	}

	if (pagina == "resource" || pagina == "tradegood" || pagina == "academy"){
		//Consultamos el oro neto que se gana o se pierde
		var url = document.getElementById ("globalResources").childNodes[3].childNodes[4].childNodes[0].href;
		var ingresos = document.getElementById ("valueWorkCosts");
		var manutencion;
		var resultado;
		
		var barra = document.getElementById ("sliderthumb");
		barra.addEventListener ("DOMAttrModified", function (){ compruebaOro (manutencion, ingresos, resultado); }, false);
		
		var input;
		var panel;
		if (pagina == "academy"){
			input = document.getElementById ("inputScientists");
			panel = document.getElementById ("setScientists");
		}else{		
			input = document.getElementById ("inputWorkers");
			panel = document.getElementById ("setWorkersBox");
		}
		input.addEventListener ("keyup", function (){ compruebaOro (manutencion, ingresos, resultado); }, false);
		
		var tmp = panel.getElementsByClassName ("gain")[0];
		tmp.style.position = "absolute";
		tmp.style.left = "100px";
		tmp = panel.getElementsByClassName ("costs")[0]
		tmp.style.position = "absolute";
		tmp.style.left = "350px";
		tmp.childNodes[1].style.position = "relative";
		tmp.childNodes[1].style.bottom = "2px";
		tmp.childNodes[4].style.position = "relative";
		tmp.childNodes[4].style.bottom = "2px";
		
		var eti = document.createElement ("span");
		eti.style.position = "absolute";
		eti.style.top = "25px";
		eti.style.left = "470px";
		eti.style.zIndex = "1000";
		eti.innerHTML = "<img src='http://" + host + "/skin/layout/sigma.gif'/><span style='position: relative; left: 10px; bottom: 2px;' id='oroCiudades'>...</span>";
		colocaDelante (eti, panel.getElementsByTagName ("ul")[0]);
		
		GM_xmlhttpRequest ({
			method: "GET",
			url: url,
			headers: {
						"User-agent": "Mozilla/5.0",
						"Accept": "text/html",
					 },
			onload: function (respuesta){
				var pagina = document.implementation.createDocument ("", "", null);
				var html = document.createElement ("html");
				html.innerHTML = respuesta.responseText;
				pagina.appendChild (html);
				
				var ciudades = pagina.getElementById ("balance").childNodes[1];
				var stop = false;
				var i = 2;

				while (i<=ciudades.childNodes.length - 6 && !stop){
					if (ciudades.childNodes[i].childNodes[1].textContent == Ciudad.getNombre ()){
						stop = true;
						manutencion = parseInt (ciudades.childNodes[i].childNodes[5].textContent.replace (/[.,]/g, ""));
						var oroCiudad = parseInt (ciudades.childNodes[i].childNodes[7].textContent.replace (/[.,]/g, ""));
					}
					
					i += 2;
				}

				var oroCiudades = ciudades.childNodes[ciudades.childNodes.length - 4].childNodes[7].textContent.replace (/[.,]/g, "");
				var num = transformaCifra (oroCiudades);
				document.getElementById ("oroCiudades").textContent = num;
				
				resultado = oroCiudades - oroCiudad;
				
				if (parseInt (ingresos.textContent) - manutencion < 0){
					ingresos.style.color = "#FF0000";
					ingresos.style.fontWeight = "bold";
				}
			}
		});
	}
}

/**
 * Añade información útil en las minas.
 */
function creaInfoMinas (){
	/**
	 * Consulta el número de trabajadores máximo de un nivel.
	 * @param lvl nivel del aserradero/mina.
	 * @param b1 true si es aserradero, sinó, false.
	 * @param b2 true si hay investigación, sinó, false.
	 * @return número máximo de trabajadores.
	 */
	function getMaxTrabajadores (lvl, b1, b2){
		var aserradero = BaseDatos.aserradero.normal;
		var aserraderoInves = BaseDatos.aserradero.investigacion;
		
		var mina = BaseDatos.mina.normal;
		var minaInves = BaseDatos.mina.investigacion;
		if (b1){
			if (lvl > BaseDatos.aserradero.maxLvl){
				return Lang["notAvailable"];
			}else{
				if (b2){
					return aserraderoInves[lvl - 1];
				}else{
					return aserradero[lvl - 1];
				}
			}
		}else{
			if (lvl > BaseDatos.mina.maxLvl){
				return Lang["notAvailable"];
			}else{
				if (b2){
					return minaInves[lvl - 1];
				}else{
					return mina[lvl - 1];
				}
			}
		}
	}

	if (pagina == "resource" || pagina == "tradegood"){
		var div = document.getElementsByClassName ("resources");

		if (!div[1]) return;

		var num = parseInt (div[0].childNodes[1].childNodes[1].textContent.replace (/[.,]/g, "")) - parseInt (div[1].childNodes[1].childNodes[1].textContent.replace (/[.,]/g, ""));
		var cad = transformaCifra (num);
		
		var titulo = document.createElement ("h4");
		titulo.innerHTML = Lang["remainingResources"];
		
		var form = document.getElementsByClassName ("content")[0].getElementsByTagName ("form")[0];
		
		colocaDelante (titulo, form);
		
		var ul = document.createElement ("ul");
		ul.setAttribute ("class", "resources");
		ul.innerHTML = "<li class='wood'>" + cad + "</li>";
		colocaDelante (ul, form);

		if (pagina == "resource"){
			var aserradero = true;
		}else{
			var aserradero = false;
		}

		var num = parseInt (document.getElementsByClassName ("buildingLevel")[0].childNodes[1].textContent);
		var maxLvl = getMaxTrabajadores (num, aserradero, false);
		var maxLvlSig = getMaxTrabajadores (num + 1, aserradero, false);
		var maxLvlInves = getMaxTrabajadores (num, aserradero, true);
		var maxLvlSigInves = getMaxTrabajadores (num + 1, aserradero, true);
		
		var div = document.getElementsByClassName ("buildingLevel")[0];
		div.style.height = "145px";
		
		var lvl = div.childNodes[1].textContent;
		
		var info = document.createElement ("div");
		info.style.fontSize = "10px";
		info.style.fontWeight = "normal";
		info.innerHTML = Lang["maxWorkers"] +
						 "<br/><br/><center><table>" +
							"<tr>" +
								"<td width='60px'><center><u>" + Lang["cityLevel"] + " " + lvl + "</u></center></td>" +
								"<td width='30px'></td>" +
								"<td width='60px'><center><u>" + Lang["cityLevel"] + " " + (parseInt (lvl) + 1) + "</u></center></td>" +
							"</tr>" +
							"<tr>" +
								"<td style='font-size: 12px;'><center><b>" + maxLvl + "</b></center></td>" +
								"<td><img src='" + Img.flecha + "'/></td>" +
								"<td style='font-size: 12px;'><center><b>" + maxLvlSig + "</b></center></td>" +
							"</tr>" +
							"<tr>" +
								"<td style='font-size: 10px;'><center>(" + maxLvlInves + ")</center></td>" +
								"<td></td>" +
								"<td style='font-size: 10px;'><center>(" + maxLvlSigInves + ")</center></td>" +
							"</tr>" +
						 "</table></center>" +
						 "<img title='" + Lang["helpingHands"] + "' style='position: relative; bottom: 20px; right: 75px;' src='" + Img.info + "'/>";
		
		div.appendChild (info);
	}
}

/**
 * Añade links directos al aserradero y mina en la barra de recursos
 * y coloca el icono del bien de lujo de la ciudad en la lista de ciudades.
 */
function creaLinkMinas (){
	/**
	 * Actualiza la variable ordenCiudades con el bien de lujo de la ciudad.
	 * @param nodo tipo de bien de lujo de la ciudad.
	 */
	function actualizaVariable (nodo){
		var cad = GM_getValue (server + "ordenCiudades").split ("#");
		
		var stop = false;
		var i = 0;
		while (i<cad.length && !stop){
			if (cad[i].split ("|")[0] == Ciudad.getNombre ()){
				cad[i] = Ciudad.getNombre () + "|" + nodo;
				stop = true;
			}
			
			i++;
		}
		
		GM_setValue (server + "ordenCiudades", cad.join ("#"));
	}
	
	function rellena (){
		var cad = GM_getValue (server + "ordenCiudades").split ("#");
		var imgCiudades = document.getElementsByClassName ("ciudadesIcono");
		
		for (var i=0; i<imgCiudades.length; i++){
			var j = 0;
			var stop = false;
			var icono = "";
			
			while (j<cad.length && !stop){
				if (imgCiudades[i].title == cad[j].split ("|")[0]){
					stop = true;
					switch (parseInt (cad[j].split ("|")[1])){
						case 7:
							icono = "<img style='width: 20px; position: relative; top: 1px;' src='" + Img.vino + "'/>";
							break;
						
						case 9:
							icono = "<img style='width: 20px; position: relative; top: 1px;' src='" + Img.marmol + "'/>";
							break;
							
						case 11:
							icono = "<img style='width: 20px; position: relative; top: 1px;' src='" + Img.cristal + "'/>";
							break;
							
						case 13:
							icono = "<img style='width: 20px; position: relative; top: 1px;' src='" + Img.azufre + "'/>";
							break;
					}
				}
				
				j++;
			}
			
			imgCiudades[i].innerHTML = icono;
		}
	}
	
	var id = document.getElementsByClassName ("viewIsland")[0].firstChild.href.split ("id=")[1];
	var linkAserradero = "http://" + host + "/index.php?view=resource&type=resource&id=" + id;
	var nodoAserradero = document.getElementById ("cityResources").childNodes[2];
	
	if (nodoAserradero){
		nodoAserradero = nodoAserradero.childNodes[5].childNodes[2];
		nodoAserradero.style.cursor = "pointer";
		nodoAserradero.style.textDecoration = "underline";
		nodoAserradero.addEventListener ("click",
										function (){
											window.open (linkAserradero, "_self");
										},
										false);
	}
	
	var nodo = Ciudad.getMina ();

	if (nodo == -1){
		var url = document.getElementsByClassName ("viewIsland")[0].firstChild.href;
		
		GM_xmlhttpRequest ({
			method: "GET",
			url: url,
			headers: {
						"User-agent": "Mozilla/5.0",
						"Accept": "text/html",
					 },
			onload: function (respuesta){
				var isla = document.implementation.createDocument ("", "", null);
				var html = document.createElement ("html");
				html.innerHTML = respuesta.responseText;
				isla.appendChild (html);
				
				var mina = isla.getElementById ("tradegood").className.split (" ")[0];
				switch (mina){
					case "wine":
						nodo = 7;
						break;
					
					case "marble":
						nodo = 9;
						break;
						
					case "crystal":
						nodo = 11;
						break;
						
					case "sulfur":
						nodo = 13;
						break;
				}

				Ciudad.setMina (nodo);
			
				var linkMina = "http://" + host + "/index.php?view=tradegood&type=tradegood&id=" + id;
				var nodoMina = document.getElementById ("cityResources").childNodes[2];
				
				if (nodoMina){
					nodoMina = nodoMina.childNodes[nodo].childNodes[2];
					nodoMina.style.cursor = "pointer";
					nodoMina.style.textDecoration = "underline";
					nodoMina.addEventListener ("click",
												function (){
													window.open (linkMina, "_self");
												},
												false);
				}
				
				//Actualizo la variable ordenCiudades
				actualizaVariable (nodo);
				
				//Leo el contenido de la variable ordenCiudades y coloco los iconos
				rellena ();
			}
		});
	}else{
		var linkMina = "http://" + host + "/index.php?view=tradegood&type=tradegood&id=" + id;
		var nodoMina = document.getElementById ("cityResources").childNodes[2];
		
		if (nodoMina){
			nodoMina = nodoMina.childNodes[nodo].childNodes[2];
			nodoMina.style.cursor = "pointer";
			nodoMina.style.textDecoration = "underline";
			nodoMina.addEventListener ("click",
										function (){
											window.open (linkMina, "_self");
										},
										false);
		}

		//Leo el contenido de la variable ordenCiudades y coloco los iconos
		rellena ();
	}
}

/**
 * Cambia el diseño del cuartel.
 */
function cuartelVistaAvanzada (){
	/**
	 * Cambia el tag h4 por un span y saca el tag p.
	 * @param i número del nodo de la lista de unidades.
	 */
	function cambiaTag (i){
		var nodo = unidades.childNodes[i].getElementsByClassName ("unitinfo")[0].childNodes[1];
		var span = document.createElement ("span");
		span.textContent = nodo.textContent;
		span.style.fontSize = "14px";
		span.style.fontWeight = "bold";
		span.style.lineHeight = "22px";
		span.style.marginBottom = "2px";
		span.style.marginLeft = "130px";
		
		colocaDetras (span, nodo);
		nodo.parentNode.removeChild (nodo);
	}
	
	/**
	 * Mueve la capa con la descripción de la unidad.
	 * @param e Event.
	 * @param div capa con la descripción.
	 */
	function mueveDescripcion (e, div){
		div.style.display = "inline";
		div.style.left = e.clientX + 22 + "px";
		div.style.top = e.clientY + 17 + "px";
	}
	
	/**
	 * Esconde la capa con la descripción de la unidad.
	 * @param div capa con la descripción.
	 */
	function escondeDescripcion (div){
		div.style.display = "none";
	}
	
	/**
	 * Crea el span de la descripción.
	 * @param i número del nodo de la lista de unidades.
	 * @return span creado.
	 */
	function creaSpanDescripcion (i){
		var desc = unidades.childNodes[i].getElementsByClassName ("unitinfo")[0].getElementsByTagName ("p")[0].textContent;
		
		var div = document.createElement ("div");
		div.className = "capaDesc";
		div.style.zIndex = "1000";
		div.style.width = "270px";
		div.style.position = "fixed";
		div.style.textAlign = "justify";
		div.style.backgroundColor = "#FCF4DE";
		div.style.padding = "10px";
		div.style.display = "none";
		div.innerHTML = desc + "<div style='position: absolute; top: -10px; left: -5px; width: 300px; height: 5px;'><img src='" + Img.descripcionTop + "'/></div>" +
						"<div style='1000; position: absolute; top: 2px; left: -5px; width: 12px; height: 100%; background: transparent url(" + Img.descripcionLeft + ") repeat-y scroll 0 0;'></div><div style='position: absolute; top: 2px; right: -5px; width: 12px; height: 100%; background: transparent url(" + Img.descripcionRight + ") repeat-y scroll 0 0;'></div>" +
						"<div style='position: absolute; bottom: 2px; left: -5px; width: 300px; height: 5px;'><img src='" + Img.descripcionBottom + "'/></div>";
		
		unidades.childNodes[i].appendChild (div);
	
		var descLink = document.createElement ("span");
		descLink.textContent = Lang["description"];
		descLink.style.position = "relative";
		descLink.style.left = "28px";
		descLink.style.fontSize = "11px";
		descLink.style.cursor = "default";
		descLink.style.padding = "3px 0 3px 0";
		descLink.addEventListener ("mousemove",
									function (e){
										this.style.textDecoration = "underline";
										mueveDescripcion (e, div);
									},
									false);
		descLink.addEventListener ("mouseout",
									function (){
										this.style.textDecoration = "none";
										escondeDescripcion (div);
									},
									false);
		
		return descLink;
	}
	
	/**
	 * Consulta el bonus de la muralla.
	 * @param nivelMuralla nivel de la muralla.
	 */
	function consultaBonusMuralla (nivelMuralla){
		nivelMuralla = parseInt (nivelMuralla);
		var n;
		
		if (nivelMuralla < nivelIntendencia){
			n = ((nivelMuralla*nivelMuralla)/nivelIntendencia)/10 + 1;
		}else{
			n = nivelMuralla/10 + 1;
		}

		return n;
	}
	
	/**
	 * Valida el input de los boquetes.
	 * @param input input.
	 * @param ataqueEspecial ataque de la unidad con la habilidad especial.
	 * @param b true si se valida la unidad, false si se valida el total.
	 */
	function valida (input, ataqueEspecial, b){
		var ok;
		
		if (input.value == "" || isNaN (input.value) || parseInt (input.value) < 0 || parseInt (input.value) > 30){
			input.style.border = "solid thin #FFB9BB";
			input.style.backgroundColor = "#FBE3E4";
			ok = false;
		}else{
			input.style.border = "solid thin #BC575D";
			input.style.backgroundColor = "#FFF";
			ok = true;
		}
		
		if (b){
			var nodoMu = input.parentNode.getElementsByClassName ("ataqueMuralla")[0].childNodes[0];
		}else{
			var nodoMu = document.getElementById ("ataqueBoquetes");
		}
		
		if (ok){
			nodoMu.textContent = Math.round((parseInt (input.value)/10 + 1)*ataqueEspecial*10)/10;
		}else{
			nodoMu.textContent = ataqueEspecial;
		}
	}
	
	/**
	 * Coloca la etiqueta cuando el cursor pasa por encima del input.
	 * @param e Event.
	 * @param eti etiqueta con la descripción.
	 */
	function mueveEti (e, eti){
		eti.style.display = "inline";
		eti.style.left = e.clientX + 15 + "px";
		eti.style.top = e.clientY + 10 + "px";
	}
	
	/**
	 * Esconde la etiqueta al salir del input.
	 * @param eti etiqueta.
	 */
	function escondeEti (eti){
		eti.style.display = "none";
	}
	
	/**
	 * Crea la información de la unidad.
	 * @param basico true si la vista es básica, false si es avanzada.
	 */
	function creaInfo (basico){
		var tierra = false;
		var anchoBasico;
		var anchoAvanzado;
		var left;
		
		if (pagina == "barracks"){
			tierra = true;
			left = 180;
			anchoBasico = 240;
			anchoAvanzado = 225;
		}else{
			left = 240;
			anchoBasico = 240;
			anchoAvanzado = 150;
		}
		
		addGlobalStyle (
			".contentBox01h .tablaAvanzada {" +
				"position: absolute;" +
				"left: " + left + "px;" +
				"top: 75px;" +
				"width: " + anchoAvanzado + "px;" +
				"line-height: 18px;" +
				"cursor: default;" +
			"}" +
			
			".contentBox01h .tablaBasica {" +
				"position: absolute;" +
				"left: 225px;" +
				"top: 76px;" +
				"width: " + anchoBasico + "px;" +
				"line-height: 18px;" +
				"cursor: default;" +
			"}" +
			
			"#mainview .contentBox01h .content table td {" +
				"padding-top: 0;" +
			"}"
		);
		
		var unidad = unidades.childNodes[i].getElementsByClassName ("unitinfo")[0].getElementsByTagName ("img")[1].src.split ("/");
		if (tierra){
			unidad = unidad[unidad.length-1].split ("_")[0];
			var ataque = BaseDatos.unidades[unidad].ataque;
			var defensa = BaseDatos.unidades[unidad].defensa;
			var resistencia = BaseDatos.unidades[unidad].resistencia;
		}else{
			unidad = unidad[unidad.length-1].split ("_")[1];
			var ataque = BaseDatos.barcos[unidad].ataque;
			var defensa = BaseDatos.barcos[unidad].defensa;
			var resistencia = BaseDatos.barcos[unidad].resistencia;
		}

		//Bonus
		var ataqueBonus = 0;
		var defensaBonus = 0;
		
		var icono = unidades.childNodes[i].getElementsByClassName ("att-icon")[0];
		if (icono){
			var img = icono.src.split ("/");
			img = img[img.length-1][10];
			if (tierra){
				ataqueBonus = BaseDatos.unidades[unidad].bonusAtaque[3 - parseInt (img)];
			}else{
				ataqueBonus = BaseDatos.barcos[unidad].bonusAtaque[3 - parseInt (img)];
			}
		}
		
		icono = unidades.childNodes[i].getElementsByClassName ("def-icon")[0];
		if (icono){
			var img = icono.src.split ("/");
			img = img[img.length-1][11];
			if (tierra){
				defensaBonus = BaseDatos.unidades[unidad].bonusDefensa[3 - parseInt (img)];
			}else{
				defensaBonus = BaseDatos.barcos[unidad].bonusDefensa[3 - parseInt (img)];
			}
		}
		
		//Habilidad especial
		var ataqueEspecial = 1;
		var defensaEspecial = 1;
		
		if (tierra){
			if (BaseDatos.unidades[unidad].especial == 0){
				ataqueEspecial = 1.3;
			}else if (BaseDatos.unidades[unidad].especial == 1){
				defensaEspecial = 1.3;
			}
		}else{
			if (BaseDatos.barcos[unidad].especial == 0){
				ataqueEspecial = 1.3;
			}else if (BaseDatos.barcos[unidad].especial == 1){
				defensaEspecial = 1.3;
			}
		}
		
		//Muralla
		if (tierra){
			var nivelMuralla = Ciudad.getMuralla ();
			var ataqueMuralla = 1;
			var defensaMuralla = 1;

			if (nivelMuralla != 0 && tierra){
				defensaMuralla = nivelMuralla/10 + 1;
			}
		}
		
		//Total
		var totalAtaque = ataque + ataqueBonus;
		var totalDefensa = defensa + defensaBonus;
		
		var totalAtaqueEspecial = Math.round(totalAtaque*ataqueEspecial*10)/10;
		var totalDefensaEspecial = Math.round(totalDefensa*defensaEspecial*10)/10;
		
		if (tierra){
			var totalAtaqueMuralla = Math.round(totalAtaque*ataqueEspecial*10)/10;
			var totalDefensaMuralla = Math.round(totalDefensa*defensaEspecial*defensaMuralla*10)/10;
		};

		//Creo la información avanzada
		var tabla = document.createElement ("table");
		tabla.className = "tablaAvanzada";
		var contenido = "<tr style='line-height: 20px;'>" +
							"<td width='40px'></td>" +
							"<td width='35px'></td>" +
							"<td width='35px'></td>" +
							"<td width='40px'><img src='" + Img.unidadesEspecial + "' title='" + Lang["bonusSpecial"] + ": +30%'/></td>";					
		if (tierra){
			contenido +=	"<td width='35px'></td>" +
							"<td width='40px'><img src='" + Img.unidadesMuralla + "' title='" + Lang["bonusWall"] + ": +" + nivelMuralla*10 + "%'/></td>";
		}
		contenido +=	"</tr>" + 
						"<tr>" +
							"<td><img src='" + Img.unidadesAtaque + "' title='" + Lang["attack"] + "'/></td>" +
							"<td title='" + ataque + " + " + ataqueBonus + "' class='ataqueBasico'><b>" + totalAtaque + "</b></td>" +
							"<td><img src='" + Img.flecha + "'/></center></td>" +
							"<td class='ataqueEspecial'><b>" + totalAtaqueEspecial + "</b></td>";
		if (tierra){
			contenido +=	"<td><img src='" + Img.flecha + "'/></center></td>" +
							"<td class='ataqueMuralla'><b>" + totalAtaqueMuralla + "</b></td>";
		}
		contenido +=	"</tr>" +
						"<tr>" +
							"<td><img src='" + Img.unidadesDefensa + "' title='" + Lang["defense"] + "'/></td>" +
							"<td title='" + defensa + " + " + defensaBonus + "' class='defensaBasica'><b>" + totalDefensa + "</b></td>" +
							"<td><img src='" + Img.flecha + "'/></td>" +
							"<td class='defensaEspecial'><b>" + totalDefensaEspecial + "</b></td>";
		if (tierra){
			contenido +=	"<td><img src='" + Img.flecha + "'/></td>" +
							"<td class='defensaMuralla'><b>" + totalDefensaMuralla + "</b></td>";
		}
		contenido +=	"</tr>" +
						"<tr>" +
							"<td><img src='" + Img.unidadesResistencia + "' title='" + Lang["endurance"] + "'/></td>" +
							"<td class='resistencia'><b>" + resistencia + "</b></td>" +
						"</tr>";
		
		tabla.innerHTML = contenido;

		//Creo la información básica
		var tabla2 = document.createElement ("table");
		tabla2.className = "tablaBasica";
		tabla2.innerHTML =	"<tr>" +
								"<td width='30px'><img src='" + Img.unidadesAtaque + "' title='" + Lang["attack"] + "'/></td>" +
								"<td width='50px' title='" + ataque + " + " + ataqueBonus + "'><b>" + totalAtaque + "</b></td>" +
								"<td width='30px'><img src='" + Img.unidadesDefensa + "' title='" + Lang["defense"] + "'/></td>" +
								"<td width='50px' title='" + defensa + " + " + defensaBonus + "'><b>" + totalDefensa + "</b></td>" +
								"<td width='30px'><img src='" + Img.unidadesResistencia + "' title='" + Lang["endurance"] + "'/></td>" +
								"<td width='50px'><b>" + resistencia + "</b></td>" +
							"</tr>";
		
		if (basico){
			tabla2.style.display = "inline";
			tabla.style.display = "none";
		}else{
			tabla2.style.display = "none";
			tabla.style.display = "inline";
		}
		
		colocaDetras (tabla, bonus);
		colocaDetras (tabla2, bonus);
		
		//Actualizo variables acumulativas de puntos
		var num = parseInt (tabla.parentNode.getElementsByClassName ("unitcount")[0].childNodes[1].textContent);
		a_a += parseFloat (tabla.getElementsByClassName ("ataqueEspecial")[0].textContent)*num;
		a_d += parseFloat (tabla.getElementsByClassName ("defensaBasica")[0].textContent)*num;
		d_a += parseFloat (tabla.getElementsByClassName ("ataqueBasico")[0].textContent)*num;
		if (pagina == "barracks"){
			d_d += parseFloat (tabla.getElementsByClassName ("defensaMuralla")[0].textContent)*num;
		}else if (pagina == "shipyard"){
			d_d += parseFloat (tabla.getElementsByClassName ("defensaEspecial")[0].textContent)*num;
		}
		r += parseFloat (tabla.getElementsByClassName ("resistencia")[0].textContent)*num;
		
		if (tierra){
			//Coloco el input de los boquetes
			var input = document.createElement ("input");
			input.className = "inputBoquetes";
			input.value = 0;
			input.style.width = "18px";
			input.style.height = "15px";
			input.style.background = "#FFF";
			input.style.border = "solid thin #BC575D";
			input.style.position = "absolute";
			input.style.left = "425px";
			input.style.top = "98px";
			input.style.fontSize = "12px";
			if (basico){
				input.style.display = "none";
			}
			
			//Creo la etiqueta
			var eti = document.createElement ("div");
			eti.className = "etiqueta";
			eti.textContent = Lang["labelWall"];
			colocaDetras (eti, tabla);
			colocaDetras (input, tabla);
			
			var ataqueEspecial = parseFloat (input.parentNode.getElementsByClassName ("ataqueEspecial")[0].childNodes[0].textContent);
			
			input.addEventListener ("keyup", function (){ valida (this, ataqueEspecial, true); }, false);
			input.addEventListener ("mousemove", function (e){ mueveEti (e, eti); }, false);
			input.addEventListener ("mouseout", function (){ escondeEti (eti); }, false);
			
		}
		
		//Coloco las etiquetas de los bonus en su lugar
		colocaEtiquetas (unidad, tierra);
		
		//Creo la flecha para cambiar entre modo básico y modo avanzado
		creaModos (unidad, basico);
	}
	
	/**
	 * Crea la flecha para cambiar entre modo básico y modo avanzado.
	 * @param unidad tipo de unidad que se analiza.
	 * @param basico true si la vista es básica, false si es avanzada.
	 */
	function creaModos (unidad, basico){
		var tabla = unidades.childNodes[i].getElementsByClassName ("tablaAvanzada")[0];
		
		var img = document.createElement ("img");
		if (basico){
			img.src = Img.unidadesModoBasicoVisible;
		}else{
			img.src = Img.unidadesModoAvanzadoVisible;
		}
		img.style.cursor = "pointer";
		img.style.position = "absolute";
		img.style.left = "128px";
		img.style.top = "65px";
		img.addEventListener ("click", function (){ cambiaModo (this); }, false);

		colocaDetras (img, tabla);
	}
	
	/**
	 * Cambia entre el modo básico y el avanzado.
	 * @param img imagen apretada.
	 */
	function cambiaModo (img){
		var clase = img.parentNode.className;
		var lista = img.parentNode.parentNode;
		var numNodo = 0;
		var i = 0;
		var stop = false;
		
		while (i<lista.childNodes.length && !stop){
			if (lista.childNodes[i].tagName == "LI"){
				if (lista.childNodes[i].className == clase){
					stop = true;
				}else{
					numNodo++;
				}
			}
			i++;
		}
		
		if (modoBasico[numNodo]){
			modoBasico[numNodo] = false;
			img.parentNode.getElementsByClassName ("tablaBasica")[0].style.display = "none";
			img.parentNode.getElementsByClassName ("tablaAvanzada")[0].style.display = "inline";
			
			var boquetes = img.parentNode.getElementsByClassName ("inputBoquetes")[0];
			if (boquetes){
				boquetes.style.display = "inline";
			}
			
			img.src = Img.unidadesModoAvanzadoVisible;
			
			var barra = img.parentNode.getElementsByClassName ("sliderinput")[0];
			if (barra){
				barra.style.top = "115px";
			}
			
			var costes = img.parentNode.getElementsByClassName ("costs")[0];
			costes.style.top = "120px";
			costes = costes.childNodes[3]
			costes.childNodes[costes.childNodes.length-1].style.bottom = "129px";
			
			img.parentNode.style.height = "220px";
			var e = img.parentNode.getElementsByClassName ("unitinfo")[0].getElementsByTagName ("img")[1].style.top = "55px";
			e = img.parentNode.getElementsByClassName ("unitcount")[0].style.top = "155px";
		}else{
			modoBasico[numNodo] = true;
			img.parentNode.getElementsByClassName ("tablaBasica")[0].style.display = "inline";
			img.parentNode.getElementsByClassName ("tablaAvanzada")[0].style.display = "none";
			
			var boquetes = img.parentNode.getElementsByClassName ("inputBoquetes")[0];
			if (boquetes){
				boquetes.style.display = "none";
			}
			
			img.src = Img.unidadesModoBasicoVisible;
			
			var barra = img.parentNode.getElementsByClassName ("sliderinput")[0];
			if (barra){
				barra.style.top = "45px";
			}
			
			var costes = img.parentNode.getElementsByClassName ("costs")[0];
			costes.style.top = "50px";
			costes = costes.childNodes[3];
			costes.childNodes[costes.childNodes.length-1].style.bottom = "59px";
			
			img.parentNode.style.height = "155px";
			var e = img.parentNode.getElementsByClassName ("unitinfo")[0].getElementsByTagName ("img")[1].style.top = "25px";
			e = img.parentNode.getElementsByClassName ("unitcount")[0].style.top = "130px";
		}
	}
	
	/**
	 * Coloca als etiquetas de los bonus en su lugar.
	 * @param unidad tipo de unidad que se analiza.
	 * @param tierra true si es el cuartel, false si es el astillero.
	 */
	function colocaEtiquetas (unidad, tierra){
		var tabla = unidades.childNodes[i].getElementsByClassName ("tablaAvanzada")[0];
		
		if (unidad == "cook" || unidad == "medic"){
			var noBonus = document.createElement ("img");
			noBonus.src = Img.unidadesNoBonus;
			noBonus.style.position = "absolute";
			noBonus.style.top = "49px";
			noBonus.style.left = "185px";
			
			colocaDetras (noBonus, tabla);
		}else{
			var hayAt = false;
			var img = unidades.childNodes[i].getElementsByClassName ("att-icon")[0];
			if (img){
				hayAt = true;
				img.style.position = "absolute";
				img.style.top = "45px";
				img.style.left = "180px";
			}
			
			var hayDef = false;
			img = unidades.childNodes[i].getElementsByClassName ("def-icon")[0];
			if (img){
				hayDef = true;
				img.style.position = "absolute";
				img.style.top = "45px";
				if (hayAt){
					img.style.left = "210px";
				}else{
					img.style.left = "180px";
				}
			}
			
			var especial = "";
			
			if (tierra){
				if (BaseDatos.unidades[unidad].especial == 0){
					especial = Lang["bonusAssault"];
				}else if (BaseDatos.unidades[unidad].especial == 1){
					especial = Lang["bonusResistance"];
				}
			}else{
				if (BaseDatos.barcos[unidad].especial == 0){
					especial = Lang["bonusAssault"];
				}else if (BaseDatos.barcos[unidad].especial == 1){
					especial = Lang["bonusResistance"];
				}
			}
			
			var span = document.createElement ("span");
			span.textContent = especial;
			span.style.position = "absolute";
			span.style.top = "45px";
			span.style.fontStyle = "italic";
			span.style.cursor = "default";
			span.title = Lang["bonusSpecial"];
			
			if (hayAt){
				if (hayDef){
					span.style.left = "240px";
				}else{
					span.style.left = "210px";
				}
			}else{
				if (hayDef){
					span.style.left = "210px";
				}else{
					span.style.left = "180px";
				}
			}
			
			colocaDetras (span, tabla);
		}
	}
	
	/**
	 * Según el input actualiza los recursos necesarios para formar la unidad.
	 */
	function cambiaBarra (){
		var barra = unidades.childNodes[i].getElementsByClassName ("sliderinput")[0];
		if (barra){
			barra.childNodes[1].childNodes[3].addEventListener ("DOMAttrModified", function (){ actualizaRecursos (this); }, false);
		}
	}
	
	/**
	 * Actualiza los recursos.
	 * @param barra nodo de la barra deslizante.
	 */
	function actualizaRecursos (barra){
		var n = parseInt (barra.parentNode.parentNode.parentNode.getElementsByClassName ("forminput")[0].childNodes[1].value);
		if (n == 0){
			n = 1;
		}
		
		var clase = barra.parentNode.parentNode.parentNode.className;
		var lista = barra.parentNode.parentNode.parentNode.parentNode;
		var numNodo = 0;
		var i = 0;
		var stop = false;
		
		while (i<lista.childNodes.length && !stop){
			if (lista.childNodes[i].tagName == "LI"){
				if (lista.childNodes[i].className == clase){
					stop = true;
				}else{
					numNodo++;
				}
			}
			i++;
		}

		var recursos = barra.parentNode.parentNode.parentNode.getElementsByClassName ("resources")[0];
		for (var i=0; i<recursos.childNodes.length; i++){
			var info = recursos.childNodes[i];
			if (info.className != "time"){
				info.childNodes[1].textContent = parseInt (recursosUnidad[numNodo].recursos[info.className])*n;
			}
		}
	}
	
	/**
	 * Clase. Contiene la cantidad de recursos por unidad.
	 */
	function Recursos (){
		this.recursos = { citizens: 0, wood: 0, marble: 0, wine: 0, glass: 0, sulfur: 0, upkeep: 0 }
	}
	
	/**
	 * Crea un panel con los puntos de ataque y defensa de las tropas/barcos en la ciudad.
	 */
	function visionGlobalPuntos (){
		a_a = Math.round (a_a*10)/10;
		a_d = Math.round (a_d*10)/10;
		d_a = Math.round (d_a*10)/10;
		d_d = Math.round (d_d*10)/10;
		r = Math.round (r*10)/10;
		
		var tierra = false;
		
		if (pagina == "barracks"){
			tierra = true;
		}

		var div = document.createElement ("div");
		div.id = "puntosUnidades";
		div.className = "dynamic";
		
		if (tierra){
			var i = 4;
		}else{
			var i = 5;
		}
		
		if (panelesScript[i] == "1"){
			var abierto = true;
			var imagen = Img.minimizarPanel;
			var vis = "visible";
			var hei = "auto";
		}else{
			var abierto = false;
			var imagen = Img.maximizarPanel;
			var vis = "hidden";
			var hei = "0";
		}
		
		var contenido = "<h3 class='header'>" + Lang["globalView"] + "<img src='" + imagen + "' style='position: absolute; right: 5px; top: 7px; cursor: pointer;'/></h3>" +
						"<div class='content' style='visibility: " + vis + "; height: " + hei + ";'>" +
							"<h4 style='background-color: #FFFBDB; font-size: 12px; margin: 6px 0; padding: 2px; text-align: center;'>" + Lang["offensiveStrength"] + "</h4>" +
							"<table>" +
								"<tr>" +
									"<td width='20px' style='padding-left: 55px; padding-bottom: 3px;'><img title = '" + Lang["attack"] + "' src='" + Img.unidadesAtaque + "'/></td>" +
									"<td id='ataqueBoquetes' style='padding-left: 20px;'>" + a_a + "</td>" +
								"</tr>" +
								"<tr>" +
									"<td style='padding-left: 55px;'><img title = '" + Lang["defense"] + "' src='" + Img.unidadesDefensa + "'/></td>" +
									"<td style='padding-left: 20px;'>" + a_d + "</td>" +
								"</tr>" +
							"</table>" +
							"<h4 style='background-color: #FFFBDB; font-size: 12px; margin: 6px 0; padding: 2px; text-align: center;'>" + Lang["defensiveStrength"] + "</h4>" +
							"<table>" +
								"<tr>" +
									"<td style='padding-left: 55px; padding-bottom: 3px;'><img title = '" + Lang["attack"] + "' src='" + Img.unidadesAtaque + "'/></td>" +
									"<td style='padding-left: 20px;'>" + d_a + "</td>" +
								"</tr>" +
								"<tr>" +
									"<td style='padding-left: 55px; padding-bottom: 3px;'><img title = '" + Lang["defense"] + "' src='" + Img.unidadesDefensa + "'/></td>" +
									"<td style='padding-left: 20px; padding-bottom: 3px;'>" + d_d + "</td>" +
								"</tr>" +
							"</table>" +
							"<h4 style='background-color: #FFFBDB; font-size: 12px; margin: 6px 0; padding: 2px; text-align: center;'>" + Lang["endurance"] + ":</h4>" +
							"<table>" +
								"<tr>" +
									"<td style='padding-left: 55px; padding-bottom: 3px;'><img title = '" + Lang["endurance"] + "' src='" + Img.unidadesResistencia + "'/></td>" +
									"<td style='padding-left: 20px; padding-bottom: 3px;'>" + r + "</td>" +
								"</tr>" +
							"</table>";
							
		if (tierra){
			contenido += 	"<input id='inputBoquetes' value='0' style='width: 18px; height: 15px; background: #FFF; border: solid thin #BC575D; position: absolute; right: 30px; top: 25px; font-size: 12px;'/>" +
							"<div id='etiBoquetes' class='etiqueta'>" + Lang["labelWall"] + "</div>";
		}
		contenido +=	"</div>" +
						"<div class='footer'></div>";
		
		div.innerHTML = contenido;
		
		colocaDetras (div, document.getElementById ("buildingUpgrade"));
		
		document.getElementById ("puntosUnidades").getElementsByTagName ("img")[0].addEventListener (
			"click",
			function (){
				var contenido = this.parentNode.parentNode.childNodes[1];
				
				if (abierto){
					abierto = false;
					this.src = Img.maximizarPanel;
					contenido.style.visibility = "hidden";
					contenido.style.height = "0";
					panelesScript[i] = 0;
					GM_setValue (server + "paneles", panelesScript.join ("#"));
				}else{
					abierto = true;
					this.src = Img.minimizarPanel;
					contenido.style.height = "auto";
					contenido.style.visibility = "visible";
					panelesScript[i] = 1;
					GM_setValue (server + "paneles", panelesScript.join ("#"));
				}
			},
			false
		);
		
		if (tierra){
			var eti = document.getElementById ("etiBoquetes");
			var ataque = parseFloat (document.getElementById ("ataqueBoquetes").textContent);
			
			var input = document.getElementById ("inputBoquetes");
			input.addEventListener ("keyup", function (){ valida (this, ataque, false); }, false);
			input.addEventListener ("mousemove", function (e){ mueveEti (e, eti); }, false);
			input.addEventListener ("mouseout", function (){ escondeEti (eti); }, false);
		}
	}
	
	/**
	 * Coloca un botón para cambiar el vista de todas las unidades.
	 */
	function colocaBotonModo (){
		var input = document.createElement ("input");
		input.type = "button";
		input.className = "button";
		input.value = Lang["unitView"];
		input.addEventListener ("click",
								function (){
									GM_setValue (server + "basico", !basico);
									window.location.reload ();
								},
								false);
		
		colocaDetras (input, document.getElementsByClassName ("buildingDescription")[0]);
	}
	
	//Variables acumulativas de los puntos
	var a_a = 0;
	var a_d = 0;
	var d_a = 0;
	var d_d = 0;
	var r = 0;
	
	if (pagina == "barracks" || pagina == "shipyard"){
		colocaBotonModo ();
	
		var x = 0;
		var recursosUnidad = [];
		var unidades = document.getElementById ("units");
		var basico = GM_getValue (server + "basico", true);
		var modoBasico = [];
		
		for (var i=1; i<=unidades.childNodes.length - 2; i+=2){
			//Guardo los recursos por unidad
			recursosUnidad[x] = new Recursos ();
			var recursos = unidades.childNodes[i].getElementsByClassName ("resources")[0];
			for (var y=0; y<recursos.childNodes.length; y++){
				var info = recursos.childNodes[y];
				recursosUnidad[x].recursos[info.className] = info.childNodes[1].textContent;
			}
			
			//Guardo el estado de los modos de vista de cada unidad
			modoBasico[x] = basico;
			
			cambiaTag (i);
			unidades.childNodes[i].getElementsByClassName ("unitinfo")[0].getElementsByTagName ("p")[0].style.display = "none";
			
			var img = document.createElement ("img");
			img.src = Img.descripcionIcono;
			img.style.position = "relative";
			img.style.left = "25px";
			img.style.top = "2px";
			colocaDetras (img, unidades.childNodes[i].getElementsByClassName ("unitinfo")[0].childNodes[1]);
			
			var descLink = creaSpanDescripcion (i);
			colocaDetras (descLink, img);
			
			var hr = unidades.childNodes[i].getElementsByTagName ("hr")[0];
			if (!hr){
				hr = document.createElement ("hr");
				colocaDetras (hr, unidades.childNodes[i].getElementsByClassName ("unitinfo")[0]);
			}
			hr.style.position = "relative";
			hr.style.top = "-10px";
			
			var bonus = document.createElement ("span");
			bonus.innerHTML = "<u>" + Lang["bonus"] + "</u>:";
			bonus.style.position = "absolute";
			bonus.style.left = "130px";
			bonus.style.top = "45px";
			colocaDetras (bonus, hr);
			
			var costes = unidades.childNodes[i].getElementsByClassName ("costs")[0];
			costes.style.position = "relative";
			if (basico){
				costes.style.top = "50px";
			}else{
				costes.style.top = "120px";
			}
			
			var barra = unidades.childNodes[i].getElementsByClassName ("sliderinput")[0];
			if (barra){
				var barra2 = barra;
				barra.parentNode.removeChild (barra);
				colocaDetras (barra2, costes);
				barra.style.position = "relative";
				if (basico){
					barra.style.top = "45px";
				}else{
					barra.style.top = "115px";
				}
			}
			
			costes = costes.childNodes[3];
			var coste = costes.childNodes[costes.childNodes.length-1];
			coste.style.position = "absolute";
			if (basico){
				coste.style.bottom = "59px";
			}else{
				coste.style.bottom = "129px";
			}
			coste.style.right = "151px";
			
			coste = costes.childNodes[costes.childNodes.length-2];
			coste.style.position = "relative";
			coste.style.bottom = "0";
			
			coste.style.right = "-9px";
			
			if (basico){
				unidades.childNodes[i].style.height = "155px";
				var e = unidades.childNodes[i].getElementsByClassName ("unitinfo")[0].getElementsByTagName ("img")[1].style.top = "25px";
				e = unidades.childNodes[i].getElementsByClassName ("unitcount")[0].style.top = "130px";
			}else{
				unidades.childNodes[i].style.height = "220px";
				var e = unidades.childNodes[i].getElementsByClassName ("unitinfo")[0].getElementsByTagName ("img")[1].style.top = "55px";
				e = unidades.childNodes[i].getElementsByClassName ("unitcount")[0].style.top = "155px";
			}
			
			var span = unidades.childNodes[i].getElementsByClassName ("setMax")[0];
			if (span){
				span.addEventListener ("click", function (){ actualizaRecursos (this.parentNode.parentNode.getElementsByClassName ("sliderinput")[0].childNodes[1].childNodes[3]); }, false);
			}
			
			creaInfo (basico);
			cambiaBarra ();
			x++;
		}
		
		visionGlobalPuntos ();
	}
}

function ordenaMiembrosAlianza (){
	function cambiaEstilo (){
		var claro = true;
		for (var i=1; i<=miembros.childNodes.length - 2; i+=2){
			var clase = miembros.childNodes[i].className;
			if (clase == "default" || clase == " default" || clase == "alt" || clase == " alt"){
				if (claro){
					claro = false;
					miembros.childNodes[i].className = "default";
				}else{
					claro = true;
					miembros.childNodes[i].className = "alt";
				}
			}else{
				claro = !claro;
				miembros.childNodes[i].className = "highlight alt";
			}
		}
	}

	function ordena (campo){
		var i = 1;
		
		try{
			lista.vesInicioPDI (campo);
			var id = lista.consulta ().getId ();
			swapNodos (miembros.childNodes[1], document.getElementById (id));
			while (!lista.finalPDI (campo)){
				i += 2;
				lista.muevePDI (true, campo);
				id = lista.consulta ().getId ();
				swapNodos (miembros.childNodes[i], document.getElementById (id));
			}
		}catch (msg){}
		
		cambiaEstilo ();
	}

	function ordenaInver (campo){
		var i = 1;
		
		try{
			lista.vesFinalPDI (campo);
			var id = lista.consulta ().getId ();
			swapNodos (miembros.childNodes[1], document.getElementById (id));
			while (!lista.inicioPDI (campo)){
				i += 2;
				lista.muevePDI (false, campo);
				id = lista.consulta ().getId ();
				swapNodos (miembros.childNodes[i], document.getElementById (id));
			}
		}catch (msg){}
		
		cambiaEstilo ();
	}
	
	function creaListener (i){
		var titulo = tabla.childNodes[1].childNodes[1].childNodes[i];
		
		if (i == 1){
			titulo.style.width = "80px";
		}
		
		if (titulo.childNodes.length == 0) return;
		
		var j;
		if (i == 1){
			j = 0;
		}else if (i == 3){
			j = 1;
		}else if (i == 5){
			j = 2;
		}else if (i == 7){
			j = 3;
		}else if (i == 9){
			j = 4;
		}
		
		var span = document.createElement ("span");
		span.textContent = String.fromCharCode (8657);
		span.className = "unicode";
		span.style.position = "relative";
		span.style.left = "3px";
		span.style.color = "#434A93";
		span.style.cursor = "pointer";
		span.addEventListener ("mouseover", function (){ this.style.textDecoration = "underline"; }, false);
		span.addEventListener ("mouseout", function (){ this.style.textDecoration = "none"; }, false);
		span.addEventListener ("click",
								function (){
									GM_setValue (server + "ordenEmbajada", j);
									ordena (j);
								},
								false);
		
		var span2 = document.createElement ("span");
		span2.textContent = String.fromCharCode (8659);
		span2.className = "unicode";
		span2.style.position = "relative";
		span2.style.left = "5px";
		span2.style.color = "#434A93";
		span2.style.cursor = "pointer";
		span2.addEventListener ("mouseover", function (){ this.style.textDecoration = "underline"; }, false);
		span2.addEventListener ("mouseout", function (){ this.style.textDecoration = "none"; }, false);
		span2.addEventListener ("click",
								function (){
									GM_setValue (server + "ordenEmbajada", j + 10);
									ordenaInver (j);
								},
								false);
		
		titulo.appendChild (span);
		titulo.appendChild (span2);
	}
	
	/**
	 * Crea un botón para resetear la ordenación de las columnas.
	 */
	function creaBotonReset (){
		var boton = document.createElement ("span");
		boton.textContent = "Reset";
		boton.style.fontWeight = "bold";
		boton.style.position = "absolute";
		boton.style.right = "10px";
		boton.style.top = "10px";
		boton.style.cursor = "pointer";
		
		boton.addEventListener ("mouseover", function (){ this.style.textDecoration = "underline"; }, false);
		boton.addEventListener ("mouseout", function (){ this.style.textDecoration = "none"; }, false);
		boton.addEventListener ("click",
								function (){
									GM_deleteValue (server + "ordenEmbajada");
									window.location.reload ();
								},
								false);
		
		colocaDetras (boton, tabla.parentNode.previousSibling);
	}

	if (pagina == "embassy" || pagina == "diplomacyAdvisorAlly"){
		var tabla = document.getElementById ("memberList");
		
		if (tabla){
			creaBotonReset ();
			
			var miembros = tabla.childNodes[3];
			var compruebaCiudad = true;
			if (tabla.childNodes[1].childNodes[1].childNodes[5].childNodes.length == 0){
				compruebaCiudad = false;
			}
			
			//Creo la lista y añado los elementos
			try{
				var lista = new Lista ();
				var j = 1;
				for (var i=1; i<=miembros.childNodes.length - 2; i+=2){
					var linea = miembros.childNodes[i].childNodes[1].className;
					var nombre = miembros.childNodes[i].childNodes[3].textContent.toLowerCase ();
					var ciudad = "";
					if (compruebaCiudad){
						var ciudad = miembros.childNodes[i].childNodes[5].childNodes[1].childNodes[0].childNodes[0].textContent;
						var re = new RegExp (/\d+/g);
						ciudad = re.exec (ciudad);
					}
					var rango = miembros.childNodes[i].childNodes[7].textContent.toLowerCase ();
					var num = parseInt (miembros.childNodes[i].childNodes[9].textContent.replace (/[.,]/g, ""));
					
					miembros.childNodes[i].id = "miembro" + j;
					lista.introduce (new Elemento (linea, nombre, ciudad, rango, num, "miembro" + j));
					j++;
				}
			}catch (msg){}
			
			for (var i=1; i<=9; i+=2){
				creaListener (i);
			}
			
			var n = GM_getValue (server + "ordenEmbajada", -1);
			
			if (n >=0 && n <= 4){
				ordena (n);
			}else if (n >= 10 && n <= 14){
				ordenaInver (n - 10);
			}
		}
	}
}

/**
 * Crea un panel donde se informa del riesgo que corren otros jugadores al enviar espías.
 */
function creaPanelEspias (){
	/**
	 * Calcula los valores de riesgo de todos las etiquetas.
	 * @param valorIntendencia nivel de la intendencia.
	 * @param valorEscondite nivel del escondite.
	 * @param valorNumero número de espías.
	 * @param valorEsconditeEnemigo nivel del escondite del enemigo.
	 * @return valores de las etiquetas.
	 */
	function calculaEtiquetas (valorIntendencia, valorEscondite, valorNumero, valorEsconditeEnemigo){
		var etiquetas = [];
		
		etiquetas[0] = 5*(valorNumero + 1) + 2*(valorEscondite - valorIntendencia - valorEsconditeEnemigo);
		etiquetas[1] = etiquetas[0] - 10;
		etiquetas[2] = etiquetas[1] + 24;
		etiquetas[3] = etiquetas[1] + 30;
		etiquetas[4] = etiquetas[1] + 40;
		etiquetas[5] = etiquetas[1] + 50;
		etiquetas[6] = etiquetas[1] + 70;
		etiquetas[7] = etiquetas[1] + 80;
		etiquetas[8] = etiquetas[1] + 90;
		etiquetas[9] = etiquetas[1] + 30;
		
		for (var i=0; i<10; i++){
			if (etiquetas[i] < 5){
				etiquetas[i] = 5;
			}else if (etiquetas[i] > 95){
				etiquetas[i] = 95;
			}
		}
		
		return etiquetas;
	}
	
	/**
	 * Calcula los valores según los parámetros.
	 */
	function calcula (){
		var ok = true;

		for (var i=0; i<4; i++){
			if (inputs[i].value == "" || isNaN (inputs[i].value) || parseInt (inputs[i].value) < 1){
				inputs[i].style.border = "solid thin #FFB9BB";
				inputs[i].style.backgroundColor = "#FBE3E4";
				ok = false;
			}else{
				inputs[i].style.border = "solid thin #BC575D";
				inputs[i].style.backgroundColor = "#FFF";
			}
		}
		
		if (ok){
			var etiquetas = calculaEtiquetas (parseInt (inputs[0].value), parseInt (inputs[1].value), parseInt (inputs[2].value), parseInt (inputs[3].value));
			for (var i=0; i<10; i++){
				document.getElementById ("eti" + (i + 1)).textContent = etiquetas[i] + "%";
			}
		}
	}
	
	if (pagina == "safehouse"){
		var valorIntendencia = parseInt (GM_getValue (server + Ciudad.getNombre ()).split ("#")[1]);
		var valorEscondite = parseInt (document.getElementsByClassName ("buildingLevel")[0].childNodes[1].textContent);
		
		var pos = document.getElementById ("reportInboxLeft").getElementsByTagName ("li")[1].textContent;
		var filtro = new RegExp (/\d+/);
		var valorNumero = parseInt (filtro.exec (pos));
		
		var etiquetas = calculaEtiquetas (valorIntendencia, valorEscondite, valorNumero, 1);

		var panel = document.createElement ("div");
		panel.className = "contentBox01h";
		panel.innerHTML =	"<h3 class='header'>" +
								"<span class='textLabel'>" + Lang["spyTitle"] + "</span>" +
							"</h3>" +
							"<div class='content' style='padding: 10px;'>" +
								"<table>" +
									"<tr>" +
										"<td width='50%' padding-right: 20px;>" + Lang["spyTownHall"] + "</td>" +
										"<td><input id='inputEspia1' value='" + valorIntendencia + "' style='width: 18px; height: 15px; background: #FFF; border: solid thin #BC575D; font-size: 12px;'/></td>" +
									"</tr>" +
									"<tr>" +
										"<td>" + Lang["spyHideout"] + "</td>" +
										"<td><input id='inputEspia2' value='" + valorEscondite + "' style='width: 18px; height: 15px; background: #FFF; border: solid thin #BC575D; font-size: 12px;'/></td>" +
									"</tr>" +
									"<tr>" +
										"<td>" + Lang["spyNumber"] + "</td>" +
										"<td><input id='inputEspia3' value='" + valorNumero + "' style='width: 18px; height: 15px; background: #FFF; border: solid thin #BC575D; font-size: 12px;'/></td>" +
									"</tr>" +
									"<tr>" +
										"<td>" + Lang["spyHideoutEnemy"] + "</td>" +
										"<td><input id='inputEspia4' value='1' style='width: 18px; height: 15px; background: #FFF; border: solid thin #BC575D; font-size: 12px;'/></td>" +
									"</tr>" +
								"</table>" +
								"<hr/>" +
								"<table>" +
									"<tr>" +
										"<td width='230px;' padding-right: 20px;><b>" + Lang["spyLabel1"] + "</b></td>" +
										"<td width='120px;'><span id='eti1'>" + etiquetas[0] + "%</span></td>" +
										"<td>" + Lang["spyLabel3"] + "</td>" +
										"<td><span id='eti3'>" + etiquetas[2] + "%</span></td>" +
									"</tr>" +
									"<tr>" +
										"<td></td>" +
										"<td></td>" +
										"<td>" + Lang["spyLabel4"] + "</td>" +
										"<td><span id='eti4'>" + etiquetas[3] + "%</span></td>" +
									"</tr>" +
									"<tr>" +
										"<td>" + Lang["spyLabel2"] + "</td>" +
										"<td><span id='eti2'>" + etiquetas[1] + "%</span></td>" +
										"<td>" + Lang["spyLabel5"] + "</td>" +
										"<td><span id='eti5'>" + etiquetas[4] + "%</span></td>" +
									"</tr>" +
									"<tr>" +
										"<td></td>" +
										"<td></td>" +
										"<td>" + Lang["spyLabel6"] + "</td>" +
										"<td><span id='eti6'>" + etiquetas[5] + "%</span></td>" +
									"</tr>" +
									"<tr>" +
										"<td></td>" +
										"<td></td>" +
										"<td>" + Lang["spyLabel7"] + "</td>" +
										"<td><span id='eti7'>" + etiquetas[6] + "%</span></td>" +
									"</tr>" +
									"<tr>" +
										"<td></td>" +
										"<td></td>" +
										"<td>" + Lang["spyLabel8"] + "</td>" +
										"<td><span id='eti8'>" + etiquetas[7] + "%</span></td>" +
									"</tr>" +
									"<tr>" +
										"<td></td>" +
										"<td></td>" +
										"<td>" + Lang["spyLabel9"] + "</td>" +
										"<td><span id='eti9'>" + etiquetas[8] + "%</span></td>" +
									"</tr>" +
									"<tr>" +
										"<td></td>" +
										"<td></td>" +
										"<td>" + Lang["spyLabel10"] + "</td>" +
										"<td><span id='eti10'>" + etiquetas[9] + "%</span></td>" +
									"</tr>" +
								"</table>" +
							"</div>" +
							"<div class='footer'/>";
							
		var pos = document.getElementsByClassName ("contentBox01h")[0];
		colocaDetras (panel, pos);
		
		document.getElementById ("eti1").style.fontWeight = "bold";
		
		var inputs = [];
		inputs[0] = document.getElementById ("inputEspia1");
		inputs[1] = document.getElementById ("inputEspia2");
		inputs[2] = document.getElementById ("inputEspia3");
		inputs[3] = document.getElementById ("inputEspia4");
		
		inputs[0].addEventListener ("keyup", calcula, false);
		inputs[1].addEventListener ("keyup", calcula, false);
		inputs[2].addEventListener ("keyup", calcula, false);
		inputs[3].addEventListener ("keyup", calcula, false);
	}
}

/**
 * Consulta los puntos Generales al hacer clic en una ciudad en la isla.
 */
function consultaGenerales (){
	/**
	 * Obtiene los puntos y los coloca debajo de la etiqueta "Puntos:".
	 */
	function consultaPuntos (){
		var panel = document.getElementById ("infocontainer");
	
		var eti = panel.getElementsByClassName ("name")[1].cloneNode (true);
		eti.id = "puntosGenerales";
		eti.childNodes[0].textContent = Lang["generals"] + ":";
		eti.childNodes[1].textContent = "...";
		colocaDetras (eti, panel.getElementsByClassName ("name")[1]);
	
		var nombre = trim (panel.getElementsByClassName ("owner")[0].childNodes[1].textContent).replace (/\s/g, "+");
		var url = "http://" + host + "/index.php?view=highscore&showMe=1";

		GM_xmlhttpRequest ({
			method: "GET",
			url: url,
			headers: {
				"User-agent": "Mozilla/5.0",
				"Accept": "text/html",
			},
			onload: function (respuesta){
				var pagina = document.implementation.createDocument ("", "", null);
				var html = document.createElement ("html");
				html.innerHTML = respuesta.responseText;
				pagina.appendChild (html);

				url = "http://" + host + "/index.php";
				var boton = pagina.getElementById ("offset").parentNode.childNodes[7].value;
				
				GM_xmlhttpRequest ({
					method: "POST",
					url: url,
					data: "highscoreType=army_score_main&offset=-1&view=highscore&submit=" + boton + "&searchUser=" + nombre + "&view=highscore",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function (respuesta){
						var pagina = document.implementation.createDocument ("", "", null);
						var html = document.createElement ("html");
						html.innerHTML = respuesta.responseText;
						pagina.appendChild (html);
						
						var tabla = pagina.getElementsByClassName ("table01")[1].childNodes[1];
						var i = 2;
						var stop = false;
						nombre = nombre.replace (/\+/g, " ");
						
						while (i<=tabla.childNodes.length - 2 && !stop){
							if (tabla.childNodes[i].childNodes[3].textContent == nombre){
								var stop = true;
								var puntos = tabla.childNodes[i].childNodes[7].textContent;
								
								document.getElementById ("puntosGenerales").childNodes[1].textContent = puntos;
							}
							
							i += 2;
						}
					}
				});
			}
		});
	}

	if (pagina == "island"){
		var ciudades = document.getElementById ("cities");
		
		var ciudad = document.getElementById ("information");
		if (ciudad.childNodes.length != 3){
			consultaPuntos ();
		}
		
		for (var i=1; i<=ciudades.childNodes.length - 2; i+=2){
			if (ciudades.childNodes[i].className != "cityLocation buildplace"){
				ciudades.childNodes[i].addEventListener ("click", consultaPuntos, false);
			}
		}
	}
}

/**
 * Añade una calculadora de distancias.
 */
function calculaDistancia (){
	/**
	 * Calcula el tiempo a partir de 2 coordenadas.
	 * @param origen coordenada inicial.
	 * @param destino coordenada final.
	 * @param velocidad velocidad de la unidad.
	 * @return cadena con el tiempo.
	 */
	function calculaTiempo (origen, destino, velocidad){
		origen = origen.split (":");
		destino = destino.split (":");
		var x = destino[0] - origen[0];
		var y = destino[1] - origen[1];
		
		var cad = "...";
		
		if (x != 0 || y != 0){
			var tmp = Lang["time"].split ("|");
			
			var tiempo = seg2Time (Math.sqrt (Math.pow (x*(1200/velocidad), 2) + Math.pow (y*(1200/velocidad), 2))*60)
			
			t = "";
			
			for (var i=0; i<4; i++){
				if (tiempo[i] != 0){
					t += tiempo[i] + tmp[i] + " ";
				}
			}
			
			cad = t;
		}

		return cad;
	}

	/**
	 * Actualiza el tiempo cuando se selecciona una isla.
	 */
	function calcula (){
		var nombreIsla = document.getElementById ("islandBread").childNodes[0].textContent;
		var coordsFinal = nombreIsla.split (" [")[1].replace ("]", "");
		if (coordsInicio == coordsFinal){
			var tmp1 = "...";
			var tmp2 = tmp1;
		}else{
			var tmp1 = coordsFinal;
			var tmp2 = nombreIsla.split (" [")[0];
		}
		document.getElementById ("coordsIsla").textContent = tmp1;
		document.getElementById ("nombreIsla").textContent = tmp2;
		document.getElementById ("tiempoIslas").textContent = calculaTiempo (coordsInicio, coordsFinal, BaseDatos.velocidad[1]);
		
		//Relleno la vista avanzada
		var celdas = document.getElementsByClassName ("calc_tiempo");
		for (var i=0; i<celdas.length; i++){
			celdas[i].textContent = calculaTiempo (coordsInicio, coordsFinal, BaseDatos.velocidad[i]);
		}
	}
	
	/**
	 * Valida el input.
	 * @param input input.
	 */
	function validaInput (input){
		var valor = input.value;
		var i = parseInt (input.id.substring (input.id.length - 1));
		
		if (valor == "" || isNaN (valor) || parseInt (valor) < 0 || parseInt (valor) > 100){
			input.style.border = "solid thin #FFB9BB";
			input.style.backgroundColor = "#FBE3E4";
			inputs[i] = false;
		}else{
			input.style.border = "solid thin #BC575D";
			input.style.backgroundColor = "#FFF";
			inputs[i] = true;
		}
		
		i = 0;
		var stop = false;
		while (i<4 && !stop){
			if (!inputs[i]){
				stop = true;
			}
			
			i++;
		}
		
		if (!stop){
			var coordsInicio = document.getElementById ("inputCoordenada0").value + ":" + document.getElementById ("inputCoordenada1").value;
			var coordsFinal = document.getElementById ("inputCoordenada2").value + ":" + document.getElementById ("inputCoordenada3").value
			
			document.getElementById ("coordsIsla").textContent = "...";
			document.getElementById ("nombreIsla").textContent = "...";
			document.getElementById ("tiempoIslas").textContent = calculaTiempo (coordsInicio, coordsFinal, BaseDatos.velocidad[1]);
																				 
			//Relleno la vista avanzada
			var celdas = document.getElementsByClassName ("calc_tiempo");
			for (var i=0; i<celdas.length; i++){
				celdas[i].textContent = calculaTiempo (coordsInicio, coordsFinal, BaseDatos.velocidad[i]);
			}
		}
	}
	
	/**
	 * Crea la calculadora normal.
	 */
	function panel (){
		var panel = document.createElement ("div");
		panel.id = "calcDistancia";
		panel.className = "dynamic";
		
		if (panelesScript[3] == "1"){
			var abierto = true;
			var imagen = Img.minimizarPanel;
			var vis = "visible";
			var hei = "155px";
		}else{
			var abierto = false;
			var imagen = Img.maximizarPanel;
			var vis = "hidden";
			var hei = "0";
		}
		
		panel.innerHTML =	"<h3 class='header'>" + Lang["timeTitle"] + "<img src='" + imagen + "' style='position: absolute; right: 5px; top: 7px; cursor: pointer;'/></h3>" +
							"<div class='content' style='height: 155px; visibility: " + vis + "; height: " + hei + ";'>" +
								"<img id='flechaCalculadora' src='" + Img.flecha2 + "' style='position: absolute; right: 0; top: -5px; cursor: pointer;'/>" +
								"<div style='text-align: center; width: 100px; position: relative; top: 10px;'>" +
									"<span style='font-weight: bold; font-size: 13px;'>" + nombreIsla.split (" [")[1].replace ("]", "") + "<span><br/>" +
									"<span style='font-weight: normal; font-size: 12px;'>" + nombreIsla.split (" [")[0] + "<span><br/>" +
									"<span style='font-weight: normal; font-size: 11px;'>" + Ciudad.getNombre () +"</span>" +
								"</div>" +
								"<img style='position: absolute; top: 28px; left: 103px;' src='" + Img.flecha + "'/>" +
								"<div style='text-align: center; width: 100px; position: absolute; top: 10px; left: 120px;'>" +
									"<span id='coordsIsla' style='font-weight: bold; font-size: 13px;'>...</span><br/>" +
									"<span id='nombreIsla' style='font-weight: normal; font-size: 12px;'>...</span><br/>" +
								"</div>" +
								"<span id='tiempoIslas' style='position: absolute; top: 78px; width: 100%; text-align: center; font-weight: bold; font-size: 14px;'>...</span>" +
								"<input id='inputCoordenada0' style='background: #FFF; border: solid thin #BC575D; width: 28px; position: absolute; top: 120px; left: 10px;' type='text' value='-'/>" +
								"<input id='inputCoordenada1' style='background: #FFF; border: solid thin #BC575D; width: 28px; position: absolute; top: 120px; left: 52px;' type='text' value='-'/>" +
								"<img style='position: absolute; top: 125px; left: 103px;' src='" + Img.flecha + "'/>" +
								"<input id='inputCoordenada2' style='background: #FFF; border: solid thin #BC575D; width: 28px; position: absolute; top: 120px; right: 52px;' type='text' value='-'/>" +
								"<input id='inputCoordenada3' style='background: #FFF; border: solid thin #BC575D; width: 28px; position: absolute; top: 120px; right: 10px;' type='text' value='-'/>" +
								"<span style='position: absolute; top: 123px; left: 46px; font-size: 14px; font-weight: bold;'>:</span>" +
								"<span style='position: absolute; top: 123px; right: 46px; font-size: 14px; font-weight: bold;'>:</span>" +
							"</div>" +
							"<div class='footer'></div>";
							
		colocaDetras (panel, document.getElementById ("navigation"));
		
		document.getElementById ("calcDistancia").getElementsByTagName ("img")[0].addEventListener (
			"click",
			function (){
				var contenido = this.parentNode.parentNode.childNodes[1];
				
				if (abierto){
					abierto = false;
					abiertoAvanzado = false;
					this.src = Img.maximizarPanel;
					contenido.style.visibility = "hidden";
					contenido.style.height = "0";
					panelesScript[3] = 0;
					GM_setValue (server + "paneles", panelesScript.join ("#"));
					document.getElementById ("calcDistanciaAvanzada").style.display = "none";
					document.getElementById ("flechaCalculadora").src = Img.flecha2;
				}else{
					abierto = true;
					this.src = Img.minimizarPanel;
					contenido.style.height = "155px";
					contenido.style.visibility = "visible";
					panelesScript[3] = 1;
					GM_setValue (server + "paneles", panelesScript.join ("#"));
				}
			},
			false
		);
	}
	
	/**
	 * Crea el panel avanzado.
	 */
	function panelAvanzado (){
		var panel = document.createElement ("div");
		panel.id = "calcDistanciaAvanzada";
		panel.className = "bodyReloaded";
		panel.style.display = "none";
		panel.style.position = "absolute";
		panel.style.top = "390px";
		panel.style.left = "252px";
		panel.style.width = "180px";
		
		panel.innerHTML =	"<div class='headerReloaded'></div>" +
							"<div class='content' style='width: 150px; padding: 7px 10px 0 13px;'>" +
								"<table style='width: 100%;'>" +
									"<tr>" +
										"<td class='calc_td'><img src='http://" + host + "/skin/characters/military/120x100/spy_120x100.gif' width='30px'/></td>" +
										"<td class='calc_tiempo'>...</td>" +
									"</tr>" +
									"<tr>" +
										"<td class='calc_td'><img src='http://" + host + "/skin/characters/fleet/120x100/ship_transport_r_120x100.gif' width='30px'/></td>" +
										"<td class='calc_tiempo'>...</td>" +
									"</tr>" +
									"<tr>" +
										"<td class='calc_td'><img src='http://" + host + "/skin/characters/fleet/120x100/ship_ram_r_120x100.gif' width='30px'/></td>" +
										"<td class='calc_tiempo'>...</td>" +
									"</tr>" +
									"<tr>" +
										"<td class='calc_td'><img src='http://" + host + "/skin/characters/fleet/120x100/ship_ballista_r_120x100.gif' width='30px'/></td>" +
										"<td class='calc_tiempo'>...</td>" +
									"</tr>" +
									"<tr>" +
										"<td class='calc_td'><img src='http://" + host + "/skin/characters/fleet/120x100/ship_flamethrower_r_120x100.gif' width='30px'/></td>" +
										"<td class='calc_tiempo'>...</td>" +
									"</tr>" +
									"<tr>" +
										"<td class='calc_td'><img src='http://" + host + "/skin/characters/fleet/120x100/ship_catapult_r_120x100.gif' width='30px'/></td>" +
										"<td class='calc_tiempo'>...</td>" +
									"</tr>" +
									"<tr>" +
										"<td class='calc_td'><img src='http://" + host + "/skin/characters/fleet/120x100/ship_steamboat_r_120x100.gif' width='30px'/></td>" +
										"<td class='calc_tiempo'>...</td>" +
									"</tr>" +
									"<tr>" +
										"<td class='calc_td'><img src='http://" + host + "/skin/characters/fleet/120x100/ship_mortar_r_120x100.gif' width='30px'/></td>" +
										"<td class='calc_tiempo'>...</td>" +
									"</tr>" +
									"<tr>" +
										"<td class='calc_td'><img src='http://" + host + "/skin/characters/fleet/120x100/ship_submarine_r_120x100.gif' width='30px'/></td>" +
										"<td class='calc_tiempo'>...</td>" +
									"</tr>" +
								"</table>" +
							"</div>" +
							"<div class='footerReloaded'></div>";
		
		colocaDetras (panel, document.getElementById ("calcDistancia"));
		
		document.getElementById ("flechaCalculadora").addEventListener (
			"click",
			function (){
				var panel = document.getElementById ("calcDistanciaAvanzada");
				if (abiertoAvanzado){
					panel.style.display = "none";
					abiertoAvanzado = false;
					this.src = Img.flecha2;
				}else{
					panel.style.display = "inline";
					abiertoAvanzado = true;
					this.src = Img.flecha3;
				}
			},
			false
		);
	}
	
	if (pagina == "worldmap_iso"){
		var nombreIsla = document.getElementById ("islandBread").childNodes[0].textContent;
		
		//Booleanos de los inputs
		var inputs = [false, false, false, false];
		
		var abiertoAvanzado = false;
		
		panel ();
		panelAvanzado ();
		
		var coordsInicio = nombreIsla.split ("[")[1].replace ("]", "");
		
		//Listener
		document.getElementById ("islandBread").addEventListener ("DOMSubtreeModified", calcula, false);
		
		for (var i=0; i<4; i++){
			var cas = document.getElementById ("inputCoordenada" + i);
			cas.addEventListener ("keyup", function (){ validaInput (this); }, false);
			cas.addEventListener (	"mousedown",
									function (){
										if (this.value == "-"){
											this.value = "";
										}
									},
									false);
		}
	}
}

/**
 * Crea un menú de configuración de las funciones.
 */
function menuConfig (){
	function guardar (){
		for (var i=0; i<config.length; i++){
			if (document.getElementById ("guardarConfig" + i).checked){
				config[i] = "1";
			}else{
				config[i] = "0";
			}
		}

		GM_setValue (server + "config", config.join ("#"));
		
		window.open (document.getElementsByClassName ("viewCity")[0].childNodes[0].href, "_self");
	}
	
	/**
	 * Inicializa el estado de los checkbox.
	 */
	function inicializaCheckbox (){
		for (var i=0; i<config.length; i++){
			if (config[i] == "1"){
				document.getElementById ("guardarConfig" + i).checked = "checked";
			}
		}
	}
	
	/**
	 * Inicializa el estado de las funciones.
	 */
	function inicializaFunciones (){
		if (config[0] == "1")	eliminaBarraNavegacion ();
		if (config[1] == "1")	menuPaneles ();
		if (config[2] == "1")	creaIconoPremium ();
		if (config[3] == "1")	creaBotonesRecursos ();
		if (config[4] == "1")	informaOroMinas ();
		if (config[5] == "1")	creaInfoMinas ();
		if (config[6] == "1")	cuartelVistaAvanzada ();
		if (config[7] == "1")	ordenaMiembrosAlianza ();
		if (config[8] == "1")	creaPanelEspias ();
		if (config[9] == "1")	consultaGenerales ();
		if (config[10] == "1")	calculaDistancia ();
	}
	
	var config = GM_getValue (server + "config", "1#1#1#1#1#1#1#1#1#1#1").split ("#");

	if (pagina == "options"){
		var panel = document.createElement ("div");
		panel.className = "contentBox01h";
		panel.innerHTML =	"<h3 class='header'>" +
								"<span class='textLabel'>Ikariam Reloaded</span>" +
							"</h3>" +
							"<div class='content' style='padding: 10px;'>" +
								"<div class='inputOpciones'><input id='guardarConfig0' type='checkbox'/>" + Lang["config0"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig1' type='checkbox'/>" + Lang["config1"].replace ("{x1}", "<i>" + Lang["pointsPlayer"] + "</i>").replace ("{x2}", "<i>" + Lang["moveUnits"] + "</i>").replace ("{x3}", "<i>" + Lang["cityImage"] + "</i>") + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig2' type='checkbox'/>" + Lang["config2"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig3' type='checkbox'/>" + Lang["config3"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig4' type='checkbox'/>" + Lang["config4"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig5' type='checkbox'/>" + Lang["config5"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig6' type='checkbox'/>" + Lang["config6"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig7' type='checkbox'/>" + Lang["config7"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig8' type='checkbox'/>" + Lang["config8"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig9' type='checkbox'/>" + Lang["config9"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig10' type='checkbox'/>" + Lang["config10"] + "</div>" +
								"<div><center><input class='button' type='button' id='botonGuardarMenu' value='" + Lang["save"] + "'/></center></div>" +
							"</div>" +
							"<div class='footer'/>";
		
		colocaDetras (panel, document.getElementsByClassName ("contentBox01h")[1]);
		
		document.getElementById ("botonGuardarMenu").addEventListener ("click", guardar, false);
		
		inicializaCheckbox ();
	}
	
	//Inicializo el estado de las funciones
	inicializaFunciones ();
}

/**
 * Calcula el tiempo de ejecución del script.
 */
function colocaMs (t1, t2){
	var li = document.createElement ("li");
	li.innerHTML = "<a href='http://userscripts.org/scripts/show/51336' target='_blank' title='Ikariam Reloaded'>" + (t2 - t1) + "ms</a>";
	
	document.getElementById ("GF_toolbar").childNodes[3].appendChild (li);
}

//--------------- fin FUNCIONES ---------------//


//--------------- SCRIPT ---------------//
GM_deleteValue ("tmp");
var t1 = new Date ().getTime ();

autoUpdate (51336, "2.40");

var host = location.hostname;
var server = host.split (".")[0] + "::";
var pagina = document.body.id;
var Lang = new Language ().getTranslation ();
var Img = new Imagenes ();
var BaseDatos = new BD ();
var Ciudad = new Ciudad (compruebaVariableCiudades ());
var panelesScript = GM_getValue (server + "paneles", "1#1#1#1#1#1").split ("#");

estiloGlobal ();
actualizaNombreCiudad ();

eliminaPublicidad ();
cambiaUI ();
ordenImagenCiudades ();
creaLinkMinas ();

menuConfig ();

var t2 = new Date ().getTime ();

colocaMs (t1, t2);

//--------------- fin SCRIPT ---------------//



// ==/UserScript==

var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'IKAFONT';
var cookie_SEPARA    = '|';
var css_MenuIKO_String = '#menu {'+
'align:right;'+
'margin-left:500px;'+
'margin-top: -16.5px;'+
'color:white;'+
'width: 50px;'+
'cursor: hand;'+
'}'+
'#menu ul {'+
'list-style: none;'+
'margin: 0;'+
'padding: 0;'+
'width: 13em;'+
'}'+
'#menu a, #menu h2 {'+
'font: bold 11px/16px arial, helvetica, sans-serif;'+
'display: block;'+
'margin: 0;'+
'padding: 2px 3px;'+
'cursor: hand;'+
'}'+
'#menu a {'+
'color: RGB(84,44,15);'+
//Colores menu normal.
'background: RGB(246,235,188);'+
'border: double 3px RGB(84,44,15);'+
'border-left: double 3px RGB(84,44,15);'+
'border-right: double 3px RGB(84,44,15);'+
'text-decoration: none;'+
'}'+
'#menu a:hover {'+
'color: RGB(84,44,15);'+
//Color menu seleccionado.
'background: RGB(222,180,120);'+
'border: double 3px RGB(84,44,15);'+
'}'+
'#menu li {position: relative; }'+
'#menu ul ul {'+
'position: relative;'+
'z-index: 500;'+
'}'+
'#menu ul ul ul {'+
'position: absolute;'+
'top: 0;'+
'left: 100%;'+
'}'+
'div#menu ul ul,'+
'div#menu ul li:hover ul ul,'+
'div#menu ul ul li:hover ul ul'+
'{display: none;}'+
'div#menu ul li:hover ul,'+
'div#menu ul ul li:hover ul,'+
'div#menu ul ul ul li:hover ul'+
'{display: block;}';

if(!window.add_Global_Style){
       function add_Global_Style(css) {
               var head, style;
               head = document.getElementsByTagName('head')[0];
               if (!head) { return; }
               style = document.createElement('style');
               style.type = 'text/css';
               style.innerHTML = css;
               head.appendChild(style);
       }
}
function getAlltagsAModificar(){

var arrResult = new Array();
var lastI     = 0;
var xTags     = null;

for (tagX = 0; tagX<tagsAModificar.length; tagX++) {
xTags = document.getElementsByTagName(tagsAModificar[tagX]);
for(i=0;i<xTags.length;i++){arrResult[lastI] = xTags[i];lastI++;}
}

return arrResult;

}

unsafeWindow.setFontIka = function () {
 var FamilyIndex = document.getElementById("Family").selectedIndex;
 var FI = document.getElementById("Family").options[FamilyIndex].text;
 changeAllFamily(FI);
 var SizeIndex = document.getElementById("Size").selectedIndex;
 var SI = document.getElementById("Size").options[SizeIndex].text;
 changeAllSize(SI);
 var ColorIndex = document.getElementById("Color").selectedIndex;
 var CI = document.getElementById("Color").options[ColorIndex].text;
 changeAllColor(CI);
 createCookie(cookieIKO,FI+cookie_SEPARA+SI+cookie_SEPARA+CI,diaLimite);
}
function createCookie(name,value,days) {
       if (days) {
               var date = new Date();
               date.setTime(date.getTime()+(days*24*60*60*1000));
               var expires = "; expires="+date.toGMTString();
       }
       else var expires = "";
       document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(c_name) {
       if (document.cookie.length>0)
 {
 c_start=document.cookie.indexOf(c_name + "=");
 if (c_start!=-1)
   {
   c_start=c_start + c_name.length+1;
   c_end=document.cookie.indexOf(";",c_start);
   if (c_end==-1) c_end=document.cookie.length;
   return unescape(document.cookie.substring(c_start,c_end));
   }
 }
       return "";
}
function initFont(){
var rC     = readCookie(cookieIKO);
if (rC){
var myFont = rC.split(cookie_SEPARA);
changeAllFamily(myFont[0]);
changeAllSize(myFont[1]);
changeAllColor(myFont[2]);
}
}
function eraseCookie(name) {
       createCookie(name,"",-1);
}
function changeAllFamily(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontFamily = valueOfSelect;
}
}
function changeAllSize(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontSize = valueOfSelect;
}
}
function changeAllColor(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.color = valueOfSelect;
}
}
unsafeWindow.clearFont = function(){
eraseCookie(cookieIKO);
window.location.reload();
}
function add_Alliance_Menu(){
var xTags = document.getElementsByTagName('LI');
var xLi   = null;
var Tools_Link       = document.createElement('LI');
Tools_Link.setAttribute('id', 'Tools');

for(i=0;i<xTags.length;i++){
xLi = xTags[i];
if (xLi.className == 'help') {
xLi.parentNode.appendChild(Tools_Link,xLi);
add_Global_Style(css_MenuIKO_String);
document.getElementById('Tools').innerHTML =
'<div id="menu">'
+ '<ul>'
+ ' <li><h2>ALIANZA -13 TITANES-</h2>'
+ '   <ul>'
+ '     <li><center><a target="_blank" href="http://www.13titanes.co.cc" align="left">&nbsp;FORO DE LA ALIANZA</a></li>'
+ '     <li><center><a href="http://hi.muriandre.com/cdv.php" align="left">&nbsp;CALCULADOR DE TIEMPOS DE VIAJE</a></li>'
+ '     <li><center><a href="http://ikariamlibrary.com/?content=IkaFight" align="left">&nbsp;SIMULADOR DE BATALLAS</a></li>'
+ '     <li><center><a href="http://www.ika-world.com/es/suche.php?view=suche_deluxe&land=es" align="left">&nbsp;BUSCADOR DE JUGADORES Y CIUDADES</a></li>'
+ '     <li><center><a href="http://hi.muriandre.com/cdb.php" align="left">&nbsp;COMPACTADOR DE BATALLAS</a></li>'


+'</ul>'
+'</DIV>';

break;
}}}

add_Alliance_Menu();



// ==UserScript==

// @include			http://s*.ikariam.*/index.php*

// ==/UserScript==

// Version Log:
//		v1.2.1 (8. June 2009)
//			- Fixed a bug which caused no resource reduction when a reduction building is being upgrade.
//			- Improved positioning of the icons. Icon and info box at construction spot are now correctly positioned.
//
//		v1.2.0 (2. June 2009)
//			- New: Added icon and info box to construction spot (thanks to giangkid for the suggestion).
//
//		v1.1.1 (26. May 2009)
//			- Fixed a bug when NOT using Black Canvas add-on to Firefox, the level indication is not centralized correctly.
//
//		v1.1.0 (25. May 2009)
//			- New: Added a info box which shows up when mouse over the icon, the box can be turned off in the options page.
//			- Fixed a bug where in a rare case, an icon is not shown on the wall.
//			- Fixed a bug which caused no sulfur reduction bonus.
//
//		v1.0.3 (17. May 2009)
//			- Fixed first time running check which caused unnecessarily research checks.
//
//		v1.0.2 (17. May 2009)
//			- Fix to support different languages (thanks to oliezekat).
//			- Improved bureaucracy-spot check.
//
//		v1.0.1 (17. May 2009)
//			- Fixed bureaucracy-spot, not showing if you are not done with that research.
//			- Removed alert boxes which shows up at the start.
//
// 		v1.0.0 (16. May 2009)
//			- Release.

// URL to icons
var imgURL = "http://www.atdao.dk/public/images/";

// Server host and hostname
var host = top.location.host;
var hostname = top.location.hostname.split(".");

// Materials reduction from researches
var pulley = GM_getValue(host + "_iuw_pulley", false);
var geometry = GM_getValue(host + "_iuw_geometry", false);
var spirit = GM_getValue(host + "_iuw_spirit", false);

// Var for showing info box or not, default true
var showInfoBox = GM_getValue(host + "_iuw_infobox", true);

// If spot/pos 13 is available
var bureaucracy = GM_getValue(host + "_iuw_bureaucracy", false);

// First timer var
var firstTimer = GM_getValue(host + "_iuw_first_timer", true);

// Gets the view
var view = getView();

// Helper var to check if we should skip the checking the research
var skipResearch = GM_getValue(host + "_iuw_skip_research", false);

// Extracting action
var uri = top.location.search, action = getAction(uri);

// Just after login
if (action == "loginAvatar" && skipResearch == false) {

	// Do syncronized request
	// Check researches, pulley, geometry, spirit, bureaucracy
	getResearch(host, getCityId(), false);
	GM_setValue(host + "_iuw_first_timer", false);
	
	// Not first time anymore
	firstTimer = false;
	
}

// When user clicks on academy or research advisor
if ((view == "academy" || view == "researchAdvisor") && skipResearch == false) {
	
	// Do asyncronized request
	// Check researches, pulley, geometry, spirit, bureaucracy
	getResearch(host, getCityId(), true);
	GM_setValue(host + "_iuw_first_timer", false);
	
	// Not first time anymore
	firstTimer = false;
	
}

// Options view
if (view == "options") {

	// Getting the URI
	var uri = top.location.search.split("&");
	
	// If the setting is set, we assign the new settings
	if (isDefined(uri[1])) {
		
		var pos = uri[1].indexOf("=");
		var setting = uri[1].substr(pos+1);
		
		if (setting == "false") {
		
			showInfoBox = false;
			GM_setValue(host + "_iuw_infobox", false);
			
		} else if (setting == "true") {
		
			showInfoBox = true;
			GM_setValue(host + "_iuw_infobox", true);
			
		}
		
	}

	// Creating the setting panel for this mod
	var settingPanel = document.createElement("div"), child;
	var checkedYes ="", checkedNo = "";
	
	settingPanel.className = "contentBox01h";
	
	if (showInfoBox) {
		checkedYes = 'checked';
	} else {
		checkedNo = 'checked';
	}

    child = '<h3 class="header"><span class="textLabel">Ikariam Upgrade Watcher</span></h3><div class="content"><form action="index.php" method="GET"><input type=hidden name=view value="options"><table cellpadding="0" cellspacing="0"><tr><th>Show info box</th><td><input type="radio" name="iuwInfoBox" value="true" '+checkedYes+'> Yes<br><input type="radio" name="iuwInfoBox" value="false" '+checkedNo+'> No</td></tr></table><div class="centerButton"><input class="button" type="submit" value="Save Setting" /></div></form></div><div class="footer"></div></div>';
	
	settingPanel.innerHTML = child;
	
	// Inserting the setting panel before the vacation mode setting
	document.getElementById("mainview").insertBefore(settingPanel, document.getElementById("vacationMode"));

}

// When city is shown
if (view == "city") {

	// If it is the mod is running for the first time,
	// we check the research
	if (firstTimer) {
		
		// Do syncronized request
		// Check researches, pulley, geometry, spirit, bureaucracy
		getResearch(host, getCityId(), false);
		GM_setValue(host + "_iuw_first_timer", false);
		
	}

	// Getting the list of buildings
	var buildingList = document.getElementById('locations');
	
	// If we find a list of buildings, then we start adding icon to each building
	if (buildingList) {
				
		// Ressource variables
		var wood, wine, marble, crystal, sulfur;
	
		// Get the resources we have in town
		if (document.getElementById('value_wood')) { wood = document.getElementById('value_wood').textContent.replace(",",""); }
		if (document.getElementById('value_wine')) { wine = document.getElementById('value_wine').textContent.replace(",",""); }
		if (document.getElementById('value_marble')) { marble = document.getElementById('value_marble').textContent.replace(",",""); }
		if (document.getElementById('value_crystal')) { crystal = document.getElementById('value_crystal').textContent.replace(",",""); }
		if (document.getElementById('value_sulfur')) { sulfur = document.getElementById('value_sulfur').textContent.replace(",",""); }
	
		// Get each building/spot from the building list
		var spot = buildingList.getElementsByTagName('li');
		
		// Info about each building/spot
		var building, level, upLevel, posTop, posRight, img, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur;
		
		// If the town is constructing or upgrading a building
		var construction = false;
		
		// Reduced materials
		var redAll = 0, redWood = 0, redWine = 0, redMarble = 0, redCrystal = 0, redSulfur = 0;
		
		// Assigning reductions in %
		if (pulley) { redAll = 2; }
		if (geometry) { redAll = redAll + 4; }
		if (spirit) { redAll = redAll + 8; }
		redAll = (100 - redAll) / 100;
		
		// We check if the user has built some material reduction buildings
		for (var i = 0; i < spot.length; i++) {
			
			building = spot[i].getElementsByTagName('div');
			
			if (isDefined(building, 0) && building[0].className != 'flag') {
			
				if (building[0].className == 'constructionSite') {
					
					construction = true;
					
				}
				
				switch (spot[i].className) {
					case 'architect':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redMarble = parseInt(level);
						break;
					case 'optician':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redCrystal = parseInt(level);
						break;
					case 'carpentering':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redWood = parseInt(level);
						break;
					case 'vineyard':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redWine = parseInt(level);
						break;
					case 'fireworker':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redSulfur = parseInt(level);
						break;
				}
				
			}
			
		}
		
		// Setting the material reduction in percent
		redWood = (100 - redWood) / 100;
		redWine = (100 - redWine) / 100;
		redMarble = (100 - redMarble) / 100;
		redCrystal = (100 - redCrystal) / 100;
		redSulfur = (100 - redSulfur) / 100;
		
		// Variable for database
		var POSITIONS, BUILDINGS;
		
		// Loadinng DB
		loadDB();
	
		// Creating the icon for each building
		for (var i = 0; i < spot.length; i++) {
	
			building = spot[i].getElementsByTagName('div');
			
			// Check for bureaucracy spot
			if (i == 13) {
								
				if (!bureaucracy) {
					
					// If the research have not been done
					// we skip skip the position 13
					continue;
					
				}
			
			}
			
			if (isDefined(building, 0) && building[0].className != 'flag') {		
				
				// Gets the level of a building
				level = spot[i].getElementsByTagName('a');
				level = getBuildingLevel(level[0].title);
				
				// Defines some style
				building[0].style.fontWeight = 'bold';
				building[0].style.color = 'white';
				
				// Default image to use is no.png
				// no.png = red
				// yes.png = green
				// wait.png = blue
				// unknown.png = grey
				img = 'no';
				
				var buildingType = spot[i].className;
				var iconId = "iuwIcon" + i;
				var posTop, posRight, posInfoTop, posInfoLeft;
				
				// The upgrade level
				// Note: because the database starts with lvl 2 of all buildings,
				// and the index starts with 0, we have to get one level below
				if (building[0].className == 'constructionSite') {
					// If we find a contruction spot, we would like to see the level after the construction
					upLevel = parseInt(level);
					
					// Positioning for construction spot
					posTop = POSITIONS['constructionSite'][0]["y"];
					posRight = POSITIONS['constructionSite'][0]["x"];
					posInfoTop = POSITIONS['constructionSite'][1]["y"];
					posInfoLeft = POSITIONS['constructionSite'][1]["x"];
					
				} else if (isDefined(POSITIONS[buildingType]) && isDefined(BUILDINGS[buildingType])) {
				
					// Positioning for other buildings
					upLevel = parseInt(level) - 1;
					posTop = POSITIONS[buildingType][0]["y"];
					posRight = POSITIONS[buildingType][0]["x"];
					posInfoTop = POSITIONS[buildingType][1]["y"];
					posInfoLeft = POSITIONS[buildingType][1]["x"];
				}
				
				// 3 special cases, uses more than wood and marble			
				switch (buildingType) {
					case 'palace':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
							reqWine = Math.floor(BUILDINGS[buildingType][upLevel]["wine"] * redAll * redWine);
							reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * redAll * redSulfur);
							
							//DEBUG(buildingType, upLevel, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							
							if (wood >= reqWood && wine >= reqWine && marble >= reqMarble && crystal >= reqCrystal && sulfur >= reqSulfur) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventPalace(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
						
					case 'palaceColony':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
							reqWine = Math.floor(BUILDINGS[buildingType][upLevel]["wine"] * redAll * redWine);
							reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * redAll * redSulfur);
							
							//DEBUG(buildingType, upLevel, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							
							if (wood >= reqWood && wine >= reqWine && marble >= reqMarble && crystal >= reqCrystal && sulfur >= reqSulfur) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventPalace(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
						
					case 'academy':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							
							//DEBUG(buildingType, upLevel , reqWood, 0, 0, reqCrystal, 0);
							
							if (wood >= reqWood && crystal >= reqCrystal) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventDefault(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqCrystal, true);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
						
					default:
					
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
															
							//DEBUG(buildingType, (upLevel+2), reqWood, 0, reqMarble, 0, 0);
							
							if (wood >= reqWood && marble >= reqMarble) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventDefault(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqMarble);
							}
							
							if (buildingType == 'townHall') {
								//alert(height);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
						
					break;
				}
			}
	
		}
	}
}

//---------------------------- FUNCTIONS ----------------------------//

/**
 * Creates an icon to attach a building
 * @param object obj
 * @param string icon id
 * @param integer position top
 * @param integer position right
 * @param string images
 * @param integer level
 * @return void
 */
function createIcon(obj, id, top, right, img, level) {
	obj.innerHTML = '<div id="'+ id +'" style="position: absolute; z-index: 501; padding-top: 5px; height: 19px; width: 24px; text-align: center; top: ' + top + 'px; right: '+ right +'px; background-image: url(\'' + imgURL + img +'.png\');">'+ level +'</div>';
}

/**
 * Creates a info box and attach it to an event to an icon (Palace, Residens)
 * @param string id
 * @param object target
 * @param string building type
 * @param integer wood
 * @param integer wine
 * @param integer marble
 * @param integer crystal
 * @param integer sulfur
 * @return void
 */
function addOnMouseOverEventPalace(id, target, posTop, posLeft, resWood, resWine, resMarble, resCrystal, resSulfur) {
	var element = document.getElementById(id);
	var div = document.createElement("div");
	var curWood, curWine, curMarble, curCrystal, curSulfur, colorWood, colorWine, colorMarble, colorCrystal, colorSulfur;
	var estWood, estWine, estMarble, estCrystal, estSulfur;
	
	// Styles for the info box
	div.className = "timetofinish";
	div.style.backgroundImage = "url('" + imgURL + "scroll-m2.png')";
	div.style.height = "102px";
	div.style.zIndex = "502";
	div.style.position = 'absolute';

	// Positioning each box
	div.style.top = posTop + "px";
	div.style.left = posLeft + "px";	
	
	// add on mouse over event
	element.addEventListener('mouseover', function(event) {
	
		// To get up-to-date resource values, we retrieve the value on each event
		if (document.getElementById('value_wood')) { curWood = document.getElementById('value_wood').textContent.replace(",",""); }
		if (document.getElementById('value_wine')) { curWine = document.getElementById('value_wine').textContent.replace(",",""); }
		if (document.getElementById('value_marble')) { curMarble = document.getElementById('value_marble').textContent.replace(",",""); }
		if (document.getElementById('value_crystal')) { curCrystal = document.getElementById('value_crystal').textContent.replace(",",""); }
		if (document.getElementById('value_sulfur')) { curSulfur = document.getElementById('value_sulfur').textContent.replace(",",""); }
		
		// Estimating the resource status
		estWood = curWood - resWood;
		estWine = curWine - resWine;
		estMarble = curMarble - resMarble;
		estCrystal = curCrystal - resCrystal;
		estSulfur = curSulfur - resSulfur;
		
		// Adding color to the values
		// Red if negative
		// Green if 0 or positive
		if (estWood >= 0) {	colorWood = "green"; } else { colorWood = "red"; }
		if (estWine >= 0) {	colorWine = "green"; } else { colorWine = "red"; }
		if (estMarble >= 0) { colorMarble = "green"; } else { colorMarble = "red"; }
		if (estCrystal >= 0) { colorCrystal = "green"; } else { colorCrystal = "red"; }
		if (estSulfur >= 0) { colorSulfur = "green"; } else { colorSulfur = "red"; }
		
		// Nasty, ugly HTML for the info box
		div.innerHTML = '<div class="before" style="background-image: url(\'' + imgURL +'scroll-l2.png\'); height: 102px; float: left;"></div><div style="float: left;"><div style="color: ' + colorWood + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'wood.png" /> '+ estWood +'</div><div style="margin-top: -4px; color: ' + colorWine + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'wine.png" /> '+ estWine +'</div><div style="margin-top: -4px; color: ' + colorMarble + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'marble.png" /> '+ estMarble +'</div><div style="margin-top: -4px; color: ' + colorCrystal + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'glass.png" /> '+ estCrystal +'</div><div style="margin-top: -4px; color: ' + colorSulfur + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'sulfur.png" /> '+ estSulfur +'</div></div><div class="after" style="background-image: url(\'' + imgURL +'scroll-r2.png\'); height: 102px; float: left;"></div>';
		
		target.appendChild(div);
	
	}, false);
	
	// add on mouse out event
	element.addEventListener('mouseout', function(event) {
		target.removeChild(div);
	}, false);

}

/**
 * Creates a info box and attach it to an event to an icon (Academy, other 2 resource requied buildings)
 * @param string id
 * @param object target
 * @param string building type
 * @param integer wood
 * @param integer second resource
 * @param boolean if second resource is crystal
 * @return void
 */
function addOnMouseOverEventDefault(id, target, posTop, posLeft, resWood, res2, isCrystal) {
	var element = document.getElementById(id);
	var div = document.createElement("div");
	var curWood, curRes2, colorWood, colorRes2;
	var estWood, estRes2, resIcon2;
	
	// Styles for the info box
	div.className = "timetofinish";
	div.style.backgroundImage = "url('" + imgURL + "scroll-m.png')";
	div.style.height = "46px";
	div.style.zIndex = "502";
	div.style.position = 'absolute';

	// Positioning each box
	div.style.top = posTop + "px";
	div.style.left = posLeft + "px";
	
	// add on mouse over event
	element.addEventListener('mouseover', function(event) {
		
		// To get up-to-date resource values, we retrieve the value on each event
		if (document.getElementById('value_wood')) { curWood = document.getElementById('value_wood').textContent.replace(",",""); }		
		// Estimating the wood status
		estWood = curWood - resWood;
		
		// In order to re-use this function, there is a crystal check
		if (isCrystal) {
	
			if (document.getElementById('value_crystal')) { curRes2 = document.getElementById('value_crystal').textContent.replace(",",""); }
			
			resIcon2 = "glass";
		
		} else {
		
			if (document.getElementById('value_marble')) { curRes2 = document.getElementById('value_marble').textContent.replace(",",""); }
			resIcon2 = "marble";
		}
		
		estRes2 = curRes2 - res2;
		
		if (estWood >= 0) { colorWood = "green"; } else { colorWood = "red"; }
		if (estRes2 >= 0) {	colorRes2 = "green"; } else { colorRes2 = "red"; }
		
		div.innerHTML = '<div class="before" style="background-image: url(\'' + imgURL +'scroll-l.png\'); height: 46px; float: left;"></div><div style="float: left;"><div style="color: ' + colorWood + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'wood.png" /> '+ estWood +'</div><div style="margin-top: -4px; color: ' + colorRes2 + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + resIcon2 +'.png" /> '+ estRes2 +'</div></div><div class="after" style="background-image: url(\'' + imgURL +'scroll-r.png\'); height: 46px; float: left;"></div>';
		
		target.appendChild(div);
	
	}, false);
	
	// add on mouse out event
	element.addEventListener('mouseout', function(event) {
		target.removeChild(div);
	}, false);

}


/**
 * Outputs upgrade values for a building
 * @param string building
 * @param integer level
 * @param integer wood
 * @param integer wine
 * @param integer marble
 * @param integer crystal
 * @param integer sulfur
 * @return void
 */
function DEBUG(build, lvl, wd, wn, m, c, s) {
	alert(build + " " + lvl + "\r\nwood: " + wd + "\r\nwine: " + wn + "\r\nmarble: " + m + "\r\ncrystal: " + c + "\r\nsulfur: " + s);
}

/**
 * Extracts the action value from URI
 * @param string uri
 * @return string
 */
function getAction(uri) {
	var pos, action;
	
	pos = uri.indexOf("&");
	
	action = uri.substr(8, (pos - 8));
	
	return action;	
}

/**
 * Gets the id of the body-tag which determines the view
 * @return string
 */
function getView() {
	var obj = document.getElementsByTagName("body");
	return obj[0].id;
}

/**
 * Extracts a building level from a given text
 * @param txt
 * @return integer
 */
function getBuildingLevel(txt) {
	var level;
	
	level = getIntValue(txt, '?');
	
	return level;
}

/**
 * Checks if a giving object is defined
 * @param object
 * @param variable
 * @return boolean
 */
function isDefined(object, variable) {
	if (variable != null) {
		return (typeof(eval(object)[variable]) != 'undefined');
	} else {
		return (typeof(eval(object)) != 'undefined');
	}
}

/**
 * Using XMLHttpRequest protocol to get the research list
 * @param url
 * @param id
 * @return void
 */
function getResearch(url, id, asyn) {
	xmlhttp=null;
	
	if (window.XMLHttpRequest) {// code for all new browsers
		xmlhttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {// code for IE5 and IE6
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	if (xmlhttp != null) {
	
		xmlhttp.open("GET", 'http://' + url + "/index.php?view=researchOverview&id=" + id, asyn);
		xmlhttp.send(null);
		
		if (asyn == true) {
			xmlhttp.onreadystatechange = stateChange;
		} else {
			stateChange();
		}
		
	} else {
		alert("Your browser does not support XMLHTTP.");
	}
}

function stateChange() {
	if (xmlhttp.readyState == 4) {// 4 = "loaded"
		if (xmlhttp.status == 200) {// 200 = OK
			checkResearch(xmlhttp.responseText);
		} else {
			alert("Problem retrieving data");
		}
	}
}

/**
 * Gets the city ID
 * @return integer
 */
function getCityId() {
	var div = document.getElementById('changeCityForm');
	var a = div.getElementsByTagName('a');	
	var id = a[4].href, pos;

	pos = id.indexOf('id=') + 3;
	id = id.substr(pos);
	
	return parseInt(id);
}

/**
 * Check if some researches have been done (pulley, geometry, spirit, bureaucracy)
 * 
 * @param txt
 * @return void
 */
function checkResearch(txt) {
	var pattern = /<li class="([a-z]+)">[\r\n]+.+<a href="\?view=researchDetail&id=[0-9]+&position=[0-9]&researchId=(2020|2060|2100|2110)+"/g;	
	var matches = txt.match(pattern);
	
	// Pulley ID: 2020
	if (matches[0].indexOf('unexplored') == -1) {
		pulley = true;
		GM_setValue(host + "_iuw_pulley", true);
	}
	
	// Geometry ID: 2060
	if (matches[1].indexOf('unexplored') == -1) {
		geometry = true;
		GM_setValue(host + "_iuw_geometry", true);
	}
	
	// Spirit ID: 2100
	if (matches[2].indexOf('unexplored') == -1) {
		spirit = true;
		GM_setValue(host + "_iuw_spirit", true);
	}
	
	// Bureaucracy ID: 2110
	if (matches[3].indexOf('unexplored') == -1) {
		bureaucracy = true;
		GM_setValue(host + "_iuw_bureaucracy", true);
	}
	
	// If all needed research are done, no reason to check it again
	if (pulley && geometry && spirit && bureaucracy) {
		GM_setValue(host + "_iuw_skip_research", true);
	}
	
	//alert("pulley: " + pulley + "\r\ngeometry: " + geometry + "\r\nspirit: " + spirit + "\r\nbureaucracy: " + bureaucracy);
}

//Contributed by oliezekat
/**
 * Extracts number from string
 * @param str
 * @param defaultValue
 * @return integer
 */
function getIntValue(str, defaultValue) {
	var temp = ""+str;
	
	temp = temp.replace(/[^-0-9]+/g, "");
	temp = parseInt(temp);
	
	if (defaultValue != undefined && (temp == undefined || (""+temp == "NaN"))) {
		return defaultValue;
	}
	
	return temp;
}

//---------------------------- DATABASE ----------------------------//

function loadDB() {
	// positions for each icon
	POSITIONS = {
		// palace
		"palace" : [
			{ "x" : 40, "y" : 70 },		// positioning the icon
			{ "x" : 10, "y" : 96 },		// positioning the info box
		],
		
		// palaceColony
		"palaceColony" : [
			{ "x" : 40, "y" : 70 },
			{ "x" : 10, "y" : 96 },
		],
		
		// academy
		"academy" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],
		
		// townHall
		"townHall" : [
			{ "x" : 35, "y" : 85 },
			{ "x" : 10, "y" : 38 },
		],

		// architect
		"architect" : [
			{ "x" : 50, "y" : 65 },
			{ "x" : 22, "y" : 18 },
		],

		// safehouse
		"safehouse" : [
			{ "x" : 40, "y" : 42 },
			{ "x" : -6, "y" : -6 },
		],

		//wall
		"wall" : [
			{ "x" : 150, "y" : 40 },
			{ "x" : 500, "y" : 64 },
		],

		// shipyard
		"shipyard" : [
			{ "x" : 30, "y" : 60 },
			{ "x" : 22, "y" : 12 },
		],

		// port
		"port" : [
			{ "x" : 40, "y" : 70 },
			{ "x" : 60, "y" : 24 },
		],

		// glassblowing
		"glassblowing" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// warehouse
		"warehouse" : [
			{ "x" : 60, "y" : 60 },
			{ "x" : 16, "y" : 12 },
		],

		// museum
		"museum" : [
			{ "x" : 45, "y" : 60 },
			{ "x" : 6, "y" : 12 },
		],

		// workshop
		"workshop" : [
			{ "x" : 30, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// forester
		"forester" : [
			{ "x" : 45, "y" : 50 },
			{ "x" : 26, "y" : 3 },
		],

		// optician
		"optician" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// barracks
		"barracks" : [
			{ "x" : 40, "y" : 60 },
			{ "x" : 10, "y" : 12 },
		],

		// carpentering
		"carpentering" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 16, "y" : 12 },
		],

		// embassy
		"embassy" : [
			{ "x" : 40, "y" : 60 },
			{ "x" : 0, "y" : 12 },
		],
		
		// stonemason
		"stonemason" : [
			{ "x" : 50, "y" : 50 },
			{ "x" : 16, "y" : 3 },
		],

		// fireworker
		"fireworker" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 22, "y" : 12 },
		],

		// winegrower
		"winegrower" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// vineyard
		"vineyard" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 26, "y" : 12 },	// MANGLER
		],

		// tavern
		"tavern" : [
			{ "x" : 40, "y" : 50 },
			{ "x" : 20, "y" : 3 },
		],

		// alchemist
		"alchemist" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],
		
		// branchOffice
		"branchOffice" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 10, "y" : 12 },
		],
		
		// construction spot
		"constructionSite" : [
			{ "x" : 45, "y" : 59 },
			{ "x" : 18, "y" : 15 },
		]		
	};

	// All index start with level 2
	BUILDINGS = {
		// palace, wood, wine, marble, crystal, sulfur
		"palace" : [
			{ "wood" : 5824, "wine" : 0, "marble" : 1434, "crystal" : 0, "sulfur" : 0 },
			{ "wood" : 16048, "wine" : 0, "marble" : 4546, "crystal" : 0, "sulfur" : 3089 },
			{ "wood" : 36496, "wine" : 10898, "marble" : 10770, "crystal" : 0, "sulfur" : 10301 },
			{ "wood" : 77392, "wine" : 22110, "marble" : 23218, "crystal" : 21188, "sulfur" : 24725 },
			{ "wood" : 159184, "wine" : 44534, "marble" : 48114, "crystal" : 42400, "sulfur" : 53573 },
			{ "wood" : 322768, "wine" : 89382, "marble" : 97906, "crystal" : 84824, "sulfur" : 111269 },
			{ "wood" : 649936, "wine" : 179078, "marble" : 197490, "crystal" : 169672, "sulfur" : 226661 },
			{ "wood" : 1304272, "wine" : 358470, "marble" : 396658, "crystal" : 339368, "sulfur" : 457445 },
			{ "wood" : 2612944, "wine" : 717254, "marble" : 794994, "crystal" : 678760, "sulfur" : 919013 }	// level 10
		],
		
		// palaceColony, wood, wine, marble, crystal, sulfur
		"palaceColony" : [
			{ "wood" : 5824, "wine" : 0, "marble" : 1434, "crystal" : 0, "sulfur" : 0 },
			{ "wood" : 16048, "wine" : 0, "marble" : 4546, "crystal" : 0, "sulfur" : 3089 },
			{ "wood" : 36496, "wine" : 10898, "marble" : 10770, "crystal" : 0, "sulfur" : 10301 },
			{ "wood" : 77392, "wine" : 22110, "marble" : 23218, "crystal" : 21188, "sulfur" : 24725 },
			{ "wood" : 159184, "wine" : 44534, "marble" : 48114, "crystal" : 42400, "sulfur" : 53573 },
			{ "wood" : 322768, "wine" : 89382, "marble" : 97906, "crystal" : 84824, "sulfur" : 111269 },
			{ "wood" : 649936, "wine" : 179078, "marble" : 197490, "crystal" : 169672, "sulfur" : 226661 },
			{ "wood" : 1304272, "wine" : 358470, "marble" : 396658, "crystal" : 339368, "sulfur" : 457445 },
			{ "wood" : 2612944, "wine" : 717254, "marble" : 794994, "crystal" : 678760, "sulfur" : 919013 }	// level 10
		],
		
		// academy, wood, crystal
		"academy" : [
			{ "wood" : 68, "crystal" : 0 },
			{ "wood" : 115, "crystal" : 0 },
			{ "wood" : 263, "crystal" : 0 },
			{ "wood" : 382, "crystal" : 225 },
			{ "wood" : 626, "crystal" : 428 },
			{ "wood" : 982, "crystal" : 744 },
			{ "wood" : 1330, "crystal" : 1089 },
			{ "wood" : 2004, "crystal" : 1748 },
			{ "wood" : 2665, "crystal" : 2454 },
			{ "wood" : 3916, "crystal" : 3786 },
			{ "wood" : 5156, "crystal" : 5216 },
			{ "wood" : 7446, "crystal" : 7862 },
			{ "wood" : 9753, "crystal" : 10729 },
			{ "wood" : 12751, "crystal" : 14599 },
			{ "wood" : 18163, "crystal" : 21627 },
			{ "wood" : 23691, "crystal" : 29321 },
			{ "wood" : 33450, "crystal" : 43020 },
			{ "wood" : 43571, "crystal" : 58213 },
			{ "wood" : 56728, "crystal" : 78724 },
			{ "wood" : 73832, "crystal" : 106414 },
			{ "wood" : 103458, "crystal" : 154857 },
			{ "wood" : 144203, "crystal" : 224146 },
			{ "wood" : 175057, "crystal" : 282571 },
			{ "wood" : 243929, "crystal" : 408877 }		// level 25
		],
		
		// townHall, wood, marble
		"townHall" : [
			{ "wood" : 158, "marble" : 0 },
			{ "wood" : 335, "marble" : 0 },
			{ "wood" : 623, "marble" : 0 },
			{ "wood" : 923, "marble" : 285 },
			{ "wood" : 1390, "marble" : 551 },
			{ "wood" : 2015, "marble" : 936 },
			{ "wood" : 2706, "marble" : 1411 },
			{ "wood" : 3661, "marble" : 2091 },
			{ "wood" : 4776, "marble" : 2945 },
			{ "wood" : 6173, "marble" : 4072 },
			{ "wood" : 8074, "marble" : 5664 },
			{ "wood" : 10281, "marble" : 7637 },
			{ "wood" : 13023, "marble" : 10214 },
			{ "wood" : 16424, "marble" : 13575 },
			{ "wood" : 20986, "marble" : 18254 },
			{ "wood" : 25423, "marble" : 23250 },
			{ "wood" : 32285, "marble" : 31022 },
			{ "wood" : 40232, "marble" : 40599 },
			{ "wood" : 49286, "marble" : 52216 },
			{ "wood" : 61207, "marble" : 68069 },
			{ "wood" : 74804, "marble" : 87316 },
			{ "wood" : 93956, "marble" : 115101 },
			{ "wood" : 113035, "marble" : 145326 },
			{ "wood" : 141594, "marble" : 191053 },
			{ "wood" : 170213, "marble" : 241039 },
			{ "wood" : 210011, "marble" : 312128 },
			{ "wood" : 258875, "marble" : 403824 },
			{ "wood" : 314902, "marble" : 515592 }	// level 29
		],

		// architect, wood, marble
		"architect" : [
			{ "wood" : 291, "marble" : 160 },
			{ "wood" : 413, "marble" : 222 },
			{ "wood" : 555, "marble" : 295 },
			{ "wood" : 720, "marble" : 379 },
			{ "wood" : 911, "marble" : 475 },
			{ "wood" : 1133, "marble" : 587 },
			{ "wood" : 1390, "marble" : 716 },
			{ "wood" : 1689, "marble" : 865 },
			{ "wood" : 2035, "marble" : 1036 },
			{ "wood" : 2437, "marble" : 1233 },
			{ "wood" : 2902, "marble" : 1460 },
			{ "wood" : 3443, "marble" : 1722 },
			{ "wood" : 4070, "marble" : 2023 },
			{ "wood" : 4797, "marble" : 2369 },
			{ "wood" : 5640, "marble" : 2767 },
			{ "wood" : 6618, "marble" : 3226 },
			{ "wood" : 7754, "marble" : 3752 },
			{ "wood" : 9070, "marble" : 4358 },
			{ "wood" : 10598, "marble" : 5056 },
			{ "wood" : 12369, "marble" : 5857 },
			{ "wood" : 14424, "marble" : 6777 },
			{ "wood" : 16807, "marble" : 7836 },
			{ "wood" : 19573, "marble" : 9052 },
			{ "wood" : 22780, "marble" : 10448 },
			{ "wood" : 26501, "marble" : 12054 },
			{ "wood" : 30817, "marble" : 13899 },
			{ "wood" : 35825, "marble" : 16017 },
			{ "wood" : 41631, "marble" : 18450 },
			{ "wood" : 48371, "marble" : 21245 },
			{ "wood" : 56185, "marble" : 24454 },
			{ "wood" : 65251, "marble" : 28141 }	// level 32
		],

		// safehouse, wood, marble
		"safehouse" : [
			{ "wood" : 248, "marble" : 0 },
			{ "wood" : 402, "marble" : 0 },
			{ "wood" : 578, "marble" : 129 },
			{ "wood" : 779, "marble" : 197 },
			{ "wood" : 1007, "marble" : 275 },
			{ "wood" : 1267, "marble" : 366 },
			{ "wood" : 1564, "marble" : 471 },
			{ "wood" : 1903, "marble" : 593 },
			{ "wood" : 2288, "marble" : 735 },
			{ "wood" : 2728, "marble" : 900 },
			{ "wood" : 3230, "marble" : 1090 },
			{ "wood" : 3801, "marble" : 1312 },
			{ "wood" : 4453, "marble" : 1569 },
			{ "wood" : 5195, "marble" : 1866 },
			{ "wood" : 6042, "marble" : 2212 },
			{ "wood" : 7007, "marble" : 2613 },
			{ "wood" : 8107, "marble" : 3078 },
			{ "wood" : 9547, "marble" : 3617 },
			{ "wood" : 10793, "marble" : 4242 },
			{ "wood" : 12422, "marble" : 4967 },
			{ "wood" : 14282, "marble" : 5810 },
			{ "wood" : 16400, "marble" : 6785 },
			{ "wood" : 18815, "marble" : 7919 },
			{ "wood" : 21570, "marble" : 9233 },
			{ "wood" : 24708, "marble" : 10757 },
			{ "wood" : 29488, "marble" : 12526 },
			{ "wood" : 33741, "marble" : 14577 },
			{ "wood" : 38589, "marble" : 16956 },
			{ "wood" : 44115, "marble" : 19715 },
			{ "wood" : 46585, "marble" : 21399 },
			{ "wood" : 53221, "marble" : 24867 }	// level 32
		],

		//wall, wood, marble
		"wall" : [
			{ "wood" : 361, "marble" : 203 },
			{ "wood" : 657, "marble" : 516 },
			{ "wood" : 1012, "marble" : 892 },
			{ "wood" : 1439, "marble" : 1344 },
			{ "wood" : 1951, "marble" : 1885 },
			{ "wood" : 2565, "marble" : 2535 },
			{ "wood" : 3302, "marble" : 3315 },
			{ "wood" : 4186, "marble" : 4251 },
			{ "wood" : 5247, "marble" : 5374 },
			{ "wood" : 6521, "marble" : 6721 },
			{ "wood" : 8049, "marble" : 8338 },
			{ "wood" : 9882, "marble" : 10279 },
			{ "wood" : 12083, "marble" : 12608 },
			{ "wood" : 14724, "marble" : 15402 },
			{ "wood" : 17892, "marble" : 18755 },
			{ "wood" : 21695, "marble" : 22779 },
			{ "wood" : 26258, "marble" : 27607 },
			{ "wood" : 31733, "marble" : 33402 },
			{ "wood" : 38304, "marble" : 40355 },
			{ "wood" : 46189, "marble" : 48699 },
			{ "wood" : 55650, "marble" : 58711 },
			{ "wood" : 67004, "marble" : 70726 },
			{ "wood" : 80629, "marble" : 85144 },
			{ "wood" : 96979, "marble" : 102446 },
			{ "wood" : 116599, "marble" : 123208 },
			{ "wood" : 140143, "marble" : 148122 },
			{ "wood" : 168395, "marble" : 178019 },
			{ "wood" : 202298, "marble" : 213896 },
			{ "wood" : 242982, "marble" : 256948 },
			{ "wood" : 291802, "marble" : 308610 },
			{ "wood" : 350387, "marble" : 370605 }	// level 32
		],

		// shipyard, wood, marble
		"shipyard" : [
			{ "wood" : 202, "marble" : 0 },
			{ "wood" : 324, "marble" : 0 },
			{ "wood" : 477, "marble" : 0 },
			{ "wood" : 671, "marble" : 0 },
			{ "wood" : 914, "marble" : 778 },
			{ "wood" : 1222, "marble" : 1052 },
			{ "wood" : 1609, "marble" : 1397 },
			{ "wood" : 2096, "marble" : 1832 },
			{ "wood" : 2711, "marble" : 2381 },
			{ "wood" : 3485, "marble" : 3071 },
			{ "wood" : 4460, "marble" : 3942 },
			{ "wood" : 5689, "marble" : 5038 },
			{ "wood" : 7238, "marble" : 6420 },
			{ "wood" : 9190, "marble" : 8161 },
			{ "wood" : 11648, "marble" : 10354 },
			{ "wood" : 14745, "marble" : 13117 },
			{ "wood" : 18650, "marble" : 16600 },
			{ "wood" : 23568, "marble" : 20989 },
			{ "wood" : 29765, "marble" : 26517 },
			{ "wood" : 37572, "marble" : 33484 },
			{ "wood" : 47412, "marble" : 42261 },
			{ "wood" : 59807, "marble" : 53321 },
			{ "wood" : 75428, "marble" : 67256 },
			{ "wood" : 95107, "marble" : 84814 }	// level 25
		],

		// port, wood, marble
		"port" : [
			{ "wood" : 150, "marble" : 0 },
			{ "wood" : 274, "marble" : 0 },
			{ "wood" : 429, "marble" : 0 },
			{ "wood" : 637, "marble" : 0 },
			{ "wood" : 894, "marble" : 176 },
			{ "wood" : 1207, "marble" : 326 },
			{ "wood" : 1645, "marble" : 540 },
			{ "wood" : 2106, "marble" : 791 },
			{ "wood" : 2735, "marble" : 1138 },
			{ "wood" : 3537, "marble" : 1598 },
			{ "wood" : 4492, "marble" : 2176 },
			{ "wood" : 5689, "marble" : 2928 },
			{ "wood" : 7103, "marble" : 3859 },
			{ "wood" : 8850, "marble" : 5051 },
			{ "wood" : 11094, "marble" : 6628 },
			{ "wood" : 13731, "marble" : 8566 },
			{ "wood" : 17062, "marble" : 11089 },
			{ "wood" : 21097, "marble" : 14265 },
			{ "wood" : 25965, "marble" : 18241 },
			{ "wood" : 31810, "marble" : 23197 },
			{ "wood" : 39190, "marble" : 29642 },
			{ "wood" : 47998, "marble" : 37636 },
			{ "wood" : 58713, "marble" : 47703 },
			{ "wood" : 71955, "marble" : 60556 },
			{ "wood" : 87627, "marble" : 76366 },
			{ "wood" : 94250, "marble" : 85042 }	// level 27
		],

		// glassblowing, wood, marble
		"glassblowing" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 }	// level 21
		],

		// warehouse, wood, marble
		"warehouse" : [
			{ "wood" : 288, "marble" : 0 },
			{ "wood" : 442, "marble" : 0 },
			{ "wood" : 626, "marble" : 96 },
			{ "wood" : 847, "marble" : 211 },
			{ "wood" : 1113, "marble" : 349 },
			{ "wood" : 1431, "marble" : 515 },
			{ "wood" : 1813, "marble" : 714 },
			{ "wood" : 2272, "marble" : 953 },
			{ "wood" : 2822, "marble" : 1240 },
			{ "wood" : 3483, "marble" : 1584 },
			{ "wood" : 4275, "marble" : 1997 },
			{ "wood" : 5226, "marble" : 2492 },
			{ "wood" : 6368, "marble" : 3086 },
			{ "wood" : 7737, "marble" : 3800 },
			{ "wood" : 9380, "marble" : 4656 },
			{ "wood" : 11353, "marble" : 5683 },
			{ "wood" : 13719, "marble" : 6915 },
			{ "wood" : 16559, "marble" : 8394 },
			{ "wood" : 19967, "marble" : 10169 },
			{ "wood" : 24056, "marble" : 12299 },
			{ "wood" : 28963, "marble" : 14855 },
			{ "wood" : 34852, "marble" : 17922 },
			{ "wood" : 41918, "marble" : 21602 },
			{ "wood" : 50398, "marble" : 26019 },
			{ "wood" : 60574, "marble" : 31319 },
			{ "wood" : 72784, "marble" : 37678 },
			{ "wood" : 87437, "marble" : 45310 },
			{ "wood" : 105021, "marble" : 54468 },
			{ "wood" : 126121, "marble" : 65458 },
			{ "wood" : 151441, "marble" : 78645 },
			{ "wood" : 181825, "marble" : 94471 },
			{ "wood" : 218286, "marble" : 113461 },
			{ "wood" : 262039, "marble" : 136249 },
			{ "wood" : 314543, "marble" : 163595 },
			{ "wood" : 377548, "marble" : 196409 },
			{ "wood" : 453153, "marble" : 235787 },
			{ "wood" : 543880, "marble" : 283041 },
			{ "wood" : 652752, "marble" : 339745 },
			{ "wood" : 783398, "marble" : 407790 }	// level 40
		],

		// museum, wood, marble
		"museum" : [
			{ "wood" : 1435, "marble" : 1190 },
			{ "wood" : 2748, "marble" : 2573 },
			{ "wood" : 4716, "marble" : 4676 },
			{ "wood" : 7669, "marble" : 7871 },
			{ "wood" : 12099, "marble" : 12729 },
			{ "wood" : 18744, "marble" : 20112 },
			{ "wood" : 28710, "marble" : 31335 },
			{ "wood" : 43661, "marble" : 48394 },
			{ "wood" : 66086, "marble" : 74323 },
			{ "wood" : 99724, "marble" : 113736 },
			{ "wood" : 150181, "marble" : 173643 },
			{ "wood" : 225866, "marble" : 264701 },
			{ "wood" : 339394, "marble" : 403110 },
			{ "wood" : 509686, "marble" : 613492 },
			{ "wood" : 765124, "marble" : 933272 }	// level 16
		],

		// workshop, wood, marble, missing 2 (level 30, 31)
		"workshop" : [
			{ "wood" : 383, "marble" : 167 },
			{ "wood" : 569, "marble" : 251 },
			{ "wood" : 781, "marble" : 349 },
			{ "wood" : 1023, "marble" : 461 },
			{ "wood" : 1299, "marble" : 592 },
			{ "wood" : 1613, "marble" : 744 },
			{ "wood" : 1972, "marble" : 920 },
			{ "wood" : 2380, "marble" : 1125 },
			{ "wood" : 2846, "marble" : 1362 },
			{ "wood" : 3377, "marble" : 1637 },
			{ "wood" : 3982, "marble" : 1956 },
			{ "wood" : 4672, "marble" : 2326 },
			{ "wood" : 5458, "marble" : 2755 },
			{ "wood" : 6355, "marble" : 3253 },
			{ "wood" : 7377, "marble" : 3831 },
			{ "wood" : 8542, "marble" : 4500 },
			{ "wood" : 9870, "marble" : 5279 },
			{ "wood" : 11385, "marble" : 6180 },
			{ "wood" : 13111, "marble" : 7226 },
			{ "wood" : 15078, "marble" : 8439 },
			{ "wood" : 17714, "marble" : 9776 },
			{ "wood" : 19481, "marble" : 11477 },
			{ "wood" : 22796, "marble" : 13373 },
			{ "wood" : 26119, "marble" : 15570 },
			{ "wood" : 29909, "marble" : 18118 },
			{ "wood" : 34228, "marble" : 21074 },
			{ "wood" : 39153, "marble" : 24503 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 58462, "marble" : 38447 }	// level 31
		],

		// forester, wood, marble
		"forester" : [
			{ "wood" : 430, "marble" : 104 },
			{ "wood" : 664, "marble" : 237 },
			{ "wood" : 968, "marble" : 410 },
			{ "wood" : 1364, "marble" : 635 },
			{ "wood" : 1878, "marble" : 928 },
			{ "wood" : 2546, "marble" : 1309 },
			{ "wood" : 3415, "marble" : 1803 },
			{ "wood" : 4544, "marble" : 2446 },
			{ "wood" : 6013, "marble" : 3282 },
			{ "wood" : 7922, "marble" : 4368 },
			{ "wood" : 10403, "marble" : 5781 },
			{ "wood" : 13629, "marble" : 7617 },
			{ "wood" : 17823, "marble" : 10422 },
			{ "wood" : 23274, "marble" : 13108 },
			{ "wood" : 30362, "marble" : 17142 },
			{ "wood" : 39574, "marble" : 22386 },
			{ "wood" : 51552, "marble" : 29204 },
			{ "wood" : 67123, "marble" : 38068 },
			{ "wood" : 87363, "marble" : 49589 },
			{ "wood" : 113680, "marble" : 64569 },
			{ "wood" : 160157, "marble" : 91013 }	// level 22
		],

		// optician, wood, marble
		"optician" : [
			{ "wood" : 188, "marble" : 35 },
			{ "wood" : 269, "marble" : 96 },
			{ "wood" : 362, "marble" : 167 },
			{ "wood" : 471, "marble" : 249 },
			{ "wood" : 597, "marble" : 345 },
			{ "wood" : 742, "marble" : 455 },
			{ "wood" : 912, "marble" : 584 },
			{ "wood" : 1108, "marble" : 733 },
			{ "wood" : 1335, "marble" : 905 },
			{ "wood" : 1600, "marble" : 1106 },
			{ "wood" : 1906, "marble" : 1338 },
			{ "wood" : 2261, "marble" : 1608 },
			{ "wood" : 2673, "marble" : 1921 },
			{ "wood" : 3152, "marble" : 2283 },
			{ "wood" : 3706, "marble" : 2704 },
			{ "wood" : 4348, "marble" : 3191 },
			{ "wood" : 5096, "marble" : 3759 },
			{ "wood" : 5962, "marble" : 4416 },
			{ "wood" : 6966, "marble" : 5178 },
			{ "wood" : 8131, "marble" : 6062 },
			{ "wood" : 9482, "marble" : 7087 },
			{ "wood" : 11050, "marble" : 8276 },
			{ "wood" : 12868, "marble" : 9656 },
			{ "wood" : 14978, "marble" : 11257 },
			{ "wood" : 17424, "marble" : 13113 },
			{ "wood" : 20262, "marble" : 15267 },
			{ "wood" : 23553, "marble" : 17762 },
			{ "wood" : 27373, "marble" : 20662 },
			{ "wood" : 31804, "marble" : 24024 },
			{ "wood" : 36943, "marble" : 27922 },
			{ "wood" : 42904, "marble" : 32447 }	// level 32
		],

		// barracks, wood, marble, missing 1 (level 29)
		"barracks" : [
			{ "wood" : 114, "marble" : 0 },
			{ "wood" : 195, "marble" : 0 },
			{ "wood" : 296, "marble" : 0 },
			{ "wood" : 420, "marble" : 0 },
			{ "wood" : 574, "marble" : 0 },
			{ "wood" : 766, "marble" : 0 },
			{ "wood" : 1003, "marble" : 0 },
			{ "wood" : 1297, "marble" : 178 },
			{ "wood" : 1662, "marble" : 431 },
			{ "wood" : 2115, "marble" : 745 },
			{ "wood" : 2676, "marble" : 1134 },
			{ "wood" : 3371, "marble" : 1616 },
			{ "wood" : 4234, "marble" : 2214 },
			{ "wood" : 5304, "marble" : 2956 },
			{ "wood" : 6630, "marble" : 3875 },
			{ "wood" : 8275, "marble" : 5015 },
			{ "wood" : 10314, "marble" : 6429 },
			{ "wood" : 12843, "marble" : 8183 },
			{ "wood" : 15979, "marble" : 10357 },
			{ "wood" : 19868, "marble" : 13052 },
			{ "wood" : 24690, "marble" : 16395 },
			{ "wood" : 30669, "marble" : 20540 },
			{ "wood" : 38083, "marble" : 25680 },
			{ "wood" : 47277, "marble" : 32054 },
			{ "wood" : 58772, "marble" : 39957 },
			{ "wood" : 72932, "marble" : 49839 },
			{ "wood" : 90490, "marble" : 61909 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 158796, "marble" : 109259 },
			{ "wood" : 186750, "marble" : 128687 }	// level 31
		],

		// carpentering, wood, marble
		"carpentering" : [
			{ "wood" : 122, "marble" : 0 },
			{ "wood" : 192, "marble" : 0 },
			{ "wood" : 274, "marble" : 0 },
			{ "wood" : 372, "marble" : 0 },
			{ "wood" : 486, "marble" : 0 },
			{ "wood" : 620, "marble" : 0 },
			{ "wood" : 777, "marble" : 359 },
			{ "wood" : 962, "marble" : 444 },
			{ "wood" : 1178, "marble" : 546 },
			{ "wood" : 1432, "marble" : 669 },
			{ "wood" : 1730, "marble" : 816 },
			{ "wood" : 2078, "marble" : 993 },
			{ "wood" : 2486, "marble" : 1205 },
			{ "wood" : 2964, "marble" : 1459 },
			{ "wood" : 3524, "marble" : 1765 },
			{ "wood" : 4178, "marble" : 2131 },
			{ "wood" : 4944, "marble" : 2571 },
			{ "wood" : 5841, "marble" : 3097 },
			{ "wood" : 6890, "marble" : 3731 },
			{ "wood" : 8117, "marble" : 4490 },
			{ "wood" : 9550, "marble" : 5402 },
			{ "wood" : 11229, "marble" : 6496 },
			{ "wood" : 13190, "marble" : 7809 },
			{ "wood" : 15484, "marble" : 9383 },
			{ "wood" : 18167, "marble" : 11273 },
			{ "wood" : 21299, "marble" : 13543 },
			{ "wood" : 24946, "marble" : 16263 },
			{ "wood" : 29245, "marble" : 19531 },
			{ "wood" : 34247, "marble" : 23450 },
			{ "wood" : 40096, "marble" : 28154 },
			{ "wood" : 46930, "marble" : 33798 }	// level 32
		],

		// embassy, wood, marble
		"embassy" : [
			{ "wood" : 415, "marble" : 342 },
			{ "wood" : 623, "marble" : 571 },
			{ "wood" : 873, "marble" : 850 },
			{ "wood" : 1173, "marble" : 1190 },
			{ "wood" : 1532, "marble" : 1606 },
			{ "wood" : 1964, "marble" : 2112 },
			{ "wood" : 2482, "marble" : 2730 },
			{ "wood" : 3103, "marble" : 3484 },
			{ "wood" : 3849, "marble" : 4404 },
			{ "wood" : 4743, "marble" : 5527 },
			{ "wood" : 5817, "marble" : 6896 },
			{ "wood" : 7105, "marble" : 8566 },
			{ "wood" : 8651, "marble" : 10604 },
			{ "wood" : 10507, "marble" : 13090 },
			{ "wood" : 12733, "marble" : 16123 },
			{ "wood" : 15404, "marble" : 19824 },
			{ "wood" : 18498, "marble" : 24339 },
			{ "wood" : 22457, "marble" : 29846 },
			{ "wood" : 27074, "marble" : 36564 },
			{ "wood" : 32290, "marble" : 45216 },
			{ "wood" : 39261, "marble" : 54769 },
			{ "wood" : 47240, "marble" : 66733 },
			{ "wood" : 56812, "marble" : 81859 },
			{ "wood" : 70157, "marble" : 104537 },
			{ "wood" : 84318, "marble" : 129580 },
			{ "wood" : 101310, "marble" : 158759 },
			{ "wood" : 121979, "marble" : 193849 },
			{ "wood" : 146503, "marble" : 236659 },
			{ "wood" : 175932, "marble" : 288888 },
			{ "wood" : 222202, "marble" : 358869 },
			{ "wood" : 266778, "marble" : 437985 }	// level 32
		],

		// stonemason, wood, marble
		"stonemason" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 },
			{ "wood" : 158740, "marble" : 87833 },
			{ "wood" : 206471, "marble" : 114289 },
			{ "wood" : 268524, "marble" : 148680 }	// level 24
		],

		// fireworker, wood, marble
		"fireworker" : [
			{ "wood" : 353, "marble" : 212 },
			{ "wood" : 445, "marble" : 302 },
			{ "wood" : 551, "marble" : 405 },
			{ "wood" : 673, "marble" : 526 },
			{ "wood" : 813, "marble" : 665 },
			{ "wood" : 974, "marble" : 827 },
			{ "wood" : 1159, "marble" : 1015 },
			{ "wood" : 1373, "marble" : 1233 },
			{ "wood" : 1618, "marble" : 1486 },
			{ "wood" : 1899, "marble" : 1779 },
			{ "wood" : 2223, "marble" : 2120 },
			{ "wood" : 2596, "marble" : 2514 },
			{ "wood" : 3025, "marble" : 2972 },
			{ "wood" : 3517, "marble" : 3503 },
			{ "wood" : 4084, "marble" : 4119 },
			{ "wood" : 4737, "marble" : 4834 },
			{ "wood" : 5487, "marble" : 5663 },
			{ "wood" : 6347, "marble" : 6624 },
			{ "wood" : 7339, "marble" : 7739 },
			{ "wood" : 8480, "marble" : 9033 },
			{ "wood" : 9791, "marble" : 10534 },
			{ "wood" : 11298, "marble" : 12275 },
			{ "wood" : 13031, "marble" : 14295 },
			{ "wood" : 15025, "marble" : 16637 },
			{ "wood" : 17318, "marble" : 19355 },
			{ "wood" : 19955, "marble" : 22508 },
			{ "wood" : 22987, "marble" : 26164 }	// level 28
		],

		// winegrower, wood, marble
		"winegrower" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42484, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72052, "marble" : 39791 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 }	// level 21
		],

		// vineyard, wood, marble
		"vineyard" : [
			{ "wood" : 423, "marble" : 198 },
			{ "wood" : 520, "marble" : 285 },
			{ "wood" : 631, "marble" : 387 },
			{ "wood" : 758, "marble" : 504 },
			{ "wood" : 905, "marble" : 640 },
			{ "wood" : 1074, "marble" : 798 },
			{ "wood" : 1269, "marble" : 981 },
			{ "wood" : 1492, "marble" : 1194 },
			{ "wood" : 1749, "marble" : 1440 },
			{ "wood" : 2045, "marble" : 1726 },
			{ "wood" : 2384, "marble" : 2058 },
			{ "wood" : 2775, "marble" : 2443 },
			{ "wood" : 3225, "marble" : 2889 },
			{ "wood" : 3741, "marble" : 3407 },
			{ "wood" : 4336, "marble" : 4008 },
			{ "wood" : 5019, "marble" : 4705 },
			{ "wood" : 5813, "marble" : 5513 },
			{ "wood" : 6875, "marble" : 6450 },
			{ "wood" : 7941, "marble" : 7537 },
			{ "wood" : 8944, "marble" : 8800 },
			{ "wood" : 10319, "marble" : 10263 },
			{ "wood" : 11900, "marble" : 11961 },
			{ "wood" : 13718, "marble" : 13930 },
			{ "wood" : 15809, "marble" : 16214 },
			{ "wood" : 18215, "marble" : 18864 },
			{ "wood" : 20978, "marble" : 21938 },
			{ "wood" : 24159, "marble" : 25503 },
			{ "wood" : 27816, "marble" : 29639 },
			{ "wood" : 32021, "marble" : 34437 },
			{ "wood" : 36857, "marble" : 40002 },
			{ "wood" : 42419, "marble" : 46457 }	// level 32
		],

		// tavern, wood, marble
		"tavern" : [
			{ "wood" : 222, "marble" : 0 },
			{ "wood" : 367, "marble" : 0 },
			{ "wood" : 541, "marble" : 94 },
			{ "wood" : 750, "marble" : 122 },
			{ "wood" : 1001, "marble" : 158 },
			{ "wood" : 1302, "marble" : 206 },
			{ "wood" : 1663, "marble" : 267 },
			{ "wood" : 2097, "marble" : 348 },
			{ "wood" : 2617, "marble" : 452 },
			{ "wood" : 3241, "marble" : 587 },
			{ "wood" : 3990, "marble" : 764 },
			{ "wood" : 4888, "marble" : 993 },
			{ "wood" : 5967, "marble" : 1290 },
			{ "wood" : 7261, "marble" : 1677 },
			{ "wood" : 8814, "marble" : 2181 },
			{ "wood" : 10678, "marble" : 2835 },
			{ "wood" : 12914, "marble" : 3685 },
			{ "wood" : 15598, "marble" : 4791 },
			{ "wood" : 18818, "marble" : 6228 },
			{ "wood" : 22683, "marble" : 8097 },
			{ "wood" : 27320, "marble" : 10526 },
			{ "wood" : 32885, "marble" : 13684 },
			{ "wood" : 39562, "marble" : 17789 },
			{ "wood" : 47576, "marble" : 23125 },
			{ "wood" : 57192, "marble" : 30063 },
			{ "wood" : 68731, "marble" : 39082 },
			{ "wood" : 82578, "marble" : 50806 },
			{ "wood" : 99194, "marble" : 66048 },
			{ "wood" : 119134, "marble" : 85862 },
			{ "wood" : 143061, "marble" : 111621 },
			{ "wood" : 171774, "marble" : 145107 },
			{ "wood" : 206230, "marble" : 188640 },
			{ "wood" : 247577, "marble" : 245231 }	// level 34
		],

		// alchemist, wood, marble
		"alchemist" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 }	// level 21
		],
		
		// branchOffice, 
		"branchOffice" : [
			{ "wood" : 173, "marble" : 0 },
			{ "wood" : 346, "marble" : 0 },
			{ "wood" : 581, "marble" : 0 },
			{ "wood" : 896, "marble" : 540 },
			{ "wood" : 1314, "marble" : 792 },
			{ "wood" : 1863, "marble" : 1123 },
			{ "wood" : 2580, "marble" : 1555 },
			{ "wood" : 3509, "marble" : 2115 },
			{ "wood" : 4706, "marble" : 2837 },
			{ "wood" : 6241, "marble" : 3762 },
			{ "wood" : 8203, "marble" : 4945 },
			{ "wood" : 10699, "marble" : 6450 },
			{ "wood" : 13866, "marble" : 8359 },
			{ "wood" : 17872, "marble" : 10774 },
			{ "wood" : 22926, "marble" : 13820 },
			{ "wood" : 29286, "marble" : 17654 },
			{ "wood" : 37272, "marble" : 22469 },
			{ "wood" : 47282, "marble" : 28502 },
			{ "wood" : 59806, "marble" : 36051 },
			{ "wood" : 75448, "marble" : 45481 }	// level 21
		]
	};
}



// ==UserScript==
// @name           		antropomorfico
// @version		1
// @author			oliezekat
// @namespace      	antropomorfico
// @description    	Increase your worldmap view (not your p3n!s)
// @include     http://*.ikariam.*/*


// ==/UserScript==

if (!DoubleMap) var DoubleMap = {};

DoubleMap =
	{
	View: ''
	};
	
DoubleMap.Init = function()
	{
	// Fetch view name
	try
		{
		DoubleMap.View = document.getElementsByTagName("body")[0].id;
		}
	catch (e)
		{
		var url_view = /[\?&]view=([a-zA-Z0-9\-_]+)/.exec(document.URL);
		if (url_view != null) DoubleMap.View = RegExp.$1;
		}
	
	if (DoubleMap.View =='worldmap_iso')
		{
		DoubleMap.Set_Styles();
		}
	};
	
DoubleMap.Set_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	#worldmap_iso #scrollcover { height: 840px !important;}
	#worldmap_iso #dragHandlerOverlay { height: 900px !important;}
	]]></>.toXMLString();
	GM_addStyle(default_style);
	};

DoubleMap.Init();

// ==UserScript==

// @include			http://s*.ikariam.*/index.php*

// ==/UserScript==

// Version Log:
//		v1.2.1 (8. June 2009)
//			- Fixed a bug which caused no resource reduction when a reduction building is being upgrade.
//			- Improved positioning of the icons. Icon and info box at construction spot are now correctly positioned.
//
//		v1.2.0 (2. June 2009)
//			- New: Added icon and info box to construction spot (thanks to giangkid for the suggestion).
//
//		v1.1.1 (26. May 2009)
//			- Fixed a bug when NOT using Black Canvas add-on to Firefox, the level indication is not centralized correctly.
//
//		v1.1.0 (25. May 2009)
//			- New: Added a info box which shows up when mouse over the icon, the box can be turned off in the options page.
//			- Fixed a bug where in a rare case, an icon is not shown on the wall.
//			- Fixed a bug which caused no sulfur reduction bonus.
//
//		v1.0.3 (17. May 2009)
//			- Fixed first time running check which caused unnecessarily research checks.
//
//		v1.0.2 (17. May 2009)
//			- Fix to support different languages (thanks to oliezekat).
//			- Improved bureaucracy-spot check.
//
//		v1.0.1 (17. May 2009)
//			- Fixed bureaucracy-spot, not showing if you are not done with that research.
//			- Removed alert boxes which shows up at the start.
//
// 		v1.0.0 (16. May 2009)
//			- Release.

// URL to icons
var imgURL = "http://www.atdao.dk/public/images/";

// Server host and hostname
var host = top.location.host;
var hostname = top.location.hostname.split(".");

// Materials reduction from researches
var pulley = GM_getValue(host + "_iuw_pulley", false);
var geometry = GM_getValue(host + "_iuw_geometry", false);
var spirit = GM_getValue(host + "_iuw_spirit", false);

// Var for showing info box or not, default true
var showInfoBox = GM_getValue(host + "_iuw_infobox", true);

// If spot/pos 13 is available
var bureaucracy = GM_getValue(host + "_iuw_bureaucracy", false);

// First timer var
var firstTimer = GM_getValue(host + "_iuw_first_timer", true);

// Gets the view
var view = getView();

// Helper var to check if we should skip the checking the research
var skipResearch = GM_getValue(host + "_iuw_skip_research", false);

// Extracting action
var uri = top.location.search, action = getAction(uri);

// Just after login
if (action == "loginAvatar" && skipResearch == false) {

	// Do syncronized request
	// Check researches, pulley, geometry, spirit, bureaucracy
	getResearch(host, getCityId(), false);
	GM_setValue(host + "_iuw_first_timer", false);
	
	// Not first time anymore
	firstTimer = false;
	
}

// When user clicks on academy or research advisor
if ((view == "academy" || view == "researchAdvisor") && skipResearch == false) {
	
	// Do asyncronized request
	// Check researches, pulley, geometry, spirit, bureaucracy
	getResearch(host, getCityId(), true);
	GM_setValue(host + "_iuw_first_timer", false);
	
	// Not first time anymore
	firstTimer = false;
	
}

// Options view
if (view == "options") {

	// Getting the URI
	var uri = top.location.search.split("&");
	
	// If the setting is set, we assign the new settings
	if (isDefined(uri[1])) {
		
		var pos = uri[1].indexOf("=");
		var setting = uri[1].substr(pos+1);
		
		if (setting == "false") {
		
			showInfoBox = false;
			GM_setValue(host + "_iuw_infobox", false);
			
		} else if (setting == "true") {
		
			showInfoBox = true;
			GM_setValue(host + "_iuw_infobox", true);
			
		}
		
	}

	// Creating the setting panel for this mod
	var settingPanel = document.createElement("div"), child;
	var checkedYes ="", checkedNo = "";
	
	settingPanel.className = "contentBox01h";
	
	if (showInfoBox) {
		checkedYes = 'checked';
	} else {
		checkedNo = 'checked';
	}

    child = '<h3 class="header"><span class="textLabel">Ikariam Upgrade Watcher</span></h3><div class="content"><form action="index.php" method="GET"><input type=hidden name=view value="options"><table cellpadding="0" cellspacing="0"><tr><th>Show info box</th><td><input type="radio" name="iuwInfoBox" value="true" '+checkedYes+'> Yes<br><input type="radio" name="iuwInfoBox" value="false" '+checkedNo+'> No</td></tr></table><div class="centerButton"><input class="button" type="submit" value="Save Setting" /></div></form></div><div class="footer"></div></div>';
	
	settingPanel.innerHTML = child;
	
	// Inserting the setting panel before the vacation mode setting
	document.getElementById("mainview").insertBefore(settingPanel, document.getElementById("vacationMode"));

}

// When city is shown
if (view == "city") {

	// If it is the mod is running for the first time,
	// we check the research
	if (firstTimer) {
		
		// Do syncronized request
		// Check researches, pulley, geometry, spirit, bureaucracy
		getResearch(host, getCityId(), false);
		GM_setValue(host + "_iuw_first_timer", false);
		
	}

	// Getting the list of buildings
	var buildingList = document.getElementById('locations');
	
	// If we find a list of buildings, then we start adding icon to each building
	if (buildingList) {
				
		// Ressource variables
		var wood, wine, marble, crystal, sulfur;
	
		// Get the resources we have in town
		if (document.getElementById('value_wood')) { wood = document.getElementById('value_wood').textContent.replace(",",""); }
		if (document.getElementById('value_wine')) { wine = document.getElementById('value_wine').textContent.replace(",",""); }
		if (document.getElementById('value_marble')) { marble = document.getElementById('value_marble').textContent.replace(",",""); }
		if (document.getElementById('value_crystal')) { crystal = document.getElementById('value_crystal').textContent.replace(",",""); }
		if (document.getElementById('value_sulfur')) { sulfur = document.getElementById('value_sulfur').textContent.replace(",",""); }
	
		// Get each building/spot from the building list
		var spot = buildingList.getElementsByTagName('li');
		
		// Info about each building/spot
		var building, level, upLevel, posTop, posRight, img, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur;
		
		// If the town is constructing or upgrading a building
		var construction = false;
		
		// Reduced materials
		var redAll = 0, redWood = 0, redWine = 0, redMarble = 0, redCrystal = 0, redSulfur = 0;
		
		// Assigning reductions in %
		if (pulley) { redAll = 2; }
		if (geometry) { redAll = redAll + 4; }
		if (spirit) { redAll = redAll + 8; }
		redAll = (100 - redAll) / 100;
		
		// We check if the user has built some material reduction buildings
		for (var i = 0; i < spot.length; i++) {
			
			building = spot[i].getElementsByTagName('div');
			
			if (isDefined(building, 0) && building[0].className != 'flag') {
			
				if (building[0].className == 'constructionSite') {
					
					construction = true;
					
				}
				
				switch (spot[i].className) {
					case 'architect':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redMarble = parseInt(level);
						break;
					case 'optician':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redCrystal = parseInt(level);
						break;
					case 'carpentering':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redWood = parseInt(level);
						break;
					case 'vineyard':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redWine = parseInt(level);
						break;
					case 'fireworker':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redSulfur = parseInt(level);
						break;
				}
				
			}
			
		}
		
		// Setting the material reduction in percent
		redWood = (100 - redWood) / 100;
		redWine = (100 - redWine) / 100;
		redMarble = (100 - redMarble) / 100;
		redCrystal = (100 - redCrystal) / 100;
		redSulfur = (100 - redSulfur) / 100;
		
		// Variable for database
		var POSITIONS, BUILDINGS;
		
		// Loadinng DB
		loadDB();
	
		// Creating the icon for each building
		for (var i = 0; i < spot.length; i++) {
	
			building = spot[i].getElementsByTagName('div');
			
			// Check for bureaucracy spot
			if (i == 13) {
								
				if (!bureaucracy) {
					
					// If the research have not been done
					// we skip skip the position 13
					continue;
					
				}
			
			}
			
			if (isDefined(building, 0) && building[0].className != 'flag') {		
				
				// Gets the level of a building
				level = spot[i].getElementsByTagName('a');
				level = getBuildingLevel(level[0].title);
				
				// Defines some style
				building[0].style.fontWeight = 'bold';
				building[0].style.color = 'white';
				
				// Default image to use is no.png
				// no.png = red
				// yes.png = green
				// wait.png = blue
				// unknown.png = grey
				img = 'no';
				
				var buildingType = spot[i].className;
				var iconId = "iuwIcon" + i;
				var posTop, posRight, posInfoTop, posInfoLeft;
				
				// The upgrade level
				// Note: because the database starts with lvl 2 of all buildings,
				// and the index starts with 0, we have to get one level below
				if (building[0].className == 'constructionSite') {
					// If we find a contruction spot, we would like to see the level after the construction
					upLevel = parseInt(level);
					
					// Positioning for construction spot
					posTop = POSITIONS['constructionSite'][0]["y"];
					posRight = POSITIONS['constructionSite'][0]["x"];
					posInfoTop = POSITIONS['constructionSite'][1]["y"];
					posInfoLeft = POSITIONS['constructionSite'][1]["x"];
					
				} else if (isDefined(POSITIONS[buildingType]) && isDefined(BUILDINGS[buildingType])) {
				
					// Positioning for other buildings
					upLevel = parseInt(level) - 1;
					posTop = POSITIONS[buildingType][0]["y"];
					posRight = POSITIONS[buildingType][0]["x"];
					posInfoTop = POSITIONS[buildingType][1]["y"];
					posInfoLeft = POSITIONS[buildingType][1]["x"];
				}
				
				// 3 special cases, uses more than wood and marble			
				switch (buildingType) {
					case 'palace':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
							reqWine = Math.floor(BUILDINGS[buildingType][upLevel]["wine"] * redAll * redWine);
							reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * redAll * redSulfur);
							
							//DEBUG(buildingType, upLevel, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							
							if (wood >= reqWood && wine >= reqWine && marble >= reqMarble && crystal >= reqCrystal && sulfur >= reqSulfur) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventPalace(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
						
					case 'palaceColony':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
							reqWine = Math.floor(BUILDINGS[buildingType][upLevel]["wine"] * redAll * redWine);
							reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * redAll * redSulfur);
							
							//DEBUG(buildingType, upLevel, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							
							if (wood >= reqWood && wine >= reqWine && marble >= reqMarble && crystal >= reqCrystal && sulfur >= reqSulfur) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventPalace(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
						
					case 'academy':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							
							//DEBUG(buildingType, upLevel , reqWood, 0, 0, reqCrystal, 0);
							
							if (wood >= reqWood && crystal >= reqCrystal) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventDefault(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqCrystal, true);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
						
					default:
					
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
															
							//DEBUG(buildingType, (upLevel+2), reqWood, 0, reqMarble, 0, 0);
							
							if (wood >= reqWood && marble >= reqMarble) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventDefault(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqMarble);
							}
							
							if (buildingType == 'townHall') {
								//alert(height);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
						
					break;
				}
			}
	
		}
	}
}

//---------------------------- FUNCTIONS ----------------------------//

/**
 * Creates an icon to attach a building
 * @param object obj
 * @param string icon id
 * @param integer position top
 * @param integer position right
 * @param string images
 * @param integer level
 * @return void
 */
function createIcon(obj, id, top, right, img, level) {
	obj.innerHTML = '<div id="'+ id +'" style="position: absolute; z-index: 501; padding-top: 5px; height: 19px; width: 24px; text-align: center; top: ' + top + 'px; right: '+ right +'px; background-image: url(\'' + imgURL + img +'.png\');">'+ level +'</div>';
}

/**
 * Creates a info box and attach it to an event to an icon (Palace, Residens)
 * @param string id
 * @param object target
 * @param string building type
 * @param integer wood
 * @param integer wine
 * @param integer marble
 * @param integer crystal
 * @param integer sulfur
 * @return void
 */
function addOnMouseOverEventPalace(id, target, posTop, posLeft, resWood, resWine, resMarble, resCrystal, resSulfur) {
	var element = document.getElementById(id);
	var div = document.createElement("div");
	var curWood, curWine, curMarble, curCrystal, curSulfur, colorWood, colorWine, colorMarble, colorCrystal, colorSulfur;
	var estWood, estWine, estMarble, estCrystal, estSulfur;
	
	// Styles for the info box
	div.className = "timetofinish";
	div.style.backgroundImage = "url('" + imgURL + "scroll-m2.png')";
	div.style.height = "102px";
	div.style.zIndex = "502";
	div.style.position = 'absolute';

	// Positioning each box
	div.style.top = posTop + "px";
	div.style.left = posLeft + "px";	
	
	// add on mouse over event
	element.addEventListener('mouseover', function(event) {
	
		// To get up-to-date resource values, we retrieve the value on each event
		if (document.getElementById('value_wood')) { curWood = document.getElementById('value_wood').textContent.replace(",",""); }
		if (document.getElementById('value_wine')) { curWine = document.getElementById('value_wine').textContent.replace(",",""); }
		if (document.getElementById('value_marble')) { curMarble = document.getElementById('value_marble').textContent.replace(",",""); }
		if (document.getElementById('value_crystal')) { curCrystal = document.getElementById('value_crystal').textContent.replace(",",""); }
		if (document.getElementById('value_sulfur')) { curSulfur = document.getElementById('value_sulfur').textContent.replace(",",""); }
		
		// Estimating the resource status
		estWood = curWood - resWood;
		estWine = curWine - resWine;
		estMarble = curMarble - resMarble;
		estCrystal = curCrystal - resCrystal;
		estSulfur = curSulfur - resSulfur;
		
		// Adding color to the values
		// Red if negative
		// Green if 0 or positive
		if (estWood >= 0) {	colorWood = "green"; } else { colorWood = "red"; }
		if (estWine >= 0) {	colorWine = "green"; } else { colorWine = "red"; }
		if (estMarble >= 0) { colorMarble = "green"; } else { colorMarble = "red"; }
		if (estCrystal >= 0) { colorCrystal = "green"; } else { colorCrystal = "red"; }
		if (estSulfur >= 0) { colorSulfur = "green"; } else { colorSulfur = "red"; }
		
		// Nasty, ugly HTML for the info box
		div.innerHTML = '<div class="before" style="background-image: url(\'' + imgURL +'scroll-l2.png\'); height: 102px; float: left;"></div><div style="float: left;"><div style="color: ' + colorWood + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'wood.png" /> '+ estWood +'</div><div style="margin-top: -4px; color: ' + colorWine + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'wine.png" /> '+ estWine +'</div><div style="margin-top: -4px; color: ' + colorMarble + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'marble.png" /> '+ estMarble +'</div><div style="margin-top: -4px; color: ' + colorCrystal + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'glass.png" /> '+ estCrystal +'</div><div style="margin-top: -4px; color: ' + colorSulfur + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'sulfur.png" /> '+ estSulfur +'</div></div><div class="after" style="background-image: url(\'' + imgURL +'scroll-r2.png\'); height: 102px; float: left;"></div>';
		
		target.appendChild(div);
	
	}, false);
	
	// add on mouse out event
	element.addEventListener('mouseout', function(event) {
		target.removeChild(div);
	}, false);

}

/**
 * Creates a info box and attach it to an event to an icon (Academy, other 2 resource requied buildings)
 * @param string id
 * @param object target
 * @param string building type
 * @param integer wood
 * @param integer second resource
 * @param boolean if second resource is crystal
 * @return void
 */
function addOnMouseOverEventDefault(id, target, posTop, posLeft, resWood, res2, isCrystal) {
	var element = document.getElementById(id);
	var div = document.createElement("div");
	var curWood, curRes2, colorWood, colorRes2;
	var estWood, estRes2, resIcon2;
	
	// Styles for the info box
	div.className = "timetofinish";
	div.style.backgroundImage = "url('" + imgURL + "scroll-m.png')";
	div.style.height = "46px";
	div.style.zIndex = "502";
	div.style.position = 'absolute';

	// Positioning each box
	div.style.top = posTop + "px";
	div.style.left = posLeft + "px";
	
	// add on mouse over event
	element.addEventListener('mouseover', function(event) {
		
		// To get up-to-date resource values, we retrieve the value on each event
		if (document.getElementById('value_wood')) { curWood = document.getElementById('value_wood').textContent.replace(",",""); }		
		// Estimating the wood status
		estWood = curWood - resWood;
		
		// In order to re-use this function, there is a crystal check
		if (isCrystal) {
	
			if (document.getElementById('value_crystal')) { curRes2 = document.getElementById('value_crystal').textContent.replace(",",""); }
			
			resIcon2 = "glass";
		
		} else {
		
			if (document.getElementById('value_marble')) { curRes2 = document.getElementById('value_marble').textContent.replace(",",""); }
			resIcon2 = "marble";
		}
		
		estRes2 = curRes2 - res2;
		
		if (estWood >= 0) { colorWood = "green"; } else { colorWood = "red"; }
		if (estRes2 >= 0) {	colorRes2 = "green"; } else { colorRes2 = "red"; }
		
		div.innerHTML = '<div class="before" style="background-image: url(\'' + imgURL +'scroll-l.png\'); height: 46px; float: left;"></div><div style="float: left;"><div style="color: ' + colorWood + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'wood.png" /> '+ estWood +'</div><div style="margin-top: -4px; color: ' + colorRes2 + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + resIcon2 +'.png" /> '+ estRes2 +'</div></div><div class="after" style="background-image: url(\'' + imgURL +'scroll-r.png\'); height: 46px; float: left;"></div>';
		
		target.appendChild(div);
	
	}, false);
	
	// add on mouse out event
	element.addEventListener('mouseout', function(event) {
		target.removeChild(div);
	}, false);

}


/**
 * Outputs upgrade values for a building
 * @param string building
 * @param integer level
 * @param integer wood
 * @param integer wine
 * @param integer marble
 * @param integer crystal
 * @param integer sulfur
 * @return void
 */
function DEBUG(build, lvl, wd, wn, m, c, s) {
	alert(build + " " + lvl + "\r\nwood: " + wd + "\r\nwine: " + wn + "\r\nmarble: " + m + "\r\ncrystal: " + c + "\r\nsulfur: " + s);
}

/**
 * Extracts the action value from URI
 * @param string uri
 * @return string
 */
function getAction(uri) {
	var pos, action;
	
	pos = uri.indexOf("&");
	
	action = uri.substr(8, (pos - 8));
	
	return action;	
}

/**
 * Gets the id of the body-tag which determines the view
 * @return string
 */
function getView() {
	var obj = document.getElementsByTagName("body");
	return obj[0].id;
}

/**
 * Extracts a building level from a given text
 * @param txt
 * @return integer
 */
function getBuildingLevel(txt) {
	var level;
	
	level = getIntValue(txt, '?');
	
	return level;
}

/**
 * Checks if a giving object is defined
 * @param object
 * @param variable
 * @return boolean
 */
function isDefined(object, variable) {
	if (variable != null) {
		return (typeof(eval(object)[variable]) != 'undefined');
	} else {
		return (typeof(eval(object)) != 'undefined');
	}
}

/**
 * Using XMLHttpRequest protocol to get the research list
 * @param url
 * @param id
 * @return void
 */
function getResearch(url, id, asyn) {
	xmlhttp=null;
	
	if (window.XMLHttpRequest) {// code for all new browsers
		xmlhttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {// code for IE5 and IE6
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	if (xmlhttp != null) {
	
		xmlhttp.open("GET", 'http://' + url + "/index.php?view=researchOverview&id=" + id, asyn);
		xmlhttp.send(null);
		
		if (asyn == true) {
			xmlhttp.onreadystatechange = stateChange;
		} else {
			stateChange();
		}
		
	} else {
		alert("Your browser does not support XMLHTTP.");
	}
}

function stateChange() {
	if (xmlhttp.readyState == 4) {// 4 = "loaded"
		if (xmlhttp.status == 200) {// 200 = OK
			checkResearch(xmlhttp.responseText);
		} else {
			alert("Problem retrieving data");
		}
	}
}

/**
 * Gets the city ID
 * @return integer
 */
function getCityId() {
	var div = document.getElementById('changeCityForm');
	var a = div.getElementsByTagName('a');	
	var id = a[4].href, pos;

	pos = id.indexOf('id=') + 3;
	id = id.substr(pos);
	
	return parseInt(id);
}

/**
 * Check if some researches have been done (pulley, geometry, spirit, bureaucracy)
 * 
 * @param txt
 * @return void
 */
function checkResearch(txt) {
	var pattern = /<li class="([a-z]+)">[\r\n]+.+<a href="\?view=researchDetail&id=[0-9]+&position=[0-9]&researchId=(2020|2060|2100|2110)+"/g;	
	var matches = txt.match(pattern);
	
	// Pulley ID: 2020
	if (matches[0].indexOf('unexplored') == -1) {
		pulley = true;
		GM_setValue(host + "_iuw_pulley", true);
	}
	
	// Geometry ID: 2060
	if (matches[1].indexOf('unexplored') == -1) {
		geometry = true;
		GM_setValue(host + "_iuw_geometry", true);
	}
	
	// Spirit ID: 2100
	if (matches[2].indexOf('unexplored') == -1) {
		spirit = true;
		GM_setValue(host + "_iuw_spirit", true);
	}
	
	// Bureaucracy ID: 2110
	if (matches[3].indexOf('unexplored') == -1) {
		bureaucracy = true;
		GM_setValue(host + "_iuw_bureaucracy", true);
	}
	
	// If all needed research are done, no reason to check it again
	if (pulley && geometry && spirit && bureaucracy) {
		GM_setValue(host + "_iuw_skip_research", true);
	}
	
	//alert("pulley: " + pulley + "\r\ngeometry: " + geometry + "\r\nspirit: " + spirit + "\r\nbureaucracy: " + bureaucracy);
}

//Contributed by oliezekat
/**
 * Extracts number from string
 * @param str
 * @param defaultValue
 * @return integer
 */
function getIntValue(str, defaultValue) {
	var temp = ""+str;
	
	temp = temp.replace(/[^-0-9]+/g, "");
	temp = parseInt(temp);
	
	if (defaultValue != undefined && (temp == undefined || (""+temp == "NaN"))) {
		return defaultValue;
	}
	
	return temp;
}

//---------------------------- DATABASE ----------------------------//

function loadDB() {
	// positions for each icon
	POSITIONS = {
		// palace
		"palace" : [
			{ "x" : 40, "y" : 70 },		// positioning the icon
			{ "x" : 10, "y" : 96 },		// positioning the info box
		],
		
		// palaceColony
		"palaceColony" : [
			{ "x" : 40, "y" : 70 },
			{ "x" : 10, "y" : 96 },
		],
		
		// academy
		"academy" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],
		
		// townHall
		"townHall" : [
			{ "x" : 35, "y" : 85 },
			{ "x" : 10, "y" : 38 },
		],

		// architect
		"architect" : [
			{ "x" : 50, "y" : 65 },
			{ "x" : 22, "y" : 18 },
		],

		// safehouse
		"safehouse" : [
			{ "x" : 40, "y" : 42 },
			{ "x" : -6, "y" : -6 },
		],

		//wall
		"wall" : [
			{ "x" : 150, "y" : 40 },
			{ "x" : 500, "y" : 64 },
		],

		// shipyard
		"shipyard" : [
			{ "x" : 30, "y" : 60 },
			{ "x" : 22, "y" : 12 },
		],

		// port
		"port" : [
			{ "x" : 40, "y" : 70 },
			{ "x" : 60, "y" : 24 },
		],

		// glassblowing
		"glassblowing" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// warehouse
		"warehouse" : [
			{ "x" : 60, "y" : 60 },
			{ "x" : 16, "y" : 12 },
		],

		// museum
		"museum" : [
			{ "x" : 45, "y" : 60 },
			{ "x" : 6, "y" : 12 },
		],

		// workshop
		"workshop" : [
			{ "x" : 30, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// forester
		"forester" : [
			{ "x" : 45, "y" : 50 },
			{ "x" : 26, "y" : 3 },
		],

		// optician
		"optician" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// barracks
		"barracks" : [
			{ "x" : 40, "y" : 60 },
			{ "x" : 10, "y" : 12 },
		],

		// carpentering
		"carpentering" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 16, "y" : 12 },
		],

		// embassy
		"embassy" : [
			{ "x" : 40, "y" : 60 },
			{ "x" : 0, "y" : 12 },
		],
		
		// stonemason
		"stonemason" : [
			{ "x" : 50, "y" : 50 },
			{ "x" : 16, "y" : 3 },
		],

		// fireworker
		"fireworker" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 22, "y" : 12 },
		],

		// winegrower
		"winegrower" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// vineyard
		"vineyard" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 26, "y" : 12 },	// MANGLER
		],

		// tavern
		"tavern" : [
			{ "x" : 40, "y" : 50 },
			{ "x" : 20, "y" : 3 },
		],

		// alchemist
		"alchemist" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],
		
		// branchOffice
		"branchOffice" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 10, "y" : 12 },
		],
		
		// construction spot
		"constructionSite" : [
			{ "x" : 45, "y" : 59 },
			{ "x" : 18, "y" : 15 },
		]		
	};

	// All index start with level 2
	BUILDINGS = {
		// palace, wood, wine, marble, crystal, sulfur
		"palace" : [
			{ "wood" : 5824, "wine" : 0, "marble" : 1434, "crystal" : 0, "sulfur" : 0 },
			{ "wood" : 16048, "wine" : 0, "marble" : 4546, "crystal" : 0, "sulfur" : 3089 },
			{ "wood" : 36496, "wine" : 10898, "marble" : 10770, "crystal" : 0, "sulfur" : 10301 },
			{ "wood" : 77392, "wine" : 22110, "marble" : 23218, "crystal" : 21188, "sulfur" : 24725 },
			{ "wood" : 159184, "wine" : 44534, "marble" : 48114, "crystal" : 42400, "sulfur" : 53573 },
			{ "wood" : 322768, "wine" : 89382, "marble" : 97906, "crystal" : 84824, "sulfur" : 111269 },
			{ "wood" : 649936, "wine" : 179078, "marble" : 197490, "crystal" : 169672, "sulfur" : 226661 },
			{ "wood" : 1304272, "wine" : 358470, "marble" : 396658, "crystal" : 339368, "sulfur" : 457445 },
			{ "wood" : 2612944, "wine" : 717254, "marble" : 794994, "crystal" : 678760, "sulfur" : 919013 }	// level 10
		],
		
		// palaceColony, wood, wine, marble, crystal, sulfur
		"palaceColony" : [
			{ "wood" : 5824, "wine" : 0, "marble" : 1434, "crystal" : 0, "sulfur" : 0 },
			{ "wood" : 16048, "wine" : 0, "marble" : 4546, "crystal" : 0, "sulfur" : 3089 },
			{ "wood" : 36496, "wine" : 10898, "marble" : 10770, "crystal" : 0, "sulfur" : 10301 },
			{ "wood" : 77392, "wine" : 22110, "marble" : 23218, "crystal" : 21188, "sulfur" : 24725 },
			{ "wood" : 159184, "wine" : 44534, "marble" : 48114, "crystal" : 42400, "sulfur" : 53573 },
			{ "wood" : 322768, "wine" : 89382, "marble" : 97906, "crystal" : 84824, "sulfur" : 111269 },
			{ "wood" : 649936, "wine" : 179078, "marble" : 197490, "crystal" : 169672, "sulfur" : 226661 },
			{ "wood" : 1304272, "wine" : 358470, "marble" : 396658, "crystal" : 339368, "sulfur" : 457445 },
			{ "wood" : 2612944, "wine" : 717254, "marble" : 794994, "crystal" : 678760, "sulfur" : 919013 }	// level 10
		],
		
		// academy, wood, crystal
		"academy" : [
			{ "wood" : 68, "crystal" : 0 },
			{ "wood" : 115, "crystal" : 0 },
			{ "wood" : 263, "crystal" : 0 },
			{ "wood" : 382, "crystal" : 225 },
			{ "wood" : 626, "crystal" : 428 },
			{ "wood" : 982, "crystal" : 744 },
			{ "wood" : 1330, "crystal" : 1089 },
			{ "wood" : 2004, "crystal" : 1748 },
			{ "wood" : 2665, "crystal" : 2454 },
			{ "wood" : 3916, "crystal" : 3786 },
			{ "wood" : 5156, "crystal" : 5216 },
			{ "wood" : 7446, "crystal" : 7862 },
			{ "wood" : 9753, "crystal" : 10729 },
			{ "wood" : 12751, "crystal" : 14599 },
			{ "wood" : 18163, "crystal" : 21627 },
			{ "wood" : 23691, "crystal" : 29321 },
			{ "wood" : 33450, "crystal" : 43020 },
			{ "wood" : 43571, "crystal" : 58213 },
			{ "wood" : 56728, "crystal" : 78724 },
			{ "wood" : 73832, "crystal" : 106414 },
			{ "wood" : 103458, "crystal" : 154857 },
			{ "wood" : 144203, "crystal" : 224146 },
			{ "wood" : 175057, "crystal" : 282571 },
			{ "wood" : 243929, "crystal" : 408877 }		// level 25
		],
		
		// townHall, wood, marble
		"townHall" : [
			{ "wood" : 158, "marble" : 0 },
			{ "wood" : 335, "marble" : 0 },
			{ "wood" : 623, "marble" : 0 },
			{ "wood" : 923, "marble" : 285 },
			{ "wood" : 1390, "marble" : 551 },
			{ "wood" : 2015, "marble" : 936 },
			{ "wood" : 2706, "marble" : 1411 },
			{ "wood" : 3661, "marble" : 2091 },
			{ "wood" : 4776, "marble" : 2945 },
			{ "wood" : 6173, "marble" : 4072 },
			{ "wood" : 8074, "marble" : 5664 },
			{ "wood" : 10281, "marble" : 7637 },
			{ "wood" : 13023, "marble" : 10214 },
			{ "wood" : 16424, "marble" : 13575 },
			{ "wood" : 20986, "marble" : 18254 },
			{ "wood" : 25423, "marble" : 23250 },
			{ "wood" : 32285, "marble" : 31022 },
			{ "wood" : 40232, "marble" : 40599 },
			{ "wood" : 49286, "marble" : 52216 },
			{ "wood" : 61207, "marble" : 68069 },
			{ "wood" : 74804, "marble" : 87316 },
			{ "wood" : 93956, "marble" : 115101 },
			{ "wood" : 113035, "marble" : 145326 },
			{ "wood" : 141594, "marble" : 191053 },
			{ "wood" : 170213, "marble" : 241039 },
			{ "wood" : 210011, "marble" : 312128 },
			{ "wood" : 258875, "marble" : 403824 },
			{ "wood" : 314902, "marble" : 515592 }	// level 29
		],

		// architect, wood, marble
		"architect" : [
			{ "wood" : 291, "marble" : 160 },
			{ "wood" : 413, "marble" : 222 },
			{ "wood" : 555, "marble" : 295 },
			{ "wood" : 720, "marble" : 379 },
			{ "wood" : 911, "marble" : 475 },
			{ "wood" : 1133, "marble" : 587 },
			{ "wood" : 1390, "marble" : 716 },
			{ "wood" : 1689, "marble" : 865 },
			{ "wood" : 2035, "marble" : 1036 },
			{ "wood" : 2437, "marble" : 1233 },
			{ "wood" : 2902, "marble" : 1460 },
			{ "wood" : 3443, "marble" : 1722 },
			{ "wood" : 4070, "marble" : 2023 },
			{ "wood" : 4797, "marble" : 2369 },
			{ "wood" : 5640, "marble" : 2767 },
			{ "wood" : 6618, "marble" : 3226 },
			{ "wood" : 7754, "marble" : 3752 },
			{ "wood" : 9070, "marble" : 4358 },
			{ "wood" : 10598, "marble" : 5056 },
			{ "wood" : 12369, "marble" : 5857 },
			{ "wood" : 14424, "marble" : 6777 },
			{ "wood" : 16807, "marble" : 7836 },
			{ "wood" : 19573, "marble" : 9052 },
			{ "wood" : 22780, "marble" : 10448 },
			{ "wood" : 26501, "marble" : 12054 },
			{ "wood" : 30817, "marble" : 13899 },
			{ "wood" : 35825, "marble" : 16017 },
			{ "wood" : 41631, "marble" : 18450 },
			{ "wood" : 48371, "marble" : 21245 },
			{ "wood" : 56185, "marble" : 24454 },
			{ "wood" : 65251, "marble" : 28141 }	// level 32
		],

		// safehouse, wood, marble
		"safehouse" : [
			{ "wood" : 248, "marble" : 0 },
			{ "wood" : 402, "marble" : 0 },
			{ "wood" : 578, "marble" : 129 },
			{ "wood" : 779, "marble" : 197 },
			{ "wood" : 1007, "marble" : 275 },
			{ "wood" : 1267, "marble" : 366 },
			{ "wood" : 1564, "marble" : 471 },
			{ "wood" : 1903, "marble" : 593 },
			{ "wood" : 2288, "marble" : 735 },
			{ "wood" : 2728, "marble" : 900 },
			{ "wood" : 3230, "marble" : 1090 },
			{ "wood" : 3801, "marble" : 1312 },
			{ "wood" : 4453, "marble" : 1569 },
			{ "wood" : 5195, "marble" : 1866 },
			{ "wood" : 6042, "marble" : 2212 },
			{ "wood" : 7007, "marble" : 2613 },
			{ "wood" : 8107, "marble" : 3078 },
			{ "wood" : 9547, "marble" : 3617 },
			{ "wood" : 10793, "marble" : 4242 },
			{ "wood" : 12422, "marble" : 4967 },
			{ "wood" : 14282, "marble" : 5810 },
			{ "wood" : 16400, "marble" : 6785 },
			{ "wood" : 18815, "marble" : 7919 },
			{ "wood" : 21570, "marble" : 9233 },
			{ "wood" : 24708, "marble" : 10757 },
			{ "wood" : 29488, "marble" : 12526 },
			{ "wood" : 33741, "marble" : 14577 },
			{ "wood" : 38589, "marble" : 16956 },
			{ "wood" : 44115, "marble" : 19715 },
			{ "wood" : 46585, "marble" : 21399 },
			{ "wood" : 53221, "marble" : 24867 }	// level 32
		],

		//wall, wood, marble
		"wall" : [
			{ "wood" : 361, "marble" : 203 },
			{ "wood" : 657, "marble" : 516 },
			{ "wood" : 1012, "marble" : 892 },
			{ "wood" : 1439, "marble" : 1344 },
			{ "wood" : 1951, "marble" : 1885 },
			{ "wood" : 2565, "marble" : 2535 },
			{ "wood" : 3302, "marble" : 3315 },
			{ "wood" : 4186, "marble" : 4251 },
			{ "wood" : 5247, "marble" : 5374 },
			{ "wood" : 6521, "marble" : 6721 },
			{ "wood" : 8049, "marble" : 8338 },
			{ "wood" : 9882, "marble" : 10279 },
			{ "wood" : 12083, "marble" : 12608 },
			{ "wood" : 14724, "marble" : 15402 },
			{ "wood" : 17892, "marble" : 18755 },
			{ "wood" : 21695, "marble" : 22779 },
			{ "wood" : 26258, "marble" : 27607 },
			{ "wood" : 31733, "marble" : 33402 },
			{ "wood" : 38304, "marble" : 40355 },
			{ "wood" : 46189, "marble" : 48699 },
			{ "wood" : 55650, "marble" : 58711 },
			{ "wood" : 67004, "marble" : 70726 },
			{ "wood" : 80629, "marble" : 85144 },
			{ "wood" : 96979, "marble" : 102446 },
			{ "wood" : 116599, "marble" : 123208 },
			{ "wood" : 140143, "marble" : 148122 },
			{ "wood" : 168395, "marble" : 178019 },
			{ "wood" : 202298, "marble" : 213896 },
			{ "wood" : 242982, "marble" : 256948 },
			{ "wood" : 291802, "marble" : 308610 },
			{ "wood" : 350387, "marble" : 370605 }	// level 32
		],

		// shipyard, wood, marble
		"shipyard" : [
			{ "wood" : 202, "marble" : 0 },
			{ "wood" : 324, "marble" : 0 },
			{ "wood" : 477, "marble" : 0 },
			{ "wood" : 671, "marble" : 0 },
			{ "wood" : 914, "marble" : 778 },
			{ "wood" : 1222, "marble" : 1052 },
			{ "wood" : 1609, "marble" : 1397 },
			{ "wood" : 2096, "marble" : 1832 },
			{ "wood" : 2711, "marble" : 2381 },
			{ "wood" : 3485, "marble" : 3071 },
			{ "wood" : 4460, "marble" : 3942 },
			{ "wood" : 5689, "marble" : 5038 },
			{ "wood" : 7238, "marble" : 6420 },
			{ "wood" : 9190, "marble" : 8161 },
			{ "wood" : 11648, "marble" : 10354 },
			{ "wood" : 14745, "marble" : 13117 },
			{ "wood" : 18650, "marble" : 16600 },
			{ "wood" : 23568, "marble" : 20989 },
			{ "wood" : 29765, "marble" : 26517 },
			{ "wood" : 37572, "marble" : 33484 },
			{ "wood" : 47412, "marble" : 42261 },
			{ "wood" : 59807, "marble" : 53321 },
			{ "wood" : 75428, "marble" : 67256 },
			{ "wood" : 95107, "marble" : 84814 }	// level 25
		],

		// port, wood, marble
		"port" : [
			{ "wood" : 150, "marble" : 0 },
			{ "wood" : 274, "marble" : 0 },
			{ "wood" : 429, "marble" : 0 },
			{ "wood" : 637, "marble" : 0 },
			{ "wood" : 894, "marble" : 176 },
			{ "wood" : 1207, "marble" : 326 },
			{ "wood" : 1645, "marble" : 540 },
			{ "wood" : 2106, "marble" : 791 },
			{ "wood" : 2735, "marble" : 1138 },
			{ "wood" : 3537, "marble" : 1598 },
			{ "wood" : 4492, "marble" : 2176 },
			{ "wood" : 5689, "marble" : 2928 },
			{ "wood" : 7103, "marble" : 3859 },
			{ "wood" : 8850, "marble" : 5051 },
			{ "wood" : 11094, "marble" : 6628 },
			{ "wood" : 13731, "marble" : 8566 },
			{ "wood" : 17062, "marble" : 11089 },
			{ "wood" : 21097, "marble" : 14265 },
			{ "wood" : 25965, "marble" : 18241 },
			{ "wood" : 31810, "marble" : 23197 },
			{ "wood" : 39190, "marble" : 29642 },
			{ "wood" : 47998, "marble" : 37636 },
			{ "wood" : 58713, "marble" : 47703 },
			{ "wood" : 71955, "marble" : 60556 },
			{ "wood" : 87627, "marble" : 76366 },
			{ "wood" : 94250, "marble" : 85042 }	// level 27
		],

		// glassblowing, wood, marble
		"glassblowing" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 }	// level 21
		],

		// warehouse, wood, marble
		"warehouse" : [
			{ "wood" : 288, "marble" : 0 },
			{ "wood" : 442, "marble" : 0 },
			{ "wood" : 626, "marble" : 96 },
			{ "wood" : 847, "marble" : 211 },
			{ "wood" : 1113, "marble" : 349 },
			{ "wood" : 1431, "marble" : 515 },
			{ "wood" : 1813, "marble" : 714 },
			{ "wood" : 2272, "marble" : 953 },
			{ "wood" : 2822, "marble" : 1240 },
			{ "wood" : 3483, "marble" : 1584 },
			{ "wood" : 4275, "marble" : 1997 },
			{ "wood" : 5226, "marble" : 2492 },
			{ "wood" : 6368, "marble" : 3086 },
			{ "wood" : 7737, "marble" : 3800 },
			{ "wood" : 9380, "marble" : 4656 },
			{ "wood" : 11353, "marble" : 5683 },
			{ "wood" : 13719, "marble" : 6915 },
			{ "wood" : 16559, "marble" : 8394 },
			{ "wood" : 19967, "marble" : 10169 },
			{ "wood" : 24056, "marble" : 12299 },
			{ "wood" : 28963, "marble" : 14855 },
			{ "wood" : 34852, "marble" : 17922 },
			{ "wood" : 41918, "marble" : 21602 },
			{ "wood" : 50398, "marble" : 26019 },
			{ "wood" : 60574, "marble" : 31319 },
			{ "wood" : 72784, "marble" : 37678 },
			{ "wood" : 87437, "marble" : 45310 },
			{ "wood" : 105021, "marble" : 54468 },
			{ "wood" : 126121, "marble" : 65458 },
			{ "wood" : 151441, "marble" : 78645 },
			{ "wood" : 181825, "marble" : 94471 },
			{ "wood" : 218286, "marble" : 113461 },
			{ "wood" : 262039, "marble" : 136249 },
			{ "wood" : 314543, "marble" : 163595 },
			{ "wood" : 377548, "marble" : 196409 },
			{ "wood" : 453153, "marble" : 235787 },
			{ "wood" : 543880, "marble" : 283041 },
			{ "wood" : 652752, "marble" : 339745 },
			{ "wood" : 783398, "marble" : 407790 }	// level 40
		],

		// museum, wood, marble
		"museum" : [
			{ "wood" : 1435, "marble" : 1190 },
			{ "wood" : 2748, "marble" : 2573 },
			{ "wood" : 4716, "marble" : 4676 },
			{ "wood" : 7669, "marble" : 7871 },
			{ "wood" : 12099, "marble" : 12729 },
			{ "wood" : 18744, "marble" : 20112 },
			{ "wood" : 28710, "marble" : 31335 },
			{ "wood" : 43661, "marble" : 48394 },
			{ "wood" : 66086, "marble" : 74323 },
			{ "wood" : 99724, "marble" : 113736 },
			{ "wood" : 150181, "marble" : 173643 },
			{ "wood" : 225866, "marble" : 264701 },
			{ "wood" : 339394, "marble" : 403110 },
			{ "wood" : 509686, "marble" : 613492 },
			{ "wood" : 765124, "marble" : 933272 }	// level 16
		],

		// workshop, wood, marble, missing 2 (level 30, 31)
		"workshop" : [
			{ "wood" : 383, "marble" : 167 },
			{ "wood" : 569, "marble" : 251 },
			{ "wood" : 781, "marble" : 349 },
			{ "wood" : 1023, "marble" : 461 },
			{ "wood" : 1299, "marble" : 592 },
			{ "wood" : 1613, "marble" : 744 },
			{ "wood" : 1972, "marble" : 920 },
			{ "wood" : 2380, "marble" : 1125 },
			{ "wood" : 2846, "marble" : 1362 },
			{ "wood" : 3377, "marble" : 1637 },
			{ "wood" : 3982, "marble" : 1956 },
			{ "wood" : 4672, "marble" : 2326 },
			{ "wood" : 5458, "marble" : 2755 },
			{ "wood" : 6355, "marble" : 3253 },
			{ "wood" : 7377, "marble" : 3831 },
			{ "wood" : 8542, "marble" : 4500 },
			{ "wood" : 9870, "marble" : 5279 },
			{ "wood" : 11385, "marble" : 6180 },
			{ "wood" : 13111, "marble" : 7226 },
			{ "wood" : 15078, "marble" : 8439 },
			{ "wood" : 17714, "marble" : 9776 },
			{ "wood" : 19481, "marble" : 11477 },
			{ "wood" : 22796, "marble" : 13373 },
			{ "wood" : 26119, "marble" : 15570 },
			{ "wood" : 29909, "marble" : 18118 },
			{ "wood" : 34228, "marble" : 21074 },
			{ "wood" : 39153, "marble" : 24503 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 58462, "marble" : 38447 }	// level 31
		],

		// forester, wood, marble
		"forester" : [
			{ "wood" : 430, "marble" : 104 },
			{ "wood" : 664, "marble" : 237 },
			{ "wood" : 968, "marble" : 410 },
			{ "wood" : 1364, "marble" : 635 },
			{ "wood" : 1878, "marble" : 928 },
			{ "wood" : 2546, "marble" : 1309 },
			{ "wood" : 3415, "marble" : 1803 },
			{ "wood" : 4544, "marble" : 2446 },
			{ "wood" : 6013, "marble" : 3282 },
			{ "wood" : 7922, "marble" : 4368 },
			{ "wood" : 10403, "marble" : 5781 },
			{ "wood" : 13629, "marble" : 7617 },
			{ "wood" : 17823, "marble" : 10422 },
			{ "wood" : 23274, "marble" : 13108 },
			{ "wood" : 30362, "marble" : 17142 },
			{ "wood" : 39574, "marble" : 22386 },
			{ "wood" : 51552, "marble" : 29204 },
			{ "wood" : 67123, "marble" : 38068 },
			{ "wood" : 87363, "marble" : 49589 },
			{ "wood" : 113680, "marble" : 64569 },
			{ "wood" : 160157, "marble" : 91013 }	// level 22
		],

		// optician, wood, marble
		"optician" : [
			{ "wood" : 188, "marble" : 35 },
			{ "wood" : 269, "marble" : 96 },
			{ "wood" : 362, "marble" : 167 },
			{ "wood" : 471, "marble" : 249 },
			{ "wood" : 597, "marble" : 345 },
			{ "wood" : 742, "marble" : 455 },
			{ "wood" : 912, "marble" : 584 },
			{ "wood" : 1108, "marble" : 733 },
			{ "wood" : 1335, "marble" : 905 },
			{ "wood" : 1600, "marble" : 1106 },
			{ "wood" : 1906, "marble" : 1338 },
			{ "wood" : 2261, "marble" : 1608 },
			{ "wood" : 2673, "marble" : 1921 },
			{ "wood" : 3152, "marble" : 2283 },
			{ "wood" : 3706, "marble" : 2704 },
			{ "wood" : 4348, "marble" : 3191 },
			{ "wood" : 5096, "marble" : 3759 },
			{ "wood" : 5962, "marble" : 4416 },
			{ "wood" : 6966, "marble" : 5178 },
			{ "wood" : 8131, "marble" : 6062 },
			{ "wood" : 9482, "marble" : 7087 },
			{ "wood" : 11050, "marble" : 8276 },
			{ "wood" : 12868, "marble" : 9656 },
			{ "wood" : 14978, "marble" : 11257 },
			{ "wood" : 17424, "marble" : 13113 },
			{ "wood" : 20262, "marble" : 15267 },
			{ "wood" : 23553, "marble" : 17762 },
			{ "wood" : 27373, "marble" : 20662 },
			{ "wood" : 31804, "marble" : 24024 },
			{ "wood" : 36943, "marble" : 27922 },
			{ "wood" : 42904, "marble" : 32447 }	// level 32
		],

		// barracks, wood, marble, missing 1 (level 29)
		"barracks" : [
			{ "wood" : 114, "marble" : 0 },
			{ "wood" : 195, "marble" : 0 },
			{ "wood" : 296, "marble" : 0 },
			{ "wood" : 420, "marble" : 0 },
			{ "wood" : 574, "marble" : 0 },
			{ "wood" : 766, "marble" : 0 },
			{ "wood" : 1003, "marble" : 0 },
			{ "wood" : 1297, "marble" : 178 },
			{ "wood" : 1662, "marble" : 431 },
			{ "wood" : 2115, "marble" : 745 },
			{ "wood" : 2676, "marble" : 1134 },
			{ "wood" : 3371, "marble" : 1616 },
			{ "wood" : 4234, "marble" : 2214 },
			{ "wood" : 5304, "marble" : 2956 },
			{ "wood" : 6630, "marble" : 3875 },
			{ "wood" : 8275, "marble" : 5015 },
			{ "wood" : 10314, "marble" : 6429 },
			{ "wood" : 12843, "marble" : 8183 },
			{ "wood" : 15979, "marble" : 10357 },
			{ "wood" : 19868, "marble" : 13052 },
			{ "wood" : 24690, "marble" : 16395 },
			{ "wood" : 30669, "marble" : 20540 },
			{ "wood" : 38083, "marble" : 25680 },
			{ "wood" : 47277, "marble" : 32054 },
			{ "wood" : 58772, "marble" : 39957 },
			{ "wood" : 72932, "marble" : 49839 },
			{ "wood" : 90490, "marble" : 61909 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 158796, "marble" : 109259 },
			{ "wood" : 186750, "marble" : 128687 }	// level 31
		],

		// carpentering, wood, marble
		"carpentering" : [
			{ "wood" : 122, "marble" : 0 },
			{ "wood" : 192, "marble" : 0 },
			{ "wood" : 274, "marble" : 0 },
			{ "wood" : 372, "marble" : 0 },
			{ "wood" : 486, "marble" : 0 },
			{ "wood" : 620, "marble" : 0 },
			{ "wood" : 777, "marble" : 359 },
			{ "wood" : 962, "marble" : 444 },
			{ "wood" : 1178, "marble" : 546 },
			{ "wood" : 1432, "marble" : 669 },
			{ "wood" : 1730, "marble" : 816 },
			{ "wood" : 2078, "marble" : 993 },
			{ "wood" : 2486, "marble" : 1205 },
			{ "wood" : 2964, "marble" : 1459 },
			{ "wood" : 3524, "marble" : 1765 },
			{ "wood" : 4178, "marble" : 2131 },
			{ "wood" : 4944, "marble" : 2571 },
			{ "wood" : 5841, "marble" : 3097 },
			{ "wood" : 6890, "marble" : 3731 },
			{ "wood" : 8117, "marble" : 4490 },
			{ "wood" : 9550, "marble" : 5402 },
			{ "wood" : 11229, "marble" : 6496 },
			{ "wood" : 13190, "marble" : 7809 },
			{ "wood" : 15484, "marble" : 9383 },
			{ "wood" : 18167, "marble" : 11273 },
			{ "wood" : 21299, "marble" : 13543 },
			{ "wood" : 24946, "marble" : 16263 },
			{ "wood" : 29245, "marble" : 19531 },
			{ "wood" : 34247, "marble" : 23450 },
			{ "wood" : 40096, "marble" : 28154 },
			{ "wood" : 46930, "marble" : 33798 }	// level 32
		],

		// embassy, wood, marble
		"embassy" : [
			{ "wood" : 415, "marble" : 342 },
			{ "wood" : 623, "marble" : 571 },
			{ "wood" : 873, "marble" : 850 },
			{ "wood" : 1173, "marble" : 1190 },
			{ "wood" : 1532, "marble" : 1606 },
			{ "wood" : 1964, "marble" : 2112 },
			{ "wood" : 2482, "marble" : 2730 },
			{ "wood" : 3103, "marble" : 3484 },
			{ "wood" : 3849, "marble" : 4404 },
			{ "wood" : 4743, "marble" : 5527 },
			{ "wood" : 5817, "marble" : 6896 },
			{ "wood" : 7105, "marble" : 8566 },
			{ "wood" : 8651, "marble" : 10604 },
			{ "wood" : 10507, "marble" : 13090 },
			{ "wood" : 12733, "marble" : 16123 },
			{ "wood" : 15404, "marble" : 19824 },
			{ "wood" : 18498, "marble" : 24339 },
			{ "wood" : 22457, "marble" : 29846 },
			{ "wood" : 27074, "marble" : 36564 },
			{ "wood" : 32290, "marble" : 45216 },
			{ "wood" : 39261, "marble" : 54769 },
			{ "wood" : 47240, "marble" : 66733 },
			{ "wood" : 56812, "marble" : 81859 },
			{ "wood" : 70157, "marble" : 104537 },
			{ "wood" : 84318, "marble" : 129580 },
			{ "wood" : 101310, "marble" : 158759 },
			{ "wood" : 121979, "marble" : 193849 },
			{ "wood" : 146503, "marble" : 236659 },
			{ "wood" : 175932, "marble" : 288888 },
			{ "wood" : 222202, "marble" : 358869 },
			{ "wood" : 266778, "marble" : 437985 }	// level 32
		],

		// stonemason, wood, marble
		"stonemason" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 },
			{ "wood" : 158740, "marble" : 87833 },
			{ "wood" : 206471, "marble" : 114289 },
			{ "wood" : 268524, "marble" : 148680 }	// level 24
		],

		// fireworker, wood, marble
		"fireworker" : [
			{ "wood" : 353, "marble" : 212 },
			{ "wood" : 445, "marble" : 302 },
			{ "wood" : 551, "marble" : 405 },
			{ "wood" : 673, "marble" : 526 },
			{ "wood" : 813, "marble" : 665 },
			{ "wood" : 974, "marble" : 827 },
			{ "wood" : 1159, "marble" : 1015 },
			{ "wood" : 1373, "marble" : 1233 },
			{ "wood" : 1618, "marble" : 1486 },
			{ "wood" : 1899, "marble" : 1779 },
			{ "wood" : 2223, "marble" : 2120 },
			{ "wood" : 2596, "marble" : 2514 },
			{ "wood" : 3025, "marble" : 2972 },
			{ "wood" : 3517, "marble" : 3503 },
			{ "wood" : 4084, "marble" : 4119 },
			{ "wood" : 4737, "marble" : 4834 },
			{ "wood" : 5487, "marble" : 5663 },
			{ "wood" : 6347, "marble" : 6624 },
			{ "wood" : 7339, "marble" : 7739 },
			{ "wood" : 8480, "marble" : 9033 },
			{ "wood" : 9791, "marble" : 10534 },
			{ "wood" : 11298, "marble" : 12275 },
			{ "wood" : 13031, "marble" : 14295 },
			{ "wood" : 15025, "marble" : 16637 },
			{ "wood" : 17318, "marble" : 19355 },
			{ "wood" : 19955, "marble" : 22508 },
			{ "wood" : 22987, "marble" : 26164 }	// level 28
		],

		// winegrower, wood, marble
		"winegrower" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42484, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72052, "marble" : 39791 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 }	// level 21
		],

		// vineyard, wood, marble
		"vineyard" : [
			{ "wood" : 423, "marble" : 198 },
			{ "wood" : 520, "marble" : 285 },
			{ "wood" : 631, "marble" : 387 },
			{ "wood" : 758, "marble" : 504 },
			{ "wood" : 905, "marble" : 640 },
			{ "wood" : 1074, "marble" : 798 },
			{ "wood" : 1269, "marble" : 981 },
			{ "wood" : 1492, "marble" : 1194 },
			{ "wood" : 1749, "marble" : 1440 },
			{ "wood" : 2045, "marble" : 1726 },
			{ "wood" : 2384, "marble" : 2058 },
			{ "wood" : 2775, "marble" : 2443 },
			{ "wood" : 3225, "marble" : 2889 },
			{ "wood" : 3741, "marble" : 3407 },
			{ "wood" : 4336, "marble" : 4008 },
			{ "wood" : 5019, "marble" : 4705 },
			{ "wood" : 5813, "marble" : 5513 },
			{ "wood" : 6875, "marble" : 6450 },
			{ "wood" : 7941, "marble" : 7537 },
			{ "wood" : 8944, "marble" : 8800 },
			{ "wood" : 10319, "marble" : 10263 },
			{ "wood" : 11900, "marble" : 11961 },
			{ "wood" : 13718, "marble" : 13930 },
			{ "wood" : 15809, "marble" : 16214 },
			{ "wood" : 18215, "marble" : 18864 },
			{ "wood" : 20978, "marble" : 21938 },
			{ "wood" : 24159, "marble" : 25503 },
			{ "wood" : 27816, "marble" : 29639 },
			{ "wood" : 32021, "marble" : 34437 },
			{ "wood" : 36857, "marble" : 40002 },
			{ "wood" : 42419, "marble" : 46457 }	// level 32
		],

		// tavern, wood, marble
		"tavern" : [
			{ "wood" : 222, "marble" : 0 },
			{ "wood" : 367, "marble" : 0 },
			{ "wood" : 541, "marble" : 94 },
			{ "wood" : 750, "marble" : 122 },
			{ "wood" : 1001, "marble" : 158 },
			{ "wood" : 1302, "marble" : 206 },
			{ "wood" : 1663, "marble" : 267 },
			{ "wood" : 2097, "marble" : 348 },
			{ "wood" : 2617, "marble" : 452 },
			{ "wood" : 3241, "marble" : 587 },
			{ "wood" : 3990, "marble" : 764 },
			{ "wood" : 4888, "marble" : 993 },
			{ "wood" : 5967, "marble" : 1290 },
			{ "wood" : 7261, "marble" : 1677 },
			{ "wood" : 8814, "marble" : 2181 },
			{ "wood" : 10678, "marble" : 2835 },
			{ "wood" : 12914, "marble" : 3685 },
			{ "wood" : 15598, "marble" : 4791 },
			{ "wood" : 18818, "marble" : 6228 },
			{ "wood" : 22683, "marble" : 8097 },
			{ "wood" : 27320, "marble" : 10526 },
			{ "wood" : 32885, "marble" : 13684 },
			{ "wood" : 39562, "marble" : 17789 },
			{ "wood" : 47576, "marble" : 23125 },
			{ "wood" : 57192, "marble" : 30063 },
			{ "wood" : 68731, "marble" : 39082 },
			{ "wood" : 82578, "marble" : 50806 },
			{ "wood" : 99194, "marble" : 66048 },
			{ "wood" : 119134, "marble" : 85862 },
			{ "wood" : 143061, "marble" : 111621 },
			{ "wood" : 171774, "marble" : 145107 },
			{ "wood" : 206230, "marble" : 188640 },
			{ "wood" : 247577, "marble" : 245231 }	// level 34
		],

		// alchemist, wood, marble
		"alchemist" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 }	// level 21
		],
		
		// branchOffice, 
		"branchOffice" : [
			{ "wood" : 173, "marble" : 0 },
			{ "wood" : 346, "marble" : 0 },
			{ "wood" : 581, "marble" : 0 },
			{ "wood" : 896, "marble" : 540 },
			{ "wood" : 1314, "marble" : 792 },
			{ "wood" : 1863, "marble" : 1123 },
			{ "wood" : 2580, "marble" : 1555 },
			{ "wood" : 3509, "marble" : 2115 },
			{ "wood" : 4706, "marble" : 2837 },
			{ "wood" : 6241, "marble" : 3762 },
			{ "wood" : 8203, "marble" : 4945 },
			{ "wood" : 10699, "marble" : 6450 },
			{ "wood" : 13866, "marble" : 8359 },
			{ "wood" : 17872, "marble" : 10774 },
			{ "wood" : 22926, "marble" : 13820 },
			{ "wood" : 29286, "marble" : 17654 },
			{ "wood" : 37272, "marble" : 22469 },
			{ "wood" : 47282, "marble" : 28502 },
			{ "wood" : 59806, "marble" : 36051 },
			{ "wood" : 75448, "marble" : 45481 }	// level 21
		]
	};
}


// ==UserScript==
// @name           Ikariam Military Cargo (Blank Canvas)
// @namespace      http://blankcanvasweb.com
// @description	   Shows cargo icons and quantities in military view
// @include        http://s*.ikariam.*/index.php?view=militaryAdvisorMilitaryMovements*
// @version		   0.01
// @author		   Jerome Dane
// ==/UserScript==

GM_addStyle('.resourcesOnBoard h5 { display:none; }\
			.resourcesOnBoard .unitBox { width:35px; float:left; margin-top:4px; text-align:center; }\
			.resourcesOnBoard .unitBox img { width:20px; }\
			.resourcesOnBoard .unitBox .iconSmall { padding-top:4px; }\
			.resourcesOnBoard .count { text-align:center; font-weight:normal; font-size:10px; }\
			.resourcesOnBoard .icon { text-align:center; }\
			tr.own td:first-child + td {  }');

var elems = document.getElementById('mainview').getElementsByTagName('div');
for(var i = 0; i < elems.length; i++) {
	if(elems[i].className == 'tooltip2' && elems[i].innerHTML.match(/count/)) {
		try {
			var src = elems[i].innerHTML;
			var target = elems[i].parentNode;
			target.wrappedJSObject.onmouseover = null;
			target.style.cursor = "auto";
			target.innerHTML = "";
			target.innerHTML += '<table class="resourcesOnBoard" style="width:275px;">' + src + '</table>';	
		} catch(e) {}
	}
}






// ==/UserScript==


// Add styles BEGIN
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'#transportBox { height: 20px; width: 200px; position: relative; margin:-185px 29px -18px 630px; z-index:99; display:block;}');
// Add styles END

var ikMain = document.getElementById('mainview');
var ikNewElement = document.createElement('div');
ikNewElement.setAttribute('id', 'transportBox');
ikMain.parentNode.insertBefore(ikNewElement, ikMain);


var citySelect = document.getElementById("citySelect");

var new_options = "";
for(var i=0;i<citySelect.length;i++){
//<a href=\"index.php?view=transport&amp;destinationCityId="+citySelect[i].value+"\">T</a>
  new_options = new_options+"<option value=\""+citySelect[i].value+"\">"+citySelect[i].text+"</option>";
}

document.getElementById("transportBox").innerHTML = "<form method=\"GET\" action=\"index.php\"><select name=\"destinationCityId\" style=\"width:130px;\">"+new_options+"</select><input type=\"hidden\" name=\"view\" value=\"transport\" /><input type=\"submit\" value=\"Go\" /></form>";
































	


// ==UserScript==
// @name           SnP helper
// @namespace      ikariamLibrary
// @description    Add caculate ship amout to pillage all resource
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

// Version 1.04 (06/06/2009)
// Credits (some function is copy or modify from other srcipt): Town Enhancer, Ikariam Inline Score

var woodAmt = 0;
var wineAmt = 0;
var marbleAmt = 0;
var crystalAmt = 0;
var sulphurAmt = 0;
var totalAmt = 0;
var lootableAmt = 0;

//b= wood
//w=wines
//m=marble
//c=crystal
//s=sulphur
var data = {
	"warehouse": [
		{ b: 0, w: 0, m: 0, c: 0, s: 0 },	// 0
		{ b: 180, w: 180, m: 180, c: 180, s: 180 },	// 1
		{ b: 260, w: 260, m: 260, c: 260, s: 260 },	// 2
		{ b: 340, w: 340, m: 340, c: 340, s: 340 },	// 3
		{ b: 420, w: 420, m: 420, c: 420, s: 420 },	// 4
		{ b: 500, w: 500, m: 500, c: 500, s: 500 },	// 5
		{ b: 580, w: 580, m: 580, c: 580, s: 580 },	// 6
		{ b: 660, w: 660, m: 660, c: 660, s: 660 },	// 7
		{ b: 740, w: 740, m: 740, c: 740, s: 740 },	// 8
		{ b: 820, w: 820, m: 820, c: 820, s: 820 },	// 9
		{ b: 900, w: 900, m: 900, c: 900, s: 900 },	// 10
		{ b: 980, w: 980, m: 980, c: 980, s: 980 },	// 11
		{ b: 1060, w: 1060, m: 1060, c: 1060, s: 1060 },	// 12
		{ b: 1140, w: 1140, m: 1140, c: 1140, s: 1140 },	// 13
		{ b: 1220, w: 1220, m: 1220, c: 1220, s: 1220 },	// 14
		{ b: 1300, w: 1300, m: 1300, c: 1300, s: 1300 },	// 15
		{ b: 1380, w: 1380, m: 1380, c: 1380, s: 1380 },	// 16
		{ b: 1460, w: 1460, m: 1460, c: 1460, s: 1460 },	// 17
		{ b: 1540, w: 1540, m: 1540, c: 1540, s: 1540 },	// 18
		{ b: 1620, w: 1620, m: 1620, c: 1620, s: 1620 },	// 19
		{ b: 1700, w: 1700, m: 1700, c: 1700, s: 1700 },	// 20
		{ b: 1780, w: 1780, m: 1780, c: 1780, s: 1780 },	// 21
		{ b: 1860, w: 1860, m: 1860, c: 1860, s: 1860 },	// 22
		{ b: 1940, w: 1940, m: 1940, c: 1940, s: 1940 },	// 23
		{ b: 2020, w: 2020, m: 2020, c: 2020, s: 2020 },	// 24
		{ b: 2100, w: 2100, m: 2100, c: 2100, s: 2100 },	// 25
		{ b: 2180, w: 2180, m: 2180, c: 2180, s: 2180 },	// 26
		{ b: 2260, w: 2260, m: 2260, c: 2260, s: 2260 },	// 27
		{ b: 2340, w: 2340, m: 2340, c: 2340, s: 2340 },	// 28
		{ b: 2420, w: 2420, m: 2420, c: 2420, s: 2420 },	// 29
		{ b: 2500, w: 2500, m: 2500, c: 2500, s: 2500 },	// 30
		{ b: 2580, w: 2580, m: 2580, c: 2580, s: 2580 }	// 31
	]
};

String.prototype.trim = function () { 
	return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"); 
};
String.prototype.replaceAll = function(pcFrom, pcTo){
	var i = this.indexOf(pcFrom);
	var c = this;
	while (i > -1) { c = c.replace(pcFrom, pcTo); i = c.indexOf(pcFrom); }
	return c;
};

getElementsByClass = function(inElement, className, findIn)
{
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++)
  {
    if (findIn == true)
    {
        if (all[e].className.indexOf(className) > 0)
        {
            elements[elements.length] = all[e];
        }
    } else {
        if (all[e].className == className)
        {
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
};

// get all attributes in object (for debug)
function objToString(obj, description){
	var str = '';
	if( typeof(description) != 'undefined' && description != '' ){
		str = '+++ [ ' + description + ' ] +++\n';
	}
	str += 'typeof - ' + typeof(obj) + '\n';
	if(typeof(obj) != 'undefined'){
		for(key in obj){
			str += key + ' - ' + obj[key] + '\n';
		}
	}
	return str;
}

// alert all attribute in object (for debug)
function describe(obj, description){
	alert(objToString(obj, description));
}

function getRequestParam( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

function getUnFormatNumberBy3(num) {
    var z = num.replace(/(\,)/g, "");
    return z;
}

function getFormatNumberBy3(num, decpoint, sep, isFillFraction, fraction_len, zeroAllow) {
    // check for missing parameters and use defaults if so
    if (arguments.length < 2) {
        sep = ",";
        decpoint = ".";
    }
    if (arguments.length < 3) {
        sep = ",";
    }
    if (arguments.length < 4) {
        isFillFraction = false;
    }
    if (arguments.length < 5) {
        fraction_len = 0;
    }
    if (arguments.length < 6) {
        zeroAllow = false;
    }


    // need a string for operations
    num = num.toString();
    if (num.indexOf(".") < 0) {
        num = num + decpoint;
    }

    // separate the whole number and the fraction if possible
    var a = num.split(decpoint);
    // decimal
    var x = a[0];
    // fraction
    var y = a[1];
    if (isFillFraction) {
        var padLen = 0;
        if (y != null) {
            padLen = fraction_len - y.length;
        }
        for (var j = 0; j < padLen; j++) {
            y = y + '0';
        }
    }

    var rexNumeric = /[0-9]/i;
    var strSign = "";
    if (x.length > 0) {
        strSign = x.substring(0, 1);
        if (!rexNumeric.test(strSign)) {
            x = x.substring(1, x.length);
        } else {
            strSign = "";
        }
    }

    var z = "";
    var result = "";

    if (typeof(x) != "undefined") {
        for (i = x.length - 1; i >= 0; i--)
            z += x.charAt(i) != sep?x.charAt(i):'';

        z = z.replace(/(\d{3})/g, "$1" + sep);
        if (z.slice(-sep.length) == sep)
            z = z.slice(0, -sep.length);
        result = "";
        for (i = z.length - 1; i >= 0; i--)
            result += z.charAt(i);
        if (typeof(y) != "undefined" && y.length > 0) {
            result = result + decpoint + y;
        }
    }
    if (result.charAt(0) == '.') {
        result = '0' + result;
    }
    if ((getUnFormatNumberBy3(result) * 1) == 0) {
        if (!zeroAllow) {
            result = '';
        }
    }
    result = strSign + result;
    return result;
}

function calculateTotalAmt()
{
var resourcesTable = document.getElementById('resources');

if(resourcesTable)
{
		var listElements = resourcesTable.getElementsByTagName('tr');

		for (var i = 1; i < listElements.length; i++)
		{
				//alert(listElements[i].innerHTML);
		if(listElements[i].innerHTML.indexOf('icon_wood.gif') > 0)
		{
				//alert('Wood');
				var res = getElementsByClass(listElements[i], "count", false);
				woodAmt = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
		else if(listElements[i].innerHTML.indexOf('icon_wine.gif') > 0)
		{
				//alert('Wine');
				var res = getElementsByClass(listElements[i], "count", false);
				wineAmt = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
		else if(listElements[i].innerHTML.indexOf('icon_marble.gif') > 0)
		{
				//alert('Marble');
				var res = getElementsByClass(listElements[i], "count", false);
				marbleAmt = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
		else if(listElements[i].innerHTML.indexOf('icon_glass.gif') > 0)
		{
				//alert('Crystal Glass');
				var res = getElementsByClass(listElements[i], "count", false);
				crystalAmt = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
		else if(listElements[i].innerHTML.indexOf('icon_sulfur.gif') > 0)
		{
				//alert('Sulphur');
				var res = getElementsByClass(listElements[i], "count", false);
				sulphurAmt = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
}

totalAmt = woodAmt+wineAmt+marbleAmt+crystalAmt+sulphurAmt;

//alert('Woods:'+woodAmt);
//alert('Wine:'+wineAmt);
//alert('marble:'+marbleAmt);
//alert('crystal:'+crystalAmt);
//alert('sulphur:'+sulphurAmt);
//alert('total:'+totalAmt);
}
}

function isTargetPage()
{
	if(document.body.id == 'safehouseReports')
	{
		var resourcesTable = document.getElementById('resources');
		if(resourcesTable)
		{
			return true;
		}else
		{
			return false;
		}
	}else
	{
		return false;
	}
}

function showTotal()
{
		var tbodys = document.getElementsByTagName('tbody');

		// Total
		totalElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = 'Total Amount:';

		td2 = document.createElement("td");
		td2.innerHTML = getFormatNumberBy3(totalAmt, ".", ",", false, 0, true);

		totalElement.appendChild(td1);
		totalElement.appendChild(td2);

		//Warehouse Level
		levelElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = 'Warehouse Level:';

		td2 = document.createElement("td");
		 var wareDiv = <>
								<input type="text" style="text-align: right;" size="8"  id="warehouseLevelId" value="0"/>  Ex. 3 or 1,2,3 for multi warehouse.
							</>;
		td2.innerHTML = wareDiv;
		td2.addEventListener("change",calculateShip,false);

		levelElement.appendChild(td1);
		levelElement.appendChild(td2);

		// Lootable Amount
		lootElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = 'Lootable Amount:';

		td2 = document.createElement("td");
		td2.setAttribute("id","lootableId");
		td2.innerHTML = '0';

		lootElement.appendChild(td1);
		lootElement.appendChild(td2);

		// Ship Amount
		shipElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = 'Ship Amount:';

		td2 = document.createElement("td");
		td2.setAttribute("id","shipId");
		td2.innerHTML = '0';

		shipElement.appendChild(td1);
		shipElement.appendChild(td2);

		//Back to hideout
		var backURL = document.getElementById("backTo").getElementsByTagName("a")[0].href.replaceAll("tab=reports","");
		backElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = '';

		td2 = document.createElement("td");
		td2.innerHTML = <>
								<a
									href={backURL}
									title="Back to the hideout"> <img
									src="skin/buildings/y100/safehouse.gif"
									width="160" height="100" /> <span class="textLabel">&lt;&lt; Back to the Hideout(Hideout Tab)</span>
								</a>
								</>;

		backElement.appendChild(td1);
		backElement.appendChild(td2);

		// Enjoy!!
		enjoyElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = '';

		td2 = document.createElement("td");
		td2.innerHTML = 'Enjoy!!  (Kabji Lambda Ikariam.org)';

		enjoyElement.appendChild(td1);
		enjoyElement.appendChild(td2);

		tbodys[0].appendChild(totalElement);
		tbodys[0].appendChild(levelElement);
		tbodys[0].appendChild(lootElement);
		tbodys[0].appendChild(shipElement);
		tbodys[0].appendChild(enjoyElement);
		tbodys[0].appendChild(backElement);
}

function validateInput()
{
	//validate input
		var level = document.getElementById('warehouseLevelId');
		var snp_LevelSplit = level.value.split(",");

		for (var i = 0; i < snp_LevelSplit.length; i++)
		{

			if(isNaN(snp_LevelSplit[i]))
			{
				alert('Please input only number');
				level.value='0';
				level.focus();
				return false;
			}else
			{
				if(parseInt(snp_LevelSplit[i]) > 31 || parseInt(snp_LevelSplit[i]) < 0)
				{
					alert('Please input only number(0-31)');
					level.value='0';
					level.focus();
					return false;
				}
			}
		}

		return true;
}

function calculateShip()
{
		if(!validateInput())
		{
			document.getElementById('warehouseLevelId').value = '0';
		}

		//find safe amt
			var level = document.getElementById('warehouseLevelId');
			var snp_LevelSplit = level.value.split(",");

			var snp_sumB = 0;
			var snp_sumW = 0;
			var snp_sumM = 0;
			var snp_sumC = 0;
			var snp_sumS = 0;
			
			for (var i = 0; i < snp_LevelSplit.length; i++)
			{
				if (typeof(data['warehouse'][snp_LevelSplit[i]]) != "undefined") {
						var b = data['warehouse'][snp_LevelSplit[i]].b;
						var w = data['warehouse'][snp_LevelSplit[i]].w;
						var m = data['warehouse'][snp_LevelSplit[i]].m;
						var c = data['warehouse'][snp_LevelSplit[i]].c;
						var s = data['warehouse'][snp_LevelSplit[i]].s;
						
						snp_sumB = snp_sumB + b;
						snp_sumW = snp_sumW + w;
						snp_sumM = snp_sumM + m;
						snp_sumC = snp_sumC + c;
						snp_sumS = snp_sumS + s;
				}
			}

			b = woodAmt - snp_sumB;
			w = wineAmt - snp_sumW;
			m = marbleAmt - snp_sumM;
			c = crystalAmt - snp_sumC;
			s = sulphurAmt - snp_sumS;

			if(b < 0) b = 0;
			if(w < 0) w = 0;
			if(m < 0) m = 0;
			if(c < 0) c = 0;
			if(s < 0) s = 0;

			lootableAmt = b + w + m + c + s;

			document.getElementById('lootableId').innerHTML = getFormatNumberBy3(lootableAmt, ".", ",", false, 0, true);

		// cal ship
			document.getElementById('shipId').innerHTML = Math.ceil(lootableAmt / 500);

		// save value
		//alert(getRequestParam("reportId"));
		GM_setValue(getRequestParam("reportId"),level.value);

}

function checkCurrentViewEqual(name)
{
		if(getRequestParam("view") == name)
		{
			return true;
		}else
		{
			return false;
		}
}

function findAndSaveWarehouseLevel()
{
	var snp_ware = getElementsByClass(document, "warehouse", false);

	for (var i = 0; i < snp_ware.length; i++)
	{
		var snp_wLevel = parseInt(snp_ware[i].getElementsByTagName("a")[0].title.split(" ")[snp_ware[i].getElementsByTagName("a")[0].title.split(" ").length-1].trim());
		//alert(buildingLevel);

		//find city id and city name
		var snp_cityId = getRequestParam("id");
		//alert(snp_cityId);

		var snp_cityName = getElementsByClass(document, "city", false)[0].innerHTML;
		//alert(snp_cityName);

		//save value
		GM_setValue(snp_cityId,snp_wLevel);
		GM_setValue(snp_cityName,snp_wLevel);
	}

}

function snpInit()
{
	// Warehouse Report
	if(isTargetPage())
	{
		//Calculate Amount
		calculateTotalAmt();

		//Insert Result
		showTotal();

		//get warehose level saved value
		var snp_townName = getElementsByClass(document, "record", false)[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML;
		//alert(snp_townName);
		var snp_saveLevel = GM_getValue(snp_townName,'0');
		if(snp_saveLevel == '0')
		{
			snp_saveLevel = GM_getValue(getRequestParam("reportId"),'0');
		}
		document.getElementById('warehouseLevelId').value = snp_saveLevel;

		//Caculate Ship and lootable amt
		calculateShip();
	}

	if(checkCurrentViewEqual("city"))
	{
		findAndSaveWarehouseLevel();
	}

}

snpInit();









// ==UserScript==

// @include		   http://s*.ikariam.*/*

// ==/UserScript==
/*
 * This script comes from an idea of N-I-K-O.
 * It merge in a unique script 2 other scripts
 * IkariamMemberLastOnline (http://userscripts.org/scripts/show/34793) from Ektdeheba
 * Ikariam Ally's Memebers Info (http://userscripts.org/scripts/show/34852) from Luca Saba... wich is me :D
*/
/*
 * Changes in v. 0.9
 * - Ikariam 2.8 compatibility
 * - Removed Ally Sorter.... not needed anymore
 */
 
if(document.getElementById('embassy') == null && document.getElementById('alliance') == null) return;

var host = top.location.host.split(".");
var domain = host[host.length -1];
var server = host[0];

var tpl = GM_getValue('template', 0);

var membersTab = document.getElementById('memberList');
if(membersTab == null) return;
var update_record = false;
//var points_cell_idx = membersTab.rows[0].cells.length - 3;
var points_cell_idx = 4;

/*
 * Words dictionary
 */
var lang={
  en: {'newAlert': 'New Members', 'newTotal': 'Total new members', 'aband': 'Abandon', 'totAban': 'Total abandon', 'confirm': 'Are you sure you want to reset recorded points ?'},
  it: {'newAlert': 'Nuovi membri', 'newTotal': 'Totale nuovi membri', 'aband': 'Abbandoni', 'totAban': 'Totale abbandoni', 'confirm': 'Sei sicuro di cancellare i punteggi salvati ?'},
  co: {'newAlert': 'חברים חדשים', 'newTotal': 'סך הכל חברים חדשים', 'aband': 'עזבו', 'totAban': 'סך הכל עזבו', 'confirm': 'האם אתה בטוח שבירצונך לאפס?'}, //Thanks to MindTwister
  il: {'newAlert': 'חברים חדשים', 'newTotal': 'סך הכל חברים חדשים', 'aband': 'עזבו', 'totAban': 'סך הכל עזבו', 'confirm': 'האם אתה בטוח שבירצונך לאפס?'}, //Thanks to MindTwister
}

var local = 'en'; //For i18n
//If domain id in the dictionary, use domain's dictionary
if(domain in lang) local = domain;

//Order by points... not needed anymore
//sortAlly();

//Last Recorded values... this method.. I've seen it in an ecmanaut script ;-)
var members = eval(GM_getValue(domain + "." + server + ".members.2.8", {}) || {});
var recorded_points = eval(GM_getValue(domain + "." + server + ".points.2.8", {}) || {});
//Add reset and config images
var confRow = document.createElement('TR');
var confCell = document.createElement('TD');
confCell.setAttribute('colspan', '6');
confCell.innerHTML = "<img style='float: left' src='http://isoleunite.mmxforge.net/images/stories/ikariam/unit_boom_small.gif' alt='Config' title='Config' id='ainfoConfig'>";
confCell.innerHTML += "<img style='float: right' src='http://isoleunite.mmxforge.net/images/stories/ikariam/icon-backx20.gif' alt='Reset' title='Reset' id='ainfoReset'>";
confRow.appendChild(confCell);
membersTab.appendChild(confRow);

//Listener to reset member's points record
document.addEventListener('click',function(event) {
  //Send Message Button
  if (event.target.id=='ainfoReset') 
  {
    recorded_points = actualValues;
    if(confirm(lang[local]['confirm']))
      saveArray("points", recorded_points);
  }
  if (event.target.id=='ainfoConfig') 
  {
    showToolConfig(event);
  }
  if ( event.target.id=='eToolConfButton')
  {
    if(document.getElementById('eToolCfImages').checked)
      GM_setValue('template', 1);
    else
      GM_setValue('template', 0);
    document.getElementById('eToolConfDiv').style.display = 'none';
  }
}, true);
//addEventListener("keyup", showToolConfig, false);

function showToolConfig(e)
{
  //if(e.keyCode != 51) return;
  var div =  document.getElementById('eToolConfDiv');
  if(div) div.style.display = 'block';
  else
  {
    div = document.createElement('div'); 
    div.setAttribute('id', 'eToolConfDiv');
    div.setAttribute('class', 'dynamic');
    div.setAttribute('style', 'z-index: 10; border: 1px solid #CB9B6B; background-color: #FDF7DD; width: 229px; height: 150px; position: absolute; float: center;top: ' + e.pageY + 'px; left: ' + e.pageX +'px');
    div.innerHTML = '<h3 class="header" style="padding-top: 8px; height: 20px; background-image: url(http://s3.ikariam.it/skin/layout/bg_sidebox_header.jpg)"><b>Config</b></h3>'; 
    div.innerHTML += '<div style="margin-left: 80px; margin-top: 20px; text-align: left">';
    
    if(tpl == 0) div.innerHTML += '<input id="eToolCfText" style="position: absolute;left: 60px;" type="radio" name="garba" value="0" checked >&nbsp;Text<br/>';
    else div.innerHTML += '<input id="eToolCfText" style="position: absolute;left: 60px;" type="radio" name="garba" value="0">&nbsp;Text<br/>';
    
    if(tpl == 1) div.innerHTML += '<input id="eToolCfImages" style="position: absolute;left: 60px;" type="radio" name="garba" value="1" checked >&nbsp;Images</div>';
    else div.innerHTML += '<input id="eToolCfImages" style="position: absolute;left: 60px;" type="radio" name="garba" value="1">&nbsp;Images</div>';
    
    //GM_log(div.innerHTML);
    div.innerHTML += '<input id="eToolConfButton" type="button" class="button" value="Save">';
    document.body.appendChild(div); 
  }
}

var actualValues = getActualData();
//Let's check for new entries
var msg = lang[local]['newAlert'] + "\n";
var sum = 0;

for(var readed_name in actualValues)
{
  //If an actual member name is not in the members list...
  if(typeof(members[readed_name]) == 'undefined')
  {
    sum++;
    msg += readed_name + "\n";
  }
}
if(sum > 0) alert(msg + lang[local]['newTotal'] + ": " + sum);
//And now, let's check for those who left the ally!
var msg = lang[local]['aband'] + "\n";
sum = 0;
for(var member_name in members)
{
  //If a member name is not in the actual member list...
  if(typeof(actualValues[member_name]) == 'undefined')
  {
    sum++;
    msg += member_name + "\n";
    var trOut = document.createElement("TR");
    trOut.style.backgroundColor = "#F00";
    var tdOut = document.createElement("TD");
    tdOut.setAttribute('colspan','7');
    tdOut.style.color = "#FFF";
    tdOut.innerHTML = "<b>" + member_name + "</b> Points: <b>" + members[member_name] + "</b>";
    trOut.appendChild(tdOut);
    membersTab.appendChild(trOut);
  }
}
if(sum > 0) alert(msg + lang[local]['totAban'] + ": " + sum);
saveArray("members", actualValues);

/*
This function helps convert the Ikariam internal date format (day.month.year)
to the javascript Date Object format (year,month,day).
Original Author: Ektdeheba
For version: 0.1.1
Last changed: 0.1.2
*/
function convertIkariamDate( argDate ) {
    var returnDate = new Date(
        argDate.split(".")[2],      // Year Argument
        argDate.split(".")[1] - 1,  // Month Argument (ZERO based), subtract one to offset
        argDate.split(".")[0]);     // Day Argument
    return returnDate;
}

//Returns an Associative Array of the members's points
//While doing that, it sets the online/inactive/offline status
function getActualData()
{
  var res = new Array();
  var pName = '';
  var pPoints = 0;
  for(i=1; i < membersTab.rows.length - 1; i++)
  {
    setOnlineStatus(membersTab.rows[i]);
    pName = membersTab.rows[i].cells[1].innerHTML;
	  pPoints = membersTab.rows[i].cells[points_cell_idx].innerHTML.replace(/,/g, "") * 1; //Force variable type
	  res[pName] = pPoints;
    //If this is the first insert for this member
    if(typeof(recorded_points[pName]) === 'undefined')
	  {
	    membersTab.rows[i].cells[points_cell_idx].innerHTML += " (<font color='#F00'>New Entry</font>)";
	    recorded_points[pName] = pPoints;
	    update_record = true;
    }
	  else
	  {
	    var prev = recorded_points[pName];
	    var act = res[pName];
	    membersTab.rows[i].cells[points_cell_idx].innerHTML += " (<font color='#F00'>" + (act - prev) + "</font>)";
    }
  }
  if(update_record) saveArray("points", recorded_points);
  return res;
}

//Saves an array to GM string
function saveArray(variable, values_array)
{
  var str = '({';
  for(var k in values_array) str += "'" + k + "':" + values_array[k] + ", ";
  str += '})';
  GM_setValue(domain + '.' + server + '.' + variable + ".2.8", str);
}

function setOnlineStatus(tRow)
{
  if(tRow.cells[0].getAttribute('class') == 'online')
  {
    template('online', tRow, null);
  }
  else if(tRow.cells[0].getAttribute('class') == 'offline')
  {
    var nowDateStr = document.getElementById('servertime').innerHTML.split(" ")[0].replace(/^\s+|\s+$/g, '');
    var nowDate = convertIkariamDate( nowDateStr );
    var inactiveDate = new Date();
    inactiveDate.setDate( nowDate.getDate() - 7 );  // accounts generally go inactive after seven days
    
    var lastOnline = tRow.cells[0].title.split(":")[1].replace(/^\s+|\s+$/g, '');
    var lastDate = convertIkariamDate( lastOnline );

    if( lastDate < inactiveDate )
      template('inactive', tRow, lastOnline);
    else
      template('offline', tRow, lastOnline);
  }
}

function template(status, rowElement, lastOnline)
{
  if(status == 'online')
  {
    switch(tpl)
    {
      case 1:
        rowElement.cells[0].innerHTML="<div style='width: 8em'><span style='float: right'><img src='http://iudis.mmxforge.net/images/stories/ikariam/On.png'></span></div>";
        break;
      default:
        rowElement.cells[0].innerHTML="<B><font color='#008800'>ONLINE</FONT></B>";        
        break;
    }
  }
  else if(status == 'inactive')
  {
    switch(tpl)
    {
      case 1:
        rowElement.cells[0].innerHTML = "<div style='width: 8em'><span style='float: left'>("+lastOnline + ")</span><span style='float: right'><img src='http://www.ikariamods.com/gunmetal/cadmium/hardcode/crown.png'></span></div>";
        break;
      default:
        rowElement.cells[0].innerHTML = "<B><font color='#708090' SIZE='1'>("+lastOnline + ")INACTIVE</FONT></B>";        
        break;
    }
  }
  else if(status == 'offline')
  {
    switch(tpl)
    {
      case 1:
        rowElement.cells[0].innerHTML = "<div style='width: 8em'><span style='float: left;'>("+lastOnline+")</span><span style='float: right'><img src='http://iudis.mmxforge.net/images/stories/ikariam/Off.png'></span></div>";
        break;
      default:
        rowElement.cells[0].innerHTML = "<font color='#F00' SIZE='1'>("+lastOnline+")OFFLINE</FONT>";
        break;
    }
  }
  rowElement.cells[0].style.backgroundImage = "none";
}


























