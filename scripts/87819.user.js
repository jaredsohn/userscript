// ==UserScript==
// @name           Enemy Wiki font fix
// @namespace      ijiranakuteiinode
// @description    「真のエネミーは配偶者 まとめサイト」のフォントを見やすくする
// @version        2011.8.18
// @include        http://www21.atwiki.jp/enemy/*
// ==/UserScript==

(function () {
  // コメント文字色
  var comment_color = '#600060';  // 紫 - 背景色が暗いので文字も暗め

  // 小さすぎるフォントサイズを大きくする
  GM_addStyle (''
    + 'dt, dd, strong, font[size="2"], font[size="1"], p span'
    + '{'
    + '  font-weight: normal !important;'
    + '  font-size: 15px !important;'
    + '  line-height: 1.6em !important;'
    + '}'
  );

  var i;

  // コメントの文字色を灰色から紫に変更
  var font = document.getElementsByTagName ('font');
  for (i = 0; i < font.length; ++i) {
    var f = font [i];
    if (f.color.match (/^#(?:C0C0C0|999999|808080|666666)$/i)) {
      f.color = comment_color;
    }
  }

  var elm = document.getElementById ('main-inner').getElementsByTagName ('*');
  for (i = 0; i < elm.length; ++i) {
    var e = elm [i];
    if (e.style.color == 'rgb(153, 153, 153)'
     || e.style.color == 'rgb(128, 128, 128)') {
      e.style.color = comment_color;
    }
  }


}) ();

// EOF
