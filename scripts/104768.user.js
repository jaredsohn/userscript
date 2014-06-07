// ==UserScript==
// @name           SiReFaSo Socialize
// @namespace      http://www.hatena.ne.jp/Nikola/
// @description    Socialize SiReFaSo
// @version        1.0.0
// @include        http://sirefaso.appspot.com/*/*/*
// @include        https://sirefaso.appspot.com/*/*/*
// ==/UserScript==
(function() {

var article = document.getElementsByTagName('article')[0];
var head = document.getElementsByTagName('head')[0];
var a, s, img, gp;

// google+1
gp = document.createElement('div');
gp.className = 'g-plusone';
gp.setAttribute('data-size', 'stansard');
gp.setAttribute('data-count', 'true');
s = document.createElement('script');
s.src = 'https://apis.google.com/js/plusone.js';
article.insertBefore(gp, article.firstChild);
article.insertBefore(s, article.firstChild);

// tweet button
a = document.createElement('a');
a.href = 'http://twitter.com/share';
a.className = 'twitter-share-button';
a.setAttribute('data-count', 'horizonatal');
a.setAttribute('data-lang', 'ja');
a.appendChild(document.createTextNode('Tweet'));
s = document.createElement('script');
s.src = 'http://platform.twitter.com/widgets.js';
article.insertBefore(s, article.firstChild);
article.insertBefore(a, article.firstChild);

// hatena bookmark
a = document.createElement('a');
a.href = 'http://b.hatena.ne.jp/entry/add/' + location.href;
a.className = 'hatena-bookmark-button';
a.setAttribute('data-hatena-bookmark-layout', 'standard');
img = document.createElement('img');
img.src = 'http://b.st-hatena.com/images/entry-button/button-only.gif';
img.alt = 'このエントリーをはてなブックマークに追加';
img.width = 20;
img.height = 20;
img.style.border = 'none';
a.appendChild(img);
s = document.createElement('script');
s.src = 'http://b.st-hatena.com/js/bookmark_button.js';
article.insertBefore(s, article.firstChild);
article.insertBefore(a, article.firstChild);

// disqus
var dsqContainer = document.createElement('div');
dsqContainer.id = 'disqus_thread';
article.appendChild(dsqContainer);
var dsq = document.createElement('script');
dsq.src = 'http://disqus.com/forums/chickerino/embed.js';
head.appendChild(dsq);

})();
