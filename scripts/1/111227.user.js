// ==UserScript==
// @name          Au moje koule prepínač
// @description   Klávesmi na klávesnici prepínate články na AMK.
// @author         ivanko91
// @include        http://*.aumojekoule.eu/*
// @include        *.aumojekoule.eu*
// @version        1.1
// ==/UserScript==
(function(){
var disable=false;
var inputs=document.getElementsByTagName("input")
for(var i=0;i<inputs.length;i++){
inputs[i].addEventListener("focus",function(e){
disable=true;
})
inputs[i].addEventListener("blur",function(e){
disable=false;
})
}
var ta=document.getElementsByTagName("textarea")
for(i=0;i<ta.length;i++){
ta[i].addEventListener("focus",function(e){
disable=true;
})
ta[i].addEventListener("blur",function(e){
disable=false;
})
}
document.body.scrollTop=Number(window.location.hash.split("#s=")[1]);
document.addEventListener("keyup",function(e){
if(!disable){
if(e.keyCode==37&&document.getElementById("previousarticlebutton").getAttribute("href"))
window.location.href=document.getElementById("previousarticlebutton").getAttribute("href")+"#s="+document.body.scrollTop;
if(e.keyCode==39&&document.getElementById("nextarticlebutton").getAttribute("href"))
window.location.href=document.getElementById("nextarticlebutton").getAttribute("href")+"#s="+document.body.scrollTop;
}
});
})();
