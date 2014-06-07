// ==UserScript==
// @name        profession.hu gyors kitöltés
// @namespace   http://www.profession.hu/*
// @description gyors jelentkezes a profession.hu weboldalon
// @include     http://www.profession.hu/jelentkezes/*
// @version     1
// @grant       none
// ==/UserScript==
var pos = document.getElementsByClassName("position");
var pos1 = pos[0].innerHTML;
var pos2 = pos[1].innerHTML;
var nev = document.getElementById("name").value;
var tel = "TELEFONSZAMOD";
window.setTimeout(settie,1000)

function settie()
{
document.getElementById("tel").value=tel;
document.getElementById("kiserolevel").value = "Tisztelt "+pos2+"! \nCsatoltan küldöm a szakmai önéletrajzomat az Önök által meghirdetett "+pos1+" pozícióra. \nTisztelettel: "+nev;
}