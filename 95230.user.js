// ==UserScript==
// @name           kam bo
// @namespace      brak
// @include        http://s*.knights.pl/*
// ==/UserScript==

var inter=setInterval(czasdr, 12000);
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

var inter=setInterval(czasdr, 15000);
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
