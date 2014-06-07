// ==UserScript==
// @name		Tu Personalite(Versión antigua nueva versión aquí: https://addons.mozilla.org/es-ES/firefox/addon/90022/)
// @namespace		Berti
// @description		Script para personalizar el Tu by Berti
// @include		http://*.tuenti.com/*
// @exclude		http://*.tuenti.com/?m=login
// @version		20.0.1


// ==/UserScript==

//-------------------------------------------------------------------------------------------//
//AUNQUE EL CÓDIGO ESTÉ ALGUNAS PARTES DEL CÓDIGO CON MI NOMBRE, TODOS LOS DERECHOS SON PARA DJMeu y Berti.
//-------------------------------------------------------------------------------------------//

//VARIABLES PRINCIPALES:
//-------------------------------------------------------------------------------------------//
//--------------------------------------------Todos los derechos son para: DJMeu, To_Net, ShiveR, NodSert, DemonDary y ·PAsKU·.-----------------------------------------------//

//-------------------------------------------------------------------------------------------//
version='20.0.1';
scriptname="Tu Personalite";
host="http://tpack.hostecs.net";
head=document.getElementsByTagName('head')[0];
body=document.getElementsByTagName('body')[0];

//ESTILOS PERMANENTES:
//-------------------------------------------------------------------------------------------//
GM_registerMenuCommand(scriptname+ ': Buscar actualizaciones', update);
GM_registerMenuCommand(scriptname+ ': Ir a la p\u00e1gina del script', scriptpage);
function update(evt){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/70461.meta.js',
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
function instalar() document.location.href = scripturl;
function scriptpage(evt) document.location.href = scripturl2;
function autoactualizar(){
	if (GM_getValue('checkboxautoactualizar') == true){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/70461.meta.js',
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
};
//-------------------------------------------------------------------------------------------//

caja = document.createElement("div");
caja.setAttribute("id","caja");

botonmenufoto = document.createElement("button");
	botonmenufoto.appendChild(document.createTextNode("Menú de foto"));
	botonmenufoto.setAttribute("onclick",function(){menufoto()});
	botonmenufoto.addEventListener("click", function(){menufoto()}, true);

function menufoto(){
		if (document.getElementById("menufoto") == null) {
			var menufoto = document.createElement("div");
			menufoto.setAttribute("id","menufoto");

			

			botonampliar = document.createElement("button");
			botonampliar.appendChild(document.createTextNode("Ampliar"));
			botonampliar.setAttribute("onclick",function(){ampliar()});
			botonampliar.addEventListener("click", function(){ampliar()}, true);
			menufoto.appendChild(botonampliar);

			botonpasarfotos = document.createElement("button");
			botonpasarfotos.appendChild(document.createTextNode("Ir a la foto"));
			botonpasarfotos.setAttribute("onclick",function(){Pasarfotos()});
			botonpasarfotos.addEventListener("click", function(){Pasarfotos()}, true);
			menufoto.appendChild(botonpasarfotos);

			botonmostrarurl = document.createElement("button");
			botonmostrarurl.appendChild(document.createTextNode("Mostrar ruta"));
			botonmostrarurl.setAttribute("onclick",function(){mostrarurl()});
			botonmostrarurl.addEventListener("click", function(){mostrarurl()}, true);
			menufoto.appendChild(botonmostrarurl);

			botongirar = document.createElement("button");
			botongirar.appendChild(document.createTextNode("Girar"));
			botongirar.setAttribute("onclick",function(){rotar(document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)),90)});
			botongirar.addEventListener("click", function(){rotar(document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)),90)}, true);
			menufoto.appendChild(botongirar);

			botonfotofondo = document.createElement("button");
			botonfotofondo.appendChild(document.createTextNode("Poner como fondo"));
			botonfotofondo.setAttribute("onclick",function(){fotofondo()});
			botonfotofondo.addEventListener("click", function(){fotofondo()}, true);
			menufoto.appendChild(botonfotofondo);

			botoncerrarmenufoto = document.createElement("button");
			botoncerrarmenufoto.appendChild(document.createTextNode("Cerrar"));
			botoncerrarmenufoto.setAttribute("onclick",function(){cerrarmenufoto()});
			botoncerrarmenufoto.addEventListener("click", function(){cerrarmenufoto()}, true);
			menufoto.appendChild(botoncerrarmenufoto);

			
if (document.getElementById('css_monitors') != null) document.getElementById("css_monitors").appendChild(menufoto);

		}else cerrarmenufoto();
	};
	function cerrarmenufoto(){
		if (document.getElementById("css_monitors") != null) document.getElementById("css_monitors").removeChild(document.getElementById('menufoto'));
	};




botonpasarpagina = document.createElement("button");
botonpasarpagina.appendChild(document.createTextNode("__Ir a la página de comentarios__"));
botonpasarpagina.setAttribute("onclick",function(){Menupasarpagina()});
botonpasarpagina.addEventListener("click", function(){Menupasarpagina()}, true);

botonmsn = document.createElement("button");
botonmsn.appendChild(document.createTextNode("__msn__"));
botonmsn.setAttribute("onclick",function(){msn()});
botonmsn.addEventListener("click", function(){msn()}, true);

botonradio = document.createElement("button");
botonradio.appendChild(document.createTextNode("__radio__"));
botonradio.setAttribute("onclick",function(){radio()});
botonradio.addEventListener("click", function(){radio()}, true); 




                        botonxatt = document.createElement("button");
                        botonxatt.appendChild(document.createTextNode("__Xatt__"));
                        botonxatt.setAttribute("onclick",function(){xatt()});
                        botonxatt.addEventListener("click", function(){xatt()}, true);



function xatt(){
		if (document.getElementById("xatt") == null) {
			var xatt = document.createElement("div");
			xatt.setAttribute("id","xatt");

			

botonxat = document.createElement("button");
botonxat.appendChild(document.createTextNode(" _Web Cam_ "));
botonxat.setAttribute("onclick",function(){xat()});
botonxat.addEventListener("click", function(){xat()}, true);
xatt.appendChild(botonxat);


botonchat = document.createElement("button");
botonchat.appendChild(document.createTextNode(" _Chat normal_ "));
botonchat.setAttribute("onclick",function(){chat()});
botonchat.addEventListener("click", function(){chat()}, true);
xatt.appendChild(botonchat);


 

			
if (document.getElementById('css_monitors') != null) document.getElementById("css_monitors").appendChild(xatt);

		}else cerrarxatt();
	};
	function cerrarxatt(){
		if (document.getElementById("css_monitors") != null) document.getElementById("css_monitors").removeChild(document.getElementById('xatt'));
	};








botonmenu = document.createElement("button");
botonmenu.appendChild(document.createTextNode("__Configuración__"));
botonmenu.setAttribute("onclick",function(){Menu()});
botonmenu.addEventListener("click", function(){Menu()}, true);


botondescargarvideos = document.createElement("button");
botondescargarvideos.appendChild(document.createTextNode("__descargar videos de youtube__"));
botondescargarvideos.setAttribute("onclick",function(){descargarvideos()});
botondescargarvideos.addEventListener("click", function(){descargarvideos()}, true);

botontelevision = document.createElement("button");
botontelevision.appendChild(document.createTextNode("__television__"));
botontelevision.setAttribute("onclick",function(){television()});
botontelevision.addEventListener("click", function(){television()}, true);



botonjuegos = document.createElement("button");
botonjuegos.appendChild(document.createTextNode("__juegos__"));
botonjuegos.setAttribute("onclick",function(){juegos()});
botonjuegos.addEventListener("click", function(){juegos()}, true);


			

botonborrareventos = document.createElement("button");
botonborrareventos.appendChild(document.createTextNode("Borrar eventos"));
botonborrareventos.setAttribute("onclick",function(){quitareventos()});
botonborrareventos.addEventListener("click", function(){quitareventos()}, true);
	
	

			

caja.appendChild(botonmenufoto);
caja.appendChild(botonmenufoto);
caja.appendChild(botonpasarpagina);
caja.appendChild(botonradio);
caja.appendChild(botonmsn);
caja.appendChild(botonxatt);
caja.appendChild(botonxatt);
caja.appendChild(botonmenu);
caja.appendChild(botondescargarvideos);
caja.appendChild(botontelevision);
caja.appendChild(botonjuegos);
caja.appendChild(botonborrareventos);



document.getElementById("css_monitors").appendChild(caja);
//-------------------------------------------------------------------------------------------//


//Borde de la imágen de la vista previa
addStyle('.img-shadow {float:left; margin: 10px 0 0 10px !important;} .img-shadow img {position: relative;background-color: #fff;border: 1px solid #a9a9a9;margin: -6px 6px 6px -6px;padding: 4px;}');



//FUNCIONES DE CARGA:
//-------------------------------------------------------------------------------------------//
intervalocarga=setInterval(function(){carga()},1);
function carga(){
	if (document.getElementById('location_search_text_input') != null){
		clearInterval(intervalocarga);
		verid()
		if (GM_getValue(id+'configurado') != version) reset();
		espera()
		avanzadas()
		setInterval(function(){avanzadas()},GM_getValue(id+'textrefresco'));
		if (GM_getValue(id+'checkboxrelojjs') == true) relojjs()
	};
};

setInterval(function(){if (document.getElementById('whos') != null&&GM_getValue(id+'checkboxcontador') == true) document.getElementById('whos').setAttribute("src","http://whos.amung.us/widget/1zjssxpk2p9u.png?"+Math.random());},20000);
function avanzadas(){
	if (document.getElementsByClassName('button small iconOnly descargarvideo')[0] == null) enlacedescargarvideo()
	if (GM_getValue(id+'checkboximagenampliada') == true&&document.getElementById('diseñomostrado') == null) ampliarimagenes()
	if (GM_getValue(id+'checkboxnomostrareventos') == true&&document.getElementsByClassName('eventIcon') != null) ocultareventos()
	if (document.getElementsByTagName('h3')[0] != null&&document.getElementById("menosmas") == null) masmenos()
	if (document.getElementById('Version') == null) document.getElementById("footer").firstChild.innerHTML += '<ul id="Version" class="copy"><li class="first">| '+scriptname+' <strong>v'+version+'</strong></li></ul>';
	if (GM_getValue(id+'checkboxblog') == true) toggleblog()
	if (document.getElementById('event_invite_friends') != null&&document.getElementById('botoninvitaratodos') == null) botoninvitaratodos()
	if (location.href.indexOf("&collection_key") != -1&&location.href.indexOf("Photo") != -1&&GM_getValue(id+'checkboxmenu') != false) menudefoto()
//	if (GM_getValue(id+'checkboxiconos') == true){
//		emoticonos(':D','<Img SRC="http://img512.imageshack.us/img512/8692/iconbiggrin.gif" border="0">');
//		emoticonos(':S','<Img SRC="http://img512.imageshack.us/img512/3135/iconconfused.gif" border="0">');
//	};
//	if (document.location.href.indexOf('Profile') != -1&&document.location.href.indexOf('user_id') != -1)crearemoticonos()
	if (document.location.href.indexOf('Profile') != -1) {compartirestilo();}else{diseño();};
	if (location.href.indexOf("Search") != -1&&document.getElementById('botonverimagenprincipal') == null) verimagenprincipal()
	if (location.href.indexOf("m=Profile&func=index&user_id=") != -1&&document.getElementById('botonverimagenprincipal') == null) verimagenprincipal()
	etiquetas()

	if (document.getElementById('canvas') != null){
		if (document.getElementById('diseñomostrado') == null){
			diseñomostrado=document.createElement("a");
			diseñomostrado.setAttribute("id","diseñomostrado");
			document.getElementById('canvas').appendChild(diseñomostrado);
		};
	};
};

function espera(){
	if (GM_getValue(id+'checkboxmenu') == false) menuviejo()
	if (GM_getValue(id+'checkboxmenu') == true&&document.getElementById('sections') != null&&document.getElementById('botonherramientas') == null) botones()
	if (document.getElementsByClassName("views")[0] != null) visitas()
	divizquierda()
	if (document.location.href == "http://www.tuenti.com/#m=Home&func=index"&&document.getElementById('friends_updates') != null&&document.getElementById('TPNoticias') == null) TPNoticias()
	if (document.location.href == "http://www.tuenti.com/#m=home&func=view_home"&&document.getElementById('friends_updates') != null&&document.getElementById('TPNoticias') == null) TPNoticias()
};

//MENÚ DE CONFIGURACIÓN:
//-------------------------------------------------------------------------------------------//
function Menu(){
	if (document.getElementById('divmenu') == null){
		if (document.getElementById('lightbox_overlay') == null){
			lightbox_overlay=document.createElement("div");
			lightbox_overlay.setAttribute("id","lightbox_overlay");
			lightbox_overlay.setAttribute("class","lightBoxOverlay");
			lightbox_overlay.setAttribute("style","opacity: 0.5; display: block;");
			body.appendChild(lightbox_overlay);
		}else{
			document.getElementById('lightbox_overlay').style.display = "block";
		};

		divlightBox = document.createElement("div")
		divlightBox.setAttribute("id","divlightBox");
		divlightBox.setAttribute("class","lightBoxWrapper");
		divlightBox.setAttribute("style","display: block; position: absolute; margin-left: 0px; top: "+window.pageYOffset+"px;");

		divmenu = document.createElement("div");
		divmenu.setAttribute("id","divmenu");
		divmenu.setAttribute("class","chatDockItem open active");
		divmenu.setAttribute("style","text-align: left; position: absolute; display: block; z-index: 20; background-color: #f2f2f2 !important;");
		divmenu.innerHTML += '<div class="chatDockDialog open" style="width: 960px; position: static;"><div class="chatActions"><a title="Cerrar el menú de configuración de '+scriptname+'" href="javascript:void(0)" id="botonnomenu" class="chatClose"> </a></div><h3 title="Configuración de '+scriptname+'"><strong>Configuración de '+scriptname+'</strong></h3></div>';

		menu = document.createElement("div");
		menu.setAttribute("id","menu");
		menu.setAttribute("name","item");
		menu.setAttribute("style","padding: 5px; position: absolute; display: block; z-index: 50; background-color: #f2f2f2 !important;");
		menu.innerHTML += '<div style="position:absolute;"><h3>Web Amiga:<br><a href="http://www.tuentiadictos.es/"><img width="100%" height="100%" src="http://img5.imageshack.us/img5/456/tuentiadictos2mr4.gif"/></a></h3></div>';


		menu.innerHTML += '<br><center><a href="http://vageria.foroactivo.net/tu-personalite-h2.htm" target="_blanck"><img class="ico" src="http://s2.subirimagenes.com/otros/41950090.jpg" style="border:none;" width="50%"></a><br><br><h1><b>Creado por Berti95.</b></h1><br><br><p style="font-size:large;">Si tienes alguna duda, idea, etc. entra en la <b>web oficial: </b><a href=" http://vageria.foroactivo.net/tu-personalite-h2.htm"> http://vageria.foroactivo.net/tu-personalite-h2.htm</a></p></center><br>';


		
		menu.innerHTML += '<h1>Tu Personalite<b>v'+version+'</b> --> <a href="http://vageria.foroactivo.net/tu-personalite-h2.htm">Ir a la web de descarga del script</a></h1><hr>';

		checkboxnomostrareventos = document.createElement("input");
		checkboxnomostrareventos.setAttribute("type","checkbox");
		checkboxnomostrareventos.setAttribute("id","checkboxnomostrareventos");
		if (GM_getValue(id+'checkboxnomostrareventos') == true) checkboxnomostrareventos.setAttribute("checked","1");
		menu.appendChild(checkboxnomostrareventos);
		menu.innerHTML += 'No mostrar eventos en el calendario.<br>';

		checkboximagenampliada = document.createElement("input");
		checkboximagenampliada.setAttribute("type","checkbox");
		checkboximagenampliada.setAttribute("id","checkboximagenampliada");
		if (GM_getValue(id+'checkboximagenampliada') == true) checkboximagenampliada.setAttribute("checked","1");
		menu.appendChild(checkboximagenampliada);
		menu.innerHTML += 'Ampliar imágenes al pasar el ratón por encima. <b>(No Recomendado)</b><br>';

		checkboxblog = document.createElement("input");
		checkboxblog.setAttribute("type","checkbox");
		checkboxblog.setAttribute("id","checkboxblog");
		if (GM_getValue(id+'checkboxblog') == true) checkboxblog.setAttribute("checked","1");
		menu.appendChild(checkboxblog);
		menu.innerHTML += 'Mantener los blogs siempre abiertos.<br>';

		checkboxcontador = document.createElement("input");
		checkboxcontador.setAttribute("type","checkbox");
		checkboxcontador.setAttribute("id","checkboxcontador");
		if (GM_getValue(id+'checkboxcontador') == true) checkboxcontador.setAttribute("checked","1");
		menu.appendChild(checkboxcontador);
		menu.innerHTML += 'NO DISPONIBLE .<br>';

		checkboxreloj = document.createElement("input");
		checkboxreloj.setAttribute("type","checkbox");
		checkboxreloj.setAttribute("id","checkboxreloj");
		if (GM_getValue(id+'checkboxreloj') == true) checkboxreloj.setAttribute("checked","1");
		menu.appendChild(checkboxreloj);
		menu.innerHTML += 'Mostrar reloj flash<br>';
		
		checkboxrelojjs = document.createElement("input");
		checkboxrelojjs.setAttribute("type","checkbox");
		checkboxrelojjs.setAttribute("id","checkboxrelojjs");
		if (GM_getValue(id+'checkboxrelojjs') == true) checkboxrelojjs.setAttribute("checked","1");
		menu.appendChild(checkboxrelojjs);
		menu.innerHTML += 'Mostrar reloj integrado(ACTUALMENTE NO DISPONIBLE)<br>';

		menu.innerHTML += '<table><td align="right">';





		menu.innerHTML += '<hr><img src="http://s2.subirimagenes.com/otros/previo/thump_4222369fondos.jpg" class="ico" width="30%"><br>';
		formfondo = document.createElement("form");
		formfondo.setAttribute("name","formfondo");
		radiofondo = document.createElement("input");
		radiofondo.setAttribute("type","radio");
		radiofondo.setAttribute("name","radiofondo")
		radiofondo.setAttribute("id","radiofondo");
		if (GM_getValue(id+'radiofondo') == true) radiofondo.setAttribute("checked","1");
		formfondo.appendChild(radiofondo);
		formfondo.innerHTML += 'Fondo normal<br>';

		radiofondo1 = document.createElement("input");
		radiofondo1.setAttribute("type","radio");
		radiofondo1.setAttribute("name","radiofondo")
		radiofondo1.setAttribute("id","radiofondo1");
		if (GM_getValue(id+'radiofondo1') == true) radiofondo1.setAttribute("checked","1");
		formfondo.appendChild(radiofondo1);
		formfondo.innerHTML += 'Fondo personalizado:  Ruta: ';

		formfondo.innerHTML += '<input type="text" id="textfondo" size="100" name="textfondo" onclick="javascript:this.focus();this.select();"/><br>';
		if (GM_getValue(id+'textfondo') == undefined) GM_setValue(id+'textfondo',"");

		radiofondo2 = document.createElement("input");
		radiofondo2.setAttribute("type","radio");
		radiofondo2.setAttribute("name","radiofondo")
		radiofondo2.setAttribute("id","radiofondo2");
		if (GM_getValue(id+'radiofondo2') == true) radiofondo2.setAttribute("checked","1");
		formfondo.appendChild(radiofondo2);
		formfondo.innerHTML += 'Fondo "Nuevo Tuenti rediseño sutil" de <b>jayjayjay_92</b><br>';

		radiofondo3 = document.createElement("input");
		radiofondo3.setAttribute("type","radio");
		radiofondo3.setAttribute("name","radiofondo")
		radiofondo3.setAttribute("id","radiofondo3");
		if (GM_getValue(id+'radiofondo3') == true) radiofondo3.setAttribute("checked","1");
		formfondo.appendChild(radiofondo3);
		formfondo.innerHTML += 'Fondo "tuentiblue" de <b>ardo99</b><br>';

		radiofondo3v2 = document.createElement("input");
		radiofondo3v2.setAttribute("type","radio");
		radiofondo3v2.setAttribute("name","radiofondo")
		radiofondo3v2.setAttribute("id","radiofondo3v2");
		if (GM_getValue(id+'radiofondo3v2') == true) radiofondo3v2.setAttribute("checked","1");
		formfondo.appendChild(radiofondo3v2);
		formfondo.innerHTML += 'Fondo "tuentiblue v2" de <b>ardo99</b><br>';

		radiofondo4 = document.createElement("input");
		radiofondo4.setAttribute("type","radio");
		radiofondo4.setAttribute("name","radiofondo")
		radiofondo4.setAttribute("id","radiofondo4");
		if (GM_getValue(id+'radiofondo4') == true) radiofondo4.setAttribute("checked","1");
		formfondo.appendChild(radiofondo4);
		formfondo.innerHTML += 'Fondo "TuentiStyle" de <b>draco1989</b> v1.2<br>';

		radiofondo5 = document.createElement("input");
		radiofondo5.setAttribute("type","radio");
		radiofondo5.setAttribute("name","radiofondo")
		radiofondo5.setAttribute("id","radiofondo5");
		if (GM_getValue(id+'radiofondo5') == true) radiofondo5.setAttribute("checked","1");
		formfondo.appendChild(radiofondo5);
		formfondo.innerHTML += 'Fondo "Likern" de <b>Shiver</b><br>';

		radiofondo6 = document.createElement("input");
		radiofondo6.setAttribute("type","radio");
		radiofondo6.setAttribute("name","radiofondo")
		radiofondo6.setAttribute("id","radiofondo6");
		if (GM_getValue(id+'radiofondo6') == true) radiofondo6.setAttribute("checked","1");
		formfondo.appendChild(radiofondo6);
		formfondo.innerHTML += 'Fondo "Pinxil" de <b>Shiver</b><br>';

		radiofondo7 = document.createElement("input");
		radiofondo7.setAttribute("type","radio");
		radiofondo7.setAttribute("name","radiofondo")
		radiofondo7.setAttribute("id","radiofondo7");
		if (GM_getValue(id+'radiofondo7') == true) radiofondo7.setAttribute("checked","1");
		formfondo.appendChild(radiofondo7);
		formfondo.innerHTML += 'Fondo "LoomySkin" de <b>Shiver</b><br>';

		radiofondo8 = document.createElement("input");
		radiofondo8.setAttribute("type","radio");
		radiofondo8.setAttribute("name","radiofondo")
		radiofondo8.setAttribute("id","radiofondo8");
		if (GM_getValue(id+'radiofondo8') == true) radiofondo8.setAttribute("checked","1");
		formfondo.appendChild(radiofondo8);
		formfondo.innerHTML += 'Fondo negro<br>';

		radiofondo9 = document.createElement("input");
		radiofondo9.setAttribute("type","radio");
		radiofondo9.setAttribute("name","radiofondo")
		radiofondo9.setAttribute("id","radiofondo9");
		if (GM_getValue(id+'radiofondo9') == true) radiofondo9.setAttribute("checked","1");
		formfondo.appendChild(radiofondo9);
		formfondo.innerHTML += 'Fondo "TuentiPink" de <b>Daniko</b><br>';

		radiofondo10 = document.createElement("input");
		radiofondo10.setAttribute("type","radio");
		radiofondo10.setAttribute("name","radiofondo")
		radiofondo10.setAttribute("id","radiofondo10");
		if (GM_getValue(id+'radiofondo10') == true) radiofondo10.setAttribute("checked","1");
		formfondo.appendChild(radiofondo10);
		formfondo.innerHTML += 'Fondo "tuentiblue II (PINK VERSION)" de <b>ardo99</b><br>';

		radiofondo11 = document.createElement("input");
		radiofondo11.setAttribute("type","radio");
		radiofondo11.setAttribute("name","radiofondo")
		radiofondo11.setAttribute("id","radiofondo11");
		if (GM_getValue(id+'radiofondo11') == true) radiofondo11.setAttribute("checked","1");
		formfondo.appendChild(radiofondo11);
		formfondo.innerHTML += 'Fondo "Hello-Kitty"</b><br>';

		radiofondo12 = document.createElement("input");
		radiofondo12.setAttribute("type","radio");
		radiofondo12.setAttribute("name","radiofondo")
		radiofondo12.setAttribute("id","radiofondo12");
		if (GM_getValue(id+'radiofondo12') == true) radiofondo12.setAttribute("checked","1");
		formfondo.appendChild(radiofondo12);
		formfondo.innerHTML += 'Fondo "Hulk"</b><br>';

		radiofondop = document.createElement("input");
		radiofondop.setAttribute("type","radio");
		radiofondop.setAttribute("name","radiofondo")
		radiofondop.setAttribute("id","radiofondop");
		if (GM_getValue(id+'radiofondop') == true) radiofondop.setAttribute("checked","1");
		formfondo.appendChild(radiofondop);
		formfondo.innerHTML += 'Fondo panorámico de ciudad<br>';

		checkboxfondofijo = document.createElement("input");
		checkboxfondofijo.setAttribute("type","checkbox");
		checkboxfondofijo.setAttribute("id","checkboxfondofijo");
		if (GM_getValue(id+'checkboxfondofijo') == true) checkboxfondofijo.setAttribute("checked","1");
		formfondo.appendChild(checkboxfondofijo);
		formfondo.innerHTML += 'Fondo fijo<br>';
		menu.appendChild(formfondo);

		menu.innerHTML += '</td><td align="left">';

		menu.innerHTML += '<hr><img class="ico" width="30%" src="http://s3.subirimagenes.com:81/otros/previo/thump_4222365estilos.jpg"/><br>';
		formrediseño = document.createElement("form");
		formrediseño.setAttribute("name","formrediseño");

		
		radiorediseño = document.createElement("input");
		radiorediseño.setAttribute("type","radio");
		radiorediseño.setAttribute("name","radiorediseño")
		radiorediseño.setAttribute("id","radiorediseño");
		if (GM_getValue(id+'radiorediseño') == true) radiorediseño.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño);
		formrediseño.innerHTML += 'Diseño normal<br>';

		radiorediseño1 = document.createElement("input");
		radiorediseño1.setAttribute("type","radio");
		radiorediseño1.setAttribute("name","radiorediseño")
		radiorediseño1.setAttribute("id","radiorediseño1");
		if (GM_getValue(id+'radiorediseño1') == true) radiorediseño1.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño1);
		formrediseño.innerHTML += 'Diseño "Nuevo Tuenti rediseño sutil" de <b>jayjayjay_92</b> v1.27 ---> <a href="http://userstyles.org/styles/17626">Web del diseño</a>.<br>';

		radiorediseño2 = document.createElement("input");
		radiorediseño2.setAttribute("type","radio");
		radiorediseño2.setAttribute("name","radiorediseño")
		radiorediseño2.setAttribute("id","radiorediseño2");
		if (GM_getValue(id+'radiorediseño2') == true) radiorediseño2.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño2);
		formrediseño.innerHTML += 'Diseño "tuentiblue" de <b>ardo99</b> ---> <a href="http://userstyles.org/styles/18583>Web del diseño</a>.<br>';

		radiorediseño3 = document.createElement("input");
		radiorediseño3.setAttribute("type","radio");
		radiorediseño3.setAttribute("name","radiorediseño")
		radiorediseño3.setAttribute("id","radiorediseño3");
		if (GM_getValue(id+'radiorediseño3') == true) radiorediseño3.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño3);
		formrediseño.innerHTML += 'Diseño "TuentiStyle" de <b>draco1989</b> v1.2 ---> <a href="http://userstyles.org/styles/18119">Web del diseño</a>.<br>';

		radiorediseño4 = document.createElement("input");
		radiorediseño4.setAttribute("type","radio");
		radiorediseño4.setAttribute("name","radiorediseño")
		radiorediseño4.setAttribute("id","radiorediseño4");
		if (GM_getValue(id+'radiorediseño4') == true) radiorediseño4.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño4);
		formrediseño.innerHTML += 'Diseño "TuentiSkin" de <b>alarico750</b> ---> <a href="http://userstyles.org/styles/19064">Web del diseño</a>.<br>';

		radiorediseño5 = document.createElement("input");
		radiorediseño5.setAttribute("type","radio");
		radiorediseño5.setAttribute("name","radiorediseño")
		radiorediseño5.setAttribute("id","radiorediseño5");
		if (GM_getValue(id+'radiorediseño5') == true) radiorediseño5.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño5);
		formrediseño.innerHTML += 'Diseño "Likern"<br>';

		radiorediseño6 = document.createElement("input");
		radiorediseño6.setAttribute("type","radio");
		radiorediseño6.setAttribute("name","radiorediseño")
		radiorediseño6.setAttribute("id","radiorediseño6");
		if (GM_getValue(id+'radiorediseño6') == true) radiorediseño6.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño6);
		formrediseño.innerHTML += 'Diseño "Pinxil"<br>';

		radiorediseño7 = document.createElement("input");
		radiorediseño7.setAttribute("type","radio");
		radiorediseño7.setAttribute("name","radiorediseño")
		radiorediseño7.setAttribute("id","radiorediseño7");
		if (GM_getValue(id+'radiorediseño7') == true) radiorediseño7.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño7);
		formrediseño.innerHTML += 'Diseño "LoomySkin"<br>';

		radiorediseño8 = document.createElement("input");
		radiorediseño8.setAttribute("type","radio");
		radiorediseño8.setAttribute("name","radiorediseño")
		radiorediseño8.setAttribute("id","radiorediseño8");
		if (GM_getValue(id+'radiorediseño8') == true) radiorediseño8.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño8);
		formrediseño.innerHTML += 'Diseño "TuentiRed" de <b>Daniko</b> ---> <a href="http://userstyles.org/styles/19955">Web del diseño</a>.<br>';

		radiorediseño9 = document.createElement("input");
		radiorediseño9.setAttribute("type","radio");
		radiorediseño9.setAttribute("name","radiorediseño")
		radiorediseño9.setAttribute("id","radiorediseño9");
		if (GM_getValue(id+'radiorediseño9') == true) radiorediseño9.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño9);
		formrediseño.innerHTML += 'Diseño "TuentiPink" de <b>Daniko</b> ---> <a href="http://userstyles.org/styles/19958">Web del diseño</a>.<br>';

		radiorediseño10 = document.createElement("input");
		radiorediseño10.setAttribute("type","radio");
		radiorediseño10.setAttribute("name","radiorediseño")
		radiorediseño10.setAttribute("id","radiorediseño10");
		if (GM_getValue(id+'radiorediseño10') == true) radiorediseño10.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño10);
		formrediseño.innerHTML += 'Diseño "tuentiblue II (PINK VERSION)" de <b>ardo99</b> ---> <a href="http://userstyles.org/styles/20143">Web del diseño</a>.<br>';

		radiorediseño11 = document.createElement("input");
		radiorediseño11.setAttribute("type","radio");
		radiorediseño11.setAttribute("name","radiorediseño")
		radiorediseño11.setAttribute("id","radiorediseño11");
		if (GM_getValue(id+'radiorediseño11') == true) radiorediseño11.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño11);
		formrediseño.innerHTML += 'Diseño "Azul"<br>';

		radiorediseño12 = document.createElement("input");
		radiorediseño12.setAttribute("type","radio");
		radiorediseño12.setAttribute("name","radiorediseño")
		radiorediseño12.setAttribute("id","radiorediseño12");
		if (GM_getValue(id+'radiorediseño12') == true) radiorediseño12.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño12);
		formrediseño.innerHTML += 'Diseño "AzulClaro"<br>';
		
		radiorediseño13 = document.createElement("input");
		radiorediseño13.setAttribute("type","radio");
		radiorediseño13.setAttribute("name","radiorediseño")
		radiorediseño13.setAttribute("id","radiorediseño13");
		if (GM_getValue(id+'radiorediseño13') == true) radiorediseño13.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño13);
		formrediseño.innerHTML += 'Diseño "Naranja"<br>';
		
		radiorediseño14 = document.createElement("input");
		radiorediseño14.setAttribute("type","radio");
		radiorediseño14.setAttribute("name","radiorediseño")
		radiorediseño14.setAttribute("id","radiorediseño14");
		if (GM_getValue(id+'radiorediseño14') == true) radiorediseño14.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño14);
		formrediseño.innerHTML += 'Diseño "Rojo"<br>';

		radiorediseño15 = document.createElement("input");
		radiorediseño15.setAttribute("type","radio");
		radiorediseño15.setAttribute("name","radiorediseño")
		radiorediseño15.setAttribute("id","radiorediseño15");
		if (GM_getValue(id+'radiorediseño15') == true) radiorediseño15.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño15);
		formrediseño.innerHTML += 'Diseño "Hello-Kitty"<br>';
		
		radiorediseño16 = document.createElement("input");
		radiorediseño16.setAttribute("type","radio");
		radiorediseño16.setAttribute("name","radiorediseño")
		radiorediseño16.setAttribute("id","radiorediseño16");
		if (GM_getValue(id+'radiorediseño16') == true) radiorediseño16.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño16);
		formrediseño.innerHTML += 'Diseño "Hulk"<br>';

		menu.appendChild(formrediseño);

		
                menu.innerHTML += '<hr><h1>Para no tener problemas con la legalidad del complemento, no se pueden descargar las imagenes, solamente se pueden descagar las imagenes buscando la ruta de la foto, copiarla en la url y una vez en la foto... descargarla</h1><br>Perdon por las molestias<b> </b> <a href=" "> </a>.';

                menu.innerHTML += '<hr><h1>Opciones avanzadas</h1><b>NOTA:</b> No cambies nada a no ser que sepas lo que estás haciendo<br>';

		checkboxmenu = document.createElement("input");
		checkboxmenu.setAttribute("type","checkbox");
		checkboxmenu.setAttribute("id","checkboxmenu");
		if (GM_getValue(id+'checkboxmenu') == true) checkboxmenu.setAttribute("checked","1");
		menu.appendChild(checkboxmenu);
		menu.innerHTML += 'Usar el nuevo menú.<br>';
		
		menu.innerHTML += 'Velocidad de refresco: <input type="text" id="textrefresco" size="1" maxlength="4" onclick="javascript:this.focus();this.select();"/> (1=Rapido 2000=Normal 4000=Lento)';

		menu.innerHTML += '<hr><h1>Qué hacer si algo funciona mal:</h1><br>Si notas que algo falla en el funcionamiento del script pulsa el botón de configuración predeterminada. Si el fallo no se soluciona prueba desinstalando y volviendo a instalar el complemento. En caso de que el problema persista o tengas alguna duda pregúntala en la <b>pagina oficial</b> <a href="http://vageria.foroactivo.net/tu-personalite-h2.htm">http://vageria.foroactivo.net/tu-personalite-h2.htm</a>.';


