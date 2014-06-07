// ==UserScript==
// @name           Killfile
// @namespace      http://userscripts.org/users/55706
// @include        http://torontoist.com/*
// @description  removes specified commenters on Torontoist. 
// ==/UserScript==


(function() {
//insert your least favourite commenters here.
var dumbAsses = ["PickleToes", "x_the_x", "SCREWFACE", "RealityCheck"];
var all, i, j, el;
var badEls = new Array();

all = document.getElementsByTagName('div');
for (i = 0; i < all.length; i++) {
	el = all[i];
	//Torontoist trolls
	if (el.className == 'comment-footer') {
	 
		for (j = 0; j < dumbAsses.length; j++) {
			
			if (el.innerHTML.search(dumbAsses[j]) > -1 ) {
				badEls.push(el.parentNode);
			}
		}
	}
	

}
	
for (i=0; i<badEls.length ; i++) {
	badEls[i].parentNode.removeChild(badEls[i]);
}

})();