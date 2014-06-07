// ==UserScript==
// @name           Imgur To Filmot with CSS
// @namespace      http://www.facebook.com/bOYdxl
// @description    swap imgur to filmot
// @include        http://*
// @include        https://*
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(/imgur/g,'filmot');  


if(location.host=='filmot.com' && window.top == window.self){
	window.addEventListener ("load", LocalMain, false);
}
function LocalMain ()
{
			
		var cache = document.documentElement.outerHTML.replace(/imgur/g,'filmot');
		//alert("changing");
    		document.clear();
		document.write(cache);
	
    
}
