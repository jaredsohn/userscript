// ==UserScript==
// @name           hatena_c_uri_to_title.user.js
// @namespace      http://d.hatena.ne.jp/snaka72/
// @include        http://counter.hatena.ne.jp/*target=url*
// @require        http://gist.github.com/3238.txt
// ==/UserScript==
(function() {
  var links = $X('//td[@class="maincell"]/a');
  links.forEach( function(link) {

    GM_xmlhttpRequest({
      method: 'GET',
      url: link.href,
      onload: function(data) {
        var html = data.responseText;
        var m = html.match(/<title>(.*)<\/title>/);
        link.innerHTML = m[1];
      }
    });
  });
})();