menu.innerHTML += '<hr><h1>Creditos:</h1><br>DJMeu, To_Net, ShiveR, NodSert, DemonDary y Pasku Tinen la mayor parte del derecho de este codigo puesto que Tu Personalite es una modificacion del codigo de Tuenti pack, se lo agradecemos mucho<b> </b> <a href=" "> </a>.';



menu.innerHTML += '<hr><h1> DESCARGA LA NUEVA VERSION AQUI: https://addons.mozilla.org/es-ES/firefox/addon/90022/ <BR>EL CREADOR DE TU PERSONALITE ES <><><>BERTI95<><><> y <><>leno11408<><></h1><br>Si quieres modificar, aprovechar o usar alguna parte del codigo de Tu Personalite por favor contacta conmigo<b> </b> <a href=" "> </a>.';



		menu.innerHTML += '</center>';
		Top = document.createElement("div");
		Top.setAttribute("id","Top");
		menu.appendChild(Top);
		GM_xmlhttpRequest({
			method: 'GET',
			url: host+'/Top.html',
			onload: function(textotop) {
				var textotop = textotop.responseText;
				if (textotop.indexOf("textotop") != -1) document.getElementById('Top').innerHTML += '<hr>'+textotop;
			}
		});
		menu.innerHTML += '<hr>';
		checkboxgyc = document.createElement("input");
		checkboxgyc.setAttribute("type","checkbox");
		checkboxgyc.setAttribute("id","checkboxgyc");
		checkboxgyc.setAttribute("checked","1");
		menu.appendChild(checkboxgyc);
		menu.innerHTML += '<b>Compartir diseño</b><br>';
				
		botonaceptar = document.createElement("button");
		botonaceptar.appendChild(document.createTextNode("________Guardar"));
		botonaceptar.setAttribute("onclick",function(){GyC()});
		botonaceptar.addEventListener("click", function(){GyC()}, true);
		menu.appendChild(botonaceptar);

		botoncancelar = document.createElement("button");
		botoncancelar.appendChild(document.createTextNode("Cancelar"));
		botoncancelar.setAttribute("onclick",function(){cancelar()});
		botoncancelar.addEventListener("click", function(){cancelar()}, true);
		menu.appendChild(botoncancelar);

		botonreset = document.createElement("button");
		botonreset.appendChild(document.createTextNode("Configuración predeterminada"));
		botonreset.setAttribute("onclick",function(){reset(1)});
		botonreset.addEventListener("click", function(){reset(1)}, true);
		menu.appendChild(botonreset);

		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(menu, canvas);
		document.getElementById('textfondo').value = GM_getValue(id+'textfondo');

		divmenu.appendChild(menu);

		divlightBox.appendChild(divmenu);
		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(divlightBox, canvas);
		document.getElementById("botonnomenu").addEventListener("click", function(){cancelar()}, true);
		document.getElementById('textrefresco').value = GM_getValue(id+'textrefresco');
	}else cancelar();
};





//MENÚS:
//-------------------------------------------------------------------------------------------//
function botones(){
	liherramientas=document.createElement("li");
	liherramientas.innerHTML += '<a id="botonherramientas" href="javascript:void(0)" title="Herramietas de '+scriptname+'"><b>Herramientas</b></a><li id="herramientas" class="hide" style="position: absolute; text-align: right; padding: 5px; display: block; z-index: 200000; background-color: #538FBB !important;"><a id="botonpasarpagina" href="javascript:void(0)"><span>Ir a la página <Img class="ico" SRC="http://famfamfam.com/lab/icons/mini/icons/action_go.gif" width="12" height="12" border="0"></span></a><a id="botonradio" href="javascript:void(0)"><span>Radio <Img class="ico" SRC="http://famfamfam.com/lab/icons/mini/icons/page_sound.gif" width="12" height="12" border="0"></span></a><a id="botonxat" href="javascript:void(0)"><span>TuentiXat <Img class="ico" SRC="http://famfamfam.com/lab/icons/mini/icons/icon_user.gif" width="12" height="12" border="0"></span></a><a id="botonmsn" href="javascript:void(0)"><span>TuentiMSN <Img class="ico" SRC="http://miarroba.st/iconos_xp/16x16/pawn_glass_green.gif" width="12" height="12" border="0"></span></a><a id="botonborrareventos" href="javascript:void(0)"><span>Borrar eventos <Img class="ico" SRC="http://famfamfam.com/lab/icons/mini/icons/action_stop.gif" width="12" height="12" border="0"></span></a></li></ul>';
	

	

};

//FUNCIONES DE GUARDADO DE PREFERENCIAS:
//-------------------------------------------------------------------------------------------//
function GyC(){if (document.getElementById("checkboxgyc").checked == true){crearcodigo()}else{aceptar()};};

function aceptar(){
//	GM_setValue(id+'checkboxiconos', document.getElementById('checkboxiconos').checked);
	GM_setValue(id+'checkboxmenu', document.getElementById('checkboxmenu').checked);
	GM_setValue(id+'checkboxnomostrareventos', document.getElementById('checkboxnomostrareventos').checked);
	GM_setValue(id+'checkboximagenampliada', document.getElementById('checkboximagenampliada').checked);
	GM_setValue(id+'checkboxblog', document.getElementById('checkboxblog').checked);
	GM_setValue(id+'checkboxcontador', document.getElementById('checkboxcontador').checked);
	GM_setValue(id+'checkboxreloj', document.getElementById('checkboxreloj').checked);
	GM_setValue(id+'checkboxrelojjs', document.getElementById('checkboxrelojjs').checked);
	GM_setValue(id+'radiofondo', document.getElementById('radiofondo').checked);
	GM_setValue(id+'radiofondo1', document.getElementById('radiofondo1').checked);
	GM_setValue(id+'radiofondo2', document.getElementById('radiofondo2').checked);
	GM_setValue(id+'radiofondo3', document.getElementById('radiofondo3').checked);
	GM_setValue(id+'radiofondo3v2', document.getElementById('radiofondo3v2').checked);
	GM_setValue(id+'radiofondo4', document.getElementById('radiofondo4').checked);
	GM_setValue(id+'radiofondo5', document.getElementById('radiofondo5').checked);
	GM_setValue(id+'radiofondo6', document.getElementById('radiofondo6').checked);
	GM_setValue(id+'radiofondo7', document.getElementById('radiofondo7').checked);
	GM_setValue(id+'radiofondo8', document.getElementById('radiofondo8').checked);
	GM_setValue(id+'radiofondo9', document.getElementById('radiofondo9').checked);
	GM_setValue(id+'radiofondo10', document.getElementById('radiofondo10').checked);
	GM_setValue(id+'radiofondo11', document.getElementById('radiofondo11').checked);
	GM_setValue(id+'radiofondo12', document.getElementById('radiofondo12').checked);
	GM_setValue(id+'radiofondop', document.getElementById('radiofondop').checked);
	GM_setValue(id+'checkboxfondofijo', document.getElementById('checkboxfondofijo').checked);
	GM_setValue(id+'radiorediseño', document.getElementById('radiorediseño').checked);
	GM_setValue(id+'radiorediseño1', document.getElementById('radiorediseño1').checked);
	GM_setValue(id+'radiorediseño2', document.getElementById('radiorediseño2').checked);
	GM_setValue(id+'radiorediseño3', document.getElementById('radiorediseño3').checked);
	GM_setValue(id+'radiorediseño4', document.getElementById('radiorediseño4').checked);
	GM_setValue(id+'radiorediseño5', document.getElementById('radiorediseño5').checked);
	GM_setValue(id+'radiorediseño6', document.getElementById('radiorediseño6').checked);
	GM_setValue(id+'radiorediseño7', document.getElementById('radiorediseño7').checked);
	GM_setValue(id+'radiorediseño8', document.getElementById('radiorediseño8').checked);
	GM_setValue(id+'radiorediseño9', document.getElementById('radiorediseño9').checked);
	GM_setValue(id+'radiorediseño10', document.getElementById('radiorediseño10').checked);
	GM_setValue(id+'radiorediseño11', document.getElementById('radiorediseño11').checked);
	GM_setValue(id+'radiorediseño12', document.getElementById('radiorediseño12').checked);
	GM_setValue(id+'radiorediseño13', document.getElementById('radiorediseño13').checked);
	GM_setValue(id+'radiorediseño14', document.getElementById('radiorediseño14').checked);
	GM_setValue(id+'radiorediseño15', document.getElementById('radiorediseño15').checked);
	GM_setValue(id+'radiorediseño16', document.getElementById('radiorediseño16').checked);
	GM_setValue(id+'textfondo', document.getElementById('textfondo').value);
	GM_setValue(id+'textrefresco', document.getElementById('textrefresco').value);
	GM_setValue(id+'configurado', version);
	location.reload();
};

function reset(recargar){
	GM_setValue(id+'checkboxmenu', true);
	GM_setValue(id+'checkboxnomostrareventos', false);
	GM_setValue(id+'checkboximagenampliada', false);
	GM_setValue(id+'checkboxblog', false);
	GM_setValue(id+'checkboxcontador', false);
	GM_setValue(id+'checkboxreloj', false);
	GM_setValue(id+'checkboxrelojjs', false);
	GM_setValue(id+'radiofondo', true);
	GM_setValue(id+'radiofondo1', false);
	GM_setValue(id+'radiofondo2', false);
	GM_setValue(id+'radiofondo3', false);
	GM_setValue(id+'radiofondo3v2', false);
	GM_setValue(id+'radiofondo4', false);
	GM_setValue(id+'radiofondo5', false);
	GM_setValue(id+'radiofondo6', false);
	GM_setValue(id+'radiofondo7', false);
	GM_setValue(id+'radiofondo8', false);
	GM_setValue(id+'radiofondo9', false);
	GM_setValue(id+'radiofondop', false);
	GM_setValue(id+'checkboxfondofijo', false);
	GM_setValue(id+'radiorediseño', true);
	GM_setValue(id+'radiorediseño1', false);
	GM_setValue(id+'radiorediseño2', false);
	GM_setValue(id+'radiorediseño3', false);
	GM_setValue(id+'radiorediseño4', false);
	GM_setValue(id+'radiorediseño5', false);
	GM_setValue(id+'radiorediseño6', false);
	GM_setValue(id+'radiorediseño7', false);
	GM_setValue(id+'radiorediseño8', false);
	GM_setValue(id+'radiorediseño9', false);
	GM_setValue(id+'radiorediseño10', false);
	GM_setValue(id+'radiorediseño11', false);
	GM_setValue(id+'radiorediseño12', false);
	GM_setValue(id+'radiorediseño13', false);
	GM_setValue(id+'radiorediseño14', false);
	GM_setValue(id+'radiorediseño15', false);
	GM_setValue(id+'radiorediseño16', false);
	GM_setValue(id+'textrefresco', 2000);
	if (recargar == 1) location.reload()
};

