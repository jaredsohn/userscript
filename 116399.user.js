// ==UserScript==
// @name		UJ Color por defecto
// @namespace	uj-default-color
// @description	Inserta un color por defecto al escribir mensajes en UniversoJuegos
// @include		http://foro.universojuegos.*/*
// @include		http://www.foro.universojuegos.*/*
// @version		1.02
// @author		Salvatore
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require		http://sizzlemctwizzle.com/updater.php?id=116399
// ==/UserScript==

/**
 * Color escogido, con # al comienzo
 */
var color;

/**
 * Opciones del script
 */
var autoColorear; //insertar o no el bbcode en las areas de texto automaticamente.
var negrita; //[b]
var cursiva; //[i]

function main()
{
	loadOptions();
	//ahora que sabemos el color deseado, lo insertamos en las areas de texto del foro
	addColorBBCode();
	addOptionsButton();
}

function loadOptions()
{
	color = GM_getValue("color", "#9E9574");
	autoColorear = GM_getValue("autoColorear", false);
	negrita = GM_getValue("negrita", false);
	cursiva = GM_getValue("cursiva", false);
}

function addColorBBCode()
{
	var textarea = $('#message-box textarea.inputbox');
	var insertar = "";
	if ( (textarea.val() == "") && (autoColorear) )
	{
		if (negrita && cursiva) insertar+= "[b][i] Mensaje [/i][/b]";
		else if (negrita) insertar+= "[b] Mensaje [/b]";
		else if (cursiva) insertar+= "[i] Mensaje [/i]";
		else insertar+= " Mensaje ";
		textarea.val('[color='+color+']'+insertar+'[/color]');
	}
	
	addBBCodeButton();
}

function addBBCodeButton()
{
	var colorInverso = invertirColor(color);
	var b,i; var actions = "";
	if (negrita)
	{
		b = "bold";
		actions = 'bbstyle(0);';
	}
	else
	{
		b = "normal";
	}
	if (cursiva)
	{
		i = "font-style:italic;";
		actions += 'bbstyle(2);';
	}
	else
	{
		i = "";
	}
	//insertamos un boton que al pulsarlo agregue al textarea el bbcode con el color deseado
	$('#format-buttons').append('<input type="button" title="'+color+'" onclick="bbfontstyle(\'[color='+color+']\', \'[/color]\'); '+actions+' return false;" style="font-weight:'+b+'; '+i+' width: 30px; background-color:'+color+'; color:'+colorInverso+'" class="button2" value="'+color+'">');
}

/**
 * Dado un #color en hexadecimal, devuelve el inverso
 */
function invertirColor(rgb)
{
	rgb = rgb.substring(1); //quitamos el #
	var R,G,B;
	if (rgb.length==3) //si el color esta en formato abreviado, duplicamos valores
	{
		R = rgb.substring(0,1);
		G = rgb.substring(1,2);
		B = rgb.substring(2);
		rgb = R+R + G+G + B+B;
	}
	//invertimos valores
	R = 255 - parseInt("0x"+rgb.substring(0,2));
	G = 255 - parseInt("0x"+rgb.substring(2,4));
	B = 255 - parseInt("0x"+rgb.substring(4));
	
	//retoque para los grises intermedios cuyo inverso es casi identico
	if ( (R>0x70 && R<0x90) && (G>0x70 && G<0x90) && (B>0x70 && B<0x90) )
		return "#FFF";

	//pasamos los valores a strings
	var resultado = R.toString(16) + G.toString(16) + B.toString(16);
	return "#"+resultado;
}

