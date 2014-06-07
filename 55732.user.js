//06/08/09
// ==UserScript==
// @name           Ikariam Reloaded
// @namespace      Ikariam Reloaded
// @description    Removes the Premium publicity and adds some useful improvements.
// @include        http://s*.ikariam.*/*
// @require        http://buzzy.hostoi.com/AutoUpdater.js
// @require        http://buzzy.hostoi.com/Ikariam/BD.js
// @require        http://buzzy.hostoi.com/Ikariam/Idioma.js
// @require        http://buzzy.hostoi.com/Ikariam/Lista.js
// @require        http://buzzy.hostoi.com/Ikariam/Imagenes.js
// @license        Creative Commons Reconocimiento-No comercial-Sin obras derivadas 3.0 España License
// @author         Buzzy
// @version        1.94
// ==/UserScript==

//--------------- LIBRERÍA ---------------//

function eliminaNodo(e){if(e)e.parentNode.removeChild(e);}
function colocaDelante(e1,e2){if(e2)e2.parentNode.insertBefore(e1,e2);}
function colocaDetras(e1,e2){if(e2)e2.parentNode.insertBefore(e1,e2.nextSibling);}
function swapNodos(e1,e2){if(e1&&e2){var nextSibling=e1.nextSibling;var parentNode=e1.parentNode;e2.parentNode.replaceChild(e1,e2);parentNode.insertBefore(e2,nextSibling)}}
function addGlobalStyle(css){var head=document.getElementsByTagName("head")[0];if(head){var style=document.createElement("style");style.type="text/css";style.innerHTML=css;head.appendChild(style)}}
function getHrefParam(param){var re=new RegExp(param+"="+"\\w+");var r=re.exec(location.href);if(r!=null){var s=r+"";return s.split("=")[1]}else{return r}}

//--------------- fin LIBRERÍA ---------------//


//--------------- FUNCIONES ---------------//

/**
 * Consulta el nombre de la ciudad.
 * @return nombre de la ciudad.
 */
