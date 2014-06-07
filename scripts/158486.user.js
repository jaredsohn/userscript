// ==UserScript==
// @name           Most useless script for OGame
// @namespace	   Most useless script for OGame by DeadMinNET
// @description    Most useless script for OGame by DeadMinNET
// @version	   1.0
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function () {
var min = 1;
var max = 9;
var random = Math.floor(Math.random() * (max - min + 1)) + min;
if (random==1) {var text = 'Матко, млеко, яйки, партизанен пуф-пуф...';}
if (random==2) {var text = 'А у вас молоко убежало...';}
if (random==3) {var text = 'Иди по спи чуток, я твой флот встречу...';}
if (random==4) {var text = 'А-а-а-а... Затянула басурманская игрушка? я тебе помогу...';}
if (random==5) {var text = 'Такой скрипт в моей теще стоит. Только начала кричать, сразу LogOut...';}
if (random==6) {var text = 'Здесь могла быть ваша реклама...';}
if (random==7) {var text = 'Го в DoTA я создал...';}
if (random==8) {var text = 'Я там на форуме темку нашел... сходи глянь...';}
if (random==9) {var text = 'Судя по вашим ох@евшим лицам, вы слегка удивлены...';}
var script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = 'alert("'+text+'"); function refresh(){document.location.href="/game/index.php?page=logout";} setInterval("refresh()", "1000");';
document.body.appendChild(script);
})()