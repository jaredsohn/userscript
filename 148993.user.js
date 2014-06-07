// ==UserScript==
// @name           KDS短消息老界面  
// @namespace      Mac(我不是猴子)
// @description    将新版本的短消息替换成老版本的，新版本太渣
// @match          http://*
// ==/UserScript==
      
        (function()  
    {  
        var allLinks = document.links;  
      
        if (allLinks != null)  
        {  
            for (i = 0; i <allLinks.length; ++i)  
                {  
                    if (allLinks [i].href.indexOf ("plus.kdslife.com/chat.html") > 0)  
                    {  
                    allLinks [i].href = allLinks [i].href.replace ("plus.kdslife.com/chat.html", "my.pchome.net/message/");  
                    }  
                }  
        }  
    }  
    )();  