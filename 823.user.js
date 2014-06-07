

// ==UserScript==
// @name           K5 user blacklist
// @namespace      http://rephrase.net/user-js/
// @description    make comments from blacklisted users unobtrusive
// @include        *kuro5hin.org*
// ==/UserScript==
	
(function () {
	
	// Array of usernames to block
	list = new Array("rusty", "turmeric", "rmg"); 
	
	// Get every <a> element which is the first <a> child of a <font> element that has "by " as its first textnode.
	// (Or something like that.)
	// It matches <a href="/user/uid:43839">Username</a>-type elements, anyway. 
	var xpath = "//a[parent::font[text()[1]='by ']][1]"; 
	var a = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	var elm, i; 
	
	for(elm = null, i = 0; (elm = a.snapshotItem(i)); i++) { 
		for (l=0; l<list.length; l++) { 
			if (elm.firstChild.nodeValue == list[l]) { 
				
				// get comment's base <table> -- there *must* be a better way...
				comment = elm.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode; 
				
				// get comment rating
				rating = elm.parentNode.parentNode.childNodes[2].getElementsByTagName("a").item(0).firstChild.nodeValue;
								
				// build the replacement div
				div = document.createElement("div"); 
				div.innerHTML = "Comment by "+list[l]+" ("+rating+") [<a onclick=\"javascript:e=event.currentTarget.parentNode; e.nextSibling.setAttribute('style', 'display:block'); e.parentNode.removeChild(e);\" href=\"javascript:;\">Show</a>]"; 
				div.setAttribute("style", "color: #999; display:table-cell; font: 0.8em 'Arial', Helvetica, Sans-Serif; padding: 1px 1px 1px 3px;");
				
				// insert replacement
				comment.parentNode.insertBefore(div, comment);
				
				// hide comment
				comment.setAttribute("style", "display:none");
			}
		}
	}

})();	

