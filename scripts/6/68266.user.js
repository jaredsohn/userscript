// ==UserScript==
// @name           tweet-url web expander
// @namespace      http://satomacoto.blogspot.com/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @description    expands tweeted short url to long url.
// ==/UserScript==

(function(){

    function createNS() {
        window.tweetURLExpander = {
            json_callback: function(r) {
                var final_url = r.final_url;
                var index = r.id;
                var anchor = this.items[index];
                if (final_url != null) {
                    anchor.title = anchor.href;
                    anchor.innerHTML = final_url;
                }
            },
            items : {}
        };
    };

    function jsonp(url) {
        var s = document.createElement('script');
        s.src = url + '&callback=tweetURLExpander.json_callback';
        s.charset = 'UTF-8';
        document.body.appendChild(s);
    }

    function set_final_url_jsonp(anchor) {
        if (anchor.href && anchor.href.indexOf("twitter")<0) {
            var url = "http://headers2json.appspot.com/fetch?&response=url,final_url&method=HEAD&id=" + count + "&url=" + anchor.href;
            tweetURLExpander.items[count.toString()] = anchor;
            count++;
            jsonp(url);
        }
    }

    function set_final_url_GM(anchor) {
        if (anchor.href && anchor.href.indexOf('twitter')<0) {
            GM_xmlhttpRequest({
                url: anchor.href,
                method: 'HEAD',
                onload: function(r) {
                    var finalUrl = r.finalUrl;
                    if (finalUrl) {
                        anchor.title = anchor.href;
                        anchor.innerHTML = finalUrl;
                    }
                }
            });
        }
    }

    if (typeof GM_xmlhttpRequest == 'undefined') {
        createNS();
        var count = 0;
        var set_final_url = set_final_url_jsonp;
    }
    else {
        var set_final_url = set_final_url_GM;
    }
    
    var anchors = document.getElementsByClassName('tweet-url web');
    var anchors_length = anchors.length;
    for (var i=0; i<anchors.length; i++) {
        set_final_url(anchors[i]);
    }

    document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
        var node = evt.target;        
        var anchors = node.getElementsByClassName('tweet-url web');
        var anchors_length = anchors.length;
        for (var i=0; i<anchors.length; i++) {
            set_final_url(anchors[i]);
        }
    }, false);

})();