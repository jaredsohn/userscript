// ==UserScript==
// @name        Delicious.com NicoNico Thumbnail
// @description Deliciousでニコニコ動画のサムネイルを表示
// @include     http://delicious.com/*
// ==/UserScript==
(function(){
	var foreach = function(arr, fn){
		for(var i = 0, l = arr.length; i < l; ++i){
			var res = fn.apply(arr[i], [i]);
			if(res === true) break;
			else if(res === false) continue;
		}
	};
	
	var setStyles = function(elem, styles){
		for(var key in styles){
			elem.style[key] = styles[key];
		}
	};

	var _onload = window.onload;
	window.onload = function(){
		if(_onload) _onload();

		foreach(document.getElementsByTagName("a"), function(){
			var href = this.getAttribute("href");
			if(!href) return false; // continue

			if(href.match(/sm([0-9]+)$/)){
				var p = this.parentNode.parentNode;
				
				// create image element
				var img = document.createElement("img");
				img.src = "http://tn-skr.smilevideo.jp/smile?i=" + RegExp.$1;
				setStyles(img, {
					width: "80px",
					height: "60px",
					marginRight: "10px",
					display: "block",
					cssFloat: "left"
				});

				// create div element to clear float
				var div = document.createElement("div");
				setStyles(div, {
					height: "0",
					clear: "left"
				});

				// add to document
				p.insertBefore(img, p.firstChild);
				p.appendChild(div);
			}

		});
	};
})();
