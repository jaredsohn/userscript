// ==UserScript==
// @name          MyBlogLog Page Title View
// @namespace     http://jmblog.jp/
// @description   This script works just on MyBlogLog stats report page. It shows the title of your blog page (that the readers clicked and viewed) when moving a mouse over the url.
// @include       http://www.mybloglog.com/*
// ==/UserScript==

// ChangeLog
// 2006-03-30 - 0.1 - initial release
// 2006-04-06 - 0.5 - refactoring
// 2006-07-15 - 1.0 - update for MyBlogLog Communities
// 2007-04-19 - 1.5 - speed up (use XPath and cache the results of HTTP response)

var tCache = {};
window.addEventListener('load',function() {
    var snapTds = document.evaluate("//tbody[@id='view_tbody']//td[a]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < snapTds.snapshotLength; i++) {
        var elem = snapTds.snapshotItem(i);
        if (elem.firstChild.title.match(/^http/)){
            setPageTitle(elem.firstChild.title, new Array(elem, elem.firstChild));
        }
    }
}, false);

document.addEventListener('mouseover', function(event) {
    // event.target is the element that was clicked
    var t = event.target;
    for(var i=0; i < document.getElementById('poppagestbody').childNodes.length; i++){
        var e = document.getElementById('poppagestbody').childNodes[i].childNodes[0];
        if (t == e && e.innerHTML.match(/^http/) && !e.getAttribute("title")){
            setPageTitle(e.innerHTML, new Array(e));
        }
    }
}, true);

function setPageTitle(url, elems){
    for (var i = 0; i < elems.length; i++){
        if (tCache[url]){
            elems[i].setAttribute('title', tCache[url]);
            //GM_log('use cache : ' + tCache[url]);
        } else {
            elems[i].setAttribute('title', 'Please wait...');
        }
    }
    if (tCache[url]) return;
    //GM_log('start http request to ' + elems[0].innerHTML);
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(responseDetails) {
            var html = responseDetails.responseText;
            var result = responseDetails.responseText.match(/<title>(.+)<\/title>/i);
            if (result != null) {
                for (var i = 0; i < elems.length; i++){
                    elems[i].setAttribute('title',result[1]);
                }
                tCache[url] = result[1];
                //GM_log('set title : ' + result[1]);
            }
        }
    });
}
