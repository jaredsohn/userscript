// ==UserScript==
// @name           Status membre
// @namespace      My Prizee
// @include        http://www.prizee.com/forum/index.php?/topic/*
// ==/UserScript==

enligne = "<img src='http://media.prizee.com/pz2/forum/public/style_images/ShodowImage/user_green.png' alt='L&#039;utilisateur est en ligne' title='L&#039;utilisateur est en ligne' />";
horsligne = "<img src='http://media.prizee.com/pz2/forum/public/style_images/ShodowImage/user_off.png' alt='L&#039;utilisateur est hors-ligne' title='L&#039;utilisateur est hors-ligne' />"; 
enligne2 = "--><img src='http://media.prizee.com//pz2/forum/public/style_images/ShodowImage/user_green.png' alt='L&#039;utilisateur est en ligne' title='L&#039;utilisateur est en ligne' /><!--";
horsligne2 = "--><img src='http://media.prizee.com//pz2/forum/public/style_images/ShodowImage/user_off.png' alt='L&#039;utilisateur est hors-ligne' title='L&#039;utilisateur est hors-ligne' /><!--"; 

window.addEventListener("load", function(event) { while(document.getElementById('content').innerHTML.search(enligne)!=-1){document.getElementById('content').innerHTML=document.getElementById('content').innerHTML.replace(enligne,enligne2);}
while(document.getElementById('content').innerHTML.search(horsligne)!=-1){document.getElementById('content').innerHTML=document.getElementById('content').innerHTML.replace(horsligne,horsligne2);} }, false);