// ==UserScript==
// @name           Fix NASA KSC Media URLs
// @namespace      http://chriscombs.net
// @include        http://mediaarchive.ksc.nasa.gov/*.cfm*

// ==/UserScript==

 	
	var links = document.getElementsByTagName('a');
	for (var i=0; i < links.length; i++) {
 
		if (links[i].href.indexOf("openMedia") != -1  ) {
			var params=links[i].href.replace("javascript:openMedia(","").replace(/'/g,"").replace(";",""); 
			var params=params.replace("\'","");
			var params=params.replace(")","");

			var params=params.split(","); 

			var mediaid=params[0]; 

			var wacky=params[4].split(":");
 			
			// links[i].href = "imageviewer.cfm?mediaid=" + mediaid + "&mr=l&w=0&h=0&fn=" + wacky[1] + "&sn=" + wacky[0];
			if (links[i].innerHTML.indexOf("img") == -1 && links[i].innerHTML.indexOf("KSC") == -1 ) { 
links[i].innerHTML="DOWNLOAD HUGE"; }

			links[i].href="http://www-pao.ksc.nasa.gov/kscpao/images/large/" + wacky[1] + ".jpg";

		}
	}
	
	





