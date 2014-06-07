// ==UserScript==
// @name           facebook (notice count)
// @namespace      facebook.com
// @include        http://www.facebook.com/*
// ==/UserScript==
function getNotificationCounts()
{
    var elem = document.getElementById('jewelAlert');
    if(elem.firstChild && elem.firstChild.style.display != "none")
    {
        
        var count = elem.firstChild.firstChild.innerHTML;
        if(count - 0 > 0)
        {
            document.title = "Facebook " + "(" + count + ")";
        }
    }
    else
    {
        document.title = "Facebook";
    }
}

setInterval(getNotificationCounts,10000);
getNotificationCounts();