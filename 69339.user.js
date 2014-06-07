// ==UserScript==
// @name           Facebook count
// @namespace      Facebook.com
// @include        http://www.facebook.com/*
// @author	    	Gorenc01 (Jan Oblak)
// ==/UserScript==
function getNotificationCounts()
{
    var elem = document.getElementById('jewelAlert');
    if(elem.firstChild)
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