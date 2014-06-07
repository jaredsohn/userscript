// ==UserScript==
// @name           Expreszo-achtergrond fix
// @namespace      http://userscripts.org/users/72899
// @include        http://expreszo.nl/forum/*
// @include        http://www.expreszo.nl/forum/*
// @description    Dit script haalt de feestachtergrond van Expreszo weer weg.
// ==/UserScript==

var bgImg = "url('http://expreszo.nl/templates/christian/images/achterschuin_groen_main.png')";

// forum
document.body.style.backgroundImage = bgImg;

// chat
var cnt = document.getElementById("content");
if (cnt) cnt.style.backgroundImage = bgImg;