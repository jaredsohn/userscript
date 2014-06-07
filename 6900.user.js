// ==UserScript==
// @name           Newbienudes-nerv
// @description    onRightClick, window open
// @include        newbienudes.com
// ==/UserScript==

(function() {
	var allimg;
	allLinks = document.getElementsByTagName('a');
	for (var i=0; i<allLinks.length;i++) {
		var h = allLinks[i].href;
		var s = h.search(/javascript:ViewPhoto/);
		if(s!=-1) {
			allLinks[i].href=h.replace(/javascript:ViewPhoto\(\'/,"http://www.newbienudes.com/Photos/");
			allLinks[i].target="_blank";
		}
	}
})();
