// ==UserScript==
// @id             org.userscripts.users.kuehlschrank.AskDirectLinks
// @name           Ask.fm Direct Links
// @version        2013.4.7
// @description    Removes URL redirections.
// @author         kuehlschrank
// @include        http*://ask.fm/*
// ==/UserScript==

(function() {

	function onMutations(muts) {
		for(var i = muts.length, m; i-- && (m = muts[i]);) {
			for(var j = m.addedNodes.length, node; j-- && (node = m.addedNodes[j]);) {
				if(node.nodeType == 1) {
					process(node);
				}
			}
		}
	}

	function process(parent) {
		var list = parent.querySelectorAll('a[href*="link.ask.fm"]');
		for(var i = list.length, a; i-- && (a = list[i]);) {
		    if(a.textContent.indexOf('http') == 0) {
		    	a.href = a.textContent;
		    }
		}
	}

	process(document.body);
	var M = window.MutationObserver || window.WebKitMutationObserver;
	new M(onMutations).observe(document.body, {childList:true, subtree:true});

})();