// ==UserScript==
// @name        Kronos MCAnime - Ultimas Respuestas
// @namespace   Zeyth
// @description Agrega el cuadro de "Ultimas Respuestas" a la portada de feeds en Kronos y lo auto actualiza cada 20 segundos.
// @include     http://kronos.mcanime.net/
// @include     http://kronos.mcanime.net/portada
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant		GM_XMLHttpRequest
// @version     1.4
// ==/UserScript==

//Retrasamos 1 segundo la ejecucion para evitar problemas
setTimeout(function(){
	var style="#last_replies ul {list-style: none outside url(\'http://static1.mcanime.net/kronos/images/icons/box_arrow.gif\'); margin-left: 17px;} #last_replies ul li {margin-bottom:5px;} #last_replies ul li .sm {display:block !important;}";
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
	var lastreplies   = $("div.last-replies", respDoc);
	lastreplies.hide();
	$("#main-ad").after ('<div id="last_replies" class="side-box r5"></div>');
	$("#last_replies").html (lastreplies);
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
		var lastreplies   = $("div.last-replies", respDoc);
		var currentreplies = $("div.last-replies");
		
		var lastrepliesthread = $("div.last-replies div.cs-body ul li:first a", respDoc).attr("href");
		var currentrepliesthread = $("div#last_replies div.last-replies div.cs-body ul li:first a").attr("href");

		if (lastrepliesthread.slice(0, 24) != currentrepliesthread.slice(0, 24))
		{
			lastreplies.hide();
			$("#last_replies").html (lastreplies);
			lastreplies.fadeIn(1000);
		}
	}
	xhr.send();
	}
	var tid = setTimeout(loop, 20000);
},2000);