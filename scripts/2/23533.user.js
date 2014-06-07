// ==UserScript==

// @name          FasterCB
// @version       1.0
// @description 替换CnBeta.com的新闻转向链接为直接链接，直达新闻页面，使访问更加快捷！
// @author        xinzhi
// @namespace http://xinzhi.org
// @include       http://cnbeta.com/*

// @include       http://www.cnbeta.com/*
// @include       http://*.cnbeta.com/*

// ==/UserScript==



    (function()

{

    var newsLinks = document.links;



    if (newsLinks != null)

	{

		for (i = 0; i <newsLinks.length; ++i)

			{

				if (newsLinks [i].href.indexOf ("cnbeta.com/article.php") > 1)

				{

				newsLinks [i].href = newsLinks [i].href.replace('.php?sid=','s/')+".htm"; 

				}

			}

	}

}

)();