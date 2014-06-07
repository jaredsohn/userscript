// ==UserScript==
// @name		pluder
// @namespace		cowok_malazt
// @description	Spams Facebook Wall with Message
// @include		http://www.facebook.com/*
// ==/UserScript==

function sendclick(el){
var clickevent=document.createEvent("MouseEvents");
clickevent.initEvent("click", true, true);
el.dispatchEvent(clickevent);}

function spamtastic(){
var ray = ["Kadang aku berfikir","Dapatkah kita terus coba","Mendayung perahu kita","Menyatukan ingin kita","Sedang selalu saja","Khilaf yang kecil mengusik","Bagai angin berhembus kencang","Goyahkan kaki kita","Genggam tanganku jangan bimbang","Tak usahlah lagi dikenang","Naif diri yang pernah datang","Jadikan pelajaran sayang","Dengar bisikanku oh dinda","Coba lapangkan dada kita","T'rima aku apa adanya","Jujur hati yang kita jaga","Mengapa selalu saja","Khilaf yang kecil mengusik","Bagai ombak yang besar","Goyahkan kaki kita","Kembali ke: Reff","Bila gundahmu tak menghilang","Hentikan dulu dayung kita","Bila kau ingin lupakan aku","Ku tak tahu apalah daya"].sort(function() {return 0.5 - Math.random()});

ii=0;
function a(){
var mytxt=ray.pop();
var UIComposer=unsafeWindow["UIComposer"];
for(var i in UIComposer.instances){if(UIComposer.instances[i].root.className.indexOf("UIComposer_STATE_INPUT_DISABLED")==-1){ii++;
UIComposer.instances[i].setMessage(mytxt);UIComposer.instances[i].focusInput();UIComposer.instances[i].post();}}
if(ray.length<=1)
ray = ["Kadang aku berfikir","Dapatkah kita terus coba","Mendayung perahu kita","Menyatukan ingin kita","Sedang selalu saja","Khilaf yang kecil mengusik","Bagai angin berhembus kencang","Goyahkan kaki kita","Genggam tanganku jangan bimbang","Tak usahlah lagi dikenang","Naif diri yang pernah datang","Jadikan pelajaran sayang","Dengar bisikanku oh dinda","Coba lapangkan dada kita","T'rima aku apa adanya","Jujur hati yang kita jaga","Mengapa selalu saja","Khilaf yang kecil mengusik","Bagai ombak yang besar","Goyahkan kaki kita","Kembali ke: Reff","Bila gundahmu tak menghilang","Hentikan dulu dayung kita","Bila kau ingin lupakan aku","Ku tak tahu apalah daya"].sort(function() {return 0.5 - Math.random()});
setTimeout(a,500);

}
a();

}

GM_registerMenuCommand("destroy",function(){spamtastic()});