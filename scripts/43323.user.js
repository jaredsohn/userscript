// ==UserScript==
// @name           Travian Auto Relogin
// @namespace      http://iddy.jp/profile/rokudenashi/
// @include        http://*.travian.jp/*
// ==/UserScript==

var delay = 3 + Math.random()*4;  // ちょっと（3〜7秒）くらい待つ
window.setTimeout(function() {
	var inputs = document.evaluate('//form/descendant::input[@type="password"]', document, null, 7, null);
	if(inputs.snapshotLength == 1 && 0 < inputs.snapshotItem(0).value.length)
		inputs.snapshotItem(0).form.submit();
}, delay*1000);
