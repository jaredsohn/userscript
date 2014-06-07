// ==UserScript==
// @name		MeriStation++
// @namespace   Meristation++
// @include	 http://zonaforo.meristation.com/*
// @version	 2.2.6
// @description Add-on para MeriStation ZonaForo
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_xmlhttpRequest
// @grant		GM_listValues
// @grant		GM_deleteValue
// ==/UserScript==
/*
	Copyright (C) 2013 Guillermo Diz

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* Comprobacion first-run */
if (GM_getValue("config.firstrun") == undefined || GM_getValue("config.firstrun") == 0) {
	//Paso 1: formateo
	var values = GM_listValues();
	if (values.length > -1) {
		for (i = 0; i < values.length; i++) {
			if (values[i] != undefined && values[i] != null) {
				if (!GM_deleteValue(values[i])) GM_setValue(values[i], null);
			}
		}
	}
	//Paso 2: configuración
	GM_setValue("scripts.merivisualplus", 0);
	GM_setValue("scripts.merireplyplus", 0);
	GM_setValue("scripts.merireadplus", 0);
	GM_setValue("scripts.meriblockplus", 0);
	GM_setValue("scripts.meriloginplus", 0);
	GM_setValue("config.firstrun", 1);
}
/* Comprobacion first-run */

/* OutCode - MeriVisualPlus */
if (GM_getValue("scripts.merivisualplus") == 1 && document.URL.indexOf("http://zonaforo.meristation.com/foros/m++/") == -1) {
	var skin = GM_getValue("scripts.merivisualplus.skincss");
	if (GM_getValue("scripts.merivisualplus.skintype") == 1) {
		var nodo = document.createElement("style");
		nodo.appendChild(document.createTextNode(skin));
		document.getElementsByTagName("head")[0].appendChild(nodo);
	} else {
		var nodo = document.createElement("link");
		nodo.setAttribute("rel", "stylesheet");
		nodo.setAttribute("type", "text/css");
		nodo.setAttribute("href", skin);
		document.getElementsByTagName("head")[0].appendChild(nodo);
	}
}
/* OutCode - MeriVisualPlus */

/* Biblioteca */
function setCaretPosition(elem, caretPos) {
	var range;
	if (elem.createTextRange) {
		range = elem.createTextRange();
		range.move('character', caretPos);
		range.select();
	} else {
		elem.focus();
		if (elem.selectionStart !== undefined) elem.setSelectionRange(caretPos, caretPos);
	}
}
//---------------------------------------

function insertAfter(e, i) {
	var parent = e.parentNode;
	if (e.nextSibling) parent.insertBefore(i, e.nextSibling);
	else parent.appendChild(i);
}
//---------------------------------------

function aCheck(e, r, fp, sp) {
	if (r == undefined) r = 1;
	if (fp == undefined) fp = 0;
	if (sp == undefined) sp = 1;
	var attr = e.getAttribute("title");
	if (GM_getValue(attr) == sp) {
		if (r == 1) {
			e.setAttribute("class", "check_rojo");
			GM_setValue(attr, fp);
		} else {
			e.setAttribute("class", "check_verde");
		}
		return 1;
	} else if (GM_getValue(attr) == fp) {
		if (r == 1) {
			e.setAttribute("class", "check_verde");
			GM_setValue(attr, sp);
		} else {
			e.setAttribute("class", "check_rojo");
		}
		return 0;
	} else {
		return 2;
	}
}
//---------------------------------------

function aRadio(e, r) {
	if (r == undefined) r = 1;
	var atitle = e.getAttribute("title");
	var avalue = e.getAttribute("value");
	if (r == 1) {
		if (e.checked == true) return GM_setValue(atitle, avalue);
	} else if (r == 0) {
		if (GM_getValue(atitle) == avalue) e.checked = true;
		else e.checked = false;
	}
}
//---------------------------------------

function aInput(e, r) {
	if (r == undefined) r = 1;
	var attr = e.getAttribute("title");
	if (r == 1) GM_setValue(attr, e.value);
	else e.value = GM_getValue(attr);
}
//---------------------------------------

function aList(e, m, c) {
	if (!m) m = "<div style='padding:5px'><b>Sin usuarios</b><div>";
	if (!c) c = "selec";
	e.innerHTML = "";
	var title = GM_getValue(e.getAttribute("title")).split("#");
	if (title.length < 2) return e.innerHTML += m;
	for (i = 0; i < title.length; i++) {
		if (title[i] != undefined && title[i] != null && title[i] != "") e.innerHTML += "<div class='" + c + "'>" + title[i] + "</div>";
	}
	for (i = 0; i < e.getElementsByClassName(c).length; i++) {
		var selec = e.getElementsByClassName(c)[i];
		selec.addEventListener("click", function (event) {
			if (!confirm("¿Deseas borrar a " + event.target.innerHTML + " de la lista?")) return;
			var list = event.target.parentNode;
			list.removeChild(event.target);
			sList(list);
		}, false);
	}
}

function sList(e, c) {
	if (!c) c = "selec";
	GM_setValue(e.title, e.innerHTML.split("<div class=\"" + c + "\">").join("").split("</div>").join("#").split("<div style=\"padding:5px\"><b>Sin usuarios</b><div>").join(""));
	aList(e);
}


function rList(n, m) {
	if (!m) m = "Base de datos vacía";
	GM_setValue(n.title, "");
	n.innerHTML = "<div style='padding:5px'><b>" + m + "</b></div>";
}
//---------------------------------------

function aListButton(e) {
	var n = e.title;
	var nick = prompt("Escribe el nick del usuario que quieres bloquear").split("#").join("");
	if (nick == undefined || nick == null || nick == "") return alert("Ha ocurrido un error\nDebes escribir un nick de usuario (actual es nulo)");
	var list = document.getElementsByClassName("list")[n];
	if (GM_getValue(list.title).indexOf(nick + "#") == -1) {
		list.innerHTML += "<div class='selec'>" + nick + "</div>";
		sList(list);
	} else {
		alert("Ha ocurrido un error.\nEl nick ya estaba registrado en la base de datos");
	}
}

function rListButton(e) {
	var n = e.title;
	var nick = prompt("Nombre del usuario").split("#").join("");
	if (nick != undefined && nick != null && nick != "") {
		if (GM_getValue(document.getElementsByClassName("list")[n].title).indexOf(nick + "#") != -1) {
			document.getElementsByClassName("list")[n].innerHTML = document.getElementsByClassName("list")[n].innerHTML.split("<div class=\"selec\">" + nick + "</div>").join("");
			sList(document.getElementsByClassName("list")[n]);
		} else {
			alert("El nombre no existe");
		}
	} else {
		alert("Nombre inválido");
	}
}

//---------------------------------------

function aForm(e, r, fp, sp) {
	if (r == undefined) r = 1;
	if (fp == undefined) fp = 0;
	if (sp == undefined) sp = 1;
	var inputs = e.getElementsByTagName("input");
	for (i = 0; i < inputs.length; i++) {
		var input = inputs[i];
		var attr = input.getAttribute("type");
		if (attr == "text" || attr == "password") {
			aInput(input, r);
		} else if (attr == "radio") {
			aRadio(input, r);
		}
	}
	var as = e.getElementsByTagName("a");
	for (i = 0; i < as.length; i++) {
		var a = as[i];
		if (a.href == "" && a.className.indexOf("check") != -1 && a.getAttribute("id") == undefined) {
			a.addEventListener("click", function (event) {
				aCheck(event.target, 1, fp, sp)
			}, false);
			if (e.getElementsByTagName("img").length > 0) e.getElementsByTagName("img")[i].addEventListener("click", function (event) {
				aCheck(event.target.parentNode, 1, fp, sp)
			}, false);
			aCheck(a, 0, fp, sp);
		}
	}
	var boton_ls = e.getElementsByClassName("boton_l");
	for (i = 0; i < boton_ls.length; i++) {
		boton_ls[i].addEventListener("click", function (event) {
			aListButton(event.target)
		}, false);
	}
	var boton_rs = e.getElementsByClassName("boton_r");
	for (i = 0; i < boton_rs.length; i++) {
		boton_rs[i].addEventListener("click", function (event) {
			rListButton(event.target)
		}, false);
	}
}
/* Biblioteca */

/* Web */
var web = new Object();
web.head = document.getElementsByTagName("head")[0];
web.head.configcss = "body{background-color:#eee;font-family:Signika,sans-serif;margin-left:20px}#barra_superior{background:linear-gradient(yellow,orange);z-index:998;opacity:1;color:#000;left:0;right:0;top:0;padding-right:26px;padding-left:26px;padding-top:7px;height:30px;position:fixed;text-shadow:0.0 0.0 .1em orange;box-shadow:0 2px 10px orange;overflow:auto}.menu{margin-left:-5px;text-decoration:none;color:#A52A2A;opacity:0.5;text-shadow:0.1 0.1 .3em #000;background:linear-gradient(orange,yellow);border:solid 2px orange;cursor:pointer;box-shadow:0 2px 10px orange;-moz-transition:all .5s;-webkit-transition:all .5s;padding:5px}.menu:hover{opacity:1}.menu_selec{margin-left:-5px;text-decoration:none;color:#A52A2A;opacity:0.5;text-shadow:0.1 0.1 .3em #000;background-color:#FF0;border:solid 2px orange;box-shadow:0 2px 10px orange;-moz-transition:all .5s;-webkit-transition:all .5s;padding:5px}.check_verde{text-decoration:none;color:#FFF;text-shadow:0.1 0.1 .3em #000;background:linear-gradient(green,darkgreen);border:solid 2px green;box-shadow:0 2px 10px green;transition:all .3s;cursor:pointer;padding:5px}.check_rojo{text-decoration:none;color:#FFF;text-shadow:0.1 0.1 .3em #000;background:linear-gradient(red,darkred);border:solid 2px red;box-shadow:0 2px 10px red;transition:all .2s;cursor:pointer;padding:5px}.check_verde:hover{background:linear-gradient(green,yellow);border:solid 2px #FF0;box-shadow:0 2px 10px #FF0}.check_rojo:hover{background:linear-gradient(red,yellow);border:solid 2px #FF0;box-shadow:0 2px 10px #FF0}.boton{text-decoration:none;color:#A52A2A;text-shadow:0.1 0.1 .3em #000;background:linear-gradient(orange,yellow);border:solid 2px orange;cursor:pointer;-moz-transition:all .5s;-webkit-transition:all .5s;padding:5px}.boton:hover{box-shadow:0 2px 10px orange}.input_text{background:white;border-radius:5px 5px;border:solid 1px orange;color:gray;-moz-transition:all .5s;-webkit-transition:all .5s;padding:3px}.input_text:focus{color:black}.list{border:solid 1px orange;overflow-y:auto;overflow-x:hidden;max-height:300px;min-height:20px}.selec{cursor:pointer;padding:5px 0px 5px 10px;width:500px;-moz-transition:all 0.3s;-webkit-transition:all 0.3s}.selec:hover{background-color:orange}.boton_l{text-decoration:none;color:#A52A2A;text-shadow:0.1 0.1 .3em #000;background:linear-gradient(orange,yellow);border:solid 2px orange;cursor:pointer;-moz-transition:all .5s;-webkit-transition:all .5s;padding:5px}.boton_l:hover{box-shadow:0 2px 10px orange}.boton_r{text-decoration:none;color:#A52A2A;text-shadow:0.1 0.1 .3em #000;background:linear-gradient(orange,yellow);border:solid 2px orange;cursor:pointer;-moz-transition:all .5s;-webkit-transition:all .5s;padding:5px}.boton_r:hover{box-shadow:0 2px 10px orange}";
web.topic = function () {
	if (document.getElementsByClassName("topic_body").length > 0) return 1;
	return 0;
}
web.forum = function () {
	if (document.getElementsByClassName("viewforum_title").length > 0) return 1;
	return 0;
}
web.head.append = function (text, type) {
	if (!type) type = "style";
	var node = document.createElement(type);
	node.appendChild(document.createTextNode(text));
	web.head.appendChild(node);
}
if (document.URL.indexOf("http://zonaforo.meristation.com/foros/m++/modulos") != -1) {
	document.title = "MeriStation++ vM4 :: Módulos";
	web.head.append(web.head.configcss);
	document.body.innerHTML = "<div id='barra_superior'> <div style='float:right; margin-top:2px'> <b><a style='text-decoration:none' href='http://zonaforo.meristation.com/meristation-2-2-4-iexcl-mejora-tu-experiencia-en-zonaforo-t2141657.html'>MeriStation++ 2.2.6</a></b> </div> <a class='menu_selec' href='javascript:void(0)'>Módulos</a> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/merivisualplus'>MeriVisualPlus</a> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/merireplyplus'>MeriReplyPlus</a> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/meriblockplus'>MeriBlockPlus</a> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/meriloginplus'>MeriLoginPlus</a> </div> <br> </br> <h2>Módulos</h2> <p> Haz click en los modulos para <font color='green'><b>activarlos</b></font color> o <font color='red'><b>desactivarlos</b></font color> <div id='check_modulos'> <a class='check_verde' title='scripts.merivisualplus'>MeriVisualPlus</a><a class='check_verde' title='scripts.merireplyplus'>MeriReplyPlus</a><a class='check_verde' title='scripts.merireadplus'>MeriReadPlus</a><a class='check_verde' title='scripts.meriblockplus'>MeriBlockPlus</a><a class='check_verde' title='scripts.meriloginplus'>MeriLoginPlus</a> </div> <br> </br> <hr color='orange'> <h2>Resetear a estado de fábrica</h2> <p> Atención: perderás todos los datos guardados<br> </br><a class='boton' id='but_reset'>Resetear script a estado de fábrica</a> </p>";
	var modulos = document.getElementById("check_modulos").getElementsByTagName("a");
	for (i = 0; i < modulos.length; i++) {
		aCheck(modulos[i], 0);
		modulos[i].addEventListener("click", function (event) {
			aCheck(event.target)
		}, false);
	}

	function reset() {
		if (GM_getValue("config.firstrun") == 1) {
			if (confirm("¿Está segur@ de borrar toda la configuración guardada hasta ahora y regresar a la configuración de fábrica?\nEsto puede solucionar errores, pero perderá toda la configuración.")) {
				GM_setValue("config.firstrun", 0);
				alert("Se ha marcado un reseteo, pero para borrar la información es necesario recargar la página (por seguridad)\n\nSi no quiere eliminar la configuración o has pulsado este botón por error, puede cancelar el reseteo haciendo clic en 'Resetear script a estado de fábrica' y haciendo clic en 'Aceptar'.");
			}
		} else {
			if (confirm("Ya ha sido marcado un reseteo. ¿Desea cancelarlo?")) {
				GM_setValue("config.firstrun", 1);
				alert("El reseteo ha sido cancelado con éxito");
			}
		}
	}
	document.getElementById("but_reset").addEventListener("click", reset, false);
}
if (document.getElementById("top_menu") != undefined) {
	var panel = document.getElementById("top_menu");
	var nodo = document.createElement("a");
	nodo.appendChild(document.createTextNode("MERISTATION++  "));
	nodo.className = "gensmall";
	nodo.href = "http://zonaforo.meristation.com/foros/m++/modulos";
	panel.insertBefore(nodo, panel.getElementsByTagName("img")[0]);
}
/* Web */

