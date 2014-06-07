// ==UserScript==  
// @name         s-WebReplace  
// @include      *  
// @description  replace "www.linuxsir.org/bbs" with "bbs.linuxsir.org"  
// ==/UserScript==  
  
    (function()  
{  
    var allLinks = document.links;  
  
    if (allLinks != null)  
    {  
        for (i = 0; i <allLinks.length; ++i)  
            {  
                if (allLinks [i].href.indexOf ("www.linuxsir.org/bbs") > 0)  
                {  
                allLinks [i].href = allLinks [i].href.replace ("www.linuxsir.org/bbs", "bbs.linuxsir.org");  
                }  
            }  
    }  
}  
)();  