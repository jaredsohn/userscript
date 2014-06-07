// Ninan www.newzbin.com/www.newzxxx.com Oneclick v2.1.0
// (c) 2007, Ninan Developers
// Amended 21 March 2008 - Chris Ryan
//   Change to the ninanurl value to enable usage with Version: 2.0.0 of Ninan
// Modified 30 June 2008 - Lars Jacobsen
//   Some recoding and simplification done.
//   Added download link on posting detail pages (see @description)
//   Added some comments
// Modified 27 June 2010 - Lars Jacobsen
//   Added "site" parameter to ninan url so the script works with NINAN 2.1.0
// --------------------------------------------------------------------
// ==UserScript==
// @name          NINAN OneClick 2.1.0
// @namespace     http://www.ninan.org
// @description   Adds NINAN "Download" links on posting lists and posting detail pages of the Newzbin2 and Newsxxx sites.
// @include       http*://*.newzbin2.es/*
// @include       http*://*.newzxxx.com/*
// ==/UserScript==
(
 
function() {
    // Edit the URL of your NINAN server. You must also supply the username & password (without the <...> around them).
    // Also, if you are using NzbMatrix instead of Newzbin, change the "site" parameter to "nzbmatrix".
    ninanurl = "http://localhost:9090/ninan/download?username=[USERNAME]&password=[PASSWORD]&site=newzbin";
 
    // NINAN download anchor tag, that will be inserted into the Newzbin pages (search/browse posting lists and posting detail pages):
    ninanAnchorTemplate = '<a title="Add to NINAN download queue" target="header" href="' + ninanurl + '&postId=${postid}">Download</a>';
 
    // Get anchor tags from document:
    anchors = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
 
    // Patterns to look for in anchor tags:
    listingPageAnchor = "/browse/post/";   // Posting detail anchor on listing pages
    detailsPageAnchor = "#CommentsPH"; // Comments QuickJump anchor on posting detail page
 
    // Look for listingPageAnchor pattern in the document URL (the URL that the browser is currently pointing at):
    postingDetailPageIndex = document.location.href.indexOf(listingPageAnchor);
 
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
            exist = url.indexOf(listingPageAnchor);
            if (exist != -1) 
            {
                // Insert a "Download" link after the link to the detail page
                postid = url.substring(exist + listingPageAnchor.length, url.length-1);
                ninanAnchor = ninanAnchorTemplate.replace("${postid}", postid);
                anchor.parentNode.innerHTML = anchor.parentNode.innerHTML + '&nbsp;<small>' + ninanAnchor + '</small>';
            } 
        } 
        // If we ARE on a posting detail page
        else if (url.indexOf(detailsPageAnchor) != -1) 
        {
            // Then we look for the "Attached Files" QuickJump link, and insert a "Download" link after that
            postid = document.location.href.substring(postingDetailPageIndex + listingPageAnchor.length, document.location.href.length-1);
            ninanAnchor = ninanAnchorTemplate.replace("${postid}", postid);
            anchor.parentNode.innerHTML = anchor.parentNode.innerHTML + '&nbsp;<li>' + ninanAnchor + '</li>';
        }
    }
})()