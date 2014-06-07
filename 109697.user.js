// ==UserScript==
// @name           PLAY DIRECT FROM EX.UA FOR DUNE
// @namespace      http://ex.ua
// @namespace      http://fex.net
// @description    Replace links for directly playing at ex.ua for Dune by IP control
// @include        about:addons
// @include        http://ex.ua*
// @include        http://www.ex.ua*
// @include        http://fex.net*
// @include        http://www.fex.net*
// ==/UserScript==

//строчки конфигурации
var DUNE_IP = "192.168.1.11"; //IP адрес Вашей Дюны
var DUNE_START_PLAY="http://"+DUNE_IP+"/cgi-bin/do?cmd=start_file_playback&media_url="; //строка удаленной команды. не меняйте

var list=document.getElementsByClassName('list')[0]; //выбираем таблицу со списком файлов
var rows = list.getElementsByTagName("tr"); //выбираем все строки в табличке

for(var i=0; i<rows.length; i++) //цикл по всем строкам
{
    var oneHref=rows[i].getElementsByTagName("a")[0]; //выбираем первую ссылку (она как раз нам и нужна)
    
    var playLink=rows[i].getElementsByTagName("a")[1]; //выбираем ссылку для проверки то, что файл - это видео

    var url = oneHref.href; // юрл в котором происходит поиск
    var regV = /get/gi;     // шаблон (ищем строку get в ссылке)
    var result = url.match(regV);  // поиск шаблона в юрл

    // Обработка результата
    if (result && playLink.innerHTML=='играть') {
        var DuneDiv = document.createElement('div');  //новый элемент див
        var DuneLink =DuneDiv.appendChild(document.createElement('a')); //будет новая ссылка
            DuneLink.id="dUneL";
            DuneLink.innerHTML= 'Play with Dune';        
            DuneLink.href=DUNE_START_PLAY+oneHref.href;
            DuneLink.target="_blank";
	    DuneDiv.appendChild(document.createElement('br'));
	    DuneDiv.appendChild(document.createElement('br'));
		
	var prNode=oneHref.parentNode;
        prNode.insertBefore(DuneDiv, oneHref);    //рисуем ссылку рядом с оригинальной

    } 
}