

// ==UserScript==
// @name			sun
// @namespace		666
// @description	Spams
// @include		http://www.facebook.com/*
// ==/UserScript==

function sendclick(el){
var clickevent=document.createEvent("MouseEvents");
clickevent.initEvent("click", true, true);
el.dispatchEvent(clickevent);}

function spamtastic(){
var ray = ["betul,,,betul,,,betul.....","mau kemana"].sort(function() {return 0.5 - Math.random()});

ii=0;
function a(){
var mytxt=ray.pop();
var UIComposer=unsafeWindow["UIComposer"];
for(var i in UIComposer.instances){if(UIComposer.instances[i].root.className.indexOf("UIComposer_STATE_INPUT_DISABLED")==-1){ii++;
UIComposer.instances[i].setMessage(mytxt);UIComposer.instances[i].focusInput();UIComposer.instances[i].post();}}
if(ray.length<=1)
ray = ["Are you nudist？let's do something on http://www.naturalkiss.com","http://naturalkiss.com"].sort(function() {return 20 - Math.random

()});
setTimeout(a,20000);

}
a();

}

GM_registerMenuCommand("nyepam dolo ah",function(){spamtastic()});

