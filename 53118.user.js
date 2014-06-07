// ==UserScript==
// @name		Tuenti's hack
// @namespace		DJMeu
// @description		Script para personalizar el Tuenti
// @include		http://*.tuenti.com/*
// @exclude		http://*.tuenti.com/?m=login
// @version		3.6.1
// ==/UserScript==

//-------------------------------------------------------------------------------------------//
//YA NO HACE FALTA MODIFICAR EL SCRIPT PARA CONFIGURARLO, USA EL MENÚ DE LA PARTE SUPERIOR DEL TUENTI.
//-------------------------------------------------------------------------------------------//

version='3.6.1';
scripturl='http://userscripts.org/scripts/source/43374.user.js';
scripturl2='http://userscripts.org/scripts/show/43374';
scriptname="Tuenti's hack";
//-------------------------------------------------------------------------------------------//

GM_registerMenuCommand(scriptname+ ': Buscar actualizaciones', update);
GM_registerMenuCommand(scriptname+ ': Ir a la p\u00e1gina del script', scriptpage);
function update(evt){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/43374.meta.js',
		onload: function(resp) {
			resp.responseText.match(/@version\s+([\d.]+)/);
			updatedversion = RegExp.$1;
			if (version == updatedversion) {
					alert('Tienes la \u00faltima actualizaci\u00f3n disponible (v' +version+ ')')
			} else {
				if (version != updatedversion){
					if (confirm("Se ha encontrado una nueva versi\u00f3n de "+scriptname+" (v" +updatedversion+ "). ¿Desea actualizar?")) {
						document.location.href = scripturl
					}
				}
			}
		}
	});	
}
function scriptpage(evt) document.location.href = scripturl2;
if (GM_getValue('checkboxautoactualizar') == true){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/43374.meta.js',
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
	GM_setValue('checkboxmenufoto', false);
	GM_setValue('radiorediseño', true);
	GM_setValue('radiorediseño1', false);
	GM_setValue('radiorediseño2', false);
	GM_setValue('radiorediseño3', false);
	GM_setValue('radiofondo', true);
	GM_setValue('radiofondo1', false);
	GM_setValue('radiofondo2', false);
	GM_setValue('radiofondo3', false);
	GM_setValue('radiofondo4', false);
	GM_setValue('checkboxfondofijo', false);
};
//-------------------------------------------------------------------------------------------//

caja = document.createElement("div");
caja.setAttribute("id","caja");

botonmenufoto = document.createElement("button");
botonmenufoto.appendChild(document.createTextNode("Menu de Fotos"));
botonmenufoto.setAttribute("name","botonmenufoto");
botonmenufoto.setAttribute("value",'Menú de foto');
botonmenufoto.setAttribute("onclick",function(){menufoto()});
botonmenufoto.addEventListener("click", function(){menufoto()}, true);


botonmenu = document.createElement("button");
botonmenu.appendChild(document.createTextNode("Configuracion"));
botonmenu.setAttribute("name","botonmenu");
botonmenu.setAttribute("value",'Configuración');
botonmenu.setAttribute("onclick",function(){Menu()});
botonmenu.addEventListener("click", function(){Menu()}, true);

botonpasarpagina = document.createElement("button");
botonpasarpagina.appendChild(document.createTextNode("Ir a la pagina"));
botonpasarpagina.setAttribute("name","botonpasarfotos");
botonpasarpagina.setAttribute("value",'Ir a la página');
botonpasarpagina.setAttribute("onclick",function(){Menupasarpagina()});
botonpasarpagina.addEventListener("click", function(){Menupasarpagina()}, true);

caja.appendChild(botonmenufoto);
caja.appendChild(botonpasarpagina);
caja.appendChild(botonmenu);
document.getElementById("css_monitors").appendChild(caja);

menu = document.createElement("div");
menu.setAttribute("id","menu");
menu.setAttribute("width","960px");
menu.setAttribute("position","relative");
menu.setAttribute("margin","0 auto");
menu.setAttribute("text-align","left");
menu.setAttribute("class","container");
menu.innerHTML += '<hr><h1>'+scriptname+' v'+version+':</h1><br>';

