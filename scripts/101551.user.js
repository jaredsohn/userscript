// ==UserScript==
// @name           us3rscr1pt - PornBanana Get Video 2011/04
// @namespace      http://www.pornbanana.com/
// @description    Download Videos from PornBanana
// @include        http://www.pornbanana.com/*
// ==/UserScript==

function checkForElementId()
{
    var e = document.getElementById('IVMPlayer');
    if (e != null)
    {
        var line = e.getAttribute("flashvars");
        var url = line.substring(line.indexOf("CDNUrl=")+7, line.indexOf("&CDN_HD_Url="));

        var lnk_dl = document.createElement("a");
        lnk_dl.href = url;
        lnk_dl.appendChild(document.createTextNode("Download this video (right click, save as)"));
        document.getElementById('player').appendChild(lnk_dl);
    }
}
window.addEventListener('load', checkForElementId, false);

