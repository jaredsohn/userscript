// ==UserScript==
// @name           boulet
// @namespace      boulet
// @include        http://www.t411.me/*
// @author exystence
// ==/UserScript==


for (i=0; i<document.links.length ; i++){ 
  var src = document.links[i]; 
  if(/thanks/.test(src)){ 
    var id = src.href.match(/id=[0-9]*/) ; 
    src.href = "http://up.moiboulet.eu/up.php?"+id ; 
  }
}