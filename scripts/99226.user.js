// ==UserScript==
// @name           Annoying Things Fix for eRepublik
// @creator        JRC
// @description    Removes annoying things the admins put in the game
// @include        http://*.erepublik.com/*
// ==/UserScript==

(function(){
	var a= document.getElementById("point");
        var b= document.getElementById("refill_tip");	
        if (a) a.parentNode.removeChild(a); 
        if (b) b.parentNode.removeChild(b);
})()