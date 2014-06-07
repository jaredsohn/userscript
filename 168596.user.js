// ==UserScript==
// @name         新浪视频自动断点续传
// @namespace    http://jixun.org/
// @version      1.0.1.0 Final
// @description  新浪视频上传页自动断点续传
// @include      *://upload.video.sina.com.cn/nupload.php
// @include      *://upload.video.sina.com.cn/nupload.php*
// @copyright    2012+, Jixun
// @run-at       document-start
// ==/UserScript==

addEventListener('DOMContentLoaded', function () {
	var scr = document.createElement('script');
	scr.innerHTML = '(' + (function () {
		setInterval(function () {
			var btnContinue = document.querySelectorAll('.opt_btn a[node-type="upload_continue"]');
			for (var i = 0; i < btnContinue.length; i++) {
				if (btnContinue[i].style.display != 'none') {
					// Trigger click event
					console.log('Auto re-continue!!');
					$(btnContinue[i]).click();
				}
			}
		}, 750)
	}).toString() + ')()';
	document.body.appendChild(scr);
}, false);