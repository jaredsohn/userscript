// ==UserScript==
// @name          text
// @namespace      videoszoofilia.org
// @include        http://*videoszoofilia.org/*
// ==/UserScript==

var pagina = document.location.href;
url = pagina.split("/")[4];
var completa = "http://www.videoszoofilia.org/media/videos/flv/"+url+".flv"
var btn=document.createElement("BUTTON");
document.body.appendChild(btn);
btn.onclick=function(){window.open(completa)};