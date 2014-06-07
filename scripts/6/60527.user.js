// ==UserScript==
// @name           Toolbar da Ice hackers
// @namespace     http://www.orkut.com.br/Main#Community?cmm=93210312
// @include        *orkut.com/*
// @include        *orkut.com.br/*
// ==/UserScript==

var ft=function ft(){
var li=document.createElement("li");
//********************************************************************************************************//
//*****| Script criado: by raul | Link: http://www.orkut.com.br/Main#Community?cmm=55616700 |*****//
//*****||**************************************//
//*****************************************************************************************************//
li.innerHTML=" | <a href='http://www.orkut.com.br/Main#Community?cmm=93210312'>Ice hackers</a> |";
void(headerin.getElementsByTagName("ul")[1].appendChild(li));
}
ft=String(ft);
ft=ft.substring(16,ft.length-2);
script=document.createElement("script");
script.innerHTML=ft;
document.getElementsByTagName("head")[0].appendChild(script);