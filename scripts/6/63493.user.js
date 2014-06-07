// ==UserScript==
// @name           Mediafire Search
// @namespace      www.google.com
// @include        http://www.google.*
// @include        *google*
// ==/UserScript==


arama = "";
if(rsCom){arama+=" site:mediafire.com/download.php?";}
if(rsDe) {arama+=" site:mediafire.com/download.php?";}
sBtn = document.getElementsByName("btnI")[0]; sBtn.type = "button"; sBtn.value = "Search Mediafire";
sBtn.setAttribute("onClick", "if(document.getElementsByName('q')[0].value!=''){document.getElementsByName('q')[0].value+='"+ arama +"';document.forms.f.submit();}");