//FUNCIONES RELACIONADAS CON LOS DISEÑOS:
//-------------------------------------------------------------------------------------------//
function diseño(){
	if (document.getElementById('diseñomostrado') == null){
		noestilo()

		if (GM_getValue(id+'radiofondo1') == true&&body != null) document.body.style.backgroundImage = "url("+GM_getValue(id+'textfondo')+")";
		if (GM_getValue(id+'radiofondo2') == true&&body != null) body.setAttribute("style", "background-color: #E9EFF3");
		if (GM_getValue(id+'radiofondo3') == true&&body != null) document.body.style.backgroundImage = "url(http://www.dominiotemporal.es/fondos_web/texturas/JoseRico/08_basicas.gif)";
		if (GM_getValue(id+'radiofondo3v2') == true){
			if (GM_getValue(id+'checkboxfondofijo') == true){
				if(body != null) body.setAttribute("style", "background: url(http://www.minijuegos.com/imagenes/fondomj.gif) repeat-x fixed !important");
			}else{
				if(body != null) body.setAttribute("style", "background: url(http://www.minijuegos.com/imagenes/fondomj.gif) repeat-x !important");
			};
		};
		if (GM_getValue(id+'radiofondo4') == true){
			if (GM_getValue(id+'checkboxfondofijo') == true){
				if(body != null) body.setAttribute("style", "background: url(http://i39.tinypic.com/fdd1g5.jpg) repeat-x fixed #000000 !important");
			}else{
				if(body != null) body.setAttribute("style", "background: url(http://i39.tinypic.com/fdd1g5.jpg) repeat-x #000000 !important");
			};
		};
		if (GM_getValue(id+'radiofondo5') == true&&body != null) body.setAttribute("style", "background-color: #ABABAB");
		if (GM_getValue(id+'radiofondo6') == true&&body != null) body.setAttribute("style", "background-color: #C1009A");
		if (GM_getValue(id+'radiofondo7') == true&&body != null) body.setAttribute("style", "background-color: #64A3CF");
		if (GM_getValue(id+'radiofondo8') == true&&body != null) body.setAttribute("style", "background-color: black");
		if (GM_getValue(id+'radiofondo9') == true){
			if (GM_getValue(id+'checkboxfondofijo') == true){
				if(body != null) body.setAttribute("style", "background: url(http://im158.ll.tuenti.com/i44/i/7/600/2/N/qKguGqH2uiBs9re_WfZw.0.jpg) repeat fixed !important");
			}else{
				if(body != null) body.setAttribute("style", "background: url(http://im158.ll.tuenti.com/i44/i/7/600/2/N/qKguGqH2uiBs9re_WfZw.0.jpg) repeat !important");
			};
		};
		if (GM_getValue(id+'radiofondo10') == true){
			if (GM_getValue(id+'checkboxfondofijo') == true){
				if(body != null) body.setAttribute("style", "background: url(http://i184.photobucket.com/albums/x79/pixvirtual/us007/gURcMhcABve2.gif) repeat fixed !important");
			}else{
				if(body != null) body.setAttribute("style", "background: url(http://i184.photobucket.com/albums/x79/pixvirtual/us007/gURcMhcABve2.gif) repeat !important");
			};
		};
		if (GM_getValue(id+'radiofondo11') == true){
			if (GM_getValue(id+'checkboxfondofijo') == true){
				if(body != null) body.setAttribute("style", "background: url(http://www.hellokittykat.com/images/wallpapers/hello-kitty-wallpaper-val.jpg) repeat fixed !important");
			}else{
				if(body != null) body.setAttribute("style", "background: url(http://www.hellokittykat.com/images/wallpapers/hello-kitty-wallpaper-val.jpg) repeat !important");
			};
		};
		if (GM_getValue(id+'radiofondo12') == true){
			if (GM_getValue(id+'checkboxfondofijo') == true){
				if(body != null) body.setAttribute("style", "background: url(http://img263.imageshack.us/img263/7137/imageuploadimagewg9.jpg) repeat fixed !important");
			}else{
				if(body != null) body.setAttribute("style", "background: url(http://img263.imageshack.us/img263/7137/imageuploadimagewg9.jpg) repeat !important");
			};
		};
		if (GM_getValue(id+'radiofondop') == true&&body != null) document.body.style.backgroundImage = "url(http://srv0110-07.oak1.imeem.com/g/p/a29385b55e5208eff4ce4b61da16e234_raw.gif)";
		if (GM_getValue(id+'checkboxfondofijo') == true&&body != null) document.body.style.backgroundAttachment='fixed';
		
		//Diseño "Nuevo Tuenti rediseño sutil" de jayjayjay_92 (http://userstyles.org/styles/17626)	
		if (GM_getValue(id+'radiorediseño1') == true) var css = '.actionList h3{border-bottom:1px solid #91B6D0 !important;padding:1px 6px 2px !important;} #negative_actions{border:1px solid #ACD0EE !important;-moz-border-radius-topleft:3px !important;-moz-border-radius-topright:3px!important;} #negative_actions li{background:#ECF3F5 !important; padding-left:6px !important;border-top:1px solid #FFF !important;}#photo .sidebar.right h3{background:#D2E5F1!important;}.main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:0px;} .header, #subheader{margin:0 !important;}.actions a, .itemActions a, .itemActions span{margin-right:4px !important;}    .container, #latest_photos, .blockedFriends, #banned_photos .body{        background: #FFF !important;        border: solid #ACD0EE !important;        border-width: 0 1px 1px 1px !important;}.item, #basic_information_form {        background: #FFF !important;        border: 1px solid #ACD0EE !important;        margin-top:-1px !important;}    .setting {        border: solid #ACD0EE !important;        border-width: 0px 1px 1px 1px !important;    }    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:1px solid #ACD0EE !important;}    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;}    div.loading {right:-40px !important;}    div .note {        background:#fbfbfb !important;        border:#fff !important;    }    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {        -moz-border-radius:5px !important;        -webkit-border-radius:5px !important;    }    #lightbox_overlay{background:#000 !important;}    #ban_photo_link{width:100% !important;}    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {        background:#f9f9f9 !important;    }   #top_videos .mediaInfo:hover{background:transparent !important}    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{        border: solid #ACD0EE 1px !important;        -moz-border-radius-topleft:5px !important;        -moz-border-radius-topright:5px !important;        -webkit-border-radius-topleft:5px !important;        -webkit-border-radius-topright:5px !important;    }    .item, #latest_photos .body{        padding:8px !important;    }    td .item, td .item:hover ,td .item .item:hover, td[colspan="3"]{background:#FFF !important;}    .photoTag{opacity:0.6 !important;}    .mod .body{border-top:0px solid #FFF !important;}r      .pager.light{padding-top:10px !important;padding-bottom:10px !important;}#networks .body, .login{        border: 1px solid #ACD0EE !important;        margin-top:-1px !important;}form fieldset.formbox {-moz-border-radius:0 !important;-webkit-border-radius:0 !important;margin-top:-1px !important;}.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting{border:none !important;}ul.subMenu a, ul.subMenu li, ul#options a{color:#888 !important;}div.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}.loginCanvas #login{margin-top:-1px !important;}#latest_photos h3 {        border: solid #ACD0EE !important;        border-width: 1px 0 0 0 !important;}.mod.c .actions .dropDown{margin-top:1px !important;}img[src="http://estaticosak1.tuenti.com/layout/web2/images/save.gif"]{display:none !important;}form.eventChoices fieldset .option{margin-left:-1px !important;}.mod.n .body{border-top:1px solid #DCDCDC !important;}#event_not_invited_friends_list .item.disabled{display:none;}.footer{margin-bottom:20px !important} .pager.light{margin-top:10px !important;}';
		//Diseño "tuentiblue" de ardo99 (http://userstyles.org/styles/18507)
		if (GM_getValue(id+'radiorediseño2') == true) var css = "@namespace url(http://www.w3.org/1999/xhtml); #main_info{background: !important; color:black !important;} .views{color:transparent!important;} .body,.item {background:#ACD0Ee url()center center repeat-x !important; color:black !important; border:#000 b2b4 0px solid !important} .body a,.item a{color:black!important; text-decoration:none !important; font-weight: bold !important} .body a:hover,.item a:hover{color: grey ! important; background-color:!important} .body a:visited,.item a:visited{color:black!important} .main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:3px;} .header, #subheader{margin:0 !important;} .actions a, .itemActions a, .itemActions span{margin-right:4px !important;} .container, #latest_photos, .blockedFriends, #banned_photos .body{ background: transparent!important; border: solid transparent !important; border-width: 0 1px 1px 1px !important; } .item, #basic_information_form { background: #ACD0Ee !important; border: 5px solid #acd0ee !important; margin-top:-1px !important; } .setting { border: solid #ACD0EE!important; border-width: 0px 1px 1px 1px !important; } .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:1px solid #ACD0EE !important;} #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;} div.loading {right:-40px !important;} div .note { background: #fbfbfb !important; border: #fff!important; } button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message { -moz-border-radius:20px !important;border: 5px red!important; -webkit-border-radius:20px !important; } #lightbox_overlay{background:#000!important;} #ban_photo_link{width:100% !important;} .item:hover, #latest_photos:hover, .mediaInfo:hover { background:#f9f9f9 !important; } #top_videos .mediaInfo:hover{background: transparent !important} .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{ border: transparent 3px !important; -moz-border-radius-topleft:20px !important; -moz-border-radius-topright:20px !important; -webkit-border-radius-topleft:20px !important; -webkit-border-radius-topright:20px !important; } .item, #latest_photos .body{ padding:3px !important; } td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;} .photoTag{opacity:0.6 !important;} .mod .body{border-top:0px solid #FFF !important;} r .pager.light{ padding-top:10px !important; padding-bottom:10px !important;} #networks .body, .login{ border: 1px solid #ACD0EE !important; margin-top:-1px !important;} form fieldset.formbox { -moz-border-radius:5 !important; -webkit-border-radius:5 !important; margin-top:-1px !important;} .mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting {border:none !important;} ul.subMenu a, ul.subMenu li, ul#options a{color:grey !important;} div.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;} .loginCanvas #login{margin-top:-1px !important;} #latest_photos h3 { border: solid transparent!important; border-width: 0px 0 0 0 !important; } .mod.c .actions .dropDown{margin-top:1px !important;}";
		//Diseño "TuentiStyle" de draco1989 (http://userstyles.org/styles/18119)
		if (GM_getValue(id+'radiorediseño3') == true) var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Generales*/ #main_info{background: #D2E5F1 !important; color:black !important;} .views{color:black !important;} .item {background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg)center center repeat-x !important; color:white !important; border:#00b2b4 1px solid !important} .body{background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg) top repeat-x !important; color:white !important; border:#00b2b4 1px solid !important} .body a,.item a{color:#dfdfdf!important; text-decoration:none !important; font-weight:bold !important} .body a:hover,.item a:hover{color:#000!important; background-color:#D2E5F1 !important} .body a:visited,.item a:visited{color:#dfdfdf!important} .viewMore{background: #D2E5F1 !important; color:black !important} .viewMore a,.viewMore a:visited{color:black !important} /* Vista foto*/ #breadcrumbs a{color:#dfdfdf!important; text-decoration:none !important; font-weight:bold !important} #breadcrumbs a:hover{color:#000!important; background-color:#D2E5F1 !important} #breadcrumbs a:visited{color:#dfdfdf!important; text-decoration:none !important; font-weight:bold !important} .breadcrumbs,.breadcrumbs>.arrow,.breadcrumbs>.count{color:white !important;} /* Perfil*/ #friends>.body {background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg)top center repeat-x !important; color:white !important; border:#00b2b4 1px solid !important} blockquote p{color:#C0DCEB !important} blockquote {background:#4000c0 !important} .informationList>dl>dt,.date {color:black !important} blockquote>.author>.date {color:#00ffa0 !important} #blog>.item {background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg)center top repeat-x !important; color:white !important; border:#00b2b4 1px solid !important}";
		//Diseño "TuentiSkin" de alarico750 (http://userstyles.org/styles/19064)	
		if (GM_getValue(id+'radiorediseño4') == true) var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Generales*/} #main_info{background: #666666 !important; color:black !important;} .views{color:black !important;} .item {background:#C0C0C0 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png)center center repeat-x !important; color:#666666 !important; border:#015EB4 1px solid !important} .body{background:#C0C0C0 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png) top repeat-x !important; color:#666666!important; border:#015EB4 1px solid !important} .body a,.item a{color:#666666!important; text-decoration:none !important; font-weight:bold !important} .body a:hover,.item a:hover{color:#000!important; background-color:#666666 !important} .body a:visited,.item a:visited{color:#666666!important} .viewMore{background: #666666 !important; color:black !important} .viewMore a,.viewMore a:visited{color:black !important} /* Vista foto*/ #breadcrumbs a{color:#666666!important; text-decoration:none !important; font-weight:bold !important} #breadcrumbs a:hover{color:#000!important; background-color:#666666 !important} #breadcrumbs a:visited{color:#666666!important; text-decoration:none !important; font-weight:bold !important} .breadcrumbs,.breadcrumbs>.arrow,.breadcrumbs>.count{color:white !important;} /* Perfil*/ #friends>.body {background:#C0C0C0 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png)top center repeat-x !important; color:#666666 !important; border:#0976B4 1px solid !important} blockquote p{color:#C0C0C0 !important} blockquote {background:#666666 !important} .informationList>dl>dt,.date {color:black !important} blockquote>.author>.date {color:#666666 !important} #blog>.item {background:#666666 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png)center top repeat-x !important; color:#666666 !important; border:#00b2b4 1px solid !important}";
		//Diseño "Likern"
		if (GM_getValue(id+'radiorediseño5') == true) var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Generales*/ #main_info{background: #D1D1D1 !important; color:black; border:#000000 1px solid !important} .views{color:black !important;} .item {background:#D1D1D1 url()center center repeat-x !important; color:#D1D1D1 !important; border:#000000 1px solid !important} .body{background:#D1D1D1 url() top repeat-x !important; color:#D1D1D1!important; border:#000000 1px solid !important} .body a,.item a{color:#000000!important; text-decoration:none !important; font-weight:bold !important} .body a:hover,.item a:hover{color:#000!important; background-color:#00000 !important} .body a:visited,.item a:visited{color:#000000!important} .viewMore{background: #666666 !important; color:black !important} .viewMore a,.viewMore a:visited{color:black !important} /* Vista foto*/ #breadcrumbs a{color:#666666!important; text-decoration:none !important; font-weight:bold !important} #breadcrumbs a:hover{color:#000!important; background-color:#666666 !important} #breadcrumbs a:visited{color:#666666!important; text-decoration:none !important; font-weight:bold !important} .breadcrumbs,.breadcrumbs>.arrow,.breadcrumbs>.count{color:white !important;} /* Perfil*/ #friends>.body {background:#FF0000 url()top center repeat-x !important; color:#666666 !important; border:#0976B4 1px solid !important} blockquote p{color:#ffffff !important} blockquote {background:#666666 !important} .informationList>dl>dt,.date {color:black !important} blockquote>.author>.date {color:#666666 !important} #blog>.item {background:#666666 url(#D1D1D1)center top repeat-x !important; color:#666666 !important; border:#00b2b4 1px solid !important}";
		//Diseño "Pinxil"
		if (GM_getValue(id+'radiorediseño6') == true) var css = "@namespace url(http://www.w3.org/1999/xhtml); #main_info{background: #FFBCF2 !important; color:white !important; border:#790061 3px solid !important} .views{color:black !important;} .item {background:#FFD0F6 !important; color:white !important; border:#790061 1px solid !important} .body{background:#FFD0F6!important; color:white !important; border:#790061 3px solid !important} .body a,.item a{color:#000000!important; text-decoration:none !important; font-weight:bold !important} .actions span {color: #753f93 !important;}a,h2,h3,h4,h5,li,a small {color: #5c3273 !important;} #pageHeader a {color: #ede3f3 !important;}#pageHeader a:hover {color: #fff !important;} .searchBar {background-color: #f8f4fa !important;border-color: #e0ceea !important;} ul#sections li a.active {background-color: #e5d5ed !important;border-color: #d0b5df !important;} ul#sections a {border-color: #e5d5ed !important;}ul#sections a:hover  .dpBody {border-color: #b488cc !important;} }";
		//Diseño "LoomySkin"
		if (GM_getValue(id+'radiorediseño7') == true) var css = "@namespace url(http://www.w3.org/1999/xhtml); #main_info{background: #64A3CF !important; color:white !important; border:#EBEBEB 3px solid !important} .views{color:black !important;} .item {background:#509BD0 !important; color:white !important; border:#ffffff 1px solid !important} .body{background:#64A3CF!important; color:white !important; border:#EBEBEB 3px solid !important} .body a,.item a{color:#00446E!important; text-decoration:none !important; font-weight:bold !important} .actions span {color: #753f93 !important;}a,h2,h3,h4,h5,li,a small {color: #282549 !important;} #pageHeader a {color: #ede3f3 !important;}#pageHeader a:hover {color: #000000 !important;} .searchBar {background-color: #000000 !important;border-color: #4780AC !important;} ul#sections li a.active {background-color: #2270AC !important;border-color: #ffffff !important;} ul#sections a {border-color: #e5d5ed !important;}ul#sections a:hover  .dpBody {border-color: #b488cc !important;} }";
		//Diseño "TuentiRed" de Daniko (http://userstyles.org/styles/19955)
		if (GM_getValue(id+'radiorediseño8') == true) var css = "#main_info{background:  !important; color:black\n!important;}\n\n.views{color:red!important;}\n\n\n\n.body,.item {background: url(http://i05.pan.tuenti.com/i/3/600/o/N/35WmBozaW3BBXlAeI0o.0.jpg)center center repeat-x !important; color:black!important; border:#000\nb2b4 0px solid !important}\n\n.body a,.item a{color:black!important; text-decoration:none !important; font-weight:  bold  !important}\n\n.body a:hover,.item a:hover{color: #800000 ! important; background-color:!important}\n\n.body a:visited,.item a:visited{color:black!important}\n\n\n\n\n.main .mod.c.viewMore, #friends_updates .item{color: white ! important;}, .header , #subheader {padding:3px;}\n\n .header{background-color: red  ! important;}  , .subheader {margin:10 !important;}\n\n\n\n.actions  a, .itemActions  a, .itemActions span{margin-right:4px !important;}\n\n\n\n	.container , #latest_photos , .blockedFriends, #banned_photos .body{\n\n        background: transparent!important;\n\n        border: solid transparent !important;\n\n        border-width: 0 1px 1px 1px !important;\n\n}\n\n\n\n.item, #basic_information_form {\n\n        background:url (http://i05.pan.tuenti.com/i/3/600/o/N/35WmBozaW3BBXlAeI0o.0.jpg) !important;\n\n        border: 3px solid #000000 !important;\n\n        margin-top:-1px !important;\n\n}\n\n    .setting {\n\n        border: solid black!important;\n\n        border-width: 3px 3px 3px 3px  !important;\n\n    }\n\n    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:2px solid white !important;}\n\n\n\n\n\n    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background: white !important; padding-left:6px !important;}\n\n\n\n    div.loading {right:-40px !important;}\n\n\n\n    div .note {\n\n        background: #fbfbfb  !important;\n\n        border: #fff!important;\n\n    }\n\n\n\n    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {\n\n        -moz-border-radius:3px !important;border: 5px white!important;\n\n        -webkit-border-radius:7px !important;\n\n    }\n\n\n\n\n\n\n\n    #lightbox_overlay{background:#000!important;}\n\n\n\n    #ban_photo_link{width:100% !important;}\n\n\n\n    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {\n\n        background: #e24747 !important;\n\n    }\n\n	#top_videos .mediaInfo:hover{background: transparent !important}\n\n\n\n    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{\n\n        border: transparent 3px !important;\n\n        -moz-border-radius-topleft:10px !important;\n\n        -moz-border-radius-topright:10px !important;\n\n        -webkit-border-radius-topleft:10px !important;\n\n        -webkit-border-radius-topright:10px !important;\n\n    }\n\n\n\n    .item, #latest_photos .body{\n\n        padding:3px !important;\n\n    }\n\n\n\n\n\n    td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;}\n\n\n\n    .photoTag{opacity:0.6 !important;}\n\n	\n\n.mod .body{border-top:0px solid #FFF !important;}\n\nr	\n\n.pager.light{\n\npadding-top:0px !important;\n\npadding-bottom:1px !important;}\n\n\n\n#networks .body, .login{\n\n        border: 1px solid #eeacac !important;\n\n        margin-top:-1px !important;}\n\n\n\nform fieldset.formbox {\n\n-moz-border-radius:3 !important;\n\n-webkit-border-radius:3 !important;\n\nmargin-top:-1px !important;}\n\n\n\n.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting\n\n{border:none !important;}\n\nul.subMenu a, ul.subMenu li, ul#options a{color:grey!important;}\n\ndiv.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}\n\n.loginCanvas #login{margin-top:-1px !important;}\n\n\n\n#latest_photos h3 {\n\n        border: solid transparent!important;\n\n        border-width: 0px 0 0 0 !important;\n\n\n\n}\n\n.mod.c .actions .dropDown{margin-top:1px !important;}";
		//Diseño "TuentiPink" de Daniko (http://userstyles.org/styles/19958)
		if (GM_getValue(id+'radiorediseño9') == true) var css = "#main_info{background: url(http://im170.ll.tuenti.com/i21/i/5/600/3/D/pXG7TtNna0VsLwIMmxQN.0.jpg) repeat  !important; color:black\n!important;}\n\n.views{color:white!important;}\n\n\n\n.body,.item {background: url(http://i49.pan.tuenti.com/i/7/600/1/s/7E2Gk6f2ZiOgmhKDnFzz.0.jpg)center center repeat !important; color:black!important; border:#000\n1px solid !important}\n\n.body a{color:white!important;},.item a{color:white!important; text-decoration:none !important; font-weight:  bold  !important}\n\n.body a:hover,.item a:hover{color: black !important; background-color: transparent !important;}\n\n.body a:visited,.item a:visited{color:#381233!important}\n\n\n\n\n.main .mod.c.viewMore, #friends_updates .item{color: white !important;}, .header{color: black !important;} , #subheader {padding:3px;}\n\n .header{background: url(http://i49.pan.tuenti.com/i/7/600/1/s/7E2Gk6f2ZiOgmhKDnFzz.0.jpg)  ! important;}  , .subheader {margin:10 !important;}\n\n\n\n.actions  a, .itemActions  a, .itemActions span {margin-right:4px !important;}\n\n\n\n	.container, #latest_photos, .blockedFriends, #banned_photos .body{\n\n        background: transparent!important;\n\n        border: solid transparent !important;\n\n        border-width: 0px 1px 1px 1px !important;\n\n}\n\n\n\n.item, #basic_information_form {\n\n        background:url (http://im158.ll.tuenti.com/i44/i/7/600/2/N/qKguGqH2uiBs9re_WfZw.0.jpg) !important;\n\n        border: 2px solid black !important;\n\n        margin-top:-1px !important;\n\n}\n\n    .setting {\n\n        border: solid black!important;\n\n        border-width: 3px 3px 3px 3px  !important;\n\n    }\n\n    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:2px solid white !important;}\n\n\n\n\n\n    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background: white !important; padding-left:6px !important;}\n\n\n\n    div.loading {right:-40px !important;}\n\n\n\n    div .note {\n\n        background: #ff9dfc  !important;\n\n        border: #fff!important;\n\n    }\n\n\n\n    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {\n\n        -moz-border-radius:3px !important;border: 5px white!important;\n\n        -webkit-border-radius:7px !important;\n\n    }\n\n\n\n\n\n\n\n    #lightbox_overlay{background:#000!important;}\n\n\n\n    #ban_photo_link{width:100% !important;}\n\n\n\n    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {\n\n        background: #ff4ef9 !important;\n\n    }\n\n	#top_videos .mediaInfo:hover{background: transparent !important}\n\n\n\n    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{\n\n        border: transparent 3px !important;\n\n        -moz-border-radius-topleft:10px !important;\n\n        -moz-border-radius-topright:10px !important;\n\n        -webkit-border-radius-topleft:10px !important;\n\n        -webkit-border-radius-topright:10px !important;\n\n    }\n\n\n\n    .item, #latest_photos .body{\n\n        padding:3px !important;\n\n    }\n\n\n\n\n\n    td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;}\n\n\n\n    .photoTag{opacity:0.6 !important;}\n\n	\n\n.mod .body{border-top:0px solid #FFF !important;}\n\nr	\n\n.pager.light{\n\npadding-top:0px !important;\n\npadding-bottom:1px !important;}\n\n\n\n#networks .body, .login{\n\n        border: 1px solid #eeacac !important;\n\n        margin-top:-1px !important;}\n\n\n\nform fieldset.formbox {\n\n-moz-border-radius:3 !important;\n\n-webkit-border-radius:3 !important;\n\nmargin-top:-1px !important;}\n\n\n\n.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting\n\n{border:none !important;}\n\nul.subMenu a, ul.subMenu li, ul#options a{color:grey!important;}\n\ndiv.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}\n\n.loginCanvas #login{margin-top:-1px !important;}\n\n\n\n#latest_photos h3 {\n\n        border: solid transparent!important;\n\n        border-width: 0px 0 0 0 !important;\n\n\n\n}\n\n.mod.c .actions .dropDown{margin-top:1px !important;}";
		//Diseño "tuentiblue II (PINK VERSION)" de ardo99 (http://userstyles.org/styles/20143)
		if (GM_getValue(id+'radiorediseño10') == true) var css = "#main_info{background:  !important; color:black  !important;}\n.views{color:transparent!important;}\n\n.body,.item {background:#FFCCFF url()center center repeat-x !important; color:black !important; border:white   2px solid !important}\n.body a,.item a{color:black!important; text-decoration:none !important; font-weight:  bold  !important}\n.body a:hover,.item a:hover{color: grey ! important; background-color:!important}\n.body a:visited,.item a:visited{color:black!important}\n\n\n.main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:3px;}\n .header, #subheader{margin:10 !important;}\n\n.actions a, .itemActions a, .itemActions span{margin-right:4px !important;}\n\n	.container, #latest_photos, .blockedFriends, #banned_photos .body{\n        background: transparent!important;\n        border: solid transparent !important;\n        border-width: 0 1px 1px 1px !important;\n}\n\n.item, #basic_information_form {\n        background: #FFCCFF !important;\n        border: 1px solid white !important;\n        margin-top:-1px !important;\n}\n    .setting {\n        border: solid white!important;\n        border-width: 0px 1px 1px 1px !important;\n    }\n    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:1px solid white !important;}\n\n\n    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;}\n\n    div.loading {right:-40px !important;}\n\n    div .note {\n        background: #fbfbfb  !important;\n        border: #fff!important;\n    }\n\n    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {\n        -moz-border-radius:7px !important;border: 5px black !important;\n        -webkit-border-radius:7px !important;\n    }\n\n\n\n    #lightbox_overlay{background:#000!important;}\n\n    #ban_photo_link{width:100% !important;}\n\n    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {\n        background:white !important;\n    }\n	#top_videos .mediaInfo:hover{background: transparent !important}\n\n    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{\n        border: transparent 3px !important;\n        -moz-border-radius-topleft:10px !important;\n        -moz-border-radius-topright:10px !important;\n        -webkit-border-radius-topleft:10px !important;\n        -webkit-border-radius-topright:10px !important;\n    }\n\n    .item, #latest_photos .body{\n        padding:3px !important;\n    }\n\n\n    td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;}\n\n    .photoTag{opacity:0.6 !important;}\n	\n.mod .body{border-top:0px solid #FFF !important;}\nr	\n.pager.light{\npadding-top:0px !important;\npadding-bottom:0px !important;}\n\n#networks .body, .login{\n        border: 1px solid #FF99FF !important;\n        margin-top:-1px !important;}\n\nform fieldset.formbox {\n-moz-border-radius:3 !important;\n-webkit-border-radius:3 !important;\nmargin-top:-1px !important;}\n\n.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting\n{border:none !important;}\nul.subMenu a, ul.subMenu li, ul#options a{color:red  !important;}\ndiv.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}\n.loginCanvas #login{margin-top:-1px !important;}\n\n#latest_photos h3 {\n        border: solid transparent!important;\n        border-width: 0px 0 0 0 !important;\n\n}\n.mod.c .actions .dropDown{margin-top:1px !important;}";
		//Diseño "Azul"
		if (GM_getValue(id+'radiorediseño11') == true) var css = ".header { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#7152C9 none repeat scroll 0 0; border-color:-moz-use-text-color #7152C9 #7152C9; border-style:none solid solid; border-width:0 1px 1px; height:30px; line-height:18px; } .header .sections a.active, .header .sections a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#5230AA none repeat scroll 0 0; text-decoration:none; } .header .settings a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#5230AA none repeat scroll 0 0; text-decoration:none; } .header a.logo { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent url(http://img337.imageshack.us/img337/2879/azul.png) no-repeat scroll center center; display:block; float:left; height:30px; width:96px; } .sections input { border:1px solid #5230AA; color:#8A8A8A; font-size:11px; padding:3px; } .main .mod h3 { border-color:#7355CD #7355CD #5230AA; border-style:solid; border-width:1px; } .mod h3 { text-shadow:none; -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-topleft:3px; -moz-border-radius-topright:3px; background:#8964F3 none repeat scroll 0 0; border-bottom:2px solid #8964F3; color:#FFFFFF; font-size:12px; line-height:12px; padding:6px 9px 5px; } a { color:#000000; text-decoration:none; } button.send { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#7353C9 none repeat scroll 0 0; border:1px solid #5C3AB3; color:#FFFFFF; }";
		//Diseño "AzulClaro"
		if (GM_getValue(id+'radiorediseño12') == true) var css = ".header { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#53BFC8 none repeat scroll 0 0; border-color:-moz-use-text-color #53BFC8 #53BFC8; border-style:none solid solid; border-width:0 1px 1px; height:30px; line-height:18px; } .header .sections a.active, .header .sections a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#33A1AC none repeat scroll 0 0; text-decoration:none; } .header .settings a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#33A1AC none repeat scroll 0 0; text-decoration:none; } .header a.logo { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent url(http://img689.imageshack.us/img689/1038/azulclaro.png) no-repeat scroll center center; display:block; float:left; height:30px; width:96px; } .sections input { border:1px solid #33A1AC; color:#8A8A8A; font-size:11px; padding:3px; } button.send { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#33A1AC none repeat scroll 0 0; border:1px solid #52BEC7; color:#FFFFFF; } .main .mod h3 { border-color:#52BEC7 #52BEC7 #29939D; border-style:solid; border-width:1px; } .mod h3 { text-shadow:none; -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-topleft:3px; -moz-border-radius-topright:3px; background:#53BFC8 none repeat scroll 0 0; border-bottom:2px solid #91B6D0; color:#FFFFFF; font-size:12px; line-height:12px; padding:6px 9px 5px; }";
		//Diseño "Naranja"
		if (GM_getValue(id+'radiorediseño13') == true) var css = ".header { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#FF951C none repeat-x scroll 0 -41px; border-color:-moz-use-text-color #FF951C #FF951C; border-style:none solid solid; border-width:0 1px 1px; height:30px; line-height:18px; } .header .sections a.active, .header .sections a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#DE6E00 none repeat-x scroll 0 -76px; text-decoration:none; } .header a.logo { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent url(http://img39.imageshack.us/img39/4459/naranja.png) no-repeat scroll center center; display:block; float:left; height:30px; width:96px; } a { color:#C55F00; text-decoration:none; } .sections input { border:1px solid #FF961E; color:#8A8A8A; font-size:11px; padding:3px; } .mod h3 { text-shadow:none; -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-topleft:3px; -moz-border-radius-topright:3px; background:#FFC077 none repeat-x scroll 0 -182px; border-bottom:1px solid #F37000; color:#F37000; font-size:12px; line-height:12px; padding:6px 9px 5px; }";
		//Diseño "Rojo"
		if (GM_getValue(id+'radiorediseño14') == true) var css = ".header { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#FF4023 none repeat-x scroll 0 -41px; border-color:-moz-use-text-color #F32500 #F32500; border-style:none solid solid; border-width:0 1px 1px; height:30px; line-height:18px; } .header .sections a.active, .header .sections a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#E02200 none repeat-x scroll 0 -76px; text-decoration:none; } .sections input { border:1px solid #FF4022; color:#8A8A8A; font-size:11px; padding:3px; } .header a.logo { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent url(http://img405.imageshack.us/img405/7104/rojo.png) no-repeat scroll center center; display:block; float:left; height:30px; width:96px; } a { color:#E3462D; text-decoration:none; } .mod.n .body { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-bottomleft:3px; -moz-border-radius-bottomright:3px; -moz-border-radius-topleft:3px; -moz-border-radius-topright:3px; background:#D22000 url(/layout/web2/images/sprites/shadow_maininfo.24292.png) repeat-x scroll left bottom; border:1px solid #D22000; padding:10px; } .main .mod h3 { border-color:#F17B66 #F17B66 #D22000; border-style:solid; border-width:1px; } .mod h3 { text-shadow:none; -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-topleft:3px; -moz-border-radius-topright:3px; background:#E02200 none repeat-x scroll 0 -182px; border-bottom:1px solid #E02200; color:#FFFFFF; font-size:12px; line-height:12px; padding:6px 9px 5px; }";
		//Diseño "Hello-Kitty"
		if (GM_getValue(id+'radiorediseño15') == true) var css = ".header { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#D14AC7 none repeat-x scroll 0 -41px; border-color:-moz-use-text-color #D14AC7 #D14AC7; border-style:none solid solid; border-width:0 1px 1px; height:30px; line-height:18px; } .header .sections a.active, .header .sections a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#B3299D none repeat-x scroll 0 -76px; text-decoration:none; } .header .settings a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#B3299D none repeat-x scroll 0 -76px; text-decoration:none; } .header a.logo { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent url(http://img40.imageshack.us/img40/2094/rosav.png) no-repeat scroll center center; display:block; float:left; height:30px; width:96px; } .main .mod h3 { border:1px solid #E48CD6; } .mod h3 { text-shadow:none; -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-topleft:3px; -moz-border-radius-topright:3px; background:#BB31AA none repeat scroll 0 0; border-bottom:1px solid #BB31AA; color:#FFFFFF; font-size:12px; line-height:12px; padding:6px 9px 5px; } button.send { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#7F0171 none repeat scroll 0 0; border:1px solid #000000; color:#FFFFFF; } a { color:#F781F3; text-decoration:none; } .mod.d .item { border-bottom:1px solid #000000; clear:both; height:1%; overflow:hidden; padding:10px 0; } .mod.m li a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#E48CD6 none repeat scroll 0 0; border-color:#E48CD6 -moz-use-text-color -moz-use-text-color; border-style:solid none none; border-width:1px 0 0; color:#FFFFFF; text-decoration:none; } element.style { background-color:#D14AC7 !important; display:block; padding-bottom:5px; padding-left:5px; padding-right:5px; padding-top:5px; position:absolute; text-align:right; z-index:200000; } .sections input { border:2px solid #BB31AA; color:#FFFFFF; font-size:11px; padding:1px; } .dropDown input { color:#000000; left:0; margin:0; position:absolute; top:0; } .sections input.hover { -moz-border-radius-bottomleft: 0; -moz-border-radius-bottomright: 0; border: 2px solid #BB31AA; color: #333333; } .subHeader { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-bottomleft:3px; -moz-border-radius-bottomright:3px; background:#F6CEF5 none repeat-x scroll 0 -111px; border:1px solid #DF01D7; clear:both; height:34px; } .personalStatus span.hour { color:#BB31AA; left:195px; position:relative; text-shadow:0 0 0 #FFFFFF; top:7px; } .mod.n ul { border-top:1px solid #DF01D7; margin-top:10px; padding-top:5px; } .mod.n .body { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-bottomleft:3px; -moz-border-radius-bottomright:3px; -moz-border-radius-topleft:3px; -moz-border-radius-topright:3px; background:#F8E0F7 none repeat-x scroll left bottom; border:1px solid #DF01D7; padding:10px; } .canvas .pager.light { background-color:transparent; height:1%; overflow:hidden; padding-top:10px; } a.avatarFix, span.avatarFix { background-color:transparent; border:1px solid #B3299D; display:block; float:left; height:30px; margin-right:7px; padding:2px; width:30px; } .sections li a span.inbox { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent none repeat scroll 0 0; display:inline-block; font-size:10px; font-weight:normal; height:18px; line-height:18px; margin-left:2px; text-align:center; vertical-align:middle; } .sections li a span.inbox span { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent none repeat scroll 0 0; display:inline-block; margin-left:7px; padding-right:8px; vertical-align:middle; } .sections li a:hover span.inbox span, .sections li .active span.inbox span { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent none repeat scroll 0 0; } .sections li a:hover span.inbox, .sections li .active span.inbox { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent none repeat scroll 0 0; } .sidebar .mod.form h3 { border:1px solid #E48CD6; } form fieldset.formbox { background-color:#F8E0F7; border:1px solid #F8E0F7; } input, textarea, select { border:1px solid #DF01D7; } .mediaBar a { color:#B404AE; } form fieldset.formbox label.inline { color:#B404AE; } input.focus, textarea.focus, select.focus, form input.active, form input.hover, input:focus, textarea:focus, select:focus { border: 1px solid #AC58FA; color: #333333; } a:hover img { border:1px solid #B3299D; } a img, img { background-color:transparent; border:1px solid #B3299D; } .sidebar .mod { background-color:#F8E0EC; border:1px solid #E48CD6; } button { border:1px solid #E48CD6; } element.style { background-color:#538FBB !important; } .actions { background:transparent none repeat scroll 0 0; } .note.success { background-color:#F6CEF5; border:1px solid #E48CD6; color:#666666; } form fieldset.formbox { background-color:#F8E0F7; border:1px solid #F8E0F7; } input, textarea, select { border:1px solid #DF01D7; } .mediaBar a { color:#B404AE; } form fieldset.formbox label.inline { color:#B404AE; } input.focus, textarea.focus, select.focus, form input.active, form input.hover, input:focus, textarea:focus, select:focus { border: 1px solid #AC58FA; color: #333333; } a:hover img { border:1px solid #B3299D; } a img, img { background-color:transparent; border:1px solid #B3299D; } .sidebar .mod { background-color:#F8E0EC; border:1px solid #E48CD6; } button { border:1px solid #E48CD6; } .chooseAlbum, .uploadPhotos { background:#FFFFFF url(http://www.clikkare.it/post/wp-content/uploads/2009/01/hello-kitty3.jpg) no-repeat center; } .header { text-shadow:1px 0 1px #000000; } div.loading { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent url(http://img205.imageshack.us/img205/4083/ajaxloaderw.gif) no-repeat scroll center center; height:90px; position:absolute; right:-20px; top:3px; width:1200px; } .chatMod.loader h3 strong { background: transparent url(http://img697.imageshack.us/img697/2134/ajaxloader.gif) no-repeat scroll 0 1px } .chatMod.online h3 strong { background:transparent url(http://img146.imageshack.us/img146/731/botond.gif) no-repeat scroll 0 3px; } .chatRoster ul li.online a.friend { background:transparent url(http://img146.imageshack.us/img146/731/botond.gif) no-repeat scroll 9px 50%; } .canvas .mod.c.videos .body { background:#F6CEF5 none repeat scroll 0 0; } .mod.f.tagList li.highlight { background:#F6CEF5 none repeat scroll 0 0; } .mod.f.tagList li { background:#F6CEF5 none repeat scroll 0 0; } .mod.n .views { background:transparent url(http://img707.imageshack.us/img707/7424/estadis.gif) no-repeat scroll 0 50%; color:#000000; } h1 { color:#E48CD6; font-size:15px; text-shadow:1px 0 1px #000000; } .uploadPhotos span.dot { background:transparent none repeat scroll 0 0; color:#E48CD6; text-shadow:1px 0 1px #000000; } .chatDockItem.open .avatarFix { background-color:#F6CEF5; border-color:-moz-use-text-color #B3299D #B3299D; border-style:none solid solid; border-width:0 1px 1px; } .chatDockDialogTextarea { background-color:#F6CEF5; border-top:1px solid #B404AE; padding:5px; position:relative; } .chatDockItem .chatDockDialog h3 { background:#F6CEF5 none repeat scroll 0 0; color:#000000; cursor:pointer; font-size:11px; line-height:11px; padding:7px 9px 5px; } .chatDockItems { background-color:#F6CEF5; border-right:1px solid #CCCCCC; border-top:1px solid #CCCCCC; bottom:7px; height:42px; min-width:55px; position:absolute; } .chatDockBlock { background:#F6CEF5 none repeat scroll 0 0; border-top:1px solid #F6CEF5; height:7px; } .chatDockItem.open .chatDockDialog textarea { background:#FBEFF5 none repeat scroll 0 0; } .chatDockItem .chatDockDialogViewport { background:#FBEFF5 none repeat scroll 0 0; border-bottom:1px solid #B404AE; border-top:1px solid #B404AE; padding:1px; } .chatHeader .chatShadow, .chatDockItem.open .chatShadow { background-color:#B404AE; opacity:0.4; } .chatDockItem.open .chatDockDialog { background-color:#B404AE; border:1px solid #B404AE; } .chatDockItem.open .chatDockDialog.active textarea { border-color: #B404AE; } .mod.h .loadImage { background:transparent url(http://img710.imageshack.us/img710/3388/ajaxloader2.gif) no-repeat scroll center center; } .subHeader .progressBar div.bar { background:#FFFFFF url(http://img708.imageshack.us/img708/1193/ajaxloader3.gif) repeat-x scroll 0 -219px; } .subHeader .uploadStatus { background:#FBEFFB none repeat scroll 0 0; border-left:1px solid #FFFFFF; border-right:1px solid #DCDCDC; } .chatDockItem .chatDockDialog h3 { color:#FFFFFF; } .chatDockItem .chatDockDialog h3 { text-shadow:1px 0 1px #000000; } .videoPlayer .videoHeader { border-style:solid none solid solid; color:#F6CEF5; font-size:11px; line-height:11px; text-shadow:1px 0 1px #3B0B39; } .photoTag { border:2px solid #F6CEF5 !important; } .mod.h .photoTag { border:2px solid #F6CEF5 !important; }";
		//Diseño "Hulk"
		if (GM_getValue(id+'radiorediseño16') == true) var css = ".main .mod h3 { border-color:#E3F6CE #E3F6CE #81F781; border-style:solid; border-width:1px; } .mod h3 { text-shadow:none; -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-topleft:3px; -moz-border-radius-topright:3px; background:#CEF6CE none repeat-x scroll 0 -182px; border-bottom:1px solid #81F781; color:#0B610B; font-size:12px; line-height:12px; padding:6px 9px 5px; } .header { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#39CD37 none repeat-x scroll 0 -41px; border-color:-moz-use-text-color #2AB624 #2AB624; border-style:none solid solid; border-width:0 1px 1px; height:30px; line-height:18px; } .header .sections a.active, .header .sections a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#20B81D none repeat-x scroll 0 -76px; text-decoration:none; } button.send { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#62DC58 none repeat-x scroll 0 -34px; border:1px solid #39D23A; color:#FFFFFF; } .header a.logo { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent url(http://img682.imageshack.us/img682/1108/verdet.png) no-repeat scroll center center; display:block; float:left; height:30px; width:96px; } .events { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#EAF6EF none no-repeat scroll 0 -299px; padding:0 0 0 12px; } .mod.n .body { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-bottomleft:3px; -moz-border-radius-bottomright:3px; -moz-border-radius-topleft:3px; -moz-border-radius-topright:3px; background:#FFFFFF url(/layout/web2/images/sprites/shadow_maininfo.24292.png) repeat-x scroll left bottom; border:1px solid #7CD77D; padding:10px; } .sections input { border:1px solid #35CC34; color:#8A8A8A; font-size:11px; padding:3px; } a { color:#1DAD1B; text-decoration:none; } .mod.messagesBox table tr td span.author { color:#1DAD1B; } .mod.messagesBox table tr.unread td.from span.author, .mod.messagesBox table tr.unread td.message { color:#1DAD1B; font-weight:bold; } .mod.messagesBox table tr td.message { color:#1DAD1B; font-size:12px; } .mod.m li a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#1DAD1B none repeat scroll 0 0; border-color:#1DAD1B -moz-use-text-color -moz-use-text-color; border-style:solid none none; border-width:1px 0 0; color:#FFFFFF; text-decoration:none; } .canvas .pager.light { background-color:transparent; } .date, .disabled, .counter, .mobile { clear:none; color:#FFFFFF; } .footer { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#FFFFFF none repeat scroll 0 0; border:5px none #000000; clear:both; margin-bottom:20px; } .sections li a:hover span.inbox, .sections li .active span.inbox { background:transparent none repeat scroll 0 0; } .sections li a:hover span.inbox span, .sections li .active span.inbox span { background:transparent none repeat scroll 0 0; } .header .settings a:hover { background:#20B81D none repeat scroll 0 0; } .mod.d .item { border-bottom:1px solid #FFFFFF; } h4 span { color:#FFFFFF; } .mod.d .friendRequest .info p { color:#FFFFFF; } .sections li a span.inbox { background:transparent none repeat scroll 0 0; } .sections li a span.inbox span { background:transparent none repeat scroll 0 0; } .itemActions a { color:#FFFFFF; } .itemActions a:hover { color:#FFFFFF; } .note.success { background-color:#E3F6CE; border:1px solid #E3F6CE; color:#000000; } .mod.messagesBox .item p { color:#FFFFFF; overflow:hidden; width:625px; word-wrap:break-word; } .videoPlayer .videoHeader { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-topleft:3px; background:#CEF6CE none repeat scroll 0 0; border-color:#CEF6CE; border-style:solid none solid solid; border-width:1px 0 1px 1px; color:#3C4963; font-size:11px; height:11px; line-height:11px; overflow:hidden; padding:7px 5px 5px; position:relative; text-shadow:0 1px 0 #D9E9F1; }";
		addStyle(css,"TP_css");
		//var width=screen.width-8;
		//document.getElementById('divimagen').innerHTML += '<img id="imagenfondo" width="'+width+'" height="'+screen.height+'" style="position: fixed; left:-2px; top:-3px;" src="http://img263.imageshack.us/img263/7137/imageuploadimagewg9.jpg"/>';
	};
};
function compartirestilo(){
	if (document.getElementsByClassName('body informationList')[0] != null){
		if (document.getElementsByClassName('body informationList')[0].innerHTML.indexOf("TPCD") != -1){
			compartirestilo2(0);
		}else{
			if (document.getElementsByClassName('body informationList')[1].innerHTML.indexOf("TPCD") != -1){
				compartirestilo2(1);
			}else{
				if (document.getElementsByClassName('body informationList')[2].innerHTML.indexOf("TPCD") != -1){
					compartirestilo2(2);
				}else{
					noestilo();
				};
			};
		};
	};
};
function compartirestilo2(num){
	if (document.getElementsByClassName('body informationList')[num] != null){
		if (document.getElementsByClassName('body informationList')[num].innerHTML.indexOf("TPCD") != -1){
			cediv=document.getElementsByClassName('body informationList')[num];
			ceinicio=cediv.innerHTML.indexOf("TPCD")+8;
			cefin=cediv.innerHTML.indexOf("/TPCD")-4;
			cecode=cediv.innerHTML.substring(ceinicio,cefin);

			cefinicio=cecode.indexOf("F")+2;
			ceffin=cecode.indexOf(";",cefinicio);
			cef=cecode.substring(cefinicio,ceffin);

			cedinicio=cecode.indexOf("D")+2;
			cedfin=cecode.indexOf(";",cedinicio);
			ced=cecode.substring(cedinicio,cedfin);

			ceqinicio=cecode.indexOf("Q")+2;
			ceqfin=cecode.indexOf(";",ceqinicio);
			ceq=cecode.substring(ceqinicio,ceqfin);

			cepinicio=cecode.indexOf("P")+2;
			cepfin=cecode.indexOf(";",cepinicio);
			cep=cecode.substring(cepinicio,cepfin);

			if (cep.indexOf("$s") != -1) cep=cep.replace("$s","https://");
			if (cep.indexOf("$h") != -1) cep=cep.replace("$h","http://");
			if (cep.indexOf("$w") != -1) cep=cep.replace("$w","www.");

			mostrarestilo()
		}else noestilo();
	}else noestilo();
};
function noestilo(){
		document.body.style.backgroundImage = "";
		document.body.style.backgroundAttachment="";
		document.body.style.backgroundColor = "";
		removeStyle("TP_css")
};
function mostrarestilo(){
	if (document.getElementById('diseñomostrado') == null){
		noestilo()

		if (cef == 1&&body != null) document.body.style.backgroundImage = "url("+cep+")";
		if (cef == 2&&body != null) body.setAttribute("style", "background-color: #E9EFF3");
		if (cef == 3&&body != null) document.body.style.backgroundImage = "url(http://www.dominiotemporal.es/fondos_web/texturas/JoseRico/08_basicas.gif)";
		if (cef == "3v2"){
			if (ceq == 1){
				if(body != null) body.setAttribute("style", "background: url(http://www.minijuegos.com/imagenes/fondomj.gif) repeat-x fixed !important");
			}else{
				if(body != null) body.setAttribute("style", "background: url(http://www.minijuegos.com/imagenes/fondomj.gif) repeat-x !important");
			};
		};
		if (cef == 4){
			if (ceq == 1){
				if(body != null) body.setAttribute("style", "background: url(http://i39.tinypic.com/fdd1g5.jpg) repeat-x fixed #000000 !important");
			}else{
				if(body != null) body.setAttribute("style", "background: url(http://i39.tinypic.com/fdd1g5.jpg) repeat-x #000000 !important");
			};
		};
		if (cef == 5&&body != null) body.setAttribute("style", "background-color: #ABABAB");
		if (cef == 6&&body != null) body.setAttribute("style", "background-color: #C1009A");
		if (cef == 7&&body != null) body.setAttribute("style", "background-color: #64A3CF");
		if (cef == 8&&body != null) body.setAttribute("style", "background-color: black");
		if (cef == 9){
			if (ceq == 1){
				if(body != null) body.setAttribute("style", "background: url(http://im158.ll.tuenti.com/i44/i/7/600/2/N/qKguGqH2uiBs9re_WfZw.0.jpg) repeat fixed !important");
			}else{
				if(body != null) body.setAttribute("style", "background: url(http://im158.ll.tuenti.com/i44/i/7/600/2/N/qKguGqH2uiBs9re_WfZw.0.jpg) repeat !important");
			};
		};
		if (cef == 10){
			if (ceq == 1){
				if(body != null) body.setAttribute("style", "background: url(http://i184.photobucket.com/albums/x79/pixvirtual/us007/gURcMhcABve2.gif) repeat fixed !important");
			}else{
				if(body != null) body.setAttribute("style", "background: url(http://i184.photobucket.com/albums/x79/pixvirtual/us007/gURcMhcABve2.gif) repeat !important");
			};
		};
		if (cef == 11){
			if (ceq == 1){
				if(body != null) body.setAttribute("style", "background: url(http://www.hellokittykat.com/images/wallpapers/hello-kitty-wallpaper-val.jpg) repeat fixed !important");
			}else{
				if(body != null) body.setAttribute("style", "background: url(http://www.hellokittykat.com/images/wallpapers/hello-kitty-wallpaper-val.jpg) repeat !important");
			};
		};
		if (cef == 12){
			if (ceq == 1){
				if(body != null) body.setAttribute("style", "background: url(http://img263.imageshack.us/img263/7137/imageuploadimagewg9.jpg) repeat fixed !important");
			}else{
				if(body != null) body.setAttribute("style", "background: url(http://img263.imageshack.us/img263/7137/imageuploadimagewg9.jpg) repeat !important");
			};
		};
		if (cef == "p"&&body != null) document.body.style.backgroundImage = "url(http://srv0110-07.oak1.imeem.com/g/p/a29385b55e5208eff4ce4b61da16e234_raw.gif)";
		if (ceq == 1&&body != null) document.body.style.backgroundAttachment='fixed';

		//Diseño "Nuevo Tuenti rediseño sutil" de jayjayjay_92 (http://userstyles.org/styles/17626)	
		if (ced == 1) var css = '.main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:0px;} .header, #subheader{margin:0 !important;}.actions a, .itemActions a, .itemActions span{margin-right:4px !important;}	.container, #latest_photos, .blockedFriends, #banned_photos .body{        background: #FFF !important;        border: solid #ACD0EE !important;        border-width: 0 1px 1px 1px !important;}.item, #basic_information_form {        background: #FFF !important;        border: 1px solid #ACD0EE !important;        margin-top:-1px !important;}    .setting {        border: solid #ACD0EE !important;        border-width: 0px 1px 1px 1px !important;    }    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:1px solid #ACD0EE !important;}    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;}    div.loading {right:-40px !important;}    div .note {        background:#fbfbfb !important;        border:#fff !important;    }    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {        -moz-border-radius:5px !important;        -webkit-border-radius:5px !important;    }    #lightbox_overlay{background:#000 !important;}    #ban_photo_link{width:100% !important;}    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {        background:#f9f9f9 !important;    }	#top_videos .mediaInfo:hover{background:transparent !important}    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{        border: solid #ACD0EE 1px !important;        -moz-border-radius-topleft:5px !important;        -moz-border-radius-topright:5px !important;        -webkit-border-radius-topleft:5px !important;        -webkit-border-radius-topright:5px !important;    }    .item, #latest_photos .body{        padding:8px !important;    }    td .item, td .item:hover ,td .item .item:hover, td[colspan="3"]{background:#FFF !important;}    .photoTag{opacity:0.6 !important;}	.mod .body{border-top:0px solid #FFF !important;}r	.pager.light{padding-top:10px !important;padding-bottom:10px !important;}#networks .body, .login{        border: 1px solid #ACD0EE !important;        margin-top:-1px !important;}form fieldset.formbox {-moz-border-radius:0 !important;-webkit-border-radius:0 !important;margin-top:-1px !important;}.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting{border:none !important;}ul.subMenu a, ul.subMenu li, ul#options a{color:#888 !important;}div.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}.loginCanvas #login{margin-top:-1px !important;}#latest_photos h3 {        border: solid #ACD0EE !important;        border-width: 1px 0 0 0 !important;}.mod.c .actions .dropDown{margin-top:1px !important;}img[src="http://estaticosak1.tuenti.com/layout/web2/images/save.gif"]{display:none !important;}form.eventChoices fieldset .option{margin-left:-1px !important;}.mod.n .body{border-top:1px solid #DCDCDC !important;}#event_not_invited_friends_list .item.disabled{display:none;}.footer{margin-bottom:20px !important} .pager.light{margin-top:10px !important;}.actionList h3{border-bottom:1px solid #91B6D0 !important;padding:1px 6px 2px !important;} #negative_actions{border:1px solid #ACD0EE !important;-moz-border-radius-topleft:3px !important;-moz-border-radius-topright:3px!important;} #negative_actions li{background:#ECF3F5 !important; padding-left:6px !important;border-top:1px solid #FFF !important;}#photo .sidebar.right h3{background:#D2E5F1!important;}.main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:0px;} .header, #subheader{margin:0 !important;}.actions a, .itemActions a, .itemActions span{margin-right:4px !important;}    .container, #latest_photos, .blockedFriends, #banned_photos .body{        background: #FFF !important;        border: solid #ACD0EE !important;        border-width: 0 1px 1px 1px !important;}.item, #basic_information_form {        background: #FFF !important;        border: 1px solid #ACD0EE !important;        margin-top:-1px !important;}    .setting {        border: solid #ACD0EE !important;        border-width: 0px 1px 1px 1px !important;    }    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:1px solid #ACD0EE !important;}    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;}    div.loading {right:-40px !important;}    div .note {        background:#fbfbfb !important;        border:#fff !important;    }    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {        -moz-border-radius:5px !important;        -webkit-border-radius:5px !important;    }    #lightbox_overlay{background:#000 !important;}    #ban_photo_link{width:100% !important;}    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {        background:#f9f9f9 !important;    }   #top_videos .mediaInfo:hover{background:transparent !important}    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{        border: solid #ACD0EE 1px !important;        -moz-border-radius-topleft:5px !important;        -moz-border-radius-topright:5px !important;        -webkit-border-radius-topleft:5px !important;        -webkit-border-radius-topright:5px !important;    }    .item, #latest_photos .body{        padding:8px !important;    }    td .item, td .item:hover ,td .item .item:hover, td[colspan="3"]{background:#FFF !important;}    .photoTag{opacity:0.6 !important;}    .mod .body{border-top:0px solid #FFF !important;}r      .pager.light{padding-top:10px !important;padding-bottom:10px !important;}#networks .body, .login{        border: 1px solid #ACD0EE !important;        margin-top:-1px !important;}form fieldset.formbox {-moz-border-radius:0 !important;-webkit-border-radius:0 !important;margin-top:-1px !important;}.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting{border:none !important;}ul.subMenu a, ul.subMenu li, ul#options a{color:#888 !important;}div.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}.loginCanvas #login{margin-top:-1px !important;}#latest_photos h3 {        border: solid #ACD0EE !important;        border-width: 1px 0 0 0 !important;}.mod.c .actions .dropDown{margin-top:1px !important;}img[src="http://estaticosak1.tuenti.com/layout/web2/images/save.gif"]{display:none !important;}form.eventChoices fieldset .option{margin-left:-1px !important;}.mod.n .body{border-top:1px solid #DCDCDC !important;}#event_not_invited_friends_list .item.disabled{display:none;}.footer{margin-bottom:20px !important} .pager.light{margin-top:10px !important;}';
		//Diseño "tuentiblue" de ardo99 (http://userstyles.org/styles/18507)
		if (ced == 2) var css = '@namespace url(http://www.w3.org/1999/xhtml); #main_info{background: !important; color:black !important;} .views{color:transparent!important;} .body,.item {background:#ACD0Ee url()center center repeat-x !important; color:black !important; border:#000 b2b4 0px solid !important} .body a,.item a{color:black!important; text-decoration:none !important; font-weight: bold !important} .body a:hover,.item a:hover{color: grey ! important; background-color:!important} .body a:visited,.item a:visited{color:black!important} .main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:3px;} .header, #subheader{margin:0 !important;} .actions a, .itemActions a, .itemActions span{margin-right:4px !important;} .container, #latest_photos, .blockedFriends, #banned_photos .body{ background: transparent!important; border: solid transparent !important; border-width: 0 1px 1px 1px !important; } .item, #basic_information_form { background: #ACD0Ee !important; border: 5px solid #acd0ee !important; margin-top:-1px !important; } .setting { border: solid #ACD0EE!important; border-width: 0px 1px 1px 1px !important; } .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:1px solid #ACD0EE !important;} #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;} div.loading {right:-40px !important;} div .note { background: #fbfbfb !important; border: #fff!important; } button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message { -moz-border-radius:20px !important;border: 5px red!important; -webkit-border-radius:20px !important; } #lightbox_overlay{background:#000!important;} #ban_photo_link{width:100% !important;} .item:hover, #latest_photos:hover, .mediaInfo:hover { background:#f9f9f9 !important; } #top_videos .mediaInfo:hover{background: transparent !important} .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{ border: transparent 3px !important; -moz-border-radius-topleft:20px !important; -moz-border-radius-topright:20px !important; -webkit-border-radius-topleft:20px !important; -webkit-border-radius-topright:20px !important; } .item, #latest_photos .body{ padding:3px !important; } td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;} .photoTag{opacity:0.6 !important;} .mod .body{border-top:0px solid #FFF !important;} r .pager.light{ padding-top:10px !important; padding-bottom:10px !important;} #networks .body, .login{ border: 1px solid #ACD0EE !important; margin-top:-1px !important;} form fieldset.formbox { -moz-border-radius:5 !important; -webkit-border-radius:5 !important; margin-top:-1px !important;} .mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting {border:none !important;} ul.subMenu a, ul.subMenu li, ul#options a{color:grey !important;} div.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;} .loginCanvas #login{margin-top:-1px !important;} #latest_photos h3 { border: solid transparent!important; border-width: 0px 0 0 0 !important; } .mod.c .actions .dropDown{margin-top:1px !important;}';
		//Diseño "TuentiStyle" de draco1989 (http://userstyles.org/styles/18119)
		if (ced == 3) var css = '@namespace url(http://www.w3.org/1999/xhtml); /* Generales*/ #main_info{background: #D2E5F1 !important; color:black !important;} .views{color:black !important;} .item {background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg)center center repeat-x !important; color:white !important; border:#00b2b4 1px solid !important} .body{background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg) top repeat-x !important; color:white !important; border:#00b2b4 1px solid !important} .body a,.item a{color:#dfdfdf!important; text-decoration:none !important; font-weight:bold !important} .body a:hover,.item a:hover{color:#000!important; background-color:#D2E5F1 !important} .body a:visited,.item a:visited{color:#dfdfdf!important} .viewMore{background: #D2E5F1 !important; color:black !important} .viewMore a,.viewMore a:visited{color:black !important} /* Vista foto*/ #breadcrumbs a{color:#dfdfdf!important; text-decoration:none !important; font-weight:bold !important} #breadcrumbs a:hover{color:#000!important; background-color:#D2E5F1 !important} #breadcrumbs a:visited{color:#dfdfdf!important; text-decoration:none !important; font-weight:bold !important} .breadcrumbs,.breadcrumbs>.arrow,.breadcrumbs>.count{color:white !important;} /* Perfil*/ #friends>.body {background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg)top center repeat-x !important; color:white !important; border:#00b2b4 1px solid !important} blockquote p{color:#C0DCEB !important} blockquote {background:#4000c0 !important} .informationList>dl>dt,.date {color:black !important} blockquote>.author>.date {color:#00ffa0 !important} #blog>.item {background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg)center top repeat-x !important; color:white !important; border:#00b2b4 1px solid !important}';
		//Diseño "TuentiSkin" de alarico750 (http://userstyles.org/styles/19064)	
		if (ced == 4) var css = '@namespace url(http://www.w3.org/1999/xhtml); /* Generales*/} #main_info{background: #666666 !important; color:black !important;} .views{color:black !important;} .item {background:#C0C0C0 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png)center center repeat-x !important; color:#666666 !important; border:#015EB4 1px solid !important} .body{background:#C0C0C0 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png) top repeat-x !important; color:#666666!important; border:#015EB4 1px solid !important} .body a,.item a{color:#666666!important; text-decoration:none !important; font-weight:bold !important} .body a:hover,.item a:hover{color:#000!important; background-color:#666666 !important} .body a:visited,.item a:visited{color:#666666!important} .viewMore{background: #666666 !important; color:black !important} .viewMore a,.viewMore a:visited{color:black !important} /* Vista foto*/ #breadcrumbs a{color:#666666!important; text-decoration:none !important; font-weight:bold !important} #breadcrumbs a:hover{color:#000!important; background-color:#666666 !important} #breadcrumbs a:visited{color:#666666!important; text-decoration:none !important; font-weight:bold !important} .breadcrumbs,.breadcrumbs>.arrow,.breadcrumbs>.count{color:white !important;} /* Perfil*/ #friends>.body {background:#C0C0C0 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png)top center repeat-x !important; color:#666666 !important; border:#0976B4 1px solid !important} blockquote p{color:#C0C0C0 !important} blockquote {background:#666666 !important} .informationList>dl>dt,.date {color:black !important} blockquote>.author>.date {color:#666666 !important} #blog>.item {background:#666666 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png)center top repeat-x !important; color:#666666 !important; border:#00b2b4 1px solid !important}';
		//Diseño "Likern"
		if (ced == 5) var css = '@namespace url(http://www.w3.org/1999/xhtml); /* Generales*/ #main_info{background: #D1D1D1 !important; color:black; border:#000000 1px solid !important} .views{color:black !important;} .item {background:#D1D1D1 url()center center repeat-x !important; color:#D1D1D1 !important; border:#000000 1px solid !important} .body{background:#D1D1D1 url() top repeat-x !important; color:#D1D1D1!important; border:#000000 1px solid !important} .body a,.item a{color:#000000!important; text-decoration:none !important; font-weight:bold !important} .body a:hover,.item a:hover{color:#000!important; background-color:#00000 !important} .body a:visited,.item a:visited{color:#000000!important} .viewMore{background: #666666 !important; color:black !important} .viewMore a,.viewMore a:visited{color:black !important} /* Vista foto*/ #breadcrumbs a{color:#666666!important; text-decoration:none !important; font-weight:bold !important} #breadcrumbs a:hover{color:#000!important; background-color:#666666 !important} #breadcrumbs a:visited{color:#666666!important; text-decoration:none !important; font-weight:bold !important} .breadcrumbs,.breadcrumbs>.arrow,.breadcrumbs>.count{color:white !important;} /* Perfil*/ #friends>.body {background:#FF0000 url()top center repeat-x !important; color:#666666 !important; border:#0976B4 1px solid !important} blockquote p{color:#ffffff !important} blockquote {background:#666666 !important} .informationList>dl>dt,.date {color:black !important} blockquote>.author>.date {color:#666666 !important} #blog>.item {background:#666666 url(#D1D1D1)center top repeat-x !important; color:#666666 !important; border:#00b2b4 1px solid !important}';
		//Diseño "Pinxil"
		if (ced == 6) var css = '@namespace url(http://www.w3.org/1999/xhtml); #main_info{background: #FFBCF2 !important; color:white !important; border:#790061 3px solid !important} .views{color:black !important;} .item {background:#FFD0F6 !important; color:white !important; border:#790061 1px solid !important} .body{background:#FFD0F6!important; color:white !important; border:#790061 3px solid !important} .body a,.item a{color:#000000!important; text-decoration:none !important; font-weight:bold !important} .actions span {color: #753f93 !important;}a,h2,h3,h4,h5,li,a small {color: #5c3273 !important;} #pageHeader a {color: #ede3f3 !important;}#pageHeader a:hover {color: #fff !important;} .searchBar {background-color: #f8f4fa !important;border-color: #e0ceea !important;} ul#sections li a.active {background-color: #e5d5ed !important;border-color: #d0b5df !important;} ul#sections a {border-color: #e5d5ed !important;}ul#sections a:hover  .dpBody {border-color: #b488cc !important;} }';
		//Diseño "LoomySkin"
		if (ced == 7) var css = '@namespace url(http://www.w3.org/1999/xhtml); #main_info{background: #64A3CF !important; color:white !important; border:#EBEBEB 3px solid !important} .views{color:black !important;} .item {background:#509BD0 !important; color:white !important; border:#ffffff 1px solid !important} .body{background:#64A3CF!important; color:white !important; border:#EBEBEB 3px solid !important} .body a,.item a{color:#00446E!important; text-decoration:none !important; font-weight:bold !important} .actions span {color: #753f93 !important;}a,h2,h3,h4,h5,li,a small {color: #282549 !important;} #pageHeader a {color: #ede3f3 !important;}#pageHeader a:hover {color: #000000 !important;} .searchBar {background-color: #000000 !important;border-color: #4780AC !important;} ul#sections li a.active {background-color: #2270AC !important;border-color: #ffffff !important;} ul#sections a {border-color: #e5d5ed !important;}ul#sections a:hover  .dpBody {border-color: #b488cc !important;} }';
		//Diseño "TuentiRed" de Daniko (http://userstyles.org/styles/19955)
		if (ced == 8) var css = '#main_info{background:  !important; color:black\n!important;}\n\n.views{color:red!important;}\n\n\n\n.body,.item {background: url(http://i05.pan.tuenti.com/i/3/600/o/N/35WmBozaW3BBXlAeI0o.0.jpg)center center repeat-x !important; color:black!important; border:#000\nb2b4 0px solid !important}\n\n.body a,.item a{color:black!important; text-decoration:none !important; font-weight:  bold  !important}\n\n.body a:hover,.item a:hover{color: #800000 ! important; background-color:!important}\n\n.body a:visited,.item a:visited{color:black!important}\n\n\n\n\n.main .mod.c.viewMore, #friends_updates .item{color: white ! important;}, .header , #subheader {padding:3px;}\n\n .header{background-color: red  ! important;}  , .subheader {margin:10 !important;}\n\n\n\n.actions  a, .itemActions  a, .itemActions span{margin-right:4px !important;}\n\n\n\n	.container , #latest_photos , .blockedFriends, #banned_photos .body{\n\n        background: transparent!important;\n\n        border: solid transparent !important;\n\n        border-width: 0 1px 1px 1px !important;\n\n}\n\n\n\n.item, #basic_information_form {\n\n        background:url (http://i05.pan.tuenti.com/i/3/600/o/N/35WmBozaW3BBXlAeI0o.0.jpg) !important;\n\n        border: 3px solid #000000 !important;\n\n        margin-top:-1px !important;\n\n}\n\n    .setting {\n\n        border: solid black!important;\n\n        border-width: 3px 3px 3px 3px  !important;\n\n    }\n\n    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:2px solid white !important;}\n\n\n\n\n\n    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background: white !important; padding-left:6px !important;}\n\n\n\n    div.loading {right:-40px !important;}\n\n\n\n    div .note {\n\n        background: #fbfbfb  !important;\n\n        border: #fff!important;\n\n    }\n\n\n\n    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {\n\n        -moz-border-radius:3px !important;border: 5px white!important;\n\n        -webkit-border-radius:7px !important;\n\n    }\n\n\n\n\n\n\n\n    #lightbox_overlay{background:#000!important;}\n\n\n\n    #ban_photo_link{width:100% !important;}\n\n\n\n    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {\n\n        background: #e24747 !important;\n\n    }\n\n	#top_videos .mediaInfo:hover{background: transparent !important}\n\n\n\n    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{\n\n        border: transparent 3px !important;\n\n        -moz-border-radius-topleft:10px !important;\n\n        -moz-border-radius-topright:10px !important;\n\n        -webkit-border-radius-topleft:10px !important;\n\n        -webkit-border-radius-topright:10px !important;\n\n    }\n\n\n\n    .item, #latest_photos .body{\n\n        padding:3px !important;\n\n    }\n\n\n\n\n\n    td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;}\n\n\n\n    .photoTag{opacity:0.6 !important;}\n\n	\n\n.mod .body{border-top:0px solid #FFF !important;}\n\nr	\n\n.pager.light{\n\npadding-top:0px !important;\n\npadding-bottom:1px !important;}\n\n\n\n#networks .body, .login{\n\n        border: 1px solid #eeacac !important;\n\n        margin-top:-1px !important;}\n\n\n\nform fieldset.formbox {\n\n-moz-border-radius:3 !important;\n\n-webkit-border-radius:3 !important;\n\nmargin-top:-1px !important;}\n\n\n\n.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting\n\n{border:none !important;}\n\nul.subMenu a, ul.subMenu li, ul#options a{color:grey!important;}\n\ndiv.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}\n\n.loginCanvas #login{margin-top:-1px !important;}\n\n\n\n#latest_photos h3 {\n\n        border: solid transparent!important;\n\n        border-width: 0px 0 0 0 !important;\n\n\n\n}\n\n.mod.c .actions .dropDown{margin-top:1px !important;}';
		//Diseño "TuentiPink" de Daniko (http://userstyles.org/styles/19958)
		if (ced == 9) var css = '#main_info{background: url(http://im170.ll.tuenti.com/i21/i/5/600/3/D/pXG7TtNna0VsLwIMmxQN.0.jpg) repeat  !important; color:black\n!important;}\n\n.views{color:white!important;}\n\n\n\n.body,.item {background: url(http://i49.pan.tuenti.com/i/7/600/1/s/7E2Gk6f2ZiOgmhKDnFzz.0.jpg)center center repeat !important; color:black!important; border:#000\n1px solid !important}\n\n.body a{color:white!important;},.item a{color:white!important; text-decoration:none !important; font-weight:  bold  !important}\n\n.body a:hover,.item a:hover{color: black !important; background-color: transparent !important;}\n\n.body a:visited,.item a:visited{color:#381233!important}\n\n\n\n\n.main .mod.c.viewMore, #friends_updates .item{color: white !important;}, .header{color: black !important;} , #subheader {padding:3px;}\n\n .header{background: url(http://i49.pan.tuenti.com/i/7/600/1/s/7E2Gk6f2ZiOgmhKDnFzz.0.jpg)  ! important;}  , .subheader {margin:10 !important;}\n\n\n\n.actions  a, .itemActions  a, .itemActions span {margin-right:4px !important;}\n\n\n\n	.container, #latest_photos, .blockedFriends, #banned_photos .body{\n\n        background: transparent!important;\n\n        border: solid transparent !important;\n\n        border-width: 0px 1px 1px 1px !important;\n\n}\n\n\n\n.item, #basic_information_form {\n\n        background:url (http://im158.ll.tuenti.com/i44/i/7/600/2/N/qKguGqH2uiBs9re_WfZw.0.jpg) !important;\n\n        border: 2px solid black !important;\n\n        margin-top:-1px !important;\n\n}\n\n    .setting {\n\n        border: solid black!important;\n\n        border-width: 3px 3px 3px 3px  !important;\n\n    }\n\n    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:2px solid white !important;}\n\n\n\n\n\n    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background: white !important; padding-left:6px !important;}\n\n\n\n    div.loading {right:-40px !important;}\n\n\n\n    div .note {\n\n        background: #ff9dfc  !important;\n\n        border: #fff!important;\n\n    }\n\n\n\n    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {\n\n        -moz-border-radius:3px !important;border: 5px white!important;\n\n        -webkit-border-radius:7px !important;\n\n    }\n\n\n\n\n\n\n\n    #lightbox_overlay{background:#000!important;}\n\n\n\n    #ban_photo_link{width:100% !important;}\n\n\n\n    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {\n\n        background: #ff4ef9 !important;\n\n    }\n\n	#top_videos .mediaInfo:hover{background: transparent !important}\n\n\n\n    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{\n\n        border: transparent 3px !important;\n\n        -moz-border-radius-topleft:10px !important;\n\n        -moz-border-radius-topright:10px !important;\n\n        -webkit-border-radius-topleft:10px !important;\n\n        -webkit-border-radius-topright:10px !important;\n\n    }\n\n\n\n    .item, #latest_photos .body{\n\n        padding:3px !important;\n\n    }\n\n\n\n\n\n    td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;}\n\n\n\n    .photoTag{opacity:0.6 !important;}\n\n	\n\n.mod .body{border-top:0px solid #FFF !important;}\n\nr	\n\n.pager.light{\n\npadding-top:0px !important;\n\npadding-bottom:1px !important;}\n\n\n\n#networks .body, .login{\n\n        border: 1px solid #eeacac !important;\n\n        margin-top:-1px !important;}\n\n\n\nform fieldset.formbox {\n\n-moz-border-radius:3 !important;\n\n-webkit-border-radius:3 !important;\n\nmargin-top:-1px !important;}\n\n\n\n.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting\n\n{border:none !important;}\n\nul.subMenu a, ul.subMenu li, ul#options a{color:grey!important;}\n\ndiv.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}\n\n.loginCanvas #login{margin-top:-1px !important;}\n\n\n\n#latest_photos h3 {\n\n        border: solid transparent!important;\n\n        border-width: 0px 0 0 0 !important;\n\n\n\n}\n\n.mod.c .actions .dropDown{margin-top:1px !important;}';
		//Diseño "tuentiblue II (PINK VERSION)" de ardo99 (http://userstyles.org/styles/20143)
		if (ced == 10) var css = '#main_info{background:  !important; color:black  !important;}\n.views{color:transparent!important;}\n\n.body,.item {background:#FFCCFF url()center center repeat-x !important; color:black !important; border:white   2px solid !important}\n.body a,.item a{color:black!important; text-decoration:none !important; font-weight:  bold  !important}\n.body a:hover,.item a:hover{color: grey ! important; background-color:!important}\n.body a:visited,.item a:visited{color:black!important}\n\n\n.main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:3px;}\n .header, #subheader{margin:10 !important;}\n\n.actions a, .itemActions a, .itemActions span{margin-right:4px !important;}\n\n	.container, #latest_photos, .blockedFriends, #banned_photos .body{\n        background: transparent!important;\n        border: solid transparent !important;\n        border-width: 0 1px 1px 1px !important;\n}\n\n.item, #basic_information_form {\n        background: #FFCCFF !important;\n        border: 1px solid white !important;\n        margin-top:-1px !important;\n}\n    .setting {\n        border: solid white!important;\n        border-width: 0px 1px 1px 1px !important;\n    }\n    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:1px solid white !important;}\n\n\n    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;}\n\n    div.loading {right:-40px !important;}\n\n    div .note {\n        background: #fbfbfb  !important;\n        border: #fff!important;\n    }\n\n    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {\n        -moz-border-radius:7px !important;border: 5px black !important;\n        -webkit-border-radius:7px !important;\n    }\n\n\n\n    #lightbox_overlay{background:#000!important;}\n\n    #ban_photo_link{width:100% !important;}\n\n    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {\n        background:white !important;\n    }\n	#top_videos .mediaInfo:hover{background: transparent !important}\n\n    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{\n        border: transparent 3px !important;\n        -moz-border-radius-topleft:10px !important;\n        -moz-border-radius-topright:10px !important;\n        -webkit-border-radius-topleft:10px !important;\n        -webkit-border-radius-topright:10px !important;\n    }\n\n    .item, #latest_photos .body{\n        padding:3px !important;\n    }\n\n\n    td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;}\n\n    .photoTag{opacity:0.6 !important;}\n	\n.mod .body{border-top:0px solid #FFF !important;}\nr	\n.pager.light{\npadding-top:0px !important;\npadding-bottom:0px !important;}\n\n#networks .body, .login{\n        border: 1px solid #FF99FF !important;\n        margin-top:-1px !important;}\n\nform fieldset.formbox {\n-moz-border-radius:3 !important;\n-webkit-border-radius:3 !important;\nmargin-top:-1px !important;}\n\n.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting\n{border:none !important;}\nul.subMenu a, ul.subMenu li, ul#options a{color:red  !important;}\ndiv.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}\n.loginCanvas #login{margin-top:-1px !important;}\n\n#latest_photos h3 {\n        border: solid transparent!important;\n        border-width: 0px 0 0 0 !important;\n\n}\n.mod.c .actions .dropDown{margin-top:1px !important;}';
		//Diseño "Azul"
		if (ced == 11) var css = '.header { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#7152C9 none repeat scroll 0 0; border-color:-moz-use-text-color #7152C9 #7152C9; border-style:none solid solid; border-width:0 1px 1px; height:30px; line-height:18px; } .header .sections a.active, .header .sections a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#5230AA none repeat scroll 0 0; text-decoration:none; } .header .settings a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#5230AA none repeat scroll 0 0; text-decoration:none; } .header a.logo { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent url(http://img337.imageshack.us/img337/2879/azul.png) no-repeat scroll center center; display:block; float:left; height:30px; width:96px; } .sections input { border:1px solid #5230AA; color:#8A8A8A; font-size:11px; padding:3px; } .main .mod h3 { border-color:#7355CD #7355CD #5230AA; border-style:solid; border-width:1px; } .mod h3 { text-shadow:none; -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-topleft:3px; -moz-border-radius-topright:3px; background:#8964F3 none repeat scroll 0 0; border-bottom:2px solid #8964F3; color:#FFFFFF; font-size:12px; line-height:12px; padding:6px 9px 5px; } a { color:#000000; text-decoration:none; } button.send { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#7353C9 none repeat scroll 0 0; border:1px solid #5C3AB3; color:#FFFFFF; }';
		//Diseño "AzulClaro"
		if (ced == 12) var css = '.header { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#53BFC8 none repeat scroll 0 0; border-color:-moz-use-text-color #53BFC8 #53BFC8; border-style:none solid solid; border-width:0 1px 1px; height:30px; line-height:18px; } .header .sections a.active, .header .sections a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#33A1AC none repeat scroll 0 0; text-decoration:none; } .header .settings a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#33A1AC none repeat scroll 0 0; text-decoration:none; } .header a.logo { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent url(http://img689.imageshack.us/img689/1038/azulclaro.png) no-repeat scroll center center; display:block; float:left; height:30px; width:96px; } .sections input { border:1px solid #33A1AC; color:#8A8A8A; font-size:11px; padding:3px; } button.send { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#33A1AC none repeat scroll 0 0; border:1px solid #52BEC7; color:#FFFFFF; } .main .mod h3 { border-color:#52BEC7 #52BEC7 #29939D; border-style:solid; border-width:1px; } .mod h3 { text-shadow:none; -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-topleft:3px; -moz-border-radius-topright:3px; background:#53BFC8 none repeat scroll 0 0; border-bottom:2px solid #91B6D0; color:#FFFFFF; font-size:12px; line-height:12px; padding:6px 9px 5px; }';
		//Diseño "Naranja"
		if (ced == 13) var css = '.header { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#FF951C none repeat-x scroll 0 -41px; border-color:-moz-use-text-color #FF951C #FF951C; border-style:none solid solid; border-width:0 1px 1px; height:30px; line-height:18px; } .header .sections a.active, .header .sections a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#DE6E00 none repeat-x scroll 0 -76px; text-decoration:none; } .header a.logo { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent url(http://img39.imageshack.us/img39/4459/naranja.png) no-repeat scroll center center; display:block; float:left; height:30px; width:96px; } a { color:#C55F00; text-decoration:none; } .sections input { border:1px solid #FF961E; color:#8A8A8A; font-size:11px; padding:3px; } .mod h3 { text-shadow:none; -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-topleft:3px; -moz-border-radius-topright:3px; background:#FFC077 none repeat-x scroll 0 -182px; border-bottom:1px solid #F37000; color:#F37000; font-size:12px; line-height:12px; padding:6px 9px 5px; }';
		//Diseño "Rojo"
		if (ced == 14) var css = '.header { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#FF4023 none repeat-x scroll 0 -41px; border-color:-moz-use-text-color #F32500 #F32500; border-style:none solid solid; border-width:0 1px 1px; height:30px; line-height:18px; } .header .sections a.active, .header .sections a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#E02200 none repeat-x scroll 0 -76px; text-decoration:none; } .sections input { border:1px solid #FF4022; color:#8A8A8A; font-size:11px; padding:3px; } .header a.logo { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent url(http://img405.imageshack.us/img405/7104/rojo.png) no-repeat scroll center center; display:block; float:left; height:30px; width:96px; } a { color:#E3462D; text-decoration:none; } .mod.n .body { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-bottomleft:3px; -moz-border-radius-bottomright:3px; -moz-border-radius-topleft:3px; -moz-border-radius-topright:3px; background:#D22000 url(/layout/web2/images/sprites/shadow_maininfo.24292.png) repeat-x scroll left bottom; border:1px solid #D22000; padding:10px; } .main .mod h3 { border-color:#F17B66 #F17B66 #D22000; border-style:solid; border-width:1px; } .mod h3 { text-shadow:none; -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-topleft:3px; -moz-border-radius-topright:3px; background:#E02200 none repeat-x scroll 0 -182px; border-bottom:1px solid #E02200; color:#FFFFFF; font-size:12px; line-height:12px; padding:6px 9px 5px; }';
		//Diseño "Hello-Kitty"
		if (ced == 15) var css = '.header { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#D14AC7 none repeat-x scroll 0 -41px; border-color:-moz-use-text-color #D14AC7 #D14AC7; border-style:none solid solid; border-width:0 1px 1px; height:30px; line-height:18px; } .header .sections a.active, .header .sections a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#B3299D none repeat-x scroll 0 -76px; text-decoration:none; } .header .settings a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#B3299D none repeat-x scroll 0 -76px; text-decoration:none; } .header a.logo { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent url(http://img40.imageshack.us/img40/2094/rosav.png) no-repeat scroll center center; display:block; float:left; height:30px; width:96px; } .main .mod h3 { border:1px solid #E48CD6; } .mod h3 { text-shadow:none; -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-topleft:3px; -moz-border-radius-topright:3px; background:#BB31AA none repeat scroll 0 0; border-bottom:1px solid #BB31AA; color:#FFFFFF; font-size:12px; line-height:12px; padding:6px 9px 5px; } button.send { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#7F0171 none repeat scroll 0 0; border:1px solid #000000; color:#FFFFFF; } a { color:#F781F3; text-decoration:none; } .mod.d .item { border-bottom:1px solid #000000; clear:both; height:1%; overflow:hidden; padding:10px 0; } .mod.m li a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#E48CD6 none repeat scroll 0 0; border-color:#E48CD6 -moz-use-text-color -moz-use-text-color; border-style:solid none none; border-width:1px 0 0; color:#FFFFFF; text-decoration:none; } element.style { background-color:#D14AC7 !important; display:block; padding-bottom:5px; padding-left:5px; padding-right:5px; padding-top:5px; position:absolute; text-align:right; z-index:200000; } .sections input { border:2px solid #BB31AA; color:#FFFFFF; font-size:11px; padding:1px; } .dropDown input { color:#000000; left:0; margin:0; position:absolute; top:0; } .sections input.hover { -moz-border-radius-bottomleft: 0; -moz-border-radius-bottomright: 0; border: 2px solid #BB31AA; color: #333333; } .subHeader { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-bottomleft:3px; -moz-border-radius-bottomright:3px; background:#F6CEF5 none repeat-x scroll 0 -111px; border:1px solid #DF01D7; clear:both; height:34px; } .personalStatus span.hour { color:#BB31AA; left:195px; position:relative; text-shadow:0 0 0 #FFFFFF; top:7px; } .mod.n ul { border-top:1px solid #DF01D7; margin-top:10px; padding-top:5px; } .mod.n .body { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-bottomleft:3px; -moz-border-radius-bottomright:3px; -moz-border-radius-topleft:3px; -moz-border-radius-topright:3px; background:#F8E0F7 none repeat-x scroll left bottom; border:1px solid #DF01D7; padding:10px; } .canvas .pager.light { background-color:transparent; height:1%; overflow:hidden; padding-top:10px; } a.avatarFix, span.avatarFix { background-color:transparent; border:1px solid #B3299D; display:block; float:left; height:30px; margin-right:7px; padding:2px; width:30px; } .sections li a span.inbox { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent none repeat scroll 0 0; display:inline-block; font-size:10px; font-weight:normal; height:18px; line-height:18px; margin-left:2px; text-align:center; vertical-align:middle; } .sections li a span.inbox span { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent none repeat scroll 0 0; display:inline-block; margin-left:7px; padding-right:8px; vertical-align:middle; } .sections li a:hover span.inbox span, .sections li .active span.inbox span { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent none repeat scroll 0 0; } .sections li a:hover span.inbox, .sections li .active span.inbox { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent none repeat scroll 0 0; } .sidebar .mod.form h3 { border:1px solid #E48CD6; } form fieldset.formbox { background-color:#F8E0F7; border:1px solid #F8E0F7; } input, textarea, select { border:1px solid #DF01D7; } .mediaBar a { color:#B404AE; } form fieldset.formbox label.inline { color:#B404AE; } input.focus, textarea.focus, select.focus, form input.active, form input.hover, input:focus, textarea:focus, select:focus { border: 1px solid #AC58FA; color: #333333; } a:hover img { border:1px solid #B3299D; } a img, img { background-color:transparent; border:1px solid #B3299D; } .sidebar .mod { background-color:#F8E0EC; border:1px solid #E48CD6; } button { border:1px solid #E48CD6; } element.style { background-color:#538FBB !important; } .actions { background:transparent none repeat scroll 0 0; } .note.success { background-color:#F6CEF5; border:1px solid #E48CD6; color:#666666; } form fieldset.formbox { background-color:#F8E0F7; border:1px solid #F8E0F7; } input, textarea, select { border:1px solid #DF01D7; } .mediaBar a { color:#B404AE; } form fieldset.formbox label.inline { color:#B404AE; } input.focus, textarea.focus, select.focus, form input.active, form input.hover, input:focus, textarea:focus, select:focus { border: 1px solid #AC58FA; color: #333333; } a:hover img { border:1px solid #B3299D; } a img, img { background-color:transparent; border:1px solid #B3299D; } .sidebar .mod { background-color:#F8E0EC; border:1px solid #E48CD6; } button { border:1px solid #E48CD6; } .chooseAlbum, .uploadPhotos { background:#FFFFFF url(http://www.clikkare.it/post/wp-content/uploads/2009/01/hello-kitty3.jpg) no-repeat center; } .header { text-shadow:1px 0 1px #000000; } div.loading { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent url(http://img205.imageshack.us/img205/4083/ajaxloaderw.gif) no-repeat scroll center center; height:90px; position:absolute; right:-20px; top:3px; width:1200px; } .chatMod.loader h3 strong { background: transparent url(http://img697.imageshack.us/img697/2134/ajaxloader.gif) no-repeat scroll 0 1px } .chatMod.online h3 strong { background:transparent url(http://img146.imageshack.us/img146/731/botond.gif) no-repeat scroll 0 3px; } .chatRoster ul li.online a.friend { background:transparent url(http://img146.imageshack.us/img146/731/botond.gif) no-repeat scroll 9px 50%; } .canvas .mod.c.videos .body { background:#F6CEF5 none repeat scroll 0 0; } .mod.f.tagList li.highlight { background:#F6CEF5 none repeat scroll 0 0; } .mod.f.tagList li { background:#F6CEF5 none repeat scroll 0 0; } .mod.n .views { background:transparent url(http://img707.imageshack.us/img707/7424/estadis.gif) no-repeat scroll 0 50%; color:#000000; } h1 { color:#E48CD6; font-size:15px; text-shadow:1px 0 1px #000000; } .uploadPhotos span.dot { background:transparent none repeat scroll 0 0; color:#E48CD6; text-shadow:1px 0 1px #000000; } .chatDockItem.open .avatarFix { background-color:#F6CEF5; border-color:-moz-use-text-color #B3299D #B3299D; border-style:none solid solid; border-width:0 1px 1px; } .chatDockDialogTextarea { background-color:#F6CEF5; border-top:1px solid #B404AE; padding:5px; position:relative; } .chatDockItem .chatDockDialog h3 { background:#F6CEF5 none repeat scroll 0 0; color:#000000; cursor:pointer; font-size:11px; line-height:11px; padding:7px 9px 5px; } .chatDockItems { background-color:#F6CEF5; border-right:1px solid #CCCCCC; border-top:1px solid #CCCCCC; bottom:7px; height:42px; min-width:55px; position:absolute; } .chatDockBlock { background:#F6CEF5 none repeat scroll 0 0; border-top:1px solid #F6CEF5; height:7px; } .chatDockItem.open .chatDockDialog textarea { background:#FBEFF5 none repeat scroll 0 0; } .chatDockItem .chatDockDialogViewport { background:#FBEFF5 none repeat scroll 0 0; border-bottom:1px solid #B404AE; border-top:1px solid #B404AE; padding:1px; } .chatHeader .chatShadow, .chatDockItem.open .chatShadow { background-color:#B404AE; opacity:0.4; } .chatDockItem.open .chatDockDialog { background-color:#B404AE; border:1px solid #B404AE; } .chatDockItem.open .chatDockDialog.active textarea { border-color: #B404AE; } .mod.h .loadImage { background:transparent url(http://img710.imageshack.us/img710/3388/ajaxloader2.gif) no-repeat scroll center center; } .subHeader .progressBar div.bar { background:#FFFFFF url(http://img708.imageshack.us/img708/1193/ajaxloader3.gif) repeat-x scroll 0 -219px; } .subHeader .uploadStatus { background:#FBEFFB none repeat scroll 0 0; border-left:1px solid #FFFFFF; border-right:1px solid #DCDCDC; } .chatDockItem .chatDockDialog h3 { color:#FFFFFF; } .chatDockItem .chatDockDialog h3 { text-shadow:1px 0 1px #000000; } .videoPlayer .videoHeader { border-style:solid none solid solid; color:#F6CEF5; font-size:11px; line-height:11px; text-shadow:1px 0 1px #3B0B39; } .photoTag { border:2px solid #F6CEF5 !important; } .mod.h .photoTag { border:2px solid #F6CEF5 !important; }';
		//Diseño "Hulk"
		if (ced == 16) var css = '.main .mod h3 { border-color:#E3F6CE #E3F6CE #81F781; border-style:solid; border-width:1px; } .mod h3 { text-shadow:none; -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-topleft:3px; -moz-border-radius-topright:3px; background:#CEF6CE none repeat-x scroll 0 -182px; border-bottom:1px solid #81F781; color:#0B610B; font-size:12px; line-height:12px; padding:6px 9px 5px; } .header { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#39CD37 none repeat-x scroll 0 -41px; border-color:-moz-use-text-color #2AB624 #2AB624; border-style:none solid solid; border-width:0 1px 1px; height:30px; line-height:18px; } .header .sections a.active, .header .sections a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#20B81D none repeat-x scroll 0 -76px; text-decoration:none; } button.send { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#62DC58 none repeat-x scroll 0 -34px; border:1px solid #39D23A; color:#FFFFFF; } .header a.logo { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:transparent url(http://img682.imageshack.us/img682/1108/verdet.png) no-repeat scroll center center; display:block; float:left; height:30px; width:96px; } .events { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#EAF6EF none no-repeat scroll 0 -299px; padding:0 0 0 12px; } .mod.n .body { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-bottomleft:3px; -moz-border-radius-bottomright:3px; -moz-border-radius-topleft:3px; -moz-border-radius-topright:3px; background:#FFFFFF url(/layout/web2/images/sprites/shadow_maininfo.24292.png) repeat-x scroll left bottom; border:1px solid #7CD77D; padding:10px; } .sections input { border:1px solid #35CC34; color:#8A8A8A; font-size:11px; padding:3px; } a { color:#1DAD1B; text-decoration:none; } .mod.messagesBox table tr td span.author { color:#1DAD1B; } .mod.messagesBox table tr.unread td.from span.author, .mod.messagesBox table tr.unread td.message { color:#1DAD1B; font-weight:bold; } .mod.messagesBox table tr td.message { color:#1DAD1B; font-size:12px; } .mod.m li a:hover { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#1DAD1B none repeat scroll 0 0; border-color:#1DAD1B -moz-use-text-color -moz-use-text-color; border-style:solid none none; border-width:1px 0 0; color:#FFFFFF; text-decoration:none; } .canvas .pager.light { background-color:transparent; } .date, .disabled, .counter, .mobile { clear:none; color:#FFFFFF; } .footer { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#FFFFFF none repeat scroll 0 0; border:5px none #000000; clear:both; margin-bottom:20px; } .sections li a:hover span.inbox, .sections li .active span.inbox { background:transparent none repeat scroll 0 0; } .sections li a:hover span.inbox span, .sections li .active span.inbox span { background:transparent none repeat scroll 0 0; } .header .settings a:hover { background:#20B81D none repeat scroll 0 0; } .mod.d .item { border-bottom:1px solid #FFFFFF; } h4 span { color:#FFFFFF; } .mod.d .friendRequest .info p { color:#FFFFFF; } .sections li a span.inbox { background:transparent none repeat scroll 0 0; } .sections li a span.inbox span { background:transparent none repeat scroll 0 0; } .itemActions a { color:#FFFFFF; } .itemActions a:hover { color:#FFFFFF; } .note.success { background-color:#E3F6CE; border:1px solid #E3F6CE; color:#000000; } .mod.messagesBox .item p { color:#FFFFFF; overflow:hidden; width:625px; word-wrap:break-word; } .videoPlayer .videoHeader { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-topleft:3px; background:#CEF6CE none repeat scroll 0 0; border-color:#CEF6CE; border-style:solid none solid solid; border-width:1px 0 1px 1px; color:#3C4963; font-size:11px; height:11px; line-height:11px; overflow:hidden; padding:7px 5px 5px; position:relative; text-shadow:0 1px 0 #D9E9F1; }';

		addStyle(css,"TP_css");
	};
};
function crearcodigo(){
	GM_setValue(id+'checkboxmenu', document.getElementById('checkboxmenu').checked);
	GM_setValue(id+'checkboxnomostrareventos', document.getElementById('checkboxnomostrareventos').checked);
	GM_setValue(id+'checkboximagenampliada', document.getElementById('checkboximagenampliada').checked);
	GM_setValue(id+'checkboxblog', document.getElementById('checkboxblog').checked);
	GM_setValue(id+'checkboxcontador', document.getElementById('checkboxcontador').checked);
	GM_setValue(id+'checkboxreloj', document.getElementById('checkboxreloj').checked);
	GM_setValue(id+'checkboxrelojjs', document.getElementById('checkboxrelojjs').checked);
	GM_setValue(id+'radiofondo', document.getElementById('radiofondo').checked);
	GM_setValue(id+'radiofondo1', document.getElementById('radiofondo1').checked);
	GM_setValue(id+'radiofondo2', document.getElementById('radiofondo2').checked);
	GM_setValue(id+'radiofondo3', document.getElementById('radiofondo3').checked);
	GM_setValue(id+'radiofondo3v2', document.getElementById('radiofondo3v2').checked);
	GM_setValue(id+'radiofondo4', document.getElementById('radiofondo4').checked);
	GM_setValue(id+'radiofondo5', document.getElementById('radiofondo5').checked);
	GM_setValue(id+'radiofondo6', document.getElementById('radiofondo6').checked);
	GM_setValue(id+'radiofondo7', document.getElementById('radiofondo7').checked);
	GM_setValue(id+'radiofondo8', document.getElementById('radiofondo8').checked);
	GM_setValue(id+'radiofondo9', document.getElementById('radiofondo9').checked);
	GM_setValue(id+'radiofondo10', document.getElementById('radiofondo10').checked);
	GM_setValue(id+'radiofondo11', document.getElementById('radiofondo11').checked);
	GM_setValue(id+'radiofondo12', document.getElementById('radiofondo12').checked);
	GM_setValue(id+'radiofondop', document.getElementById('radiofondop').checked);
	GM_setValue(id+'checkboxfondofijo', document.getElementById('checkboxfondofijo').checked);
	GM_setValue(id+'radiorediseño', document.getElementById('radiorediseño').checked);
	GM_setValue(id+'radiorediseño1', document.getElementById('radiorediseño1').checked);
	GM_setValue(id+'radiorediseño2', document.getElementById('radiorediseño2').checked);
	GM_setValue(id+'radiorediseño3', document.getElementById('radiorediseño3').checked);
	GM_setValue(id+'radiorediseño4', document.getElementById('radiorediseño4').checked);
	GM_setValue(id+'radiorediseño5', document.getElementById('radiorediseño5').checked);
	GM_setValue(id+'radiorediseño6', document.getElementById('radiorediseño6').checked);
	GM_setValue(id+'radiorediseño7', document.getElementById('radiorediseño7').checked);
	GM_setValue(id+'radiorediseño8', document.getElementById('radiorediseño8').checked);
	GM_setValue(id+'radiorediseño9', document.getElementById('radiorediseño9').checked);
	GM_setValue(id+'radiorediseño10', document.getElementById('radiorediseño10').checked);
	GM_setValue(id+'radiorediseño11', document.getElementById('radiorediseño11').checked);
	GM_setValue(id+'radiorediseño12', document.getElementById('radiorediseño12').checked);
	GM_setValue(id+'radiorediseño13', document.getElementById('radiorediseño13').checked);
	GM_setValue(id+'radiorediseño14', document.getElementById('radiorediseño14').checked);
	GM_setValue(id+'radiorediseño15', document.getElementById('radiorediseño15').checked);
	GM_setValue(id+'radiorediseño16', document.getElementById('radiorediseño16').checked);
	GM_setValue(id+'textfondo', document.getElementById('textfondo').value);
	GM_setValue(id+'textrefresco', document.getElementById('textrefresco').value);
	GM_setValue(id+'configurado', version);

	if (GM_getValue(id+'radiofondo') == true) F=0;
	if (GM_getValue(id+'radiofondo1') == true) F=1;
	if (GM_getValue(id+'radiofondo2') == true) F=2;
	if (GM_getValue(id+'radiofondo3') == true) F=3;
	if (GM_getValue(id+'radiofondo3v2') == true) F="3v2";
	if (GM_getValue(id+'radiofondo4') == true) F=4;
	if (GM_getValue(id+'radiofondo5') == true) F=5;
	if (GM_getValue(id+'radiofondo6') == true) F=6;
	if (GM_getValue(id+'radiofondo7') == true) F=7;
	if (GM_getValue(id+'radiofondo8') == true) F=8;
	if (GM_getValue(id+'radiofondo9') == true) F=9;
	if (GM_getValue(id+'radiofondo10') == true) F=10;
	if (GM_getValue(id+'radiofondo11') == true) F=11;
	if (GM_getValue(id+'radiofondo12') == true) F=12;
	if (GM_getValue(id+'radiofondop') == true) F="p";
	if (GM_getValue(id+'checkboxfondofijo') == true) Q=1; else Q=0 ;
	if (GM_getValue(id+'radiorediseño') == true) D=0;
	if (GM_getValue(id+'radiorediseño1') == true) D=1;
	if (GM_getValue(id+'radiorediseño2') == true) D=2;
	if (GM_getValue(id+'radiorediseño3') == true) D=3;
	if (GM_getValue(id+'radiorediseño4') == true) D=4;
	if (GM_getValue(id+'radiorediseño5') == true) D=5;
	if (GM_getValue(id+'radiorediseño6') == true) D=6;
	if (GM_getValue(id+'radiorediseño7') == true) D=7;
	if (GM_getValue(id+'radiorediseño8') == true) D=8;
	if (GM_getValue(id+'radiorediseño9') == true) D=9;
	if (GM_getValue(id+'radiorediseño10') == true) D=10;
	if (GM_getValue(id+'radiorediseño11') == true) D=11;
	if (GM_getValue(id+'radiorediseño12') == true) D=12;
	if (GM_getValue(id+'radiorediseño13') == true) D=13;
	if (GM_getValue(id+'radiorediseño14') == true) D=14;
	if (GM_getValue(id+'radiorediseño15') == true) D=15;
	if (GM_getValue(id+'radiorediseño16') == true) D=16;

	P=GM_getValue(id+'textfondo');

	if (P.indexOf("https://") != -1) P=P.replace("https://","$s");
	if (P.indexOf("http://") != -1) P=P.replace("http://","$h");
	if (P.indexOf("www.") != -1) P=P.replace("www.","$w");
	textcrearcodigo="<TPCD>F="+F+";D="+D+";Q="+Q+";P="+P+";</TPCD>";

	preguntarporcodigo()
};
function preguntarporcodigo(){
	if (confirm("Ahora "+scriptname+" procederá a escribir en tus intereses personales la información sobre el diseño para que pueda compartirlo con otros usuarios. ¿Deseas continuar?")){
		document.location.href=('http://www.tuenti.com/#m=Settings&func=view_interests');
		setTimeout(function(){escribircodigo()},1000)
		cancelar()
	};
};
function escribircodigo(){
	if (document.getElementById("personal_space_compose") != null){
		informacionpersonal=document.getElementById("personal_space_compose");
		if (informacionpersonal.value.indexOf("<TPCD>") != -1){
			TPCDinicio=informacionpersonal.value.indexOf("<TPCD>");
			TPCDfin=informacionpersonal.value.indexOf("</TPCD>")+7;
			TPCD=informacionpersonal.value.substring(TPCDinicio,TPCDfin);
			informacionpersonal.value=informacionpersonal.value.replace(TPCD,"");
		};
		informacionpersonal.value=informacionpersonal.value+" "+textcrearcodigo;
		document.getElementById("personal_info_button").click();
		setTimeout(function(){Volver()},1000)
	};
};
function Volver(){
	document.location.href=('http://www.tuenti.com/#m=Profile&func=index');
	location.reload()
};
function cancelar(){
	document.getElementById('canvas').parentNode.removeChild(document.getElementById('divlightBox'));
	document.getElementById('lightbox_overlay').style.display = "none";
};


