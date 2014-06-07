// ==UserScript==
// @name	gmailEnlargePreview
// @author	keigo
// @version	0.5
// @namespace	http://greasemonkey.hippo.fm/gmailEnlargePreview
// @include	https://mail.google.com/*
// @include	http://mail.google.com/*
// @description	Enlarge image attachment for Gmail.
// ==/UserScript==

// Bugs..
// When the thread has many mails and many attachments, it could failed to convert links.
// I could not recognize the bug correctly. (maybe it occurs when the thread has more than 5 mails and it is expanded. )
// I doubt using 'gmail.getActiveViewElement().getElementsByTagName("img");' is wrong but how do I do it ?

// 0.2
// wrap with "window.setTimeout(function() { ... }, 0);

// 0.3
// fix

// 0.4
// fix

// 0.5
// changed img.tFroq to img.hv class

window.addEventListener('load', function() {
	if (unsafeWindow.gmonkey) {
		unsafeWindow.gmonkey.load('1.0', function(gmail) {
			window.setTimeout(function() {
				function rewriteImgTags() {
					if (gmail.getActiveViewType() == "cv") {
					
//						var style = document.createElement ("style");
//						gmail.getActiveViewElement().style('{ font-family: Courier New,courier,monospace }');
//						var ss = document.styleSheets [document.styleSheets.length - 1];
//						ss.insertRule("body, td, div.gs div { font-family: Courier New,courier,monospace }", 0);

						var attachImgs = gmail.getActiveViewElement().getElementsByTagName("img");
						for (i = 0; i < attachImgs.length; i++) {
							if (attachImgs[i].className == "hv") {
								attachImgs[i].width = "500";

								attachImgs[i].src.match(/(.*)\?(.*)th=([a-z0-9]+)&(.*)$/);
								var thVal    = RegExp.$3
								attachImgs[i].src.match(/(.*)\?(.*)attid=([0-9.]+)&(.*)$/);
								var attidVal = RegExp.$3

								attachImgs[i].src = "?attid=" + attidVal + "&disp=emb&view=att&th=" + thVal;
							}
						}
					}
				}
				gmail.registerViewChangeCallback(rewriteImgTags);
				rewriteImgTags();
			}, 0);
		});
	}
}, true);


