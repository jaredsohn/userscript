// ==UserScript==
// @name           Lycos iQ Werbeentferner
// @namespace      Lycos iQ
// @description    Entfernt die Werbung von Lycos IQ
// @include        http://iq.lycos.de/* 


var banner;
banner = document.getElementById("myNewOV");
if(banner)
{
banner.setAttribute('style', 'height: 0; margin: 0; padding: 0 0 0 0; border-width: 0 0 0 0; visibility:collapse;', 0)
}

var banner;
banner = document.getElementById("myOV");
if(banner)
{
banner.setAttribute('style', 'height: 0; margin: 0; padding: 0 0 0 0; border-width: 0 0 0 0; visibility:collapse;', 0)
}


// ==/UserScript==