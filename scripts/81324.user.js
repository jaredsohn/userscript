// ==UserScript==
// @name           Google Megaupload Search
// @namespace      www.google.com
// @include        http://www.google.*
// @include        *google*
// ==/UserScript==


// per altri script tipo questo contattatemi alla mia email yahoo 
// firefilo2 - firefilo97@yahoo.it

// megavideo.com'da arama yapmak istiyorsan?z de?erini true yap?n?z.
// change value to true if you want to search megaupload.com
rsCom = true;

// scriptin megaupload.de'da arama yapmas?n? istiyorsan?z de?erini true yap?n?z.
// change value to true if you want to search megaupload.de
rsDe  = false;

// a?a??daki kodlar? de?i?tirmeyiniz
// do not change codes below
arama = "";
if(rsCom){arama+=" intext:megaupload.com/?d=";}
if(rsDe) {arama+=" intext:megaupload.com/?d=";}
sBtn = document.getElementsByName("btnI")[0]; sBtn.type = "button"; sBtn.value = "Ricerca File Megaupload";
sBtn.setAttribute("onClick", "if(document.getElementsByName('q')[0].value!=''){document.getElementsByName('q')[0].value+='"+ arama +"';document.forms.f.submit();}");