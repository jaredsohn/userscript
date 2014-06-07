// ==UserScript==
// @name           uncensored favotter
// @revision       10
// @author         KID a.k.a. blueberrystream
// @description    ふぁぼったーでcensoredされたpost内容を元に戻します。
// @namespace      http://kid0725.usamimi.info
// @include        http://favotter.net/*
// ==/UserScript==

void(function() {

// Load Info - gif generator http://loadinfo.net/
// [JavaScript] dataスキームURI生成（画像データのBase64変換） http://www.kawa.net/works/js/data-scheme/base64.html
var LOADING_ICON = 'data:image/gif;base64,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';


var BODY = document.getElementsByTagName("body")[0];
if (BODY == null || BODY == undefined) {
  return;
}

/* コールバック関数を書き出す */
var uncensoredFunctionScript = document.createElement("script");
uncensoredFunctionScript.setAttribute("type", "text/javascript");
uncensoredFunctionScript.innerHTML = "function uncensored(json) { s = document.getElementById('status_' + json.id); if (s == null || s == undefined) { return; } s.getElementsByTagName('div')[1].getElementsByTagName('span')[0].innerHTML = json.text }";
BODY.appendChild(uncensoredFunctionScript);

var UNCENSORED = function() {
  /* status_idを取得して元statusを取得して置換 */
  var spans = document.getElementsByTagName("span");
  for (var i = 0; i < spans.length; i++) {
    if (-1 < spans[i].className.indexOf("censored") && spans[i].parentNode.innerHTML.indexOf("LoadingIcon") < 0) {
      var status_id = spans[i].parentNode.parentNode.parentNode.id.substring(7);

      // ローディング画像を埋め込む
      var loading_icon_id = "LoadingIcon" + new Date().getTime();
      spans[i].parentNode.innerHTML = '<img id="' + loading_icon_id + '" style="vertical-align: middle;">' + spans[i].parentNode.innerHTML;
      document.getElementById(loading_icon_id).src = LOADING_ICON;

      // JavaScript/クロスドメイン制限の解除 - WebTips http://webtips.open-log.net/index.php?JavaScript%2F%E3%82%AF%E3%83%AD%E3%82%B9%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E5%88%B6%E9%99%90%E3%81%AE%E8%A7%A3%E9%99%A4
      var jsonpScript = document.createElement("script");
      jsonpScript.setAttribute("type", "text/javascript");
      jsonpScript.src = "http://api.twitter.com/1/statuses/show/" + status_id + ".json?callback=uncensored";
      BODY.appendChild(jsonpScript);
    }
  }
};
setInterval(UNCENSORED, 2000);

})();