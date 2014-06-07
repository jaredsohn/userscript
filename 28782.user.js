// ==UserScript==
// @name        google reader full feed changer
// @namespace   http://blog.fkoji.com/
// @include     http://www.google.*/reader/*
// @include     https://www.google.*/reader/*
// @version     0.50
// ==/UserScript==

var SITE_INFO = [
    {
        url:    'http://(rssblog.ameba.jp|ameblo.jp)',
        xpath:  '//div[@class="subContents"]'
    },
    {
        url:    'http://journal.mycom.co.jp',
        xpath:  '//div[@id="articleMain"]/div[@class="articleContent"]',
        charset:   'Shift_JIS'
    },
    {
        url:    'http://(plaza.rakuten.co.jp|api.plaza.rakuten.ne.jp)',
        xpath:  '//div[@class="lo"]',
        charset: 'euc-jp'
    },
    {
        url:    'http://e0166.blog89.fc2.com',
        xpath:  '//div[@class="entry-body"]',
        charset: 'euc-jp'
    },
    {
        url:    'http://(rss|www).itmedia.co.jp',
        xpath:  '//div[@class="newart"]',
        charset:   'Shift_JIS'
    },
    {
        url:    'http://jp.blogherald.com',
        xpath:  '//div[@class="entry"]'
    },
    {
        url:    'http://(www|feeds).seroundtable.com',
        xpath:  '//div[@class="entry-content"]'
    },
    {
        url:    'http://kengo.preston-net.com',
        xpath: '//div[@class="blogbody"]',
        charset: 'Shift_JIS'
    },
    {
        url: 'http://phpspot.org',
        xpath: '//div[@class="entrybody"]'
    },
    {
        url: 'http://rss.rssad.jp/rss/nifty/',
        xpath: '//div[@class="entry"]'
    },
    {
        url: 'http://blog.livedoor.jp/dankogai/',
        xpath: '//div[@class="blogbody"]',
        charset: 'euc-jp'
    },
	{
		url:	'http://mymovie.blogbus.com/logs',
		xpath:	'//div[@class="postBody"]'
	},
    {
        url: 'http://tv.huo360.com',
        xpath: '//div[@class="detail"]'
    },
    {
        url: 'http://24hour.blogbus.com/logs',
		xpath: ['//div[@class="entryBody"] | //div[@class="commentTitle"] | //div[@class="comment"]']
    }
];
var AUTO_FETCH = true;
var FullFeed = {};
FullFeed.link = '';
FullFeed.getFocusedLink = function() {
    return getStringByXPath('//div[@id="current-entry"]//a[@class="entry-title-link"]/@href');
}
FullFeed.getCurrentEntry = function() {
    var link = this.getFocusedLink();
    this.link = link;
    var body = getFirstElementByXPath('//div[@id="current-entry"]//div[@class="entry-body"]');
    var source = '';
    if (location.href.match(/#stream\/user/)) {
        source = getStringByXPath('//div[@id="current-entry"]//a[@class="entry-source-title"]/@href');
    }
    else if (location.href.match(/#search\//)) {
        source = getStringByXPath('//div[@id="current-entry"]//a[@class="entry-source-title"]/@href');
    }
    else if (location.href.match(/#stream\/feed/)) {
        source = getStringByXPath('//div[@id="chrome-stream-title"]//a/@href');
    }
    if (!source) {
        return false;
    }
    source = decodeURIComponent(source.replace(/^\/reader\/view\/feed\//, ''));
    var len = SITE_INFO.length;
    for (var i = 0; i < len; i++) {
        var reg = new RegExp(SITE_INFO[i].url);
        if (source.match(reg) || link.match(reg)) {
            this.request(i, link, body);
            break;
        }
    }
};
FullFeed.request = function(i, link, body) {
    var mime = 'text/html; charset=';
    if (SITE_INFO[i].charset) {
        mime = mime + SITE_INFO[i].charset;
    } else {
        mime = mime + 'utf-8';
    }
	
    GM_xmlhttpRequest({method: "GET", url: link, overrideMimeType: mime, onload: function(r) {
        var text = r.responseText;
        text = text.replace(/(<[^>]*?)on(?:(?:un)?load|(?:db)?click|mouse(?:down|up|over|out|move)|key(?:press|down|up)|abort|blur|change|error|focus|re(?:size|set)|select|submit)\s*?=\s*?["'][^"']*?["']/ig, "$1");
        text = text.replace(/<\s*?script[^>]*?>[\s\S]*?<\s*?\/script\s*?>/ig, "");
        var htmldoc = createHTMLDocumentByString(text);

		var contents = getElementsByXPath(SITE_INFO[i].xpath, htmldoc);

		if (contents == null) return;

		while (body.firstChild) {
				body.removeChild(body.firstChild);
		}

		for (var num = 0; num < contents.length; num++) {
			var content = contents[num];
			content = addTargetAttr(content);
			body.appendChild(content);
		}
        
    }});
};

function addTargetAttr(node) {
    var anchors = getElementsByXPath('//a', node);
    if (!anchors) {
        return false;
    }
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].setAttribute('target', '_blank');
    }
    return node;
}
function createHTMLDocumentByString(str) {
    var html = str.replace(/<!DOCTYPE.*?>/, '').replace(/<html.*?>/, '').replace(/<\/html>.*/, '')
    var htmlDoc  = document.implementation.createDocument(null, 'html', null)
    var fragment = createDocumentFragmentByString(html)
    htmlDoc.documentElement.appendChild(htmlDoc.importNode(fragment, true))
    return htmlDoc
}
function createDocumentFragmentByString(str) {
    var range = document.createRange()
    range.setStartAfter(document.body)
    return range.createContextualFragment(str)
}
function getStringByXPath(xpath, node) {
    var node = node || document
    var doc = node.ownerDocument ? node.ownerDocument : node
    var str = doc.evaluate(xpath, node, null,
        XPathResult.STRING_TYPE, null)
    return (str.stringValue) ? str.stringValue : ''
}
function getElementsByXPath(xpath, node) {
    var node = node || document
    var doc = node.ownerDocument ? node.ownerDocument : node
    var nodesSnapshot = doc.evaluate(xpath, node, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    var data = []
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        data.push(nodesSnapshot.snapshotItem(i))
    }
    return (data.length >= 1) ? data : null
}
function getFirstElementByXPath(xpath, node) {
    var node = node || document
    var doc = node.ownerDocument ? node.ownerDocument : node
    var result = doc.evaluate(xpath, node, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    return result.singleNodeValue ? result.singleNodeValue : null
}


if (AUTO_FETCH) {
    var interval = window.setInterval(
        function() {
            var focusedLink = FullFeed.getFocusedLink();
            if (focusedLink != FullFeed.link) {
                FullFeed.getCurrentEntry();
            }
        },
        500
    );
}

document.addEventListener(
    'keydown',
    function(event) {
        var key = String.fromCharCode(event.keyCode);
        if (key.toLowerCase() == 'z') {
            FullFeed.getCurrentEntry();
        }
    },
    false
);
