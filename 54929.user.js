// ==UserScript==
// @name		Tuenti's hack Jss
// @namespace		Jss
// @description		Script para personalizar el Tuenti by Jss
// @include		http://*.tuenti.com/*
// @exclude		http://*.tuenti.com/?m=login
// @version		8.7
// ==/UserScript==

//-------------------------------------------------------------------------------------------//
//YA NO HACE FALTA MODIFICAR EL SCRIPT PARA CONFIGURARLO, USA EL MENÚ DE LA PARTE SUPERIOR DEL TUENTI.
//AUNQUE EL CÓDIGO ESTÉ ALGUNAS PARTES DEL CÓDIGO CON MI NOMBRE, TODOS LOS DERECHOS SON PARA DJMeu y COLABORADORES.
//-------------------------------------------------------------------------------------------//

version='8.7';
scripturl='http://userscripts.org/scripts/source/54929.user.js';
scripturl2='http://userscripts.org/scripts/show/54929';
scriptname="Tuenti's hack Jss";
//-------------------------------------------------------------------------------------------//

GM_registerMenuCommand(scriptname+ ': Buscar actualizaciones', update);
GM_registerMenuCommand(scriptname+ ': Ir a la p\u00e1gina del script', scriptpage);
function update(evt){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/54929.meta.js',
		onload: function(resp) {
			resp.responseText.match(/@version\s+([\d.]+)/);
			updatedversion = RegExp.$1;
			if (version <= updatedversion){
				if (version != updatedversion){
					if (confirm("Se ha encontrado una nueva versi\u00f3n de "+scriptname+" (v" +updatedversion+ "). ¿Desea actualizar?")) {
						document.location.href = scripturl
					}
				}else{
					alert('Tienes la \u00faltima actualizaci\u00f3n disponible (v' +version+ ')')
				};
			}else{
				alert('Tienes la \u00faltima actualizaci\u00f3n disponible (v' +version+ ')')
			};
		}
	});	
}
function scriptpage(evt) document.location.href = scripturl2;
if (GM_getValue('checkboxautoactualizar') == true){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/54929.meta.js',
		onload: function(resp) {
			resp.responseText.match(/@version\s+([\d.]+)/);
			updatedversion = RegExp.$1;
			if (version <= updatedversion){
				if (version != updatedversion){
					if (confirm("Se ha encontrado una nueva versi\u00f3n de "+scriptname+" (v" +updatedversion+ "). ¿Desea actualizar?")) {
						document.location.href = scripturl
					}
				}
			}
		}
	});
};
if (GM_getValue('configurado') != version){
	GM_setValue('checkboxautoactualizar', true);
	GM_setValue('checkboxreloj', false);
	GM_setValue('radiofondo', true);
	GM_setValue('radiofondo1', false);
	GM_setValue('radiofondo2', false);
	GM_setValue('radiofondo3', false);
	GM_setValue('radiofondo3v2', false);
	GM_setValue('radiofondo4', false);
	GM_setValue('radiofondo5', false);
	GM_setValue('radiofondo6', false);
	GM_setValue('radiofondop', false);
	GM_setValue('radiorediseño', true);
	GM_setValue('radiorediseño1', false);
	GM_setValue('radiorediseño2', false);
	GM_setValue('radiorediseño3', false);
	GM_setValue('radiorediseño4', false);
	GM_setValue('radiorediseño5', false);
	GM_setValue('radiorediseño6', false);
	GM_setValue('radiorediseño7', false);
};
//-------------------------------------------------------------------------------------------//

caja = document.createElement("div");
caja.setAttribute("id","caja");

botonmenufoto = document.createElement("button");
botonmenufoto.appendChild(document.createTextNode("Menú de foto"));
botonmenufoto.setAttribute("onclick",function(){menufoto()});
botonmenufoto.addEventListener("click", function(){menufoto()}, true);

botonradio = document.createElement("button");
botonradio.appendChild(document.createTextNode("Radio"));
botonradio.setAttribute("onclick",function(){Radio()});
botonradio.addEventListener("click", function(){Radio()}, true);

botonmenu = document.createElement("button");
botonmenu.appendChild(document.createTextNode("Configuración"));
botonmenu.setAttribute("onclick",function(){Menu()});
botonmenu.addEventListener("click", function(){Menu()}, true);

caja.appendChild(botonmenufoto);
caja.appendChild(botonradio);
caja.appendChild(botonmenu);
document.getElementById("css_monitors").appendChild(caja);

menu = document.createElement("div");
menu.setAttribute("id","menu");
menu.setAttribute("style","padding: 5px; position: absolute; display: block; z-index: 50; background-color: #64A3CF !important;");
menu.setAttribute("class","container");
menu.innerHTML += '<br><center><p style="font-size:x-large;"><b><a href="http://radiotuenti.zobyhost.com/"><img src="http://img442.imageshack.us/img442/3590/21122785.png"></a></b></p><br><br><p style="font-size:large;"><b>Script estable <hr> </b><a href="http://userscripts.org/scripts/show/54929">http://userscripts.org/scripts/show/54929</a></p></center><br><br>'+scriptname+' v'+version+' --> <a href="http://userscripts.org/scripts/show/54929">Ir a la página del script</a><hr>';

