// ==UserScript==
// @name        Kronos MCAnime - Autoexpander Animes/Mangas Recientes
// @namespace   Zeyth
// @description Auto expande el cuadro de Animes y Mangas Recientes que se encuentra a la derecha. 
// @include     http://kronos.mcanime.net/
// @include     http://kronos.mcanime.net/portada
// @include     http://kronos.mcanime.net/fansubs
// @include     http://kronos.mcanime.net/manga_enlinea
// @version     2.0
// ==/UserScript==

//Seleccionamos las ultimas publicaciones
	var allElements, thisElement;
	allElements = document.evaluate("//FIELDSET[@class='daily-releases r3']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allElements.snapshotLength; i++) 
	{
		thisElement = allElements.snapshotItem(i);
	//Cambiamos el estilo a uno parecido al de la V1
		var style=".daily-releases > .series-releases > div {padding:0px !important;} .daily-releases { margin: 0 auto 0 auto !important; border: 1px solid #638D20 !important; margin-bottom: 4px !important; margin-top:0px !important; padding:0px !important; background-color: #EDF7DC !important; } .daily-releases > .series-releases {  margin: 0 auto 0 auto !important; margin-top:0px !important; padding:0px !important; } .daily-releases > .series-releases > div { margin:5px !important;} .daily-releases > .mcbox-title { background-color:#292F21 !Important; color:#BCE27F !Important; font-weight:bold !Important; padding:3px 0px 4px 5px !Important; margin:0px !important;} .daily-releases > .series-releases > .anime-releases { margin-bottom:0px !important;} .daily-releases > .series-releases > .manga-releases {margin-top:-5px !important;}";
		var head=document.getElementsByTagName("HEAD")[0];
		var el=window.document.createElement('link');
		el.rel='stylesheet';
		el.type='text/css';
		el.href='data:text/css;charset=utf-8,'+escape(style);
		head.appendChild(el);
	//Conseguimos la lista completa de series
		var xhr = new XMLHttpRequest();  
		xhr.open("GET", "http://kronos.mcanime.net/publicaciones/todas/", true);    
		xhr.onload = function(e) 
		{			
		//Y las reemplazamos
			thisElement.innerHTML = xhr.response;
		}  
		xhr.send();  
	}