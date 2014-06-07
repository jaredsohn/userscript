// ==UserScript==
// @name                block zxproxy's porn pics
// @description it's really annoy
// @version             0.15
// @include     http://*.zxproxy.com/*
// ==/UserScript==



if (document.location.href.indexOf('https://www.zxproxy.com')==0) {
	// 1\ strip dirty pics on visting page
	if (document.getElementById('Ad_ZhanWei')) {
		var node = document.getElementById('Ad_ZhanWei');
		node.parentNode.removeChild(node);
	}
	// 2\ strip dirty pic on main page
	if (document.getElementsByTagName('img').length > 0 && document.getElementsByTagName('img')[0].src.indexOf('20111015.png')>0) {
		 var node2 = document.getElementsByTagName('img')[0]; node2.parentNode.removeChild(node2); 
	}
} else {
	//alert('n');
}
