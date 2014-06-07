// ==UserScript==
// @name           LDR tumblr url auto open in new window
// @namespace      http://www.psychedesire.org/
// @description    LDRにおいて、item.link が -png -jpg -gifで終わっているものを別ウィンドウで勝手に開く
// @include        http://reader.livedoor.com/reader/*
// @include        http://reader.livedoor.com/public/*
// @include        http://fastladder.com/reader/*
// @author         psychedesire
// origin          http://www.pshared.net/
// ==/UserScript==

(function() {
	const NEXT_KEY = "j";
	const PREV_KEY = "k";
	var w = this.unsafeWindow || window;
	w.addEventListener("load", function() {with(w) {
		var showActiveItemUrl = function() {
			var item = get_active_item(true);
			if (!item) {
				return;
			}
			var itemlink = item.link;
			var splt = itemlink.split("-");
			var spnm = splt.length - 1;
			var attr = splt[spnm];
			var arry = new Array('jpg','png','gif');
			var flg = 0;
			for(i = 0;i < splt.length;i ++){
				if(attr == arry[i]){
					flg = 1;
				}
			}
			if(flg == 1){
				imagelink = itemlink.replace("-",".");
				window.open(imagelink);
				//item.body = "<img src='" + imagelink + "' />";ってやっても見れないんだぜ？
			}
		}

		var nextFunc = Keybind._keyfunc[NEXT_KEY];
		Keybind.add(NEXT_KEY, function() {
			nextFunc();
			showActiveItemUrl();
		});

		var prevFunc = Keybind._keyfunc[PREV_KEY];
		Keybind.add(PREV_KEY, function() {
			prevFunc();
			showActiveItemUrl();
		});
	}}, false);
})();
