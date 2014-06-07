// ==UserScript==
// @name        Kronos MCAnime - Live Feeds
// @namespace   Zeyth
// @description Auto Actualiza los Feeds [Su link Unico], Agregando las Nuevas Respuestas al Estilo de Facebook.
// @include     http://kronos.mcanime.net/perfil/*/*/actividades
// @include     http://kronos.mcanime.net/perfil/*/*/
// @exclude     http://kronos.mcanime.net/perfil/*/listaanime/
// @exclude     http://kronos.mcanime.net/perfil/*/listamanga/
// @exclude     http://kronos.mcanime.net/perfil/*/lista/
// @exclude     http://kronos.mcanime.net/perfil/*/actividades/
// @exclude     http://kronos.mcanime.net/perfil/*/aportes/
// @exclude     http://kronos.mcanime.net/perfil/*/grupo/
// @exclude     http://kronos.mcanime.net/perfil/*/info/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant		GM_XMLHttpRequest
// @version     1.7
// ==/UserScript==
//Retrasamos 2 segundos la ejecucion para evitar problemas
setTimeout(function(){
//Conseguimos la Url del Feed
	var Feed = window.location.href;
		Title = document.title; // Tomamos el Titulo Original
//Leer Cookies
function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}
//Verificamos que exista un mensaje
	if ($('div#user-feeds .pComment-box[action*="tweet"]').length > 0) {
//Ventana Activa ?
	hasfocus = false;
$('body').mouseover(function() {
	hasfocus = true;
});
 $(window).bind("blur", function() {
    hasfocus = false;
  });
  $(window).bind("focus", function() {
    hasfocus = true;
  });
//Usando HTML5 Creamos un Contenedor para Audio
	var sound = window.document.createElement('audio');
	sound.id = "sound";
	sound.src = "http://fimw.freeiz.com/feed/feed.wav";
	sound.style = "display:none;";
	sound.preload= "auto";
	container = document.body;
	container.insertBefore(sound, container.firstChild);
//Funcion para que muestre una alerta en el titulo cuando haya un nuevo mensaje
function newmessage() 
{
	if (hasfocus == false) 
	{
		var isOldTitle = true;
		var oldTitle = Title;
		var newTitle = "[!] Mensaje Nuevo";
		var interval = null;
		function changeTitle() 
		{
			document.title = isOldTitle ? oldTitle : newTitle;
			isOldTitle = !isOldTitle;
		}
		interval = setInterval(changeTitle, 700);
		$(window).focus(function () 
		{
			clearInterval(interval);
			$("title").text(oldTitle);
		});
	}
}
//Sonido ON/OFF
if (document.cookie.indexOf("feedsound") < 0) 
{
	sswitch = $('<div id="feedsound"><div id="switch" class="on" onclick="$(this).toggle(); $(\'#switch2\').toggle(); javascript:document.cookie=\'feedsound=off;path=/;expires=Tue, 2 Jun 2015 00:00:00 UTC;\'"></div><div id="switch2" class="off" onclick="$(this).toggle(); $(\'#switch\').toggle(); javascript:document.cookie=\'feedsound=on;path=/;expires=Tue, 2 Jun 2015 00:00:00 UTC;\'" style="display:none;"></div></div>');
	$('div.story-header-body:first-of-type').prepend(sswitch);
}
else 
{
	if (getCookie("feedsound") == "off") 
	{
		sswitch = $('<div id="feedsound"><div id="switch" class="on" onclick="$(this).toggle(); $(\'#switch2\').toggle(); javascript:document.cookie=\'feedsound=off;path=/;expires=Tue, 2 Jun 2015 00:00:00 UTC;\'" style="display:none;"></div><div id="switch2" class="off" onclick="$(this).toggle(); $(\'#switch\').toggle(); javascript:document.cookie=\'feedsound=on;path=/;expires=Tue, 2 Jun 2015 00:00:00 UTC;\'"></div></div>');
		$('div.story-header-body:first-of-type').prepend(sswitch);
	}
	else
	{
	sswitch = $('<div id="feedsound"><div id="switch" class="on" onclick="$(this).toggle(); $(\'#switch2\').toggle(); javascript:document.cookie=\'feedsound=off;path=/;expires=Tue, 2 Jun 2015 00:00:00 UTC;\'"></div><div id="switch2" class="off" onclick="$(this).toggle(); $(\'#switch\').toggle(); javascript:document.cookie=\'feedsound=on;path=/;expires=Tue, 2 Jun 2015 00:00:00 UTC;\'" style="display:none;"></div></div>');
	$('div.story-header-body:first-of-type').prepend(sswitch);
	}
}
function play()
{
	if (getCookie("feedsound") != "off")
	{
		soundHandle = document.getElementById('sound');
		soundHandle.play();
	}
}
//Switch
 $('<style type="text/css">#switch, #switch2 { background-position:center !important; width:28px; height:25px; cursor:pointer !important; float:right; } #switch.on { background-image:url("data:image/png;base64,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") !important; } #switch2.off { background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAZCAYAAAAiwE4nAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAJ/SURBVEiJvZZBaBNREIb/93aTbUMppKKFUFqwGiIKBVHBq5d68eRV8OrRk6weFEFp8OLNg/RSDyKxXmoLepB68VDQllaQ0rJNQ5RKxRCbNJvtvjfjYdNS0lCzG+zAg2XZed/8O/PmjWBmHKUJx7ZDO9WWl08lMhnn5NhY6GhlWIf6+vpTaVmf7oyP94f1DQWcmZxMuqurryHlbb9U6pqvViMBzXY+2pqbu3BlZOQFgDNUq4GV8ok59l+A1YWFa7G+vgny/SQrBWEYAJEAQFGAh/7S6tLSPZlITOlaLcmeBxCBtQYrBQAiCtAEgOri4lXZ1XWetfYBkDCMHjCPCikv60oF2H90pAygUYFvcrnMaDo9TZ5n7L5k399bEE37Mu8qjGSm47qDfqlkCPNgOkUzDACkBFGk9AXAitaGVgoGAOxu1AC1OtXCMLDTQXcyCRCKGUKploBmk1rDJ4pWogBMZoYOEbEEoDpRCAA+c9sRGwA0gKhN33QpOMUxIcAIap0B+ETQLRwIHSqcLZeLmUTibcqyzmlmTcwUl9IcsKyBY7FYfIdoLxAAgBDQzG3luyWwovX3J8XiIwBDCFJEAKwhyzp9K5W6frG396xi3lMl9z1HMenY9h8A8wCmG2sGwFTB8ybu5vMPcpub7+tEkAhyrUIW2QGFAODYtgLQ3D62hrPZ3883Nn6uuG7+Zn//jRPxeI9HBBVUTCTqoc27of7Lx3L52cNC4fHX7e18LGgKRlSN/7yAHduuA/i2Xq+/stfW7n8olz/XiWS8Vdtrw0LNNMPZ7HEAl9Ld3YNFz3tX0zofFhhqpnFs+xeA2RXXfekS/QgLAwBx1GNi6KmtU/sLHylEW/TXHXQAAAAASUVORK5CYII=") !important; }</style>').appendTo("head");

	//Iniciamos un loop
		function loop() {
		//Si hay más de 100 mensajes, detenemos el loop para que no se rompa el servidor lento de kronos.
		if ($('div#user-feeds ul.pComment-list > li[id^="comment-"]').length > 100) 
		{
		window.clearTimeout(loop);
		}
		else 
	{
		//Sonido ON/OFF
		if (document.cookie.indexOf("feedsound") >= 0) 
		{
			if (getCookie("feedsound") == "on")
			{
				$('#switch').show();
				$('#switch2').hide();
			}
			else
			{
			$('#switch').hide();
			$('#switch2').show();
			}
		}
		else
		{
			$('#switch').show();
			$('#switch2').hide();
		}	
		if ($('div#user-feeds ul.pComment-list > li[id^="comment-"]').length > 0) {
		//Averiguamos cual es el ultimo comentario
			var Last = $("ul.pComment-list li[id^='comment-']:last").attr("id");
		//Y su posicion en la lista
			var LastIndex = $("ul.pComment-list li#" + Last + "").index();
		}
		else {
			var Last = "comment-0000000000000";
			var LastIndex = "0";
		}
			var xhr = new XMLHttpRequest();  
				xhr.open("GET", "" + Feed + ".php", true); //Url del Feed + Extension para Compatibilidad con Todos los Navegadores
				xhr.onload = function(e) {
					var tid = setTimeout(loop, 20000);
					var respDoc = $(xhr.response);
					if ($('div#user-feeds ul.pComment-list > li[id^="comment-"]', respDoc).length > 0) {
						var lastreply   = $("ul.pComment-list li[id^='comment-']:last", respDoc).attr("id"); //Actualizamos y Tomamos el Ultimo Comentario Nuevamente
					}
					else {
						var lastreply = "comment-0000000000000";
					}
					
				//Comparamos ambos comentarios y si son distintos...
					if (lastreply != Last && lastreply != "comment-0000000000000"  && Last != lastreply) {
					//Tomamos todos los comentarios nuevos
						if (Last == "comment-0000000000000") {
							NewMessages = $("ul.pComment-list li[id^='comment-']", respDoc);
							NewMessagesFull = $("ul.pComment-list li[id^='comment-']", respDoc);
						}
						else {
							NewMessages = $("ul.pComment-list li[id^='comment-']:gt(" + LastIndex + ")", respDoc);
							NewMessagesFull = $("ul.pComment-list li[id^='comment-']", respDoc);
						}
					//Los ocultamos para que no aparezcan de golpe
						NewMessages.hide();
					//Les damos un efecto para que se vean bien
						NewMessages.fadeIn(1000);
					//Verificamos si podemos comentar o no en el mensaje
						if ($('div#user-feeds ul.pComment-list li.add-pComment').length > 0) 
						{
						//Si es asi, revisamos si hay al menos un mensaje
							if ($("ul.pComment-list li[id^='comment-']").length > 0) 
							{
								newmessage();
								play();
								$("ul.pComment-list li[id^='comment-']").replaceWith(NewMessagesFull);
								readdJS(main);
							}
							else 
							{
								newmessage();
								play();
								$("ul.pComment-list li:last").before(NewMessagesFull);
								readdJS(main);
							}
						}
					//Si no, los agregamos al final
						else {
							if ($('div#user-feeds ul.pComment-list > li').length == 0) {
								newmessage();
								play();
								$("ul.pComment-list").html(NewMessagesFull);
								readdJS(main);
							}
						else {
								newmessage();
								play();
								$("ul.pComment-list li[id^='comment-']").replaceWith(NewMessagesFull);
								readdJS(main);
							}
						}
					}
					else {
						if (lastreply == Last && lastreply != "comment-0000000000000"  && Last == lastreply) {
							var Original = $("ul.pComment-list li[id^='comment-']").length;
							var Nuevo = $("ul.pComment-list li[id^='comment-']", respDoc).length;
							var LM = $("ul.pComment-list li[id^='comment-']:last").attr("id");
							var LMN = $("ul.pComment-list li[id^='comment-']:last", respDoc).attr("id");
							NewMessagesFull = $("ul.pComment-list li[id^='comment-']", respDoc);
							if (Original != Nuevo && Nuevo > 0 && Nuevo != Original && LM.slice(8) <= LMN.slice(8)) {
								$("ul.pComment-list li[id^='comment-']").replaceWith(NewMessagesFull);
								readdJS(main);
							}
						}
					}
				}
			xhr.send(); 
	}	
		}
		var tid = setTimeout(loop, 20000);
	}
	
	function main() {
	initInteraction();
	}
	
	function addJS(nsrct) {
	var script = document.createElement("script");
	script.id = "relink";
    script.textContent = "(" + nsrct.toString() + ")();";
    document.body.appendChild(script);
	}
	
	function readdJS(nsrct) {
	element = document.getElementById('relink');
	var script = document.createElement("script");
	script.id = "relink";
	element.parentNode.removeChild(element);
	script.textContent = "(" + nsrct.toString() + ")();";
	document.body.appendChild(script);
	}

	addJS(main);
	
},2000);