//FUNCIONES DE HERRAMIENTAS
//-------------------------------------------------------------------------------------------//
function Menupasarpagina(){
	if (document.getElementById("Menupasarpagina") == null) {
		var Menupasarpagina = document.createElement("div");
		Menupasarpagina.setAttribute("id","Menupasarpagina");
		Menupasarpagina.setAttribute("style","padding: 5px; position: absolute; display: block; z-index: 50; background-color: #538FBB !important;");

		cuadromenupasarpagina = document.createElement("input");
		cuadromenupasarpagina.setAttribute("id","cuadromenupasarpagina")

		Botonpasarpagina = document.createElement("button");
		Botonpasarpagina.appendChild(document.createTextNode("Ir"));
		Botonpasarpagina.setAttribute("onclick",function(){Pasarpagina()});
		Botonpasarpagina.addEventListener("click", function(){Pasarpagina()}, true);

		Botonpasarpagina2 = document.createElement("button");
		Botonpasarpagina2.appendChild(document.createTextNode("Cerrar"));
		Botonpasarpagina2.setAttribute("onclick",function(){NoPasarpagina()});
		Botonpasarpagina2.addEventListener("click", function(){NoPasarpagina()}, true);
 
		Menupasarpagina.innerHTML += 'Página número: ';    
		Menupasarpagina.appendChild(cuadromenupasarpagina);
		Menupasarpagina.appendChild(Botonpasarpagina);
		Menupasarpagina.appendChild(Botonpasarpagina2);
		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(Menupasarpagina, canvas);

		function Pasarpagina(){
			numero = document.getElementById('cuadromenupasarpagina').value - 1
			if (numero < 0) alert('Por favor, inserte un número mayor que 0'); else{
				if (document.location.href.substring(25,31)=="Search") {
					document.location.href = document.location.href + "&page_no=" + numero;
				}else{
					if (document.location.href.substring(25,31)=="Albums") {
						document.location.href = document.location.href + "&photos_page=" + numero;
					}else{	
						document.location.href = document.location.href + "&wall_page=" + numero;
					};
				};
				




if (document.getElementById('css_monitors') != null) document.getElementById("css_monitors").removeChild(Menupasarpagina);
			};
		};
	}else NoPasarpagina();
};
function  NoPasarpagina() document.getElementById('container').removeChild(document.getElementById('Menupasarpagina'));



