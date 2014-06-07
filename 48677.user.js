// ==UserScript==
// @name            75w reader
// @version         0.1
// @namespace       http://uestc.edu.cn/
// @author          eric lee
// @description     First version for reader of book.75w.cn
// @include         http://book.75w.cn/files/*
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
            
        if (divNode.className == "read_body" || divNode.className == "top_menu")
        {              
            contentNodes.push(divNode);
        }
    }
    
    alert(contentNodes.length);
    return contentNodes;
}

function extractContent()
{ 
    alert("window.frames.length = " + window.frames.length); 
    for (var k = 0; k < window.frames.length; k++)
    {
        alert("window.frames[k].src = " + window.frames[k].src);
        alert("window.frames[k].id = " + window.frames[k].id);
        alert("window.frames[k].name = " + window.frames[k].name);
    }
    var bodyNode = document.getElementsByTagName("body").item(0);
    contentNodes = getContentNodes();
    
    if (contentNodes.length == 0) return;
    
    bodyNode.style.display = "block";
    while(bodyNode.firstChild)
    {
        bodyNode.removeChild(bodyNode.firstChild);
    }
    
    alert("contentNodes.length = " + contentNodes.length);
    for (var i = 0; i < contentNodes.length; i++)
    {
        bodyNode.appendChild(contentNodes[i]);
    }        
}

extractContent();