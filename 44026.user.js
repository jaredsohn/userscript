// ==UserScript==
// @name            wulihu reader
// @version         0.1
// @namespace       http://uestc.edu.cn/
// @author          eric lee
// @description     First version for reader of wulihu
// @include         http://www.wulihu.cn/thread*
// ==/UserScript==

﻿function getContentNodes()
{
    var contentNodes = new Array();
    var divNodes = document.getElementsByTagName("div");
    var divNode = null;
    var len = divNodes.length;
    
    var dubugInfos = new Array();
    
    for (var i = 0; i < len; i++)
    {
        divNode = divNodes[i];
            
        if (divNode.className == "t_msgfont" || divNode.className == "pages"  || divNode.className == "box postattachlist" || divNode.className == "ad_textlink2")
        {              
            contentNodes.push(divNode);
        }
    }
    
    return contentNodes;
}

function extractContent()
{  
    var bodyNode = document.getElementsByTagName("body").item(0);
    contentNodes = getContentNodes();
    
    if (contentNodes.length == 0) return;
    
    bodyNode.style.display = "block";
    while(bodyNode.firstChild)
    {
        bodyNode.removeChild(bodyNode.firstChild);
    }
    
    for (var i = 0; i < contentNodes.length; i++)
    {
        bodyNode.appendChild(contentNodes[i]);
    }        
}

extractContent();

