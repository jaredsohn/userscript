// ==UserScript== 
// @name           Darkwarez Basic avatar changer 
// @description    For only DW members 
// @include        http://darkwarez.pl/forum/* 
// @include        http://www.darkwarez.pl/forum/* 
// @version        1.0 
// @author         Dawid 
// ==/UserScript== 

var images = document.getElementsByTagName ("img"); 
var x=0; 
while(x<images.length){ 
if(images[x].src == "http://darkwarez.pl/forum/templates/bLock/images/folder_big.gif"){ 
images[x].src = "http://vpx.pl/i/2013/04/17/madżyk.png"; } 
x=x+1;} 