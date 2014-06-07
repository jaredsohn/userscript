// ==UserScript==
// @name 		Onet comments remover
// @description 	Remove comments from onet.pl ;]
// @author		Dziudek
// @version 		0.1 alpha
// @include 		http://onet.pl/*
// @include 		http://*.onet.pl/*
// ==/UserScript==

function s(c){ 
	var t = new Array(); 
	var r = new RegExp('(^|\\s)'+c+'(\\s|$)'); 

	for (i = 0, j = 0; i < document.all.length; i++){ 
		if (r.test(document.all[i].className)){ 
			t[j] = document.all[i];
			j++;
		}
	}
	
	return t; 
}

function hide(){ 
	var h = s("forumtext"); 
	
	for(i=0; i < h.length; i++){ 
		if(i!==0){
			h[i].style.display = "none"; 
		}
	} 
}

document.addEventListener('DOMContentLoaded', hide, false);