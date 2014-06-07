// ==UserScript==
// @name Alternate History Link Fixer
// @namespace http://www.d80tb7.com/ fish/
// @description Fix Links at alternate History
// @grant       none
// @include http://www.alternatehistory.com/*
// @include http://alternatehistory.com/*
// @include http://www.alternatehistory.org/*
// @include http://alternatehistory.org/*
// @include http://www.alternatehistory.net/*
// @include http://alternatehistory.net/*
// ==/UserScript==

var domain = document.domain

var links,thisLink;
links = document.evaluate("//a[contains(@href, 'alternatehistory')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i=0;i<links.snapshotLength;i++) {
    var thisLink = links.snapshotItem(i); 
    var linkParts = thisLink.href.replace('http://','').replace('https://','').split(/[/?#]/);
    var linkDomain = linkParts[0];
    if(startsWith(linkDomain, "www.alternatehistory.") || startsWith(linkDomain, "alternatehistory.")){
        var link= linkParts[1];                                                                                    
        thisLink.href = thisLink.href.replace(linkDomain, domain);                                                                             
    }
    
}
                                                                                     

function startsWith(string,startVal)
{
    return string.substring(0, startVal.length) === startVal
}