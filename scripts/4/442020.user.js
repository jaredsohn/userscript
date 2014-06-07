// ==UserScript==
// @name Darkwarez Changer
// @include http://darkwarez.pl/forum/*
// @include http://www.darkwarez.pl/forum/*
// @author Przerobiony skrypt Boltexa przez Dewiaszka waszego kochanego
// ==/UserScript==

var images = document.getElementsByTagname ("img");
var x=0;
while(x<images.length){
if(images[x].src == "http://darkwarez.pl/forum/templates/bLock/images/ranks/supervip.gif"){
images[x].src = "http://vpx.pl/i/2014/03/16/svip.gif"; }
if(images[x].src == "http://darkwarez.pl/forum/templates/bLock/images/ranks/vip.gif"){
images[x].src = "http://vpx.pl/i/2014/03/16/vip.gif"; }
if(images[x].src == "http://darkwarez.pl/forum/templates/bLock/images/ranks/admin.gif"){
images[x].src = "http://vpx.pl/i/2014/03/16/admin.gif"; }
if(images[x].src == "http://darkwarez.pl/forum/templates/bLock/images/ranks/moderator.gif"){
images[x].src = "http://vpx.pl/i/2014/03/16/mod.gif"; }
if(images[x].src == "http://darkwarez.pl/forum/templates/bLock/images/ranks/supermod.gif"){
images[x].src = "http://vpx.pl/i/2014/03/16/smod.gif"; }
if(images[x].src == "http://darkwarez.pl/forum/templates/bLock/images/ranks/uplinker.gif"){
images[x].src = "http://vpx.pl/i/2014/03/16/linker.gif"; }
if(images[x].src == "http://darkwarez.pl/forum/templates/bLock/images/ranks/uploader.gif"){
images[x].src = "http://vpx.pl/i/2014/03/16/loader.gif"; }
if(images[x].src == "http://darkwarez.pl/forum/templates/bLock/images/ranks/elitevip.gif"){
images[x].src = "http://vpx.pl/i/2014/03/17/evip.gif"; }
if(images[x].src == "http://darkwarez.pl/forum/img/ekipadt.gif"){
images[x].src = "http://vpx.pl/i/2014/03/17/ekipadt.gif"; }
if(images[x].src == "http://darkwarez.pl/forum/templates/bLock/images/ranks/100.gif"){
images[x].src = "http://vpx.pl/i/2014/03/16/ures.gif"; }
x=x+1;
} 