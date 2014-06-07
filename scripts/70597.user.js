// ==UserScript==
// @name           Google MK
// @namespace      ###
// @description    Napravi go Google so poubav skin :)
// @include        http://www.google.com/*
// ==/UserScript==
document.getElementById('logo').src='http://i47.tinypic.com/152gl5f.gif';
document.body.bgColor='#d8b68a';
document.getElementById('footer').innerHTML='';
document.getElementById('ghead').style.backgroundColor='#cba677';
document.getElementById('sbl').style.backgroundColor='#d8b68a';
counted=0;
a=document.getElementsByTagName('a');
while(counted<a.length){
counted++;
a[counted].style.color='#000000';
}