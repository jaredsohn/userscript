// ==UserScript==
// @name           4chan - Highlight all sage posts
// @namespace      sage (http://userscripts.org/scripts/show/36554)
// @description    Looks for all mailto:sage hyperlinks and changes them from the default blue colour to red. This is useful as you can distinguish posts with sage in the email field from posts with genuine email addresses. 
// @include        http://*.4chan.org/*
// @include        https://*.4chan.org/*
// ==/UserScript==

function HighlightIfSage(a)
{
    if (a.href.indexOf("mailto:") == 0) 
    {
        if (a.href.toLowerCase().indexOf("sage") != -1)
        {
            a.style.color = "red";
            a.style.fontStyle = "italic";
        }
    }
}

Array.forEach(document.getElementsByTagName('A'), HighlightIfSage);

/*
 * 4chan X's thread expansion and thread updater
 */
 
function OnDOMNodeInserted(e)
{
    if(e.target.nodeName == "DIV")
    {
        Array.forEach(e.target.getElementsByTagName('A'), HighlightIfSage);
    }
}

document.body.addEventListener("DOMNodeInserted", OnDOMNodeInserted, false);
