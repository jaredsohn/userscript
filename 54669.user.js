// ==UserScript==
// @name           TwitterProtectedStyle
// @namespace      http://twitter.com/rokudenashi
// @include        http://twitter.com/*
// @description        protectedの人をもっと目立たせる
// ==/UserScript==

//for firefox
if (typeof unsafeWindow != 'undefined') {
	$=unsafeWindow.$
} else {
	unsafeWindow=window
}

function setProtectedStyle() {
	$('.hentry:has(.lock)').each(function() {
		$(this).css('background-color','#FFFFCC')
	})
}
setProtectedStyle()

originalOnPageChange=unsafeWindow.onPageChange
unsafeWindow.onPageChange=function(A) {
	setProtectedStyle()
	return originalOnPageChange(A)
}

if (window.AutoPagerize) {
	boot();
}else{
	window.addEventListener('GM_AutoPagerizeLoaded',boot,false);
}
function boot() {
	window.AutoPagerize.addFilter(function(){
		setProtectedStyle();
	});
}
