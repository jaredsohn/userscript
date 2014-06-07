//Written by Doron Rainer

//For using on the like pages in Facebook

//Published for all users!

//You can change this code!

// ==UserScript==

// @name           Like Disable

// @namespace      Like Disable

// @description    Auto like disable pages

// @include http://*.facebook.com/pages/*

// ==/UserScript==


(function() {
	for (z in y=document.getElementsByTagName("div")) {
		if (y[z].className.match(/app_tab (.*)/)) {
			for(i in x=document.getElementsByTagName("span")){
				if(x[i].style.visibility=="hidden" ) {
					x[i].style.visibility="visible";
				} else if(x[i].style.visibility=="visible" ) {
					x[i].style.visibility="hidden";
				}
			}
			var likeb=document.getElementById("profile_connect");
			likeb.style.display="none";
		}
		
	}
	
})();

