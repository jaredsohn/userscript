// ==UserScript==
// @name          Wrzuta.pl - pobieranie audio
// @namespace     http://nerdblog.pl/
// @description   Umożliwia pobieranie plików mp3 z Wrzuta.pl (wersja z dn. 6.03.2011)
// @include       http://*.wrzuta.pl/audio/*
// @include       http://wrzuta.pl/audio/*
// @copyright     Michał "D4rky" Matyas, http://nerdblog.pl ; BSD License
// ==/UserScript==

function makeithappen()
{
var xmlFile = document.location.href.replace('audio','xml/plik') + '/l/o/l/';
var req = new XMLHttpRequest();
req.open('GET', xmlFile, true);

req.onreadystatechange = function (aEvt) {
if(document.getElementById('pobierz') == undefined) 
{ 
var audio = document.createElement('a');
audio.id = 'pobierz';
regex=/<fileId><!\[CDATA\[(.*)\]\]><\/fileId>/g;
var fileId = regex.exec(req.responseText);
audio.href = fileId[1];
var txtNode = document.createTextNode("Pobierz utwór");
audio.appendChild(txtNode);
document.getElementById('file_info_media').appendChild(audio);
}
}
req.send(null);
}

makeithappen();