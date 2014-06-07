// ==UserScript==
// @name           hojko Presun logo sutaze
// @namespace      hojko
// @include        http://www.hojko.com/*
// @date           01-12-2010
// @author         c-ice
// @version        1.0
// ==/UserScript==


{
    document.body.onload = new function(){
        var pole = document.getElementById("contentrow").getElementsByTagName("center")[0].getElementsByTagName("a");
        var temp = pole[pole.length - 1].cloneNode(true);
        //pole[pole.length - 1].parentNode.removeChild(pole[pole.length - 1]);
        document.getElementById("contentrow").removeChild(document.getElementById("contentrow").getElementsByTagName("center")[0]);
        document.body.querySelectorAll('#logo-right tr')[0].appendChild(document.createElement("td").appendChild(temp));
    }
}