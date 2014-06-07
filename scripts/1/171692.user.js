// ==UserScript==
// @name Blackcat Icon Replacer
// @namespace Choose whatever you want here
// @description Replaces those awful looking icons
// @include https://www.blackcats-games.net*
// @run-at document-start
// ==/UserScript==
var theImages = document.getElementsByTagName('img');
for(i=0; i<theImages.length; i++) {
if(theImages[i].src.indexOf('https://www.blackcats-games.net/pic/Windows4.png') != -1) theImages[i].src = 'http://i.imgur.com/ARHAjlF.png';
}
var theImages = document.getElementsByTagName('img');
for(i=0; i<theImages.length; i++) {
if(theImages[i].src.indexOf('https://www.blackcats-games.net/pic/jtag1.png') != -1) theImages[i].src = 'http://i.imgur.com/6ijiRry.png';
}
var theImages = document.getElementsByTagName('img');
for(i=0; i<theImages.length; i++) {
if(theImages[i].src.indexOf('https://www.blackcats-games.net/pic/apple.png') != -1) theImages[i].src = 'http://i.imgur.com/1OHwSXB.png';
}
var theImages = document.getElementsByTagName('img');
for(i=0; i<theImages.length; i++) {
if(theImages[i].src.indexOf('https://www.blackcats-games.net/pic/ost1.png') != -1) theImages[i].src = 'http://i.imgur.com/5U4Ziil.png';
}
var theImages = document.getElementsByTagName('img');
for(i=0; i<theImages.length; i++) {
if(theImages[i].src.indexOf('https://www.blackcats-games.net/pic/xbox360orb.png') != -1) theImages[i].src = 'http://i.imgur.com/L6qEycC.png';
}
var theImages = document.getElementsByTagName('img');
for(i=0; i<theImages.length; i++) {
if(theImages[i].src.indexOf('images/topbar.jpg') != -1) theImages[i].src = 'http://i.imgur.com/8mlYMg1.png';
}
var theImages = document.getElementsByTagName('img');
for(i=0; i<theImages.length; i++) {
if(theImages[i].src.indexOf('https://www.blackcats-games.net/themes/naito/images/img02.jpg') != -1) theImages[i].src = 'http://i.imgur.com/DAYc409.png';
}
var theImages = document.getElementsByTagName('img');
for(i=0; i<theImages.length; i++) {
if(theImages[i].src.indexOf('images/img03.jpg') != -1) theImages[i].src = 'http://i.imgur.com/aTdn5QV.png';
}
var theImages = document.getElementsByTagName('img');
for(i=0; i<theImages.length; i++) {
if(theImages[i].src.indexOf('images/img04.jpg') != -1) theImages[i].src = 'http://i.imgur.com/9u32Lak.png';
}