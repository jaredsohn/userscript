// ==UserScript==
// @name           American flag Google 
// @description    Changes the current google logo to the 4th of july logo  
// @version        1.0
// @include        http://www.google.*/
// @include        http://www.google.*/webhp*
// @include        http://www.google.com/*
// ==/UserScript==

function gf() 
{
document.evaluate("//img[@src]",document,null,7,null).snapshotItem(0).src = "http://www.google.com/logos/july4th02.gif";
}
window.addEventListener('load', gf, false);