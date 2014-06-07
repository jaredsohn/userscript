// ==UserScript==
// @name           MB Discogs Title adder v1.0
// @namespace      Auz
// @description    Checks Discogs links on MusicBRainz edit search and re-writes the links
// @include        http://musicbrainz.org/mod/search/results.html?*
// @include        http://*.musicbrainz.org/mod/search/results.html?*
// ==/UserScript==

if (!GM_xmlhttpRequest) {
    alert('Please upgrade to the latest version of Greasemonkey to use the full features of this script.');
    return;
} else {
    //alert("scanning page");
}

var allLinks;

allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    //alert(i + '/' + allLinks.snapshotLength);
    if (allLinks.snapshotItem(i).href.search('discogs.com/release') > -1) {
        //alert(i + ': ' + allLinks.snapshotItem(i).href);
        addtitle(allLinks.snapshotItem(i));
    }
}

function addtitle(link) {

GM_xmlhttpRequest({
        method:"GET",
        url:link.href,
        headers:{"User-Agent":"monkeyagent"},
        onload:function(content){
            var pagename = content.responseText.match(/<title>([^<]+)<\/title>/);
            var discogid = link.href.match(/release\/(\d+)/);
            link.innerHTML = discogid[1] + ' ("' + pagename[1] + '")';
        }
    })
}

