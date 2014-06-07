// ==UserScript==
// @name         mixi news filter
// @namespace    http://www.wakaba.jp/~ikemo/
// @include      http://news.mixi.jp/*
// @include      http://mixi.jp/*
// @include      http://platform001.mixi.jp/*
// ==/UserScript==

// ここに表示されて欲しくないメディアのIDを入力
var ignore_list = [9, 10];

Array.prototype.include = function(v) {
    for (var i in this) {
        if (this[i] == v) return true;
    }
    return false;
}

var news_list = ["", "mixiニュース", "毎日新聞", "産経新聞", "時事通信社", "シブヤ経済新聞",
                 "六本木経済新聞", "ヨコハマ経済新聞", "日刊スポーツ", "夕刊フジ", "ゲンダイネット",
                 "MTVジャパン", "VIBE", "CDジャーナル", "シネマトゥデイ", "eiga.com",
                 "ITmedia", "RBB TODAY", "Hotwired", "Impress Watch", "読売新聞",
                 "bounce.com", "DataStadium", "ケン・ミレニアム株式会社", "映画生活", "cinemacafe.net",
                 "日経BPネット", "アキバ経済新聞", "下北沢経済新聞", "R25", "デイリースポーツ",
                 "Record China", "ITmediaニュース", "ITmedia Biz.ID", "ITmediaエンタープライズ", "＋D Games",
                 "＋D LifeStyle", "＋D Mobile", "＋Ｄ PC USER", "＠IT", "Business Media 誠",
                 "速報!サッカーエルゴラ", "サンケイスポーツ", "夕刊フジ", "よりミク", "gooランキング",
                 "GIZMODO", "iNSIDE", "電撃オンライン", "GIGAZINE", "アニメ！アニメ！",
                 "バークス", "ロイター", "日刊サイゾー", "ORICON STYLE", "日経トレンディネット",
                 "中央日報", "Anime Newtype Channel", "Excite Bit コネタ", "内外タイムス", "escala cafe",
                 "サイゾーウーマン", "東京ウォーカー", "Fashionsnap.com", "メンズノンノ", "BAILA",
                 "MAQUIA", "ノンノ", "MORE", "ITライフハック", "ゲーム×コンボ",
                 "独女通信", "Sports Watch", "欧州通信", "バカドリル", "スゴレン",
                 "オトメスゴレン", "All About", "オズモール"];
var elements = document.getElementsByTagName("a");
var len = elements.length

for(var i = 0; i < len; i++) {
  e = elements[i];
  href = e.attributes.getNamedItem("href").nodeValue;
  media_id = 0;
  if(href.match(/media_id=([0-9]+)/)) {
    media_id = parseInt(RegExp.$1, 10);
  }
  if(href.match(/list_news_media\.pl\?id=([0-9]+)/)) {
    media_id = parseInt(RegExp.$1, 10);
  }
  
  if(ignore_list.include(media_id)) {
    e.attributes.getNamedItem("href").nodeValue = "http://www.google.co.jp/";
    e.textContent = "===表示されません===";
  } else if(media_id != 0 && media_id < news_list.length) {
    attr = document.createAttribute("title");
    attr.nodeValue = news_list[media_id];
    e.setAttributeNode(attr);
  }
}
