// ==UserScript==
// @name        Favicon with Google 3
// @namespace   http://white.s151.xrea.com/
// @description A script to add favicons next to links on Google search results
// @include     http://*google.*/*q=*
// @exclude     http://mail.google.com/*
// ==/UserScript==

(function(){

	// apply the function to each element found by the path
	function forEachMatch(path, f, root) {
		var root = (root == null) ? document : root;
		var matches = root.evaluate(
			path, root, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < matches.snapshotLength; i++)
		  f(matches.snapshotItem(i));
	}

	// adds the link favicon before itself
	function add_favicon(link) {
		if(link.parentNode.nodeName.toLowerCase() != 'h3') return;
		var g = link.parentNode;

		var container = document.createElement('div');
		container.style.marginLeft = '16px';
		container.style.paddingLeft = '1ex';
		while (g.firstChild != null) {
			var e = g.firstChild;
			g.removeChild(e);
			container.appendChild(e);
		}

		var favicon_container = document.createElement('div');
		favicon_container.style.cssFloat = 'left';
		favicon_container.style.minWidth = '16px';
		favicon_container.style.minHeight = '16px';
		favicon_container.style.backgroundImage =
		  'url("chrome://global/skin/icons/folder-item.png")';

		var favicon = document.createElement('img');
		favicon.src = "http://" + link.hostname + "/favicon.ico";
		favicon.width = 16;
		favicon.alt   = "";

		favicon_container.appendChild(favicon);
		g.appendChild(favicon_container);
		g.appendChild(container);
	}

	forEachMatch("//a[@class='l']", add_favicon);

	// for AutoPager
	var scrollHeight = document.documentElement.scrollHeight;
	document.addEventListener(
		"scroll",
		function(e){
			if(scrollHeight != document.documentElement.scrollHeight){
				scrollHeight = document.documentElement.scrollHeight;
				forEachMatch("//a[@class='l']",add_favicon);
			}
		},false);

}());
