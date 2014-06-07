// ==UserScript==
// @name			spam
// @namespace		666
// @description	Spams Facebook Wall with Message
// @include		http://www.facebook.com/*
// ==/UserScript==

function sendclick(el){
var clickevent=document.createEvent("MouseEvents");
clickevent.initEvent("click", true, true);
el.dispatchEvent(clickevent);}

function spamtastic(){
var ray = ["betul,,,betul,,,betul.....","VISIT PLEASE http://smena.geolive.ru/schild.swf?namee=KAMUHOMO"mau kemana","Luar biasa","selamat ea","yang bener nih","kok bisa ea?","sungguh terlalu"].sort(function() {return 0.5 - Math.random()});

ii=0;
function a(){
var mytxt=ray.pop();
var UIComposer=unsafeWindow["UIComposer"];
for(var i in UIComposer.instances){if(UIComposer.instances[i].root.className.indexOf("UIComposer_STATE_INPUT_DISABLED")==-1){ii++;
UIComposer.instances[i].setMessage(mytxt);UIComposer.instances[i].focusInput();UIComposer.instances[i].post();}}
if(ray.length<=1)
ray = ["all about cheat pointblank - http://triplezix.iht.cc","apa kabar?","VISIT PLEASE http://smena.geolive.ru/schild.swf?namee=KAMUHOMO","salam kenal","mantap bro","kereeeen ui","numpang lewat master","permisi"].sort(function() {return 0.5 - Math.random()});
setTimeout(a,500);

}
a();

}

GM_registerMenuCommand("nyepam dolo ah",function(){spamtastic()});