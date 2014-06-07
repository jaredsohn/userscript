// ==UserScript==
// @name           Hatena Bookmark Auto Tag Insert
// @namespace      http://d.hatena.ne.jp/Koumei_S/
// @description    Inserts tags automatically when you use Hatena Bookmark
// @include        http://b.hatena.ne.jp/*
// ==/UserScript==

(function(){

  //自動挿入するタグ
  var insert_tags = [];

  //設定しているタグの取得
  var your_tags = document.evaluate("id('all-tags')/span[@class='tag']", document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  //推薦タグの取得
  var recommended_tags = document.evaluate("id('recommend-tags')/span[@class='tag']", document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  //コメント欄取得
  var comment = document.evaluate("id('comment')", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

  //ブックマークされている場合は何もしない
  var bookmarked = document.evaluate("//p[@class='bookmarked-confirm']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

  if(bookmarked){
    exit;
  }

  //計算
  for (var i=0;i<recommended_tags.snapshotLength;i++){
    var recotag = recommended_tags.snapshotItem(i).innerHTML;
    for (var j=0;j<your_tags.snapshotLength;j++){
      var yourtag = your_tags.snapshotItem(j).innerHTML;
      if(recotag == yourtag){
        insert_tags.push(yourtag);
      }
    }
  }
  
  //コメント挿入
  if(comment && insert_tags[0]){
    comment.setAttribute('value', '[' + insert_tags.join('][') + ']');
  }
})();