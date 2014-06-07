// ==UserScript==
// @name           accent_140_characters_tweets
// @namespace      http://d.hatena.ne.jp/phithon/
// @version        1.0.0
// @description    Accent tweets containing 140 characters. / 140文字のつぶやきを強調表示します。
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
(function () {
    function colorTweets(dom, className, containerName) {
        var tweetText = dom.getElementsByClassName(className);
        for (var i = -1, tt; tt = tweetText[++i]; ) {
            if (tt.textContent.length == 140) {
                var parent = tt.parentNode;
                for (var j = -1;  ++j < 3; parent = parent.parentNode) {
                    if (parent.className.split(' ').indexOf(containerName) != -1) {
                        parent.style.backgroundColor = '#FFD0D0';
                        break;
                    }
                }
            }
        }
    }
    if (document.getElementById('doc')) {
        document.addEventListener('DOMNodeInserted', function (e) {
            if (e.target.nodeType == 1) {
                colorTweets(e.target, 'tweet-text', 'tweet');
            }
        }, false);
    } else {
        document.addEventListener('DOMNodeInserted', function (e) {
            if (e.target.nodeType == 1) {
                colorTweets(e.target, 'entry-content', 'status');
            }
        }, false);
        colorTweets(document, 'entry-content', 'status');
    }
})();
