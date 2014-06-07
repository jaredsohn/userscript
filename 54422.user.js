// ==UserScript==
// @name           magicPhoto gallery load accelerator
// @namespace      magicPhoto
// @description    Loads large images one after another to make viewing more comfortable
// @include        *
// ==/UserScript==

var accel=0;
var images = new Array();
var srcs = new Array();

function loadNextImage(imageNumber) {
images[imageNumber].addEventListener("load", function(event) {
loadNextImage(imageNumber+1);
this.removeEventListener("load",arguments.callee,false);
this.removeEventListener("error",arguments.callee,false);
}, false);
images[imageNumber].addEventListener("error", function(event) {
document.getElementById('descript_'+imageNumber).innerHTML='<br><span style=\"color:#ff9999\">image N/A</span><br>';
loadNextImage(imageNumber+1);
this.removeEventListener("load",arguments.callee,false);
this.removeEventListener("error",arguments.callee,false);
}, false);
images[imageNumber].src=srcs[imageNumber].toString();
}

window.addEventListener("keydown",function(e){ 
if(e.which == 115) { 
if (accel==0) {
var all = document.all ? document.all : document.getElementsByTagName('img');
 for (var e = 0; e < all.length; e++) {
images.push(all[e]);
srcs.push(all[e].src);
var newdiv=document.createElement("div")
newdiv.id='descript_'+e;
newdiv.innerHTML='<br><span style=\"color:#cccccc; cursor:pointer\" title=\"Click to refresh image\" onClick=\"document.getElementById(\'descript_'+e+'\').parentNode.src=\''+srcs[e]+'\'\">img #'+(e+1)+' loading...</span><br>';
all[e].appendChild(newdiv);
all[e].src='';
}
loadNextImage(0);
accel=1; }
return false; } }, false);
