// ==UserScript==
// @name           Google Megaupload Search
// @namespace      www.google.com
// @include        http://www.google.*
// @include        *google*
// ==/UserScript==


// For more tricks visit - http://www.orkut.com/CommunityJoin.aspx?cmm=42397345
// Amar_Bunty - amardeep_19882003@yahoo.com

// megaupload.com'da arama yapmak istiyorsan?z de?erini true yap?n?z.
// change value to true if you want to search rapidshare.com
rsCom = true;

// scriptin rapidshare.de'da arama yapmas?n? istiyorsan?z de?erini true yap?n?z.
// change value to true if you want to search rapidshare.de
rsDe  = false;

// a?a??daki kodlar? de?i?tirmeyiniz
// do not change codes below
arama = "";
if(rsCom){arama+=" intext:megaupload.com/files";}
if(rsDe) {arama+=" intext:megaupload.de/files";}
sBtn = document.getElementsByName("btnI")[0]; sBtn.type = "button"; sBtn.value = "Search Megaupload";
sBtn.setAttribute("onClick", "if(document.getElementsByName('q')[0].value!=''){document.getElementsByName('q')[0].value+='"+ arama +"';document.forms.f.submit();}");