//-------------------------------------------------------------------------------------------//


	



//-------------------------------------------------------------------------------------------//




function chat(){
	if (document.getElementById('divchat') == null){
		if (document.getElementById('lightbox_overlay') == null){
			lightbox_overlay=document.createElement("div");
			lightbox_overlay.setAttribute("id","lightbox_overlay");
			lightbox_overlay.setAttribute("class","lightBoxOverlay");
			lightbox_overlay.setAttribute("style","opacity: 0.5; display: block;");
			body.appendChild(lightbox_overlay);
		}else{
			document.getElementById('lightbox_overlay').style.display = "block";
		};

		divlightBox = document.createElement("div")
		divlightBox.setAttribute("id","divlightBox");
		divlightBox.setAttribute("class","lightBoxWrapper");
		divlightBox.setAttribute("style","display: block; position: absolute; margin-left: 0px;");

		divchat = document.createElement("div");
		divchat.setAttribute("id","divchat");
		divchat.setAttribute("class","chatDockItem open active");
		divchat.setAttribute("style","text-align: left; position: absolute; display: block; z-index: 20; background-color: #EBEBEB !important;");
		divchat.innerHTML += '<div class="chatDockDialog open" style="width: 960px; position: static;"><div class="chatActions"><a title="Minimizar el Tuentichat" href="javascript:void(0)" id="botonocultarchat" class="chatMinimize"></a><a title="Abrir en una nueva pestaña" href="http://chat.com/tpack" target="_blank" id="botonchatpestaña" class="chatMaximize"> </a><a title="Cerrar Tuentichat" href="javascript:void(0)" id="botonnochat" class="chatClose"> </a></div><h3 title="Chat de los usuarios de '+scriptname+'"><strong>Tuentichat</strong></h3></div>';
		
                divchat.innerHTML += '<br><center><h2><b>Rangos del chat</b></h2><img src="http://a.imagehost.org/0592/rango.png" style="border: 0; background-color: transparent !important;"></center>';
		
                divchat.innerHTML += '<center><embed class="container" src="http://www.chatech.com/web_gear/chat/chat.swf" quality="high" width="640" height="480" name="chat" FlashVars="id=87270819&rl=Castilian" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://chat.com/update_flash.shtml" /></center>';

		divchat.innerHTML += '<br><hr><center><h2><b>NORMAS DEL CHAT</b></h2><br></center><P align=left>1ª- No hablar sobre ser CREADOR o MODERADOR con el STAFF. Para poder serlo te lo debe comunicar un CREADOR, si pides serlo serás banneado durante una hora.<br>2ª- No hagas spam (Publicidad de cualquier tipo).<br>3ª- No floodees (Realiza los textos lo mas simplificados posibles y no escribas muchas veces el mismo mensaje).<br>4ª- Si un MOD o CREADOR del chat te BANNEA, sera por algo ya que la permisibilidad suele ser alta. El ban no será retirado si no hay un buen motivo.<br>5ª- Todas las personas deberán respetaran las normas. Éstas se irán añadiendo a medida que surjan problemas.<br>6ª- No escribas con mayúsculas ya que significa que estás gritando<br>7ª- Respetar totalmente a todos los usuarios del chat.<br>8ª- No amenaces a nadie.<br>9ª- Estas normas pueden ser modificadas en cualquier momento por los creadores. Si tienes cualquier problema comunícaselo a cualquier MODERADOR o CREADOR.<br>10ª- Para no generar polémicas y peleas ideológicas intenta evitar hablar o discutir sobre temas de política o religión.<br><br>';

		divlightBox.appendChild(divchat);
		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(divlightBox, canvas);
		document.getElementById("botonocultarchat").addEventListener("click", function(){ocultarchat()}, true);
		document.getElementById("botonchatpestaña").addEventListener("click", function(){nochat()}, true);
		document.getElementById("botonnochat").addEventListener("click", function(){nochat()}, true);
	}else{
		if (document.getElementById('divchat').getAttribute("style").substring(0,1) == "v"){
			divchat.setAttribute("style","text-align: left; position: absolute; display: block; z-index: 20; background-color: #EBEBEB !important;");
			document.getElementById('botonchat').removeChild(document.getElementById('botonchat').firstChild);
			document.getElementById('botonchat').innerHTML += '<span>Tuentichat <Img SRC="http://famfamfam.com/lab/icons/mini/icons/icon_user.gif" width="12" height="12" border="0"></span>';

			if (document.getElementById('lightbox_overlay') == null){
				lightbox_overlay=document.createElement("div");
				lightbox_overlay.setAttribute("id","lightbox_overlay");
				lightbox_overlay.setAttribute("class","lightBoxOverlay");
				lightbox_overlay.setAttribute("style","opacity: 0.5; display: block;");
				body.appendChild(lightbox_overlay);
			}else{
				document.getElementById('lightbox_overlay').style.display = "block";
			};
		}else nochat();
	};
};

