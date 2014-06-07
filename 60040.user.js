// ==UserScript==
// @name           Newgrounds: None-Widescreen Portal
// @namespace      iamgrimreaper
// @description    Makes portal submissions not in Widescreen.
// @include        http://*newgrounds.com/portal/view/*
// ==/UserScript==

document.body.innerHTML = '<link rel="stylesheet" href="http://css.ngfiles.com/ng_publish.css" type="text/css" media="screen" />' + document.body.innerHTML;

function findElementByClass(classname){
bodyHTML = document.body.innerHTML;
var c = 0;
while(c < document.all.length){
c += 1;
if(document.all[c].getAttribute('class') = classname){
c = document.all.length;
return document.all[c];
}
}

document.remove(findElementByClass('wide_storepromo'));