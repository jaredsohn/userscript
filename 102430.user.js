// ==UserScript==
// @name           QA site ordering by No.
// @namespace      http://0-oo.net/
// @description    OKWave等の質問サイトで回答が「新着順」の場合、「回答順」のページに切り替える
// @homepage       http://userscripts.org/scripts/show/102430
// @version        0.1.1
// @include        http://*.tld/qa*
// ==/UserScript==
//
// ( The MIT License )
//
(function(){
	if (location.href.match("http://windows.php.net/")) {
		return;
	}
	
	var param = {
		"detail.chiebukuro.yahoo.co.jp": "sort=1",
		"okwave.jp": "order=ASC&by=datetime",
		"oshiete.goo.ne.jp": "order=asc",
		"sooda.jp": "sort=older",
	}[location.host] || "ans_count_asc=1";
	
	if (!location.href.match(param)) {
		location.href += "?" + param;
	}
})();
