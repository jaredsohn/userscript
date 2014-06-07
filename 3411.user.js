// ==UserScript==
// @name           Dellit
// @namespace      http://www.webdever.net/
// @description    Add del.icio.us links for reddit
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// @include        http://reddit.com/
// @include        http://*.reddit.com/
// ==/UserScript==

var allLinks;

allLinks = document.evaluate( "//table[@id='siteTable']", 
document, 
null, 
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);


allLinks = document.evaluate( '//tr', 
allLinks, 
null, 
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
null);
    
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink=allLinks.snapshotItem(i);
    if (thisLink.id) {
        thisLinkl=allLinks.snapshotItem(i + 1);
        thisLinkl=document.evaluate("//td[@class='wide little']", thisLink, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(i/3);
        thisLinkLink=allLinks.snapshotItem(i);
        thisLinkLink=document.evaluate("//a[@id]", thisLink, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        thisLinkLinkTitle= thisLinkLink.snapshotItem(i/3).innerHTML;
        thisLinkLinkURL= thisLinkLink.snapshotItem(i/3).href;
        delIt = document.createElement('span');        postTarget = 'http://del.icio.us/post?v=4;url='+encodeURIComponent(thisLinkLinkURL)+';title='+encodeURIComponent(thisLinkLinkTitle);        delIt.innerHTML = "<a class=\"bylink\" href=\'" + postTarget + "\'>del.icio.us</a>";
        thisLinkl.innerHTML += "<span>" + delIt.innerHTML + "</span>";
        }
    }