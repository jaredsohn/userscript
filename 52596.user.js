// ==UserScript==
// @name            WassrClip
// @namespace       http://rilakkuma.moe.hm/
// @description     Wassrの個別ヒトコトページからクリップ投稿する
// @include         http://wassr.jp/user/*/statuses/*
// @author          betoneto http://wassr.jp/user/betoneto
// @version         0.2
// ==/UserScript==

// 20090802 version 0.2 Wassr表示変更に伴う修正。

// ----- 設定 -----
// 投稿先をチャンネルにしたい人は、0を1に書き換えてください。
// ※チャンネルでは利用価値はありません。テスト用か個人チャンネル用くらいです。
var channelFlag  = 0;
// 投稿先チャンネルIDを指定してください。
// ※規定値の#rssawはテスト用です。使用した場合はテスト後Postを消去してください。
var channelId = 'rssaw';
// 投稿方法名を指定してください。
// 個人用や統一タグ的な使用を想定しています（例：Clip by userID、スーパーイイネ等）。
var apiSouse = 'WassrClip';
// ----- 設定 -----


var HITOKOTO_API_PATH = [
    'http://',
    'api.wassr.jp',
    '/update.json?',
    '&source=' + apiSouse + '&status='
].join('');

var CHANNEL_API_PATH = [
    'http://',
    'api.wassr.jp',
    '/channel_message/update.json?name_en=' + channelId + '&body='
].join('');

var gmXHRArgs = {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded'
    },
// 現状個別ヒトコトページ用なのでリロードしない。
//    onload: function(){ location.reload(); }
};



function WassrClip(){
    var messagefoots = $x('//p[@class="messagefoot_info"]');
    for(var i = 0; i < messagefoots.length; i++){
        var clip = document.createElement('div');
        clip.innerHTML = '<img src="/img/pictogram/E730.gif" alt="WassrClip" title="WassrClip" width="16" height="16">'
        clip = clip.firstChild;
        var link = $x('//a[@class="res_button taggedlink"]');
        var linkWithRes = $x('//a[@class="res_button taggedlink res_num"]');
        if(!link){
            link = linkWithRes;
        }
        clip.addEventListener("click", function() {
            var status = prompt("Clipを投稿しますか？", "[WassrClip] " + link[0].href);
            if(status != null){
                if(channelFlag) {
                    gmXHRArgs.url = CHANNEL_API_PATH  + encodeURIComponent(status) + encodeURIComponent(" api[" + apiSouse + "]{emoji:E741}");
                } else {
                    gmXHRArgs.url = HITOKOTO_API_PATH + encodeURIComponent(status);
                }
                GM_xmlhttpRequest(gmXHRArgs);
            }
        }, false);
        messagefoots[i].appendChild(clip);
    }
}

WassrClip();


// cho45 - http://lowreal.net/
function $x(exp, context) {
  if (!context) context = document;
    var resolver = function (prefix) {
      var o = document.createNSResolver(context)(prefix);
      return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
  var exp = document.createExpression(exp, resolver);
  
  var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
  switch (result.resultType) {
    case XPathResult.STRING_TYPE : return result.stringValue;
    case XPathResult.NUMBER_TYPE : return result.numberValue;
    case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
    case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
      result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      var ret = [];
      for (var i = 0, len = result.snapshotLength; i < len ; i++) {
        ret.push(result.snapshotItem(i));
      }
      return len != 0 ? ret : null;
    }
  }
  return null;
}
