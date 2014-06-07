// ==UserScript==
// @name        ldr full feed changer
// @namespace   http://blog.fkoji.com/
// @include     http://reader.livedoor.com/reader/*
// @version     0.4
// ==/UserScript==

var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
var FULLFEED = {};
FULLFEED.exp = {
    "http://ameblo.jp/": {
        "s": '<div class="subContents">',
        "e": '<!--//.subContents-->'
    },
    "http://gigazine.net": {
        "s": '<!-- google_ad_section_start -->',
        "e": '<!-- google_ad_section_end -->'
    },
    "http://www.itmedia.co.jp": {
        "c": true,
        "s": '<!--BODY-->',
        "e": '<!--BODYEND-->'
    }
};
FULLFEED.target = {};
FULLFEED.get = function(key) {
    var nodes = document.evaluate(
        '//h2[@class="item_title"]//a',
        document,
        null,
        XPathResult.ORDERED_NODE_ITERATOR_TYPE,
        null
    );
    var bodies = document.evaluate(
        '//div[@class="item_body"]/div[@class="body"]',
        document,
        null,
        XPathResult.ORDERED_NODE_ITERATOR_TYPE,
        null
    );
    while (el = nodes.iterateNext()) {
        if (!el.textContent.match(/^AD:/)) {
            FULLFEED.target[el.href] = bodies.iterateNext();
            FULLFEED.request(key, el.href);
        } else {
            bodies.iterateNext();
        }
    }
};
FULLFEED.request = function(key, link) {
    var startExp = new RegExp(FULLFEED.exp[key].s);
    var endExp = new RegExp(FULLFEED.exp[key].e);
    var requestUrl = (FULLFEED.exp[key].c) ? 'http://api.feed-media.com/page2utf8.php?url=' + encodeURIComponent(link) : link;
    GM_xmlhttpRequest({method: "GET", url: requestUrl, onload: function(r) {
        var res = r.responseText;
        res.match(startExp);
        res = RegExp.rightContext;
        res.match(endExp);
        var contents = RegExp.leftContext;
        contents = contents.replace(/(<a [^>]*)(>)/gi, function(all, open, close) {
            return open + ' target="_balnk">';
        });
        FULLFEED.target[link].innerHTML = contents;
    }});
};
w.channel_widgets.add('full_feed', function(feed) {
    for (var key in FULLFEED.exp) {
        var reg = new RegExp(key);
        if (feed.channel.link.match(reg)) {
            return '<img src="http://api.feed-media.com/img/getcontentsmark.gif" alt="'+key+'" id="__ldr_full_feed_changer">';
        }
    }
    return '';
});
document.addEventListener(
    'keypress',
    function(event) {
        if (!document.getElementById('__ldr_full_feed_changer')) {
            return;
        }
        var key = String.fromCharCode(event.charCode);
        if (key == 'g') {
            FULLFEED.get(document.getElementById('__ldr_full_feed_changer').alt);
        }
    },
    false
);
