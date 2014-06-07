// ==UserScript==
// @name        Kronos MCAnime - Auto Actualizar Ultimos Temas
// @namespace   Zeyth
// @description	Actualiza automaticamente el cuadro de "Ultimos Temas de la Comunidad" en la portada de Feeds en Kronos cada 20 segundos.
// @include     http://kronos.mcanime.net/
// @include     http://kronos.mcanime.net/portada
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant		GM_XMLHttpRequest
// @version     1.4
// ==/UserScript==

//Retrasamos 20 segundos la ejecucion
setTimeout(function(){

	var style="#sidebar .side-box.r5:last-of-type ul {list-style: none outside url(\'http://static1.mcanime.net/kronos/images/icons/box_arrow.gif\'); margin-left: 17px;} #sidebar .side-box.r5:last-of-type ul li {margin-bottom:5px;} #sidebar .side-box.r5:last-of-type ul li .sm {display:block !important;}";
	var head=document.getElementsByTagName("HEAD")[0];
	var el=window.document.createElement('link');
	el.rel='stylesheet';
	el.type='text/css';
	el.href='data:text/css;charset=utf-8,'+escape(style);
	head.appendChild(el);

//Agregamos las Respuestas
	var xhr = new XMLHttpRequest();  
	xhr.open("GET", "http://kronos.mcanime.net/portada2.php", true);    
	xhr.onload = function(e) 
	{
	var respDoc     = $(xhr.response);
	var lastreplies   = $("div.last-topics", respDoc);
	lastreplies.hide();
	$("#sidebar .side-box.r5:last-of-type").html (lastreplies);
	lastreplies.fadeIn(1000);
	}
	xhr.send();

//Y las actualizamos cada 20 sec
	function loop()
	{
	var xhr = new XMLHttpRequest();  
	xhr.open("GET", "http://kronos.mcanime.net/portada2.php", true);    
	xhr.onload = function(e) 
	{
		var tid = setTimeout(loop, 20000);
		var respDoc     = $(xhr.response);
		var lastreplies   = $("div.last-topics", respDoc);
		var currentreplies = $("div#sidebar .side-box.r5 div.last-topics");
		
		var lastrepliesthread = $("div.last-topics div.cs-body ul li:first a", respDoc).attr("href");
		var currentrepliesthread = $("div#sidebar .side-box.r5 div.last-topics div.cs-body ul li:first a").attr("href");

		if (lastrepliesthread != currentrepliesthread)
		{
			lastreplies.hide();
			$("div#sidebar .side-box.r5:last-of-type").html(lastreplies);
			lastreplies.fadeIn(1000);
		}
	}
	xhr.send();
	}
	var tid = setTimeout(loop, 20000);
},20000);