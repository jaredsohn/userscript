// ==UserScript==
// @name       Wikipedia Links in New Tabs
// @version    0.1
// @description  Opens wikipedia pages in new tabs
// @match      *://*.wikipedia.org/*
// @copyright  2013, McFloundinho
// ==/UserScript==

var links = document.getElementById('content').getElementsByTagName('a');

for(var i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("#")==-1){
			links[i].addEventListener('click', function( e ) {
			e.preventDefault();
			GM_openInTab(this.href);
            });
		}
}