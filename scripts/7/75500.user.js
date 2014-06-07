// ==UserScript==
// @name           inline-cocophoto
// @description    insert hatena coco photos into twitter timeline
// @namespace      yaotti.com
// @version        0.0.1
// @include        http://twitter.com/*
// ==/UserScript==
(function() {
    function insertCocoPhotos(node) {
        var urls = document.evaluate('.//a[@class="tweet-url web"]', node, null,7, null);
        for (var i = 0; i < urls.snapshotLength; i++) {
            var url = urls.snapshotItem(i);
            if (!url.href.match(/http:\/\/htn.to/)) continue;
            var opt = {
                method: 'GET',
                url: url,
                headers: {},
                onload: function(res){
                    var match;
                    if (match = /<img src="(http:\/\/img.f.hatena.ne.jp\/.+)"[^>]+>/.exec(res.responseText)) {
                        this.url.innerHTML = '<img src="'+match[1]+'" width="100" />';
                    }
                },
                onerror: function(e){
                    console.log("error: "+e)
                },
            }
            GM_xmlhttpRequest(opt);
        }
    }

    // auto pager
    document.getElementById('timeline').addEventListener('DOMNodeInserted',function(evt){
        insertCocoPhotos(evt.target);
    }, false);

    insertCocoPhotos(document);
})();