/* Lanzador */
var script = new Object();
script.MeriVisualPlus = function () {
	var fPrefix = "scripts.merivisualplus.";
	var fKeys = ["skincss", "skintype", "fixbuttons", "color1", "color2", "color3", "bkimage", "bkstyle", "bkcolor", "awidth", "adapt", "apanel", "barrasoc", "tamañopix"];
	var fVals = ["", 1, 1, "", "", "", "http://www.meristation.com/files/imagenes/general/f_meri4s_0.jpg", 1, "rgb(241, 148, 1)", "99%", 0, 0, 0, 100];
	/* Comprobación script */
	function configreset(mode) {
		for (i = 0; i < fKeys.length; i++) {
			var key = fPrefix + fKeys[i];
			var aValue = GM_getValue(key);
			if (mode == 0) GM_setValue(key, fVals[i]);
			else if (aValue == undefined) GM_setValue(key, fVals[i]);
		}
	}
	configreset(1);
	/* Comprobación script */

	/* Script */
	if (document.URL.indexOf("http://zonaforo.meristation.com/foros/m++/merivisualplus") != -1) {
		document.title = "MeriStation++ vM4 :: Módulo :: MeriVisualPlus";
		web.head.append(web.head.configcss);
		document.body.innerHTML = "<div id='barra_superior'> <div style='float:right; margin-top:2px'> <b><a style='text-decoration:none' href='e' href='http://zonaforo.meristation.com/meristation-2.2.6-iexcl-mejora-tu-experiencia-en-zonaforo-t2141657.html'>MeriStation++ 2.2.6</a></b> </div> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/modulos'>Módulos</a> <a class='menu_selec' href='javascript:void(0)'>MeriVisualPlus</a> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/merireplyplus'>MeriReplyPlus</a> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/meriblockplus'>MeriBlockPlus</a> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/meriloginplus'>MeriLoginPlus</a> </div> <br> </br> <h2>MeriVisualPlus</h2> <a id='but_reset' class='boton' href='javascript:void(0)'>Resetear módulo a configuración de fábrica</a> <a id='but_exportar' href='javascript:void(0)' class='boton'>Exportar</a> <a id='but_importar' href='javascript:void(0)' class='boton'>Importar</a> <br></br> <div id='config'> <h3>Estilo del foro (<a href='http://www.w3schools.com/tags/ref_colorpicker.asp' target='_blank'>Colores HTML</a>)</h3> <a class='check_verde' title='scripts.merivisualplus.adapt'>Anchura personalizada</a><a class='check_verde' title='scripts.merivisualplus.barrasoc'>Eliminar panel de redes sociales</a><a class='check_verde' title='scripts.merivisualplus.apanel'>Eliminar panel de noticias</a><a class='check_verde' title='scripts.merivisualplus.fixbuttons'>Modificar botones</a> <br></br> <table> <tr> <td style='text-align:right'>Imagen de fondo:</td> <td><input type='text' class='input_text' title='scripts.merivisualplus.bkimage' size='50'/></td> </tr> <tr> <td style='text-align:right'>Color de fondo:</td> <td><input type='text' class='input_text' title='scripts.merivisualplus.bkcolor' size='50'/></td> </tr> <td style='text-align:right'>Tipo de fondo:</td> <td><input type='radio' name='type_background' title='scripts.merivisualplus.bkstyle' value='1'>Expandir</input><input type='radio' name='type_background' title='scripts.merivisualplus.bkstyle' value='0'>Mosaico</input></td> <tr> <td style='text-align:right'>Color columna nº1:</td> <td><input type='text' class='input_text' title='scripts.merivisualplus.color1' size='50'/></td> </tr> <tr> <td style='text-align:right'>Color columna nº2:</td> <td><input type='text' class='input_text' title='scripts.merivisualplus.color2' size='50'/></td> </tr> <tr> <td style='text-align:right'>Color columna nº3/4:</td> <td><input type='text' class='input_text' title='scripts.merivisualplus.color3' size='50'/></td> </tr> <tr> <td style='text-align:right'>Anchura del foro (%/px):</td> <td><input type='text' class='input_text' title='scripts.merivisualplus.awidth' size='50'/></td> </tr> <td style='text-align:right'>Tamaño de avatares (px):</td> <td><input type='text' class='input_text' title='scripts.merivisualplus.tamañopix' size='50'/></td> </tr> </table> <hr color='#eee'> </div> <a href='javascript:void(0)' id='but_accept' class='boton'>Guardar cambios</a> <br><br> <div id='configskin'><h3>Skin del foro (solo usuarios avanzados)</h3> <input type='radio' name='skin_type' title='scripts.merivisualplus.skintype' value='1'>Texto</input> <input type='radio' name='skin_type' title='scripts.merivisualplus.skintype' value='0'>URL</input> <br><br><textarea id='skin_css' class='input_text' style='width:90%; height:150px'></textarea><br><br><a class='boton' href='javascript:void(0)' id='but_editcss'>Modificar CSS</a><br><br></div> <br></br>";
		document.getElementById("but_reset").addEventListener("click", function () {
			if (!confirm("¿Desea resetear la configuración del módulo a su estado de fábrica?\nEsto puede solucionar errores, pero perderá toda la configuración guardada hasta ahora")) return;
			configreset(0);
			alert("El módulo ha sido reseteado con éxito.\nRecargue la página para ver la nueva configuración.");
		}, false);
		document.getElementById("but_exportar").addEventListener("click", function () {
			var e = "";
			for (i = 1; i < fKeys.length; i++) e += GM_getValue(fPrefix + fKeys[i]) + "\\";
			alert("Copie la siguiente línea de texto en un editor y guárdela en un archivo de texto para poder recuperar su configuración posteriormente\n\n" + e);
		}, false);
		document.getElementById("but_importar").addEventListener("click", function () {
			var e = prompt("Introduzca la línea de texto que obtuvo cuando exportó la configuración");
			e = e.split("\\");
			if (e.length != fKeys.length) return alert("La línea de texto no es correcta");
			for (i = 1; i < fKeys.length; i++) GM_setValue(fPrefix + fKeys[i], e[i - 1]);
			alert("La configuración ha sido restaurada con éxito. Recargue la página para visualizar la nueva configuración");
		}, false);
		aForm(document.getElementById("configskin"), 0);
		aForm(document.getElementById("config"), 0);
		document.getElementById("skin_css").value = GM_getValue("scripts.merivisualplus.skincss");
		document.getElementById("but_accept").addEventListener("click", function () {
			aForm(document.getElementById("config"), 1);
			var css = "#msn_bar_div {\n display:none !important\n}\n\n" +
				".tabla_superpubli {\n display:none !important\n}\n\n" +
				"body {\n padding:0px !important;\n";
			var bkimage = GM_getValue("scripts.merivisualplus.bkimage");
			var bkcolor = GM_getValue("scripts.merivisualplus.bkcolor");
			if (bkimage != "") {
				if (GM_getValue("scripts.merivisualplus.bkstyle") == 1) css += " background-image:url(" + bkimage + ") !important;\n background-size:100% !important;\n background-attachment:scroll !important;\n";
				else css += " background-image:url(" + bkimage + ") !important;\n background-repeat:repeat !important;\n";
			}
			if (bkcolor != "") css += " background-color:" + bkcolor + " !important;\n";
			css += "}\n\n";
			if (GM_getValue("scripts.merivisualplus.adapt") == 1) {
				var w = GM_getValue("scripts.merivisualplus.awidth");
				css += ".tabla_barra_superior {\n width:" + w + " !important\n}\n\n\
.logo_container {\n width:" + w + " !important\n}\n\n\
#channels-menu {\n width:" + w + " !important\n}\n\n\
#channels-menu-bottom {\n width: 100% !important\n}\n\n\
#channels-menu-top {\n background:rgba(0, 0, 0, 0.4) !important\n}\n\n\
#content_container {\n background:none !important; width:" + w + " !important\n}\n\n\
.tabla_superpubli {\n width:100% !important\n}\n\n\
.tabla_zonaforo {\n width:100% !important\n}\n\n\
.tabla_paginasforo {\n width:100% !important\n}\n\n\
.ticker {\n width:auto !important; margin-left:auto !important\n}\n\n\
#barra_inferior {\n background:black !important;\n opacity:0.3 !important;\n border:solid 1px black;\n background-repeat:repeat-x !important;\n width:" + w + " !important;\n border-bottom-right-radius:5px !important;\n border-bottom-left-radius:5px !important\n}\n\n\
.topic {\n width:100% !important \n}\n\n\
#fastemo {\n width:100% !important;\n margin:0px !important;\n padding:0px !important\n}\n\n\
.messages-content {\n width:100% !important \n}\n\n\
#cabecera_general {\n width:100% !important \n}\n\n\
.search-content {\n width:100% !important \n}\n\n\
.tabla_ticker_zonaforo {\n width:100% !important \n}\n\n\
.tabla_faq_zonaforo {\n width:100% !important \n}\n\n\
.forumline {\n width:100% !important \n}\n\n\
.memberlist-content {\n width:100% !important \n}\n\n\
#footer {\n background: none !important;\n width:100% !important;\n position:absolute !important\n}\n\n#footer-canvas {\n width:100% !important;\n padding:10px 0px 10px 0px !important\n}\n\n#footer-logo {\n background: url('http://www.prisacom.com/comunes/piecomun-v9/imgs-meri/logo_pie_meri.png?kkdd') no-repeat scroll 0px 0px transparent !important;\n height: 32px !important;\n margin: 6px 0px 0px 6px !important;\n width: 176px !important;\n}\n\n";
			}
			var color1a = GM_getValue("scripts.merivisualplus.color1");
			var color2a = GM_getValue("scripts.merivisualplus.color2");
			var color3a = GM_getValue("scripts.merivisualplus.color3");
			if (color1a != null) css += ".celda2 {\n background-color:" + color1a + " !important;\n background-image:none !important \n}\n\n";
			if (color2a != null) css += ".celda1 {\n background-color:" + color2a + " !important;\n background-image:none !important \n}\n\n";
			if (color3a != null) css += ".celda3 {\n background-color:" + color3a + " !important;\n background-image:none !important \n}\n\n" +
				".celda3.last_response {\n background-color:" + color3a + " !important;\n background-image:none !important \n}\n\n" +
				".celda3.all_reads {\n background-color:" + color3a + " !important;\n background-image:none !important \n}\n\n";
			GM_setValue("scripts.merivisualplus.skincss", css);
			GM_setValue("scripts.merivisualplus.skintype", 1);
			document.getElementById("skin_css").value = css;
			alert("Estilo y skin del foro editados con éxito.");
		}, false);
		document.getElementById("but_editcss").addEventListener("click", function () {
			GM_setValue("scripts.merivisualplus.skincss", document.getElementById("skin_css").value);
			aForm(document.getElementById("configskin"), 1);
			alert("CSS personalizada guardada con éxito")
		}, false);
	} else if (document.URL.indexOf("http://zonaforo.meristation.com/foros/m++/") == -1) {
		if (GM_getValue("scripts.merivisualplus.fixbuttons") == 1) {
			if (document.getElementsByClassName("celda6").length > 0) {
				var celdas6 = document.getElementsByClassName("celda6");
				for (i = 0; i < celdas6.length; i++) {
					var as = celdas6[i].getElementsByTagName("a");
					for (e = 0; e < as.length; e++) {
						var a = as[e];
						a.style.padding = "0px";
						a.style.background = "none";
						var ainner = a.innerHTML;
						var ahref = a.href;
						if (ahref.indexOf("?mode=quote") != -1) a.innerHTML = "<img src='http://zonaforo.meristation.com/foros/templates/MeriStation/images/m4/icn_citar.png' />";
						else if (ahref.indexOf("?mode=report") != -1 && ainner == "Reportar") a.innerHTML = "<img src='http://zonaforo.meristation.com/foros/templates/MeriStation/images/m4/icn_avisar.png' />";
						else if (ahref.indexOf("?mode=report") != -1 && ainner == "Ya reportado") a.innerHTML = "<img src='http://s7.postimage.org/addjhztev/ziqav6_jpg.png' />";
						else if (ahref.indexOf("?mode=editpost") != -1) a.innerHTML = "<img src='http://zonaforo.meristation.com/foros/templates/MeriStation/images/m4/icon_edit.png' />";
						else if (a.id.indexOf("quoterap") != -1) a.innerHTML = "<img src='http://oi41.tinypic.com/98aeqx.jpg' alt='" + a.id + "'/>";
					}
				}
			}
			//-----------------------------------------
			if (document.getElementsByClassName("quick_response").length > 0) {
				for (i = 0; i < document.getElementsByClassName("quick_response").length; i++) {
					var as = document.getElementsByClassName("quick_response")[i].getElementsByTagName("a");
					if (as.length > 0) {
						var bnuevotema = as[0];
						bnuevotema.innerHTML = "<img src='http://zonaforo.meristation.com/foros/templates/MeriStation/images/m4/btn_nuevotema.png' />";
						bnuevotema.style.background = "none";
						bnuevotema.style.padding = "0px";
					}
					if (as.length > 1) {
						var bresponder = as[1];
						if (bresponder.href.indexOf("?mode=reply") != -1 && bresponder.innerHTML == "Responder") bresponder.innerHTML = "<img src='http://zonaforo.meristation.com/foros/templates/MeriStation/images/m4/btn_responder.png' />";
						else if (bresponder.href.indexOf("?mode=reply") != -1 && bresponder.innerHTML == "Cerrado") bresponder.innerHTML = "<img src='http://zonaforo.meristation.com/foros/templates/MeriStation/images/m4/btn_cerrado.png' />";
						bresponder.style.background = "none";
						bresponder.style.padding = "0px";
					}
					if (as.length > 2) {
						var bfavoritos = as[2];
						if (bfavoritos.innerHTML == "Añadir tema a favoritos") {
							bfavoritos.innerHTML = "<img src='http://oi39.tinypic.com/2h64its.jpg' />";
							bfavoritos.alt = "Añadir tema a favoritos";
						} else if (bfavoritos.innerHTML == "Eliminar tema de favoritos") {
							bfavoritos.innerHTML = "<img src='http://oi40.tinypic.com/rk0tnk.jpg' />";
							bfavoritos.alt = "Eliminar tema de favoritos";
						}
						bfavoritos.style.background = "none";
						bfavoritos.style.padding = "0px";
					}
				}
			}
			var etiq = document.createElement("div");
			etiq.setAttribute("id", "merivisualplus");
			if (document.getElementsByTagName("head").length > 0) document.getElementsByTagName("head")[0].appendChild(etiq);
			//-----------------------------------------
			if (document.getElementById("posting_buttons") != null) {
				var divpost = document.getElementById("posting_buttons");
				var benviar = divpost.getElementsByTagName("input")[3];
				benviar.style.width = "90px";
				benviar.style.height = "22px";
				benviar.style.padding = "0px";
				benviar.style.background = "url(http://zonaforo.meristation.com/foros/templates/MeriStation/images/m4/quick_reply.png) no-repeat";
				benviar.value = " ";
				var bvistaprevia = divpost.getElementsByTagName("input")[4];
				bvistaprevia.style.width = "94px";
				bvistaprevia.style.height = "22px";
				bvistaprevia.style.padding = "0px";
				bvistaprevia.style.background = "url(http://zonaforo.meristation.com/foros/templates/MeriStation/images/m4/icono_foro_previsualizar.png) no-repeat";
				bvistaprevia.value = " ";
				var bborrar = divpost.getElementsByTagName("a")[0];
				var bborrarimg = document.createElement("img");
				bborrarimg.src = "http://zonaforo.meristation.com/foros/templates/MeriStation/images/m4/icono_foro_borrar1.png";
				bborrarimg.style.margin = "0px 0px -5.5px 0px";
				bborrar.innerHTML = "";
				bborrar.appendChild(bborrarimg);
				bborrar.style.background = "none";
				bborrar.style.padding = "0px";
			}
		}
		//----------------------------------------
		if (GM_getValue("scripts.merivisualplus.barrasoc") == 1 && document.getElementById("shareon") != undefined) document.getElementById("shareon").parentNode.removeChild(document.getElementById("shareon"));
		//----------------------------------------
		if (document.URL.indexOf("report.php?mode=report") != -1) {
			var row1 = document.getElementsByClassName("row1")[2];
			row1.width = "130px !important";
			row1.getElementsByTagName("table")[0].width = "130px !important";
		}
		//-----------------------------------------
		if (document.getElementsByClassName("bocadillo").length > 0) {
			var bocadillos = document.getElementsByClassName("bocadillo");
			for (imn = 0; imn < bocadillos.length; imn++) bocadillos[imn].style.display = "none";
		}
		//-------------------------------------------------
		for (i = 0; i < document.getElementsByClassName("msnoticiastitulo").length; i++) {
			var panel = document.getElementsByClassName("msnoticiastitulo")[i].parentNode;
			if (panel.getElementsByTagName("img").length > 0) {
				var imagen = panel.getElementsByTagName("img")[0];
				imagen.width = GM_getValue("scripts.merivisualplus.tamañopix");
				imagen.height = GM_getValue("scripts.merivisualplus.tamañopix");
			}
		}
		//-----------------------------------------
		if (web.topic() == 1) {
			if (GM_getValue("scripts.merivisualplus.apanel") == 0 && GM_getValue("scripts.merivisualplus.adapt") == 1) {
				var css = "";
				css += ".daytopic-forum-destacado {float:none !important; width:100% !important; padding:0px !important; ";
				if (document.getElementsByClassName("daytopic-forum-destacado")[0].innerHTML.indexOf("		") == -1) css += "display:none !important;";
				web.head.append(css + "}");
			} else if (GM_getValue("scripts.merivisualplus.apanel") == 1) {
				web.head.append(".daytopic-forum-destacado {display:none !important}");
			}
		}
		//----------------------------------------
		if (document.getElementsByClassName("tabla_superpubli").length > 0) document.getElementsByClassName("tabla_superpubli")[0].parentNode.removeChild(document.getElementsByClassName("tabla_superpubli")[0]);
		if (document.getElementById("meriSkiScraperWrapper")) document.getElementById("meriSkiScraperWrapper").parentNode.removeChild(document.getElementById("meriSkiScraperWrapper"));
		document.getElementById("LOCSTORAGE").nextSibling.parentNode.removeChild(document.getElementById("LOCSTORAGE").nextSibling);
		if (document.getElementById("msn_bar_div")) document.getElementById("msn_bar_div").parentNode.removeChild(document.getElementById("msn_bar_div"));
	} else {
		return 0;
	}
	/* Script */
	return 1;
}

