// ==UserScript==
// @name           hide tweetviewer
// @revision       1
// @author         KID a.k.a. blueberrystream
// @description    Twitterウィルスと騒がれているTweet Viewerのリンクを無効化したりします。
// @namespace      http://kid0725.usamimi.info
// @include        *
// ==/UserScript==

void(function() {

var NG_WORDS = [
  'http://bit.ly/tweetviewer',
  'http://j.mp/tweetviewer',
  'http://tweetapp.info/viewer/',
  'http://tweetapp.info/viewer'
];

var current = 0;

var HIDE = function() {
  var elements = document.getElementsByTagName('a');

  if (!elements) {
    return;
  }

  for (; current < elements.length; current++) {
    var element = elements[current];
    var href = element.getAttribute('href');

    if (!href) {
      continue;
    }

    for (i = 0; i < NG_WORDS.length; i++) {
      if (-1 < href.indexOf(NG_WORDS[i])) {
        element.removeAttribute('href');
      }
    }
  }
};
setInterval(HIDE, 1000);

})();