function consultaNombre (){
	var ciudad = document.getElementsByClassName ("coords dropbutton")[0].childNodes[2].textContent.split (" ");
	var nombre = "";
	for (var i=1; i<ciudad.length; i++){
		nombre += " " + ciudad[i];
	}
	nombre = nombre.substr (1);
	
	return nombre;
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

/**
 * Modifica algunos elementos gráficos.
 */
function cambiaUI (){
	if (pagina == "diplomacyAdvisorTreaty"){
		var span = document.getElementsByClassName ("button")[0];
		span.parentNode.parentNode.style.height = "50px";
		span.style.position = "relative";
		span.style.right = "225px";
		span.style.top = "15px";
	}
	
	document.getElementById ("footer").innerHTML = "<center>" + nombreCiudad + "</center>";
}

/**
 * Crea un botón para cambiar entre iconos normales y Premium.
 */
function creaIconoPremium (){
	/**
	 * Cambia entre iconos normales o Premium.
	 */
	function cambiaImg (){
		if (GM_getValue ("iconosPremium")){
			GM_setValue ("iconosPremium", false);
		}else{
			GM_setValue ("iconosPremium", true);
		}
		window.location.reload ();
	}

	//Compruebo si hay que poner iconos Premium
	var premium = GM_getValue ("iconosPremium", false);
	if (premium){
		addGlobalStyle (
			"#advisors #advCities a.normal {" +
				"background-image: url(skin/layout/advisors/mayor_premium.gif);" +
			"}" +
			
			"#advisors #advMilitary a.normal {" +
				"background-image: url(skin/layout/advisors/general_premium.gif);" +
			"}" +
				
			"#advisors #advResearch a.normal {" +
				"background-image: url(skin/layout/advisors/scientist_premium.gif);" +
			"}" +
			
			"#advisors #advDiplomacy a.normal {" +
				"background-image: url(skin/layout/advisors/diplomat_premium.gif);" +
			"}" +
			
			"#advisors #advCities a.normalactive {" +
				"background-image: url(skin/layout/advisors/mayor_premium_active.gif);" +
			"}" +
			
			"#advisors #advMilitary a.normalactive {" +
				"background-image: url(skin/layout/advisors/general_premium_active.gif);" +
			"}" +
				
			"#advisors #advResearch a.normalactive {" +
				"background-image: url(skin/layout/advisors/scientist_premium_active.gif);" +
			"}" +
			
			"#advisors #advDiplomacy a.normalactive {" +
				"background-image: url(skin/layout/advisors/diplomat_premium_active.gif);" +
			"}" +
			
			"#advisors #advMilitary a.normalalert {" +
				"background-image: url(skin/layout/advisors/general_premium_alert.gif);" +
			"}"
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
 * Añade links directos al aserradero y mina en la barra de recursos.
 */
function creaLinkMinas (){
	var id = document.getElementsByClassName ("viewIsland")[0].firstChild.href.split ("id=")[1];
	var linkAserradero = "http://" + location.hostname + "/index.php?view=resource&type=resource&id=" + id;
	var nodoAserradero = document.getElementById ("cityResources").childNodes[2].childNodes[5].childNodes[2];
	nodoAserradero.style.cursor = "pointer";
	nodoAserradero.style.textDecoration = "underline";
	nodoAserradero.addEventListener ("click",
									function (){
										window.open (linkAserradero, "_self");
									},
									false);
	
	
	var nodoGuardado = GM_getValue (nombreCiudad + "_mina");
	if (nodoGuardado == undefined){
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
				var nodo;
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
				
				GM_setValue (nombreCiudad + "_mina", nodo);
			
				var linkMina = "http://" + location.hostname + "/index.php?view=tradegood&type=tradegood&id=" + id;
				var nodoMina = document.getElementById ("cityResources").childNodes[2].childNodes[nodo].childNodes[2];
				nodoMina.style.cursor = "pointer";
				nodoMina.style.textDecoration = "underline";
				nodoMina.addEventListener ("click",
											function (){
												window.open (linkMina, "_self");
											},
											false);
			}
		});
	}else{
		var linkMina = "http://" + location.hostname + "/index.php?view=tradegood&type=tradegood&id=" + id;
		var nodoMina = document.getElementById ("cityResources").childNodes[2].childNodes[nodoGuardado].childNodes[2];
		nodoMina.style.cursor = "pointer";
		nodoMina.style.textDecoration = "underline";
		nodoMina.addEventListener ("click",
									function (){
										window.open (linkMina, "_self");
									},
									false);
	}
}

/**
 * Crea un panel en la vista principal de la ciudad donde poder cambiar la imagen de la ciudad.
 */
function creaPanelImagen (){
	/**
	 * Actualiza el nombre de la variable que guarda el nivel de la imagen de fondo y el nodo de la mina.
	 * @param div capa donde se encuentran los nombres.
	 */
	function actualizaNombre (div){
		var nombreActual = div.childNodes[9].childNodes[1].textContent;
		var nuevoNombre = div.childNodes[11].childNodes[1].value;
		
		//Comprobamos si el nuevo nombre no está repetido.
		var ciudades = document.getElementsByClassName ("optionList")[0].childNodes;
		var j = 0;
		var stop = false;
		while (j < ciudades.length && !stop){
			var ciudad = ciudades[j].childNodes[2].textContent.split (" ");
			var nombreCiudad = "";
			for (var i=1; i<ciudad.length; i++){
				nombreCiudad += " " + ciudad[i];
			}
			
			nombreCiudad = nombreCiudad.substr (1);
			
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
			
			GM_setValue (nuevoNombre, GM_getValue (nombreActual));
			GM_deleteValue (nombreActual);
		
			GM_setValue (nuevoNombre + "_mina", GM_getValue (nombreActual + "_mina"));
			GM_deleteValue (nombreActual + "_mina");
		}
	}

	var panelAbierto = false;
	
	//Añado un listener en el botón para renombrar una ciudad para actualizar la variable
	if (pagina == "renameCity"){
		var div = document.getElementsByClassName ("content")[1];
		div.childNodes[11].childNodes[3].addEventListener ("click", function (){ actualizaNombre (div); }, false);
		div.childNodes[11].childNodes[1].addEventListener ("keypress", function (e){ if (e.keyCode == 13) actualizaNombre (div); }, true);
	}

	var clase = document.getElementById ("mainview").className;
	var f = new RegExp (/island\d+/);
	var ok = f.test (clase);
	if (ok) return;
	
	if (pagina == "city"){
		var panel = document.createElement ("img");
		panel.setAttribute ("width", "19px");
		panel.setAttribute ("id", "imagenSelect");
		panel.src = Img.panelImagenFondo;
		panel.style.position = "absolute";
		panel.style.top = "5px";
		panel.style.right = "5px";
		panel.style.cursor = "pointer";
		panel.title = Lang["cityPanel"];
		
		var pos = document.getElementById ("information");
		if (!pos) return;
		pos.appendChild (panel);
		
		var capa = document.createElement ("div");
		capa.setAttribute ("id", "capaSelect");
		capa.setAttribute ("class", "dynamic");
		capa.style.visibility = "hidden";
		
		capa.innerHTML = "<h3 class='header'>" + Lang["cityImage"] + "</h3>" +
						"<table class='content'>" +
							"<tr>" +
								"<td style='padding-left: 5px;'>" + nombreCiudad + "</td>" +
								"<td style='padding-right: 5px; text-align: right'>" + Lang["cityLevel"] + ": <select id='selectImagen'></select></td>" +
							"</tr>" +
						"</table>" +
						"<div class='footer'></div>";
		
		colocaDetras (capa, document.getElementById ("information"));

		panel.addEventListener ("click",
								function (){
									if (!panelAbierto){
										document.getElementById ("capaSelect").style.visibility = "visible";
										panelAbierto = true;
									}else{
										document.getElementById ("capaSelect").style.visibility = "hidden";
										panelAbierto = false;
									}
								},
								false);
		
		//Consultamos el nivel de la ciudad
		pos = document.getElementById ("position0");
		if (!pos.childNodes[3]) return;
		var s = pos.childNodes[3].title;
		var filtro = new RegExp (/\d+/);
		var num = filtro.exec (s);
		
		var select = document.getElementById ("selectImagen");

		if (GM_getValue (nombreCiudad) == undefined){
			var cadena = num.toString () + "#" + num.toString ();
			GM_setValue (nombreCiudad, cadena);
		}
		
		var s = GM_getValue (nombreCiudad).split ("#");
		var lvl = parseInt (s[0]);
		var lvlReal = parseInt (s[1]);
		
		//La intendecia ha subido de nivel. Ponemos la imagen del nivel real.
		if (num > lvlReal){
			var n;
			if (num > 24){
				n = 24;
			}else{
				n = num;
			}
			GM_setValue (nombreCiudad, n.toString () + "#" + num.toString ());
			lvl = num;
		}
		
		var encontrado = false;
		for (var i=1; i<=24; i++){
			var op = new Option (i, i);
			if (i == lvl){
				encontrado = true;
				op.selected = true;
			}
			select.add (op, null);
		}
		
		if (!encontrado){
			lvl = 24;
			select.options[23].selected = true;
		}
		
		addGlobalStyle (
			"#city #container .phase" + GM_getValue (nombreCiudad).split ("#")[1] + " {" +
				"background-image: url(skin/img/city/city_level" + lvl + ".jpg);" +
			"}"
		)

		select.addEventListener ("change",
								function (){
									var s = GM_getValue (nombreCiudad).split ("#");
									GM_setValue (nombreCiudad, this.value + "#" + s[1]);
									window.location.reload ();
								},
								false);
	}
}

/**
 * Cambia de lugar las coordenadas de la isla.
 */
function cambiaCoords (){
	var info;
	
	if (pagina == "worldmap_iso"){
		var isla = document.getElementById ("islandName");
		if (isla){
			isla.textContent = document.getElementById ("islandBread").childNodes[0].textContent;
		}
	
		//Añado listener en un div para actualizar el nombre en cuanto cambie el contenido del div
		info = document.getElementById ("information");
		if (info){
			info.childNodes[3].addEventListener ("DOMSubtreeModified",
												 function (){
													var isla = document.getElementById ("islandName");
													if (isla){
														isla.textContent = document.getElementById ("islandBread").childNodes[0].textContent;
													}
												 },
												 false);
		}
	}

	if (pagina == "city"){
		info = document.getElementById ("information");
		if (info){
			var nombre = document.getElementById ("breadcrumbs").childNodes[3].textContent.split ("[");
			info.childNodes[1].innerHTML = "<span>" + nombre[0] + " [" + nombre[1] + "</span>";
			info.childNodes[1].childNodes[0].style.cursor = "pointer";
			info.childNodes[1].childNodes[0].addEventListener ("mouseover",
												function (){
													this.style.textDecoration = "underline";
												},
												false);
			info.childNodes[1].childNodes[0].addEventListener ("mouseout",
												function (){
													this.style.textDecoration = "none";
												},
												false);
			info.childNodes[1].childNodes[0].addEventListener ("click",
												function (){
													window.open (document.getElementById ("breadcrumbs").getElementsByTagName ("a")[1].href, "_self");
												},
												false);
		}
	}
	
	if (pagina == "island"){
		info = document.getElementById ("infocontainer");
		var nombre = document.getElementById ("breadcrumbs").childNodes[3].textContent.split ("[");
		info.childNodes[0].textContent += " " + nombre[0] + " [" + nombre[1];
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
 * Informa si al aumentar o disminuir trabajadores en el aserradero o minas hay ganancia o pérdida de oro.
 */
function informaOroMinas (){
	/**
	 * Al aumentar o disminuir los trabajadores comprueba si hay ganancia o pérdida de oro.
	 * @param limite límite entre ganancias o pérdidas.
	 * @param oroTrabajadores etiqueta con el oro restante de los trabajadores.
	 */
	function compruebaOro (limite, oroTrabajadores){
		if (parseInt (oroTrabajadores.textContent) < limite){
			oroTrabajadores.style.color = "#FF0000";
			oroTrabajadores.style.fontWeight = "bold";
		}else{
			oroTrabajadores.style.color = "#612D04";
			oroTrabajadores.style.fontWeight = "normal";
		}
	}

	if (pagina == "resource" || pagina == "tradegood" || pagina == "academy"){
		//Consultamos el oro neto que se gana o se pierde
		var url = document.getElementById ("globalResources").childNodes[3].childNodes[4].childNodes[0].href;
		var oroTrabajadores = document.getElementById ("valueWorkCosts");
		var limite;
		
		var barra = document.getElementById ("sliderthumb");
		barra.addEventListener ("DOMAttrModified", function (){ compruebaOro (limite, oroTrabajadores); }, false);
		
		var input;
		if (pagina == "academy"){
			input = document.getElementById ("inputScientists");
		}else{		
			input = document.getElementById ("inputWorkers");
		}
		input.addEventListener ("keyup", function (){ compruebaOro (limite, oroTrabajadores); }, false);
		
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
				var oro;

				while (i<=8 && !stop){
					if (ciudades.childNodes[i].childNodes[1].textContent == nombreCiudad){
						stop = true;
						oro = parseInt (ciudades.childNodes[i].childNodes[7].textContent);
					}
					
					i += 2;
				}
				
				if (oro < 0){
					oroTrabajadores.style.color = "#FF0000";
					oroTrabajadores.style.fontWeight = "bold";
				}
				
				limite = parseInt (oroTrabajadores.textContent) - oro;
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
		var bd = new BD ();

		var aserradero = bd.aserradero.normal;
		var aserraderoInves = bd.aserradero.investigacion;
		
		var mina = bd.mina.normal;
		var minaInves = bd.mina.investigacion;
		if (b1){
			if (lvl > bd.aserradero.maxLvl){
				return Lang["notAvailable"];
			}else{
				if (b2){
					return aserraderoInves[lvl - 1];
				}else{
					return aserradero[lvl - 1];
				}
			}
		}else{
			if (lvl > bd.mina.maxLvl){
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
		
		var num = parseInt (div[0].childNodes[1].childNodes[1].textContent.replace (",", "")) - parseInt (div[1].childNodes[1].childNodes[1].textContent.replace (",", ""));
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
		
		var titulo = document.createElement ("h4");
		titulo.innerHTML = Lang["remainingResources"];
		
		var form = document.getElementsByClassName ("content")[0].getElementsByTagName ("form")[0];
		
		colocaDelante (titulo, form);
		
		var ul = document.createElement ("ul");
		ul.setAttribute ("class", "resources");
		ul.innerHTML = "<li class='wood'>" + cad2 + "</li>";
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
	 * @param nivelIntendencia nivel de la intendencia.
	 */
	function consultaBonusMuralla (nivelMuralla, nivelIntendencia){
		nivelMuralla = parseInt (nivelMuralla);
		nivelIntendencia = parseInt (nivelIntendencia);
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
		
		var bd = new BD ();
		var unidad = unidades.childNodes[i].getElementsByClassName ("unitinfo")[0].getElementsByTagName ("img")[1].src.split ("/");
		if (tierra){
			unidad = unidad[unidad.length-1].split ("_")[0];
			var ataque = bd.unidades[unidad].ataque;
			var defensa = bd.unidades[unidad].defensa;
			var resistencia = bd.unidades[unidad].resistencia;
		}else{
			unidad = unidad[unidad.length-1].split ("_")[1];
			var ataque = bd.barcos[unidad].ataque;
			var defensa = bd.barcos[unidad].defensa;
			var resistencia = bd.barcos[unidad].resistencia;
		}

		//Bonus
		var ataqueBonus = 0;
		var defensaBonus = 0;
		
		var icono = unidades.childNodes[i].getElementsByClassName ("att-icon")[0];
		if (icono){
			var img = icono.src.split ("/");
			img = img[img.length-1][10];
			if (tierra){
				ataqueBonus = bd.unidades[unidad].bonusAtaque[3 - parseInt (img)];
			}else{
				ataqueBonus = bd.barcos[unidad].bonusAtaque[3 - parseInt (img)];
			}
		}
		
		icono = unidades.childNodes[i].getElementsByClassName ("def-icon")[0];
		if (icono){
			var img = icono.src.split ("/");
			img = img[img.length-1][11];
			if (tierra){
				defensaBonus = bd.unidades[unidad].bonusDefensa[3 - parseInt (img)];
			}else{
				defensaBonus = bd.barcos[unidad].bonusDefensa[3 - parseInt (img)];
			}
		}
		
		//Habilidad especial
		var ataqueEspecial = 1;
		var defensaEspecial = 1;
		
		if (tierra){
			if (bd.unidades[unidad].especial == 0){
				ataqueEspecial = 1.3;
			}else if (bd.unidades[unidad].especial == 1){
				defensaEspecial = 1.3;
			}
		}else{
			if (bd.barcos[unidad].especial == 0){
				ataqueEspecial = 1.3;
			}else if (bd.barcos[unidad].especial == 1){
				defensaEspecial = 1.3;
			}
		}
		
		//Muralla
		if (tierra){
			var nivelMuralla = GM_getValue (nombreCiudad + "_muralla").split ("#")[0];
			var nivelIntendencia = GM_getValue (nombreCiudad + "_muralla").split ("#")[1];
			var ataqueMuralla = 1;
			var defensaMuralla = 1;

			if (nivelMuralla != 0 && tierra){
				defensaMuralla = consultaBonusMuralla (nivelMuralla, nivelIntendencia);
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
		}
		
		var porcentajeMuralla = Math.round ((defensaMuralla - 1)*1000)/10;

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
							"<td width='40px'><img src='" + Img.unidadesMuralla + "' title='" + Lang["bonusWall"] + ": +" + porcentajeMuralla + "%'/></td>";
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
							"<td><b>" + resistencia + "</b></td>" +
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
		colocaEtiquetas (unidad, bd, tierra);
		
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
	 * @param bd base de datos.
	 * @param tierra true si es el cuartel, false si es el astillero.
	 */
	function colocaEtiquetas (unidad, bd, tierra){
		var tabla = unidades.childNodes[i].getElementsByClassName ("tablaAvanzada")[0];
		
		if (unidad == "cook" || unidad == "medic"){
			var noBonus = document.createElement ("img");
			noBonus.src = Img.unidadesNoBonus;
			noBonus.style.position = "absolute";
			noBonus.style.top = "40px";
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
				if (bd.unidades[unidad].especial == 0){
					especial = Lang["bonusAssault"];
				}else if (bd.unidades[unidad].especial == 1){
					especial = Lang["bonusResistance"];
				}
			}else{
				if (bd.barcos[unidad].especial == 0){
					especial = Lang["bonusAssault"];
				}else if (bd.barcos[unidad].especial == 1){
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
	 * Calcula el ataque y defensa de las tropas.
	 * @param b1 true si es misión de ataque, false si es misión de defensa.
	 * @param b2 true para calcular ataque, false para calcular defensa.
	 */
	function calculaPuntos (b1, b2){
		var pts = 0;
		var pt;
		
		if (b1 && b2){
			pt = document.getElementsByClassName ("ataqueEspecial");
		}else if (b1 && !b2){
			pt = document.getElementsByClassName ("defensaBasica");
		}else if (!b1 && b2){
			pt = document.getElementsByClassName ("ataqueBasico");
		}else if (!b1 && !b2){
			if (pagina == "barracks"){
				pt = document.getElementsByClassName ("defensaMuralla");
			}else if (pagina == "shipyard"){
				pt = document.getElementsByClassName ("defensaEspecial");
			}
		}

		for (var i=0; i<pt.length; i++){
			var num = parseInt (pt[i].parentNode.parentNode.parentNode.parentNode.getElementsByClassName ("unitcount")[0].childNodes[1].textContent);
			pts += parseFloat (pt[i].textContent)*num;
		}

		return Math.round (pts*10)/10;;
	}
	
	/**
	 * Crea un panel con los puntos de ataque y defensa de las tropas/barcos en la ciudad.
	 */
	function visionGlobalPuntos (){
		var a_a = calculaPuntos (true, true);
		var a_d = calculaPuntos (true, false);
		var d_a = calculaPuntos (false, true);
		var d_d = calculaPuntos (false, false);
		
		var tierra = false;
		
		if (pagina == "barracks"){
			tierra = true;
		}

		var div = document.createElement ("div");
		div.className = "dynamic";
		
		var contenido = "<h3 class='header'>" + Lang["globalView"] + "</h3>" +
						"<div class='content'>" +
							"<h4 style='background-color: #FFFBDB; font-size: 12px; margin: 6px 0; padding: 2px; text-align: center;'>" + Lang["offensiveStrength"] + "</h4>" +
							"<table>" +
								"<tr>" +
									"<td width='20px' style='padding-left: 55px; padding-bottom: 7px;'><img title = '" + Lang["attack"] + "' src='" + Img.unidadesAtaque + "'/></td>" +
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
									"<td style='padding-left: 55px; padding-bottom: 7px;'><img title = '" + Lang["attack"] + "' src='" + Img.unidadesAtaque + "'/></td>" +
									"<td style='padding-left: 20px;'>" + d_a + "</td>" +
								"</tr>" +
								"<tr>" +
									"<td style='padding-left: 55px; padding-bottom: 3px;'><img title = '" + Lang["defense"] + "' src='" + Img.unidadesDefensa + "'/></td>" +
									"<td style='padding-left: 20px; padding-bottom: 3px;'>" + d_d + "</td>" +
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
									GM_setValue ("basico", !basico);
									window.location.reload ();
								},
								false);
		
		colocaDetras (input, document.getElementsByClassName ("buildingDescription")[0]);
	}
	
	//Guardo el nivel de la muralla e intendencia
	if (pagina == "city"){
		var nivelMuralla = "0";
		var nivelIntendencia;
		
		if (document.getElementById ("position14").childNodes[1].className != "flag"){
			var pos = document.getElementById ("position14").childNodes[3].title;
			var filtro = new RegExp (/\d+/);
			nivelMuralla = filtro.exec (pos);
		}
		
		pos = document.getElementById ("position0");
		var s = pos.childNodes[3].title;
		var filtro = new RegExp (/\d+/);
		var nivelIntendencia = filtro.exec (s);
		
		GM_setValue (nombreCiudad + "_muralla", nivelMuralla + "#" + nivelIntendencia);
	}
	
	if (pagina == "barracks" || pagina == "shipyard"){
		colocaBotonModo ();
	
		var x = 0;
		var recursosUnidad = [];
		var unidades = document.getElementById ("units");
		var basico = GM_getValue ("basico", true);
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
									GM_setValue ("ordenEmbajada", j);
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
									GM_setValue ("ordenEmbajada", j + 10);
									ordenaInver (j);
								},
								false);
		
		titulo.appendChild (span);
		titulo.appendChild (span2);
	}

	if (pagina == "embassy" || pagina == "diplomacyAdvisorAlly"){
		var tabla = document.getElementById ("memberList");
		
		if (tabla){ 
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
			
			var n = GM_getValue ("ordenEmbajada");
			
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
		var valorIntendencia = parseInt (GM_getValue (nombreCiudad).split ("#")[1]);
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
		
		var inputs = []
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

//--------------- fin FUNCIONES ---------------//


//--------------- CSS GLOBAL ---------------//

addGlobalStyle (
	"#worldmap_iso #scrollcover{" +
		"height: 540px;" +
	"}" +
	
	"#GF_toolbar ul {" +
		"width: 1000px;" +
	"}" +
	
	"#GF_toolbar li.version {" +
		"position: absolute;" +
		"left: 820px;" +
	"}" +
	
	"#GF_toolbar li.serverTime {" +
		"position: absolute;" +
		"left: 880px;" +
	"}" +
	
	"#advisors a.plusteaser {" +
		"display: none;" +
	"}" +
	
	".premiumExchange {" +
		"display: none;" +
	"}" +
	
	"#globalResources .transporters a {" +
		"top: 17px;" +
	"}" +
	
	"#globalResources .gold a {" +
		"top: 49px;" +
	"}" +
	
	"#mainview h1 {" +
		"margin: 0;" +
		"text-align: center;" +
	"}" +
	
	"#breadcrumbs {" +
		"display: none;" + 
	"}" +
	
	"#fleetMovements .info {" +
		"display: none;" +
	"}" +
	
	".cannotbuild a {" +
		"display: none;" +
	"}" +
	
	".etiqueta {" +
		"border: solid thin #D2D2D2;" +
		"background-color: #F4F4F4;" +
		"-moz-border-radius: 5px;" +
		"padding: 5px;" +
		"width: 200px;" +
		"display: none;" +
		"position: fixed;" +
		"z-index: 1000;" +
	"}"
);

//--------------- fin CSS GLOBAL ---------------//


//--------------- SCRIPT ---------------//

autoUpdate (51336, "1.94");

var Lang = new Language ().getTranslation ();
var Img = new Imagenes ();
var nombreCiudad = consultaNombre ();
var pagina = document.getElementsByTagName ("body")[0].id;

eliminaPublicidad ();
cambiaUI ();
creaIconoPremium ();
creaPanelImagen ();
cambiaCoords ();
creaBotonesRecursos ();
informaOroMinas ();
creaInfoMinas ();
creaLinkMinas ();
cuartelVistaAvanzada ();
ordenaMiembrosAlianza ();
creaPanelEspias ();

//--------------- fin SCRIPT ---------------//