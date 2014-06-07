// ==UserScript==
// @name          blog.hu : posts : full comment list
// @namespace     http://blog.hu/
// @include       http://*.blog.hu/2*
// ==/UserScript==
exceptions = []; // ["subba", "w"]
if (window.location.search.indexOf("fullcommentlist=1") == -1)
{
	var blog = window.location.hostname;
	var redirect = true;
	blog = blog.substr(0, blog.indexOf("."));
	for (var n = 0; n < exceptions.length; n++)
		if (blog == exceptions[n])
		{
			redirect = false;
			break;
		}
	
	if (redirect)
	{
		var search = window.location.search;
		if (search != "")
			search = "&" + search.substr(1);
		window.location.replace( 
			window.location.protocol + "//" + window.location.host + window.location.pathname + 
			"?fullcommentlist=1" + search + window.location.hash);
	}
}