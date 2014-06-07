// ==UserScript==
// @name          Image centered
// @description   Image centered
// @auther        http://qqboxy.blogspot.com/
// @include       http://*/*
// @include       https://*/*
// @version       0.1
// ==/UserScript==
try{
	document.getElementsByTagName('title')[0].innerHTML;
} catch(e) {
	var qqimage = /((((ht|f)tps?:\/\/)|(www.))[-a-zA-Z0-9@:%_\+.~#?&//=]+)\.(jpg|jpeg|gif|png|bmp)/i
	if(qqimage.test(window.location.href))document.getElementsByTagName('body')[0].style.textAlign="center";
}