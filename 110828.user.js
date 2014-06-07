// ==UserScript==
// @name           WirelessHCI Auto-login
// @namespace      wireless_HCI
// @description    Auto Login to Wireless@HCI
// @include        https://securelogin.arubanetworks.com*
// @include        http://securelogin.arubanetworks.com*
// @include        http://*.securelogin.arubanetworks.com*
// @include        https://*.securelogin.arubanetworks.com*
// ==/UserScript==
if (document.body.innerHTML.indexOf('Authentication failed')=='-1') {
	if (!localStorage.userid||!localStorage.pass) {
		document.getElementsByName("Login")[0].onclick=function(){
			localStorage.userid=document.getElementsByName("userid")[0].value;
			localStorage.pass=document.getElementsByName("password")[0].value;
		};
	} else {
		document.getElementById('user').setAttribute("value", localStorage.userid);
		document.getElementById('password').setAttribute("value", localStorage.pass);
		document.getElementsByName('Login')[0].click();
	}
}