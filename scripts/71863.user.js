// ==UserScript==
// @name           resizeFrame for mop
// @namespace      mop_resize_frame
// @include        http://dzh.mop.com/*
// ==/UserScript==


setTimeout(function() {
	//TIPS:用unsafeWindow获取页面的window变量
	var win = unsafeWindow;
	if (win.resizeFrame) {
		win.resizeFrame = function() {
			var idxFrame = parent.document.getElementById("index_frameset");
			var cols = idxFrame.cols;
			var midResize = idxFrame.children[1].contentDocument.getElementById("mid_resize");
			if (cols=="503,7,*") {
				idxFrame.cols="0,7,*";
				midResize.setAttribute("class","btnright");
			}
			 else {
				 idxFrame.cols="503,7,*";
				 midResize.setAttribute("class","btnleft");
			}
		}
	} else {
		setTimeout(arguments.callee, 1500);
	}
}, 10);

