// ==UserScript==
// @name           Starbucks WiFi Auto-Login
// @namespace      thehuey.com
// @description    Logs in automatically when using a wayport wifi.
// @include        http://*.wayport.net/*
// ==/UserScript==

var username = GM_getValue('user', 'FILLME');
var password = GM_getValue('pass', 'INPLEASE');
var roamRelm = GM_getValue('roam', '1');

if (username.length > 0 && password.length > 0 && roamRelm.length > 0) {
document.getElementById('username').value = username;
document.getElementById('roamRealm').selectedIndex = roamRelm;
document.getElementById('password').value = password;
document.getElementById('aupAgree').checked = true;
document.getElementById('MEMBERLOGIN').submit();
} else {
  var formEl = document.getElementById('login');
  var mem = document.getElementById('aupAgree');

  mem.addEventListener('click', function (event) {
	alert('foo');
	var u = document.getElementById('username');
	var p = document.getElementById('password');
	var r = document.getElementById('roamRealm');
	if (u.value.length > 0) {
		GM_setValue('user', u.value);
	}
	if (p.value.length > 0) {
		GM_setValue('pass', p.value);
	}
	if (r.selectedIndex > 0) {
		GM_setValue('roam', r.selectedIndex);
	}
  });
}