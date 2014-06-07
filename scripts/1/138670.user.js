// ==UserScript==
// @name        osticket autologin 
// @namespace   http://userscripts.org/users/70539
// @description osticket autologin 
// @include     http://*/scp/*
// ==/UserScript==


const DISABLE_COOKIE = 'GM_disable_autologin';
      
var onLoginPage = $xs('//body[@id="loginBody"]/div[@id="loginBox"]');
var authReq = $xs('/html/body/div/h1[2]');
var form = $xs('//form[@action="login.php"]'), username = $('name'), password = $('pass');

if (onLoginPage){
	eraseCookie(DISABLE_COOKIE);
}
if (readCookie(DISABLE_COOKIE)){
	return;
}


if (onLoginPage && form && username && password) {
	setTimeout(function(){
		if (username.value=="" || password.value=="" || authReq.innerHTML != 'Authentication Required') {
			// Snap back and don't autologin again for the duration of this session
			createCookie(DISABLE_COOKIE, true);
		} else {
			// Submit form
			form.submit();
		}
	}, 10);
}











function unhash(string) { return string.replace(/#.*$/, ''); }
/* Staple functions */
function $(id) { return document.getElementById(id); }
function $x(path, root) {
	if (!root) root = document;
	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}
function $xs(path, root) { var arr = $x(path, root); return arr ? arr[0] : null; }

// http://www.quirksmode.org/js/cookies.html
function createCookie(name,value) {
	document.cookie = name+"="+value+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}