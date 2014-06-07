// ==UserScript==
// @name        Delicious.com Toggle Tag Bundles
// @description DeliciousのTag Bundlesをリンクではなく表示,非表示のトグルにする
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

		var bundles = document.getElementById("rbundle-tags");
		if(!bundles) return;
		foreach(bundles.getElementsByTagName("h4"), function(){
			if(this.className.indexOf("bundle") === -1) return false; // continue
			var span = this.getElementsByTagName("span")[0];
			var anchor = this.getElementsByTagName("a")[0];

			span.innerHTML += anchor.innerHTML;
			anchor.innerHTML = "";

			setStyles(span, {
				paddingLeft: "1.4em",
				width: "100%",
				color: "#565656",
				fontSize: "92%",
				fontWeight: "bold"
			});
		});
	};
})();
