// ==UserScript==
// @name           Google Add Language
// @namespace      http://www.foxking.org/
// @description    Apply other language option in Google search
// @include        http://www.google.co.jp/search?*
// @include        http://www.google.com/search?*
// @include        http://www.google.com.vn/search?*
// @include        http://www.google.co.th/search?*
// ==/UserScript==
//
// auther:  Sugano `Koshian' Yoshihisa(E)
// version: 0.0.2

var lang = [
            // ["all", "すべての言語"],
            // ["is", "アイスランド語"],
            // ["ar", "アラビア語"],
            // ["hy", "アルメニア語"],
            // ["it", "イタリア語"],
            // ["id", "インドネシア語"],
            // ["uk", "ウクライナ語"],
            // ["et", "エストニア語"],
            // ["eo", "エスペラント語"],
            // ["nl", "オランダ語"],
            // ["ca", "カタロニア語"],
            // ["el", "ギリシャ語"],
            // ["hr", "クロアチア語"],
            // ["sv", "スウェーデン語"],
            // ["es", "スペイン語"],
            // ["sk", "スロバキア語"],
            // ["sl", "スロベニア語"],
            // ["sr", "セルビア語"],
            // ["th", "タイ語"],
            // ["cs", "チェコ語"],
            // ["da", "デンマーク語"],
            // ["de", "ドイツ語"],
            // ["tr", "トルコ語"],
            // ["no", "ノルウェー語"],
            // ["hu", "ハンガリー語"],
            // ["tl", "フィリピン語"],
            // ["fi", "フィンランド語"],
            // ["fr", "フランス語"],
            // ["bg", "ブルガリア語"],
            // ["vi", "ベトナム語"],
            // ["iw", "ヘブライ語"],
            // ["be", "ベラルーシ語"],
            // ["fa", "ペルシャ語"],
            // ["pl", "ポーランド語"],
            // ["pt", "ポルトガル語"],
            // ["lv", "ラトビア語"],
            // ["lt", "リトアニア語"],
            // ["ro", "ルーマニア語"],
            // ["ru", "ロシア語"],
            ["en", "英語"],
            // ["ko", "韓国語"],
            // ["zh-CN", "中国語（簡体）"],
            // ["zh-TW", "中国語（繁体）"],
            ["ja", "日本語"],
            ];

var lang_place_xpath = 'id("sft")/tbody/tr/td[2]';
var result = document.evaluate(lang_place_xpath, document, null, 7, null);
var lang_place = result.snapshotItem(0);

for (var i = 0; i < lang.length; i++) {
  var input = document.createElement('input');
  var label = document.createElement('label');
  input.setAttribute('type', 'radio');
  input.setAttribute('name', 'lr');
  input.setAttribute('value', 'lang_' + lang[i][0]);
  label.innerHTML = lang[i][1];

  lang_place.appendChild(input);
  lang_place.appendChild(label);
}