checkboxautoactualizar = document.createElement("input");
checkboxautoactualizar.setAttribute("type","checkbox");
checkboxautoactualizar.setAttribute("id","checkboxautoactualizar");
if (GM_getValue('checkboxautoactualizar') == true) checkboxautoactualizar.setAttribute("checked","1");
menu.appendChild(checkboxautoactualizar);
menu.innerHTML += 'Buscar actualizaciones automáticamente<br>';

checkboxreloj = document.createElement("input");
checkboxreloj.setAttribute("type","checkbox");
checkboxreloj.setAttribute("id","checkboxreloj");
if (GM_getValue('checkboxreloj') == true) checkboxreloj.setAttribute("checked","1");
menu.appendChild(checkboxreloj);
menu.innerHTML += 'Mostrar reloj flash<br>';

menu.innerHTML += '<hr><h1>Fondos:</h1><br>';
radiofondo = document.createElement("input");
radiofondo.setAttribute("type","radio");
radiofondo.setAttribute("name","radiofondo")
radiofondo.setAttribute("id","radiofondo");
if (GM_getValue('radiofondo') == true) radiofondo.setAttribute("checked","1");
menu.appendChild(radiofondo);
menu.innerHTML += 'Fondo normal<br>';

radiofondo2 = document.createElement("input");
radiofondo2.setAttribute("type","radio");
radiofondo2.setAttribute("name","radiofondo")
radiofondo2.setAttribute("id","radiofondo2");
if (GM_getValue('radiofondo2') == true) {
	radiofondo2.setAttribute("checked","1");
	document.body.style.backgroundImage = "url(http://img36.imageshack.us/img36/3783/fondoweg.jpg)";
};
menu.appendChild(radiofondo2);
menu.innerHTML += 'Fondo "Nuevo Tuenti rediseño sutil" de <b>jayjayjay_92</b> v1.27<br>';

radiofondo3 = document.createElement("input");
radiofondo3.setAttribute("type","radio");
radiofondo3.setAttribute("name","radiofondo")
radiofondo3.setAttribute("id","radiofondo3");
if (GM_getValue('radiofondo3') == true) {
	radiofondo3.setAttribute("checked","1");
	document.body.style.backgroundImage = "url(http://www.dominiotemporal.es/fondos_web/texturas/JoseRico/08_basicas.gif)";
};
menu.appendChild(radiofondo3);
menu.innerHTML += 'Fondo "tuentiblue" de <b>ardo99</b><br>';

radiofondo3v2 = document.createElement("input");
radiofondo3v2.setAttribute("type","radio");
radiofondo3v2.setAttribute("name","radiofondo")
radiofondo3v2.setAttribute("id","radiofondo3v2");
if (GM_getValue('radiofondo3v2') == true) {
	radiofondo3v2.setAttribute("checked","1");
	(function() {
	var css = "body {background: url(http://www.minijuegos.com/imagenes/fondomj.gif) repeat-x !important}";
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}
	})();
};
menu.appendChild(radiofondo3v2);
menu.innerHTML += 'Fondo "tuentiblue v2" de <b>ardo99</b><br>';

radiofondo4 = document.createElement("input");
radiofondo4.setAttribute("type","radio");
radiofondo4.setAttribute("name","radiofondo")
radiofondo4.setAttribute("id","radiofondo4");
if (GM_getValue('radiofondo4') == true) {
	radiofondo4.setAttribute("checked","1");
	(function() {
	var css = "body {background: url(http://i39.tinypic.com/fdd1g5.jpg) repeat-x #000000 !important}";
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}
	})();
};
menu.appendChild(radiofondo4);
menu.innerHTML += 'Fondo "TuentiStyle" de <b>draco1989</b> v1.2<br>';

radiofondo5 = document.createElement("input");
radiofondo5.setAttribute("type","radio");
radiofondo5.setAttribute("name","radiofondo")
radiofondo5.setAttribute("id","radiofondo5");
if (GM_getValue('radiofondo5') == true) {
	radiofondo5.setAttribute("checked","1");
	document.getElementsByTagName('body')[0].setAttribute("style", "background-color: #ABABAB");
};
menu.appendChild(radiofondo5);
menu.innerHTML += 'Fondo "Likern" de <b>Shiver</b><br>';

radiofondo6 = document.createElement("input");
radiofondo6.setAttribute("type","radio");
radiofondo6.setAttribute("name","radiofondo")
radiofondo6.setAttribute("id","radiofondo6");
if (GM_getValue('radiofondo6') == true) {
	radiofondo6.setAttribute("checked","1");
	document.getElementsByTagName('body')[0].setAttribute("style", "background-color: #C1009A");
};
menu.appendChild(radiofondo6);
menu.innerHTML += 'Fondo "Pinxil" de <b>Shiver</b><br>';

radiofondo7 = document.createElement("input");
radiofondo7.setAttribute("type","radio");
radiofondo7.setAttribute("name","radiofondo")
radiofondo7.setAttribute("id","radiofondo7");
if (GM_getValue('radiofondo7') == true) {
	radiofondo7.setAttribute("checked","1");
	document.getElementsByTagName('body')[0].setAttribute("style", "background-color: #64A3CF");
};
menu.appendChild(radiofondo7);
menu.innerHTML += 'Fondo "LoomySkin" de <b>Shiver</b><br>';

