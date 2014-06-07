// ==UserScript==
// @namespace     http://daryl.learnhouston.com/userscript
// @name          Highlight Bugzilla Assigned To
// @description   Highlight Bugzilla Assigned To Line
// @include       http*://bugzilla*
// ==/UserScript==

var anchors = document.getElementsByTagName('a');
for(var i = 0; i< anchors.length; i++){
	var rexp = /page\.cgi\?id=fields\.html#assigned_to/g;
	if(anchors[i].href.match(rexp)){
		anchors[i].style.backgroundColor = '#ff0';
		i = anchors.length + 1;
	}
}
