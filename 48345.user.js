// ==UserScript==
// @name           Abstract Theme 1
// @author         Demon King
// @include        http://www.orkut.com/Main#*
// ==/UserScript==

var ft=function ft(){
var d = document;
var foto = "http://www.imageof.net/images/wallpapers/Abstract_Brush-51610.jpeg";


d.getElementsByTagName("body")[0].background=foto;
}

ft=String(ft);
ft=ft.substring(16,ft.length-2);
script=document.createElement("script");
script.innerHTML=ft;
document.getElementsByTagName("head")[0].appendChild(script);