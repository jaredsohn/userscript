// ==UserScript==
// @id          Edde's Testing script
// @name        Edde's Testing script
// @namespace   http://eddeyang.com
// @include     http://*itpub.net/*
// @version     1.0
// @updateURL   http://userscripts.org/scripts/source/164304.user.js
// @run-at      document-end
// ==/UserScript==

if(/itpub\.net/i.test(location.href))
{
    var as = document.getElementsByTagName("a");
    for(var i = 0; i < as.length; i++){
        var href = as[i].getAttribute("href");
        if (href && href.match(/attachment.php\?/i)){
            as[i].setAttribute("href", href.replace("attachment.php?", "forum.php?mod=attachment&"))
        }
    }
}