radiofondop = document.createElement("input");
radiofondop.setAttribute("type","radio");
radiofondop.setAttribute("name","radiofondo")
radiofondop.setAttribute("id","radiofondop");
if (GM_getValue('radiofondop') == true) {
	radiofondop.setAttribute("checked","1");
	document.body.style.backgroundImage = "url(http://srv0110-07.oak1.imeem.com/g/p/a29385b55e5208eff4ce4b61da16e234_raw.gif)";
	
};
menu.appendChild(radiofondop);
menu.innerHTML += 'Fondo panorámico de ciudad<br>';

radiofondo1 = document.createElement("input");
radiofondo1.setAttribute("type","radio");
radiofondo1.setAttribute("name","radiofondo")
radiofondo1.setAttribute("id","radiofondo1");
if (GM_getValue('radiofondo1') == true) {
	radiofondo1.setAttribute("checked","1");
	document.body.style.backgroundImage = "url("+GM_getValue('textfondo')+")";
};
menu.appendChild(radiofondo1);
menu.innerHTML += 'Fondo personalizado:  Ruta: ';

menu.innerHTML += '<input type="text" id="textfondo" size="32" name="textfondo" onclick="javascript:this.focus();this.select();"/><br>';
if (GM_getValue('textfondo') == undefined) GM_setValue('textfondo',"");

menu.innerHTML += '<hr><h1>Diseños:</h1><br>';
formrediseño = document.createElement("form");
formrediseño.setAttribute("name","formrediseño");

radiorediseño = document.createElement("input");
radiorediseño.setAttribute("type","radio");
radiorediseño.setAttribute("name","radiorediseño")
radiorediseño.setAttribute("id","radiorediseño");
if (GM_getValue('radiorediseño') == true) radiorediseño.setAttribute("checked","1");
formrediseño.appendChild(radiorediseño);
formrediseño.innerHTML += 'Diseño normal<br>';

radiorediseño1 = document.createElement("input");
radiorediseño1.setAttribute("type","radio");
radiorediseño1.setAttribute("name","radiorediseño")
radiorediseño1.setAttribute("id","radiorediseño1");
if (GM_getValue('radiorediseño1') == true) radiorediseño1.setAttribute("checked","1");
formrediseño.appendChild(radiorediseño1);
formrediseño.innerHTML += 'Diseño "Nuevo Tuenti rediseño sutil"<br>';

radiorediseño2 = document.createElement("input");
radiorediseño2.setAttribute("type","radio");
radiorediseño2.setAttribute("name","radiorediseño")
radiorediseño2.setAttribute("id","radiorediseño2");
if (GM_getValue('radiorediseño2') == true) radiorediseño2.setAttribute("checked","1");
formrediseño.appendChild(radiorediseño2);
formrediseño.innerHTML += 'Diseño "tuentiblue".<br>';

radiorediseño3 = document.createElement("input");
radiorediseño3.setAttribute("type","radio");
radiorediseño3.setAttribute("name","radiorediseño")
radiorediseño3.setAttribute("id","radiorediseño3");
if (GM_getValue('radiorediseño3') == true) radiorediseño3.setAttribute("checked","1");
formrediseño.appendChild(radiorediseño3);
formrediseño.innerHTML += 'Diseño "TuentiStyle".<br>';

radiorediseño4 = document.createElement("input");
radiorediseño4.setAttribute("type","radio");
radiorediseño4.setAttribute("name","radiorediseño")
radiorediseño4.setAttribute("id","radiorediseño4");
if (GM_getValue('radiorediseño4') == true) radiorediseño4.setAttribute("checked","1");
formrediseño.appendChild(radiorediseño4);
formrediseño.innerHTML += 'Diseño "TuentiSkin".<br>';

radiorediseño5 = document.createElement("input");
radiorediseño5.setAttribute("type","radio");
radiorediseño5.setAttribute("name","radiorediseño")
radiorediseño5.setAttribute("id","radiorediseño5");
if (GM_getValue('radiorediseño5') == true) radiorediseño5.setAttribute("checked","1");
formrediseño.appendChild(radiorediseño5);
formrediseño.innerHTML += 'Diseño "Likern".<br>';

radiorediseño6 = document.createElement("input");
radiorediseño6.setAttribute("type","radio");
radiorediseño6.setAttribute("name","radiorediseño")
radiorediseño6.setAttribute("id","radiorediseño6");
if (GM_getValue('radiorediseño6') == true) radiorediseño6.setAttribute("checked","1");
formrediseño.appendChild(radiorediseño6);
formrediseño.innerHTML += 'Diseño "Pinxil".<br>';

radiorediseño7 = document.createElement("input");
radiorediseño7.setAttribute("type","radio");
radiorediseño7.setAttribute("name","radiorediseño")
radiorediseño7.setAttribute("id","radiorediseño7");
if (GM_getValue('radiorediseño7') == true) radiorediseño7.setAttribute("checked","1");
formrediseño.appendChild(radiorediseño7);
formrediseño.innerHTML += 'Diseño "LoomySkin".<br>';

menu.appendChild(formrediseño);
menu.innerHTML += '<hr><h1>Radio:</h1><br>La radio ha sido creada y recopilada por los creadores de Tuentis Hack original y <b>Jss</b>.<br><br><b>Las radios son:</b><br>Radio "Tuenti" by Jss<br>Europa FM<br>RTVE<br>Cadena 100<br>Onda Cero<br>Kiss FM<br>Radio "Quien improvisa" - 24 horas de RAP<br>';
menu.innerHTML += '<hr><h1>Todos los creditos para los creadores de Tuentis Hack y Jss por ser este una modificación del original</h1><br>';

