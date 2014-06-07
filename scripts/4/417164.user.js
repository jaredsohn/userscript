// ==UserScript==
// @name All comments for Tiger v.9
// @description Redirects kinja 1.2 pages to All Replies instead of Highlights
// ==/UserScript==
var h$ = window.location.hostname;
if ((h$.indexOf("io9.com") != -1 || h$.indexOf("lifehacker.com") != -1 || h$.indexOf("kinja.com") != -1 || h$.indexOf("kotaku.com") != -1 || h$.indexOf("jalopnik.com") != -1 || h$.indexOf("jezebel.com") != -1 || h$.indexOf("gizmodo.com") != -1 || h$.indexOf("gawker.com") != -1 || h$.indexOf("deadspin.com") != -1) && (window.location.pathname.length > 1)) {
	var a$ = window.location.href;
	var a = a$.length;
	if (a$.indexOf("/tag/") == -1 && a$.indexOf("com/private") == -1 && a$.indexOf("com/preview/") == -1 && a$.substring(a-4,a) != "/rss" && a$.indexOf("/search?q=") == -1 && a$.indexOf("/+") == -1 && a$.indexOf("/@") == -1 && h$.indexOf(".au") == -1 && a$.indexOf("/stats/leaderboard") == -1) {
		if (a$.substring(a-8,a) == "#replies" && a$.substring(a-12,a) != "/all#replies") {
			var a$ = a$.replace("#replies","/all#replies");
			window.location.href = a$; }
		else if (a$.substring(a-4,a) != "/all" && a$.substring(a-12,a) != "/all#replies") {
			var a$ = a$ + "/all";
			window.location.href = a$; }
} }