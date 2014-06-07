// ==UserScript==
// @name           GetImgSrc_for_mixi
// @namespace      https://twitter.com/#!/hatoJP
// @description    開いているmixiページに貼られてる画像のsrc一覧を出力する為のフォームボタンを提供する
// @include        http://mixi.jp/*
// @author         はと
// @version        1.0.0
// ==/UserScript==
/*
 20100711 - 1.0.0 - とりあえず動作した。


 Copyright (c) 2011, はと <https://twitter.com/#!/hatoJP>
￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣
*/


(function() {


	//-------------------------------------------------------------------------
	//1111111111111111111111111111111111111111111111111111111111111111111111111
	//-------------------------------------------------------------------------
	//●定数宣言
	const ID_TEXTAREA = "GetImgSrc_Screen_Textarea";

	//●変数宣言
	var w = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
	var oTextarea;


	//-------------------------------------------------------------------------
	//2222222222222222222222222222222222222222222222222222222222222222222222222
	//-------------------------------------------------------------------------
	//●改行コード取得関数（参考：http://www.geocities.co.jp/SiliconValley/1715/getCRChars.html）
	function getCRChars(){
		var sourceCode=""+getCRChars+""
		if(sourceCode.indexOf("\r\n")>-1){
			return "\r\n"
		}else if(sourceCode.indexOf("\n")>-1){
			return "\n"
		}else if(sourceCode.indexOf("\r")>-1){
			return "\r"
		}else{
			return "\r\n"
		}
	}
	/*●ドラッグ処理イベントリスナー*/
	w.createMouseDownEventListener = function(e) {
		var elem = e;
		if( elem.addEventListener ) {
			return function(evt) {
				// テキスト選択しないように
				evt.preventDefault();
				if( ! elem._do_moving_ ) {
					elem._do_moving_ = true;
					elem._offset_x_ = elem.offsetLeft;
					elem._offset_y_ = elem.offsetTop;
					elem._page_x_   = evt.pageX;
					elem._page_y_   = evt.pageY;
					elem.style.left = "0px";
					elem.style.top  = "0px";
					elem._offset_x_ = elem._offset_x_ - elem.offsetLeft;
					elem._offset_y_ = elem._offset_y_ - elem.offsetTop;
					elem.style.left = elem._offset_x_ + "px";
					elem.style.top  = elem._offset_y_ + "px";
				}
			};
		} else if( elem.attachEvent ) {
			return function(evt) {
				evt.returnValue = false;
				if( ! elem._do_moving_ ) {
					elem._do_moving_ = true;
					elem._offset_x_ = elem.offsetLeft;
					elem._offset_y_ = elem.offsetTop;
					elem._page_x_   = document.documentElement.scrollLeft + evt.clientX;
					elem._page_y_   = document.documentElement.scrollTop  + evt.clientY;
					elem.style.left = "0px";
					elem.style.top  = "0px";
					elem._offset_x_ = elem._offset_x_ - elem.offsetLeft;
					elem._offset_y_ = elem._offset_y_ - elem.offsetTop;
					elem.style.left = elem._offset_x_ + "px";
					elem.style.top  = elem._offset_y_ + "px";
				}
			};
		} else {
			return function(evt) {
				// do nothing
			};
		}
	};
	w.createMouseUpEventListener = function(e) {
		var elem = e;
		return function(evt) {
			elem._do_moving_ = false;
		};
	};
	w.createMouseMoveEventListener = function(e) {
		var elem = e;
		if( elem.addEventListener ) {
			return function(evt) {
				if( elem._do_moving_ ) {
					var diffX = evt.pageX - elem._page_x_;
					var diffY = evt.pageY - elem._page_y_;
					//elem.style.left = evt.pageX + elem._offset_x_ - elem._page_x_ + "px";
					//elem.style.top  = evt.pageY + elem._offset_y_ - elem._page_y_ + "px";
					elem.style.left = elem._offset_x_ + diffX + "px";
					elem.style.top  = elem._offset_y_ + diffY + "px";
					//elem.offsetLeft = elem._offset_x_ + diffX;
				}
			};
		} else if( elem.attachEvent ) {
			return function(evt) {
				if( elem._do_moving_ ) {
					evt.returnValue = false;
					var diffX = document.documentElement.scrollLeft + evt.clientX - elem._page_x_;
					var diffY = document.documentElement.scrollTop  + evt.clientY - elem._page_y_;
					elem.style.left = elem._offset_x_ + diffX + "px";
					elem.style.top  = elem._offset_y_ + diffY + "px";
				}
			};
		} else {
			return function(evt) {
				// do nothing
			};
		}
	};
	w.createMEMouseDownEventListener = function(e) {
		var elem = e;
		return function(evt) {
			// do nothing
		};
	};
/**
 * Crossbrowser addEventListener
 */
	function _AddEventListener(e, type, fn) {
		if (e.addEventListener) {
			e.addEventListener(type, fn, false);
		}
		else {
			e.attachEvent('on' + type, function() {
				fn(window.event);
			});
		}
	}
	//●getAdrParamArray
	function getAdrParamArray(){
		/* アドレスの「?」以降の引数(パラメータ)を取得 */
		var param = location.search;

		/* 引数がない時は処理しない */
		if (!param) return false;

		/* 先頭の?をカット */
		param = param.substring(1);

		/* 「&」で引数を分割して配列に */
		var pair = param.split("&");
		var i = temp = "";
		var key = new Array();

		for (i=0; i < pair.length; i++) {
			/* 配列の値を「=」で分割 */
			temp=pair[i].split("=");
			keyName=temp[0];
			keyValue=temp[1];
			/* キーと値の連想配列を生成 */
			key[keyName] = keyValue;
		}
		return key;
	}
	//●getMainImageURL
	function getMainImageURL(src){
		var key = getAdrParamArray();//●
		var imgname = new String(src.match(/[^\/]+\.[^\/\.]+$/));
//		console.log('---imgname--->' + imgname);
		var imgid = new String(imgname.match(/^[^_]+/));
//		console.log('---imgid--->' + imgid);
		var number = new String(src.match(/_[^_s]+s/)); 
//		console.log('---number(1)--->' + number);
		number = number.substring(1, number.length-1);
//		console.log('---number(2)--->' + number);
		var requestURL = "http://mixi.jp/show_bbs_comment_picture.pl?bbs_id=" + key["id"] + "&id=" + imgid + "&comm_id=" + key["comm_id"] + "&number=" + number;
//		console.log('---requestURL--->' + requestURL);

		var XMLHttpRequest = new w.XMLHttpRequest;
		XMLHttpRequest.open(
			"GET",
			requestURL,
			true
		);
		XMLHttpRequest.onload = function(){
//			console.log('---XMLHttpRequest.responseText--->' + XMLHttpRequest.responseText);
			var mainimg = getMainImg(XMLHttpRequest.responseText);//●
//			console.log(mainimg);
			var CRLF = getCRChars();
			oTextarea.value = oTextarea.value + mainimg + CRLF;
		};
		XMLHttpRequest.send(null);
	}
	//●getMainImg
	function getMainImg(responseText){
		var img = responseText.toLowerCase().match(/<img.*src\s*=["']([^"']+)["'].+>/)[1];
		return img;
	}


	//-------------------------------------------------------------------------
	//3333333333333333333333333333333333333333333333333333333333333333333333333
	//-------------------------------------------------------------------------
	//●hideScreen
	w.hideScreen = function(){
		oTextarea.parentNode.style.display="none";
	}
	//●runGetImgSrc
	w.runGetImgSrc = function(){
		oTextarea = document.getElementById(ID_TEXTAREA);
		var ss = document.evaluate(
			'//a[contains(concat(" ",normalize-space(@href)," "), " javascript:void(0); ")]/img',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
//		console.log('---snapshotLength--->' + ss.snapshotLength);
		if ( ss.snapshotLength ) {
			oTextarea.parentNode.style.display="block";
			oTextarea.value="";
			var img;
			for(var i=0, j=ss.snapshotLength; i<j; i++){
				img = ss.snapshotItem(i);
//				console.log('---img.src--->' + img.src);
				getMainImageURL(img.src);//●
			}
//			alert("found at [" + ss.snapshotLength + "]IMG.");
		}else{
			alert("nothing.");
		}
	}
	//●init
	function init() {
		//●トリガーHTML生成
		var div = document.createElement('div');
		div.setAttribute('id','GetImgSrc');
		div.style.display = '';
		div.style.margin = 0;
		div.style.padding = '14px 0px 0px 0px';
		div.style.background = 'silver';
		div.style.borderRight = '1px solid #999';
		div.style.borderLeft = '1px solid #999';
		div.style.borderBottom = '1px solid #999';
		div.style.position = 'absolute';
		div.style.top    = '40px';
		div.style.left   = '560px';
		div.style.zIndex = '1';
		div.innerHTML
			= '<p style="text-align:left;padding:1px;">'
			+ '<input type="button" value="Run GetImgSrc!" onclick="runGetImgSrc();" style="background-color:yellow; color:red;" title="ページ中の画像リンクのURL一覧を出力します。" />'
			+ '</p>';

		var controllerElem = div;
		div._do_moving_ = false;
		if( div.addEventListener ) {
//			div.addEventListener( "mousedown", w.createMEMouseDownEventListener(div), false );
			controllerElem.addEventListener( "mousedown", w.createMouseDownEventListener(div), false );
			document.addEventListener( "mouseup", w.createMouseUpEventListener(div), false );
			document.addEventListener( "mousemove", w.createMouseMoveEventListener(div), false );
		} else if( elem.attachEvent ) {
//			div.attachEvent( "onmousedown", w.createMEMouseDownEventListener(div) );
			controllerElem.attachEvent( "onmousedown", w.createMouseDownEventListener(div) );
			document.attachEvent( "onmouseup", w.createMouseUpEventListener(div) );
			document.attachEvent( "onmousemove", w.createMouseMoveEventListener(div) );
		}
		document.body.appendChild(div);

		//●出力スクリーンHTML生成
		var div = document.createElement('div');
		div.setAttribute('id','GetImgSrc_Screen');
		div.style.display = 'none';
		div.style.margin = '0px';
		div.style.padding = '1px';
		div.style.background = 'skyblue';
		div.style.borderRight = '1px solid #999';
		div.style.borderLeft = '1px solid #999';
		div.style.borderBottom = '1px solid #999';
		div.style.position = 'absolute';
		div.style.top    = '200px';
		div.style.left   = '500px';
		div.style.zIndex = '2';
		div.innerHTML
			= '<div id="GetImgSrc_Screen_Hundle" style="background-color:silver;width:100%;height:18px;z-index:3;"></div>'
			+ '<textarea id=' + ID_TEXTAREA + ' value="" style="width:700px;height:400px;z-index:3;"></textarea>'
			+ '<br>'
			+ '<input type="button" value="close" onclick="hideScreen();" style="background-color:yellow; color:red;" title="閉じます。" />'
			+ '';

		var controllerElem = div.firstChild;
		div._do_moving_ = false;
		if( div.addEventListener ) {
//			div.addEventListener( "mousedown", w.createMEMouseDownEventListener(div), false );
			controllerElem.addEventListener( "mousedown", w.createMouseDownEventListener(div), false );
			document.addEventListener( "mouseup", w.createMouseUpEventListener(div), false );
			document.addEventListener( "mousemove", w.createMouseMoveEventListener(div), false );
		} else if( elem.attachEvent ) {
//			div.attachEvent( "onmousedown", w.createMEMouseDownEventListener(div) );
			controllerElem.attachEvent( "onmousedown", w.createMouseDownEventListener(div) );
			document.attachEvent( "onmouseup", w.createMouseUpEventListener(div) );
			document.attachEvent( "onmousemove", w.createMouseMoveEventListener(div) );
		}
		document.body.appendChild(div);
	}


	//-------------------------------------------------------------------------
	//4444444444444444444444444444444444444444444444444444444444444444444444444
	//-------------------------------------------------------------------------
	//●1st run code.
	init();

	//■■■課題■■■
	//・生成したURL一覧を直接クリップボードへ。
	//・拡張子選択の機会を与える。
	//・トリガーをもっとスマートに。いつでも押せる位置取りを。
	//・条件に合致しないimgしかなかった時、出力が空なのに見つけた動作をしてしまう。
	//・対象ページやら除外ページを見直した方がいいに決まってる。
	//・見た目を整えなきゃ。
	//・関数名とか直す。


})();

	