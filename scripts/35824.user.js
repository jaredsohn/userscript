// ==UserScript==
// @name           Google Patent Search Links
// @namespace      http://userscripts.org/users/70263
// @include        http://www.google.com/patents?*
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (var i = 0; i < links.length; i++)
{
    var url = links[i].href;
    var firstAmp = url.indexOf('&');

    // If dq is after the first ampersand modify
    // the link to use the chars before the amp.

    if(url.substr(firstAmp+1, 2) == "dq")
    {
        links[i].href = url.substr(0,firstAmp);
    }
}