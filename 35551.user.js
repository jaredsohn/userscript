// ==UserScript==
// @name          Bei-uns.de Zeigt Ungelesene Beitraege
// @description   Aendert das Symbol von ungelesenen Forenbeiträgen
// @include       *bei-uns.de/*/forum*
// @include       http://www.bei-uns.de/forum
// ==/UserScript==

//
// By Madboy 2008
//

var image;

image = document.getElementsByTagName('img');
var anz = image.length;
var b = new Array();

for( var ii = 1; ii < anz; ii++)
{
    var pffad = document.getElementsByTagName('img')[ii].src;
    
    if(pffad == 'http://media-pe.bei-uns.de/s/icon/pn_ungelesen.gif'){
      b.src = 'http://thepartyside.th.funpic.de/pics/miranda/ungelesen.gif';
      document.images[ii].src = b.src;
    }
}