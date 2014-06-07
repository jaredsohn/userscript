// ==UserScript==
// @name           Pikachu.cz Fanart online icon remover
// @namespace      Pikachu.cz Fanart
// @include        http://fanart.pikachu.cz/*
// ==/UserScript==

var path = 'http://fanart.pikachu.cz/icon/online.png';
var imgs = document.getElementsByTagName('img');
for(var i = 0; i < imgs.length; i++)
	if(imgs[i].src == path) imgs[i].style['display'] = 'none';
