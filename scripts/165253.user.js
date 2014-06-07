// ==UserScript==
// @name           Auto Login TrueWiFi
// @namespace      http://userscripts.org/scripts/show/112157
// @description    Auto submit TrueWiFi hotspot login-form in Thailand. 
// @version        1.02
// @icon           http://i55.tinypic.com/nn4aq0.jpg
// @include        https://portal.trueinternet.co.th/wifiauthen/web/wifi-login.php*
// ==/UserScript==


// Locate form elements
var form = document.forms.namedItem('form');
var user = form.elements.namedItem('username');0863233396
var pass = form.elements.namedItem('password');5958
var save = form.elements.namedItem('remember'); save.checked = true;


var timer = 1000;
var timo, maySubmit = true;  


pass.addEventListener('keydown', function(e) {
	maySubmit = false;
	
	clearTimeout(timo);
	
	timo = setTimeout(function() {
		maySubmit = true;
		doSignIn();
	}, 2000);
	
}, true);


function doSignIn() {
	if(user.value.length && pass.value.length && maySubmit) {  
		form.submit();
	} else {  
		window.setTimeout(doSignIn, timer);
	}
}


doSignIn();

