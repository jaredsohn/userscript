// ==UserScript==
// @name           fix_suffixes_on_favstar
// @version        1.0.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Add buttons to fix tweets which is shorter than original ones on favstar.
// @include        http://ja.favstar.fm/*
// @include        http://de.favstar.fm/*
// @include        http://favstar.fm/*
// ==/UserScript==
(function () {
    var entryTag = '<span class="entry-content">';
    var tweets = document.getElementsByClassName('tweetBy');
    for (var i = 0; i < tweets.length; i++) {
        var button = document.createElement('button');
        with (button.style) {
            border = 'none';
            MozBorderRadius = '6px';
            padding = '0px 3px';
            background = '#DDDDDD';
        }
        button.appendChild(document.createTextNode('fix'));
        button.addEventListener('click', function (e) {
            var clicked = e.target;
            clicked.disabled = true;
            clicked.innerHTML = 'loading...';
            GM_xmlhttpRequest({
              method: 'GET',
              url: clicked.parentNode.getElementsByClassName('twitter_tweet_link')[0],
              onload: function (rs) {
                  var txt = rs.responseText;
                  var start = txt.indexOf(entryTag) + entryTag.length;
                  var tweet = clicked.parentNode.parentNode.getElementsByClassName('theTweet')[0];
                  tweet.innerHTML = txt.slice(start, txt.indexOf('</span>', start));
                  clicked.innerHTML = 'ok';
              },
              onerror: function (rs) {
                  clicked.innerHTML = 'failed';
                  clicked.disabled = true;
              },
            });
        }, false);
        tweets[i].appendChild(button);
    }
})();
