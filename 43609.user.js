// ==UserScript==
// @name           WassrTimelineSpeed
// @namespace      ksr
// @description    Wassr のタイムラインの流れを (時速 約 XXX ﾋﾄｺﾄ) 形式で表示する
// @include        http://wassr.jp/my/
// @include        http://wassr.jp/channel/*
// @include        http://wassr.jp/timeline/public
// @include        http://wassr.jp/status/sl_list
// @include        http://wassr.jp/channel_message/
// @author         ksr http://wassr.jp/user/ksr
// @version        0.3
// ==/UserScript==
//
// 0.1 2009/01/06 初版公開
// 0.2 2009/01/07 「日本中のタイムライン」の対応追加
// 0.3 2009/01/07 不参加のチャンネルの対応追加


function TlSpeed(){

	var speed;
	var yaku = '';
	var mode = checkPage();

	// ﾋﾄｺﾄの日付フィールド取得
	var times = $x('//a[@class="MsgDateTime"]');

	// 現在日時を取得 & １時間前の日時を取得
	var now = new Date();
	var before1hour = now.getTime() - ( 60 * 60 * 1000 );

	// 最古ﾋﾄｺﾄの日時を取得
	var firstDate = StrToDate( times[times.length-1].innerHTML );


	if( before1hour < firstDate ){
		// 全ﾋﾄｺﾄが１時間以内に更新

		var subTime = now.getTime() - firstDate.getTime();
		speed = Math.round( ( 60 * 60 ) / ( subTime / 1000 ) * times.length );

		yaku = "約";
	}else{
		// 全ﾋﾄｺﾄが１時間以内に更新されていない

		// １時間以内の更新ﾋﾄｺﾄ件数を取得
		for( var i = 0 ; i < times.length ; i++ ){
			var iDate = StrToDate( times[i].innerHTML );
			if( before1hour > iDate.getTime() ){
				speed = i;
				break;
			}
		}
	}

	// 表示エリアに記述追加
	if( mode == 1 || mode == 2 ){
		// Home or チャンネルページ
		var addArea = $x('//p[@class="UpdateHd"]');
		if( addArea == null ){
			// 不参加チャンネル対応
			addArea = $x('//h2[@class="ttlLv2"]');
		}
		addArea[0].innerHTML = addArea[0].innerHTML + "&nbsp;&nbsp;&nbsp;&nbsp;(時速 " + yaku + " <b>" + speed + "</b> ﾋﾄｺﾄ)";
	}else if( mode == 3 || mode == 4 || mode == 5 ){
		// 日本中のヒトコト系ページ
		var addArea = $x('//div[@class="OneTopic"]/p');
		addArea[0].innerHTML = addArea[0].innerHTML + "<br>(時速 " + yaku + " <b>" + speed + "</b> ﾋﾄｺﾄ)";
	}
}


// 2009-01-06(Tue) 17:59:52 形式から Date オブジェクトを作成して返す
function StrToDate( value ){
	var match = value.match( /\d+/g );
	return new Date( match[0], match[1]-1, match[2], match[3], match[4], match[5] );
}

// 表示ページ判定
function checkPage(){
	var this_location = window.location.href;

	if( this_location.indexOf( "/my/" ) != -1 ){
		// home
		return 1;
	}else if( this_location.indexOf( "/channel/" ) != -1 ){
		// チャンネルページ
		return 2;
	}else if( this_location.indexOf( "/timeline/public" ) != -1 ){
		// 日本中のタイムライン
		return 3;
	}else if( this_location.indexOf( "/status/sl_list" ) != -1 ){
		// SecondLife中のひとこと
		return 4;
	}else if( this_location.indexOf( "/channel_message/" ) != -1 ){
		// ワサチャンネル中のひとこと
		return 5;
	}
}


TlSpeed();




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

