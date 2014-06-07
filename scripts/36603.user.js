// ==UserScript==

// @name           UnProtect Rapidsafe.net

// @namespace      byteforum.info/greasemonkey

// @description    rapidshare link from rapidsafe

// @include        *rapidsafe.net*

// ==/UserScript==

if(String(window.location).match(/https?:\/\/www\.rapidsafe\.net\//i))

{
	var rs_url = document.documentElement.innerHTML.match(/(http:\/\/rapidshare\.com[^"]*)/i);
	if (rs_url!=null && rs_url.length>1) 

	{
		document.getElementsByTagName('head').item(0).innerHTML = '<title>'+rs_url[1]+'</title>';
		document.title = rs_url[1];
		document.getElementsByTagName('body').item(0).innerHTML = '<a href="' + rs_url + '">' + rs_url[1] + '</a><br/>';
	}
}
