// ==UserScript==
// @name           Anti redirect for Live Messenger 2011
// @author         Bruno Leonardo Michels
// @namespace      System
// @include        http://link.smartscreen.live.com/*l=*
// ==/UserScript==

var qs = (function ()
{
    return function(a)
        {
            if (a == "") return {};
            var b = {};
            for (var i = 0; i < a.length; ++i)
            {
                var p=a[i].split('=');
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
            return b;
       }(window.location.search.substr(1).split('&'))
})();

window.location.href = qs["l"];