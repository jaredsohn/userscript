// Written by Yan Huang

// ==UserScript==
// @name          Yan's Code...Pwnage!
// @description   Pwnage!
// @include       http://*
// ==/UserScript==

var z = document.getElementsByTagName('img');
for(i=0;i<z.length;i++) {
if(z[i].width >= screen.width*0.75){
	z[i].width = screen.width*0.75;
	}
}