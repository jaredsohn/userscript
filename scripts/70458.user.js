// ==UserScript==
// @name           Citrix XennApp Timeoutless client
// @namespace      http://userscripts.org/scripts/edit/70458
// @description    Keeps you logged in Citrix XenApp web client by automatically "clicking" the refresh link once every 4 minutes
// @include        http://your_citrix_xenapp_server/*
// ==/UserScript==

function clickRefresh()
{
    // <a id="refreshLink" href="default.aspx?NFuse_Refresh=On" title="Click here to refresh the Applications screen">Refresh</a>
    // https://.../default.aspx?NFuse_Refresh=On
    var refreshEltList = document.evaluate('//a[@id="refreshLink"]', document, null, XPathResult.ANY_TYPE, null);
    var refreshElt = refreshEltList.iterateNext();

    if(refreshElt)
    {
        document.location.href = refreshElt.href;
    }
}

window.setTimeout(clickRefresh, 240000);
