// ==UserScript==
// @name          Green Text for Twitter
// @namespace     http://www.twitter.com
// @description	  4chan style greentext for Twitter
// @grant         none
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @version       1.0
// ==/UserScript==


(function () {
	var container = document.getElementsByTagName('p');
	
	for(var i = 0; i < container.length; i++){
    	var text = container[i].textContent;    
    	//alert(text);
    	if(text.charAt(0) == '>'){
    	   container[i].style.color = "#789922";
    	}else{
    	   //container[i].style.color = "blue";
    	}
	}
})();
