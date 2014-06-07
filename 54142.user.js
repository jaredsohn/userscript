// ==UserScript==
// @name           Telegraph.co.uk Ajax Galleries
// @namespace      #aVg
// @description    Adds ajax and keyboard functionality to the Telegraph's gallery viewer.
// @include        http://www.telegraph.co.uk/*/picturegalleries/*
// @version        0.1
// ==/UserScript==
var curImg = 0;
if (location.href.match(/\bimage=(\d+)/)) {
	curImg = Number(RegExp.$1);
}
var twoThree = document.evaluate("//div[@class='twoThirds gutter']", document, null, 9, null).singleNodeValue;
function get(amt) {
	GM_xmlhttpRequest({
		url : location.href.replace(/\bimage=\d+/,"image="+(curImg+=amt)),
		method : "GET",
		onload : function(A) {
			twoThree.innerHTML = A.responseText.match(/<div class="twoThirds gutter">([\s\S]+)<\/div>\n\n\t\t\t<div class="oneThird gutter">/) ? RegExp.$1 : "<h1>Image "+curImg+" does not exist!</h1>";
		}
	});
}
document.addEventListener("keydown", function(e) {
	switch(e.keyCode) {
		case 71: // g
			var i = Number(prompt("Which image to go to?", "1").replace(/\s/g,""));
			if(isNaN(i) || i <= 0) {
				alert("Bad image number, or you entered a number less than zero.");
				return;
			}
			curImg = i;
			get(-1);
			return;
		case 39: // right
			get(1);
			return;
		case 37: // left
			get(-1);
			return;
	}
}, false);