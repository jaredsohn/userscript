// ==UserScript==
// @name           Powrót Wojsk
// @namespace      http://www.karo1915.cba.pl/
// @description    by karo1915
// @include        http://pl*.plemiona.pl/game.php*
// ==/UserScript==

var spr0 = window.location.href;
var spr0 = spr0.substr(spr0.indexOf("een=",0)+4,12);

if (spr0 == 'info_command'){

var spr1 = document.getElementsByTagName('h2')[0].innerHTML;
var spr1 = spr1.substring(spr1.indexOf("",0), spr1.indexOf("na",0)-1);

if (spr1 == 'Atak') {

var a = 0; var b = 43; var c = 12;
while (document.getElementsByTagName('td')[b].innerHTML != 'Trwanie:') b++;

var vill0 = document.getElementsByTagName('b')[0].innerHTML;
var vill1 = document.getElementsByTagName('td')[b-1].innerHTML;
var vill1 = vill1.substring(vill1.indexOf("(",0), vill1.indexOf("</a>",0));

if (vill0 != vill1) {

var czas = document.getElementsByTagName('td')[b+1].innerHTML;
var termin = document.getElementsByTagName('td')[b+3].innerHTML;

var k_czas_h = czas.substring(czas.indexOf("",0), czas.indexOf(":",0));
var k_czas_m = czas.substr(czas.indexOf(":",0)+1,2);
var k_czas_s = czas.substr(czas.indexOf(k_czas_m,0)+3,2);

var k_termin_dd = termin.substring(0,2);
var k_termin_mm = termin.substring(3,5);
var k_termin_rr = termin.substring(6,8);
var k_termin_h = termin.substring(9,11);
var k_termin_m = termin.substring(12,14);
var k_termin_s = termin.substring(15,17);
var k_termin_small = termin.substring(termin.indexOf("<span",0));

var czas_h = k_czas_h * 1;
var czas_m = k_czas_m * 1;
var czas_s = k_czas_s * 1;

var termin_dd = k_termin_dd * 1;
var termin_mm = k_termin_mm * 1;
var termin_rr = k_termin_rr * 1;
var termin_h = k_termin_h * 1;
var termin_m = k_termin_m * 1;
var termin_s = k_termin_s * 1;

var termin_s = termin_s + czas_s;
while (termin_s > 59) { termin_m++; termin_s = termin_s - 60; }
var termin_m = termin_m + czas_m;
while (termin_m > 59) { termin_h++; termin_m = termin_m - 60; }
var termin_h = termin_h + czas_h;
while (termin_h > 23) { termin_dd++; termin_h = termin_h - 24; }

var mmm = new Array();

mmm[1] = 31;
mmm[2] = 28;
var spr2 = 2000 + termin_rr;
if (spr2 % 4 == 0) mmm[2] = 29;
if (spr2 % 10 == 0) {
if (spr2 % 400 == 0) mmm[2] = 29;
}
mmm[3] = 31;
mmm[4] = 30;
mmm[5] = 31;
mmm[6] = 30;
mmm[7] = 31;
mmm[8] = 31;
mmm[9] = 30;
mmm[10] = 31;
mmm[11] = 30;
mmm[12] = 31;

var spr3 = mmm[termin_mm];
if (termin_dd > spr3) {termin_mm++; termin_dd = termin_dd - spr3;}
if (termin_mm > 12) termin_rr++;

if (termin_dd < 10) k_termin_dd = '0'+ termin_dd; else k_termin_dd = termin_dd;
if (termin_mm < 10) k_termin_mm = '0'+ termin_mm; else k_termin_mm = termin_mm;
if (termin_rr < 10) k_termin_rr = '0'+ termin_rr; else k_termin_rr = termin_rr;
if (termin_h < 10) k_termin_h = '0'+ termin_h; else k_termin_h = termin_h;
if (termin_m < 10) k_termin_m = '0'+ termin_m; else k_termin_m = termin_m;
if (termin_s < 10) k_termin_s = '0'+ termin_s; else k_termin_s = termin_s;


document.getElementsByTagName('td')[b+2].innerHTML += '<br /><font color="#825300">PowrĂłt:</font>';
document.getElementsByTagName('td')[b+3].innerHTML += '<br /><font color="#825300">'+ k_termin_dd +'.'+ k_termin_mm +'.'+ k_termin_rr +' '+ k_termin_h +':'+ k_termin_m +':'+ k_termin_s +'</font>'+ k_termin_small +'';
}}}