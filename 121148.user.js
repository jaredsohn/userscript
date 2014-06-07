// ==UserScript==
// @name           PLAY DIRECT FROM EX.UA FOR DUNE
// @namespace      http://ht-bet.org
// @description    Replace links for directly playing at ex.ua for Dune by IP control
// @include        about:addons
// @include        http://ex.ua*
// @include        http://www.ex.ua*
// ==/UserScript==

//строчки конфигурации
var DUNE_IP = "192.168.1.11"; //IP adress of Dune player
var DUNE_START_PLAY="http://"+DUNE_IP+"/cgi-bin/do?cmd=start_file_playback&media_url="; //init string

var list=document.getElementsByClassName('list')[0]; //выбираем таблицу со списком файлов
var rows = list.getElementsByTagName("tr"); //выбираем все ссылки в табличке

for(var i=0; i<rows.length; i++) //цикл по всем ссылкам
{
    var oneHref=rows[i].getElementsByTagName("a")[0]; //выбираем первую ссылку (она как раз нам и нужна)
        
    var url = oneHref.href; // юрл в котором происходит поиск
    var regV = /get/gi;     // шаблон (ищем строку get в ссылке)
    var result = url.match(regV);  // поиск шаблона в юрл

    // Обработка результата
    if (result) {
		var DuneDiv = document.createElement('div');  //новый элемент див
		var DuneLink =DuneDiv.appendChild(document.createElement('a')); //будет новая ссылка
			DuneLink.id="dUneL";
			DuneLink.innerHTML='Play with Dune';		
			DuneLink.href=DUNE_START_PLAY+oneHref.href;
			DuneLink.target="_blank";
		var prNode=oneHref.parentNode;
		prNode.insertBefore(DuneDiv, oneHref);	//рисуем ссылку рядом с оригинальной
    } 
}