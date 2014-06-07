// ==UserScript==
// @name           hi-pda.com 让Chrome在发帖后自动回到火星
// @namespace      http://www.hi-pda.com/forum/
// @include        http://www.hi-pda.com/forum/*
// @description    hi-pda 让Chrome在发帖后自动转向
// 
// ==/UserScript==

// 参考了automatic redirection http://userscripts.org/scripts/review/63621
// 谢谢
// 判读的几种方式:
// 1. http-equiv=refresh
// 2. =3 
// 3. indexOf(refresh)

//返回时间-默认3秒
Return = 3;
Discovery = "3 url=";

(function () {
	var contentURL = document.getElementsByTagName("meta");
	var metaCount = contentURL.length;
	for(var i=0; i<metaCount; i++)
	{
		var tag=contentURL[i].content.substring(0,6);
		if (tag.indexOf(Discovery)==0 && Discovery.indexOf(tag)==0)
		{
			var originalContent = contentURL[i].content.substring(1);
			var modContent = Return + "; " + originalContent;
			contentURL[i].content = modContent;
		}
	}
})();