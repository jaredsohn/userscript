// ==UserScript==
// @name           Block PSD Laker Haters
// @namespace      http://userscripts.org/scripts/show/49364
// @description    Block Laker hater posts on PSD
// @include        http://www.prosportsdaily.com/forums/*
// ==/UserScript==

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var haters = new Array("RHJhY28=", "Rk9Cb2xvdXM=");

var allPosts = document.evaluate("//div[@id='posts']/div", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allPosts.snapshotLength; i++) {
    var thisPost = allPosts.snapshotItem(i);
	var thisPostUserName = document.evaluate(".//a[@class='bigusername']", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML;
	for (hater in haters) {
		if (thisPostUserName == getName(haters[hater])) {
			thisPost.style.display = 'none';
		}
	}
}

function getName(input) {
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	do {
		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		output = output + String.fromCharCode(chr1);
		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);
	return output;
}