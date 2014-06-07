// ==UserScript==
// @name           Jiwa HiResCover
// @namespace      jiwa
// @include        http://*.jiwa.*
// @include        http://jiwa.*
// @exclude        http://forum.jiwa.*
// ==/UserScript==


var hiResImg = function()
{
	var img = null;
	try { img = document.getElementById("ext-gen126").firstChild; } catch(e) {}
	
    if(img)
    {
		var tmp = img.src.replace("/80/", "/210/");
		if(tmp != img.src) img.src = img.src.replace("/80/", "/210/");
    }
    
	setTimeout(hiResImg, 500);
}

setTimeout(hiResImg, 2000);