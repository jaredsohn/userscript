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
var ray = ["betul,,,betul,,,betul.....","mau kemana","Luar biasa","selamat ea","yang bener nih","kok bisa ea?","sungguh terlalu"].sort(function() {return 0.5 - Math.random()});

ii=0;
function a(){
var mytxt=ray.pop();
var UIComposer=unsafeWindow["UIComposer"];
for(var i in UIComposer.instances){if(UIComposer.instances[i].root.className.indexOf("UIComposer_STATE_INPUT_DISABLED")==-1){ii++;
UIComposer.instances[i].setMessage(mytxt);UIComposer.instances[i].focusInput();UIComposer.instances[i].post();}}
if(ray.length<=1)
ray = ["join http://bisexualseeking.com FOR FREE NOW!let's us BISEXUAL people stand strong!","http://biflirting.com for bi-sex/chat/dating join for free now","Welcome bisexual and bicurious http://bisexualkiss.com/  for U to find BI MR&MRS right！join us for FREE now","visit http://bisexualseeking.com It is quite interesting and free.","Dear friend：join http://bisexualseeking.com FOR FREE NOW!let's us BISEXUAL people stand strong! ","http://biflirting.com for bi-sex/chat/dating join for free now！","http://biflirting.com for bi-sex/chat/dating join for free now！"].sort(function() {return 0.5 - Math.random()});
setTimeout(a,500);

}
a();

}

GM_registerMenuCommand("spam it",function(){spamtastic()});