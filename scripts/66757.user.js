// ==UserScript==
// @name           polsy.org.uk-ify video site links
// @namespace      http://polsy.org.uk
// @description    Converts video site links to the equivalent polsy.org.uk viewer link
// @include        *
// @exclude        http://polsy.org.uk/*
// @exclude        http://blip.tv/*
// @exclude        http://*.blip.tv/*
// @exclude        http://www.nicovideo.jp/*
// @exclude        http://www.veoh.com/*
// @exclude        http://www.viddler.com/*
// @exclude        http://www.wegame.com/*
// ==/UserScript==

// To disable this for a given site, place // in front of the four lines that make the
// change for that site - eg
//    //m = hr.href.match('^(http://(?:\\w+\\.)?blip.tv/file/\\d+)');
//    //if(m != null) {
//    //    hr.href = 'http://polsy.org.uk/play/blip/?vurl=' + encodeURIComponent(m[1]);
//    //}

var hrefs = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (i = 0; i < hrefs.snapshotLength; i++) {
    var hr = hrefs.snapshotItem(i);

    m = hr.href.match('^(http://(?:\\w+\\.)?blip.tv/file/\\d+)'); // old blip format
    if(m != null) {
        hr.href = 'http://polsy.org.uk/play/blip/?vurl=' + encodeURIComponent(m[1]);
    }
    m = hr.href.match('^(http://(?:\\w+\\.)?blip.tv/[-\\w]+/[-\\w]+\\d+)'); // new blip format
    if(m != null) {
        hr.href = 'http://polsy.org.uk/play/blip/?vurl=' + encodeURIComponent(m[1]);
    }

    m = hr.href.match('^http://www.nicovideo.jp/watch/([a-z0-9]+)');
    if(m != null) {
        hr.href = 'http://polsy.org.uk/play/nico/?vidid=' + encodeURIComponent(m[1]);
    }

    m = hr.href.match('^(http://www.veoh.com/.+/watch/[A-Za-z0-9]+)');
    if(m != null) {
        hr.href = 'http://polsy.org.uk/play/veoh/?vurl=' + encodeURIComponent(m[1]);
    }

    m = hr.href.match('^http://www.viddler.com/explore/([-\\w]+)/videos/(\\d+)');
    if(m != null) {
        hr.href = 'http://polsy.org.uk/play/viddler/?user=' + m[1] + '&video=' + m[2];
    }
    m = hr.href.match('^(http://www.viddler.com/v/[a-z0-9]+)');
    if(m != null) {
        hr.href = 'http://polsy.org.uk/play/viddler/?vurl=' + m[1];
    }

    m = hr.href.match('^(http://www.wegame.com/watch/[-\\w]+)');
    if(m != null) {
        hr.href = 'http://polsy.org.uk/play/wegame/?vurl=' + encodeURIComponent(m[1]);
    }
}
