// ==UserScript==
// @name           pixiv comment abone
// @namespace      http://d.hatena.ne.jp/rikuo/
// @description    Hidden unrequisite comment for pixiv
// @include        http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @include        http://www.pixiv.net/member_board.php?id=*
// @include        http://www.pixiv.net/profile_board.php*
// ==/UserScript==
// origin1 http://anond.hatelabo.jp/20080302214727
// origin2 http://anond.hatelabo.jp/20080308200619
// cf. http://www.trashsuite.org/~minase/download/gm/hatena_haiku_hidden_entries.user.js


// '5764' の部分を、非表示にしたいユーザーで置き換えてください
// 複数のユーザーを非表示にしたい場合は，'123' , '456' , '789' のように , で id を区切って入力してください

var abone_users = [

    '5764',
    '123',
    '456',

  ];

// /禁止ワード/ の部分を、非表示にしたい言葉で置き換えてください
// また正規表現を使うことができます
// 複数のワードを登録する場合したい場合は，/foo/ , /bar/ , /biz/ のように , で区切って入力してください

var filter_comment = [

    /禁止ワード/,
    /foo/,
    /bar/,

  ];


//------------------------------------------------------------------------//

(function(){

  function xpath(context, query){
    return document.evaluate(
      query, context, null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
    )
  }
  function removeElem(elem){
    elem.parentNode.removeChild(elem)
  }

  if(document.getElementById('one_comment_area')){
    var num = 0;
  }else{
    var num = 1;
  }

  var xpath_elem = [ 
    "descendant::div[@id='one_comment_area']/table/tbody/tr" , 
    "descendant::div[@id='bbs']/div" 
  ];
  var xpath_username = [ 
    "descendant::td[1]/a/@href" ,
    "descendant::div/span[1]/a/@href" 
  ];
  var xpath_comment = [ 
    "descendant::td[2]" ,
    "descendant::div/span[2]" 
  ];


  function abone_user(){
    if(abone_users.length == 0)return;
    var entries = xpath(document, xpath_elem[num])
    for(var i=0; i < entries.snapshotLength; i++) {
      var entry = entries.snapshotItem(i)
      if(abone_users.length > 0) {
        var username = xpath(entry, xpath_username[num])
        if(username.snapshotItem(0)){
          for(var n=0; n < abone_users.length; n++){
            if(abone_users[n] == username.snapshotItem(0).textContent.replace(/^member\.php\?id=/,'')){
              removeElem(entry);
              break;
            }
          }
        }
      }
    }
  }

  function filterComment(){
    if(filter_comment.length == 0)return;
    var entries = xpath(document, xpath_elem[num]);
    for(var j=0; j<entries.snapshotLength; j++){
      var entry = entries.snapshotItem(j);
      var comment = xpath(entry,xpath_comment[num]);
      if(comment.snapshotItem(0)){
        for(var i=0; i<filter_comment.length; i++) {
          var regexp = filter_comment[i];
          if(comment.snapshotItem(0).textContent.match(regexp)){
            removeElem(entry);
            break;
          }
        }
      }
    }
  }

  abone_user();
  filterComment();

})();

