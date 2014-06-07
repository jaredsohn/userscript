// ==UserScript==
// @name           penghilang colom kanan by Oqha DeMoMers
// @version        0.1
// @author         demoners
// @namespace      http://ibliscopo.co.cc/
// @description    menghilangkan iklan di sisi kanan facebook anda
// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// ==/UserScript==


// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+102px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/TheDeMoNersCheaters\">[**Fb Oqha is dEmOnErs**]</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpandPosts = function() {
	
		buttons = document.getElementsByTagName("a");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("lfloat") >= 0)
				if(buttons[i].getAttribute("onclick") == "ProfileStream.getInstance().showMore();return false;")
					buttons[i].click();
		}
		
	};
}
// ==============



(function() {
var css = "#rightCol{display: none;};";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();