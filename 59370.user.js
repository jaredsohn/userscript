// ==UserScript==
// @name           Rakuten Search Add Hatena Bookmark Link
// @namespace      http://kkawamura.com
// @description    楽天市場サーチ画面にはてブを連携させるGreasemonkey 
// @include        http://search.rakuten.co.jp/*
// @require        http://code.jquery.com/jquery-latest.js
// ==/UserScript==
(function(){
function addHatenaLink(){
  var count = 0;
  $('td').each(function(){
    if ($(this).attr('width') == "47%"){
      $('td',this).each(function(){
        if (count > 0){
          itemUrl = "";
          $('a',this).each(function(){
            if ($(this).attr('href').match(/http:\/\/item\.rakuten\.co\.jp\/*/) || $(this).attr('href').match(/http:\/\/www\.rakuten\.co\.jp\/*/)){
              if (itemUrl == ""){
                itemUrl = $(this).attr('href');
              }
            }
            if ($(this).attr('href').match(/http:\/\/review\.rakuten\.co\.jp\/*/)){
              if (itemUrl != ""){
                hbUsersImage = "　<a href='http://b.hatena.ne.jp/entry/" + itemUrl + "' target='_blank'>" + "<img src='http://b.hatena.ne.jp/entry/image/" + itemUrl + "'border='0'></a>";
                hbAppendImage = "　<a href='http://b.hatena.ne.jp/my/add.confirm?url=" + itemUrl + "'><img src='http://b.st-hatena.com/images/append.gif' border='0'></a>";
                $(this).after(hbAppendImage)
                $(this).after(hbUsersImage)
              }
            }
          });
        }
      });
      count++;
    }
  });
}
// == main ==
addHatenaLink();
})();
