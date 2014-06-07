// ==UserScript==
// @name           Kronos MCAnime - Episodios Recientes
// @namespace   Zeyth
// @description Coloca los episodios recientes al estilo del viejo MCAnime
// @include     http://kronos.mcanime.net/
// @include     http://kronos.mcanime.net/portada
// @include     http://kronos.mcanime.net/fansubs
// @include     http://kronos.mcanime.net/manga_enlinea
// @version     2.1
// ==/UserScript==

//Cambiamos el estilo a uno parecido al de la V1 y ocultamos el cuadro original de Kronos
var style="#animesrecientes > .series-releases > div {padding:0px !important;} #animesrecientes { margin: 0 auto 0 auto !important; border: 1px solid #638D20 !important; margin-bottom: 4px !important; margin-top:0px !important; padding:0px !important; background-color: #EDF7DC !important; } #animesrecientes > .series-releases {  margin: 0 auto 0 auto !important; margin-top:0px !important; padding:0px !important; } #animesrecientes > .series-releases > div { margin:5px !important;} #animesrecientes > .mcbox-title { background-color:#292F21 !Important; color:#BCE27F !Important; font-weight:bold !Important; padding:3px 0px 4px 5px !Important; margin:0px !important;} #animesrecientes > .series-releases > .anime-releases { margin-bottom:0px !important;} #animesrecientes > .series-releases > .manga-releases {margin-top:-5px !important;} #animesrecientes legend { background-color:#292F21; color:#BCE27F; padding:3px 10px; margin-left:7px; margin-top:-9px !important; font-weight:bold; width:124px !Important;} #animesrecientes {margin:15px auto 8px auto !important;} .daily-releases, #animesrecientes h4.mcbox-title {display:none !important;} #animesrecientes {width:960px !important; margin:10px auto 5px auto !important;} html body div#wrapper div#container div#sidebar div.side-box {margin-top:10px !important;}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);

//Seleccionamos las ultimas publicaciones
	var allElements, thisElement;
	allElements = document.evaluate("//FIELDSET[@class='daily-releases r3']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allElements.snapshotLength; i++) 
	{
		thisElement = allElements.snapshotItem(i);
	//Conseguimos la lista completa de series
		var xhr = new XMLHttpRequest();  
		xhr.open("GET", "http://kronos.mcanime.net/publicaciones/todas/", true);    
		xhr.onload = function(e) 
		{
		//Creamos un contenedor
			var animes = document.createElement("div");
			animes.setAttribute("id", "animesrecientes");
			var container = document.getElementById('wrapper');
		//Y colocamos la nueva lista
			animes.innerHTML = '<legend>&Uacute;ltimas Publicaciones</legend>' + xhr.response;
			container.insertBefore(animes, container.firstChild);
		}  
		xhr.send();  
	}