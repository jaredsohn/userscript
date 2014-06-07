// ==UserScript==
// @name           BBCodes para Taringa
// @namespace      http://www.taringa.net/posts/downloads/1918446/
// @description    BBCoder en Comentarios para T! y P!
// @identifier     http://www.proyectod.com.ar/Taringa/bbcodestaringa.user.js
// @source         http://www.taringa.net/posts/downloads/1918446/
// @include        http://*taringa.net/*
// @include        http://*poringa.net/*
// @version        11.5
// @copyright      Copyright (c) 2009, Sharkale
// @creator      Sharkale (Alejandro Barreiro) ® 2009 alejandro_barreiro2004@hotmail.com
// ==/UserScript==

// **COPYRIGHT NOTICE**
//
//    "BBCoder en Comentarios para T! y P!" Copyright (C) 2008-2009 Alejandro Barreiro
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

var URL = 'http://i268.photobucket.com/albums/jj27/sharkale/taringa/';
var Dom = location.hostname;
var Tar = RegExp("taringa").test(Dom);
var pathArray = window.location.pathname.split('/');
var path = '';
if (pathArray[1] == 'agregar' || pathArray[1].indexOf('edicion.form') != -1){
	path = 'edicion';
}else if(pathArray[1] == 'posts'){
	path = 'post';
}else if(pathArray[1] == 'mensajes-responder.php'){
	path = 'mensajes';
}else if(pathArray[1] == 'mensajes'){
	if(pathArray[2] == 'redactar') path = 'mensajes';
}else if(pathArray[1] == '' || pathArray[1] == 'index.php'){
	path = 'principal';
}
var Taringa_es_Opera   = window.opera ? true : false;
// ==/Variables==

// ==Funciones==
function trim(cadena) {
	return cadena.replace(/^\s+|\s+$/g,"");
}

function $(elm_id){
	return document.getElementById(elm_id);
}

function Taringa_Set_Function(func, nueva_func){
	if(typeof unsafeWindow == "object"){
		unsafeWindow[func] = nueva_func;
	}else if(Taringa_es_Opera){
		window[func] = nueva_func;
	}
}

