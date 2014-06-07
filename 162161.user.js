// ==UserScript==
// @name           LDR - Loose Pin Popup List
// @namespace      http://profile.livedoor.com/ronekko/
// @description    ピンアイコンへのマウスオーバーによるポップアップを鈍感にする
// @include        http://reader.livedoor.com/reader/
// @version        20121122
// ==/UserScript==

unsafeWindow.register_hook('AFTER_CONFIGLOAD', function(){
	function evalInPage(fun) {
		//location.href = "javascript:void (" + fun + ")()";
		fun();
	}
	
	evalInPage(function(){
		var pin = document.getElementById('pin_button');
		var timer;
		// 遅らせる時間の長さを変更するには、下の数値を書き換えてください。単位は[ミリ秒]です。
		var delayTime = 400;
		
		pin.onmouseover = function(event){
			timer = setTimeout(function(event){
				unsafeWindow.Control.pin_hover.call(pin,event);
				timer = null;
			}, delayTime, event);
		}
		
		pin.onmouseout = function(event){
			if(timer){
				clearTimeout(timer);
				timer = null;
			}else{
				unsafeWindow.Control.pin_mouseout.call(pin,event);
			}
		}
		
		pin.onclick = function(event){
			if(timer){
				clearTimeout(timer);
				timer = null;
			}
			unsafeWindow.Control.pin_click.call(pin,event);
		}
	});
});