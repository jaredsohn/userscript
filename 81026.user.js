// Google SSL Web Cache
// Use HTTPS instead of HTTP connection in google web cache.
// ==UserScript==
// @name        Google SSL Web Cache
// @namespace   LongLiveKimJongIl
// @version     1.0.0
// @description	Use HTTPS instead of HTTP connection in google web cache.
//
// @include     http://www.google.com.hk/search?*
// @include     http://www.google.com/search?*
// @include     https://www.google.com/search?*
// @include     https://encrypted.google.com/search?*
// ==/UserScript==

var gl=document.getElementsByClassName("gl");
for(var i=0;i<gl.length;++i)
{
	var a=gl[i].childNodes;
	for(var j=0;j<a.length;++j)
	{
		if(a[j].innerText==="网页快照" || a[j].innerText==="Cached" || a[j].innerText==="頁庫存檔")
		{
			a[j].href=a[j].href.replace(/^http:\/\//,"https://")
		}
	}
}