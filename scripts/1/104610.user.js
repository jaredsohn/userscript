// ==UserScript==
// @name         Popup Blocker
// @namespace    ???
// @description  A simple popup blocker that prevents clickjacking
// @include      *
// ==/UserScript==

var blocklist = 
[
    "adtgs.com",
    "greatbranddeals.com",
    "megaclick.com",
    "ringtonepartner.com",
    "tracking101.com",
    "vayus.com",
    "vuiads.de",
    "zedo.com"
];

for(var i = 0; i < blocklist.length; i++)
{
    if(window.location.toString().indexOf(blocklist[i]) != -1)
    {
        window.open("", "_self", "");
        window.close();
    }
}

unsafeWindow.openOld = unsafeWindow.open;
unsafeWindow.open = function(windowURL, windowName, windowParameters)
    {
        for(var i = 0; i < blocklist.length; i++)
        {
            if(windowURL.indexOf(blocklist[i]) != -1)
            {
                //alert(blocklist[i] + " popup blocked!");
                return null;
            }
        }
        return unsafeWindow.openOld(windowURL, windowName, windowParameters);
    }