// ==UserScript==
// @name Redirect Blogspot URL
// @description Redirect blogspot URLs to pkblogs.com.
// @author Calon Xu (http://calon.blogspot.com/)
// @version 0.1
// @date 2007-03-22
// @include http://*
// @include https://*
// ==/UserScript==

(function()
{
	var aregexp = /^http:\/\/(\w+)\.blogspot\.com(\S*)/;
	if (document.location.href.match(aregexp))
	{
		document.location.href = "http://www.pkblogs.com/"+RegExp.$1+RegExp.$2;
	}
})();