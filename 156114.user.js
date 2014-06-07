// ==UserScript==
// @name	    clubsDirBgAdsRemover
// @author		Bokor
// @include		http*://clubs.dir.bg/*
// @grant none
// @run-at document-start
// ==/UserScript==

"use strict";
// СнБгвтзжблмНсГрХкОаоецМйюдяАуи
setTimeout(function removeAdd(){
    var add =  document.getElementById("lentaspace");
	
	if (add != null) {
	    add.style.display = "none";
		
            var spacers = document.querySelectorAll("img[src$='spacer.gif']");
	    for (var j = spacers.length; j -- ;) {
	        spacers[j].style.height = 0;
            }
		
	    // document.readyState != "complete" - avoid unbreakable loop
	    // when dir.bg change id of advertisement. 
	} else if (document.readyState != "complete") {  
	    setTimeout(removeAdd, 5);
	}
}, 5);