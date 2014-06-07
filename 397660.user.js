// ==UserScript==
// @name            JIRA Linkification
// @description     Finds JIRA ids in webpages and turns them in to links.
//                  Based on source code from Text To Link script
//                  (http://userscripts.org/scripts/show/187063).
// @namespace       http://brian.peiris.name/gm
// @include         *
// @version         0.3
// @grant           unsafeWindow
// ==/UserScript==

var jiraBaseUrl = '<Enter your JIRA URL here. E.g. https://foobar.atlassian.net/browse/>';
var jiraProjects = '<Enter a comma-separated list of projects here. E.g. WEB,IOS,ABC>'.split(',');

// Ignore iframes and anonymous windows.
if (window != window.top || window.document.title == '')
    return;

var jiraIdRegexp = new RegExp('(?:' + jiraProjects.join('|') + ')-\\d+', 'gi');

var setLink = function(candidate) {
    var a, lastLastIndex, match, span, text, jiraId;
    if (candidate.nodeName === '#cdata-section') {
        return;
    }
    text = candidate.textContent;
    lastLastIndex = 0;
    match = jiraIdRegexp.exec(text);
    if (match) {
        span = document.createElement('span');
        while (match) {
            span.appendChild(document.createTextNode(text.substring(lastLastIndex, match.index)));
            jiraId = match[0];
            var url = jiraBaseUrl + jiraId;
            a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('target', '_blank');
            a.appendChild(document.createTextNode(match[0]));
            span.appendChild(a);
            lastLastIndex = jiraIdRegexp.lastIndex;
            match = jiraIdRegexp.exec(text);
        }
        span.appendChild(document.createTextNode(text.substring(lastLastIndex)));
        return candidate.parentNode.replaceChild(span, candidate);
    }
};

var excludedTags = (
    'a,applet,area,button,code,embed,frame,frameset,head,iframe,img,' +
    'input,link,map,meta,noscript,object,option,param,script,select,style,' +
    'textarea').split(',');

var xpath = (
    '//text()[not(ancestor::' +
    excludedTags.join(') and not(ancestor::') +
    ')]');

var linkify = function(doc) {
    var i, result, _i, _ref;
    result = document.evaluate(
        xpath, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (
        i = _i = 0, _ref = result.snapshotLength;
        0 <= _ref ? _i <= _ref : _i >= _ref;
        i = 0 <= _ref ? ++_i : --_i
    ) {
        setLink(result.snapshotItem(i));
    }
};

processNewNodes = function(root) {
    var tW;
    tW = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: function(a) {
            var tagName = a.parentNode.localName.toLowerCase();
            if (excludedTags.indexOf(tagName) === -1) {
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    }, false);
    while (tW.nextNode()) {
        setLink(tW.currentNode);
    }
};

var observer = new window.MutationObserver(function(mutations) {
    window._bodyHeight = document.body.clientHeight;
    return mutations.forEach(function(mutation) {
        var Node, _i, _len, _ref;
        _ref = mutation.addedNodes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            Node = _ref[_i];
            processNewNodes(Node);
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

setTimeout((function() {
    return linkify(document.body);
}), 200);