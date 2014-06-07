// ==UserScript==
// @name           Meristation++
// @namespace      Meristation++
// @description    Añade nuevas funcionalidades a Meristation.
// @include        http://zonaforo.meristation.com/foros/*
// @exclude        http://zonaforo.meristation.com/foros/search.php?mode=searchuser
// @exclude        http://zonaforo.meristation.com/foros/posting.php?mode=smilies
// @require        http://buzzy.hostoi.com/AutoUpdater.js
// @license        Creative Commons Reconocimiento-No comercial-Sin obras derivadas 3.0 España License
// @author         Gagle
// @version        1.2.1
// @date           16/05/11
// ==/UserScript==

//--------------- LIBRERÍA ---------------//

function eliminaNodo(e){if(e)e.parentNode.removeChild(e);}
function colocaDelante(e1,e2){if(e2)e2.parentNode.insertBefore(e1,e2);}
function colocaDetras(e1,e2){if(e2)e2.parentNode.insertBefore(e1,e2.nextSibling);}
function swapNodos(e1,e2){if(e1&&e2){var nextSibling=e1.nextSibling;var parentNode=e1.parentNode;e2.parentNode.replaceChild(e1,e2);parentNode.insertBefore(e2,nextSibling)}}//El primer nodo tiene que ser posterior al segundo nodo.
function addGlobalStyle(css){var head=document.getElementsByTagName("head")[0];if(head){var style=document.createElement("style");style.type="text/css";style.innerHTML=css;head.appendChild(style)}}
function getHrefParam(param){var re=new RegExp(param+"="+"\\w+");var r=re.exec(location.href);if(r!=null){var s=r+"";return s.split("=")[1]}else{return r}}
function trim(cad){return cad.replace(/^\s+|\s+$/g,"")}

//--------------- fin LIBRERÍA ---------------//


//--------------- FUNCIONES ---------------//

