// ==UserScript==
// @name           163 news rss bot
// @namespace      zerostudio
// @description    fetch 163news comments and show (thanks to fkoji http://userscripts.org/users/37875 and his google reader full feed changer )
// @include     http://www.google.*/reader/*
// @include     https://www.google.*/reader/*
// ==/UserScript==

var SITE_INFO = [
    {
        url:    'http://news.163.com',
        xpath:  '//div[@id="hotReplies"]/div[@class="replies"]',
        charset:   'utf-8',
        regex: /\$tie\.HotTieArea\(\$\("#tieArea"\), "(.*?)", "(.*?)", tieChannel, isStrict\);/
    }
]

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
    if (!body) {
        body= getFirstElementByXPath('//div[@id="current-entry"]//div[@class="entry-body entry-body-empty"]');
    }
    var source = '';
    if (location.href.match(/#stream\/user/)) {
        source = getStringByXPath('//div[@id="current-entry"]//a[@class="entry-source-title"]/@href');
    }
    else if (location.href.match(/#search\//)) {
        source = getStringByXPath('//div[@id="current-entry"]//a[@class="entry-source-title"]/@href');
    }
    else if (location.href.match(/#stream\/feed/)) {
        source = getStringByXPath('//span[@id="chrome-title"]//a/@href');
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
        var content = text.match(SITE_INFO[i].regex);
        if(!content || content.length != 3)return;
        var commentUrl = 'http://comment.news.163.com/' + content[2] + '/' + content[1] + '.html';
        var commentDataUrl = 'http://comment.news.163.com/data/' + content[2] + '/df/' + content[1] + '.html';
        GM_xmlhttpRequest({method: "GET", url: commentDataUrl, overrideMimeType: mime, onload: function(r) {
        	eval(r.responseText);
        	var commentHtml = "<h4><a href='"+ commentUrl +"' target='_blank'>\u70ed\u95e8\u8bc4\u8bba</a></h4>";
        	for(var i=0,hotHtml="<ul>",hotdata = replyData.hotPosts || [];i<hotdata.length;i++){
        		var hot = hotdata[i] && hotdata[i][1];
        		if(!hot)continue;
        		hotHtml+="<li style='margin-bottom:2px'>"+ hot.b + " —— " + hot.f +"</li>";
        	}
        	commentHtml += hotHtml + "</ul>";
        	var commentDiv = getElementsByXPath('//div[@id="comments_' + content[1] + '"]', body);
        	if(commentDiv)return;
        	commentDiv = document.createElement('div');
        	commentDiv.id = "comments_" + content[1];
       		commentDiv.innerHTML = commentHtml;
        	body.appendChild(addTargetAttr(commentDiv));
        }});
    }});
};

function relativeToAbsolute(node, link) {
    var imgs = getElementsByXPath('//img', node);
    if (imgs.length) {
        for (var i = 0; i < imgs.length; i++) {
            var src = imgs[i].getAttribute('src');
            if (src) {
                imgs[i].setAttribute('src', toAbsolutePath(src, link));
            }
        }
    }
    return node;
}
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
    var XHTML_NS = 'http://www.w3.org/1999/xhtml';
    var doctype = document.implementation.createDocumentType('html', '-//W3C//DTD HTML 4.01//EN', 'http://www.w3.org/TR/html4/strict.dtd');
    var htmlDoc  = document.implementation.createDocument(XHTML_NS, 'html', doctype)
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
function toAbsolutePath(url, base) {
    // absolute path
    if (url.match(/^https?:\/\//)) {
        return url;
    }

    var head = base.match(/^https?:\/\/[^\/]+\//)[0];
    if (url.indexOf('/') == 0) {
        return head + url;
    }

    var basedir = base.replace(/\/[^\/]+$/, '/');
    if (url.indexOf('.') == 0) {
        while (url.indexOf('.') == 0) {
            if (url.substr(0, 3) == '../') {
                basedir = basedir.replace(/\/[^\/]+\/$/, '/');
            }
            url = url.replace(/^\.+\//, '');
        }
    }
    return basedir + url;
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
