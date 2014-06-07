// Ninan v3.newzbin.com Oneclick v2.0
// (c) 2007, Ninan Developers
// Amended 21 March 2008 - Chris Ryan
//   Change to the ninanurl value to enable usage with Version: 2.0.0 of Ninan
// Modified 30 June 2008 - Lars Jacobsen
//   Some recoding and simplification done.
//   Added download link on posting detail pages (see @description)
//   Added some comments
// --------------------------------------------------------------------
// ==UserScript==
// @name          NINAN OneClick 2.0
// @namespace     http://www.ninan.org
// @description   Adds NINAN "Download" links on posting lists and posting detail pages of the Newzbin and Newsxxx sites.
// @include       http://www.newzbin.com/*
// @include       https://www.newzbin.com/*
// @include       http://www.newzxxx.com/*
// @include       https://www.newzxxx.com/*
// ==/UserScript==
(
 
function() {
    // Edit the URL of your NINAN server. You must also supply the username & password (without the <...> around them).
    ninanurl = "http://localhost:9090/ninan/download?username=<username>&password=<password>";
 
    // NINAN download anchor tag, that will be inserted into the Newzbin pages (search/browse posting lists and posting detail pages):
    ninanAnchorTemplate = '<a title="Add to NINAN download queue" target="header" href="' + ninanurl + '&postId=${postid}">Download</a>';
 
    // Get anchor tags from document:
    anchors = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
 
    // Patterns to look for in anchor tags:
    postUrl = "/browse/post/";   // Posting detail link
    attachedUrl = "#AttachedPH"; // QuickJump link on posting detail page
 
    // Look for postUrl pattern in the document URL (the URL that the browser is currently pointing at):
    postingDetailPageIndex = document.location.href.indexOf(postUrl);
 
    // Loop thru the anchor tags:
    for (var i=0; i<anchors.snapshotLength; i++) 
    {
        anchor = anchors.snapshotItem(i);
        url = anchor.href;
 
        // If we are on any other page, than the posting detail page
        if (postingDetailPageIndex == -1)
        {
            // Skip links that we're not interested in
            if (url.indexOf("similar") > -1) continue;
            if (url.indexOf("/nzb") > -1) continue;
            if (url.indexOf("/#C") > -1) continue;
 
            // If the link is to a posting detail page
            exist = url.indexOf(postUrl);
            if (exist != -1) 
            {
                // Insert a "Download" link after the link to the detail page
                postid = url.substring(exist + postUrl.length, url.length-1);
                ninanAnchor = ninanAnchorTemplate.replace("${postid}", postid);
                anchor.parentNode.innerHTML = anchor.parentNode.innerHTML + '&nbsp;<small>' + ninanAnchor + '</small>';
            } 
        } 
        // If we ARE on a posting detail page
        else if (url.indexOf(attachedUrl) != -1) 
        {
            // Then we look for the "Attached Files" QuickJump link, and insert a "Download" link after that
            postid = document.location.href.substring(postingDetailPageIndex + postUrl.length, document.location.href.length-1);
            ninanAnchor = ninanAnchorTemplate.replace("${postid}", postid);
            anchor.parentNode.innerHTML = anchor.parentNode.innerHTML + '&nbsp;<li>' + ninanAnchor + '</li>';
        }
    }
})()