// ==UserScript==
// @name seesaa_blog_edit
// @namespace http://bicyclegeek.seesaa.net/
// @description 記事を作成・編集するページで２つめのプレビューボタンからプレビューが正しくできない不具合を解消し、３つめのプレビューボタンへもタブキーで移動できるようにした
// @include http://blog.seesaa.jp/cms/article/edit/input?id=*
// @include http://blog.seesaa.jp/cms/article/regist/input
// @version 1.03
// ==/UserScript==

// 下にスクロール
//window.scroll(0, 230);

// テキストエリアの縦幅を拡大
//document.getElementById('article__body').style.height = '560px';

// ２つめのプレビューボタンからプレビューが正しくできない不具合の解消（=>２つめのボタン群は非表示にされた
// document.getElementById('js_submit_article_preview').setAttribute('class','articlepreviewIcon js_submit_article_preview');
// document.getElementById('js_submit_article_preview').setAttribute('tabindex','4');

// １つめのプレビューボタンへもタブキーで移動できるようにする（新規）
var nodes = document.evaluate(
	  '//html/body/article/div/div[2]/div[2]/div/form/div/div/a',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0, elm; elm = nodes.snapshotItem(i); i++) {
	elm.setAttribute('tabindex', '3');
}
// １つめのプレビューボタンへもタブキーで移動できるようにする（編集）
var nodes = document.evaluate(
      '//html/body/article/div/div[2]/div[2]/div/form/div[2]/div/a',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0, elm; elm = nodes.snapshotItem(i); i++) {
	elm.setAttribute('tabindex', '3');
}

//編集画面ではタイトル欄の上のリンクにtabindexが設定されているので外す
if(document.URL != 'http://blog.seesaa.jp/cms/article/regist/input'){
    var nodes=document.getElementsByClassName('fleft');
    if(nodes[4].childNodes[1])
        nodes[4].childNodes[1].removeAttribute('tabindex');
    nodes[4].childNodes[3].removeAttribute('tabindex');
    if(nodes[4].childNodes[5])
        nodes[4].childNodes[5].removeAttribute('tabindex');
    var nodes=document.getElementsByClassName('fright');
    nodes[0].childNodes[1].removeAttribute('tabindex');
    nodes[0].childNodes[3].removeAttribute('tabindex');
}

//新規・編集画面で最下部のプレビューボタンにもtabindexが設定されているので外す
var nodes=document.getElementsByClassName('js_submit_article_preview');
nodes[2].removeAttribute('tabindex');

// 記事を更新後に表示される広告画像を消す（AdBlockで行うことにした）
//window.addEventListener('load', function() {
//			document.getElementById('adbox_1').style.display = 'none';
//		})