// ==UserScript==
// @name           WassrSelfFavProtect
// @namespace      ksr
// @description    Wassrで、セルフイイネ出来なくする
// @include        http://wassr.jp/*
// @author         ksr http://wassr.jp/user/ksr
// @version        0.3
// ==/UserScript==
//
// 2009/05/12 0.1 初版リリース
// 2009/06/16 0.2 AutoPagerize 後の処理の不具合を修正、oAutoPagerize系で次ページ以降の処理に問題があったのを修正
// 2009/12/22 0.3 本家のレイアウト修正に対応
//

function WassrSelfFavProtect(){

	// id を取得する
	var user = $x('//a[@title="あげたイイネ!"]')[0].href.match( /user\/(.*?)\// )[1];

	// イイネボタン(イメージ)を取得する
	var btnFovs = $x('//input[@class="favorite_button"]' );
	if( !btnFovs ) return;

	for( var i = 0 ; i < btnFovs.length ; i++ ){
		// イイネボタンのポストのユーザーを取得
		var post_user = btnFovs[i].parentNode.parentNode.parentNode.innerHTML.match( /user\/([a-z0-9\-_]+)/ );

		// ログインユーザーとポストユーザーが同一で有れば処理する
		if( user == post_user[1] ){
			var p = btnFovs[i].parentNode;
			var pp = p.parentNode;
			pp.removeChild( p );

			var btnElem = document.createElement('div');
			btnElem.innerHTML = '<img width="16" height="16" src="/img/pictogram/E725.gif" alt="イイネ"/>';
			btnElem = btnElem.firstChild;

			pp.appendChild( btnElem );
		}
	}
}


WassrSelfFavProtect();

// AutoPagerize 動作タイミングで再処理を行うための登録処理
// oAutoPagerize系(って言うか、contentWindowなDOM系ではoAutoPagerizeオブジェクトの生成が遅めで登録できていなかった事もあるので少しウェイト挟んだ)
setTimeout(function(unsafeWindow){
	var w = this.unsafeWindow || window;
	if( typeof(contentWindow) != 'undefined' ){
		w = contentWindow;
	}
	
	if (w.AutoPagerize && w.AutoPagerize.addFilter){
		w.AutoPagerize.addFilter(WassrSelfFavProtect);
	}
},500, this.unsafeWindow || window);







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

