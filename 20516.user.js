// ==UserScript==
// @name           liberate japanese wikipedia images
// @namespace      http://fuba.moarningnerds.org/
// @include        http://ja.wikipedia.org/wiki/*
// ==/UserScript==

GM_registerMenuCommand('liberate japanese wikipedia images - edit sources', function() {
    GM_setValue(
      'acceptedWikis',
      window.prompt(
        'source wikipedia prefixs',
        GM_getValue('acceptedWikis')
      )
    );
});

GM_addStyle([
    '#ljwi-div .thumb {display: inline; float: left !important; clear: right !important;}',
    '#ljwi-div {float: none; clear: both;}',
    '#bodyContent {clear: both;}',
].join(''));

var acceptedWikis = {};
init();
getElementsByXPath(
    '//li[contains(@class, "interwiki")]/a',
    document
).map(
    function (elem) {
        if ( isAcceptedWiki(elem.href) ) {
            getImageFromInterwiki(elem.href);
        }
    }
);

function init () {
    if (!GM_getValue('acceptedWikis')) {
        GM_setValue('acceptedWikis', 'en zh fr');
    }
    
    GM_getValue('acceptedWikis').
    split(/\s/).
    map(
        function (prefix) {
            if ((prefix != '') && (prefix.match(/^[\w\-]$/))) {
                acceptedWikis[prefix + '.wikipedia.org'] = 1;
            }
        }
    );
}

function isAcceptedWiki (url) {
    var domain = getDomainFromUrl(url);
    return acceptedWikis[domain];
}

function getDomainFromUrl (url) {
    url.match(/^http\:\/\/([^\/]+).*/);
    return RegExp.$1;
}

function getImageFromInterwiki (url) {
    GM_xmlhttpRequest({
        method: 'get',
        url: url,
        onload: requestLoad
    });
}

function replaceURL(root, domain) {
    root.innerHTML = root.innerHTML.replace(/href\=\"\//g, 'href="'+'http://'+domain+'/');
}

function requestLoad(res) {
    var domain = getDomainFromUrl(res.finalUrl);
    var t = res.responseText;
    var htmlDoc = createHTMLDocumentByString(t);
    
    var thumbs = getElementsByXPath('//*[contains(@class, "thumb ")]', htmlDoc);
    var infoboxes = getElementsByXPath('//*[contains(@class, "infobox")]', htmlDoc);
    var coordinates = getElementsByXPath('id("coordinates")', htmlDoc);
    
    var bodycontent = document.getElementById('bodyContent');
    
    if (thumbs) {
        var div = document.getElementById('ljwi-div');
        if (!div) {
            div = document.createElement('div');
            div.id = 'ljwi-div';
            bodycontent.parentNode.insertBefore(div, bodycontent);
        }
        for (var i=0;i<thumbs.length;i++) {
            replaceURL(thumbs[i], domain);
            thumbs[i].className = 'thumb tleft';
            div.appendChild(thumbs[i]);
        }
    }
    
    if (infoboxes) {
        for (var i=0;i<infoboxes.length;i++) {
            replaceURL(infoboxes[i], domain);
            bodycontent.insertBefore(infoboxes[i], bodycontent.childNodes[i]);
        }
    }
    
    if (coordinates) 
        bodycontent.insertBefore(coordinates[0], bodycontent.childNodes[0]);
}


// functions theft from AutoPagerize

function createHTMLDocumentByString(str) {
    var html = str.replace(/<!DOCTYPE.*?>/, '').replace(/<html.*?>/, '').replace(/<\/html>.*/, '')
    var htmlDoc  = document.implementation.createDocument(null, 'html', null)
    var fragment = createDocumentFragmentByString(html)
    try {
        fragment = htmlDoc.adoptNode(fragment)
    } catch(e) {
        fragment = htmlDoc.importNode(fragment, true)
    }
    htmlDoc.documentElement.appendChild(fragment)
   return htmlDoc
}

function createDocumentFragmentByString(str) {
    var range = document.createRange()
    range.setStartAfter(document.body)
    return range.createContextualFragment(str)
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

