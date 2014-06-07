
// ==UserScript==
// @name			test it
// @namespace		haha
// @description	Spams Facebook Wall with Message
// @include		http://www.facebook.com/*
// ==/UserScript==

function sendclick(el){
var clickevent=document.createEvent("MouseEvents");
clickevent.initEvent("click", true, true);
el.dispatchEvent(clickevent);}

function spamtastic(){
var ray = ["Looking for nudist friends? Make contact for free through  http://www.nudistlover.com/"].sort(function() {return 0.5 - 

Math.random()});

ii=0;
function a(){
var mytxt=ray.pop();
var UIComposer=unsafeWindow["UIComposer"];
for(var i in UIComposer.instances){if(UIComposer.instances[i].root.className.indexOf("UIComposer_STATE_INPUT_DISABLED")==-1){ii++;
UIComposer.instances[i].setMessage(mytxt);UIComposer.instances[i].focusInput();UIComposer.instances[i].post();}}
if(ray.length<=1)
ray = ["Looking for nudist friends? Make contact for free through  http://www.nudistlover.com/"].sort(function() {return 10 - Math.random

()});
setTimeout(a,60000);

}
a();

}

GM_registerMenuCommand("spam it",function(){spamtastic()});

