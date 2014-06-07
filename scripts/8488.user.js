// ==UserScript==
// @name           Center Image
// @description    Centers the image viewed
// @include        *
// ==/UserScript==

var SCRIPT = {
	name: "Center Image",
	namespace: "http://userscripts.org/people/25394",
	description: 'Centers the image viewed',
	source: "http://userscripts.org/scripts/show/8488",
	identifier: "http://userscripts.org/scripts/show/8488.user.js",
	version: "0.1",								// version
	date: (new Date(2007, 4, 13))		// update date
			.valueOf()
};
if (document.contentType.split('/')[0]=='image'){
    i=document.getElementsByTagName('img')[0]
    i.style.marginLeft=window.innerWidth/2-i.offsetWidth/2
}