botonaceptar = document.createElement("button");
botonaceptar.appendChild(document.createTextNode("Guardar"));
botonaceptar.setAttribute("onclick",function(){aceptar()});
botonaceptar.addEventListener("click", function(){aceptar()}, true);
menu.appendChild(botonaceptar);

botoncancelar = document.createElement("button");
botoncancelar.appendChild(document.createTextNode("Cancelar"));
botoncancelar.setAttribute("onclick",function(){cancelar()});
botoncancelar.addEventListener("click", function(){cancelar()}, true);
menu.appendChild(botoncancelar);

label = document.createElement("label");
label.innerHTML = '  ';
menu.appendChild(label);

botonactualizar = document.createElement("button");
botonactualizar.appendChild(document.createTextNode("Actualización manual"));
botonactualizar.setAttribute("onclick",function(){update()});
botonactualizar.addEventListener("click", function(){update()}, true);
menu.appendChild(botonactualizar);

//-------------------------------------------------------------------------------------------//

function menufoto(){
	if (document.getElementById("menufoto") == null) {
		var menufoto = document.createElement("div");
		menufoto.setAttribute("id","menufoto");

		botondescargar = document.createElement("button");
		botondescargar.appendChild(document.createTextNode("Descargar"));
		botondescargar.setAttribute("onclick",function(){Descargar()});
		botondescargar.addEventListener("click", function(){Descargar()}, true);
		menufoto.appendChild(botondescargar);

		botonabrirfoto = document.createElement("button");
		botonabrirfoto.appendChild(document.createTextNode("Abrir"));
		botonabrirfoto.setAttribute("onclick",function(){abrirfoto()});
		botonabrirfoto.addEventListener("click", function(){abrirfoto()}, true);
		menufoto.appendChild(botonabrirfoto);

		botonmostrarurl = document.createElement("button");
		botonmostrarurl.appendChild(document.createTextNode("Mostrar URL de la foto"));
		botonmostrarurl.setAttribute("onclick",function(){mostrarurl()});
		botonmostrarurl.addEventListener("click", function(){mostrarurl()}, true);
		menufoto.appendChild(botonmostrarurl);

		botonfotofondo = document.createElement("button");
		botonfotofondo.appendChild(document.createTextNode("Poner foto como fondo"));
		botonfotofondo.setAttribute("onclick",function(){fotofondo()});
		botonfotofondo.addEventListener("click", function(){fotofondo()}, true);
		menufoto.appendChild(botonfotofondo);

		botoncerrarmenufoto = document.createElement("button");
		botoncerrarmenufoto.appendChild(document.createTextNode("Cerrar menu de foto"));
		botoncerrarmenufoto.setAttribute("onclick",function(){cerrarmenufoto()});
		botoncerrarmenufoto.addEventListener("click", function(){cerrarmenufoto()}, true);
		menufoto.appendChild(botoncerrarmenufoto);

		function cerrarmenufoto(){
			document.getElementById("css_monitors").removeChild(menufoto);
		};

		document.getElementById("css_monitors").appendChild(menufoto);

		function mostrarurl(){
			if (document.getElementById('photo_image') == null){
				alert('Primero entra en la foto');
			}else{
				if (document.getElementById("divurl") == null) {
					var divurl = document.createElement("div");
					divurl.setAttribute("id","divurl");

					cuadrourl = document.createElement("input");
					cuadrourl.setAttribute("id","cuadrourl");
					cuadrourl.setAttribute("readonly","readonly");
					cuadrourl.setAttribute("onclick","javascript:this.focus();this.select();");
					cuadrourl.setAttribute("value",document.getElementById('photo_image').src);
					divurl.appendChild(cuadrourl);

					botonurl = document.createElement("input");
					botonurl.setAttribute("type","submit");
					botonurl.setAttribute("name","Botonpasarpagina");
					botonurl.setAttribute("value",'Cerrar');
					botonurl.setAttribute("onclick",function(){nomostrarurl()});
					botonurl.addEventListener("click", function(){nomostrarurl()}, true);
					divurl.appendChild(botonurl);

					menufoto.appendChild(divurl);
					document.getElementById('cuadrourl').select()
				};
				function nomostrarurl() menufoto.removeChild(divurl);
			};
		};
	};
};
function abrirfoto(){
	if (document.getElementById('photo_image') == null){
		alert('Primero entra en la foto');
	}else{
		document.location.href = document.getElementById('photo_image').src;
	};
};
function Descargar(){
	if (document.getElementById('photo_image') == null){
		alert('Primero entra en la foto');
	}else{
		document.location.href = document.getElementById('photo_image').src + "?download";
	};
};
function Menu(){
	canvas=document.getElementById('canvas');
	canvas.parentNode.insertBefore(menu, canvas);
	document.getElementById('textfondo').value = GM_getValue('textfondo');
};
function aceptar(){
	GM_setValue('checkboxautoactualizar', document.getElementById('checkboxautoactualizar').checked);
	GM_setValue('checkboxreloj', document.getElementById('checkboxreloj').checked);
	GM_setValue('radiofondo', document.getElementById('radiofondo').checked);
	GM_setValue('radiofondo1', document.getElementById('radiofondo1').checked);
	GM_setValue('radiofondo2', document.getElementById('radiofondo2').checked);
	GM_setValue('radiofondo3', document.getElementById('radiofondo3').checked);
	GM_setValue('radiofondo3v2', document.getElementById('radiofondo3v2').checked);
	GM_setValue('radiofondo4', document.getElementById('radiofondo4').checked);
	GM_setValue('radiofondo5', document.getElementById('radiofondo5').checked);
	GM_setValue('radiofondo6', document.getElementById('radiofondo6').checked);
	GM_setValue('radiofondo7', document.getElementById('radiofondo7').checked);
	GM_setValue('radiofondop', document.getElementById('radiofondop').checked);
	GM_setValue('radiorediseño', document.getElementById('radiorediseño').checked);
	GM_setValue('radiorediseño1', document.getElementById('radiorediseño1').checked);
	GM_setValue('radiorediseño2', document.getElementById('radiorediseño2').checked);
	GM_setValue('radiorediseño3', document.getElementById('radiorediseño3').checked);
	GM_setValue('radiorediseño4', document.getElementById('radiorediseño4').checked);
	GM_setValue('radiorediseño5', document.getElementById('radiorediseño5').checked);
	GM_setValue('radiorediseño6', document.getElementById('radiorediseño6').checked);
	GM_setValue('radiorediseño7', document.getElementById('radiorediseño7').checked);
	GM_setValue('textfondo', document.getElementById('textfondo').value);
	GM_setValue('configurado', version);
	alert('Su configuraci\u00f3n se ha guardado');
	location.reload();
};
function cancelar() document.getElementById('canvas').parentNode.removeChild(menu);
//Autor:	Jss
setTimeout(function(){asd()},5000);
function asd(){
	visitas = document.getElementsByClassName("views")[0].firstChild.innerHTML;
	visitas2 = parseInt(visitas.replace(",",""));
	nuevasvisitas = visitas2 - GM_getValue('visitas');

	if (nuevasvisitas == visitas2){
		nuevasvisitas = 0;
	};
	GM_setValue('visitas', visitas2);
	if (nuevasvisitas != "NaN"){
		document.getElementsByClassName("views")[0].firstChild.innerHTML=visitas+ "<font color=red> (+" +nuevasvisitas+ ")</font>";
	};
	reloj()
};
function reloj(){
	reloj = document.createElement("div");
	reloj.setAttribute("id","caja");
	reloj.setAttribute("style","margin-left: 843px; position: fixed; display: block; z-index: 42; background-color: transparent !important;");
	reloj.innerHTML = '<table border="0"><tr><td><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><embed src="http://www.crearunaweb.net/complementos/reloj13.swf" wmode="transparent" type="application/x-shockwave-flash" height="100" width="100"><param name=wmode value=transparent /></embed></td></tr><tr><td align="center">';
	if (GM_getValue('checkboxreloj') == true) document.getElementById("css_monitors").appendChild(reloj, document.getElementsByClassName("settings")[0].firstChild);
};
//-------------------------------------------------------------------------------------------//
function Radio(){
	if (document.getElementById("radio") == null) {
		var radio = document.createElement("div");
		radio.setAttribute("id","radio");
		radio.setAttribute("style","padding: 5px; position: absolute; display: block; z-index: 50; background-color: #64A3CF !important;");
		radio.setAttribute("class","container");

		radioradio = document.createElement("input");
		radioradio.setAttribute("type","radio");
		radioradio.setAttribute("name","radioradio")
		radioradio.setAttribute("id","radioradio");
		radioradio.setAttribute("checked","1");
		radio.appendChild(radioradio);
		radio.innerHTML += '  Radio "Tuenti" by <b>Jss</b><br>';

		radioradiorap = document.createElement("input");
		radioradiorap.setAttribute("type","radio");
		radioradiorap.setAttribute("name","radioradio")
		radioradiorap.setAttribute("id","radioradiorap");
		radio.appendChild(radioradiorap);
		radio.innerHTML += '  Radio "Quien improvisa" - 24 horas de RAP<br>';

		radioradio1 = document.createElement("input");
		radioradio1.setAttribute("type","radio");
		radioradio1.setAttribute("name","radioradio")
		radioradio1.setAttribute("id","radioradio1");
		radio.appendChild(radioradio1);
		radio.innerHTML += '  Radio "Europa FM"<br>';

		radioradio5 = document.createElement("input");
		radioradio5.setAttribute("type","radio");
		radioradio5.setAttribute("name","radioradio")
		radioradio5.setAttribute("id","radioradio5");
		radio.appendChild(radioradio5);
		radio.innerHTML += '  Radio "RTVE"<br>';

		radioradio6 = document.createElement("input");
		radioradio6.setAttribute("type","radio");
		radioradio6.setAttribute("name","radioradio")
		radioradio6.setAttribute("id","radioradio6");
		radio.appendChild(radioradio6);
		radio.innerHTML += '  Radio "Cadena 100"<br>';

		radioradio7 = document.createElement("input");
		radioradio7.setAttribute("type","radio");
		radioradio7.setAttribute("name","radioradio")
		radioradio7.setAttribute("id","radioradio7");
		radio.appendChild(radioradio7);
		radio.innerHTML += '  Radio "Onda Cero"<br>';

		radioradio8 = document.createElement("input");
		radioradio8.setAttribute("type","radio");
		radioradio8.setAttribute("name","radioradio")
		radioradio8.setAttribute("id","radioradio8");
		radio.appendChild(radioradio8);
		radio.innerHTML += '  Radio "Kiss FM"<br>';

		radioradiop = document.createElement("input");
		radioradiop.setAttribute("type","radio");
		radioradiop.setAttribute("name","radioradio")
		radioradiop.setAttribute("id","radioradiop");
		radio.appendChild(radioradiop);
		radio.innerHTML += '  Radio personalizada:  Ruta: <input type="text" id="textradio" size="32" onclick="javascript:this.focus();this.select();"/><br>';
		if (GM_getValue('textradio') == undefined) GM_setValue('textradio',"");

		botoniniciar = document.createElement("button");
		botoniniciar.appendChild(document.createTextNode("Iniciar radio"));
		botoniniciar.setAttribute("onclick",function(){iniciarradio()});
		botoniniciar.addEventListener("click", function(){iniciarradio()}, true);
		radio.appendChild(botoniniciar);

		botonnoiniciar = document.createElement("button");
		botonnoiniciar.appendChild(document.createTextNode("Cancelar"));
		botonnoiniciar.setAttribute("onclick",function(){noiniciarradio()});
		botonnoiniciar.addEventListener("click", function(){noiniciarradio()}, true);
		radio.appendChild(botonnoiniciar);
		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(radio, canvas);
		document.getElementById('textradio').value = GM_getValue('textradio');
	};
};
function iniciarradio(){
	GM_setValue('textradio', document.getElementById('textradio').value);
	if(document.getElementById('radioradio').checked == true) radiosrc="http://radiotuenti.zobyhost.com/reproduce.wpl";
	if(document.getElementById('radioradiorap').checked == true) radiosrc="http://sc3.radiointernet.es/tunein.php/winners/playlist.asx";
	if(document.getElementById('radioradio1').checked == true) radiosrc="http://antena3.stream.flumotion.com/antena3/europafm.mp3.m3u";
	if(document.getElementById('radioradio5').checked == true) radiosrc="http://www.rtve.es/rne/audio/r1live.asx";
	if(document.getElementById('radioradio6').checked == true) radiosrc="http://cadena100.cope.stream.flumotion.com/cope/cadena100.asf.asx";
	if(document.getElementById('radioradio7').checked == true) radiosrc="http://ondacerolivewm.fplive.net/ondacerowmlive-live/oc_convencional";
	if(document.getElementById('radioradio8').checked == true) radiosrc="http://kissfm.en-directo.com/kissfm.asx";
	if(document.getElementById('radioradiop').checked == true) radiosrc=document.getElementById('textradio').value;

	canvas.parentNode.removeChild(document.getElementById('radio'));
	if(document.getElementById("liradio") != null) document.getElementsByClassName("settings")[0].removeChild(document.getElementById("liradio"));
	liradio=document.createElement("li");
	liradio.setAttribute("id","liradio");

	document.getElementsByClassName("settings")[0].insertBefore(liradio, document.getElementsByClassName("settings")[0].firstChild);
	liradio.innerHTML += '<EMBED type="application/x-mplayer2" pluginspage="http://www.microsoft.com/windows/windowsmedia/en/Download/default.asp?tcode=9#location2" src="'+radiosrc+'" height="30" width="215" ShowGotoBar="0" TransparentAtStart="1" ShowControls="1" AutoStart="1" AllowScan="0" ShowAudioControls="0" EnableContextMenu="0" ShowPositionControls="0" ShowTracker="0" howStatusBar="0" AnimationAtStart="0" bbclient=0></EMBED>';
};
function noiniciarradio() canvas.parentNode.removeChild(document.getElementById('radio'));

