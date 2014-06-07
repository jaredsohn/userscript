// Google IG Gmail Secure script
// version 1.0
// 12/20/2005
// Copyright (c) 2005, Josh Goldie
// based on Google IG Gmail Compose Text Link
// by Randall Wald
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google IG Gmail Secure", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Google IG Gmail Secure Link
// @description Rewrites all links in the gmail section of ig to use https
// @include http://*.google.com/ig
// ==/UserScript==

   
    // Find the gmail block
    gmailBlock = document.getElementById('gmseesum').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    //Change the link in the block
    rewriteLink(document.getElementById(gmailBlock.id + "_url"));

    //Get the Inbox link...
    rewriteLink(gmailBlock.childNodes[2].childNodes[0].childNodes[0].childNodes[0].firstChild);

    //Add a Compose link that has the https:// 
    //This idea comes from the Google IG Gmail Compose Text Link script
    emptyTD = gmailBlock.childNodes[2].childNodes[0].childNodes[0].childNodes[1];
    composeTD = document.createElement('td');
    composeFont = document.createElement('font');
    composeFont.size = -1;
    composeLink = document.createElement('a');
    composeLink.href = 'https://mail.google.com/gmail?view=cm&fs=1&tearoff=1';
    composeLink.target='_blank';
    composeLink.appendChild(document.createTextNode('Compose'));
    composeFont.appendChild(composeLink);
    composeTD.appendChild(composeFont);
    emptyTD.parentNode.replaceChild(composeTD, emptyTD);

    //rewrite all the links to the individual messages
    allMessageDivs = document.evaluate(
	"//div[@class='tls']",
	gmailBlock,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
    for (i = 0; i < allMessageDivs.snapshotLength; i++)
    {
        thisMessageDiv = allMessageDivs.snapshotItem(i);
	rewriteLink(thisMessageDiv.firstChild);
    }


//Takes a link and rewrites the href to use https
//also changes the target to be _blank
function rewriteLink(link)
{
  newLinkText = link.href.replace('http:', 'https:');
  link.href = newLinkText;
  link.target="_blank";
}

