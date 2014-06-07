// ==UserScript==
// @name           Estranho Api.MyBrowserBar.Com (Version 0.5)
// @namespace      KingRider
// @include        http://api.mybrowserbar.com/*
// @include        http://www.the-cloak.com/Cloaked/+cfg=15/*
// ==/UserScript==

var recortado  = "http://api.mybrowserbar.com/cgi/errors.cgi?q=";
var recortado2 = "&type=dns&";
var host = window.location.href;
var tamanho = host.indexOf(recortado);
var total = host.length;
var atual = window.location.href;
var final = host.indexOf(recortado2);
var texto = atual.substring(tamanho+recortado.length,final)

botao = document.getElementsByTagName('INPUT');
for (i = 0; i < botao.length; i++) {
  if (document.getElementsByTagName('INPUT')[i].value == "Start Surfing") {
    document.getElementsByTagName('INPUT')[i].click();
  }
}

if (recortado.length >= 20 && host.indexOf("http://www.the-cloak.com/Cloaked/+cfg=15/http")) {
  window.location=("http://www.the-cloak.com/Cloaked/+cfg=15/" + unescape(texto));
} else {
  window.location=("http://www.google.com/tisp/notfound.html");
}