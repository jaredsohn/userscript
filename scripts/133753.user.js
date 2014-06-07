// ==UserScript==
// @name           emeraude silvermo
// @namespace      emeraude silvermo
// @include        http://www.jeuxvideo.com/profil/silvermo*
// ==/UserScript==

var cdv = document.getElementById("cdv_profil");
if(cdv.className == "saphir edition")
cdv.className = "emeraude edition";

else if(cdv.className == "saphir")
cdv.className = "emeraude";