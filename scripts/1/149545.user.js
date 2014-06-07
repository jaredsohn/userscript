// ==UserScript==
// @name       JVUltra
// @version    1.0
// @description  Ajoute de nombreuses fonctionnalités à jeuxvideo.com
// @copyright  Tonek 2012
// @include http://www.jeuxvideo.com/*
// ==/UserScript==

var pseudo = document.getElementById('compte').getElementsByTagName('strong')[0].innerHTML;
alert ('Coucou ' + pseudo + " ! :hap: Bon sérieux télécharge pas n'importe quelle extension ça peut être dangereux, attend un éclaireur ou analyse le code source. Voilà fais gaffe la prochaine fois, que ce script te serve de leçon ! :hap:");

     var a = document.createElement('a');
    var img = document.createElement('img');
 
	img.setAttribute('src', 'http://image.noelshack.com/fichiers/2012/40/1349281001-sans-titre.jpg');
	a.setAttribute('href', 'http://image.noelshack.com/fichiers/2012/40/1349281001-sans-titre.jpg');
    a.appendChild(img);
	document.getElementById('recherche').appendChild(a);