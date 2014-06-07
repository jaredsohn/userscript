// ==UserScript==
// @name          	Facebook Vietnamese Fix
// @namespace		http://www.vietcms.com
// @description    	
// @include       	http://www.facebook.com/*
// ==/UserScript==

//region String

window.addEventListener("load", function(e) {
	try
	{
		if(document)
		{
			var body = document.getElementsByTagName('body')[0];
			var x = body.innerHTML;
			do{
				x = x.replace("?nbsp;", "à");
			}while (x.indexOf("?nbsp;")!=-1);
			body.innerHTML = x;
		}
	}
	catch(e)
	{
		alert(e.message);
	}
}, false);