// ==UserScript==
// @name        Lepsza Fotka.pl
// @namespace   ad1n.tk
// @description Usprawnia przeglądanie serwisu Fotka.pl
// @include     http://www.fotka.pl/profil/*
// @include     *.fotka.pl/profil/*
// @grant       none
// @version     1
// ==/UserScript==


var div = document.createElement("div");
div.style.color = "black";
div.style.marginLeft = "auto";
div.style.marginRight = "auto";


var next = document.getElementById("photosNext");
next.onclick= foteczki;




window.onload = foteczki;

function foteczki(){
var lista_fotek = "";
 var fotki = document.getElementsByClassName('ajaxBG');
 for (var i=0;i<fotki.length-1;i++) {
 var fotka = fotki[i].src;
 fotka = fotka.replace("amin","a");
 fotka = fotka.replace("72_p","800_s");
 lista_fotek=lista_fotek + "<img src='" + fotka + "'></img><br>";
}
 div.innerHTML = lista_fotek;
 
 
var objTo = document.getElementById('profile-grid')
objTo.appendChild(div)
}    
    
//document.body.appendChild(div);
//}         




document.getElementById("viewersBox").style.display="none";
document.getElementById("wyrozniona-bottom-box").style.display="none";
document.getElementById("profile-background").style.background="none";
document.getElementById("footer").style.display="none";



