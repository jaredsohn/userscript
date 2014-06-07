// ==UserScript==
// @name           Whirlpool Signin - back to where you were
// @namespace      blurg!
// @description    Whirlpool Signin - back to where you were
// @include        http://forums.whirlpool.net.au/*
// @include        http://whirlpool.net.au/*
// @version        0.2
// ==/UserScript==

var sButton = document.querySelector('#sign_in input[type="submit"]');
var dU = document.URL;
var lSc = GM_getValue('currentPageUrl');

if(sButton){
	sButton.addEventListener('mouseup',function(e){
		GM_setValue('currentPageUrl',dU);
	},false);
}
if(dU.match('whirlpool.net.au/profile/') && document.querySelector('#dataentry>h2') && lSc){
	document.location.href=lSc;
	GM_deleteValue('currentPageUrl');
}