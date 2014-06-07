// ==UserScript==
// @name           Captured capture
// @namespace      http://google.com
// @description    No time limit for downloading file with capturetv.com
// @include        http://*capturetv.com/*
// ==/UserScript==


	//alert(m[i]);
	
	window.addEventListener(
	'load',
	function() {
	
		var re =/<FORM METHOD=\"LINK\" ACTION=\"(.*)\">/i;
 		var m = re.exec(document.body.innerHTML);
  		if(m!=null)
   		for (i = 0; i < m.length; i++) 
  				if(m[i].indexOf("http")==0)
  					window.location=m[i];	
	},
	true
);