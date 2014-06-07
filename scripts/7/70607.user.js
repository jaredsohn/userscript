// ==UserScript==
// @name           FarmVille redirect
// @namespace      farmville
// @include        http://apps.facebook.com/onthefarm/*
// ==/UserScript==

function $(d) {
	return document.getElementById(d);
}

var matches = document.location.href.match(/http:\/\/apps\.facebook\.com\/onthefarm\/track\.php\?creative&cat[^&]*&subcat[^&]*&key=[^&]*&next=reward.php%3FfrHost%3D(\d+)%26frId%3D([^%]+)%26frType%3D([^&]+)/);

if(matches.length > 0) {
	window.open("http://farmville.com/reward.php?frHost=" + matches[1] + "&frId=" + matches[2] + "&frType=" + matches[3]);
	window.open("http://facebook.com?ref=logo");
        window.close();
}
