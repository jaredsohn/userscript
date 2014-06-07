// ==UserScript==
// @name       acgzone 右键审查还原 for chrome
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  还原右键审查
// @match      http://acgzone.us/*
// @copyright  2013, darknesswind
// ==/UserScript==

function replaceUrl()
{
    var urlList = document.getElementsByTagName("a");
    for (var i = 0; i < urlList.length; i++)
    {            
        var targetItem = urlList.item(i);
        if (targetItem.title.indexOf("右键审查") >= 0)
        {
            var isPicture = false;
            var attrs = targetItem.attributes;
            for (var j = 0; j < attrs.length; j++)
            {
                if (attrs.item(j).name == "才不是这里呢")
                {
                    if (attrs.item(j).value.search(/\x2e(jpge?|png|bmp|gif)/i) >= 0)
                    {
                        isPicture = true;
                    }
                }
            }
            
            if (isPicture)
            {
                targetItem.outerHTML = targetItem.outerHTML.replace(/<a/, "<img").replace(/a>/, "img>").replace(/才不是这里呢/, "src");
            }
            else
            {
                targetItem.outerHTML = targetItem.outerHTML.replace(/才不是这里呢/, "href");
            }
        }
        else if (targetItem.href.search(/\x2e(jpge?|png|bmp|gif)/i) >= 0)
        {
            targetItem.outerHTML = targetItem.outerHTML.replace(/<a/, "<img").replace(/a>/, "img>").replace(/href/, "src");
        }
    }
    

}
function replaceMoreLink()
{
    var linkList = document.getElementsByClassName("more-link");
    for (var i = 0; i < linkList.length; i++)
    {
        var targetItem = linkList.item(i);
        targetItem.outerHTML = targetItem.outerHTML.replace(/才不是这里呢/, "href");
    }
}

replaceUrl()
replaceMoreLink()
replaceUrl()
