// ==UserScript==
// @name           Google megaupload Search
// @namespace      www.google.com
// @include        http://www.google.*
// @include        *google*
// ==/UserScript==


rsCom = true;

rsDe  = false;

arama = "";
if(rsCom){arama+=" intext:megaupload.com/?d=";}
if(rsDe) {arama+=" intext:megaupload.com/?d=";}
sBtn = document.getElementsByName("btnI")[0]; sBtn.type = "button"; sBtn.value = "Search megaupload";
sBtn.setAttribute("onClick", "if(document.getElementsByName('q')[0].value!=''){document.getElementsByName('q')[0].value+='"+ arama +"';document.forms.f.submit();}");