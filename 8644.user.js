// ==UserScript==
// @name           New Tab on External Links for AutoPager
// @namespace      http://repo.securityteam.us/greasemonkey
// @description    Adds a target_blank to off-site links so that they can open in a new tab and in the background (tabbrowser set appropriately)
// @include        http://del.icio.us/*
// @include        http*://*.google.*/search*
// @include        http://digg.com/*
// @include        http://www.digg.com/*
// @include        http://drudgereport.com/*
// @include        http://www.drudgereport.com/*
// ==/UserScript==
// Thank you for
//  SecurityTeam US ( New Tab on External Links http://userscripts.org/scripts/show/4694 )

var filter = function (context) {
	var links = document.evaluate('.//a[not(target="_blank")]', context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0, j = links.snapshotLength; i < j; ++i) {
		links.snapshotItem(i).target = '_blank';
	}
};

addFilter(filter);

function addFilter(func, i) {
	i = i || 4;
	if (window.AutoPagerize && window.AutoPagerize.addFilter) {
		func(document);
		window.AutoPagerize.addFilter(function (nodes) {
			nodes.forEach(func);
		});
	}
	else if (i > 1) {
		setTimeout(arguments.callee, 1000, func, i - 1);
	}
	else {
		(function () {
			func(document);
			setTimeout(arguments.callee, 200);
		})();
	}
}
