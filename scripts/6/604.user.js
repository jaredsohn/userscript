// ==UserScript==
// @name          Slashdot Ad Remover
// @namespace     http://blogs.applibase.net/pramod/code
// @description	  Removes the ad on the Slashdot homepage
// @include       http://slashdot.org
// @exclude       
// ==/UserScript==
	
(function() {
	var centerNodes = document.getElementsByTagName("CENTER"); 
	for(i=0;i<centerNodes.length;i++){
		if(centerNodes[i].innerHTML.match("ads.osdn.com")){
			centerNodes[i].style.display="none";
			break;
		}

	} 
})();
