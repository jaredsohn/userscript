// ==UserScript==
// @name         Google Snapshot Over Wall
// @include      http://www.google.com/*
// @include      http://www.google.com.hk/*
// @description  在中国内地使用Google快照功能，默认将HTTP连接替换成为HTTPS
// @version      0.1
// @author       janxin@Twitter
// ==/UserScript==

(function(){
    var allLinks = document.links;
    
	if (allLinks != null)
	{
		for(i = 0; i <allLinks.length; ++i)
		{
			if (allLinks [i].href.indexOf ("webcache.googleusercontent.com") > 0)
			{
				allLinks [i].href = allLinks [i].href.replace ("http://webcache", "https://webcache");
			}
		}
	}
}
)();