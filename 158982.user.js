
// ==UserScript==
// @name DA NoAD v1.0
// @namespace http://www.deviantart.com/* 
// @description Removes the right ad column in messages and the top banner on the home page. Download another script for the other ads. Created By Remixie.
// @grant none
// @include http://www.deviantart.com/*
// @include http://my.deviantart.com/messages/*
// ==/UserScript== 

    elements = document.getElementsByClassName('da-custom-ad-box dac-ad-frontpage-banner');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
	

	
	elements = document.getElementsByClassName('oh-l oh-l-green');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
		document.getElementById('sidebar-you-know-what').style.display="none";
		document.getElementById('cmeun').innerHTML="HAcks";
	
	