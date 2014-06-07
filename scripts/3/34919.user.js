// ==UserScript==
// @name           Galava - Structures
// @namespace      Galava - Structures
// @description    Galava - Structures
// @include        http://galava.net/provinces?id=*&page=structures
// ==/UserScript==
buildings = new Array("housing", "farms", "mills", "mines", "walls", "roads");
for(i=0;i<=5;i++)
{
    var anzahl = document.getElementsByName("BUILD["+buildings[i]+"]")[0].parentNode.nextSibling.nextSibling.lastChild.data;
    document.getElementsByName("BUILD["+buildings[i]+"]")[0].value=anzahl;
}
