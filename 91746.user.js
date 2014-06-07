// ==UserScript==
// @name        Find similar pages
// @namespace   http://diveintomark.org/projects/greasemonkey/
// @include     http://*
// @exclude     http://*.google.tld/* 
// ==/UserScript==
for(var i=document.images.length-1;i>=0;i--)
{
	var elmimage = document.images[i];
	var usfilename = elimage.src.split('/').pop();
	var elmlink = elimage.parentNode();
	if(elmlink.nodeName != 'A')
	{
		var elmlink = document.createElement('a');
		elmlink.href = 'http://images.google.com/images?q=' + escape(usfilename);
		elmlink.title = 'Find images named ' + usfilename;
		var elmnewimage = elmimage.cloneNode(false);
		elmlink.appeendChild(elmnewimage);
		elmimage.parentNode.replaceChild(elmlimk,elmimage);
	}
}