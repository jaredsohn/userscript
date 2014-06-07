// ==UserScript==
// @name        LDR insert HatenaDiary daily image
// @namespace   http://d.hatena.ne.jp/koyachi/
// @include     http://reader.livedoor.com/reader/*
// ==/UserScript==
//
// 2008-06-16 t.koyachi
//

(function(){
  var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
  w.register_hook('BEFORE_PRINTFEED', function(feed){
    feed.items.forEach(function(item){
      var matched = item.link.match(/^http:\/\/d\.hatena\.ne\.jp\/(.*?)\/(\d{4})(\d{2})(\d{2})$/);
      if (matched) {
        var user = matched[1];
        var year = matched[2];
        var month = matched[3];
        var day = matched[4];
        var prefix = user[0];
        var image_url = ['http://d.hatena.ne.jp/images/diary',
                         prefix,
                         user,
                         year + '-' + month + '-' + day + '.jpg'].join('/');
        item.body = '<div><img src="' + image_url + '" border=0>|</div>'
                  + item.body;
      }
    });
  });
})();