// ==UserScript==
// @name          test
// @namespace     test
// @description   reponde
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://www.jeuxvideo.com/messages-prives/message.php?idd=*
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new.replace("http://image.jeuxvideo.com/pics/forums/bt_forum_repondre.gif);
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2014/01/1388566289-sans-titre-11.png' />");

document.body.innerHTML=chaine;