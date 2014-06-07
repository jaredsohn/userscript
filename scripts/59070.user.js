// ==UserScript==
// @name           Bang
// @namespace      http://www.kvasbo.no
// @description    2% sjanse for å bytte ut ethvert bilde med Pål Bang Hansen
// @include        *
// ==/UserScript==

function letsFilter() {
        

for (x=0;x<document.images.length;x++){

	if((document.images[x].height > 40) && (document.images[x].width > 40) && (document.images[x].height < 400) && (document.images[x].width < 400))
	{
		var rand = Math.random();
		if(rand > 0.98)
		{
			document.images[x].src = "http://ting.kvasbo.no/bang/paalbang.jpg";
		}	
	}
	
}
		
	
		
}

window.onload = letsFilter();