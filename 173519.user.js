// ==UserScript==
// @name           Message auto v2
// @namespace      JVF , follox
// @description    Message
// @include        http://www.jeuxvideo.com/*
// ==/UserScript==

var ligne1 = "Ce jeu est pas mal, malgrès quelques bugs le jeu reste pas mal. J'ai joué que quelques heures de ma vie à ce jeu mais je trouve qu'il est pas mal c'est pour ça que je met la note de 20/20 à ce jeu.";
var ligne2 = ".";
var ligne3 = "Cube";


function jvc () {
document.getElementsByTagName("textarea").item(0).value = ligne1 + "\n" + ligne2 + "\n" + ligne3;
clearInterval (jvcid)
}
jvcid = setInterval (jvc,0)