// ArsTechnica - Single Page View
// version 0.1
// 2005-10-20
// Copyright (c) 2005, Julien Couvreur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            ArsTechnica - Single Page View
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Combines the multi-page articles on ArsTechnica.com into single-page views.
// @include         http://arstechnica.com/*
// @include         http://*arstechnica.com*
// ==/UserScript==


// make a url with page parameter incremented
function makeNextUrl(baseUrl, pageNumber) {
    var nextUrl = baseUrl + "/" + pageNumber;
    return nextUrl;
}

var xpathNext = "//h2/a[contains(text(), 'Next Â»')]";

function getNextPage(href, pageNumber) {   
    var xhr = new XMLHttpRequest();
    var loadingHref = makeNextUrl(href, pageNumber);
    
    xhr.open("GET", loadingHref, true);
    xhr.setRequestHeader('referer', "");
    
    xhr.onload = function() {
        var iframeOnload = function() {
            var iframeDoc = iframe.contentDocument;
            iframeDoc.getElementsByTagName("body")[0].innerHTML = xhr.responseText;
            
            // stop condition
            var getMore = false;
            if (getNode(iframeDoc, xpathNext)) {
                getMore = true;
            }

            injectContent(iframeDoc);
            
            if (getMore) {
                getNextPage(href, pageNumber+1);    
            }
            
        };
        
        var iframe = createIframe(iframeOnload);
    }
    xhr.send(null);
}



function injectContent(iframeDoc) 
{
    cleanIFrame(iframeDoc);
    
    // Take the interesting part out of the iframe
    // and stick it right after the interesting part in the main document
    var xpath = "//form[last()]";
    var dest = document.evaluate(xpath, document, null,
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (dest.snapshotLength > 0) 
    {    
        var source = document.evaluate(xpath, iframeDoc, null,
                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (source.snapshotLength > 0) 
        {
            var destNode = dest.snapshotItem(dest.snapshotLength - 1);
            destNode.parentNode.insertBefore(source.snapshotItem(1), destNode.nextSibling);
        }
    }
}

function getNode(iframeDoc, xpath) {
    var source = document.evaluate(xpath, iframeDoc, null,
                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (source.snapshotLength > 0) {
        return source.snapshotItem(0);
    }
}

function cleanIFrame(iframeDoc) 
{
    var node1 = getNode(iframeDoc, "//h1");
    if (node1) {
        node1.parentNode.removeChild(node1);
    }
    
    var node2 = getNode(iframeDoc, "//div[@class = 'ArticlePageSelector']");
    if (node2) {
        node2.parentNode.removeChild(node2);
    }
    
    var node3 = getNode(iframeDoc, "//p[@class = 'PageAuthors']");
    if (node3) {
        node3.parentNode.removeChild(node3);
    }
    
    var node4 = getNode(iframeDoc, "//p[@class = 'PostDate']");
    if (node4) {
        node4.parentNode.removeChild(node4);
    }
}

function createIframe(onload) {
    var iframe = document.createElement("iframe");
    iframe.addEventListener("load", onload, false);
    iframe.src = "about:blank";
    iframe.style.width = '000px';
    iframe.style.height = '00px';
    iframe.style.border = '0px';    
    document.getElementsByTagName('body')[0].appendChild(iframe);
    return iframe;
}


// ******************************* Main logic ******************************* //


// if this is the first page of an article...
if (document.location.href.match(/\.ars$/) != null) 
{
    // and if there is a next pages...
    if (getNode(document, xpathNext)) {
        // load and inject following page
        getNextPage(document.location.href, 2);
    }
}

