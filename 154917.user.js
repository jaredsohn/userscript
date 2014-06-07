// ==UserScript==
// @name        XA Google Ads & Tracker Remover
// @author      XA(Twitter:@xatest)
// @namespace   http://userscripts.org/scripts/show/154917
// @description Removes Ads and Tracking from Google Search
// @include     http://*.google.com/search?*
// @include     https://*.google.com/search?*
// @include     http://*.google.com.hk/search?*
// @include     https://*.google.com.hk/search?*
// @match       http://*.google.com/search?*
// @match       https://*.google.com/search?*
// @match       http://*.google.com.hk/search?*
// @match       https://*.google.com.hk/search?*
// @version     1.0.12
// ==/UserScript==

links = document.getElementsByTagName("a");
for (var i = 0; i < links.length; i++)
{
    links[i].removeAttribute("onmousedown");
}

setInterval(function () { remove(); }, 500);

function remove()
{
    //window.setTimeout(wait, 1000);
    //GM_log("Removing");

    removeNodeByID("tads"); //Top Adverts
    //removeNodeByID("taw"); //Removes search word correction
    removeNodeByID("bottomads"); //Bottom Adverts
    removeNodeByID("mbEnd"); //Side Adverts
    removeNodeByID("extrares"); //Related Search Words
    removeNodeByID("botstuff"); //Related Search Words#
    removeNodeByID("tvcap");
}


function removeNodeByID(id)
{
    node = document.getElementById(id);
    if (node != null)
    {
        node.parentNode.removeChild(node);
    }
}
