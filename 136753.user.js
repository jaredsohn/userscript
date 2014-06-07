// ==UserScript==
// @name           404 Shell Page Detector
// @include        *
// @version                1.21
// ==/UserScript==

//document.getElementsByTagName('html')[0].innerHTML.indexOf("input { margin:0;background-color:#fff;border:1px solid #fff; }") != -1 && 
if (document.getElementsByTagName('html')[0].innerHTML.toLowerCase().indexOf("not found") != -1 ){
var inputs = document.getElementsByTagName('input');

for(var i=0; i<inputs.length; i++){
if(inputs[i].getAttribute('type')=='password'){
inputs[i].style.background="lightgreen";
}
}
}