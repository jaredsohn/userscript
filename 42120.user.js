// ==UserScript==
// @name           Registrierung überflüssig machen!
// @namespace      http://www.morgil.de
// @include        http://www.e-wallpapers.de/wallpaper-pics-gallery-*
// ==/UserScript==

var id = window.location.href.match(/gallery\-(\d*)/)[1];
var as = document.getElementsByTagName("a");
for(var i=0;i<as.length;i++){
 if(as[i].innerHTML.match(/(\d*)\_tn\.jpg/)) {
  as[i].setAttribute("href", "http://img.e-wallpapers.de/"+id+"/"+as[i].innerHTML.match(/(\d*)\_tn\.jpg/)[1]+".jpg");
  as[i].setAttribute("onClick","");
 }
}