//-------------------------------------------------------------------------------------------//

if (GM_getValue('radiorediseño1') == true){
//Script "Nuevo Tuenti rediseño sutil"
//Autor:	jayjayjay_92
//Homepage	http://userstyles.org/styles/17626
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); .main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:3px;} .header, #subheader{margin:0 !important;} .actions a, .itemActions a, .itemActions span{margin-right:4px !important;} .container, #latest_photos, .blockedFriends, #banned_photos .body{ background: #FFF !important; border: solid #ACD0EE !important; border-width: 0 1px 1px 1px !important; } .item, #basic_information_form { background: #FFF !important; border: 1px solid #ACD0EE !important; margin-top:-1px !important; } .setting { border: solid #ACD0EE !important; border-width: 0px 1px 1px 1px !important; } .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:1px solid #ACD0EE !important;} #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;} div.loading {right:-40px !important;} div .note { background:#fbfbfb !important; border:#fff !important; } button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message { -moz-border-radius:5px !important; -webkit-border-radius:5px !important; } #lightbox_overlay{background:#000 !important;} #ban_photo_link{width:100% !important;} .item:hover, #latest_photos:hover, .mediaInfo:hover { background:#f9f9f9 !important; } #top_videos .mediaInfo:hover{background:transparent !important} .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{ border: solid #ACD0EE 1px !important; -moz-border-radius-topleft:5px !important; -moz-border-radius-topright:5px !important; -webkit-border-radius-topleft:5px !important; -webkit-border-radius-topright:5px !important; } .item, #latest_photos .body{ padding:8px !important; } td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#FFF !important;} .photoTag{opacity:0.6 !important;} .mod .body{border-top:0px solid #FFF !important;} r .pager.light{ padding-top:10px !important; padding-bottom:10px !important;} #networks .body, .login{ border: 1px solid #ACD0EE !important; margin-top:-1px !important;} form fieldset.formbox { -moz-border-radius:0 !important; -webkit-border-radius:0 !important; margin-top:-1px !important;} .mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting {border:none !important;} ul.subMenu a, ul.subMenu li, ul#options a{color:#888 !important;} div.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;} .loginCanvas #login{margin-top:-1px !important;} #latest_photos h3 { border: solid #ACD0EE !important; border-width: 1px 0 0 0 !important; } .mod.c .actions .dropDown{margin-top:1px !important;} img[src=\"http://estaticosak1.tuenti.com/layout/web2/images/save.gif\"]{display:none !important;} form.eventChoices fieldset .option{margin-left:-1px !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
};
//-------------------------------------------------------------------------------------------//

