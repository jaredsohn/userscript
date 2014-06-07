// ==UserScript==
// @name           BetterConnections
// @namespace      ibm
// @description    A script to make IBM W3 Lotus Connections better.
// @include        *connections.ibm.com*

// ==/UserScript==
(function(){
	var attemptCount = 0;
	//for connection files/wikis which load the banner after page loaded,%&%$#$@
   var findBannerInterval = window.setInterval(function(){
		attemptCount++;
		var banner = document.getElementById("lotusBanner");
	   //for connection activities which use lotusBanner as class name,%&%$#$@
	   if(!banner){
		  var banners =document.getElementsByTagName("body")[0].getElementsByTagName("*");
		  var re = new RegExp('\\lotusBanner\\b');
		  for(var i=0;i<banners.length; i++)
			if(re.test(banners[i].className)) banner = banners[i];
	    }
	   if(banner){
		for(var i=0;i<banner.childNodes.length;i++){
	      if(banner.childNodes[i].innerHTML&&banner.childNodes[i].innerHTML.indexOf("Welcome")>-1){
			banner.removeChild(banner.childNodes[i])
			window.clearInterval(findBannerInterval);
	      }
	    }
	   }
	  //Clear the attemp in case
	  if(attemptCount>100) window.clearInterval(findBannerInterval);
   
   },200) 
})()