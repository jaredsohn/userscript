// ==UserScript==
// @name        Feedeen Colorful List
// @namespace   http://feedeen.colorful.list/
// @description Colorful Feedeen!
// @include     http://feedeen.com/d
// @version     0.1
// @grant       GM_addStyle
// @author     Alty <fujihisa@gmail.com>
// @updateURL	http://userscripts.org/scripts/show/172431
// @version    20130702
// ==/UserScript==

// 参考 //
// Feedly Colorful Listview: https://userscripts.org/scripts/show/162256

var colors = {};

// 色計算
function computeColor(title) {
    var h = 0;
    for each (var c in title) {
        h += c.charCodeAt(0);
    }
    h = h % 360;
    colors[title] = h;
    return h;
}

(function() {
    GM_addStyle(
        ".fd_item { border-color: transparent !important; }" +
        ".fd_itemlist .fd_item {" + 
        "   border: 1px solid #bcbcbc !important; }" +
        ".fd_itemlist .fd_expanded .fd_item {" + 
        "   border-bottom-color: transparent !important;" + 
        "   border-width: 0px 0 !important; }");

	// Node挿入を監視
	document.addEventListener("DOMNodeInserted", function() {
		//itemlistが更新されたらリストを取得
		var itemlist = document.querySelector('.fd_itemlist');
		if(!itemlist) {
			return
		} else {
			var uncolored = itemlist.querySelector(".fd_item:not([colored])"); // 色の塗られてないdivを取り出す
			if (!uncolored) {
				return;
			} else {
				titleA = uncolored.querySelector("a.fd_sitename")		//fd_sitename
				titleA.setAttribute("style", "color: black;");			// 拾ったaタグにフォント黒色設定
				var title = titleA.innerHTML;								// 拾ったAタグのテキスト拾う
				title = title.replace(/\W/g, "-");							// 拾ったテキストを-に置換
				uncolored.setAttribute("colored", title);				// 拾ったテキストにcolored属性付ける
				uncolored.querySelector(".fd_title").parentNode.setAttribute("colored", title);

	            if (colors[title] == undefined) {
					var color = computeColor(title);	// 拾ったテキスト用色計算
					GM_addStyle(
						"div[colored='" + title + "'] {" +
						"   background: hsl(" + color + ",70%,80%) !important; }" +
						"div[colored='" + title + "']:hover {" +
						"   background: hsl(" + color + ",90%,85%) !important; }");
					} // if	
				};
			}
		}
    }, false);
})();
