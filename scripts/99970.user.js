// ==UserScript==
// @name           test
// @description    
// @lastupdated    
// @namespace      
// @version        
// @license        
// @compatibility  
// @include	   https://passthepopcorn.me*
// @include	   http://passthepopcorn.me*
// ==/UserScript==

var allStrongAreas = document.getElementsByTagName('strong');
for (var i in allStrongAreas) {
    var thisStrongArea = allStrongAreas[i];
    if (thisStrongArea.innerHTML == "Freeleech!" || thisStrongArea.innerHTML == "Half-Leech!") 
    {
        thisStrongArea.style.color = 'green'; 
    }
}