// ==UserScript==
// @name           Reddit Comment Redirect
// @description    Redirects Reddit comments pages to location of article.  This is useful when using Google Reader.
// @include        http://www.reddit.com/*comments/*
// @version        0.10
// ==/UserScript==

if (history.length <= 1 || document.referrer == "")
{
    // Try to get the target URL from the page URL.
    var start = document.location.href.indexOf("comments/") + "comments/".length
    var end = document.location.href.indexOf("/", start);
    var id = "title_t3_"+ document.location.href.substring(start,end);
    var targetURL = document.getElementById(id);
    var redirect = false;
    
    // If the page URL doesn't contain the target URL, try to get it from the page contents
    if(targetURL == null)
    {
        var trimRe = /^\s+|\s+$/g;
    
        var as = document.getElementsByTagName("a");
        for(var i = 0; i < as.length; i++)
        {
            var a = as[i];
            var className = a.className.replace(trimRe, "");
            var target = a.target.replace(trimRe, "");
            var parentClassName = a.parentNode.className.replace(trimRe, "");
            if((className == "title" || className == "title loggedin") 
                && (target == "_blank" || target == "")
                && (parentClassName == "title" || parentClassName == "title loggedin"))
            {
                targetURL = a.href;
                redirect = true;
                break;
            } // end if
        } // end for
    } // end if
    
    if (document.location.href != targetURL && redirect) 
    {
        window.location = targetURL;
    } // end if
} // end if