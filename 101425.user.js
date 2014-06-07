// ==UserScript==
// @name           What.CD : Last Breadcrumbs
// @description    This puts a breadcrumb trail beneath posts.
// @namespace      hateradiONI
// @version        2.0
// @include        http*://*what.cd/forums.php?*
// @match          *://*.what.cd/forums.php?*
// @updated        Nov 16 2011
// @since          April 4th, 2011
// ==/UserScript==

var h2_too = {
	th : document.querySelector('.thin'),
	h2 : document.querySelector('h2'),
	h3 : document.querySelector('.thin > h3'),
	go : function(){
		var hc = this.h2.cloneNode(true);
		if(this.h3){
			this.h3.parentNode.insertBefore(hc, this.h3);
		} else {
			this.th.appendChild(hc);
		}
	}
};

h2_too.go();