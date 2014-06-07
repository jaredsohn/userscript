// IGN - Single Page View
// version 0.3
// 2005-07-20 (last updated 2009-12-13)
// Copyright (c) 2005, Julien Couvreur
// Released under the GPL license 
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// 
// ==UserScript==
// @name            IGN - Single Page View
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Combines the multi-page articles on IGN.com into single-page views.
// @include         http://ign.com/*
// @include         http://*.ign.com/*
// ==/UserScript==

// changelog:
// fixed for new Greasemonkey versions and DeerPark
// fixed for Firefox 1.5 and Greasemonkey 0.6.4. Untested on older versions.
// fix for IGN change (thx to Steven Barnett for reporting)

function injectMe(){
var document = unsafeWindow.document;

// make a url with page parameter incremented
function makeNextUrl(currentUrl) {
    var matches = currentUrl.match(/(^.*(?:\d*)p)(\d*)(\.html)/);
    var nextPage = 1 + parseInt(matches[2]);
    var nextUrl = matches[1] + nextPage + matches[3];
    return nextUrl;
}


function getNextPage(href) {   
    var xhr = new XMLHttpRequest();
    var loadingHref = makeNextUrl(href);
    
    xhr.open("GET", loadingHref, true);
    xhr.setRequestHeader('referer', "");
    
    xhr.onload = function() {
        var iframeOnload = function() {
            GM_log("Content from next page is loaded");
            var iframeDoc = iframe.contentDocument;
            iframeDoc.getElementsByTagName("body")[0].innerHTML = xhr.responseText;
            
            // stop condition (pages after the end of the article cause a 404)
            if (xhr.status == 404) {
                GM_log("Encountered a 404");
                return;
            }

            injectContent(iframeDoc);
            
            getNextPage(loadingHref);
        };
        
        var iframe = createIframe(iframeOnload);
    }
    xhr.send(null);
    GM_log("Loading the next page from: " + loadingHref);
}



function injectContent(iframeDoc) 
{
    // Take the interesting part out of the iframe (div with class=colCenterContent)
    // and stick it right after the interesting part in the main document
    var xpath = "//div[@class = 'articleBody']";
    
    var dest = document.evaluate(xpath, document, null,
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    GM_log("Number of matches for insertion point found: " + dest.snapshotLength);
    if (dest.snapshotLength > 0) 
    {
        var destNode = dest.snapshotItem(dest.snapshotLength - 1);
        
        var source = iframeDoc.evaluate(xpath, iframeDoc, null,
                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        GM_log("Number of matches for extraction point found: " + source.snapshotLength);
        if (source.snapshotLength > 0) 
        {
            destNode.parentNode.insertBefore(source.snapshotItem(0), destNode.nextSibling);
        }
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

// if not an article page, don't do anything
if (document.location.href.match(/\/articles\/.*p1\.html/) != null) 
{
    GM_log("Detected IGN article");
    // load and inject following page
    getNextPage(document.location.href);
}
}

injectMe();

/*
if (unsafeWindow) 
{
    eval(injectMe.toString(), unsafeWindow);
    eval("injectMe();", unsafeWindow);
}
*/
