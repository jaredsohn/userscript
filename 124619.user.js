// ==UserScript==
// @name           polsy.org.uk-ify youtube links
// @namespace      http://polsy.org.uk
// @description    Converts YouTube video links to the equivalent polsy.org.uk viewer link
// @include        *
// @exclude        http://polsy.org.uk/*
// @exclude        http://*youtube.com/*
// ==/UserScript==

var hrefs = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (i = 0; i < hrefs.snapshotLength; i++) {
    var hr = hrefs.snapshotItem(i);

    m = hr.href.match('^(https://(?:www.)?youtube.com/watch\\?[-=&#\\w]+)');
    if(m == null) {
        m = hr.href.match('^(https://youtu\\.be/[-\\w]+(?:\\?t=\\d+m\\d+s)?)');
    }

    if(m != null) {
        hr.href = 'http://polsy.org.uk/play/yt/?vurl=' + encodeURIComponent(m[1]);
    }
}
