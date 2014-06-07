// Xanga RSS Links
// version 0.2 BETA
// 2005-10-30
// Copyright (c) 2005 Josh Staiger, josh@joshstaiger.org
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Xanga Rss Links", and click Uninstall.
//
// * Instruction text lifted from Mark Pilgrim's Butler
// * http://diveintomark.org/projects/butler/
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// Adds visible RSS links to Xanga blogs, and makes them RSS
// autodiscovery aware.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Xanga RSS Links
// @namespace     http://joshstaiger.org/projects/xangarsslinks
// @description	  Adds visible RSS links to Xanga blogs, and makes them RSS autodiscovery aware.
// @include       http://*.xanga.com/*
// @include       http://xanga.com/*
// ==/UserScript==


// Simplify XPath calls

function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Get Xanga username from url

function getUser() {
    var titleElement = xpath('//title').snapshotItem(0);
    
    //    alert(titleElement);

    if(!titleElement) {return;}

    var titleString = titleElement.innerHTML;

    //    alert(titleString);

    var userRegex = /^(\w+)'s Xanga Site/; 
    var userMatch = userRegex.exec(titleString);

//    alert(userMatch);

    if(!userMatch) {return;}

    var userString = userMatch[1];

//    alert(userString);

    return userString;
}


// RSS Hyperlink text and XML graphic

function getRSSLinkHTML(user) {
    var xmlImgSrc = 'data:image/gif,GIF89a%24%00%0E%00%D5%00%00%D5X%04%F1%D4%C0%E1%5D%04%FF%F6%F0%FFr%15%E0%A7%82%F7%E9%E0%E5%5E%04%F4d%05%ED%C9%B1%F0c%05%FA%F4%EF%DF%9Er%FF%ABs%F7%E0%D0%D0r3%E7%BD%A1%FF%E3%D1%9FA%03%FF%E6%D5%E5%84C%FF%854%FF%DA%C1%CEU%04%CDg%23%FF%ED%E1%E7%B3%91%E8%AB%82%D4a%14%F0l%14%E4w.%DDn%24%F0%C1%A1%F8%D7%C1%FF%7C%24%E6%7B3%F3%C2%A1%FA%96S%F0%AE%82!%0E%01%F9%B2%82%FF%D1%B2%FF%8FD%FF%B4%82%7D3%02%FF%9AW%C2P%04%3F%1A%01%FF%C8%A4%FF%FF%FF%FFf%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%24%00%0E%00%00%06%CA%C0%09lH%2C%1A%8F%C8%A3%A7%25k%3A%9F%D0%A84%CAbN%AFX%AA%B5%D9%88%0D%082U%2CBX%C5b%95%26%EC%1C%8EY%A6Uh(%96%20db%8F%8B9%06A%10%CE1.b%01%00RqO%22%0B1%0E1%0C.%08f%8A%1F%2B%03g%821%84%86%5BN%25g%01.%072f%10t%03%24%96%83%85ZQb1%06%1CMf%05%20g%18%A8%98%AAP%87N%04%03%03%8C%1A%B11%05%23t.%B7%99%ABO)%8D%0Fg%14%A2%C3%02%08.%00%B7%06%1B%2B%2B*O%BB2%5D%9F%07(%AE%1D%B2%02N%B7%801%26%0AN%DE2%07%D5M%02..2%F4%E7N%F52%0A%F5%FE%F92%DEe%19HE%C2%8B%83%08%13*%5C%C8p%E1%89%20%00%3B';
    
    var html = '<a href="http://www.xanga.com/rss.aspx?user='+user+'"><img src="'+xmlImgSrc+'" alt="XML Logo" width="36px" height="14px" border="0" style="vertical-align: middle;" /></a> <a href="http://www.xanga.com/rss.aspx?user='+user+'">RSS</a>';

    return html;
}


// Add visible RSS Hyperlink to header (if it exists)

function addHeaderRssLink(user) {
    var headerTable = xpath('//table[@class="header"]').snapshotItem(0);

    if (!headerTable) {	return; }
 
    headerTr = headerTable.getElementsByTagName('tr')[0];

    var rssTd = document.createElement('td');
    rssTd.setAttribute('align', 'right');

    rssTd.innerHTML = getRSSLinkHTML(user);
    

    headerTr.appendChild(rssTd);
}

function addSidbarRssLink(user) {
    var sidebarTd = xpath('//td[@class="mainleft"]').snapshotItem(0);

    if (!sidebarTd) {return;}

    var profileTable = sidebarTd.getElementsByTagName('table')[0];
    
    if(!profileTable) {return;}

    var userTr = profileTable.getElementsByTagName('tr')[0];

    if(!userTr) {return;}
    
    var rssTr = document.createElement('tr');

    var rssTd = document.createElement('td');
    
    rssTd.setAttribute('class', 'left');
    
    rssTd.innerHTML = getRSSLinkHTML(user);
    
    rssTr.appendChild(rssTd);
        
    userTr.parentNode.insertBefore(rssTr, userTr.nextSibling);

}


// Add visible RSS hyperlinks and  XML graphics

function addRssVisibleLink(user) {
    addHeaderRssLink(user);
    addSidbarRssLink(user);
}

// Add alternate link reference to head (mostly for autodiscovery)

function addRssHeadLink(user) {
    var head = document.getElementsByTagName('head')[0];

    if(!head) { return; }

    var link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('type', 'application/rss+xml');
    link.setAttribute('title', 'RSS 1.0');
    link.setAttribute('href', 'http://www.xanga.com/rss.aspx?user='+user);

    head.appendChild(link);
    
}

var user = getUser();

if(!user){return;}

addRssVisibleLink(user);
addRssHeadLink(user);
