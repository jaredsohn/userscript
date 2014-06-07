// ==UserScript==
// @name                Mixed content protection
// @namespace	        http://penturalabs.blogspot.com/
// @description	        Removes all insecure references when navigating in HTTPS web pages
// @include				https://*
// ==/UserScript==

// Remove insecure references for images, iframes, etc.
var src = document.evaluate("//*[starts-with(@src,'http://')]", 
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < src.snapshotLength; i++) 
{
	// We are going to replace all http src attributes to the https ones.
	var elm = src.snapshotItem(i);
	var secure = elm.src.replace("http://","https://");
	elm.src = secure;
}

// Insecure links for css
var href = document.evaluate("//link[starts-with(@href,'http://')]", 
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < href.snapshotLength; i++) 
{
	// We are going to replace all http src attributes to the https ones.
	var elm = href.snapshotItem(i);
	var secure = elm.href.replace("http://","https://");
	elm.href = secure;
}

// Insecure object references (ej. flash movies)
var param = document.evaluate("//param[@name='movie' and starts-with(@value,'http://')]", 
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < param.snapshotLength; i++) 
{
	// We are going to replace all http src attributes to the https ones.
	var elm = param.snapshotItem(i);
	var secure = elm.value.replace("http://","https://");
	elm.value = secure;
}
