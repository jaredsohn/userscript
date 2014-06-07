// ==UserScript==
// @name           LDR Open Site Directly
// @namespace      http://profile.livedoor.com/ronekko/
// @description    LDRでフィード一覧から中クリックで直接サイトを開く（編集画面でアイテムを中クリック又はCtrl+左クリックでも開けます）
// @include        http://reader.livedoor.com/reader/
// @include        http://reader.livedoor.com/public/*
// @version        20101221
// ==/UserScript==

var w = unsafeWindow;
function isInsideRect(rect, x, y){
	return x <= rect.right && y >= rect.top && y <= rect.bottom && x >= rect.left;
}

w.register_hook('AFTER_CONFIGLOAD', function(){
	
	var subsContainer = document.getElementById('subs_container');
	document.addEventListener('click', function(event){
		var containerRect, itemRect;
		var x, y;
		var nodes;
		var sid;
		
		if(event.button != 1){ return; }
		
		containerRect = subsContainer.getBoundingClientRect();
		x = event.pageX;
		y = event.pageY;
		if(isInsideRect(containerRect, x, y)){
			nodes = Array.slice(document.getElementsByClassName('treeitem'));
			for(var i in nodes){
				itemRect = nodes[i].getBoundingClientRect();
				if(isInsideRect(itemRect, x, y)){
					sid = nodes[i].id.replace('subs_item_', '');
					setTimeout(function(){
						GM_openInTab(w.subs_item(sid).link);
					}, 0);
					break;
				}
			}
		}
	}, true);
	
	var onmousedown_ = w.TRSelector.onmousedown;
	w.TRSelector.onmousedown = function(element, event){
		if((event.button === 1) || (event.button === 0 && event.ctrlKey)){
			var sid = element.getAttribute('subscribe_id');
			setTimeout(function(){
				GM_openInTab(w.subs_item(sid).link);
			}, 0);
		}else{
			onmousedown_.apply(this, arguments);
		}
	}
	
});