function $$(BuscarClass,nodo,tag) {
	var classElements = new Array();
	if (nodo == null)
		nodo = document;
	if (tag == null)
		tag = '*';
	var els = nodo.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+BuscarClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if (pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function CrearBarraBBC(){
		
		var nuevaHTML = "<div id='Sharkale_TaringaBBC' style='display:block;'>";
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\'[align=left]\', \'[/align]\')"><img src="'+URL+'izquierdo.png" alt="IZQ" title="Alineación Izquierda" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\'[align=center]\', \'[/align]\')"><img src="'+URL+'centrado.png" alt="CEN" title="Alineación Centrada" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\'[align=right]\', \'[/align]\')"><img src="'+URL+'derecho.png" alt="DER" title="Alineación Derecha" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\'[b]\', \'[/b]\')"><img src="'+URL+'negrita.png" alt="B" title="Letra Negrita" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\'[i]\', \'[/i]\')"><img src="'+URL+'cursiva.png" alt="I" title="Letra Cursiva" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\'[u]\', \'[/u]\')"><img src="'+URL+'subrayado.png" alt="U" title="Letra Subrayada" border="0"></a>&nbsp;';
		nuevaHTML += '<select id="colordefont" style="color: black; background-color: rgb(250, 250, 250); font-size: 10px;position:relative;top:-5px;" onchange="insertarBBC(\'[color=\' + $$(\'colordefont\').options[$$(\'colordefont\').selectedIndex].value + \']\', \'[/color]\');this.selectedIndex=0;">';
		nuevaHTML += '	<option style="color: black; background-color: rgb(250, 250, 250);" value="#">Color</option>';
		nuevaHTML += '	<option style="color: darkred; background-color: rgb(250, 250, 250);" value="darkred">Bordo</option>';
		nuevaHTML += '	<option style="color: red; background-color: rgb(250, 250, 250);" value="red">Rojo</option>';
		nuevaHTML += '	<option style="color: orange; background-color: rgb(250, 250, 250);" value="orange">Naranja</option>';
		nuevaHTML += '	<option style="color: brown; background-color: rgb(250, 250, 250);" value="brown">Marrón</option>';
		nuevaHTML += '	<option style="color: yellow; background-color: rgb(250, 250, 250);" value="yellow">Amarillo</option>';
		nuevaHTML += '	<option style="color: green; background-color: rgb(250, 250, 250);" value="green">Verde</option>';
		nuevaHTML += '	<option style="color: olive; background-color: rgb(250, 250, 250);" value="olive">Oliva</option>';
		nuevaHTML += '	<option style="color: cyan; background-color: rgb(250, 250, 250);" value="cyan">Cyan</option>';
		nuevaHTML += '	<option style="color: blue; background-color: rgb(250, 250, 250);" value="blue">Azul</option>';
		nuevaHTML += '	<option style="color: indigo; background-color: rgb(250, 250, 250);" value="indigo">Indigo</option>';
		nuevaHTML += '	<option style="color: violet; background-color: rgb(250, 250, 250);" value="violet">Violeta</option>';
		nuevaHTML += '	<option style="color: black; background-color: rgb(250, 250, 250);" value="black">Negro</option>';
		nuevaHTML += '</select>';
		nuevaHTML += '<select id="sizedefont" style="color: black; background-color: rgb(250, 250, 250); font-size: 10px;position:relative;top:-5px;" onchange="insertarBBC(\'[size=\' + $$(\'sizedefont\').options[$$(\'sizedefont\').selectedIndex].value + \']\', \'[/size]\');this.selectedIndex=0;">';
		nuevaHTML += '	<option value="#" selected="selected">Tamaño</option>';
		nuevaHTML += '	<option value="9">Pequeña</option>';
		nuevaHTML += '	<option value="12">Normal</option>';
		nuevaHTML += '	<option value="18">Grande</option>';
		nuevaHTML += '	<option value="24">Gigante</option>';
		nuevaHTML += '</select>';
		nuevaHTML += '<select id="tipodefont" style="color: black; background-color: rgb(250, 250, 250); font-size: 10px;position:relative;top:-5px;" onchange="insertarBBC(\'[font=\' + $$(\'tipodefont\').options[$$(\'tipodefont\').selectedIndex].value + \']\', \'[/font]\');this.selectedIndex=0;">';
		nuevaHTML += '	<option value="#">Fuente</option>';
		nuevaHTML += '	<option value="Arial" style="font-family: Arial;">Arial</option>';
		nuevaHTML += '	<option value="Century" style="font-family: Century;">Century</option>';
		nuevaHTML += '	<option value="Comic Sans MS" style="font-family: Comic Sans MS;">Comic</option>';
		nuevaHTML += '	<option value="Courier New" style="font-family: Courier New;">Courier</option>';
		nuevaHTML += '	<option value="FixedSys" style="font-family: FixedSys;">Fixed</option>';
		nuevaHTML += '	<option value="Georgia" style="font-family: Georgia;">Georgia</option>';
		nuevaHTML += '	<option value="Lucida Sans" style="font-family: Lucida Sans;">Lucida</option>';
		nuevaHTML += '	<option value="Monotype Corsiva" style="font-family: Monotype Corsiva;">Monotype</option>';
		nuevaHTML += '	<option value="Times New Roman" style="font-family: Times New Roman;">Times</option>';
		nuevaHTML += '	<option value="Trebuchet MS" style="font-family: Trebuchet MS;">Trebuchet</option>';
		nuevaHTML += '	<option value="Verdana" style="font-family: Verdana;">Verdana</option>';
		nuevaHTML += '</select>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\'vyoutube\')"><img src="'+URL+'youtube.png" alt="YT" title="Insertar Video de YouTube" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\'vgoogle\')"><img src="'+URL+'google.png" alt="YT" title="Insertar Video de Google" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\'esnips\')"><img src="'+URL+'esnips.png" alt="ME" title="Insertar canción de eSnips" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\'swf\')"><img src="'+URL+'flash.png" alt="SWF" title="Insertar archivo SWF" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\'image\')"><img src="'+URL+'imagen.png" alt="IMG" title="Insertar Imágen" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\'link\')"><img src="'+URL+'link.png" alt="URL" title="Insertar URL" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\'quote\')"><img src="'+URL+'cita.png" alt="Cita" title="Insertar una Cita" border="0"></a>&nbsp;';
		if(path == 'post'){
			nuevaHTML +='<a href="javascript:void(0)" onclick="preview()"><img src="'+URL+'preview.png" alt="Ver Preview del Comentario" title="Ver Preview del Comentario" border="0"></a>';
		}
		nuevaHTML += "</div>";
		return nuevaHTML;
}

function CrearBarraEmoticones(){
var URLtaringa = 'http://i.t.net.ar/images/smiles/';
		var nuevaHTML = "<div id='Sharkale_TaringaEmoticones' style='display:block;'>";
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :) \')"><img src="'+URLtaringa+'smile.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' X( \')"><img src="'+URLtaringa+'angry.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :cool: \')"><img src="'+URLtaringa+'cool.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :cry: \')"><img src="'+URLtaringa+'crying.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' 8| \')"><img src="http://i5.tinypic.com/6jbffgn.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :blaf: \')"><img src="'+URLtaringa+'blaf.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :winky: \')"><img src="'+URLtaringa+'winky.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :noo: \')"><img src="'+URLtaringa+'sad2.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :twisted: \')"><img src="'+URLtaringa+'evil.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' ^^ \')"><img src="'+URLtaringa+'grn.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :| \')"><img src="'+URLtaringa+'huh.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :D \')"><img src="'+URLtaringa+'laughing.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :oops: \')"><img src="'+URLtaringa+'red.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :? \')"><img src="'+URLtaringa+'s.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :F \')"><img src="'+URLtaringa+'drool.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :( \')"><img src="'+URLtaringa+'sad.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :P \')"><img src="'+URLtaringa+'tongue.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :roll: \')"><img src="'+URLtaringa+'wassat.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' ;) \')"><img src="'+URLtaringa+'wink.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :bobo: \')"><img src="'+URLtaringa+'bobo.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :grin: \')"><img src="'+URLtaringa+'grin.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :8S: \')"><img src="'+URLtaringa+'8s.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :] \')"><img src="'+URLtaringa+'5.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :metal: \')"><img src="'+URLtaringa+'metal.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :crying: \')"><img src="'+URLtaringa+'cry.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :shrug: \')"><img src="'+URLtaringa+'shrug.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :blind: \')"><img src="'+URLtaringa+'15.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :buaa: \')"><img src="'+URLtaringa+'17.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :cold: \')"><img src="'+URLtaringa+'cold.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :hot: \')"><img src="'+URLtaringa+'hot.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :love: \')"><img src="'+URLtaringa+'love.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :globo: \')"><img src="'+URLtaringa+'globo.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :zombie: \')"><img src="'+URLtaringa+'zombie.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :man: \')"><img src="'+URLtaringa+'pacman.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :mario: \')"><img src="'+URLtaringa+'mario.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :info: \')"><img src="'+URLtaringa+'i.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :exc: \')"><img src="'+URLtaringa+'exclamacion.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :q: \')"><img src="'+URLtaringa+'pregunta.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :NO: \')"><img src="'+URLtaringa+'no.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :OK: \')"><img src="'+URLtaringa+'ok.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :WOW: \')"><img src="'+URLtaringa+'wow.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :LOL: \')"><img src="'+URLtaringa+'lol.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :oo: \')"><img src="'+URLtaringa+'papel.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :RIP: \')"><img src="'+URLtaringa+'rip.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :alien: \')"><img src="'+URLtaringa+'koe.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :trago: \')"><img src="'+URLtaringa+'106.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :money: \')"><img src="'+URLtaringa+'dolar.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :verde: \')"><img src="'+URLtaringa+'verde.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :culo: \')"><img src="'+URLtaringa+'culo.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :auto: \')"><img src="'+URLtaringa+'car.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :lala: \')"><img src="'+URLtaringa+'mobe.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :fantasma: \')"><img src="'+URLtaringa+'fantasma.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :alaba: \')"><img src="'+URLtaringa+'alabama.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :lpmqtp: \')"><img src="'+URLtaringa+'lpmqtp.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :idiot: \')"><img src="'+URLtaringa+'idiot.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :buenpost: \')"><img src="'+URLtaringa+'buenpost.gif" alt="" title="" border="0" height="40"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :GET A LIFE: \')"><img src="'+URLtaringa+'getalife.gif" alt="" title="" border="0" height="35"></a>&nbsp;';
		nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\' :headbang: \')"><img src="'+URLtaringa+'bang.gif" alt="" title="" border="0"></a>&nbsp;';
		nuevaHTML += "</div>";
		return nuevaHTML;
}

// ==/Funciones==

// ==Funciones que serán agregadas a la página==
function AgregarFuncionesenWeb(){

Taringa_Set_Function("$$", function(elm_id){
	return document.getElementById(elm_id);
});

Taringa_Set_Function("botonPrompt", function(tipo){
var inicio = txt.selectionStart;
var fin   = txt.selectionEnd;
var seleccion = txt.value.substring(inicio, fin);
if(tipo=='vyoutube'){ //YouTube
	var msg = prompt('Ingrese la dirección del video de YouTube:');
	if(msg != '' && msg != null){

		var regexp = /(?:[Yy][Oo][Uu][Tt][Uu][Bb][Ee]\.[Cc][Oo][Mm]\/(?:[Ww][Aa][Tt][Cc][Hh]\?[Vv]=|[Vv]\/)[\w|-]*)/;
		var enc = regexp.exec(msg);
		if (enc != null) {
			regexp = /(?:[Vv][/|=][\w|-]*)/;
			enc = enc[0].match(regexp);
			if (enc != null) msg = enc[0].substring(2);
		}
		if(msg.length < 5 && msg.length > 20)
		{
			alert('Dirección del video inválida');
		} else {
			var hd=confirm("Si el video posee alta defición acepte esta ventana.\n\nDe lo contrario cancelela o no se verá el video.")
			if (hd==true)
				unsafeWindow.insertarBBC('[swf=http://www.youtube.com/v/' + msg + '&color1=2b405b&color2=6b8ab6&border=1&hl=es&rel=0&fmt=22]');
			else
				unsafeWindow.insertarBBC('[swf=http://www.youtube.com/v/' + msg + '&color1=2b405b&color2=6b8ab6&border=1&hl=es&rel=0&fmt=18]');
		}
	}
}else if(tipo=='vgoogle'){ //Google Video
	var msg = prompt('Ingrese la dirección del video de Google:');
	if(msg != '' && msg != null){

		var regexp = /(?:[Vv][Ii][Dd][Ee][Oo]\.[Gg][Oo][Oo][Gg][Ll][Ee].[Cc][Oo][Mm]\/(?:[Vv][Ii][Dd][Ee][Oo][Pp][Ll][Aa][Yy]|[Gg][Oo][Oo][Gg][Ll][Ee][Pp][Ll][Aa][Yy][Ee][Rr]\.[Ss][Ww][Ff])\?[Dd][Oo][Cc][Ii][Dd]=[\w|-]*)/;
		var enc = regexp.exec(msg);
		if (enc != null) {
			regexp = /(?:[=][\w|-]*)/;
			enc = enc[0].match(regexp);
			if (enc != null) msg = enc[0].substring(1);
		}
		if(msg.length < 5 && msg.length > 25)
		{
			alert('Dirección del video inválida');
		} else {
			unsafeWindow.insertarBBC('[swf=http://video.google.com/googleplayer.swf?docId=' + msg + ']');
		}
	}
}else if(tipo=='esnips'){ //Cancion MP3
	var msg = prompt('Ingrese la dirección "URL" de la canción proporcionada por eSnips:\n\nEjemplo:\nhttp://www.esnips.com/doc/01f6cd69-e218-4faa-8f1c-1e5cc0cc4111/Rodrigo - La Mano De Dios');
	if(msg != '' && msg != null){

		var regexp = /(?:[Dd][Oo][Cc]\/[\w|\-|\/]*)/;
		var enc = regexp.exec(msg);
		if (enc != null) {
			msg = enc[0].substring(4);
			if(msg.length < 30 || msg.indexOf("/") == -1){
				alert('Dirección de la música inválida');
			} else {
				var params = msg.split("/",2);
				unsafeWindow.insertarBBC('[swf=http://www.esnips.com/escentral/images/widgets/flash/player_dj.swf?autoPlay=no&theFile=http://www.esnips.com/nsdoc/' + params[0] + '&theName=' + params[1] + '&thePlayerURL=http://www.esnips.com/escentral/images/widgets/flash/mp3WidgetPlayer.swf]');
			}
		} else alert('Dirección de la música inválida');
	}
}else if(tipo=='swf'){ //Flash
    if(seleccion.substring(0,7) != 'http://'){
	var msg = prompt('Ingrese la dirección URL del archivo SWF','http://');
	if(msg != '' && msg != null)
		unsafeWindow.insertarBBC('[swf=' + msg + ']');
    } else unsafeWindow.insertarBBC('[swf=',']');
}else if(tipo=='quote'){ //Cita
	var msg = prompt('Ingrese el texto a citar');
	if(msg != '' && msg != null)
		unsafeWindow.insertarBBC('[quote]' + msg + '[/quote]');
}else if(tipo=='image'){ //Imagen
    if(seleccion.substring(0,7) != 'http://'){
	var msg = prompt('Ingrese la dirección URL completa de la imagen','http://');
	if(msg != '' && msg != null)
		unsafeWindow.insertarBBC('[img=' + msg + ']');
    } else unsafeWindow.insertarBBC('[img=',']');
}else if(tipo=='link'){ //Link
    if(seleccion.substring(0,7) != 'http://'){
	var msg = prompt('Ingrese la URL que desea postear','http://');
	if(msg != '' && msg != null){
		if(inicio == fin) {
		   var msg2 = prompt('¿Desea agregarle una etiqueta a la URL?');
		   if(msg2 != '' && msg2 != null)
			unsafeWindow.insertarBBC('[url='+msg+']'+msg2+'[/url]')
		   else
			unsafeWindow.insertarBBC('[url]'+msg+'[/url]');
		} else
			unsafeWindow.insertarBBC('[url='+msg+']','[/url]');
	}
    } else unsafeWindow.insertarBBC('[url]','[/url]');
}
});

		Taringa_Set_Function("insertarBBC", function(TagAntes,TagDespues){
			
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
			} else { if (inicio == fin) {
					
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
			if(trim(txt.value) == ''){
				$$('msg_add_comment',null,'div')[0].innerHTML = 'Debes escribir algo para realizar la previsualización';
				$$('msg_add_comment',null,'div')[0].setAttribute('style', 'display: block;');
			} else {
			$$('msg_add_comment',null,'div')[0].setAttribute('style', 'display: none;');
			$('gif_cargando_add_comment').setAttribute('style', 'display: block;');
			window.setTimeout(function(){
			GM_xmlhttpRequest({ 
              				method: 'GET',
             				url: 'http://www.taringa.net/preview.php?titulo=Preview&cuerpo=' + encodeURIComponent(txt.value),
              				onload: function(responseDetails){
					$('gif_cargando_add_comment').setAttribute('style', 'display: none;');
                 					var respuesta = responseDetails.responseText;
                 					var respuestaHTML = document.createElement("div");
					respuestaHTML.setAttribute('id','preview_comentario');
					respuestaHTML.setAttribute('style','display: none');
					respuestaHTML.innerHTML = respuesta;
					document.body.insertBefore(respuestaHTML, document.body.childNodes[0]);
					$('return_agregar_comentario').removeAttribute('style');
					$$('box_title',null,'div')[1].setAttribute('id','preview_titulo');
					$('preview_titulo').setAttribute('class','cita');
					var TitPrev = '<img src="'+URL+'cerrar.gif" alt="[X]" title="Cerrar Previsualización" border="0" ';
					TitPrev += 'onclick="javascript:(document.getElementById(\'return_agregar_comentario\').setAttribute(\'style\',\'display: none\'))" ';
					TitPrev += 'onmouseover="this.style.cursor=\'pointer\'" /> ';
					TitPrev += 'Preview del Comentario - Sharkale®';
					$('preview_titulo').innerHTML = TitPrev;
					$$('box_cuerpo',null,'div')[0].setAttribute('class','citacuerpo');
					$('return_agregar_comentario').innerHTML = $('post-centro').innerHTML;
				},
				onerror: function(responseDetails){
					$$('msg_add_comment',null,'div')[0].innerHTML = 'Hubo un error al previsualizar, Por favor intente nuevamente.';
					$$('msg_add_comment',null,'div')[0].setAttribute('style', 'display: block;');
				}
			});
			}, 0);
			}
		});



}
// ==/Funciones que serán agregadas a la página==

if(path == 'post'){
///////////////------------------Agregar Boton Ir Abajo--------------------////////////////////

	if($('titulo1')){
		var Tierra = '<span style="vertical-align: middle;float: right;padding-top: 1px;padding-right: 2px">';
		Tierra += '<a href="#pie" class="size13"><strong>Ir a la Tierra</strong></a></span>';
		$('titulo1').innerHTML = Tierra + '<span style="vertical-align: middle;padding-top: 1px;">' + $('titulo1').innerHTML+ '</span>';
		$$('box_txt post_comentarios')[0].innerHTML = '<span style="vertical-align: middle;float: left;padding-top: 1px;">Comentarios</span>' + Tierra;
	}

	if($("cuerpo_comment")){
		AgregarFuncionesenWeb();
///////////////------------------Agregar BBCodes--------------------////////////////////
		$$('markItUpHeader',null,"div")[0].innerHTML = CrearBarraBBC();
		var txt = $("cuerpo_comment");
///////////////----------Agregar Opciones en Comentarios------------////////////////////
		var opc1 = $('span_opciones1').innerHTML;
		var opc2 = $('span_opciones2').innerHTML.replace(/Enviar a un amigo/,'').replace(/Agregar a favoritos/,'').replace(/Denunciar/,'').replace(/ \| /g,'\| &nbsp;');
		$$('box_txt post_agregar_comment')[0].innerHTML = '<span style="float:left;text-align:left;">Agregar un nuevo comentario</span><span style="float:right;text-align:right;font-weight:normal;">'+opc2+' | '+opc1+'</span>';
///////////////-----------------Agregar Emoticones------------------////////////////////
		var divEmo = $$('box_cuerpo agregar_comm_der')[0];
		var regexp = /(?:\<img[\w|\W]*\<\/div\>)/;
		divEmo.innerHTML = divEmo.innerHTML.replace(regexp, CrearBarraEmoticones());
		txt.setAttribute('style', 'height: 150px');
	}

}else if(path == 'edicion'){
///////////////------------------Agregar BBCodes--------------------////////////////////

		$$('markItUpHeader',null,"div")[0].innerHTML = CrearBarraBBC();
		var txt = $("markItUp");
		AgregarFuncionesenWeb();

}else if(path == 'mensajes'){
///////////////------------------Agregar BBCodes--------------------////////////////////

		$$('markItUpHeader',null,"div")[0].innerHTML = CrearBarraBBC();
		var txt = $("markItUp");
		AgregarFuncionesenWeb();

}else if(path == 'principal'){
///////////////---------------Comentarios Actualizar----------------////////////////////
	setInterval("actualizar_comentarios()", 30000);
}
//----Script----//
if($$('menu_der')[0] && Tar){
	var HTML =  '<span style="float:left;text-align:left;margin-top:4px;"><img src="'+URL+'info16.png" alt="P" title="Ingresar al post del Script" border="0" onclick="javascript:window.location.href=\'http://taringa.net/posts/downloads/1940775/\'" onmouseover="this.style.cursor=\'pointer\'"></span>';
	$$('menu_der')[0].innerHTML = HTML + '<span style="float:right;text-align:right;">' + $$('menu_der')[0].innerHTML + '</span>';
}
//----Logout----//
var links = document.links;
var i = 10;
var n = -1;
do{
	if (RegExp("logout.php").test(links[i].href)) n = i;
	i++;
}while(n == -1 && i < 20);
if(links[n]){
	var LogOut = '<span style="vertical-align: middle;"><img src="'+URL+'cerrar.gif" alt="X" title="Cerrar Sesión" border="0" ';
	LogOut += 'onclick="javascript:(location.href = \''+links[n].href+'\')" ';
	LogOut += 'onmouseover="this.style.cursor=\'pointer\'" /></span>';
	var str = links[n].href.replace('http://www.taringa.net/logout.php?key=','').replace('http://taringa.net/logout.php?key=','');
	$$('menu_centro')[0].innerHTML = $$('menu_centro')[0].innerHTML.replace('[<a href="/logout.php?key='+str+'">x</a>]', LogOut);
}

///////////////------------------Actualizar--------------------////////////////////
(function() {
     function ActualizarScript(SCRIPT) {
	try {
		if (!GM_getValue) return;
		GM_xmlhttpRequest({
			method: 'GET',
			url: SCRIPT.url,
			onload: function(resultado) {
				if (!resultado.responseText.match(/@version\s+([\d.]+)/)) return;
				var laOtraVersion = parseFloat(RegExp.$1);
				if (laOtraVersion <= parseFloat(SCRIPT.version)) return;
				if (window.confirm('Hay disponible una nueva versión del script ' + SCRIPT.name + '.\nTu versión instalada es la ' + SCRIPT.version + ' y la última disponible es la ' + laOtraVersion + '\n\n¿Desea actualizar el script?\n')) {
					GM_openInTab(SCRIPT.url);
				}
			}
		});
	} catch (err) {
		GM_log('error al actualizar');
	}
         }
         ActualizarScript({
	name: 'BBCoder para Taringa',
	url: 'http://www.proyectod.com.ar/Taringa/bbcodestaringa.user.js',
	version: '11.5'
         });
})();