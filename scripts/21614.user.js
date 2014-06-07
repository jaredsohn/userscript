// ==UserScript==
// @name          Allow Rightclick
// @namespace     http://www.petitnoir.net/
// @description   
// @include       *
// ==/UserScript==


(function (){
	var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
	function unprotect(){
		var contextmenus = document.evaluate('//*[@oncontextmenu]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (i=0; i < contextmenus.snapshotLength; i++) {
			handler = contextmenus.snapshotItem(i).getAttribute("oncontextmenu", false);
			if(handler.match("return false")){
				if(handler.match(/alert\(\S+\)/)){
					handler = handler.replace(/alert\(\S+\);/, "");
				}
				handler = handler.replace("return false", "return true");
				contextmenus.snapshotItem(i).setAttribute("oncontextmenu", handler,false);
			}
		}
	}
	
	var onload = w.onload;
	if (onload) {
			w.onload = (function(){
				onload();
				unprotect();
			})();
	}else{
		unprotect();
	}
})();