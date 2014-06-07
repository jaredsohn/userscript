// ==UserScript==
// @name           LDR Wheel Scroll on Up/Down Button
// @namespace      http://profile.livedoor.com/ronekko/
// @description    LDRで記事移動ボタン（|▲|▼|）上でのホイールによる記事欄のスクロールを可能にする
// @include        http://reader.livedoor.com/reader/
// @include        http://reader.livedoor.com/public/*
// ==/UserScript==
// ver. 20100129 外枠ごとスクロールしてしまうバグの修正

(function(){
	var step = 200 // スクロール幅[pixel]
	var speed = step/10;
	var direction;
	var restScroll = 0;    // スクロール残量
	var intervalID;
	var container = document.getElementById('right_container');
	
	// スクロール処理をする
	function setScrollPosition() {
		var moveValue=0;
		// スクロール残量に応じて移動量を変える
		if(Math.abs(restScroll)>step){
			moveValue = restScroll / 10;
		}else if(Math.abs(restScroll)>speed){
			moveValue = speed * direction;
		}else{
			moveValue = restScroll/2;
		}
		// スクロールを処理
		container.scrollTop += moveValue;
		// スクロール残量を計算して、残りが無ければタイマー解除
		restScroll = (restScroll>0)?restScroll-moveValue:restScroll-moveValue;
		if(Math.abs(moveValue)<1){
			clearInterval(intervalID);
			restScroll=0;
		}
	}
	
	var handler = function(e){
		e.preventDefault();
		e.stopPropagation();
		
		direction = e.detail > 0 ? 1 : -1;
		// スクロール中に逆方向が入力されたらすぐスクロールを停止する
		if(restScroll * direction < 0){
			clearInterval(intervalID);
			restScroll=0;
		}
		
		// 静止状態であればスクロールを開始する
		if(!restScroll){
			setTimeout(function(){
				intervalID = setInterval(setScrollPosition,10);
			}, 1);
		}
		
		restScroll += step * direction;
	}
	
	document.getElementById('down_button').addEventListener('DOMMouseScroll', handler, true);
	document.getElementById('up_button').addEventListener('DOMMouseScroll', handler, true);
})();