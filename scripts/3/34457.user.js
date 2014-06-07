// ==UserScript==
// @name           check protected post
// @namespace      http://d.hatena.ne.jp/rikuo/
// @description    inquire of Twitter about the protected post
// @include        http://twitter.com/*/statuses/*
// @include        https://twitter.com/*/statuses/*
// @include        http://explore.twitter.com/*/statuses/*
// @include        https://explore.twitter.com/*/statuses/*
// ==/UserScript==
//
//

(function() {
  var xpath = 'descendant::div[@class="actions"]',
      elm = document.evaluate(xpath, document, null, 7, null),
      icon_block = elm.snapshotItem(0),
      protected_icon = c('img'),
      icon_id = 'chk_protected_icon';

  Check_Protected_Post();

  function Check_Protected_Post(){

    if(!location.href.match(/twitter.com\/(.+)\/statuses\/(\d+)/))return;
    var userID = RegExp.$1;
    if(!icon_block)return;
    with(protected_icon){
      src = 'http://assets0.twitter.com/images/loader.gif';
      width = '16';
      height = '16';
      title = userID + 'さんの公開設定を調べています';
      id = icon_id;
    }
    icon_block.appendChild(protected_icon);
    get_User_statuses(userID);

  }

  function get_User_statuses(id) {
    var url = 'http://twitter.com/users/show/' + id + '.json?callback=get_User_statuses_json_callback';
    GM_xmlhttpRequest({
        method : 'POST',
        url : url,
        onload : function (req) {
            eval(req.responseText);
        },
      });
  }

  function get_User_statuses_json_callback(item) {
    if(!item)return;
    if(item.protected){
      with(document.getElementById(icon_id)){
        src = 'http://assets0.twitter.com/images/icon_red_lock_sidebar.gif';
        width = '12';
        height = '15';
        title = 'この発言は一般に公開されていません';
      }
    }else{
      document.getElementById(icon_id).parentNode.removeChild(document.getElementById(icon_id));
    }
  }

  function c(tag_name) {
    return document.createElement(tag_name);
  }

})();
