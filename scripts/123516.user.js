// ==UserScript==
// @name       LT Removal
// @namespace  
// @version    0.3
// @description  something useful
// @include    http://forum.blockland.us/*
// @copyright  2012+, Kingdaro
// ==/UserScript==

// var postForm = document.getElementById('quickModForm');
var posts = document.getElementsByTagName('td');
var n = ['action=profile;u=36235'];

var i;
for (i=0;i<=posts.length;i++){
	var v = posts[i];
	var str = v.innerHTML;
	
	if (str.search(n)>-1){
		if (v.className=='windowbg' || v.className=='windowbg2'){
			posts[i].innerHTML = '<div style=" \
			text-align:center; \
			">-snip-</div>';
		}
	}
}