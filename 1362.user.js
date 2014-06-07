// ACM Queue Single Page View
// version 0.1
// 2005-07-10
// Copyright (c) 2005, Julien Couvreur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            ACM Queue Single Page View
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Redirects to printer-friendly versions of pages. Combines all the pages for one ACM Queue article into one view.
// @include         http://acmqueue.com/*
// @include         http://www.acmqueue.com/*
// @include         http://acmqueue.org/*
// @include         http://www.acmqueue.org/*
// ==/UserScript==


// make a url with page parameter incremented
function makeNextUrl(currentUrl) {
    var matches = currentUrl.match(/(^.*(?:&|\?)page=)(\d)(&.*$|$)/);
    var nextPage = 1 + parseInt(matches[2]);
    var nextUrl = matches[1] + nextPage + matches[3];
    return nextUrl;
}

function getNextPage(href) {
    var xhr = new XMLHttpRequest();
    var loadingHref = makeNextUrl(href);
    xhr.open("GET", loadingHref, true);
    xhr.setRequestHeader('referer', ""); // acmqueue validates the referer
    
    xhr.onload = function() {
        var iframeOnload = function() {
            var iframeDoc = iframe.contentDocument;
            iframeDoc.getElementsByTagName("body")[0].innerHTML = xhr.responseText;
            
            // pages after the last one have few paragraphs
            if (iframeDoc.getElementsByTagName("p").length < 5) {
                //eraseIframe(iframe);
                cleanPage();
                return;
            }
            
            var hr = document.createElement("hr");
            document.getElementsByTagName('body')[0].appendChild(hr);
            
            stripNavTables(iframeDoc);
            var loadedBody = iframeDoc.getElementsByTagName('body')[0];
            document.getElementsByTagName('body')[0].appendChild(loadedBody);
            
            //eraseIframe(iframe);
            getNextPage(loadingHref);
        };
        
        var iframe = createIframe(iframeOnload);
    }
    xhr.send(null);
}

function createIframe(onload) {
    var iframe = document.createElement("iframe");
    iframe.onload = onload;
    iframe.src = "about:blank";
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.style.border = '0px';    
    document.getElementsByTagName('body')[0].appendChild(iframe);
    return iframe;
}

function eraseIframe(iframe) {
    iframe.parentNode.removeChild(iframe);
}

function redirectToPrinterFriendly() {
    var xpath = "//a[contains(@href,'pa=printer_friendly')]";
    var res = document.evaluate(xpath, document, null,
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (res.snapshotLength > 0) 
    {
        document.location.href = res.snapshotItem(0);
    }
}

// ******************************* Ad filtering ******************************* //

function cleanPage() {
    /*
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) 
    {
        tables[i].style.display = "none";
    }
    */
    
    stripAds("a", "/adclick.php");
    stripAds("a", "/adlog.php");
    stripAds("a", "javascript:history");
    stripAds("img", "/adimage.php");  
    stripObjects();
}

function stripAds(tag, pattern) {
    var xpath = "//" + tag + "[contains(@href, \"" + pattern + "\")]";
    var res = document.evaluate(xpath, document, null,
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < res.snapshotLength; i++) {
        res.snapshotItem(i).style.display = "none";
    } 
}

function stripObjects() {
    var xpath = "//object";
    var res = document.evaluate(xpath, document, null,
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < res.snapshotLength; i++) {
        var obj = res.snapshotItem(i);
        obj.parentNode.removeChild(obj);
    } 
}

function stripSubscriptionAds() {
    // select tables whose first tbody/tr/td/text contains "Subscribe"
    var xpath = "//table";
    var res = document.evaluate(xpath, document, null,
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < res.snapshotLength; i++) {
        res.snapshotItem(i).style.display = "none";
    }  
}

function stripNavTables(doc) {
    var tables = doc.getElementsByTagName("table");
    for (var i = 0; (i < tables.length) && (i < 3); i++) 
    {
        tables[i].style.display = "none";
    }
    
    for (var i = 1; (i < tables.length + 1) && (i < 3); i++) 
    {
        tables[tables.length - i].style.display = "none";
    }
}

// ******************************* Main logic ******************************* //


// if not a printer-friendly page, try and redirect to one
if (document.location.href.match(/(&|\?)pa=printer_friendly(&|$)/) == null) 
{
    redirectToPrinterFriendly();
    return;
}

// if not page 1, then don't process it
if (document.location.href.match(/(&|\?)page=1(&|$)/) == null) 
{
    return;
}
stripNavTables(document);

// otherwise, start fetching the following pages
getNextPage(document.location.href);

function addGlobalStyle(css) {
    var style = document.createElement("style");
	style.type = "text/css";
    style.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(style);
};
    
addGlobalStyle("body { margin: 80px }");
