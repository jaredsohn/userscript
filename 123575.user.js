// ==UserScript==
// @name           r-a-dio twipsy fix
// @namespace      `mpk
// @include        http://r-a-dio.com/*
// @description    Hides twipsy elements which incorrectly display and mess up text highlighting
// ==/UserScript==

window.onload = function (){
	var attach;
	
	function hideTwipsy(){
		var twipsyEls = document.getElementsByClassName('twipsy');
		for (var i = 0; i < twipsyEls.length; i++) {
			twipsyEls[i].style.display = 'none';
		}
	}
	
	if (attach = window.addEventListener || window.attachEvent) {
		attach( 'blur', hideTwipsy, false );
		attach( 'focus', hideTwipsy, false );
	}
}