function addOptionsButton()
{
	//insertamos el enlace junto al resto de botones BBCode
	var link = window.document.createElement('a');
	link.setAttribute('href', '#');
	link.textContent = 'Opciones';
	link.style.color = "orange";
	link.setAttribute('onclick', 'return false');
	link.style.padding = "3px";
	link.id = "link-opciones";
	link.addEventListener('click', showOptions, false);
	$('#format-buttons').append(link);
}
function showOptions()
{
	var hr = '<hr style="margin:8px 0;border-top-color:#111;border-bottom-color:#444;border-width:1px 0;border-style:solid;display:block;">';
	//si quedo abierta una capa anterior, la borramos.
	var posibleCapaAnterior = $('#uj-script-overlay');
	if (posibleCapaAnterior.length) posibleCapaAnterior.remove();
	//insertamos la capa de opciones
	var o = '<div id="uj-script-overlay" style="display:none;position:absolute;z-index:90;background-color:rgba(0,0,0,0.7);"></div>';
	$('body').prepend(o);
	var overlay = $('#uj-script-overlay');
	overlay.css('width', $(window).width() );
	overlay.css('height', /*$(window).height()*/ "100%" );
	overlay.css('position', "fixed");
	//link de cierre
	var aCerrar = window.document.createElement('a');
	aCerrar.setAttribute('href', '#');
	aCerrar.setAttribute('onclick', 'return false');
	aCerrar.addEventListener('click', hideOptions, false);
	imgCierre = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAAnFBMVEX////4YWP/dXjyS07/dXj9bXD6a234YWP4XWD2WVv2VFfsOTzoLzHmKSvkISP2VFf0TE/vREftPT/iHB72WVvvREf0TE//hon/gYX/fYD/e33/dXj/cXP9bXD/a236a23/Zmb4YWP4XWD/Wl32WVv/VVj2VFf3VFb0TE/yS072SUvvREfuQELtPT/sOTzrMzXoLzHnLC/mKSvkISPh2jkWAAAANHRSTlMAESIiMzMzMzMzMzMzMzNERERERHd3qv//////////////////////////////////////xnOhPwAAAAlwSFlzAAALEgAACxIB0t1+/AAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAAAJJJREFUGJVtzNcagjAMBtC498TVZWktFaEVx/u/mx2gXJibPyf5EoBWders9mOOd6toQgbBgh96wQjRobPkWO79huIj5qPgMt5ycqJCctIYQDCEMVFfAyh8yWjLE0UyN5j9LChl56udR0+dlbnnaV4tajNtAKoyLZ5LN1hroa3fvEzxSHyzudl4+44G2DbfE/hTH+8DDcV0Y3OAAAAAAElFTkSuQmCC";
	aCerrar.setAttribute('style', 'position:absolute;top:0;right:0;width:16px;height:16px;background:url('+imgCierre+') no-repeat scroll 0 0 transparent');
	
	if (autoColorear) ch = "checked"; else ch = "";
	if (negrita) ch2 = "checked"; else ch2 = "";
	if (cursiva) ch3 = "checked"; else ch3 = "";
	var contenido = '<h4>Opciones del script UJ color por defecto</h4><br/><input type="checkbox" name="autoColorear" id="autoColorear" '+ch+'> Insertar el bbcode automáticamente<br/>';

	contenido += 'Color preferido (ejemplo: #882255): <input type="text" name="color" id="color" value="'+color+'" style="float:right;width:80px;">' + hr;
	
	contenido += '<input type="checkbox" name="negrita" id="negrita" '+ch2+'> <b>Negrita</b>' + hr;
	contenido += '<input type="checkbox" name="cursiva" id="cursiva" '+ch3+'> <i>Cursiva</i>' + hr;
	
	var guardar = document.createElement("a");
	//guardar.text = LANG.guardar; //daba problemas en chrome
	guardar.appendChild(document.createTextNode("Guardar"));
	guardar.setAttribute('href', '#');
	guardar.setAttribute('onclick', 'return false');
	guardar.addEventListener('click', saveOptions, false);
	guardar.setAttribute('style', 'margin-top:10px;margin-left:240px;display:block;');

	var opciones = document.createElement("div");
	opciones.id = "uj-script-opciones";
	overlay.append(opciones);
	var divOpciones = $('#uj-script-opciones');
	divOpciones.css({'position':'relative', 'margin':'150px auto auto' , 'width':'300px' , 'background-color':'#2f2f2f' , 'border':'1px solid #666' , 'color':'orange' , 'padding':'20px' , 'text-align':'left'});
	divOpciones.html(contenido);
	divOpciones.append(guardar);
	
	$('#uj-script-opciones').append(aCerrar);
	overlay.show('slow');
}
function hideOptions()
{
	$('#uj-script-overlay').remove();
}

function saveOptions()
{
	color = $('#color').val();
	GM_setValue("color", color);
	autoColorear = $('#autoColorear').is(':checked');
	GM_setValue("autoColorear", autoColorear);
	negrita = $('#negrita').is(':checked');
	GM_setValue("negrita", negrita);
	cursiva = $('#cursiva').is(':checked');
	GM_setValue("cursiva", cursiva);
	
	hideOptions();
}

window.addEventListener('load',main,true);