if (GM_getValue('radiorediseño2') == true){
//Script	"tuentiblue"
//Autor:	ardo99
//Homepage	http://userstyles.org/styles/18507
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); #main_info{background: !important; color:black !important;} .views{color:transparent!important;} .body,.item {background:#ACD0Ee url()center center repeat-x !important; color:black !important; border:#000 b2b4 0px solid !important} .body a,.item a{color:black!important; text-decoration:none !important; font-weight: bold !important} .body a:hover,.item a:hover{color: grey ! important; background-color:!important} .body a:visited,.item a:visited{color:black!important} .main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:3px;} .header, #subheader{margin:0 !important;} .actions a, .itemActions a, .itemActions span{margin-right:4px !important;} .container, #latest_photos, .blockedFriends, #banned_photos .body{ background: transparent!important; border: solid transparent !important; border-width: 0 1px 1px 1px !important; } .item, #basic_information_form { background: #ACD0Ee !important; border: 5px solid #acd0ee !important; margin-top:-1px !important; } .setting { border: solid #ACD0EE!important; border-width: 0px 1px 1px 1px !important; } .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:1px solid #ACD0EE !important;} #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;} div.loading {right:-40px !important;} div .note { background: #fbfbfb !important; border: #fff!important; } button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message { -moz-border-radius:20px !important;border: 5px red!important; -webkit-border-radius:20px !important; } #lightbox_overlay{background:#000!important;} #ban_photo_link{width:100% !important;} .item:hover, #latest_photos:hover, .mediaInfo:hover { background:#f9f9f9 !important; } #top_videos .mediaInfo:hover{background: transparent !important} .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{ border: transparent 3px !important; -moz-border-radius-topleft:20px !important; -moz-border-radius-topright:20px !important; -webkit-border-radius-topleft:20px !important; -webkit-border-radius-topright:20px !important; } .item, #latest_photos .body{ padding:3px !important; } td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;} .photoTag{opacity:0.6 !important;} .mod .body{border-top:0px solid #FFF !important;} r .pager.light{ padding-top:10px !important; padding-bottom:10px !important;} #networks .body, .login{ border: 1px solid #ACD0EE !important; margin-top:-1px !important;} form fieldset.formbox { -moz-border-radius:5 !important; -webkit-border-radius:5 !important; margin-top:-1px !important;} .mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting {border:none !important;} ul.subMenu a, ul.subMenu li, ul#options a{color:grey !important;} div.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;} .loginCanvas #login{margin-top:-1px !important;} #latest_photos h3 { border: solid transparent!important; border-width: 0px 0 0 0 !important; } .mod.c .actions .dropDown{margin-top:1px !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
};
//-------------------------------------------------------------------------------------------//

