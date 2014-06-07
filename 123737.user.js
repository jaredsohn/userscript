// ==UserScript==
// @name           Middle Click Selection Opener
// @namespace      fukuyo
// @include        *
// ==/UserScript==

function init(){
	window.addEventListener("mousedown",
		function(evt){
			var cnt = window.getSelection().rangeCount;
			if(cnt > 0 && evt.button == 1){
				if(!(window.getSelection().getRangeAt(0).startOffset == window.getSelection().getRangeAt(0).endOffset)){
					if(cnt > 1){
						var searchWord = window.getSelection().getRangeAt(0);
						for(var i=1;i<cnt;i++){
							searchWord = searchWord + " " + window.getSelection().getRangeAt(i)
						}
						GM_openInTab("http://google.co.jp/search?q=" + encodeURIComponent(searchWord) + "&hl=ja",null);
					}else{
						GM_openInTab("http://google.co.jp/search?q=" + encodeURIComponent(window.getSelection().toString()) + "&hl=ja");
					}
				}
			}
		},
	false);
}

window.addEventListener("load", init, false);

