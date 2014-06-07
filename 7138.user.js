//---------------------------------------------------
// Stopped working?  Not working 100% any longer?
// Give me a description of the problem.
// Email: i-at-ihearth4x0ring.info
//---------------------------------------------------
// Last Modified: $Date: 2007-01-16 15:43:12 +0800 (Tue, 16 Jan 2007) $
//---------------------------------------------------
// * Removes annoying Snap URL "preview" in-page popups
// * Removes TechCrunch sponsors, "Recent Readers"
// * Removes banners
// * Widens text column to fill page
//------------------- Changes -----------------------
// Jan 16, 2007: 1.0
//---------------------------------------------------

// ==UserScript==
// @name TechCrunch Degunker
// @namespace http://projects.briandonovan.info/projects/greasemonkey-user-scripts/
// @description Un-crapifies TechCrunch so that you can get your rumors and baseless speculation without the gunk.
// @include http://*.techcrunch.com/*
// ==/UserScript==

//------------ Remove Snap URL Preview ---------------
var nlAnchors = document.getElementsByTagName('a');
for (var i=0; i<nlAnchors.length; i++) {
    var strAttribValAnchorClass = nlAnchors[i].getAttribute('class');
    //---------------------------------------------------
    var strNewAttribVal = 'snap_nopreview';
    if (typeof(strAttribValAnchorClass) === 'string') {
        strNewAttribVal += strAttribValAnchorClass;
    }
    //---------------------------------------------------
    nlAnchors[i].setAttribute('class', strNewAttribVal);
}

//----------------- Remove Sidebar -------------------
var nodeSidebarsDiv = document.getElementById('sidebars');
if (nodeSidebarsDiv != null) {
    nodeSidebarsDiv.style.display='none';
}

// Remove Banner Ad next to Site Name (not always present) 
var nodeSiteNameBannerAd = document.getElementById('bannerad');
if (nodeSiteNameBannerAd != null) {
    nodeSiteNameBannerAd.style.display='none';
}

// Hide Any DIVs with attribute "align" set to "center" (banners)
var xpathResult = document.evaluate('//div[@align="center"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i<xpathResult.snapshotLength; i++) {
    var nodeToHide = xpathResult.snapshotItem(i);
    nodeToHide.style.display='none';
}

// Hide Any DIVs with attribute "style" set to "text-align: center;" (ad rectangles)
var xpathResult = document.evaluate('//div[@style="text-align: center;"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i<xpathResult.snapshotLength; i++) {
    var nodeToHide = xpathResult.snapshotItem(i);
    nodeToHide.style.display='none';
}

//----------- Widen Content to Fill Page -------------
var nodeContentDiv = document.getElementById('content');
if (nodeContentDiv != null) {
    nodeContentDiv.style.width='97%';
}
