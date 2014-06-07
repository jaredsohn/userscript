// ==UserScript==
// @name		Facepunch DNS Ratings Fix
// @namespace	http://facepunch.com
// @author		SataniX
// @license		http://creativecommons.org/licenses/by-sa/3.0/
// @description	WWW.Facepunch -> Facepunch for rating icons fixing DNS problems.
// @include 	http://facepunch.com/*
// @include 	http://www.facepunch.com/*
// @version 	1.1
// ==/UserScript==

if(location.href.match('thread')){//In a thread
		var img = document.getElementsByTagName('img');
		for(i=0;i<img.length;i++){
			if(img[i].src.match('ratings')){
				img[i].src = img[i].src.replace("www.","");
			}
		}
}