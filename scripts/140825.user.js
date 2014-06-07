// ==UserScript==
// @name        No Machines
// @namespace   No Machines
// @description Supprime les machines du profil sur le site jeuxvideo.com
// @include     http://www.jeuxvideo.com/moncompte/moncompte.php
// @version     1
// ==/UserScript==

for (i=0; i<=13; i++) document.getElementsByName("machine__" + i)[0].value = "   ";