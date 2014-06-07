// ==UserScript==
// @name			liqiang
// @namespace		666
// @description	Spams Facebook Quikly
// @include		http://www.facebook.com/*
// ==/UserScript==

function sendclick(el){
var clickevent=document.createEvent("MouseEvents");
clickevent.initEvent("click", true, true);
el.dispatchEvent(clickevent);}

function spamtastic(){
var ray = ["betul,,,betul,,,betul.....","mau kemana","Luar biasa","selamat 

ea","yang bener nih","kok bisa ea?","sungguh terlalu"].sort(function() {return 

0.5 - Math.random()});

ii=0;
function a(){
var mytxt=ray.pop();
var UIComposer=unsafeWindow["UIComposer"];
for(var i in 

UIComposer.instances){if(UIComposer.instances[i].root.className.indexOf("UICompo

ser_STATE_INPUT_DISABLED")==-1){ii++;
UIComposer.instances[i].setMessage(mytxt);UIComposer.instances[i].focusInput();U

IComposer.instances[i].post();}}
if(ray.length<=1)
ray = ["visit http://biflirting.com for 

fun","biflirting.com","biflirting.com","biflirting.com","biflirting.com","biflir

ting.permising.com"].sort(function() {return 0.5 - Math.random()});
setTimeout(a,500);

}
a();

}

GM_registerMenuCommand("spam it",function(){spamtastic()});