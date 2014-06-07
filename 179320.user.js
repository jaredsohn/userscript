// ==UserScript==
// @name       OUEFA kicker Replace
// @namespace  http://jacksgraphicworld.co.de/
// @version    0.1
// @include      http://ouefa.de.tl/*
// @include      http://www.ouefa-forum.com/*
// @copyright  2013+, jackcone
// ==/UserScript==

var imgs = document.getElementsByTagName('img');
var x = 0;
function replace(){
    while(imgs[x].src!="http://s14.directupload.net/images/121201/sej2ztom.png")
    {
        x++;
    }
    imgs[x].src="http://jacksgraphicworld.co.de/Grafiken/OUEFA/Website/kicker.png";
}

replace();