function nochat(){
	document.getElementById('canvas').parentNode.removeChild(document.getElementById('divlightBox'));
	document.getElementById('lightbox_overlay').style.display = "none";
};

function ocultarchat(){
	divchat.setAttribute("style","visibility: hidden; text-align: left; position: absolute; display: block; z-index: 20; background-color: #538FBB !important;");
	document.getElementById('botonchat').removeChild(document.getElementById('botonchat').firstChild);
	document.getElementById('botonchat').innerHTML += '<span>Tuentichat (Oculto) <Img SRC="http://famfamfam.com/lab/icons/mini/icons/icon_user.gif" width="12" height="12" border="0"></span>';
	document.getElementById('lightbox_overlay').style.display = "none";
};






function msn(){
	if (document.getElementById('divmsn') == null){
		var divmsn = document.createElement("div");
		divmsn.setAttribute("id","divmsn");
		divmsn.setAttribute("class","videoPlayer");


		var divmsnheader = document.createElement("div");
		divmsnheader.setAttribute("class","videoHeader");
		divmsnheader.innerHTML += '<span title="TuentiMSN"><b>TuentiMSN<b></span>';
		divmsn.appendChild(divmsnheader);

		divmsn.appendChild(divmsnheader);

		var divmsnoptions = document.createElement("div");
		divmsnoptions.setAttribute("id","divmsnoptions");
		divmsnoptions.setAttribute("class","videoOptions");
		divmsnoptions.innerHTML += '<a class="maximize" title="Maximizar" id="maximize_msn" href="javascript:void(0);">Maximizar</a>';
		divmsnoptions.innerHTML += '<a class="minimize hide" title="Minimizar" id="minimize_msn" href="javascript:void(0);">Minimizar</a>';
		divmsnoptions.innerHTML += '<a id="close_msn" class="cancelClose" href="javascript:void(0);">Cerrar</a>';
		divmsnheader.appendChild(divmsnoptions);


		var msn = document.createElement("div");
		msn.setAttribute("id","msndiv");
		msn.setAttribute("style","width: 480px;height: 350px; overflow-x: hidden; overflow-y: scroll; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");

		msniframe = document.createElement("iframe");
		msniframe.setAttribute("id","prueba");
		msniframe.setAttribute("name","prueba");
		msniframe.setAttribute("width","100%");
		msniframe.setAttribute("height","480");
		msniframe.src = "http://madrid.ebuddy.com/vo7.7.5/start.html";
		msn.appendChild(msniframe);
		divmsn.appendChild(msn);

		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(divmsn, canvas);

		document.getElementById('maximize_msn').addEventListener("click", function(){maximize_msn()}, true);
		document.getElementById('minimize_msn').addEventListener("click", function(){minimize_msn()}, true);
		document.getElementById('close_msn').addEventListener("click", function(){nomsn()}, true);
	}else nomsn();
};

function maximize_msn(){
	document.getElementById('maximize_msn').setAttribute("class","maximize hide");
	document.getElementById('minimize_msn').setAttribute("class","minimize");
	document.getElementById('msndiv').setAttribute("style","width: 530px;height: 480px; overflow-x: hidden; overflow-y: scroll; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");	
	msniframe.setAttribute("height","530");
};

function minimize_msn(){
	document.getElementById('minimize_msn').setAttribute("class","minimize hide");
	document.getElementById('maximize_msn').setAttribute("class","maximize");
	document.getElementById('msndiv').setAttribute("style","width: 480px; height: 350px; overflow-x: hidden; overflow-y: scroll; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");	
	msniframe.setAttribute("height","480");
};

function nomsn() document.getElementById('canvas').parentNode.removeChild(document.getElementById('divmsn'));



















function descargarvideos(){
	if (document.getElementById('divdescargarvideos') == null){
		var divdescargarvideos = document.createElement("div");
		divdescargarvideos.setAttribute("id","divdescargarvideos");
		divdescargarvideos.setAttribute("class","videoPlayer");


		var divdescargarvideosheader = document.createElement("div");
		divdescargarvideosheader.setAttribute("class","videoHeader");
		divdescargarvideosheader.innerHTML += '<span title="descargarvideos"><b>Tuentidescargarvideos<b></span>';
		divdescargarvideos.appendChild(divdescargarvideosheader);

		divdescargarvideos.appendChild(divdescargarvideosheader);

		var divdescargarvideosoptions = document.createElement("div");
		divdescargarvideosoptions.setAttribute("id","divdescargarvideosoptions");
		divdescargarvideosoptions.setAttribute("class","videoOptions");
		divdescargarvideosoptions.innerHTML += '<a class="maximize" title="Maximizar" id="maximize_descargarvideos" href="javascript:void(0);">Maximizar</a>';
		divdescargarvideosoptions.innerHTML += '<a class="minimize hide" title="Minimizar" id="minimize_descargarvideos" href="javascript:void(0);">Minimizar</a>';
		divdescargarvideosoptions.innerHTML += '<a id="close_descargarvideos" class="cancelClose" href="javascript:void(0);">Cerrar</a>';
		divdescargarvideosheader.appendChild(divdescargarvideosoptions);


		var descargarvideos = document.createElement("div");
		descargarvideos.setAttribute("id","descargarvideosdiv");
		descargarvideos.setAttribute("style","width: 550px;height: 420px; overflow-x: hidden; overflow-y: scroll; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");

		descargarvideosiframe = document.createElement("iframe");
		descargarvideosiframe.setAttribute("id","prueba");
		descargarvideosiframe.setAttribute("name","prueba");
		descargarvideosiframe.setAttribute("width","540%");
		descargarvideosiframe.setAttribute("height","420");
		descargarvideosiframe.src = "http://vageria.foroactivo.net/Descarga-de-videos-no-modificar-h12.htm";
		descargarvideos.appendChild(descargarvideosiframe);
		divdescargarvideos.appendChild(descargarvideos);

		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(divdescargarvideos, canvas);

		document.getElementById('maximize_descargarvideos').addEventListener("click", function(){maximize_descargarvideos()}, true);
		document.getElementById('minimize_descargarvideos').addEventListener("click", function(){minimize_descargarvideos()}, true);
		document.getElementById('close_descargarvideos').addEventListener("click", function(){nodescargarvideos()}, true);
	}else nodescargarvideos();
};
function maximize_descargarvideos(){
	document.getElementById('maximize_descargarvideos').setAttribute("class","maximize hide");
	document.getElementById('minimize_descargarvideos').setAttribute("class","minimize");
	document.getElementById('descargarvideosdiv').setAttribute("style","width: 530px;height: 480px; overflow-x: hidden; overflow-y: scroll; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");	
	descargarvideosiframe.setAttribute("height","530");
};
function minimize_descargarvideos(){
	document.getElementById('minimize_descargarvideos').setAttribute("class","minimize hide");
	document.getElementById('maximize_descargarvideos').setAttribute("class","maximize");
	document.getElementById('descargarvideosdiv').setAttribute("style","width: 480px; height: 350px; overflow-x: hidden; overflow-y: scroll; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");	
	descargarvideosiframe.setAttribute("height","480");
};
function nodescargarvideos() document.getElementById('canvas').parentNode.removeChild(document.getElementById('divdescargarvideos'));
























function television(){
	if (document.getElementById('divtelevision') == null){
		var divtelevision = document.createElement("div");
		divtelevision.setAttribute("id","divtelevision");
		divtelevision.setAttribute("class","videoPlayer");


		var divtelevisionheader = document.createElement("div");
		divtelevisionheader.setAttribute("class","videoHeader");
		divtelevisionheader.innerHTML += '<span title="television"><b>Tuentitelevision<b></span>';
		divtelevision.appendChild(divtelevisionheader);

		divtelevision.appendChild(divtelevisionheader);

		var divtelevisionoptions = document.createElement("div");
		divtelevisionoptions.setAttribute("id","divtelevisionoptions");
		divtelevisionoptions.setAttribute("class","videoOptions");
		divtelevisionoptions.innerHTML += '<a class="maximize" title="Maximizar" id="maximize_television" href="javascript:void(0);">Maximizar</a>';
		divtelevisionoptions.innerHTML += '<a class="minimize hide" title="Minimizar" id="minimize_television" href="javascript:void(0);">Minimizar</a>';
		divtelevisionoptions.innerHTML += '<a id="close_television" class="cancelClose" href="javascript:void(0);">Cerrar</a>';
		divtelevisionheader.appendChild(divtelevisionoptions);


		var television = document.createElement("div");
		television.setAttribute("id","televisiondiv");
		television.setAttribute("style","width: 1000px;height: 1000px; overflow-x: hidden; overflow-y: scroll; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");

		televisioniframe = document.createElement("iframe");
		televisioniframe.setAttribute("id","prueba");
		televisioniframe.setAttribute("name","prueba");
		televisioniframe.setAttribute("width","990%");
		televisioniframe.setAttribute("height","990");
		televisioniframe.src = "http://vageria.foroactivo.net/Televisiones-no-modificar-h13.htm";
		television.appendChild(televisioniframe);
		divtelevision.appendChild(television);

		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(divtelevision, canvas);

		document.getElementById('maximize_television').addEventListener("click", function(){maximize_television()}, true);
		document.getElementById('minimize_television').addEventListener("click", function(){minimize_television()}, true);
		document.getElementById('close_television').addEventListener("click", function(){notelevision()}, true);
	}else notelevision();
};
function maximize_television(){
	document.getElementById('maximize_television').setAttribute("class","maximize hide");
	document.getElementById('minimize_television').setAttribute("class","minimize");
	document.getElementById('televisiondiv').setAttribute("style","width: 1000px;height: 1000px; overflow-x: hidden; overflow-y: scroll; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");	
	televisioniframe.setAttribute("height","1000");
};
function minimize_television(){
	document.getElementById('minimize_television').setAttribute("class","minimize hide");
	document.getElementById('maximize_television').setAttribute("class","maximize");
	document.getElementById('televisiondiv').setAttribute("style","width: 480px; height: 350px; overflow-x: hidden; overflow-y: scroll; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");	
	televisioniframe.setAttribute("height","1000");
};
function notelevision() document.getElementById('canvas').parentNode.removeChild(document.getElementById('divtelevision'));









