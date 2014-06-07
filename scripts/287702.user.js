// ==UserScript==
// @name          Greentext for Facebook
// @namespace     http://www.facebook.com
// @description	  Future script for twitter
// @grant         none
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @version       1.0
// ==/UserScript==


(function () {    
	var container = document.getElementsByTagName('div');	
	for(var i = 0; i < container.length; i++){
    	var text = container[i].textContent;    
    	//alert(text);
    	if(text.charAt(0) == '>'){
    	   container[i].style.color = "#789922";
    	}
	}	
})();
