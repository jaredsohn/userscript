// ==UserScript==
// @name           [TS] Youtube No Redirects/Ads/Alerts
// @namespace      TimidScript
// @description    Removes Tracker/Redirects/Alerts/Promoted Videos
// @include        *//www.youtube.*
// @version        2.0.9
// @require        http://userscripts.org/scripts/source/159301.user.js
// @resource  meta http://userscripts.org/scripts/source/86268.meta.js
// @icon           data:image/gif;base64,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
// ==/UserScript==

/* Information
********************************************************************************************
Copyright © TimidScript
TimidScript's Homepage:         http://userscripts.org/users/100610
Script's Homepage:              http://userscripts.org/scripts/show/86268

----------------------------------------------
    Version History
----------------------------------------------

********************************************************************************************/

removeLinkTracking();
removePromotedNodes(document.getElementsByClassName("promoted-videos list-view yt-lockup-list pyv-promoted-videos"));
var intervalHandle = setTimeout(function () { removeAlerts(); }, 500);

function removeNode(id)
{
    var node = document.getElementById(id);
    if (node) node.parentNode.removeChild(node);
}


function removeAlerts()
{
    removeNode("alerts");
    removeNode("ticker");
}

function removePromotedNodes(eles)
{    
    for (i = 0; i < eles.length; i++)
    {        
        eles[0].parentNode.removeChild(eles[i]);
    }
}

function removeLinkTracking()
{
    // Thanks go to Avindra V.G. from userscripts.org
    var links = document.getElementsByClassName("yt-uix-redirect-link");
    for (var i = links.length - 1; i >= 0; --i) links[i].removeAttribute("class");
}

