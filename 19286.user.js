// ==UserScript==
// @name           Smart Keywords through Minibuffer
// @namespace      http://userscripts.org/users/40991
// @description    Generate Minibuffer commands from Smart Keywords.
// @include        *
// ==/UserScript==

// This is experimental.
// This script is for Minibuffer. First of all, install Minibuffer <http://userscripts.org/scripts/show/11759>.
// A trick in configure is based on Script Updater <http://userscripts.org/scripts/show/8877>.
var SmartKeywords = {
    keywords: {},
    id: 'smartkeywords',
    autoFetchSelectedText: true,
    useOpenInTab: false,
    initialize: function() {
        var self = SmartKeywords;
        if(new RegExp('#' + self.id + '$').test(location.href)) {
            self.configure();
            return;
        }
        if(typeof(Minibuffer) == 'undefined') return;
        Minibuffer.addCommand({
            name: 'SmartKeywords::configure',
            command: self.loadToMinibuffer
        });
        self.keywords = eval(GM_getValue(self.id)) || {};
        for(var x in self.keywords) {
            (function(){
                var n = x, v = self.keywords[x];
                Minibuffer.addCommand({
                    name: n,
                    command: function(s) { self.process(v, s) }
                });
            })();
        }
    },
    loadToMinibuffer: function() {
        Minibuffer.message('<span style="font-size:20%">To enable new commands, please reload this window.</span>', 5000);
        GM_openInTab('about:cache#' + SmartKeywords.id);     
    },
    process: function(href, stdin) {
        if(SmartKeywords.autoFetchSelectedText 
        && !stdin.length) stdin = Minibuffer.execute('selected-text');
        var url = href.replace(/%s/g, ((stdin[0])? stdin[0] : '%s'));
        if(!/^http/.test(url)) location.href = url;
        else if(SmartKeywords.useOpenInTab) GM_openInTab(url);
        else window.open(url);
        return stdin;
    },
    configure: function() {
        if(/about:cache/.test(location.href)) { 
            var t = document.getElementsByTagName('tt');
            if(!t || !t[7].innerHTML) return;
            p = t[7].innerHTML
                .replace(/\\/g,'/')
                .replace(/^\s*/g,'')
                .replace(/ /g,'%20')
                .replace(/cache$/i,'')
                .replace(/<wbr>/g,'');
            if(/\w:\//.test(p)) {
                if(/\/local%20settings/i.test(p)) p = p.replace(/\/local%20settings/i, '');
                else if(/\/AppData\/Local/.test(p)) p = p.replace(/\/AppData\/Local/i, '\/AppData\/Roaming');
                else p = p.replace(/((\/[^/]*){2})\/[^/]*/i, '$1');
                p = 'file:///' + p;
            } else {
                p = 'file://' + p.replace(/Caches(\/Firefox)/i, "Application%20Support$1");
            }
            location.href = p + '/bookmarks.html#' + SmartKeywords.id;
        } else if(/bookmarks\.html/.test(location.href)) {
            var keywords = {};
            var l = getElementsByXPath('//a').filter(function(e) { return !!e.getAttribute('shortcuturl'); });
            l.forEach(function(e) { this[e.getAttribute('shortcuturl')] = e.href }, keywords);
            GM_setValue(SmartKeywords.id, uneval(keywords));
            
            var result = 
            <html>
              <head>
                <title>Smart Keywords through Minibuffer</title>
                <style>
                  <![CDATA[
                  * {
                    margin: 0;
                    padding: 0;
                  }
                  body {
                    color: #444;
                    text-align: center;
                    font-family: Arial, sans-serif;
                  }
                  h1 {
                    color: #082;
                    font-family: 'Trebuchet MS', Arial, sans-serif;
                    font-size: 130%;
                    margin-top: 1.5em;
                  }
                  table {
                    margin: 20px auto;
                  }
                  td {
                    padding: 5px;
                    font-size: 90%;
                    vertical-align: text-bottom;
                    border-bottom: 1px dashed #aaa;
                  }
                  ]]>
                </style>
              </head>
              <body>
                <h1>Smart Keywords through Minibuffer<br />
                Configuration is done.</h1>
                <table></table>
              </body>
            </html>;
            for(var x in keywords) {
                var tr = 
                  <tr>
                    <td>{x}</td>
                    <td><pre>{keywords[x]}</pre></td>
                  </tr>;
                result..table.appendChild(tr);
            }
            location.href = 'data:text/html;,' + encodeURIComponent(result.toXMLString());
        }
    }
};

SmartKeywords.initialize();

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