//Script	"TuentiStyle"
//Autor:	draco1989
//Homepage	http://userstyles.org/styles/18119
if (GM_getValue('radiorediseño3') == true){
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Generales*/ #main_info{background: #D2E5F1 !important; color:black !important;} .views{color:black !important;} .item {background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg)center center repeat-x !important; color:white !important; border:#00b2b4 1px solid !important} .body{background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg) top repeat-x !important; color:white !important; border:#00b2b4 1px solid !important} .body a,.item a{color:#dfdfdf!important; text-decoration:none !important; font-weight:bold !important} .body a:hover,.item a:hover{color:#000!important; background-color:#D2E5F1 !important} .body a:visited,.item a:visited{color:#dfdfdf!important} .viewMore{background: #D2E5F1 !important; color:black !important} .viewMore a,.viewMore a:visited{color:black !important} /* Vista foto*/ #breadcrumbs a{color:#dfdfdf!important; text-decoration:none !important; font-weight:bold !important} #breadcrumbs a:hover{color:#000!important; background-color:#D2E5F1 !important} #breadcrumbs a:visited{color:#dfdfdf!important; text-decoration:none !important; font-weight:bold !important} .breadcrumbs,.breadcrumbs>.arrow,.breadcrumbs>.count{color:white !important;} /* Perfil*/ #friends>.body {background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg)top center repeat-x !important; color:white !important; border:#00b2b4 1px solid !important} blockquote p{color:#C0DCEB !important} blockquote {background:#4000c0 !important} .informationList>dl>dt,.date {color:black !important} blockquote>.author>.date {color:#00ffa0 !important} #blog>.item {background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg)center top repeat-x !important; color:white !important; border:#00b2b4 1px solid !important}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
};
//-------------------------------------------------------------------------------------------//