script.MeriReplyPlus = function () {
	/* Comprobación script */
	if (GM_getValue("scripts.merireplyplus.emos") == undefined || GM_getValue("scripts.merireplyplus.emos") == "") GM_setValue("scripts.merireplyplus.emos", "<img alt=' :D ' src='http://zonaforo.meristation.com/images/smiles/risa.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' >:-\\ ' src='http://zonaforo.meristation.com/images/smiles/enfadado.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :o ' src='http://zonaforo.meristation.com/images/smiles/hala.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :? ' src='http://zonaforo.meristation.com/images/smiles/ein.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' 8D ' src='http://zonaforo.meristation.com/images/smiles/sonrisagafa.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :P ' src='http://zonaforo.meristation.com/images/smiles/lengua.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' >:( ' src='http://zonaforo.meristation.com/images/smiles/cabreado.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' X-D ' src='http://zonaforo.meristation.com/images/smiles/descojone.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' >:) ' src='http://zonaforo.meristation.com/images/smiles/malote.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :| ' src='http://zonaforo.meristation.com/images/smiles/serio.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' O:) ' src='http://zonaforo.meristation.com/images/smiles/angel.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' 8O ' src='http://zonaforo.meristation.com/images/smiles/flipao.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :] ' src='http://zonaforo.meristation.com/images/smiles/soncorchete.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :-D ' src='http://zonaforo.meristation.com/images/smiles/risa-n.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :-) ' src='http://zonaforo.meristation.com/images/smiles/contento.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :-( ' src='http://zonaforo.meristation.com/images/smiles/triste.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :-o ' src='http://zonaforo.meristation.com/images/smiles/asombro.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' 8-) ' src='http://zonaforo.meristation.com/images/smiles/gafas_1.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :lol: ' src='http://zonaforo.meristation.com/images/smiles/icon_lol.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' ;-) ' src='http://zonaforo.meristation.com/images/smiles/guinio-n.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' 8)~ ' src='http://zonaforo.meristation.com/images/smiles/babeando.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :(( ' src='http://zonaforo.meristation.com/images/smiles/depre.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :$ ' src='http://zonaforo.meristation.com/images/smiles/sonrojo.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' ^v^ ' src='http://zonaforo.meristation.com/images/smiles/gatuno.gif' class='mrp_emoticono'/>#@newemo@#");
	/* Comprobación script */

	/* Script */
	function ineti(eti) {
		if (!eti) return 0;
		var textarea = document.getElementsByName("message")[0];
		var _ini = textarea.selectionStart;
		var _fin = textarea.selectionEnd;
		var inicio = textarea.value.substr(0, _ini);
		var fin = textarea.value.substr(_fin, textarea.value.length);
		if (_ini != _fin) {
			var entremedio = textarea.value.substr(0, _fin).substr(_ini);
			textarea.value = inicio + "[" + eti + "]" + textarea.value.substr(0, _fin).substr(_ini) + "[/" + eti + "]" + fin;
			setCaretPosition(textarea, inicio.length + textarea.value.substr(0, _fin).substr(_ini).length + 5 + eti.length + eti.length);
		} else {
			textarea.value = inicio + "[" + eti + "][/" + eti + "]" + fin;
			setCaretPosition(textarea, inicio.length + eti.length + 2);
		}
	}
	if (document.URL.indexOf("http://zonaforo.meristation.com/foros/m++/merireplyplus") != -1) {
		document.title = "MeriStation++ vM4 :: Módulo :: MeriReplyPlus";
		web.head.append(web.head.configcss);
		web.head.append(".mrp_c {background-color:lightgray;width:50px;height:30px;border:solid 1px black;text-align:center;padding:5px;color:black;float:left;display:inline-block;vertical-align:top;} .mrp_c_selec {background-color:lightblue;width:50px;height:30px;border:solid 1px black;text-align:center;padding:5px;color:black;float:left;display:inline-block;vertical-align:top;} .mrp_emoticono {max-height:15px; max-width:30px} .mrp_left {text-decoration:none; color:black; cursor:pointer} .mrp_right {text-decoration:none; color:black; cursor:pointer} .mrp_left:hover {color:blue;} .mrp_right:hover {color:blue;} .mrp_close {color:black; font-weight:bold; text-decoration:none; cursor:pointer} .mrp_close:hover {color:red}");
		document.body.innerHTML = "<div id='barra_superior'> <div style='float:right; margin-top:2px'> <b><a style='text-decoration:none' href='e' href='http://zonaforo.meristation.com/meristation-2.2.6-iexcl-mejora-tu-experiencia-en-zonaforo-t2141657.html'>MeriStation++ 2.2.6</a></b> </div> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/modulos'>Módulos</a> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/merivisualplus'>MeriVisualPlus</a> <a class='menu_selec' href='javascript:void(0)'>MeriReplyPlus</a> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/meriblockplus'>MeriBlockPlus</a> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/meriloginplus'>MeriLoginPlus</a> </div> <br> </br> <h2>MeriReplyPlus</h2> <h3>Emoticonos</h3> <table><tr><td>URL de la imagen a mostrar:</td><td><input type='text' id='mrp_durl' class='input_text' style='width:100%'></input></td></tr> <tr><td style='text-align:right'>Texto a insertar:</td> <td style='width:500px'><input type='text' id='mrp_iurl' class='input_text' style='width:100%'></input></td></tr></table> <br> <a class='boton' id='mrp_anadir'>Añadir</a> <b><font color='orange'> | </font color></b> <a class='boton' id='mrp_restaurar'>Restaurar emoticonos por defecto</a> <a class='boton' id='mrp_borrart'>Borrar todos</a> <b><font color='orange'> | </font color></b> <a class='boton' id='mrp_exportar'>Exportar</a> <a class='boton' id='mrp_importar'>Importar</a> <br></br> <div id='config'></div>";

		function setEmos() {
			GM_setValue("scripts.merireplyplus.emos", "");
			for (i = 0; i < document.getElementsByClassName("mrp_emoticono").length; i++) {
				var emos = GM_getValue("scripts.merireplyplus.emos");
				var emof = "<img alt='" + document.getElementsByClassName("mrp_emoticono")[i].alt + "' src='" + document.getElementsByClassName("mrp_emoticono")[i].src + "' class='mrp_emoticono'/>#@newemo@#";
				GM_setValue("scripts.merireplyplus.emos", emos + emof);
			}
		}

		function actEmos() {
			document.getElementById("config").innerHTML = "";
			if (GM_getValue("scripts.merireplyplus.emos").split("#@newemo@#").length < 2) return document.getElementById("config").innerHTML = "<b>No se encuentran emoticonos</b>";
			for (i = 0; i < GM_getValue("scripts.merireplyplus.emos").split("#@newemo@#").length; i++) {
				var emo = GM_getValue("scripts.merireplyplus.emos").split("#@newemo@#")[i];
				if (emo != undefined && emo != "" && emo != null) {
					var nodo = document.createElement("div");
					nodo.innerHTML = "<div class='mrp_c'>" + emo + "<br><a class='mrp_left'>&#9668;</a> <a class='mrp_close'>x</a> <a class='mrp_right'>&#9658;</a></div>";
					document.getElementById("config").appendChild(nodo);
					document.getElementsByClassName("mrp_close")[i].addEventListener("click", function (event) {
						if (document.getElementsByClassName("mrp_c_selec").length > 0 && document.getElementsByClassName("mrp_c_selec")[0] == event.target.parentNode) document.getElementById("mrp_anadir").innerHTML = "Añadir";
						event.target.parentNode.parentNode.removeChild(event.target.parentNode);
						setEmos();
						document.getElementById("mrp_durl").value = "";
						document.getElementById("mrp_iurl").value = "";
						actEmos();
					}, false);
					document.getElementsByClassName("mrp_left")[i].addEventListener("click", function (event) {
						if (event.target.parentNode.parentNode.previousSibling) {
							event.target.parentNode.parentNode.parentNode.insertBefore(event.target.parentNode.parentNode, event.target.parentNode.parentNode.previousSibling);
							setEmos();
						}
					}, false);
					document.getElementsByClassName("mrp_right")[i].addEventListener("click", function (event) {
						if (event.target.parentNode.parentNode.nextSibling) {
							event.target.parentNode.parentNode.parentNode.insertBefore(event.target.parentNode.parentNode, event.target.parentNode.parentNode.nextSibling.nextSibling);
							setEmos();
						}
					}, false);
					document.getElementsByClassName("mrp_emoticono")[i].addEventListener("click", function (event) {
						if (document.getElementsByClassName("mrp_c_selec").length > 0 && document.getElementsByClassName("mrp_c_selec")[0] == event.target.parentNode) {
							event.target.parentNode.setAttribute("class", "mrp_c");
							document.getElementById("mrp_durl").value = "";
							document.getElementById("mrp_iurl").value = "";
							document.getElementById("mrp_anadir").innerHTML = "Añadir";
						} else {
							document.getElementById("mrp_durl").value = event.target.src;
							document.getElementById("mrp_iurl").value = event.target.alt;
							if (document.getElementsByClassName("mrp_c_selec").length > 0) document.getElementsByClassName("mrp_c_selec")[0].setAttribute("class", "mrp_c");
							event.target.parentNode.setAttribute("class", "mrp_c_selec");
							document.getElementById("mrp_anadir").innerHTML = "Editar";
						}
					}, false);
				}
			}
		}
		actEmos();
		document.getElementById("mrp_restaurar").addEventListener("click", function () {
			if (confirm("¿Deseas restaurar todos los emoticonos por defecto? (AVISO: se borrarán todos los actuales)") == true) {
				GM_setValue("scripts.merireplyplus.emos", "<img alt=' :D ' src='http://zonaforo.meristation.com/images/smiles/risa.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' >:-\\ ' src='http://zonaforo.meristation.com/images/smiles/enfadado.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :o ' src='http://zonaforo.meristation.com/images/smiles/hala.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :? ' src='http://zonaforo.meristation.com/images/smiles/ein.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' 8D ' src='http://zonaforo.meristation.com/images/smiles/sonrisagafa.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :P ' src='http://zonaforo.meristation.com/images/smiles/lengua.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' >:( ' src='http://zonaforo.meristation.com/images/smiles/cabreado.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' X-D ' src='http://zonaforo.meristation.com/images/smiles/descojone.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' >:) ' src='http://zonaforo.meristation.com/images/smiles/malote.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :| ' src='http://zonaforo.meristation.com/images/smiles/serio.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' O:) ' src='http://zonaforo.meristation.com/images/smiles/angel.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' 8O ' src='http://zonaforo.meristation.com/images/smiles/flipao.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :] ' src='http://zonaforo.meristation.com/images/smiles/soncorchete.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :-D ' src='http://zonaforo.meristation.com/images/smiles/risa-n.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :-) ' src='http://zonaforo.meristation.com/images/smiles/contento.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :-( ' src='http://zonaforo.meristation.com/images/smiles/triste.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :-o ' src='http://zonaforo.meristation.com/images/smiles/asombro.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' 8-) ' src='http://zonaforo.meristation.com/images/smiles/gafas_1.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :lol: ' src='http://zonaforo.meristation.com/images/smiles/icon_lol.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' ;-) ' src='http://zonaforo.meristation.com/images/smiles/guinio-n.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' 8)~ ' src='http://zonaforo.meristation.com/images/smiles/babeando.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :(( ' src='http://zonaforo.meristation.com/images/smiles/depre.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' :$ ' src='http://zonaforo.meristation.com/images/smiles/sonrojo.gif' class='mrp_emoticono'/>#@newemo@#<img alt=' ^v^ ' src='http://zonaforo.meristation.com/images/smiles/gatuno.gif' class='mrp_emoticono'/>#@newemo@#");
				document.getElementById("mrp_durl").value = "";
				document.getElementById("mrp_iurl").value = "";
				document.getElementById("mrp_anadir").innerHTML = "Añadir";
				actEmos();
			}
		}, false);
		document.getElementById("mrp_anadir").addEventListener("click", function () {
			if (document.getElementById("mrp_iurl").value == "" || document.getElementById("mrp_durl").value == "") return alert("Error: no puedes dejar campos vacíos");
			if (document.getElementsByClassName("mrp_c_selec").length > 0) {
				//Modificar
				var emo = document.getElementsByClassName("mrp_c_selec")[0];
				emo.firstChild.setAttribute("src", document.getElementById("mrp_durl").value);
				emo.firstChild.setAttribute("alt", document.getElementById("mrp_iurl").value);
				setEmos();
				emo.setAttribute("class", "mrp_c");
				document.getElementById("mrp_durl").value = "";
				document.getElementById("mrp_iurl").value = "";
				document.getElementById("mrp_anadir").innerHTML = "Añadir";
			} else {
				//Añadir
				var emos = GM_getValue("scripts.merireplyplus.emos");
				var emof = "<img alt='" + document.getElementById("mrp_iurl").value + "' src='" + document.getElementById("mrp_durl").value + "' class='mrp_emoticono'/>#@newemo@#";
				GM_setValue("scripts.merireplyplus.emos", emos + emof);
				document.getElementById("mrp_durl").value = "";
				document.getElementById("mrp_iurl").value = "";
				actEmos();
			}
		}, false);
		document.getElementById("mrp_borrart").addEventListener("click", function () {
			if (confirm("¿Deseas borrar todos los emoticonos actuales?") == true) {
				GM_setValue("scripts.merireplyplus.emos", "");
				document.getElementById("mrp_durl").value = "";
				document.getElementById("mrp_iurl").value = "";
				document.getElementById("mrp_anadir").innerHTML = "Añadir";
				actEmos();
			}
		}, false);
		document.getElementById("mrp_exportar").addEventListener("click", function () {
			alert("Copia la siguiente línea de texto en un editor y guárdala en un archivo de texto para poder recuperar tus emoticonos posteriormente\n\n" + GM_getValue("scripts.merireplyplus.emos"));
		}, false);
		document.getElementById("mrp_importar").addEventListener("click", function () {
			var lt = prompt("Introduce la línea de texto que obtuviste cuando exportaste los hilos");
			GM_setValue("scripts.merireplyplus.emos", lt);
			document.getElementById("mrp_durl").value = "";
			document.getElementById("mrp_iurl").value = "";
			document.getElementById("mrp_anadir").innerHTML = "Añadir";
			actEmos();
			setEmos();
		}, false);
	} else if (web.topic() == 1 && document.getElementById("quickreply") != undefined) {
		if (document.getElementsByClassName("foros_respuestarapida").length > 0) document.getElementsByClassName("foros_respuestarapida")[0].id = "respuestarapida";
		else if (document.getElementsByClassName("post").length > 0) document.getElementsByClassName("post")[3].id = "respuesta";
		//---------------------------------------------
		web.head.append(".mrp_emoticono {cursor: pointer; padding: 0px 6px}");
		var nuevonodo = document.createElement('div');
		nuevonodo.setAttribute("id", "fastemo");
		nuevonodo.innerHTML = "<br><font size='2' face='Arial, Helvetica, sans-serif'><b><font color='#993333'>EMOTICONOS RÁPIDOS:</font></b></font><br>" +
			GM_getValue("scripts.merireplyplus.emos").split("#@newemo@#").join("") +
			"<hr color='lightgray'><font color='lightgray'>" +
			"<button alt='Negrita' id='mrp_bb'><b>B</b></button>" +
			"<button alt='Cursiva' id='mrp_bi'><i>i</i></button>" +
			"<button alt='Subrayado' id='mrp_bu'><u>u</u></button>" +
			"<button alt='Tachado' id='mrp_bs'><s>s</s></button>" +
			" | " +
			"<select id='mrp_scolor'>\
			<option selected='selected' disabled='disabled'>Color</option>\
			<option style='color:darkred' value='darkred'>Rojo oscuro</option>\
			<option style='color:red' value='red'>Rojo</option>\
			<option style='color:orange' value='orange'>Naranja</option>\
			<option style='color:brown' value='brown'>Marrón</option>\
			<option style='color:yellow' value='yellow'>Amarillo</option>\
			<option style='color:green' value='green'>Verde</option>\
			<option style='color:olive' value='olive'>Oliva</option>\
			<option style='color:cyan' value='cyan'>Cyan</option>\
			<option style='color:blue' value='blue'>Azul</option>\
			<option style='color:darkblue' value='darkblue'>Azul oscuro</option>\
			<option style='color:indigo' value='indigo'>Indigo</option>\
			<option style='color:violet' value='violet'>Violeta</option>\
			<option style='color:white' value='white'>Blanco</option>\
			<option style='color:black' value='black'>Negro</option>\
			</select>" +
			"<select id='mrp_ssize'>\
			<option selected='selected' disabled='disabled'>Tamaño</option>\
			<option value='7'>Miniatura</option>\
			<option value='9'>Pequeña</option>\
			<option value='12'>Normal</option>\
			<option value='18'>Grande</option>\
			<option value='20'>Enorme</option>\
			</select>" +
			"<select id='mrp_sposition'>\
			<option disabled='disabled' selected='selected'>Posición</option>\
			<option value='left'>Izquierda</option>\
			<option value='center'>Centrado</option>\
			<option value='right'>Derecha</option>\
			</select>" +
			" | " +
			"<button alt='Imagen' id='mrp_bimg'>Imagen</button>" +
			"<button alt='URL' id='mrp_burl'>URL</button>" +
			"<button alt='Vídeo' id='mrp_bvideo'>Video</button>" +
			"<button alt='Destripe' id='mrp_bdestripe'>Destripe</button>" +
			"<button alt='Quote' id='mrp_bquote'>Quote</button>" +
			"<button alt='Código' id='mrp_bcodigo'>Código</button>" +
			"<button alt='LaTeX' id='mrp_blatex'>LaTeX</button>" +
			"</font color><br></br>";
		nuevonodo.setAttribute("style", "background-color:white; text-align:center; width:98%; margin:0px 0px 0px 10px");
		document.getElementById("quickreply").parentNode.insertBefore(nuevonodo, document.getElementById("quickreply"));
		document.getElementsByClassName("foros_respuestarapida")[0].setAttribute("style", "width: 95% !important");
		//---------------------------------------------

		function inemo(emo, num) {
			if (!num) num = emo.length;
			var textarea = document.getElementsByName("message")[0];
			var _ini = textarea.selectionStart;
			var _fin = textarea.selectionEnd;
			var inicio = textarea.value.substr(0, _ini);
			var fin = textarea.value.substr(_fin, textarea.value.length);
			textarea.value = inicio + emo + fin;
			setCaretPosition(textarea, inicio.length + num);
		}

		function inetiv(eti, value) {
			if (!eti) return 0;
			if (!value) return 0;
			var textarea = document.getElementsByName("message")[0];
			var _ini = textarea.selectionStart;
			var _fin = textarea.selectionEnd;
			var inicio = textarea.value.substr(0, _ini);
			var fin = textarea.value.substr(_fin, textarea.value.length);
			if (_ini != _fin) {
				var entremedio = textarea.value.substr(0, _fin).substr(_ini);
				textarea.value = inicio + "[" + eti + "=" + value + "]" + textarea.value.substr(0, _fin).substr(_ini) + "[/" + eti + "]" + fin;
				setCaretPosition(textarea, inicio.length + textarea.value.substr(0, _fin).substr(_ini).length + 6 + eti.length + eti.length + value.length);
			} else {
				textarea.value = inicio + "[" + eti + "=" + value + "][/" + eti + "]" + fin;
				setCaretPosition(textarea, inicio.length + eti.length + value.length + 3);
			}
		}

		function bimg() {
			var textarea = document.getElementsByName("message")[0];
			var _ini = textarea.selectionStart;
			var _fin = textarea.selectionEnd;
			var inicio = textarea.value.substr(0, _ini);
			var fin = textarea.value.substr(_fin, textarea.value.length);
			var entremedio = textarea.value.substr(0, _fin).substr(_ini);
			if (_ini != _fin) {
				textarea.value = inicio + "[img]" + entremedio + "[/img]" + fin;
				setCaretPosition(textarea, inicio.length + entremedio.length + 11);
			} else {
				var direccion = prompt("Introduce el URL de la imagen:");
				if (direccion == null || direccion == "") return;
				textarea.value = inicio + "[img]" + direccion + "[/img]" + fin;
				setCaretPosition(textarea, inicio.length + direccion.length + 11);
			}
		}

		function burl() {
			var textarea = document.getElementsByName("message")[0];
			var _ini = textarea.selectionStart;
			var _fin = textarea.selectionEnd;
			var inicio = textarea.value.substr(0, _ini);
			var fin = textarea.value.substr(_fin, textarea.value.length);
			var entremedio = textarea.value.substr(0, _fin).substr(_ini);
			if (_ini != _fin) {
				textarea.value = inicio + "[url]" + entremedio + "[/url]" + fin;
				setCaretPosition(textarea, inicio.length + entremedio.length + 11);
			} else {
				var direccion = prompt("Introduce el URL:");
				var nombre = prompt("Introduce el nombre del enlace:");
				if (direccion == null || direccion == "") return;
				if (nombre == null || nombre == "") {
					textarea.value = inicio + "[url]" + direccion + "[/url]" + fin;
					setCaretPosition(textarea, inicio.length + direccion.length + 11);
				} else if (nombre != "" && direccion != "") {
					textarea.value = inicio + "[url=" + direccion + "]" + nombre + "[/url]" + fin;
					setCaretPosition(textarea, inicio.length + direccion.length + nombre.length + 12);
				}
			}
		}

		function bvideo() {
			var textarea = document.getElementsByName("message")[0];
			var _ini = textarea.selectionStart;
			var _fin = textarea.selectionEnd;
			var inicio = textarea.value.substr(0, _ini);
			var fin = textarea.value.substr(_fin, textarea.value.length);
			var entremedio = textarea.value.substr(0, _fin).substr(_ini);
			if (_ini != _fin) {
				entremedio = entremedio.split("feature=player_embedded&").join("");
				entremedio = entremedio.split("https").join("http");
				var tipovideo = "youtube";
				if (entremedio.indexOf("vimeo.com") != -1) tipovideo = "vimeo";
				textarea.value = inicio + "[video=" + tipovideo + "]" + entremedio + "[/video]" + fin;
				setCaretPosition(textarea, inicio.length + entremedio.length + 23);
			} else {
				var direccion = prompt("Introduce el URL del video:");
				if (direccion == null || direccion == "") return;
				direccion = direccion.split("feature=player_embedded&").join("");
				direccion = direccion.split("https").join("http");
				var tipovideo = "youtube";
				if (direccion.indexOf("vimeo.com") != -1) tipovideo = "vimeo";
				textarea.value = inicio + "[video=" + tipovideo + "]" + direccion + "[/video]" + fin;
				setCaretPosition(textarea, inicio.length + direccion.length + 23);
			}
		}

		function bquote() {
			var textarea = document.getElementsByName("message")[0];
			var _ini = textarea.selectionStart;
			var _fin = textarea.selectionEnd;
			var inicio = textarea.value.substr(0, _ini);
			var fin = textarea.value.substr(_fin, textarea.value.length);
			var entremedio = textarea.value.substr(0, _fin).substr(_ini);
			if (_ini != _fin) {
				textarea.value = inicio + "[quote]" + entremedio + "[/quote]" + fin;
				setCaretPosition(textarea, inicio.length + 8);
			} else {
				var nombre = prompt("Introduce el nombre del usuario quoteado:");
				if (!nombre) nombre = "Anónimo";
				textarea.value = inicio + "[quote=\"" + nombre + "\"][/quote]" + fin;
				setCaretPosition(textarea, inicio.length + nombre.length + 10);
			}
		}
		//---------------------------------------------
		for (i = 0; i < document.getElementsByClassName("mrp_emoticono").length; i++) {
			if (document.getElementsByClassName("mrp_emoticono")[i] != undefined) document.getElementsByClassName("mrp_emoticono")[i].addEventListener("click", function (event) {
				inemo(event.target.alt)
			}, false);
		}
		document.getElementById("mrp_bb").addEventListener("click", function () {
			ineti("b")
		}, false);
		document.getElementById("mrp_bi").addEventListener("click", function () {
			ineti("i")
		}, false);
		document.getElementById("mrp_bu").addEventListener("click", function () {
			ineti("u")
		}, false);
		document.getElementById("mrp_bs").addEventListener("click", function () {
			ineti("s")
		}, false);
		document.getElementById("mrp_bimg").addEventListener("click", bimg, false);
		document.getElementById("mrp_burl").addEventListener("click", burl, false);
		document.getElementById("mrp_bvideo").addEventListener("click", bvideo, false);
		document.getElementById("mrp_bdestripe").addEventListener("click", function () {
			ineti("spoiler")
		}, false);
		document.getElementById("mrp_bquote").addEventListener("click", bquote, false);
		document.getElementById("mrp_bcodigo").addEventListener("click", function () {
			ineti("code")
		}, false);
		document.getElementById("mrp_blatex").addEventListener("click", function () {
			ineti("tex")
		}, false);
		document.getElementById("mrp_scolor").addEventListener("change", function () {
			inetiv("color", document.getElementById("mrp_scolor").getElementsByTagName("option")[document.getElementById("mrp_scolor").selectedIndex].value);
			document.getElementById("mrp_scolor").selectedIndex = 0;
		}, false);
		document.getElementById("mrp_ssize").addEventListener("change", function () {
			inetiv("size", document.getElementById("mrp_ssize").getElementsByTagName("option")[document.getElementById("mrp_ssize").selectedIndex].value);
			document.getElementById("mrp_ssize").selectedIndex = 0;
		}, false);
		document.getElementById("mrp_sposition").addEventListener("change", function () {
			ineti(document.getElementById("mrp_sposition").getElementsByTagName("option")[document.getElementById("mrp_sposition").selectedIndex].value);
			document.getElementById("mrp_sposition").selectedIndex = 0;
		}, false);
		//---------------------------------------------

		function traducir(n) {
			if (document.getElementsByClassName("topic_body")[n] != undefined) {
				var topic = document.getElementsByClassName("topic_body")[n];
				if (topic.getElementsByClassName("celda6").length < 0) return;
				var celda = topic.getElementsByClassName("celda6")[0];
				if (celda.getElementsByTagName("a").length < 0) return;
				var citars = celda.getElementsByTagName("a");
				for (i = 0; i < citars.length; i++) {
					var citar = citars[i];
					if (citar.href.indexOf("mode=quote") != -1) {
						var citarurl = citar.href;
						GM_xmlhttpRequest({
							method: 'GET',
							url: citarurl,
							accept: "text/xml",
							overrideMimeType: "text/html; charset=ISO-8859-1",
							onerror: function () {
								alert("ERROR: se ha encontrado un problema al intentar quotear el mensaje. Posiblemente, la URL de quoteo no sea correcta. Si este problema persiste o ya ha ocurrido varias veces, repórtalo en el hilo de MeriStation++ con las URL de los hilos y el mensaje en concreto");
							},
							onload: function (response) {
								var div = document.createElement("div");
								div.innerHTML = response.responseText;
								mensaje = div.getElementsByClassName("post")[3].value;
								if (mensaje == "") return alert("ERROR: se ha encontrado un problema al intentar quotear el mensaje. Posiblemente, el mensaje sea antiguo y el sistema no deje quotearlo");
								mensaje = mensaje.split("&quot;").join("\"");
								mensaje = mensaje.split("&gt;").join(">");
								mensaje = mensaje.split("&lt;").join("<");
								mensaje = mensaje.split("&amp;").join("&");
								var textarea = document.getElementsByName("message")[0];
								var _ini = textarea.selectionStart;
								var _fin = textarea.selectionEnd;
								var inicio = textarea.value.substr(0, _ini);
								var fin = textarea.value.substr(_fin, textarea.value.length);
								textarea.value = inicio + mensaje + fin;
								setCaretPosition(textarea, inicio.length + mensaje.length);
							}
						});
					}
				}
			}
		}
		if (document.getElementsByClassName("topic_body").length > 0) {
			var topicsbody = document.getElementsByClassName("topic_body");
			web.head.append(".quoterap {margin:0px 5px 0px 0px !important; background-color:rgb(45, 45, 45); color:white !important} .quoterap:hover {background-color:rgb(241, 148, 1)}");
			for (i = 0; i < topicsbody.length; i++) {
				var topic = topicsbody[i];
				if (topic.getElementsByClassName("celda6").length > 0) {
					var celda6 = topic.getElementsByClassName("celda6")[0];
					if (celda6.getElementsByTagName("nobr").length > 0) {
						var celda6def = celda6.getElementsByTagName("nobr")[0];
						var purl = celda6.getElementsByTagName("a")[0];
						var enlace = document.createElement("a");
						enlace.setAttribute("href", "#fastemo");
						enlace.setAttribute("id", "quoterap" + i);
						if (!document.getElementById("merivisualplus")) {
							enlace.setAttribute("class", "quoterap");
							enlace.innerHTML = "Citar rápidamente";
						} else {
							enlace.innerHTML = "<img src='http://oi41.tinypic.com/98aeqx.jpg' alt='" + enlace.id + "'/>";
							enlace.style.background = "none";
							enlace.style.padding = "0px 5px 0px 0px";
						}
						celda6def.insertBefore(enlace, purl);
					}
				}
			}
		}
		for (i = -1; i < 15; i++) {
			if (document.getElementById("quoterap" + i) != undefined) document.getElementById("quoterap" + i).addEventListener("click", function (event) {
				if (!event.target.alt) {
					traducir(event.target.id.split("quoterap").join(""))
				} else {
					traducir(event.target.alt.split("quoterap").join(""))
				}
			}, false);
		}
	} else if (document.URL.indexOf("posting.php") != -1) {
		var panel = document.getElementsByClassName("mediumtext")[0].getElementsByTagName("tr")[0].getElementsByTagName("div")[0];
		var boton = document.createElement("input");
		boton.setAttribute("type", "button");
		boton.setAttribute("value", "LaTeX");
		panel.appendChild(boton);
		boton.addEventListener("click", function () {
				ineti("tex"), false;
		});
		/* Script */
	} else {
		return 1;
	}
}


