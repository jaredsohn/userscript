// ==UserScript==
// @name           Xitek forum show comments positive-sequence
// @namespace      http://iworm.net
// @description    Just replace "showthread.php" to "sorthread.php" in order to show thread in positive-sequence
// @include        http://forum.xitek.com/*
// ==/UserScript==

(function()
{
    var allLinks = document.links;

    if (allLinks != null)
    {
        for (i = 0; i <allLinks.length; ++i)
        {
            if (allLinks [i].href.indexOf ("xitek.com") > 0)
            {
                allLinks [i].href = allLinks [i].href.replace ("showthread.php", "sorthread.php");
            }
        }
    }
}
)(); 
