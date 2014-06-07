// ==UserScript==
// @name           LDR Smart Searchbox
// @namespace      http://profile.livedoor.com/ronekko/
// @description    Livedoor Readerで検索ボックス入力中にエンターキーを2回押すと既読を含む全てのフィードから検索する
// @include        http://reader.livedoor.com/reader/
// @include        http://reader.livedoor.com/public/*
// ==/UserScript==

var w = unsafeWindow;
var lastKeyIsEnter = false;
var show_all = null;
var finder;
var img;
const ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAAEVmidkAAAADFBMVEX%2F%2F%2F%2Fl5eW5ubmysrJnq3lwAAAAEnRFWHRUaXRsZQBiYXR1M2c5aS5wbmfoDcdgAAAADHRFWHRTb2Z0d2FyZQBWaVisIm5tAAAAYUlEQVR42mNgAIMPDLwM8kD6McNpht8M9v8YLPgZDLoZ9P%2BCJPf%2FYbjcw%2FBBh%2BGHDcMjHobfdxjqfzBI%2F%2F%2F%2FhMEu%2F%2BceBjumhj0M9g%2B4%2FzDYNzD9YbDlflDDoP%2F%2F%2Fw%2BwwQBlpiBeR8VIAgAAAABJRU5ErkJggg%3D%3D';

function _blur_findbox_(){
	if(show_all != null){
		if(!show_all){
			w.Control.toggle_show_all();
			w.subs.show();
			w.update("total_unread_count");
		}
		show_all = null;
	}
	
	finder.value = "";
	finder.blur();
	img.src = '/img/icon/search_left.gif';
	img.style.cursor = '';
}

w.register_hook('AFTER_CONFIGLOAD', function() {
	finder = w.$("finder");
	img = w.$('search_box_container').getElementsByTagName('img')[0];
	// 検索ボックス内でEnterを押しても記事を移動しないようにする
	w.Keybind.filter = function(e){
		var el  = (e.target || e.srcElement);
		var tag = el.tagName;
		var id  = el.id;
		if(id == "finder"){
			if(w.HotKey.isPrintable(e)) return false;
			if(w.HotKey.getChar(e) == 'delete') return false;
			if(w.HotKey.getChar(e) == 'enter') return false;
		}
		return true;
	}
	
	// Enterを2回連続押したときにだけ全体から検索するようにする
	w.$('finder').addEventListener('keyup', function(e){
		// 消去ボタン追加
		if(finder.value == ''){
			img.src = '/img/icon/search_left.gif';
			img.style.cursor = '';
		}else{
			img.src = ICON;
			img.style.cursor = 'pointer';
		}
		// Enter
		if(e.keyCode == w.KeyEvent.DOM_VK_RETURN){
			if(!lastKeyIsEnter){
				lastKeyIsEnter = true;
				return;
			}
			if(show_all == null){
				show_all = w.Config.show_all;
			}
			
			if(!w.Config.show_all && w.$("finder").value){
				w.Control.toggle_show_all();
			}
		}
		else{
			lastKeyIsEnter = false;
		}
		
	}, true);
	
	// Escを押したときにフィード一覧の表示形式を元に戻すようにする
	w.Keybind.add('esc', _blur_findbox_);
	img.addEventListener('click', _blur_findbox_, true);
});