// ==UserScript==
// @name           Retour au Rubis
// @namespace      Retour au Rubis
// @include        http://www.jeuxvideo.com/profil/*
// ==/UserScript==

var cdv = document.getElementById("cdv_profil");
if(cdv.className == "saphir" || cdv.className == "emeraude")
cdv.className = "rubis";