script.MeriReadPlus = function () {

	/* Comprobación script */
	if (GM_getValue("scripts.merireadplus.topicsurl") == undefined || GM_getValue("scripts.merireadplus.topicsurl") == "") GM_setValue("scripts.merireadplus.topicsurl", "#");
	if (GM_getValue("scripts.merireadplus.topicsnombre") == undefined || GM_getValue("scripts.merireadplus.topicsnombre") == "") GM_setValue("scripts.merireadplus.topicsnombre", "#");
	/* Comprobación script */

	/* Script */
	if (document.getElementById("top_menu") != undefined) {
		var css = "#topiclist {width:70%; height:70%; border-radius:10px 10px; padding:10px; color:white; font-family:'Signika', 'Arial', sans-serif; background-color:black; opacity:0.95; position:fixed; top:15%; left:14%; z-index:9999} #container2 {overflow-y:auto; overflow-x:hidden; max-height:85%;} .selec {width:99%; padding:5px; cursor:pointer; -moz-transition:all 0.3s; -webkit-transition:all 0.3s} .selec:hover {background-color:white; color:black} .selec_close:hover {color:red} .selec_up:hover {color:blue} .selec_down:hover {color:blue}";
		web.head.append(css);
		var container = document.createElement("div");
		container.setAttribute("id", "topiclist");
		container.innerHTML = "<h2>Temas guardados | <a id='topiclist_borrar' title='Borrar todos los temas guardados hasta ahora' style='cursor:pointer'>Borrar todos</a> - <a id='topiclist_exportar' title='Exportar todos los temas guardados hasta ahora' style='cursor:pointer'>Exportar</a> - <a id='topiclist_importar' href='javascript:void(0)' title='Importar todos los temas guardados hasta ahora' style='cursor:pointer'>Importar</a> <a style='float:right; cursor:pointer' title='Cerrar el menú de favoritos' id='topiclist_cerrar'>Cerrar</a></h2><div id='container2'></div>";
		insertAfter(document.body, container);
		container.style.display = "none";
		var container2 = document.getElementById("container2");
		//------------------------------------------------
		function actList() {
			var urls = GM_getValue("scripts.merireadplus.topicsurl").split("#");
			var nombres = GM_getValue("scripts.merireadplus.topicsnombre").split("#");
			container2.innerHTML = "";
			if (GM_getValue("scripts.merireadplus.topicsurl") == "#") return container2.innerHTML += "<b>Ningún tema guardado</b>";
			for (i = 0; i < urls.length; i++) {
				if (nombres[i] != "") {
					var nombre = nombres[i].split("| Foro Meristation").join("").split("Ver tema - ").join("");
					var url = urls[i];
					container2.innerHTML += "<div class='selec' title='" + url + "'>" + nombre + "<div style='float:right; margin-left:3px; font-weight:bold;' class='selec_close' alt='Eliminar tema de favoritos' title='Eliminar tema de favoritos'>X</div><div style='float:right' class='selec_down' alt='Bajar tema en la lista' title='Bajar tema en la lista'>&#9660;</div><div style='float:right' class='selec_up' alt='Subir tema en la lista' title='Subir tema en la lista'>&#9650;</div></div>";
				}
			}
			for (a = 0; a < document.getElementsByClassName("selec").length; a++) {
				container2.getElementsByClassName("selec")[a].addEventListener("dblclick", function (event) {
					return location.href = event.target.title;
				}, false);
				container2.getElementsByClassName("selec_close")[a].addEventListener("click", function (event) {
					event.target.parentNode.parentNode.removeChild(event.target.parentNode);
					setList();
					actList();
				}, false);
				container2.getElementsByClassName("selec_up")[a].addEventListener("click", function (event) {
					if (event.target.parentNode.previousSibling) {
						event.target.parentNode.parentNode.insertBefore(event.target.parentNode, event.target.parentNode.previousSibling);
						setList();
					}
				}, false);
				container2.getElementsByClassName("selec_down")[a].addEventListener("click", function (event) {
					if (event.target.parentNode.nextSibling) {
						event.target.parentNode.parentNode.insertBefore(event.target.parentNode, event.target.parentNode.nextSibling.nextSibling);
						setList();
					}
				}, false);
			}
		}

		function setList() {
			GM_setValue("scripts.merireadplus.topicsurl", "#");
			GM_setValue("scripts.merireadplus.topicsnombre", "#");
			for (a = 0; a < document.getElementsByClassName("selec").length; a++) {
				var sel = document.getElementsByClassName("selec")[a];
				var db1 = GM_getValue("scripts.merireadplus.topicsurl");
				var db2 = GM_getValue("scripts.merireadplus.topicsnombre");
				GM_setValue("scripts.merireadplus.topicsurl", db1 + sel.getAttribute("title") + "#");
				GM_setValue("scripts.merireadplus.topicsnombre", db2 + sel.innerHTML.substr(0, sel.innerHTML.indexOf("<div style=")) + "#");
			}
		}

		function shList() {
			if (container.style.display == "none") {
				container.style.display = "inline";
				actList();
			} else {
				container.style.display = "none";
				setList();
			}
		}

		document.getElementById("topiclist_borrar").addEventListener("click", function () {
			if (confirm("¿Deseas borrar todos los hilos guardados hasta ahora?") == 1) {
				GM_setValue("scripts.merireadplus.topicsurl", "#");
				GM_setValue("scripts.merireadplus.topicsnombre", "#");
				actList();
			}
		}, false);

		document.getElementById("topiclist_exportar").addEventListener("click", function () {
			alert("Copia la siguiente línea de texto en un editor y guárdala en un archivo de texto para poder recuperar tus hilos posteriormente\n\n" + GM_getValue("scripts.merireadplus.topicsurl").split("*-abcdefg-*").join("") + "*-abcdefg-*" + GM_getValue("scripts.merireadplus.topicsnombre").split("*-abcdefg-*").join(""));
		}, false);

		document.getElementById("topiclist_importar").addEventListener("click", function () {
			var lt = prompt("Introduce la línea de texto que obtuviste cuando exportaste los hilos").split("Copia la siguiente línea de texto en un editor y guárdala en un archivo de texto para poder recuperar tus hilos posteriormente").join("");
			lt = lt.split("*-abcdefg-*");
			GM_setValue("scripts.merireadplus.topicsurl", lt[0]);
			GM_setValue("scripts.merireadplus.topicsnombre", lt[1]);
			actList();
			setList();
		}, false);

		document.getElementById("topiclist_cerrar").addEventListener("click", function () {
			shList();
		}, false);
		//------------------------------------------------
		var panel = document.getElementById("top_menu");
		var img1 = panel.getElementsByTagName("img")[0];
		var nodo = document.createElement("a");
		nodo.appendChild(document.createTextNode(" TEMAS GUARDADOS	 "));
		nodo.className = "gensmall";
		nodo.href = "#";
		panel.insertBefore(nodo, img1);
		nodo.addEventListener("click", shList, false);
		var nodo2 = document.createElement("img");
		nodo2.src = "http://zonaforo.meristation.com/foros/templates/MeriStation/images/m4/postit.png";
		nodo2.width = "20";
		panel.insertBefore(nodo2, nodo);
	}
	if (document.URL.indexOf("reply.php") != -1) {
		var js = "function bvideo(){var textarea=document.getElementsByName('message')[0];var _ini=textarea.selectionStart;var _fin=textarea.selectionEnd;var inicio=textarea.value.substr(0,_ini);var fin=textarea.value.substr(_fin,textarea.value.length);var entremedio=textarea.value.substr(_ini,_fin);if(_ini!=_fin){entremedio=entremedio.split('feature=player_embedded&').join('');entremedio=entremedio.split('https').join('http');var tipovideo='youtube';if(entremedio.indexOf('vimeo')!=-1)tipovideo='vimeo';if(entremedio.indexOf('meristation')!=-1)tipovideo='meristation';if(entremedio.indexOf('metacafe')!=-1)tipovideo='metacafe';if(entremedio.indexOf('google')!=-1)tipovideo='google';textarea.value=inicio+'[video='+tipovideo+']'+entremedio+'[/video]'+fin;setCaretPosition(textarea,inicio.length+entremedio.length+23)}else{var direccion=prompt('Introduce el URL del video:');if(direccion==null||direccion=='')return;direccion=direccion.split('feature=player_embedded&').join('');direccion=direccion.split('https').join('http');var tipovideo='youtube';if(direccion.indexOf('vimeo')!=-1)tipovideo='vimeo';if(direccion.indexOf('meristation')!=-1)tipovideo='meristation';if(direccion.indexOf('metacafe')!=-1)tipovideo='metacafe';if(direccion.indexOf('google')!=-1)tipovideo='google';textarea.value=inicio+'[video='+tipovideo+']'+direccion+'[/video]'+fin;setCaretPosition(textarea,inicio.length+direccion.length+23)}}";
		web.head.append(js, "script");
		document.getElementsByClassName("button")[20].setAttribute("onclick", "javascript:bvideo()");
	}
	if (web.topic() == 1) {
		var paneltop = document.getElementsByClassName("quick_response")[0];
		var nodo3 = document.createElement("a");
		var urlf = document.URL.substring(0, document.URL.indexOf(".html")) + ".html";

		function cpost() {
			if (GM_getValue("scripts.merireadplus.topicsurl").indexOf(urlf) != -1) {
				var urls = GM_getValue("scripts.merireadplus.topicsurl").split(urlf + "#").join("");
				var nombres = GM_getValue("scripts.merireadplus.topicsnombre").split(document.title + "#").join("");
				GM_setValue("scripts.merireadplus.topicsurl", urls);
				GM_setValue("scripts.merireadplus.topicsnombre", nombres);
				if (!document.getElementById("merivisualplus")) {
					nodo3.innerHTML = "Añadir tema a favoritos";
				} else {
					nodo3.innerHTML = "<img src='http://oi39.tinypic.com/2h64its.jpg' />";
					nodo3.alt = "Añadir tema a favoritos";
					nodo3.style.padding = "0px";
					nodo3.style.background = "none";
				}
			} else {
				var urls = GM_getValue("scripts.merireadplus.topicsurl");
				var nombres = GM_getValue("scripts.merireadplus.topicsnombre");
				GM_setValue("scripts.merireadplus.topicsurl", urls + urlf + "#");
				GM_setValue("scripts.merireadplus.topicsnombre", nombres + document.title + "#");
				if (!document.getElementById("merivisualplus")) {
					nodo3.innerHTML = "Eliminar tema de favoritos";
				} else {
					nodo3.innerHTML = "<img src='http://oi40.tinypic.com/rk0tnk.jpg' />";
					nodo3.alt = "Eliminar tema de favoritos";
					nodo3.style.padding = "0px";
					nodo3.style.background = "none";
				}
			}
		}
		if (GM_getValue("scripts.merireadplus.topicsurl").indexOf(urlf) != -1) {
			if (!document.getElementById("merivisualplus")) {
				nodo3.innerHTML = "Eliminar tema de favoritos";
			} else {
				nodo3.innerHTML = "<img src='http://oi40.tinypic.com/rk0tnk.jpg' />";
				nodo3.alt = "Eliminar tema de favoritos";
				nodo3.style.padding = "0px";
				nodo3.style.background = "none";
			}
		} else {
			if (!document.getElementById("merivisualplus")) {
				nodo3.innerHTML = "Añadir tema a favoritos";
			} else {
				nodo3.innerHTML = "<img src='http://oi39.tinypic.com/2h64its.jpg' />";
				nodo3.alt = "Añadir tema a favoritos";
				nodo3.style.padding = "0px";
				nodo3.style.background = "none";
			}
		}
		nodo3.addEventListener("click", cpost, true);
		nodo3.style.cursor = "pointer";
		paneltop.appendChild(nodo3);
		//------------------------------------------------
		for (i = 0; i < document.getElementsByClassName("topic_body").length; i++) {
			var mensaje = document.getElementsByClassName("topic_body")[i];
			var lineas = mensaje.innerHTML.split("<br>");
			for (e = 0; e < lineas.length; e++) {
				if (lineas[e] != undefined) {
					var linea = lineas[e];
					linea = linea.split("&nbsp;").join("");
					var bri = mensaje.getElementsByTagName("br")[e];

					//IMG
					var pointstart = linea.indexOf("[img]");
					var pointend = linea.indexOf("[/img]");
					if (pointend == -1) pointend = linea.indexOf("[/img ]");
					if (pointend == -1) pointend = null;
					if (pointstart != -1) {
						var url = linea.substring(pointstart + 5, pointend);
						var nodo = document.createElement("img");
						nodo.setAttribute("src", url);
						if (nodo.width > 700) nodo.width = 700;
						bri.parentNode.insertBefore(nodo, bri);
						mensaje.innerHTML = mensaje.innerHTML.split("[img]" + url + "[/img]").join("");
					}

					//VIMEO
					if (linea.indexOf("[video=vimeo]") != -1 && linea.indexOf("[/video]")) {
						var cord2 = linea.substring(linea.indexOf("[video=vimeo]") + 13, linea.indexOf("[/video]"));
						var cord = cord2.split("http://").join("").split("vimeo.com/").join("");
						var urlfinal = "http://player.vimeo.com/video/" + cord;
						var nodo = document.createElement("iframe");
						nodo.setAttribute("width", 600);
						nodo.setAttribute("height", 350);
						nodo.setAttribute("frameborder", 0);
						nodo.setAttribute("src", urlfinal);
						bri.parentNode.insertBefore(nodo, bri);
						mensaje.innerHTML = mensaje.innerHTML.split("[video=vimeo]" + cord2 + "[/video]").join("");
					}

					//LATEX
					if (linea.indexOf("[tex]") != -1 && linea.indexOf("[/tex]") != -1) {
						var ecuacion = linea.substring(linea.indexOf("[tex]") + 5, linea.indexOf("[/tex]"));
						var nodo = document.createElement("img");
						nodo.setAttribute("src", "http://latex.codecogs.com/gif.latex?" + ecuacion);
						bri.parentNode.insertBefore(nodo, bri);
						mensaje.innerHTML = mensaje.innerHTML.split("[tex]" + ecuacion + "[/tex]").join("");
					}
				}
			}
		}
	} else {
		return 0;
	}
	/* Script */
	return 1;
}

