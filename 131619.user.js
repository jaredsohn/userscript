// ==UserScript==
// @name           CroudiaFavoriteButton
// @namespace      likk.jp
// @description    CroudiaでTLから直にお気に入りできるようにする
// @include        https://croudia.com/*
// @version        0.09
// ==/UserScript==
"use strict";

(function (){
  var quort = "'";
  var dquort ='"';
  var alerted   = 0;
  var req_fav   = 1;

  (function (){ // @user_id をリンカブルにする
       var script = "location.href='/";
        if(document.getElementById("tweet") || document.getElementById("all_voice_list") ){
  	  document.body.innerHTML = document.body.innerHTML.replace(/<span class="gray"> @([A-ZSa-z_0-9]*)?/gi,'<span class="gray"><span onclick="' + script + "$1" + quort + '" style="text-decoration: underline;">@$1</span>');
  	  //document.body.innerHTML = document.body.innerHTML.replace(/<p>\s@([a-z_0-5]*)?<\/span>/gi,'<span onclick="' + script + "$1" + quort + '" style="text-decoration: underline;">@$1</span>');
        }
  })();
  var cfrs_key  = function(){
    var meta_path = '/html/head/meta[4]';
    var scrape    = document.evaluate(meta_path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
    return scrape.snapshotItem(0).content;
  }();

  var self_user_id = function(){ // Cookie情報から自分のuseridを抜く
    var cookieArray = document.cookie.split(';');
    for (var i = 0; i < cookieArray.length; ++i) {
      var element = cookieArray[i].split('=');
      if(element[0].replace(/\s/g,'') == 'username'){
        return element[1];
      }
    }
  }();

  var req = new XMLHttpRequest;

  function get_voice_token (){ // ささやきtokenの取得
    var in_voice_token   = ''
    var voice_uri        = '/voices/written';
    var voice_token_path = '//input[@id="voice_token"]/@value';
    req.open('GET', voice_uri, false);
    req.onreadystatechange = function(){
      if(req.readyState == 4) {
        var res             = document.createElement("div");
        res.innerHTML       = req.responseText;
        var voice_token_e   = document.evaluate(voice_token_path, res, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
        if(voice_token_e){
          in_voice_token = voice_token_e.snapshotItem(0).value;
        }
      }
    };
    req.send('');
    return in_voice_token;
  };

  // ホーム/publicにささやき入力boxを描画する
  if(document.getElementById('tweet')){
    var voice_token   = get_voice_token();
    var favorites_uri = '/favorites/list/' + status_id;

    var tw = document.getElementById('tweet');
    var defHTML  = tw.innerHTML;
    var post_tag = 'ささやき  <form accept-charset="UTF-8" action="/voices/write" class="new_voice" data-ajax="false" enctype="multipart/form-data" id="new_voice" method="post"><input name="utf8" value="?" type="hidden">  <input name="authenticity_token" value="' + cfrs_key + '" type="hidden">  <input id="voice_token" name="voice_token" value="' + voice_token + '" type="hidden">  <textarea class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset" cols="40" id="voice_tweet" maxlength="372" name="voice[tweet]" rows="20" onKeyUp="document.getElementById(\'VoiceCount\').innerHTML = this.value.length;"></textarea><span id="VoiceCount">0</span>文字<input aria-disabled="false" class="ui-btn-hidden" data-theme="b" name="commit" value="ささやく" type="submit"></form>';
    tw.innerHTML = post_tag + defHTML;
  }
  else if(document.getElementById('all_voice_list')){
    var voice_token   = get_voice_token();
    var favorites_uri = '/favorites/list/' + status_id;

    var tw = document.getElementById('all_voice_list');
    var defHTML  = tw.innerHTML;
    var post_tag = 'ささやき  <form accept-charset="UTF-8" action="/voices/write" class="new_voice" data-ajax="false" enctype="multipart/form-data" id="new_voice" method="post"><input name="utf8" value="?" type="hidden">  <input name="authenticity_token" value="' + cfrs_key + '" type="hidden">  <input id="voice_token" name="voice_token" value="' + voice_token + '" type="hidden">  <textarea class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset" cols="40" id="voice_tweet" maxlength="372" name="voice[tweet]" rows="20" onKeyUp="document.getElementById(\'VoiceCount\').innerHTML = this.value.length;"></textarea><span id="VoiceCount">0</span>文字<input aria-disabled="false" class="ui-btn-hidden" data-theme="b" name="commit" value="ささやく" type="submit"></form>';
    tw.innerHTML = post_tag + defHTML;
  }

  //favした人のデータ取得
  var fav_users    = new Array();
  var favorites_list = function(status_id){
    var favorites_uri = '/favorites/list/' + status_id;
    req.abort();
    req.open('GET', favorites_uri, false);
    req.onreadystatechange = function(){
      if(req.readyState == 4) {
        var user_list_path  = '//ul[@id="fav_list"]/li/a[@href]';
        var user_image_path = '//ul[@id="fav_list"]/li/a/img[@src]';
        var res            = document.createElement("div"); 
        res.innerHTML      = req.responseText;
        var user_id_list   = document.evaluate(user_list_path,  res, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
        var ul_img_list    = document.evaluate(user_image_path, res, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
        if(user_id_list){
          for (var i = 0; i < user_id_list.snapshotLength; i++ ) {
            var user_id = user_id_list.snapshotItem(i) + ''; //href要素の中身を文字列として評価
            var img_src = ul_img_list.snapshotItem(i).src; //href要素の中身を文字列として評価
            user_id     = user_id.replace(/https:\/\/croudia.com\//,'');
            var user_obj = {};
            user_obj[user_id] = img_src;
            fav_users.push(user_obj);
          }
        }
        
      }
    };
    req.send('');
    
  };
  
  // ID変えて元の挙動を変える
  if(document.getElementById("tweet")){document.getElementById("tweet").id = 'tdummy'}
  else if(document.getElementById("all_voice_list")){document.getElementById("all_voice_list").id = 'adummy'}
  else if(document.getElementById("user_voice")){document.getElementById("user_voice").id = 'udummy'}
  else {} 
  // TL一件づつに対して、favユーザリスト,favリンクを出す
  for ( var i=0 ; i < 21 ; i++ ) {
    j = i + 1;
    try {
      var star_path      = '//ul[@data-role="listview"]/li['+ j + ']/a/p[3]/span';
      var status_id_path = '//ul[@data-role="listview"]/li['+ j + '][@id]';
      var desc_path      = '//ul[@data-role="listview"]/li['+ j + ']/a/p[2]';
      var result         = document.evaluate(star_path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
      if(result){
        var status_url = document.evaluate(status_id_path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
        var desc       = document.evaluate(desc_path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ) 
        var text       = result.snapshotItem(0).parentNode.innerHTML;
          var description;
        if(text){
          var status_id        = status_url.snapshotItem(0).id;
          if(desc){ //本文中の @をリンカブルにする
            var script = "location.href='/voices/conversation/" + status_id + "'";
            desc.snapshotItem(0).innerHTML = desc.snapshotItem(0).innerHTML.replace(/@([A-ZSa-z_0-9]*)?/gi,'<span onclick="' + script + '" style="text-decoration: underline;">@$1</span>');
            if(alerted == 1){ alert(desc.snapshotItem(0).innerHTML); alerted= 0}
          }
          var favs       = text;
          var fav_num    = favs.replace(/.*?(前|以内)/gi,'').replace(/<.*?>/gi,'').replace(/★/,'');
          var post_url   = 'https://croudia.com/favorites';
          var param      = "'utf8=%E2%9C%93&favorites_action=enable&voice_id=" + status_id + "&authenticity_token=" + cfrs_key + "'";
          var bs_url     = location.href;
          var script     = "var request = new XMLHttpRequest();request.open('POST', '" + post_url + "', false);request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');request.setRequestHeader('X-Requested-With','XMLHttpRequest');request.send(" + param + ");this.style.visibility='hidden'";
          var tag        = '' + favs + '' + '<span onClick="' + script + '"  style="font-weight:bold; color:#4c94c4; text-decoration: underline;">イイネ!</span>　<a style="text-decoration: underline;" href="/voices/show/' + status_id + '">詳細</a> <a style="text-decoration: underline;" href="/voices/response_input/' + status_id + '">返信</a> <a style="text-decoration: underline;" href="/voices/quotation_input/' + status_id +　'">引用</a>';
          if(req_fav == 1 && Number(fav_num) > 0){
            favorites_list(status_id);
            var limit =1;
            var favs_tag = '<br>'
            //自分が既にfavしていた場合はfav取り消しに変える
            for (var ii = 0; ii < fav_users.length; ii ++) {
              for (var k in fav_users[ii]) {
                if(k == self_user_id){ tag = tag.replace(/イイネ/,'イラネ');}
                favs_tag = favs_tag + '<a href="https://croudia.com/voices/user/' + k + '"><img src="' + fav_users[ii][k] + '" alt="' + k + '" witdh="16" height="16" ></a>';
              }
            }
            fav_users.length = 0;
            tag = tag + favs_tag;
            req_fav = 1;
          }
          result.snapshotItem(0).parentNode.innerHTML  = tag ;
        }
      }
    }
    catch(e) {
//      alert(' catch: ' + e);
    }
  }
  if(document.getElementById("timeline_more")){document.getElementById("timeline_more").onmouseover          = function(){ document.getElementById('tdummy').id = 'tweet'};          }
  else if(document.getElementById("all_voice_more")){document.getElementById("all_voice_more").onmouseover   = function(){ document.getElementById('adummy').id = 'all_voice_list'}; }
  else if(document.getElementById("user_voice_more")){document.getElementById("user_voice_more").onmouseover = function(){ document.getElementById('udummy').id = 'user_voice' };    }

})();
