// Open Link in New Tab with Double Click 1.0
// (c) 2008, Clem
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// --------------------------------------------------------------------
// ==UserScript==
// @name          Open Link in New Tab with Double Click
// @namespace     http://clement.beffa.org/labs/projects/greasemonkey/
// @description   Because tabs are great and my macbook misses middle click
// @include       *
// ==/UserScript==

(function() {	
	var lastdbclick=0;
	//mod all links
	var links = document.body.getElementsByTagName('a');
	for (var i = links.length - 1; i >= 0; i--) {
		//in a new tab if dblclick
		links[i].addEventListener("dblclick",
	    function(e) {
	    	lastdbclick = new Date().getTime();
			e.preventDefault();
	        e.stopPropagation();
	        var j = 0;
			var target = e.target;
			while (j<5 && typeof(target.href)=="undefined"){ 
				target = target.parentNode;
				j++;
			}
	        GM_openInTab(target.href);
	    },false);
	    //prevent click on link if dblclick
	    links[i].addEventListener("click",
	    function(e) {
	    	var j = 0;
	    	var target = e.target;
			while (j<5 && typeof(target.href)=="undefined"){ 
				target = target.parentNode;
				j++;
			}
			//only for plain url so it doesn't break too much ajax sites
			if(target.getAttribute("onclick")==null){		
		    	e.preventDefault();
		        e.stopPropagation();
		        setTimeout(function(){
		        	var time = new Date().getTime();
		        	//no dblclick -> open the url
					if (time-lastdbclick > 500) {
						var j = 0;
						var target = e.target;
						while (j<5 && typeof(target.href)=="undefined"){ 
							target = target.parentNode;
							j++;
						}
						document.location=target.href;
					}
				},100);
			}
	    },false);
	}
})();