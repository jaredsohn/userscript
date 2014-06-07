// ==UserScript==
// @name           Google Tiger
// @description    Turns the harsh white background of google into beige which is easier on the eyes
// @namespace      google.com
// @include        http://google.com*
// @include        http://*.google.com*
// @exclude        http://www.google.com/calendar*
// @exclude        http://docs.google.com*
// @exclude        http://sites.google.com*
// @exclude        http://maps.google.com*

// @include        https://google.com*
// @include        https://*.google.com*
// @exclude        https://www.google.com/calendar*
// @exclude        https://docs.google.com*
// @exclude        https://maps.google.com*
// @grant          none
// ==/UserScript==

(function(){
	try{
		document.body.style.backgroundColor = "beige";
		
		for(var i=0; i<document.styleSheets.length; i++){
			for(var n=0; n<document.styleSheets[i]["cssRules"].length; n++){
				if(typeof(document.styleSheets[i]["cssRules"][n].selectorText) != "undefined"){
					document.styleSheets[i]["cssRules"][n].style.backgroundColor = "beige";
				}
			}
		}
		
	}catch(ex){}
})();