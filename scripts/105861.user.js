// ==UserScript== 
// @name KASKUS Signature Auto Paste 
// @description Pasang signature di kaskus secara Otomatis TAnpa Membebani ServerKaskus Sendiri :D 
// @include http://www.kaskus.us/* 
// @include http://kaskus.us/* 
// ==/UserScript==

var signature = "[center]kunjungi thread ane lainnya[/center]";
var signature = "[center][URL="http://www.kaskus.us/showthread.php?t=9354269"]Gadis yang rela menjual keperawanan demi Iphone4[/URL][/center]";
var signature = "[center][URL="http://www.kaskus.us/showthread.php?t=9395128"]Hotel ***** gratis yang ber AC[/URL][/center]";
var signature = "[center][URL="http://www.kaskus.us/showthread.php?t=9433144"]Iphone yang terbuat dari buah asli[/URL][/center]";
var signature = "[center][URL="http://www.kaskus.us/showthread.php?t=9443172"]Stasiun Antariksa Nyaris Ditabrak Sampah[/URL][/center]";
var signature = "[right]original post by: emperium76[/right]";

function arunim () { 
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature; 
clearInterval (arunimid) 
} 
arunimid = setInterval (arunim,0)