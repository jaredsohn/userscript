// ==UserScript==
// @name           myGully Google Skript
// @namespace      www.google.com
// @include        http://www.google.*
// ==/UserScript==


Var = " site:mygully.com"; //ändert das myGully.com in jede andere beliebige Webseite

sBtn = document.getElementsByName("btnI")[0]; sBtn.type = "button"; 

sBtn.value = "myGully Suche"; //Das zwischen den "" steht auf dem Google Button

sBtn.setAttribute("onClick", "if(document.getElementsByName('q')[0].value!=''){document.getElementsByName('q')[0].value+='"+ Var +"';document.forms.f.submit();}");