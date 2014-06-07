// ==UserScript==
// @name           googlesideberdelete
// @namespace      http://google.ne.jp/
// @description    googlesideber is deleted.
// @include        http://www.google.co.jp/*
// @include        http://*
// ==/UserScript==

/*誰得ナビゲーション用に設定されているマージンとかを殺す*/
#center_col
{
  margin:0;border: none;
  padding:0;
}
body
{
  height:100%;
}
/*メインカラムの幅をパツンパツンにする*/
div#cnt, div#center_col
{
  width: 100%;
  max-width:100%;
}

/*マルチカラムにする*/
div#ires
{
  -webkit-column-width: 25em !important;
  -webkit-column-gap: 1.5em !important;
}

/*関連検索語とかの誰得情報を消す*/
div#brs, button.ws, #leftnav, #rhs{display:none;}
