// ==UserScript==
// @name           WassrPhotoMiracleLink
// @namespace      ksr
// @description    Wassr のフォトギャラリーに元ポストのリンクを追加する
// @include        http://wassr.jp/user/*/photos*
// @author         ksr http://wassr.jp/user/ksr
// @version        0.3
// ==/UserScript==
//
// 0.1 初版完成
// 0.2 2ページ目無効だったので修正
// 2009/3/29 0.3 Opera , Chrome + GreaseMetal 対応
//

// メイン処理
(function(){

	// 写真のポップアップ表示のリンクを探して、クリックイベントにフック追加
	var photos = $x('//a[@class="thickbox"]');

	for( var i = 0 ; i < photos.length ; i++ ){
		photos[i].addEventListener("click", handler, false);
	}
})();

// ちょいウェイト処理
function handler(){
	setTimeout(addLink, 100);
}

// リンク追加処理
function addLink(){
	var TB_img = TB_img = $x('//img[@id="TB_Image"]');

	if( TB_img == null ){
		setTimeout(addLink, 100);
		return;
	}

	// 元ポストのリンク解析
	var img_src = TB_img[0].src;
	img_src.match( /(user\/(.*?)\/statuses\/(.*?))\// );
	var page_adr = RegExp.$1;
	
	// リンク追加
	var add_html = '<a target="_blank" href="http://wassr.jp/' + page_adr + '">元ポストへ</a>';
	var add_area = $x('//div[@id="TB_caption"]');
	add_area[0].innerHTML = add_area[0].innerHTML + add_html;
}




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



