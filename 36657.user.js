// ==UserScript==

// @name           UnProtect LinkProtector

// @namespace      byteforum.info/greasemonkey

// @description    link from link-protector

// @include        *link-protector.com*

// ==/UserScript==

if(String(window.location).match(/https?:\/\/link-protector\.com\/\d/i))

{
	var oldBody = document.getElementsByTagName('body').item(0).innerHTML;
	document.getElementsByTagName('head').item(0).innerHTML = '';
	document.getElementsByTagName('body').item(0).innerHTML = '';

	var url = oldBody.match(/(http:\/\/rapidshare\.com[^"]*)/i);
	var url = oldBody.match(/(?:<iframe src=")([^"]*)(?:" name="url")/i)
	if (url!=null && url.length>1) 

	{
		document.getElementsByTagName('head').item(0).innerHTML = '<title>'+url[1]+'</title>';
		document.title = url[1];
		document.getElementsByTagName('body').item(0).innerHTML = '<a href="' + url[1] + '">' + url[1] + '</a><br/>';
	}
}
