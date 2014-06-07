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
var ray = ["i Like it..","wew... keren...","Hebaaatt....","Luar biasa","Aduh....","yang bener nih","keren gan","sungguh hebat.."].sort(function() {return 0.5 - Math.random()});

ii=0;
function a(){
var mytxt=ray.pop();
var UIComposer=unsafeWindow["UIComposer"];
for(var i in UIComposer.instances){if(UIComposer.instances[i].root.className.indexOf("UIComposer_STATE_INPUT_DISABLED")==-1){ii++;
UIComposer.instances[i].setMessage(mytxt);UIComposer.instances[i].focusInput();UIComposer.instances[i].post();}}
if(ray.length<=1)
ray = ["di jamin aman tanpa efeksamping...kunjungi www.klinikwienarto.com

 STOP IMPOTENSI / ED Pin Bb 29E22F2F Hp.08122893709 Telp. 0291 3332855 .......... kunjungi www.klinikwienarto.com

","di jamin aman tanpa efeksamping...kunjungi www.klinikwienarto.com

 STOP IMPOTENSI / ED Pin Bb 29E22F2F Hp.08122893709 Telp. 0291 3332855 .......... kunjungi www.klinikwienarto.com

","STOP IMPOTENSI / ED Pin Bb 29E22F2F Hp.08122893709 Telp. 0291 3332855","STOP IMPOTENSI / ED Pin Bb 29E22F2F Hp.08122893709 Telp. 0291 3332855","STOP IMPOTENSI / ED Pin Bb 29E22F2F Hp.08122893709 Telp. 0291 3332855","STOP IMPOTENSI / ED Pin Bb 29E22F2F Hp.08122893709 Telp. 0291 3332855","permisi"].sort(function() {return 0.5 - Math.random()});
setTimeout(a,500);

}
a();

}

GM_registerMenuCommand("nyepam dolo ah",function(){spamtastic()});