// ==UserScript==
        	// @name NewArt Image Resizer
        	// @author djmax	
        	// @include http://*newart.com/*
// ==/UserScript==
        	
        var allimages = document.getElementsByTagName("dt");
        var i;
        
        for(i in allimages) { 
        
         	if(allimages[i].className=="attach-image") { 
        
         		allimages[i].style.maxHeight = "none";
        
         	} 
        
        }
        