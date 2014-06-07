
// ==UserScript==
// @name                Keyboard Shortcut for Google Reader with G+ [1]
// @version             v1.0 (2011/11/01)
// @namespace	        hecomi
// @include		http*://www.google.*/reader/*
// ==/UserScript==

(function(){
	var onKeyDown = function(e){
		switch (e.keyCode) {
		case 83: // 's' key
			if (!event.shiftKey) return; // 'Shift' key
			location.href = "javascript:(" +
				(function(){
					var ce  = document.getElementById("current-entry");
					var ifr = ce.getElementsByTagName("iframe")[0];
					ifr.contentWindow.postMessage("plus", "*");
				}).toString()
			+ ")()";
			break;
		}
	}
	window.addEventListener("keydown", onKeyDown, false);
})();
