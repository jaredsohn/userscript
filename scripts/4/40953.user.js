// ==UserScript==
// @name        I hate iddy.jp
// @namespace   http://lowreal.net/
// @include     http://iddy.jp/profile/*
// @include     http://tako3.com/*
// @require     http://gist.github.com/3238.txt#$X
// ==/UserScript==

var to = (function () {
	switch (location.host) {
		case "iddy.jp":   return $X("string((id('main_profile') | id('blog_list'))//a[contains(@href, 'd.hatena.ne.jp')]/@href)");
		case "tako3.com": return $X("string(//a[contains(@href, 'd.hatena.ne.jp')]/@href)");
	}
	return null;
})();

if (to && confirm("Move?: " + to)) {
	location.href = to;
}

