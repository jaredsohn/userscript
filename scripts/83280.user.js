// ==UserScript==
// @name           twitter_expand_pixiv_links
// @version        1.0.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Expand pixiv links into images on Twitter. / Twitterでpixivの短縮URLを画像に展開します．
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
(function () {
    var START_TAG = '<div class="indexBoxLeft"><img src="';
    var IMG_TAG = '<img src="';
    var expand = function (dom) {
        var links = dom.getElementsByClassName('tweet-url');
        for (var i = 0; i < links.length; i++) {
            var url = links[i].href;
            if (url.indexOf('http://p.tl/i/') != 0) {
                continue;
            }
            GM_xmlhttpRequest({
              method: 'GET',
              url: url,
              onload: function (res) {
                  var txt = res.responseText;
                  var start = txt.indexOf(START_TAG) + START_TAG.length;
                  if (start == START_TAG.length - 1) {
                      start = txt.indexOf('<div class="works_display">');
                      start = txt.indexOf(IMG_TAG, start) + IMG_TAG.length;
                      var src = txt.slice(start, txt.indexOf('"', start));
                      src = src.replace('_m', '_s');
                  } else {
                      var src = txt.slice(start, txt.indexOf('"', start));
                  }
                  var img = document.createElement('img');
                  img.src = src;
                  img.align = 'top';
                  var id = src.split('/').pop().split('_').shift();
                  var links = document.getElementsByClassName('tweet-url');
                  for (var i = 0;i < links.length; i++) {
                      if (links[i].href == 'http://p.tl/i/' + id) {
                          links[i].replaceChild(img, links[i].firstChild);
                          break;
                      }
                  }
              },
            });
        }
    };
    expand(document);
    document.addEventListener('AutoPagerize_DOMNodeInserted',function(e){
        expand(e.target);
    }, false);
})();
