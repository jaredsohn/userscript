// ==UserScript==
// @name           WassrAddUserLink
// @namespace      ksr
// @description    Wassr で、ポストに @XXX 形式のユーザーIDが記述された場合はユーザーページへのリンクを追加する
// @include        http://wassr.jp/*
// @author         ksr http://wassr.jp/user/ksr
// @version        0.3
// ==/UserScript==
//
// 2009/04/14 0.1 初版リリース
// 2009/04/22 0.2 AutoPagerize の対応と thickbox の対応を追加
// 2009/07/08 0.3 oAutoPagerize とレス元に @XXX 形式が有った場合に間違ってリンクしていたブラウザが有ったのを修正
//

// Opera で実行された場合は、console.log を追加
if(window.opera&&!window.console){console={log:opera.postError}}

function WassrAddUserLink(){
	var flg = false;
	
	// 通常ポスト
	var desc = $x('//p[@class="message description"]');
	if( desc ){
		for( var i = 0 ; i < desc.length ; i++ ){
			// 置換処理
			desc[i].innerHTML = WassrAddUserLink_replace( desc[i].innerHTML );
			// thickbox が含まれていたら flg = true
			if( desc[i].innerHTML.indexOf( "thickbox" ) != -1 ) flg = true;
		}
	}
	// レスポスト
	var desc = $x('//ul[@class="MessageList"]/li');
	if( desc ){
		for( var i = 0 ; i < desc.length ; i++ ){
			// 置換処理
			desc[i].innerHTML = WassrAddUserLink_replace( desc[i].innerHTML );
			// thickbox が含まれていたら flg = true
			if( desc[i].innerHTML.indexOf( "thickbox" ) != -1 ) flg = true;
		}
	}
	
	// flg = true なら、thickbox のライブラリを再読み込み＆初期化して無効になった thickbox のイベントを復活させる
	if( flg == true ){
		var script = $x('//script');
		for( var i = 0 ; i < script.length ; i++ ){
			if( script[i].src.indexOf( "thickbox" ) != -1 ){
				var n = document.createElement("script");
				n.setAttribute( "type", "text/javascript");
				n.setAttribute( "src", script[i].src);

				script[i].parentNode.removeChild( script[i] );
				$x('//head')[0].appendChild( n );
				return;
			}
		}
	}
}

function WassrAddUserLink_replace( html ){
	
	// レス元は既にリンクされているので、その中に id が有った場合もリンク追加しちゃうので待避してから戻す
	var res = html.match( /<span style=".*?" class="res">[\s\S]*?<\/span>/i );

	// 待避
	if( res ) html = html.replace( /<span style=".*?" class="res">[\s\S]*?<\/span>/i , "__%RES%__" );

	// ユーザーページへのハイパーリンク追加
	html = html.replace( /(@([a-z0-9\-_]{3,}))/g , "<a href='/user/$2'>$1</a>" );
	// チャンネルページへのハイパーリンク追加
	html = html.replace( /(#([a-z0-9\-_]+))/g , "<a href='/channel/$2'>$1</a>" );
	
	// 戻し
	if( res ) html = html.replace( /__%RES%__/ , res );
	
	return html;
}

WassrAddUserLink();


// AutoPagerize 動作タイミングで再処理を行うための登録処理
// oAutoPagerize系(って言うか、contentWindowなDOM系ではoAutoPagerizeオブジェクトの生成が遅めで登録できていなかった事もあるので少しウェイト挟んだ)
setTimeout(function(unsafeWindow){
	var w = this.unsafeWindow || window;
	if( typeof(contentWindow) != 'undefined' ){
		w = contentWindow;
	}
	
	if (w.AutoPagerize && w.AutoPagerize.addFilter){
		w.AutoPagerize.addFilter(WassrAddUserLink);
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

