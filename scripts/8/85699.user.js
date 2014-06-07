// ==UserScript==
// @name           Digg Comment Redirect
// @description    Redirects Reddit comments pages to location of article.  This is useful when using Google Reader.
// @include        http://digg.com/news/*
// ==/UserScript==

if (history.length <= 1)
{
    var trimRe = /^\s+|\s+$/g;
    var targetURL = document.location.href;
    var aArray = document.getElementsByTagName("a");
    var redirect = false;
    for(var i = 0; i < aArray.length; i++)
    {
        var a = aArray[i];
        var className = a.className.replace(trimRe, "");
        if(className == "story-title" 
            || className == "story-item-title"
            || className == "digg-it diggable group")
        {
            targetURL = a.href;
            redirect = true;
            break
        } // end if
    } // end for
    
    if (document.location.href != targetURL && redirect) 
    {
        window.location = targetURL;
    } // end if
} // end if
