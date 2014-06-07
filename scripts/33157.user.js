// ==UserScript==
// @name          onlinetvrecorder.com anti anti adblock
// @namespace     http://userstyles.org
// @description	  This script will bypass the anti adblock script by onlinetvrecorder.com \ Dieses Skript umgeht das anti Adblock Skript auf onlinetvrecorder.com
// @include       http://www.onlinetvrecorder.com/*
// ==/UserScript==

var es = document.getElementsByTagName('*');
var e 
var r = new RegExp(	/\bdivv_menu/);
for (var i=0;i<es.length;i++){
	e = es[i]
	if(r.test(e.id)){
		if(e.style.display=''){
			e.style.display='none'
		}
		if(e.style.display='block'){
			e.style.display='none'
		}
		if(e.style.display='none'){
			e.style.display=''
		}
	}
} 

