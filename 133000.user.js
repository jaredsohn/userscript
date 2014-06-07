// ==UserScript==
// @name           diamant painarguer
// @namespace      diamant painarguer
// @include        http://www.jeuxvideo.com/profil/skelletor543.html
// ==/UserScript==

var cdv = document.getElementById("cdv_profil");
if(cdv.className == "argent" || cdv.className == "or")
cdv.className = "emeraude";