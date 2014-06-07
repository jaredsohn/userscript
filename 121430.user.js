// ==UserScript==
// @name           2ch kakolog Redirect
// @description    dat落ち(過去ログ倉庫)のスレッドを開いた時にログ速に転送し見れるようにします。
// @namespace      http://userscripts.org/scripts/show/121430
// @homepageURL    http://userscripts.org/scripts/show/121430
// @updateURL      https://userscripts.org/scripts/source/121430.meta.js
// @include        http://*.2ch.net/test/read.cgi/*/*
// @version        2.1

// ==/UserScript==

(function () {

	// <font color=red>■ このスレッドは過去ログ倉庫に格納されています</font>
	if (document.body.innerHTML.indexOf("このスレッドは過去ログ倉庫に格納されています</font>") !== -1) {

		// サイズが大きい場合、過去ログとして表示されているかも
		if (document.body.innerHTML.length > 7000) {
			return;
		}
		// http://logsoku.com/thread/yutori7.2ch.net/mnewsplus/0000000/
		// http://yutori7.2ch.net/test/read.cgi/mnewsplus/0000000/l50
		//						  p[1]	 p[2]	   p[3]		p[4]  p[5]
		var p = location.pathname.split('/');
		var n = p[5] ? p[5] : '';

		if (p[3].match(/^[a-z0-9]*$/) && p[4].match(/^[0-9]*$/) && 
			(n == '' || n.match(/^l?[0-9\-]*$/))
			) {
			location.href = 'http://logsoku.com/thread/' + location.hostname + '/' + p[3] + '/' + p[4] + '/' + n;
		}
	}

	return;
})();
