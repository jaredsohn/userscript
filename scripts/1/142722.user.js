// ==UserScript==
// @name        Badoo Encontros
// @grant none
// @namespace   http://software.sitesbr.net
// @description Adiciona accesskey no Sim Talvez Não
// @include     *badoo.com/encounters/*
// @version     3
// ==/UserScript==
d=document;
l=d.links;
var c_nt=0;
for( var i=0; i < l.length; i++){
  obj = l[i].parentNode;
  if( obj.getAttribute("class") && obj.getAttribute("class").match(/btn\-yes/)){
      l[i].setAttribute("onkeyup", "setTimeout(function(){location.reload();500});"); l[i].setAttribute("accesskey", "s"); c_nt++;
      }
  if( obj.getAttribute("class") && obj.getAttribute("class").match(/btn\-mb/)){
      l[i].setAttribute("onkeyup", "setTimeout(function(){location.reload();500});"); l[i].setAttribute("accesskey", "t"); c_nt++;
      }
  if( obj.getAttribute("class") && obj.getAttribute("class").match(/btn\-no/)){
      l[i].setAttribute("onkeyup", "setTimeout(function(){location.reload();500});"); l[i].setAttribute("accesskey", "n"); c_nt++;
      }
  if( c_nt == 3) break;
}

h1s = document.getElementsByTagName('h1')[0];
h1s.style.background = "#ffc";
h1s.style.border = "1px solid #f66";
h1s.style.padding= "5px";
    
  