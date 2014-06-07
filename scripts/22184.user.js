// ==UserScript==
// @name           ::VST LINK:: snap-shots
// @namespace      http://ioris.info/ioris/cgi/plink/plink.php
// @description    ::VST LINK:: リンク先プレビュー表示 (snap-shots)
// @include        http://ioris.info/ioris/cgi/plink/plink.php?mode=main*
// ==/UserScript==
(function() {
  /**
   * 機能1: リンク先プレビュー表示　(snap-shots使用. http://www.snap.com/)
   *
   * - サーバ側(PHP)で下記タグを追加するのと同じ結果を得る(snap-shotsのロード)
   *	<script type='text/javascript' src='http://...'/>
   * - サーバ側でsnap-shotsを入れると、ページ表示が全般に重くなる.
   *   ユーザの好みで機能をon/offできるよう、greasemonkey scriptの形で提供.
   */
  var ssURL = "http://shots.snap.com/ss/49339912f251cc5a91a41d01f2d1ada8/snap_shots.js";
  var bTag= document.evaluate('//BODY', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  var sN = bTag.appendChild(document.createElement('script'));
  sN.setAttribute('type','text/javascript'); sN.setAttribute('src', ssURL);
})();
// End