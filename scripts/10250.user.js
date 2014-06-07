/*
 *	Author:		Tim Dupree
 *				http://www.dsscreative.com
 *				(c) 2007
 *
 *	Date:		June 1, 2007
 *
 *	Summary:	Removes banner and right side ads from digg.com
 *
 */
 
// ==UserScript==
// @name           Digg AdBlocker
// @namespace      http://www.dsscreative.com
// @description    Removes ads from digg.
// @include        http://*digg.com/*
// ==/UserScript==

(function() {
		
	 //The modified code which injects css styles into the page was originaly written 
	 //by Rodrigo Queiro for his "Digg 3.0 Ad Remover" script.
	 //begin Rodrigo Queiro's code	
	 head = document.getElementsByTagName('head')[0];
	 if (head)
	 {
		 style = document.createElement('style');
		 style.type = 'text/css';
		 style.innerHTML = '.banner_ad_unit { display: none; }\n' +
						   '.top_ad_image { display: none; }\n' +
						   '.single_ad_unit { display: none; }\n' +
						   '.comments_ad_image { display: none; }\n';
		 head.appendChild(style);
	 }
	 //end Rodrigo Queiro's code	  
		  
	//remove ads loaded into iFrames
	var frames = document.getElementsByTagName("iframe");
	for(var i = 0; i < frames.length; i++){
		frames[i].style.display="none";
	}
	
	//remove ads loaded into banner
	var flashBanner = document.getElementById("top_ad_image");
	if(flashBanner){
		flashBanner.style.display="none";
	}
	
	//remove ads loaded into banner
	var flashAd = document.getElementById("FLASH_AD");
	if(flashAd){
		flashAd.style.display="none";
	}
	
	//remove ads loaded into sidebar
	var sideBar = document.getElementById("item_ad_image");
	if(sideBar){
		sideBar.style.display="none";
	}
	
	//remove text ads
	var item_ad = document.getElementById("item_ad");
	if(item_ad){
		item_ad.style.display="none";
	}
	
	//remove embedded ads
	var embed = document.getElementsByTagName("embed");
	for(var i = 0; i < embed.length; i++){
		embed[i].style.visibility="hidden";
	}
	
})();