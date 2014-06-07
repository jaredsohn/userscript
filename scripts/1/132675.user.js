// ==UserScript==
// @name           pchome_replace  
// @namespace      http://www.52lifan.cn
// @description    replace "plus.kdslife.com/my/topic.html" with "my.pchome.net/self/"
// @include        http://*.pchome.net/*

// ==/UserScript==
      
        (function()  
    {  
        var allLinks = document.links;  
      
        if (allLinks != null)  
        {  
            for (i = 0; i <allLinks.length; ++i)  
                {  
                    if (allLinks [i].href.indexOf ("plus.kdslife.com/my/topic.html") > 0)  
                    {  
                    allLinks [i].href = allLinks [i].href.replace ("plus.kdslife.com/my/topic.html", "my.pchome.net/self/");  
                    } 

                    if (allLinks [i].href.indexOf ("app.kdslife.com") > 0)  
                    {  
                    allLinks [i].href = allLinks [i].href.replace ("app.kdslife.com", "wap.kdslife.com");  
                    }  
                }  
        }  
    }  
    )();  