// ==UserScript==
// @name           xmoto - neulogin
// @namespace      xmoto - neulogin
// @description    xmoto - neulogin
//                 Für Admins vom Raum No0bz
// @include        http://xmoto.tuxfamily.org/index.php*
// ==/UserScript==
try{
x=document.getElementsByClassName("room")[0].textContent;
}
catch (e){
window.location.href="http://xmoto.tuxfamily.org/index.php?page=all_rooms";
document.getElementById("fidroom").value= 1221;
document.getElementsByClassName("formulaire")[0].submit();
}
finally{
if(window.location.href=="http://xmoto.tuxfamily.org/index.php"){
window.location.href="http://xmoto.tuxfamily.org/index.php?page=highscoresvalidation";
}
}