function juegos(){
	if (document.getElementById('divjuegos') == null){
		var divjuegos = document.createElement("div");
		divjuegos.setAttribute("id","divjuegos");
		divjuegos.setAttribute("class","videoPlayer");


		var divjuegosheader = document.createElement("div");
		divjuegosheader.setAttribute("class","videoHeader");
		divjuegosheader.innerHTML += '<span title="juegos"><b>juegos<b></span>';
		divjuegos.appendChild(divjuegosheader);

		divjuegos.appendChild(divjuegosheader);

		var divjuegosoptions = document.createElement("div");
		divjuegosoptions.setAttribute("id","divjuegosoptions");
		divjuegosoptions.setAttribute("class","videoOptions");
		divjuegosoptions.innerHTML += '<a class="maximize" title="Maximizar" id="maximize_juegos" href="javascript:void(0);">Maximizar</a>';
		divjuegosoptions.innerHTML += '<a class="minimize hide" title="Minimizar" id="minimize_juegos" href="javascript:void(0);">Minimizar</a>';
		divjuegosoptions.innerHTML += '<a id="close_juegos" class="cancelClose" href="javascript:void(0);">Cerrar</a>';
		divjuegosheader.appendChild(divjuegosoptions);


		var juegos = document.createElement("div");
		juegos.setAttribute("id","juegosdiv");
		juegos.setAttribute("style","width: 1000px;height: 1000px; overflow-x: hidden; overflow-y: scroll; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");

		juegosiframe = document.createElement("iframe");
		juegosiframe.setAttribute("id","prueba");
		juegosiframe.setAttribute("name","prueba");
		juegosiframe.setAttribute("width","990%");
		juegosiframe.setAttribute("height","990");
		juegosiframe.src = "http://vageria.foroactivo.net/juegos-no-modificar-h14.htm";
		juegos.appendChild(juegosiframe);
		divjuegos.appendChild(juegos);

		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(divjuegos, canvas);

		document.getElementById('maximize_juegos').addEventListener("click", function(){maximize_juegos()}, true);
		document.getElementById('minimize_juegos').addEventListener("click", function(){minimize_juegos()}, true);
		document.getElementById('close_juegos').addEventListener("click", function(){nojuegos()}, true);
	}else nojuegos();
};
function maximize_juegos(){
	document.getElementById('maximize_juegos').setAttribute("class","maximize hide");
	document.getElementById('minimize_juegos').setAttribute("class","minimize");
	document.getElementById('juegosdiv').setAttribute("style","width: 530px;height: 480px; overflow-x: hidden; overflow-y: scroll; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");	
	juegosiframe.setAttribute("height","1000");
};
function minimize_juegos(){
	document.getElementById('minimize_juegos').setAttribute("class","minimize hide");
	document.getElementById('maximize_juegos').setAttribute("class","maximize");
	document.getElementById('juegosdiv').setAttribute("style","width: 480px; height: 350px; overflow-x: hidden; overflow-y: scroll; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");	
	juegosiframe.setAttribute("height","1000");
};
function nojuegos() document.getElementById('canvas').parentNode.removeChild(document.getElementById('divjuegos'));


















function xat(){
	if (document.getElementById('divxat') == null){
		var divxat = document.createElement("div");
		divxat.setAttribute("id","divxat");
		divxat.setAttribute("class","videoPlayer");


		var divxatheader = document.createElement("div");
		divxatheader.setAttribute("class","videoHeader");
		divxatheader.innerHTML += '<span title="xat"><b>Xat <br>LA PAGINA WEB TARDA UNOS 30 SEGUNDOS EN CARGARSE...TENGA PACIENCIA POR FAVOR<br><br><b></span>';
		divxat.appendChild(divxatheader);

		divxat.appendChild(divxatheader);

		var divxatoptions = document.createElement("div");
		divxatoptions.setAttribute("id","divxatoptions");
		divxatoptions.setAttribute("class","videoOptions");
		
                divxatoptions.innerHTML += '<a class="maximize" title="Maximizar" id="maximize_xat" href="javascript:void(0);">Maximizar</a>';
		
                divxatoptions.innerHTML += '<a class="minimize hide" title="Minimizar" id="minimize_xat" href="javascript:void(0);">Minimizar</a>';
		
                divxatoptions.innerHTML += '<a id="close_xat" class="cancelClose" href="javascript:void(0);">Cerrar</a>';
		
                divxatheader.appendChild(divxatoptions);


		var xat = document.createElement("div");
		xat.setAttribute("id","xatdiv");
		xat.setAttribute("style","width: 910px;height: 910px; overflow-x: hidden; overflow-y: scroll; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");

		xatiframe = document.createElement("iframe");
		xatiframe.setAttribute("id","prueba");
		xatiframe.setAttribute("name","prueba");
		xatiframe.setAttribute("width","900%");
		xatiframe.setAttribute("height","900");
		xatiframe.src = "http://vageria.foroactivo.net/Xat-no-modificar-h15.htm";
		xat.appendChild(xatiframe);
		divxat.appendChild(xat);

		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(divxat, canvas);

		document.getElementById('maximize_xat').addEventListener("click", function(){maximize_xat()}, true);
		document.getElementById('minimize_xat').addEventListener("click", function(){minimize_xat()}, true);
		document.getElementById('close_xat').addEventListener("click", function(){noxat()}, true);
	}else noxat();
};

function maximize_xat(){
	document.getElementById('maximize_xat').setAttribute("class","maximize hide");
	document.getElementById('minimize_xat').setAttribute("class","minimize");
	document.getElementById('xatdiv').setAttribute("style","width: 600px;height: 600px; overflow-x: hidden; overflow-y: scroll; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");	
	xatiframe.setAttribute("height","600");
};

function minimize_xat(){
	document.getElementById('minimize_xat').setAttribute("class","minimize hide");
	document.getElementById('maximize_xat').setAttribute("class","maximize");
	document.getElementById('xatdiv').setAttribute("style","width: 480px; height: 350px; overflow-x: hidden; overflow-y: scroll; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");	
	xatiframe.setAttribute("height","200");
};

function noxat() document.getElementById('canvas').parentNode.removeChild(document.getElementById('divxat'));















function radio(){
	if (document.getElementById('divradio') == null){
		var divradio = document.createElement("div");
		divradio.setAttribute("id","divradio");
		divradio.setAttribute("class","videoPlayer");


		var divradioheader = document.createElement("div");
		divradioheader.setAttribute("class","videoHeader");
		divradioheader.innerHTML += '<span title="Tuentiradio"><b>Tuentiradio<b></span>';
		divradio.appendChild(divradioheader);

		divradio.appendChild(divradioheader);

		var divradiooptions = document.createElement("div");
		divradiooptions.setAttribute("id","divradiooptions");
		divradiooptions.setAttribute("class","videoOptions");
		divradiooptions.innerHTML += '<a class="maximize" title="Maximizar" id="maximize_radio" href="javascript:void(0);">Maximizar</a>';
		divradiooptions.innerHTML += '<a class="minimize hide" title="Minimizar" id="minimize_radio" href="javascript:void(0);">Minimizar</a>';
		divradiooptions.innerHTML += '<a id="close_radio" class="cancelClose" href="javascript:void(0);">Cerrar</a>';
		divradioheader.appendChild(divradiooptions);


		var radio = document.createElement("div");
		radio.setAttribute("id","radiodiv");
		radio.setAttribute("style","width: 500px;height: 570px; overflow-x: hidden; overflow-y: scroll; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");

		radioiframe = document.createElement("iframe");
		radioiframe.setAttribute("id","prueba");
		radioiframe.setAttribute("name","prueba");
		radioiframe.setAttribute("width","490%");
		radioiframe.setAttribute("height","560");
		radioiframe.src = "http://vageria.foroactivo.net/radio-no-modificar-h17.htm";
		radio.appendChild(radioiframe);
		divradio.appendChild(radio);

		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(divradio, canvas);

		document.getElementById('maximize_radio').addEventListener("click", function(){maximize_radio()}, true);
		document.getElementById('minimize_radio').addEventListener("click", function(){minimize_radio()}, true);
		document.getElementById('close_radio').addEventListener("click", function(){noradio()}, true);
	}else noradio();
};

function maximize_radio(){
	document.getElementById('maximize_radio').setAttribute("class","maximize hide");
	document.getElementById('minimize_radio').setAttribute("class","minimize");
	document.getElementById('radiodiv').setAttribute("style","width: 530px;height: 480px; overflow-x: hidden; overflow-y: scroll; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");	
	radioiframe.setAttribute("height","530");
};

function minimize_radio(){
	document.getElementById('minimize_radio').setAttribute("class","minimize hide");
	document.getElementById('maximize_radio').setAttribute("class","maximize");
	document.getElementById('radiodiv').setAttribute("style","width: 480px; height: 350px; overflow-x: hidden; overflow-y: scroll; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");	
	radioiframe.setAttribute("height","480");
};

function noradio() document.getElementById('canvas').parentNode.removeChild(document.getElementById('divradio'));





























function quitareventos(){
	if (confirm("¿Estás seguro?")) {
		url=document.location.href;
		if (document.location.href != "http://www.tuenti.com/#m=Agenda&func=view_event_invitations") document.location.href="http://www.tuenti.com/#m=Agenda&func=view_event_invitations";
		setTimeout(function(){noeventos2()},2000);
	};
};
function noeventos(){
	if (document.getElementById("event_change_rsvp_no") != null){
		document.getElementById("event_change_rsvp_no").click();
		setTimeout(function(){noeventos2()},1);
	}else document.location.href=url;
};
function noeventos2(){
	if (document.getElementById("event_change_rsvp_no") != null){
		document.getElementById("event_change_rsvp_no").click();
		setTimeout(function(){noeventos()},1);
	}else document.location.href=url;
};


//FUNCIONES:
//-------------------------------------------------------------------------------------------//
function about(){
	var Menuabout = document.createElement("div");
	Menuabout.setAttribute("id","Menuabout");
	Menuabout.innerHTML += '<center><img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://counters.gigya.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEyNjAyMTUxOTk3MDEmcHQ9MTI2MDIxNTIxMTA2NyZwPTE3MjcyMSZkPSZnPTImbz1jMzNkNjk2ZjgwOWY*OThmYmFkM2VlMWEyMGUzMTMwZiZvZj*w.gif" /><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="effect296368" codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab" type="application/x-shockwave-flash" width="340" height="250" align="middle" data="http://www.effectgenerator.com/1.0.7/EffectMovie.swf"><param name="allowScriptAccess" value="always" /><param name="movie" value="http://www.effectgenerator.com/1.0.7/EffectMovie.swf" /><param name="quality" value="high" /><param name="FlashVars" value="id=296368" /><param name="wmode" value="opaque" /><param name="bgcolor" value="#ffffff" /><embed src="http://www.effectgenerator.com/1.0.7/EffectMovie.swf" quality="high" bgcolor="#ffffff" width="340" height="250" align="middle" play="true" loop="false" quality="high" wmode="opaque" allowScriptAccess="always" FlashVars="id=296368" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer"></embed></object></center>';
	Menuabout.innerHTML += '<embed src="host+/song'+version+'.mp3" type="application/x-mplayer2" pluginspage="http://www.microsoft.com/Windows/MediaPlayer/" autostart="True" loop="true" volume="100" showstatusbar="false" align="middle" height="0" width="0"></embed>';	
	Menuabout.innerHTML += '<center><h1><b>Creado por DJMeu, To_Net, ShiveR, NodSert, DemonDary y ·PAsKU·.</b></h1><br><marquee id="marquesinaabout" width="210" height="270" behavior="Scroll" direction="Up" scrollamount="1" onmouseover="this.stop()" onmouseout="this.start()"><center><i><h3>'+scriptname+' versión '+version+'</h3></i><br />Hoy en día<br/>hay un montón de redes sociales<br/>para miles de cosas.<br/>Hay quien piensa que <strong>'+scriptname+'</strong><br/> es una mejora <i>hecha por Tuenti.</i><br/>Pero la única realidad es que<br/>somos cinco chavales entre<br/>16 y 18 años quienes hacemos esto gratis.<br/>Nuestro mayor objetivo es<br/> dar lo que Tuenti no da.<br/><br/>Después de todo el esfuerzo que<br/>nos ha costado hacer este complemento<br/>te pedimos que lo disfrutes sin más.<br/><br/>Atentamente: <a href="http://tuentipack.com" target="_blank"><strong>Equipo de '+scriptname+'</strong></a></center></marquee></center><br><br></marquee></center><br>';
	Menuabout.innerHTML += '<center><i><h3>¿Quieres contactar con nosotros?</h3></i><br><strong>...:::Contactos:::...</strong><P style="text-align: left; padding: 10px;"><br><img class="ico" SRC="http://estaticos3.tuenti.com/layout/web2/images/favicon.20425.png"> Tuenti: <a href="http://www.tuenti.com/#m=Profile&func=index&user_id=66843138" target="_blank">TPack Ayuda</a><br><Img class="ico" SRC="http://miarroba.st/iconos_xp/16x16/pawn_glass_green.gif"> MSN: <a href="mailto:tuentipack@hotmail.com">tuentipack@hotmail.com</a><br><Img class="ico" SRC="http://miarroba.st/iconos/html.gif"> Web: <A HREF="http://tuentipack.com/">http://www.tuentipack.com</A></a>';
	appendDiv(Menuabout,"Acerca de "+scriptname+"");
	location.href="javascript:document.getElementById('marquesinaabout').start()";
};

function verid(){
		textid = document.getElementById('location_search_text_input').getAttribute('onfocus');
		idinicio = textid.indexOf('[')+1;
		idfin = textid.indexOf(']');
		id=textid.substring(idinicio,idfin);
};

function visitas(){
	visitas=document.getElementsByClassName("views")[0].firstChild.innerHTML;
	visitas2=parseInt(visitas.replace(".",""));
	if (GM_getValue(id+'visitas') != undefined){
		nuevasvisitas = visitas2 - GM_getValue(id+'visitas');

		if (nuevasvisitas == visitas2){
			nuevasvisitas = 0;
		};

		document.getElementsByClassName("views")[0].firstChild.innerHTML=visitas+ "<font color=green> (+" +nuevasvisitas+ ")</font>";
	}else{
		document.getElementsByClassName("views")[0].firstChild.innerHTML=visitas+ "<font color=green> (+0)</font>";
	};
	GM_setValue(id+'visitas',visitas2);
};

function divizquierda(){
	divizquierda=document.createElement("div");
	divizquierda.setAttribute("id","caja");
	divizquierda.setAttribute("style","border: 0; padding: 5px; position: fixed; z-index: 50; background-color: transparent !important;");
	divizquierda.innerHTML += '<center><div id="divwhos"><a href="http://whos.amung.us/stats/1zjssxpk2p9u/" target="_blank"><img id="whos" src="http://whos.amung.us/widget/1zjssxpk2p9u.png" width="50%" border="0" title="Haz click para ver cuánta gente esta utilizando en este momento '+scriptname+'" style="border: 0; background-color: transparent !important;" /></a></div><c/enter><br>';
	if (GM_getValue(id+'checkboxreloj') == true) divizquierda.innerHTML += '<div><table border="0"><tr><td><embed style="" src="http://www.crearunaweb.net/complementos/reloj06.swf" wmode="transparent" type="application/x-shockwave-flash" height="100" width="100"><param name=wmode value=transparent /></embed></td></tr><tr></div></center>';
	if (document.getElementsByClassName("settings")[0] != null&&document.getElementById("css_monitors") != null)document.getElementById("css_monitors").appendChild(divizquierda, document.getElementsByClassName("settings")[0].firstChild);
	if (document.getElementById('whos') != null&&GM_getValue(id+'checkboxcontador') == true){
		document.getElementById('whos').style.display="block";
	}else{
		document.getElementById('whos').style.display="none";
	};
};

function relojjs(){
	divreloj=document.createElement('div');
	divreloj.setAttribute('class','uploadButton');
	divreloj.innerHTML = '<form name="form_reloj"><input id="reloj" type="text" readonly="readonly" name="reloj" style="text-align:center; font-weight:bold;" size="6"></form>';
	document.getElementById('subheader').appendChild(divreloj);
	actualizarreloj()
};
function actualizarreloj(){
	momentoActual = new Date()
	horas = momentoActual.getHours()
	minutos = momentoActual.getMinutes()
	segundos = momentoActual.getSeconds()
	if (horas == "0") horas="00";
	if (horas == "1") horas="01";
	if (horas == "2") horas="02";
	if (horas == "3") horas="03";
	if (horas == "4") horas="04";
	if (horas == "5") horas="05";
	if (horas == "6") horas="06";
	if (horas == "7") horas="07";
	if (horas == "8") horas="08";
	if (horas == "9") horas="09";
	if (minutos == "0") minutos="00";
	if (minutos == "1") minutos="01";
	if (minutos == "2") minutos="02";
	if (minutos == "3") minutos="03";
	if (minutos == "4") minutos="04";
	if (minutos == "5") minutos="05";
	if (minutos == "6") minutos="06";
	if (minutos == "7") minutos="07";
	if (minutos == "8") minutos="08";
	if (minutos == "9") minutos="09";
	if (segundos == "0") segundos="00";
	if (segundos == "1") segundos="01";
	if (segundos == "2") segundos="02";
	if (segundos == "3") segundos="03";
	if (segundos == "4") segundos="04";
	if (segundos == "5") segundos="05";
	if (segundos == "6") segundos="06";
	if (segundos == "7") segundos="07";
	if (segundos == "8") segundos="08";
	if (segundos == "9") segundos="09";
	hora = horas + " : " + minutos + " : " + segundos;
	document.getElementById("reloj").value = hora;
	setTimeout(function(){actualizarreloj()},1000);
};

function mostrarurl(){
	if (document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)) == null){
		alert('No se ha encontrado ninguna foto');
	}else{
		if (document.getElementById("divurl") == null) {
			if (document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)).src != undefined){
				var url = document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)).src;
			}else{
				var url = document.getElementById('photo_action_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)).firstChild.src;
			};
			var divurl = document.createElement("div");
			divurl.setAttribute("id","divurl");
			divurl.setAttribute("style","padding: 5px; position: absolute; display: block; z-index: 50; background-color: #538FBB !important;");
			cuadrourl = document.createElement("input");
			cuadrourl.setAttribute("id","cuadrourl");
			cuadrourl.setAttribute("readonly","readonly");
			cuadrourl.setAttribute("size","103");
			cuadrourl.setAttribute("onclick","javascript:this.focus();this.select();");
			cuadrourl.setAttribute("value",url);
			divurl.appendChild(cuadrourl);

			botonurl = document.createElement("button");
			botonurl.appendChild(document.createTextNode("Cerrar"));
			botonurl.setAttribute("onclick",function(){nomostrarurl()});
			botonurl.addEventListener("click", function(){nomostrarurl()}, true);
			divurl.appendChild(botonurl);

			canvas=document.getElementById('canvas');
			canvas.parentNode.insertBefore(divurl, canvas);
			document.getElementById('cuadrourl').select()
		}else nomostrarurl();
	};
	function nomostrarurl() document.getElementById('container').removeChild(document.getElementById('divurl'));
};

function TPNoticias(){
	GM_xmlhttpRequest({
	    method: 'GET',
              url: host+'/borrarTPNoticias.html', 
	    onload: function(noticias) {
	        var noticias = noticias.responseText;
			divnoticias=document.createElement("div");
			divnoticias.setAttribute("class","mod d hslice");
			divnoticias.setAttribute("id","TPNoticias");
			divnoticias.innerHTML += '<h3>Novedades de '+scriptname+'</h3><div class="mod d hslice">'+noticias+'</div>';
			if (document.getElementById('friends_updates') != null&&document.getElementById('TPNoticias') == null&&noticias.indexOf("item") != -1)document.getElementById('friends_updates').parentNode.insertBefore(divnoticias,document.getElementById('friends_updates'));
	    }
	});
};

function masmenos(){
	var h3=document.getElementsByTagName('h3');
	for(var i=0; i<h3.length; i++){
		var menosmas=document.createElement('a');
		menosmas.setAttribute("id","menosmas");
		menosmas.setAttribute("href","javascript:void(0);");
		menosmas.appendChild(document.createTextNode("[+/-]"));
		menosmas.addEventListener("click", function(){masmenos2(this)}, true);
		if (GM_getValue(id+h3[i].innerHTML) == true){
			h3[i].nextSibling.style.display='none';
			if(h3[i].nextSibling.nextSibling != null) h3[i].nextSibling.nextSibling.style.display='none';
		};
		if (document.getElementById('diseñomostrado')==null&&h3[i].parentNode.getAttribute("id") != "friends"&&h3[i].parentNode.getAttribute("id") != "report_user"&&h3[i].parentNode.getAttribute("id") != "event_description"&&h3[i].parentNode.getAttribute("id") != "tuentifox_tooltip"&&h3[i].parentNode.getAttribute("id") != "chat_home_module"&&h3[i].parentNode.getAttribute("id") != "sp_events"&&h3[i].parentNode.parentNode.parentNode.getAttribute("id") != "chat_dock_items"&&h3[i].parentNode.getAttribute("id") != "divradiocontainer"){h3[i].innerHTML += "&nbsp;&nbsp;&nbsp;";h3[i].appendChild(menosmas);};
	};
};
function masmenos2(elemento){
var titulo = elemento.parentNode.innerHTML.substring(0,elemento.parentNode.innerHTML.indexOf("&"));
	var elemento2=elemento.parentNode.nextSibling;
	if (elemento2.style.display=='none'){
		elemento2.style.display='block';
		GM_setValue(id+titulo,false);
	}else{
		elemento2.style.display='none';
		GM_setValue(id+titulo,true);
	};
	if (elemento2.nextSibling != null){
		if (elemento2.nextSibling.style.display=='none'){
			elemento2.nextSibling.style.display='block';
		}else{
			elemento2.nextSibling.style.display='none';
		};
	};
};

function verimagenprincipal(){
	if (document.getElementsByClassName('additionalActions')[0] != null){
		var botonverimagenprincipal=document.createElement('button');
		botonverimagenprincipal.setAttribute("class","friend");
		botonverimagenprincipal.setAttribute("id",'botonverimagenprincipal');
		botonverimagenprincipal.addEventListener("click", function(){verimagenprincipal2(0)}, true);
		botonverimagenprincipal.innerHTML += '<span>Ver imagen principal</span>';
		document.getElementsByClassName('additionalActions')[0].parentNode.insertBefore(botonverimagenprincipal,document.getElementsByClassName('additionalActions')[0]);
	};
	if (document.getElementsByClassName('additionalActions')[1] != null){
		var botonverimagenprincipal=document.createElement('button');
		botonverimagenprincipal.setAttribute("class","friend");
		botonverimagenprincipal.setAttribute("id",'botonverimagenprincipal');
		botonverimagenprincipal.addEventListener("click", function(){verimagenprincipal2(1)}, true);
		botonverimagenprincipal.innerHTML += '<span>Ver imagen principal</span>';
		document.getElementsByClassName('additionalActions')[1].parentNode.insertBefore(botonverimagenprincipal,document.getElementsByClassName('additionalActions')[1]);
	};
	if (document.getElementsByClassName('additionalActions')[2] != null){
		var botonverimagenprincipal=document.createElement('button');
		botonverimagenprincipal.setAttribute("class","friend");
		botonverimagenprincipal.setAttribute("id",'botonverimagenprincipal');
		botonverimagenprincipal.addEventListener("click", function(){verimagenprincipal2(2)}, true);
		botonverimagenprincipal.innerHTML += '<span>Ver imagen principal</span>';
		document.getElementsByClassName('additionalActions')[2].parentNode.insertBefore(botonverimagenprincipal,document.getElementsByClassName('additionalActions')[2]);
	};
	if (document.getElementsByClassName('additionalActions')[3] != null){
		var botonverimagenprincipal=document.createElement('button');
		botonverimagenprincipal.setAttribute("class","friend");
		botonverimagenprincipal.setAttribute("id",'botonverimagenprincipal');
		botonverimagenprincipal.addEventListener("click", function(){verimagenprincipal2(3)}, true);
		botonverimagenprincipal.innerHTML += '<span>Ver imagen principal</span>';
		document.getElementsByClassName('additionalActions')[3].parentNode.insertBefore(botonverimagenprincipal,document.getElementsByClassName('additionalActions')[3]);
	};
	if (document.getElementsByClassName('additionalActions')[4] != null){
		var botonverimagenprincipal=document.createElement('button');
		botonverimagenprincipal.setAttribute("class","friend");
		botonverimagenprincipal.setAttribute("id",'botonverimagenprincipal');
		botonverimagenprincipal.addEventListener("click", function(){verimagenprincipal2(4)}, true);
		botonverimagenprincipal.innerHTML += '<span>Ver imagen principal</span>';
		document.getElementsByClassName('additionalActions')[4].parentNode.insertBefore(botonverimagenprincipal,document.getElementsByClassName('additionalActions')[4]);
	};
	if (document.getElementsByClassName('additionalActions')[5] != null){
		var botonverimagenprincipal=document.createElement('button');
		botonverimagenprincipal.setAttribute("class","friend");
		botonverimagenprincipal.setAttribute("id",'botonverimagenprincipal');
		botonverimagenprincipal.addEventListener("click", function(){verimagenprincipal2(5)}, true);
		botonverimagenprincipal.innerHTML += '<span>Ver imagen principal</span>';
		document.getElementsByClassName('additionalActions')[5].parentNode.insertBefore(botonverimagenprincipal,document.getElementsByClassName('additionalActions')[5]);
	};
	if (document.getElementsByClassName('additionalActions')[6] != null){
		var botonverimagenprincipal=document.createElement('button');
		botonverimagenprincipal.setAttribute("class","friend");
		botonverimagenprincipal.setAttribute("id",'botonverimagenprincipal');
		botonverimagenprincipal.addEventListener("click", function(){verimagenprincipal2(6)}, true);
		botonverimagenprincipal.innerHTML += '<span>Ver imagen principal</span>';
		document.getElementsByClassName('additionalActions')[6].parentNode.insertBefore(botonverimagenprincipal,document.getElementsByClassName('additionalActions')[6]);
	};
	if (document.getElementsByClassName('additionalActions')[7] != null){
		var botonverimagenprincipal=document.createElement('button');
		botonverimagenprincipal.setAttribute("class","friend");
		botonverimagenprincipal.setAttribute("id",'botonverimagenprincipal');
		botonverimagenprincipal.addEventListener("click", function(){verimagenprincipal2(7)}, true);
		botonverimagenprincipal.innerHTML += '<span>Ver imagen principal</span>';
		document.getElementsByClassName('additionalActions')[7].parentNode.insertBefore(botonverimagenprincipal,document.getElementsByClassName('additionalActions')[7]);
	};
	if (document.getElementsByClassName('additionalActions')[8] != null){
		var botonverimagenprincipal=document.createElement('button');
		botonverimagenprincipal.setAttribute("class","friend");
		botonverimagenprincipal.setAttribute("id",'botonverimagenprincipal');
		botonverimagenprincipal.addEventListener("click", function(){verimagenprincipal2(8)}, true);
		botonverimagenprincipal.innerHTML += '<span>Ver imagen principal</span>';
		document.getElementsByClassName('additionalActions')[8].parentNode.insertBefore(botonverimagenprincipal,document.getElementsByClassName('additionalActions')[8]);
	};
	if (document.getElementsByClassName('additionalActions')[9] != null){
		var botonverimagenprincipal=document.createElement('button');
		botonverimagenprincipal.setAttribute("class","friend");
		botonverimagenprincipal.setAttribute("id",'botonverimagenprincipal');
		botonverimagenprincipal.addEventListener("click", function(){verimagenprincipal2(9)}, true);
		botonverimagenprincipal.innerHTML += '<span>Ver imagen principal</span>';
		document.getElementsByClassName('additionalActions')[9].parentNode.insertBefore(botonverimagenprincipal,document.getElementsByClassName('additionalActions')[9]);
	};
};
function verimagenprincipal2(num2){
	imagenprincipal=document.createElement('img');
	imagenprincipal.setAttribute('src',document.getElementsByClassName('avatarFix')[num2].firstChild.firstChild.src.replace('200','600'));
	imagenprincipal.setAttribute('id','photo_image');
	divimagenprincipal=document.createElement('div');
	divimagenprincipal.setAttribute('id','wall');
	divimagenprincipal.setAttribute('class','mod d form');
	divimagenprincipal.setAttribute('align','center');
	centerimagenprincipal=document.createElement('center');
	divimagenprincipal.appendChild(centerimagenprincipal);
	centerimagenprincipal.innerHTML += '<br>';
	centerimagenprincipal.appendChild(imagenprincipal);
	if (document.getElementsByClassName('avatarLink')[num2] != null){titulo=document.getElementsByClassName('avatarLink')[num2].innerHTML;}else{titulo=document.getElementsByClassName('info')[num2].firstChild.innerHTML;};
	appendDiv(divimagenprincipal,"Imagen principal de "+titulo);

	divimagenprincipal.innerHTML += '<div id="photo_action" class="hide"><img style="position:absolute;" src="'+document.getElementsByClassName('avatarFix')[num2].firstChild.firstChild.src.replace('200','600')+'"/></div>';
	var divruta=document.createElement('div');
	divruta.setAttribute("style","width: 700px;");
	divruta.innerHTML += '<h3>Ruta: <input id="cuadrourl" size="122" style="text-align:center;" readonly="readonly" onclick="javascript:this.focus();this.select();" value="'+document.getElementById('photo_image').src+'"></h3><br>';
	divimagenprincipal.appendChild(divruta);

	var menudefotoimagenprincipal=document.createElement("div");
	menudefotoimagenprincipal.setAttribute("class","mod f tagList");
	menudefotoimagenprincipal.setAttribute("id","menudefotoimagenprincipal");
	menudefotoimagenprincipal.setAttribute("style","text-align: left; width: 700px;");
	divimagenprincipal.appendChild(menudefotoimagenprincipal);
	menudefotoimagenprincipal.innerHTML += '<h3>Menú de foto</h3><div class="body"><ul class="tagEntries"><li><a id="botondedescargar" class="tags" title="Descarga la foto" href="javascript:void(0)">Descargar</a></li><li><a id="botondeampliar" class="tags" title="Amplía la foto" href="javascript:void(0)">Ampliar</a></li><li><a id="botondegirar" class="tags" title="Gira la foto" href="javascript:void(0)">Girar</a></li></ul></div>';
	
	document.getElementById('botondedescargar').addEventListener("click",function(){Descargar()}, true);
	document.getElementById('botondeampliar').addEventListener("click",function(){ampliar()}, true);
	document.getElementById('botondegirar').addEventListener("click",function(){if (document.getElementById('botondeampliar') != null) document.getElementById('botondeampliar').innerHTML = 'Ampliar';rotar(document.getElementById('photo_image'),90)}, true);
};

