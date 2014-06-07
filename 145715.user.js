// ==UserScript==
// @name           kwejk parser
// @description    XD
// @version        1.0
// @date           09-14-2012
// @author         Anonymous
// @include        http://www.karachan.org/*
// @include        http://karachan.org/*
// ==/UserScript==

(function(){
	
	var i = document.body.innerHTML.match(/<font color=orange>e<\/font>/ig);
	
	if (i != null)
	{
		if (i.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/<font color=orange>e<\/font>/ig,'e');
		}	
	}
	
})();
