// ==UserScript==
// @name           MyBB User Ignore
// @namespace      MyBB
// @description    Completely hide threads, posts and quotes of specific users.
// @include        http://community.mybboard.net/*
// ==/UserScript==

(function()
{
    var mybbuid = "1";
    var mybbname = "admin";

    var rows = document.getElementsByTagName('tr');

    for(var i=0; i < rows.length; i++)
    {
        if(rows[i].innerHTML.match("href=\"user-"+mybbuid+".html\""))
        {
            rows[i].style.display="none";
        }
    }

    var quotes = document.getElementsByTagName('blockquote');

    for(var i=0; i < quotes.length; i++)
    {
        if(quotes[i].innerHTML.match("</span>"+mybbname+" Wrote: <a"))
        {
            quotes[i].style.display="none";
        }
    }
})();