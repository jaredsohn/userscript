// ==UserScript==
// @name           Hyves Ads Remover
// @namespace      http://userscripts.org/users/232057
// @include        http://www.hyves.nl/
// ==/UserScript==

function removeHyvesAds()
{
d=document.getElementsByTagName("*");
g=0;
for(e=0;e<d.length;e++){
	if(d[e].id.substr(0,6)=="adhese"){
		d[e].parentNode.removeChild(d[e]);
		g++;
	}
	if(d[e].id.substr(0,9)=="hyvesense"){
		d[e].parentNode.removeChild(d[e]);
		g++;
	}
	if(d[e].className.indexOf("homepage-ad")>-1){
		d[e].parentNode.removeChild(d[e]);
		g++;
	}
	if(d[e].className.indexOf("content-item-list")>-1)
	{
		if(d[e].innerHTML.indexOf("Advertentie")>-1)
		{
			d[e].parentNode.removeChild(d[e]);
			g++;
		}
	}
}
if(g > 0 || document.readyState != "complete") setTimeout(removeHyvesAds, 1);
}

removeHyvesAds();