script.MeriBlockPlus = function () {
	var fPrefix = "scripts.meriblockplus.";
	var fKeys = ["humans.db", "users.db", "expulsed.db", "users", "humans", "expulsed", "18"];
	var fVals = ["", "", "", 0, 0, 0, 0];
	/* Comprobación script */
	function configreset(mode) {
		for (i = 0; i < fKeys.length; i++) {
			var key = fPrefix + fKeys[i];
			var aValue = GM_getValue(key);
			if (mode == 0) GM_setValue(key, fVals[i]);
			else if (aValue == undefined) GM_setValue(key, fVals[i]);
		}
	}
	configreset(1);
	//---------------------------------
	if (GM_getValue("scripts.meriblockplus.humans") == 1) {
		function actualizarBD() {
			GM_xmlhttpRequest({
				method: 'GET',
				url: "http://zonaforo.meristation.com/foros/memberlist.php?mode=joined&rtype=&order=DESC&start=0",
				accept: "text/xml",
				overrideMimeType: "text/html; charset=ISO-8859-1",
				onerror: function () {
					return alert("Error: no se ha podido actualizar la base de datos, intentelo manualmente desde el panel de control");
				},
				onload: function (response) {
					var html = response.responseText;
					var div = document.createElement("div");
					div.innerHTML = html;
					var gensmall = div.getElementsByClassName("genmed");
					for (i = 0; i < gensmall.length; i++) {
						var usuarios = GM_getValue("scripts.meriblockplus.humans.db");
						if (usuarios.indexOf(gensmall[i].innerHTML) != -1) {} else {
							if (gensmall[i].innerHTML.length < 50) GM_setValue("scripts.meriblockplus.humans.db", usuarios + "#" + gensmall[i].innerHTML);
						}
					}
				}
			});
		}
		var dia = new Date().getDay();
		if (GM_getValue("scripts.meriblockplus.humans.date") == null || GM_getValue("scripts.meriblockplus.humans.date") == undefined || GM_getValue("scripts.meriblockplus.humans.date") == "") GM_setValue("scripts.meriblockplus.humans.date", dia - 1);
		if (document.getElementById("menu_item_profile") != undefined) {
			if (GM_getValue("scripts.meriblockplus.humans.date") != dia) {
				actualizarBD();
				GM_setValue("scripts.meriblockplus.humans.date", dia);
			}
		}
	}
	/* Comprobación script */

	/* Script */
	if (document.URL.indexOf("http://zonaforo.meristation.com/foros/m++/meriblockplus") != -1) {
		document.title = "MeriStation++ vM4 :: Módulo :: MeriBlockPlus";
		web.head.append(web.head.configcss);
		document.body.innerHTML = "<div id='barra_superior'><div style='float:right; margin-top:2px'><b><a style='text-decoration:none' href='e' href='http://zonaforo.meristation.com/meristation-2.2.6-iexcl-mejora-tu-experiencia-en-zonaforo-t2141657.html'>MeriStation++ 2.2.6</a></b></div><a class='menu' href='http://zonaforo.meristation.com/foros/m++/modulos'>Módulos</a> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/merivisualplus'>MeriVisualPlus</a> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/merireplyplus'>MeriReplyPlus</a> <a class='menu_selec' href='javascript:void(0)'>MeriBlockPlus</a> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/meriloginplus'>MeriLoginPlus</a></div><br></br><h2>MeriBlockPlus</h2> <a id='but_reset' class='boton' href='javascript:void(0)'>Resetear módulo a configuración de fábrica</a> <a id='but_exportar' href='javascript:void(0)' class='boton'>Exportar</a> <a id='but_importar' href='javascript:void(0)' class='boton'>Importar</a> <br></br><br> <div id='config'><a class='check_verde' title='scripts.meriblockplus.users'>Bloquear usuarios</a><a class='check_verde' title='scripts.meriblockplus.humans'>Bloquear humanos</a><a class='check_verde' title='scripts.meriblockplus.expulsed'>Bloquear expulsados</a><a class='check_verde' title='scripts.meriblockplus.18'>Bloquear hilos +18</a><br><br><h3>Usuarios bloqueados</h3><div style='width:510px'><div style='text-align:center; background:linear-gradient(yellow, orange)' class='boton' title='0'>Vaciar base de datos</div><div class='list' title='scripts.meriblockplus.users.db'></div><div style='width:47.2%; float:left; text-align:center' class='boton_l' title='0'>Añadir usuario</div><div style='width:47.2%; float:right; text-align:center' class='boton_r' title='0'>Eliminar usuario</div></div><br></br><h3>Usuarios humanos</h3><div style='width:510px'><div style='text-align:center; background:linear-gradient(yellow, orange)' class='boton' title='1'>Vaciar base de datos</div><div class='list' title='scripts.meriblockplus.humans.db'></div><div style='width:47.2%; float:left; text-align:center' class='boton_l' title='1'>Añadir usuario</div><div style='width:47.2%; float:right; text-align:center' class='boton_r' title='1'>Eliminar usuario</div></div><br></br><h3>Lista blanca de usuarios expulsados</h3><div style='width:510px'><div style='text-align:center; background:linear-gradient(yellow, orange)' class='boton' title='2'>Vaciar base de datos</div><div class='list' title='scripts.meriblockplus.expulsed.db'></div><div style='width:47.2%; float:left; text-align:center' class='boton_l' title='2'>Añadir usuario</div><div style='width:47.2%; float:right; text-align:center' class='boton_r' title='2'>Eliminar usuario</div></div><br></br><br></br></div>";
		document.getElementById("but_reset").addEventListener("click", function () {
			if (!confirm("¿Desea resetear la configuración del módulo a su estado de fábrica?\nEsto puede solucionar errores, pero perderá toda la configuración guardada hasta ahora")) return;
			configreset(0);
			alert("El módulo ha sido reseteado con éxito.\nRecargue la página para ver la nueva configuración.");
		}, false);
		document.getElementById("but_exportar").addEventListener("click", function () {
			var e = "";
			for (i = 0; i < fKeys.length; i++) e += GM_getValue(fPrefix + fKeys[i]) + "\\";
			alert("Copie la siguiente línea de texto en un editor y guárdela en un archivo de texto para poder recuperar su configuración posteriormente\n\n" + e);
		}, false);
		document.getElementById("but_importar").addEventListener("click", function () {
			var e = prompt("Introduzca la línea de texto que obtuvo cuando exportó la configuración");
			e = e.split("\\");
			if (e.length != fKeys.length + 1) return alert("La línea de texto no es correcta");
			for (i = 0; i < fKeys.length; i++) GM_setValue(fPrefix + fKeys[i], e[i]);
			alert("La configuración ha sido restaurada con éxito. Recargue la página para visualizar la nueva configuración");
		}, false);
		aForm(document.getElementById("config"), 0);
		aList(document.getElementsByClassName("list")[0]);
		aList(document.getElementsByClassName("list")[1]);
		aList(document.getElementsByClassName("list")[2]);
		for (i = 0; i < document.getElementsByClassName("boton").length; i++) {
			if (document.getElementsByClassName("boton")[i].id == "") {
				document.getElementsByClassName("boton")[i].addEventListener("click", function (event) {
					if (confirm("¿Deseas borrar todos los usuarios agregados hasta ahora?") == 1) {
						rList(document.getElementsByClassName("list")[event.target.title], "Sin usuarios");
						aList(document.getElementsByClassName("list")[event.target.title]);
						GM_setValue("scripts.meriblockplus.humans.date", "")
					}
				}, false);
			}
		}
	} else {
		if (GM_getValue("scripts.meriblockplus.humans") || GM_getValue("scripts.meriblockplus.users")) {
			var dbtotal = "";
			if (GM_getValue("scripts.meriblockplus.users")) dbtotal += GM_getValue("scripts.meriblockplus.users.db");
			if (GM_getValue("scripts.meriblockplus.humans")) dbtotal += GM_getValue("scripts.meriblockplus.humans.db");
			dbtotal = dbtotal.split("#");
		}
		if (web.topic() == 1) {
			if (GM_getValue("scripts.meriblockplus.humans") || GM_getValue("scripts.meriblockplus.users") || GM_getValue("scripts.meriblockplus.expulsed")) {
				if (document.getElementsByClassName("topic").length > 0) {
					for (i = 0; i < document.getElementsByClassName("topic").length; i++) {
						if (document.getElementsByClassName("column1")[i] != undefined) {
							var columna = document.getElementsByClassName("column1")[i];
							var nombre = document.getElementsByClassName("msnoticiastitulo")[i].innerHTML.split("<span style=\"text-decoration:underline;\"> </span>").join("_");
							var cuerpom = document.getElementsByClassName("topic_body")[i];
							if (columna.getElementsByTagName("strong")[0] != undefined) {
								var rango = columna.getElementsByTagName("strong")[0];
								if (GM_getValue("scripts.meriblockplus.humans")) {
									//Humanos
									if (rango.innerHTML == "Humano") {
										if (nombre.innerHTML != "Noticias Meristation") {
											cuerpom.innerHTML = "<br><br><center><img src='http://zonaforo.meristation.com/foros/templates/MeriStation/images/m4/icon_pm.png' alt='Mensaje bloqueado' title='Mensaje bloqueado' /><br><font color='red'>¡Alerta!</font> Mensaje bloqueado (<b>Usuario humano</b>)</center>";
											nombre.innerHTML = "<i><font color='red'>¡Bloqueado!</font color></i>";
											if (GM_getValue("scripts.meriblockplus.humans.db").indexOf(nombre.innerHTML) != -1) GM_setValue("scripts.meriblockplus.humans.db", nombres + "#" + nombre.innerHTML);
										}
									}
								}
							}
							if (GM_getValue("scripts.meriblockplus.users") || GM_getValue("scripts.meriblockplus.humans")) {
								//Bloqueado
								for (a = 0; a < dbtotal.length; a++) {
									if (dbtotal[a] != undefined || dbtotal[a] != null || dbtotal[a] != "") {
										if (nombre == dbtotal[a]) {
											cuerpom.innerHTML = "<br><br><center><img src='http://zonaforo.meristation.com/foros/templates/MeriStation/images/m4/icon_pm.png' alt='Mensaje bloqueado' title='Mensaje bloqueado' /><br><font color='red'>¡Alerta!</font> Mensaje bloqueado (<b>Usuario bloqueado/humano</b>)</center>";
											nombre.innerHTML = "<i><font color='red'>¡Bloqueado!</font color></i>";
										}
									}
								}
							}
							if (GM_getValue("scripts.meriblockplus.expulsed")) {
								//Expulsados
								if (columna.getElementsByTagName("div")[4].innerHTML == "USUARIO CANCELADO" || columna.getElementsByClassName("profile_basics")[0].nextSibling.nextSibling.innerHTML.indexOf("EXPULSADO") != -1) {
									var nombres = GM_getValue("scripts.meriblockplus.expulsed.db").split("#");
									var is = false;
									for (e = 0; e < nombres.length; e++) {
										if (nombres[e] != undefined && nombre == nombres[e]) {
											is = true;
											break;
										}
									}
									if (is == false) document.getElementsByClassName("topic_body")[i].innerHTML = "<br><br><center><img id='bdesblock' src='http://zonaforo.meristation.com/foros/templates/MeriStation/images/m4/icon_pm.png' alt='Mensaje bloqueado' title='Mensaje bloqueado' /><br><i>¡Alerta! Mensaje eliminado (<b>Usuario expulsado/cancelado</b>)</i></center>";
								}
							}
						}
					}
				}
			}
			//-------------------------------------------------------
			if (GM_getValue("scripts.meriblockplus.humans") || GM_getValue("scripts.meriblockplus.users")) {
				//Quotes
				if (document.getElementsByClassName("genmed").length > 0) {
					for (i = 0; i < document.getElementsByClassName("genmed").length; i++) {
						var genmedhtml = document.getElementsByClassName("genmed")[i];
						var genmed = genmedhtml.innerHTML.split("<b>").join("").split("</b>").join("");
						if (genmed != "*** Mensaje Borrado ***") {
							for (a = 0; a < dbtotal.length; a++) {
								if (dbtotal[a] != "" && genmed == dbtotal[a] + " escribió:") genmedhtml.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("quote")[0].innerHTML = "<center><font color='red'><i><b>¡Alerta!</b></i></font color> quote bloqueado</center>";
							}
						}
					}
				}
			}
		}
		//-------------------------------------------------------
		if (web.forum() == 1) {
			if (GM_getValue("scripts.meriblockplus.humans") || GM_getValue("scripts.meriblockplus.users") || GM_getValue("scripts.meriblockplus.18")) {
				if (document.getElementsByClassName("foros_zonaforo2").length > 0) {
					if (document.getElementsByClassName("breadcrumbs")[0].innerHTML.indexOf("Mercadillo") == -1) {
						for (i = 0; i < document.getElementsByClassName("foros_zonaforo2").length; i++) {
							var titulo = document.getElementsByClassName("foros_zonaforo2")[i];
							var usuario = titulo.nextSibling.nextSibling.nextSibling;
							if (GM_getValue("scripts.meriblockplus.humans") || GM_getValue("scripts.meriblockplus.users")) {
								//Bloqueados
								for (a = 0; a < dbtotal.length; a++) {
									if (dbtotal[a] != "") {
										if (dbtotal[a] == usuario.innerHTML) {
											titulo.innerHTML = "<b><font color='red'>¡Alerta!</font color> Tema bloqueado</b>";
											usuario.innerHTML = "<i><font color='red'>¡Bloqueado!</font color></i>";
										}
									}
								}
							}
							if (GM_getValue("scripts.meriblockplus.18") && titulo.innerHTML.indexOf("+18") != -1) titulo.innerHTML = "<b><font color='red'>¡Alerta!</font color> Tema bloqueado</b>";
						}
					}
				}
			}
		}
	}
	/* Script */
	return 1;
}

