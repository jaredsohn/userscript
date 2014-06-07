// ==UserScript==
// @name       Rule34.xxx image opener
// @namespace  Shui
// @version    1.0
// @description  Automatically opens the full images from rule34.xxx Depending on feedback I'll add support for other boorus
// @match      http://rule34.xxx/index.php?page=post&s=view&id=*
// @grant      none
// @copyright  2013, Shui
// ==/UserScript==

function openImage() {
	var theImg;
	var cond;
	var tab = new Array();
	allImgs = document.getElementsByTagName('a');
	for (var i = 0; i < allImgs.length; i++) {
		cond = 0;
		thisImg = allImgs[i];
		thisImg = thisImg.href.toLowerCase().replace('/thumbnail_', '').replace('img2.rule34', 'img3.rule34');
		if ((thisImg.indexOf("http://img.rule34.xxx/rule34//images/*/*.*")) && (tab.indexOf(thisImg) == -1) &&
			((thisImg.lastIndexOf(".jpg") == thisImg.length-4) ||
			(thisImg.lastIndexOf(".gif") == thisImg.length-4) ||
			(thisImg.lastIndexOf(".jpeg") == thisImg.length-5) ||
			(thisImg.lastIndexOf(".png") == thisImg.length-4))){
			var finimg;
			var imgLength;
			finImg = thisImg.replace('http://img3.rule34.xxx/rule34/thumbnails//', 'http://img.rule34.xxx/rule34//images/');
			if (finImg.lastIndexOf(".jpeg") > 10){
				imgLength = "" + finImg.length - 45;
			} else {
				imgLength = "" + finImg.length - 44;
			}


			var output = [finImg.slice(0, parseFloat(imgLength)), '/', finImg.slice(parseFloat(imgLength))].join('');
			if ((output.indexOf("http://saucenao.com/search")) || (output.indexOf("http://iqdb.org"))){
				output = output.replace("http://iqdb.org/?url=", "");
				window.location = output;
			}
		}
	}
}
openImage();