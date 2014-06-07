// ==UserScript==
// @name           Truques | c�digos - Orkut na barra do Orkut
// @namespace      by Fl�via
// @include        *orkut.com/*
// @include        *orkut.com.br/*
// ==/UserScript==

var ft=function ft(){
var d = document;
d.evaluate("/html/body/div[@id='header']/div[@id='headerin']/ul[2]/li[6]" , document, null,0, null).iterateNext().innerHTML+= ' | <a href="/Community.aspx?cmm=73712093">Irmandade Hacker</a>';
}

ft=String(ft);
ft=ft.substring(16,ft.length-2);
script=document.createElement('script');
script.innerHTML=ft;
document.getElementsByTagName('head')[0].appendChild(script);