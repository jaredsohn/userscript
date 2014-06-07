// Slashdot - Single Page View
// version 0.1
// 2005-07-25
// Copyright (c) 2005, Julien Couvreur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Slashdot - Single Page View
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Allows you to expand the slashdot comments without loading a new page.
// @include         http://slashdot.org/*
// @include         http://*.slashdot.org/*
// ==/UserScript==

// todo: make it work on comments.pl pages

function getPage(href, callback) {
    var iframe = createIframe(function() { callback(iframe.contentDocument); });
    iframe.src = href;
}

function createIframe(onload) {
    var iframe = document.createElement("iframe");
    iframe.onload = onload;
    iframe.src = "about:blank";
    iframe.style.width = '000px';
    iframe.style.height = '00px';
    iframe.style.border = '0px';    
    document.getElementsByTagName('body')[0].appendChild(iframe);
    return iframe;
}

// extract the center portion of a comments page
function extractComments(doc) {
    // remove three un-necessary table headers from the comments table
    var xpath = "//table/tbody/tr/td/table/tbody/tr/td/font/table//tr";
    var erase = doc.evaluate(xpath, doc, null,
                                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < erase.snapshotLength && i < 3; i++) { 
        var node = erase.snapshotItem(i);
        node.parentNode.removeChild(node);
    }


    // select and return main comments table
    var xpath = "//table/tbody/tr/td/table/tbody/tr/td/font/table";
    var table = doc.evaluate(xpath, doc, null,
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (table.snapshotLength > 0) {
        var ret = table.snapshotItem(0);
        return ret;
    }
}

// wire the link.onclick to load the more detailled comments and inject them into the main page
function instrumentLink(link) {
    //link.appendChild(document.createTextNode(" test"));

    var inject = function(body) { 
        var div = document.createElement("div");
        div.style.border = "2px solid";
        div.appendChild(extractComments(body));
        
        link.parentNode.parentNode.parentNode.appendChild(div);
        
        link.onclick = function() { 
            div.style.display = (div.style.display == 'none' ? '' : 'none');
            return false;
        }
    }
                                             
    link.onclick = function() {
        getPage(link.href, inject);
        return false;
    }
}


// ******************************* Main logic ******************************* //

// on articles.pl
var xpath = "//li/font/b/a";
var links = document.evaluate(xpath, document, null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (linkIndex = 0; linkIndex < links.snapshotLength; linkIndex++) { 
    instrumentLink(links.snapshotItem(linkIndex));
}
  
/*
// on comments.pl
var xpath = "//li/a";
var links = document.evaluate(xpath, document, null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (linkIndex = 0; linkIndex < links.snapshotLength; linkIndex++) { 
    var link = links.snapshotItem(linkIndex);
    link.appendChild(document.createTextNode(" test2"));
}
*/
  