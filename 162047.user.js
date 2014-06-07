// ==UserScript==
// @name           Enable text selection and right-click on Segundamano.es
// @description    Enables selection of text and right-click on segundamano.es
// @author         zitronic
// @include        http://www.segundamano.es/*
// @version        1.0
// ==/UserScript==

document.getElementById('descriptionText').onselectstart=new Function ("return true");

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