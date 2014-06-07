// ==UserScript==
// @name           Google Reader Subscribers Count
// @namespace      http://userscripts.org/users/40991
// @description    Show how many subscribers to the feed with google reader.
// @include        http://*
// @exclude        http://www.google.com/*
// ==/UserScript==

if(!Array.prototype.uniq) {
    Array.prototype.uniq = function() {
        for(var i = 0, x = []; i < this.length; i++) {
            if(x.indexOf(this[i]) < 0) x.push(this[i]);
        }
        return x;
    };
}

GoogleReaderSubscribersCount = {
    position: 'bottomright',
    openInSidebar: false,
    id: 'subscribers-count',
    readerUriBase: 'http://www.google.com/reader/view/feed/',
    results: [],
    counts: 0,
    loggedIn: true,
    cache: null,
    cacheExpires: 24 * 60 * 60 * 1000,
    initialize: function() {
        if(window != window.parent) return;
        var self = GoogleReaderSubscribersCount;
        var xp = '//link[@rel="alternate" and (contains(@type,"atom") or contains(@type,"rss"))]';
        var metalinks = getElementsByXPath(xp) || [];
        var feeds = metalinks.map(function(e) { return e.href }).uniq();
        if(!feeds.length) return;
        self.cache = eval(GM_getValue(self.id));
        var now = new Date().getTime();
        if(!self.cache || self.cache['expires'] < now) {
            self.cache = {'expires': now + self.cacheExpires};
            GM_setValue(self.id, uneval(self.cache));
        }
        if(self.openInSidebar)
            self.readerUriBase = self.readerUriBase.replace(/reader\/view/, 'reader/m/view');
        feeds.forEach(self.fetch);
    },
    fetch: function(e, i, a) {
        var self = GoogleReaderSubscribersCount;
        var appendResults = function(url, count) {
            if(typeof(count) == 'undefined') return false;
            if(typeof(self.cache[url]) == 'undefined') {
                self.cache[url] = count;
                GM_setValue(self.id, uneval(self.cache));
            }
            self.counts += count;
            self.results.push(
                ['<a ', ((self.openInSidebar)? 'target="_search" ' : ''), 
                 'title="', url, '" href="', self.readerUriBase, encodeURIComponent(url), '">', 
                 count, '<', '/a>'
                ].join(''));
            if(self.results.length == a.length) self.show();
            return true;
        };
        if(!appendResults(e, self.cache[e])) {
            var url = 'http://www.google.com/reader/directory/search?hl=en&q=' + encodeURIComponent(e);
            var callback = function(r) {
                if(!self.loggedIn) return;
                var r = r.responseText;
                if(/{"query":"([^"]*)"/.test(r)) {
                    var x = 0, url = RegExp.$1;
                    if(/<span class="number">(.*)<\/span>\n?<div>subscribers?<\/div>/.test(r)) {
                        var num = RegExp.$1.replace(/,/g, '');
                        x = (num == 'Unknown')? 0 : parseInt(num);
                    }
                    appendResults(url, x);
                } else {
                    self.cancel();
                }
            }
            GM_xmlhttpRequest({method: 'GET', url: url, onload: callback});
        }
    },
    show: function() {
        var self = GoogleReaderSubscribersCount;
        var box = document.createElement('div');
        box.id = self.id;
        document.body.appendChild(box);
        GM_addStyle(<><![CDATA[
            #{id} {
                letter-spacing: 0;
                font-family: Arial, sans-serif;
                line-height: 1;
                position: fixed;
                margin: -3px 3px;
                padding: 3px 5px 5px 5px;
                z-index: 1500;
                font-size: 11px;
                color: #555;
                background-color: #c3d9ff;
                display: none;
                -moz-border-radius: 3px;
            }
            #{id} a {
                font-weight: bold !important;
                border: 0 !important;
                padding: 0 !important;
                color: #1010c8 !important;
                text-decoration: bold;
                background: none;
                font-family: Arial, sans-serif;
                font-size: 11px;
            }
        ]]></>.toXMLString().replace(/\{id\}/g, box.id)
        );
        /^(bottom)(.*)$/.test(self.position) || /^(top)(.*)$/.test(self.position);
        box.style[RegExp.$1] = box.style[RegExp.$2] = 0;
        box.innerHTML = (self.loggedIn)? 
            (self.results.join(' + ') + ' subscriber' + ((self.counts > 1)? 's' : '')) :
            '<a href="http://www.google.com/reader/">Login required.</a>';
        box.style.display = 'block';
        
        document.addEventListener('keypress', function(e) {
            if(e.keyCode == 27) {
                var t = document.getElementById(box.id);
                t.style.display = (t.style.display == 'none')? 'block' : 'none';  // ESC key to hide
            }
        }, true);
    },
    cancel: function() {
        with(GoogleReaderSubscribersCount){
            loggedIn = false;
            show();
        }
    }
}

GoogleReaderSubscribersCount.initialize();


// borrowed from AutoPagerize <http://userscripts.org/scripts/show/8551>.
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

function log(s) { console && console.log(s) }