checkboxautoactualizar = document.createElement("input");
checkboxautoactualizar.setAttribute("type","checkbox");
checkboxautoactualizar.setAttribute("id","checkboxautoactualizar");
if (GM_getValue('checkboxautoactualizar') == true) checkboxautoactualizar.setAttribute("checked","1");
menu.appendChild(checkboxautoactualizar);
menu.innerHTML += 'Buscar actualizaciones automáticamente (No recomendado para conexiones MUY lentas)<br>';

checkboxmenufoto = document.createElement("input");
checkboxmenufoto.setAttribute("type","checkbox");
checkboxmenufoto.setAttribute("id","checkboxmenufoto");
if (GM_getValue('checkboxmenufoto') == true) checkboxmenufoto.setAttribute("checked","1");
menu.appendChild(checkboxmenufoto);
menu.innerHTML += 'Menú de foto siempre abierto<br><a href="http://userscripts.org/scripts/show/43374">Ir a la página del script</a><hr><h1>Fondos:</h1><br>';

radiofondo = document.createElement("input");
radiofondo.setAttribute("type","radio");
radiofondo.setAttribute("name","radiofondo")
radiofondo.setAttribute("id","radiofondo");
if (GM_getValue('radiofondo') == true) radiofondo.setAttribute("checked","1");
menu.appendChild(radiofondo);
menu.innerHTML += 'Fondo normal<br>';

radiofondo1 = document.createElement("input");
radiofondo1.setAttribute("type","radio");
radiofondo1.setAttribute("name","radiofondo")
radiofondo1.setAttribute("id","radiofondo1");
if (GM_getValue('radiofondo1') == true) {
	radiofondo1.setAttribute("checked","1");
	document.body.style.backgroundImage = "url("+GM_getValue('textfondo')+")";
};
menu.appendChild(radiofondo1);
menu.innerHTML += 'Fondo personalizado: URL: ';

menu.innerHTML += '<input type="text" id="textfondo" size="32" name="textfondo"/><br>';
if (GM_getValue('textfondo') == undefined) GM_setValue('textfondo',"");

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

