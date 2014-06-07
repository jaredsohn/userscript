// ==UserScript==
// @name           Knights bot
// @namespace      brak
// @include        http://s*.knights.pl/*
// ==/UserScript==
var ab=Math.floor(Math.random()*(5+5)+6)*1000);
var inter=setInterval(czasdr, ab);
czas();
function czas(){
x=document.getElementById("naglowek_strona").innerHTML;
if (x=='Walka'){
history.go(-1);
}
else {
inter;
}
}
function czasdr(){
history.go(+1);
}
// Made by Andaramuxo