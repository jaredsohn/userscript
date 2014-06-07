// ==UserScript==
// @name           Compartir en Taringa - Youtube
// @version        1
// @author         Alvaro Gonzalez Copado
// @description    Comparte videos de youtube en taringa sin ese molesto copy/paste
// @include        http://youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*&*
// @include        http://*.youtube.com/watch?v=*
// @include        http://*.youtube.com/watch?v=*&*
// ==/UserScript==

var wyxx = location.href.split("&");
var url=wyxx[0];

document.getElementById('watch-headline-container').innerHTML += '<style>#button {margin-top: -3.1em; position: relative; left: 31em;} #watch-actions {height: 48px!important;}</style><div id="button"><a href="http://www.taringa.net/widgets/share.php?url='+ url +'&body=v%C3%ADa%20%40wyxx" id="link" title="Compartir en Taringa!" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" target="_blank"><img src="http://o1.t26.net/img/share-6.png"></a></div>';