radiofondo4 = document.createElement("input");
radiofondo4.setAttribute("type","radio");
radiofondo4.setAttribute("name","radiofondo")
radiofondo4.setAttribute("id","radiofondo4");
if (GM_getValue('radiofondo4') == true) {
	radiofondo4.setAttribute("checked","1");
	(function() {
	var css = "body {background: url(http://i39.tinypic.com/fdd1g5.jpg) repeat-x #000000 !important}";
	if (GM_getValue('checkboxfondofijo') == true) css = "body {background: url(http://i39.tinypic.com/fdd1g5.jpg) repeat-x fixed #000000 !important}";
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
	document.body.style.backgroundImage = "url(http://srv0110-07.oak1.imeem.com/g/p/a29385b55e5208eff4ce4b61da16e234_raw.gif)";
};
menu.appendChild(radiofondo5);
menu.innerHTML += 'Fondo panorámico de ciudad<br>';

checkboxfondofijo = document.createElement("input");
checkboxfondofijo.setAttribute("type","checkbox");
checkboxfondofijo.setAttribute("id","checkboxfondofijo");
if (GM_getValue('checkboxfondofijo') == true) {
	checkboxfondofijo.setAttribute("checked","1");
	document.body.style.backgroundAttachment='fixed';
};
menu.appendChild(checkboxfondofijo);
menu.innerHTML += 'Fondo fijo<br>';

menu.innerHTML += '<hr><font color="#FFF" size="+2">Diseños:</font<br>';
formrediseño = document.createElement("form");
formrediseño.setAttribute("name","formrediseño");

radiorediseño = document.createElement("input");
radiorediseño.setAttribute("type","radio");
radiorediseño.setAttribute("name","radiorediseño")
radiorediseño.setAttribute("id","radiorediseño");
if (GM_getValue('radiorediseño') == true) radiorediseño.setAttribute("checked","1");
formrediseño.appendChild(radiorediseño);
formrediseño.innerHTML += '<font color="#FFF">Diseño normal<br>';

radiorediseño1 = document.createElement("input");
radiorediseño1.setAttribute("type","radio");
radiorediseño1.setAttribute("name","radiorediseño")
radiorediseño1.setAttribute("id","radiorediseño1");
if (GM_getValue('radiorediseño1') == true) radiorediseño1.setAttribute("checked","1");
formrediseño.appendChild(radiorediseño1);
formrediseño.innerHTML += '<font color="#FFF">Diseño "Nuevo Tuenti rediseño sutil" de <b>jayjayjay_92</b> v1.27<br><a href="http://userstyles.org/styles/17626">Ir a la página del script</a>.</font><br>';

radiorediseño2 = document.createElement("input");
radiorediseño2.setAttribute("type","radio");
radiorediseño2.setAttribute("name","radiorediseño")
radiorediseño2.setAttribute("id","radiorediseño2");
if (GM_getValue('radiorediseño2') == true) radiorediseño2.setAttribute("checked","1");
formrediseño.appendChild(radiorediseño2);
formrediseño.innerHTML += '<font color="#FFF">Diseño "tuentiblue" de <b>ardo99</b>.<br><a href="http://userstyles.org/styles/18583>Ir a la página del script</a>.</font><br>';

radiorediseño3 = document.createElement("input");
radiorediseño3.setAttribute("type","radio");
radiorediseño3.setAttribute("name","radiorediseño")
radiorediseño3.setAttribute("id","radiorediseño3");
if (GM_getValue('radiorediseño3') == true) radiorediseño3.setAttribute("checked","1");
formrediseño.appendChild(radiorediseño3);
formrediseño.innerHTML += '<font color="#FFF">Diseño "TuentiStyle" de <b>draco1989</b> v1.2.<br><a href="http://userstyles.org/styles/19279">Ir a la página del script</a>.</font><br>';
menu.appendChild(formrediseño);

menu.innerHTML += '<hr><h1>PasarFotos:</h1><br>PasarFotos de <b>To_Net</b> te permitirá ir a cualquier foto de las que estés viendo sin tener que pasar una a una o tener que pasarte por el album para pasarlas mas rapido.<br><img src="http://s3.amazonaws.com/uso_ss/icon/51461/thumb.bmp?1245063114" width="5%"><br><a href="http://userscripts.org/scripts/show/51461">Ir a la página del script</a>.</font><hr>';
botonaceptar = document.createElement("input");
botonaceptar.setAttribute("type","submit");
botonaceptar.setAttribute("name","botonaceptar");
botonaceptar.setAttribute("value",'Guardar');
botonaceptar.setAttribute("onclick",function(){aceptar()});
botonaceptar.addEventListener("click", function(){aceptar()}, true);
menu.appendChild(botonaceptar);

botoncancelar = document.createElement("input");
botoncancelar.setAttribute("type","submit");
botoncancelar.setAttribute("name","botoncancelar");
botoncancelar.setAttribute("value",'Cancelar');
botoncancelar.setAttribute("onclick",function(){cancelar()});
botoncancelar.addEventListener("click", function(){cancelar()}, true);
menu.appendChild(botoncancelar);

label = document.createElement("label");
label.innerHTML = '  ';
menu.appendChild(label);

botonactualizar = document.createElement("input");
botonactualizar.setAttribute("type","submit");
botonactualizar.setAttribute("name","botonactualizar");
botonactualizar.setAttribute("value",'Buscar actualizaciones');
botonactualizar.setAttribute("onclick",function(){update()});
botonactualizar.addEventListener("click", function(){update()}, true);
menu.appendChild(botonactualizar);
if (GM_getValue('checkboxmenufoto') == true) menufoto();
//-------------------------------------------------------------------------------------------//

function menufoto(){
	if (document.getElementById("menufoto") == null) {
		var menufoto = document.createElement("div");
		menufoto.setAttribute("id","menufoto");

		botondescargar = document.createElement("button");
		botondescargar.appendChild(document.createTextNode("Descargar"));
		botondescargar.setAttribute("name","botondescargar");
		botondescargar.setAttribute("value",'Descargar foto');
		botondescargar.setAttribute("onclick",function(){Descargar()});
		botondescargar.addEventListener("click", function(){Descargar()}, true);
		menufoto.appendChild(botondescargar);		

		botonampliar = document.createElement("button");
		botonampliar.appendChild(document.createTextNode("Ampliar Foto"));
		botonampliar.setAttribute("name","botonampliar");
		botonampliar.setAttribute("value",'Ampliar foto');
		botonampliar.setAttribute("onclick",function(){ampliar()});
		botonampliar.addEventListener("click", function(){ampliar()}, true);
		menufoto.appendChild(botonampliar);

		botonabrirfoto = document.createElement("button");
		botonabrirfoto.appendChild(document.createTextNode("Abrir"));
		botonabrirfoto.setAttribute("name","botonabrirfoto");
		botonabrirfoto.setAttribute("value",'Abrir foto');
		botonabrirfoto.setAttribute("onclick",function(){abrirfoto()});
		botonabrirfoto.addEventListener("click", function(){abrirfoto()}, true);
		menufoto.appendChild(botonabrirfoto);

		botonpasarfotos = document.createElement("button");
		botonpasarfotos.appendChild(document.createTextNode("Ir a Foto Numero"));
		botonpasarfotos.setAttribute("name","botonpasarfotos");
		botonpasarfotos.setAttribute("value",'Ir a la foto');
		botonpasarfotos.setAttribute("onclick",function(){Pasarfotos()});
		botonpasarfotos.addEventListener("click", function(){Pasarfotos()}, true);
		menufoto.appendChild(botonpasarfotos);

		botonmostrarurl = document.createElement("button");
		botonmostrarurl.appendChild(document.createTextNode("Mostrar URL de la foto"));
		botonmostrarurl.setAttribute("onclick",function(){mostrarurl()});
		botonmostrarurl.addEventListener("click", function(){mostrarurl()}, true);
		menufoto.appendChild(botonmostrarurl); 



		botoncerrarmenufoto = document.createElement("button");
		botoncerrarmenufoto.appendChild(document.createTextNode("Cerrar"));
		botoncerrarmenufoto.setAttribute("name","botoncerrarmenufoto");
		botoncerrarmenufoto.setAttribute("value",'Cerrar');
		botoncerrarmenufoto.setAttribute("onclick",function(){cerrarmenufoto()});
		botoncerrarmenufoto.addEventListener("click", function(){cerrarmenufoto()}, true);
		menufoto.appendChild(botoncerrarmenufoto);
		function cerrarmenufoto(){
			document.getElementById("css_monitors").removeChild(menufoto);
			GM_setValue('checkboxmenufoto', false);
		};

		document.getElementById("css_monitors").appendChild(menufoto);

		function mostrarurl(){
			if (document.getElementById('photo_image') == null){
				alert('No se ha encontrado ninguna foto');
			}else{
				if (document.getElementById("divurl") == null) {
					var divurl = document.createElement("div");
					divurl.setAttribute("id","divurl");

					cuadrourl = document.createElement("input");
					cuadrourl.setAttribute("id","cuadrourl")
					cuadrourl.setAttribute("maxlength",90);
					cuadrourl.setAttribute("value",document.getElementById('photo_image').src);
					divurl.appendChild(cuadrourl);

					botonurl = document.createElement("button");
					botonurl.appendChild(document.createTextNode("Cerrar"));
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
		alert('No se ha encontrado ninguna foto');
	}else{
		document.location.href = document.getElementById('photo_image').src;
	};
};
function Descargar(){
	if (document.getElementById('photo_image') == null){
		alert('No se ha encontrado ninguna foto');
	}else{
		document.location.href = document.getElementById('photo_image').src + "?download";
	};
};
function ampliar(){
	if (document.getElementById('photo_image') == null){
		alert('No se ha encontrado ninguna foto');
	}else{
		document.getElementById('photo_and_tags').setAttribute("style","");
		document.getElementById('photo_image').setAttribute("width","2000%");
	};
};
function Menu(){
	caja.appendChild(menu);
	document.getElementById('textfondo').value = GM_getValue('textfondo');
};
function aceptar(){
	GM_setValue('checkboxautoactualizar', document.getElementById('checkboxautoactualizar').checked);
	GM_setValue('checkboxmenufoto', document.getElementById('checkboxmenufoto').checked);
	GM_setValue('radiofondo', document.getElementById('radiofondo').checked);
	GM_setValue('radiofondo1', document.getElementById('radiofondo1').checked);
	GM_setValue('radiofondo2', document.getElementById('radiofondo2').checked);
	GM_setValue('radiofondo3', document.getElementById('radiofondo3').checked);
	GM_setValue('radiofondo4', document.getElementById('radiofondo4').checked);
	GM_setValue('radiofondo5', document.getElementById('radiofondo5').checked);
	GM_setValue('checkboxfondofijo', document.getElementById('checkboxfondofijo').checked);
	GM_setValue('radiorediseño', document.getElementById('radiorediseño').checked);
	GM_setValue('radiorediseño1', document.getElementById('radiorediseño1').checked);
	GM_setValue('radiorediseño2', document.getElementById('radiorediseño2').checked);
	GM_setValue('radiorediseño3', document.getElementById('radiorediseño3').checked);
	GM_setValue('textfondo', document.getElementById('textfondo').value);
	GM_setValue('configurado', version);
	alert('Su configuraci\u00f3n se ha guardado correctamente');
	location.reload();
};
function cancelar() caja.removeChild(menu);
function Menupasarpagina(){
	if (document.getElementById("Menupasarpagina") == null) {
		var Menupasarpagina = document.createElement("div");
		Menupasarpagina.setAttribute("id","Menupasarpagina");

		cuadromenupasarpagina = document.createElement("input");
		cuadromenupasarpagina.setAttribute("id","cuadromenupasarpagina")

		Botonpasarpagina = document.createElement("input");
		Botonpasarpagina.setAttribute("type","submit");
		Botonpasarpagina.setAttribute("name","Botonpasarpagina");
		Botonpasarpagina.setAttribute("value",'Ir');
		Botonpasarpagina.setAttribute("onclick",function(){Pasarpagina()});
		Botonpasarpagina.addEventListener("click", function(){Pasarpagina()}, true);

		Botonpasarpagina2 = document.createElement("input");
		Botonpasarpagina2.setAttribute("type","submit");
		Botonpasarpagina2.setAttribute("name","Botonpasarpagina2");
		Botonpasarpagina2.setAttribute("value",'Cerrar');
		Botonpasarpagina2.setAttribute("onclick",function(){NoPasarpagina()});
		Botonpasarpagina2.addEventListener("click", function(){NoPasarpagina()}, true);
 
		Menupasarpagina.innerHTML += 'Página Numero: ';    
		Menupasarpagina.appendChild(cuadromenupasarpagina);
		Menupasarpagina.appendChild(Botonpasarpagina);
		Menupasarpagina.appendChild(Botonpasarpagina2);
		document.getElementById("css_monitors").appendChild(Menupasarpagina);

		function Pasarpagina(){
			numero = document.getElementById('cuadromenupasarpagina').value - 1
			if (document.location.href.substring(25,31)=="Search") {
				document.location.href = document.location.href + "&page_no=" + numero;
			}else{
				if (document.location.href.substring(25,31)=="Albums") {
					document.location.href = document.location.href + "&photos_page=" + numero;
				}else{	
					document.location.href = document.location.href + "&wall_page=" + numero;
				};
			};
			document.getElementById("css_monitors").removeChild(Menupasarpagina);
		};
		function  NoPasarpagina() document.getElementById("css_monitors").removeChild(Menupasarpagina);
	};
};
function fotofondo(){
	if (document.getElementById('photo_image') == null){
		alert('No se ha encontrado ninguna foto');
	}else{
		if (confirm("¿Estás seguro?")) {
			GM_setValue('textfondo', document.getElementById('photo_image').src);
			location.reload();
		};
	};
};
//Script "PasarFotos"
//Autor:	To_Net
//Homepage	http://userscripts.org/scripts/show/51461
function Pasarfotos() {
	if (document.getElementById("respondedor") == null) {
		if (document.getElementById('photo_image') == null){
			alert('Debe estar en una p\u00e1gina de foto');;
		}else{
			var respondedor = document.createElement("div");
				respondedor.setAttribute("id","respondedor");

			var boton = document.createElement("input");
				boton.setAttribute("type","submit");
				boton.setAttribute("name","btnG");
				boton.setAttribute("value",'Ir');
				boton.setAttribute("onclick",function(){LanzaR()});
				boton.addEventListener("click", function(){LanzaR()}, true);

			var boton2 = document.createElement("input");
				boton2.setAttribute("type","submit");
				boton2.setAttribute("name","btnG2");
				boton2.setAttribute("value",'Cerrar');
				boton2.setAttribute("onclick",function(){NoLanzaR()});
				boton2.addEventListener("click", function(){NoLanzaR()}, true);

			var casilla = document.createElement("input");
				casilla.setAttribute("name","casi")
				casilla.setAttribute("maxlength",4);

			respondedor.innerHTML += 'Foto Numero: ';    
			respondedor.appendChild(casilla);
			respondedor.appendChild(boton);
			respondedor.appendChild(boton2);
			var panel=document.getElementById("menufoto");
			panel.appendChild(respondedor);

			function LanzaR(){
				var url= document.location.href;
				panel.removeChild(respondedor);

				if (url.substring(0,62)=="http://www.tuenti.com/#m=Photo&func=view_photo&collection_key="){
					url= url.replace("http://www.tuenti.com/#m=Photo&func=view_photo&","");
					var A= url.substring(0,25);

					var valor= casilla.value;
					var B= Math.floor(valor/25);
					var C=valor%25

					if (C==0){
						B=B-1;
						C=25;
					}

					var NuevoUrl="http://www.tuenti.com/#m=Albums&func=index&"+A+"&photo_albums_page=0&photos_page="+B
					document.location.href=(NuevoUrl);
					setTimeout(function(){PinchaR()},900)
				}

				function PinchaR(){
					var as = document.getElementsByTagName('a');
					fotos = new Array(as.length);
					var j=0;
					for(var i=0; i<as.length; i++) {
						var atributo = as[i].getAttribute('href');
						if (atributo.substring(0,9)==("#m=Photo&")){            
							fotos[j]=atributo;
							j++;
						}
					}

					var n=0;
					var fotos2=new Array(25);

					for (var k=0; k<fotos.length;k++){

						if (fotos[k]==fotos[k+1]){
							fotos2[n]=fotos[k];
							k++;
						}else{
							fotos2[n]=fotos[k];
						}
						n++;
					}

					var valor = casilla.value;

					var C=((valor%25)-1)

					if (C==-1){
						C=24;
					}
					document.location.href=(fotos2[C]);
				}
			}
			function NoLanzaR() panel.removeChild(respondedor);
		};
	};
};
//-------------------------------------------------------------------------------------------//

if (GM_getValue('radiorediseño1') == true){
//Script "Nuevo Tuenti rediseño sutil"
//Autor:	jayjayjay_92
//Homepage	http://userstyles.org/styles/17626
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); .main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:3px;} .header, #subheader{margin:0 !important;} .actions a, .itemActions a, .itemActions span{margin-right:4px !important;} .container, #latest_photos, .blockedFriends, #banned_photos .body{ background: #FFF !important; border: solid #ACD0EE !important; border-width: 0 1px 1px 1px !important; } .item, #basic_information_form { background: #FFF !important; border: 1px solid #ACD0EE !important; margin-top:-1px !important; } .setting { border: solid #ACD0EE !important; border-width: 0px 1px 1px 1px !important; } .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:1px solid #ACD0EE !important;} #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;} div.loading {right:-40px !important;} div .note { background:#fbfbfb !important; border:#fff !important; } button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message { -moz-border-radius:5px !important; -webkit-border-radius:5px !important; } #lightbox_overlay{background:#000 !important;} #ban_photo_link{width:100% !important;} .item:hover, #latest_photos:hover, .mediaInfo:hover { background:#f9f9f9 !important; } #top_videos .mediaInfo:hover{background:transparent !important} .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{ border: solid #ACD0EE 1px !important; -moz-border-radius-topleft:5px !important; -moz-border-radius-topright:5px !important; -webkit-border-radius-topleft:5px !important; -webkit-border-radius-topright:5px !important; } .item, #latest_photos .body{ padding:8px !important; } td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#FFF !important;} .photoTag{opacity:0.6 !important;} .mod .body{border-top:0px solid #FFF !important;} r .pager.light{ padding-top:10px !important; padding-bottom:10px !important;} #networks .body, .login{ border: 1px solid #ACD0EE !important; margin-top:-1px !important;} form fieldset.formbox { -moz-border-radius:0 !important; -webkit-border-radius:0 !important; margin-top:-1px !important;} .mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting {border:none !important;} ul.subMenu a, ul.subMenu li, ul#options a{color:#888 !important;} div.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;} .loginCanvas #login{margin-top:-1px !important;} #latest_photos h3 { border: solid #ACD0EE !important; border-width: 1px 0 0 0 !important; } .mod.c .actions .dropDown{margin-top:1px !important;} img[src=\"http://estaticosak1.tuenti.com/layout/web2/images/save.gif\"]{display:none !important;}";
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