// ==UserScript==
// @name          iha.ee
// @namespace     http://www.iha.ee
// @include       http://www.iha.ee/*
// @description	  Toome esile tagaplaanil olevad pildid
// ==/UserScript==  
function kaota(){
var tables = document.getElementsByTagName('td');
for(i=0;i<tables.length;i++){
if((tables[i].style.backgroundColor  == '#000000' && tables[i].style.color == '#ff0000' ) || (tables[i].style.backgroundColor == 'rgb(0, 0, 0)' && tables[i].style.color == 'rgb(255, 0, 0)') )
{tables[i].style.display="none";}
}
var pildid = document.getElementsByTagName('img');
for(i=0;i<pildid.length;i++){
if(pildid[i].src == "http://www.iha.ee/images/kjdhsidoiasdlsd10aisdl.gif"  || pildid[i].src == "http://www.iha.ee/images/kjdhsidkfp3o4o2lasdI22.gif" || pildid[i].src == "http://www.iha.ee/images/kjdhsidosiduf0isdjOias.gif" ){ pildid[i].style.display="block"; pildid[i].style.visibility = 'hidden';}
if(pildid[i].src =="http://www.iha.ee/images/asf1hf97w33rwf732.gif"){ 
var porPilt = pildid[i].parentNode.parentNode.getAttribute("background"); 
pildid[i].src = porPilt; 
}
}
}
kaota();