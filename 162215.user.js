// ==UserScript==
// @name           LDR - Stealthy Move
// @namespace      http://profile.livedoor.com/ronekko/
// @description    livedoor Readerで未読にしたままフィードを移動するキー/マウス操作を付加する(設定の「既読にするタイミング」が「別の記事にフォーカスする時」のとき有効)
// @include        http://reader.livedoor.com/reader/
// @include        http://reader.livedoor.com/public/*
// @version        20121122
// ==/UserScript==


const KEY_GOTO_PREV = 'A';
const KEY_GOTO_NEXT = 'S';
var w = unsafeWindow;

w.register_hook('AFTER_CONFIGLOAD', function(){
	
	function readPrevSubsWithoutTouch(){
		var touch_when = w.Config.touch_when;
		w.Config.touch_when = '';
		w.Control.read_prev_subs();
		w.Config.touch_when = touch_when;
		w.State.go_next_flag = false;
	}
	
	function readNextSubsWithoutTouch(){
		var touch_when = w.Config.touch_when;
		w.Config.touch_when = '';
		w.Control.read_next_subs();
		w.Config.touch_when = touch_when;
		w.State.go_next_flag = false;
	}
	
	function evalInPage(fun) {
		//location.href = "javascript:void (" + fun + ")()";
		fun();
	}
	
	evalInPage(function(){
		document.getElementById('up_button').onmousedown = function(){}
		document.getElementById('down_button').onmousedown = function(){}
	});
	
	
	w.Keybind.add(KEY_GOTO_PREV, readPrevSubsWithoutTouch);
	w.Keybind.add(KEY_GOTO_NEXT, readNextSubsWithoutTouch);
	document.getElementById('up_button').addEventListener('mousedown', function(event){
		if(event.button === 1){
			readPrevSubsWithoutTouch();
		}else{
			if(event.shiftKey){
				w.Control.reverse()
			} else {
				w.Control.go_prev()
			}
		}
	}, true);
	document.getElementById('down_button').addEventListener('mousedown', function(event){
		if(event.button === 1){
			readNextSubsWithoutTouch();
		}else{
			w.autoscroll.call(this, event);
		}
	}, true);
});
