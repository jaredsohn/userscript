// ==UserScript==
// @name       Magiccards.info resize
// @namespace  Dla MtgNews.
// @version    0.1
// @description  enter something useful
// @match      http://magiccards.info/proxy*
//@include	   magiccards.info/proxy*
// @copyright  2012+, Murakami, Czybi.
// ==/UserScript==

var karta = document.getElementsByTagName('img');

for (var x=0; x<karta.length; x++) 
{

    karta[x].style.width = "222px";
    karta[x].style.height = "319px";
    karta[x].style.border = "solid";
    karta[x].style.borderWidth = "0px";
    karta[x].style.borderColor='black';
}