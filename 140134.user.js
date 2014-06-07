// ==UserScript==
// @name           Taringa's & Sociaphy widget on YouTube
// @version        1
// @author         Alvaro Gonzalez Copado (@wyxx,@okay)
// @description    Comparte videos de youtube en taringa sin ese molesto copy/paste // Share videos on socialphy via YouTube without Copy/Paste.
// @include        http://youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*&*
// @include        http://*.youtube.com/watch?v=*
// @include        http://*.youtube.com/watch?v=*&*
// @include        https://youtube.com/watch?v=*
// @include        https://youtube.com/watch?v=*&*
// @include        https://*.youtube.com/watch?v=*
// @include        https://*.youtube.com/watch?v=*&*
// ==/UserScript==

var wyxx = location.href.split("&");
var url=wyxx[0];

document.getElementById('watch-headline-container').innerHTML += '<style>#button {margin-top: -3.1em; float:letf;} #button a{margin-right:5px;} #watch-actions {height: 42px!important; margin-bottom:3px}</style><div id="button"><a href="http://www.taringa.net/widgets/share.php?url='+ url +'&body=v%C3%ADa%20%40wyxx" id="link" title="Compartir en Taringa!" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" target="_blank"><img src="http://o1.t26.net/img/share-6.png"></a><a href="http://www.socialphy.com/widgets/share.php?url='+ url +'&body=via%20%40okay" id="link" title="Share on Sociaphy" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" target="_blank"><img src="http://of1.net/img/share-6.png" width="22px" height="22px"></a></div>';