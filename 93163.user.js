// ==UserScript==
// @name           Google Megavideo Search
// @namespace      www.google.com
// @include        http://www.google.*
// @include        *google*
// ==/UserScript==


// Script adattato e riscritto dal team sGaming2k 
// Per info visitare il nostro canale youtube.

// rapidshare.com'da arama yapmak istiyorsan?z de?erini true yap?n?z.
// change value to true if you want to search rapidshare.com
rsCom = true;

// scriptin rapidshare.de'da arama yapmas?n? istiyorsan?z de?erini true yap?n?z.
// change value to true if you want to search rapidshare.de
rsDe  = true;

// a?a??daki kodlar? de?i?tirmeyiniz
// do not change codes below
arama = "";
if(rsCom){arama+=" intext:www.megavideo.com/?v=";}
if(rsDe) {arama+=" intext:www.megavideo.com/?v=";}
sBtn = document.getElementsByName("btnI")[0]; sBtn.type = "button"; sBtn.value = "Ricerca Film Megavideo";
sBtn.setAttribute("onClick", "if(document.getElementsByName('q')[0].value!=''){document.getElementsByName('q')[0].value+='"+ arama +"';document.forms.f.submit();}");