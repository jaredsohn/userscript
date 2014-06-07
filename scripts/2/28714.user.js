// ==UserScript==
// @name                GIS XPointer
// @author              Hoàng Đức Hiếu
// @description     Change green text under Google Image Search to point exactly to the image on its original page
// @include             http://images.google.com*
// ==/UserScript==

// License:
//  This script is placed in the public domain.
//  If the above is not possible where you live, permission is granted for you to use, distribute, modify and distribute modified versions of this script for any purpose.

// Dependencies: the URLs produced here are XPointers
//  For Firefox: FXPointer <http://www.codedread.com/fxpointer/>
//  For Opera: XPointer UserJS <http://student.kuleuven.be/~s0159198/xpointer/>

// Remarks:
//  Customize Google's streaming magically works with this, saved my sleep
//  Tested with Fx3.1a1pre 2008061803, FXPointer 0.2.7, Customize Google 0.72
//  Tested with Opera 9.50 and XPointer UserJS 2008-06-16
//  Created on 2008-06-19
//  last tested on 2008-06-21

function xpathSelect(expr, context, result_type) {
    var type = (result_type == "first") ? XPathResult.FIRST_ORDERED_NODE_TYPE : XPathResult.ANY_TYPE;
    return document.evaluate(expr, context, null, type, null);
}

function make_fragment(file_name) {
 return "#xpointer(//img[contains(@src,'" + file_name + "')]|//a[contains(@href,'" + file_name + "')])";
}

var img_links = document.getElementsByClassName("ext"); // a.ext are created by Customize Google
if (img_links.length > 0) {
    for (var i=0; i < img_links.length; i+=1) {
        var file_name = img_links[i].href.replace(/.*\/(.*)/, "$1");
        var link_container_id = img_links[i].parentNode.id.replace("tDataImage", "tDataText");
        var page_link = xpathSelect("descendant::a", document.getElementById(link_container_id), "first").singleNodeValue;
        page_link.href += make_fragment(file_name);
    }
} else {
    var edit_cache = [];
    var xpathResult = xpathSelect("//a[starts-with(@href, '/imgres?')]", document, null);
    while (item = xpathResult.iterateNext()) {
        var file_name = item.href.replace(/.*imgurl=[^&]*\/([^&]*)&.*/, "$1");
        var page_url = item.href.replace(/.*imgrefurl=([^&]*)&.*/, "$1");
        var a = document.createElement("a");
        a.href = page_url + make_fragment(file_name);
        link_container_id = item.parentNode.id.replace("tDataImage", "tDataText");
        var e = xpathSelect("font/font[last()]", document.getElementById(link_container_id), "first").singleNodeValue;
        a.innerHTML = e.innerHTML;
        var p = e.parentNode;
        edit_cache.push([p, a, e]);
    }
    for (var i=0; i < edit_cache.length; i+=1) {
        var p = edit_cache[i][0];
        var a = edit_cache[i][1];
        var e = edit_cache[i][2];
        p.replaceChild(a, e);
    }
}