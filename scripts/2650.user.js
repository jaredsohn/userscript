// ==UserScript==
// @name           MySpace live home page title
// @namespace      http://roub.net/xul/greasemonkey
// @description    Refresh MySpace home page once a minute, with new message and friend requests noted in the page title
// @include        http://home*.myspace.com/*
// ==/UserScript==


var preg = new RegExp("\\bfuseaction=user[^\\.]");

//  on home page?
if (preg.exec(document.location.href))
{
    var newMsgs = false;
    var friendReqs = false;

    var addStr = "";

    var lns = document.evaluate("//span[contains(.,'New Messages!')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

    if (lns)
    {
        var sp = lns.singleNodeValue;

        if (sp)
        {
            newMsgs = true;
        }
    }

    lns = document.evaluate("//span[contains(.,'New Friend Requests!')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

    if (lns)
    {
        sp = lns.singleNodeValue;

        if (sp)
        {
            friendReqs = true;
        }
    }

    if (newMsgs)
    {
        addStr = "new msgs";
    }

    if (friendReqs)
    {
        if (addStr != "")
        {
            addStr += ", ";
        }

        addStr += "new reqs";
    }

    if (addStr != '')
    {
        addStr += " - ";
    }

    //  set (possibly new) title
    document.title = addStr + document.title;

    //  and update in 1 minute
    window.setTimeout("window.location.reload('true');", 60000);
}

