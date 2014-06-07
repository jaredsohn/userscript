// ==UserScript==
// @name           Google Rapidshare Search
// @namespace      www.google.com
// @include        http://www.google.*
// @include        *google*
// ==/UserScript==

rsCom = true;

rsDe  = false;


arama = "";
if(rsCom){arama+=" intext:rapidshare.com/files";}
if(rsDe) {arama+=" intext:rapidshare.de/files";}
sBtn = document.getElementsByName("btnI")[0]; sBtn.type = "button"; sBtn.value = "Search Rapidshare";
sBtn.setAttribute("onClick", "if(document.getElementsByName('q')[0].value!=''){document.getElementsByName('q')[0].value+='"+ arama +"';document.forms.f.submit();}");