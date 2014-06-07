// ==UserScript==
// @name Reklamı geç  beta
// @namespace http://diveintogreasemonkey.org/download/
// @description Reklamı geç butonlarını otomatik basarak reklamları görmenizi engeller
// @include *
// @exclude http://www.tahribat.com/*
// ==/UserScript==
function reklamigec(){
	var linkler=document.getElementsByTagName("a");
	for(a=0;a<=linkler.length-1;a++){
		if(linkler[a].innerHTML.substring(0,11).toLowerCase()=="reklamı geç"){
			var gidileceklink=linkler[a].href;
			window.location=gidileceklink;
		}
	}
}

reklamigec();