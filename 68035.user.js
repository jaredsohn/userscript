// ==UserScript==
// @name           LDR - Expand Folders in Rate View Mode
// @namespace      http://profile.livedoor.com/ronekko/
// @description    Livedoor Readerで起動/リロード時にフォルダを自動的に開く（レート表示モードのときのみ）
// @include        http://reader.livedoor.com/reader/
// @version        20100205
// ==/UserScript==

var config = [];
// 設定: レート別に、開きたいフォルダにはtrueを、開きたくないフォルダにはfalseを記述してください
config[5] = true;
config[4] = true;
config[3] = true;
config[2] = false;
config[1] = false;
config[0] = false;
// 設定ここまで


var w = unsafeWindow;

function expandRateFolders(){
	if(w.Config.view_mode !== 'rate'){ return; }
	var folders = document.evaluate('//*[@class="folder_root"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(folders.snapshotLength){
		for(var i=0, len=folders.snapshotLength; i<len; ++i){
			var folder = w.TreeView.instance[folders.snapshotItem(i).id];
			var rate = folder.param.name.match(/(\d)\.gif/)[1];
			if(config[rate]){
				folder.open();
			}
		}
	}
	else{
		setTimeout(expandRateFolders, 500);
	}
}


w.register_hook('AFTER_SUBS_LOAD', function(){
	expandRateFolders();
});


w.register_hook('AFTER_CONFIGLOAD', function(){
	// Keybind.add('esc', func)の中身のblur_findboxに機能を追加
	var blur_findbox_esc = w.Keybind._keyfunc['esc'];
	w.Keybind.add('esc', function(){
		var rv = blur_findbox_esc();
		expandRateFolders();
		return rv;
	});
	
	// Control.blur_findboxに機能を追加
	var blur_findbox_ctrl = w.Control.blur_findbox;
	w.Control.blur_findbox = function(){
		var rv = blur_findbox_ctrl();
		expandRateFolders();
		return rv;
	}
	
	var change_view_ = w.Control.change_view;
	w.Control.change_view = function(view){
		var rv = change_view_(view);
		expandRateFolders();
		return rv;
	}
	
	var change_sort_ = w.Control.change_sort;
	w.Control.change_sort = function(sort){
		var rv = change_sort_(sort);
		expandRateFolders();
		return rv;
	}
});