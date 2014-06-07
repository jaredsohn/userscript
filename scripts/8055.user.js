// ==UserScript==
// @name Replace Blogspot links
// @description Replace http://*.blogspot.com/* links with http://www.pkblogs.com/*/*.
// @author Calon Xu (http://calon.blogspot.com/)
// @version 0.1
// @date 2007-03-22
// @include http://*
// @include https://*
// ==/UserScript==

(function()
{
	for(var i=0;i<document.links.length;i++)
	{
		var doclinks = document.links[i];
		var aregexp = /^http:\/\/(\w+)\.blogspot\.com(\S*)/;
		if (doclinks.href.match(aregexp))
		{
			doclinks.href = "http://www.pkblogs.com/"+RegExp.$1+RegExp.$2;
		}
	}
})();