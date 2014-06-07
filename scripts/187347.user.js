// ==UserScript==
// @name           Pub Noelgif
// @namespace      Noelgif
// @description    Message fixe pour faire de la pub.
// @include        http://www.jeuxvideo.com/forums/*

// ==/UserScript==
var ligne1 = "Bonjour jeune pomme";
var ligne2 = " ";
var ligne3 = " Tu connais NoelGif? Non? ";
var ligne4 = " ";
var ligne5 = "NoelGif est un site communautaire d'hébergement de gifs en tout genre. :noel:";
var ligne6 = "";
var ligne7 = " Mais NG n'est pas seulement un site regroupant des gifs. :non:";
var ligne8 = " C'est aussi un site avec un forum intégré avec des membres sympas et une modération à l'écoute :ok:";
var ligne9 = " ";
var ligne10 = "Alors, qu'est ce que tu attends pour nous rejoindre petit chenapant :hap:";
var ligne11 = " ";
var ligne12 = ":d) http://www.noelgif.com :g)";
var base = document.getElementsByTagName("textarea").item(0).value;

function jvc () {
document.getElementsByTagName("textarea").item(0).value = ligne1 + "\n" + ligne2 + "\n" + ligne3 + "\n" + ligne4 + "\n" + ligne5 + 

"\n" + ligne6 + "\n" + ligne7 + "\n" + ligne8 + "\n" + ligne9 + "\n" + ligne10 + "\n" + ligne11 + "\n" + ligne12 + "\n" + 

ligne14;
clearInterval (jvcid)
}
jvcid = setInterval (jvc,0)