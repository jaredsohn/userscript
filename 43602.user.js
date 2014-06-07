// ==UserScript==
// @name           WassrFavoriteIconCounter
// @namespace      http://kuwa.masa.googlepages.com/
// @description    Wassr で、イイネアイコンの数を表示する
// @include        http://wassr.jp/my/
// @include        http://wassr.jp/user/*
// @include        http://wassr.jp/user/*/received_favorites
// @include        http://wassr.jp/user/*/favorites
// @include        http://wassr.jp/channel/*
// @include        http://wassr.jp/ranking/favorite/*
// @include        http://wassr.jp/timeline/*
// @include        http://wassr.jp/status/sl_list
// @include        http://wassr.jp/channel_message/
// @include        http://wassr.jp/favorite/
// @author         ksr http://wassr.jp/user/ksr
// @version        1.3
// ==/UserScript==
//
// 2009/03/09 1.1 AutoPagerize に対応
// 2009/06/30 1.2 oAutoPagerize系で次ページ以降の処理に問題があったのを修正
// 2010/01/03 1.3 負荷軽減、「モットミル」対応、レス展開時適応対応
// 

// Opera で実行された場合は、console.log を追加
if(window.opera&&!window.console){console={log:opera.postError}}

(function () {
	// 追記処理
	var r = function(node){
		for( var i = 0, len = node.length; i < len; i++ ){
			var icon_cnt = node[i].innerHTML.match(/href/g).length;
			if( icon_cnt > 0 ){
				node[i].innerHTML = node[i].innerHTML.replace("イイネ:" , "イイネ(" + icon_cnt + "):" );
			}
		}
	} 

	// 対象ノード検索処理
	var f = function(doc){
		var fovs = $X('.//div[@class="favorite_list"]', doc);
		if( fovs ) r( fovs );
	}
	f(document);

	// ノード追加時の処理を登録
	document.body.addEventListener('DOMNodeInserted',function(evt){
		if( evt.target ) f( evt.target );
	}, false);
})();



// cho45 - http://lowreal.net/
// http://gist.github.com/3238
//
// extend version of $X
// $X(exp);
// $X(exp, context);
// $X(exp, type);
// $X(exp, context, type);
function $X (exp, context, type /* want type */) {
	if (typeof context == "function") {
		type    = context;
		context = null;
	}
	if (!context) context = document;
	exp = (context.ownerDocument || context).createExpression(exp, function (prefix) {
		var o = document.createNSResolver(context)(prefix);
		if (o) return o;
		return (document.contentType == "application/xhtml+xml") ? "http://www.w3.org/1999/xhtml" : "";
	});

	switch (type) {
		case String:  return exp.evaluate(context, XPathResult.STRING_TYPE, null).stringValue;
		case Number:  return exp.evaluate(context, XPathResult.NUMBER_TYPE, null).numberValue;
		case Boolean: return exp.evaluate(context, XPathResult.BOOLEAN_TYPE, null).booleanValue;
		case Array:
			var result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var ret = [], i = 0, len = result.snapshotLength; i < len; i++) {
				ret.push(result.snapshotItem(i));
			}
			return ret;
		case undefined:
			var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
			switch (result.resultType) {
				case XPathResult.STRING_TYPE : return result.stringValue;
				case XPathResult.NUMBER_TYPE : return result.numberValue;
				case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
				case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
					// not ensure the order.
					var ret = [], i = null;
					while ((i = result.iterateNext())) ret.push(i);
					return ret;
			}
			return null;
		default: throw(TypeError("$X: specified type is not valid type."));
	}
}
