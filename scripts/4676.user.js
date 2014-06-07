// ==UserScript==
// @name           test
// @namespace      http://www.cobryce.com/greasemonkey
// @description    test
// @include        http://www.wouldyouhitthis.com/*
// ==/UserScript==

var ms;
var basetitle;

function ClockItYo()	//ms, basetitle)
{
    if(ms>0)
    {
        document.title = basetitle  + " | Refreshing in " + ((ms/1000)) + "s";
		ms = ms-1000;
        window.setTimeout(ClockItYo, 1000);
    } else {
        window.location.reload('true');
    }
}

//This is a chunk of vestigial code I'd like to adapt for Facebook, with friends and pokes and messages and events etc.
//  on home page?
if (false)	//preg.exec(document.location.href)
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
}

//  update in .x minutes (30000-90000) and pass off to our title counter
var randomnumber=10000;
basetitle = document.title;
ms = randomnumber;
window.setTimeout(ClockItYo, 1000);