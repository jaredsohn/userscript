// ==UserScript==
// @name        Resize Forum Pics
// @namespace   https://getsatisfaction.com/pluto/products/pluto_ov_profile_scripts
// @description Resizes pictures in the forums to not be larger than the forum width.
// @include     http://forum.onverse.com/*
// @version     1
// @grant       none
// ==/UserScript==
var elms = document.getElementsByTagName('img');
(function(){
	var notcomp=[];
	for(var i=0;i<elms.length;i++) {
		if(elms[i].width > 932)
			elms[i].width = 932;
		else if(elms[i].width == 0 && !elms[i].complete)
			notcomp.push(elms[i]);
	}
	elms=notcomp;
	if(notcomp.length){setTimeout(arguments.callee, 500)}
})();