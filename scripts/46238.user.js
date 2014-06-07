// ==UserScript==
// @name            sina tech accessibility layout
// @version         0.1
// @namespace       http://uestc.edu.cn/
// @author          eric lee
// @description     First version for tech.sina.com.cn
// @include         http://tech.sina.com.cn/*
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
            
        if (divNode.className == "blkContainerPblk" || divNode.className == "pages")
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
    
    bodyNode.style.display = "block";

    if (contentNodes.length == 0) return;
        
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