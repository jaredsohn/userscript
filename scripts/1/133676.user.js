// ==UserScript==
// @name           kijiji.ca promoted listing remover (removes garbage ads from top of listings) and enables large thumbnails
// @namespace      kij
// @include        http://*.kijiji.ca/*
// ==/UserScript==

var da = document.getElementsByTagName("tr");

for (var el=0;el<da.length;el++)
	if (da[el].id.indexOf('resultFeatRow')==0)
		da[el].style.display='none';

 da = document.getElementsByTagName("img");
for (var el=0;el<da.length;el++)
{
	var s=da[el].src;
	var si=s.indexOf('_14.JPG');
	if(si!=0 && /thumbnail/.test(da[el].className))
	{
		
		da[el].src=s.substring(0,si)+"_18.JPG";
	}
}