function meristationFirma (){
	addGlobalStyle (".signature { border-top: none; }");

	/*
	//Tracto la edición del textarea.
	var editor;

	function leer (){
		return editor.value.substring (editor.selectionStart, editor.selectionEnd);
	}

	function cogeString (area, cad){
		var ini = area.value.substr (0, area.selectionStart);
		var fin = area.value.substr (area.selectionEnd, area.value.length);

		area.value = ini + cad + fin;
	}

	function iniciaEditor (){
		editor = document.getElementById ("miAreaTexto");
	}

	//Para pasar de BBCode a HTML
	function bbcode2html (areaTexto, capaHtml){
		var texto = areaTexto.value;

		do{
			texto = texto.replace ('<','&lt;');
		}while (texto.indexOf ('<') >= 0);
		do{
			texto = texto.replace ('>','&gt;');
		}while (texto.indexOf ('>') >= 0);
		do{
			texto = texto.replace ('[b]', '<b>');
		}while (texto.indexOf('[b]') >= 0);
		do{
			texto = texto.replace ('[/b]', '</b>');
		}while (texto.indexOf('[/b]') >= 0);
		do{
			texto = texto.replace ('[center]', '<center>');
		}while (texto.indexOf ('[center]') >= 0);
		do{
			texto = texto.replace ('[/center]', '</center>');
		}while (texto.indexOf ('[/center]') >= 0);
		do{
			texto = texto.replace ('[code]', '<table cellspacing="1" cellpadding="3" border="0" width="90%" style="margin-left: 20px; float: none;"><tbody><tr><td><span class="genmed"><b>Código:</b></span></td></tr><tr><td class="code">');
		}while (texto.indexOf ('[code]') >= 0);
		do{
			texto = texto.replace ('[/code]', '</td></tr></tbody></table>');
		}while (texto.indexOf ('[/code]') >= 0);
		do{
			texto = texto.replace ('[color=', '<span style="color:');
		}while (texto.indexOf ('[color=') >= 0);
		do{
			texto = texto.replace ('[/color]','</span>');
		}while (texto.indexOf ('[/color]') >= 0);
		do{
			texto = texto.replace ('[i]', '<i>');
		}while (texto.indexOf ('[i]') >= 0);
		do{
			texto = texto.replace ('[/i]', '</i>');
		}while (texto.indexOf ('[/i]') >= 0);
		do{
			texto = texto.replace ('[img]', '<img border="0" src="');
		}while (texto.indexOf ('[img]') >= 0);
		do{
			texto = texto.replace ('[/img]', '">');
		}while (texto.indexOf ('[/img]') >= 0);
		do{
			texto = texto.replace ('[left]', '<div style="text-align: left">');
		}while (texto.indexOf ('[left]') >= 0);
		do{
			texto = texto.replace ('[/left]', '</div>');
		}while (texto.indexOf ('[/left]') >= 0);
		do{
			texto = texto.replace ('[o]','<span style="text-decoration: overline">');
		}while (texto.indexOf ('[o]') >= 0);
		do{
			texto = texto.replace ('[/o]','</span>');
		}while (texto.indexOf ('[/o]') >= 0);
		do{
			texto = texto.replace ('[quote]','<table cellspacing="1" cellpadding="3" border="0" width="90%" style="margin-left: 20px; float: none;"><tbody><tr><td><span class="genmed"><b>Cita:</b></span></td></tr><tr><td class="quote"><span class="postbody">');
		}while (texto.indexOf ('[quote]') >= 0);
		do{
			var i, j;
			var userQuote = new Array ();
			j = 0;
			i = texto.indexOf ('[quote="');
			if (i != -1){
				i += 8;
				while (texto[i] != '"'){
					userQuote[j] = texto[i];
					i++;
					j++;
				}
				userQuote = userQuote.join ("");
				texto = texto.replace ('[quote="' + userQuote + '"]', '<table width="90%" cellspacing="1" cellpadding="3" border="0" style="margin-left: 20px; float: none;"><tbody><tr><td><span class="postbody"><span class="genmed"><b>' + userQuote + ' escribió:</b></span></span></td></tr><tr><td class="quote"><span class="postbody">');
			}
		}while (texto.indexOf ('[quote="') >= 0);
		do{
			texto = texto.replace ('[/quote]','</span></td></tr></tbody></table>');
		}while (texto.indexOf ('[/quote]') >= 0);
		do{
			texto = texto.replace ('[right]', '<div style="text-align: right">');
		}while (texto.indexOf ('[right]') >= 0);
		do{
			texto = texto.replace ('[/right]', '</div>');
		}while (texto.indexOf ('[/right]') >= 0);
		do{
			texto = texto.replace ('[s]','<span style="text-decoration: line-through">');
		}while (texto.indexOf ('[s]') >= 0);
		do{
			texto = texto.replace ('[/s]','</span>');
		}while (texto.indexOf ('[/s]') >= 0);
		do{
			var k, l;
			var tam = new Array ();
			l = 0;
			k = texto.indexOf ('[size=');
			if (k != -1){
				k += 6;
				while (texto[k] != ']'){
					tam[l] = texto[k];
					k++;
					l++;
				}
				tam = tam.join ("");
				tam = parseInt (tam);
				texto = texto.replace ('[size=' + tam + ']', '<span style="font-size: ' + tam + 'px">');
			}
		}while (texto.indexOf ('[size=') >= 0);
		do{
			texto = texto.replace ('[/size]','</span>');
		}while (texto.indexOf ('[/size]') >= 0);
		do{
			texto = texto.replace ('[u]', '<u>');
		}while (texto.indexOf ('[u]') >= 0);
		do{
			texto = texto.replace ('[/u]', '</u>');
		}while (texto.indexOf ('[/u]') >= 0);
		do{
			texto = texto.replace ('[url=', '<a style="color: #369; text-decoration: underline;" href="');
		}while (texto.indexOf ('[url=') >= 0);
		do{
			texto = texto.replace ('[/url]', '</a>');
		}while (texto.indexOf ('[/url]') >= 0);
		do{
			texto = texto.replace (']','">');
		}while (texto.indexOf (']') >= 0);
		do{
			texto = texto.split ("\n").join ("<br/>");
		}while (texto.indexOf ('\n') >= 0);

		capaHtml.innerHTML = texto;
	}

	//Botón Previsualizar
	function previsualizar1 (){
		bbcode2html (document.getElementById ("miAreaTexto"), document.getElementById ("miCapaHtml"));
	}

	function previsualizar2 (){
		var previsualizar = document.getElementById ("previsualizar");
		previsualizar.style.background = "#DFF4FF";
		previsualizar.style.borderColor = "#BBDFF2";
		previsualizar.style.color = "#336699";
	}

	function previsualizar3 (){
		var previsualizar = document.getElementById ("previsualizar");
		previsualizar.style.background = "#F5F5F5";
		previsualizar.style.borderColor = "#DEDEDE";
		previsualizar.style.color = "#565656";
	}

	function previsualizar4 (){
		var previsualizar = document.getElementById ("previsualizar");
		previsualizar.style.background = "#6299C5";
		previsualizar.style.borderColor = "#6299C5";
		previsualizar.style.color = "#FFF";
	}

	//Botón Guardar
	function guardar1 (){
		GM_setValue ("firma", document.getElementById ("miAreaTexto").value);
		window.location.reload ();
	}

	function guardar2 (){
		var guardar = document.getElementById ("guardar");
		guardar.style.background = "#E6EFC2";
		guardar.style.borderColor = "#C6D880";
		guardar.style.color = "#529214";
	}

	function guardar3 (){
		var guardar = document.getElementById ("guardar");
		guardar.style.background = "#F5F5F5";
		guardar.style.borderColor = "#DEDEDE";
		guardar.style.color = "#565656";
	}

	function guardar4 (){
		var guardar = document.getElementById ("guardar");
		guardar.style.background = "#529214";
		guardar.style.borderColor = "#529214";
		guardar.style.color = "#FFF";
	}

	//Botón Cerrar
	function cerrar1 (){
		opcionesTrans.style.visibility = "hidden";
		opcionesConfig.style.left = "-1000px";
		
		var capaColor = document.getElementById ("capaColor");
		capaColor.style.visibility = "hidden";
		colorAbierto = false;
		
		var capaTamaño = document.getElementById ("capaTamaño");
		capaTamaño.style.visibility = "hidden";
		tamañoAbierto = false;
	}

	function cerrar2 (){
		var cerrar = document.getElementById ("cerrar");
		cerrar.style.background = "#FBE3E4";
		cerrar.style.borderColor = "#FFD3D5";
		cerrar.style.color = "#D12F19";
	}

	function cerrar3 (){
		var cerrar = document.getElementById ("cerrar");
		cerrar.style.background = "#F5F5F5";
		cerrar.style.borderColor = "#DEDEDE";
		cerrar.style.color = "#565656";
	}

	function cerrar4 (){
		var cerrar = document.getElementById ("cerrar");
		cerrar.style.background = "#D12F19";
		cerrar.style.borderColor = "#D12F19";
		cerrar.style.color = "#FFF";
	}

	//Función para abrir el menú
	function abrir (){
		var areaTextoIni = document.getElementById ("miAreaTexto");
		areaTextoIni.value = firma;
		
		var capaHtmlIni = document.getElementById ("miCapaHtml");
		capaHtmlIni.innerHTML = "";
		
		var flechaColor = document.getElementById ("flechaColor");
		flechaColor.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		var flechaTamaño = document.getElementById ("flechaTamaño");
		flechaTamaño.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		
		var miCapaTrans = document.getElementById ("miCapaTrans");
		var miCapaConfig = document.getElementById ("miCapaConfig");
		miCapaTrans.style.visibility = "visible";
		miCapaConfig.style.left = "50%";
		
		iniciaEditor ();
	}

	//Editor - Botones
	function cambiaEstilo1 (escucha){
		function mouseOver (){
			escucha.style.background = "#E9F7FE";
			escucha.style.borderColor = "#D0EFFF";
		}

		function mouseOut (){
			escucha.style.background = "#F5F5F5";
			escucha.style.borderColor = "#DEDEDE";
		}

		function mouseDown (){
			escucha.style.background = "#B9D4E8";
			escucha.style.borderColor = "#B9D4E8";
		}

		escucha.addEventListener ("mouseover", mouseOver, false);
		escucha.addEventListener ("mouseout", mouseOut, false);
		escucha.addEventListener ("mousedown", mouseDown, false);
		escucha.addEventListener ("mouseup", mouseOver, false);
	}

	function cambiaEstilo2 (escucha){
		function mouseOver (){
			escucha.style.background = "#E9F7FE";
			escucha.style.borderColor = "#D0EFFF";
		}

		function mouseOut (){
			escucha.style.background = "#F5F5F5";
			escucha.style.borderColor = "#F5F5F5";
		}

		function mouseDown (){
			escucha.style.background = "#B9D4E8";
			escucha.style.borderColor = "#B9D4E8";
		}

		escucha.addEventListener ("mouseover", mouseOver, false);
		escucha.addEventListener ("mouseout", mouseOut, false);
		escucha.addEventListener ("mousedown", mouseDown, false);
		escucha.addEventListener ("mouseup", mouseOver, false);
	}

	function añadeEscucha1 (id, funcion){
		var escucha = document.getElementById (id);
		escucha.addEventListener ("click", funcion, false);
		cambiaEstilo1 (escucha);
	}

	function añadeEscucha2 (id, funcion){
		var escucha = document.getElementById (id);
		escucha.addEventListener ("click", funcion, false);
		cambiaEstilo2 (escucha);
	}

	function negrita (){
		cogeString (editor, '[b]' + leer () + '[/b]');
	}

	function cursiva (){
		cogeString (editor, '[i]' + leer () + '[/i]');
	}

	function subrayado (){
		cogeString (editor, '[u]' + leer () + '[/u]');
	}

	function tachado (){
		cogeString (editor, '[s]' + leer () + '[/s]');
	}

	function sobrerayado (){
		cogeString (editor, '[o]' + leer () + '[/o]');
	}

	function izq (){
		cogeString (editor, '[left]' + leer () + '[/left]');
	}

	function cen (){
		cogeString (editor, '[center]' + leer () + '[/center]');
	}

	function der (){
		cogeString (editor, '[right]' + leer () + '[/right]');
	}

	function imagen (){
		cogeString (editor, '[img]' + prompt ("Introduce la url de la imagen:", leer ()) + '[/img]');
	}

	function url (){
		var enlace = prompt("Introduce la url:", "http://");
		cogeString (editor, '[url=' + enlace + ']' + prompt ("Introduce texto del enlace:", leer ()) + '[/url]');
	}

	function citar (){
		cogeString (editor, '[quote]' + leer () + '[/quote]');
	}

	function code (){
		cogeString (editor, '[code]' + leer () + '[/code]');
	}

	function color (){
		var capaColor = document.getElementById ("capaColor");
		var flecha = document.getElementById ("flechaColor");
		
		if (tamañoAbierto){
			document.getElementById ("capaTamaño").style.visibility = "hidden";
			document.getElementById ("flechaTamaño").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
			tamañoAbierto = false;
		}
		
		if (!colorAbierto){
			capaColor.style.visibility = "visible";
			flecha.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDDkFmyVWv14kh1PBeoll31f/n/ytUw6rgtUSi76s+L/x/8z/Vd8KFbEomPt16f/1/1f+X/S/7X/qeSwK+v63/K/6X/g/83/S/5hvQywkAdMGCdCoabZeAAAAAElFTkSuQmCC";
			colorAbierto = true;
		}else{
			capaColor.style.visibility = "hidden";
			flecha.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
			colorAbierto = false;
		}
	}

	function color1 (){
		var capaColor = document.getElementById ("capaColor");
		cogeString (editor, '[color=darkred]' + leer () + '[/color]');
		capaColor.style.visibility = "hidden";
		document.getElementById ("flechaColor").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		colorAbierto = false;
	}

	function color2 (){
		var capaColor = document.getElementById ("capaColor");
		cogeString (editor, '[color=red]' + leer () + '[/color]');
		capaColor.style.visibility = "hidden";
		document.getElementById ("flechaColor").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		colorAbierto = false;
	}

	function color3 (){
		var capaColor = document.getElementById ("capaColor");
		cogeString (editor, '[color=orange]' + leer () + '[/color]');
		capaColor.style.visibility = "hidden";
		document.getElementById ("flechaColor").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		colorAbierto = false;
	}

	function color4 (){
		var capaColor = document.getElementById ("capaColor");
		cogeString (editor, '[color=brown]' + leer () + '[/color]');
		capaColor.style.visibility = "hidden";
		document.getElementById ("flechaColor").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		colorAbierto = false;
	}

	function color5 (){
		var capaColor = document.getElementById ("capaColor");
		cogeString (editor, '[color=yellow]' + leer () + '[/color]');
		capaColor.style.visibility = "hidden";
		document.getElementById ("flechaColor").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		colorAbierto = false;
	}

	function color6 (){
		var capaColor = document.getElementById ("capaColor");
		cogeString (editor, '[color=green]' + leer () + '[/color]');
		capaColor.style.visibility = "hidden";
		document.getElementById ("flechaColor").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		colorAbierto = false;
	}

	function color7 (){
		var capaColor = document.getElementById ("capaColor");
		cogeString (editor, '[color=olive]' + leer () + '[/color]');
		capaColor.style.visibility = "hidden";
		document.getElementById ("flechaColor").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		colorAbierto = false;
	}

	function color8 (){
		var capaColor = document.getElementById ("capaColor");
		cogeString (editor, '[color=cyan]' + leer () + '[/color]');
		capaColor.style.visibility = "hidden";
		document.getElementById ("flechaColor").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		colorAbierto = false;
	}

	function color9 (){
		var capaColor = document.getElementById ("capaColor");
		cogeString (editor, '[color=blue]' + leer () + '[/color]');
		capaColor.style.visibility = "hidden";
		document.getElementById ("flechaColor").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		colorAbierto = false;
	}

	function color10 (){
		var capaColor = document.getElementById ("capaColor");
		cogeString (editor, '[color=darkblue]' + leer () + '[/color]');
		capaColor.style.visibility = "hidden";
		document.getElementById ("flechaColor").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		colorAbierto = false;
	}

	function color11 (){
		var capaColor = document.getElementById ("capaColor");
		cogeString (editor, '[color=indigo]' + leer () + '[/color]');
		capaColor.style.visibility = "hidden";
		document.getElementById ("flechaColor").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		colorAbierto = false;
	}

	function color12 (){
		var capaColor = document.getElementById ("capaColor");
		cogeString (editor, '[color=violet]' + leer () + '[/color]');
		capaColor.style.visibility = "hidden";
		document.getElementById ("flechaColor").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		colorAbierto = false;
	}

	function color13 (){
		var capaColor = document.getElementById ("capaColor");
		cogeString (editor, '[color=white]' + leer () + '[/color]');
		capaColor.style.visibility = "hidden";
		document.getElementById ("flechaColor").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		colorAbierto = false;
	}

	function tamaño (){
		var capaTamaño = document.getElementById ("capaTamaño");
		var flecha = document.getElementById ("flechaTamaño");
		
		if (colorAbierto){
			document.getElementById ("capaColor").style.visibility = "hidden";
			document.getElementById ("flechaColor").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
			colorAbierto = false;
		}
		
		if (!tamañoAbierto){
			capaTamaño.style.visibility = "visible";
			flecha.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDDkFmyVWv14kh1PBeoll31f/n/ytUw6rgtUSi76s+L/x/8z/Vd8KFbEomPt16f/1/1f+X/S/7X/qeSwK+v63/K/6X/g/83/S/5hvQywkAdMGCdCoabZeAAAAAElFTkSuQmCC";
			tamañoAbierto = true;
		}else{
			capaTamaño.style.visibility = "hidden";
			flecha.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
			tamañoAbierto = false;
		}
	}

	function tamaño1 (){
		var capaTamaño = document.getElementById ("capaTamaño");
		cogeString (editor, '[size=10]' + leer () + '[/size]');
		capaTamaño.style.visibility = "hidden";
		document.getElementById ("flechaTamaño").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		tamañoAbierto = false;
	}

	function tamaño2 (){
		var capaTamaño = document.getElementById ("capaTamaño");
		cogeString (editor, '[size=12]' + leer () + '[/size]');
		capaTamaño.style.visibility = "hidden";
		document.getElementById ("flechaTamaño").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		tamañoAbierto = false;
	}

	function tamaño3 (){
		var capaTamaño = document.getElementById ("capaTamaño");
		cogeString (editor, '[size=16]' + leer () + '[/size]');
		capaTamaño.style.visibility = "hidden";
		document.getElementById ("flechaTamaño").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		tamañoAbierto = false;
	}

	function tamaño4 (){
		var capaTamaño = document.getElementById ("capaTamaño");
		cogeString (editor, '[size=18]' + leer () + '[/size]');
		capaTamaño.style.visibility = "hidden";
		document.getElementById ("flechaTamaño").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		tamañoAbierto = false;
	}

	function tamaño5 (){
		var capaTamaño = document.getElementById ("capaTamaño");
		cogeString (editor, '[size=20]' + leer () + '[/size]');
		capaTamaño.style.visibility = "hidden";
		document.getElementById ("flechaTamaño").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC";
		tamañoAbierto = false;
	}

	//Añade la firma en Firefox
	function añadeFirmaFirefox (){
		var area = document.getElementsByTagName ("textarea");
		area[0].value += "\n\n" + GM_getValue ("firma");
	}
	
	if (location.pathname.search ("profile.php") && location.search.search ("editprofile") != -1){
		var firma = GM_getValue ("firma", "[img]http://image.gxzone.com/images/f/7/f7f5819fc19.png[/img]");
	
		//Menú Meristation AutoFirma
		var opcionesTrans = document.createElement ("div");
		opcionesTrans.setAttribute ("id", "miCapaTrans");
		opcionesTrans.style.width = "100%";
		opcionesTrans.style.height = "100%";
		opcionesTrans.style.position = "fixed";
		opcionesTrans.style.left = "0";
		opcionesTrans.style.top = "0";
		opcionesTrans.style.backgroundColor = "#000";
		opcionesTrans.style.opacity = "0.2";
		opcionesTrans.style.visibility = "hidden";
		
		addGlobalStyle (".botonColor { padding: 2px; border: 1px solid #F5F5F5; }");
		addGlobalStyle (".botonTamaño { border: 1px solid #F5F5F5; }");
		
		var opcionesConfig = document.createElement ("div");
		opcionesConfig.setAttribute ("id", "miCapaConfig");
		opcionesConfig.style.width = "950px";
		opcionesConfig.style.height = "420px";
		opcionesConfig.style.position = "fixed";
		opcionesConfig.style.left = "-1000px";
		opcionesConfig.style.top = "50%";
		opcionesConfig.style.marginLeft = "-475px";
		opcionesConfig.style.marginTop = "-200px";
		opcionesConfig.innerHTML = "<div style='width: 100%; height: 100%; position: absolute; top: 0; left: 0; background-color: #FEF7E2; border: solid thin #8E8E8E; font-family: Calibri; font-size: 14px; -moz-border-radius: 15px;'>" +
										"<div style='width: 230px; height: 27px; position: absolute; left: 30px; top: -34px; background: #EDEDED; color: #272727; cursor: default; border-left: solid 2px #BABABA; border-top: solid 2px #BABABA; border-right: solid 2px #BABABA; padding-top: 4px; text-align: center; font-family: Calibri; font-size: 18px; font-weight: bold; -moz-border-radius-topleft: 8px; -moz-border-radius-topright: 8px;'>Meristation AutoFirma</div>" +
										"<span style='position: absolute; left: 13px; top: 5px;  color: #272727; cursor: default; font-size: 15px; font-weight: bold;'>Vista previa:</span>" +
										"<div id='miCapaHtml' style='width: 911px; height: 185px; position: absolute; top: 25px; left: 13px; background: #FFF; border: solid thin #B0B0B0; padding: 5px; font-family: Verdana; font-size: 12px; line-height: 15px; overflow: auto;' ></div>" +
										"<div style='width: 100%; position: absolute; top: 226px; font-family: Calibri; font-size: 14px; cursor: default;'>" +
											"<center><div style='width: 434px; height: 29px;  padding: 5px; background-color: #FFF; border: solid thin #D8D8D8; -moz-border-radius: 5px;'>" +
												"<ul style='list-style: none; margin: 0; padding: 0;'>" +
													"<li><a id='negrita' style='margin-right: 5px; font-family: Calibri; font-size: 14px; float: left; padding: 5px; text-decoration: none; border: solid 1px #dedede; background-color: #f5f5f5; color: #565656;' title='Negrita'><b>B</b></a></li>" +
													"<li><a id='cursiva' style='margin-right: 5px; font-family: Calibri; font-size: 14px; float: left; padding: 5px; text-decoration: none; border: solid 1px #dedede; background-color: #f5f5f5; color: #565656;' title='Cursiva'><i>I</i></a></li>" +
													"<li><a id='subrayado' style='margin-right: 5px; font-family: Calibri; font-size: 14px; float: left; padding: 5px; text-decoration: none; border: solid 1px #dedede; background-color: #f5f5f5; color: #565656;' title='Subrayado'><u>U</u></a></li>" +
													"<li><a id='tachado' style='margin-right: 5px; font-family: Calibri; font-size: 14px; float: left; padding: 5px; text-decoration: none; border: solid 1px #dedede; background-color: #f5f5f5; color: #565656; text-decoration: line-through;' title='Tachado'>S</a></li>" +
													"<li><a id='sobrerayado' style='margin-right: 5px; font-family: Calibri; font-size: 14px; float: left; padding: 5px; text-decoration: none; border: solid 1px #dedede; background-color: #f5f5f5; color: #565656; text-decoration: overline;' title='Sobrerayado'>O</a></li>" +
													"<li><a id='izq' style='height: 15px; margin-right: 5px; float: left; padding: 7px 5px 5px 5px; text-decoration: none; border: solid 1px #dedede; background-color: #f5f5f5; color: #565656;' title='Alinear a la izquierda'><img style='position: relative; top: 1px;' src='data:image/png;base64,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'/></a></li>" +
													"<li><a id='cen' style='height: 15px; margin-right: 5px; float: left; padding: 7px 5px 5px 5px; text-decoration: none; border: solid 1px #dedede; background-color: #f5f5f5; color: #565656;' title='Centrar'><img style='position: relative; top: 1px;' src='data:image/png;base64,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'/></a></li>" +
													"<li><a id='der' style='height: 15px; margin-right: 5px; float: left; padding: 7px 5px 5px 5px; text-decoration: none; border: solid 1px #dedede; background-color: #f5f5f5; color: #565656;' title='Alinear a la derecha'><img style='position: relative; top: 1px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAADNJREFUeNpiDAsL+89ABmBhYGBgJFcjOiDKBYz//6OqCw8PJ8pGxlE/DiY/AgAAAP//AwAVwRElrrNLIAAAAABJRU5ErkJggg=='/></a></li>" +
													"<li><a id='imagen' style='height: 17px; margin-right: 5px; float: left; padding: 2px 5px 8px 5px; text-decoration: none; border: solid 1px #dedede; background-color: #f5f5f5; color: #565656;' title='Insertar imagen'><img style='position: relative; top: 4px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAInSURBVDjLhZPda9NQHIbzVwlWryzthpWuIpWOieKYZXO2q1vC0KFr9aZM3Yr40QunspU2TVYmYhVRvNErwQtR3E0JTq3G2o80mc0Ql9dzTr/SYdnFA8k5yft78nLCjcxJNwKzsuoOiZoj2GKsi3NS1I7y4hIA7n9wgQvyz4KiWLphwNgyoRMq+jZ+MUyo1ToOR6Ra3wA6ua4b8F/2gL830WF8YRGB2VX4hBwOBEWrnxl3kGzQyXzyLJbfLuL+uwQevr+Jk7EsiBn2MmMBdbJ58UEEKx9vYfVDE89MBtTsTVjA53iiy/XbeD4XRaluwhWSNRZQIYmeay6cSsYxfCmFwfMpEGW4wjk4gxm4J7IECd6IhOW7z/AlkYRaawXQbyuTtCOJAQzPp/bU9gtrLOBHrUECJI3bP5bWypoJx7l9cE+tMO0TsTuIpl90uCq+xJnoEtP2hUV8Cp7G90orwMECGthQd5gynRxLPUWuoOOR8huPN//gyde/iMuvmLZvKgtlfBTFdsBgSNwslavQiOIACaCF0ofzRQv5bzsd6BrV9obSyI8EUCw34JwkAcd4aWFoWn5N00ihFi30+HwaM5LCmM4UGH5SLtX28uvMtlg2mwH2U9UuNHBlDUKu2ANdo9pDwjqqpNQSOwdyrSegXeih0Rh7wQ5da2lbdDI5RBqxT/Qa2ArdUK1ddLV7/gX7jb1QzdhGjVAl10262n0D7IXSSbtpa9vf+QeB6/JTIb6VuwAAAABJRU5ErkJggg=='/></a></li>" +
													"<li><a id='url' style='height: 17px; margin-right: 5px; float: left; padding: 2px 5px 8px 5px; text-decoration: none; border: solid 1px #dedede; background-color: #f5f5f5; color: #565656;' title='Insertar URL'><img style='position: relative; top: 4px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADpSURBVCjPY/jPgB8y0EmBHXdWaeu7ef9rHuaY50jU3J33v/VdVqkdN1SBEZtP18T/L/7f/X/wf+O96kM3f9z9f+T/xP8+XUZsYAWGfsUfrr6L2Ob9J/X/pP+V/1P/e/+J2LbiYfEHQz+ICV1N3yen+3PZf977/9z/Q//X/rf/7M81Ob3pu1EXWIFuZvr7aSVBOx1/uf0PBEK3/46/gnZOK0l/r5sJVqCp6Xu99/2qt+v+T/9f+L8CSK77v+pt73vf65qaYAVqzPYGXvdTvmR/z/4ZHhfunP0p+3vKF6/79gZqzPQLSYoUAABKPQ+kpVV/igAAAABJRU5ErkJggg=='/></a></li>" +
													"<li><a id='citar' style='height: 17px; margin-right: 5px; float: left; padding: 2px 5px 8px 5px; text-decoration: none; border: solid 1px #dedede; background-color: #f5f5f5; color: #565656;' title='Insertar cita'><img style='position: relative; top: 3px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQpJREFUeNpi/P//PwMlgJGqBuw8eJIo09ztzRkxDABplhIXZVBTksWr+da9xwzPXr6GGwI2AKRZUkyEQVlBhuHX798Mf//+w6qZmZmJgY2VleHugycMz1+9ARvCApNUlJVk+Pb9B8OfP39x2g40GywPUgsyAATgBvz994/h+4+fBP3/+88fBlYWZjgfbsCvX7+BNvxm+Amk8QF2NlawWhhggjEeP3/FwMvNBVaATzNIDUgt1lgQERJgkJUUA/M/f/0GpkEakAFI85t3H1BjAT0dIBsE04ArHTCADEDHOw6c+H/m0o3/L1+/+w9iY1MDwziTMsxLIIDsZHTAhC+5gjSiO5+2mYkcABBgAEZBuo6CD9W9AAAAAElFTkSuQmCC'/></a></li>" +
													"<li><a id='code' style='height: 17px; margin-right: 5px; float: left; padding: 2px 5px 8px 5px; text-decoration: none; border: solid 1px #dedede; background-color: #f5f5f5; color: #565656;' title='Insertar código'><img style='position: relative; top: 3px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGNSURBVDjLpVM9SwNBEJ297J1FQBtzjQj2dgppYiP4A1KZRoiFrYWt9rHyH6QUPBDTCimtLNSAnSB26YKg4EdMdsd5611cjwsIWRhmZ3f2zZuPVcxMsyx9fPF0NRfS2vM7lx2WtcQiJHvDRvZMluXMGNHstJH7+Wj09jHkOy1+tc3VxeC+P6TXT1sYZX2hT7cvS6lepv3zHUp2T8vXNw81dXT2yGwEGeERSbSVCC5qysYa+3vm9sJGmLFojceXJ9uklCqUIAic5G3IytahAAhqqVSiwWDwx6nogW9XKhWphaGAvC50Oh1qtVr/7oAdCwBQwjB00mg0qFqtUr1ed3YURZM7X7TWTqM2Gm3CASRJEur1etTtdp1DnrafFtJGMbVNGSBas9l0DrAzR6x8DdwASUB0RqNNGS2/gH7EInvCwMhkZTnlnX0GsP09tJER0BgMoAEAa1rETDIQvBkjBZeHMIjjuNB5Ggg0/oZWPGrHGwd7Fp9F2CAlgHKqf0aYXb6Y2mzE8d/IfrXVrN/5G81p6oa2mIEUAAAAAElFTkSuQmCC'/></a></li>" +
													"<li><a id='color' style='height: 17px; margin-right: 5px; float: left; padding: 2px 2px 8px 5px; text-decoration: none; border: solid 1px #dedede; background-color: #f5f5f5; color: #565656;' title='Color'><img style='position: relative; top: 3px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABjSURBVDjLY/j//z8DJZiBagb8y8/+D8NgsVXF/+EYyP9wNf0/DA9SAygOgwuvN/2HYRA/4EzufxgG8RM2vP4Pw4PUAIrDIKJqw38YBvFvzr77H4bBaso3/ofjwWnAwGcmcjEAc0v+JGPFQvwAAAAASUVORK5CYII='/><img id='flechaColor' src=''/></a></li>" +
													"<li><a id='tamaño' style='height: 17px; float: left; padding: 2px 2px 8px 5px; text-decoration: none; border: solid 1px #dedede; background-color: #f5f5f5; color: #565656;' title='Tamaño'><img style='position: relative; top: 3px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK/SURBVDjLY/j//z8DJRiFozbrLk/aqkc76/a8eDft2Ou/Ew69+lm/8/n7pMUPTsuXXlAgaAAIK/fe9Kg7/ubmsaff/h99/O2/48y7q+Tyz2vKZJ5hJGiAUucNRv0JNycuuvLho/WU24tytz67aNl5fZFM8mlhoryg0HAlcePNz7+06670y2aftaja8fy224SbW6SzL1lrNt+aY95776BJ593dJq13dpu13jqoWXptGUJz1WXVkp0vrs48/e6NTNoZM+n4kzpTDr5+7T/l9gHpzAvOyhU3J/vMe/w5e+OL/5lrXvzXKb2xTjz2QhncAKOWqzM3X//0Z97Jdx8mHHj1YsbB128P3Pz0P3bW3TNiXgfk9BturQ+Y9+ifU+/du4nLnvyXiD7fLBZ+lo0BGEAswACKXXLm3We/aXf2SoYejZQIPBws7ncwb+qeF29TZt+9LJlwNiNmydP/tm13LwNtdY+Y+/i/TNT5XnAYAANIL3vN40uTDrx6JRF0xBDmIlHPvepJM+5czJh174Hb5Pvv3SbceykWdd4aaGtQ5MyH/1UTLywDG9Cx8/n3aQdf/W/e+uxL8ozb20CCIu57jIN7bpxcdujN/+hJ9/4nLnnyXyzibC1YLuS0d/jU+/+1ky9swZoOkDHQuTHR8x//T1705H/MnIf/ffvu/Q+ffO9/ytyH/7XiLmwR9DoijFtz9Hkz6/qbl716736Tizo/XSTgZIGw34kc9ajz65JnPvivF3/+oIDbYQ2cBmhmX1qTMO/Rf7Hgk83C/ie4YOKCnkeCXSpvfNCLPn+A3+WgEoZGYCAZi4aeKXZvu/PBo+3OV6CtwUI+x1nBmj2OKAJtbXCrvPbVNufSYz6nA/EYBrh33v3k23f3v2/Pnf8+HXf+G6VdPAa0lRMkZ5Zy8aJXzY1/QPzfq/rGf/fyaz8ZKM3OABiskbcwY1E6AAAAAElFTkSuQmCC'/><img id='flechaTamaño' src=''/></a></li>" +
												"</ul>" +
											"</center></div>" +
										"</center>" +
										"<div style='width: 100%; position: absolute; top: 270px;'>" +
											"<span style='position: absolute; left: 90px; color: #272727; cursor: default; font-size: 15px; font-weight: bold;'>BBCode:</span>" +
											"<center><textarea  id='miAreaTexto' style='padding: 5px; font-size: 12px; line-height: 15px;' rows='6' cols='100'></textarea></center>" +
										"</div>" +
										"<div style='width: 110px; height: 120px; position: absolute; top: 271px; left: 813px;'>" +
											"<a id='previsualizar' style='position: absolute; width: 110px; padding: 5px; text-decoration: none; border: 1px solid #dedede; background-color: #f5f5f5; color: #565656; cursor: pointer; font-weight: bold;' title='Vista previa de la firma'><img style='padding: 0; margin: 0 3px -3px 8px;' src='data:image/png;base64,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'/> Vista previa<a/>" +
											"<a id='guardar' style='position: absolute; top: 45px; width: 110px; padding: 5px; text-decoration: none; border: 1px solid #dedede; background-color: #f5f5f5; color: #565656; cursor: pointer; font-weight: bold;' title='Guarda la firma'><img style='padding: 0; margin: 0 3px -3px 18px;' src='data:image/png;base64,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'/> Guardar<a/>" +
											"<a id='cerrar' style='position: absolute; top: 90px; width: 110px; padding: 5px; text-decoration: none; border: 1px solid #dedede; background-color: #f5f5f5; color: #565656; cursor: pointer; font-weight: bold;' title='Cancela la edición de la firma y cierra la ventana'><img style='padding: 0; margin: 0 3px -3px 23px;' src='data:image/png;base64,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'/> Cerrar</>" +
										"</div>" +
										"<div id='capaColor' style='position: absolute; top: 261px; left: 604px; padding: 2px; border: 1px solid #dedede; background-color: #f5f5f5; color: #565656; visibility: hidden; z-index: 103;'>" +
											"<table>" +
												"<tr>" +
													"<td id='color1' class='botonColor'><img src='data:image/png;base64,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'/></td>" +
													"<td id='color2' class='botonColor'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAADBJREFUeNpi3LNjJQMhwMLAwODsEY5Hxd4dK5kYiACjiohTxAIJU/yKAAAAAP//AwB68QdXTXzDGgAAAABJRU5ErkJggg=='/></td>" +
													"<td id='color3' class='botonColor'><img src='data:image/png;base64,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'/></td>" +
													"<td id='color4' class='botonColor'><img src='data:image/png;base64,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'/></td>" +
													"<td id='color5' class='botonColor'><img src='data:image/png;base64,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'/></td>" +
												"</tr>" +
												"<tr>" +
													"<td id='color6' class='botonColor'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAADBJREFUeNpi3LNjJQMhwMLAwOByIhyPij0WK5kYiACjiohTxAIJU/yKAAAAAP//AwB57gbWDaqD6AAAAABJRU5ErkJggg=='/></td>" +
													"<td id='color7' class='botonColor'><img src='data:image/png;base64,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'/></td>" +
													"<td id='color8' class='botonColor'><img src='data:image/png;base64,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'/></td>" +
													"<td id='color9' class='botonColor'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAADBJREFUeNpi3LNjJQMhwMLAwODiEYZHxZ4dq5gYiACjiohTxAIJU/yKAAAAAP//AwB67wdXkyTYWgAAAABJRU5ErkJggg=='/></td>" +
													"<td id='color10' class='botonColor'><img src='data:image/png;base64,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'/></td>" +
												"</tr>" +
												"<tr>" +
													"<td id='color11' class='botonColor'><img src='data:image/png;base64,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'/></td>" +
													"<td id='color12' class='botonColor'><img src='data:image/png;base64,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'/></td>" +
													"<td id='color13' class='botonColor'><img src='data:image/png;base64,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'/></td>" +
												"</tr>" +
											"</table>" +
										"</div>" +
										"<div id='capaTamaño' style='position: absolute; top: 261px; left: 650px; padding: 2px; border: 1px solid #dedede; background-color: #f5f5f5; color: #565656; visibility: hidden; z-index: 103; cursor: default;'>" +
											"<table>" +
												"<tr><td id='tamaño1' class='botonTamaño'><span style='font-size: 10px'>texto</span></td></tr>" +
												"<tr><td id='tamaño2' class='botonTamaño'><span style='font-size: 12px'>texto</span></td></tr>" +
												"<tr><td id='tamaño3' class='botonTamaño'><span style='font-size: 16px'>texto</span></td></tr>" +
												"<tr><td id='tamaño4' class='botonTamaño'><span style='font-size: 18px'>texto</span></td></tr>" +
												"<tr><td id='tamaño5' class='botonTamaño'><span style='font-size: 20px'>texto</span></td></tr>" +
											"</table>" +
										"</div>" +
									"</div>";

		var capa = document.getElementsByTagName ("body")[0];
		capa.appendChild (opcionesTrans);
		capa.appendChild (opcionesConfig);
		
		//Inicializo a false el estado de las capas del tamaño y color
		var tamañoAbierto = false;
		var colorAbierto = false;

		//Agrego eventos de escucha a cada botón
		//Vista previa, Guardar y Cerrar
		var escucha = document.getElementById ("previsualizar");
		escucha.addEventListener ("click", previsualizar1, false);
		escucha.addEventListener ("mouseover", previsualizar2, false);
		escucha.addEventListener ("mouseout", previsualizar3, false);
		escucha.addEventListener ("mousedown", previsualizar4, false);
		escucha.addEventListener ("mouseup", previsualizar2, false);
		
		escucha = document.getElementById ("guardar");
		escucha.addEventListener ("click", guardar1, false);
		escucha.addEventListener ("mouseover", guardar2, false);
		escucha.addEventListener ("mouseout", guardar3, false);
		escucha.addEventListener ("mousedown", guardar4, false);
		escucha.addEventListener ("mouseup", guardar2, false);
		
		escucha = document.getElementById ("cerrar");
		escucha.addEventListener ("click", cerrar1, false);
		escucha.addEventListener ("mouseover", cerrar2, false);
		escucha.addEventListener ("mouseout", cerrar3, false);
		escucha.addEventListener ("mousedown", cerrar4, false);
		
		//Editor
		añadeEscucha1 ("negrita", negrita);
		añadeEscucha1 ("cursiva", cursiva);
		añadeEscucha1 ("subrayado", subrayado);
		añadeEscucha1 ("tachado", tachado);
		añadeEscucha1 ("sobrerayado", sobrerayado);
		añadeEscucha1 ("izq", izq);
		añadeEscucha1 ("cen", cen);
		añadeEscucha1 ("der", der);
		añadeEscucha1 ("imagen", imagen);
		añadeEscucha1 ("url", url);
		añadeEscucha1 ("citar", citar);
		añadeEscucha1 ("code", code);
		añadeEscucha1 ("color", color);
		añadeEscucha1 ("tamaño", tamaño);
		
		añadeEscucha2 ("color1", color1);
		añadeEscucha2 ("color2", color2);
		añadeEscucha2 ("color3", color3);
		añadeEscucha2 ("color4", color4);
		añadeEscucha2 ("color5", color5);
		añadeEscucha2 ("color6", color6);
		añadeEscucha2 ("color7", color7);
		añadeEscucha2 ("color8", color8);
		añadeEscucha2 ("color9", color9);
		añadeEscucha2 ("color10", color10);
		añadeEscucha2 ("color11", color11);
		añadeEscucha2 ("color12", color12);
		añadeEscucha2 ("color13", color13);
		añadeEscucha2 ("tamaño1", tamaño1);
		añadeEscucha2 ("tamaño2", tamaño2);
		añadeEscucha2 ("tamaño3", tamaño3);
		añadeEscucha2 ("tamaño4", tamaño4);
		añadeEscucha2 ("tamaño5", tamaño5);
		
		var areaTexto = document.getElementById ("miAreaTexto");
		//Añado evento focus al textarea
		areaTexto.addEventListener ("focus", iniciaEditor, false);
		
		//Inserto la firma guardada en el área de texto del menú de opciones
		areaTexto.value = firma;
		
		//Botón Meristation AutoFirma
		var boton = document.createElement ("span");
		boton.setAttribute ("class", "genmed");
		boton.setAttribute ("id", "boton");
		boton.style.cursor = "pointer";
		boton.style.position = "relative";
		boton.style.left = "20px";
		boton.innerHTML = "<span class='fecha'>|</span>  <img style='position: relative; top: 4px;' alt='Menú Meristation AutoFirma' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGSSURBVCjPVVFNSwJhEF78Ad79Cf6PvXQRsotUlzKICosuRYmR2RJR0KE6lBFFZVEbpFBSqKu2rum6llFS9HHI4iUhT153n6ZtIWMOM+/MM88z7wwH7s9Ub16SJcnbmrNcxVm2q7Z8/QPvEOtntpj92NkCqITLepEpjix7xQtiLOoQ2b6+E7YAN/5nfOEJ2WbKqOIOJ4bYVMEQx4LfBBQDsvFMhUcCVU1/CxVXmDBGA5ZETrhDCQVcYAPbyEJBhvrnBVPiSpNr6cYDNCQwo4zzU/ySckkgDYuNuVpI42T9k4gLKGMPs/xPzzovQiY2hQYe0jlJfyNNhTqiWDYBq/wBMcSRpnyPzu1oS7WtxjVBSthU1vgVksiQ3Dn6Gp5ah2YOKQo5GiuHPA6xT1EKpxQNCNYejgIR457KKio0S56YckjSa9jo//3mrj+BV0QQagqGTOo+Y7gZIf1puP3WHoLhEb2PjTlCTCWGXtbp8DCX3hZuOdaIc9A+aQvWk4ihq95p67a7nP+u+Ws+r0dql9z/zv0NCYhdCPKZ7oYAAAAASUVORK5CYII='/>  <span class='mstop10_9'>Meristation AutoFirma</span>";
		
		var nuevoBoton = document.getElementsByClassName ("profile_form_row2")[0];
		nuevoBoton.style.paddingTop = 0;
		nuevoBoton.appendChild (boton);
		
		//Evento de escucha
		var escucha36 = document.getElementById ("boton");
		escucha36.addEventListener ("click", abrir, false);
	}
	
	//Añado la firma en el mensaje
	var input = document.getElementsByTagName ("input");
	var j, k;
	var cerrado = true;
	for (var i=0; i<input.length; i++){
		if (input[i].src.search ("quick_reply") != -1){
			j = i;
			cerrado = false;
		}
		if (input[i].src.search ("enviar") != -1){
			k = i;
		}
	}
	
	//Respuesta rápida
	if (location.pathname.search ("viewtopic.php") != -1 && !cerrado){
		input[j].addEventListener ("click", añadeFirmaFirefox, false);
	}

	var spam = document.getElementsByTagName ("div")[5].className;
	
	//Respuesta, cita, nuevo tema, mensaje privado, vista previa y spam
	if (location.href.search ("reply") != -1 || location.href.search ("quote") != -1 || location.href.search ("newtopic") != -1 || location.href.search ("privmsg") != -1 || location.href == "http://zonaforo.meristation.com/foros/posting.php" && spam != "profile_form_block_title"){
		input[k].addEventListener ("click", añadeFirmaFirefox, false);
	}
	*/
}

