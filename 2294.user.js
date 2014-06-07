// ==UserScript==
// @name          Fix MySpace nav links
// @namespace     http://roub.net/
// @description   Replaces myspace search navigation links (1, 2, 3, previous, next...) with real links.
// @include       http://*.myspace.com/*
// ==/UserScript==
//
// History: http://roub.net/xul/greasemonkey/fixmyspacenavlinks.history.txt
//

var f = document.getElementById("PageForm");

var st = "";

if (f)
{
    for (var i = 0; i < f.elements.length; ++i)
    {
        var n = f.elements.item(i).name;
        var v = f.elements.item(i).value;

        if (v == null)
        {
            v = "";
        }

        if (n != 'page')
        {
            st += n + "=" + escape(v) + "&";
        }
    }

    var ls = document.links;
    var linkRegex = new RegExp("javascript:NextPage\\('?([0-9]+)'?\\)");

    for (i = 0; i < ls.length; ++i)
    {
        var l = ls[i];

        if (l.href)
        {
            var matches = linkRegex.exec(l.href);
            if (matches && (matches.length > 0))
            {
                var oldHref = l.href;

                l.href = "index.cfm?" + st + "&page=" + matches[1];
            }
        }
    }
}

