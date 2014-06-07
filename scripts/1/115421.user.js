// ==UserScript==
// @id             org.userscripts.users.kuehlschrank.PreloadLinkedGifs
// @name           Preload Linked GIFs
// @description    Preloads visible links to GIF images.
// @author         kuehlschrank
// @version        2013.3.31
// @include        http*://boards.4chan.org/*
// @include        http*://*.reddit.com/*
// @exclude        http*://boards.4chan.org/gif/*
// @exclude        http*://boards.4chan.org/wsg/*
// ==/UserScript==

(function() {

	function main() {
		process(document.body);
		var M = window.MutationObserver || window.WebKitMutationObserver;
		new M(onMutations).observe(document.body, {childList:true, subtree:true});
	}

	function onMutations(muts) {
		for(var i = muts.length, m; i-- && (m = muts[i]);) {
			for(var j = m.addedNodes.length, node; j-- && (node = m.addedNodes[j]);) {
				if(node.nodeType == 1) process(node);
			}
		}
	}

	function process(context) {
		var links = context.querySelectorAll('a[href$=".gif"]');
		for(var i = 0, len = links.length, a; i < len && (a = links[i]); i++) {
			if(isVisible(a))
				new Image().src = a.href;
		}
	}

	function isVisible(obj)	{
		if(obj == document.body)
			return true;
		var style = window.getComputedStyle(obj, "");
		if(!style || style.display == 'none' || style.visibility == 'hidden')
			return false;
		return isVisible(obj.parentNode);
	}

	window.setTimeout(main, 200)

})();