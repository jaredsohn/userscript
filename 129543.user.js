// ==UserScript==
// @name           E-Reader-Forum Lastpost
// @description    Fix last post redirects being cached on E-Reader-Forum.de
// @include        http://www.e-reader-forum.de/*
// ==/UserScript==

for each (var link in document.links)
{
    if(link.href && link.href.indexOf('first-new-post.html') > 0)
    {
        if(link.href.indexOf('?') > 0)
        {
            link.href = link.href + '&';
        }

        else
        {
            link.href = link.href + '?';
        }

        link.href = link.href + "grease=" + Math.random(36).toString();
    }
}
