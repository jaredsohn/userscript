// ==UserScript==
// @name           BaiduNews_Directly
// @namespace      http://userscripts.org/scripts/show/104267
// @description    Click on links of Baidu News directly
// @version        1.0
// @author         redWood
// @include        http://news.baidu.com/*
// ==/UserScript==

theElements = document.getElementsByTagName('a');
for (var i = 0; i < theElements.length; i++)
{
    srcInTag = theElements[i].href;
    result = srcInTag.indexOf("n?cmd=2");
    if (result >= 0)
    {
        srcInTag = srcInTag.substring(7);
        start = srcInTag.indexOf("http");
        stop1 = srcInTag.indexOf("&clk");
        stop2 = srcInTag.indexOf("&cls");
        if (stop1 > 0)
            srcInTag = srcInTag.substring(start, stop1);
        else if (stop2 > 0)
            srcInTag = srcInTag.substring(start, stop2);
        else
            srcInTag = srcInTag.substring(start);
        srcInTag = decodeURIComponent(srcInTag);
        theElements[i].href = srcInTag;
    }
}
