// ==UserScript==
// @name			armtoma
// @description		armtomato
// @author			styfle


// @include     http://www.rottentomatoes.com/*

// ==/UserScript==

function getContent() {
	
var scripts = document.getElementsByTagName('script');
	

	for (var i=0; i<scripts.length; i++) {
		var html = scripts[i].innerHTML;

		var start = html.indexOf('Average');


		if (start != -1) {

			hd_url = html.substring(start, html.indexOf('Reviews'));
			break;
		}
	}
        
       alert(hd_url);

	       
		

         

		

		

}

window.setTimeout(getContent, 1);