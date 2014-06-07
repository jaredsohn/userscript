// ==UserScript==
// @name           chocoYoko
// @namespace      http://www.vfc.pt/
// @description    grelhado na brasa
// @include        http://www.vfc.pt/*
// ==/UserScript==


/*
var domain = ".vfc.pt";
	function GM_rmCookie(domain){
		var cookieManager = Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager);
		var iter = cookieManager.enumerator;
		while (iter.hasMoreElements()) {
			var cookie = iter.getNext();
			if (cookie instanceof Components.interfaces.nsICookie) {
				if (cookie.host == domain) {
					cookieManager.remove(cookie.host, cookie.name, cookie.path, cookie.blocked);
				}
			}
		}
	}
	
	*/

	
	if (unsafeWindow.location != "http://www.vfc.pt/inicial") {
	
	
	window.location = "http://www.vfc.pt/inicial";
		
	}
	else {
	
	
	
	
		var f = unsafeWindow.document.getElementById("questionario");
		
		var q = unsafeWindow.document.questionario.rb_questionario;
		q[1].click();
		
		f.submit();
		
		
	}
	
function vote(){	
}
unsafeWindow.setTimeout(vote(),10000);


