// ==UserScript==
// @name           Automatikus bejelentkezés
// @namespace      bejelentkezes
// @include        http://www.kertbirodalom.hu/*
// @include        http://kertbirodalom.hu/*
// ==/UserScript==

//Vigyázz az idézőjelekre: NE töröld ki őket, mert nem lesz jó
//A csillagok helyére írd az adataid

//A szervered száma | példa: 2
var szerver="*"

//A felhasználóneved
var felhasznalonev="*"

//A jelszavad kódolva
var jelszo="*"

//GFX állapot | ha kell akkor on, ha nem akkor off
var gfx="*"

//Most már nem kell ezt módosítani
location.href = "http://s" + szerver + ".kertbirodalom.hu/logw.php?pass=" + jelszo + "&USR=" + felhasznalonev + "&gfx_aktiv=" + gfx + "&server=server" + szerver