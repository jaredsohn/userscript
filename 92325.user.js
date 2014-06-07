// ==UserScript==
// @name           RandomChristmasBann
// @author         SB
// @license        Public
// @namespace      SB
// @include        http://forum.*.grepolis.*/*
// ==/UserScript==

var i=0;

while (i==0) // Si il y a des bannières que vous ne souhaitez pas, ajoutez à gauche " || i==x " où x est le n° de la bannière. Par ex, si vous souhaitez avoir toute les banns sauf la 1, la 2 et la 3, mettez "while (i==0 || i==1 || i==2 || i==3).
{
    i=Math.floor(Math.random()*19);
}
    
document.getElementsByTagName("img")[0].src="http://team.grepolis.fr/banners/"+i+".jpg";