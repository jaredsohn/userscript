// ==UserScript==
// @name           Alibaba_autologin_script
// @description    Alibaba autologin script
// @version        0.3
// @include        http://login.alibaba.com*
// @include        http://login.aliexpress.com*
// @include        https://login.alibaba.com*
// @include        https://login.aliexpress.com*
// @grant          none
// ==/UserScript==

var ms = 1000;

function secondl() {
var u,p,b;

	u = document.getElementById('xloginPassportId');
	if (u != null) {
		u.value = 'email@mail.ru';
	}

	p = document.getElementById('xloginPasswordId');
	if (p != null) {
		p.value = 'userpassword';
	}

	if (u != null && p != null) {
		b = document.getElementById('signInButton');
		if (b != null) {
			b.click();
		}
	}
}

setTimeout(secondl, ms);