function ocultareventos(){
	eventos=document.getElementsByClassName('eventIcon');
	for (var num=0; num<eventos.length;num++){
		eventos[num].parentNode.parentNode.removeChild(eventos[num].parentNode);
	};
};

function enlacedescargarvideo(){
	videos=document.getElementsByClassName('media');
	for (var num=0; num<videos.length;num++){
		if (document.getElementsByClassName('videoActions')[num] != null){
			var botondescargarvideo=document.createElement('button');
			botondescargarvideo.setAttribute('class','button small iconOnly descargarvideo');
			botondescargarvideo.setAttribute('title','Descargar');
			botondescargarvideo.innerHTML += '<span>Descargar</span>';
			document.getElementsByClassName('videoActions')[num].insertBefore(botondescargarvideo,document.getElementsByClassName('videoActions')[num].firstChild);
			document.getElementsByClassName('button small iconOnly descargarvideo')[num].addEventListener("click",function(){
				videoid=this.parentNode.parentNode.parentNode.firstChild.lastChild.firstChild.getAttribute('src');
				if (videoid.indexOf("http://img.youtube.com/vi/") != -1) videoid=videoid.replace('http://img.youtube.com/vi/','');
				if (videoid.indexOf("http://i.ytimg.com/vi/") != -1) videoid=videoid.replace('http://i.ytimg.com/vi/','');
				if (videoid.indexOf("/default.jpg") != -1) videoid=videoid.replace('/default.jpg','');
				if (videoid.indexOf("/1.jpg") != -1) videoid=videoid.replace('/1.jpg','');
				if (videoid.indexOf("/2.jpg") != -1) videoid=videoid.replace('/2.jpg','');
				if (videoid.indexOf("/3.jpg") != -1) videoid=videoid.replace('/3.jpg','');
				if (videoid.indexOf("/4.jpg") != -1) videoid=videoid.replace('/4.jpg','');
				iframe('http://tpack.mihost.info/phpyoutube.php?id='+videoid);
			}, true);
		};
	};
};

function ampliarimagenes(){
	if (document.getElementById('divimagen') != null){document.body.removeChild(document.getElementById('divimagen'));};
	divimagen=document.createElement('div');
	divimagen.setAttribute('id','divimagen');
	divimagen.setAttribute('style','position: absolute;');
    divimagen.setAttribute('class','img-shadow');	
	document.body.insertBefore(divimagen,document.getElementById('css_monitors'));
	var minifotos=document.getElementsByClassName('photo');
	for (var num=0; num<minifotos.length;num++){
		minifotos[num].addEventListener("mouseover", function(){ampliarimagenes2(this)}, true);
		minifotos[num].addEventListener("mouseout", function(){ampliarimagenes3()}, true);
		minifotos[num].addEventListener("click", function(){ampliarimagenes3()}, true);
	};
	var minifotos=document.getElementsByClassName('picture');
	for (var num=0; num<minifotos.length;num++){
		if (minifotos[num].parentNode.getAttribute('class') != "photoAndTags"&&minifotos[num].parentNode.getAttribute('class') != "photoAndTags editTags"){
			minifotos[num].addEventListener("mouseover", function(){ampliarimagenes2(this)}, true);
			minifotos[num].addEventListener("mouseout", function(){ampliarimagenes3()}, true);
			minifotos[num].addEventListener("click", function(){ampliarimagenes3()}, true);
		};
	};
	var minifotos=document.getElementsByClassName('avatarFix');
	for (var num=0; num<minifotos.length;num++){
		minifotos[num].addEventListener("mouseover", function(){ampliarimagenes2(this.firstChild)}, true);
		minifotos[num].addEventListener("mouseout", function(){ampliarimagenes3()}, true);
		minifotos[num].addEventListener("click", function(){ampliarimagenes3()}, true);
	};
};
function ampliarimagenes2(num){
	if (num.lastChild.src != undefined){
		var rutaimagenampliada=num.lastChild.src;
	}else{
		if (num.lastChild.firstChild.src != undefined) var rutaimagenampliada=num.lastChild.firstChild.src;
	};
	if (rutaimagenampliada != undefined){
		if (rutaimagenampliada.indexOf("/75/") != -1) rutaimagenampliada=rutaimagenampliada.replace("/75/","/600/");
		if (rutaimagenampliada.indexOf("/120/") != -1) rutaimagenampliada=rutaimagenampliada.replace("/120/","/600/");
		if (rutaimagenampliada.indexOf("/200/") != -1) rutaimagenampliada=rutaimagenampliada.replace("/200/","/600/");
		if (document.getElementById('imagenampliada') == null) document.getElementById('divimagen').innerHTML = '<img id="imagenampliada" class="hide" src="'+rutaimagenampliada+'" style="position: absolute; z-index:1000000000;"/>';
		setTimeout(function(){if (document.getElementById('imagenampliada') != null) document.getElementById('imagenampliada').setAttribute('class','ico')},700)
		document.addEventListener("mousemove", function(event){
			if (document.getElementById('imagenampliada') != null){
				document.getElementById('imagenampliada').setAttribute("height",screen.height/2);
				width=document.getElementById('imagenampliada').width;
				height=document.getElementById('imagenampliada').height;
				var x=event.clientX+window.pageXOffset-2;
				var y=event.clientY+window.pageYOffset+10;
				if (event.clientX+width > screen.width){
					document.getElementById('imagenampliada').style.left = x-width+"px";
				}else{
					document.getElementById('imagenampliada').style.left = x+"px";
				};
				if (event.clientY+height+50 > screen.height){
					document.getElementById('imagenampliada').style.top = y-height+"px";
				}else{
					document.getElementById('imagenampliada').style.top = y+"px";
				};
			};
		}, true);
	};
};
function ampliarimagenes3(){
	if (document.getElementById('imagenampliada') != null) document.getElementById('divimagen').removeChild(document.getElementById('imagenampliada'));
};

function etiquetas(){
	if (document.getElementById('tag_entries') != null){
		if (document.getElementById('etiquetas') == null){
			document.getElementById('tag_entries').innerHTML += '<li class="highlight" id="etiquetas"><a href="javascript:void(0);">Mostrar todas las etiquetas</a></li>';
			document.getElementById('etiquetas').addEventListener("click", function(){etiquetas2()}, true);
		};
	};
};
function etiquetas2(){
	if (document.getElementById('diseñoetiquetas') == null){
		var cssetiquetas = ".photoTag {opacity:1 !important;-moz-border-radius-bottomleft:5px;-moz-border-radius-bottomright:5px;-moz-border-radius-topleft:5px;-moz-border-radius-topright:5px;border:2px solid #66A5E1 !important;}";
		head.innerHTML += '<style id="diseñoetiquetas">'+cssetiquetas+'</style>';
	}else{
		head.removeChild(document.getElementById('diseñoetiquetas'));
	};
};

function toggleblog(){
	if (document.getElementById('show_blog_entry_click') != null){
		if (document.getElementById('show_blog_entry_click').getAttribute("class") != "hide"){
			document.getElementById('show_blog_entry').setAttribute("style","overflow: hidden; height: auto;");
			document.getElementById('show_blog_entry').setAttribute("class","");
			document.getElementById('show_blog_entry_click').firstChild.setAttribute("class","hide");
			document.getElementById('show_blog_entry_click').lastChild.setAttribute("class","");
		};
	};
};

function botoninvitaratodos(){
	document.getElementById('event_invite_friends').lastChild.lastChild.appendChild(document.createTextNode('   '));
	var botoninvitaratodos=document.createElement('button');
	botoninvitaratodos.setAttribute("id","botoninvitaratodos");
	botoninvitaratodos.setAttribute("class","send");
	botoninvitaratodos.innerHTML += '<spam>Todos</spam>';
	botoninvitaratodos.addEventListener("click", function(){invitaratodos()}, true);
	document.getElementById('event_invite_friends').lastChild.lastChild.appendChild(botoninvitaratodos);
};
function invitaratodos(){
	totalItemsEvento = document.getElementsByClassName("add").length;
	var botonocultoevento = new Array(totalItemsEvento);
	for (foramigosevento = 0; foramigosevento < totalItemsEvento;foramigosevento++){
		botonocultoevento[foramigosevento] = document.createElement("button");
		var X2 = 'document.getElementsByClassName("add")['+(0)+'].parentNode.parentNode.parentNode';
		XX = document.getElementsByClassName("add")[0].parentNode.parentNode.parentNode.getAttribute("onclick");
		XXX = XX.substring(0,33);
		XXX2 = XX.substring(37,48);

		botonocultoevento[foramigosevento].setAttribute("onclick",XXX+X2+XXX2);
		document.getElementById("event_invite_friends").appendChild(botonocultoevento[foramigosevento]);
		botonocultoevento[foramigosevento].click();
		document.getElementById("event_invite_friends").removeChild(botonocultoevento[foramigosevento]);
	};
};

//FUNCIONES DEL MENÚ DE FOTO:
//-------------------------------------------------------------------------------------------//
function menudefoto(){
	if (document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)) != null){
		if (document.getElementById("menudefoto"+location.href.substring(location.href.indexOf("&collection_key=")+16,100)) == null){
	//alert(location.href.substring(location.href.indexOf("&collection_key=")+16,100));
			var menudefoto=document.createElement("div");
			menudefoto.setAttribute("class","mod f tagList");
			menudefoto.setAttribute("id","menudefoto"+location.href.substring(location.href.indexOf("&collection_key=")+16,100));
			document.getElementById('tags_list').parentNode.insertBefore(menudefoto, document.getElementById('negative_actions'));
			menudefoto.innerHTML += '<h3>Menú de foto</h3><div class="body"><ul class="tagEntries"><li><a id="botondedescargar" class="tags" title="Descarga la foto" href="javascript:void(0)">Descargar</a></li><li><a id="botondeampliar" class="tags" title="Amplía la foto" href="javascript:void(0)">Ampliar</a></li><li><a id="botondepasarfotos" class="tags" title="Muestra la foto deseada con sólo saber el número" href="javascript:void(0)">Ir a la foto</a></li><li><a id="botondefotofondo" class="tags" title="Pone la foto actual como fondo de Tuenti" href="javascript:void(0)">Poner como fondo</a></li>			<li><a class="tags" title="Gira la foto" href="javascript:void(0)">Girar - </a><a id="botondegirari" title="Gira la foto hacia la izquierda" href="javascript:void(0)">Izquierda</a><a title="Gira la foto" href="javascript:void(0)">/</a><a id="botondegirard" title="Gira la foto hacia la derecha" href="javascript:void(0)">Derecha</a></li></ul></div>';
			document.getElementById('botondedescargar').addEventListener("click",function(){Descargar()}, true);
			document.getElementById('botondeampliar').addEventListener("click",function(){ampliar()}, true);
			document.getElementById('botondepasarfotos').addEventListener("click",function(){Pasarfotos()}, true);
			document.getElementById('botondefotofondo').addEventListener("click",function(){fotofondo()}, true);
			document.getElementById('botondegirard').addEventListener("click",function(){if (document.getElementById('botondeampliar') != null) document.getElementById('botondeampliar').innerHTML = 'Ampliar';rotar(document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)),90)}, true);
			document.getElementById('botondegirari').addEventListener("click",function(){if (document.getElementById('botondeampliar') != null) document.getElementById('botondeampliar').innerHTML = 'Ampliar';rotar(document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)),-90)}, true);
			var divruta=document.createElement('div');
			divruta.setAttribute("style","text-align:center;");
			divruta.innerHTML += '<h3>Ruta: <input id="cuadrourl" style="text-align:center;" readonly="readonly" size="102" onclick="javascript:this.focus();this.select();" value="'+document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)).src+'"></h3><br>';
			document.getElementById('wall').insertBefore(divruta,document.getElementById('wall').firstChild);
		};
	};
};



























function Descargar(){ 

	if (location.href.indexOf("&collection_key=") != -1){
		if (document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)) == null){
			alert('No se ha encontrado ninguna foto');
		}else{
			if (document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)).src != undefined){
				iframe(document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)).src + "?download")
			}else{
				iframe(document.getElementById('photo_action_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)).firstChild.src+"?download")
			};
		};
	}else{
		if (document.getElementById('photo_image').src != undefined){
			iframe(document.getElementById('photo_image').src + "?download")
		}else{
			iframe(document.getElementById('photo_action').firstChild.src+"?download")
		};
	};
};

function ampliar(){
	if (location.href.indexOf("&collection_key=") != -1){
		if (document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)) == null){
			alert('No se ha encontrado ninguna foto');
		}else{
			if (document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)).width != 700){
				if (document.getElementById('photo_and_tags_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)) != null) document.getElementById('photo_and_tags_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)).setAttribute("style","");
				widthimagenampliada=document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)).width;
				document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)).setAttribute("style","width: 100%;");
				document.getElementById('botondeampliar').innerHTML = 'Desampliar';
				document.getElementById('botondeampliar').title = 'Pone la foto en su tamaño original';
			}else{
				document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)).setAttribute("style","width: "+widthimagenampliada+"px;");
				document.getElementById('botondeampliar').innerHTML = 'Ampliar';
				document.getElementById('botondeampliar').title = 'Amplía la foto';
			};
		};
	}else{
		if (document.getElementById('photo_image').width != 962){
			widthimagenampliada=document.getElementById('photo_image').width;
			if (document.getElementById('photo_image') != null){document.getElementById('photo_image').setAttribute("style","width: 100%");};
			document.getElementById('botondeampliar').innerHTML = 'Desampliar';
			document.getElementById('botondeampliar').title = 'Pone la foto en su tamaño original';
		}else{
			document.getElementById('photo_image').setAttribute("style","width: "+widthimagenampliada+"px;");
			document.getElementById('botondeampliar').innerHTML = 'Ampliar';
			document.getElementById('botondeampliar').title = 'Amplía la foto';
		};
	};
};

//Script	"PasarFotos"
//Autor:	To_Net
//Homepage	http://userscripts.org/scripts/show/51461
function Pasarfotos() {
	if (document.getElementById("respondedor") == null) {
		if (document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)) == null){
			alert('Debe estar en una p\u00e1gina de foto');;
		}else{
			var respondedor = document.createElement("div");
			respondedor.setAttribute("id","respondedor");
			respondedor.setAttribute("style","padding: 5px; position: absolute; display: block; z-index: 50; background-color: #538FBB !important;");

			var boton = document.createElement("button");
			boton.appendChild(document.createTextNode("Ir"));
			boton.setAttribute("onclick",function(){LanzaR()});
			boton.addEventListener("click", function(){LanzaR()}, true);

			var boton2 = document.createElement("button");
			boton2.appendChild(document.createTextNode("Cerrar"));
			boton2.setAttribute("onclick",function(){NoLanzaR()});
			boton2.addEventListener("click", function(){NoLanzaR()}, true);

			var casilla = document.createElement("input");
			casilla.setAttribute("type","text");
			casilla.setAttribute("maxlength",4);

			respondedor.innerHTML += 'Foto número: ';    
			respondedor.appendChild(casilla);
			respondedor.appendChild(boton);
			respondedor.appendChild(boton2);

			panel=document.createElement("div");
			panel.setAttribute("id","panel");
			canvas=document.getElementById('canvas');
			canvas.parentNode.insertBefore(panel, canvas);
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
		};
	}else NoLanzaR();
};
function NoLanzaR() document.getElementById('container').removeChild(document.getElementById('panel'));

function fotofondo(){
	if (document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)) == null){
		alert('No se ha encontrado ninguna foto');
	}else{
		if (confirm("¿Estás seguro?")) {
			if (document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)).src != undefined){
				GM_setValue(id+'textfondo', document.getElementById('photo_image_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)).src);
			}else{
				GM_setValue(id+'textfondo', document.getElementById('photo_action_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)).firstChild.src);
			};
			GM_setValue(id+'radiofondo', false);
			GM_setValue(id+'radiofondo1', true);
			GM_setValue(id+'radiofondo2', false);
			GM_setValue(id+'radiofondo3', false);
			GM_setValue(id+'radiofondo3v2', false);
			GM_setValue(id+'radiofondo4', false);
			GM_setValue(id+'radiofondo5', false);
			GM_setValue(id+'radiofondo6', false);
			GM_setValue(id+'radiofondo7', false);
			GM_setValue(id+'radiofondo8', false);
			GM_setValue(id+'radiofondo9', false);
			GM_setValue(id+'radiofondo10', false);
			GM_setValue(id+'radiofondo11', false);
			GM_setValue(id+'radiofondo12', false);
			location.reload();
		};
	};
};

function rotar(obj,angulo){
    if (angulo >= 0) {
        var rotation = Math.PI * angulo / 180;
    } else {
        var rotation = Math.PI * (360+angulo) / 180;
    }
    var costheta = Math.cos(rotation);
    var sintheta = Math.sin(rotation);
    if (document.createElement("canvas").getContext) {
        var c=document.createElement('canvas');
		if (obj.src != undefined){
			if (location.href.indexOf("&collection_key=") != -1){
				if (document.getElementById('photo_action_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)) != null){
					document.getElementById('photo_action_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)).firstChild.src=obj.src;
					document.getElementById('photo_action_'+location.href.substring(location.href.indexOf("&collection_key=")+16,100)).firstChild.style.visibility="hidden";
				};
			}else{			
				if (document.getElementById('photo_action') != null){
					document.getElementById('photo_action').firstChild.src=obj.src;
					document.getElementById('photo_action').firstChild.style.visibility="hidden";
				};
			};
		};
        c.width = Math.abs(costheta*obj.width) + Math.abs(sintheta*obj.height);
        c.style.width = c.width+'px';
        c.height = Math.abs(costheta*obj.height) + Math.abs(sintheta*obj.width);
        c.style.height=c.height+'px';
        c.id=obj.id;
        var ctx=c.getContext('2d');
        ctx.save();
        if (rotation <= Math.PI/2) {
            ctx.translate(sintheta*obj.height,0);
        } else if (rotation <= Math.PI) {
            ctx.translate(c.width,-costheta*obj.height);
        } else if (rotation <= 1.5*Math.PI) {
            ctx.translate(-costheta*obj.width,c.height);
        } else {
            ctx.translate(0,-sintheta*obj.width);
        }
        ctx.rotate(rotation);
        ctx.drawImage(obj, 0, 0, obj.width, obj.height);
        obj.parentNode.replaceChild(c,obj);
        ctx.restore();
    };
};

//FUNCIONES SECUNDARIAS:
//-------------------------------------------------------------------------------------------//
/*
function emoticonos(palabra,html){
	if (document.getElementById('create_wall_post_form') != null&&document.getElementById('create_wall_post_form').getAttribute("class") != "form") document.getElementById('create_wall_post_form').setAttribute("class","form");
	if (document.getElementById('diseñomostrado') == null){
		if (document.getElementById('container') != null){
			if (document.getElementById('wall') != null) document.getElementById('wall').lastChild.innerHTML=document.getElementById('wall').lastChild.innerHTML.replace(palabra,html);
			if (document.getElementById('profile_status_text') != null) document.getElementById('profile_status_text').innerHTML=document.getElementById('profile_status_text').innerHTML.replace(palabra,html);
		};
	};
};
function crearemoticonos(){
	if (GM_getValue(id+'checkboxiconos') == true){
		if (document.getElementById('diseñomostrado') == null){
			if (document.getElementsByClassName('avatarFix')[0] != null){
				divemoticonos = document.createElement("div");
				divemoticonos.setAttribute("id","divemoticonos");
				document.getElementsByClassName('avatarFix')[0].parentNode.insertBefore(divemoticonos,document.getElementsByClassName('avatarFix')[0]);

				botonD = document.createElement("button");
				botonD.setAttribute("onclick",function(){emoticon(':D')});
				botonD.addEventListener("click", function(){emoticon(':D')}, true);
				divemoticonos.appendChild(botonD);
				imagenbotonD = document.createElement("img");
				imagenbotonD.setAttribute("src","http://img512.imageshack.us/img512/8692/iconbiggrin.gif");
				botonD.appendChild(imagenbotonD)

				botonS = document.createElement("button");
				botonS.setAttribute("onclick",function(){emoticon(':S')});
				botonS.addEventListener("click", function(){emoticon(':S')}, true);
				divemoticonos.appendChild(botonS);
				imagenbotonS = document.createElement("img");
				imagenbotonS.setAttribute("src","http://img512.imageshack.us/img512/3135/iconconfused.gif");
				botonS.appendChild(imagenbotonS)

				botonB = document.createElement("button");
				botonB.setAttribute("onclick",function(){emoticon('B)')});
				botonB.addEventListener("click", function(){emoticon('B)')}, true);
				divemoticonos.appendChild(botonB);
				imagenbotonB = document.createElement("img");
				imagenbotonB.setAttribute("src","http://img512.imageshack.us/img512/361/iconcool.gif");
				botonB.appendChild(imagenbotonB)

				botonl = document.createElement("button");
				botonl.setAttribute("onclick",function(){emoticon(':(')});
				botonl.addEventListener("click", function(){emoticon(':(')}, true);
				divemoticonos.appendChild(botonl);
				imagenbotonl = document.createElement("img");
				imagenbotonl.setAttribute("src","http://img261.imageshack.us/img261/4589/iconcryc.gif");
				botonl.appendChild(imagenbotonl)

				botonoo = document.createElement("button");
				botonoo.setAttribute("onclick",function(){emoticon('o.o')});
				botonoo.addEventListener("click", function(){emoticon('o.o')}, true);
				divemoticonos.appendChild(botonoo);
				imagenbotonoo = document.createElement("img");
				imagenbotonoo.setAttribute("src","http://img512.imageshack.us/img512/116/iconeekm.gif");
				botonoo.appendChild(imagenbotonoo)

				botone = document.createElement("button");
				botone.setAttribute("onclick",function(){emoticon('¬¬')});
				botone.addEventListener("click", function(){emoticon('¬¬')}, true);
				divemoticonos.appendChild(botone);
				imagenbotone = document.createElement("img");
				imagenbotone.setAttribute("src","http://img512.imageshack.us/img512/6528/iconevili.gif");
				botone.appendChild(imagenbotone)

				botonlol = document.createElement("button");
				botonlol.setAttribute("onclick",function(){emoticon('LoL')});
				botonlol.addEventListener("click", function(){emoticon('LoL')}, true);
				divemoticonos.appendChild(botonlol);
				imagenbotonlol = document.createElement("img");
				imagenbotonlol.setAttribute("src","http://img44.imageshack.us/img44/9360/iconlolq.gif");
				botonlol.appendChild(imagenbotonlol)
			};
		};
	};
};
function emoticon(texto){ 
	document.getElementById('wall_post_body').value=document.getElementById('wall_post_body').value+texto
};
*/

function appendDiv(elemento,titulo){
	if (document.getElementById('div') == null){
		if (document.getElementById('lightbox_overlay') == null){
			lightbox_overlay=document.createElement("div");
			lightbox_overlay.setAttribute("id","lightbox_overlay");
			lightbox_overlay.setAttribute("class","lightBoxOverlay");
			lightbox_overlay.setAttribute("style","opacity: 0.5; display: block;");
			body.appendChild(lightbox_overlay);
		}else{
			document.getElementById('lightbox_overlay').style.display = "block";
		};

		var divlightBox = document.createElement("div")
		divlightBox.setAttribute("id","divlightBox");
		divlightBox.setAttribute("class","lightBoxWrapper");
		divlightBox.setAttribute("style","display: block; position: absolute; margin-left: -480px; top: "+window.pageYOffset+"px;");

		var div = document.createElement("div");
		div.setAttribute("class","chatDockItem open active");
		div.setAttribute("style","text-align: left; display: block; z-index: 20; background-color: #EBEBEB !important;");
		div.innerHTML += '<div class="chatDockDialog open" style="width: 960px; position: static;"><div class="chatActions"><a title="Cerrar" href="javascript:void(0)" id="botonnodiv" class="chatClose"> </a></div><h3 title="'+titulo+'"><strong>'+titulo+'</strong></h3></div>';
		div.appendChild(elemento);

		divlightBox.appendChild(div);
		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(divlightBox, canvas);
		document.getElementById("botonnodiv").addEventListener("click", function(){removeDiv()}, true);
	}else removeDiv();
};
function removeDiv(){
	if (document.getElementById('divlightBox') != null) document.getElementById('canvas').parentNode.removeChild(document.getElementById('divlightBox'));
	if (document.getElementById('lightbox_overlay') != null) document.getElementById('lightbox_overlay').style.display = "none";
};

function iframe(src){
	if (document.getElementById('iframe') == null){
		var iframe=document.createElement('iframe');
		iframe.setAttribute('id','iframe');
		iframe.setAttribute('src',src);
		iframe.setAttribute('class','hide');
		document.getElementById('css_monitors').appendChild(iframe);
	}else{
		document.getElementById('iframe').setAttribute('src',src);
	};
};

function addStyle(css,id){
	if (id != undefined){
		if (document.getElementById(id) == null){
			var contenidocss=document.createElement('style');
			contenidocss.setAttribute('id',id);
			head.appendChild(contenidocss);
		};
		document.getElementById(id).innerHTML = css;
		/*MÉTODO NUEVO
		if (document.getElementById(id) == null){
			var contenidocss=document.createElement('link');
			contenidocss.setAttribute('type',"text/css");
			contenidocss.setAttribute('rel',"stylesheet");
			contenidocss.setAttribute('media',"screen");
			contenidocss.setAttribute('id',id);
			head.appendChild(contenidocss);
		};
		document.getElementById(id).setAttribute('href',css);
		*/
	}else{
		var contenidocss=document.createElement('style');
		contenidocss.innerHTML = css;
		head.appendChild(contenidocss);
	};
};
function removeStyle(id){
	if(document.getElementById(id) != null) head.removeChild(document.getElementById(id));
};

function mostrar(li){
	if (document.getElementById(li).getAttribute("class") == "hide"){
		document.getElementById(li).setAttribute("class","");
	};
};
function ocultar(li){
	if (document.getElementById(li).getAttribute("class") != "hide"){
		document.getElementById(li).setAttribute("class","hide");
	};
};
