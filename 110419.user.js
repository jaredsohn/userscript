// ==UserScript==
// @name           Murator Redirect Remover
// @namespace      toomyem
// @description    Removes redirects for external links on Murator Forum
// @include        http://forum.muratordom.pl/*

var all = document.getElementsByTagName("A");
var prefix = "http://forum.muratordom.pl/redirector.php?url=";

var decode = function(s)
{
    return s.replace(/%([a-f0-9]{2})/gi, function(g0,g1)
        {
            return String.fromCharCode(parseInt(g1, 16))
        });
}

for(var i = 0; i < all.length; i++)
{
    var link = all[i];
    var hr = link.getAttribute("href");
    if(hr != null && hr.indexOf(prefix) == 0)
    {
        link.setAttribute("href", decode(hr.substring(prefix.length)));
    }
}

// ==/UserScript==
