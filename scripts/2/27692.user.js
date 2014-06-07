// Removing all PbReview.com Advertising
// version 0.2
// 2008-05-29 - Initial Release - Change Log at Bottom
// Copyright (c) 2008
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Remove PbReview.com Ads
// @namespace     http://w3.org/1999/xhtml
// @description   Removes all the annoying ads on PbReview.com
// @include	  http://*pbreview.com*
// ==/UserScript==


// -----------------------------------------------------
// THIS GETS RID OF THE TOP AD
// -----------------------------------------------------

var allTds, thisTds;

allTds = document.evaluate(
    "//center",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allTds.snapshotLength; i++) {
    thisTds = allTds.snapshotItem(i);

	thisTds.parentNode.removeChild(thisTds)
    // do something with thisTds
}



// -----------------------------------------------------
// THIS GETS RID OF MIDDLE FORUM AD
// -----------------------------------------------------

var allTds, thisTds;

allTds = document.evaluate(
    "//a[contains(@href,'/aasc/')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allTds.snapshotLength; i++) {
    thisTds = allTds.snapshotItem(i);

	thisTds.parentNode.removeChild(thisTds)
    // do something with thisTds
}


// ------------------------------------------------------
// THIS SECTION REMOVES ALL IFRAMES AND THEIR CORRESPONDING ADS
// ------------------------------------------------------

var alliFrames, thisiFrame;
alliFrames = document.getElementsByTagName('iframe');
for (var i = 0; i < alliFrames.length; i++) {
    thisiFrame = alliFrames[i];
    // do something with iFrame
	thisiFrame.width = 0;
	thisiFrame.height = 0;
}



// -----------------------------------------------------
// THIS GETS RID OF SPONSORS FRONT PAGE AD
// -----------------------------------------------------

var allTds, thisTds;

allTds = document.evaluate(
    "//td[@bgcolor='FF9900']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allTds.snapshotLength; i++) {
    thisTds = allTds.snapshotItem(i);

	thisTds.parentNode.removeChild(thisTds)
    // do something with thisTds
}



// ------------------------------------------------------
// THIS SECTION REMOVES THE KONTERA LINK ADS THAT ANNOY YOU
// ------------------------------------------------------


window.uhohintelliTXT = function(event) {
    if ((event.target.nodeName.toLowerCase() === 'a') || (event.target.nodeName.toLowerCase() === 'span')) {
        if (event.target.hasAttribute('class')) {
            var strClassName = event.target.getAttribute('class');
            if ((strClassName.indexOf('kLink') >= 0) || 
                (strClassName.indexOf('iAs') >= 0) || 
                (strClassName.indexOf('intellitextLink') >= 0)) 
            {
                var xpathResult = document.evaluate('descendant-or-self::*', event.target, null, 

XPathResult.STRING_TYPE, null);
                var textnodeLinkText = document.createTextNode(xpathResult.stringValue);
                event.target.parentNode.replaceChild(textnodeLinkText, event.target)
            }
        }
    }
}

var nlScriptElements = document.getElementsByTagName('script');

for (var i=0; i<nlScriptElements.length; i++) {
    if (nlScriptElements[i].hasAttribute('src')) {
        var strScriptElemSrcAttribVal = nlScriptElements[i].getAttribute('src');
        if (typeof(strScriptElemSrcAttribVal) === 'string') {
            if ((strScriptElemSrcAttribVal.indexOf('kontera.com') >= 0) || 
                (strScriptElemSrcAttribVal.indexOf('intellitxt.com') >= 0) )
            {
                document.addEventListener('DOMNodeInserted',window.uhohintelliTXT,true);
                break;
            }
        }
    }
}



/*

CHANGE LOG
05-29-2008 - Initial Release
06-02-2008 - Removed Final Forum Ad

*/