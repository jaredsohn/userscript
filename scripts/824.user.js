// ==UserScript==
// @name           K5 comment killfile
// @namespace      http://rephrase.net/miscellany/05/
// @description    remove comments from blacklisted users
// @include        http://www.kuro5hin.org*
// ==/UserScript==
	
(function () {
	
	list = new Array("rusty", "RobotSlave", "kitten"); 
		
	var xpath = "//a[parent::font[text()[1]='by ']][1]"; 
	var a = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	var elm, i; 
	
	for(elm = null, i = 0; (elm = a.snapshotItem(i)); i++) { 
		for (l=0; l<list.length; l++) { 
			if (elm.firstChild.nodeValue == list[l]) { 
				
				comment = elm.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode; 
				comment.parentNode.removeChild(comment);
			
			}
		}
	}

})();