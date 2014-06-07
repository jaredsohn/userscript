// ==UserScript==
// @name           Google mediafire Search
// @namespace      www.google.com
// @include        http://www.google.*
// @include        *google*
// ==/UserScript==



rsCom = true;

rsDe  = false;

arama = "";
if(rsCom){arama+=" intext:mediafire.com/download.php?";}
if(rsDe) {arama+=" intext:mediafire.com/download.php?";}
sBtn = document.getElementsByName("btnI")[0]; sBtn.type = "button"; sBtn.value = "Search mediafire";
sBtn.setAttribute("onClick", "if(document.getElementsByName('q')[0].value!=''){document.getElementsByName('q')[0].value+='"+ arama +"';document.forms.f.submit();}");