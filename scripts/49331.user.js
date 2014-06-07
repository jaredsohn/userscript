// ==UserScript==
// @name           HatenaQuestionTune
// @namespace      hatena
// @include        http://q.hatena.ne.jp/*
// ==/UserScript==

// はてな人力検索の右側スペースの以下の項目を非表示にする
// ・Yahoo!オークションで検索
// ・楽天市場で検索
// ・携帯でアクセス
// ・人力検索を使ってみませんか？
//
// 10-02-07 HatenaQuestionTuneに改名 & Twitterイメージ削除
// 09-07-13 ページレイアウト更新に伴う修正


// 要素の検索
var sb  = document.getElementById("sidebar");
var qs = new Array();
if (sb != null) {
  qs  = sb.getElementsByClassName("question-status");
}
var removeQs = null;

// 削除
for (var m in qs) {
  // 'Yahoo!オークションで検索'を削除
  var sy = qs[m].getElementsByClassName("side-yahoo");
  if (sy.length == 1) {
      sy[0].parentNode.removeChild(sy[0]);
  }

  // '楽天市場で検索'を削除
  var byimg = qs[m].getElementsByClassName("by");
  for (var s in byimg) {
    if (byimg[s].tagName == 'IMG' && byimg[s].getAttribute("title") == '楽天') {
      var delNode = byimg[s].parentNode.parentNode;
      delNode.parentNode.removeChild(delNode);
      break;
    }
  }

  // '携帯でアクセス'があれば記録
  var qst = qs[m].getElementsByClassName("question-sidebartitle");
  for (var n in qst) {
    if (qst[n].firstChild.nodeValue == '携帯でアクセス') {
      removeQs = qs[m];
    }
  }
}

if (sb != null) {
  // '携帯でアクセス'削除
  if (removeQs != null) {
    removeQs.parentNode.removeChild(removeQs);
  }
  // '人力検索を使ってみませんか' & Twitterイメージ削除
  var hi = sb.getElementsByClassName("hatena-info");
  if (hi.length == 1) {
    var imgs = sb.getElementsByTagName("img");
    for (var imgid in imgs) {
      if (imgs[imgid].tagName == 'IMG' && imgs[imgid].getAttribute("alt") == "twitterで新着質問をチェック！") {
        // twitterイメージ削除
        imgs[imgid].parentNode.removeChild(imgs[imgid]);
        break;
      }
    }
    hi[0].parentNode.removeChild(hi[0]);
  }
};
