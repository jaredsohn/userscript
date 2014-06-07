// ==UserScript==
// @name           Quel serveur Ikariam ? + No Ambrosia-Facebook
// @namespace      Exagone313 - http://www.elouworld.tk/
// @description    Permet d'afficher le nom du serveur en évidence. Supprime les images de l'ambroisie et de Facebook.
// @include        s*.ikariam.com*
// @include        http://s*.ikariam.com*
// ==/UserScript==

// on récupère le nom du monde en utilisant le titre de la page
var sname=document.title.split(" - ");
var count=sname.length-1;
sname=sname[count];
sname=sname.split(" ")[1];

// on met le nom du monde à la place de l'image de l'ambroisie
var ambrosia = document.getElementById("globalResources").getElementsByClassName("ambrosia")[0];
ambrosia.innerHTML = "<span style=\"font-size:20pt;font-weight:bold;\">Erreur</span>"; // si pas de sname
ambrosia.innerHTML = "<span style=\"font-size:20pt;font-weight:bold;\">"+sname+"</span>"; // on met le nom du serveur dans ambrosia
ambrosia.title = "Monde "+sname;

// on enlève le bouton Facebook
var fb = document.getElementById("facebook_button");
fb.innerHTML = null;

// on enlève les + à côté des conseillers
var plus = document.getElementsByClassName("plusteaser");
for(i=0;i<plus.length;i++){
plus[i].setAttribute("style", "background: none;");
plus[i].href = null;
plus[i].title = null;
plus[i].innerHTML = null;
plus[i].class = null;
}

// on enlève les élément de la mmonetbar
var bar = document.getElementById("mmonetbar");
bar.innerHTML = null;

// on enlève happyhour
var hph = document.getElementById("btnHappyHour");
hph.parentNode.removeChild(hph);