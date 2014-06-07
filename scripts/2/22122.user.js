// ==UserScript==

// @name           OpenCourseWare Download Videos

// @namespace      OpenCourseWare

// @description    Changes the streaming Real links to download links.

// @include        http://ocw.mit.edu/OcwWeb/*
// @version	   1.0
// @author	   Bleh7777
// @website	   http://blockheadbleh.googlepages.com/index.html
// @license	   http://sam.zoy.org/wtfpl/
// ==/UserScript==
(function() {

    var processStreamingLinks = function() {
        var xpath = "//a[starts-with(@href,'http://mfile.akamai.com/7870/rm/mitstorage.download.akamai.com/7870')]";
        var res = document.evaluate(xpath, document, null,
                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        var linkIndex, streamingLink;
        for (linkIndex = 0; linkIndex < res.snapshotLength; linkIndex++) { 
		streamingLink = res.snapshotItem(linkIndex);
		streamingLink.href = streamingLink.href.replace("http://mfile.akamai.com/7870/rm/mitstorage.download.akamai.com/7870", "http://ocw.mit.edu/ans7870");
        }
    }
    
    window.addEventListener("load", processStreamingLinks, false);
    
})();
