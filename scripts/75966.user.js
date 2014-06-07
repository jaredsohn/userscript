// ==UserScript==
// @name           Philly.com Hide Comments
// @namespace      http://userscripts.org/users/boourns
// @description    Hides all the horrible user comments on Philly.com news articles.
// @version        1.0
// @include        http://*.philly.com/*
// ==/UserScript==
var usuarioviado = "miguelito";
var x =  $(".autor");

for(y=0;y<x.length;y++){

    if(x[y].children[0].text==usuarioviado){
      $(x[y]).remove();
    }

}