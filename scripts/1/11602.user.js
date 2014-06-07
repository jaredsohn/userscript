// ==UserScript==
// @name           1up boards blacklist
// @namespace      any
// @description    hide comments from blacklisted users
// @include        *boards.1up.com*
// ==/UserScript==

// ==UserScript==
// @name           K5 user blacklist
// @namespace      http://rephrase.net/user-js/
// @description    make comments from blacklisted users unobtrusive
// @include        *kuro5hin.org*
// ==/UserScript==
	
(function () {
	
	// Array of usernames to block
	list = new Array("example_user", "someoneelse", "etc..."); 

	if(!document.URL.match("thread.id")) {
		exit;
	}	

	var xpath = "//a[@class='auth_text']"; 
	var a = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	var elm, i, l; 
	
	String.prototype.trim = function () {
	    return this.replace(/^\s*/, "").replace(/\s*$/, "");
	}
	String.prototype.strip = function () {
		return this.replace(/\<[^<]*\>/g,"").trim();
	}

	for(elm = null, i = 0; (elm = a.snapshotItem(i)); i++) {
		for (l=0; l<list.length; l++) {
			if (elm.innerHTML.strip() == list[l]) { 
				comment=elm.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
				comment.setAttribute("style","display:none");
			}
		}
	}

})();	

