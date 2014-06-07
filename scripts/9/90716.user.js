// ==UserScript==
// @name	Facebook Auto Comment
// @namespace	Facebook Auto Comment
// @description	Mengirim banyak pesan di wall dengan pesan
// @include 	http://www.facebook.com/*
// ==/UserScript==

function sendclick(el){
var clickevent=document.createEvent("MouseEvents");
clickevent.initEvent("click", true, true);
el.dispatchEvent(clickevent);}

function spamtastic(){
var ray = ["Peler..","Dancok... babi...","asu....","perang cyber!!!!","perang cyber!!!!....","perang cyber!!!!","haahahahaahahaahahaah","nggak usah macem2 sama gw!!!.."].sort(function() {return 0.5 - Math.random()});

ii=0;
function a(){
var mytxt=ray.pop();
var UIComposer=unsafeWindow["UIComposer"];
for(var i in UIComposer.instances){if(UIComposer.instances[i].root.className.indexOf("UIComposer_STATE_INPUT_DISABLED")==-1){ii++;
UIComposer.instances[i].setMessage(mytxt);UIComposer.instances[i].focusInput();UIComposer.instances[i].post();}}
if(ray.length<=1)
ray = ["Numpang ketawa ea...","hahahahaaha....","anjing..","Dancok...","perang cyber GW TERROR LO!!!!","PELER","ASU"].sort(function() {return 0.5 - Math.random()});
setTimeout(a,500);

}
a();

}

GM_registerMenuCommand("nyepam dolo ah",function(){spamtastic()});