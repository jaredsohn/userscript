// ==UserScript==
// @name       Rotter.net Redirect Blocker
// @namespace  http://userscripts.org/scripts/show/114082/
// @version    0.2
// @description  Prevents Rotter.net from redirecting to the main page
// @include    http://rotter.net/*
// @copyright  2011+, Gilad Novik
// ==/UserScript==

var metas=document.evaluate("//meta[translate(@http-equiv,'REFSH','refsh')='refresh']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i=0;i<metas.snapshotLength;i++)
{
    var content=metas.snapshotItem(i).getAttribute("content");
    if (content==null)
        continue;
    var stopTimer = window.setTimeout("window.stop();",(content-1)*1000);
    window.addEventListener("load", function()
                            {
                                try { window.clearTimeout(stopTimer); } catch(ex) {}
                                window.stop();
                            }, true);
    break;
}
