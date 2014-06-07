// ==UserScript==
// @name           Move AD block to bottom in Naver main
// @namespace      http://userscript.org/users/oloklir
// @description    Moves AD block to the bottom in www.naver.com mainpage.
// @include        http://www.naver.com/*
// @copyright      OLokLiR
// @version        1.0 2010-11-09
// @injectframes   0
// ==/UserScript==

(function(){

if(document.URL=='http://www.naver.com/'){
	var ad_top=document.getElementById('ad_top');
	var ad_branding=document.getElementById('ad_branding');

	var column_left=document.getElementById('column_left');
	var column_right=document.getElementById('column_right');

	if(column_left!==null&&ad_top!==null){
		column_left.removeChild(ad_top);
		column_left.appendChild(ad_top);
	}
	if(column_right!==null&&ad_branding!==null){
		column_right.removeChild(ad_branding);
		column_right.appendChild(ad_branding);
	}
}

})();