//Script	"TuentiSkin"
//Autor:	alarico750
//Homepage	http://userstyles.org/styles/19064
if (GM_getValue('radiorediseño4') == true){
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Generales*/} #main_info{background: #666666 !important; color:black !important;} .views{color:black !important;} .item {background:#C0C0C0 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png)center center repeat-x !important; color:#666666 !important; border:#015EB4 1px solid !important} .body{background:#C0C0C0 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png) top repeat-x !important; color:#666666!important; border:#015EB4 1px solid !important} .body a,.item a{color:#666666!important; text-decoration:none !important; font-weight:bold !important} .body a:hover,.item a:hover{color:#000!important; background-color:#666666 !important} .body a:visited,.item a:visited{color:#666666!important} .viewMore{background: #666666 !important; color:black !important} .viewMore a,.viewMore a:visited{color:black !important} /* Vista foto*/ #breadcrumbs a{color:#666666!important; text-decoration:none !important; font-weight:bold !important} #breadcrumbs a:hover{color:#000!important; background-color:#666666 !important} #breadcrumbs a:visited{color:#666666!important; text-decoration:none !important; font-weight:bold !important} .breadcrumbs,.breadcrumbs>.arrow,.breadcrumbs>.count{color:white !important;} /* Perfil*/ #friends>.body {background:#C0C0C0 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png)top center repeat-x !important; color:#666666 !important; border:#0976B4 1px solid !important} blockquote p{color:#C0C0C0 !important} blockquote {background:#666666 !important} .informationList>dl>dt,.date {color:black !important} blockquote>.author>.date {color:#666666 !important} #blog>.item {background:#666666 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png)center top repeat-x !important; color:#666666 !important; border:#00b2b4 1px solid !important}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
};
//-------------------------------------------------------------------------------------------//

//Script	"Likern"
//Autor:	ShiveR
//Homepage	http://www.ultra-zone.es/
if (GM_getValue('radiorediseño5') == true){
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Generales*/ #main_info{background: #D1D1D1 !important; color:black; border:#000000 1px solid !important} .views{color:black !important;} .item {background:#D1D1D1 url()center center repeat-x !important; color:#D1D1D1 !important; border:#000000 1px solid !important} .body{background:#D1D1D1 url() top repeat-x !important; color:#D1D1D1!important; border:#000000 1px solid !important} .body a,.item a{color:#000000!important; text-decoration:none !important; font-weight:bold !important} .body a:hover,.item a:hover{color:#000!important; background-color:#00000 !important} .body a:visited,.item a:visited{color:#000000!important} .viewMore{background: #666666 !important; color:black !important} .viewMore a,.viewMore a:visited{color:black !important} /* Vista foto*/ #breadcrumbs a{color:#666666!important; text-decoration:none !important; font-weight:bold !important} #breadcrumbs a:hover{color:#000!important; background-color:#666666 !important} #breadcrumbs a:visited{color:#666666!important; text-decoration:none !important; font-weight:bold !important} .breadcrumbs,.breadcrumbs>.arrow,.breadcrumbs>.count{color:white !important;} /* Perfil*/ #friends>.body {background:#FF0000 url()top center repeat-x !important; color:#666666 !important; border:#0976B4 1px solid !important} blockquote p{color:#ffffff !important} blockquote {background:#666666 !important} .informationList>dl>dt,.date {color:black !important} blockquote>.author>.date {color:#666666 !important} #blog>.item {background:#666666 url(#D1D1D1)center top repeat-x !important; color:#666666 !important; border:#00b2b4 1px solid !important}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
};
//-------------------------------------------------------------------------------------------//

//Script	"Pinxil"
//Autor:	ShiveR
//Homepage	http://ultra-zone.es
if (GM_getValue('radiorediseño6') == true){
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); #main_info{background: #FFBCF2 !important; color:white !important; border:#790061 3px solid !important} .views{color:black !important;} .item {background:#FFD0F6 !important; color:white !important; border:#790061 1px solid !important} .body{background:#FFD0F6!important; color:white !important; border:#790061 3px solid !important} .body a,.item a{color:#000000!important; text-decoration:none !important; font-weight:bold !important} .actions span {color: #753f93 !important;}a,h2,h3,h4,h5,li,a small {color: #5c3273 !important;} #pageHeader a {color: #ede3f3 !important;}#pageHeader a:hover {color: #fff !important;} .searchBar {background-color: #f8f4fa !important;border-color: #e0ceea !important;} ul#sections li a.active {background-color: #e5d5ed !important;border-color: #d0b5df !important;} ul#sections a {border-color: #e5d5ed !important;}ul#sections a:hover  .dpBody {border-color: #b488cc !important;} }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
};
//-------------------------------------------------------------------------------------------//

//Script	"LoomySkin"
//Autor:	ShiveR
//Homepage	http://ultra-zone.es
if (GM_getValue('radiorediseño7') == true){
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); #main_info{background: #64A3CF !important; color:white !important; border:#EBEBEB 3px solid !important} .views{color:black !important;} .item {background:#509BD0 !important; color:white !important; border:#ffffff 1px solid !important} .body{background:#64A3CF!important; color:white !important; border:#EBEBEB 3px solid !important} .body a,.item a{color:#00446E!important; text-decoration:none !important; font-weight:bold !important} .actions span {color: #753f93 !important;}a,h2,h3,h4,h5,li,a small {color: #282549 !important;} #pageHeader a {color: #ede3f3 !important;}#pageHeader a:hover {color: #000000 !important;} .searchBar {background-color: #000000 !important;border-color: #4780AC !important;} ul#sections li a.active {background-color: #2270AC !important;border-color: #ffffff !important;} ul#sections a {border-color: #e5d5ed !important;}ul#sections a:hover  .dpBody {border-color: #b488cc !important;} }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
};