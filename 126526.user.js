// ==UserScript==
// @name			Vkontakte music download button
// @version			1.3
// @include			http://vk.com/*
// ==/UserScript==

var f;
unsafeWindow.setInterval(f = function() {
	var elms = unsafeWindow.document.querySelectorAll('.audio input[type=hidden]');
	for (var i = 0, l = elms.length; i < l; i++) {
		if (elms[i].parentNode.parentNode.firstChild._installed) continue;
		var a = unsafeWindow.document.createElement('a');
		a.innerHTML = '&darr;';
		a.href = elms[i].value.split(',')[0];
		a._installed = true;
		elms[i].parentNode.parentNode.insertBefore(a, elms[i].parentNode.parentNode.firstChild);
	}
}, 3000);

window.setTimeout(f, 500);