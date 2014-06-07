// ==UserScript==
// @name        Rapidshare redirector
// @namespace   http://rapidshare.com/
// @description Auto click, redirect
// @include     http://rapidshare.com/*
// @include     http://*.rapidshare.com/*
// @copyright   2009, Perberos (perberos@gmail.com)
// @license     (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version     3.1
// @author      German Perugorria (Perberos)
// @homepage    http://kokuban.com.ar/
// ==/UserScript==

// for code, goto line 110
// Este código fue escrito con la intensión de ser de utilidad. No con la
// intension de aprobecharse del sistema.
/* 2010 Octubre 1, Viernes: Esto ya no funciona con el nuevo sitio web. 

var obj = document.getElementsByTagName('input');

for (var i = obj.length - 1; i >= 0; i--)
{
	if (obj[i].value == "Free user")
	{
		obj[i].click();
	}
}

function the_handle_error_function(e)
{
	if (e.innerHTML == "Error")
	{
		// manejo de error
		var innerhtml = e.parentNode.innerHTML;

		if (innerhtml.indexOf("The file could not be found.") != -1)
		{
			document.title = 'File not found';
		}
		else if (innerhtml.indexOf("The download session has expired") != -1)
		{
			document.title = 'Session expired';
			// redireccion con el link correcto
			var a = e.parentNode.getElementsByTagName('a');
			top.location.href = a[0].href;
		}
		else if (innerhtml.indexOf("is already downloading a file.") != -1)
		{
			document.title = 'Waiting 10 minutes';
			// redireccion con timeout
			setTimeout("top.location.href=top.location.href;", 600000); // 10m
		}
		else if (innerhtml.indexOf('You have reached the download limit') != -1)
		{
			var strpat = 'Or try again in about ';
			// obtenemos la cantidad de minutos que hay que esperar
			var i = innerhtml.indexOf(strpat) + strpat.length;
			var mins = innerhtml.substr(i, innerhtml.indexOf(' minutes.') - i);
			// solo por si las dudas
			if (Math.round(mins) <= 0)
				return;
			
			document.title = 'Waiting ' + mins + ' minutes';
			
			setTimeout("top.location.href=top.location.href;", 60000 * mins);
		}
	}
}

var h1 = document.getElementsByTagName('h1');

for (var i = h1.length - 1; i >= 0; i--)
{
	try
	{
		the_handle_error_function(h1[i]); // goto line 23
	}
	catch (E)
	{
		continue;
	}
}

function superfunction()
{
	if (c == undefined)
		return;

	if (!document.dlf)
	{
		var sec = parseInt(c) + 1;
		document.title = "Still " + sec + " seconds"; // c + 1 = "c1"
		setTimeout("superfunction();", 500);
		return;
	}
	document.title = 'Done';

	// hacemos submit!
	document.dlf.submit();
}

// Ephiphany method working
//window.addEventListener("load", superfunction, false);
// Attach hack method
var obj = document.createElement("script");
obj.type = "application/javascript";
obj.innerHTML = superfunction+'superfunction();';
document.body.appendChild(obj);
*/
// Bloody mess!

// mi estres!
// esta funcion solo se ejecuta con la cuenta regresiva (la corta)
function hypertensionfunction()
{

	var obj = document.getElementById("downloadpage_wait4freedl_wrapper");
	
	if (obj.style["display"] == "block")
	{
		hyperfunction();
	}
	else if (document.seconds > 0)
	{
		var minutes = Math.floor(document.seconds / 60);
		var seconds = document.seconds % 60;
		
		var title = "Still ";
		
		if (minutes)
		{
			title += minutes + " m ";
		}
		
		document.title = title + seconds + " s";

		document.seconds--;
		// self reply
		setTimeout(hypertensionfunction, 1000);
	}
	else
	{
		document.title = "Done";
	}
}

function visualfunction()
{
	// hack para js_download-timer_counter
	// solo lo aplico por que ambos cuadros pueden existir al mismo tiempo, pero
	// solo un cuadrado que contiene el elemento, indica si se muestra o no.
	// rapidshare es algo desordenado.
	var obj = document.getElementById("js_download-timer_counter");
	
	if (obj)
	{
		// este elemento contiene el cuadro de cuenta regresiva. (el largo)
		var element = document.getElementById("js_download-timer-box");
		// y si esta oculto, entonces pasamos a utilizar el otro cuadro de
		// cuenta regresiva (el corto)
		if (element.style['display'] == 'none')
		{
			// obtengo solo una vez el valor, como referencia al timeout
			// aunque rapidshare ya hace redirecciones solito
			var seconds = parseInt(obj.innerHTML);
			document.seconds = seconds;
			setTimeout(hypertensionfunction, 1000);
			return;
		}
	}

	// el segundero es de referencia! al parecer el propio counter del sitio
	// funciona medio loco. Se ejecuta dos veces... que descuido.
	if (document.seconds > 0)
	{
		// debido a que el timer está medio loco, y es distinto al obtenido por
		// el sitio... Asi que no voy a tocar mucho esto...
		var minutes = Math.floor(document.seconds / 60);
		var seconds = document.seconds % 60;
		
		var title = "Still ";
		
		if (minutes)
		{
			title += minutes + " m ";
		}
		
		document.title = title + seconds + " seconds";

		document.seconds--;
		
		setTimeout(visualfunction, 1000);
	}
	else
	{
		document.title = "Done";
	}
}

// Esta funcion solo extrae el texto para formatear el tiempo restante del
// primer cuadro de espera (el largo).
function hyperfunction()
{
	// se detecta la cuenta regresiva
	var obj = document.getElementById("js_wait4freedl-timerbox");
	
	if (obj && obj.innerHTML != '13:55') // ugly hack...
	{
		// el formato es XX:YY, pero aveces se aprecia un texto parecido a...
		// 0:0:-123
		var arraydelay = obj.innerHTML.split(":");
		// es por eso que solo chequeamos que el split devuelva dos valores
		if (arraydelay.length == 2)
		{
			// si no se hace parseInt, aveces javascript toma el valor como
			// texto, y los pega en vez de sumarlos.
			var minutes = parseInt(arraydelay[0]);
			var seconds = parseInt(arraydelay[1]);
			// se necesita esperar! y como es algo limitado los nombres de
			// espacio, utilizo el documento para almacenar las variables.
			if (seconds > 0 || minutes > 0)
			{
				document.seconds = seconds + minutes * 60;
				setTimeout(visualfunction, 1000);
			}
		}
	}
	else
	{
		var obj = document.getElementById("downloadpage_wait4freedl_wrapper");
		
		if (obj.style["display"] == "none")
		{
			var element = document.getElementById("js_download-timer_counter");
			var seconds = parseInt(element.innerHTML);

			document.seconds = seconds;
			setTimeout(hypertensionfunction, 1000);
		}
		else
		{
			setTimeout(hyperfunction, 1999);
		}
	}
}

// Esta funcion es la primera en ejecutarse.
// deriba a otra si se encuentra el elemento js_free-download_btn en lapsos de
// casi dos segundos
function superfunction()
{
	// se detecta el boton de descargar
	var obj = document.getElementById("js_free-download_btn");
	
	if (obj)
	{
		hyperfunction(); // extrae el tiempo
		location.href = obj.href; // so simple!
	}
	else
	{
		// reintentamos buscar luego de 2 segundos aproximadamente.
		setTimeout(superfunction, 1999);
	}
}

superfunction(); // start here
