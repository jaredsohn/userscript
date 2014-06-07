// ==UserScript==
// @name        fangfen
// @namespace   jandan
// @include     http://jandan.net/pic*
// @version     1
// ==/UserScript==

(function(){
	if(typeof($)!='undefined'){
		$('#comment').before('<span style="color:#F33">发图先看前10页。不发坟图，从我做起。</span>');
	}
})();