// ==UserScript==
// @name           Auto Login TrueMoveH WiFi in Thailand
// @namespace      http://userscripts.org/scripts/show/112157
// @description    Auto Login TrueMoveH WiFi in Thailand 
// @version        3
// @icon           http://s3.amazonaws.com/uso_ss/icon/112157/large.jpg?1315247479
// @include        https://portal.trueinternet.co.th/wifiauthen/web/wifi-login.php*
// ==/UserScript==


// Locate form elements
var form = document.forms.namedItem('form');
var user = form.elements.namedItem('username');
var pass = form.elements.namedItem('password');
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