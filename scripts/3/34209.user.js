// ==UserScript==
// @name           rclickOpenY
// @namespace      naver
// @description    Right-Click Alert Removal
// @include        http://blog.naver.com/PostView.nhn*
// ==/UserScript==

(function() {
	setTimeout('mlayoutPhoto.oView.click();', 100);
	setTimeout('var clickToClose = function(e) { \
		if(e.button == 0) {\
			mlayoutPhoto.doClose();\
		} else if(e.button == 2) {\
			return true;\
		}\
	};', 900);
	setTimeout('mlayoutPhoto.oView.removeEventListener("mousedown", mlayoutPhoto.onmousedown_NotRightClick, false);', 1000);
	setTimeout('mlayoutPhoto.oView.addEventListener("mousedown", clickToClose, false);', 1100);
})();