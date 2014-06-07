// ==UserScript==
// @name           diamant painarguer
// @namespace      diamant painarguer
// @include        http://www.jeuxvideo.com/profil/21font21.html
// ==/UserScript==

var cdv = document.getElementById("cdv_profil");
if(cdv.className == "carton" || cdv.className == "bronze" || cdv.className == "argent" || cdv.className == "or")
cdv.className = "saphir";