// ==UserScript==
// @name MyAnimeList Approval Percentage
// @namespace http://userscripts.org
// @description Displays the approval rating of fansub groups and their releases as a percentage
// @include *myanimelist.net/fansub-groups.php?id=*
// @include *myanimelist.net/anime/*
// @include *myanimelist.net/anime.php*
// ==/UserScript==

(function() {
	var path = "//div[@class='spaceit_pad']/a[@class='lightLink']/small";
	if (document.URL.match(/fansub\-groups/)) {
		path = "//div[@class='spaceit_pad']/strong";
		var ts = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var totA = ts.snapshotItem(0).innerHTML.match(/[0-9]+/);
		var totD = ts.snapshotItem(1).innerHTML.match(/[0-9]+/);
		var tot = parseFloat(totA) + parseFloat(totD);
		path = "//div[@class='spaceit_pad']";
		ts = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var tsA = ts.snapshotItem(0);
		var tsD = ts.snapshotItem(1);
		var pA = ''+(100/tot)*totA;
		var pD = ''+(100/tot)*totD;
		var nA = pA.lastIndexOf('.')+3;
		var nD = pD.lastIndexOf('.')+3;
		if (pA==100) nA = 3;
		if (pD==100) nD = 3;
		var tpA = '(' + pA.substring(0,nA) + '%' + ')';
		var tpD = '(' + pD.substring(0,nD) + '%' + ')';
		tsA.innerHTML = tsA.innerHTML.concat(tpA);
		tsD.innerHTML = tsD.innerHTML.concat(tpD);
		path = "//div[@class='spaceit_pad']/small";
	}
	var subs = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var searchRE = /[0-9]+ of [0-9]+ users approve/;
	for (var i=0;i<subs.snapshotLength;i++) {
		var s = subs.snapshotItem(i);
		var t = s.innerHTML.match(searchRE);
		var arr = t[0].match(/[0-9]+/g);
		var p = '' + (100/arr[1])*arr[0];
		var n = p.lastIndexOf('.')+3;
		if (p==100) n = 3;
		var tp = t + ' (' + p.substring(0,n) + '%' + ')';
		s.innerHTML = s.innerHTML.replace(searchRE, tp);
	} 
})();