// ==UserScript==
// @name           MySpace Title Updater
// @description    Updates homepage title to notify on new messages, blog posts/comments, friend requests, etc.
// @include        http://home*.myspace.com/*
// ==/UserScript==


var preg = new RegExp("\\bfuseaction=user[^\\.]");

//  on home page?
if (preg.exec(document.location.href))
{
    var newMsgs = false;
    var friendReqs = false;
    var blogComments = false;
    var newComment = false;
    var newPictureComment = false;
    var blogSubscription = false;
    var newInvite = false;
    
    var addStr = "";

    var lns = document.evaluate("//a[contains(.,'New Messages!')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

	GM_log(lns.singleNodeValue.innerHTML);

    if (lns)
    {
        var sp = lns.singleNodeValue;

        if (sp && (sp.parentNode.getAttribute('class').indexOf('hide') == -1))
        {
            newMsgs = true;
        }
    }

    lns = document.evaluate("//a[contains(.,'New Friend Requests')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    
    if (lns)
    {
        sp = lns.singleNodeValue;

        if (sp && (sp.parentNode.getAttribute('class').indexOf('hide') == -1))
        {
            friendReqs = true;
        }
    }

    lns = document.evaluate("//a[contains(.,'New Blog Comment')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    
    if (lns)
    {
		sp = lns.singleNodeValue;
		
        if (sp && (sp.parentNode.getAttribute('class').indexOf('hide') == -1))
        {
			blogComments = true;
		}
    }
    
    lns = document.evaluate("//a[contains(.,'New Blog Subscription Post')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        
    if (lns)
    {
		sp = lns.singleNodeValue;
		
        if (sp && (sp.parentNode.getAttribute('class').indexOf('hide') == -1))
        {
			blogSubscription = true;
		}
    }
    
    lns = document.evaluate("//a[contains(.,'New Comments!')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    
    GM_log(lns.singleNodeValue.parentNode.getAttribute('class').indexOf('hide'));

    if (lns)
    {
		sp = lns.singleNodeValue;
		
        if (sp && (sp.parentNode.getAttribute('class').indexOf('hide') == -1))
		{
			newComment = true;
		}
    }
    lns = document.evaluate("//a[contains(.,'New Picture Comments!')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    
    if (lns)
    {
		sp = lns.singleNodeValue;
		
        if (sp && (sp.parentNode.getAttribute('class').indexOf('hide') == -1))
		{
			newPictureComment = true;
		}
    }
	lns = document.evaluate("//a[contains(.,'New Event Invitation!')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    
    if (lns)
    {
		sp = lns.singleNodeValue;
		
        if (sp && (sp.parentNode.getAttribute('class').indexOf('hide') == -1))
		{
			newInvite = true;
		}
    }	
    
    if (newMsgs)
    {
        addStr += "M";
    }

    if (friendReqs)
    {
        addStr += "F";
    }
    
    if (blogComments)
    {
        addStr += "B";
    }
    if (blogSubscription)
    {
        addStr += "S";
    }
    if (newComment)
    {
        addStr += "C";
    }
    if (newPictureComment)
    {
    	addStr += "P";
    }
    if (newInvite)
    {
    	addStr += "I";
    }
    if (addStr != '')
    {
        addStr = " - [" + addStr + "]";
    }
    

    //  set (possibly new) title
    document.title = document.title + addStr;
    alert("addStr");

    //  and update in 1 minute
    window.setTimeout("window.location.reload('true');", 60000);
}



