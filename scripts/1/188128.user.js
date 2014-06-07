// ==UserScript==
// @name          Travian T4.2 Botones

// @description   Activa los accesos directos a Mercado, Cuartel, Establo y Taller
// @run-at         document-end
// @include        http://*ts*.travian.*/*
// @include        http://ts*.travian.*.*/*
// @include        http://*tx*.travian.*/*
// @include        http://tx*.travian.*.*/*
// @include        http://finals.travian.com/*
// @grant          none  
// ==/UserScript==

function foo(){
var mas = document.getElementsByClassName("dialog brown premiumFeaturePackage premiumFeaturePlus")[0];
if (mas !== undefined) {
      mas.style.visibility = "hidden"; 
    } else {
 setTimeout(foo, 10);}
}

function Capt (){
f = document.getElementsByClassName("tip")[0].parentElement;
ff = f.getElementsByClassName("title elementTitle")[0];
h = f.children[0];
a = h.getElementsByClassName("tip-contents")[0].children[0];
b = a.innerHTML;
aa = h.getElementsByClassName("tip-contents")[0].children[1];
 if (b == "Links directos"){
a.innerHTML = "Ir ";
aa.innerHTML = "";
f.style.top = "82px";
f.style.left = "800px";
f.style.opacity = "1";
f.style.visibility = "visible";
f.children[0].className = "tip";
f.children[0].children[0].className = "tip-container";
f.children[0].children[0].style.width = "50px";
f.children[0].children[0].children[0].className = "tl";
}
 setTimeout(Capt, 10);
}


(function E (){

Iestablo = document.getElementsByClassName('layoutButton stableBlack gold'); 
Iestablo[0].id= "Establo"; 
Iestablo[0].onclick = function () {window.location="build.php?&gid=20";foo ();};
if  (Iestablo[0].className == "layoutButton stableBlack gold disabled "){
Iestablo[0].className = "layoutButton stableWhite green disabled";}
else {
Iestablo[0].className = "layoutButton stableWhite green";}

Imercado = document.getElementsByClassName('layoutButton marketBlack gold');  
Imercado[0].id= "Mercado";
Imercado[0].onclick = function () {window.location="build.php?&gid=17";foo ();};
if  (Imercado[0].className == "layoutButton marketBlack gold disabled"){
Imercado[0].className = "layoutButton marketWhite green disabled";}
else {
Imercado[0].className = "layoutButton marketWhite green";}

Icuartel = document.getElementsByClassName('layoutButton barracksBlack gold');  
Icuartel[0].id= "Cuartel";
Icuartel[0].onclick = function () {window.location="build.php?&gid=19";foo ();};
if  (Icuartel[0].className == "layoutButton barracksBlack gold disabled"){
Icuartel[0].className = "layoutButton barracksWhite green disabled";}
else {
Icuartel[0].className = "layoutButton barracksWhite green";}


ITaller = document.getElementsByClassName('layoutButton workshopBlack gold');  
ITaller[0].id= "Taller";
ITaller[0].onclick = function () {window.location="build.php?&gid=21";foo ();};
if  (ITaller[0].className == "layoutButton workshopBlack gold disabled "){
ITaller[0].className = "layoutButton workshopWhite green disabled";}
else {
ITaller[0].className = "layoutButton workshopWhite green";}

setTimeout(Capt, 10);

})();







