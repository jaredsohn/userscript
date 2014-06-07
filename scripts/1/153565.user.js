// ==UserScript==
// @name           findStringBASE64
// @namespace      http://lifesuche.de/
// @description    Find the String BASE64 and highlite Cachename
// @include        http://www.geocaching.com/seek/cache_details*
// @version        1.03
// @grant          none
// ==/UserScript==

var htmlshort=0, htmllong=0;

//Check for short or long descriptions
try{
	htmlshort = document.getElementById('ctl00_ContentBody_ShortDescription').innerHTML;
	htmllong = document.getElementById('ctl00_ContentBody_LongDescription').innerHTML;
	var html = htmlshort + htmllong;
	var Elem=document.getElementById('ctl00_ContentBody_CacheName');

	if(html.match(/;base64,/i))
	{
	  Elem.innerHTML='<span style="color: #ff0000;">'+Elem.innerHTML+'</span>';
	}
}
catch(err){
}