function meristationBlock (){
	if (location.pathname.search ("profile.php") && location.search.search ("editprofile") != -1){
		function añadeUsuario (){
			var usuario = document.getElementById ("inputUsuario").value;
			var select = document.getElementById ("listaUsuarios");
			var usuarios = GM_getValue ("usuarios");
			
			if (usuario == "") return; 
			
			if (!usuarios){
				GM_setValue ("usuarios", usuario);
				select.options[0] = new Option (usuario, usuario);
			}else{
				//Compruebo si el usuario ya se encuentra en la lista
				usuarios = usuarios.split ("#");
				var ok = true;
				
				var i = 0; 
				var stop = false;
				while (i<usuarios.length && !stop){
					if (usuarios[i] == usuario){
						ok = false;
					}
					
					i++;
				}
				
				if (ok){
					GM_setValue ("usuarios", GM_getValue ("usuarios") + "#" + usuario);
					select.options[select.options.length] = new Option (usuario, usuario);
				}
			}
		}
		
		function eliminaUsuario (){
			var lista = document.getElementById ("listaUsuarios");
			if (lista.options.length == 1){
				lista.options[0] = new Option ("-", "-");
				
				GM_deleteValue ("usuarios");
			}else if (lista.options.length > 1){
				var usuario = lista.options[lista.selectedIndex].value;
				lista.remove (lista.selectedIndex);
				
				var usuarios = GM_getValue ("usuarios").split ("#");
				var nuevosUsuarios = [];
				var j = 0;
				for (var i=0; i<usuarios.length; i++){
					if (usuario != usuarios[i]){
						nuevosUsuarios[j] = usuarios[i];
						j++;
					}
				}
				
				GM_setValue ("usuarios", nuevosUsuarios.join ("#"));
			}
		}
	
		//Creo el contenido del panel
		var panel = document.getElementsByClassName ("profile_form_content")[0].childNodes[1].childNodes[1].childNodes[14].cloneNode (true);
		panel.style.height = "60px";
		panel.childNodes[1].innerHTML = "<span class='gen'>Bloquear usuarios:</span>";
		panel.childNodes[3].innerHTML =	"<div style='position: relative; left: 280px; top: 10px; height: 50px; width: 1px; border-right: solid thin #000;'></div>" +
										"<span style='position: relative; bottom: 45px; color: #000;'>Usuario:</span>" +
										"<input id='inputUsuario' class='post' style='width: 150px; position: relative; bottom: 45px; left: 20px;' type='text'/>" +
										"<input type='button' value='Añadir' id='botonAñadirUsuario' style='position: relative; right: 41px; bottom: 10px;'/>" +
										"<select style='position: relative; left: 70px; bottom: 45px;' id='listaUsuarios'></select>" +
										"<input type='button' value='Eliminar' id='botonEliminarUsuario' style='position: relative; left: 110px; bottom: 45px;'/>";
		
		document.getElementsByClassName ("profile_form_content")[0].childNodes[1].childNodes[1].appendChild (panel);
		
		//Lleno la lista de usuarios
		var select = document.getElementById ("listaUsuarios");
		var usuarios = GM_getValue ("usuarios");
		
		if (!usuarios){
			select.add (new Option ("-", "-"), null);
		}else{
			usuarios = usuarios.split ("#");
			for (var i=0; i<usuarios.length; i++){
				select.add (new Option (usuarios[i], usuarios[i]), null);
			}
		}
		
		//Añado listener al botón para añadir usuarios
		document.getElementById ("botonAñadirUsuario").addEventListener ("click", añadeUsuario, false);
		
		//Añado listener al botón para eliminar usuarios
		document.getElementById ("botonEliminarUsuario").addEventListener ("click", eliminaUsuario, false);
	}else if (location.href.search ("viewforum.php") != -1){
		//Consulto los usuarios bloqueados
		var usuarios = GM_getValue ("usuarios");
		
		if (usuarios){
			usuarios = usuarios.split ("#");
			
			var td = document.getElementsByClassName ("celda2");
			for (var i=0; i<td.length; i++){
				var nombre = td[i].childNodes[3].childNodes[4].textContent;
				var j = 0;
				var stop = false;
				while (j<usuarios.length && !stop){
					if (nombre == usuarios[j]){
						eliminaNodo (td[i].parentNode);
						stop = true;
					}
					
					j++;
				}
			}
		}
	}else if (location.href.search ("viewtopic.php") != -1){
		var usuarios = GM_getValue ("usuarios");
		
		if (usuarios){
			usuarios = usuarios.split ("#");

			var genmed = document.getElementsByClassName ("genmed");
			for (var i=0; i<genmed.length; i++){
				if (genmed[i].tagName == "SPAN"){
					//Elimino citas
					if (genmed[i].textContent.search ("escribió") != -1){
						var nombre = genmed[i].textContent.replace (" escribió:", "");
						
						var j = 0;
						var stop = false;
						while (j<usuarios.length && !stop){
							var usuario = usuarios[j];
							var usuario2 = usuario.replace (" ", "_");
							if (nombre == usuario || nombre == usuario2){
								var tmp = genmed[i].parentNode.parentNode.parentNode.parentNode.parentNode;
								eliminaNodo (tmp.nextSibling.childNodes[1]);
								eliminaNodo (tmp.nextSibling.childNodes[2]);
								eliminaNodo (tmp);
								stop = true;
							}
							
							j++;
						}
					}
				}else if (genmed[i].tagName == "DIV" && genmed[i].childNodes.length != 3){
					//Elimino usuarios
					var nombre = genmed[i].childNodes[1].childNodes[1].textContent;
					
					var j = 0;
					var stop = false;
					while (j<usuarios.length && !stop){
						if (nombre == usuarios[j]){
							eliminaNodo (genmed[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
							i--;
							stop = true;
						}
						
						j++;
					}
				}
			}
		}
	}
}

function meristation80 (){
	//Temporal, elimino aviso firmas automaticas
	var aviso = document.getElementsByClassName ("tabla_opciones_zonaforo");
	if (aviso.length == 2){
		eliminaNodo (aviso[1]);
	}
	
	//Inicializo ancho
	if (GM_getValue ("ancho") == undefined){
		GM_setValue ("ancho", "80%");
	}

	var ancho = GM_getValue ("ancho");

	addGlobalStyle (".tabla_fecha { width: " + ancho + "; }");
	addGlobalStyle (".tabla_superpubli { width: " + ancho + "; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAQCAIAAAC+1EmkAAAAB3RJTUUH2AwdCCwsUMAAVAAAACFJREFUeJxjNDY2ZoABFhSOjIwMgnPo0CE4h4kBCQwyDgC3YwPyb1g8UAAAAABJRU5ErkJggg==);}");
	addGlobalStyle (".tabla_opciones_zonaforo { width: " + ancho + "; }");
	addGlobalStyle (".tabla_zonaforo { width: " + ancho + "; }");
	addGlobalStyle (".tabla_paginasforo { width: " + ancho + "; }");
	addGlobalStyle (".tabla_piepagina { width: " + ancho + "; }");
	addGlobalStyle ("td.celda2 { width: 1000px; }");
	addGlobalStyle ("td.celda3 { width: 100px; text-align: rigth; }");



	//--------------------//
	//TABLAS QUE NO VARIAN//
	//--------------------//

	var table = document.getElementsByTagName ("table");
	var td = document.getElementsByTagName ("td");
	var div = document.getElementsByTagName ("div");
	var img = document.getElementsByTagName ("img");

	table[1].style.width = ancho;

	td[2].style.width = "100%";
	td[2].style.borderTop = "thin solid #000";
	td[2].style.borderLeft = "thin solid #000";
	td[2].style.borderBottom = "thin solid #000";
	td[2].style.backgroundImage = "url(data:image/jpeg;base64,R0lGODlhBABEAPcAAP7Vh/uuL5JQAdKMAP3aMf6YAP389/69YqlTAf/pof+uACoXAXVHA/91AWs3AfRoAgAAAPmYNaCgj/z61GRhV/iKJjUgBP/ilfzLVLSMJPmnSdBUAf+yAP7LdvyfP/yFHfq5XNKILbNwK5V4Sst3KvySLvz0Rf+DAEQmAf3JbeKYAP+jAOV6AP/wqphhANOvaf96APz0adl1APh6E+ZoBBUMArhjAIhABm9QI/+NALp7AP6uUsp7ALKKTFs1AVUoA8hpAMy3ipRpMqRnAP/7vJGNc9ZjAuKHAFhLLtfHis+USB4SAfZxCrqsdpeJWHRlPTEvLPOiAK6WaFo5FejFdM/Nyup5GrVNJNjEqc+lVv3VeKxxAOdyLrViEumZJ+GEJ/98DggEAfSFAOOmVfmQGP26Pv7kgsVoFeiMMv73hvvsuOmHFuyfANp5F41UHcZQH+fYuFxKG/F8ALWoS0svAfeINsioK8zBceaVPMiYdv33lEc8I8tyEw4IAUAyGT0eAUApEFBdgeuiSeLe0PGRAPioAOFZAei3Re2zW/3aXfVwAO7mq9NnGLW0uO7swMJ9Q+y+ae2YGyQcD+LgS/qkJtncreRtDn5jG51vFu7Pfg4MCe7fm7x4ExUYIdnZ6tleJ/CmJeLWltiiJKNeHjo8ShYRDouGKPmFCMrCNenn40ZGQ/mdEQEBBQIIEXp2bf2+KbQ6EebqgfCFD4F/ggAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAABABEAAAIcQAPCDxwoeCFFggTIkzAMIHBCwAiAuhAscPAAzsy7vDA0UOJjyU+iPwApiSYBihTqlzJsqVKGDBjyoR5oqbNmzhP5NjJs6fPn0ALCB1KtKjRo0iJrljKtKnTp1CbFppaSIHVq1izat3KlYPXr2DDcggIADs=)";
	td[2].innerHTML = "<a href='http://www.meristation.com/v3/GEN_portada.php'><img style='border: none;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATIAAABECAIAAACNqC76AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h" +
					  "0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8" +
					  "ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAS0hJREFUeNrsvXl8W8XVPv7Mvdp3yZIsy0u827FjZ3USshEggUAIUHYoWwu0KQVadgpvS3nb0rJvXaBA2Sl7IRBISIBshMTO7sTxEi+xbNmWZO3Wfu/8/riyLMvOWt7vr4vPJx+QpblnzpyZZ86Zc2bmEv7LH+L/gBKJWPqfgRg9enm1hKT/KRJJMEET9N9KIlI28/+Cb5CT6EIubyws/ClgbiCiGlsyWxYEEBz+UyeRexVGPRub6JsJ+q8lQr3vfmfMomEPpwCAqBdAMBwXvh7yBY/naaU2CVqVXAwAUh0APRuCVD7RTxP032Ut/3koCv/3cApEY0BMQGMKikNeAHAPuY7OxqA0DnmDSp0AYyi1KoSdKrnYA4BT6NlQstwERCfovwKWw7g6WVgGPZwEQDA8lELjkHcEh0GHX/gwEPAeiUe2WheEH4DKrEmi1AulbgSfkIsBTHi2E/Rf48R2/+mkH6YBPwBvLCwsGoe8kEY6+zi1AEUBhzFRLgBtVp7JONmaY7Bac4wmIwDKtwPw+11BR5PD2TbQ19p9WJ1CqQDRHDYQlRUJJjRbFtRJ5ACIWjPRbRP0H24tBWidBAnhnFgoJIoOJXxOAN19FMBAoFtAoza7wmScPGtmtYDDUXjm24UPakT0Kpqn0fMzC4BDdpekv9vhqPccdpUzAU1QrQM6ynIIAF4Lh1QpUSgwGBbwOUET9J/rxIY8J2Yh+TAAz1ACQJ8PABKhwU6fQRTs6XPzABKmyaUVS8dF44iNZkqED6y2nyp9PNcHgNgtudifawHOU+/sdzrtpGuPH4AoyCRUeYmQW6QAMJSjhRvQK0UACDOBzwn6T3RiTyhvKWQjhSRkKBBzuQMAbCGR7fgA2dvdErK3jCCcPWwKdwLQ5" +
					  "wWpVQUcSspkd1FfCdHKnc7snbaDXXsogHwDk69IADAa1Aq1BMOpzokM5wT9J8LywwuPv3Q8GvbHASAeCAxQVWAg7gv0H45K7er58xctHxeQLqfLtufv2Z4GlzuQsHVrmUFFMAxAolJxUSMAvysKwJ/DSvWsxBoum6umViNQSuxBxHMJtC1+9uDuDntj/SRpVKu2qLPF2SQoVqsBaMQQT8RmJ+g/D5aJl089zqJcNDTISQG4Ar6oh+uPEgCHo9JB8wWXX7mytESdUX73umcle1/XJmKEbTHw4FSQqfREagJAo06J1xOLyKi4QCSTxUMyryPid0UH/REAg4WqurOsxoWlDJtPnNr+UIlUE9ixtaFtx/6CyGEAFimV6lmjWgsgi42yUsVER07QfxYsn6k9Lvc1EgEwECMAHAG2P0q87oDfOkVZufTssy7OMJINLz7Adn5aoHNJJ2kVWXPYvDwCLVFrIFUBQDRImUG+bx/xOBK2RiI1MfEcBDzxkAyAgM+2Qw6SlWW9fMa05RcD8ISIWqLe27DP3rjJt3+fzqC2SKlZzQHIllAAIplsoi8n6D8Ilr/LP55y7iAHwAvO6eG9MS7o87jKzi6bNeWMCx7MsJB03cPF5TLtzFPY7NMSihKRVsRRC0v6E77EqFgTN4BokO9r5trW0qiTSE00qGVjUU4iBcB7SXeTr+2Qw1OqPvXee/PLyhO+RAAyR/NA69bXw9tXq7R6nYQ16RkdWAAGFXtCze4IxtoGkpuQdBK2TC8WOLiDXJsn7o1xwk9mHZmedWKmOMUhne12W2RnvyvkFQPILbDMyY0Wq76zJXG6zHXZshNVxQT9K8KS/s8x0oBRXgzAFYgDOByXpjA559TF0844JxVTdTld3U+dVaBzZS1ZxBasSLDZRJMHgCX9o9gNuRENIxpMWk6A79rBta0liuQSkfh0XDQk4DMFTuM1N8764TUA/H5X1BVpWPXHFDIniaMAjGoxACkTP5429/pw27qhAx4+9c0DC3DpZHWUF/+1yf3ctyMlrVo8eLpxnjF6nNqM8uKntgZeO5gUY+UpuDBf/UZj5M/74pNUsCgYAAc8vFLOXlTI/HyeWhA4yos/bnEPcLgwX52rPXYt4aHEi51hABfmq43qUTJfM1mcYjtB/74kQjRw9BJ8Qk5piImLvHE+AH/QRwQ7OfOUQm64jOPQxo6nrq5epNOe8SgMuRy1pM6DcNSSzo1VAnADoPHDnGw2AFHFQpJr4vv2kcAB3iuhWi+iVkRCbMDDQ1ZQpdUYpTtfe2Fr7855v3xaozFCg7rzbm4AgttXszrqjzM6McOFEoQoIDquHUtvNIpnWtinFxMNksi8Zze9tDiwwU0f20Q2n4UsbVL81U66s981T33cRthNVnfQz0+HMZu29ZDf7Wee+zZwWiGGeQrHaMghF3dLPWcLux85hX5qI39swGAUpxXiGzZw6bGc8bVu+rt1xKJgZlrYN7yRaypDm5uZz0/njdnUFxH9bne8Y8Az2UAnRva/OSyPSqE4BUK+iMgb57vB+7zEaZ5ePmvKkuU6iA" +
					  "zCMNu97tnEqrvnXH8xO20lRy0YHhIpQzoK5CihinZW2U+QKwI4avH4Xa+/s71xPztNJv/JJWEA1N5OtXJeliuOhBDw6MyyM84ra9nx1dqLLpj116+NJqOpGHXn3bzD3umzNXXreMQBiLSyUCgOhZgcs0WrO+I31yEnDWwOHxOKcy99w95UyxYUxTBsbDqbxQpdPE0Vx+Df6KUWBVOQx0OMFopPDvErSpn7p5McNQfQUJwKj09VY1MRFr2D69aw/SH+5jpcWoy9nVjjEqM4Plr5o2p8twMPbiErT8EtVdzDW1lbOK6VUbOWFOQBYvgimS09pjYm6N8PlsKwEDAZ81EfJTFlvrVm9unLAiQ6i2MthCkRFpOz7/9f3nwhlzZHpzu3dnvfiFtozQG0RlPyV7/z08ee2jR/0fLLr6z+8d1/e/WHv/nkL6eZrD28F4zUzsEKmYLxuajfVzGrTr+3of0nC4zvNxOmxFSMsot/1fDXu3xeW4xQr5YHRFpZ4phj8XCAAWiNjkDDI824PrtH0hXhX1wQgxQAhRz2MBqH4jUQP9wAWzju5QkAHYN8ufi8koROzLzWzNjCcQD5crHwweFjDnj4mzcBIPv6oJaR6+dzObkA8OxO8ty3JEuK55eS3BwewM115K6v+W9XUmsWEEILJTv7ub2daKHoHBSnahQqXZSHzkHxawfj759LJlfxfg8ah+KxAPOpjW/xQKjR4aMzLWIg8WwbWvqQLvAyY7wsj35qIwLndIV4edQoxeeVJCZs7L+NtfRFkgVaKAY40KmXnHpOM8PORwKEKWnbtoque3jm7T8j2fMyjKTL6fp87futTR0ApHJTNOwE4HA6untdwZC0qkz9vYt+UFNlefnVg/MXLV+27FTKt3/w16wnniy9/P79b/9uiqO1v6AgojYOJQaVAIhGC78395QafNv4zYPnzn/gU8KUlM5Gd//lzW88ChY1w9JqZYmjt2j9ILUoGFUphwS2ezDHCijQH+If30Ffv4xX58HfgyBgVcBmx+Z27BbHnziX3lwMpQwAhiL4W0P84k+RJeUumcHdN48CeOjL+KI8XDqPPvwJO9PCXj0vZvPgrtXEpKRFBkABAOVZNEtK9jqw7B90kooMRmHVIoVJAMtn0M5Bdu5H/BnV+OW82JzSEZlb+7HgL8yl1fF111NrFkUIGikeWUq3tPDXfoxHzsVFVTQYx9o2flUT/9pBXDNZfN8ZMWuWMLni3T3xKzfjmsmS1w7G/3FNTCWGzYPXd5GrZ1Chlne3xm/djHXnT8DhXx6WgqkEILivAGErz15xUbPVWECh4RVVh7at8r55Wd1tV3Oy2WR4ASlgcs2ajf/44OX8guqVK6/PLajI4Lxvb+Pexm+efubRYEj6j/eez8ry0cjtwCEKVBWX/Kb1q5VvLQCw/49PPPVzenatleN8TDwHJgUCHsups7Dxq4YXH6i74UEAU+ffEuloCm9f3Q0ecejEzDGdt5Y+FE6CVgEkUN9HpuRRhRKDUUy10jPrEIji2z4UGUCVOOwg4Rh59zJ+zjzQIdi7wamRl4V" +
					  "bLqLlWbjgVfL41TQnH2QI1y6hs/LRYMPqjviLl9GsWnCdkMrQ40CnG2UlIEM4sw5n1tEdNtz3HtlrJyYllcqRUwAMJXHLiTAo5RYU45OfUKKE343+HsgNyJegvBa/XEIN2TS9fI4JA00AMLeaWitBh7C2Da0uvHsZnTMvRofgjwKA2oRLL6DTilH3bHx2AcpKAMCahdlTKQAMgSqxbBFd1T3h7v4LEXN0U5l0X70kpswvmzXFaowxbD4jqvT7XV0vX1b3vUWMdgnR5AnhVgGTr7/x3NPPPPq7hx77n1/elcKkyzly3rJ2as3ZZ11ckGu87HuTzcYWxG4Ttt2t/VTyk5s+u/mmGz54+e4PXr77jlvO/sGvOxrcg6yV5cV9vLgPaj0Ay6mzZOsfbdu2ijAlWVm+8nlXx5T5Pi+J+ag3zqfM+5HmGoePmVrIaQywxbC9F5wqGXFduZwSJXwhvL6PCGN3R5C5bj6ZMw8A/rod055hlj1FejygQzhrMc6ohkUFAFSJWfnYYcOr68lgFGUlkMbRHwSAq6fi9X1khw0wgyhBlKitwbpf0t9cwjuHCIAdNlAlqBJ+EV79mmw7yGdrscOGhmb89jN26pPkFx8SvyiJPfcA6fEkyze48dftWNsJsyYpRiCK7b24cxEEgXs8uOkNct9bSYHLa1FhYacXMUSZlPmt3fjjGuIXQfhmgv4NYJkylQD6tRSAcu45lbMOAKUUGo5avvntT+eeUUaqliTY7HQ7+fobz7311qevv/qK3d63Zs1Gl9Plcrp++5tHn3vu5XRk3n/fnVZmyy03ZXHRhwEApS/8Keuiqz676oab//e3P0b8JRq5/caf6mdMK/rmfT/yZEL6hGq9jDlGVL7K2WXux+52OV2EKTFXZivnnpOSc6z8GQvL/hBfbgS0aA6i1cnGNSBKXDyfXjQDUTGe3cACIFb0APly/uqlHLQIUrTb2ep8TZEF0INYAS2umEuhBzEjpsMf15DrXiSftGH5NIZYASVaXYhGsCgPsQDz0zdFH+xC4wBsQwAAJX78PfzmEn71XvreDpZYEdNhXRce2wQAm9tx3YvkwU+J3c1fWGdcOIUyekALL3DrR7Q5mKzx6S/Im1+SQhnKjdDnAlocjgOAtYhCi6gYD39EBnz4pA3CI1Ci3MTNqeKgBTFjfxC3vck8tgk+afJZ78RR1n+XtaU3zgMQTGVJtdxqjAFgRJX7P/1ThdylKltIxJMEU8lRCyHYt7fx6Sdf+tvf/mY0GZctO7u9vX3jxo1Wa87aL7epFNGVK38gsH39jeeszJZfPX0ez309jEnPT+55++nH77j11rNpYhW1HYS1H4BJE2kIZwFTSH4YtjYaChOFnCjkbCkKbP32D240rvwHgKra0xq2febz2qCDN85rZUeLlBZkQ1NRyleqt3zsGPDbRdIy3iK68WrwQGu96PmN+9/6bQlfqfY2JVxZ7uoZGh7ggon7rxUYmPoTtMULALoy5JaLeWD9rvhz37a/fy554Bty6tIivlKNnkhrwt/HB7dyxsnzI+Km2A//4ppqhlSG" +
					  "K842XXd+FoAbr8ZDHzdXVmbxlbninsj2ptZyIz+9iLlnadECK1HKFEORULe9rcBaprCI+DzZ6r/5TarO2dUlvE4U6U9sbj+05nukG3zXDqLIm8wD3Yi3OrtkuYV8pbprW6B+oOvOmdwfG2BR1/C6BABjbmxJHcOrRAAabIMmpXNasTG33Cg8q4h2AvwEHv5lYCkeY1jiZDjYk1xVKueeY57UCoBh8z1Oj3/t+7PPtDKKmZx+ZhKTTInL6frTHx+/4IJLa6fWuJyu6645q7Riae3UGgD/eO95u70vtUGvtaljeDIoBfDkM1/fdV+zgEku+oHd1W21xgDs2uXdti+oztLf82jXnRfKTCotFxqJnJqqK1zr1zqWbDQV56HYqZ1SG95u6wZfAGYk8DO6aaEQOgclxtz80snTAHlH31feECL6QpU6mcJ/ZNO3EMmWnToNkHcxno4+N/JmAdi0w/PE2zsRDgOAXI5wuCdAn7h1IVXLiFZe/+ZXpxVikprviohmVRcBFqoOd/R9u3yW8YlH5lGryrX5kP3+/Zyrv74bljbxtepqoTqJwr582VTA4oz2N3T3HbD7b73h7GUr84k92LBr172/cW5rI+8+VLF8lh7A6h2rZkwrUpVNpUCgnzj8h1a1i2zheGlRsSBk13sHDvsUuTkzAKnO1K+Uu15o9OXnGqvOqBC0oM36VlV2ivB53+HdSrm7tEqSelai5scZCRP0L2QtxTSVuPN5yQCHeUXFVmO74MEe/vClvDwDyS8jRmu6+2q39+3cdeD5F14BYDQZb/7Zb1P8jCZjVpYvdfT5d787f8asr9XPfH3brac9+czXd9/f/peHL//xTVlc9GFid1mtxuF15o7KWaf/7Na7nn7m0dv/d8/rry5jAc7RLzi0jDlmLctpfvNR8wOfAgetNYu2bl0NL4EurRUZpjKKnf3c4rkVTE4tgJ7+9f4IhWYqk6MBcKCh7/0v7KfOLWamzMBgYlPbum37gk5ntmlGYVHZAaniYLsjNGvqpIU1eQBe/Ly7qCyfyckBsL1l6/IcHA4wSoPJXLMQgG8o4fTv7gmFfENFOlZmrsl58g79mxv65gDXnjOFycmhWYa/PrMFgFBeYim65HzxrMFAUVk+w+ZDkXB0e3wScvMPahYsnUEUIuoLObyxCyZbBcnFMf/NP1iwx+77csf+/72wjuRPxmCiK9HlDwSc0kKSrzMryi67Lmvjpqa7rqxkcqbQLMO+DzeFmGLhca8zsbf7m6EwN23mCpJfIDxboxQDE47svzAs/QxEowOw1plhwVR6+6UJW7d1jozwOQk2WxRq4hRVhADAqlVrZs6oTjF5/Y3nDncGVq78gdFk/OPT/7N67Z6Hf//7mhqFYF3f/uDBFx5+6rpLV735uePTv5951rl6nvua2F3UagTw5DO25//cd9UNN//mwQqCXWctZooLXM/9bXDlDyeRoC9VhXZSrn73AcehjZYSfXGlt6+wKmRrEkKyWhn8DDSjnbLDDuIk6jmnLibZMwD4uHeBvpi+mGSXA3h61QuRBL1gRR3Pnseqm" +
					  "nrs7ztc/sde2f7o7GVTzq38+5zTg15nflk5AE9PZ+fga1NOOw1KA4bcuw84H7ycdsforJmlJHseADAevVbZ293xzhetK6fcgGxMu3TetEvTosE7dj3+7OcAiKoSSoM+GzdNWbRz/a5NGzdMOfciZGPFbfMWXOXRsyEYcgEQlVsmFgMQ+Gdn49HZy5574sXPNrYtX7GIZxf5mYM99vdr8ti2HfuXnn87srHy9nkrb09W19PW+sNHmq675qykePHOps6hKot28dkzefYUNrsfWFeUNbFf718KlhnHFcMA4FUAw3vyymZNSYTqoQCF5vDWdVI9y6i0EPaaa3MJSWYpbd0Haqbkpdhs2bjtxZffuWxpRVZWdeP+HhLqmjQpxBL/zq2r3U7x0vPPfPiZy3Ks93369zPPOjcmRGIFTF53adO2fcFH7rvigh/k8NwB2LfBalxQYfxmY8OP/+dipksLgA/6BIOpl4RcBz+2lFykC7nySvNbbU3JVbECyR23aa3T6mi1xvfh17b9A2LfYM882YGqOvLcKwezs9sB+L59//t1pP1Q7xtvrfMN9jDuvheWY0f31rtuenDK/AsBWFV9X9VHfYM9DV++3dPPP/PSdgCSRO+p2UOTs3BwED3dvlffbPQN9gwMxOaJG2cvp69/+M5dh3rzK2drs0Y009rU0b3/w1tn+Vv6cNddzwrMAez/5pMdWxp7+ZLyquLhbz6U6KeVVxX7BnuqLMzB+i333/9x6tePPmmoMMb/8Xm7Niva2tSR5Wq87gy6Z9v6u24KpNcYHtje/G1DlaTD1qx/5hkAEDkPLi0N6Bi8/mGzNivoG+yJO+3TyigmDq7+yxChvxljLaPoj8IThDeG1kGy9J6Hy7P+Tq1zCVv9zUP/qJ3crTbmEP1cUlDN6WemNg9cfe11d/5o5hkXPCg4q4fqD2w7ZL/qyqUACLdhzcefN3W07/xGojJPBqAT2R955uzTZzyyvuGK1KUEdpfkxquadx3iP3/ngmkzI8AhUt9DZ+ft2uVdcuYOmVxt/+JMALxbxpJuwZv1O1wdndppdz3BDuw+0Nr99avPlWdRnQR6FSxSaKT/ihr3H2Hf+7+mtBNaOh7BvnOpMp3YobSMic9LmJzp2pIwvGDYfG+zQx7rU8oUAKiCIWOuBWhv7z4DYENNAEpnV5fOrv5q1Wt/e3lNnlWrti7VaSqXXZJ3yinfDwW77vnFL3Y0/GPWgpo7rvri8TfOFC7XOn3BFnVW/s5tk6zG/cTuAkBn5615rvOmh9p/dPUCANfcuvH1V5cxCPM2H1HIGZVWA8h2D/Q5OvLVmtxCk16T7/PadGaaaovyBIOLQwy4MAAEeQAInohnpxIDgIoBAFaeWbU/iiCfZOgJAkjmJHQSANCr0B+FSgwVM34fjytYeo0ZTwnlM1qRKj9WvCM1/ChVpA/TE1LXkRSVkvm71dJJd9nYNgbj40glCCZIdRQm31mCBEBBkdWs6IcXAHq7nCkPlmDUASSjyThrWtXGTRtvvK0dAJSGrz5+7aGHXp+35OJll/zAZJxcWjYj7f" +
					  "qCmuVnTdu4ZfXtvzv37uv+unzZF5VG7O0OXXB27a33a6zGWBKTVuOTz9juuu/QnTcu/MOTU3DQKarb/P1d7mUzDNQ2nHVVaaWGfl9LY/68udpYs86gDg2dvC6GGPiGkqr3xpLhruOnbBZaXdJWq3hgOE0vDDWbZ4SnLcyEvCO9p9Ax+XI+9Xi+HlolgFHjdVzB0msM8tAqk4+kyne6k9Nryo1PF28s/1T5FP/0p8ZFUcqxEmo5Ho2Nq6gMVkfXUpFhVHtPuvsEbgLABA8ro4HAiGaOJFVWlC3Kiqf6jvsuwClCxinfSHKmEUhWXGV3HbBajQRI9HbmiMQAoJ069rLW+YuWv/DnPxFuA5SVfZ5vvlj77WkrfpJ+mYjg3Aohn8b9PTecxZoVWx7687TGbWjqaF+9I/TI1RGrUZbC5P/+rOk3f3P85eHLb/ypnti3QQuTiuG6CWZAmBoAUL1ZqhwY6u1EdIpnKDHJwhwcRmyQhxbAcZ9hHorAN5QEz552SeNQfMAHX4wdCh8XNJVyVivhKvSkIgflWbTIAAxBxYwAsnWQtPShxYNWFxx+PpJIDxRzBQZSboTwuDdGiwxQiQEllLKkYMLISBcMgFbCZWtJjVI8rSSWnLmVyZFk8+Cwg+wIMnY3P+BDNAKpDKnCgnjp/NPLdw9gMDpOo2CABRiSJ58SgNTpTjatKwKH79jqyuCpk4zYxsMO0jkobhyKdw+g2U2cwQxWo7QkKDkJpPFaMeCD3XeMXsuSQqMnhTIIDD0S5OtH5tOU2o/edyYVLTSy5SZuTu5w3/FJ3X731lIw0walMTdmp5iLwURgIG7NG6L6YqJQAkA0zCr7OT6ZIJk1s7ps2rLbr3jyqfee3/1VvTdhvWvlD4wmtYBG6u8RaUUAOGpp725Z9dHnzz07B4DVGLOei7OQP1mSuPLK1rfeKp8xw0jsriV1DZDLt2+cNmPGIKnfizzZvbfsg2rStHPPob6veFrAkm4+6GMAqUzJBntpwK+JB2yqXGC/Nwb9SekiGMdhB9nUg6+74k0DguoTx/10AsB6YGEBmTuZPQOcgBMBkNt7sbkd3W4KoMBA6qywKFgAZi3v8CXPRq9vpeuBukLR7GxuUR4mmWm6YA1+7O1hVx8cR7Cq7LgtTBblQa+iqmHLXN9Htvfii4PUGRyVKKor5Ael7BngigzQpk1G9X1kbSc2t/D+CB3bqCXlZIlVAsRU2SNuUpBPDtlVTVjfevzqGqWoWSreG6M+L+kcFG/2xOvbE4LAVdmoNJDaHDh8TEpL2x1JLSWf9fLTiqmKz+y+T9p4QdXHRd2CDsn0AjInFwANxqESJ61ufR9p6cPXXRDUblIxxVm0Ws+atclaHT6mP8Rv7ko0dGFzO1lYQubkYnZOsvaTRubRnNgBDqdMSkY0CZ81EiYK8RR+IlVhyA2FJeXH3n/vrcvPXXbmB09m55QDdqPJyNBvki/r0oqee+LFnc006Dj41dauVX8ZdVMJsbuWrSz6cUx07vkt06tN7V2uubWqh/48LTdmh92FPNm1P3e8sZZbPCNiLWj" +
					  "EQQiYHHbrWVtnhMIHwGhQb+agPSlF+IbQ6caOIPN1F3/NZPGyhSeZMOix6x4+6AXYWSp+gEOqU2Uickkle3E1X0EAQC9O+SQ8AE8cLZS8f4BZ28U19sDLYw6XOjaNTjf29rDvNPA31Y4j2As2vHuAAFSrAwzJVND2XnxxkPzxLFpBMvagc7fUI19OdBKaqwOQxOSqJmzpwK8XiJcZx2n47/YzqzviCh3RSah22JjYPElM6hlmz8Un7LStcYnXd8ZDeqCHeHlsbo93u6lGhp/OITfmCyoa0U+6ll5oxJYONLupfTIAMq2YYtisberBuwfIy7XaPKv3+Pvrc877dRfebKADPgKQ8iwqePI7gsy2g/zmbgpgSTm5sQYVhI7uu2HBZpPf7Wc29NA3G3iBSarvTg6Zx1hbqnQm4R13Hk4ij/VJ1TwAyocJ9IgGIZWzZMRgLlt26iuvPHnFdbf/YFnzggtupnw7Qu5h38Wws5lu/ezdV96b9UjBQmEfnwDI1IfbL5bffnHJtT93RNXk1afMiNkBtG0LnHufc/ksY/9jM2Y/tLvxlc7aM00Yc+O0Z8CnAcR6L/4J8nlJUz/vHCLLjPFS40meqGih3s1bqUbPh2ToimBzC/wRekkle/8U3mwkGozPNgsoBRYuJg4XrtyMNxuoN0ay2WTv+rxkdyff7abjCnYj6LsH8HUXKnKITkK9MQxw2N2NSgOdKxm5aUGgQy7a7Ca2MJkNTnDSDvHY3ov1rfSSSvaKnHhGeYFmWth7N3C1OaQ8C74hKGVwM/DG0NKH9a30D4vZUuOJ7xByYUsHWjUAkn7ET+eQu4sh1rKaI2wDFLQ0dybdVoOb1+LNBgoQAZmeIFoHSf0AG4hwi2t9wPF2X6nRNwPs3cXcnbvZ95o5X0w0O5tT6Bi7m9/czne76cIC8uxs6MUYVzMpwZ5eTBwu/s59ZH1rUiqAcmoov0Nr6Rt9/xPD5gdHn52l8BFoEA0DblaJFDKvvmolgN/+z68feFLFkn5e6kiiLnHo+T8v/P7FB998wv34G7p0QKZNXBHkyV59ynz73f6rr+15/dW8V/7Ue9tLgTdvKD7nPJ73csXZ2kv+8G3LmedlPCfzusmQn5XaAGlKftUJjpNgHAMcomGYlPSkMQmgc1AMxOrbSaOEdrupRkbeuYgsNwlddQyTogGvMZK3FtJb6snqvVQnIeeBaHV0R5BpdfEmFWM2MmOZmI3spdXcn7bT7b1EoofeT1r60DRAv19HxFo2o/wal9gZjIW8xBuDPg5PEHu72C8OUpOKXFzNH2nkLTPG7wVaPKjhk0db2QC6eLR4AKAoK378MEiRLRyPJGi3G4JzuG5ZSu3H0FKWliwHKpbR874iH+yGjkHcCAAtfWjoSiwpP2FJNOChJU8vJgD7XnOiy8XIJXy3m8pE5A+LJTdXJo6TicZInlmIBxjmvWZOKifZLNGr6JDuZAwmc/Sf1RI1AArNsEUeHUKJBhENY8iNtNeKTK2Zf8HZtTqLk080E/iFfxhMEPjfeGf+3u7QNUv3pDYPjACyJ5L68MSt" +
					  "ElO2Rj+j+bmP3fV/zl22SOTaPkhD4evrND39fuob58KeuMgBICvs+GespURPAVTrmRPL/MpGhpEfyfsKnEG+202rssmmc7HcdGIDpdRInp2NAgPZ3I4dQaZ1kNjdfLebLs4j45oRDfhFeQCwuR3tdnZHkNnXBwDnFUAony7hzn4uffLdE8HuTt4Z5C+tpkeR02xkAbS6EPOQYBxDEQTjiHlIqwtV2aTixCex7jj2DV9ZsbCAbLwMJzoVlhrJo6dBLSNfd2FvF7u3ixXmiCVW8TG76Ui4enoxkYmI0HcmFfPq+ThOTI5kLsR4cD5dWEBW76WbetDphpv5jqwlpx55OXMAsnGXaiTEQw1IVYgGAbDKfo5aBGTubfwmaVG5A4TN5zkbAOgADsCh9ZumXHdpU2Vl/VdbFlitRlLfk86W9ybN9BO34rFryhldjPdKaCgMg94zhKlVWonI1tjK1JSbEfSNF00NjWrFCa53VBJU6JEvZ/3HelInH+VOkOEMrtcfSY02k4p5YAEtzx9n7wwfjviHJ8QMVgKV5+Om2sS9G2IbWki5Cbu7IcSHGPn4O3FqdJEl5VjfSnd38lI5mt0EoBUEjFyWLqE3HDvg4YSwPsC5+9HYRNa30qpscmP+SOFxKBxbWEA2d1NbmPVJODkDTxC2MNPt5paUE4mWjH3WGz7aDttGL3c4CCEA9vxSUqiRnYSWVhTg/bzoe828tZOXytHqSprusVriw5GxB3HH4RmOrShl3mvmNDJyxyzRioLxfclU0zTgxza8UI6b68INdlI/wFbkcEUG6s+DJnGCsKRpzi8ZAqdK3mGRNIeuCBgwTiJmisOSnKFI9zivWY8GE74E0QCA3+9qbeo47QwNz9mIPchbhXzFofSV5CvvVj35jG3W9M2r/pI/69y8JDITJj7oY3Qx4QNn54Cwy0m6O+L9UXGtMWExaqiIA7C1MVhb1yekLvmgzxNkIzoDhnfkjZpfVEAC9Di8ezIEuQGlQbhzsLYz/tArGB2QHEULC8jfzxcZRJma7vJHHviGbO7mAchER+xXd0L0RrNodUd8MIosKZYXJ66qkY3ldl5J4oMuUUNXYihMhDDgiilHFKlQI1tiTaxvjW3pgFkDZ5AvMBDJGI+UFyuaBvwFBgLAJYJ7gNQPsEDimsni8nzR0achiyIKcCEvz7sBFbwx2N08gAo9xgWV9bljj0SZiDx62viPuxOi3++m9QMYCnNWLW6sCa8oGGdK+vliw3aHa0sHirOSC9T5VvXYgPAfm0X3bohldOLzSyMZVevkkpmWxHvN3FmFzK3Tx++7D22BVU2w+5AlRW0OfjF7nJEw36peUTr0XnNidjYpz4LcAI3kyOOQJJeF4EASSdlFR3fqfC6fSVoCrSodq6OcWKkK0aBI5Afp9/hE326LOJyOmrkCFC3EHkyu7tPFqO+57db8FXmJc+/smfua99Z7rTMTQc7RD+BAqzTqcZVNjSsVisEO9vKXOjYc9BIiBlB/d1ltkRJA5+DIDZqMSitYdhMbdTkjHjkVHNGTIAOPsArlWRQghTJ0R" +
					  "YjDxw74ufRQu0xEVpQyr54tZeRiYJSz5ArEH/iGvNecdBEXFOOqGhkjz3So2gbFy98bSOe5uTtmC8d/MVstXHWbomK5vNzkbhgOzctEZIpCPZZhipZXiF87ONA0kFytzTEzGoUyo/yHTW4A2Ro2X865B8j2XjR0JRYWkOUVBkYeT7MtYXdClC4PHw4LKQEvD28MTBAuEQZ8AJAvF4+1Th+3uGUiMjq/Nw5dPxPzreM06st+esVbHn+ECoO0aQDrW/GHxYlbp4sy6pop57M1bLc70TSQ9FCM6nG6Zmd/5pa5zd10/SB+lJ0puULn1sjIr041pSskxee6tYHhVJDABC2ewCtnZfadEVhYyX9yiLR4cIoIAPwiqE9kNI7yfNMBLaTdgoHDRCsHYDQCQDSQLE8Vwx/ihykz6Oncv3P9rmef3eR0HfzVXafmxuxka5T6wtQXBvaPWkD2RARkls1Vt3xVDODc81s+3xVnrez9r7dP/UXz7EfaLviNc1Bu/vPBAQGTaqUIwF2r7GwsKhUlLQANhQULGY0MpUxlzC5H2paojBYdhagSnApyA6pKMbearphCV8ygV0/jLqtjlk8lMhERgHHRdLx+oW7sKHQF4retG0phUiMj51Uho6uEYpd9lMRkXaFoYQHRyAiAP22nbzRGxko1JxdCAQA1eaxEpTpKE8qy4qcVjoqdjhWgpQ/CJgRbmLGFmc3tkInIJTNQNvr4yCfd4Q9tAT8d2d7GyOXC8nXAhy4evBvuAWL3waRiaorHkWpTD46JSY2MnFOtHytk26BYwKRMROoKRXWFIkH/D22Lf9I9TljhokJGNjwqFueNs0A9HJemX9WdvsVnXFpRk6kQAH4qvW3dkIDJqmyypJwITsf6VnrPtnFuWi4x6FeUMq0uuAdIf/Dog284mcKCSpOXwhwjQdLd2TG9IBfRIBTZXrUcbg8AyvQRlNKAnwbtPol+R3tkQ31YKhddukxWMS1Mv/0r75UwKpDAAWF5Oi7x+3kArz5lPvCh4cKnuunFeY99wQAgUtXG5uD7qwbL4qxgJ2ORCCDqCVBXTASgUDSyv474dBK3B+IEABENOryRk473qIcHoVYBnwqGIHgZRR9vlyCSoIKdfHJJtkiZ2ZnuIHfbOm8KkwCmmrFsslmkzFy6/P7LHiGBef1MVORwEj2tbSKv7yX+CN3Zz4mUijFdS3UKjz8CALOzOQBjy6TTOdX09b2CkUFNsWps4RaPG4Cwl1nIuFxSyf6oSpdR8oVGN4DLJ4+qLs/EAE67DzEPOZRNbWGmx8dXWBidhBWNCTW2eNwaGYkd2Y2NJOiKGtRly8bq87b3e/wRWmAgl9UxJdYEgM37yZsN8Efoph5y0QzFWPsmESGSSE5GY1vt7R8a3oMxMiOcVcicVp7Zm+4gt7mZ+fliw9gW/W3dwCeHeADLp5KziiDR03Y7+04D3+2mu7vH6ZcCcbxwEj45BFuYmQvuREfjOLDUKgCgH1C5IAr2kJCGwk8seUVl+b76BqPHQfVmEuIpb+e8nrvfdgC440czy0T11Nbm2etiNQ" +
					  "qlTMIHfcCxX7PB7+erZyd+Mlfz9+3JIKok4Y1Qerhj7x1Lp55a6d/YPBRJUJOKe/LiPJszEk3Q+QtK0dM4Mo25ogXzQUMJVqPwRntVEjAGWFTJVpwcMgWqD8EWZja384SIL5qeeHJJ9riv97htfd97zVQjI3la9PgQS2B5sXjsK0Y6gjEh6X/RdJwyjZYn49B0toesb0VXhBwh1JJMXRbn5xlUx5C/Llt2ViHzXjNnUjE6yTiibulIfmjq5+u7YVIx183TZgypjmBsr51MtWbaujK9WCYiwThsYUYS40Je3h+hhTJaph/Hrz67Nm+JdeBIcq63x9e3YtnkfMOYLNZ2W0SwSJfVMXOquNlm9AcR82B3N2kaoN7xInFxUR6QDByeMWMcV1EnYS+pHNGGWcsX5+ddNTNq4DNV5AUHYE6+bOzMu7ojHknQJeVkxQw6wwqLCpsknN1N3nSjY3AcqfyEC3n5Y7oMxwtLtRSBND/c2VvvFc3QhTwAxKbFTs/7RUEf0ZspHybBIbaIHNq7Kc/C5HTu2rDPbdZZJVa5PsAIUSMFT5JXY4XCAFJvGUn3QolC7mrjuxOSs8sIgLe+dUYSMKmYRZMrs4q5R8+zPqlzApiZKzuzUvE//9gViIpq66T8fglRgFFpB/o4AFI1H/CHWI2C6yZIy2urT+q4TSAKXwj1DmxvSk6HV56ie2i5QSOhY2f/X37Z/mYDNamYMydTAM6DRKegNcWqhDjT0X1hlz0QoVXZZE4uyo2oMMMXgkqStF1K+TiPAENySbI5iwpCCXFW+m8DMbK/w3lG5UieSaPH3Cnse822QiNj0jMZDBv7BwWzHw3D7kMgKjp3uu6MSn1Go57+qscZpNEICSvVibQbHsJKUpzV1zRAQ16+HWxXhAdQOAkavWqsWn46G0DhETOWH7TtVTGVxqGMFgH4884eAEvKSYmVm21Ozq0SPVXKRUBCx2CslsyKpItEiLjGkjVWmJnF8teLx27HlCfGTFy/3hCZO8U6toq1vZG9DmhkZHoRM8PKVZiFpBF0DACYNeNIJVGEhHD3ycHyaFkVmQJxv8MxVA2A+ntKZ1dzplq/wyWsNgFQX/jJH05947PezfWSiFEvrO4GPJJogIkGmBBDhyIhOnwBDw2F0/8lg6WHwgD2tgxOrdK+8lP9laeYrjzF9LcbJp9dzO7ZHjerudeuyHnp/KKLpyk8Qe6dBn5abcUIpING0u6PyX1CNjUaYDwaKvvnXnU5HiZNv19uyJZQkUyWel2f8OFP9eFH13ImFXPdfDInFzoG0QRViVGWLRbKpP/bdpCPJOj0AliLqEU1MmVEw5CJSF1BIIO5SCZzJ1ThGBEiGWbDCPxSJe9a7RFebZj6ckVZrMBAzFpOqtSlsxLJZJu6k6ppdaFpgObrE7ctMmXUOBAjn7QBwOG05ZDwuFSmNBu0ALoiCHl5h4+ViYhFbU09O2qyT6s3nQmAbo+vfoAtNDJmgzH1ZarY5nYI0d1i6yh/ZyjMyUSkOD8vgy0AR4gK3vJkcwLjvVIxoyPSOaSz+lN9+K1vnXO" +
					  "NkQyZRTLZvoFef4TOLsDUQi7Vd/4QBOtdkz+qUuFzLMT0+g2p0MB34MSOzL4KuLzo7t9ZMXtSIGDT6k6V5M7saN0zfWaYqHIpwPhRe6a8NE/79+2Ou0pnHj5km2RhAAx4JACyEQOQMr16JfUMEQAG00gbGGsYQ+gJUG0iRoPal6/VsrFoIhLZ3UsBOAKsI5Dojw7VGrFun6vbTVe/tJD6nILh5X2DfldUU66loTCrUTRvcgsyfyeYXL1nBJO5aWf7Uh1wz1bu6Y9sAianFnIAFGE2luCVclaTlSuSjJq1XTGRcCbDamAKFJxWgUAU/UG4B0irC2oZqc3OTWcufNjhF7uGWICvztdIZcp0niKZbJ+daxqgm1rDV8zSpb4szpEtqOBn5spSMqd47uyNCIu6bjcIES+o0E3PFaUGgFDsj5sPOfwp5zlziNcVBDYchMPHAlyXizdrUJ6nSQfhWGRmfC+SyXy8qMvlXFqTlSGhSCbr9Ue9IWhkpCJn5Eqm/iDa7WzHIF+chUUlapFMNKZdnignAuLTio3jSjIWpRkf1tnFf9/ueOtbp0ZG8vIMGRxcMVFTPw8gWwuZIjlZ+EJwedHqZIHE6WV5Y5vplpnb+lrytMiX8+mz8MnDcoRFECoJ2nbsP23x6bqB3Tzfbj3zysb6F4Nte9Wz5JQJUw0I5E/93HTunYdWLomTvOjhHqlFSgFI9eyAR5KtH0kWeYZIxImcQrqxvmftbm96jbPzDbka6e7OIbOacwTYdKn6o8QipVKZ8vdrW6dPnVJdl0ObDhCVFkCsNTzoj1QVSwQPtsfpUhmhQ3JheaKKyMBk0wC98hTTExfl61XsWEfk7jXupz9q18jIdfPJnCquQAEvgC5EElQpV+lVLIdRHlJDRygYRypgOLySQUsfut20wICltUZuzGrQOdBHaVzAAwDhzZ8jK7QuN4C399ounZed/v0Vc8yTLExGYQBbWkbSVJPNiXvPt2SUafFGVu9JLoecQT6jRr0EFrUVsHW5+KEwnEG+rlA0bkWe4NE8t+Y+rzPIm7I1Yx/c1OqNJWDWAEjeSe0LoTsEu5uPJKjZoMs3ycZqqa3PQ2lCWOmM5SnIox8vKPBFc6i1x7+zN7KlxSWEx6UiYjFqMqS39Q45fKzgQguTvjClttvZxh4OwMXTFGPrbe3pb+zhFhTDkE2/Y2sp+LHBgc/am6+tKNBQf09uwak7Zl06sPs5tUVEvRJGpaUwn33eKYvfGvrV+zufuTb/MHjh5e0WDycgM51bZWH0nS8i17zun1Y7OfXl3pbey6eD5hH0whFg0wEJwCKlU/Sq6z/oPOgQNby7lIbahF8Tg8rupgHj5IiClwYAXwfj0VCj4ruxkylMGrPUXDQEgJUquGhI+O/da9zPfNytkZEfn5oMSwhTWIrGvjTe6x4Ix0gkwQto9IXQH0TzAfJ1V9Jw6VVsxlOuwYDdmwzTL5pcmSogiOEIcc4BP4BGG1q8kapsQ3JREA2dWakYK4MjNJKAJUR8/UKL8EiqdQAe2WRPj1j6RBJLGh8uGlpUohYQG4gQ" +
					  "AGU5+gqdLKWZVEV3ftCSknwsOdy+sVoSxHCEaCrKJSQVmoPY3sR+cZDKRJhakWXMUqc0kNLSgD+Jo6WzdBmt5qKhd7cOvNTgv75Oc8VpRRk/WaT0h2t6ncFRcSShOaPFGxIOkXp5+EPJvttlx+5OPpKgdYWi3FxLxiOOELc7xEcStEJPzMaTiT6Kxt51T4eS8VivGBogEkLTvq9LKi8IxAJaYP737v/ins8KO/sZfUGiI8yY24hH+4e7DXMvP/DStqzr5yoO9/NJK+dJ6kuqZwFU6GTNPbj6tdb77r7lzp/UOrnkSFrz8dZ77nniiY782iLJjj1dbpk5JckkC2MWiX+1budb33JPP37HjNlZdPPO5BTYOzDoj1Qt0wT8Q6xGsb/eqZJAo4BMD+1waPB4rvEXGusLJUdACpOPXVVhVLDpuhY+3L3G/fynHZTShRUkX84LXpZMj+4QkofWx9sfpzMkI4S7O/l8OXFkU/cAWdWEpgFqUnH3nm8Zi+T323HA5hfypZMsTIYYANY1DgJw+PHSttDj5xuONCMkPb22kUM3p1Yqrzht0tjyP5pZeVm5biQnrtayUjZ9vOYWSFPpDQCmbI3weDqTnW2eDxtcYyOQMhFRy0gGBjImMqnJBPQ4g/zaTiLRQyXB3i52QwtxBrnSPO09S3PGyvzmNqc3lMx5pOamFA1y0s/bwhsOeg/Y/DqD+uypxvQap1cqHrhadvNfdo0rTIqkelYpZ4FEq5Pd3kQjIS4Ywye7hJMi+NUFFWMfOdQv3bTNXmAY8cZP9I0S41hLooQaCEShiyMC+BXwtHzY51+ZowHl242mkrJ5l7dvfaxsOQCQHsoZ+uvMlpd+Zr7+6fZZmoKpVdoRZEopgKiHE5D50z/vv+EHl/3mwQoy2KdXJKOQpgsrX3mt+vRHd7/wPeOcqhxXTCTsEJDKlDubum7f4lnfSp9+/I6bbyqitu3CzgE+au3Ycjh3lkzBU8FUBn0eWQF0gC4OiKGWnoAiBJ+k+QDZ0EJSmMwyqMfxXd9pff7TDmHMRcOwhRl08i49hR0xD+kSIoLhsIdVaEZnDebOKNDqepxB3/pW6ouJtBKu1ZXcLHbvstyKSXlj69q6p0kYxHkWjVGt5TJiWaGA8GskQbfuOexYmpNlONo2ktYef+rzHWfljtu6OVUACkaZlIwSoYBJxQj1mlRMWc4YqYDWHr+QRRTOcyt0o2KKIS8RTp86B/xjtXThFO4+ESIJrN5LHT6RVsLttVNnkJOJyM9XlIyV2R/H2zv6hDztjCrLWIYIJT0OZ5D/+3bHzDJ9hpZuXKR4f4Nuw8HkkiqaoI4Ql1Emx6ooy+lv6HIKGyF3dxK7L7n16spTTGfOKRiryYaD+7vddPlUYsimJ7GwPJYTq4dMMJgux441z513w81+v0urKyk6/5Yvtr6d1dJnqMhBD3g7iMJ3zak53l7p1a91P35x/tJZusP9vNcdgEEtILNCJ/vhSzuaY4Vv3nUqGXTBJ6awE7UGUpVer/347zfd8PMPznjxqzqrqzYHxfl5cdfA6o54gx1qY" +
					  "+Err9x69WViMujmfWECMCqta0svtYSsVTq/w8VqFNvWtcaNVK+ATA+o0qJMx0FuKexB7LJjbScauhIpTOKomBS2d+y1U5MSSrlIK+GECCeAngDts/doJuWNCp6J8eTFeSue8gFo6BqJ3PzsgpJrzisfZ9mzvfvTxuDwwlsiVquPYv1aXOIP94duXHQ0WH7SkRDc1yvm6s6cU3Byrr5Yra7O1wiDWKtT1xrHuQRiZ28kEBXVFdKrp3GV1VQ3GtqtLih0bMeXvN0b7/HTqqxRi+0sg/qhH0wXzNewliiAx26cftkp2WPreufbgZbhAzFTC8ZgEhigKsHjAPDpbtcVc8xnzsnU0jPX5tfe601XbEYZjRgrl9Sub25wePxNA7RpOB0rDJWxUjUN0qe/6jGpmCoLKTdyWsXJvHxpfFgSJRgFtB4gzWA2Nv6wpsYoGMwpP3u/4ZazlsoHWG0FIn2kh9I8cuuVBgB3ftB/RW/k3vMtgFpAZl2e9Mm3977ZQL94/5I8jQs+MYDkbUDRIID8svK3X1m5Y+vMx/668919Hc7tnQCmT53y3P9ef8qCgnIjRwebqS9EbW1EpXXuC+5qC82/QicEYG0bA8KqUjCV2igYPchxx6VDUfR70G5nvzzAX3mK6emfzMpSZXqh8Wj4+tf3vfFZb2ZIJsg7g8jYGO1w+TcdFk8pz2SyfFHF7tL8xz9r3LYvKIBt5ZLayWWSsdUNBsOPb3L7g8kc0rxp+RoxxGn3DMaj4fVdEcFzk4qIMxjeusd209LCozTzQOsAAErjd31/plh6shfCxsNTK7IEWOaZFZPLJGNZCQGYxRVsZTWtzIdCipQjzHsg0yMY42ryRAds/sBAXGzNPJ5046LsWuMZz63fV2+LAZhbq7rjnJqqLDK2or320Kuf70udKFhSKBtbJjDgS7nN/ghd3xU5cw4yik0pL7vylP63vnUCiCWwviuyfFEmnwXT5Wt/M++V9W1b9xz2JJR5ZsUdiwxzZxSM23evrG/rdtPv12FqIW9RgTmpC2yOZi3jGkA6YjC3vvfr2qkfuJwuowm1U2uct9+47okXzrypT2TKSTj7RD0yAZnleZrvv9ixpWX/z07PW1SiBui6fa57N8T+8vDlS5braIefhHiqYAg0NOCHsIHe3atXyJcumTVrXp0zlHR7TLosvTYBdy/8QRoI8S2fA6C9ZOdG/6xzWQVPQwzl/KEm14DKmFxVQoW4FMfvMgQpvEF02LG7kwfw8C2LtVnSxDiTlOL3V837/VXH4La7J3ze3Z/6I/T97X1XnDNZLcmcG6rLFE//ZHEoEAOgUEuEAmOr++1re7ft6x/ZxlVkJQZderGgWL63ZRDA7AJI5XRzC6m3xT49FFs2VTc+JttcgQgVjHN1mTFxkqAEI5aX5SSBZJUmtNmZufsDbS5PQmlSBfLlvEUPvQKqdB0YoBtCsRWLK+ijXfwHjV3Vs+dmaIkoFXMXoHq25ZhaevTNzTsOjzw7bXZVQjmq5wMxus/VJfjbJiVtGqBb9xxuWlJWXZbpeN9182lvffuusCJYvc" +
					  "N156VsdpZ0bN/9alJWKDDj6FK9Wx95/tOO1KYRbYYG/nlYqgjAAlLAA+HKqqD9sy8/ekC4oJkwJaefd80qh/+LP7+z7MYckSkHAQ/pobwhsmyRvH5G7q/fUdz/UWOdFT9anP/7tbYbfnDZj79fRTv8CA5RgITkFP5RNjMahFSlV8jVEqVI5AeA6GH0BWnAz4d2UlsbAOLTrf2wN3++3GBi3M6IVE1b1og8elpshEUPXTw5N5+oIoTjvHkWTW72Ef3A3OxjbyR0uZPbf7ft6//7ZwdvunjaOMsCEfSKo80bf35/j+AqC6s4s16Tn6sQiUbVrkZsW5vPpGKmFxEA0TC/vtX35daD5848dVye3xxwCEGXX10/N4MVgL+s63/w+S00nrmf+solRY/+5JT08noR5lebBVbzpuWPZbW1h/EP0UIjI9EndPFxOkIhhUWPEitXVyh6eU3HGfMmnzvTfBJauu3ZjR82uKQs1DLGGeRL87QKtSRTnlj0k0YfgNklVCeBUi7acZh8c8AxdbI1g9tUi+SsBSVrt7QD6On3P/buridvOfUkpPp0p+MXT32ulpHl00hlNWfJB3OyqQHRsYvogSB0gFEH2+ZX1shOP+vMPOHE83k33PxZsGfNC98svaaUVeu5aIh1gwtKSsx4/XrsP/use99uu/GtjsnV1Suvs9JQG+kXA6AqJeXDAEOgpQH/qLsto2ERwuCSzi0fsNHQIb5lH1HIU5icXC5gkj+wyduodxp1w6nnk/IWIh7Ywkw4Rr+3yEhVJ/8GVs9Q4s29Q6lA5X2vHyRay8rvlZwQh5sf/+adzw7m61GTTwD65QFSVaQUKbKoalQ3HWiwRxJ0gRUlVl4lAcDWd/N7WwYP+KVV1nE6tK3PF0nQP917js5syIiQNtkTq7a0ODz+sU+t3uH6pVitV45mqNcA0KjVBUXWserqHAz4A4HyUhh143eHlIVOlTSYXS5yw+83vfiLRctPLTp+LTXZE7f85qMNu/qqskmRBdEwXd+KWVMnUaWGjhbV7pdGBweFNV6JlbPaaUNX4v3tffMXlNaWZq5Uf3reZAGWkQR9eU2H2GR9+IZpJzQA7nlxzx9f3iIRQUhlW/RQSE/SVB4DliMGE/ACGgAhR+fq+xpznps0KXn+csVtP98cCK97bdcZ55VJy/N53yAb8KAHvCEyxdr32a9y9zln5udk6aM7uc4CkQjJvlQpMy6AhlSVWmqmAEk8Dhr0sWZLbFfky1X7Cs7Lq56hD7j6pGrYNgZ6XC5jQdJ91alOxlRGOQDIl/NyCc6YN5kw/8xbOAKNB+0aGZldAAD13ZE7Hvu8c3DBndfNMUuOcW8E5cOrN3be/szmQz2+ukLR4gomX87bwkxnPz9rZqnJrCQMk2GUAEwvYow6rkABgFvYTz7bN7Rp++Hqi6ZgnKDuYbNe85PxfupsaxKG45JyMr2IARDy8vUDrBBxSUgzqxYpskrztACKyvLHqqvxoN2sSe5kGteuqAiiUlj0mFPFAezzGwOX3rf68TvPXvm9kmMqn/Lhv25wPvCHzxwevyC" +
					  "toKVWF7+wJs8wJiqWCHVtOOhdPpWUWHmjDgC3pJys39Vn6w1NHbPyP/e0KrN+k4wEsjVsl4t//MVtPXbfH++YP5btWNrb2nXb45s37OoTTr3MqeLKc2HNQpbo5AeTKHqEg7XSOKJiiAHEkL5ci4R2bX3v11k/ekgla0PU64npFt7x40/Ur3350Tdlpb6S0yycKRc+l2A2aai/1gze28IDrKqb15gJr4RKSUI84IEibUYdD5AUYFEysObQzm22Gd+vzi5jhHOVto2BJteAEH21pGFSLEF0WPLjISmFTA+Jntbkk6KyfEfs5K/CdvrQ3uVaWIEqC5Mv56cXMRtayGMvbP7o830XnF177TlTcgtN4/jPoVD9N81PvL1zw64+JA8NcdYiqlFAYuemu0lRlhpAhmCrtrQIm7kLFJDpYQbOKoLDR1dtaVk0Z5LJnGnEdhwmHz+8aGzrnI6hP606aFIxl1bTmipabOUsevR7UGNPmHeRLw/4nY4hjOGWZ1YgHDaZlWMZtne5FpZgaiEn0ycjPRkdIY1DJYc1K5V/Yd9p4H/6h8/e+yLnkjOnX7SiSqJQjFURgH9s6Xn82c8P9fg0MvL9OrJwCi22cgAkdq4mn+QUFIwVZlsPU5VNqiyM0C6NAtOLGLuPf2tjd1FZ/lgtXXPx1L49W6wGigqyoYW+vXrfZxvbfnTFrO8vzskpLBhXsL6u7offan579b7UvJbCpEoOHPc4HCfmSj88sjEZ3jkXjyHKIRSFN4h+Dxwu+PTnrPjRQyrfh7FQyKzLgja+d+P+tS98VKMuOH2+gZmUBQC+4csmVb7U8RFGpaV6M+FzBJuJ4fcmCBe9CoDkgz5GpU0MKllnb/1XPg8nnvujOTqpjQ/6hiKhgTXMnqHWuJGajZmYTPa95HgbHwzCE0KzDc0H0u8gPhkSDpEsnEKLrQDgD8Hlxeb95IuDxBnkZSIyt9ZiyTHlDcce4057swvf7rELEde6QtHiCjq1kCs3QqYHgH4POuz4ZBcRrrRMr2tJOTmvCqlQp30Q/R6s28Hu7uRPtAlCvemDKRiGfRD72vDtHvJJG8begyxsvx57qYpGRlbUYOEUOsMKSz7MuvE7QhhUQi2tvbB3CtdGwx+hGhmZUTVKSz12X3+fc9u+fuHsy4JipIa+TpUcjUfqu6pssnzaqMKtvdjexG5oIek5qmRczUAWlmDhFGrUAUj23e5uNA1QQsQluYpZUyflpcWNGw/adx9wCs6/UFGJlSu2QugRIUB7/OPwxGB5TGTOu+TXNfwjLpdPJC3VqZ3U1vb2Rx79oYDBrJk+N1s85kYGXtyXfGmsSkv1mWt94nEASAwqAfCHB7ubfG2HHLlXzqk900R9YZfLJ/N02TYG9qIfwD+PSaF16eNjey+8seO6sT+drFpka2E1MFMLuZRUQHIcCGxbnWyXi8/Y4yIc0SyyoMqS7FSLHtYsSFlEuSTYOuxot7NN/Xw0DF+MNWu54yns8CWTEmYtp5NAxyTPOgitS/2UwUoYTPEYPKGRQSy8NcAXY7USTiqHTgKrgQFgd/Pe" +
					  "GASpMrhV5kOvgFhyxL5IITMURb8NrS7s7WLtbr7Vybb0cxmA18hIhYUtN3HpGj56w4VWz8mFtYgKmNQrjlhYK+GE7kupIpli7YXLi8YmIrzjIGN6kolIcVZm3wkVCUPxn8HksWGZgUyhw4S53B9Cf2TGku/fUyp9b3D9Jp1+EmOOMbpYz1Z+/3aODg4azJqiYq3OLGN0NLmfU6YQS+VUNepqH8EvJT4dFw3xXhLw9djb+nqjJeppk6ZcOF9nEvF9+1wuH+nuPrTb3UmdMgU0iqT60hVxErqIxkYaJbQoEkLwBN+JrJIgJZIwTajk48xi7gFiC49ap+XLeYmeGnUjz6a3RRi16YIB41R0pMLBGIST2On7cAQmwk/jspJKxtdJciwqgOEzOv5QkuGRuB2zL4SKBLREPOgOweVFzHNELQkeuwBIQUvpj3sxquEyxTjlj6SlDOEFwKf3XTCGdnvmZvcSKzdu3/2TgDxeWKaDM2O0+UPw8WZ2+i+uqv4m+MW6WFDJTiJqlRJAXxfZ3+GkzRSAwazJ0sg0RikAAaUA2Fg0HpIBIIzX7wkOuHlJWDvojwwWqkyVy8vPKtNaomTQ7W7tS0QPkT17dx9yuETjaPCf1EVGu06axgozVmPCdCaQDklnNb0hqVYcRSohlDK2vFBY2CBx/DKPZXXSOkntHDiKnTy65RRcjHQtpSZfgX+Gc3h0OcftkSNpKV0VI3n7k+q774SOF5ZHQWYkhEDx5XW1M2oOvxffs9MrVomtMn2+jrWygf5Ed7dM2IhnGD5NomczjxcMFqq0aoskd+akxaebivMAsKEmT+d+3uPk2r463N3SHUIk9N1j8v8ZpXscKfp3Ef7/sZbGquj/Xy0dpe/+7wQ7AVgexQIIZlNfcWGdbtDYfdixt0GsZdlJBkNFjnD1q7CS9AZMfT4A6OPUBqURgEo9SWGtyC2oGA6Ct1N/T5+jQ+LpgH+v48C6fg9sQbOWcaQ7rv9emJygCfq/heW4nkO62YzKzPqKC4u07kpbF99fDyBu0ionFw7KzSZDJZNTCY0JAJQGjlqE15Zg+EUJfr8r6GgSAOl1dh5yYMDml0Yc6UZyXOdkgibovx2WRzebQjDAx5sj8lk5BQWC8YxyLXILw+gLSH4ZUZT2kgKVXAypDpLhVF7MCQBRb8ze0tfV3du3a8DmFyxk+gJjApATNAHLE1ivC2voDHAKka6EbAbRWvINTH6uQqTIMpmV2aU1MOQC8PhEUVfE5/IFA4e7OzskofXp5jEDkMB3kA6aoAn6N4HlqpN6LnEMcKbjU6BUdD6dMoL46Wg8BiBFE303QROwPCo+x+46AEbwibTg8pHIkrYPb+wacgSTE2icoP8CEn0nDKSiEfspRnIPl0I6kh0Sdj8diXRp94Wnm8cJNE7QBCy/Y3wK6EolcFNHClJYzThkMGEbJ2iCBPr/BgDxRLmAQTb2AwAAAABJRU5ErkJggg=='/></a>";
	td[3].parentNode.removeChild (td[3]);
	td[3].style.backgroundImage = "url(data:image/jpeg;base64,R0lGODlhBABEAPcAAP7Vh/uuL5JQAdKMAP3aMf6YAP389/69YqlTAf/pof+uACoXAXVHA/91AWs3AfRoAgAAAPmYNaCgj/z61GRhV/iKJjUgBP/ilfzLVLSMJPmnSdBUAf+yAP7LdvyfP/yFHfq5XNKILbNwK5V4Sst3KvySLvz0Rf+DAEQmAf3JbeKYAP+jAOV6AP/wqphhANOvaf96APz0adl1APh6E+ZoBBUMArhjAIhABm9QI/+NALp7AP6uUsp7ALKKTFs1AVUoA8hpAMy3ipRpMqRnAP/7vJGNc9ZjAuKHAFhLLtfHis+USB4SAfZxCrqsdpeJWHRlPTEvLPOiAK6WaFo5FejFdM/Nyup5GrVNJNjEqc+lVv3VeKxxAOdyLrViEumZJ+GEJ/98DggEAfSFAOOmVfmQGP26Pv7kgsVoFeiMMv73hvvsuOmHFuyfANp5F41UHcZQH+fYuFxKG/F8ALWoS0svAfeINsioK8zBceaVPMiYdv33lEc8I8tyEw4IAUAyGT0eAUApEFBdgeuiSeLe0PGRAPioAOFZAei3Re2zW/3aXfVwAO7mq9NnGLW0uO7swMJ9Q+y+ae2YGyQcD+LgS/qkJtncreRtDn5jG51vFu7Pfg4MCe7fm7x4ExUYIdnZ6tleJ/CmJeLWltiiJKNeHjo8ShYRDouGKPmFCMrCNenn40ZGQ/mdEQEBBQIIEXp2bf2+KbQ6EebqgfCFD4F/ggAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAABABEAAAIcQAPCDxwoeCFFggTIkzAMIHBCwAiAuhAscPAAzsy7vDA0UOJjyU+iPwApiSYBihTqlzJsqVKGDBjyoR5oqbNmzhP5NjJs6fPn0ALCB1KtKjRo0iJrljKtKnTp1CbFppaSIHVq1izat3KlYPXr2DDcggIADs=)";
	td[3].style.borderTop = "thin solid #000";
	td[3].style.borderRight = "thin solid #000";
	td[3].style.borderBottom = "thin solid #000";

	//Sección mensajes privados
	if (location.pathname.search ("privmsg.php") != -1){
		var form = document.getElementsByTagName ("form")[1].getElementsByTagName ("table");
		table[6].style.width = ancho;
		table[7].style.width = ancho;
		table[11].style.width = ancho;
		table[12].style.width = ancho;
		form[form.length - 1].style.width = ancho;
	}

	//Sección perfil
	if (location.pathname.search ("profile.php") != -1){
		for (var d=0; d<div.length; d++){
			if (div[d].className == "profile_form_block"){
				div[d].style.width = "99%";
			}
		}
	}

	//Sección buscar
	if (location.pathname.search ("search.php") != -1){
		table[7].style.width = ancho;
		if (location.search == "?mode=results"){
			table[6].style.width = ancho;
			table[8].style.width = ancho;
		}
	}

	//Sección juegos
	if (table[6].className == "tabla_ticker_zonaforo"){
		table[6].style.width = ancho;
	}

	//Sección Grupos
	if (location.pathname.search("groupcp.php") != -1){
		table[7].style.width = ancho;
		table[8].style.width = ancho;
		table[9].style.width = ancho;
		table[9].style.borderLeft = "solid thin #000";
		table[9].style.borderRight = "solid thin #000";
	}


	//--------------------//
	//TABLAS QUE SÍ VARIAN//
	//--------------------//	

	//Cuento los "quote" y "code" de cada mensaje
	function compruebaQuote (tabla){
		var num = 0;
		var td = tabla.getElementsByTagName ("td");
		for (var j=0; j<td.length; j++){
			if (td[j].className == "quote" || td[j].className == "code"){
				num++;
			}
		}
		return num;
	}

	//Cuento las opciones de la encuesta
	function cuentaOpciones (tablaEn){
		return (tablaEn.childNodes[1].childNodes.length)/2;
	}

	//Compruebo si un mensaje del Mercadillo tiene reputación
	function hayRepu (tablaRe){
		var rep = false;
		var divGen = 0;
		var repu = tablaRe.getElementsByTagName ("div");
		for (var i=0; i<repu.length; i++){
			if (repu[i].className == "gensmall"){
				divGen++;
			}
		}
		if (divGen == 4){
			rep = true;
		}
		return rep;
	}

	//Compruebo si el primer mensaje de la página es el primero del hilo (Mercadillo)
	function ofertaDemanda (num, rep, tablaOfDe){
		var ofDe = false;
		if (tablaOfDe.getElementsByTagName ("table").length == (4 + rep + num)){
			ofDe = true;
		}
		return ofDe;
	}

	//Compruebo si el primer mensaje del hilo tiene la tabla Valoración del trato (Mercadillo)
	function valoracionTrato (num, rep, ofDe, tablaVal){
		var val = false;
		if (tablaVal.getElementsByTagName ("table").length == (7 + rep + num)){
			val = true;
		}
		return val;
	}

	//Compruebo si el hilo tiene más de 1 página
	function hayPag (tablaPag){
		var masPag = false;
		for (var i=0; i<tablaPag.length; i++){
			if (tablaPag[i].className == "celda_paginas"){
				masPag = true;
			}
		}
		return masPag;
	}

	//Compruebo si el hilo es un reanálisis (tiene nota)
	function hayNota (tablaNota){
		var nota = 0;
		tablaNota = tablaNota.getElementsByTagName ("table");
		for (var i=0; i<tablaNota.length; i++){
			if (tablaNota[i].className == "tabla_borde_full"){
				nota = 1;
			}
		}
		return nota;
	}

	if (location.pathname.search ("viewtopic.php") != -1){
		var encuesta = document.getElementsByTagName ("form");
		var i = 8;

		//Hay encuesta
		if (table[8].className == "tabla_zonaforo"){
			if (encuesta.length == 3){
				//Encuesta donde sí he votado
				i += 4 + cuentaOpciones (table[10]);
			}else{
				//Encuesta donde no he votado
				i += 4;
			}
		}
		
		//Hay más de una página
		if (hayPag (table)){
			i++;
		}
		
		//Hilo cerrado con encuesta
		if (encuesta.length == 2 && table[8].className == "tabla_zonaforo"){
			i += 2;
		}

		//Ensancho cada mensaje del hilo
		var num, nota, rep, ofDe, val, stop = false, k = 1;
		if (location.href.search ("&m=1") != -1){
			//Mercadillo
			while (k<=15 && !stop){
				if (table[i].className == "tabla_paginasforo"){
					stop = true;
				}else{
					rep = 0;
					ofDe = 0;
					val = 0;
					table[i].style.width = ancho;
					num = compruebaQuote (table[i+1]);
					if (hayRepu (table[i])){
						rep++;
					}
					if (ofertaDemanda (num, rep, table[i])){
						ofDe++;
					}
					if (valoracionTrato (num, rep, ofDe, table[i])){
						val += 4;
					}
					i += 4 + num + rep + ofDe + val;
				}
			}
		}else{
			//Zona Foro
			while (k<=15 && !stop){
				if (table[i].className == "tabla_paginasforo"){
					stop = true;
				}else{
					table[i].style.width = ancho;
					num = compruebaQuote (table[i+1]);
					nota = hayNota (table[i+1]);
					i += 4 + num + nota;
				}
				k++;
			}
		}
	}
}

function meristationSinSecretos (){
	var spoil = document.getElementsByClassName ("spoil");
	if (spoil.length != 0){
		while (0 != spoil.length){
			spoil[0].removeAttribute ("onclick");
			spoil[0].className = "genmed";
		}
	}
}

function meristationCensured (){
	if (location.href.search ("viewforum.php") != -1){
		var plantilla = [/\+18/, /18\+/, /\+16/, /16\+/, "chocho", "Chocho", "copular", "Copular", "folla", "Folla", /ha\w+ el amor/, /hi\w+ el amor/, "masturba", "paja", "penetra", "Penetra",
						"polla", "Polla", "porn", "Porn", "puta", "Puta", "sex", "Sex", "teta", "Teta", "vagina", "Vagina"];

		var td = document.getElementsByClassName ("celda2");

		for (var i=0; i<td.length; i++){
			var j = 0;
			var stop = false;

			//Busco hilos a bloquear
			while (j<plantilla.length && !stop){
				var filtro = new RegExp (plantilla[j]);
				if (filtro.test (td[i].childNodes[3].childNodes[1].innerHTML)){
					stop = true;
					//Cambio imagen
					td[i].parentNode.childNodes[1].innerHTML = "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJOSURBVDjLpZI9T1RBFIaf3buAoBgJ8rl6QVBJVNDCShMLOhBj6T+wNUaDjY0WmpBIgYpAjL/AShJ+gVYYYRPIony5IETkQxZ2770zc2fGYpflQy2MJzk5J5M5z/vO5ESstfxPxA4erL4Zuh4pLnoaiUZdq7XAGKzRJVbIBZ3JPLJaD9c/eCj/CFgZfNl5qK5q8EhTXdxxLKgQjAFr0NK0ppOpt9n51D2gd2cmsvOElVcvOoprKvuPtriNzsY8rH+H0ECoQEg4WklY1czP8akZby51p6G3b6QAWBl43llSVTlUfuZE3NmYh9Vl0HkHSuVq4ENFNWFdC+uJ5JI/9/V2Y//rkShA1HF6yk/VxJ0f07CcgkCB7+fSC8Dzcy7mp4l9/khlUzwecaI9hT+wRrsOISylcsphCFLl1RXIvBMpYDZJrKYRjHELACNEgC/KCQQofWBQ5nuV64UAP8AEfrDrQEiLlJD18+p7BguwfAoBUmKEsLsAGZSiFWxtgWWP4gGAkuB5YDRWylKAKIDJZBa1H8Kx47C1Cdls7qLnQTZffQ+20lB7EiU1ent7sQBQ6+vdq2PJ5dC9ABW1sJnOQbL5Qc/HpNOYehf/4lW+jY4vh2tr3fsWafrWzRtlDW5f9aVzjUVj72FmCqzBypBQCKzbjLp8jZUPo7OZyYm7bYkvw/sAAFMd7V3lp5sGqs+fjRcZhVYKY0xupwysfpogk0jcb5ucffbbKu9Esv1Kl1N2+Ekk5rg2DIXRmog1Jdr3F/Tm5mO0edc6MSP/CvjX+AV0DoH1Z+D54gAAAABJRU5ErkJggg=='/>";
			
					//Elimino posible información adicional (encuesta, imagen...)
					td[i].removeChild (td[i].childNodes[1]);
			
					//Cambio estilo
					td[i].style.background = "#FFE7E7";
					td[i].childNodes[2].childNodes[1].innerHTML = "Contenido bloqueado.";
					td[i].childNodes[2].childNodes[1].removeAttribute ("href");
					td[i].childNodes[2].childNodes[1].style.color = "#464646";
					td[i].childNodes[2].childNodes[1].style.fontWeight = "normal";
					td[i].childNodes[2].childNodes[1].style.fontStyle = "italic";
					td[i].childNodes[2].childNodes[1].style.cursor = "default";
					td[i].childNodes[2].childNodes[1].style.textDecoration = "none";
					
					//Elimino posibles páginas
					if (td[i].childNodes[2].childNodes[7]){
						while (6 != td[i].childNodes[2].childNodes.length){
							td[i].childNodes[2].removeChild (td[i].childNodes[2].childNodes[6]);
						}
					}
				}
				j++;
			}
		}
	}
}

function menu (){
	function menuOpciones (){
		var capa = document.getElementById ("capaTrans");
		var menu = document.getElementById ("menu");
		
		if (GM_getValue ("meristationFirma")){
			document.getElementById ("meristationFirma").checked = "checked";
		}
		
		if (GM_getValue ("meristationBlock")){
			document.getElementById ("meristationBlock").checked = "checked";
		}
		
		if (GM_getValue ("meristation80")){
			document.getElementById ("meristation80").checked = "checked";
		}
		
		if (GM_getValue ("meristationSinSecretos")){
			document.getElementById ("meristationSinSecretos").checked = "checked";
		}
		
		if (GM_getValue ("meristationCensured")){
			document.getElementById ("meristationCensured").checked = "checked";
		}
		
		capa.style.visibility = "visible";
		menu.style.left = "50%";
	}

	function menuGuardar1 (){
		if (document.getElementById ("meristationFirma").checked){
			GM_setValue ("meristationFirma", true);
		}else{
			GM_setValue ("meristationFirma", false);
		}
		
		if (document.getElementById ("meristationBlock").checked){
			GM_setValue ("meristationBlock", true);
		}else{
			GM_setValue ("meristationBlock", false);
		}
		
		if (document.getElementById ("meristation80").checked){
			GM_setValue ("meristation80", true);
		}else{
			GM_setValue ("meristation80", false);
		}
		
		if (document.getElementById ("meristationSinSecretos").checked){
			GM_setValue ("meristationSinSecretos", true);
		}else{
			GM_setValue ("meristationSinSecretos", false);
		}
		
		if (document.getElementById ("meristationCensured").checked){
			GM_setValue ("meristationCensured", true);
		}else{
			GM_setValue ("meristationCensured", false);
		}
		
		var input = document.getElementById ("anchoInput").value;
		GM_setValue ("ancho", input + "%");
		
		window.location.reload ();
	}

	function menuGuardar2 (){
		var guardar = document.getElementById ("menuGuardar");
		guardar.style.background = "#E6EFC2";
		guardar.style.borderColor = "#C6D880";
		guardar.style.color = "#529214";
	}

	function menuGuardar3 (){
		var guardar = document.getElementById ("menuGuardar");
		guardar.style.background = "#F5F5F5";
		guardar.style.borderColor = "#DEDEDE";
		guardar.style.color = "#565656";
	}

	function menuGuardar4 (){
		var guardar = document.getElementById ("menuGuardar");
		guardar.style.background = "#529214";
		guardar.style.borderColor = "#529214";
		guardar.style.color = "#FFF";
	}

	function menuCerrar1 (){
		var capa = document.getElementById ("capaTrans");
		var menu = document.getElementById ("menu");
		
		capa.style.visibility = "hidden";
		menu.style.left = "-1000px";
		
		document.getElementById ("meristation80").checked = false;
		document.getElementById ("meristationFirma").checked = false;
		
		document.getElementById ("capaEditarAncho").style.visibility = "hidden";
	}

	function menuCerrar2 (){
		var cerrar = document.getElementById ("menuCerrar");
		cerrar.style.background = "#FBE3E4";
		cerrar.style.borderColor = "#FFD3D5";
		cerrar.style.color = "#D12F19";
	}

	function menuCerrar3 (){
		var cerrar = document.getElementById ("menuCerrar");
		cerrar.style.background = "#F5F5F5";
		cerrar.style.borderColor = "#DEDEDE";
		cerrar.style.color = "#565656";
	}

	function menuCerrar4 (){
		var cerrar = document.getElementById ("menuCerrar");
		cerrar.style.background = "#D12F19";
		cerrar.style.borderColor = "#D12F19";
		cerrar.style.color = "#FFF";
	}

	function editarAncho1 (){
		//Si la opción Meristation 80% no está activada colocar siempre 80
		if (GM_getValue ("meristation80")){
			//Coloco el ancho actual
			ancho = GM_getValue ("ancho");
			if (ancho == "100%"){
				ancho = ancho[0] + ancho[1] + ancho[2];
			}else{
				ancho = ancho[0] + ancho[1];
			}
		}else{
			ancho = 80;
		}
		
		//Fondo blanco
		var input = document.getElementById ("anchoInput");
		input.style.borderColor = "#CCC";
		input.style.background = "#FFF";
		
		document.getElementById ("anchoInput").value = ancho;
		document.getElementById ("capaEditarAncho").style.visibility = "visible";
	}

	function editarAncho2 (){
		var img = document.getElementById ("editarAncho");
		img.style.left = "6px";
		img.style.top = "3px";
	}

	function editarAncho3 (){
		var img = document.getElementById ("editarAncho");
		img.style.left = "5px";
		img.style.top = "2px";
	}

	function editarOK (){
		var input = document.getElementById ("anchoInput");
		if (isNaN (input.value) || parseInt (input.value) < 60 || parseInt (input.value) > 100){
			input.style.borderColor = "#FFD3D5";
			input.style.background = "#FBE3E4";
		}else{
			document.getElementById ("capaEditarAncho").style.visibility = "hidden";
		}
	}

	function editarNot (){
		document.getElementById ("capaEditarAncho").style.visibility = "hidden";

		//Si la opción Meristation 80% no está activada colocar siempre 80
		if (GM_getValue ("meristation80")){
			//Coloco el ancho actual
			ancho = GM_getValue ("ancho");
			if (ancho == "100%"){
				ancho = ancho[0] + ancho[1] + ancho[2];
			}else{
				ancho = ancho[0] + ancho[1];
			}
		}else{
			ancho = 80;
		}
		
		document.getElementById ("anchoInput").value = ancho;
	}
	
	if (GM_getValue ("meristationFirma", false)){
		meristationFirma ();
	}
	
	if (GM_getValue ("meristationBlock", false)){
		meristationBlock ();
	}

	if (GM_getValue ("meristation80", false)){
		meristation80 ();
	}

	if (GM_getValue ("meristationSinSecretos", false)){
		meristationSinSecretos ();
	}
	
	if (GM_getValue ("meristationCensured", false)){
		meristationCensured ();
	}

	//Botón menú
	var nuevoSpan = document.createElement ("span");
	nuevoSpan.setAttribute ("class", "genmed");
	nuevoSpan.setAttribute ("id", "botonMenuConfig");
	nuevoSpan.innerHTML = "<span class='fecha'>|</span>	<img style='position: relative; top: 4px;' alt='Menú de Configuración' src='data:image/png;base64,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'/> <a style='cursor: pointer;' class='mstop10_9'>Opciones</a>";
	var table = document.getElementsByTagName ("table")[5].getElementsByTagName ("td")[0].childNodes[23];
	table.parentNode.insertBefore (nuevoSpan, table.nextSibling);

	//Menú de opciones
	var capaTrans = document.createElement ("div");
	capaTrans.setAttribute ("id", "capaTrans");
	capaTrans.style.width = "100%";
	capaTrans.style.height = "100%";
	capaTrans.style.position = "fixed";
	capaTrans.style.top = "0";
	capaTrans.style.left = "0";
	capaTrans.style.backgroundColor = "#000";
	capaTrans.style.opacity = "0.2";
	capaTrans.style.zIndex = "100";
	capaTrans.style.visibility = "hidden";

	var menu = document.createElement ("div");
	menu.setAttribute ("id", "menu");
	menu.style.width = "400px";
	menu.style.height = "210px";
	menu.style.position = "fixed";
	menu.style.top = "50%";
	menu.style.left = "-1000px";
	menu.style.marginTop = "-150px";
	menu.style.marginLeft = "-200px";
	menu.style.zIndex = "101";
	menu.innerHTML = "<div style='width: 100%; height: 100%; background: #EEE; border: solid thin #C7C7C7; font-family: Calibri; font-size: 14px; -moz-border-radius: 5px; cursor: default;'>" +
						"<div style='position: absolute; top: 0; left: 0; width: 380px; height: 190px; border: double #757575; margin: 3px; padding: 5px; -moz-border-radius: 5px;'>" +
							"<img style='position: relative; top: 2px; margin-right: 2px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH0SURBVDjLlZPLbxJRGMX5X/xbjBpjjCtXLl2L0YWkaZrhNQwdIA4FZxygC22wltYYSltG1HGGl8nopCMPX9AUKQjacdW4GNPTOywak7ZAF/eRe/M73/nOzXUAcEwaqVTKmUgkGqIoWoIgWP/fTYSTyaSTgAfdbhemaSIej+NcAgRudDod9Pt95PN5RKPR8wnwPG/Z1XVdB8dxin0WDofBsiyCwaA1UYBY/tdqtVAqlRCJRN6FQiE1k8mg2WyCpunxArFY7DKxfFir1VCtVlEoFCBJEhRFQbFYhM/na5wKzq/+4ALprzqxbFUqFWiaBnstl8tQVRWyLMPr9R643W7nCZhZ3uUS+T74jR7Y5c8wDAO5XA4MwxzalklVy+PxNCiKcp4IkbbhzR4K+h9IH02wax3MiAYCgcBfv99/4TS3xxtfepcTCPyKgGl5gCevfyJb/Q3q6Q5uMcb7s3IaTZ6lHY5f70H6YGLp7QDx9T0kSRtr5V9wLbZxw1N/fqbAHIEXsj1saQR+M8BCdg8icbJaHOJBqo3r1KfMuJdyuBZb2NT2R5a5l108JuFl1CHuJ9q4NjceHgncefSN9LoPcYskT9pYIfA9Al+Z3X4xzUdz3H74RbODWlGGeCYPcVf4jksz08HHId6k63USFK7ObuOia3rYHkdyavlR+267GwAAAABJRU5ErkJggg=='/> <span style='width: 50px; color: #545454; font-weight: bold;'>Configuración:</span><hr/>" +
							"<input type='checkbox' id='meristation80'/> Establecer un ancho del 80%.<img id='editarAncho' style='position: relative; left: 5px; top: 2px; cursor: pointer;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ8SURBVDjLpZNLaFwFFIa/O8m0lTxm2hJHU61Omuk0M2o1aBOl1a3QkKXQlWRhXImCGxWkCxVCobhQcGFwJeJKKIgQQSFqrWBS0zRFE2xTOiZpHpMmITNzc+95dBHQlKTZeDYHDvwf5/GfwN35P1G/U/GDsXcnzLSoaq6q333U/XHP/QCJ7eJ3DmAU8415cs25QFS7d+tgG+D9pweWI4kqscdUogoiMr4bIHB3PrzynpspqoZuZu/YfywQE67Mja+KqKpqQkQY7P1y/7YdqClHG3KYG+aOY4Ga4Q6FlkJKXXE31qeHmfzqjNc1PkllaZggnHl1E6CKumFuzK7fYiVcQVwwdxJBHWbOS3uhK/0ED7SfIpV9hpXpPH99P3huEyDKxNIEzckUmYZWFqtLqOvmOL7BUVngZEsXTY88y/L1P9kTRDQ1P0TjwcOpYKsP3vrxdS+0FJgoj6FmmCuP2x1ea+0k3fYyG3NfUysHLExWWQ1DErVq/p4riCjqiqgiJhyOy/Q/fJz0kdOEs58TJO+QbGyCqMSn1X947o1vpuoB3vyh30WU9L40akbsMa3lefqOnCDV3ks48xmJpBCtZSkNX+J8HFEy++8KIkox04HiTK/doCtq4Pl0Jw8WTxPdHqRujxOuPsbsT79RX6tmv3j70s17jBSLICh/LIyQnVnnhSCD+qPMXf0EI6SyfIhbF0c5G4fkt4j/BUgsqBnFg0+RKc1SONnP3tIvTF24yNjQMqNDPzOUzXFbbednEhF+nxpBVKlenye69i3Z46dYXSzz9+VrXMgdsrmrl2tqurajlbfGKy8eqHW2ZepPdGTx5MavtYXFvp6B8Rv3+4W77h1o9knDsw0AAAAASUVORK5CYII='/>" +
							"<br/><input type='checkbox' id='meristationFirma'/> Eliminar línea de separación de la firma." +
							"<br/><input type='checkbox' id='meristationSinSecretos'/> Mostrar contenido de los spoilers." +
							"<br/><input type='checkbox' id='meristationCensured'/> Bloquear contenido (+18)." +
							"<br/><input type='checkbox' id='meristationBlock'/> Bloquear usuarios." +
							"<a id='menuGuardar' style='position: absolute; bottom: 10px; left: 58px; width: 110px; padding: 5px; text-decoration: none; border: 1px solid #dedede; background-color: #f5f5f5; color: #565656; cursor: pointer; font-weight: bold;' title='Guarda la configuración'><img style='padding: 0; margin: 0 3px -3px 18px;' src='data:image/png;base64,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'/> Guardar</a>" +
							"<a id='menuCerrar' style='position: absolute; bottom: 10px; left: 208px; width: 110px; padding: 5px; text-decoration: none; border: 1px solid #dedede; background-color: #f5f5f5; color: #565656; cursor: pointer; font-weight: bold;' title='Cancela la configuración y cierra la ventana'><img style='padding: 0; margin: 0 3px -3px 23px;' src='data:image/png;base64,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'/> Cerrar</a>" +
							"<div id='capaEditarAncho' style='width: 100px; height: 70px; position: absolute; top: 50%; left: 50%; margin-left: -50px; margin-top: -40px; visibility: hidden; -moz-border-radius: 5px; background: #FEFEF3; border: solid thin #CCC; padding-top: 5px;'>" +
								"<center>" +
									"<b>Ancho:</b>" +
									"<br/><input id='anchoInput' style='width: 29px; border: solid thin #CCC; position: relative; top: 6px; right: 3px;' type='text' value='80'/><span style='position: relative; left: 1px; top: 6px;'>%</span>" +
								"</center>" +
								"<img id='editarOK' style='position: relative; top: 15px; left: 23px; cursor: pointer;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ+roKUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSOixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQrzSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC'/>" +
								"<img id='editarNot' style='position: relative; top: 15px; left: 43px; cursor: pointer;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg=='/>" +
							"</div>" +
						"</div>" +
					 "</div>";

	var body = document.getElementsByTagName ("body")[0];
	body.appendChild (capaTrans);
	body.appendChild (menu);

	//Agrego eventos de escucha
	var escucha = document.getElementById ("menuGuardar");
	escucha.addEventListener ("click", menuGuardar1, false);
	escucha.addEventListener ("mouseover", menuGuardar2, false);
	escucha.addEventListener ("mouseout", menuGuardar3, false);
	escucha.addEventListener ("mousedown", menuGuardar4, false);
	escucha.addEventListener ("mouseup", menuGuardar2, false);

	escucha = document.getElementById ("menuCerrar");
	escucha.addEventListener ("click", menuCerrar1, false);
	escucha.addEventListener ("mouseover", menuCerrar2, false);
	escucha.addEventListener ("mouseout", menuCerrar3, false);
	escucha.addEventListener ("mousedown", menuCerrar4, false);
	escucha.addEventListener ("mouseup", menuCerrar2, false);

	escucha = document.getElementById ("editarAncho");
	escucha.addEventListener ("click", editarAncho1, false);
	escucha.addEventListener ("mousedown", editarAncho2, false);
	escucha.addEventListener ("mouseup", editarAncho3, false);

	escucha = document.getElementById ("editarOK");
	escucha.addEventListener ("click", editarOK, false);

	escucha = document.getElementById ("editarNot");
	escucha.addEventListener ("click", editarNot, false);

	escucha = document.getElementById ("botonMenuConfig");
	escucha.addEventListener ("click", menuOpciones, false);
}

//--------------- fin FUNCIONES ---------------//


//--------------- SCRIPT ---------------//

autoUpdate (56360, "1.2.1");
menu ();

//--------------- fin SCRIPT ---------------//