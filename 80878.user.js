// ==UserScript==
// @name           Google Megavideo Search
// @namespace      www.google.com
// @include        http://www.google.*
// @include        *google*
// ==/UserScript==


// per altri script tipo questo contattatemi alla mia email yahoo 
// firefilo2 - firefilo97@yahoo.it

// megavideo.com'da arama yapmak istiyorsan?z de?erini true yap?n?z.
// change value to true if you want to search rapidshare.com
rsCom = true;

// scriptin rapidshare.de'da arama yapmas?n? istiyorsan?z de?erini true yap?n?z.
// change value to true if you want to search rapidshare.de
rsDe  = false;

// a?a??daki kodlar? de?i?tirmeyiniz
// do not change codes below
arama = "";
if(rsCom){arama+=" intext:megavideo.com/?d=";}
if(rsDe) {arama+=" intext:megavideo.com/?d=";}
sBtn = document.getElementsByName("btnI")[0]; sBtn.type = "button"; sBtn.value = "Ricerca Film Megavideo";
sBtn.setAttribute("onClick", "if(document.getElementsByName('q')[0].value!=''){document.getElementsByName('q')[0].value+='"+ arama +"';document.forms.f.submit();}");