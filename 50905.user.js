// ==UserScript==
// @name    GFW'ed flickr links fix as of 2009-06-06
// @version 0.1
// @author  electronixtar
// @match   http://*/*
// @match   https://*/*
// @match   file://*/*
// ==/UserScript==

var a = document.getElementsByTagName('a');
for(var i=0;i<a.length;i++)
{
    var l=a[i].href;
    if(l.indexOf('static.flickr.com')<15 && l.indexOf('static.flickr.com')>6)
    {
        a[i].href=l.replace('farm4.static.flickr.com', '76.13.18.77').replace(/(farm[123]\.)static\.flickr\.com/, '$1static.flickr.a00.yahoodns.net');
    }
}

var a = document.images;
for(var i=0;i<a.length;i++)
{
    var l=a[i].src;
    if(l.indexOf('static.flickr.com')<15 && l.indexOf('static.flickr.com')>6)
    {
        a[i].src=l.replace('farm4.static.flickr.com', '76.13.18.77').replace(/(farm[123]\.)static\.flickr\.com/, '$1static.flickr.a00.yahoodns.net');
    }
}