script.MeriLoginPlus = function () {

	/* Comprobación script */
	if (!GM_getValue("scripts.meriloginplus.nick")) GM_setValue("scripts.meriloginplus.nick", "No definido");
	if (!GM_getValue("scripts.meriloginplus.pass")) GM_setValue("scripts.meriloginplus.pass", "No definido");
	/* Comprobación script */

	/* Script */
	if (document.URL.indexOf("http://zonaforo.meristation.com/foros/m++/meriloginplus") != -1) {
		document.title = "MeriStation++ vM4 :: Módulo :: MeriLoginPlus";
		web.head.append(web.head.configcss);
		document.body.innerHTML = "<div id='barra_superior'> <div style='float:right; margin-top:2px'> <b><a style='text-decoration:none' href='e' href='http://zonaforo.meristation.com/meristation-2.2.6-iexcl-mejora-tu-experiencia-en-zonaforo-t2141657.html'>MeriStation++ 2.2.6</a></b> </div> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/modulos'>Módulos</a> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/merivisualplus'>MeriVisualPlus</a> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/merireplyplus'>MeriReplyPlus</a> <a class='menu' href='http://zonaforo.meristation.com/foros/m++/meriblockplus'>MeriBlockPlus</a> <a class='menu_selec' href='javascript:void(0)'>MeriLoginPlus</a> </div> <br> </br> <h2>MeriLoginPlus</h2> <div id='config'> <h3>Datos de conexión</h3> <table> <tr> <td style='text-align:right'>Usuario: </td> <td><input type='text' class='input_text' title='scripts.meriloginplus.nick'/></td> </tr> <tr> <td>Contraseña: </td> <td><input type='password' class='input_text' title='scripts.meriloginplus.pass'/></td> </tr> </table> <div class='boton' id='but_actualizar' style='width:330px;text-align:center'>Guardar datos</div> </div>";
		aForm(document.getElementById("config"), 0);
		document.getElementById("but_actualizar").addEventListener("click", function () {
			aForm(document.getElementById("config"), 1);
			alert("Datos de conexión actualizados con éxito");
		}, false);
	} else if ((document.getElementById("menu_item_login") != undefined)) {
		if (GM_getValue("scripts.meriloginplus.nick") == "No definido" || GM_getValue("scripts.meriloginplus.pass") == "No definido") return 0;
		GM_xmlhttpRequest({
			method: 'GET',
			url: "http://club.meristation.com/user/login",
			accept: "text/xml",
			overrideMimeType: "text/html; charset=ISO-8859-1",
			onload: function (response) {
				var html = response.responseText;
				var div = document.createElement("div");
				div.innerHTML = html;
				var loginform = div.getElementsByClassName("user-login-form")[0]
				for (i = 0; i < loginform.getElementsByTagName("input").length; i++) {
					if (loginform.getElementsByTagName("input")[i].name == "form_build_id") {
						var id = loginform.getElementsByTagName("input")[i].value;
					}
				}
				if (!id) return 0;
				GM_xmlhttpRequest({
					method: 'POST',
					url: "http://club.meristation.com/user/login",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: "name=" + GM_getValue("scripts.meriloginplus.nick") + "&pass=" + GM_getValue("scripts.meriloginplus.pass") + "&form_build_id=" + id + "&form_id=user_login&op=Iniciar+sesión",
					accept: "text/xml",
					overrideMimeType: "text/html; charset=ISO-8859-1",
				});
			}
		});
	} else {
		return 0;
	}
	/* Script */
	return 1;
}
/* Lanzador */

/* Ejecuciones */

function loadAll() {
	if (GM_getValue("scripts.merivisualplus") == 1) script.MeriVisualPlus();
	if (GM_getValue("scripts.meriblockplus") == 1) script.MeriBlockPlus();
	if (GM_getValue("scripts.merireadplus") == 1) script.MeriReadPlus();
	if (GM_getValue("scripts.merireplyplus") == 1) script.MeriReplyPlus();
	if (GM_getValue("scripts.meriloginplus") == 1) script.MeriLoginPlus();
	return 1;
}
setTimeout(loadAll, 1);
/* Ejecuciones */
