// ==UserScript==
// @name           51nb域名统一处理
// @include        http://www.thinkpad.cn/forum/*
// @include        http://www.51nb.com/forum/*
// ==/UserScript==
(
function()
{
        var url = window.location.href;
        var urls = ["http://www.thinkpad.cn/forum","http://www.51nb.com/forum"];
        
        for(var i = 0; i < urls.length; i++){
			if(url.indexOf(urls[i])==0) 
			{
					window.location.replace(location.href.replace(urls[i], "http://forum.51nb.com"));
			}
        }
}
)
();