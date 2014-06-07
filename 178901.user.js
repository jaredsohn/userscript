// ==UserScript==
// @name        Disable Best Of Link
// @namespace   http://www.onfocus.com/
// @description This disables the Best Of link at the top of MetaFilter.com
// @include     http://*.metafilter.com/
// @version     1
// @grant       none
// ==/UserScript==

(function(){
	var a = document.getElementsByTagName('a');
	for(var i = 0; i < a.length; i++) {
		if ((a[i].href=='http://bestof.metafilter.com/') || (a[i].href=='https://bestof.metafilter.com/')) {
			a[i].href='javascript:void(0)';
			break;
		}
	}
})();