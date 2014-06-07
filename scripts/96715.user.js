// ==UserScript==
// @name           FixGawker
// @namespace      FixGawker.com
// @description    Make Gawker Links Point to the Mobile site
// @include        *
// ==/UserScript==
var pageAddr, links, a, href;
pageAddr = window.location.href;
links = document.evaluate("//a[@href]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < links.snapshotLength; i++) {
    a = links.snapshotItem(i);
    href = a.href;
    if (href.match(/\/\/(lifehacker|gizmodo|kotaku|io9|jalopnik|jezebel)\.com\/?$/i)) {
	href = href.replace(/\/\/(lifehacker|gizmodo|kotaku|io9|jalopnik|jezebel)\.com\/?/, '//ca.$1.com/');
	a.href = href;
    }
    if (href.match(/\/\/(lifehacker|gizmodo|kotaku|io9|jalopnik|jezebel)\.com\//i)) {
	href = href.replace(/\/\/(lifehacker|gizmodo|kotaku|io9|jalopnik|jezebel)\.com\/(#!)?(\d+)\//, '//ca.$1.com/$3/');
	a.href = href;
    }
}
//Changelog
// 1.0 Initial version
// 1.1 Rewrite root site links to ca.*
// 1.2 Rewrite article links to ca.* instead of m.*
// 1.3 Remove hash bangs in links